import React from 'react'
import { HiOutlineWrenchScrewdriver as WrenchIcon } from 'react-icons/hi2'
import Link from '@docusaurus/Link'
import styles from './ProvisioningComingSoon.module.css'

interface ProvisioningComingSoonProps {
  title: string
  message: string
  type: string
}

export default function ProvisioningComingSoon({ title, message, type }: ProvisioningComingSoonProps) {
  return (
    <section className={styles.provisioningComingSoon}>
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
            <Link 
              to="https://www.peridio.com/provisioning-guide-updates"
              className={styles.ctaButton}
              target="_blank"
            >
              Notify me when available
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
