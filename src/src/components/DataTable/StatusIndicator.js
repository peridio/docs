import React from 'react'
import clsx from 'clsx'
import styles from './styles.module.css'

const statusConfig = {
  // Feed-year / LTS support states
  supported: {
    className: styles.statusSupported,
    label: 'Supported',
    short: 'Supported',
  },
  'in-progress': {
    className: styles.statusInProgress,
    label: 'In Progress',
    short: 'In Progress',
  },
  evaluation: {
    className: styles.statusEvaluation,
    label: 'Under evaluation',
    short: 'Eval',
  },
  // Legacy feature states (retained for other tables)
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
    label: 'Not available',
    short: '—',
  },
}

export function StatusIndicator({ status, showLabel = true }) {
  const config = statusConfig[status] || statusConfig.none
  return (
    <span
      className={clsx(styles.statusCell, config.className)}
      role="img"
      aria-label={config.label}
    >
      <span className={styles.statusDot} aria-hidden="true" />
      {showLabel && <span className={styles.statusLabel}>{config.short}</span>}
    </span>
  )
}

export { statusConfig }
