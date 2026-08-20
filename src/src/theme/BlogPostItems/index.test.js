const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const { describe, it } = require('node:test')

const dir = __dirname
const js = fs.readFileSync(path.join(dir, 'index.js'), 'utf8')
const css = fs.readFileSync(path.join(dir, 'styles.module.css'), 'utf8')

describe('Field Notes gasketed chassis', () => {
  it('wraps the CRT screen in a gasket with two decorative pips', () => {
    assert.match(js, /styles\.gasket/)
    assert.match(js, /styles\.pipAmber/)
    assert.match(js, /styles\.pipGreen/)
    assert.match(js, /aria-hidden/)
  })

  it('sizes the housing around a 200px / 576px screen so dither stays 1:1', () => {
    assert.match(css, /--fn-bezel:/)
    assert.match(css, /--fn-gasket:/)
    assert.match(css, /grid-template-columns:\s*218px/)
    assert.match(css, /max-width:\s*602px/)
    assert.match(css, /width:\s*calc\(100% \+ 2 \* \(var\(--fn-bezel\) \+ var\(--fn-gasket\)\)\)/)
  })

  it('lights the pips from the shared --fn-focus level', () => {
    // Both pips crossfade an overlay driven by --fn-focus, so a half-lit card
    // reads as half-lit; swapping background/box-shadow could only be on or off.
    assert.match(
      css,
      /\.pipAmber::after,\s*\n\.pipGreen::after \{[^}]*opacity: var\(--fn-focus, 0\)/
    )
    assert.match(css, /\.pipAmber::after \{[^}]*#f5a623/)
    assert.match(css, /\.pipGreen::after \{[^}]*#34d399/)
  })
})

describe('Field Notes lit state', () => {
  it('drives the tint, pips and underline off one --fn-focus level', () => {
    assert.match(css, /\.thumb \.screen::after \{[^}]*opacity: var\(--fn-focus, 0\)/)
    assert.match(
      css,
      /text-decoration-color: color-mix\([\s\S]*?calc\(var\(--fn-focus, 0\) \* 100%\)/
    )
    // An unset custom property makes `opacity` invalid at computed-value time,
    // which resolves to 1 and would light every tile at once -- hence the `, 0`.
    assert.doesNotMatch(css, /var\(--fn-focus\)/)
  })

  it('keeps :hover behind (hover: hover) so a tap cannot latch a card lit', () => {
    // iOS synthesises :hover on tap and leaves it on that card until you tap
    // elsewhere, which stranded the glow on one tile for the rest of the scroll.
    const gated = css.slice(css.indexOf('@media (hover: hover)'))
    assert.match(gated, /\.featured:hover,[\s\S]*?--fn-focus: 1/)
    assert.match(gated, /\.row:hover,[\s\S]*?--fn-focus: 1/)
    // No lit state may hang off :hover outside that gate.
    const ungated = css.slice(0, css.indexOf('@media (hover: hover)'))
    assert.doesNotMatch(ungated, /:hover[^{]*\{[^}]*--fn-focus/)
  })

  it('ramps the level from viewport position when there is no pointer', () => {
    assert.match(js, /matchMedia\('\(hover: none\)'\)/)
    assert.match(js, /prefers-reduced-motion: reduce/)
    assert.match(js, /createViewportFocus/)
    // The ramp measures the CRT, not the article around it.
    assert.match(js, /data-fn-screen/)
  })
})

describe('Field Notes responsive tiles', () => {
  it('offers the row tile at both widths so mobile stops upscaling the 400px asset', () => {
    // The dither is baked into the file, so a browser rescale turns dots into mush.
    // Desktop resolves 200px x DPR2 = 400 and keeps the thumb painting 1:1; below
    // 768px the grid collapses to one column and 100vw x DPR2 resolves the 800w
    // tile instead of stretching the thumb over three device pixels per dot.
    assert.match(js, /srcSet/)
    assert.match(js, /400w/)
    assert.match(js, /800w/)
    assert.match(js, /\(max-width:\s*768px\)\s*100vw,\s*200px/)
  })

  it('derives every asset variant from the thumb path rather than plumbing each one', () => {
    assert.match(js, /-thumb\./)
    assert.doesNotMatch(js, /image\.replace\('-thumb\.', '-hero\.'\)/)
  })

  it('breaks the row grid to one column at the same width the srcset switches on', () => {
    // The 768px in `sizes` above is only correct while it matches this breakpoint.
    assert.match(css, /@media \(max-width:\s*768px\)/)
  })

  it('pulls the hero tile back inside the content width once the grid is one column', () => {
    // The desktop rule above grows .featuredThumb past its column by bezel +
    // gasket so the screen fills the featured grid gap. One column has no gap to
    // grow into, so that overhang runs off the viewport and clips the chassis.
    const mobile = css.slice(css.indexOf('@media (max-width: 768px)'))
    assert.match(mobile, /\.featuredThumb\s*\{[^}]*width:\s*100%/)
    assert.match(mobile, /\.featuredThumb\s*\{[^}]*max-width:\s*100%/)
  })
})
