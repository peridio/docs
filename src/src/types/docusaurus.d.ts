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

declare module '@theme/Admonition' {
  import { ReactNode } from 'react'
  interface AdmonitionProps {
    type?: 'note' | 'tip' | 'info' | 'caution' | 'danger' | 'warning'
    title?: string
    icon?: ReactNode
    children?: ReactNode
  }
  const Admonition: React.ComponentType<AdmonitionProps>
  export default Admonition
}

declare module '@theme/CodeBlock' {
  import { ReactNode } from 'react'
  interface CodeBlockProps {
    children?: ReactNode
    className?: string
    language?: string
    title?: string
    showLineNumbers?: boolean
  }
  const CodeBlock: React.ComponentType<CodeBlockProps>
  export default CodeBlock
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

declare module '@theme/NavbarItem' {
  import type { ComponentType, ComponentProps } from 'react'
  export interface Props extends ComponentProps<'a'> {
    type?: string
    label?: string
    position?: 'left' | 'right'
    to?: string
    href?: string
    items?: Props[]
  }
  const NavbarItem: ComponentType<Props>
  export default NavbarItem
}

declare module '@theme/Navbar/ColorModeToggle' {
  import type { ComponentType } from 'react'
  const NavbarColorModeToggle: ComponentType<{ className?: string }>
  export default NavbarColorModeToggle
}

declare module '@theme/SearchBar' {
  import type { ComponentType } from 'react'
  const SearchBar: ComponentType
  export default SearchBar
}

declare module '@theme/Navbar/MobileSidebar/Toggle' {
  import type { ComponentType } from 'react'
  const NavbarMobileSidebarToggle: ComponentType
  export default NavbarMobileSidebarToggle
}

declare module '@theme/Navbar/Logo' {
  import type { ComponentType } from 'react'
  const NavbarLogo: ComponentType
  export default NavbarLogo
}

declare module '@theme/Navbar/Search' {
  import type { ComponentType, ReactNode } from 'react'
  const NavbarSearch: ComponentType<{ children?: ReactNode }>
  export default NavbarSearch
}

declare module '@theme/DocSidebarItem' {
  import type { ComponentType } from 'react'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const DocSidebarItem: ComponentType<any>
  export default DocSidebarItem
}

declare module '@theme-original/DocSidebarItem' {
  import type { ComponentType } from 'react'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const DocSidebarItem: ComponentType<any>
  export default DocSidebarItem
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
