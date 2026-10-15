const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const { describe, it } = require('node:test')

const src = fs.readFileSync(path.join(__dirname, 'index.tsx'), 'utf8')

// A category that can't collapse and has no page of its own is a section
// label. Upstream renders it as an <a> with no href, which Lighthouse's
// crawlable-anchors audit fails on every docs page (SEO 92).
describe('Sidebar category label', () => {
  it('renders non-collapsible categories without a page as a label, not a link', () => {
    assert.match(src, /!collapsible && !hrefWithSSRFallback \? \(\s*<span/)
    assert.match(
      src,
      /<span[\s\S]*?className=\{clsx\(styles\.categoryLink, styles\.categoryLabelOnly, 'menu__link'/
    )
  })
})
