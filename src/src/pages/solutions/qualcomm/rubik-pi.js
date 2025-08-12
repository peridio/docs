import React from 'react'
import Layout from '@theme/Layout'
import Head from '@docusaurus/Head'
import Link from '@docusaurus/Link'
import Heading from '@theme/Heading'
import styles from './rubik-pi.module.css'
import {
  HiCommandLine as CommandLineIcon,
  HiOutlineRocketLaunch as RocketLaunchIcon,
  HiOutlineLockClosed as LockClosedIcon,
  HiOutlineWifi as WifiIcon,
  HiOutlineGlobeAlt as GlobeAltIcon,
  HiOutlineShieldCheck as ShieldCheckIcon,
  HiOutlineXMark as XMarkIcon,
  HiOutlineCheck as CheckIcon,
} from 'react-icons/hi2'

export default function RubikPiSolution() {
  return (
    <Layout>
      <Head>
        <title>Qualcomm Rubik Pi Edge AI Development | Production-Ready Robotics | Peridio</title>
        <meta
          name="description"
          content="Deploy Qualcomm Rubik Pi (RB3 Gen 2) in production 3x faster with Peridio Fleet + Avocado OS. 15.5 TOPS AI performance, secure OTA updates, enterprise robotics support."
        />
        <meta
          name="keywords"
          content="qualcomm rubik pi, rb3 gen 2, edge ai, robotics, qcs6490, device management, ota updates, yocto, embedded linux"
        />
        <meta
          property="og:title"
          content="Qualcomm Rubik Pi Edge AI Development | Production-Ready Robotics | Peridio"
        />
        <meta
          property="og:description"
          content="Deploy Qualcomm Rubik Pi in production 3x faster with Peridio Fleet + Avocado OS. 15.5 TOPS AI performance, secure OTA updates, enterprise support."
        />
        <meta property="og:image" content="/img/rubik-pi.jpeg" />
        <meta property="og:type" content="product" />
        <link rel="canonical" href="https://docs.peridio.com/solutions/qualcomm/rubik-pi" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Peridio + Avocado OS for Qualcomm Rubik Pi',
            description:
              'Production-ready edge AI and robotics platform with device management and OTA updates for Qualcomm RB3 Gen 2',
            manufacturer: {
              '@type': 'Organization',
              name: 'Peridio',
            },
            category: 'Edge AI Development Platform',
            offers: {
              '@type': 'Offer',
              availability: 'https://schema.org/InStock',
            },
            applicationCategory: 'Robotics, Edge AI, IoT',
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
                Accelerate <span className={styles.highlight}>Edge AI & Robotics</span> with
                Qualcomm Rubik Pi
              </Heading>
              <p className={styles.heroSubtitle}>
                Production-ready Qualcomm RB3 Gen 2 deployment in 3-6 months with Peridio Fleet +
                Avocado OS
              </p>
              <div className={styles.heroStats}>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>15.5</span>
                  <span className={styles.statLabel}>TOPS AI Performance</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>3-6</span>
                  <span className={styles.statLabel}>Months to Production</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>5G</span>
                  <span className={styles.statLabel}>Ready Connectivity</span>
                </div>
              </div>
              <div className={styles.heroCta}>
                <Link to="/evk" className={styles.ctaPrimary}>
                  Get Started
                </Link>
                <Link to="/platform/reference/overview" className={styles.ctaSecondary}>
                  Datasheet
                </Link>
              </div>
            </div>
            <div className={styles.heroImage}>
              <img
                src="/img/Qualcomm-Rubikpi.png"
                alt="Qualcomm Rubik Pi RB3 Gen 2 development kit"
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
            Rubik Pi Hardware Highlights
          </Heading>
          <div className={styles.specsTable}>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>AI Performance</div>
              <div className={styles.specValue}>15.5 TOPS (INT8)</div>
              <div className={styles.specNote}>Hexagon NPU + GPU acceleration</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>SoC</div>
              <div className={styles.specValue}>Qualcomm QCS6490</div>
              <div className={styles.specNote}>Octa-core Kryo 670 with AI engine</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>CPU</div>
              <div className={styles.specValue}>8-core ARM (2×A78 @ 2.7GHz, 6×A55)</div>
              <div className={styles.specNote}>High-performance + efficiency cores</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>Memory</div>
              <div className={styles.specValue}>8GB LPDDR5</div>
              <div className={styles.specNote}>High-bandwidth for AI model processing</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>Connectivity</div>
              <div className={styles.specValue}>Wi-Fi 6E, Bluetooth 5.2, 5G ready</div>
              <div className={styles.specNote}>Advanced wireless for IoT and edge</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>Camera Support</div>
              <div className={styles.specValue}>Dual 13MP ISPs, up to 4K@60fps</div>
              <div className={styles.specNote}>Multi-camera vision for robotics</div>
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
                src="/img/factory-quality-inspection.png"
                alt="Autonomous Mobile Robots"
                className={styles.useCaseImage}
              />
              <Heading as="h3">Autonomous Mobile Robots</Heading>
              <p>
                Real-time SLAM, obstacle avoidance, and path planning with multi-camera fusion. OTA
                enables algorithm updates and new capabilities.
              </p>
            </div>
            <div className={styles.useCase}>
              <img
                src="/img/environmental-inspection.png"
                alt="Smart Security Cameras"
                className={styles.useCaseImage}
              />
              <Heading as="h3">Smart Security Cameras</Heading>
              <p>
                AI-powered video analytics with edge processing for privacy-sensitive environments.
                Fleet management simplifies large-scale deployments.
              </p>
            </div>
            <div className={styles.useCase}>
              <img
                src="/img/see-and-spray.png"
                alt="Industrial IoT Gateways"
                className={styles.useCaseImage}
              />
              <Heading as="h3">Industrial IoT Gateways</Heading>
              <p>
                Edge inference for predictive maintenance and quality control. 5G connectivity
                enables real-time coordination with cloud systems.
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
            <p>Transform your Rubik Pi development workflow with enterprise-grade infrastructure</p>
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
                    Complex Qualcomm AI Engine integration
                  </span>
                </div>
                <div className={styles.challengeItem}>
                  <span className={styles.challengeText}>12-18 month Yocto development cycles</span>
                </div>
                <div className={styles.challengeItem}>
                  <span className={styles.challengeText}>
                    Custom fleet management infrastructure
                  </span>
                </div>
                <div className={styles.challengeItem}>
                  <span className={styles.challengeText}>Security compliance overhead</span>
                </div>
                <div className={styles.challengeItem}>
                  <span className={styles.challengeText}>Fragmented toolchain across projects</span>
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
                  <span className={styles.solutionText}>Pre-integrated Hexagon NPU support</span>
                </div>
                <div className={styles.solutionItem}>
                  <span className={styles.solutionText}>Production-ready OS in weeks</span>
                </div>
                <div className={styles.solutionItem}>
                  <span className={styles.solutionText}>Enterprise OTA orchestration</span>
                </div>
                <div className={styles.solutionItem}>
                  <span className={styles.solutionText}>Built-in security compliance</span>
                </div>
                <div className={styles.solutionItem}>
                  <span className={styles.solutionText}>Unified cross-platform development</span>
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
            Why Choose Peridio for Rubik Pi Development
          </Heading>
          <div className={styles.featureGrid}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <CommandLineIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">AI-Optimized Stack</Heading>
              <p>
                Native support for Qualcomm AI Engine and Hexagon SDK. Streamlined deployment of
                TensorFlow Lite, ONNX, and PyTorch models.
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <RocketLaunchIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">Rapid Deployment</Heading>
              <p>
                Optimized BSPs for Qualcomm silicon enable fast boot and deterministic builds.
                Pre-integrated drivers reduce development time.
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <LockClosedIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">Hardware Security</Heading>
              <p>
                Hardware-backed security with TrustZone, secure boot, and verified boot. LUKS
                encryption and dm-verity ensure data integrity.
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <WifiIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">Fleet Operations</Heading>
              <p>
                Comprehensive device management through Peridio Fleet with remote diagnostics,
                phased updates, and fleet-wide security patching.
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <GlobeAltIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">Cross-Platform</Heading>
              <p>
                Unified development experience across ARM SoCs (NVIDIA Jetson, NXP i.MX, Qualcomm
                QCS) with portable application layers.
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <ShieldCheckIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">Long-term Support</Heading>
              <p>
                10+ years of maintenance ensures device longevity and reduces lifecycle management
                overhead for enterprise deployments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <Heading as="h2">Ready to Accelerate Your Edge AI Development?</Heading>
            <p>
              Transform your Qualcomm Rubik Pi from development kit to secure, deployable edge AI
              platform ready for production.
            </p>
            <div className={styles.ctaButtons}>
              <Link to="/evk" className={styles.ctaPrimary}>
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
              <p>Step-by-step Yocto build configuration for Qualcomm QCS6490</p>
            </Link>
            <Link to="/platform/reference/overview" className={styles.resourceCard}>
              <Heading as="h3">Device Security</Heading>
              <p>Hardware-backed security, device certificates, and fleet security management</p>
            </Link>
            <Link to="/platform/reference/overview" className={styles.resourceCard}>
              <Heading as="h3">Platform Overview</Heading>
              <p>Complete Peridio platform architecture and fleet management capabilities</p>
            </Link>
            <Link to="/admin-api" className={styles.resourceCard}>
              <Heading as="h3">API Documentation</Heading>
              <p>REST API and GraphQL integration for custom robotics applications</p>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}
