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
        <title>NXP FRDM-MCXN947 MCU Development | Real-Time IoT | Peridio</title>
        <meta
          name="description"
          content="Production-ready NXP FRDM-MCXN947 development with dual Cortex-M33 cores, ML acceleration, and secure IoT connectivity. Enterprise OTA and fleet management."
        />
        <meta
          name="keywords"
          content="nxp frdm-mcxn947, mcx n94, cortex-m33, mcu development, real-time, iot, embedded, fleet management"
        />
        <meta
          property="og:title"
          content="NXP FRDM-MCXN947 MCU Development | Real-Time IoT | Peridio"
        />
        <meta
          property="og:description"
          content="Production-ready NXP FRDM-MCXN947 development with dual Cortex-M33 cores and enterprise fleet management."
        />
        <meta property="og:image" content="/img/nxp-frdm-93.jpg" />
        <meta property="og:type" content="product" />
        <link rel="canonical" href="https://docs.peridio.com/solutions/nxp/frdm-93" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Peridio + Avocado OS for NXP FRDM-MCXN947',
            description:
              'Production-ready MCU development platform with dual-core Cortex-M33 and enterprise fleet management',
            manufacturer: {
              '@type': 'Organization',
              name: 'Peridio',
            },
            category: 'MCU Development Platform',
            offers: {
              '@type': 'Offer',
              availability: 'https://schema.org/InStock',
            },
            applicationCategory: 'Real-Time IoT, Industrial Control, ML Edge',
            operatingSystem: 'FreeRTOS, Zephyr, Bare Metal',
          })}
        </script>
      </Head>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <Heading as="h1" className={styles.heroTitle}>
                Industrial MCU Development with{' '}
                <span className={styles.highlight}>NXP FRDM-MCXN947</span>
              </Heading>
              <p className={styles.heroSubtitle}>
                Dual-core Cortex-M33 platform with ML acceleration, secure boot, and industrial
                connectivity for real-time IoT applications
              </p>
              <div className={styles.heroStats}>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>150MHz</span>
                  <span className={styles.statLabel}>Dual Cortex-M33</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>2MB</span>
                  <span className={styles.statLabel}>Flash Memory</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>-40°C</span>
                  <span className={styles.statLabel}>Industrial Temp</span>
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
                src="/img/nxp-frdm-93.jpg"
                alt="NXP FRDM-MCXN947 development board"
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
            FRDM-MCXN947 Technical Specifications
          </Heading>
          <div className={styles.specsTable}>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>Processor</div>
              <div className={styles.specValue}>Dual Cortex-M33 @ 150MHz</div>
              <div className={styles.specNote}>TrustZone security and DSP extensions</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>Memory</div>
              <div className={styles.specValue}>2MB Flash / 512KB SRAM</div>
              <div className={styles.specNote}>Execute-in-place from external flash</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>ML Accelerator</div>
              <div className={styles.specValue}>NPU with eIQ ML support</div>
              <div className={styles.specNote}>TensorFlow Lite Micro optimized</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>Connectivity</div>
              <div className={styles.specValue}>CAN FD, USB, UART, SPI, I2C</div>
              <div className={styles.specNote}>Industrial protocols and automotive CAN</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>Security</div>
              <div className={styles.specValue}>Secure Boot, Crypto, TRNG</div>
              <div className={styles.specNote}>Hardware root of trust</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>Operating Temp</div>
              <div className={styles.specValue}>-40°C to +105°C</div>
              <div className={styles.specNote}>Automotive and industrial grade</div>
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
                alt="Industrial Sensor Hub"
                className={styles.useCaseImage}
              />
              <Heading as="h3">Industrial Sensor Hub</Heading>
              <p>
                Multi-sensor data fusion with ML inference at the edge. Dual-core architecture
                separates real-time control from communication tasks.
              </p>
            </div>
            <div className={styles.useCase}>
              <img
                src="/img/environmental-inspection.png"
                alt="Motor Control Systems"
                className={styles.useCaseImage}
              />
              <Heading as="h3">Motor Control Systems</Heading>
              <p>
                FOC motor control with CAN FD for automotive and industrial applications. Hardware
                PWM and encoder interfaces for precision control.
              </p>
            </div>
            <div className={styles.useCase}>
              <img
                src="/img/workplace-safety.png"
                alt="Secure IoT Gateway"
                className={styles.useCaseImage}
              />
              <Heading as="h3">Secure IoT Gateway</Heading>
              <p>
                TrustZone-enabled secure gateway with hardware crypto. Bridge industrial sensors to
                cloud with authenticated OTA updates.
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
                    Complex dual-core synchronization
                  </span>
                </div>
                <div className={styles.challengeItem}>
                  <span className={styles.challengeText}>Manual firmware update processes</span>
                </div>
                <div className={styles.challengeItem}>
                  <span className={styles.challengeText}>Limited debugging in production</span>
                </div>
                <div className={styles.challengeItem}>
                  <span className={styles.challengeText}>Security implementation overhead</span>
                </div>
                <div className={styles.challengeItem}>
                  <span className={styles.challengeText}>No fleet management for MCUs</span>
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
                  <span className={styles.solutionText}>Pre-configured multicore RTOS</span>
                </div>
                <div className={styles.solutionItem}>
                  <span className={styles.solutionText}>Secure OTA with rollback</span>
                </div>
                <div className={styles.solutionItem}>
                  <span className={styles.solutionText}>Remote diagnostics and logging</span>
                </div>
                <div className={styles.solutionItem}>
                  <span className={styles.solutionText}>Built-in secure boot chain</span>
                </div>
                <div className={styles.solutionItem}>
                  <span className={styles.solutionText}>Enterprise MCU fleet management</span>
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
            Why Choose Peridio for FRDM-MCXN947 Development
          </Heading>
          <div className={styles.featureGrid}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <CpuChipIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">Dual-Core Optimization</Heading>
              <p>
                Pre-configured FreeRTOS/Zephyr with inter-core communication. Separate real-time
                control from application logic seamlessly.
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <BoltIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">Real-Time Performance</Heading>
              <p>
                Deterministic execution with hardware PWM, timers, and DMA. Low-latency interrupt
                handling for motor control and sensors.
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <ShieldCheckIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">Hardware Security</Heading>
              <p>
                TrustZone isolation, secure boot, and hardware crypto. Device certificates and
                secure key storage in PUF.
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <WrenchScrewdriverIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">MCU Fleet OTA</Heading>
              <p>
                Delta updates minimize bandwidth for constrained devices. A/B partitioning with
                automatic rollback on failure.
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <BeakerIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">ML at the Edge</Heading>
              <p>
                NPU-accelerated inference with TensorFlow Lite Micro. Pre-trained models for
                anomaly detection and predictive maintenance.
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <ChartBarIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">Production Analytics</Heading>
              <p>
                Real-time telemetry and remote diagnostics. Monitor CPU usage, memory, and custom
                metrics across your fleet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <Heading as="h2">Ready to Accelerate Your MCU Development?</Heading>
            <p>
              Transform your NXP FRDM-MCXN947 from development board to production-ready industrial
              platform with secure OTA and fleet management.
            </p>
            <div className={styles.ctaButtons}>
              <Link to="/dev-center/hardware/nxp/frdm-imx-93" className={styles.ctaPrimary}>
                Get Started
              </Link>
              <Link
                to="https://docs.avocadolinux.org/supported-hardware/frdm-mcxn947"
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
              <Heading as="h3">MCU Development Guide</Heading>
              <p>FreeRTOS and Zephyr configuration for dual-core Cortex-M33 platforms</p>
            </Link>
            <Link to="/platform/reference/overview" className={styles.resourceCard}>
              <Heading as="h3">Secure Boot Chain</Heading>
              <p>Hardware root of trust with TrustZone and secure firmware updates</p>
            </Link>
            <Link to="/platform/reference/overview" className={styles.resourceCard}>
              <Heading as="h3">Fleet Management</Heading>
              <p>MCU fleet operations with OTA updates and remote diagnostics</p>
            </Link>
            <Link to="/admin-api" className={styles.resourceCard}>
              <Heading as="h3">API Integration</Heading>
              <p>REST API for automated testing and continuous deployment</p>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}