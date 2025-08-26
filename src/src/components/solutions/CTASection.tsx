import React from 'react'
import Link from '@docusaurus/Link'
import Heading from '@theme/Heading'
import styles from './solution.module.css'

interface CTASectionProps {
  title: string
  subtitle?: string
  primaryCTA?: {
    text: string
    link: string
    target?: string
  }
  secondaryCTA?: {
    text: string
    link: string
    target?: string
  }
}

export default function CTASection({ title, subtitle, primaryCTA, secondaryCTA }: CTASectionProps) {
  return (
    <section className={styles.cta}>
      <div className={styles.container}>
        <div className={styles.ctaContent}>
          <Heading as="h2">{title}</Heading>
          {subtitle && <p>{subtitle}</p>}
          <div className={styles.ctaButtons}>
            {primaryCTA && (
              <Link
                to={primaryCTA.link}
                className={styles.ctaPrimary}
                {...(primaryCTA.target ? { target: primaryCTA.target } : {})}
              >
                {primaryCTA.text}
              </Link>
            )}
            {secondaryCTA && (
              <Link
                to={secondaryCTA.link}
                className={styles.ctaSecondary}
                {...(secondaryCTA.target ? { target: secondaryCTA.target } : {})}
              >
                {secondaryCTA.text}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
