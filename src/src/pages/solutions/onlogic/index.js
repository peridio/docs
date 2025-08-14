import React from 'react'
import Layout from '@theme/Layout'
import Head from '@docusaurus/Head'
import Link from '@docusaurus/Link'
import Heading from '@theme/Heading'
import styles from './index.module.css'
import {
  HiOutlineServerStack as ServerStackIcon,
  HiOutlineFire as FireIcon,
  HiOutlineShieldCheck as ShieldCheckIcon,
  HiOutlineGlobeAlt as GlobeAltIcon,
  HiOutlineWrenchScrewdriver as WrenchScrewdriverIcon,
  HiOutlineBolt as BoltIcon,
  HiOutlineXMark as XMarkIcon,
  HiOutlineCheck as CheckIcon,
} from 'react-icons/hi2'

export default function FR201Solution() {
  return (
    <Layout>
      <Head>
        <title>OnLogic FR201 Industrial Gateway | Production-Ready Edge Computing | Peridio</title>
        <meta
          name="description"
          content="Deploy OnLogic FR201 fanless industrial gateways with atomic updates, protocol bridging, and enterprise fleet management. Production-ready software on industrial grade hardware."
        />
        <meta
          name="keywords"
          content="onlogic fr201, industrial gateway, fanless pc, protocol bridge, atomic updates, fleet management, modbus, opc-ua"
        />
        <meta
          property="og:title"
          content="OnLogic FR201 Industrial Gateway | Production-Ready Edge Computing | Peridio"
        />
        <meta
          property="og:description"
          content="Deploy OnLogic FR201 fanless industrial gateways with atomic updates and enterprise fleet management."
        />
        <meta property="og:image" content="/img/FR201.png" />
        <meta property="og:type" content="product" />
        <link rel="canonical" href="https://docs.peridio.com/solutions/onlogic" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Peridio + Avocado OS for OnLogic FR201',
            description:
              'Production-ready fanless industrial gateway with atomic updates and protocol bridging',
            manufacturer: {
              '@type': 'Organization',
              name: 'Peridio',
            },
            category: 'Industrial Gateway',
            offers: {
              '@type': 'Offer',
              availability: 'https://schema.org/InStock',
            },
            applicationCategory: 'Industrial Gateway, Protocol Bridge, Remote Site Management, Factory Data Aggregation',
            operatingSystem: 'Yocto Linux, Avocado OS',
          })}
        </script>
      </Head>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <Heading as="h1" className={styles.heroTitle}>
                Production-Ready Software on{' '}
                <span className={styles.highlight}>Industrial Grade Hardware</span>
              </Heading>
              <p className={styles.heroSubtitle}>
                Transform your OnLogic FR201 from development platform to production gateway with enterprise-grade Linux deployment
              </p>
              <div className={styles.heroStats}>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>Fanless</span>
                  <span className={styles.statLabel}>Silent Operation</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>-40°C to +70°C</span>
                  <span className={styles.statLabel}>Wide Temperature Range</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>6x Faster</span>
                  <span className={styles.statLabel}>Time to Production</span>
                </div>
              </div>
              <div className={styles.heroCta}>
                <Link to="/dev-center/hardware/production-ready/onlogic-factor" className={styles.ctaPrimary}>
                  Get Started
                </Link>
                <Link to="https://peridio.com/book-a-meeting" className={styles.ctaSecondary}>
                  Request a Demo
                </Link>
              </div>
            </div>
            <div className={styles.heroImage}>
              <img
                src="/img/FR201.png"
                alt="OnLogic FR201 fanless industrial PC"
                className={styles.productImage}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Hardware Specs */}
      <section className={styles.specs}>
        <div className={styles.container}>
          <Heading as="h2" className={styles.sectionTitle}>
            FR201 Technical Specifications
          </Heading>
          <div className={styles.specsTable}>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>Processor</div>
              <div className={styles.specValue}>Raspberry Pi CM4 - Broadcom BCM2711 Cortex-A72 (ARM v8)</div>
              <div className={styles.specNote}>Quad-core 64-bit ARM processor for efficient protocol handling</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>Memory</div>
              <div className={styles.specValue}>Up to 8GB LPDDR4-3200</div>
              <div className={styles.specNote}>High-bandwidth memory for data buffering and processing</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>Storage</div>
              <div className={styles.specValue}>eMMC (up to 32GB) + M.2 SATA (up to 2TB)</div>
              <div className={styles.specNote}>Dual storage options for OS and data separation</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>Networking</div>
              <div className={styles.specValue}>Dual GbE LAN + Optional WiFi 802.11ac</div>
              <div className={styles.specNote}>Redundant connectivity with wireless backup</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>I/O Expansion</div>
              <div className={styles.specValue}>USB 3.2, 2x USB 2.0, RS-232/422/485, GPIO</div>
              <div className={styles.specNote}>Industrial-grade connectivity for sensors and equipment</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>Operating Temp</div>
              <div className={styles.specValue}>-20°C to +60°C</div>
              <div className={styles.specNote}>Fanless operation in harsh industrial environments</div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className={styles.useCases}>
        <div className={styles.container}>
          <Heading as="h2" className={styles.sectionTitle}>
            Production Gateway Applications
          </Heading>
          <div className={styles.useCaseGrid}>
            <div className={styles.useCase}>
              <img
                src="/img/factory-quality-inspection.png"
                alt="Factory Data Aggregation"
                className={styles.useCaseImage}
              />
              <Heading as="h3">Factory Data Aggregation</Heading>
              <p>
                Consolidate data from PLCs, sensors, and SCADA systems. Process and filter industrial protocols before cloud transmission with built-in security.
              </p>
            </div>
            <div className={styles.useCase}>
              <img
                src="/img/environmental-inspection.png"
                alt="Remote Site Management"
                className={styles.useCaseImage}
              />
              <Heading as="h3">Remote Site Management</Heading>
              <p>
                Manage distributed industrial equipment with secure remote access tunnels. Monitor system health and perform maintenance without site visits.
              </p>
            </div>
            <div className={styles.useCase}>
              <img
                src="/img/traffic-flow-optimization.png"
                alt="Protocol Bridge Gateway"
                className={styles.useCaseImage}
              />
              <Heading as="h3">Protocol Bridge Gateway</Heading>
              <p>
                Convert between industrial protocols (Modbus, OPC-UA, CAN) and modern APIs. Enable legacy equipment integration with cloud platforms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className={styles.problemSolution}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <Heading as="h2">From Development Complexity to Production Simplicity</Heading>
            <p>Transform your gateway deployment with production-ready infrastructure</p>
          </div>

          <div className={styles.comparisonContainer}>
            <div className={styles.challengeCard}>
              <div className={styles.cardHeader}>
                <div className={styles.challengeIcon}>
                  <XMarkIcon style={{ width: '1.5rem', height: '1.5rem' }} />
                </div>
                <Heading as="h3">The Traditional Gateway Challenge</Heading>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.challengeItem}>
                  <span className={styles.challengeText}>
                    18-month custom Linux builds for production deployment
                  </span>
                </div>
                <div className={styles.challengeItem}>
                  <span className={styles.challengeText}>Manual on-site updates that don&apos;t scale across sites</span>
                </div>
                <div className={styles.challengeItem}>
                  <span className={styles.challengeText}>Complex integration of industrial protocols and security</span>
                </div>
                <div className={styles.challengeItem}>
                  <span className={styles.challengeText}>Vendor lock-in with proprietary gateway solutions</span>
                </div>
                <div className={styles.challengeItem}>
                  <span className={styles.challengeText}>No remote diagnostics when systems fail in the field</span>
                </div>
              </div>
            </div>

            <div className={styles.solutionCard}>
              <div className={styles.cardHeader}>
                <div className={styles.solutionIcon}>
                  <CheckIcon style={{ width: '1.5rem', height: '1.5rem' }} />
                </div>
                <Heading as="h3">The Avocado OS Solution</Heading>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.solutionItem}>
                  <span className={styles.solutionText}>Production-ready in weeks with pre-built industrial BSPs</span>
                </div>
                <div className={styles.solutionItem}>
                  <span className={styles.solutionText}>Atomic OTA updates with automatic rollback protection</span>
                </div>
                <div className={styles.solutionItem}>
                  <span className={styles.solutionText}>Built-in protocol support for Modbus, OPC-UA, and CAN</span>
                </div>
                <div className={styles.solutionItem}>
                  <span className={styles.solutionText}>Cross-platform deployment - same software, any hardware</span>
                </div>
                <div className={styles.solutionItem}>
                  <span className={styles.solutionText}>Enterprise remote diagnostics with secure tunnel access</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className={styles.features}>
        <div className={styles.container}>
          <Heading as="h2" className={styles.sectionTitle}>
            Why Choose Peridio for FR201 Production Deployment
          </Heading>
          <div className={styles.featureGrid}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <ServerStackIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">Production-Ready from Day One</Heading>
              <p>
                Pre-hardened Linux OS with read-only root filesystem, secure boot, and atomic updates. No prototype-to-production gap.
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <BoltIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">Atomic Update Architecture</Heading>
              <p>
                Zero-downtime updates with automatic rollback on failure. System integrity guaranteed with cryptographic verification and watchdog protection.
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <GlobeAltIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">Industrial-Grade Fleet Management</Heading>
              <p>
                Deploy and manage thousands of gateways across industrial sites. Site-specific configurations with centralized policy enforcement.
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <WrenchScrewdriverIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">Cross-Platform Portability</Heading>
              <p>
                Develop on FR201, deploy across industrial hardware. Unified toolchain prevents vendor lock-in and reduces engineering overhead.
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <ShieldCheckIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">Enterprise Security</Heading>
              <p>
                TPM 2.0 integration, full-disk encryption, and certificate-based authentication. Zero-trust architecture built for industrial environments.
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <FireIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">Hardware-Optimized Performance</Heading>
              <p>
                Thermal management optimizations for fanless operation. Automatic resource allocation and workload distribution for 24/7 uptime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <Heading as="h2">Ready to Deploy Production-Ready Gateways?</Heading>
            <p>
              Transform your OnLogic FR201 systems into a managed gateway fleet with atomic updates,
              remote diagnostics, and enterprise support.
            </p>
            <div className={styles.ctaButtons}>
              <Link to="/dev-center/hardware/production-ready/onlogic-factor" className={styles.ctaPrimary}>
                Get Started
              </Link>
              <Link to="https://peridio.com/book-a-meeting" className={styles.ctaSecondary}>
                Request a Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className={styles.resources}>
        <div className={styles.container}>
          <Heading as="h2" className={styles.sectionTitle}>
            Documentation & Resources
          </Heading>
          <div className={styles.resourceGrid}>
            <Link to="/integration/linux/build-tools/yocto" className={styles.resourceCard}>
              <Heading as="h3">Industrial Gateway Guide</Heading>
              <p>Protocol bridging and data aggregation for manufacturing environments</p>
            </Link>
            <Link to="/platform/reference/overview" className={styles.resourceCard}>
              <Heading as="h3">Atomic Update Architecture</Heading>
              <p>Zero-downtime update mechanisms with automatic rollback protection</p>
            </Link>
            <Link to="/platform/reference/overview" className={styles.resourceCard}>
              <Heading as="h3">Fleet Operations Manual</Heading>
              <p>Multi-site gateway management with centralized monitoring</p>
            </Link>
            <Link to="/admin-api" className={styles.resourceCard}>
              <Heading as="h3">Remote Access Security</Heading>
              <p>Secure tunneling and certificate management for industrial networks</p>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}