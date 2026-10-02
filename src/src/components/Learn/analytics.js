// gtag is only loaded in production builds (see docusaurus.config.js), so in
// development and in tests this is a no-op.
export function trackLearnEvent(name, params) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  try {
    window.gtag('event', name, params)
  } catch {
    // Analytics must never break the page.
  }
}
