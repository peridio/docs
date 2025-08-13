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
        <title>Advantech ICAM-540 Industrial AI Camera | Production Ready | Peridio</title>
        <meta
          name="description"
          content="Deploy Advantech ICAM-540 industrial AI cameras with NVIDIA Jetson Xavier NX, IP67 protection, and enterprise fleet management. Production-ready computer vision."
        />
        <meta
          name="keywords"
          content="advantech icam-540, industrial ai camera, nvidia jetson xavier nx, computer vision, ip67, poe+, fleet management"
        />
        <meta
          property="og:title"
          content="Advantech ICAM-540 Industrial AI Camera | Production Ready | Peridio"
        />
        <meta
          property="og:description"
          content="Deploy Advantech ICAM-540 industrial AI cameras with enterprise fleet management and secure OTA updates."
        />
        <meta property="og:image" content="/img/advantech-icam-540.jpg" />
        <meta property="og:type" content="product" />
        <link rel="canonical" href="https://docs.peridio.com/solutions/advantech/icam-540" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Peridio + Avocado OS for Advantech ICAM-540',
            description:
              'Production-ready industrial AI camera with NVIDIA Jetson Xavier NX and enterprise fleet management',
            manufacturer: {
              '@type': 'Organization',
              name: 'Peridio',
            },
            category: 'Industrial AI Camera',
            offers: {
              '@type': 'Offer',
              availability: 'https://schema.org/InStock',
            },
            applicationCategory: 'Computer Vision, Quality Inspection, Smart Factory',
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
                Industrial AI Vision with{' '}
                <span className={styles.highlight}>Advantech ICAM-540</span>
              </Heading>
              <p className={styles.heroSubtitle}>
                IP67-rated smart camera with NVIDIA Jetson Xavier NX, 5MP global shutter, and PoE+
                for harsh industrial environments
              </p>
              <div className={styles.heroStats}>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>21</span>
                  <span className={styles.statLabel}>TOPS AI Performance</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>IP67</span>
                  <span className={styles.statLabel}>Ruggedized Design</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>PoE+</span>
                  <span className={styles.statLabel}>Single Cable Solution</span>
                </div>
              </div>
              <div className={styles.heroCta}>
                <Link to="/dev-center/hardware/production-ready/icam540" className={styles.ctaPrimary}>
                  Get Started
                </Link>
                <a href="https://peridio.com" className={styles.ctaSecondary} target="_blank" rel="noopener noreferrer">
                  Datasheet
                </a>
              </div>
            </div>
            <div className={styles.heroImage}>
              <img
                src="/img/advantech-icam-540.jpg"
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
              <div className={styles.specValue}>NVIDIA Jetson Xavier NX</div>
              <div className={styles.specNote}>21 TOPS with 384 CUDA cores</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>Camera Sensor</div>
              <div className={styles.specValue}>5MP Global Shutter CMOS</div>
              <div className={styles.specNote}>2448 x 2048 @ 75fps, low distortion</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>Lens Options</div>
              <div className={styles.specValue}>C-Mount Compatible</div>
              <div className={styles.specNote}>6mm/8mm/12mm/16mm/25mm available</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>Environmental</div>
              <div className={styles.specValue}>IP67, IK10 Rated</div>
              <div className={styles.specNote}>Dust-proof, waterproof, vandal-resistant</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>Power & Network</div>
              <div className={styles.specValue}>PoE+ (IEEE 802.3at)</div>
              <div className={styles.specNote}>Single cable for power and data</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>Operating Temp</div>
              <div className={styles.specValue}>-30°C to +60°C</div>
              <div className={styles.specNote}>Wide temperature for harsh environments</div>
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
                alt="Quality Inspection"
                className={styles.useCaseImage}
              />
              <Heading as="h3">Quality Inspection</Heading>
              <p>
                Real-time defect detection on production lines with sub-millisecond inference.
                Global shutter eliminates motion blur for high-speed inspection.
              </p>
            </div>
            <div className={styles.useCase}>
              <img
                src="/img/workplace-safety.png"
                alt="Safety Monitoring"
                className={styles.useCaseImage}
              />
              <Heading as="h3">Safety Monitoring</Heading>
              <p>
                PPE compliance and hazard detection in industrial facilities. IP67 rating allows
                deployment in harsh factory environments.
              </p>
            </div>
            <div className={styles.useCase}>
              <img
                src="/img/pedestrian-monitoring.png"
                alt="Logistics Automation"
                className={styles.useCaseImage}
              />
              <Heading as="h3">Logistics Automation</Heading>
              <p>
                Barcode reading, OCR, and package tracking in warehouses. PoE+ simplifies
                multi-camera deployments across facilities.
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
            <p>Transform your industrial vision deployment with production-ready infrastructure</p>
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
                    Complex multi-camera synchronization
                  </span>
                </div>
                <div className={styles.challengeItem}>
                  <span className={styles.challengeText}>Manual model deployment to edge</span>
                </div>
                <div className={styles.challengeItem}>
                  <span className={styles.challengeText}>No centralized camera management</span>
                </div>
                <div className={styles.challengeItem}>
                  <span className={styles.challengeText}>Difficult firmware updates</span>
                </div>
                <div className={styles.challengeItem}>
                  <span className={styles.challengeText}>Limited production diagnostics</span>
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
                  <span className={styles.solutionText}>Synchronized multi-camera systems</span>
                </div>
                <div className={styles.solutionItem}>
                  <span className={styles.solutionText}>OTA model and firmware updates</span>
                </div>
                <div className={styles.solutionItem}>
                  <span className={styles.solutionText}>Centralized fleet management</span>
                </div>
                <div className={styles.solutionItem}>
                  <span className={styles.solutionText}>Secure, atomic updates</span>
                </div>
                <div className={styles.solutionItem}>
                  <span className={styles.solutionText}>Remote monitoring and diagnostics</span>
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
            Why Choose Peridio for ICAM-540 Deployment
          </Heading>
          <div className={styles.featureGrid}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <CameraIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">Production Vision OS</Heading>
              <p>
                Pre-configured Avocado OS with GStreamer, OpenCV, and DeepStream SDK. Optimized for
                industrial computer vision workloads.
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <CpuChipIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">AI Model Management</Heading>
              <p>
                Deploy TensorRT-optimized models via OTA. A/B testing for model updates with
                automatic rollback on accuracy degradation.
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <ShieldCheckIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">Enterprise Security</Heading>
              <p>
                Secure boot, encrypted storage, and certificate-based authentication. GDPR-compliant
                edge processing without cloud dependencies.
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <GlobeAltIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">Fleet Orchestration</Heading>
              <p>
                Manage hundreds of cameras across multiple sites. Cohort-based updates, scheduling,
                and maintenance windows.
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <BuildingOfficeIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">Industrial Hardened</Heading>
              <p>
                IP67-rated hardware with watchdog timers and auto-recovery. Designed for 24/7
                operation in harsh environments.
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <WrenchScrewdriverIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">Long-term Support</Heading>
              <p>
                10-year hardware availability with enterprise Linux maintenance. Security patches
                and compliance updates guaranteed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <Heading as="h2">Ready to Deploy Industrial AI Vision?</Heading>
            <p>
              Transform your Advantech ICAM-540 cameras into a managed fleet with secure OTA
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
              <Heading as="h3">Vision System Integration</Heading>
              <p>GStreamer pipelines and DeepStream configuration for industrial cameras</p>
            </Link>
            <Link to="/platform/reference/overview" className={styles.resourceCard}>
              <Heading as="h3">AI Model Deployment</Heading>
              <p>TensorRT optimization and OTA model updates for edge inference</p>
            </Link>
            <Link to="/platform/reference/overview" className={styles.resourceCard}>
              <Heading as="h3">Camera Fleet Management</Heading>
              <p>Multi-site camera orchestration with centralized monitoring</p>
            </Link>
            <Link to="/admin-api" className={styles.resourceCard}>
              <Heading as="h3">Vision API Integration</Heading>
              <p>REST API for camera control and inference result streaming</p>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}