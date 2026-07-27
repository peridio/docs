import React from 'react'
import DocItem from '@theme-original/DocItem'
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
    return <ChangelogInfiniteScroll initialContent={content} />
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
