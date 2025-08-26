import React from 'react'
import Link from '@docusaurus/Link'
import Heading from '@theme/Heading'
import styles from './solution.module.css'

interface ResourceCardsProps {
  resources: Array<{
    title: string
    description: string
    link: string
  }>
  title?: string
}

export default function ResourceCards({
  resources,
  title = 'Documentation & Resources',
}: ResourceCardsProps) {
  return (
    <section className={styles.resources}>
      <div className={styles.container}>
        <Heading as="h2" className={styles.sectionTitle}>
          {title}
        </Heading>
        <div className={styles.resourceGrid}>
          {resources.map((resource, index) => (
            <Link key={index} to={resource.link} className={styles.resourceCard}>
              <Heading as="h3">{resource.title}</Heading>
              <p>{resource.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
