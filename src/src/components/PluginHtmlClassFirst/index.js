import React from 'react'
import clsx from 'clsx'
import useRouteContext from '@docusaurus/useRouteContext'
import { HtmlClassNameProvider } from '@docusaurus/theme-common'
import { pluginHtmlClassName } from './className'

// Docusaurus builds <html class> from nested Helmet providers: the page's own
// first, the plugin's (plugin-id-field-notes) deep inside Layout. Helmet writes
// it from an animation frame it schedules during render, and React hydrates in
// time slices, so that frame can land between the two. The plugin class then
// drops for a frame, every .plugin-id-field-notes rule lets go, and the page
// lays out twice (0.73 CLS on the ROS 2 note). Opening the chain with the full
// class set keeps it in every state Helmet can write.
export default function PluginHtmlClassFirst({ className, children }) {
  const { plugin } = useRouteContext()
  return (
    <HtmlClassNameProvider className={clsx(pluginHtmlClassName(plugin), className)}>
      {children}
    </HtmlClassNameProvider>
  )
}
