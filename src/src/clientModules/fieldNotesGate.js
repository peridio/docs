/**
 * Soft gate for /field-notes. Companion to the inline head-tag script in
 * docusaurus.config.js — that script handles the synchronous flash-free
 * redirect; this module handles the body class that toggles the navbar
 * link's visibility and persists the flag across client-side navigation.
 *
 * Activation:   visit any URL with ?preview=1 (or visit a path under
 *               /field-notes?preview=1). Stored in sessionStorage.
 * Deactivation: ?preview=0, or close the tab.
 */

const FLAG_KEY = 'peridio:fn-preview'
const ATTR = 'data-show-field-notes'

function readAndPersist() {
  if (typeof window === 'undefined') return false
  try {
    const params = new URLSearchParams(window.location.search)
    const param = params.get('preview')
    if (param === '1') {
      window.sessionStorage.setItem(FLAG_KEY, '1')
      return true
    }
    if (param === '0') {
      window.sessionStorage.removeItem(FLAG_KEY)
      return false
    }
    return window.sessionStorage.getItem(FLAG_KEY) === '1'
  } catch (e) {
    return false
  }
}

function apply() {
  if (typeof document === 'undefined') return
  // Use a data attribute, not a class — react-helmet-async resets the
  // root className on every render, which would wipe a class we added.
  // Helmet only manages className, not data attributes.
  if (readAndPersist()) {
    document.documentElement.setAttribute(ATTR, '1')
  } else {
    document.documentElement.removeAttribute(ATTR)
  }
}

if (typeof window !== 'undefined') {
  apply()
}

export function onRouteUpdate() {
  apply()
}
