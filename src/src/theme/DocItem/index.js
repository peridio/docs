import React from 'react'
import DocItem from '@theme-original/DocItem'
import DocItemMetadata from '@theme/DocItem/Metadata'
import { DocProvider } from '@docusaurus/plugin-content-docs/client'
import ChangelogInfiniteScroll from '../../components/ChangelogInfiniteScroll'

export default function DocItemWrapper(props) {
  const { content } = props
  const permalink = content.metadata.permalink

  // Changelog pages get infinite scroll — except /changelog/latest, which is a
  // thin MDX <Redirect> to the newest entry. Letting that page render normally
  // lets the redirect fire (landing on a real entry URL with correct title and
  // sidebar highlighting) instead of being swallowed by the infinite-scroll
  // override, where activePermalink would be the non-entry "/changelog/latest".
  if (
    permalink?.startsWith('/changelog/') &&
    permalink !== '/changelog/' &&
    permalink !== '/changelog/latest'
  ) {
    // The infinite scroll replaces DocItem, and with it DocItem/Metadata, so
    // render the entry's metadata here. Without it a changelog entry's static
    // HTML carries no page title, description or share card.
    return (
      <>
        <DocProvider content={content}>
          <DocItemMetadata />
        </DocProvider>
        <ChangelogInfiniteScroll initialContent={content} />
      </>
    )
  }

  if (permalink === '/hardware/support-matrix') {
    return (
      <div className="support-matrix-doc-page">
        <DocItem {...props} />
      </div>
    )
  }

  return <DocItem {...props} />
}
