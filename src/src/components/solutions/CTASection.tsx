import React from 'react'
import Link from '@docusaurus/Link'
import Heading from '@theme/Heading'
import styles from './solution.module.css'

interface CTASectionProps {
  title: string
  description: string
  primaryButton?: {
    text: string
    link: string
  }
  secondaryButton?: {
    text: string
    link: string
  }
}

export default function CTASection({
  title,
  description,
  primaryButton,
  secondaryButton
}: CTASectionProps) {
  return (
    <section className={styles.cta}>
      <div className={styles.container}>
        <div className={styles.ctaContent}>
          <Heading as="h2">{title}</Heading>
          <p>{description}</p>
          <div className={styles.ctaButtons}>
            {primaryButton && (
              <Link to={primaryButton.link} className={styles.ctaPrimary}>
                {primaryButton.text}
              </Link>
            )}
            {secondaryButton && (
              <Link 
                to={secondaryButton.link} 
                className={styles.ctaSecondary}
                {...(secondaryButton.link.startsWith('http') ? { target: '_blank' } : {})}
              >
                {secondaryButton.text}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}