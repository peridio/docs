// Tests for the hand-rolled QR encoder in qr.js.
//
// A QR code is either scannable or it is not, and "looks like a QR code" is no
// evidence of anything — the version that shipped past the first draft of this
// file had a mirrored format-information copy and two clobbered timing modules,
// and still rendered as a perfectly plausible square of dots. So rather than
// snapshot the encoder's own output and call it a day, most of what follows
// reads the symbol back the way a scanner does, using layout rules re-derived
// here instead of imported from qr.js.
//
// The encoder was also checked against a real decoder while it was written:
// every payload length from 1 to 134 bytes was rendered to a PNG and read back
// with macOS CoreImage's CIDetector. That check needs macOS and sharp, so it is
// not part of this suite; the round-trip below is the portable stand-in.

const test = require('node:test')
const assert = require('node:assert/strict')

const { encode, render, byteCapacity, MAX_VERSION } = require('./qr')

// ---------------------------------------------------------------------------
// An independent reader. Nothing below imports layout knowledge from qr.js.
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
const gmul = (a, b) => (a === 0 || b === 0 ? 0 : EXP[LOG[a] + LOG[b]])

// Re-transcribed from ISO/IEC 18004 table 9: [ec codewords per block, blocks].
const LAYOUT = {
  1: { L: [7, 1], M: [10, 1] },
  2: { L: [10, 1], M: [16, 1] },
  3: { L: [15, 1], M: [26, 1] },
  4: { L: [20, 1], M: [18, 2] },
  5: { L: [26, 1], M: [24, 2] },
  6: { L: [18, 2], M: [16, 4] },
}
const TOTAL = { 1: 26, 2: 44, 3: 70, 4: 100, 5: 134, 6: 172 }

const MASK = [
  (r, c) => (r + c) % 2 === 0,
  (r) => r % 2 === 0,
  (r, c) => c % 3 === 0,
  (r, c) => (r + c) % 3 === 0,
  (r, c) => (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0,
  (r, c) => ((r * c) % 2) + ((r * c) % 3) === 0,
  (r, c) => (((r * c) % 2) + ((r * c) % 3)) % 2 === 0,
  (r, c) => (((r + c) % 2) + ((r * c) % 3)) % 2 === 0,
]

// Which modules carry structure rather than payload, derived from the geometry
// rather than borrowed from the encoder.
function functionModules(size, version) {
  const map = Array.from({ length: size }, () => new Uint8Array(size))
  const mark = (row, col) => {
    if (row >= 0 && row < size && col >= 0 && col < size) map[row][col] = 1
  }

  for (const [top, left] of [
    [0, 0],
    [0, size - 8],
    [size - 8, 0],
  ]) {
    for (let r = 0; r < 9; r++) for (let c = 0; c < 9; c++) mark(top + r, left + c)
  }
  for (let i = 0; i < size; i++) {
    mark(6, i)
    mark(i, 6)
  }
  if (version >= 2) {
    const centre = version * 4 + 10
    for (let r = -2; r <= 2; r++) for (let c = -2; c <= 2; c++) mark(centre + r, centre + c)
  }
  return map
}

// The 32 valid format strings, generated the way the spec defines them, so a
// symbol's format bits can be matched rather than trusted.
function validFormats() {
  const out = new Map()
  for (const [level, indicator] of Object.entries({ L: 1, M: 0, Q: 3, H: 2 })) {
    for (let mask = 0; mask < 8; mask++) {
      const data = (indicator << 3) | mask
      let rem = data
      for (let i = 0; i < 10; i++) rem = (rem << 1) ^ ((rem >>> 9) * 0x537)
      out.set(((data << 10) | rem) ^ 0x5412, { level, mask })
    }
  }
  return out
}
const FORMATS = validFormats()

function readFormatCopies(modules, size) {
  const first = []
  for (let i = 0; i <= 5; i++) first.push(modules[i][8])
  first.push(modules[7][8], modules[8][8], modules[8][7])
  for (let i = 9; i <= 14; i++) first.push(modules[8][14 - i])

  const second = []
  for (let i = 0; i <= 7; i++) second.push(modules[8][size - 1 - i])
  for (let i = 8; i <= 14; i++) second.push(modules[size - 15 + i][8])

  const toInt = (bits) => bits.reduce((acc, bit, i) => acc | (bit << i), 0)
  return { first: toInt(first), second: toInt(second) }
}

// Read the interleaved codewords out of a symbol, unmasking as we go.
function readCodewords(modules, size, functions, mask) {
  const bits = []
  for (let right = size - 1; right >= 1; right -= 2) {
    if (right === 6) right = 5
    for (let vert = 0; vert < size; vert++) {
      for (let j = 0; j < 2; j++) {
        const col = right - j
        const upward = ((right + 1) & 2) === 0
        const row = upward ? size - 1 - vert : vert
        if (functions[row][col]) continue
        bits.push(modules[row][col] ^ (MASK[mask](row, col) ? 1 : 0))
      }
    }
  }

  const codewords = []
  for (let i = 0; i + 8 <= bits.length; i += 8) {
    let byte = 0
    for (let j = 0; j < 8; j++) byte = (byte << 1) | bits[i + j]
    codewords.push(byte)
  }
  return codewords
}

// Undo the interleave and hand back one {data, ec} pair per block.
function deinterleave(codewords, version, level) {
  const [ecPerBlock, blockCount] = LAYOUT[version][level]
  const dataTotal = TOTAL[version] - ecPerBlock * blockCount
  const perBlock = dataTotal / blockCount

  const blocks = Array.from({ length: blockCount }, () => ({ data: [], ec: [] }))
  let at = 0
  for (let i = 0; i < perBlock; i++) {
    for (const block of blocks) block.data.push(codewords[at++])
  }
  for (let i = 0; i < ecPerBlock; i++) {
    for (const block of blocks) block.ec.push(codewords[at++])
  }
  return blocks
}

// A valid Reed–Solomon codeword has the generator's roots — a^0 .. a^(ec-1) —
// as its own roots, so evaluating it there yields zero. This is the check a
// scanner runs before it trusts a symbol, and it fails loudly on any error in
// the generator polynomial, the remainder, or the interleave.
function syndromes(block) {
  const codeword = [...block.data, ...block.ec]
  return block.ec.map((_, i) => {
    let value = 0
    for (const byte of codeword) value = gmul(value, EXP[i]) ^ byte
    return value
  })
}

function readPayload(blocks) {
  const data = blocks.flatMap((block) => block.data)
  const bits = data.flatMap((byte) => [7, 6, 5, 4, 3, 2, 1, 0].map((i) => (byte >> i) & 1))
  const take = (count) => bits.splice(0, count).reduce((acc, bit) => (acc << 1) | bit, 0)

  assert.equal(take(4), 0b0100, 'expected byte mode')
  const length = take(8)
  const bytes = []
  for (let i = 0; i < length; i++) bytes.push(take(8))
  return Buffer.from(bytes).toString('utf8')
}

// Full round-trip: encode, then read the symbol back the way a scanner would.
function decode(symbol) {
  const { size, modules } = symbol
  const version = (size - 17) / 4
  assert.ok(Number.isInteger(version) && version >= 1, `bad symbol size ${size}`)

  const { first, second } = readFormatCopies(modules, size)
  assert.equal(first, second, 'the two format information copies disagree')
  const format = FORMATS.get(first)
  assert.ok(format, `format bits ${first.toString(2)} are not a valid format string`)

  const functions = functionModules(size, version)
  const codewords = readCodewords(modules, size, functions, format.mask)
  const blocks = deinterleave(codewords, version, format.level)

  for (const [i, block] of blocks.entries()) {
    assert.deepEqual(
      syndromes(block),
      new Array(block.ec.length).fill(0),
      `block ${i} fails Reed–Solomon`
    )
  }

  return { text: readPayload(blocks), version, ...format }
}

// ---------------------------------------------------------------------------

const SAMPLES = [
  'A',
  'http://192.168.0.2:3000/',
  'http://10.0.0.7:3001/',
  'https://docs.peridio.com/field-notes/',
  'http://172.16.31.255:65535/some/base/url/path/here',
  'ünïcødé ✓ 中文 🐧',
  'x'.repeat(106), // the last length that still fits at error correction level M
  'x'.repeat(107), // the first length that falls back to level L
  'x'.repeat(134), // the largest payload this encoder accepts
]

test('every sample round-trips through an independent reader', () => {
  for (const text of SAMPLES) {
    const symbol = encode(text)
    const decoded = decode(symbol)
    assert.equal(decoded.text, text)
    assert.equal(decoded.version, symbol.version)
    assert.equal(decoded.level, symbol.ecLevel)
    assert.equal(decoded.mask, symbol.mask)
  }
})

test('every payload length from 1 to 134 bytes round-trips', () => {
  for (let length = 1; length <= 134; length++) {
    // Vary the content so the pad codewords and the mask choice both move.
    const text = Array.from({ length }, (_, i) => String.fromCharCode(33 + ((i * 7) % 94))).join('')
    assert.equal(decode(encode(text)).text, text, `length ${length}`)
  }
})

test('the finder patterns and their separators are intact', () => {
  for (const text of SAMPLES) {
    const { size, modules } = encode(text)
    for (const [top, left] of [
      [0, 0],
      [0, size - 7],
      [size - 7, 0],
    ]) {
      for (let r = 0; r < 7; r++) {
        for (let c = 0; c < 7; c++) {
          const ring = r === 0 || r === 6 || c === 0 || c === 6
          const core = r >= 2 && r <= 4 && c >= 2 && c <= 4
          assert.equal(modules[top + r][left + c], ring || core ? 1 : 0, `finder at ${top},${left}`)
        }
      }
    }
    // The separator is the light ring around each finder; sample one edge of each.
    for (let i = 0; i < 8; i++) {
      assert.equal(modules[7][i], 0, 'top-left separator')
      assert.equal(modules[i][7], 0, 'top-left separator')
      assert.equal(modules[7][size - 1 - i], 0, 'top-right separator')
      assert.equal(modules[size - 1 - i][7], 0, 'bottom-left separator')
    }
  }
})

test('the timing patterns alternate the whole way across', () => {
  for (const text of SAMPLES) {
    const { size, modules } = encode(text)
    for (let i = 8; i < size - 8; i++) {
      assert.equal(modules[6][i], i % 2 === 0 ? 1 : 0, `horizontal timing at column ${i}`)
      assert.equal(modules[i][6], i % 2 === 0 ? 1 : 0, `vertical timing at row ${i}`)
    }
  }
})

test('the always-dark module is dark', () => {
  for (const text of SAMPLES) {
    const { size, modules } = encode(text)
    assert.equal(modules[size - 8][8], 1)
  }
})

test('version and error correction level scale with the payload', () => {
  assert.deepEqual(pick(encode('A')), { version: 1, ecLevel: 'M' })
  assert.deepEqual(pick(encode('http://192.168.0.2:3000/')), { version: 2, ecLevel: 'M' })
  // Level M is preferred; L is the fallback that buys the last 28 bytes.
  assert.deepEqual(pick(encode('x'.repeat(106))), { version: 6, ecLevel: 'M' })
  assert.deepEqual(pick(encode('x'.repeat(107))), { version: 6, ecLevel: 'L' })

  function pick({ version, ecLevel }) {
    return { version, ecLevel }
  }
})

test('an over-long payload is refused rather than silently mangled', () => {
  const limit = byteCapacity(MAX_VERSION, 'L')
  assert.equal(limit, 134)
  assert.doesNotThrow(() => encode('x'.repeat(limit)))
  assert.throws(() => encode('x'.repeat(limit + 1)), /exceeds the 134-byte limit/)
})

test('a forced error correction level is honoured', () => {
  assert.equal(encode('A', { ecLevel: 'L' }).ecLevel, 'L')
  assert.equal(
    decode(encode('http://192.168.0.2:3000/', { ecLevel: 'L' })).text,
    'http://192.168.0.2:3000/'
  )
})

// A frozen symbol, so an unrelated change to masking or placement cannot quietly
// alter output that was verified against a real decoder.
const GOLDEN = [
  '1111111001100010001111111',
  '1000001001110101001000001',
  '1011101010010000101011101',
  '1011101010010100001011101',
  '1011101010111110001011101',
  '1000001010010101001000001',
  '1111111010101010101111111',
  '0000000010000001000000000',
  '1011111000110101101111100',
  '0100110100010010010000010',
  '0101001001000101001101011',
  '1000000011010010100010001',
  '0011001011110100001110111',
  '1110000110101010000001010',
  '1001001001000001010101011',
  '1010000110001001000001001',
  '1011111110101100111110100',
  '0000000010000010100011100',
  '1111111001111000101011111',
  '1000001010110001100011001',
  '1011101011111101111111100',
  '1011101010101011101110111',
  '1011101010100000010000101',
  '1000001000010000101111001',
  '1111111011111101011111111',
]

test('a known URL encodes to the exact symbol that was decoder-verified', () => {
  const symbol = encode('http://192.168.0.2:3000/')
  assert.deepEqual(
    symbol.modules.map((row) => Array.from(row).join('')),
    GOLDEN
  )
  assert.equal(symbol.mask, 2)
})

test('render lays out two module rows per line, inside a quiet zone', () => {
  const symbol = encode('http://192.168.0.2:3000/')
  const quietZone = 4
  const lines = render(symbol, { quietZone, color: false }).split('\n')

  const padded = symbol.size + quietZone * 2
  assert.equal(lines.length, Math.ceil(padded / 2))
  for (const line of lines) assert.equal(line.length, padded)

  // The first two lines are entirely quiet zone, as are the leading columns.
  assert.equal(lines[0].trim(), '')
  assert.equal(lines[1].trim(), '')
  for (const line of lines) assert.equal(line.slice(0, quietZone), ' '.repeat(quietZone))
})

test('render only emits ANSI colour when asked', () => {
  const symbol = encode('A')
  // eslint-disable-next-line no-control-regex
  const ansi = /\x1b\[/
  assert.ok(!ansi.test(render(symbol, { color: false })))
  assert.ok(ansi.test(render(symbol, { color: true })))
})
