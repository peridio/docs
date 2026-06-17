import React from 'react'
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

function ReadingTime({ minutes }) {
  if (minutes == null) return null
  const m = Math.max(1, Math.round(minutes))
  return <span>{m} min read</span>
}

function FieldNoteRow({ post }) {
  const { metadata, frontMatter } = post
  const { permalink, title, date, readingTime, authors = [], tags = [] } = metadata
  const dek = metadata.description || frontMatter.description || ''
  const authorNames = authors.map((a) => a.name).filter(Boolean)

  return (
    <article className={styles.row}>
      <Heading as="h2" className={styles.title}>
        <Link to={permalink}>{title}</Link>
      </Heading>
      {dek ? <p className={styles.dek}>{dek}</p> : null}
      <div className={styles.meta}>
        <time dateTime={date}>{formatDate(date)}</time>
        {authorNames.length > 0 && (
          <>
            <span className={styles.sep}>·</span>
            <span>{authorNames.join(', ')}</span>
          </>
        )}
        {readingTime != null ? (
          <>
            <span className={styles.sep}>·</span>
            <ReadingTime minutes={readingTime} />
          </>
        ) : null}
        {tags.length > 0 && (
          <span className={styles.tags}>
            {tags.map((t) => (
              <Link key={t.permalink} to={t.permalink} className={styles.tag}>
                #{t.label}
              </Link>
            ))}
          </span>
        )}
      </div>
    </article>
  )
}

export default function BlogPostItems({ items }) {
  return (
    <div className={styles.list}>
      {items.map(({ content: BlogPostContent }) => (
        <BlogPostProvider key={BlogPostContent.metadata.permalink} content={BlogPostContent}>
          <FieldNoteRow post={BlogPostContent} />
        </BlogPostProvider>
      ))}
    </div>
  )
}
