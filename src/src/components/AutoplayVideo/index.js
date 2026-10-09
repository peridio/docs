import React from 'react'

// Drop-in for an animated GIF: muted, looping, inline video with a poster so
// the box is sized before any bytes arrive. `src` is the .mp4; a .webm with
// the same basename is offered first.
export default function AutoplayVideo({ src, poster, width, height, label }) {
  const webm = src.replace(/\.mp4$/, '.webm')
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      poster={poster}
      width={width}
      height={height}
      aria-label={label}
      style={{ width: '100%', height: 'auto', borderRadius: 8, display: 'block' }}
    >
      <source src={webm} type="video/webm" />
      <source src={src} type="video/mp4" />
    </video>
  )
}
