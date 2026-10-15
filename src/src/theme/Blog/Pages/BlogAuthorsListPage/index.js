import React from 'react'
import BlogAuthorsListPage from '@theme-original/Blog/Pages/BlogAuthorsListPage'
import PluginHtmlClassFirst from '@site/src/components/PluginHtmlClassFirst'

// See PluginHtmlClassFirst: the plugin class must open the <html> class chain.
export default function BlogAuthorsListPageWrapper(props) {
  return (
    <PluginHtmlClassFirst>
      <BlogAuthorsListPage {...props} />
    </PluginHtmlClassFirst>
  )
}
