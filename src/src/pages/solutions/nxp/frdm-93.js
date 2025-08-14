import React from 'react'
import Layout from '@theme/Layout'
import Head from '@docusaurus/Head'
import Link from '@docusaurus/Link'
import Heading from '@theme/Heading'
import styles from './frdm-93.module.css'
import {
  HiOutlineCpuChip as CpuChipIcon,
  HiOutlineBolt as BoltIcon,
  HiOutlineShieldCheck as ShieldCheckIcon,
  HiOutlineWrenchScrewdriver as WrenchScrewdriverIcon,
  HiOutlineBeaker as BeakerIcon,
  HiOutlineChartBar as ChartBarIcon,
  HiOutlineXMark as XMarkIcon,
  HiOutlineCheck as CheckIcon,
} from 'react-icons/hi2'

export default function FRDM93Solution() {
  return (
    <Layout>
      <Head>
        <title>NXP FRDM i.MX 93 Edge AI Development | Industrial Linux | Peridio</title>
        <meta
          name="description"
          content="Production-ready NXP FRDM i.MX 93 development with dual Cortex-A55, Cortex-M33, Ethos U-65 NPU, and secure edge connectivity. Enterprise OTA and fleet management."
        />
        <meta
          name="keywords"
          content="nxp frdm imx93, i.mx 93, cortex-a55, edge ai, ethos u65, industrial linux, embedded, fleet management"
        />
        <meta
          property="og:title"
          content="NXP FRDM i.MX 93 Edge AI Development | Industrial Linux | Peridio"
        />
        <meta
          property="og:description"
          content="Production-ready NXP FRDM i.MX 93 development with heterogeneous processing and enterprise fleet management."
        />
        <meta property="og:image" content="/img/NXP-FRDM-93.png" />
        <meta property="og:type" content="product" />
        <link rel="canonical" href="https://docs.peridio.com/solutions/nxp/frdm-93" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Peridio + Avocado Linux for NXP FRDM i.MX 93',
            description:
              'Production-ready edge AI development platform with heterogeneous processing and enterprise fleet management',
            manufacturer: {
              '@type': 'Organization',
              name: 'Peridio',
            },
            category: 'Edge AI Development Platform',
            offers: {
              '@type': 'Offer',
              availability: 'https://schema.org/InStock',
            },
            applicationCategory: 'Edge AI, Industrial HMI, Smart Vision, IoT Gateway',
            operatingSystem: 'Yocto Linux, FreeRTOS, Zephyr',
          })}
        </script>
      </Head>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <Heading as="h1" className={styles.heroTitle}>
                Edge AI Development with{' '}
                <span className={styles.highlight}>NXP FRDM i.MX 93</span>
              </Heading>
              <p className={styles.heroSubtitle}>
                Dual Cortex-A55 + Cortex-M33 heterogeneous platform with Ethos U-65 NPU, EdgeLock
                secure enclave, and industrial connectivity for edge AI applications
              </p>
              <div className={styles.heroStats}>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>1.7GHz</span>
                  <span className={styles.statLabel}>Dual Cortex-A55</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>0.5 TOPS</span>
                  <span className={styles.statLabel}>Ethos U-65 NPU</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>2GB</span>
                  <span className={styles.statLabel}>LPDDR4X Memory</span>
                </div>
              </div>
              <div className={styles.heroCta}>
                <Link
                  to="/dev-center/hardware/nxp/frdm-imx-93"
                  className={styles.ctaPrimary}
                >
                  Get Started
                </Link>
                <Link to="/" className={styles.ctaSecondary}>
                  Datasheet
                </Link>
              </div>
            </div>
            <div className={styles.heroImage}>
              <img
                src="/img/NXP-FRDM-93.png"
                alt="NXP FRDM i.MX 93 development board"
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
            FRDM i.MX 93 Technical Specifications
          </Heading>
          <div className={styles.specsTable}>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>Processor</div>
              <div className={styles.specValue}>Dual Cortex-A55 @ 1.7GHz + Cortex-M33 @ 250MHz</div>
              <div className={styles.specNote}>64-bit Linux cores + real-time core</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>Memory</div>
              <div className={styles.specValue}>2GB LPDDR4X / 32GB eMMC</div>
              <div className={styles.specNote}>High-speed memory with expansion slot</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>ML Accelerator</div>
              <div className={styles.specValue}>Arm Ethos U-65 microNPU</div>
              <div className={styles.specNote}>0.5 TOPS for edge AI inference</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>Connectivity</div>
              <div className={styles.specValue}>2x GbE, Wi-Fi 6, BT 5.4, CAN</div>
              <div className={styles.specNote}>Tri-radio wireless + industrial networking</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>Security</div>
              <div className={styles.specValue}>EdgeLock Secure Enclave</div>
              <div className={styles.specNote}>Hardware root of trust with secure boot</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>Display/Camera</div>
              <div className={styles.specValue}>MIPI DSI, LVDS, MIPI CSI-2</div>
              <div className={styles.specNote}>4-lane display and 2-lane camera interfaces</div>
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
                alt="Smart HMI Systems"
                className={styles.useCaseImage}
              />
              <Heading as="h3">Smart HMI Systems</Heading>
              <p>
                AI-powered human-machine interfaces with advanced display capabilities. MIPI DSI
                and LVDS support for industrial touch panels with real-time responsiveness.
              </p>
            </div>
            <div className={styles.useCase}>
              <img
                src="/img/environmental-inspection.png"
                alt="Edge AI Vision"
                className={styles.useCaseImage}
              />
              <Heading as="h3">Edge AI Vision</Heading>
              <p>
                Camera-based inspection and monitoring with on-device ML inference. Process 2-lane
                MIPI CSI-2 video streams with Ethos U-65 NPU acceleration.
              </p>
            </div>
            <div className={styles.useCase}>
              <img
                src="/img/workplace-safety.png"
                alt="Industrial IoT Gateway"
                className={styles.useCaseImage}
              />
              <Heading as="h3">Industrial IoT Gateway</Heading>
              <p>
                Heterogeneous processing with Linux applications and real-time control. Dual Gigabit
                Ethernet and Wi-Fi 6 for high-bandwidth connectivity.
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
            <p>Transform your MCU development workflow with enterprise-grade infrastructure</p>
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
                    Complex heterogeneous architecture
                  </span>
                </div>
                <div className={styles.challengeItem}>
                  <span className={styles.challengeText}>Manual Linux image deployment</span>
                </div>
                <div className={styles.challengeItem}>
                  <span className={styles.challengeText}>Limited edge AI optimization</span>
                </div>
                <div className={styles.challengeItem}>
                  <span className={styles.challengeText}>Security compliance overhead</span>
                </div>
                <div className={styles.challengeItem}>
                  <span className={styles.challengeText}>No unified fleet management</span>
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
                  <span className={styles.solutionText}>Optimized Yocto Linux BSP</span>
                </div>
                <div className={styles.solutionItem}>
                  <span className={styles.solutionText}>Atomic OTA updates with rollback</span>
                </div>
                <div className={styles.solutionItem}>
                  <span className={styles.solutionText}>Edge AI model deployment</span>
                </div>
                <div className={styles.solutionItem}>
                  <span className={styles.solutionText}>EdgeLock secure boot integration</span>
                </div>
                <div className={styles.solutionItem}>
                  <span className={styles.solutionText}>Enterprise edge fleet management</span>
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
            Why Choose Peridio for FRDM i.MX 93 Development
          </Heading>
          <div className={styles.featureGrid}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <CpuChipIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">Heterogeneous Computing</Heading>
              <p>
                Optimized Linux on Cortex-A55 cores with RTOS on Cortex-M33. Seamless
                inter-processor communication for mixed-criticality systems.
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <BoltIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">Edge AI Acceleration</Heading>
              <p>
                Ethos U-65 NPU integration with TensorFlow Lite and ONNX Runtime. Deploy and update
                ML models over-the-air without downtime.
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <ShieldCheckIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">Enterprise Security</Heading>
              <p>
                EdgeLock Secure Enclave with hardware root of trust. Secure boot, encrypted storage,
                and device attestation.
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <WrenchScrewdriverIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">Industrial Connectivity</Heading>
              <p>
                Dual Gigabit Ethernet with TSN support for deterministic networking. Wi-Fi 6 and
                Bluetooth 5.4 for wireless flexibility.
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <BeakerIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">Containerization Support</Heading>
              <p>
                Docker support for edge applications. Deploy microservices with resource isolation
                and portability.
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <ChartBarIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">Fleet Intelligence</Heading>
              <p>
                Real-time monitoring of heterogeneous systems. Track Linux metrics, M33 performance,
                and AI inference statistics.
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
              Transform your NXP FRDM i.MX 93 from development board to production-ready edge AI
              platform with secure OTA and fleet management.
            </p>
            <div className={styles.ctaButtons}>
              <Link to="/dev-center/hardware/nxp/frdm-imx-93" className={styles.ctaPrimary}>
                Get Started
              </Link>
              <Link
                to="https://docs.avocadolinux.org/supported-hardware/frdm-imx93"
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
              <Heading as="h3">i.MX 93 BSP Guide</Heading>
              <p>Yocto Linux configuration for heterogeneous Cortex-A55/M33 platforms</p>
            </Link>
            <Link to="/platform/reference/overview" className={styles.resourceCard}>
              <Heading as="h3">EdgeLock Security</Heading>
              <p>Secure enclave integration with hardware root of trust and attestation</p>
            </Link>
            <Link to="/platform/reference/overview" className={styles.resourceCard}>
              <Heading as="h3">Edge AI Deployment</Heading>
              <p>Ethos U-65 NPU optimization and ML model management</p>
            </Link>
            <Link to="/admin-api" className={styles.resourceCard}>
              <Heading as="h3">Fleet API</Heading>
              <p>REST API for automated edge deployments and monitoring</p>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}