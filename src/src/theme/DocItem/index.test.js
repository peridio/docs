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
