import React from 'react'
import DocItem from '@theme-original/DocItem'

// Changelog pages use their own root component (see ChangelogDocItem and the
// changelog plugin's docItemComponent option), so this wrapper stays free of
// the changelog feed and its entries.
export default function DocItemWrapper(props) {
  const permalink = props.content.metadata.permalink

  if (permalink === '/hardware/support-matrix') {
    return (
      <div className="support-matrix-doc-page">
        <DocItem {...props} />
      </div>
    )
  }

  return <DocItem {...props} />
}
