// Where a docs page's Open Graph card lives, and which card family it uses.
//
// Shared by the build plugin (plugins/og-cards-plugin), which renders the
// cards, and the swizzled DocItem/Metadata, which points og:image at them. Both
// derive the card path from the permalink here, so they cannot disagree.
//
// No Node imports: this file is bundled into the client by webpack.

/** Public directory the build writes docs-page cards into (under build/). */
export const DOCS_OG_DIR = '/og'

/** The site-wide fallback card, for pages that are not docs or Field Notes. */
export const DEFAULT_OG_CARD = `${DOCS_OG_DIR}/default.png`

/**
 * Card families, matched in order on the permalink. One template per family
 * once the designs settle; for now they share the Field Notes layout and
 * differ in eyebrow and footer.
 */
export const OG_FAMILIES = [
  {
    key: 'reference',
    match: /^\/developer-reference\/references(\/|$)/,
    eyebrow: 'Reference',
    footer: 'docs.peridio.com/developer-reference',
  },
  {
    key: 'dev-reference',
    match: /^\/developer-reference(\/|$)/,
    eyebrow: 'Developer Reference',
    footer: 'docs.peridio.com/developer-reference',
  },
  {
    key: 'hardware',
    match: /^\/hardware(\/|$)/,
    eyebrow: 'Hardware',
    footer: 'docs.peridio.com/hardware',
  },
  { key: 'learn', match: /^\/learn(\/|$)/, eyebrow: 'Learn', footer: 'docs.peridio.com/learn' },
  {
    key: 'changelog',
    match: /^\/changelog(\/|$)/,
    eyebrow: 'Changelog',
    footer: 'docs.peridio.com/changelog',
  },
  { key: 'product', match: /^\//, eyebrow: 'Product Docs', footer: 'docs.peridio.com' },
]

/** The family for a docs permalink. Every permalink matches one. */
export function familyFor(permalink) {
  return OG_FAMILIES.find((family) => family.match.test(permalink))
}

/**
 * `/hardware/nvidia/jetson-orin-nx` -> `/og/hardware/nvidia/jetson-orin-nx.png`,
 * `/` -> `/og/index.png`. Trailing slashes are ignored so `/learn/` and
 * `/learn` share a card.
 */
export function cardPathFor(permalink) {
  const trimmed = String(permalink ?? '')
    .replace(/^\/+/, '')
    .replace(/\/+$/, '')
  return `${DOCS_OG_DIR}/${trimmed || 'index'}.png`
}
