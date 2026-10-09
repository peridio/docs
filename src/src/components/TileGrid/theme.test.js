const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const { describe, it } = require('node:test')

const js = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8')
const css = fs.readFileSync(path.join(__dirname, 'styles.module.css'), 'utf8')

// The server can't know the reader's theme, so picking the pattern in React
// painted the light SVG for dark-mode readers until hydration swapped it.
// Both URLs go in as custom properties and CSS picks one from data-theme,
// which Docusaurus sets before first paint.
describe('TileGrid pattern theme', () => {
  it('does not choose the pattern in React', () => {
    assert.doesNotMatch(js, /useColorMode/)
    assert.match(js, /'--tile-bg-light'/)
    assert.match(js, /'--tile-bg-dark'/)
  })
  it('chooses it in CSS from data-theme', () => {
    assert.match(css, /background-image:\s*var\(--tile-bg-light\)/)
    assert.match(
      css,
      /\[data-theme=['"]dark['"]\]\)?[^{]*\.tileTop[^{]*\{[^}]*var\(--tile-bg-dark\)/
    )
  })
})
