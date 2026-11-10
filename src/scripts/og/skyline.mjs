// The artwork behind docs-page cards: a pixel skyline in the card's purple ramp.
//
// Field Notes carry their own dithered artwork; docs pages had none, so their
// cards were type on a black ground. This draws one at render time instead of
// committing ~250 images. Columns rise from left to right with a lit cap and a
// few accent cells, on a grid of square cells with a one-pixel gutter so they
// read as pixels. Heights come from a generator seeded by the family key, so
// every card in a family shares one skyline and a rebuild produces the same
// bytes.
//
// This is the first (v1) composition, picked from the OG design lab. OG_SKYLINE
// in tokens.mjs holds everything a further variation would change; a later
// pass can add more compositions per family without touching the renderer.

import sharp from 'sharp'
import { OG_CANVAS, OG_COLORS, OG_LAYOUT as L, OG_SKYLINE as S } from './tokens.mjs'

/** FNV-1a: a stable seed from a family key. */
export function seedFrom(key) {
  let h = 2166136261
  for (const ch of String(key)) h = Math.imul(h ^ ch.charCodeAt(0), 16777619)
  return h >>> 0
}

/** Linear congruential generator; enough randomness for column heights. */
function rng(seed) {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 2 ** 32
  }
}

/**
 * The skyline as a grid of palette indices: 0 is the ground, 1..ramp.length
 * the ramp from dark to light, and ramp.length + 1 the accent.
 */
export function skylineGrid(seed, cols, rows) {
  const r = rng(seed)
  const cap = S.ramp.length
  const accent = cap + 1
  const grid = Array.from({ length: rows }, () => new Array(cols).fill(0))
  for (let x = 0; x < cols; x++) {
    const rise = (x / cols) * S.rise
    const height = Math.min(rows, Math.max(1, Math.round(rows * (S.floor + rise + r() * S.jitter))))
    for (let k = 0; k < height; k++) {
      const y = rows - 1 - k
      if (k === height - 1) {
        grid[y][x] = cap
      } else {
        // Bodies darken toward the top of the column; a few cells light up.
        grid[y][x] = Math.max(1, cap - 1 - Math.floor((k / height) * 3))
        if (k > 1 && k < height - 2 && r() < S.accentRate) grid[y][x] = accent
      }
    }
  }
  return grid
}

const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16))

const cache = new Map()

/**
 * The skyline for a family, as a PNG the size of the card's artwork slot.
 * Memoised: a build renders ~250 cards from seven skylines.
 */
export function skylineArtwork(family) {
  if (cache.has(family)) return cache.get(family)
  const width = L.imageWidth
  const height = OG_CANVAS.height
  const cols = Math.ceil(width / S.cell)
  const rows = Math.ceil(height / S.cell)
  const palette = [OG_COLORS.ground, ...S.ramp, OG_COLORS.accent].map(rgb)
  const grid = skylineGrid(seedFrom(family), cols, rows)
  const pixels = Buffer.alloc(width * height * 3)
  for (let py = 0; py < height; py++) {
    for (let px = 0; px < width; px++) {
      const level = grid[Math.floor(py / S.cell)][Math.floor(px / S.cell)]
      // The last pixel row and column of a cell is a gutter, one step darker,
      // so neighbouring cells read as separate pixels.
      const gutter = px % S.cell === S.cell - 1 || py % S.cell === S.cell - 1
      pixels.set(palette[gutter && level ? level - 1 : level], (py * width + px) * 3)
    }
  }
  const png = sharp(pixels, { raw: { width, height, channels: 3 } })
    .png()
    .toBuffer()
  cache.set(family, png)
  return png
}
