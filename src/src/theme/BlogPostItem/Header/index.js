import React from 'react'
import Link from '@docusaurus/Link'
import { useBlogPost } from '@docusaurus/plugin-content-blog/client'
import BlogPostItemHeaderTitle from '@theme/BlogPostItem/Header/Title'
import styles from './styles.module.css'

// Tags rendered as clickable chips in the masthead (the default theme only
// shows them in the footer — we hide that copy in custom.css to avoid duplication).
function HeaderTags() {
  const { metadata } = useBlogPost()
  const tags = metadata.tags ?? []
  if (tags.length === 0) return null
  return (
    <ul className={styles.tags}>
      {tags.map((tag) => (
        <li key={tag.permalink}>
          <Link to={tag.permalink} className={styles.tag}>
            {tag.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

// Post date, rendered here so it can share the meta row with the tags instead
// of sitting on its own line (default BlogPostItemHeaderInfo is dropped below).
function HeaderDate() {
  const { metadata } = useBlogPost()
  if (!metadata.date) return null
  return (
    <time dateTime={metadata.date} className={styles.date}>
      {metadata.formattedDate}
    </time>
  )
}

// Custom, link-free byline. The theme default links each author to their author
// page (<a href>), and a password-manager browser extension latched onto those
// links to draw a stray overlay box. Rendering the author as plain text + image
// removes the link entirely and gives us full design control.
function Byline() {
  const { metadata } = useBlogPost()
  const authors = metadata.authors ?? []
  if (authors.length === 0) return null
  return (
    <div className={styles.byline}>
      {authors.map((author, i) => (
        <div className={styles.author} key={author.key ?? author.name ?? i}>
          <div className={styles.authorText}>
            {author.name ? <span className={styles.authorName}>{author.name}</span> : null}
            {author.title ? <span className={styles.authorTitle}>{author.title}</span> : null}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function BlogPostItemHeader() {
  return (
    <header>
      <BlogPostItemHeaderTitle />
      <div className={styles.meta}>
        <Byline />
        <div className={styles.metaAside}>
          <HeaderDate />
          <HeaderTags />
        </div>
      </div>
    </header>
  )
}
