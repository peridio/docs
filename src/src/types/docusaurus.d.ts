declare module '@docusaurus/Link' {
  import { ComponentProps } from 'react'
  interface LinkProps extends ComponentProps<'a'> {
    to?: string
    href?: string
    activeClassName?: string
    isNavLink?: boolean
    prependBaseUrlToHref?: boolean
    autoAddBaseUrl?: boolean
  }
  const Link: React.ComponentType<LinkProps>
  export default Link
}

declare module '@docusaurus/Head' {
  import { ComponentProps } from 'react'
  const Head: React.ComponentType<ComponentProps<'head'>>
  export default Head
}

declare module '@theme/Heading' {
  import { ComponentProps } from 'react'
  interface HeadingProps extends ComponentProps<'h1'> {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  }
  const Heading: React.ComponentType<HeadingProps>
  export default Heading
}

declare module '@theme/Layout' {
  interface LayoutProps {
    children?: React.ReactNode
    title?: string
    description?: string
    keywords?: string | string[]
    image?: string
    wrapperClassName?: string
    pageClassName?: string
    searchMetadata?: {
      version?: string
      tag?: string
    }
  }
  const Layout: React.ComponentType<LayoutProps>
  export default Layout
}

declare module '*.module.css' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.module.scss' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.css' {
  const content: string
  export default content
}
