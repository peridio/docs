const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const { describe, it } = require('node:test')

const SITE = path.join(__dirname, '..', '..', '..')
const read = (p) => fs.readFileSync(path.join(SITE, p), 'utf8')

describe('heading order', () => {
  it('TileGrid takes a heading level so a grid right under the h1 uses h2', () => {
    assert.match(read('src/components/TileGrid/index.js'), /headingLevel = 'h3'/)
    assert.match(read('docs-overview/resources.mdx'), /<TileGrid\s+headingLevel="h2"/)
  })
  it('PathComparison cards use h3 under the page h2, not h4', () => {
    assert.doesNotMatch(read('src/components/PathComparison/index.js'), /as="h4"/)
  })
})

describe('tile title typeface', () => {
  it('pins the base font so an h2 tile title does not pick up the global h2 face', () => {
    assert.match(
      read('src/components/TileGrid/styles.module.css'),
      /\.tileTitle \{[^}]*font-family: var\(--ifm-font-family-base\)/
    )
  })
})
