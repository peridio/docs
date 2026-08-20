#!/usr/bin/env node

// A small, self-contained QR encoder — just enough of ISO/IEC 18004 to put a
// scannable dev-server URL in the terminal, without pulling a dependency into
// the tree for it.
//
// Deliberately narrow scope:
//   - byte mode only (URLs are ASCII, and byte mode covers UTF-8 anyway)
//   - versions 1–6, error correction level M with an L fallback
//
// Versions 1–6 are the sweet spot: 6-L holds 134 bytes, far more than any
// http://<lan-ip>:<port>/<baseUrl> will ever need, and stopping below version 7
// means there are no version-information blocks to place and the character
// count indicator is always 8 bits. Anything longer throws rather than silently
// producing a code no phone can read.
//
// Cross-checked against a real decoder — see qr.test.js.

// ---------------------------------------------------------------------------
// GF(256) arithmetic, over the QR field polynomial x^8 + x^4 + x^3 + x^2 + 1.
// ---------------------------------------------------------------------------

const EXP = new Uint8Array(512)
const LOG = new Uint8Array(256)

{
  let x = 1
  for (let i = 0; i < 255; i++) {
    EXP[i] = x
    LOG[x] = i
    x <<= 1
    if (x & 0x100) x ^= 0x11d
  }
  for (let i = 255; i < 512; i++) EXP[i] = EXP[i - 255]
}

function gmul(a, b) {
  if (a === 0 || b === 0) return 0
  return EXP[LOG[a] + LOG[b]]
}

// Generator polynomial for `degree` error correction codewords:
// g(x) = (x - a^0)(x - a^1)...(x - a^(degree-1)), coefficients highest-first.
function generatorPoly(degree) {
  let poly = [1]
  for (let i = 0; i < degree; i++) {
    const next = new Array(poly.length + 1).fill(0)
    for (let j = 0; j < poly.length; j++) {
      next[j] ^= poly[j]
      next[j + 1] ^= gmul(poly[j], EXP[i])
    }
    poly = next
  }
  return poly
}

// Reed–Solomon remainder of `data` divided by the degree-`count` generator.
function errorCorrection(data, count) {
  const gen = generatorPoly(count)
  const rem = new Array(count).fill(0)
  for (const byte of data) {
    const factor = byte ^ rem[0]
    rem.shift()
    rem.push(0)
    for (let i = 0; i < count; i++) rem[i] ^= gmul(gen[i + 1], factor)
  }
  return rem
}

// ---------------------------------------------------------------------------
// Version tables (ISO/IEC 18004 tables 7 and 9, versions 1–6 only).
// ---------------------------------------------------------------------------

// Total codewords (data + error correction) per version.
const TOTAL_CODEWORDS = { 1: 26, 2: 44, 3: 70, 4: 100, 5: 134, 6: 172 }

// [error correction codewords per block, number of blocks]. Every version/level
// pair below happens to use equal-sized blocks, which keeps interleaving simple.
const BLOCK_LAYOUT = {
  1: { L: [7, 1], M: [10, 1] },
  2: { L: [10, 1], M: [16, 1] },
  3: { L: [15, 1], M: [26, 1] },
  4: { L: [20, 1], M: [18, 2] },
  5: { L: [26, 1], M: [24, 2] },
  6: { L: [18, 2], M: [16, 4] },
}

// The 2-bit level indicator that goes into the format information.
const EC_FORMAT_BITS = { L: 1, M: 0, Q: 3, H: 2 }

const MIN_VERSION = 1
const MAX_VERSION = 6

function dataCodewords(version, ecLevel) {
  const [ecPerBlock, blocks] = BLOCK_LAYOUT[version][ecLevel]
  return TOTAL_CODEWORDS[version] - ecPerBlock * blocks
}

// Byte-mode payload capacity: total data codewords minus the 4-bit mode
// indicator and the 8-bit character count, rounded down to whole bytes.
function byteCapacity(version, ecLevel) {
  return dataCodewords(version, ecLevel) - 2
}

// ---------------------------------------------------------------------------
// Bit stream assembly.
// ---------------------------------------------------------------------------

function buildCodewords(bytes, version, ecLevel) {
  const bits = []
  const push = (value, length) => {
    for (let i = length - 1; i >= 0; i--) bits.push((value >> i) & 1)
  }

  push(0b0100, 4) // byte mode
  push(bytes.length, 8) // character count (8 bits for byte mode below version 10)
  for (const byte of bytes) push(byte, 8)

  const capacityBits = dataCodewords(version, ecLevel) * 8
  push(0, Math.min(4, capacityBits - bits.length)) // terminator
  while (bits.length % 8 !== 0) bits.push(0)

  const codewords = []
  for (let i = 0; i < bits.length; i += 8) {
    let byte = 0
    for (let j = 0; j < 8; j++) byte = (byte << 1) | bits[i + j]
    codewords.push(byte)
  }

  // Alternating pad codewords fill whatever the payload left over.
  const pad = [0xec, 0x11]
  for (let i = 0; codewords.length < capacityBits / 8; i++) codewords.push(pad[i % 2])

  return codewords
}

// Split into blocks, append each block's error correction, then interleave —
// data codeword i of every block, then error correction codeword i of every
// block. Interleaving is what lets a localised smudge damage a little of each
// block rather than destroying one block outright.
function interleave(codewords, version, ecLevel) {
  const [ecPerBlock, blockCount] = BLOCK_LAYOUT[version][ecLevel]
  const perBlock = codewords.length / blockCount

  const blocks = []
  for (let i = 0; i < blockCount; i++) {
    const data = codewords.slice(i * perBlock, (i + 1) * perBlock)
    blocks.push({ data, ec: errorCorrection(data, ecPerBlock) })
  }

  const result = []
  for (let i = 0; i < perBlock; i++) for (const block of blocks) result.push(block.data[i])
  for (let i = 0; i < ecPerBlock; i++) for (const block of blocks) result.push(block.ec[i])
  return result
}

// ---------------------------------------------------------------------------
// Matrix construction.
// ---------------------------------------------------------------------------

function formatBits(ecLevel, mask) {
  const data = (EC_FORMAT_BITS[ecLevel] << 3) | mask
  let rem = data
  for (let i = 0; i < 10; i++) rem = (rem << 1) ^ ((rem >>> 9) * 0x537) // BCH(15,5)
  return ((data << 10) | rem) ^ 0x5412
}

function maskBit(mask, row, col) {
  switch (mask) {
    case 0:
      return (row + col) % 2 === 0
    case 1:
      return row % 2 === 0
    case 2:
      return col % 3 === 0
    case 3:
      return (row + col) % 3 === 0
    case 4:
      return (Math.floor(row / 2) + Math.floor(col / 3)) % 2 === 0
    case 5:
      return ((row * col) % 2) + ((row * col) % 3) === 0
    case 6:
      return (((row * col) % 2) + ((row * col) % 3)) % 2 === 0
    default:
      return (((row + col) % 2) + ((row * col) % 3)) % 2 === 0
  }
}

function createGrid(version) {
  const size = version * 4 + 17
  const modules = Array.from({ length: size }, () => new Uint8Array(size))
  const reserved = Array.from({ length: size }, () => new Uint8Array(size))

  const set = (row, col, dark) => {
    if (row < 0 || row >= size || col < 0 || col >= size) return
    modules[row][col] = dark ? 1 : 0
    reserved[row][col] = 1
  }

  // Finder patterns, drawn one module wider on every side so the separators
  // fall out of the same loop.
  for (const [top, left] of [
    [0, 0],
    [0, size - 7],
    [size - 7, 0],
  ]) {
    for (let r = -1; r <= 7; r++) {
      for (let c = -1; c <= 7; c++) {
        const onRing =
          r >= 0 && r <= 6 && c >= 0 && c <= 6 && (r === 0 || r === 6 || c === 0 || c === 6)
        const inCore = r >= 2 && r <= 4 && c >= 2 && c <= 4
        set(top + r, left + c, onRing || inCore)
      }
    }
  }

  // Timing patterns.
  for (let i = 8; i < size - 8; i++) {
    set(6, i, i % 2 === 0)
    set(i, 6, i % 2 === 0)
  }

  // Versions 2–6 carry exactly one alignment pattern, centred just inside the
  // bottom-right corner. (Version 1 has none; version 7+ has a grid of them.)
  if (version >= 2) {
    const centre = version * 4 + 10
    for (let r = -2; r <= 2; r++) {
      for (let c = -2; c <= 2; c++) {
        set(centre + r, centre + c, Math.max(Math.abs(r), Math.abs(c)) !== 1)
      }
    }
  }

  // Reserve the format information strips; the real bits land after masking.
  // Index 6 is skipped in both: the strips step over the timing patterns.
  for (let i = 0; i <= 8; i++) {
    if (i === 6) continue
    set(8, i, false)
    set(i, 8, false)
  }
  for (let i = 0; i < 8; i++) {
    set(8, size - 1 - i, false)
    set(size - 1 - i, 8, false)
  }
  set(size - 8, 8, true) // the always-dark module

  return { size, modules, reserved }
}

// Zigzag placement: two-module-wide columns walked right to left, alternating
// upward and downward, skipping the vertical timing column.
function placeData(grid, codewords) {
  const { size, modules, reserved } = grid
  let bit = 0
  const total = codewords.length * 8

  for (let right = size - 1; right >= 1; right -= 2) {
    if (right === 6) right = 5
    for (let vert = 0; vert < size; vert++) {
      for (let j = 0; j < 2; j++) {
        const col = right - j
        const upward = ((right + 1) & 2) === 0
        const row = upward ? size - 1 - vert : vert
        if (reserved[row][col] || bit >= total) continue
        modules[row][col] = (codewords[bit >>> 3] >> (7 - (bit & 7))) & 1
        bit++
      }
    }
  }
}

function applyMask(grid, mask) {
  const { size, modules, reserved } = grid
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (!reserved[row][col] && maskBit(mask, row, col)) modules[row][col] ^= 1
    }
  }
}

// The 15 format bits are written twice, so a symbol survives damage to either
// corner. Both copies step around the timing patterns, and the second one stops
// short of the always-dark module at (size - 8, 8).
function placeFormat(grid, ecLevel, mask) {
  const { size, modules } = grid
  const bits = formatBits(ecLevel, mask)
  const bit = (i) => (bits >> i) & 1

  // First copy: down column 8, then left along row 8, around the top-left finder.
  for (let i = 0; i <= 5; i++) modules[i][8] = bit(i)
  modules[7][8] = bit(6)
  modules[8][8] = bit(7)
  modules[8][7] = bit(8)
  for (let i = 9; i <= 14; i++) modules[8][14 - i] = bit(i)

  // Second copy: leftwards along row 8 under the top-right finder, then up
  // column 8 beside the bottom-left finder.
  for (let i = 0; i <= 7; i++) modules[8][size - 1 - i] = bit(i)
  for (let i = 8; i <= 14; i++) modules[size - 15 + i][8] = bit(i)
  modules[size - 8][8] = 1 // always dark
}

// ---------------------------------------------------------------------------
// Mask selection (ISO/IEC 18004 §8.8.2). Lower is better.
// ---------------------------------------------------------------------------

const FINDER_RUN = [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0]

function penalty(grid) {
  const { size, modules } = grid
  let score = 0

  // Rule 1 — runs of five or more identical modules in a row or column.
  for (const byRow of [true, false]) {
    for (let a = 0; a < size; a++) {
      let run = 1
      for (let b = 1; b < size; b++) {
        const prev = byRow ? modules[a][b - 1] : modules[b - 1][a]
        const curr = byRow ? modules[a][b] : modules[b][a]
        if (curr === prev) {
          run++
          if (run === 5) score += 3
          else if (run > 5) score += 1
        } else {
          run = 1
        }
      }
    }
  }

  // Rule 2 — every 2x2 block of a single colour.
  for (let row = 0; row < size - 1; row++) {
    for (let col = 0; col < size - 1; col++) {
      const m = modules[row][col]
      if (
        m === modules[row][col + 1] &&
        m === modules[row + 1][col] &&
        m === modules[row + 1][col + 1]
      ) {
        score += 3
      }
    }
  }

  // Rule 3 — finder-lookalike 1:1:3:1:1 runs with four light modules beside
  // them, in either orientation, horizontally or vertically.
  for (const byRow of [true, false]) {
    for (let a = 0; a < size; a++) {
      for (let b = 0; b + FINDER_RUN.length <= size; b++) {
        let forward = true
        let backward = true
        for (let k = 0; k < FINDER_RUN.length; k++) {
          const m = byRow ? modules[a][b + k] : modules[b + k][a]
          if (m !== FINDER_RUN[k]) forward = false
          if (m !== FINDER_RUN[FINDER_RUN.length - 1 - k]) backward = false
        }
        if (forward) score += 40
        if (backward) score += 40
      }
    }
  }

  // Rule 4 — deviation from an even split of dark and light.
  let dark = 0
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) dark += modules[row][col]
  }
  const percent = (dark * 100) / (size * size)
  score += Math.floor(Math.abs(percent - 50) / 5) * 10

  return score
}

// ---------------------------------------------------------------------------
// Public API.
// ---------------------------------------------------------------------------

/**
 * Encode `text` as a QR symbol.
 *
 * @param {string} text
 * @param {{ecLevel?: 'L'|'M'}} [options] error correction level; defaults to M,
 *   falling back to L when the payload does not fit at M.
 * @returns {{version: number, ecLevel: string, mask: number, size: number, modules: Uint8Array[]}}
 *   `modules[row][col]` is 1 for a dark module.
 */
function encode(text, options = {}) {
  const bytes = Array.from(Buffer.from(String(text), 'utf8'))

  const levels = options.ecLevel ? [options.ecLevel] : ['M', 'L']
  let version = null
  let ecLevel = null
  for (const level of levels) {
    for (let v = MIN_VERSION; v <= MAX_VERSION; v++) {
      if (bytes.length <= byteCapacity(v, level)) {
        version = v
        ecLevel = level
        break
      }
    }
    if (version) break
  }
  if (!version) {
    throw new Error(
      `QR payload of ${bytes.length} bytes exceeds the ${byteCapacity(MAX_VERSION, 'L')}-byte ` +
        `limit of this encoder (versions ${MIN_VERSION}–${MAX_VERSION})`
    )
  }

  const codewords = interleave(buildCodewords(bytes, version, ecLevel), version, ecLevel)

  // Build the symbol under each of the eight masks and keep the least ugly one;
  // scanners cope far better with a code that has no large uniform patches.
  let best = null
  for (let mask = 0; mask < 8; mask++) {
    const grid = createGrid(version)
    placeData(grid, codewords)
    applyMask(grid, mask)
    placeFormat(grid, ecLevel, mask)
    const score = penalty(grid)
    if (!best || score < best.score) best = { score, mask, grid }
  }

  return {
    version,
    ecLevel,
    mask: best.mask,
    size: best.grid.size,
    modules: best.grid.modules,
  }
}

const UPPER_HALF = '▀'
const FULL_BLOCK = '█'

/**
 * Render an encoded symbol for a terminal, two module rows per text row.
 *
 * With `color` the modules are painted with explicit black/white ANSI colours,
 * so the code scans on a light or a dark terminal alike. Without it the output
 * is plain block characters, which only reads correctly on a light background.
 *
 * @param {{size: number, modules: Uint8Array[]}} symbol
 * @param {{quietZone?: number, color?: boolean}} [options]
 * @returns {string}
 */
function render(symbol, options = {}) {
  const quiet = options.quietZone ?? 4
  const color = options.color ?? true
  const { size, modules } = symbol

  const padded = size + quiet * 2
  const at = (row, col) => {
    const r = row - quiet
    const c = col - quiet
    if (r < 0 || r >= size || c < 0 || c >= size) return 0
    return modules[r][c]
  }

  const lines = []
  for (let row = 0; row < padded; row += 2) {
    let line = ''
    for (let col = 0; col < padded; col++) {
      const top = at(row, col)
      const bottom = row + 1 < padded ? at(row + 1, col) : 0
      if (color) {
        // Foreground paints the upper half-block, background the lower half.
        line += `\x1b[${top ? 30 : 97};${bottom ? 40 : 107}m${UPPER_HALF}`
      } else {
        line += top && bottom ? FULL_BLOCK : top ? UPPER_HALF : bottom ? '▄' : ' '
      }
    }
    lines.push(color ? `${line}\x1b[0m` : line)
  }
  return lines.join('\n')
}

module.exports = { encode, render, byteCapacity, MIN_VERSION, MAX_VERSION }
