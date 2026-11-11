import assert from 'node:assert/strict'
import { test } from 'node:test'
import sharp from 'sharp'
import { loadFonts, renderNote } from './render.mjs'
import { COMPOSITIONS, familyArtwork, familyGrid } from './pixels.mjs'
import { OG_FAMILIES } from './routes.mjs'
import { OG_CANVAS, OG_LAYOUT, OG_MAX_BYTES, OG_PIXELS } from './tokens.mjs'

const FAMILIES = [...OG_FAMILIES.map((f) => f.key), 'default']
const COLS = Math.ceil(OG_LAYOUT.imageWidth / OG_PIXELS.cell)
const ROWS = Math.ceil(OG_CANVAS.height / OG_PIXELS.cell)
const columnHeight = (grid, x) => grid.filter((row) => row[x] > 0).length
const average = (values) => values.reduce((sum, v) => sum + v, 0) / values.length
const litCells = (grid, from, to) =>
  grid.reduce((n, row) => n + row.slice(from, to).filter((level) => level > 0).length, 0)

test('every family has a composition that exists', () => {
  for (const family of FAMILIES) {
    const spec = OG_PIXELS.compositions[family]
    assert.ok(spec, `${family} has no composition`)
    assert.equal(typeof COMPOSITIONS[spec.draw], 'function', `${family}: ${spec.draw}`)
  }
})

test('every family draws a different composition', () => {
  const draws = FAMILIES.map((family) => OG_PIXELS.compositions[family].draw)
  assert.equal(new Set(draws).size, draws.length)
})

test('familyGrid is deterministic and stays inside the palette', () => {
  for (const family of FAMILIES) {
    const grid = familyGrid(family, COLS, ROWS)
    assert.deepEqual(grid, familyGrid(family, COLS, ROWS))
    for (const row of grid)
      for (const level of row) assert.ok(level >= 0 && level <= OG_PIXELS.ramp.length + 1)
  }
})

test('every composition is heavier on the right, where the fade ends', () => {
  const third = Math.floor(COLS / 3)
  for (const family of FAMILIES) {
    const grid = familyGrid(family, COLS, ROWS)
    assert.ok(
      litCells(grid, 0, third) < litCells(grid, COLS - third, COLS),
      `${family} is heavier on the left`
    )
  }
})

test('the changelog skyline rises to the right, with a lit cap on every column', () => {
  const grid = familyGrid('changelog', COLS, ROWS)
  const heights = Array.from({ length: COLS }, (_, x) => columnHeight(grid, x))
  assert.ok(heights.every((h) => h >= 1))
  assert.ok(average(heights.slice(0, 5)) < average(heights.slice(-5)))
  for (let x = 0; x < COLS; x++) assert.equal(grid[ROWS - heights[x]][x], OG_PIXELS.ramp.length)
})

test('an unknown family falls back to the default composition', () => {
  assert.deepEqual(familyGrid('nope', COLS, ROWS), familyGrid('default', COLS, ROWS))
})

test('familyArtwork fills the artwork slot and every family renders under the byte cap', async () => {
  const fonts = await loadFonts()
  for (const family of FAMILIES) {
    const png = await familyArtwork(family)
    const meta = await sharp(png).metadata()
    assert.equal(meta.width, OG_LAYOUT.imageWidth)
    assert.equal(meta.height, OG_CANVAS.height)
    assert.equal(await familyArtwork(family), png)
    const { buffer, card } = await renderNote(
      { slug: family, title: 'Features', description: 'Short dek.', eyebrow: family, artwork: png },
      fonts
    )
    assert.ok(card.image.startsWith('data:image/png;base64,'))
    assert.ok(buffer.length <= OG_MAX_BYTES, `${family}: ${buffer.length} bytes`)
  }
})
