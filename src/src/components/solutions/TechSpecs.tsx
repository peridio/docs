import React from 'react'
import Heading from '@theme/Heading'
import styles from './solution.module.css'

interface TechSpecsProps {
  specs: Array<{
    label: string
    value: string
    note?: string
  }>
  title?: string
}

export default function TechSpecs({ specs, title = "Technical Specifications" }: TechSpecsProps) {
  return (
    <section className={styles.specs}>
      <div className={styles.container}>
        <Heading as="h2" className={styles.sectionTitle}>
          {title}
        </Heading>
        <div className={styles.specsTable}>
          {specs.map((spec, index) => (
            <div key={index} className={styles.specsRow}>
              <div className={styles.specLabel}>{spec.label}</div>
              <div className={styles.specValue}>{spec.value}</div>
              {spec.note && <div className={styles.specNote}>{spec.note}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}