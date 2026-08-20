#!/usr/bin/env node
// Generate dithered square thumbnails for the Field Notes index.
//
//   npm --prefix src run thumbs                 # everything that changed
//   npm --prefix src run thumbs -- --only <slug>
//   npm --prefix src run thumbs -- --force      # ignore the lock
//   npm --prefix src run thumbs -- --check      # report drift, write nothing
//
// Outputs are committed. Nothing here runs at build time.
const { execFileSync } = require('node:child_process')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')

const {
  listNoteFiles,
  readNote,
  parseSource,
  resolveLocalPath,
  setFrontMatterField,
} = require('./thumbnails/notes')
const { loadConfig, resolvePreset, buildArgs, presetHash } = require('./thumbnails/recipe')
const { readLock, writeLock, sha256File, isCurrent } = require('./thumbnails/lock')
const { isAnimated, prepareStill, prepareFrames } = require('./thumbnails/prepare')

const SRC = path.resolve(__dirname, '..')
const NOTES_DIR = path.join(SRC, 'field-notes')
const IMG_ROOT = path.join(SRC, 'static', 'img', 'field-notes')
const LOCK_PATH = path.join(NOTES_DIR, 'thumbnails.lock.json')
const CONFIG_PATH = path.join(__dirname, 'thumbnails', 'presets.json')
const DIDDER = process.env.DIDDER_BIN || path.join(SRC, '.tools', 'didder')

function parseArgv(argv) {
  const flags = { only: null, force: false, check: false, listPresets: false }
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === '--only') flags.only = argv[i + 1]
    else if (argv[i] === '--force') flags.force = true
    else if (argv[i] === '--check') flags.check = true
    else if (argv[i] === '--list-presets') flags.listPresets = true
  }
  return flags
}

function requireDidder(config) {
  if (!fs.existsSync(DIDDER)) {
    throw new Error(
      `didder not found at ${DIDDER} — run: bash src/scripts/thumbnails/ensure-didder.sh`
    )
  }
  const version = execFileSync(DIDDER, ['--version'], { encoding: 'utf8' }).split('\n')[0]
  if (!version.includes(config.didderVersion)) {
    throw new Error(`expected didder v${config.didderVersion}, found ${JSON.stringify(version)}`)
  }
}

async function fetchJson(url, headers) {
  const response = await fetch(url, { headers })
  if (!response.ok) throw new Error(`${url} -> HTTP ${response.status}`)
  return response.json()
}

async function download(url, dest) {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`${url} -> HTTP ${response.status}`)
  fs.writeFileSync(dest, Buffer.from(await response.arrayBuffer()))
}

async function acquireSource(source, slug) {
  if (source.kind === 'local') {
    const file = resolveLocalPath(IMG_ROOT, source.ref)
    if (!fs.existsSync(file)) throw new Error(`local source not found: ${file}`)
    return { file, credit: null }
  }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), `thumb-${slug}-`))
  if (source.kind === 'url') {
    const file = path.join(dir, 'source')
    await download(source.ref, file)
    return { file, credit: null }
  }
  const key = process.env.UNSPLASH_ACCESS_KEY
  if (!key) {
    throw new Error(
      'unsplash: source needs UNSPLASH_ACCESS_KEY — or switch the note to url:<direct link> with image_credit set by hand'
    )
  }
  const headers = { Authorization: `Client-ID ${key}` }
  const meta = await fetchJson(`https://api.unsplash.com/photos/${source.ref}`, headers)
  const file = path.join(dir, 'source')
  await download(`${meta.urls.raw}&w=2000&fit=max`, file)
  // Unsplash's API terms require pinging the download endpoint, not just fetching the file.
  await fetchJson(meta.links.download_location, headers)
  return { file, credit: { name: meta.user.name, url: meta.user.links.html } }
}

function publicPath(file) {
  return `/img/field-notes/${path.basename(file)}`
}

async function processNote(noteFile, config, lock, flags) {
  const { slug, frontMatter } = readNote(noteFile)
  if (!frontMatter.image_source) return { slug, status: 'skipped' }

  const source = parseSource(frontMatter.image_source)
  const { file: sourceFile, credit } = await acquireSource(source, slug)
  const animated = await isAnimated(sourceFile)
  const { name: presetName, preset } = resolvePreset(config, {
    presetName: frontMatter.image_preset,
    animated,
  })
  const ext = animated ? 'gif' : 'png'
  // One asset per entry in `sizes`, so adding a width is a one-line edit to
  // presets.json. Every kind is a lock key too, which is what makes a new size
  // mark all notes stale on the next plain run instead of needing --force.
  const outputs = Object.fromEntries(
    Object.keys(config.sizes).map((kind) => [kind, path.join(IMG_ROOT, `${slug}-${kind}.${ext}`)])
  )

  const expected = {
    source: frontMatter.image_source,
    sourceSha256: sha256File(sourceFile),
    preset: presetName,
    presetSha256: presetHash(preset),
    didderVersion: config.didderVersion,
    outputs,
  }
  // `image` is ours to maintain: its extension depends on whether the source
  // turned out to be animated, which the author cannot know in advance.
  const imagePath = publicPath(outputs.thumb)
  if (!flags.force && isCurrent(lock.notes[slug], expected)) {
    if (!flags.check && frontMatter.image !== imagePath) {
      setFrontMatterField(noteFile, 'image', imagePath)
      return { slug, status: 'written', detail: `image: ${imagePath} (assets already current)` }
    }
    return { slug, status: 'current' }
  }
  if (flags.check) return { slug, status: 'stale' }

  const work = fs.mkdtempSync(path.join(os.tmpdir(), `thumb-work-${slug}-`))
  const prep = { aspect: config.aspect, edgeCap: config.sourceEdgeCap, sharpen: config.sharpen }
  let input
  let frames = null
  if (animated) {
    const dir = path.join(work, 'frames')
    frames = await prepareFrames(sourceFile, dir, {
      ...prep,
      frameStride: config.animation.frameStride,
    })
    input = path.join(dir, '*.png')
  } else {
    input = path.join(work, 'prepared.png')
    await prepareStill(sourceFile, input, prep)
  }

  const fps = animated ? config.animation.fps : undefined
  for (const [kind, output] of Object.entries(outputs)) {
    const args = buildArgs({
      input,
      output,
      width: config.sizes[kind],
      dotSize: config.dotSize,
      preset,
      fps,
    })
    execFileSync(DIDDER, args, { stdio: 'pipe' })
  }
  fs.rmSync(work, { recursive: true, force: true })

  const entry = {
    source: expected.source,
    sourceSha256: expected.sourceSha256,
    preset: presetName,
    presetSha256: expected.presetSha256,
    didderVersion: config.didderVersion,
    animated,
    ext,
  }
  if (frames) entry.frames = { kept: frames.kept, total: frames.total, fps: config.animation.fps }
  const explicitCredit = frontMatter.image_credit
    ? { name: frontMatter.image_credit, url: frontMatter.image_credit_url ?? null }
    : null
  if (credit || explicitCredit) entry.credit = credit ?? explicitCredit
  entry.outputs = Object.fromEntries(
    Object.entries(outputs).map(([kind, file]) => [kind, sha256File(file)])
  )
  lock.notes[slug] = entry

  if (frontMatter.image !== imagePath) setFrontMatterField(noteFile, 'image', imagePath)

  const kb = Object.entries(outputs)
    .map(([kind, file]) => `${kind} ${Math.round(fs.statSync(file).size / 1024)}KB`)
    .join(' ')
  return { slug, status: 'written', detail: `${presetName} ${ext} ${kb}` }
}

async function main() {
  const flags = parseArgv(process.argv.slice(2))
  const config = loadConfig(CONFIG_PATH)

  if (flags.listPresets) {
    for (const [name, preset] of Object.entries(config.presets)) {
      console.log(`${name}${preset.default ? ' (default)' : ''}`)
      const argv = buildArgs({
        input: 'IN',
        output: 'OUT',
        width: config.sizes.thumb,
        dotSize: config.dotSize,
        preset,
      })
      console.log(`  didder ${argv.join(' ')}`)
    }
    return
  }

  requireDidder(config)
  const lock = readLock(LOCK_PATH)
  lock.didderVersion = config.didderVersion

  const files = listNoteFiles(NOTES_DIR).filter(
    (file) => !flags.only || path.basename(file, '.mdx') === flags.only
  )
  if (flags.only && files.length === 0) throw new Error(`no note matches --only ${flags.only}`)

  const failures = []
  const counts = { written: 0, current: 0, skipped: 0, stale: 0 }
  for (const file of files) {
    const slug = path.basename(file, '.mdx')
    try {
      const result = await processNote(file, config, lock, flags)
      counts[result.status] = (counts[result.status] ?? 0) + 1
      if (result.status === 'written') console.log(`  wrote   ${slug}  ${result.detail}`)
      else if (result.status === 'current') console.log(`  current ${slug}`)
      else if (result.status === 'stale') console.log(`  STALE   ${slug}`)
      // A note with no image_source is not an error -- it renders the placeholder
      // box -- but staying silent about it hides the work still to do.
      else if (result.status === 'skipped') console.log(`  no art  ${slug}  (add image_source)`)
    } catch (error) {
      failures.push(`${slug}: ${error.message}`)
      console.error(`  FAILED  ${slug}  ${error.message}`)
    }
  }

  const summary = [
    `${counts.written} written`,
    `${counts.current} current`,
    `${counts.stale} stale`,
    `${counts.skipped} without art`,
    `${failures.length} failed`,
  ]
  console.log(`\n${files.length} note(s): ${summary.join(', ')}`)

  if (!flags.check) writeLock(LOCK_PATH, lock)
  if (failures.length > 0) {
    process.exitCode = 1
  } else if (flags.check && counts.stale > 0) {
    console.error(`${counts.stale} note(s) out of date — run: make thumbs`)
    process.exitCode = 1
  }
}

main().catch((error) => {
  console.error(error.message)
  process.exitCode = 1
})
