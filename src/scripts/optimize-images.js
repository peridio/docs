#!/usr/bin/env node
// Resize and recompress raster images in place.
//   node scripts/optimize-images.js static/img/how-it-works.png ...
//   node scripts/optimize-images.js --check <files>   # report only
// Keeps the format (PNG stays PNG so markdown references don't change); caps
// width at MAX_WIDTH, which is 2x the widest content column on the site.
//
// PNGs try a 256-colour palette first, which shrinks UI screenshots several
// times over with no visible change. Photographs band under a palette, so the
// palette result is kept only when it stays within MIN_PSNR of the resized
// original; otherwise the PNG is re-encoded losslessly.
const fs = require('node:fs')
const sharp = require('sharp')

const MAX_WIDTH = 1600
const MIN_PSNR = 40

// Peak signal-to-noise ratio in dB between two images of the same size, over
// what is visible: RGB premultiplied by alpha, so colour under fully
// transparent pixels (which encoders rewrite freely) doesn't count. Infinity
// when they are identical.
async function psnr(a, b) {
  const [x, y] = await Promise.all(
    [a, b].map((img) => sharp(img).ensureAlpha().raw().toBuffer({ resolveWithObject: true }))
  )
  if (x.info.width !== y.info.width || x.info.height !== y.info.height)
    throw new Error('psnr: images differ in size')
  let sum = 0
  for (let i = 0; i < x.data.length; i += 4) {
    const ax = x.data[i + 3]
    const ay = y.data[i + 3]
    for (let c = 0; c < 3; c++) {
      const d = (x.data[i + c] * ax - y.data[i + c] * ay) / 255
      sum += d * d
    }
    sum += (ax - ay) * (ax - ay)
  }
  if (sum === 0) return Infinity
  return 10 * Math.log10((255 * 255) / (sum / x.data.length))
}

// Returns { buf, mode, psnr? } for one image buffer; mode is 'palette',
// 'lossless' (PNG), 'jpeg', or 'skipped' for formats left alone.
async function encode(input) {
  const meta = await sharp(input).metadata()
  const resized = () => {
    const img = sharp(input)
    return (meta.width ?? 0) > MAX_WIDTH ? img.resize({ width: MAX_WIDTH }) : img
  }
  if (meta.format === 'jpeg')
    return { buf: await resized().jpeg({ mozjpeg: true, quality: 80 }).toBuffer(), mode: 'jpeg' }
  if (meta.format !== 'png') return { buf: input, mode: 'skipped' }
  // No `effort` here: in sharp it switches PNG output to palette mode.
  const lossless = await resized().png({ compressionLevel: 9, adaptiveFiltering: true }).toBuffer()
  const palette = await resized()
    .png({ palette: true, quality: 90, compressionLevel: 9, effort: 10 })
    .toBuffer()
  const score = await psnr(lossless, palette)
  return score >= MIN_PSNR
    ? { buf: palette, mode: 'palette', psnr: score }
    : { buf: lossless, mode: 'lossless', psnr: score }
}

async function optimize(file, check) {
  const input = fs.readFileSync(file)
  const { buf, mode, psnr: score } = await encode(input)
  if (mode === 'skipped') return console.log(`${file}: skipped`)
  const kept = buf.length < input.length
  if (!check && kept) fs.writeFileSync(file, buf)
  const db =
    score === undefined ? '' : ` ${mode} ${Number.isFinite(score) ? score.toFixed(1) : 'inf'}dB`
  console.log(
    `${file}: ${Math.round(input.length / 1024)}KB -> ${Math.round(buf.length / 1024)}KB${db}${check ? ' (check)' : kept ? '' : ' (kept original)'}`
  )
}

module.exports = { encode, psnr, MAX_WIDTH, MIN_PSNR }

if (require.main === module) {
  const args = process.argv.slice(2)
  const check = args.includes('--check')
  ;(async () => {
    for (const f of args.filter((a) => a !== '--check')) await optimize(f, check)
  })()
}
