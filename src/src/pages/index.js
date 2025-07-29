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
        {/* Avocado OS - Featured */}
        <div className={clsx(styles.stack, styles.featured)}>
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
                to="https://avocadolinux.org/community"
                className={styles.externalLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                💬 Community
              </Link>
            </div>
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

        {/* Supported Hardware - i.MX8MP */}
        <div className={styles.stack}>
          <div className={styles.header}>
            <div className={styles.iconContainer}>
              💻
            </div>
            <Heading as="h2">i.MX8MP</Heading>
            <p className={styles.subtitle}>NXP High-Performance SoC</p>
          </div>
          <div className={styles.body}>
            <div className={styles.badge}>Production Ready</div>
            <ul>
              <li>Quad-core ARM Cortex-A53</li>
              <li>Neural Processing Unit</li>
              <li>4K video processing</li>
              <li>Industrial temperature range</li>
            </ul>
            <Link to="/integration/linux/reference-designs/imx6ullevk/overview" className={styles.ctaButton}>
              View Reference →
            </Link>
          </div>
        </div>

        {/* Supported Hardware - Raspberry Pi */}
        <div className={styles.stack}>
          <div className={styles.header}>
            <div className={styles.iconContainer}>
              🍓
            </div>
            <Heading as="h2">Raspberry Pi</Heading>
            <p className={styles.subtitle}>Popular Development Platform</p>
          </div>
          <div className={styles.body}>
            <div className={styles.badge}>Production Ready</div>
            <ul>
              <li>Pi 3, 4, and 5 supported</li>
              <li>Compute Module variants</li>
              <li>GPIO and peripheral access</li>
              <li>Camera and display support</li>
            </ul>
            <Link to="/integration/linux/reference-designs/raspberrypi4/overview" className={styles.ctaButton}>
              View Reference →
            </Link>
          </div>
        </div>

        {/* Supported Hardware - NVIDIA Jetson */}
        <div className={styles.stack}>
          <div className={styles.header}>
            <div className={styles.iconContainer}>
              ⚡
            </div>
            <Heading as="h2">NVIDIA Jetson</Heading>
            <p className={styles.subtitle}>AI/ML Edge Computing</p>
          </div>
          <div className={styles.body}>
            <div className={styles.badge}>Production Ready</div>
            <ul>
              <li>GPU-accelerated inference</li>
              <li>CUDA and TensorRT support</li>
              <li>Computer vision pipelines</li>
              <li>Edge AI applications</li>
            </ul>
            <Link to="/integration/introduction" className={styles.ctaButton}>
              View Integration →
            </Link>
          </div>
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
