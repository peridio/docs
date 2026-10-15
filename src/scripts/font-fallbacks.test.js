const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const { describe, it } = require('node:test')

const fonts = fs.readFileSync(path.join(__dirname, '..', 'src', 'css', 'fonts.css'), 'utf8')

function cssFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) return cssFiles(p)
    return e.name.endsWith('.css') && e.name !== 'fonts.css' ? [p] : []
  })
}
const sheets = cssFiles(path.join(__dirname, '..', 'src')).map((file) => ({
  file: path.relative(path.join(__dirname, '..'), file),
  css: fs.readFileSync(file, 'utf8'),
}))

// With font-display: swap, text first paints in the fallback and reflows when
// the web font lands (0.09 CLS on a changelog entry). A local Arial face sized
// to the web font's metrics makes that swap land in place.
describe('Metric-matched font fallbacks', () => {
  for (const family of ['Inter', 'Spline Sans', 'Geist']) {
    it(`declares a sized "${family} Fallback" face`, () => {
      const face = fonts.match(
        new RegExp(`@font-face\\s*\\{[^}]*font-family:\\s*"${family} Fallback"[^}]*\\}`)
      )
      assert.ok(face, `no "${family} Fallback" @font-face in fonts.css`)
      for (const prop of ['size-adjust', 'ascent-override', 'descent-override']) {
        assert.match(face[0], new RegExp(`${prop}:\\s*[\\d.]+%`))
      }
      assert.match(face[0], /local\(['"]Arial['"]\)/)
    })
    it(`every "${family}" stack under src/ falls back to it`, () => {
      let seen = 0
      for (const { file, css } of sheets) {
        for (const stack of css.match(new RegExp(`"${family}",[^;]*;`, 'g')) || []) {
          seen++
          assert.match(stack, new RegExp(`"${family} Fallback"`), file)
        }
      }
      assert.ok(seen > 0)
    })
  }
})
