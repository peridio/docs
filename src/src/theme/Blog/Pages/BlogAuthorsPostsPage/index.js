import React from 'react'
import BlogAuthorsPostsPage from '@theme-original/Blog/Pages/BlogAuthorsPostsPage'
import PluginHtmlClassFirst from '@site/src/components/PluginHtmlClassFirst'

// See PluginHtmlClassFirst: the plugin class must open the <html> class chain.
export default function BlogAuthorsPostsPageWrapper(props) {
  return (
    <PluginHtmlClassFirst>
      <BlogAuthorsPostsPage {...props} />
    </PluginHtmlClassFirst>
  )
}
