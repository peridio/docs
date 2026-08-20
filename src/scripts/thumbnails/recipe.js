// The preset registry: turning presets.json into didder arguments.
//
// `palette` is what the dither quantises to and `recolor` is what those values
// become afterwards. For the shipping grayscale preset the two are identical,
// which looks redundant but is not: didder's GIF encoder fails with "image block
// is out of bounds" when the palette is grayscale and no recolor is given, and
// passing one forces the RGB path.
const crypto = require('node:crypto')
const fs = require('node:fs')

function loadConfig(configPath) {
  return JSON.parse(fs.readFileSync(configPath, 'utf8'))
}

function resolvePreset(config, { presetName, animated } = {}) {
  // Animation overrides any per-note choice, so the animated path is configurable
  // in one place. It currently points at the same preset as stills; the ordered
  // alternative exists for the day the shimmer becomes a problem.
  const name = animated
    ? config.animation.preset
    : presetName || Object.keys(config.presets).find((key) => config.presets[key].default)
  const preset = config.presets[name]
  if (!preset) {
    throw new Error(
      `unknown preset ${JSON.stringify(name)} — available: ${Object.keys(config.presets).join(', ')}`
    )
  }
  return { name, preset }
}

// `width` is the asset edge; dithering happens at width/dotSize and is then
// upscaled by that integer factor, which is what makes the dots visible. A
// non-integer factor would land dots on fractional pixels, so it is refused.
function buildArgs({ input, output, width, dotSize = 1, preset, fps }) {
  if (width % dotSize !== 0) {
    throw new Error(`asset edge ${width} is not divisible by dotSize ${dotSize}`)
  }
  const args = [
    '-i',
    input,
    '-o',
    output,
    '-x',
    String(width / dotSize),
    '-u',
    String(dotSize),
    '-p',
    preset.palette,
    '-r',
    preset.recolor,
  ]
  if (preset.strength) args.push('-s', preset.strength)
  if (preset.contrast) args.push('--contrast', preset.contrast)
  if (preset.brightness) args.push('--brightness', preset.brightness)
  if (fps) args.push('--fps', String(fps), '--loop', '0')
  return args.concat(preset.command)
}

function presetHash(preset) {
  const canonical = JSON.stringify([
    preset.palette,
    preset.recolor,
    preset.strength ?? null,
    preset.contrast ?? null,
    preset.brightness ?? null,
    preset.command,
  ])
  return crypto.createHash('sha256').update(canonical).digest('hex')
}

module.exports = { loadConfig, resolvePreset, buildArgs, presetHash }
