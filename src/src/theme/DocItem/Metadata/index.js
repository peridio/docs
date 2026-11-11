/**
 * Docs page <head>: the stock DocItem metadata, with og:image pointed at the
 * page's generated 1200x630 share card.
 *
 * plugins/og-cards-plugin renders one card per docs page at build time, at the
 * path cardPathFor() derives from the permalink, so every docs page has one.
 * A page that sets `image` in front matter keeps that image instead, for
 * bespoke artwork. The card's alt text is the headline the card renders:
 * `og_title` when set and not blank, otherwise the page title.
 */
import React from 'react'
import { PageMetadata } from '@docusaurus/theme-common'
import { useDoc } from '@docusaurus/plugin-content-docs/client'
import { cardPathFor } from '@site/scripts/og/routes.mjs'
import { OG_CANVAS } from '@site/scripts/og/tokens.mjs'
import { cardTitle } from '@site/scripts/og/headline.mjs'

export default function DocItemMetadata() {
  const { metadata, frontMatter, assets } = useDoc()
  const bespoke = assets.image ?? frontMatter.image
  const alt = cardTitle(frontMatter.og_title, metadata.title)

  return (
    <PageMetadata
      title={metadata.title}
      description={metadata.description}
      keywords={frontMatter.keywords}
      image={bespoke ?? cardPathFor(metadata.permalink)}
    >
      {!bespoke && <meta property="og:image:type" content="image/png" />}
      {!bespoke && <meta property="og:image:width" content={String(OG_CANVAS.width)} />}
      {!bespoke && <meta property="og:image:height" content={String(OG_CANVAS.height)} />}
      {!bespoke && <meta property="og:image:alt" content={alt} />}
      {!bespoke && <meta name="twitter:image:alt" content={alt} />}
    </PageMetadata>
  )
}
