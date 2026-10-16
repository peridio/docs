const { test } = require('node:test')
const assert = require('node:assert')
const fs = require('node:fs')
const path = require('node:path')

// Getting Started moved to /learn/get-started; sync-targets.js copies these
// sources into generated-targets.json, so an old path here comes back on every sync.
const OLD = '/developer-reference/getting-started/'
const SOURCES = [
  'scripts/sync-targets.js',
  'src/data/hardware/targets.json',
  'src/data/hardware/virtual-environment.json',
]

for (const rel of SOURCES) {
  test(`${rel} has no ${OLD} links`, () => {
    const text = fs.readFileSync(path.resolve(__dirname, '..', rel), 'utf8')
    assert.ok(!text.includes(OLD), `${rel} still links to ${OLD}; use /learn/get-started/`)
  })
}
