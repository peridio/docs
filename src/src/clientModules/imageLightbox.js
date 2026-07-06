import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment'

// Selector for images that should open in the zoomable lightbox.
const SELECTOR = '.markdown img'
const MIN_SCALE = 1
const MAX_SCALE = 8
const WHEEL_STEP = 0.0015
const BUTTON_STEP = 1.4

if (ExecutionEnvironment.canUseDOM) {
  let overlay
  let imgEl
  let scale = 1
  let tx = 0
  let ty = 0
  // Element focused before the lightbox opened, so focus can be restored on close.
  let lastFocused = null

  // Pointer / drag state.
  let dragging = false
  let lastX = 0
  let lastY = 0
  // Active pointers for pinch handling (pointerId -> {x, y}).
  const pointers = new Map()
  let pinchStartDist = 0
  let pinchStartScale = 1

  const clamp = (v, min, max) => Math.min(Math.max(v, min), max)

  function apply() {
    imgEl.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`
    imgEl.style.cursor = scale > 1 ? (dragging ? 'grabbing' : 'grab') : 'zoom-out'
  }

  // Zoom toward a screen point (sx, sy measured from viewport center).
  function zoomTo(nextScale, sx, sy) {
    const s = clamp(nextScale, MIN_SCALE, MAX_SCALE)
    const cx = (sx - tx) / scale
    const cy = (sy - ty) / scale
    tx = sx - s * cx
    ty = sy - s * cy
    scale = s
    if (scale === 1) {
      tx = 0
      ty = 0
    }
    apply()
  }

  function reset() {
    scale = 1
    tx = 0
    ty = 0
    apply()
  }

  function build() {
    overlay = document.createElement('div')
    overlay.className = 'img-lightbox'
    overlay.setAttribute('role', 'dialog')
    overlay.setAttribute('aria-modal', 'true')
    overlay.setAttribute('aria-label', 'Image viewer')
    // Focusable so we can move focus into the modal on open (aria-modal semantics).
    overlay.tabIndex = -1

    imgEl = document.createElement('img')
    imgEl.className = 'img-lightbox__img'
    imgEl.draggable = false

    const controls = document.createElement('div')
    controls.className = 'img-lightbox__controls'
    controls.innerHTML = `
      <button type="button" class="img-lightbox__btn" data-action="zoom-out" aria-label="Zoom out">&minus;</button>
      <button type="button" class="img-lightbox__btn" data-action="reset" aria-label="Reset zoom">Reset</button>
      <button type="button" class="img-lightbox__btn" data-action="zoom-in" aria-label="Zoom in">+</button>
      <button type="button" class="img-lightbox__btn img-lightbox__btn--close" data-action="close" aria-label="Close">&times;</button>
    `

    overlay.appendChild(imgEl)
    overlay.appendChild(controls)
    document.body.appendChild(overlay)

    wireEvents()
  }

  function open(src, alt) {
    if (!overlay) build()
    lastFocused = document.activeElement
    imgEl.src = src
    imgEl.alt = alt || ''
    reset()
    // Force reflow so the opening transition runs.
    void overlay.offsetWidth
    overlay.classList.add('img-lightbox--open')
    document.body.classList.add('img-lightbox-lock')
    // Move focus into the dialog for keyboard/screen-reader users.
    overlay.focus()
  }

  function close() {
    if (!overlay) return
    overlay.classList.remove('img-lightbox--open')
    document.body.classList.remove('img-lightbox-lock')
    pointers.clear()
    dragging = false
    // Restore focus to the element that opened the lightbox.
    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus()
    }
    lastFocused = null
  }

  function isOpen() {
    return overlay && overlay.classList.contains('img-lightbox--open')
  }

  function wireEvents() {
    // Control buttons.
    overlay.querySelector('.img-lightbox__controls').addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action]')
      if (!btn) return
      const action = btn.dataset.action
      if (action === 'zoom-in') zoomTo(scale * BUTTON_STEP, 0, 0)
      else if (action === 'zoom-out') zoomTo(scale / BUTTON_STEP, 0, 0)
      else if (action === 'reset') reset()
      else if (action === 'close') close()
    })

    // Click backdrop (not the image) to close.
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close()
    })

    // Double-click the image to toggle zoom.
    imgEl.addEventListener('dblclick', (e) => {
      const sx = e.clientX - window.innerWidth / 2
      const sy = e.clientY - window.innerHeight / 2
      zoomTo(scale > 1 ? 1 : 2.5, sx, sy)
    })

    // Wheel zoom centered on the cursor.
    overlay.addEventListener(
      'wheel',
      (e) => {
        e.preventDefault()
        const sx = e.clientX - window.innerWidth / 2
        const sy = e.clientY - window.innerHeight / 2
        zoomTo(scale * (1 - e.deltaY * WHEEL_STEP), sx, sy)
      },
      { passive: false }
    )

    // Pointer-based drag pan + pinch zoom.
    imgEl.addEventListener('pointerdown', (e) => {
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY })
      imgEl.setPointerCapture(e.pointerId)
      if (pointers.size === 2) {
        const [a, b] = [...pointers.values()]
        pinchStartDist = Math.hypot(a.x - b.x, a.y - b.y)
        pinchStartScale = scale
      } else if (scale > 1) {
        dragging = true
        lastX = e.clientX
        lastY = e.clientY
        apply()
      }
    })

    imgEl.addEventListener('pointermove', (e) => {
      if (!pointers.has(e.pointerId)) return
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY })

      if (pointers.size === 2) {
        const [a, b] = [...pointers.values()]
        const dist = Math.hypot(a.x - b.x, a.y - b.y)
        const midX = (a.x + b.x) / 2 - window.innerWidth / 2
        const midY = (a.y + b.y) / 2 - window.innerHeight / 2
        if (pinchStartDist > 0) {
          zoomTo(pinchStartScale * (dist / pinchStartDist), midX, midY)
        }
        return
      }

      if (dragging) {
        tx += e.clientX - lastX
        ty += e.clientY - lastY
        lastX = e.clientX
        lastY = e.clientY
        apply()
      }
    })

    const endPointer = (e) => {
      pointers.delete(e.pointerId)
      if (pointers.size < 2) pinchStartDist = 0
      if (pointers.size === 0) dragging = false
      apply()
    }
    imgEl.addEventListener('pointerup', endPointer)
    imgEl.addEventListener('pointercancel', endPointer)

    // Keyboard controls.
    document.addEventListener('keydown', (e) => {
      if (!isOpen()) return
      if (e.key === 'Escape') close()
      else if (e.key === '+' || e.key === '=') zoomTo(scale * BUTTON_STEP, 0, 0)
      else if (e.key === '-' || e.key === '_') zoomTo(scale / BUTTON_STEP, 0, 0)
      else if (e.key === '0') reset()
    })
  }

  // Delegate clicks from doc images to open the lightbox.
  document.addEventListener('click', (e) => {
    const img = e.target.closest(SELECTOR)
    if (!img) return
    // Skip images wrapped in links — let the link do its job.
    if (img.closest('a')) return
    e.preventDefault()
    open(img.currentSrc || img.src, img.alt)
  })
}
