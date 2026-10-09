import React from 'react'
import Head from '@docusaurus/Head'
import useBaseUrl from '@docusaurus/useBaseUrl'
import { useBlogPost } from '@docusaurus/plugin-content-blog/client'
import Metadata from '@theme-original/BlogPostPage/Metadata'
import { variantSrc } from '@site/src/theme/BlogPostItems/variants'
import GeistPreload from '@site/src/components/GeistPreload'

// Animated notes carry an animated WebP as their front-matter `image`, which
// most link unfurlers can't render. Point the social card at the still poster
// instead; this <Head> renders after the upstream one, so its tags win.
export default function MetadataWrapper(props) {
  const { frontMatter } = useBlogPost()
  const image = frontMatter.image
  const animated = typeof image === 'string' && image.endsWith('.webp')
  const poster = useBaseUrl(animated ? variantSrc(image, 'poster') : '', { absolute: true })
  return (
    <>
      <Metadata {...props} />
      <GeistPreload />
      {animated && (
        <Head>
          <meta property="og:image" content={poster} />
          <meta name="twitter:image" content={poster} />
        </Head>
      )}
    </>
  )
}
