import React from 'react'
import clsx from 'clsx'
import Heading from '@theme/Heading'
import styles from './styles.module.css'

/**
 * Option C: Dedicated PathComparison component
 * Two paths on top, Avocado as the resolution below
 */
export default function PathComparison() {
  return (
    <div className={styles.comparisonWrapper}>
      <div className={styles.pathRow}>
        <div className={styles.pathBlock}>
          <div className={styles.pathBlockHeader}>
            <Heading as="h4">
              The Ubuntu / Debian Path <span className={styles.subtitle}>Ship fast</span>
            </Heading>
          </div>
          <div className={styles.pathBlockBody}>
            <div className={styles.section}>
              <div className={styles.sectionLabel}>What you get</div>
              <ul className={styles.pros}>
                <li>Familiar package management</li>
                <li>Fast prototyping</li>
                <li>Massive community support</li>
              </ul>
            </div>
            <div className={styles.section}>
              <div className={styles.sectionLabel}>What it costs you</div>
              <ul className={styles.cons}>
                <li>Runtime mutations cause state drift</li>
                <li>Devices diverge in the field</li>
                <li>Compliance gaps at scale</li>
                <li>Managing servers, not devices</li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.pathBlock}>
          <div className={styles.pathBlockHeader}>
            <Heading as="h4">
              The Yocto / Buildroot Path <span className={styles.subtitle}>Ship safe</span>
            </Heading>
          </div>
          <div className={styles.pathBlockBody}>
            <div className={styles.section}>
              <div className={styles.sectionLabel}>What you get</div>
              <ul className={styles.pros}>
                <li>Reproducible, deterministic builds</li>
                <li>Minimal attack surface</li>
                <li>Immutable infrastructure</li>
              </ul>
            </div>
            <div className={styles.section}>
              <div className={styles.sectionLabel}>What it costs you</div>
              <ul className={styles.cons}>
                <li>Talent pool is tiny</li>
                <li>Integration takes 18+ months</li>
                <li>Every change means a full rebuild</li>
                <li>Painful LTS migrations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bridgeDivider}>What if you didn&apos;t have to choose?</div>

      <div className={styles.resolutionBlock}>
        <div className={styles.resolutionHeader}>
          <Heading as="h4">
            Avocado OS{' '}
            <span className={styles.subtitle}>
              Yocto&apos;s production guarantees. Ubuntu&apos;s developer experience.
            </span>
          </Heading>
        </div>
        <div className={styles.resolutionBody}>
          <ul className={clsx(styles.wins, styles.resolutionGrid)}>
            <li>Deterministic, reproducible builds</li>
            <li>Fast iteration — no multi-hour rebuilds</li>
            <li>Immutable rootFS with dm-verity</li>
            <li>Composable systemd extensions</li>
            <li>A/B rollback and secure boot chain</li>
            <li>No state drift, production certifiable</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

/**
 * Option B: Three-column card grid using CSS modules
 * (No dependency on Card component — self-contained for easy comparison)
 */
export function PathComparisonCards() {
  return (
    <div className={styles.pathGrid}>
      <div className={styles.pathCard}>
        <div className={clsx(styles.pathHeader, styles.muted)}>
          <Heading as="h4">Ubuntu / Debian</Heading>
        </div>
        <div className={styles.pathBody}>
          <div>
            <div className={styles.sectionLabel}>Strengths</div>
            <ul className={styles.pros}>
              <li>Familiar package management</li>
              <li>Fast prototyping</li>
              <li>Large community</li>
            </ul>
          </div>
          <div>
            <div className={styles.sectionLabel}>Tradeoffs</div>
            <ul className={styles.cons}>
              <li>Runtime state drift</li>
              <li>Devices diverge in the field</li>
              <li>Compliance gaps</li>
              <li>Managing servers, not devices</li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.pathCard}>
        <div className={clsx(styles.pathHeader, styles.muted)}>
          <Heading as="h4">Yocto / Buildroot</Heading>
        </div>
        <div className={styles.pathBody}>
          <div>
            <div className={styles.sectionLabel}>Strengths</div>
            <ul className={styles.pros}>
              <li>Reproducible builds</li>
              <li>Minimal attack surface</li>
              <li>Immutable infrastructure</li>
            </ul>
          </div>
          <div>
            <div className={styles.sectionLabel}>Tradeoffs</div>
            <ul className={styles.cons}>
              <li>Tiny talent pool</li>
              <li>18+ month integration</li>
              <li>Full rebuild every change</li>
              <li>Painful LTS migrations</li>
            </ul>
          </div>
        </div>
      </div>

      <div className={clsx(styles.pathCard, styles.highlight)}>
        <div className={clsx(styles.pathHeader, styles.primary)}>
          <Heading as="h4">Avocado OS</Heading>
        </div>
        <div className={styles.pathBody}>
          <div>
            <div className={styles.sectionLabel}>You get both</div>
            <ul className={styles.wins}>
              <li>Deterministic builds</li>
              <li>Immutable rootFS + dm-verity</li>
              <li>A/B rollback</li>
              <li>Secure boot chain</li>
              <li>Fast iteration</li>
              <li>No state drift</li>
              <li>Composable extensions</li>
              <li>Production certifiable</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
