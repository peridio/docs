import assert from 'node:assert/strict'
import { test } from 'node:test'
import { clampKicker, loadFonts, prepareCard, wrap } from './render.mjs'
import { OG_LAYOUT } from './tokens.mjs'

test('clampKicker keeps short copy as written', () => {
  assert.equal(clampKicker('One sentence.  With   spaces.', 150), 'One sentence. With spaces.')
})

test('clampKicker drops whole trailing sentences past the budget', () => {
  const first = 'A'.repeat(60) + '.'
  const second = 'B'.repeat(60) + '.'
  assert.equal(clampKicker(`${first} ${second} ${'C'.repeat(60)}.`, 130), `${first} ${second}`)
})

test('clampKicker does not treat a dotted part number as a sentence end', () => {
  const text =
    'Physical access should not equal access to the data. This note wires four things into one boot chain on the i.MX93 FRDM.'
  assert.equal(clampKicker(text, 60), 'Physical access should not equal access to the data.')
  assert.equal(clampKicker(text, 500), text)
})

test('clampKicker keeps an over-budget first sentence for the fitter to cut', () => {
  const long = 'word '.repeat(50).trim() + '.'
  assert.equal(clampKicker(long, 20), long)
})

test('wrap respects the line limit and the column width', async () => {
  const fonts = await loadFonts()
  const style = { size: 40, weight: 650 }
  assert.deepEqual(await wrap('Short title', fonts, style, 1), ['Short title'])
  assert.equal(await wrap('word '.repeat(80), fonts, style, 2), null)
  assert.equal(await wrap('x'.repeat(200), fonts, style, 3), null)
})

test('prepareCard fits a long title by stepping the size down', async () => {
  const fonts = await loadFonts()
  const card = await prepareCard(
    {
      slug: 'test',
      title: 'One NPU today, a different NPU tomorrow: MoveNet pose detection on the i.MX 8M Plus',
      description: 'Short dek.',
      category: 'Portability',
      artwork: null,
    },
    fonts
  )
  assert.equal(card.eyebrow, 'Field Notes · Portability')
  assert.ok(card.titleSize <= OG_LAYOUT.titleMaxSize && card.titleSize >= OG_LAYOUT.titleMinSize)
  assert.ok(
    card.titleLines.length * card.titleSize * OG_LAYOUT.titleLineHeight <= OG_LAYOUT.titleMaxHeight
  )
  assert.deepEqual(card.kickerLines, ['Short dek.'])
  assert.equal(card.image, null)
})

test('prepareCard refuses a title that cannot fit, naming the fix', async () => {
  const fonts = await loadFonts()
  await assert.rejects(
    prepareCard({ slug: 't', title: 'word '.repeat(60), description: '', artwork: null }, fonts),
    /shorten it/
  )
})
