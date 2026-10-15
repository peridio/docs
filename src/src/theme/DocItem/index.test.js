const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const { describe, it } = require('node:test')

const wrapper = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8')
const config = fs.readFileSync(
  path.join(__dirname, '..', '..', '..', 'docusaurus.config.js'),
  'utf8'
)

describe('DocItem wrapper', () => {
  it('does not import the changelog feed (it would ship every entry on every docs page)', () => {
    assert.doesNotMatch(wrapper, /ChangelogInfiniteScroll/)
  })
  it('the changelog plugin uses its own doc item component', () => {
    assert.match(
      config,
      /id: 'changelog',[\s\S]*?docItemComponent: '@site\/src\/components\/ChangelogDocItem'/
    )
  })
})

describe('Changelog entry metadata', () => {
  it('renders the entry description into the page head', () => {
    const item = fs.readFileSync(
      path.join(__dirname, '..', '..', 'components', 'ChangelogDocItem', 'index.js'),
      'utf8'
    )
    assert.match(item, /<PageMetadata[\s\S]*?description=\{metadata\.description\}/)
  })
})

describe('Changelog entry title', () => {
  const feed = fs.readFileSync(
    path.join(__dirname, '..', '..', 'components', 'ChangelogInfiniteScroll', 'index.js'),
    'utf8'
  )
  const item = fs.readFileSync(
    path.join(__dirname, '..', '..', 'components', 'ChangelogDocItem', 'index.js'),
    'utf8'
  )
  it('has one source of truth: the feed renders it through Head, never document.title', () => {
    assert.doesNotMatch(feed, /document\.title\s*=/)
    assert.match(feed, /<Head>\s*<title>\{activeTitle\}<\/title>/)
  })
  it('the doc item does not set a competing title', () => {
    assert.doesNotMatch(item, /<PageMetadata[^>]*title=/)
  })
})
