import React from 'react'
import Layout from '@theme/Layout'
import Head from '@docusaurus/Head'
import Link from '@docusaurus/Link'
import Heading from '@theme/Heading'
import styles from './imx8mp.module.css'
import {
  HiOutlineBuildingOffice2 as BuildingOfficeIcon,
  HiOutlineCamera as CameraIcon,
  HiOutlineCpuChip as CpuChipIcon,
  HiOutlineBolt as BoltIcon,
  HiOutlineGlobeAlt as GlobeAltIcon,
  HiOutlineWrenchScrewdriver as WrenchScrewdriverIcon,
  HiOutlineXMark as XMarkIcon,
  HiOutlineCheck as CheckIcon,
} from 'react-icons/hi2'

export default function IMX8MPSolution() {
  return (
    <Layout>
      <Head>
        <title>NXP i.MX 8M Plus Industrial Vision | Edge AI Camera Systems | Peridio</title>
        <meta
          name="description"
          content="Deploy NXP i.MX 8M Plus for industrial vision and edge AI. 2.3 TOPS NPU, dual cameras, real-time processing. Production-ready with Peridio Fleet + Avocado OS."
        />
        <meta
          name="keywords"
          content="nxp imx8mp, i.mx 8m plus, industrial vision, edge ai camera, npu, dual camera, real-time processing, device management"
        />
        <meta
          property="og:title"
          content="NXP i.MX 8M Plus Industrial Vision | Edge AI Camera Systems | Peridio"
        />
        <meta
          property="og:description"
          content="Deploy NXP i.MX 8M Plus for industrial vision and edge AI. 2.3 TOPS NPU, dual cameras, real-time processing with Peridio Fleet."
        />
        <meta property="og:image" content="/img/nxp-imx8mp.jpg" />
        <meta property="og:type" content="product" />
        <link rel="canonical" href="https://docs.peridio.com/solutions/nxp/imx8mp" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Peridio + Avocado OS for NXP i.MX 8M Plus',
            description:
              'Industrial vision and edge AI platform with NPU acceleration and dual camera support',
            manufacturer: {
              '@type': 'Organization',
              name: 'Peridio',
            },
            category: 'Industrial Vision Platform',
            offers: {
              '@type': 'Offer',
              availability: 'https://schema.org/InStock',
            },
            applicationCategory: 'Industrial Vision, Smart Cameras, Edge AI',
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
                Unlock <span className={styles.highlight}>Industrial Vision & Edge AI</span> with
                NXP i.MX 8M Plus
              </Heading>
              <p className={styles.heroSubtitle}>
                Production-ready industrial IoT and vision systems with 2.3 TOPS NPU, dual cameras,
                and real-time processing
              </p>
              <div className={styles.heroStats}>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>2.3</span>
                  <span className={styles.statLabel}>TOPS NPU Performance</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>Dual</span>
                  <span className={styles.statLabel}>MIPI CSI Cameras</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>-40°C</span>
                  <span className={styles.statLabel}>Industrial Temperature</span>
                </div>
              </div>
              <div className={styles.heroCta}>
                <Link
                  to="/dev-center/hardware/nxp/imx8mp"
                  className={styles.ctaPrimary}
                >
                  Get Started
                </Link>
                <a href="https://peridio.com" className={styles.ctaSecondary} target="_blank" rel="noopener noreferrer">
                  Datasheet
                </a>
              </div>
            </div>
            <div className={styles.heroImage}>
              <img
                src="/img/nxp_iMX8M_Plus.png"
                alt="NXP i.MX 8M Plus development board"
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
            i.MX 8M Plus Technical Highlights
          </Heading>
          <div className={styles.specsTable}>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>NPU</div>
              <div className={styles.specValue}>2.3 TOPS AI Acceleration</div>
              <div className={styles.specNote}>On-device ML without cloud dependency</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>CPU</div>
              <div className={styles.specValue}>Quad Cortex-A53 @ 2.0 GHz</div>
              <div className={styles.specNote}>Application processors for Linux workloads</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>Real-Time Core</div>
              <div className={styles.specValue}>Cortex-M7 @ 800 MHz</div>
              <div className={styles.specNote}>Dedicated real-time control processing</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>Camera Support</div>
              <div className={styles.specValue}>Dual MIPI CSI @ 12MP/375MP/s</div>
              <div className={styles.specNote}>Stereo vision and multi-camera processing</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>Networking</div>
              <div className={styles.specValue}>Dual GbE (one with TSN)</div>
              <div className={styles.specNote}>Time-sensitive industrial networking</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>Operating Temp</div>
              <div className={styles.specValue}>-40°C to +85°C</div>
              <div className={styles.specNote}>Industrial and harsh environments</div>
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
                alt="Smart Industrial Camera"
                className={styles.useCaseImage}
              />
              <Heading as="h3">Smart Industrial Camera</Heading>
              <p>
                Dual-camera stereo vision with real-time inference for defect detection and
                classification. NPU accelerates ResNet/YOLO models at the edge.
              </p>
            </div>
            <div className={styles.useCase}>
              <img
                src="/img/environmental-inspection.png"
                alt="Autonomous Inspection System"
                className={styles.useCaseImage}
              />
              <Heading as="h3">Autonomous Inspection System</Heading>
              <p>
                Low-latency TSN-based Gigabit connection enables synchronized multi-sensor
                deployments with persistent vision monitoring.
              </p>
            </div>
            <div className={styles.useCase}>
              <img
                src="/img/workplace-safety.png"
                alt="Voice-Controlled Gateway"
                className={styles.useCaseImage}
              />
              <Heading as="h3">Voice-Controlled Industrial Gateway</Heading>
              <p>
                Audio streaming and voice recognition via HiFi 4 DSP with wake-word detection
                handled on-chip for operator assistance.
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
            <p>
              Transform your i.MX 8M Plus development workflow with enterprise-grade infrastructure
            </p>
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
                    Complex multi-core integration (A53 + M7)
                  </span>
                </div>
                <div className={styles.challengeItem}>
                  <span className={styles.challengeText}>
                    NPU optimization for vision workloads
                  </span>
                </div>
                <div className={styles.challengeItem}>
                  <span className={styles.challengeText}>Dual camera synchronization</span>
                </div>
                <div className={styles.challengeItem}>
                  <span className={styles.challengeText}>Real-time processing requirements</span>
                </div>
                <div className={styles.challengeItem}>
                  <span className={styles.challengeText}>Industrial-grade reliability needs</span>
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
                  <span className={styles.solutionText}>Pre-integrated multi-core support</span>
                </div>
                <div className={styles.solutionItem}>
                  <span className={styles.solutionText}>Optimized NPU drivers and ML runtime</span>
                </div>
                <div className={styles.solutionItem}>
                  <span className={styles.solutionText}>Synchronized camera pipeline</span>
                </div>
                <div className={styles.solutionItem}>
                  <span className={styles.solutionText}>Deterministic real-time performance</span>
                </div>
                <div className={styles.solutionItem}>
                  <span className={styles.solutionText}>
                    Industrial-grade OS and fleet management
                  </span>
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
            Why Choose Peridio for i.MX 8M Plus Development
          </Heading>
          <div className={styles.featureGrid}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <BuildingOfficeIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">Industrial-Grade OS</Heading>
              <p>
                Avocado OS provides deterministic builds optimized for industrial applications with
                secure boot and verified boot capabilities.
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <CameraIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">Dual Camera Vision</Heading>
              <p>
                Supports dual MIPI CSI cameras at up to 12MP/375MP/s for stereo vision, multi-angle
                capture, or simultaneous RGB+IR processing.
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <CpuChipIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">NPU AI Acceleration</Heading>
              <p>
                2.3 TOPS of on-device AI acceleration enables real-time vision and ML workloads
                without relying on cloud compute.
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <BoltIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">Real-Time Processing</Heading>
              <p>
                Cortex-M7 real-time core at 800 MHz handles latency-sensitive tasks like motor
                control and sensor polling.
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <GlobeAltIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">TSN Networking</Heading>
              <p>
                Time-sensitive networking with dual Gigabit Ethernet supports deterministic control
                and multi-device synchronization.
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <WrenchScrewdriverIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">Long-Term Support</Heading>
              <p>
                10-15 year availability with enterprise maintenance ensures supply stability for
                long-lived industrial products.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Productization Benefits */}
      <section className={styles.benefits}>
        <div className={styles.container}>
          <Heading as="h2" className={styles.sectionTitle}>
            Productization Benefits with Peridio + Avocado OS
          </Heading>
          <div className={styles.benefitGrid}>
            <div className={styles.benefit}>
              <Heading as="h3">Embedded Linux in Minutes</Heading>
              <p>
                Yocto-based, open-source Linux distribution tailored for i.MX 8M Plus with
                deterministic builds and fast reproducibility.
              </p>
            </div>
            <div className={styles.benefit}>
              <Heading as="h3">OTA & Fleet Management Ready</Heading>
              <p>
                Peridio Fleet provides device operations, secure OTA, reporting, diagnostics and
                rollback control for camera fleet deployments.
              </p>
            </div>
            <div className={styles.benefit}>
              <Heading as="h3">Security & Compliance</Heading>
              <p>
                Secure boot, dm-verity disk integrity, and cryptographic updates built into Avocado
                with Peridio key management.
              </p>
            </div>
            <div className={styles.benefit}>
              <Heading as="h3">Cross-Platform Synergy</Heading>
              <p>
                Unified build and release infrastructure across multiple SoCs simplifies product
                lines and consolidates DevOps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <Heading as="h2">Ready to Accelerate Industrial Vision Development?</Heading>
            <p>
              Transform your NXP i.MX 8M Plus into a secure, deployable industrial vision platform
              ready for harsh environments.
            </p>
            <div className={styles.ctaButtons}>
              <Link to="/dev-center/hardware/nxp/imx8mp" className={styles.ctaPrimary}>
                Get Started
              </Link>
              <Link
                to="https://docs.avocadolinux.org/supported-hardware/imx-8m-plus"
                className={styles.ctaSecondary}
                target="_blank"
              >
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
              <Heading as="h3">Industrial Yocto Configuration</Heading>
              <p>
                Multi-core optimization and NPU integration for i.MX 8M Plus industrial applications
              </p>
            </Link>
            <Link to="/platform/reference/overview" className={styles.resourceCard}>
              <Heading as="h3">Device Security</Heading>
              <p>Industrial security with device certificates and fleet management</p>
            </Link>
            <Link to="/platform/reference/overview" className={styles.resourceCard}>
              <Heading as="h3">Fleet Management</Heading>
              <p>Industrial device operations with remote diagnostics and secure OTA updates</p>
            </Link>
            <Link to="/admin-api" className={styles.resourceCard}>
              <Heading as="h3">Industrial Integration APIs</Heading>
              <p>REST API and GraphQL for industrial automation and camera system integration</p>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}
