const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const sharp = require('sharp')
const { isAnimated, prepareStill, prepareFrames } = require('./prepare')

const SHARPEN = { radius: 2.0, amount: 1.4, threshold: 3 }
const ASPECT = [4, 3]
const IMG_ROOT = path.resolve(__dirname, '..', '..', 'static', 'img', 'field-notes')

function tmp() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'prep-'))
}

async function makeWide(file) {
  await sharp({
    create: { width: 1200, height: 600, channels: 3, background: { r: 20, g: 40, b: 90 } },
  })
    .png()
    .toFile(file)
}

test('prepareStill produces a 4:3 image capped at edgeCap', async () => {
  const dir = tmp()
  const src = path.join(dir, 'wide.png')
  const dest = path.join(dir, 'out.png')
  await makeWide(src)
  assert.deepEqual(
    await prepareStill(src, dest, { aspect: ASPECT, edgeCap: 400, sharpen: SHARPEN }),
    { width: 400, height: 300 }
  )
})

test('prepareStill crops a portrait source to 4:3 without distorting it', async () => {
  const dir = tmp()
  const src = path.join(dir, 'tall.png')
  await sharp({
    create: { width: 500, height: 889, channels: 3, background: { r: 10, g: 10, b: 10 } },
  })
    .png()
    .toFile(src)
  // width is the limit here, so the crop is 500x375 and the output matches
  assert.deepEqual(
    await prepareStill(src, path.join(dir, 'out.png'), {
      aspect: ASPECT,
      edgeCap: 1600,
      sharpen: SHARPEN,
    }),
    { width: 500, height: 375 }
  )
})

test('prepareStill never upscales past the source', async () => {
  const dir = tmp()
  const src = path.join(dir, 'wide.png')
  await makeWide(src)
  // a 1200x600 source is wider than 4:3, so height is the limit: crop 800x600
  assert.deepEqual(
    await prepareStill(src, path.join(dir, 'out.png'), {
      aspect: ASPECT,
      edgeCap: 1600,
      sharpen: SHARPEN,
    }),
    { width: 800, height: 600 }
  )
})

test('isAnimated distinguishes a still from the repo animated source', async () => {
  const dir = tmp()
  const still = path.join(dir, 'still.png')
  await makeWide(still)
  assert.equal(await isAnimated(still), false)
  assert.equal(await isAnimated(path.join(IMG_ROOT, 'deepstream-demo.gif')), true)
})

test('prepareFrames keeps every Nth frame of the real animated source as a 4:3 png', async () => {
  const out = path.join(tmp(), 'frames')
  const result = await prepareFrames(path.join(IMG_ROOT, 'deepstream-demo.gif'), out, {
    aspect: ASPECT,
    edgeCap: 200,
    sharpen: SHARPEN,
    frameStride: 2,
  })
  assert.equal(result.total, 91)
  assert.equal(result.kept, 46)
  const files = fs.readdirSync(out).sort()
  assert.equal(files.length, 46)
  assert.equal(files[0], 'f0000.png')
  const meta = await sharp(path.join(out, files[0])).metadata()
  assert.equal(meta.width, 200)
  assert.equal(meta.height, 150)
})
