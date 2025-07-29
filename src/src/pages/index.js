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
        <img src="/img/peridio-white.svg" alt="Peridio Logo" className={styles.logo} />
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
          <div className={styles.header}>
            <div className={styles.iconContainer}>
              🥑
            </div>
            <Heading as="h2">Avocado OS</Heading>
            <p className={styles.subtitle}>Production-Ready Embedded Linux</p>
          </div>
          <div className={styles.body}>
            <p className={styles.description}>
              A secure, updatable Linux distribution built for embedded devices.
              Get to production faster with pre-configured security, OTA updates, and container support.
            </p>
            <div className={styles.linkGrid}>
              <Link
                to="https://avocadolinux.org" 
                className={styles.externalLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                🌐 Website
              </Link>
              <Link
                to="https://docs.avocadolinux.org" 
                className={styles.externalLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                📚 Developer Docs
              </Link>
              <Link 
                to="https://github.com/avocado-linux" 
                className={styles.externalLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                🛠️ Get Involved
              </Link>
              <Link
                to="https://discord.com/invite/rH77fKpKAj"
                className={styles.externalLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                💬 Join Discord
              </Link>
            </div>
          </div>
        </div>

        {/* Peridio Core (Platform) */}
        <div className={styles.stack}>
          <div className={styles.header}>
            <div className={styles.iconContainer}>🏗️</div>
            <Heading as="h2">Peridio Core</Heading>
            <p className={styles.subtitle}>Artifact & Device Platform</p>
          </div>
          <div className={styles.body}>
            <ul>
              <li>Artifact & binary management</li>
              <li>Device provisioning & cohorts</li>
              <li>Fleet view & OTA deployments</li>
            </ul>
            <Link to="/platform/reference/overview" className={styles.ctaButton}>
              Platform Overview →
            </Link>
          </div>
        </div>

        {/* EVK Quick Start */}
        <div className={styles.stack}>
          <div className={styles.header}>
            <div className={styles.iconContainer}>
              🚀
            </div>
            <Heading as="h2">Get Started</Heading>
            <p className={styles.subtitle}>EVK Demo in &lt;30 minutes</p>
          </div>
          <div className={styles.body}>
            <ul>
              <li>Flash Avocado OS</li>
              <li>Register with Peridio</li>
              <li>Deploy your first OTA update</li>
            </ul>
            <Link to="/evk" className={styles.ctaButton}>
              Start Demo →
            </Link>
          </div>
        </div>

        {/* Supported Hardware Carousel */}
        <div className={styles.fullWidth}>
          <HardwareCarousel />
        </div>

        {/* Build Tools */}
        <div className={styles.stack}>
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
            <Link to="/integration/linux/build-tools/yocto" className={styles.ctaButton}>
              Learn More →
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  )
}
