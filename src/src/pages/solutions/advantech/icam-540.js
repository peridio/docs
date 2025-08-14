import React from 'react'
import Layout from '@theme/Layout'
import Head from '@docusaurus/Head'
import Link from '@docusaurus/Link'
import Heading from '@theme/Heading'
import styles from './icam-540.module.css'
import {
  HiOutlineCamera as CameraIcon,
  HiOutlineCpuChip as CpuChipIcon,
  HiOutlineShieldCheck as ShieldCheckIcon,
  HiOutlineGlobeAlt as GlobeAltIcon,
  HiOutlineBuildingOffice2 as BuildingOfficeIcon,
  HiOutlineWrenchScrewdriver as WrenchScrewdriverIcon,
  HiOutlineXMark as XMarkIcon,
  HiOutlineCheck as CheckIcon,
} from 'react-icons/hi2'

export default function ICAM540Solution() {
  return (
    <Layout>
      <Head>
        <title>Advantech ICAM-540 Industrial AI Camera | Edge Vision Computing | Peridio</title>
        <meta
          name="description"
          content="Deploy Advantech ICAM-540 industrial AI cameras with NVIDIA Jetson Orin NX, 100 TOPS AI performance, and enterprise fleet management. Production-ready edge vision."
        />
        <meta
          name="keywords"
          content="advantech icam-540, industrial ai camera, nvidia jetson orin nx, sony imx334, edge ai, computer vision, camnavi sdk, deepstream, fleet management"
        />
        <meta
          property="og:title"
          content="Advantech ICAM-540 Industrial AI Camera | Production Ready | Peridio"
        />
        <meta
          property="og:description"
          content="Deploy Advantech ICAM-540 industrial AI cameras with enterprise fleet management and secure OTA updates."
        />
        <meta property="og:image" content="/img/icam540.png" />
        <meta property="og:type" content="product" />
        <link rel="canonical" href="https://docs.peridio.com/solutions/advantech/icam-540" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Peridio + Avocado OS for Advantech ICAM-540',
            description:
              'Production-ready industrial AI camera with NVIDIA Jetson Orin NX (100 TOPS) and enterprise fleet management',
            manufacturer: {
              '@type': 'Organization',
              name: 'Peridio',
            },
            category: 'Industrial AI Camera',
            offers: {
              '@type': 'Offer',
              availability: 'https://schema.org/InStock',
            },
            applicationCategory: 'Automated Optical Inspection, Industrial Safety, Smart Factory Analytics, Edge Vision Computing',
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
                All-in-One AI Vision from{' '}
                <span className={styles.highlight}>Development to Production</span>
              </Heading>
              <p className={styles.heroSubtitle}>
                Transform your Advantech ICAM-540 from AI development platform to production-grade
                industrial vision system with enterprise Linux and fleet management
              </p>
              <div className={styles.heroStats}>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>100 TOPS</span>
                  <span className={styles.statLabel}>AI Performance</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>8MP @ 45fps</span>
                  <span className={styles.statLabel}>Sony IMX334 Sensor</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>C-Mount</span>
                  <span className={styles.statLabel}>Flexible Lens Options</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>6x Faster</span>
                  <span className={styles.statLabel}>Time to Production</span>
                </div>
              </div>
              <div className={styles.heroCta}>
                <Link to="/dev-center/hardware/production-ready/icam540" className={styles.ctaPrimary}>
                  Get Started
                </Link>
                <Link to="/" className={styles.ctaSecondary}>
                  Datasheet
                </Link>
              </div>
            </div>
            <div className={styles.heroImage}>
              <img
                src="/img/icam540.png"
                alt="Advantech ICAM-540 industrial AI camera"
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
            ICAM-540 Technical Specifications
          </Heading>
          <div className={styles.specsTable}>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>AI Processor</div>
              <div className={styles.specValue}>NVIDIA Jetson Orin NX</div>
              <div className={styles.specNote}>100 TOPS for multi-model concurrent inference</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>Camera Sensor</div>
              <div className={styles.specValue}>Sony IMX334 8MP CMOS</div>
              <div className={styles.specNote}>Industrial-grade sensor with exceptional low-light performance</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>Frame Rate</div>
              <div className={styles.specValue}>45 fps at full resolution</div>
              <div className={styles.specNote}>Real-time processing for high-speed inspection</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>Lens Mount</div>
              <div className={styles.specValue}>C-Mount Compatible</div>
              <div className={styles.specNote}>Wide selection of industrial optics available</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>SDK Support</div>
              <div className={styles.specValue}>CAMNavi + DeepStream</div>
              <div className={styles.specNote}>Python-based development with NVIDIA optimization</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>Operating Temp</div>
              <div className={styles.specValue}>-20°C to +60°C</div>
              <div className={styles.specNote}>Reliable operation in industrial environments</div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className={styles.useCases}>
        <div className={styles.container}>
          <Heading as="h2" className={styles.sectionTitle}>
            Production Vision Applications
          </Heading>
          <div className={styles.useCaseGrid}>
            <div className={styles.useCase}>
              <img
                src="/img/factory-quality-inspection.png"
                alt="Quality Inspection"
                className={styles.useCaseImage}
              />
              <Heading as="h3">Automated Optical Inspection (AOI)</Heading>
              <p>
                Deploy 100 TOPS of AI performance for real-time defect detection on high-speed
                production lines. Process multiple inspection models simultaneously with sub-10ms latency.
              </p>
            </div>
            <div className={styles.useCase}>
              <img
                src="/img/workplace-safety.png"
                alt="Safety Monitoring"
                className={styles.useCaseImage}
              />
              <Heading as="h3">Industrial Safety & Compliance</Heading>
              <p>
                Monitor PPE compliance, detect safety violations, and track worker movement patterns.
                Edge processing ensures privacy compliance without cloud data transmission.
              </p>
            </div>
            <div className={styles.useCase}>
              <img
                src="/img/pedestrian-monitoring.png"
                alt="Logistics Automation"
                className={styles.useCaseImage}
              />
              <Heading as="h3">Smart Factory Analytics</Heading>
              <p>
                Real-time production monitoring with on-device inference for quality metrics,
                throughput optimization, and predictive maintenance triggers.
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
            <p></p>
          </div>

          <div className={styles.comparisonContainer}>
            <div className={styles.challengeCard}>
              <div className={styles.cardHeader}>
                <div className={styles.challengeIcon}>
                  <XMarkIcon style={{ width: '1.5rem', height: '1.5rem' }} />
                </div>
                <Heading as="h3">The Traditional Vision System Challenge</Heading>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.challengeItem}>
                  <span className={styles.challengeText}>
                    18-month custom integration for production vision deployment
                  </span>
                </div>
                <div className={styles.challengeItem}>
                  <span className={styles.challengeText}>Manual on-camera updates that don&apos;t scale across facilities</span>
                </div>
                <div className={styles.challengeItem}>
                  <span className={styles.challengeText}>Complex AI model lifecycle without version control</span>
                </div>
                <div className={styles.challengeItem}>
                  <span className={styles.challengeText}>No unified management across camera fleets</span>
                </div>
                <div className={styles.challengeItem}>
                  <span className={styles.challengeText}>Limited remote diagnostics when vision systems fail</span>
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
                  <span className={styles.solutionText}>Production-ready in weeks with pre-configured vision BSPs</span>
                </div>
                <div className={styles.solutionItem}>
                  <span className={styles.solutionText}>Atomic OTA updates for models, firmware, and applications</span>
                </div>
                <div className={styles.solutionItem}>
                  <span className={styles.solutionText}>Built-in DeepStream SDK with TensorRT optimization</span>
                </div>
                <div className={styles.solutionItem}>
                  <span className={styles.solutionText}>Cross-camera orchestration with centralized management</span>
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
            Why Choose Peridio for ICAM-540 Production Deployment
          </Heading>
          <div className={styles.featureGrid}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <CameraIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">Production-Ready from Day One</Heading>
              <p>
                Pre-hardened Linux OS with CAMNavi SDK, DeepStream, and TensorRT pre-integrated.
                No prototype-to-production gap.
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <CpuChipIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">Atomic AI Model Updates</Heading>
              <p>
                Zero-downtime model deployment with automatic rollback on performance degradation.
                Version control and A/B testing for continuous improvement.
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <ShieldCheckIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">Enterprise Security</Heading>
              <p>
                Hardware-accelerated encryption, secure boot, and certificate-based authentication.
                Zero-trust architecture built for industrial vision systems.
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <GlobeAltIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">Vision Fleet Management</Heading>
              <p>
                Deploy and manage hundreds of ICAM-540 cameras across industrial sites.
                Site-specific configurations with centralized policy enforcement.
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <BuildingOfficeIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">Cross-Platform Portability</Heading>
              <p>
                Develop on ICAM-540, deploy across NVIDIA Jetson platforms. Unified toolchain
                prevents vendor lock-in and reduces engineering overhead.
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <WrenchScrewdriverIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">Optimized Vision Performance</Heading>
              <p>
                Hardware acceleration for GStreamer pipelines and TensorRT inference. Automatic
                resource allocation for multi-model concurrent processing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <Heading as="h2">Ready to Deploy Production-Ready AI Vision?</Heading>
            <p>
              Transform your Advantech ICAM-540 cameras into a managed vision fleet with atomic
              updates, remote diagnostics, and enterprise support.
            </p>
            <div className={styles.ctaButtons}>
              <Link to="/dev-center/hardware/production-ready/icam540" className={styles.ctaPrimary}>
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
              <Heading as="h3">Industrial Vision Guide</Heading>
              <p>CAMNavi SDK integration and DeepStream pipeline optimization for AOI applications</p>
            </Link>
            <Link to="/platform/reference/overview" className={styles.resourceCard}>
              <Heading as="h3">AI Model Lifecycle</Heading>
              <p>TensorRT optimization, versioning, and atomic deployment for production inference</p>
            </Link>
            <Link to="/platform/reference/overview" className={styles.resourceCard}>
              <Heading as="h3">Vision Fleet Operations</Heading>
              <p>Multi-camera synchronization and centralized management across facilities</p>
            </Link>
            <Link to="/admin-api" className={styles.resourceCard}>
              <Heading as="h3">Edge-to-Cloud Integration</Heading>
              <p>Secure data pipelines and inference result streaming with on-premise support</p>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}