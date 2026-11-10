import assert from 'node:assert/strict'
import { test } from 'node:test'
import sharp from 'sharp'
import { loadFonts, renderNote } from './render.mjs'
import { seedFrom, skylineArtwork, skylineGrid } from './skyline.mjs'
import { OG_CANVAS, OG_LAYOUT, OG_MAX_BYTES, OG_SKYLINE } from './tokens.mjs'

const columnHeight = (grid, x) => grid.filter((row) => row[x] > 0).length
const average = (values) => values.reduce((sum, v) => sum + v, 0) / values.length

test('skylineGrid is deterministic per seed and differs between families', () => {
  const hardware = skylineGrid(seedFrom('hardware'), 33, 30)
  assert.deepEqual(hardware, skylineGrid(seedFrom('hardware'), 33, 30))
  assert.notDeepEqual(hardware, skylineGrid(seedFrom('learn'), 33, 30))
})

test('skylineGrid rises to the right, with a lit cap on every column', () => {
  const grid = skylineGrid(seedFrom('product'), 33, 30)
  const heights = Array.from({ length: 33 }, (_, x) => columnHeight(grid, x))
  assert.ok(heights.every((h) => h >= 1))
  assert.ok(average(heights.slice(0, 5)) < average(heights.slice(-5)))
  for (let x = 0; x < 33; x++) assert.equal(grid[30 - heights[x]][x], OG_SKYLINE.ramp.length)
})

test('skylineArtwork fills the artwork slot and renders under the byte cap', async () => {
  const png = await skylineArtwork('product')
  const meta = await sharp(png).metadata()
  assert.equal(meta.width, OG_LAYOUT.imageWidth)
  assert.equal(meta.height, OG_CANVAS.height)
  assert.equal(await skylineArtwork('product'), png)
  const fonts = await loadFonts()
  const { buffer, card } = await renderNote(
    {
      slug: 't',
      title: 'Features',
      description: 'Short dek.',
      eyebrow: 'Product Docs',
      artwork: png,
    },
    fonts
  )
  assert.ok(card.image.startsWith('data:image/png;base64,'))
  assert.ok(buffer.length <= OG_MAX_BYTES)
})
