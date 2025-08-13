import React from 'react'
import Layout from '@theme/Layout'
import Head from '@docusaurus/Head'
import Link from '@docusaurus/Link'
import Heading from '@theme/Heading'
import styles from './index.module.css'
import {
  HiOutlineDeviceTablet as DeviceTabletIcon,
  HiOutlineCpuChip as CpuChipIcon,
  HiOutlineShieldCheck as ShieldCheckIcon,
  HiOutlineGlobeAlt as GlobeAltIcon,
  HiOutlineWrenchScrewdriver as WrenchScrewdriverIcon,
  HiOutlineCommandLine as CommandLineIcon,
  HiOutlineXMark as XMarkIcon,
  HiOutlineCheck as CheckIcon,
} from 'react-icons/hi2'

export default function ReTerminalSolution() {
  return (
    <Layout>
      <Head>
        <title>Seeed reTerminal Industrial HMI | Raspberry Pi CM4 | Peridio</title>
        <meta
          name="description"
          content="Deploy Seeed reTerminal industrial HMI with Raspberry Pi CM4, 5-inch touchscreen, and enterprise fleet management. Production-ready edge computing."
        />
        <meta
          name="keywords"
          content="seeed reterminal, raspberry pi cm4, industrial hmi, touchscreen, edge computing, fleet management"
        />
        <meta
          property="og:title"
          content="Seeed reTerminal Industrial HMI | Raspberry Pi CM4 | Peridio"
        />
        <meta
          property="og:description"
          content="Deploy Seeed reTerminal industrial HMI with enterprise fleet management and secure OTA updates."
        />
        <meta property="og:image" content="/img/seeed-reterminal.jpg" />
        <meta property="og:type" content="product" />
        <link rel="canonical" href="https://docs.peridio.com/solutions/seeed" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Peridio + Avocado OS for Seeed reTerminal',
            description:
              'Production-ready industrial HMI with Raspberry Pi CM4 and enterprise fleet management',
            manufacturer: {
              '@type': 'Organization',
              name: 'Peridio',
            },
            category: 'Industrial HMI',
            offers: {
              '@type': 'Offer',
              availability: 'https://schema.org/InStock',
            },
            applicationCategory: 'HMI, Edge Computing, Industrial Control, IoT Gateway',
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
                Industrial HMI with{' '}
                <span className={styles.highlight}>Seeed reTerminal</span>
              </Heading>
              <p className={styles.heroSubtitle}>
                5-inch multi-touch display powered by Raspberry Pi CM4 with wireless connectivity
                and modular expansion for industrial control
              </p>
              <div className={styles.heroStats}>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>5&quot;</span>
                  <span className={styles.statLabel}>IPS Touchscreen</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>1.5GHz</span>
                  <span className={styles.statLabel}>Quad-Core ARM</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>IP64</span>
                  <span className={styles.statLabel}>Front Panel</span>
                </div>
              </div>
              <div className={styles.heroCta}>
                <Link to="/dev-center/hardware/production-ready/seeed-reterminal" className={styles.ctaPrimary}>
                  Get Started
                </Link>
                <Link to="/" className={styles.ctaSecondary}>
                  Datasheet
                </Link>
              </div>
            </div>
            <div className={styles.heroImage}>
              <img
                src="/img/seeed-reterminal.jpg"
                alt="Seeed reTerminal industrial HMI"
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
            reTerminal Technical Specifications
          </Heading>
          <div className={styles.specsTable}>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>Processor</div>
              <div className={styles.specValue}>Raspberry Pi CM4</div>
              <div className={styles.specNote}>Quad-core Cortex-A72 @ 1.5GHz</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>Display</div>
              <div className={styles.specValue}>5-inch IPS LCD</div>
              <div className={styles.specNote}>1280x720, 10-point multi-touch</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>Memory</div>
              <div className={styles.specValue}>2/4/8GB LPDDR4</div>
              <div className={styles.specNote}>Up to 32GB eMMC storage</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>Connectivity</div>
              <div className={styles.specValue}>WiFi 5 + BT 5.0</div>
              <div className={styles.specNote}>Gigabit Ethernet, dual USB</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>Expansion</div>
              <div className={styles.specValue}>40-pin GPIO</div>
              <div className={styles.specNote}>Compatible with reTerminal E10-1 modules</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>Operating Temp</div>
              <div className={styles.specValue}>0°C to +50°C</div>
              <div className={styles.specNote}>Industrial-grade components</div>
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
                src="/img/industrial-hmi.png"
                alt="Industrial HMI"
                className={styles.useCaseImage}
              />
              <Heading as="h3">Machine Control Interface</Heading>
              <p>
                Real-time machine monitoring and control with responsive touch interface. Integrate
                with PLCs via Modbus, OPC UA, and MQTT protocols.
              </p>
            </div>
            <div className={styles.useCase}>
              <img
                src="/img/building-automation.png"
                alt="Building Automation"
                className={styles.useCaseImage}
              />
              <Heading as="h3">Building Automation</Heading>
              <p>
                Smart building control panels for HVAC, lighting, and security systems. Node-RED
                integration for visual programming.
              </p>
            </div>
            <div className={styles.useCase}>
              <img
                src="/img/iot-gateway.png"
                alt="IoT Gateway"
                className={styles.useCaseImage}
              />
              <Heading as="h3">Edge IoT Gateway</Heading>
              <p>
                Collect, process, and visualize sensor data at the edge. LoRaWAN and Zigbee support
                via expansion modules.
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
            <p>Transform your reTerminal deployment with production-ready infrastructure</p>
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
                    Manual SD card imaging for each device
                  </span>
                </div>
                <div className={styles.challengeItem}>
                  <span className={styles.challengeText}>No remote HMI management</span>
                </div>
                <div className={styles.challengeItem}>
                  <span className={styles.challengeText}>Difficult UI updates in field</span>
                </div>
                <div className={styles.challengeItem}>
                  <span className={styles.challengeText}>Limited security features</span>
                </div>
                <div className={styles.challengeItem}>
                  <span className={styles.challengeText}>No fleet monitoring</span>
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
                  <span className={styles.solutionText}>Zero-touch provisioning</span>
                </div>
                <div className={styles.solutionItem}>
                  <span className={styles.solutionText}>Remote HMI configuration</span>
                </div>
                <div className={styles.solutionItem}>
                  <span className={styles.solutionText}>OTA UI and app updates</span>
                </div>
                <div className={styles.solutionItem}>
                  <span className={styles.solutionText}>Secure boot and encryption</span>
                </div>
                <div className={styles.solutionItem}>
                  <span className={styles.solutionText}>Real-time fleet analytics</span>
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
            Why Choose Peridio for reTerminal Deployment
          </Heading>
          <div className={styles.featureGrid}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <DeviceTabletIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">HMI-Optimized OS</Heading>
              <p>
                Pre-configured Avocado OS with Qt, Flutter, and web-based UI frameworks. Hardware
                accelerated graphics with Wayland compositor.
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <CpuChipIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">CM4 Optimization</Heading>
              <p>
                Optimized for Raspberry Pi CM4 with GPU acceleration, hardware video decoding, and
                efficient power management.
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <ShieldCheckIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">Industrial Security</Heading>
              <p>
                Secure boot chain, encrypted storage, and certificate-based authentication. Kiosk
                mode for locked-down deployments.
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <GlobeAltIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">Fleet Management</Heading>
              <p>
                Manage hundreds of reTerminals across multiple sites. Group-based configuration and
                scheduled maintenance windows.
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <CommandLineIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">Protocol Support</Heading>
              <p>
                Built-in Modbus RTU/TCP, OPC UA, MQTT, and CoAP. Node-RED for visual flow-based
                programming.
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <WrenchScrewdriverIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">Developer Tools</Heading>
              <p>
                Remote debugging, log aggregation, and performance monitoring. SDK for custom
                application development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <Heading as="h2">Ready to Deploy reTerminal at Scale?</Heading>
            <p>
              Transform your Seeed reTerminal HMIs into a managed fleet with secure OTA updates,
              remote configuration, and enterprise support.
            </p>
            <div className={styles.ctaButtons}>
              <Link to="/dev-center/hardware/production-ready/seeed-reterminal" className={styles.ctaPrimary}>
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
              <Heading as="h3">HMI Development Guide</Heading>
              <p>Qt and Flutter integration for reTerminal touchscreen applications</p>
            </Link>
            <Link to="/platform/reference/overview" className={styles.resourceCard}>
              <Heading as="h3">Industrial Protocols</Heading>
              <p>Modbus, OPC UA, and MQTT configuration for industrial systems</p>
            </Link>
            <Link to="/platform/reference/overview" className={styles.resourceCard}>
              <Heading as="h3">Fleet Configuration</Heading>
              <p>Managing HMI settings and UI updates across deployments</p>
            </Link>
            <Link to="/admin-api" className={styles.resourceCard}>
              <Heading as="h3">Remote Management API</Heading>
              <p>REST APIs for HMI control and monitoring</p>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}