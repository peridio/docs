// The Field Notes card layout, as an HTML string for takumi.
//
// Inline styles only. takumi silently ignores `class`, so a stray class name
// renders unstyled rather than failing.

import { BRAND_LOGO } from './marks.mjs'
import {
  OG_CANVAS,
  OG_COLORS,
  OG_FONTS,
  OG_FOOTER_URL,
  OG_LAYOUT as L,
  ruleGradient,
} from './tokens.mjs'

/** Escape copy before it goes into the HTML string. */
export function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function svgPart(part, width, height) {
  const paths = part.paths.map((d) => `<path d="${d}" fill="currentColor" />`).join('')
  return `<svg width="${width}" height="${height}" viewBox="${part.viewBox}" fill="currentColor" preserveAspectRatio="xMidYMid meet">${paths}</svg>`
}

function peridioLogo() {
  const { icon, wordmark } = BRAND_LOGO
  const [, , w, h] = wordmark.viewBox.split(/\s+/).map(Number)
  const wordmarkWidth = Math.round(L.logoWordmark * (w / h))
  return `<div style="display:flex;align-items:center;gap:12px;color:${OG_COLORS.ink};">${svgPart(icon, L.logoIcon, L.logoIcon)}${svgPart(wordmark, wordmarkWidth, L.logoWordmark)}</div>`
}

function artwork(image) {
  if (!image) return ''
  const g = OG_COLORS.ground
  return (
    `<img src="${escapeHtml(image)}" style="position:absolute;left:${L.imageLeft}px;top:0;width:${L.imageWidth}px;height:${OG_CANVAS.height}px;object-fit:cover;opacity:${L.imageOpacity};"/>` +
    `<div style="position:absolute;left:0;top:0;width:${OG_CANVAS.width}px;height:${OG_CANVAS.height}px;background:linear-gradient(90deg,${g} 0%,${g} 45%,${g}cc 58%,${g}00 82%);"></div>` +
    `<div style="position:absolute;left:0;top:0;width:${OG_CANVAS.width}px;height:${OG_CANVAS.height}px;background:linear-gradient(0deg,${g} 0%,${g}00 32%);"></div>`
  )
}

/**
 * Render a prepared card to HTML.
 *
 * `card` comes from prepareCard() in render.mjs: copy already wrapped into
 * `titleLines` / `kickerLines` at a `titleSize` that is known to fit, and the
 * artwork already inlined as a data URL so the renderer never touches the
 * network or the filesystem.
 *
 * `foregroundOnly` draws the copy and lockup on pure black with no artwork.
 * render.mjs uses it as a mask: any non-black pixel is foreground, and is
 * restored from the full render after palette quantization.
 */
export function cardHtml(card, { foregroundOnly = false } = {}) {
  const lines = (items, style) =>
    items.map((line) => `<div style="${style}">${escapeHtml(line)}</div>`).join('')

  const eyebrow = `<div style="display:flex;align-items:center;gap:14px;font-family:'${OG_FONTS.mono}';font-size:${L.eyebrowSize}px;letter-spacing:${L.eyebrowSpacing}px;color:${OG_COLORS.accentSoft};"><div style="width:11px;height:11px;background:${OG_COLORS.accent};"></div><div>${escapeHtml(card.eyebrow.toUpperCase())}</div></div>`

  const title = `<div style="display:flex;flex-direction:column;font-size:${card.titleSize}px;font-weight:${L.titleWeight};letter-spacing:${L.titleSpacing}px;line-height:${L.titleLineHeight};">${lines(card.titleLines, '')}</div>`

  const rule = `<div style="width:${L.ruleWidth}px;height:${L.ruleHeight}px;background:${ruleGradient()};"></div>`

  const kicker = card.kickerLines.length
    ? `<div style="display:flex;flex-direction:column;font-size:${L.kickerSize}px;line-height:${L.kickerLineHeight};color:${OG_COLORS.kicker};">${lines(card.kickerLines, '')}</div>`
    : ''

  const footer = `<div style="display:flex;align-items:center;gap:28px;">${peridioLogo()}<div style="font-family:'${OG_FONTS.mono}';font-size:${L.footerSize}px;color:${OG_COLORS.footnote};">${escapeHtml(OG_FOOTER_URL)}</div></div>`

  return (
    `<div style="position:relative;display:flex;width:${OG_CANVAS.width}px;height:${OG_CANVAS.height}px;background:${foregroundOnly ? '#000000' : OG_COLORS.ground};color:${OG_COLORS.ink};font-family:'${OG_FONTS.body}';">` +
    (foregroundOnly ? '' : artwork(card.image)) +
    `<div style="position:absolute;left:${L.padX}px;top:${L.padY}px;width:${L.textWidth}px;height:${OG_CANVAS.height - 2 * L.padY}px;display:flex;flex-direction:column;justify-content:space-between;">` +
    `<div style="display:flex;flex-direction:column;gap:28px;">${eyebrow}${title}${rule}${kicker}</div>` +
    footer +
    '</div></div>'
  )
}
