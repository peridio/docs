import React from 'react'
import useBaseUrl from '@docusaurus/useBaseUrl'
import styles from './styles.module.css'

interface FeaturedImageProps {
  /** Image source. Site-absolute paths (e.g. `/img/hero.png`) are resolved
   *  against the site baseUrl; external URLs are used as-is. */
  src: string
  /** Accessible description of the image. */
  alt: string
  /** Small uppercase label above the title (e.g. "Milestone release"). */
  eyebrow?: string
  /** Large overlaid headline. */
  title?: string
  /** Supporting line under the title. */
  subtitle?: string
  /** Optional caption shown below the banner (credit / context). */
  caption?: string
  /** CSS object-position for the cover-fit image (e.g. "right center").
   *  Use when the subject sits off-center and shouldn't be cropped.
   *  Defaults to "center". */
  imagePosition?: string
}

/**
 * Full-width featured banner for special changelog posts. Renders an image
 * with a gradient scrim and optional overlaid eyebrow/title/subtitle, plus an
 * optional caption beneath. Bounded to the docs content column (not full-bleed)
 * so it sits naturally at the top of a changelog entry.
 */
export default function FeaturedImage({
  src,
  alt,
  eyebrow,
  title,
  subtitle,
  caption,
  imagePosition = 'center',
}: FeaturedImageProps) {
  const resolvedSrc = useBaseUrl(src)
  const hasOverlay = Boolean(eyebrow || title || subtitle)

  return (
    <figure className={styles.featured}>
      <div className={styles.frame}>
        <img
          src={resolvedSrc}
          alt={alt}
          className={styles.image}
          style={{ objectPosition: imagePosition }}
          loading="eager"
        />
        {hasOverlay && (
          <div className={styles.overlay}>
            {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
            {title && <span className={styles.title}>{title}</span>}
            {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
          </div>
        )}
      </div>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  )
}
