import React from 'react'
import DocItem from '@theme-original/DocItem'
import Heading from '@theme/Heading'
import PropTypes from 'prop-types'
import ChangelogInfiniteScroll from '../../components/ChangelogInfiniteScroll'

function SpecSheetLayout(props) {
  // Custom layout for spec sheets
  return (
    <div style={{ border: '2px solid var(--color-status-danger)', padding: '20px' }}>
      <Heading as="h1">SPEC SHEET</Heading>
      <DocItem {...props} />
    </div>
  )
}

export default function DocItemWrapper(props) {
  const { content } = props
  const permalink = content.metadata.permalink

  // Changelog pages get infinite scroll
  if (permalink?.startsWith('/changelog/') && permalink !== '/changelog/') {
    return <ChangelogInfiniteScroll initialContent={content} />
  }

  const { route } = content.metadata

  if (route && route.source.includes('solutions')) {
    return <SpecSheetLayout {...props} />
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

DocItemWrapper.propTypes = {
  content: PropTypes.shape({
    metadata: PropTypes.shape({
      route: PropTypes.shape({
        source: PropTypes.string,
      }),
    }),
  }),
}
