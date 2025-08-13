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
        <title>OnLogic FR201 Fanless Industrial PC | Rugged Edge Computing | Peridio</title>
        <meta
          name="description"
          content="Deploy OnLogic FR201 fanless industrial PCs with Intel Core processors, wide temperature range, and enterprise fleet management. Production-ready edge computing."
        />
        <meta
          name="keywords"
          content="onlogic fr201, fanless pc, industrial computer, edge computing, intel core, rugged, fleet management"
        />
        <meta
          property="og:title"
          content="OnLogic FR201 Fanless Industrial PC | Rugged Edge Computing | Peridio"
        />
        <meta
          property="og:description"
          content="Deploy OnLogic FR201 fanless industrial PCs with enterprise fleet management and secure OTA updates."
        />
        <meta property="og:image" content="/img/onlogic-fr201.jpg" />
        <meta property="og:type" content="product" />
        <link rel="canonical" href="https://docs.peridio.com/solutions/onlogic" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Peridio + Avocado OS for OnLogic FR201',
            description:
              'Production-ready fanless industrial PC with Intel Core processors and enterprise fleet management',
            manufacturer: {
              '@type': 'Organization',
              name: 'Peridio',
            },
            category: 'Industrial PC',
            offers: {
              '@type': 'Offer',
              availability: 'https://schema.org/InStock',
            },
            applicationCategory: 'Edge Computing, Industrial Gateway, Factory Automation',
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
                Rugged Edge Computing with{' '}
                <span className={styles.highlight}>OnLogic FR201</span>
              </Heading>
              <p className={styles.heroSubtitle}>
                Fanless industrial PC with Intel Core i7/i5/i3, dual LAN, and -40°C to +70°C
                operation for harsh edge environments
              </p>
              <div className={styles.heroStats}>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>Fanless</span>
                  <span className={styles.statLabel}>Silent Operation</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>-40°C</span>
                  <span className={styles.statLabel}>Wide Temperature</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>24/7</span>
                  <span className={styles.statLabel}>Continuous Operation</span>
                </div>
              </div>
              <div className={styles.heroCta}>
                <Link to="/dev-center/hardware/production-ready/onlogic-factor" className={styles.ctaPrimary}>
                  Get Started
                </Link>
                <Link to="/" className={styles.ctaSecondary}>
                  Datasheet
                </Link>
              </div>
            </div>
            <div className={styles.heroImage}>
              <img
                src="/img/onlogic-fr201.jpg"
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
              <div className={styles.specValue}>Intel Core i7/i5/i3 (10th Gen)</div>
              <div className={styles.specNote}>Up to 6 cores, 12 threads @ 4.7GHz</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>Memory</div>
              <div className={styles.specValue}>Up to 64GB DDR4</div>
              <div className={styles.specNote}>Dual-channel 2666MHz SO-DIMM</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>Storage</div>
              <div className={styles.specValue}>M.2 NVMe + 2.5&quot; SATA</div>
              <div className={styles.specNote}>Hardware RAID support available</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>Networking</div>
              <div className={styles.specValue}>Dual Intel GbE LAN</div>
              <div className={styles.specNote}>Wake-on-LAN, PXE boot support</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>I/O Expansion</div>
              <div className={styles.specValue}>4x USB 3.0, 2x COM, GPIO</div>
              <div className={styles.specNote}>PCIe x16 slot for expansion cards</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>Operating Temp</div>
              <div className={styles.specValue}>-40°C to +70°C</div>
              <div className={styles.specNote}>Fanless cooling with heat pipe technology</div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className={styles.useCases}>
        <div className={styles.container}>
          <Heading as="h2" className={styles.sectionTitle}>
            Industrial Use Cases
          </Heading>
          <div className={styles.useCaseGrid}>
            <div className={styles.useCase}>
              <img
                src="/img/factory-quality-inspection.png"
                alt="Factory Edge Gateway"
                className={styles.useCaseImage}
              />
              <Heading as="h3">Factory Edge Gateway</Heading>
              <p>
                Consolidate data from PLCs, sensors, and SCADA systems. Process and filter data at
                the edge before cloud transmission.
              </p>
            </div>
            <div className={styles.useCase}>
              <img
                src="/img/environmental-inspection.png"
                alt="Machine Learning Inference"
                className={styles.useCaseImage}
              />
              <Heading as="h3">ML Inference Server</Heading>
              <p>
                Run containerized AI workloads with Intel OpenVINO optimization. Local inference for
                predictive maintenance and anomaly detection.
              </p>
            </div>
            <div className={styles.useCase}>
              <img
                src="/img/traffic-flow-optimization.png"
                alt="Transportation Systems"
                className={styles.useCaseImage}
              />
              <Heading as="h3">Transportation Hub</Heading>
              <p>
                Vehicle tracking, traffic management, and toll systems. Rugged design withstands
                vibration and temperature extremes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className={styles.problemSolution}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <Heading as="h2">From Challenge to Solution</Heading>
            <p>Transform your edge computing deployment with enterprise-grade infrastructure</p>
          </div>

          <div className={styles.comparisonContainer}>
            <div className={styles.challengeCard}>
              <div className={styles.cardHeader}>
                <div className={styles.challengeIcon}>
                  <XMarkIcon style={{ width: '1.5rem', height: '1.5rem' }} />
                </div>
                <Heading as="h3">The Challenge</Heading>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.challengeItem}>
                  <span className={styles.challengeText}>
                    Windows IoT complexity and licensing
                  </span>
                </div>
                <div className={styles.challengeItem}>
                  <span className={styles.challengeText}>Manual on-site updates required</span>
                </div>
                <div className={styles.challengeItem}>
                  <span className={styles.challengeText}>No remote diagnostics capability</span>
                </div>
                <div className={styles.challengeItem}>
                  <span className={styles.challengeText}>Difficult multi-site management</span>
                </div>
                <div className={styles.challengeItem}>
                  <span className={styles.challengeText}>Limited production visibility</span>
                </div>
              </div>
            </div>

            <div className={styles.solutionCard}>
              <div className={styles.cardHeader}>
                <div className={styles.solutionIcon}>
                  <CheckIcon style={{ width: '1.5rem', height: '1.5rem' }} />
                </div>
                <Heading as="h3">The Solution</Heading>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.solutionItem}>
                  <span className={styles.solutionText}>Open-source Linux platform</span>
                </div>
                <div className={styles.solutionItem}>
                  <span className={styles.solutionText}>Remote OTA updates and rollback</span>
                </div>
                <div className={styles.solutionItem}>
                  <span className={styles.solutionText}>Built-in remote diagnostics</span>
                </div>
                <div className={styles.solutionItem}>
                  <span className={styles.solutionText}>Centralized fleet management</span>
                </div>
                <div className={styles.solutionItem}>
                  <span className={styles.solutionText}>Real-time monitoring dashboard</span>
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
            Why Choose Peridio for FR201 Deployment
          </Heading>
          <div className={styles.featureGrid}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <ServerStackIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">Edge-Optimized OS</Heading>
              <p>
                Lightweight Avocado OS with containers, K3s orchestration, and edge workload
                optimization. Minimal footprint maximizes application resources.
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <FireIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">Fanless Reliability</Heading>
              <p>
                Thermal management optimizations for fanless operation. Automatic throttling and
                workload distribution for 24/7 uptime.
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <ShieldCheckIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">Industrial Security</Heading>
              <p>
                TPM 2.0 integration, secure boot, and full-disk encryption. Zero-trust architecture
                with certificate-based authentication.
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <GlobeAltIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">Multi-Site Management</Heading>
              <p>
                Deploy and manage thousands of edge nodes across locations. Site-specific
                configurations with global policy enforcement.
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <WrenchScrewdriverIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">Hardware Integration</Heading>
              <p>
                Pre-configured drivers for industrial protocols (Modbus, OPC-UA). GPIO control and
                serial communication libraries included.
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <BoltIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">Resilient Updates</Heading>
              <p>
                Delta updates minimize bandwidth usage. Automatic rollback on failure with watchdog
                timer integration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <Heading as="h2">Ready to Deploy Rugged Edge Computing?</Heading>
            <p>
              Transform your OnLogic FR201 systems into a managed fleet with secure OTA updates,
              remote diagnostics, and enterprise support.
            </p>
            <div className={styles.ctaButtons}>
              <Link to="/dev-center/hardware/production-ready/onlogic-factor" className={styles.ctaPrimary}>
                Get Started
              </Link>
              <Link to="https://avocadolinux.org" className={styles.ctaSecondary} target="_blank">
                Visit Avocado Linux
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
              <Heading as="h3">Edge Computing Guide</Heading>
              <p>Container orchestration and workload management for industrial edge</p>
            </Link>
            <Link to="/platform/reference/overview" className={styles.resourceCard}>
              <Heading as="h3">Thermal Management</Heading>
              <p>Fanless operation optimization and thermal monitoring</p>
            </Link>
            <Link to="/platform/reference/overview" className={styles.resourceCard}>
              <Heading as="h3">Fleet Operations</Heading>
              <p>Multi-site edge node management with centralized control</p>
            </Link>
            <Link to="/admin-api" className={styles.resourceCard}>
              <Heading as="h3">Edge API Integration</Heading>
              <p>REST API for edge application deployment and monitoring</p>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}