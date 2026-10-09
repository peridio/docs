// `make thumbs` writes one asset per entry in presets.json `sizes`: <slug>-thumb
// (400) for the row tiles, <slug>-tile (800) for those same tiles once mobile
// stretches them, and <slug>-hero (1152) for the featured slot. Front matter
// points at the thumb, so the others are derived from it rather than plumbed
// through separately.
export function variantSrc(image, kind) {
  if (!image || kind === 'thumb') return image
  // Animated notes carry a still `<slug>-poster.png` next to the WebP variants.
  if (kind === 'poster') return image.replace(/-thumb\.(webp|png)$/, '-poster.png')
  return image.replace('-thumb.', `-${kind}.`)
}
