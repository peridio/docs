import React from 'react'
import Layout from '@theme/Layout'
import Head from '@docusaurus/Head'
import Link from '@docusaurus/Link'
import Heading from '@theme/Heading'
import styles from './jetson-orin-nano.module.css'
import {
  HiOutlineRocketLaunch as RocketLaunchIcon,
  HiOutlineLockClosed as LockClosedIcon,
  HiOutlineWifi as WifiIcon,
  HiOutlineWrenchScrewdriver as WrenchScrewdriverIcon,
  HiOutlineGlobeAlt as GlobeAltIcon,
  HiOutlineShieldCheck as ShieldCheckIcon,
  HiOutlineXMark as XMarkIcon,
  HiOutlineCheck as CheckIcon,
} from 'react-icons/hi2'

export default function JetsonOrinNanoSolution() {
  return (
    <Layout>
      <Head>
        <title>NVIDIA Jetson Orin Nano Production Linux | Day 1 Ready | Peridio</title>
        <meta
          name="description"
          content="Production-ready NVIDIA Jetson Orin Nano deployment from day 1 with Peridio Fleet + Avocado OS. Enterprise Linux, secure OTA, and fleet management for industrial AI."
        />
        <meta
          name="keywords"
          content="nvidia jetson orin nano, device management, ota updates, yocto, embedded linux, industrial ai, robotics, fleet management"
        />
        <meta
          property="og:title"
          content="NVIDIA Jetson Orin Nano Production Linux | Day 1 Ready | Peridio"
        />
        <meta
          property="og:description"
          content="Production-ready NVIDIA Jetson Orin Nano deployment from day 1 with Peridio Fleet + Avocado OS. Enterprise Linux and secure fleet management."
        />
        <meta property="og:image" content="/img/nvidia-jetson-orin.jpg" />
        <meta property="og:type" content="product" />
        <link rel="canonical" href="https://docs.peridio.com/solutions/nvidia/jetson-orin-nano" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Peridio + Avocado OS for NVIDIA Jetson Orin Nano',
            description:
              'Day 1 production-ready Linux and device management for NVIDIA Jetson Orin Nano with enterprise-grade embedded OS',
            manufacturer: {
              '@type': 'Organization',
              name: 'Peridio',
            },
            category: 'Device Management Software',
            offers: {
              '@type': 'Offer',
              availability: 'https://schema.org/InStock',
            },
            applicationCategory: 'Industrial AI, Robotics, Edge Computing',
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
                Skip 18 Months of <span className={styles.highlight}>Jetson Development</span>
              </Heading>
              <p className={styles.heroSubtitle}>
                Deploy enterprise-grade NVIDIA Jetson Orin Nano fleets from day 1 with deterministic
                Linux, secure OTA, and managed operations
              </p>
              <div className={styles.heroStats}>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>Day 1</span>
                  <span className={styles.statLabel}>Production Ready</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>10+</span>
                  <span className={styles.statLabel}>Year Support</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>67</span>
                  <span className={styles.statLabel}>TOPS AI Performance</span>
                </div>
              </div>
              <div className={styles.heroCta}>
                <Link
                  to="https://docs.avocadolinux.org/supported-hardware/jetson-orin-nano"
                  className={styles.ctaPrimary}
                  target="_blank"
                >
                  Get Started
                </Link>
                <Link to="/platform/reference/overview" className={styles.ctaSecondary}>
                  Datasheet
                </Link>
              </div>
            </div>
            <div className={styles.heroImage}>
              <img
                src="/img/jetson-nano.png"
                alt="NVIDIA Jetson Orin Nano development kit"
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
            Hardware Specifications
          </Heading>
          <div className={styles.specsTable}>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>AI Performance</div>
              <div className={styles.specValue}>67 TOPS (8GB) / 34 TOPS (4GB)</div>
              <div className={styles.specNote}>Up to 142× performance of Jetson Nano</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>GPU</div>
              <div className={styles.specValue}>1024/512-core NVIDIA Ampere GPU</div>
              <div className={styles.specNote}>CUDA-X and TensorRT for real-time inference</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>CPU</div>
              <div className={styles.specValue}>6-core Arm Cortex-A78AE @ 1.7 GHz</div>
              <div className={styles.specNote}>Armv8.2 64-bit with safety features</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>Memory</div>
              <div className={styles.specValue}>8GB/4GB LPDDR5</div>
              <div className={styles.specNote}>102/51 GB/s bandwidth for multi-sensor vision</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>Power</div>
              <div className={styles.specValue}>7–25W</div>
              <div className={styles.specNote}>Scalable to battery-powered devices</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>Operating Temperature</div>
              <div className={styles.specValue}>-40°C to +70°C</div>
              <div className={styles.specNote}>Rugged industrial environments</div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className={styles.useCases}>
        <div className={styles.container}>
          <Heading as="h2" className={styles.sectionTitle}>
            Production Use Cases
          </Heading>
          <div className={styles.useCaseGrid}>
            <div className={styles.useCase}>
              <img
                src="/img/pedestrian-monitoring.png"
                alt="Industrial Smart Cameras"
                className={styles.useCaseImage}
              />
              <Heading as="h3">Industrial Smart Cameras</Heading>
              <p>
                Multi-camera CSI input for AI tasks like object detection and quality inspection.
                OTA supports model updates in production.
              </p>
            </div>
            <div className={styles.useCase}>
              <img
                src="/img/traffic-flow-optimization.png"
                alt="Autonomous Mobile Robots"
                className={styles.useCaseImage}
              />
              <Heading as="h3">Autonomous Mobile Robots</Heading>
              <p>
                Real-time sensor fusion and navigation processing. Avocado OS supports ROS2 and
                containers with scalable fleet rollouts.
              </p>
            </div>
            <div className={styles.useCase}>
              <img
                src="/img/workplace-safety.png"
                alt="Edge AI Gateways"
                className={styles.useCaseImage}
              />
              <Heading as="h3">Edge AI Gateways</Heading>
              <p>
                Run generative AI or LLMs locally with NVMe and optional 10-GbE. Managed Linux keeps
                them secure in harsh environments.
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
            <p>Transform your Jetson development workflow with enterprise-grade infrastructure</p>
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
                    Developer kits aren&apos;t production-ready
                  </span>
                </div>
                <div className={styles.challengeItem}>
                  <span className={styles.challengeText}>Custom Yocto builds take 6-18 months</span>
                </div>
                <div className={styles.challengeItem}>
                  <span className={styles.challengeText}>
                    OTA infrastructure requires dedicated teams
                  </span>
                </div>
                <div className={styles.challengeItem}>
                  <span className={styles.challengeText}>Security compliance adds complexity</span>
                </div>
                <div className={styles.challengeItem}>
                  <span className={styles.challengeText}>Fleet management built from scratch</span>
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
                  <span className={styles.solutionText}>Production-ready OS in minutes</span>
                </div>
                <div className={styles.solutionItem}>
                  <span className={styles.solutionText}>Pre-integrated Jetson BSPs</span>
                </div>
                <div className={styles.solutionItem}>
                  <span className={styles.solutionText}>Enterprise OTA orchestration</span>
                </div>
                <div className={styles.solutionItem}>
                  <span className={styles.solutionText}>Built-in security compliance</span>
                </div>
                <div className={styles.solutionItem}>
                  <span className={styles.solutionText}>Managed fleet operations</span>
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
            Why Choose Peridio for Jetson Development
          </Heading>
          <div className={styles.featureGrid}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <RocketLaunchIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">Rapid Deployment</Heading>
              <p>
                Boot deterministic Linux on Jetson in minutes. Hardware-in-the-loop tools reduce
                iteration from weeks to hours.
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <LockClosedIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">Production Security</Heading>
              <p>
                Secure boot, dm-verity, and LUKS encryption across all architectures. Reproducible
                images simplify certification.
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <WifiIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">Fleet Management</Heading>
              <p>
                Register and manage devices in Peridio Fleet. Phased releases, cohort targeting,
                SBOM, and CVE patching.
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <WrenchScrewdriverIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">Composable Architecture</Heading>
              <p>
                Build systems using modular layers and standard secure components. Avoid the
                fragility of DIY Yocto.
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <GlobeAltIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">Cross-Platform</Heading>
              <p>
                Reuse Avocado OS layers across ARM/NPU SoCs (Qualcomm Rubik Pi 3, MediaTek Genio,
                NXP i.MX8MP).
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <ShieldCheckIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">Long-term Support</Heading>
              <p>
                10+ years of kernel/security maintenance. Combined with Jetson&apos;s industrial
                lifecycle ensures device longevity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <Heading as="h2">Ready to Accelerate Your Jetson Development?</Heading>
            <p>
              Transform your NVIDIA Jetson Orin Nano from developer kit to secure, deployable
              industrial AI platform.
            </p>
            <div className={styles.ctaButtons}>
              <Link
                to="https://docs.avocadolinux.org/supported-hardware/jetson-orin-nano"
                className={styles.ctaPrimary}
                target="_blank"
              >
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
              <Heading as="h3">Yocto Integration Guide</Heading>
              <p>Step-by-step Yocto build configuration for Jetson Orin Nano</p>
            </Link>
            <Link to="/platform/reference/overview" className={styles.resourceCard}>
              <Heading as="h3">Device Security</Heading>
              <p>Device certificates, secure boot, and fleet security management</p>
            </Link>
            <Link to="/platform/reference/overview" className={styles.resourceCard}>
              <Heading as="h3">Platform Overview</Heading>
              <p>Complete Peridio platform architecture and capabilities</p>
            </Link>
            <Link to="/admin-api" className={styles.resourceCard}>
              <Heading as="h3">API Documentation</Heading>
              <p>REST API and GraphQL integration for fleet management</p>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}
