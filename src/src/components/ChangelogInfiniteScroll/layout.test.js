const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const { describe, it } = require('node:test')

const feed = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8')
const css = fs.readFileSync(path.join(__dirname, 'styles.module.css'), 'utf8')

// The feed appends entries on its own after load. If the footer starts on
// screen (a short first entry on a phone), every append shifts it: 0.11 CLS.
describe('Changelog feed layout', () => {
  it('reserves a viewport of height while more entries are pending', () => {
    assert.match(css, /\.feedPending\s*\{[^}]*min-height:\s*100(s|d)?vh/)
  })
  it('applies the reservation only until the last entry is shown', () => {
    assert.match(feed, /visibleCount < subsequentEntries\.length \? styles\.feedPending/)
  })
})

// /changelog/latest paints a near-empty page and then redirects in the browser
// to the newest entry. Its footer must already be below the fold, or the swap
// to the feed shifts it.
describe('Changelog latest redirect page', () => {
  const dir = path.join(__dirname, '..', 'ChangelogDocItem')
  it('renders the redirect inside a viewport-tall wrapper', () => {
    const item = fs.readFileSync(path.join(dir, 'index.js'), 'utf8')
    assert.match(item, /className=\{styles\.redirecting\}/)
    const css = fs.readFileSync(path.join(dir, 'styles.module.css'), 'utf8')
    assert.match(css, /\.redirecting\s*\{[^}]*min-height:\s*100vh/)
  })
})
