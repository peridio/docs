import React from 'react'
import Link from '@docusaurus/Link'
import Heading from '@theme/Heading'
import styles from './styles.module.css'

interface Stat {
  value: string
  label: string
}

interface CTA {
  label: string
  to: string
  external?: boolean
}

interface HardwareHeroProps {
  vendor: string
  vendorUrl?: string
  model: string
  tagline?: string
  image?: string
  imageAlt?: string
  stats?: Stat[]
  target?: string
  ctas?: {
    primary?: CTA
    secondary?: CTA
  }
}

function ExternalIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      className={styles.externalIcon}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

function ChipIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      className={styles.chipIcon}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="2" x2="9" y2="4" />
      <line x1="15" y1="2" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="22" />
      <line x1="15" y1="20" x2="15" y2="22" />
      <line x1="20" y1="9" x2="22" y2="9" />
      <line x1="20" y1="14" x2="22" y2="14" />
      <line x1="2" y1="9" x2="4" y2="9" />
      <line x1="2" y1="14" x2="4" y2="14" />
    </svg>
  )
}

function CTAButton({ cta, variant }: { cta: CTA; variant: 'primary' | 'secondary' }) {
  const className = variant === 'primary' ? styles.ctaPrimary : styles.ctaSecondary

  const externalProps = cta.external ? { target: '_blank', rel: 'noopener noreferrer' } : undefined

  return (
    <Link to={cta.to} className={className} {...externalProps}>
      <span>{cta.label}</span>
      {cta.external && <ExternalIcon size={14} />}
    </Link>
  )
}

export default function HardwareHero({
  vendor,
  vendorUrl,
  model,
  tagline,
  image,
  imageAlt,
  stats,
  target,
  ctas,
}: HardwareHeroProps) {
  const hasCtas = ctas && (ctas.primary || ctas.secondary)

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.topRow} data-has-image={image ? 'true' : 'false'}>
          <div className={styles.heading}>
            <div className={styles.vendorRow}>
              {vendorUrl ? (
                <Link
                  to={vendorUrl}
                  className={styles.vendorLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{vendor}</span>
                  <ExternalIcon size={10} />
                </Link>
              ) : (
                <span className={styles.vendor}>{vendor}</span>
              )}
            </div>
            <Heading as="h1" className={styles.title}>
              <span className={styles.model}>{model}</span>
            </Heading>

            {tagline && <p className={styles.tagline}>{tagline}</p>}

            {target && (
              <div className={styles.targetGroup}>
                <ChipIcon size={14} />
                <span className={styles.targetLabel}>Avocado target name</span>
                <code className={styles.target}>{target}</code>
              </div>
            )}
          </div>

          {image && (
            <div className={styles.image}>
              <img
                src={image}
                alt={imageAlt || `${vendor} ${model}`}
                className={styles.productImage}
                loading="eager"
              />
            </div>
          )}
        </div>

        {stats && stats.length > 0 && (
          <ul className={styles.stats} data-count={stats.length}>
            {stats.map((stat, i) => (
              <li key={i} className={styles.stat}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </li>
            ))}
          </ul>
        )}

        {hasCtas && (
          <div className={styles.ctas}>
            <div className={styles.ctaRow}>
              <div className={styles.ctaGroup}>
                {ctas.primary && <CTAButton cta={ctas.primary} variant="primary" />}
                {ctas.secondary && <CTAButton cta={ctas.secondary} variant="secondary" />}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
