// Design tokens for the Field Notes Open Graph cards.
//
// Ported from the apex site's use-case card (src/lib/og/og-tokens.mjs there):
// copy on the left, artwork bleeding in from the right, the Peridio icon and
// section label in the footer. Field Notes supply their own dithered artwork;
// docs pages get a generated pixel composition per family (pixels.mjs).
// Everything a redesign would touch lives in this file, template.mjs and
// pixels.mjs, and the generator/guard do not care what the card looks like.

/**
 * Longest allowed meta description, in characters. Search snippets and link
 * previews cut a description off past roughly this, and its first sentence is
 * a card's kicker. Field Notes (og-cards.mjs) and docs pages (og-cards-plugin)
 * both fail past it.
 */
export const OG_DESCRIPTION_MAX = 160

/** Open Graph large-card canvas. The manifest and the meta tags assume this. */
export const OG_CANVAS = { width: 1200, height: 630 }

/**
 * Hard ceiling on a rendered card, in bytes. 300 KiB: WhatsApp stops fetching
 * link previews above roughly this size, the tightest limit among the
 * platforms that matter.
 */
export const OG_MAX_BYTES = 307200

/** Faces the cards use. Must match the files in ./fonts (asserted by size). */
export const OG_FONTS = { body: 'DM Sans', mono: 'Geist Mono' }

export const OG_FONT_FILES = [
  ['DMSans[opsz,wght].ttf', 240164],
  ['GeistMono[wght].ttf', 171948],
]

/** Card palette. Keys are roles, not colour names. */
export const OG_COLORS = {
  ground: '#050408',
  ink: '#ffffff',
  accent: '#5f51ff',
  accentSoft: '#afa8ff',
  kicker: '#e6e5eb',
  footnote: '#8a8a93',
}

/** Geometry. Everything the fitter measures against is named here. */
export const OG_LAYOUT = {
  padX: 80,
  padY: 72,
  // The copy column. The artwork sits behind its right edge, so text is
  // measured against this width rather than the canvas.
  textWidth: 600,

  eyebrowSize: 18,
  eyebrowSpacing: 4,

  // The title steps down from max to min until it fits. It is budgeted by
  // height, not line count: Field Note titles run to 120 characters, so a
  // fourth line is allowed once the size is small enough that four lines are
  // no taller than three at full size.
  titleMaxSize: 56,
  titleMinSize: 40,
  titleMaxLines: 4,
  titleMaxHeight: 182,
  titleLineHeight: 1.08,
  titleWeight: 650,
  titleSpacing: -1.5,

  ruleWidth: 240,
  ruleHeight: 4,

  kickerSize: 24,
  kickerLineHeight: 1.35,
  kickerMaxLines: 3,
  // A note's description is written for search snippets, not for this card;
  // trailing sentences past this budget are dropped before measuring.
  kickerMaxChars: 150,

  // Footer: the Peridio icon, a slash, then the label ("icon / Docs").
  logoIcon: 36,
  footerGap: 14,
  footerSize: 30,
  footerWeight: 600,

  // The artwork, positioned in the right half and faded into the ground.
  imageLeft: 520,
  imageWidth: 680,
  imageOpacity: 0.9,
}

/**
 * The pixel artwork drawn behind docs-page cards (pixels.mjs). Every family
 * shares the cell size, ramp and accent rate; `compositions` picks each
 * family's arrangement and the string its random source is seeded from. The
 * seeds are the names the compositions had in the OG design lab, so the cards
 * match the ones picked there. The ramp runs dark to light between
 * `OG_COLORS.ground` and `OG_COLORS.accent`.
 */
export const OG_PIXELS = {
  cell: 30,
  accentRate: 0.06,
  ramp: ['#110b22', '#1b1236', '#271a4d', '#352366', '#452e85'],
  // The changelog skyline: minimum column height, extra height gained from
  // left to right, and random height on top, as fractions of the artwork.
  skyline: { floor: 0.13, rise: 0.47, jitter: 0.3 },
  compositions: {
    changelog: { draw: 'skyline', seed: 'Chunky' },
    'dev-reference': { draw: 'streams', seed: 'Streams, dense' },
    learn: { draw: 'dashes', seed: 'Dashes, lit tops' },
    product: { draw: 'glowGrid', seed: 'Glow on grid' },
    hardware: { draw: 'banks', seed: 'Banks, staggered' },
    reference: { draw: 'rows', seed: 'Right-aligned rows' },
    default: { draw: 'dither', seed: 'Dithered glow' },
  },
}

/**
 * Field Notes override the title fit: always two lines, at a smaller size than
 * docs titles. A note whose title cannot fit sets a shorter `og_title`.
 */
export const OG_FIELD_NOTES_TITLE = {
  titleMaxSize: 48,
  titleMinSize: 36,
  titleMaxLines: 2,
  titleMaxHeight: 104,
}

/** The label after the slash in the footer mark. */
export const OG_FOOTER_LABEL = 'Docs'

/** The fading accent rule under the headline, same treatment as apex. */
export function ruleGradient(color = OG_COLORS.accent) {
  return `linear-gradient(90deg, ${color} 0%, ${color} 25%, ${OG_COLORS.ground} 100%)`
}
