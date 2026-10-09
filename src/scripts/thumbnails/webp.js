const crypto = require('node:crypto')
const sharp = require('sharp')

// didder writes animated output as GIF. The frames are 6-colour dithers, so
// lossless WebP keeps them pixel-identical at a fraction of the size. minSize
// lets the encoder pick each frame's keyframe/blend/rectangle by trial, which
// shrinks the dithered animations another ~16% at a few seconds per file.
const WEBP_OPTIONS = Object.freeze({ lossless: true, effort: 6, minSize: true })

// Recorded in the lock for animated notes, so changing the encoder settings
// marks every animated thumbnail stale instead of needing --force.
function webpOptionsHash(options = WEBP_OPTIONS) {
  const canonical = JSON.stringify(
    Object.keys(options)
      .sort()
      .map((key) => [key, options[key]])
  )
  return crypto.createHash('sha256').update(canonical).digest('hex')
}

async function toAnimatedWebp(gifPath, webpPath) {
  await sharp(gifPath, { animated: true }).webp(WEBP_OPTIONS).toFile(webpPath)
  return webpPath
}

module.exports = { WEBP_OPTIONS, webpOptionsHash, toAnimatedWebp }
