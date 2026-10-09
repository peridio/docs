import React from 'react'
import DocItem from '@theme/DocItem'
import { PageMetadata } from '@docusaurus/theme-common'
import ChangelogInfiniteScroll from '../ChangelogInfiniteScroll'

// Root component for the changelog docs plugin only (docItemComponent in
// docusaurus.config.js). Keeping it out of the global @theme/DocItem wrapper
// keeps every compiled changelog entry out of the route chunk that all other
// docs pages load.
//
// /changelog/latest is a thin MDX <Redirect> to the newest entry. Rendering it
// through the plain DocItem lets the redirect fire with the right title and
// sidebar highlight instead of being swallowed by the infinite-scroll feed.
export default function ChangelogDocItem(props) {
  const { metadata } = props.content
  if (metadata.permalink === '/changelog/' || metadata.permalink === '/changelog/latest') {
    return <DocItem {...props} />
  }
  // The feed replaces the theme's DocItem, so the entry's head tags have to be
  // emitted here; without this every entry was served with no description. The
  // title belongs to the feed, which follows the entry being read.
  return (
    <>
      <PageMetadata description={metadata.description} />
      <ChangelogInfiniteScroll initialContent={props.content} />
    </>
  )
}
