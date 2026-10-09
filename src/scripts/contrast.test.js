const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const { describe, it } = require('node:test')

const SITE = path.join(__dirname, '..')
const read = (p) => fs.readFileSync(path.join(SITE, p), 'utf8')
const primitives = read('src/css/tokens/_primitives.css')
const semantics = read('src/css/tokens/_semantics.css')

function hex(token) {
  const m = primitives.match(new RegExp(`${token}:\\s*(#[0-9a-fA-F]{6})`))
  assert.ok(m, `${token} not found`)
  return m[1]
}
function luminance(h) {
  const c = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255)
  const [r, g, b] = c.map((x) => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4))
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
const ratio = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}
// The token a semantic variable points at in the dark block (second definition).
function darkToken(name) {
  const defs = [...semantics.matchAll(new RegExp(`${name}:\\s*var\\((--color-[a-z0-9-]+)\\)`, 'g'))]
  assert.ok(defs.length >= 2, `${name} needs a light and a dark definition`)
  return defs[defs.length - 1][1]
}

describe('dark-mode contrast (WCAG AA 4.5:1)', () => {
  it('solid accent fills keep white text readable', () => {
    assert.ok(ratio('#ffffff', hex(darkToken('--color-accent-solid'))) >= 4.5)
  })
  it('accent-coloured text is readable on the dark body', () => {
    assert.ok(ratio(hex(darkToken('--color-accent-link')), '#1a1a1e') >= 4.5)
  })
  it('white-on-accent components use the solid token, not the primary', () => {
    for (const file of [
      'src/components/ChangelogInfiniteScroll/styles.module.css',
      'src/components/PathComparison/styles.module.css',
      'src/components/ReferenceList/styles.module.css',
      'src/components/CalloutButton/index.tsx',
      'docs-guides/getting-started/index.mdx',
    ]) {
      assert.doesNotMatch(read(file), /background:\s*'?var\(--ifm-color-primary\)/, file)
    }
  })
  it('accent text on dark surfaces uses the link token', () => {
    assert.match(
      read('src/components/TerminalDemo/styles.module.css'),
      /\.promptLine\s*\{\s*color:\s*var\(--color-accent-link\)/
    )
    assert.match(
      read('src/css/custom.css'),
      /> \.navbar__link--active \{\s*color:\s*var\(--color-accent-link\)/
    )
  })
  it('dark code comments and terminal titles clear 4.5:1', () => {
    const custom = read('src/css/custom.css')
    const m = custom.match(
      /\[data-theme=["']dark["']\] \.prism-code \.token\.comment\s*\{\s*color:\s*(#[0-9a-f]{6})/
    )
    assert.ok(m, 'dark comment override missing')
    assert.ok(ratio(m[1], '#282c34') >= 4.5)
    const t = read('src/components/TerminalDemo/styles.module.css').match(
      /\.titleText \{[^}]*color:\s*(#[0-9a-f]{6})/
    )
    assert.ok(t && ratio(t[1], '#2a2a2e') >= 4.5)
  })
  it('underlines links inside prose so they do not rely on colour alone', () => {
    assert.match(
      read('src/css/custom.css'),
      /:where\(\.theme-doc-markdown, #__blog-post-container\) :where\(p, li, td\) > a[^{]*\{[^}]*text-decoration: underline/
    )
  })
  it('keeps the prose underline at low specificity (no ID weight)', () => {
    assert.doesNotMatch(read('src/css/custom.css'), /:is\([^)]*#__blog-post-container/)
  })
  it('active sidebar, category and table-of-contents links use the readable accent', () => {
    const custom = read('src/css/custom.css')
    assert.doesNotMatch(
      custom,
      /\.menu__link--active[^{]*\{[^}]*color: var\(--ifm-color-primary\) !important/
    )
    assert.match(
      custom,
      /\.table-of-contents__link--active[^{]*\{[^}]*color: var\(--color-accent-link\)/
    )
    assert.doesNotMatch(
      read('src/theme/DocSidebarItem/Category/styles.module.css'),
      /(?<!-)color: var\(--ifm-color-primary\)/
    )
  })
})
