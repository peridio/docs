import React from 'react'
import clsx from 'clsx'
import styles from './styles.module.css'

const statusConfig = {
  full: {
    className: styles.statusFull,
    label: 'Fully supported',
    short: 'Full',
  },
  partial: {
    className: styles.statusPartial,
    label: 'In development',
    short: 'Partial',
  },
  none: {
    className: styles.statusNone,
    label: 'Not supported',
    short: 'None',
  },
}

export function StatusIndicator({ status }) {
  const config = statusConfig[status] || statusConfig.none
  return (
    <span
      className={clsx(styles.statusCell, config.className)}
      role="img"
      aria-label={config.label}
    >
      <span className={styles.statusDot} aria-hidden="true" />
      <span className={styles.statusLabel}>{config.short}</span>
    </span>
  )
}

export { statusConfig }
