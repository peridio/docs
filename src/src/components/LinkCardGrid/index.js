import React from 'react'
import Link from '@docusaurus/Link'
import Heading from '@theme/Heading'
import styles from './styles.module.css'

/**
 * A single link card with icon, title, description, and CTA.
 *
 * @param {object} props
 * @param {string} props.href - Link destination.
 * @param {string} props.title - Card heading.
 * @param {string} props.description - Short description text.
 * @param {React.ReactNode} [props.icon] - Inline SVG element (uses currentColor).
 * @param {string} [props.logo] - Path to an image file (gets brand-color filter).
 * @param {string} [props.logoAlt] - Alt text for the logo image.
 * @param {string} [props.cta] - CTA label (defaults to "Get started").
 */
export function LinkCard({ href, title, description, icon, logo, logoAlt, cta = 'Get started' }) {
  return (
    <Link href={href} className={styles.card}>
      <div className={styles.icon}>
        {logo ? (
          <span
            className={styles.logo}
            style={{ '--logo-url': `url(${logo})` }}
            role="img"
            aria-label={logoAlt || title}
          />
        ) : (
          icon
        )}
      </div>
      <Heading as="h3">{title}</Heading>
      <p className={styles.description}>{description}</p>
      <span className={styles.cta}>{cta} &rarr;</span>
    </Link>
  )
}

/**
 * Grid wrapper that lays out LinkCard children in a 2-column grid
 * with equal horizontal and vertical gaps.
 *
 * @param {object} props
 * @param {number} [props.columns] - Number of columns (default 2).
 * @param {React.ReactNode} props.children
 */
export default function LinkCardGrid({ columns, children }) {
  const style = columns ? { gridTemplateColumns: `repeat(${columns}, 1fr)` } : undefined
  return (
    <div className={styles.grid} style={style}>
      {children}
    </div>
  )
}
