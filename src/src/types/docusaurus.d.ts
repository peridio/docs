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
  // `@docusaurus/module-type-aliases` ships a stub for this module whose
  // `Props` only types `children`. Rather than re-declare the module (which
  // would collide with that stub's `default` export and lose these fields in
  // the merge), we augment `Props` with the extra props this site passes.
  export interface Props {
    readonly title?: string
    readonly description?: string
    readonly keywords?: string | string[]
    readonly image?: string
    readonly wrapperClassName?: string
    readonly pageClassName?: string
    readonly searchMetadata?: {
      readonly version?: string
      readonly tag?: string
    }
  }
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
  import type { PropSidebarItem } from '@docusaurus/plugin-content-docs'
  export interface Props {
    readonly activePath: string
    readonly onItemClick?: (item: PropSidebarItem) => void
    readonly level: number
    readonly tabIndex?: number
    readonly item: PropSidebarItem
    readonly index: number
  }
  const DocSidebarItem: ComponentType<Props>
  export default DocSidebarItem
}

declare module '@theme/DocSidebarItems' {
  import type { ComponentType } from 'react'
  import type { Props as DocSidebarItemProps } from '@theme/DocSidebarItem'
  import type { PropSidebarItem } from '@docusaurus/plugin-content-docs'
  export interface Props extends Omit<DocSidebarItemProps, 'item' | 'index'> {
    readonly items: readonly PropSidebarItem[]
  }
  const DocSidebarItems: ComponentType<Props>
  export default DocSidebarItems
}

declare module '@theme/DocSidebarItem/Link' {
  import type { ComponentType } from 'react'
  import type { Props as DocSidebarItemProps } from '@theme/DocSidebarItem'
  import type { PropSidebarItemLink } from '@docusaurus/plugin-content-docs'
  export interface Props extends DocSidebarItemProps {
    readonly item: PropSidebarItemLink
  }
  const DocSidebarItemLink: ComponentType<Props>
  export default DocSidebarItemLink
}

declare module '@theme/DocSidebarItem/Category' {
  import type { ComponentType } from 'react'
  import type { Props as DocSidebarItemProps } from '@theme/DocSidebarItem'
  import type { PropSidebarItemCategory } from '@docusaurus/plugin-content-docs'
  export interface Props extends DocSidebarItemProps {
    readonly item: PropSidebarItemCategory
  }
  const DocSidebarItemCategory: ComponentType<Props>
  export default DocSidebarItemCategory
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
