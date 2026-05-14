/**
 * Swizzled fork of Docusaurus's `@theme/DocSidebarItem/Category`.
 *
 * Forked from: Docusaurus 3.10.0
 *   https://github.com/facebook/docusaurus/blob/v3.10.0/packages/docusaurus-theme-classic/src/theme/DocSidebarItem/Category/index.tsx
 *
 * Local changes vs. upstream:
 *   - Replace the upstream caret pseudo-element with a react-icons
 *     `HiOutlineChevronRight` so the chevron matches the rest of the site UI.
 *   - Auto-expand the active sidebar category on navigation (see
 *     `useAutoExpandActiveCategory`) instead of only expanding on click.
 *
 * Upgrade path: when bumping `@docusaurus/core`, diff the upstream file for
 * this component against 3.10.0 and re-apply the two changes above. If a
 * lighter CSS-only approach (overriding the caret pseudo + a thin wrapper
 * for auto-expand) becomes feasible, prefer that over carrying this fork.
 */
import React, { type ComponentProps, type ReactNode, useEffect, useMemo } from 'react'
import clsx from 'clsx'
import {
  ThemeClassNames,
  useThemeConfig,
  usePrevious,
  Collapsible,
  useCollapsible,
} from '@docusaurus/theme-common'
import { isSamePath } from '@docusaurus/theme-common/internal'
import {
  isActiveSidebarItem,
  findFirstSidebarItemLink,
  useDocSidebarItemsExpandedState,
  useVisibleSidebarItems,
} from '@docusaurus/plugin-content-docs/client'
import Link from '@docusaurus/Link'
import { translate } from '@docusaurus/Translate'
import useIsBrowser from '@docusaurus/useIsBrowser'
import DocSidebarItems from '@theme/DocSidebarItems'
import DocSidebarItemLink from '@theme/DocSidebarItem/Link'
import { HiOutlineChevronRight } from 'react-icons/hi2'
import type { Props } from '@theme/DocSidebarItem/Category'
import type { PropSidebarItemCategory, PropSidebarItemLink } from '@docusaurus/plugin-content-docs'
import styles from './styles.module.css'

function useAutoExpandActiveCategory({
  isActive,
  collapsed,
  updateCollapsed,
  activePath,
}: {
  isActive: boolean
  collapsed: boolean
  updateCollapsed: (b: boolean) => void
  activePath: string
}) {
  const wasActive = usePrevious(isActive)
  const previousActivePath = usePrevious(activePath)
  useEffect(() => {
    const justBecameActive = isActive && !wasActive
    const stillActiveButPathChanged = isActive && wasActive && activePath !== previousActivePath
    if ((justBecameActive || stillActiveButPathChanged) && collapsed) {
      updateCollapsed(false)
    }
  }, [isActive, wasActive, collapsed, updateCollapsed, activePath, previousActivePath])
}

function useCategoryHrefWithSSRFallback(item: Props['item']): string | undefined {
  const isBrowser = useIsBrowser()
  return useMemo(() => {
    if (item.href && !item.linkUnlisted) {
      return item.href
    }
    if (isBrowser || !item.collapsible) {
      return undefined
    }
    return findFirstSidebarItemLink(item)
  }, [item, isBrowser])
}

function CollapseButton({
  collapsed,
  categoryLabel,
  onClick,
}: {
  collapsed: boolean
  categoryLabel: string
  onClick: ComponentProps<'button'>['onClick']
}) {
  return (
    <button
      aria-label={
        collapsed
          ? translate(
              {
                id: 'theme.DocSidebarItem.expandCategoryAriaLabel',
                message: "Expand sidebar category '{label}'",
                description: 'The ARIA label to expand the sidebar category',
              },
              { label: categoryLabel }
            )
          : translate(
              {
                id: 'theme.DocSidebarItem.collapseCategoryAriaLabel',
                message: "Collapse sidebar category '{label}'",
                description: 'The ARIA label to collapse the sidebar category',
              },
              { label: categoryLabel }
            )
      }
      aria-expanded={!collapsed}
      type="button"
      className={clsx('clean-btn', 'menu__caret', styles.categoryCaretButton)}
      onClick={onClick}
    >
      <HiOutlineChevronRight
        className={clsx(styles.categoryChevron, {
          [styles.categoryChevronExpanded]: !collapsed,
        })}
        aria-hidden="true"
      />
    </button>
  )
}

function CategoryLinkLabel({ label }: { label: string }) {
  return (
    <span title={label} className={styles.categoryLinkLabel}>
      {label}
    </span>
  )
}

export default function DocSidebarItemCategory(props: Props): ReactNode {
  const visibleChildren = useVisibleSidebarItems(props.item.items, props.activePath)
  if (visibleChildren.length === 0) {
    return <DocSidebarItemCategoryEmpty {...props} />
  }
  return <DocSidebarItemCategoryCollapsible {...props} />
}

function isCategoryWithHref(
  category: PropSidebarItemCategory
): category is PropSidebarItemCategory & { href: string } {
  return typeof category.href === 'string'
}

function DocSidebarItemCategoryEmpty({ item, ...props }: Props): ReactNode {
  if (!isCategoryWithHref(item)) {
    return null
  }
  const { type, collapsed, collapsible, items, linkUnlisted, ...forwardableProps } = item
  const linkItem: PropSidebarItemLink = {
    type: 'link',
    ...forwardableProps,
  }
  return <DocSidebarItemLink item={linkItem} {...props} />
}

function DocSidebarItemCategoryCollapsible({
  item,
  onItemClick,
  activePath,
  level,
  index,
  ...props
}: Props): ReactNode {
  const { items, label, collapsible, className, href } = item
  const {
    docs: {
      sidebar: { autoCollapseCategories },
    },
  } = useThemeConfig()
  const hrefWithSSRFallback = useCategoryHrefWithSSRFallback(item)

  const isActive = isActiveSidebarItem(item, activePath)
  const isCurrentPage = isSamePath(href, activePath)

  const { collapsed, setCollapsed } = useCollapsible({
    initialState: () => {
      if (!collapsible) {
        return false
      }
      return isActive ? false : item.collapsed
    },
  })

  const { expandedItem, setExpandedItem } = useDocSidebarItemsExpandedState()
  const updateCollapsed = (toCollapsed: boolean = !collapsed) => {
    setExpandedItem(toCollapsed ? null : index)
    setCollapsed(toCollapsed)
  }
  useAutoExpandActiveCategory({ isActive, collapsed, updateCollapsed, activePath })
  useEffect(() => {
    if (collapsible && expandedItem != null && expandedItem !== index && autoCollapseCategories) {
      setCollapsed(true)
    }
  }, [collapsible, expandedItem, index, setCollapsed, autoCollapseCategories])

  const handleItemClick: ComponentProps<'a'>['onClick'] = (e) => {
    onItemClick?.(item)
    if (collapsible) {
      if (href) {
        if (isCurrentPage) {
          e.preventDefault()
          updateCollapsed()
        } else {
          updateCollapsed(false)
        }
      } else {
        e.preventDefault()
        updateCollapsed()
      }
    }
  }

  const showHeroChevron = collapsible && level > 1

  return (
    <li
      className={clsx(
        ThemeClassNames.docs.docSidebarItemCategory,
        ThemeClassNames.docs.docSidebarItemCategoryLevel(level),
        'menu__list-item',
        {
          'menu__list-item--collapsed': collapsed,
        },
        className
      )}
    >
      <div
        className={clsx('menu__list-item-collapsible', {
          'menu__list-item-collapsible--active': isCurrentPage,
        })}
      >
        <Link
          className={clsx(styles.categoryLink, 'menu__link', {
            'menu__link--sublist': collapsible,
            'menu__link--sublist-caret': !href && collapsible,
            'menu__link--active': isActive,
            [styles.categoryLinkWithHeroChevron]: showHeroChevron && !href,
          })}
          onClick={handleItemClick}
          aria-current={isCurrentPage ? 'page' : undefined}
          role={collapsible && !href ? 'button' : undefined}
          aria-expanded={collapsible && !href ? !collapsed : undefined}
          href={collapsible ? (hrefWithSSRFallback ?? '#') : hrefWithSSRFallback}
          {...props}
        >
          <CategoryLinkLabel label={label} />
          {showHeroChevron && !href && (
            <HiOutlineChevronRight
              className={clsx(styles.categoryChevron, {
                [styles.categoryChevronExpanded]: !collapsed,
              })}
              aria-hidden="true"
            />
          )}
        </Link>
        {href && collapsible && (
          <CollapseButton
            collapsed={collapsed}
            categoryLabel={label}
            onClick={(e) => {
              e.preventDefault()
              updateCollapsed()
            }}
          />
        )}
      </div>

      <Collapsible lazy as="ul" className="menu__list" collapsed={collapsed}>
        <DocSidebarItems
          items={items}
          tabIndex={collapsed ? -1 : 0}
          onItemClick={onItemClick}
          activePath={activePath}
          level={level + 1}
        />
      </Collapsible>
    </li>
  )
}
