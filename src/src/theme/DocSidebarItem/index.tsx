import React, { type ReactNode } from 'react'
import DocSidebarItem from '@theme-original/DocSidebarItem'
import type DocSidebarItemType from '@theme/DocSidebarItem'
import type { WrapperProps } from '@docusaurus/types'

type Props = WrapperProps<typeof DocSidebarItemType>

export default function DocSidebarItemWrapper(props: Props): ReactNode {
  const { item } = props

  // Check if this is a doc or link item with inDevelopment custom prop
  const isInDevelopment =
    (item.type === 'doc' || item.type === 'link') && item.customProps?.inDevelopment === true

  if (isInDevelopment) {
    // Clone the item and modify the label to include badge
    const modifiedItem = {
      ...item,
      label: (
        <span
          title="IN DEVELOPMENT"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <span style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {item.label}
          </span>
          <span className="dev-badge">IN DEVELOPMENT</span>
        </span>
      ),
    }

    return <DocSidebarItem {...props} item={modifiedItem} />
  }

  return <DocSidebarItem {...props} />
}
