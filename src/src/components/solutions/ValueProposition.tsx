import React, { useState } from 'react'
import Heading from '@theme/Heading'
import styles from './solution.module.css'

interface ValuePropositionProps {
  title?: string
  content?: string
  videoUrl?: string
}

export default function ValueProposition({
  title = 'Solution Overview',
  content,
  videoUrl,
}: ValuePropositionProps) {
  const [videoLoading, setVideoLoading] = useState(true)

  const handleVideoLoad = () => {
    setVideoLoading(false)
  }

  return (
    <section className={styles.solutionOverview}>
      <div className={styles.container}>
        {!videoUrl && (
          <Heading as="h2" className={styles.overviewTitle}>
            {title}
          </Heading>
        )}

        {videoUrl && (
          <div className={styles.videoContainer}>
            {videoLoading && (
              <div className={styles.videoLoader}>
                <div className={styles.spinner}></div>
                <div className={styles.loadingText}>Loading video...</div>
              </div>
            )}
            <iframe
              src={videoUrl}
              title="Product Demo Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className={videoLoading ? styles.videoFrameHidden : styles.videoFrame}
              onLoad={handleVideoLoad}
            />
          </div>
        )}

        {content && <p className={styles.overviewContent}>{content}</p>}
      </div>
    </section>
  )
}
