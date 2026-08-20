const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')
const { describe, it } = require('node:test')

// viewportFocus.js is ESM because webpack consumes it, while `npm test` runs plain
// CommonJS and Node will not `import()` a .js file inside this package. The module
// is deliberately import-free, so dropping the `export` keywords leaves a script we
// can evaluate and unit-test for real rather than pattern-matching its source.
const source = fs.readFileSync(path.join(__dirname, 'viewportFocus.js'), 'utf8')

function load() {
  assert.doesNotMatch(
    source,
    /^\s*import\s/m,
    'the shim below only works while this module has no imports'
  )
  const stripped = source.replace(/^export /gm, '')
  return vm.runInNewContext(`${stripped};({ focusForOffset, focusForRect, createViewportFocus })`)
}

const { focusForOffset, focusForRect, createViewportFocus } = load()

describe('scroll ramp', () => {
  it('peaks in the middle of the viewport and dies at the edges', () => {
    assert.equal(focusForOffset(0), 1)
    assert.equal(focusForOffset(1), 0)
    assert.equal(focusForOffset(-1), 0)
  })

  it('reads the same above and below the middle', () => {
    for (const offset of [0.1, 0.3, 0.55, 0.8]) {
      assert.equal(focusForOffset(offset), focusForOffset(-offset))
    }
  })

  it('ramps continuously rather than switching on', () => {
    // The complaint being fixed is a hover state that pops. Walking the ramp in
    // 1% steps, no step may jump more than a few percent of the way to lit.
    let previous = focusForOffset(-1.2)
    let partial = 0
    for (let offset = -1.2; offset <= 1.2; offset += 0.01) {
      const value = focusForOffset(offset)
      assert.ok(Math.abs(value - previous) < 0.05, `jump at ${offset.toFixed(2)}`)
      if (value > 0.01 && value < 0.99) partial += 1
      previous = value
    }
    assert.ok(partial > 60, `expected a wide half-lit band, saw ${partial} steps`)
  })

  it('eases out of both ends of the ramp', () => {
    // Smoothstep: the first slice of travel moves less than the middle slice does.
    const foot = focusForOffset(0.88) - focusForOffset(0.9)
    const middle = focusForOffset(0.55) - focusForOffset(0.57)
    assert.ok(foot < middle, `foot ${foot} should be gentler than middle ${middle}`)
  })

  it('holds full brightness through a reading band, not a single pixel', () => {
    assert.equal(focusForOffset(0.2), 1)
    assert.ok(focusForOffset(0.5) > 0 && focusForOffset(0.5) < 1)
  })

  it('measures a rect against the middle of the viewport', () => {
    const centred = { top: 400, height: 200 }
    assert.equal(focusForRect(centred, 1000), 1)
    assert.equal(focusForRect({ top: 980, height: 200 }, 1000), 0)
    assert.equal(focusForRect(centred, 0), 0, 'no viewport height yet means dark')
  })
})

// Minimal stand-ins for the bits of the DOM the controller touches.
function fakeWindow(innerHeight = 1000) {
  const listeners = new Map()
  const frames = new Map()
  const observers = []
  class FakeObserver {
    constructor(callback) {
      this.callback = callback
      this.observed = new Set()
      observers.push(this)
    }
    observe(el) {
      this.observed.add(el)
    }
    unobserve(el) {
      this.observed.delete(el)
    }
    disconnect() {
      this.observed.clear()
      this.disconnected = true
    }
    send(entries) {
      this.callback(entries)
    }
  }
  return {
    innerHeight,
    IntersectionObserver: FakeObserver,
    observers,
    listeners,
    addEventListener(type, fn) {
      listeners.set(type, (listeners.get(type) ?? new Set()).add(fn))
    },
    removeEventListener(type, fn) {
      listeners.get(type)?.delete(fn)
    },
    requestAnimationFrame(fn) {
      const id = frames.size + 1
      frames.set(id, fn)
      return id
    },
    cancelAnimationFrame(id) {
      frames.delete(id)
    },
    pending: frames,
    flush() {
      const due = [...frames.values()]
      frames.clear()
      due.forEach((fn) => fn())
    },
    fire(type) {
      listeners.get(type)?.forEach((fn) => fn())
    },
  }
}

function fakeCard(top, height = 200) {
  const properties = new Map()
  const screen = { getBoundingClientRect: () => ({ top: card.top, height }) }
  const card = {
    top,
    properties,
    querySelector: (selector) => (selector === '[data-fn-screen]' ? screen : null),
    getBoundingClientRect: () => ({ top: card.top, height }),
    style: {
      setProperty: (name, value) => properties.set(name, value),
      removeProperty: (name) => properties.delete(name),
    },
  }
  return card
}

describe('viewport focus controller', () => {
  it('lights a card by how close its screen is to the middle', () => {
    const win = fakeWindow()
    const focus = createViewportFocus(win)
    const card = fakeCard(400)
    focus.add(card)
    win.observers[0].send([{ target: card, isIntersecting: true }])
    win.flush()
    assert.equal(card.properties.get('--fn-focus'), '1')

    card.top = 700
    win.fire('scroll')
    win.flush()
    const dimmed = Number(card.properties.get('--fn-focus'))
    assert.ok(dimmed > 0 && dimmed < 1, `expected a partial value, got ${dimmed}`)
  })

  it('measures the screen rather than the whole card', () => {
    // On mobile the tile sits above the copy, so measuring the article would peak
    // the glow well after the tile itself had left the middle of the screen. This
    // card is far off centre while its screen is dead centre: full brightness is
    // what proves the screen is the thing being measured.
    const win = fakeWindow()
    const focus = createViewportFocus(win)
    const card = fakeCard(900)
    card.querySelector = (selector) =>
      selector === '[data-fn-screen]'
        ? { getBoundingClientRect: () => ({ top: 400, height: 200 }) }
        : null
    focus.add(card)
    win.observers[0].send([{ target: card, isIntersecting: true }])
    win.flush()
    assert.equal(card.properties.get('--fn-focus'), '1')
  })

  it('drops the property once a card scrolls out of range', () => {
    const win = fakeWindow()
    const focus = createViewportFocus(win)
    const card = fakeCard(400)
    focus.add(card)
    win.observers[0].send([{ target: card, isIntersecting: true }])
    win.flush()
    win.observers[0].send([{ target: card, isIntersecting: false }])
    win.flush()
    assert.equal(card.properties.has('--fn-focus'), false)
  })

  it('tears down its listeners with the last card, and clears the card', () => {
    const win = fakeWindow()
    const focus = createViewportFocus(win)
    const card = fakeCard(400)
    focus.add(card)
    win.observers[0].send([{ target: card, isIntersecting: true }])
    win.flush()
    focus.remove(card)
    assert.equal(card.properties.has('--fn-focus'), false, 'a removed card must not stay lit')
    assert.equal(win.observers[0].disconnected, true)
    assert.equal(win.listeners.get('scroll').size, 0)
  })

  it('recovers when a frame is dropped instead of run', () => {
    // Backgrounded pages get their frame requests dropped. A guard that waited for
    // the pending frame to run would sit latched from then on, so the next scroll
    // has to be able to replace it.
    const win = fakeWindow()
    const focus = createViewportFocus(win)
    const card = fakeCard(400)
    focus.add(card)
    win.observers[0].send([{ target: card, isIntersecting: true }])
    win.pending.clear() // the page was hidden: those frames never ran
    card.top = 700
    win.fire('scroll')
    win.flush()
    const value = Number(card.properties.get('--fn-focus'))
    assert.ok(value > 0 && value < 1, `expected the ramp to resume, got ${value}`)
  })

  it('still ramps when the browser has no IntersectionObserver', () => {
    const win = fakeWindow()
    win.IntersectionObserver = undefined
    const focus = createViewportFocus(win)
    const card = fakeCard(400)
    focus.add(card)
    win.flush()
    assert.equal(card.properties.get('--fn-focus'), '1')
  })
})
