/**
 * Field Notes post <head>: the stock BlogPostPage metadata, with og:image
 * pointed at the post's generated 1200x630 share card.
 *
 * Front matter `image` stays the dithered index thumbnail (400x226, sometimes
 * an animated GIF), which is right for the index tiles and too small for a
 * large link preview. The share cards are rendered and committed by
 * `npm run og` (scripts/og-cards.mjs); manifest.json is the list of posts
 * that have one and carries each card's alt text, which is the headline the
 * card actually renders. A post missing from the manifest keeps the stock
 * behavior.
 */
import React from 'react'
import { PageMetadata } from '@docusaurus/theme-common'
import { useBlogPost } from '@docusaurus/plugin-content-blog/client'
import ogManifest from '@site/static/img/field-notes/og/manifest.json'
import { cardTitle } from '@site/scripts/og/headline.mjs'

/** `@site/field-notes/2026-06-15-foo.mdx` -> `2026-06-15-foo` */
export function cardSlug(source) {
  const file =
    String(source ?? '')
      .split('/')
      .pop() ?? ''
  return file.replace(/\.mdx?$/, '')
}

export default function BlogPostPageMetadata() {
  const { assets, metadata } = useBlogPost()
  const { title, description, date, tags, authors, frontMatter, source } = metadata
  const { keywords } = frontMatter
  const slug = cardSlug(source)
  const card = ogManifest.cards[slug]
  // PageMetadata makes this absolute against the site URL.
  const image = card ? `/img/field-notes/og/${slug}.png` : (assets.image ?? frontMatter.image)

  return (
    <PageMetadata
      title={cardTitle(frontMatter.title_meta, title)}
      description={description}
      keywords={keywords}
      image={image}
    >
      {card && <meta property="og:image:type" content="image/png" />}
      {card && <meta property="og:image:width" content={String(ogManifest.width)} />}
      {card && <meta property="og:image:height" content={String(ogManifest.height)} />}
      {card && <meta property="og:image:alt" content={card.alt} />}
      {card && <meta name="twitter:image:alt" content={card.alt} />}
      <meta property="og:type" content="article" />
      <meta property="article:published_time" content={date} />
      {authors.some((author) => author.url) && (
        <meta
          property="article:author"
          content={authors
            .map((author) => author.url)
            .filter(Boolean)
            .join(',')}
        />
      )}
      {tags.length > 0 && (
        <meta property="article:tag" content={tags.map((tag) => tag.label).join(',')} />
      )}
    </PageMetadata>
  )
}
