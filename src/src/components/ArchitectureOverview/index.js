import React from 'react'
import styles from './styles.module.css'

const CodeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
)

const ExtIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="8" rx="2" />
    <rect x="2" y="14" width="20" height="8" rx="2" />
    <line x1="6" y1="6" x2="6.01" y2="6" />
    <line x1="6" y1="18" x2="6.01" y2="18" />
  </svg>
)

const LayersIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2 2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
)

export default function ArchitectureOverview() {
  return (
    <div
      className={styles.wrapper}
      role="img"
      aria-label="Avocado OS architecture overview — Binary Distribution flows into the SDK which produces Composable Runtimes"
    >
      {/* Column headings */}
      <div className={styles.headings}>
        <span className={styles.heading}>Binary Distribution</span>
        <span className={styles.headingSpacer} />
        <span className={styles.heading}>SDK</span>
        <span className={styles.headingSpacer} />
        <span className={styles.heading}>Composable Runtimes</span>
      </div>

      {/* Content grid */}
      <div className={styles.grid}>
        {/* Column 1: Build System */}
        <div>
          <div className={styles.mobileHeading}>Binary Distribution</div>
          <div className={styles.zone}>
            <span className={styles.zoneLabel}>Build System</span>
            <div className={styles.pill}>Avocado Build System</div>
            <div className={styles.pill}>BSP</div>
            <div className={styles.pill}>Target Device</div>
          </div>
        </div>

        {/* Arrow 1 */}
        <div className={styles.arrow} aria-hidden="true" />

        {/* Column 2: Dev Tools */}
        <div>
          <div className={styles.mobileHeading}>SDK</div>
          <div className={styles.zone}>
            <span className={styles.zoneLabel}>Dev Tools</span>
            <div className={styles.iconRow}>
              <div className={styles.iconItem}>
                <div className={styles.iconBoxCode}>
                  <CodeIcon />
                </div>
                <span className={styles.iconLabel}>
                  Application
                  <br />
                  Source
                </span>
              </div>
              <div className={styles.iconItem}>
                <div className={styles.iconBoxExt}>
                  <ExtIcon />
                </div>
                <span className={styles.iconLabel}>Custom Ext(s)</span>
              </div>
              <div className={styles.iconItem}>
                <div className={styles.iconBoxAvocado}>
                  <LayersIcon />
                </div>
                <span className={styles.iconLabel}>Avocado Ext(s)</span>
              </div>
            </div>
            <div className={styles.pill}>Avocado CLI</div>
            <div className={styles.pill}>Avocado Package Repo</div>
          </div>
        </div>

        {/* Arrow 2 */}
        <div className={styles.arrow} aria-hidden="true" />

        {/* Column 3: Runtime */}
        <div>
          <div className={styles.mobileHeading}>Composable Runtimes</div>
          <div className={styles.zone}>
            <span className={styles.zoneLabel}>Runtime</span>
            <div className={styles.mergedRootfs}>
              <span className={styles.mergedRootfsLabel}>Merged RootFS</span>
              <div className={styles.pill}>Extensions</div>
              <div className={styles.pill}>Avocado Core</div>
            </div>
            <div className={styles.pill}>Kernel</div>
          </div>
        </div>
      </div>
    </div>
  )
}
