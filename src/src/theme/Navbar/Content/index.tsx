import React, { type ReactNode } from 'react'
import clsx from 'clsx'
import { useThemeConfig, ErrorCauseBoundary, ThemeClassNames } from '@docusaurus/theme-common'
import { splitNavbarItems, useNavbarMobileSidebar } from '@docusaurus/theme-common/internal'
import NavbarItem, { type Props as NavbarItemConfig } from '@theme/NavbarItem'
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle'
import SearchBar from '@theme/SearchBar'
import NavbarMobileSidebarToggle from '@theme/Navbar/MobileSidebar/Toggle'
import NavbarLogo from '@theme/Navbar/Logo'
import NavbarSearch from '@theme/Navbar/Search'

import styles from './styles.module.css'

function useNavbarItems() {
  return useThemeConfig().navbar.items as NavbarItemConfig[]
}

function NavbarItems({ items }: { items: NavbarItemConfig[] }): ReactNode {
  return (
    <>
      {items.map((item, i) => (
        <ErrorCauseBoundary
          key={i}
          onError={(error) =>
            new Error(
              `A theme navbar item failed to render.
Please double-check the following navbar item (themeConfig.navbar.items) of your Docusaurus config:
${JSON.stringify(item, null, 2)}`,
              { cause: error }
            )
          }
        >
          <NavbarItem {...item} />
        </ErrorCauseBoundary>
      ))}
    </>
  )
}

function NavbarContentLayout({
  logo,
  links,
  right,
}: {
  logo: ReactNode
  links: ReactNode
  right: ReactNode
}) {
  return (
    <div className="navbar__inner">
      <div className="navbar__row navbar__row--top">
        <div className={clsx(ThemeClassNames.layout.navbar.containerLeft, 'navbar__items')}>
          {logo}
        </div>
        <div
          className={clsx(
            ThemeClassNames.layout.navbar.containerRight,
            'navbar__items navbar__items--right'
          )}
        >
          {right}
        </div>
      </div>
      <div className="navbar__row navbar__row--links">
        <div className="navbar__items navbar__items--nav">{links}</div>
      </div>
    </div>
  )
}

export default function NavbarContent(): ReactNode {
  const mobileSidebar = useNavbarMobileSidebar()

  const items = useNavbarItems()
  const [leftItems, rightItems] = splitNavbarItems(items)

  const searchBarItem = items.find((item) => item.type === 'search')

  return (
    <NavbarContentLayout
      logo={
        <>
          {!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
          <NavbarLogo />
        </>
      }
      links={<NavbarItems items={leftItems} />}
      right={
        <>
          <NavbarItems items={rightItems} />
          <NavbarColorModeToggle className={styles.colorModeToggle} />
          {!searchBarItem && (
            <NavbarSearch>
              <SearchBar />
            </NavbarSearch>
          )}
        </>
      }
    />
  )
}
