import React from 'react'
import BlogPostPage from '@theme-original/BlogPostPage'
import PluginHtmlClassFirst from '@site/src/components/PluginHtmlClassFirst'

// See PluginHtmlClassFirst: the plugin class must open the <html> class chain.
export default function BlogPostPageWrapper(props) {
  return (
    <PluginHtmlClassFirst>
      <BlogPostPage {...props} />
    </PluginHtmlClassFirst>
  )
}
