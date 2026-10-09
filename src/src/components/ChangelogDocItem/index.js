import React from 'react'
import DocItem from '@theme/DocItem'
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
  const permalink = props.content.metadata.permalink
  if (permalink === '/changelog/' || permalink === '/changelog/latest') {
    return <DocItem {...props} />
  }
  return <ChangelogInfiniteScroll initialContent={props.content} />
}
