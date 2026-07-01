import React from 'react'
import styles from './styles.module.css'

// A magazine-style pull quote: a standout statement set off from the body
// with accent rules above and below. Optional `cite` renders an attribution.
export default function PullQuote({ children, cite }) {
  return (
    <figure className={styles.pullquote}>
      <blockquote className={styles.text}>{children}</blockquote>
      {cite ? <figcaption className={styles.cite}>{cite}</figcaption> : null}
    </figure>
  )
}
