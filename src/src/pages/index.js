import React from 'react'
import clsx from 'clsx'
import Layout from '@theme/Layout'
import styles from './index.module.css'
import Heading from '@theme/Heading'
import Link from '@docusaurus/Link'

function HomepageHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as='h1' className={clsx("hero__title", styles.hero_title)}>
          Peridio Documentation
        </Heading>
        <p className={clsx("hero__subtitle", styles.hero_subtitle)}>
          Explore the future of embedded systems with Peridio. Whether you&apos;re an engineer building innovative devices or a decision-maker driving product strategy, our comprehensive documentation provides the insights and tools you need to succeed.
        </p>
      </div>
    </header>
  )
}



export default function Home() {
  return (
    <Layout>
      <HomepageHeader />
      <main className={clsx('container', styles.container)}>
        <div className={styles.stack}>
          <Link to="/docs/platform/getting-started" className={styles.header}>
            <Heading as="h2">Overview</Heading>
            <p className={styles.subtitle}>Platform value and positioning</p>
          </Link>
          <div className={styles.body}>
            <ul>
              <li>Platform value prop</li>
              <li>High-level architecture diagram</li>
              <li>2-min explainer video</li>
            </ul>
          </div>
        </div>
        <div className={styles.stack}>
          <Link to="/docs/quick-start" className={styles.header}>
            <Heading as="h2">Quick Start</Heading>
            <p className={styles.subtitle}>Achieve first success in &lt;30 min</p>
          </Link>
          <div className={styles.body}>
            <ul>
              <li>Flash Avocado</li>
              <li>Register with Peridio</li>
              <li>OTA first update</li>
            </ul>
          </div>
        </div>
        <div className={styles.stack}>
          <Link to="/docs/develop" className={styles.header}>
            <Heading as="h2">Develop</Heading>
            <p className={styles.subtitle}>Guide day-to-day engineering work</p>
          </Link>
          <div className={styles.body}>
            <ul>
              <li>Board bring-up</li>
              <li>Yocto layers</li>
              <li>SDK / CLI</li>
              <li>Container workflows</li>
              <li>Sample apps</li>
            </ul>
          </div>
        </div>
        <div className={styles.stack}>
          <Link to="/docs/operate" className={styles.header}>
            <Heading as="h2">Operate</Heading>
            <p className={styles.subtitle}>Show fleet-scale workflows</p>
          </Link>
          <div className={styles.body}>
            <ul>
              <li>OTA pipelines</li>
              <li>Device monitoring</li>
              <li>Fleet management</li>
              <li>CI/CD patterns</li>
            </ul>
          </div>
        </div>
      </main>
    </Layout>
  )
}
