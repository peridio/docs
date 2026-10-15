const assert = require('node:assert/strict')
const { execFileSync } = require('node:child_process')
const fs = require('node:fs')
const path = require('node:path')
const { describe, it } = require('node:test')

// MDX wraps text that sits on its own line inside a JSX block in a <p>. When
// that block is itself a <p>, the page renders <p><p>…</p></p>: invalid HTML
// that React 19 refuses to hydrate, so it throws away the server render and
// re-renders the whole page on the client. Docusaurus parses .md as MDX too
// (markdown.format defaults to 'mdx'), so both extensions are checked.
const SITE = path.join(__dirname, '..')
const files = execFileSync('git', ['ls-files', '*.mdx', '*.md'], { cwd: SITE, encoding: 'utf8' })
  .split('\n')
  .filter(Boolean)

describe('MDX paragraphs', () => {
  it('never opens a <p> on a line of its own (MDX would nest a second <p> inside)', () => {
    const offenders = []
    for (const file of files) {
      fs.readFileSync(path.join(SITE, file), 'utf8')
        .split('\n')
        .forEach((line, i) => {
          if (/^\s*<p(\s[^>]*)?>\s*$/.test(line)) offenders.push(`${file}:${i + 1}`)
        })
    }
    assert.deepEqual(offenders, [])
  })
})
