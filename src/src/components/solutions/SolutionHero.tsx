import React from 'react'
import Link from '@docusaurus/Link'
import Heading from '@theme/Heading'
import styles from './solution.module.css'

interface SolutionHeroProps {
  title: string
  subtitle: string
  highlight?: string
  stats: Array<{
    value: string
    label: string
  }>
  primaryCTA?: {
    text: string
    link: string
  }
  secondaryCTA?: {
    text: string
    link: string
  }
  image?: string
  imageAlt?: string
}

export default function SolutionHero({
  title,
  subtitle,
  highlight,
  stats,
  primaryCTA,
  secondaryCTA,
  image,
  imageAlt
}: SolutionHeroProps) {
  const renderTitle = () => {
    if (highlight) {
      const parts = title.split(highlight)
      return (
        <>
          {parts[0]}
          <span className={styles.highlight}>{highlight}</span>
          {parts[1]}
        </>
      )
    }
    return title
  }

  return (
    <section className={styles.hero}>
      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <Heading as="h1" className={styles.heroTitle}>
              {renderTitle()}
            </Heading>
            <p className={styles.heroSubtitle}>{subtitle}</p>
            
            {stats && stats.length > 0 && (
              <div className={styles.heroStats}>
                {stats.map((stat, index) => (
                  <div key={index} className={styles.stat}>
                    <span className={styles.statNumber}>{stat.value}</span>
                    <span className={styles.statLabel}>{stat.label}</span>
                  </div>
                ))}
              </div>
            )}
            
            <div className={styles.heroCta}>
              {primaryCTA && (
                <Link to={primaryCTA.link} className={styles.ctaPrimary}>
                  {primaryCTA.text}
                </Link>
              )}
              {secondaryCTA && (
                <Link to={secondaryCTA.link} className={styles.ctaSecondary}>
                  {secondaryCTA.text}
                </Link>
              )}
            </div>
          </div>
          
          {image && (
            <div className={styles.heroImage}>
              <img
                src={image}
                alt={imageAlt || title}
                className={styles.productImage}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}