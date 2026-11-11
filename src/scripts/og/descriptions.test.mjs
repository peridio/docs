import assert from 'node:assert/strict'
import { test } from 'node:test'
import { DESCRIPTION_MAX, descriptionProblems } from '../og-cards.mjs'

test('every Field Note description, drafts included, is within the limit', () => {
  assert.deepEqual(descriptionProblems(), [])
})

test('a description over the limit is reported, one at the limit is not', () => {
  const problems = descriptionProblems([
    { slug: 'at-limit', description: 'a'.repeat(DESCRIPTION_MAX) },
    { slug: 'over', description: 'a'.repeat(DESCRIPTION_MAX + 1) },
  ])
  assert.equal(problems.length, 1)
  assert.match(problems[0], /^over: description is 161 chars/)
})
