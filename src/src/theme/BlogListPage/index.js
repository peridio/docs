import React from 'react'
import clsx from 'clsx'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { PageMetadata, HtmlClassNameProvider, ThemeClassNames } from '@docusaurus/theme-common'
import BlogLayout from '@theme/BlogLayout'
import BlogListPaginator from '@theme/BlogListPaginator'
import SearchMetadata from '@theme/SearchMetadata'
import BlogPostItems from '@theme/BlogPostItems'
import BlogListPageStructuredData from '@theme/BlogListPage/StructuredData'
import Heading from '@theme/Heading'
import styles from './styles.module.css'

function BlogListPageMetadata(props) {
  const { metadata } = props
  const {
    siteConfig: { title: siteTitle },
  } = useDocusaurusContext()
  const { blogDescription, blogTitle, permalink } = metadata
  const isBlogOnlyMode = permalink === '/'
  const title = isBlogOnlyMode ? siteTitle : blogTitle
  return (
    <>
      <PageMetadata title={title} description={blogDescription} />
      <SearchMetadata tag="blog_posts_list" />
    </>
  )
}

function FieldNotesHeader({ metadata }) {
  const { blogTitle, blogDescription } = metadata
  return (
    <header className={styles.header}>
      <p className={styles.eyebrow}>Engineering Log</p>
      <Heading as="h1" className={styles.title}>
        {blogTitle}
      </Heading>
      {blogDescription ? <p className={styles.subtitle}>{blogDescription}</p> : null}
    </header>
  )
}

function BlogListPageContent(props) {
  const { metadata, items, sidebar } = props
  return (
    <BlogLayout sidebar={sidebar}>
      <FieldNotesHeader metadata={metadata} />
      <BlogPostItems items={items} />
      <BlogListPaginator metadata={metadata} />
    </BlogLayout>
  )
}

export default function BlogListPage(props) {
  return (
    <HtmlClassNameProvider
      className={clsx(ThemeClassNames.wrapper.blogPages, ThemeClassNames.page.blogListPage)}
    >
      <BlogListPageMetadata {...props} />
      <BlogListPageStructuredData {...props} />
      <BlogListPageContent {...props} />
    </HtmlClassNameProvider>
  )
}
