import React from 'react'
import BlogTagsListPage from '@theme-original/BlogTagsListPage'
import PluginHtmlClassFirst from '@site/src/components/PluginHtmlClassFirst'

// See PluginHtmlClassFirst: the plugin class must open the <html> class chain.
export default function BlogTagsListPageWrapper(props) {
  return (
    <PluginHtmlClassFirst>
      <BlogTagsListPage {...props} />
    </PluginHtmlClassFirst>
  )
}
