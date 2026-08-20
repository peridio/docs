// Source preparation: centre-crop to the target aspect, then unsharp mask.
//
// The sharpen happens at source resolution, before didder's own downscale,
// because its job is to preserve local contrast the downscale would otherwise
// remove. Dithering cannot recover detail that is already gone.
const fs = require('node:fs')
const path = require('node:path')
const sharp = require('sharp')

async function pageCount(filePath) {
  const meta = await sharp(filePath).metadata()
  return meta.pages ?? 1
}

async function isAnimated(filePath) {
  return (await pageCount(filePath)) > 1
}

// One frame, centre-cropped to the target aspect. `input` is a sharp instance so
// callers can hand us either a whole file or a single page of an animated one.
//
// The output width is capped and then the height is derived from the aspect, so
// didder's `-x <width>` produces exactly the intended pixel dimensions rather
// than something a rounding error away from them.
async function cropSharpen(input, destPath, { aspect, edgeCap, sharpen }) {
  const meta = await input.metadata()
  const sourceHeight = meta.pageHeight ?? meta.height
  const [aw, ah] = aspect
  // the largest aspect-correct rectangle that fits inside the source
  let cropWidth = meta.width
  let cropHeight = Math.round((meta.width * ah) / aw)
  if (cropHeight > sourceHeight) {
    cropHeight = sourceHeight
    cropWidth = Math.round((sourceHeight * aw) / ah)
  }
  const outWidth = Math.min(cropWidth, edgeCap)
  const outHeight = Math.round((outWidth * ah) / aw)
  const info = await input
    .extract({
      left: Math.floor((meta.width - cropWidth) / 2),
      top: Math.floor((sourceHeight - cropHeight) / 2),
      width: cropWidth,
      height: cropHeight,
    })
    .resize(outWidth, outHeight, { fit: 'cover' })
    .sharpen({ sigma: sharpen.radius, m1: 0, m2: sharpen.amount, x1: sharpen.threshold })
    .png()
    .toFile(destPath)
  return { width: info.width, height: info.height }
}

async function prepareStill(srcPath, destPath, options) {
  fs.mkdirSync(path.dirname(destPath), { recursive: true })
  return cropSharpen(sharp(srcPath), destPath, options)
}

async function prepareFrames(srcPath, destDir, { aspect, edgeCap, sharpen, frameStride }) {
  fs.rmSync(destDir, { recursive: true, force: true })
  fs.mkdirSync(destDir, { recursive: true })
  const total = await pageCount(srcPath)
  let kept = 0
  for (let page = 0; page < total; page += frameStride) {
    const dest = path.join(destDir, `f${String(kept).padStart(4, '0')}.png`)
    await cropSharpen(sharp(srcPath, { page }), dest, { aspect, edgeCap, sharpen })
    kept += 1
  }
  return { kept, total }
}

module.exports = { isAnimated, prepareStill, prepareFrames }
