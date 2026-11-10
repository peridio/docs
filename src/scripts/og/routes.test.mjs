import assert from 'node:assert/strict'
import { test } from 'node:test'
import { cardPathFor, DEFAULT_OG_CARD, familyFor } from './routes.mjs'

test('cardPathFor maps a permalink to its card under /og', () => {
  assert.equal(
    cardPathFor('/hardware/nvidia/jetson-orin-nx'),
    '/og/hardware/nvidia/jetson-orin-nx.png'
  )
  assert.equal(cardPathFor('/changelog/october-2026/1.0.0'), '/og/changelog/october-2026/1.0.0.png')
})

test('cardPathFor ignores trailing slashes and maps the root to index', () => {
  assert.equal(cardPathFor('/learn/'), cardPathFor('/learn'))
  assert.equal(cardPathFor('/'), '/og/index.png')
})

test('no docs page can claim the default card path', () => {
  assert.notEqual(cardPathFor('/'), DEFAULT_OG_CARD)
  assert.equal(DEFAULT_OG_CARD, '/og/default.png')
})

test('familyFor routes each section to its card family', () => {
  const cases = {
    '/developer-reference/references': 'reference',
    '/developer-reference/references/avocado-cli': 'reference',
    '/developer-reference': 'dev-reference',
    '/developer-reference/avocado-cli/commands': 'dev-reference',
    '/hardware/support-matrix': 'hardware',
    '/learn/missions/first-ota': 'learn',
    '/changelog/october-2026/1.0.0': 'changelog',
    '/avocado-os/about': 'product',
    '/': 'product',
  }
  for (const [permalink, key] of Object.entries(cases))
    assert.equal(familyFor(permalink).key, key, permalink)
})

test('a prefix match needs a path boundary', () => {
  // `/hardware-foo` is not under /hardware.
  assert.equal(familyFor('/hardware-foo').key, 'product')
  assert.equal(familyFor('/learning').key, 'product')
})
