const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const { describe, it } = require('node:test')

const src = fs.readFileSync(path.join(__dirname, '..', 'make-thumbnails.js'), 'utf8')

// The dithered GIF is an intermediate on the way to animated WebP. Writing it
// next to the output put it in static/, where a crash mid-run left it to be
// committed and deployed.
describe('make-thumbnails intermediates', () => {
  it('writes the intermediate GIF inside the temp work dir, not static/', () => {
    assert.doesNotMatch(src, /output\.replace\([^)]*\.gif/)
    assert.match(src, /path\.join\(work, `\$\{kind\}\.gif`\)/)
  })
  it('removes the work dir even when a step throws', () => {
    assert.match(src, /finally \{\s*fs\.rmSync\(work, \{ recursive: true, force: true \}\)/)
  })
  it('declares frames outside the try block (the lock entry reads it after)', () => {
    assert.match(src, /let frames = null\s*\n\s*try \{/)
  })
})
