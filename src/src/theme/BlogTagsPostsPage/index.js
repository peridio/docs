import React from 'react'
import BlogTagsPostsPage from '@theme-original/BlogTagsPostsPage'
import PluginHtmlClassFirst from '@site/src/components/PluginHtmlClassFirst'

// See PluginHtmlClassFirst: the plugin class must open the <html> class chain.
export default function BlogTagsPostsPageWrapper(props) {
  return (
    <PluginHtmlClassFirst>
      <BlogTagsPostsPage {...props} />
    </PluginHtmlClassFirst>
  )
}
