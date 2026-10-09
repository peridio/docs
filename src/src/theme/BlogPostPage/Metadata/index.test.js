const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const { describe, it } = require('node:test')

// Animated notes use an animated WebP as front-matter `image`, which most link
// unfurlers (Slack, LinkedIn, X) can't render. Their social card uses the
// still poster PNG that make-thumbnails writes alongside.
describe('Blog post social image', () => {
  it('wraps the upstream metadata and overrides og/twitter image for animated notes', () => {
    const src = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8')
    assert.match(src, /@theme-original\/BlogPostPage\/Metadata/)
    assert.match(src, /variantSrc\(image, 'poster'\)/)
    assert.match(src, /property="og:image"/)
    assert.match(src, /name="twitter:image"/)
  })
  it('every animated note has the poster it would point at', () => {
    const notes = path.join(__dirname, '..', '..', '..', '..', 'field-notes')
    const statics = path.join(__dirname, '..', '..', '..', '..', 'static')
    for (const f of fs.readdirSync(notes).filter((n) => /\.mdx?$/.test(n))) {
      const m = fs
        .readFileSync(path.join(notes, f), 'utf8')
        .match(/^image:\s*(\S+-thumb\.webp)\s*$/m)
      if (!m) continue
      const poster = m[1].replace(/-thumb\.webp$/, '-poster.png')
      assert.ok(fs.existsSync(path.join(statics, poster)), `${f}: ${poster}`)
    }
  })
})
