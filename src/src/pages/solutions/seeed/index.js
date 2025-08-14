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
                Production-Ready Industrial HMI Platform. Deploy fleets of Raspberry Pi CM4-powered 
                touch interfaces with deterministic Linux, secure OTA updates, and enterprise fleet 
                management from Day 1.
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
                <div className={styles.stat}>
                  <span className={styles.statNumber}>&lt;30s</span>
                  <span className={styles.statLabel}>Cold boot to UI</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>1000+</span>
                  <span className={styles.statLabel}>Fleet scalability</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>7yr</span>
                  <span className={styles.statLabel}>Avocado OS LTS</span>
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
                src="/img/reterminal-2.png"
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
                Real-time PLC Integration with responsive multi-touch interface. Optimized UI rendering 
                for smooth operator interactions. Native Modbus RTU/TCP, OPC UA, and MQTT support through Avocado OS.
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
                Multi-site HVAC/BMS deployment with centralized management. Deploy identical HMI 
                configurations across facilities with group-based fleet management. Node-RED visual 
                programming with pre-built automation blocks.
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
                Process 10,000+ sensor messages/sec at the edge with local data aggregation and filtering. 
                LoRaWAN and Zigbee expansion modules for wireless sensor networks. Real-time visualization 
                with sub-second latency.
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
                    Weeks to configure each HMI manually with custom SD card images
                  </span>
                </div>
                <div className={styles.challengeItem}>
                  <span className={styles.challengeText}>No rollback when UI updates fail in production</span>
                </div>
                <div className={styles.challengeItem}>
                  <span className={styles.challengeText}>Consumer-grade OS unsuitable for 24/7 industrial operation</span>
                </div>
                <div className={styles.challengeItem}>
                  <span className={styles.challengeText}>Custom BSP development for each deployment scenario</span>
                </div>
                <div className={styles.challengeItem}>
                  <span className={styles.challengeText}>No centralized visibility across distributed HMI fleets</span>
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
                  <span className={styles.solutionText}>Deploy 100s of HMIs in hours with zero-touch provisioning</span>
                </div>
                <div className={styles.solutionItem}>
                  <span className={styles.solutionText}>Atomic updates with instant rollback on failure</span>
                </div>
                <div className={styles.solutionItem}>
                  <span className={styles.solutionText}>Industrial Linux with real-time kernel and 7-year support</span>
                </div>
                <div className={styles.solutionItem}>
                  <span className={styles.solutionText}>Pre-integrated BSP with optimized display drivers out-of-the-box</span>
                </div>
                <div className={styles.solutionItem}>
                  <span className={styles.solutionText}>Single dashboard for monitoring and managing entire fleet</span>
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
              <Heading as="h3">Avocado OS - Production Linux for reTerminal</Heading>
              <p>
                Deterministic Yocto Linux optimized for reTerminal and Raspberry Pi CM4. Pre-integrated 
                Qt 6, Flutter, and LVGL UI frameworks. Wayland compositor optimized for IPS multi-touch 
                display performance.
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <CpuChipIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">Day 1 Production Ready</Heading>
              <p>
                Skip months of BSP development with pre-integrated Raspberry Pi CM4 support. Optimized 
                drivers for the IPS multi-touch display and wireless connectivity. Real-time kernel 
                patches for deterministic performance in industrial environments.
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <ShieldCheckIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">Enterprise Security & Compliance</Heading>
              <p>
                Secure boot chain from bootloader to application. Encrypted storage with TPM 2.0 support. 
                SBOM generation for supply chain compliance. Kiosk mode with lockdown policies for operator terminals.
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <GlobeAltIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">Fleet-Scale Operations</Heading>
              <p>
                Manage 1000+ reTerminals from a single dashboard. Phased rollouts with automatic rollback 
                on failure. Group-based configuration for site-specific settings. Real-time health monitoring 
                and alerting.
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <CommandLineIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">Industrial Protocol Suite</Heading>
              <p>
                Native Modbus RTU/TCP with optimized response times. OPC UA server/client with security 
                profiles. MQTT 5.0 with QoS and retained messages. Pre-built Node-RED flows for common 
                automation patterns.
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <WrenchScrewdriverIcon style={{ width: '100%', height: '100%' }} />
              </div>
              <Heading as="h3">Developer Acceleration</Heading>
              <p>
                Hardware-in-the-loop development reduces iteration from weeks to hours. Remote debugging 
                with full stack traces. Performance profiling for UI and system optimization. Cross-compilation 
                SDK for CI/CD pipelines.
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
              Transform your Seeed reTerminal HMIs into a production fleet. Get deterministic Linux, 
              secure OTA orchestration, and enterprise fleet management - all production-ready from Day 1.
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