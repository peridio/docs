import React, { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import Link from '@docusaurus/Link'
import Heading from '@theme/Heading'
import { BlogPostProvider } from '@docusaurus/plugin-content-blog/client'
import { createViewportFocus } from './viewportFocus'
import { variantSrc } from './variants'
import styles from './styles.module.css'

// Every card shares one controller, so the feed costs one scroll listener and one
// IntersectionObserver rather than one of each per card. Created on first use to
// keep it off the server render.
let focusController = null
function sharedFocus() {
  if (!focusController) focusController = createViewportFocus(window)
  return focusController
}

/* A pointer lights a card by hovering it. Without one -- `(hover: none)`, i.e.
   phones and tablets -- the card lights from where it sits in the viewport
   instead, ramping in and out as you scroll (see viewportFocus.js). The media
   queries are live, so an iPad that gains a trackpad mid-session hands the job
   back to :hover. Reduced motion opts out and leaves the tiles as they are. */
function useViewportFocus() {
  const card = useRef(null)
  useEffect(() => {
    const el = card.current
    if (!el || typeof window === 'undefined' || !window.matchMedia) return undefined
    const noPointer = window.matchMedia('(hover: none)')
    const calmed = window.matchMedia('(prefers-reduced-motion: reduce)')
    let joined = false
    const sync = () => {
      const wanted = noPointer.matches && !calmed.matches
      if (wanted === joined) return
      joined = wanted
      if (wanted) sharedFocus().add(el)
      else sharedFocus().remove(el)
    }
    sync()
    noPointer.addEventListener('change', sync)
    calmed.addEventListener('change', sync)
    return () => {
      noPointer.removeEventListener('change', sync)
      calmed.removeEventListener('change', sync)
      if (joined) sharedFocus().remove(el)
    }
  }, [])
  return card
}

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

// Internal-only marker. A note counts as a draft when its front matter carries
// `draft: true` (hidden from the published feed, visible in local dev) or when
// it's tagged `draft`. When either is true we surface a small badge next to the
// eyebrow so editors can spot unfinished notes at a glance; it disappears the
// moment the draft flag/tag is removed.
function isDraft(post) {
  const { frontMatter, metadata } = post
  if (frontMatter.draft) return true
  return (metadata.tags ?? []).some((t) => (t.label ?? '').toLowerCase() === 'draft')
}

// The eyebrow line: category label plus, for drafts, the internal Draft badge.
function Eyebrow({ post, isFeatured }) {
  return (
    <p className={styles.eyebrow}>
      {categoryLabel(post, isFeatured)}
      {isDraft(post) && (
        <span
          className={styles.draftBadge}
          data-tooltip="Draft marker — this note carries a draft flag or tag. Clear it to publish the note to the live feed."
        >
          Draft
        </span>
      )}
    </p>
  )
}

// The dither is baked into the file, so any browser rescale mushes the dots. The
// desktop row column is 218px of chassis around a ~200px screen, which resolves
// the 400w thumb 1:1 on a retina display. Below 768px the grid collapses to one
// column (see styles.module.css) and the tile spans the content width, where the
// thumb would be blown up ~3x; the 800w entry is what the browser picks there.
// The 768px here must track that breakpoint.
const ROW_SIZES = '(max-width: 768px) 100vw, 200px'

function Thumb({ post, className, variant = 'thumb' }) {
  const { image, image_alt: imageAlt } = post.frontMatter
  const animated = Boolean(image && image.endsWith('.webp'))
  const target = variantSrc(image, variant)
  const deferAnimation = variant === 'hero' && animated
  // Hero of an animated note: paint the still poster immediately and swap in
  // the animation once it has fully downloaded, so the largest paint is a small
  // PNG rather than a multi-megabyte animation. Phones get the 800px tile
  // animation instead of the 1152px hero, and readers who asked for less data
  // or less motion keep the poster.
  const [animatedSrc, setAnimatedSrc] = useState(null)
  const src = deferAnimation ? (animatedSrc ?? variantSrc(image, 'poster')) : target
  useEffect(() => {
    setAnimatedSrc(null)
    if (!deferAnimation) return undefined
    if (navigator.connection?.saveData) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const kind = window.matchMedia('(max-width: 768px)').matches ? 'tile' : 'hero'
    const next = variantSrc(image, kind)
    const loader = new Image()
    loader.onload = () => setAnimatedSrc(next)
    loader.src = next
    return () => {
      loader.onload = null
    }
  }, [deferAnimation, image])
  const srcSet =
    variant === 'thumb' && image ? `${image} 400w, ${variantSrc(image, 'tile')} 800w` : undefined
  return (
    <Link
      to={post.metadata.permalink}
      className={clsx(styles.thumb, className)}
      aria-label={post.metadata.title}
    >
      <span className={styles.gasket}>
        <span className={styles.screen} data-fn-screen="">
          {src && variant === 'thumb' && animated ? (
            // Safari before 14 can't decode WebP; it takes the still poster.
            <picture>
              <source type="image/webp" srcSet={srcSet} sizes={ROW_SIZES} />
              <img src={variantSrc(image, 'poster')} alt={imageAlt || ''} loading="lazy" />
            </picture>
          ) : src ? (
            <img
              src={src}
              srcSet={srcSet}
              sizes={srcSet ? ROW_SIZES : undefined}
              alt={imageAlt || ''}
              loading={variant === 'hero' ? 'eager' : 'lazy'}
              fetchPriority={variant === 'hero' ? 'high' : undefined}
            />
          ) : (
            <span className={styles.thumbPlaceholder} />
          )}
          <span className={styles.scanlines} />
          <span className={styles.vignette} />
        </span>
      </span>
      <span className={styles.pips} aria-hidden="true">
        <span className={styles.pipAmber} />
        <span className={styles.pipGreen} />
      </span>
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
  const focus = useViewportFocus()
  return (
    <article className={styles.featured} ref={focus}>
      <Thumb post={post} className={styles.featuredThumb} variant="hero" />
      <div>
        <Eyebrow post={post} isFeatured />
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
  const focus = useViewportFocus()
  return (
    <article className={styles.row} ref={focus}>
      <Thumb post={post} className={styles.rowThumb} />
      <div>
        <Eyebrow post={post} isFeatured={false} />
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
