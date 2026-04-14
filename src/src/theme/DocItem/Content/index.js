import React from 'react'
import DocItemContent from '@theme-original/DocItem/Content'
import { useDoc } from '@docusaurus/plugin-content-docs/client'
import CopyMarkdownButton from '@site/src/components/CopyMarkdownButton'

export default function DocItemContentWrapper(props) {
  const { frontMatter } = useDoc()

  return (
    <div style={{ position: 'relative' }}>
      {frontMatter.copy_markdown && (
        <div style={{ position: 'absolute', top: 0, right: 0, zIndex: 1 }}>
          <CopyMarkdownButton />
        </div>
      )}
      <DocItemContent {...props} />
    </div>
  )
}
