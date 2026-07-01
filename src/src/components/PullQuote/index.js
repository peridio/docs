import React from 'react'
import styles from './styles.module.css'

// A standout result callout: a subtly accent-tinted panel with a left accent
// rail and a mono kicker. Wrap key figures in **bold** (markdown) to pull them
// out in the accent color. `label` sets the kicker (pass null to hide it);
// optional `cite` renders an attribution.
export default function PullQuote({ children, cite, label = 'Result' }) {
  return (
    <figure className={styles.pullquote}>
      {label ? <span className={styles.kicker}>{label}</span> : null}
      <blockquote className={styles.text}>{children}</blockquote>
      {cite ? <figcaption className={styles.cite}>{cite}</figcaption> : null}
    </figure>
  )
}
