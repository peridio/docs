#!/usr/bin/env node
// Open Graph cards for Field Notes: one 1200x630 PNG per published note.
//
//   npm --prefix src run og               # render every card, write on success
//   npm --prefix src run og -- --check    # guard: fail on missing/stale/orphan
//
// Cards are committed, not rendered during `docusaurus build`: scrapers fetch
// og:image cold, and a committed PNG is the version guaranteed to be there.
// The --check mode is what keeps committed cards honest. It re-renders every
// card in memory and compares bytes, so editing a note's title, description,
// category or artwork without regenerating fails CI.
//
// src/theme/BlogPostPage/Metadata reads manifest.json to decide which posts
// have a card and what its alt text is, so the manifest is the single list of
// cards and the alt text is always the headline the card actually renders.

import { createHash } from 'node:crypto'
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { pathToFileURL } from 'node:url'
import { OUT_DIR, readDescriptions, readNotes } from './og/notes.mjs'
import { loadFonts, renderNote } from './og/render.mjs'
import { OG_CANVAS, OG_DESCRIPTION_MAX, OG_MAX_BYTES } from './og/tokens.mjs'

const MANIFEST = path.join(OUT_DIR, 'manifest.json')
const sha256 = (buffer) => createHash('sha256').update(buffer).digest('hex')

// Every note, drafts included, must keep its description at or under
// OG_DESCRIPTION_MAX; both `og` and `og:check` fail otherwise.
export const DESCRIPTION_MAX = OG_DESCRIPTION_MAX

async function renderAll() {
  const fonts = await loadFonts()
  const rendered = []
  for (const note of readNotes()) {
    const { buffer, card } = await renderNote(note, fonts)
    rendered.push({ note, buffer, card })
  }
  return rendered
}

function manifestFor(rendered) {
  const cards = {}
  for (const { note, buffer, card } of rendered) {
    cards[note.slug] = {
      alt: card.title,
      bytes: buffer.length,
      sha256: sha256(buffer),
    }
  }
  return {
    generatedFrom: 'scripts/og-cards.mjs',
    width: OG_CANVAS.width,
    height: OG_CANVAS.height,
    cards,
  }
}

/** Notes whose description is over DESCRIPTION_MAX, as problem strings. */
export function descriptionProblems(notes = readDescriptions()) {
  return notes
    .filter(({ description }) => description.length > DESCRIPTION_MAX)
    .map(
      ({ slug, description }) =>
        `${slug}: description is ${description.length} chars, over the ${DESCRIPTION_MAX}-char limit (search snippets and link previews cut it off)`
    )
}

function failOnDescriptions() {
  const problems = descriptionProblems()
  if (!problems.length) return
  console.error('Field Notes descriptions too long:')
  for (const problem of problems) console.error(`- ${problem}`)
  console.error(`\nShorten each description to ${DESCRIPTION_MAX} characters or fewer.`)
  process.exit(1)
}

/**
 * Generate. Nothing is written until every card has rendered and passed every
 * check, so a failing run leaves the committed cards exactly as they were.
 */
async function generate() {
  failOnDescriptions()
  const rendered = await renderAll()
  await rm(OUT_DIR, { recursive: true, force: true })
  await mkdir(OUT_DIR, { recursive: true })
  for (const { note, buffer } of rendered)
    await writeFile(path.join(OUT_DIR, `${note.slug}.png`), buffer)
  await writeFile(MANIFEST, `${JSON.stringify(manifestFor(rendered), null, 2)}\n`)

  const total = rendered.reduce((sum, { buffer }) => sum + buffer.length, 0)
  const textOnly = rendered.filter(({ note }) => !note.artwork).map(({ note }) => note.slug)
  console.log(
    `Generated ${rendered.length} Field Notes cards (${(total / 1024).toFixed(0)} KB) in ${path.relative(process.cwd(), OUT_DIR)}`
  )
  if (textOnly.length) console.log(`  type-only (no artwork found): ${textOnly.join(', ')}`)
}

async function check() {
  const problems = [...descriptionProblems()]
  let manifest
  try {
    manifest = JSON.parse(await readFile(MANIFEST, 'utf8'))
  } catch {
    console.error(
      `OG check failed:\n- ${path.relative(process.cwd(), MANIFEST)} is missing or unreadable. Run \`npm run og\`.`
    )
    process.exit(1)
  }

  const rendered = await renderAll()
  const expected = manifestFor(rendered)
  const onDisk = new Set((await readdir(OUT_DIR)).filter((file) => file.endsWith('.png')))

  if (manifest.width !== expected.width || manifest.height !== expected.height)
    problems.push(
      `manifest declares ${manifest.width}x${manifest.height}, expected ${expected.width}x${expected.height}`
    )

  for (const [slug, want] of Object.entries(expected.cards)) {
    const file = `${slug}.png`
    const have = manifest.cards?.[slug]
    if (!onDisk.has(file)) {
      problems.push(`${slug}: no card (expected static/img/field-notes/og/${file})`)
      continue
    }
    onDisk.delete(file)
    const bytes = await readFile(path.join(OUT_DIR, file))
    if (bytes.length > OG_MAX_BYTES)
      problems.push(`${file}: ${bytes.length} bytes exceeds the ${OG_MAX_BYTES}-byte cap`)
    if (sha256(bytes) !== want.sha256)
      problems.push(`${file}: stale, the note or the template changed since it was rendered`)
    if (!have) problems.push(`${slug}: card on disk but missing from manifest.json`)
    else if (have.sha256 !== sha256(bytes) || have.bytes !== bytes.length || have.alt !== want.alt)
      problems.push(`${slug}: manifest.json disagrees with the card`)
  }
  for (const slug of Object.keys(manifest.cards ?? {}))
    if (!expected.cards[slug])
      problems.push(`${slug}: manifest entry for a note that is gone or a draft`)
  for (const file of onDisk) problems.push(`${file}: orphan card, no published note has this slug`)

  if (problems.length) {
    console.error('OG check failed:')
    for (const problem of problems) console.error(`- ${problem}`)
    console.error('\nRegenerate with `npm --prefix src run og` and commit the result.')
    process.exit(1)
  }
  console.log(
    `OG check passed: ${rendered.length} Field Notes cards, all current; every description is at most ${DESCRIPTION_MAX} chars.`
  )
}

// Only run when executed directly, so tests can import the rule.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href)
  await (process.argv.includes('--check') ? check() : generate())
