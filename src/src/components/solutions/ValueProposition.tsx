import React from 'react'
import Heading from '@theme/Heading'
import styles from './solution.module.css'

interface ValuePropositionProps {
  title?: string
  content?: string
}

export default function ValueProposition({ 
  title = "Solution Overview",
  content
}: ValuePropositionProps) {
  return (
    <section className={styles.solutionOverview}>
      <div className={styles.container}>
        <Heading as="h2" className={styles.overviewTitle}>
          {title}
        </Heading>
        {content && (
          <p className={styles.overviewContent}>{content}</p>
        )}
      </div>
    </section>
  )
}