import React from 'react'
import styles from './styles.module.css'

const items = [
  { key: 'full', label: 'Fully supported', dotClass: styles.legendDotFull },
  { key: 'partial', label: 'In development', dotClass: styles.legendDotPartial },
  { key: 'none', label: 'Not supported', dotClass: styles.legendDotNone },
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
