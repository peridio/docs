/* Viewport-driven stand-in for :hover on the Field Notes feed.

   The tile's lit state -- the accent tint that washes down the CRT plus the two
   chassis pips -- is a hover state on a pointer device. A touchscreen has no
   pointer, so on a phone the tiles stayed dark no matter where you scrolled, and
   the one case where iOS *does* synthesise :hover made it worse: tap a card and
   Safari latches :hover onto it, so a single card stayed lit while you scrolled
   past everything else, until you tapped somewhere unrelated.

   So on touch the viewport plays the pointer. A card's distance from the middle
   of the screen becomes `--fn-focus`, 0 (dark) to 1 (fully lit), and the glow
   ramps in as the tile settles into the reading band and back out as it leaves,
   walking down the feed with the scroll. styles.module.css reads --fn-focus
   everywhere the lit state used to be a discrete :hover rule, and keeps :hover
   itself behind `(hover: hover)` so the latched-tap state can't come back.

   Geometry is measured off the screen element (`[data-fn-screen]`), not the whole
   card: the screen is what lights up, and on mobile it sits at the top of a
   stacked card, so measuring the article would peak the glow a hundred-odd pixels
   after the tile has already passed the middle.

   Deliberately import-free -- see viewportFocus.test.js, which evaluates this
   file directly rather than going through the bundler. */

/* Distance from the middle of the viewport, as a fraction of half the viewport
   height: 0 is dead centre, 1 is the top or bottom edge. Full brightness holds
   inside FULL, and is gone by FADE, which lands short of the edge so a tile
   finishes fading while it is still on screen rather than clipping to dark. */
const FULL = 0.25
const FADE = 0.9

// Per-frame writes repaint a blended overlay, so don't ask for a repaint the eye
// can't see: two decimals is finer than the 0.18s opacity transition resolves.
const STEP = 100

export function focusForOffset(offset) {
  const ramp = (FADE - Math.abs(offset)) / (FADE - FULL)
  const clamped = ramp < 0 ? 0 : ramp > 1 ? 1 : ramp
  // Smoothstep, so the glow eases in and out instead of arriving on a straight
  // line with a corner at each end of the ramp.
  return clamped * clamped * (3 - 2 * clamped)
}

export function focusForRect(rect, viewportHeight) {
  if (!viewportHeight) return 0
  const middle = viewportHeight / 2
  return focusForOffset((rect.top + rect.height / 2 - middle) / middle)
}

function anchorFor(card) {
  return card.querySelector('[data-fn-screen]') || card
}

/* One controller drives every card on the page: a single scroll listener and a
   single IntersectionObserver, which keeps the per-frame loop down to the one or
   two cards actually on screen. */
export function createViewportFocus(win) {
  const observed = new Set()
  const onscreen = new Map() // card -> element whose geometry we measure
  const written = new Map() // card -> last value written, so we skip no-op writes
  let observer = null
  let frame = 0

  const paint = () => {
    frame = 0
    const viewportHeight = win.innerHeight
    onscreen.forEach((anchor, card) => {
      const raw = focusForRect(anchor.getBoundingClientRect(), viewportHeight)
      const value = Math.round(raw * STEP) / STEP
      if (written.get(card) === value) return
      written.set(card, value)
      card.style.setProperty('--fn-focus', String(value))
    })
  }

  /* Coalesce to one paint per frame by replacing the pending request rather than
     skipping the new one. Skipping looks equivalent and is not: a frame requested
     while the page isn't rendering (backgrounded tab, app switch on a phone) can
     be dropped without ever running, and a guard that waits for it to run would
     then sit latched and never repaint again. */
  const schedule = () => {
    if (frame) win.cancelAnimationFrame(frame)
    frame = win.requestAnimationFrame(paint)
  }

  const clear = (card) => {
    onscreen.delete(card)
    written.delete(card)
    card.style.removeProperty('--fn-focus')
  }

  const onIntersect = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) onscreen.set(entry.target, anchorFor(entry.target))
      else if (onscreen.has(entry.target)) clear(entry.target)
    })
    schedule()
  }

  /* Coming back from another app, the scroll position may have moved (or been
     restored) while nothing was rendering. Repaint against wherever it landed
     instead of waiting for the reader to scroll again. */
  const onVisible = () => {
    if (win.document && win.document.visibilityState === 'hidden') return
    schedule()
  }

  const attach = () => {
    // A margin either side means a card starts ramping just before it appears,
    // so it scrolls in already lifting rather than switching on at the edge.
    if (win.IntersectionObserver) {
      observer = new win.IntersectionObserver(onIntersect, { rootMargin: '15% 0px' })
    }
    win.addEventListener('scroll', schedule, { passive: true })
    win.addEventListener('resize', schedule)
    if (win.document) win.document.addEventListener('visibilitychange', onVisible)
  }

  const detach = () => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
    win.removeEventListener('scroll', schedule)
    win.removeEventListener('resize', schedule)
    if (win.document) win.document.removeEventListener('visibilitychange', onVisible)
    if (frame) win.cancelAnimationFrame(frame)
    frame = 0
  }

  return {
    add(card) {
      if (observed.has(card)) return
      if (!observed.size) attach()
      observed.add(card)
      // Without an observer (no IntersectionObserver) every card stays in the
      // loop; the ramp still resolves to 0 for anything off screen.
      if (observer) observer.observe(card)
      else onscreen.set(card, anchorFor(card))
      schedule()
    },
    remove(card) {
      if (!observed.delete(card)) return
      if (observer) observer.unobserve(card)
      clear(card)
      if (!observed.size) detach()
    },
  }
}
