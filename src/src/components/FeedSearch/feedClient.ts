/**
 * Browser-side client for the Avocado package feed at repo.avocadolinux.org.
 *
 * Mirrors `avocado sdk dnf search <query>`: the SDK container's DNF config
 * combines a per-target set of repos. The authoritative list lives at
 * `{HOST}/{release}/{channel}/targets.json`. For each target the manifest
 * provides every repo path the SDK has enabled (e.g. `target/armv8a`,
 * `target/armv8a_tegra`, `sdk/all`, `target/<machine>-ext`, …).
 *
 *   1. GET {host}/{release}/{channel}/targets.json
 *   2. For each repo path: GET {repo}/repodata/repomd.xml, parse primary href
 *   3. GET that primary.xml.gz, gunzip via the browser's DecompressionStream
 *   4. Extract every <package type="rpm">...</package> entry
 *   5. Merge across repos and filter by query string in memory
 *
 * The bucket is fronted by CloudFront and serves CORS headers on simple GETs.
 *
 * Security: this code runs in user browsers as a hosted service.
 *  - Manifest paths are validated against a strict regex before being used in
 *    URL construction. No path traversal, no protocol injection.
 *  - The host is hardcoded to https://repo.avocadolinux.org and cannot be
 *    overridden by manifest content.
 *  - Gunzip output is read with a size cap to prevent decompression bombs.
 *  - Response sizes are bounded for the manifest and repomd.xml.
 *  - Package fields are rendered by React (auto-escaped); never use
 *    dangerouslySetInnerHTML for any value parsed here.
 */

export interface FeedPackage {
  name: string
  summary: string
  version: string
  release: string
  arch: string
  /** Full repo sub-path under {host}/{release}/{channel}/, e.g. "target/armv8a_tegra" */
  repo: string
  href: string
}

export type TargetManifest = Record<string, string[]>

const HOST = 'https://repo.avocadolinux.org'

// Validation patterns: each path segment must start with an alphanumeric and
// then allow only [A-Za-z0-9._-]. Paths are at most three segments deep (the
// manifest currently uses two, e.g. "target/foo", but the SDK could legally
// add a third).
const SAFE_SEGMENT_RE = /^[A-Za-z0-9][A-Za-z0-9._-]*$/
const SAFE_PATH_RE = /^[A-Za-z0-9][A-Za-z0-9._-]*(\/[A-Za-z0-9][A-Za-z0-9._-]*){0,2}$/
const SAFE_HREF_RE = /^repodata\/[A-Za-z0-9][A-Za-z0-9._-]*\.xml\.gz$/

const MAX_MANIFEST_BYTES = 1 * 1024 * 1024 // 1 MB
const MAX_REPOMD_BYTES = 1 * 1024 * 1024 // 1 MB
const MAX_PRIMARY_DECOMPRESSED_BYTES = 256 * 1024 * 1024 // 256 MB safety net
const MAX_SEGMENT_LEN = 64
const MAX_PATH_LEN = 128

function isSafeSegment(s: unknown): s is string {
  return typeof s === 'string' && s.length > 0 && s.length <= MAX_SEGMENT_LEN && SAFE_SEGMENT_RE.test(s)
}

function isSafePath(p: unknown): p is string {
  if (typeof p !== 'string' || p.length === 0 || p.length > MAX_PATH_LEN) return false
  if (p.includes('..')) return false
  return SAFE_PATH_RE.test(p)
}

function repoUrl(release: string, channel: string, path: string): string {
  if (!isSafeSegment(release)) throw new Error('Invalid release')
  if (!isSafeSegment(channel)) throw new Error('Invalid channel')
  if (!isSafePath(path)) throw new Error(`Invalid repo path: ${path}`)
  return `${HOST}/${release}/${channel}/${path}`
}

async function readBounded(
  body: ReadableStream<Uint8Array>,
  maxBytes: number,
  label: string
): Promise<Uint8Array> {
  const reader = body.getReader()
  const chunks: Uint8Array[] = []
  let total = 0
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      if (!value) continue
      total += value.byteLength
      if (total > maxBytes) {
        throw new Error(`${label} exceeded ${maxBytes} bytes`)
      }
      chunks.push(value)
    }
  } finally {
    reader.releaseLock()
  }
  const out = new Uint8Array(total)
  let pos = 0
  for (const c of chunks) {
    out.set(c, pos)
    pos += c.byteLength
  }
  return out
}

async function fetchBounded(
  url: string,
  maxBytes: number,
  label: string,
  signal?: AbortSignal
): Promise<string> {
  const res = await fetch(url, { cache: 'force-cache', signal, credentials: 'omit' })
  if (!res.ok) throw new Error(`${url} returned ${res.status}`)
  if (!res.body) throw new Error(`${url} returned no body`)
  const bytes = await readBounded(res.body, maxBytes, label)
  return new TextDecoder('utf-8').decode(bytes)
}

/**
 * True when the browser supports `DecompressionStream('gzip')`. Available in
 * Chrome 80+, Firefox 113+, Safari 16.4+. Older browsers (notably iOS Safari
 * before 16.4) will see a clear "browser unsupported" error rather than a
 * silent ReferenceError when the search first runs.
 */
export function hasGzipDecompressionSupport(): boolean {
  return typeof DecompressionStream !== 'undefined'
}

async function gunzipBoundedText(
  body: ReadableStream<Uint8Array>,
  maxBytes: number,
  label: string
): Promise<string> {
  if (!hasGzipDecompressionSupport()) {
    throw new Error(
      'This browser does not support gzip DecompressionStream. ' +
        'Please use a recent Chrome, Firefox, or Safari 16.4+.'
    )
  }
  // DOM's DecompressionStream typing uses BufferSource while pipeThrough expects
  // Uint8Array. The runtime contract is identical; cast to bridge the typings.
  const ds = new DecompressionStream('gzip') as unknown as ReadableWritablePair<
    Uint8Array,
    Uint8Array
  >
  const bytes = await readBounded(body.pipeThrough(ds), maxBytes, label)
  return new TextDecoder('utf-8').decode(bytes)
}

/**
 * Load the per-target repo manifest. Sanitises every entry before returning so
 * downstream callers can assume safe paths.
 */
export async function fetchTargetManifest(
  release: string,
  channel: string,
  signal?: AbortSignal
): Promise<TargetManifest> {
  if (!isSafeSegment(release)) throw new Error('Invalid release')
  if (!isSafeSegment(channel)) throw new Error('Invalid channel')
  const url = `${HOST}/${release}/${channel}/targets.json`
  const text = await fetchBounded(url, MAX_MANIFEST_BYTES, 'targets.json', signal)
  let parsed: unknown
  try {
    parsed = JSON.parse(text)
  } catch {
    throw new Error('targets.json is not valid JSON')
  }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error('targets.json is not an object')
  }
  const out: TargetManifest = {}
  for (const [target, value] of Object.entries(parsed as Record<string, unknown>)) {
    if (!isSafeSegment(target)) continue
    if (!Array.isArray(value)) continue
    const paths: string[] = []
    for (const entry of value) {
      if (typeof entry === 'string' && isSafePath(entry)) paths.push(entry)
    }
    if (paths.length > 0) out[target] = paths
  }
  return out
}

function unescapeXml(s: string): string {
  // &amp; must be replaced LAST so that doubly-escaped inputs like
  // "&amp;quot;" (the literal text "&quot;") aren't collapsed to '"'.
  return s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&')
}

/**
 * Strip a CDATA wrapper if present. createrepo can emit summaries/descriptions
 * either as plain XML text or wrapped in CDATA when the upstream RPM contains
 * markup-looking characters.
 */
function stripCdata(s: string): string {
  const m = s.match(/^\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*$/)
  return m ? m[1] : s
}

/**
 * Extract package entries from a createrepo `primary.xml`.
 *
 * Regex (not a DOM parser) for memory reasons — a Jetson target's
 * decompressed primary.xml can exceed 50 MB and a full DOM tree would
 * cost several hundred MB of heap. The trade-off is that we assume the
 * createrepo output shape:
 *   - <package type="rpm"> is the top-level container; nothing else nests it.
 *   - <name>, <arch>, <version>, <summary>, and <location> appear at most
 *     once each, directly under <package>.
 *   - <location href="…"> is the single href-bearing element under
 *     <package>; <rpm:requires>/<rpm:provides> entries use <rpm:entry name=…>
 *     and do not emit href attributes.
 *   - <summary> may be plain text OR a single CDATA section.
 * If createrepo's output ever drifts from these assumptions, parsing here
 * will need to be revisited.
 */
function parsePrimaryXml(xml: string, repo: string): FeedPackage[] {
  const out: FeedPackage[] = []
  const pkgRe = /<package\s+type="rpm">([\s\S]*?)<\/package>/g
  let m: RegExpExecArray | null
  while ((m = pkgRe.exec(xml)) !== null) {
    const inner = m[1]
    const name = inner.match(/<name>([^<]+)<\/name>/)?.[1]
    if (!name) continue
    const arch = inner.match(/<arch>([^<]+)<\/arch>/)?.[1] ?? ''
    const summaryRaw = inner.match(/<summary>([\s\S]*?)<\/summary>/)?.[1] ?? ''
    const summary = unescapeXml(stripCdata(summaryRaw))
    const versionMatch = inner.match(/<version[^/]*ver="([^"]+)"[^/]*rel="([^"]+)"/)
    const version = versionMatch?.[1] ?? ''
    const release = versionMatch?.[2] ?? ''
    const href = inner.match(/<location\s+href="([^"]+)"/)?.[1] ?? ''
    out.push({ name, summary, version, release, arch, repo, href })
  }
  return out
}

async function fetchPrimaryHref(
  release: string,
  channel: string,
  path: string,
  signal?: AbortSignal
): Promise<string> {
  const url = `${repoUrl(release, channel, path)}/repodata/repomd.xml`
  const text = await fetchBounded(url, MAX_REPOMD_BYTES, `repomd.xml (${path})`, signal)
  const match = text.match(/<data\s+type="primary">[\s\S]*?<location\s+href="([^"]+)"/)
  if (!match) throw new Error(`No primary location in repomd.xml for ${path}`)
  const href = match[1]
  if (!SAFE_HREF_RE.test(href)) {
    throw new Error(`Untrusted primary href in repomd.xml for ${path}`)
  }
  return href
}

export async function fetchRepoPackages(
  release: string,
  channel: string,
  path: string,
  signal?: AbortSignal
): Promise<FeedPackage[]> {
  const primaryHref = await fetchPrimaryHref(release, channel, path, signal)
  const url = `${repoUrl(release, channel, path)}/${primaryHref}`
  const res = await fetch(url, { cache: 'force-cache', signal, credentials: 'omit' })
  if (!res.ok) throw new Error(`primary.xml.gz ${res.status} for ${path}`)
  if (!res.body) throw new Error(`primary.xml.gz returned no body for ${path}`)
  const xml = await gunzipBoundedText(
    res.body,
    MAX_PRIMARY_DECOMPRESSED_BYTES,
    `primary.xml (${path})`
  )
  return parsePrimaryXml(xml, path)
}

/**
 * Compare two version strings using RPM's segment rules:
 *   - tokenize into alphanumeric runs (digit runs and letter runs)
 *   - numeric segments compare numerically (so "10" > "2")
 *   - alpha segments compare lexically
 *   - a numeric segment beats an alpha segment at the same position
 *
 * Good enough for OE/Yocto version strings ("1.22.12", "r0.1", etc.). Does
 * not implement RPM's tilde/caret rules — none of the published feed uses
 * them today.
 */
function rpmvercmp(a: string, b: string): number {
  const tokenize = (s: string): string[] => s.match(/\d+|[A-Za-z]+/g) ?? []
  const at = tokenize(a)
  const bt = tokenize(b)
  const len = Math.max(at.length, bt.length)
  for (let i = 0; i < len; i++) {
    if (i >= at.length) return -1
    if (i >= bt.length) return 1
    const x = at[i]
    const y = bt[i]
    const xn = /^\d+$/.test(x)
    const yn = /^\d+$/.test(y)
    if (xn && yn) {
      const dx = x.replace(/^0+/, '') || '0'
      const dy = y.replace(/^0+/, '') || '0'
      if (dx.length !== dy.length) return dx.length - dy.length
      const c = dx.localeCompare(dy)
      if (c !== 0) return c
    } else if (xn) {
      return 1
    } else if (yn) {
      return -1
    } else {
      const c = x.localeCompare(y)
      if (c !== 0) return c
    }
  }
  return 0
}

function cmpVerRel(a: FeedPackage, b: FeedPackage): number {
  const v = rpmvercmp(a.version, b.version)
  return v !== 0 ? v : rpmvercmp(a.release, b.release)
}

/**
 * Fetch every repo path for a target in parallel and collapse the union to
 * one entry per (name, arch) — the highest version-release wins. Matches
 * what `dnf search` shows: a single line per package.arch.
 *
 * Repos that fail (e.g. a just-published target whose repodata hasn't
 * propagated yet) are reported as non-fatal errors so the rest of the
 * target's data still loads.
 */
export async function fetchTargetPackages(
  release: string,
  channel: string,
  paths: string[],
  signal?: AbortSignal
): Promise<{ packages: FeedPackage[]; errors: string[] }> {
  const errors: string[] = []
  const results = await Promise.allSettled(
    paths.map((p) => fetchRepoPackages(release, channel, p, signal))
  )
  const latest = new Map<string, FeedPackage>()
  results.forEach((r, i) => {
    if (r.status !== 'fulfilled') {
      errors.push(`${paths[i]}: ${r.reason?.message ?? r.reason}`)
      return
    }
    for (const p of r.value) {
      const key = `${p.name}.${p.arch}`
      const existing = latest.get(key)
      if (!existing || cmpVerRel(p, existing) > 0) latest.set(key, p)
    }
  })
  return { packages: Array.from(latest.values()), errors }
}

export interface SearchResult extends FeedPackage {
  score: number
  /** indices into name where the query matches; used for highlight rendering */
  nameMatch?: [number, number]
}

/**
 * Lightweight ranked filter that mirrors `dnf search` default behaviour:
 * matches against name and summary only (descriptions require `dnf search-all`).
 *
 *   1. exact name match
 *   2. name starts-with
 *   3. name contains
 *   4. summary contains
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
      } else {
        continue
      }
    }
    out.push({ ...p, score, nameMatch })
  }
  out.sort((a, b) => b.score - a.score || a.name.localeCompare(b.name))
  return out
}
