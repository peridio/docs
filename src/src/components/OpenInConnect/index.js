import React from 'react'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import styles from './styles.module.css'

/**
 * Deep link into Avocado Connect via its `/go/:page` resolver, which picks the
 * signed-in user's current org.
 *
 * @param {object} props
 * @param {string} props.to - Connect page slug, e.g. "fleet", "deployments", "tunnels".
 * @param {React.ReactNode} [props.children] - Link text (defaults to "Open in Connect").
 */
export default function OpenInConnect({ to, children }) {
  const { siteConfig } = useDocusaurusContext()
  const base = String(siteConfig.customFields?.connectBaseUrl ?? 'https://connect.peridio.com')
  const href = `${base.replace(/\/$/, '')}/go/${encodeURIComponent(to)}`

  return (
    <Link className={styles.button} href={href}>
      {children ?? 'Open in Connect'}
      <span aria-hidden="true">↗</span>
    </Link>
  )
}
