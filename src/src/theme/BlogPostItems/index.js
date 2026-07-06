import React from 'react'
import clsx from 'clsx'
import Link from '@docusaurus/Link'
import Heading from '@theme/Heading'
import { BlogPostProvider } from '@docusaurus/plugin-content-blog/client'
import styles from './styles.module.css'

function formatDate(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

// The eyebrow label above each title. The top (newest) item is treated as the
// featured hero and always reads "Featured"; every other item shows its
// `category` front matter, falling back to its first tag.
function categoryLabel(post, isFeatured) {
  if (isFeatured) return 'Featured'
  const { frontMatter, metadata } = post
  if (frontMatter.category) return frontMatter.category
  return metadata.tags?.[0]?.label ?? 'Field Note'
}

function Thumb({ post, className }) {
  const { image, image_alt: imageAlt } = post.frontMatter
  return (
    <Link
      to={post.metadata.permalink}
      className={clsx(styles.thumb, className)}
      aria-label={post.metadata.title}
    >
      {image ? (
        <img src={image} alt={imageAlt || ''} loading="lazy" />
      ) : (
        <span className={styles.thumbPlaceholder} />
      )}
    </Link>
  )
}

function Meta({ metadata }) {
  const { date, authors = [] } = metadata
  const authorNames = authors.map((a) => a.name).filter(Boolean)
  return (
    <div className={styles.meta}>
      <time dateTime={date}>{formatDate(date)}</time>
      {authorNames.length > 0 && (
        <>
          <span className={styles.sep}>·</span>
          <span>{authorNames.join(', ')}</span>
        </>
      )}
    </div>
  )
}

function FeaturedItem({ post }) {
  const { metadata, frontMatter } = post
  const dek = metadata.description || frontMatter.description || ''
  return (
    <article className={styles.featured}>
      <Thumb post={post} className={styles.featuredThumb} />
      <div>
        <p className={styles.eyebrow}>{categoryLabel(post, true)}</p>
        <Heading as="h2" className={styles.featuredTitle}>
          <Link to={metadata.permalink}>{metadata.title}</Link>
        </Heading>
        {dek ? <p className={styles.featuredDek}>{dek}</p> : null}
        <Meta metadata={metadata} />
      </div>
    </article>
  )
}

function Row({ post }) {
  const { metadata, frontMatter } = post
  const dek = metadata.description || frontMatter.description || ''
  return (
    <article className={styles.row}>
      <Thumb post={post} className={styles.rowThumb} />
      <div>
        <p className={styles.eyebrow}>{categoryLabel(post, false)}</p>
        <Heading as="h2" className={styles.title}>
          <Link to={metadata.permalink}>{metadata.title}</Link>
        </Heading>
        {dek ? <p className={styles.dek}>{dek}</p> : null}
        <Meta metadata={metadata} />
      </div>
    </article>
  )
}

export default function BlogPostItems({ items }) {
  const posts = items.map((it) => it.content)

  // Posts opt into the hero treatment with `featured: true` in front matter.
  // If none are marked, the newest post (first in the list) becomes the hero
  // so the page always leads with one.
  let featured = posts.filter((p) => p.frontMatter.featured)
  let rows = posts.filter((p) => !p.frontMatter.featured)
  if (featured.length === 0 && posts.length > 0) {
    featured = posts.slice(0, 1)
    rows = posts.slice(1)
  }

  return (
    <div className={styles.list}>
      {featured.map((post) => (
        <BlogPostProvider key={post.metadata.permalink} content={post}>
          <FeaturedItem post={post} />
        </BlogPostProvider>
      ))}
      {rows.map((post) => (
        <BlogPostProvider key={post.metadata.permalink} content={post}>
          <Row post={post} />
        </BlogPostProvider>
      ))}
    </div>
  )
}
