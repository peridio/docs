const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const { describe, it } = require('node:test')

const root = path.join(__dirname, '..')
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8')
const NAME = 'jetson-orin-nano-devkit-serial-console'

// The serial-console animation was a 1.9 MB GIF on the Jetson guide and in
// the target selector; it is a ~50 KB video now.
describe('Jetson serial console animation', () => {
  it('ships as video with a poster, not a GIF', () => {
    for (const ext of ['.mp4', '.webm', '-poster.jpg'])
      assert.ok(fs.existsSync(path.join(root, 'static', 'img', NAME + ext)), NAME + ext)
    assert.ok(!fs.existsSync(path.join(root, 'static', 'img', NAME + '.gif')))
  })
  it('the guide and the target data point at the video', () => {
    for (const file of [
      'docs-guides/getting-started/jetson.md',
      'src/data/hardware/targets.json',
      'src/data/hardware/generated-targets.json',
    ]) {
      const text = read(file)
      assert.doesNotMatch(text, new RegExp(`${NAME}\\.gif`), file)
      assert.match(text, new RegExp(`${NAME}\\.mp4`), file)
    }
  })
  it('the target selector plays .mp4 images as video', () => {
    assert.match(
      read('src/components/TargetSelector/index.js'),
      /t\.serial\.image\.src\.endsWith\('\.mp4'\)[\s\S]*?<AutoplayVideo/
    )
  })
})
