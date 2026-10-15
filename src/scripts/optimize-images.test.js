const assert = require('node:assert/strict')
const { describe, it } = require('node:test')
const sharp = require('sharp')
const { encode, psnr } = require('./optimize-images')

// A 256-colour palette is lossless in practice for UI screenshots but bands
// photographs (smooth gradients, sensor noise). The optimizer must tell them
// apart instead of palettizing every PNG.
function raw(width, height, pixel) {
  const data = Buffer.alloc(width * height * 3)
  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++) data.set(pixel(x, y), (y * width + x) * 3)
  return sharp(data, { raw: { width, height, channels: 3 } })
    .png()
    .toBuffer()
}

describe('optimize-images encode', () => {
  it('psnr is Infinity for identical images and finite otherwise', async () => {
    const a = await raw(8, 8, () => [10, 20, 30])
    const b = await raw(8, 8, () => [12, 20, 30])
    assert.equal(await psnr(a, a), Infinity)
    assert.ok(Number.isFinite(await psnr(a, b)))
  })

  it('psnr ignores colour hidden under fully transparent pixels', async () => {
    const rgba = (rgb) =>
      sharp(Buffer.from([...rgb, 0, ...rgb, 0, 9, 9, 9, 255, 9, 9, 9, 255]), {
        raw: { width: 2, height: 2, channels: 4 },
      })
        .png()
        .toBuffer()
    assert.equal(await psnr(await rgba([255, 0, 0]), await rgba([0, 0, 255])), Infinity)
  })

  it('palettizes a flat-colour screenshot', async () => {
    const shot = await raw(400, 300, (x, y) =>
      x < 200 ? [30, 30, 40] : y < 50 ? [107, 92, 247] : [250, 250, 250]
    )
    const out = await encode(shot)
    assert.equal(out.mode, 'palette')
  })

  it('keeps a photo-like gradient lossless', async () => {
    // Smooth ramps plus grain: far more than 256 colours, which a palette can
    // only approximate by dithering (about 37 dB here).
    const grain = (x, y) => ((x * 31 + y * 17) % 21) - 10
    const clamp = (v) => Math.max(0, Math.min(255, v))
    const photo = await raw(400, 300, (x, y) =>
      [(x / 400) * 255, (y / 300) * 255, ((x + y) / 700) * 255].map((v) =>
        clamp(Math.round(v) + grain(x, y))
      )
    )
    const out = await encode(photo)
    assert.equal(out.mode, 'lossless')
    assert.ok(out.psnr < 40)
  })

  it('the lossless candidate really is lossless', async () => {
    const out = await encode(await raw(300, 200, (x, y) => [x % 256, y % 256, (x * y) % 256]))
    assert.equal(out.mode, 'lossless')
    assert.equal((await sharp(out.buf).metadata()).isPalette, false)
  })

  it('caps width at 1600px', async () => {
    const wide = await raw(2000, 10, () => [0, 0, 0])
    const out = await encode(wide)
    assert.equal((await sharp(out.buf).metadata()).width, 1600)
  })
})
