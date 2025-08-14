import React from 'react'
import Heading from '@theme/Heading'
import styles from './solution.module.css'

interface UseCasesProps {
  useCases: Array<{
    title: string
    description: string
    image?: string
  }>
  title?: string
}

export default function UseCases({ useCases, title = "Production Use Cases" }: UseCasesProps) {
  return (
    <section className={styles.useCases}>
      <div className={styles.container}>
        <Heading as="h2" className={styles.sectionTitle}>
          {title}
        </Heading>
        <div className={styles.useCaseGrid}>
          {useCases.map((useCase, index) => (
            <div key={index} className={styles.useCase}>
              {useCase.image && (
                <img
                  src={useCase.image}
                  alt={useCase.title}
                  className={styles.useCaseImage}
                />
              )}
              <Heading as="h3">{useCase.title}</Heading>
              <p>{useCase.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}