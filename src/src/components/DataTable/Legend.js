import React from 'react'
import styles from './styles.module.css'

const items = [
  { key: 'supported', label: 'Supported', dotClass: styles.legendDotSupported },
  { key: 'in-progress', label: 'In Progress', dotClass: styles.legendDotInProgress },
]

export function Legend() {
  return (
    <div className={styles.legend} role="note" aria-label="Legend">
      {items.map(({ key, label, dotClass }) => (
        <span key={key} className={styles.legendItem}>
          <span className={dotClass} aria-hidden="true" />
          <span>{label}</span>
        </span>
      ))}
    </div>
  )
}
