const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { describe, it } = require('node:test')
const sharp = require('sharp')
const { WEBP_OPTIONS, webpOptionsHash, toAnimatedWebp } = require('./webp')

// A small animated GIF built on the fly: three solid frames.
async function sampleGif(dir) {
  const file = path.join(dir, 'sample.gif')
  const frames = await Promise.all(
    [
      [255, 0, 0],
      [0, 255, 0],
      [0, 0, 255],
    ].map(([r, g, b]) =>
      sharp({ create: { width: 64, height: 48, channels: 3, background: { r, g, b } } })
        .png()
        .toBuffer()
    )
  )
  await sharp(frames, { join: { animated: true } })
    .gif({ delay: 100 })
    .toFile(file)
  return file
}

describe('toAnimatedWebp', () => {
  it('writes an animated webp with the same frame count and a smaller file', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'webp-test-'))
    const webp = path.join(dir, 'out.webp')
    const SAMPLE_GIF = await sampleGif(dir)
    const gifMeta = await sharp(SAMPLE_GIF, { animated: true }).metadata()
    assert.ok(gifMeta.pages > 1, 'sample must be animated')

    await toAnimatedWebp(SAMPLE_GIF, webp)

    const meta = await sharp(webp, { animated: true }).metadata()
    assert.equal(meta.format, 'webp')
    assert.equal(meta.pages, gifMeta.pages)
    assert.ok(fs.statSync(webp).size < fs.statSync(SAMPLE_GIF).size)
    fs.rmSync(dir, { recursive: true, force: true })
  })
})

describe('WEBP_OPTIONS', () => {
  it('stays lossless and searches for the smallest frame encoding', () => {
    assert.equal(WEBP_OPTIONS.lossless, true)
    assert.equal(WEBP_OPTIONS.minSize, true)
  })

  it('hashes the same settings identically regardless of key order', () => {
    assert.equal(webpOptionsHash({ a: 1, b: 2 }), webpOptionsHash({ b: 2, a: 1 }))
    assert.notEqual(webpOptionsHash(), webpOptionsHash({ ...WEBP_OPTIONS, minSize: false }))
  })
})
