// Which Field Notes get a card, and what goes on it.
//
// Inputs come straight from each note's front matter, so no build is needed
// before generating or checking. Front matter parsing is shared with the
// thumbnail pipeline (scripts/thumbnails/notes.js) so the two agree on what a
// note is.

import { existsSync } from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { cardTitle } from './headline.mjs'

const require = createRequire(import.meta.url)
const { listNoteFiles, readNote } = require('../thumbnails/notes.js')

export const SRC = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
export const NOTES_DIR = path.join(SRC, 'field-notes')
const STATIC = path.join(SRC, 'static')
const IMG_ROOT = path.join(STATIC, 'img', 'field-notes')

/** Where cards are written, and the public path they are served from. */
export const OUT_DIR = path.join(IMG_ROOT, 'og')
export const PUBLIC_DIR = '/img/field-notes/og'

const RASTER = /\.(png|jpe?g|gif|webp)$/i

/**
 * The artwork for a note's card, as an absolute file path, or null.
 *
 * Prefer the generated 1152x648 hero (the largest dithered output); fall back
 * to the front matter `image` when it is a local raster; otherwise the card is
 * type only.
 */
export function artworkFor(slug, frontMatter) {
  for (const ext of ['png', 'gif']) {
    const hero = path.join(IMG_ROOT, `${slug}-hero.${ext}`)
    if (existsSync(hero)) return hero
  }
  const image = typeof frontMatter.image === 'string' ? frontMatter.image.trim() : ''
  if (image.startsWith('/') && !image.startsWith('//') && RASTER.test(image)) {
    const file = path.join(STATIC, image)
    if (file.startsWith(STATIC + path.sep) && existsSync(file)) return file
  }
  return null
}

/**
 * Every published note, as card input.
 *
 * Drafts are skipped: Docusaurus drops them from production builds, so a card
 * would ship with nothing pointing at it.
 */
export function readNotes(dir = NOTES_DIR) {
  return listNoteFiles(dir)
    .map(readNote)
    .filter(({ frontMatter }) => frontMatter.draft !== true)
    .map(({ slug, frontMatter }) => ({
      slug,
      // `og_title` is an optional shorter headline for the card only; blank
      // means no override (see headline.mjs). The page title is unchanged.
      title: cardTitle(frontMatter.og_title, frontMatter.title),
      description: frontMatter.description,
      category: frontMatter.category,
      artwork: artworkFor(slug, frontMatter),
    }))
}

/**
 * Every note's description, drafts included, for the length rule in
 * og-cards.mjs. Drafts are held to it too, so a note does not pick up a
 * long description that only fails the day it is published.
 */
export function readDescriptions(dir = NOTES_DIR) {
  return listNoteFiles(dir)
    .map(readNote)
    .map(({ slug, frontMatter }) => ({
      slug,
      description: String(frontMatter.description ?? '').trim(),
    }))
}
