import React from 'react'
import { HiOutlineWrenchScrewdriver as WrenchIcon } from 'react-icons/hi2'
import styles from './WorkInProgress.module.css'

interface WorkInProgressProps {
  title: string
  message: string
  type: string
}

export default function WorkInProgress({ title, message, type }: WorkInProgressProps) {
  return (
    <section className={styles.workInProgress}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.leftColumn}>
            <div className={styles.mobileBadge}>
              <div className={styles.badge}>
                <WrenchIcon className={styles.badgeIcon} />
                <span className={styles.badgeText}>IN PROGRESS</span>
              </div>
            </div>
            <div className={styles.titleRow}>
              <h3 className={styles.title}>{title}</h3>
            </div>
            <p className={styles.message}>{message}</p>
          </div>
          <div className={styles.rightColumn}>
            <button className={styles.ctaButton}>
              Notify me when available
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
