const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const { describe, it } = require('node:test')

const config = fs.readFileSync(path.join(__dirname, '..', 'docusaurus.config.js'), 'utf8')
const home = fs.readFileSync(path.join(__dirname, '..', 'docs-overview', 'resources.mdx'), 'utf8')

describe('web fonts', () => {
  it('does not load fonts the stylesheets never reference', () => {
    assert.doesNotMatch(config, /Montserrat/)
    assert.doesNotMatch(config, /Material\+Symbols/)
  })
  it('renders homepage tile icons as SVG, not as icon-font glyph names', () => {
    assert.doesNotMatch(home, /material-symbols-outlined/)
  })
  it('loads only the Latin subset of each self-hosted font', () => {
    // The per-weight files declare every subset; the bundler inlines the small
    // ones as base64 into the global stylesheet (it grew to 690 KB gzipped).
    const fontsource = config.match(/@fontsource\/[a-z-]+\/[a-z0-9-]+\.css/g) ?? []
    assert.ok(fontsource.length > 0)
    for (const file of fontsource) assert.match(file, /\/latin-\d+\.css$/)
  })
  it('serves Inter, Geist and Geist Mono as one Latin variable file each', () => {
    // Static per-weight files meant four Inter requests on every page (~97 KB);
    // the variable file is one 48 KB request covering 100-900.
    const fonts = fs.readFileSync(path.join(__dirname, '..', 'src', 'css', 'fonts.css'), 'utf8')
    assert.doesNotMatch(config, /@fontsource\/(inter|geist|geist-mono)\//)
    for (const family of ['inter', 'geist', 'geist-mono']) {
      assert.match(
        fonts,
        new RegExp(`@fontsource-variable/${family}/files/${family}-latin-wght-normal\\.woff2`)
      )
    }
    assert.match(fonts, /font-weight: 100 900/)
    assert.doesNotMatch(fonts, /font-display: (?!swap)/)
  })
  it('self-hosts every font (no Google Fonts requests on the critical path)', () => {
    const custom = fs.readFileSync(path.join(__dirname, '..', 'src', 'css', 'custom.css'), 'utf8')
    assert.doesNotMatch(config, /fonts\.googleapis\.com|fonts\.gstatic\.com/)
    assert.doesNotMatch(custom, /@import url\(/)
    assert.match(custom, /font-family: "Avenir";[\s\S]*?font-display: swap/)
  })
})

describe('navbar logo', () => {
  it('declares width and height so the navbar does not shift when it loads', () => {
    assert.match(config, /logo:\s*\{[\s\S]*?width:\s*168,[\s\S]*?height:\s*25,/)
  })
})

describe('head scripts', () => {
  it('ships no comment-only or dev-only inline scripts', () => {
    assert.doesNotMatch(config, /\/\/ Set the active site theme/)
    assert.doesNotMatch(config, /Early gtag stub/)
  })
})
