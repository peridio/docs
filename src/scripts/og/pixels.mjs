// The artwork behind docs-page cards: one abstract pixel composition per card
// family, in the card's purple ramp.
//
// Field Notes carry their own dithered artwork; docs pages draw theirs at
// render time instead of committing ~250 images. Every family shares the same
// grammar so the cards read as one set: square cells with a one-pixel darker
// gutter, the OG_PIXELS ramp, lit edges and a few accent cells, weighted to the
// right where the template's fade ends. What differs is the arrangement, so a
// family is recognisable at thumbnail size:
//
//   changelog      columns rising from the bottom (the v1 skyline)
//   dev-reference  dense streams falling from the top, bright heads
//   learn          short vertical dashes, more of them lit
//   product        a corner glow seen through a grid of single cells
//   hardware       a staggered grid of equal blocks, like a floorplan
//   reference      rows of different lengths, flush right, lit starts
//   default        the corner glow as an ordered dither
//
// Each composition is seeded from a fixed string (OG_PIXELS.compositions), so
// a rebuild produces the same bytes and the cards match the ones picked in the
// OG design lab.

import sharp from 'sharp'
import { OG_CANVAS, OG_COLORS, OG_LAYOUT as L, OG_PIXELS as P } from './tokens.mjs'

/** FNV-1a: a stable seed from a string. */
export function seedFrom(key) {
  let h = 2166136261
  for (const ch of String(key)) h = Math.imul(h ^ ch.charCodeAt(0), 16777619)
  return h >>> 0
}

/** Linear congruential generator; enough randomness for pixel placement. */
function rng(seed) {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 2 ** 32
  }
}

/** Smooth 2D value noise in 0..1. */
function noise2(seed) {
  const r = rng(seed)
  const table = Array.from({ length: 256 }, r)
  const hash = (x, y) => table[((x * 73856093) ^ (y * 19349663)) & 255]
  const smooth = (t) => t * t * (3 - 2 * t)
  return (x, y) => {
    const xi = Math.floor(x)
    const yi = Math.floor(y)
    const xf = smooth(x - xi)
    const yf = smooth(y - yi)
    const a = hash(xi, yi)
    const b = hash(xi + 1, yi)
    const c = hash(xi, yi + 1)
    const d = hash(xi + 1, yi + 1)
    return a + (b - a) * xf + (c - a) * yf + (a - b - c + d) * xf * yf
  }
}

const NOISE = noise2(101)
const clamp = (v) => Math.max(0, Math.min(1, v))
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16)

// Palette levels: 0 is the ground, 1..CAP the ramp from dark to light, and
// ACCENT the brand accent.
const CAP = P.ramp.length
const ACCENT = CAP + 1

/** Weight that leans a composition right (and a little down), 0 at u <= k. */
const right = (u, v, k = 0.25) => clamp((u - k) / (1 - k)) * (0.75 + 0.25 * v)

/** An empty grid of palette levels, with the drawing helpers the compositions use. */
export function makeGrid(cols, rows) {
  const g = Array.from({ length: rows }, () => new Array(cols).fill(0))
  const set = (x, y, level) => {
    if (y >= 0 && y < rows && x >= 0 && x < cols) g[y][x] = level
  }
  return {
    g,
    cols,
    rows,
    set,
    get: (x, y) => g[y]?.[x] ?? 0,
    /** A solid block: lit top row, body darkening upward. */
    block(x, y, w, h, { top = CAP, body = 3 } = {}) {
      for (let j = 0; j < h; j++)
        for (let i = 0; i < w; i++)
          set(x + i, y + j, j === 0 ? top : Math.max(1, body - Math.floor(((h - 1 - j) / h) * 2)))
    },
    /** A skyline column: lit cap, body darkening toward the top, a few accents. */
    column(x, height, r, { accentRate = P.accentRate } = {}) {
      height = Math.max(0, Math.min(rows, Math.round(height)))
      for (let k = 0; k < height; k++) {
        let level = k === height - 1 ? CAP : Math.max(1, CAP - 1 - Math.floor((k / height) * 3))
        if (k > 1 && k < height - 2 && r() < accentRate) level = ACCENT
        set(x, rows - 1 - k, level)
      }
    },
  }
}

/** Map a continuous field f(u, v, x, y) in 0..1 onto the ramp. */
function field(G, r, fn, { cut = 0.2, accent = 0.07 } = {}) {
  for (let y = 0; y < G.rows; y++)
    for (let x = 0; x < G.cols; x++) {
      const f = fn(x / G.cols, y / G.rows, x, y)
      if (f < cut) continue
      let level = 1 + Math.min(CAP - 1, Math.floor(((f - cut) / (1 - cut)) * CAP))
      if (level >= CAP - 1 && r() < accent) level = ACCENT
      G.set(x, y, level)
    }
}

/** A soft glow centred on (cx, cy) in unit coordinates, broken up by noise. */
const glow = (cx, cy, k, base) => (u, v, x, y) =>
  (base - Math.hypot(cx - u, cy - v) * k) * (0.75 + 0.4 * NOISE(x / 3, y / 3))

/** Every composition, by name. Each draws onto a grid with a seeded random source. */
export const COMPOSITIONS = {
  skyline(G, r) {
    const { floor, rise, jitter } = P.skyline
    for (let x = 0; x < G.cols; x++)
      G.column(x, Math.max(1, G.rows * (floor + (x / G.cols) * rise + r() * jitter)), r)
  },

  streams(G, r) {
    const passes = 3
    const min = 0.45
    for (let x = 6; x < G.cols; x++)
      for (let p = 0; p < passes; p++) {
        if (r() > min + (1 - min) * right(x / G.cols, 0.5, 0.2)) continue
        const head = Math.floor(r() * (G.rows + 4))
        const len = 4 + Math.floor(r() * 9)
        for (let i = 0; i < len; i++) {
          const y = head - i
          if (y < 0 || y >= G.rows) continue
          const level =
            i === 0 ? (r() < 0.35 ? ACCENT : CAP) : Math.max(1, CAP - 1 - Math.floor((i / len) * 4))
          G.set(x, y, Math.max(G.get(x, y), level))
        }
      }
  },

  dashes(G, r) {
    const min = 0.3
    for (let x = 7; x < G.cols; x++) {
      const w = right(x / G.cols, 0.5, 0.25)
      let y = Math.floor(r() * 3)
      while (y < G.rows) {
        const len = 1 + Math.floor(r() * 4)
        if (r() < min + (1 - min) * w)
          for (let i = 0; i < len; i++)
            G.set(
              x,
              y + i,
              i === 0
                ? r() < 0.25
                  ? ACCENT
                  : Math.min(CAP, 2 + Math.round(w * 3))
                : Math.min(CAP - 1, Math.max(1, Math.round(1 + w * 2.5 + r())))
            )
        y += len + 1
      }
    }
  },

  glowGrid(G, r) {
    const lit = glow(1, 1, 1.15, 1.3)
    field(G, r, (u, v, x, y) => (x % 2 || y % 2 ? 0 : lit(u, v, x, y)))
  },

  banks(G, r) {
    const size = 3
    const pitch = 4
    for (let y = 0, row = 0; y < G.rows; y += pitch, row++)
      for (let x = 8 + (row % 2 ? Math.floor(pitch / 2) : 0); x < G.cols; x += pitch) {
        const w = right(x / G.cols, y / G.rows, 0.25)
        if (r() > 0.4 + 0.8 * w) continue
        G.block(x, y, size, size, {
          top: r() < 0.15 ? ACCENT : CAP,
          body: 1 + Math.floor(r() * (1 + w * 2.5)),
        })
      }
  },

  rows(G, r) {
    for (let y = 0; y < G.rows; y += 2) {
      const len = 4 + Math.floor(r() * (G.cols - 12))
      const x0 = G.cols - len
      for (let x = x0; x < G.cols; x++)
        G.set(
          x,
          y,
          x === x0
            ? r() < 0.2
              ? ACCENT
              : CAP
            : Math.max(1, Math.round(1 + right(x / G.cols, 0.5, 0.25) * 2.5))
        )
    }
  },

  dither(G, r) {
    for (let y = 0; y < G.rows; y++)
      for (let x = 0; x < G.cols; x++) {
        const f = clamp(1.15 - Math.hypot(1 - x / G.cols, 1 - y / G.rows) * 1.25)
        if (f > BAYER[(y % 4) * 4 + (x % 4)])
          G.set(x, y, r() < 0.04 ? ACCENT : Math.max(1, Math.round(f * CAP)))
      }
  },
}

/** A family's composition as a grid of palette levels. */
export function familyGrid(family, cols, rows) {
  const spec = P.compositions[family] ?? P.compositions.default
  const G = makeGrid(cols, rows)
  COMPOSITIONS[spec.draw](G, rng(seedFrom(spec.seed)))
  return G.g
}

const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16))

const cache = new Map()

/**
 * A family's artwork, as a PNG the size of the card's artwork slot.
 * Memoised: a build renders ~250 cards from seven compositions.
 */
export function familyArtwork(family) {
  if (cache.has(family)) return cache.get(family)
  const width = L.imageWidth
  const height = OG_CANVAS.height
  const cell = P.cell
  const palette = [OG_COLORS.ground, ...P.ramp, OG_COLORS.accent].map(rgb)
  const grid = familyGrid(family, Math.ceil(width / cell), Math.ceil(height / cell))
  const pixels = Buffer.alloc(width * height * 3)
  for (let py = 0; py < height; py++) {
    for (let px = 0; px < width; px++) {
      const level = grid[Math.floor(py / cell)][Math.floor(px / cell)]
      // The last pixel row and column of a cell is a gutter, one step darker,
      // so neighbouring cells read as separate pixels.
      const gutter = px % cell === cell - 1 || py % cell === cell - 1
      pixels.set(palette[gutter && level ? level - 1 : level], (py * width + px) * 3)
    }
  }
  const png = sharp(pixels, { raw: { width, height, channels: 3 } })
    .png()
    .toBuffer()
  cache.set(family, png)
  return png
}
