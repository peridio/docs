const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const { describe, it } = require('node:test')

const src = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8')

// Animated thumbnails are WebP, which Safari before 14 can't decode. Row thumbs
// offer the WebP through <picture> with the still poster PNG as the <img>.
describe('Animated row thumbnails', () => {
  it('offer WebP as a <source> with the poster PNG as fallback', () => {
    assert.match(src, /<picture>[\s\S]*?<source type="image\/webp"[\s\S]*?<\/picture>/)
    assert.match(src, /variantSrc\(image, 'poster'\)/)
  })
})
