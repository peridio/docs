/**
 * Browser-side client for the Avocado package feed at repo.avocadolinux.org.
 *
 * Mirrors what `avocado sdk dnf search <query>` does inside the SDK container:
 *
 *   1. GET {host}/{release}/{channel}/target/{repo}/repodata/repomd.xml
 *   2. Parse out the <data type="primary"> location (a hashed primary.xml.gz path)
 *   3. GET that primary.xml.gz, gunzip via the browser's DecompressionStream
 *   4. Extract every <package type="rpm">...</package> entry
 *   5. Filter against a query string in memory
 *
 * The bucket is fronted by CloudFront and serves CORS headers on simple GETs,
 * so this works directly from a browser with no proxy.
 */

export interface FeedPackage {
  name: string
  summary: string
  description: string
  version: string
  release: string
  arch: string
  repo: string
  href: string
}

const HOST = 'https://repo.avocadolinux.org'

function repoBase(release: string, channel: string, repo: string): string {
  return `${HOST}/${release}/${channel}/target/${repo}`
}

async function gunzipText(response: Response): Promise<string> {
  if (!response.body) throw new Error('Response has no body')
  const ds = new DecompressionStream('gzip')
  const decompressed = response.body.pipeThrough(ds)
  return await new Response(decompressed).text()
}

async function fetchPrimaryHref(release: string, channel: string, repo: string): Promise<string> {
  const url = `${repoBase(release, channel, repo)}/repodata/repomd.xml`
  const res = await fetch(url, { cache: 'force-cache' })
  if (!res.ok) throw new Error(`repomd.xml ${res.status} for ${repo}`)
  const text = await res.text()
  const match = text.match(/<data\s+type="primary">[\s\S]*?<location\s+href="([^"]+)"/)
  if (!match) throw new Error(`No primary location in repomd.xml for ${repo}`)
  return match[1]
}

function unescapeXml(s: string): string {
  return s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
}

function parsePrimaryXml(xml: string, repo: string): FeedPackage[] {
  const out: FeedPackage[] = []
  const pkgRe = /<package\s+type="rpm">([\s\S]*?)<\/package>/g
  let m: RegExpExecArray | null
  while ((m = pkgRe.exec(xml)) !== null) {
    const inner = m[1]
    const name = inner.match(/<name>([^<]+)<\/name>/)?.[1]
    if (!name) continue
    const arch = inner.match(/<arch>([^<]+)<\/arch>/)?.[1] ?? ''
    const summary = unescapeXml(inner.match(/<summary>([^<]*)<\/summary>/)?.[1] ?? '')
    const description = unescapeXml(inner.match(/<description>([^<]*)<\/description>/)?.[1] ?? '')
    const versionMatch = inner.match(/<version[^/]*ver="([^"]+)"[^/]*rel="([^"]+)"/)
    const version = versionMatch?.[1] ?? ''
    const release = versionMatch?.[2] ?? ''
    const href = inner.match(/<location\s+href="([^"]+)"/)?.[1] ?? ''
    out.push({ name, summary, description, version, release, arch, repo, href })
  }
  return out
}

export async function fetchRepoPackages(
  release: string,
  channel: string,
  repo: string
): Promise<FeedPackage[]> {
  const primaryHref = await fetchPrimaryHref(release, channel, repo)
  const url = `${repoBase(release, channel, repo)}/${primaryHref}`
  const res = await fetch(url, { cache: 'force-cache' })
  if (!res.ok) throw new Error(`primary.xml.gz ${res.status} for ${repo}`)
  const xml = await gunzipText(res)
  return parsePrimaryXml(xml, repo)
}

/**
 * Fetch the union of {target} and {cpuArch} repos. Either may fail (e.g.
 * an unmapped target — we still return what succeeded).
 */
export async function fetchTargetPackages(
  release: string,
  channel: string,
  target: string,
  cpuArch: string | null
): Promise<{ packages: FeedPackage[]; errors: string[] }> {
  const repos = [target, ...(cpuArch ? [cpuArch] : [])]
  const errors: string[] = []
  const results = await Promise.allSettled(repos.map((r) => fetchRepoPackages(release, channel, r)))
  const packages: FeedPackage[] = []
  results.forEach((r, i) => {
    if (r.status === 'fulfilled') packages.push(...r.value)
    else errors.push(`${repos[i]}: ${r.reason?.message ?? r.reason}`)
  })
  return { packages, errors }
}

export interface SearchResult extends FeedPackage {
  score: number
  /** indices into name where the query matches; used for highlight rendering */
  nameMatch?: [number, number]
}

/**
 * Lightweight ranked filter. Prioritises (in order):
 *   1. exact name match
 *   2. name starts-with
 *   3. name contains
 *   4. summary contains
 *   5. description contains
 */
export function searchPackages(packages: FeedPackage[], query: string): SearchResult[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  const out: SearchResult[] = []
  for (const p of packages) {
    const name = p.name.toLowerCase()
    let score = 0
    let nameMatch: [number, number] | undefined
    if (name === q) {
      score = 100
      nameMatch = [0, q.length]
    } else if (name.startsWith(q)) {
      score = 80
      nameMatch = [0, q.length]
    } else {
      const idx = name.indexOf(q)
      if (idx >= 0) {
        score = 60
        nameMatch = [idx, idx + q.length]
      } else if (p.summary.toLowerCase().includes(q)) {
        score = 30
      } else if (p.description.toLowerCase().includes(q)) {
        score = 10
      } else {
        continue
      }
    }
    out.push({ ...p, score, nameMatch })
  }
  out.sort((a, b) => b.score - a.score || a.name.localeCompare(b.name))
  return out
}
