import React from 'react'
import DocItem from '@theme-original/DocItem'
import ChangelogInfiniteScroll from '../../components/ChangelogInfiniteScroll'

export default function DocItemWrapper(props) {
  const { content } = props
  const permalink = content.metadata.permalink

  // Changelog pages get infinite scroll
  if (permalink?.startsWith('/changelog/') && permalink !== '/changelog/') {
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
