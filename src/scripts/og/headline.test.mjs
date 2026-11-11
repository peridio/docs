import assert from 'node:assert/strict'
import { test } from 'node:test'
import { cardTitle } from './headline.mjs'

test('a set og_title overrides the title on the card', () => {
  assert.equal(cardTitle('Short headline', 'A much longer page title'), 'Short headline')
  // Surrounding whitespace is dropped, so the alt text matches what renders.
  assert.equal(cardTitle('  padded  ', 'Title'), 'padded')
  assert.equal(cardTitle('', '  Title  '), 'Title')
})

test('a blank or missing og_title falls back to the title', () => {
  // The Field Notes template ships `og_title: ''`.
  assert.equal(cardTitle('', 'Title'), 'Title')
  assert.equal(cardTitle('   ', 'Title'), 'Title')
  assert.equal(cardTitle(undefined, 'Title'), 'Title')
  // `og_title:` with no value parses as null.
  assert.equal(cardTitle(null, 'Title'), 'Title')
})

test('a non-string og_title is treated as absent', () => {
  assert.equal(cardTitle(2024, 'Title'), 'Title')
  assert.equal(cardTitle(true, 'Title'), 'Title')
  assert.equal(cardTitle({}, 'Title'), 'Title')
})
