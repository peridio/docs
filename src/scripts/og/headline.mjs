// The headline a share card renders. Browser-safe: imported by theme components
// as well as the card scripts, so it must stay free of node: imports.

/**
 * `override` when it is a non-blank string, otherwise `title`.
 *
 * `og_title` is an optional shorter headline for the card only, for the few
 * titles too long to set at display size. The Field Notes template ships it as
 * `og_title: ''`, and a page can leave it empty the same way, so a blank value
 * means "no override" rather than a headline of nothing (which would fail the
 * card render with `missing title`). Anything that is not a string (YAML null,
 * a bare number) is treated as absent too. Both values are trimmed, so the alt
 * text a page emits matches the headline the card renders.
 */
export function cardTitle(override, title) {
  const chosen = typeof override === 'string' ? override.trim() : ''
  return chosen || (typeof title === 'string' ? title.trim() : title)
}
