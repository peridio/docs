import React from 'react'
import clsx from 'clsx'
import Layout from '@theme/Layout'
import styles from './index.module.css'
import Heading from '@theme/Heading'
import Link from '@docusaurus/Link'
import SearchBar from '@theme/SearchBar'
import HardwareCarousel from '../components/HardwareCarousel'

function HomepageHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as='h1' className={clsx("hero__title", styles.hero_title)}>
          Developer Center
        </Heading>
        <p className={clsx("hero__subtitle", styles.hero_subtitle)}>
          Launch faster with field-proven infrastructure and Avocado OS.
        </p>
        <div className={styles.heroSearch}>
          <SearchBar />
        </div>
      </div>
    </header>
  )
}

export default function Home() {
  return (
    <Layout>
      <HomepageHeader />
      <main className={clsx('container', styles.container)}>
        
        {/* Avocado OS */}
        <div className={styles.stack}>
          <div className={styles.stackHeader}>
            <img src="/img/avocado-linux-lock-up.png" alt="Avocado Linux" className={styles.lockup} />
          </div>
          <div className={styles.body}>
            <p className={styles.description}>
              A secure, updatable Linux distribution built for embedded devices.
              Get to production faster with pre-configured security, OTA updates, and container support.
            </p>
            {/* Avocado OS Links Section */}
              <div className={styles.linkGrid}>
                <Link
                  to="https://avocadolinux.org"
                  className={styles.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Website
                </Link>
                <Link
                  to="https://docs.avocadolinux.org"
                  className={styles.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Developer Docs
                </Link>
                <Link
                  to="https://github.com/avocado-linux"
                  className={styles.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get involved
                </Link>
                <Link
                  to="https://discord.com/invite/rH77fKpKAj"
                  className={styles.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join Discord
                </Link>
              </div>
          </div>
        </div>

        {/* Peridio Core (Platform) */}
        <div className={styles.stack}>
          <div className={styles.stackHeader}>
            <img src="/img/peridio-core-lock-up.png" alt="Peridio Core" className={styles.lockup} />
          </div>
          <div className={styles.body}>
            <ul>
              <li>Artifact & binary management</li>
              <li>Device provisioning & cohorts</li>
              <li>Fleet view & OTA deployments</li>
            </ul>
            {/* Platform Overview Button Group */}
            <div className={styles.ctaButtonGroup}>
              <Link to="/platform/reference/overview" className={styles.ctaButtonMinimal}>
                Platform Overview →
              </Link>
            </div>
          </div>
        </div>

        {/* EVK Quick Start */}
        <div className={styles.stack}>
          <div className={styles.stackHeader}>
            <Heading as="h2" style={{ margin: 0, fontSize: '2rem' }}>Get Started</Heading>
          </div>
          <div className={styles.body}>
            <ul>
              <li>Flash Avocado OS</li>
              <li>Register with Peridio</li>
              <li>Deploy your first OTA update</li>
            </ul>
            {/* Start Demo Button Group */}
            <div className={styles.ctaButtonGroup}>
              <Link to="/evk" className={styles.ctaButtonMinimal}>
                Start Demo →
              </Link>
            </div>
          </div>
        </div>

        {/* Supported Hardware Carousel */}
        <div className={styles.fullWidth}>
          <HardwareCarousel />
        </div>

        {/* Build Tools */}
        <div className={`${styles.stack} ${styles.buildToolsStack}`}>
          <div className={styles.header}>
            <div className={styles.iconContainer}>
              🔧
            </div>
            <Heading as="h2">Build Tools</Heading>
            <p className={styles.subtitle}>Yocto & Buildroot Integration</p>
          </div>
          <div className={styles.body}>
            <ul>
              <li>Pre-configured Yocto layers</li>
              <li>Buildroot external trees</li>
              <li>Custom board bring-up</li>
              <li>CI/CD pipeline templates</li>
            </ul>
            {/* Build Tools Button Group */}
            <div className={styles.ctaButtonGroup}>
              <Link to="/integration/linux/build-tools/yocto" className={styles.ctaButtonMinimal}>
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}
