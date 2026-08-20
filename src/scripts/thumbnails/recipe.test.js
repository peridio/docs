const test = require('node:test')
const assert = require('node:assert/strict')
const path = require('node:path')
const { loadConfig, resolvePreset, buildArgs, presetHash } = require('./recipe')

const config = loadConfig(path.join(__dirname, 'presets.json'))

test('the default preset is grain-mono', () => {
  assert.equal(resolvePreset(config, {}).name, 'grain-mono')
})

test('animated sources resolve to the configured animation preset', () => {
  // Currently the same preset as stills, so all ten tiles share one texture.
  // Pointing config.animation.preset at motion-mono is the documented fallback
  // if the shimmer proves unacceptable; this test tracks the config either way.
  const { name, preset } = resolvePreset(config, { presetName: 'grain-mono', animated: true })
  assert.equal(name, config.animation.preset)
  assert.deepEqual(preset.command, config.presets[config.animation.preset].command)
})

test('an unknown preset name is rejected with the valid names', () => {
  assert.throws(() => resolvePreset(config, { presetName: 'nope' }), /grain-mono/)
})

test('buildArgs divides the asset edge by the dot size', () => {
  const { preset } = resolvePreset(config, {})
  const args = buildArgs({ input: 'in.png', output: 'out.png', width: 400, dotSize: 2, preset })
  assert.deepEqual(args, [
    '-i',
    'in.png',
    '-o',
    'out.png',
    '-x',
    '200',
    '-u',
    '2',
    '-p',
    '000000 333333 666666 999999 cccccc ffffff',
    '-r',
    '000000 333333 666666 999999 cccccc ffffff',
    '-s',
    '90%',
    '--contrast',
    '20%',
    'edm',
    '--serpentine',
    'FloydSteinberg',
  ])
})

test('buildArgs rejects an edge that is not divisible by the dot size', () => {
  const { preset } = resolvePreset(config, {})
  assert.throws(
    () => buildArgs({ input: 'in.png', output: 'out.png', width: 401, dotSize: 2, preset }),
    /divisible/
  )
})

test('buildArgs adds gif flags only when fps is given', () => {
  const { preset } = resolvePreset(config, { animated: true })
  const still = buildArgs({ input: 'a.png', output: 'b.png', width: 400, dotSize: 2, preset })
  assert.ok(!still.includes('--fps'))
  const args = buildArgs({
    input: 'f/*.png',
    output: 'out.gif',
    width: 400,
    dotSize: 2,
    preset,
    fps: 7.5,
  })
  assert.equal(args[args.indexOf('--fps') + 1], '7.5')
  assert.equal(args[args.indexOf('--loop') + 1], '0')
})

test('every preset carries a recolor, which the GIF encoder depends on', () => {
  for (const [name, preset] of Object.entries(config.presets)) {
    assert.ok(preset.recolor, `${name}: missing recolor`)
    assert.equal(
      preset.palette.split(' ').length,
      preset.recolor.split(' ').length,
      `${name}: palette and recolor differ in length`
    )
  }
})

test('presetHash changes when a colour changes', () => {
  const { preset } = resolvePreset(config, {})
  const tweaked = { ...preset, recolor: preset.recolor.replace('666666', '5f51ff') }
  assert.notEqual(presetHash(preset), presetHash(tweaked))
})

test('sizes stay divisible by the configured dot size', () => {
  for (const [kind, edge] of Object.entries(config.sizes)) {
    assert.equal(edge % config.dotSize, 0, `${kind}: ${edge} not divisible by ${config.dotSize}`)
  }
})

test('each size lands within 1% of the declared aspect after dithering', () => {
  // didder resizes by width and keeps the aspect, so the height rounds to a whole
  // pixel. A small mismatch is absorbed by object-fit: cover as a sub-pixel crop;
  // a large one would crop visibly and rescale the dither. This is the guard on
  // changing `sizes` or `aspect` without checking the arithmetic.
  const [aw, ah] = config.aspect
  const target = aw / ah
  for (const [kind, width] of Object.entries(config.sizes)) {
    const dithered = width / config.dotSize
    const height = Math.round((dithered * ah) / aw) * config.dotSize
    const drift = Math.abs(width / height / target - 1)
    assert.ok(
      drift < 0.01,
      `${kind}: ${width}x${height} is ${(drift * 100).toFixed(2)}% off ${aw}:${ah}`
    )
  }
})

test('the tile size doubles the thumb dot grid for mobile row tiles', () => {
  // Below 768px the row grid collapses to one column, so the tile that paints 1:1
  // inside the 218px desktop column gets stretched across the whole content width.
  // `tile` is the asset the srcset hands the browser there: same 2px dots, twice as
  // many of them across the image. If this ratio drifts the mobile tile either
  // upscales again or wastes bytes.
  const { thumb, tile } = config.sizes
  assert.equal(tile / config.dotSize, (thumb / config.dotSize) * 2)
})

test('buildArgs dithers the tile size on a 400-wide grid', () => {
  const { preset } = resolvePreset(config, {})
  const args = buildArgs({
    input: 'in.png',
    output: 'out.png',
    width: config.sizes.tile,
    dotSize: config.dotSize,
    preset,
  })
  assert.equal(args[args.indexOf('-x') + 1], '400')
  assert.equal(args[args.indexOf('-u') + 1], '2')
})

test('sizes are declared smallest-first so srcset widths stay ordered', () => {
  // The theme builds srcset straight from these keys; an out-of-order entry would
  // hand the browser widths that disagree with the files behind them.
  const widths = Object.values(config.sizes)
  assert.deepEqual(
    widths,
    [...widths].sort((a, b) => a - b)
  )
})
