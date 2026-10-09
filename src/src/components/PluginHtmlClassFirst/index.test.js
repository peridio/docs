const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const { describe, it } = require('node:test')
const { pluginHtmlClassName } = require('./className.js')

const theme = path.join(__dirname, '..', '..', 'theme')
const read = (rel) => fs.readFileSync(path.join(theme, rel, 'index.js'), 'utf8')

// Every blog page type that sets its own <html> class above Layout, where
// Docusaurus adds the plugin class. Archive sets none, so it is not listed.
const PAGES = [
  'BlogPostPage',
  'BlogListPage',
  'BlogTagsListPage',
  'BlogTagsPostsPage',
  'Blog/Pages/BlogAuthorsListPage',
  'Blog/Pages/BlogAuthorsPostsPage',
]

// Helmet can flush <html class> between nested providers while React is still
// hydrating, so the outermost provider must already hold the full class set.
describe('Plugin html class comes first', () => {
  it('names classes the way Docusaurus does', () => {
    assert.equal(
      pluginHtmlClassName({ name: 'docusaurus-plugin-content-blog', id: 'field-notes' }),
      'plugin-blog plugin-id-field-notes'
    )
    assert.equal(
      pluginHtmlClassName({ name: 'docusaurus-plugin-content-docs', id: 'default' }),
      'plugin-docs plugin-id-default'
    )
  })
  for (const page of PAGES) {
    it(`${page} opens with PluginHtmlClassFirst`, () => {
      const src = read(page)
      assert.match(
        src,
        /import PluginHtmlClassFirst from '@site\/src\/components\/PluginHtmlClassFirst'/
      )
      assert.match(src, /return \(\s*<PluginHtmlClassFirst[\s>]/)
    })
  }
  it('BlogListPage keeps blog-list-page in that first provider', () => {
    // custom.css styles html.blog-list-page, so it can't wait for a later one.
    assert.match(
      read('BlogListPage'),
      /<PluginHtmlClassFirst\s+className=\{clsx\([^)]*blogListPage/
    )
    assert.doesNotMatch(read('BlogListPage'), /<HtmlClassNameProvider/)
  })
})
