import React from 'react'
import Head from '@docusaurus/Head'
import geist from '@fontsource-variable/geist/files/geist-latin-wght-normal.woff2'

// Field Notes prose is set in Geist, which the browser only finds after it
// parses the CSS. Arriving late, it swaps in over the fallback and a long
// paragraph can wrap one line shorter, moving everything under it (0.29 CLS
// on the ROS 2 note). Preloading gets it there before first paint. The bundler
// gives this import the same hashed URL as the url() in fonts.css, so it is
// one request.
export default function GeistPreload() {
  return (
    <Head>
      <link rel="preload" href={geist} as="font" type="font/woff2" crossOrigin="anonymous" />
    </Head>
  )
}
