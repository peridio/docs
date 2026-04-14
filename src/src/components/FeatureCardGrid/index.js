import React from 'react'
import clsx from 'clsx'
import Heading from '@theme/Heading'
import styles from './styles.module.css'

/**
 * A single feature card with icon, title, and rich content.
 *
 * @param {object} props
 * @param {React.ReactNode} props.icon - Inline SVG element.
 * @param {string} props.title - Card heading.
 * @param {string} [props.href] - Optional link destination (makes the card clickable).
 * @param {React.ReactNode} props.children - Card body (supports markdown/JSX).
 */
export function FeatureCard({ icon, title, href, children }) {
  const Tag = href ? 'a' : 'div'
  const linkProps = href ? { href } : {}

  return (
    <Tag className={clsx(styles.card, href && styles.cardLink)} {...linkProps}>
      <div className={styles.header}>
        {icon && <div className={styles.icon}>{icon}</div>}
        <Heading as="h3">{title}</Heading>
      </div>
      {children}
    </Tag>
  )
}

/**
 * Grid wrapper for FeatureCard children.
 *
 * @param {object} props
 * @param {number} [props.columns] - Number of columns (default 2).
 * @param {React.ReactNode} props.children
 */
export default function FeatureCardGrid({ columns, children }) {
  const style =
    columns && columns !== 2 ? { gridTemplateColumns: `repeat(${columns}, 1fr)` } : undefined
  return (
    <div className={clsx(styles.grid, columns === 3 && styles.grid3col)} style={style}>
      {children}
    </div>
  )
}
