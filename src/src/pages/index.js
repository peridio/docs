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
        <img src="/img/peridio-white.svg" alt="Peridio Logo" className={styles.logo} />
        <Heading as='h1' className={clsx("hero__title", styles.hero_title)}>
          Developer Center
        </Heading>
        <p className={clsx("hero__subtitle", styles.hero_subtitle)}>
          Launch faster with field-proven infrastructure and Avocado OS.
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
        <div className={styles.stack}>
          <Link to="/docs/security-and-compliance" className={styles.header}>
            <Heading as="h2">Security & Compliance</Heading>
            <p className={styles.subtitle}>Address risk & governance</p>
          </Link>
          <div className={styles.body}>
            <ul>
              <li>Secure boot</li>
              <li>SBOM</li>
              <li>CVE handling</li>
              <li>Audit logs</li>
            </ul>
          </div>
        </div>
        <div className={styles.stack}>
          <Link to="/docs/reference" className={styles.header}>
            <Heading as="h2">Reference</Heading>
            <p className={styles.subtitle}>Definitive, factual resources</p>
          </Link>
          <div className={styles.body}>
            <ul>
              <li>CLI / API docs</li>
              <li>Schemas & file formats</li>
              <li>Release notes & changelogs</li>
            </ul>
          </div>
        </div>
        <div className={styles.stack}>
          <Link to="/docs/solutions" className={styles.header}>
            <Heading as="h2">Solutions</Heading>
            <p className={styles.subtitle}>Vertical & performance examples</p>
          </Link>
          <div className={styles.body}>
            <ul>
              <li>Industry examples</li>
              <li>BOMs</li>
              <li>Performance tuning (engineers + PMMs)</li>
            </ul>
          </div>
        </div>
        <div className={styles.stack}>
          <Link to="/docs/community-and-support" className={styles.header}>
            <Heading as="h2">Community & Support</Heading>
            <p className={styles.subtitle}>Ongoing help & engagement</p>
          </Link>
          <div className={styles.body}>
            <ul>
              <li>Forum</li>
              <li>Slack</li>
              <li>Ticket portal</li>
              <li>Consulting offers</li>
            </ul>
          </div>
        </div>
      </main>
    </Layout>
  )
}
