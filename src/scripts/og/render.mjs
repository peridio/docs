// Offline rendering shared by the generator and the guard.
//
// Both paths call renderNote(), so `og:check` re-rendering a card and comparing
// bytes is a real freshness check: any change to a note's title, description,
// category or artwork, or to the template, shows up as a stale card.

import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { render } from 'takumi-js'
import { fromHtml } from 'takumi-js/helpers/html'
import { Renderer } from 'takumi-js/node'
import { cardHtml, escapeHtml } from './template.mjs'
import {
  OG_CANVAS,
  OG_FIELD_NOTES_TITLE,
  OG_FONTS,
  OG_FONT_FILES,
  OG_LAYOUT as L,
  OG_MAX_BYTES,
} from './tokens.mjs'

const FONT_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), 'fonts')

/**
 * Load the vendored variable fonts.
 *
 * The byte check matters: takumi finds no system font and does not say so. A
 * missing or truncated face falls back to a subset font and rasterises copy
 * that looks almost right, which a clean exit code would hide.
 */
export async function loadFonts() {
  return Promise.all(
    OG_FONT_FILES.map(async ([file, bytes]) => {
      const buffer = await readFile(path.join(FONT_DIR, file))
      if (buffer.length !== bytes)
        throw new Error(`${file}: expected the full ${bytes}-byte variable TTF`)
      return buffer
    })
  )
}

const normalize = (value) =>
  String(value ?? '')
    .trim()
    .replace(/\s+/g, ' ')

// One measuring renderer per font set, built lazily.
const measurers = new WeakMap()
async function measure(text, fonts, { size, weight = 400, spacing = 0, mono = false }) {
  let renderer = measurers.get(fonts)
  if (!renderer) {
    renderer = new Renderer()
    for (const font of fonts) await renderer.registerFont(font)
    measurers.set(fonts, renderer)
  }
  const { node } = fromHtml(
    `<span style="font-family:'${mono ? OG_FONTS.mono : OG_FONTS.body}';font-size:${size}px;font-weight:${weight};letter-spacing:${spacing}px;">${escapeHtml(text)}</span>`
  )
  return (await renderer.measure(node)).width
}

/**
 * Greedy word wrap against measured glyph widths.
 *
 * Returns the lines, or null if the text needs more than maxLines or a single
 * word is wider than the column.
 */
export async function wrap(text, fonts, style, maxLines, width = L.textWidth) {
  const words = normalize(text).split(' ').filter(Boolean)
  const lines = []
  let current = ''
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word
    if ((await measure(candidate, fonts, style)) <= width) {
      current = candidate
      continue
    }
    if (!current) return null
    lines.push(current)
    if (lines.length >= maxLines) return null
    current = word
    if ((await measure(current, fonts, style)) > width) return null
  }
  if (current) lines.push(current)
  return lines.length <= maxLines ? lines : null
}

/**
 * Trim a description to the kicker budget by dropping whole trailing
 * sentences. Descriptions run two or three sentences, so this reads naturally
 * and needs no ellipsis. A first sentence already over budget is kept; the
 * fitter below cuts it at a word boundary if it still does not fit.
 */
export function clampKicker(text, max = L.kickerMaxChars) {
  const kicker = normalize(text)
  if (kicker.length <= max) return kicker
  // Split only where terminal punctuation is followed by whitespace, so
  // "i.MX93" or "v1.2" never ends a sentence.
  const sentences = kicker.split(/(?<=[.!?])\s+/)
  let kept = ''
  for (const sentence of sentences) {
    const next = kept ? `${kept} ${sentence}` : sentence
    if (next.length > max) break
    kept = next
  }
  return kept || sentences[0]
}

async function fitTitle(title, fonts, fit = L) {
  for (let size = fit.titleMaxSize; size >= fit.titleMinSize; size -= 2) {
    const maxLines = Math.min(
      fit.titleMaxLines,
      Math.floor(fit.titleMaxHeight / (size * L.titleLineHeight))
    )
    const lines = await wrap(
      title,
      fonts,
      { size, weight: L.titleWeight, spacing: L.titleSpacing },
      maxLines
    )
    if (lines) return { titleSize: size, titleLines: lines }
  }
  throw new Error(
    `title does not fit ${fit.titleMaxLines} lines at the ${fit.titleMinSize}px minimum; shorten it`
  )
}

async function fitKicker(kicker, fonts) {
  if (!kicker) return []
  const style = { size: L.kickerSize }
  const whole = await wrap(kicker, fonts, style, L.kickerMaxLines)
  if (whole) return whole
  // Cut at a word boundary until it fits, marking the cut with an ellipsis.
  const words = kicker.split(' ')
  for (let n = words.length - 1; n > 0; n -= 1) {
    const cut = `${words
      .slice(0, n)
      .join(' ')
      .replace(/[,;:.!?-]+$/, '')}…`
    const lines = await wrap(cut, fonts, style, L.kickerMaxLines)
    if (lines) return lines
  }
  throw new Error('description cannot fit the kicker')
}

/** The artwork as a local PNG data URL, sized to the slot it fills. */
async function artworkDataUrl(file) {
  if (!file) return null
  // First frame only for animated sources: a card is a still.
  const png = await sharp(file, { pages: 1 })
    .resize(L.imageWidth, OG_CANVAS.height, { fit: 'cover', position: 'centre' })
    .png()
    .toBuffer()
  return `data:image/png;base64,${png.toString('base64')}`
}

/** Resolve a note's copy into a card whose text is known to fit. */
export async function prepareCard(note, fonts) {
  const title = normalize(note.title)
  if (!title) throw new Error('missing title')
  // Docs pages pass their family's eyebrow; Field Notes derive it from the
  // category and use the tighter two-line title fit.
  const isFieldNote = !note.eyebrow
  const eyebrow = note.eyebrow
    ? normalize(note.eyebrow)
    : note.category
      ? `Field Notes · ${normalize(note.category)}`
      : 'Field Notes'
  if (
    (await measure(eyebrow.toUpperCase(), fonts, {
      size: L.eyebrowSize,
      spacing: L.eyebrowSpacing,
      mono: true,
    })) >
    L.textWidth - 25
  )
    throw new Error(`eyebrow ${JSON.stringify(eyebrow)} is too wide`)
  return {
    eyebrow,
    title,
    ...(await fitTitle(title, fonts, isFieldNote ? { ...L, ...OG_FIELD_NOTES_TITLE } : L)),
    kickerLines: await fitKicker(clampKicker(note.description), fonts),
    image: await artworkDataUrl(note.artwork),
  }
}

async function renderHtml(html, fonts) {
  const { node, stylesheets } = fromHtml(html)
  return Buffer.from(await render(node, { ...OG_CANVAS, fonts, stylesheets, format: 'png' }))
}

/**
 * Bring an artwork card under the byte cap without dulling the copy.
 *
 * Dithered artwork faded through a gradient produces thousands of near-equal
 * colours that PNG's filters cannot compress. Palette-quantize the whole card,
 * then restore every foreground pixel (copy, rule, lockup) from the original
 * render, using a foreground-only render on black as the mask. Same approach
 * as apex's photographic use-case cards.
 *
 * libvips sizes the palette by PNG bit depth, so 256 and 16 are the distinct
 * steps worth trying.
 */
async function quantizeArtwork(full, card, fonts) {
  const raw = (buffer) => sharp(buffer).removeAlpha().raw().toBuffer()
  const original = await raw(full)
  const mask = await raw(await renderHtml(cardHtml(card, { foregroundOnly: true }), fonts))
  let smallest
  for (const colours of [256, 16]) {
    const pixels = await raw(
      await sharp(full).png({ palette: true, colours, dither: 0 }).toBuffer()
    )
    for (let i = 0; i < pixels.length; i += 3) {
      if (mask[i] || mask[i + 1] || mask[i + 2]) {
        pixels[i] = original[i]
        pixels[i + 1] = original[i + 1]
        pixels[i + 2] = original[i + 2]
      }
    }
    smallest = await sharp(pixels, { raw: { ...OG_CANVAS, channels: 3 } })
      .png({ compressionLevel: 9 })
      .toBuffer()
    if (smallest.length <= OG_MAX_BYTES) break
  }
  return smallest
}

/** Render one note's card to PNG bytes. */
export async function renderNote(note, fonts) {
  let card
  try {
    card = await prepareCard(note, fonts)
  } catch (error) {
    throw new Error(`${note.slug}: ${error.message}`, { cause: error })
  }
  const full = await renderHtml(cardHtml(card), fonts)
  let buffer = await sharp(full).png({ compressionLevel: 9 }).toBuffer()
  if (buffer.length > OG_MAX_BYTES && card.image) buffer = await quantizeArtwork(full, card, fonts)
  if (buffer.length > OG_MAX_BYTES)
    throw new Error(
      `${note.slug}: card is ${buffer.length} bytes, over the ${OG_MAX_BYTES}-byte cap`
    )
  return { buffer, card }
}
