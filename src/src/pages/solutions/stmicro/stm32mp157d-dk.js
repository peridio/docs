import React from 'react'
import Layout from '@theme/Layout'
import Head from '@docusaurus/Head'
import Link from '@docusaurus/Link'
import Heading from '@theme/Heading'
import styles from './stm32mp157d-dk.module.css'
import { 
  RocketLaunchIcon, 
  LockClosedIcon, 
  WifiIcon, 
  WrenchScrewdriverIcon, 
  GlobeAltIcon, 
  ShieldCheckIcon,
  XMarkIcon,
  CheckIcon
} from '@heroicons/react/24/outline'

export default function STM32MP157DDKSolution() {
  return (
    <Layout>
      <Head>
        <title>STMicroelectronics STM32MP257F-DK Device Management | Production-Ready OTA | Peridio</title>
        <meta 
          name="description" 
          content="Deploy STM32MP257F-DK in production 4x faster with Peridio Fleet + Avocado OS. Yocto-based, secure OTA updates, enterprise support for industrial IoT." 
        />
        <meta name="keywords" content="stm32mp257f-dk, stmicroelectronics, device management, ota updates, yocto, embedded linux, industrial iot, edge ai, dual core cortex-a35" />
        <meta property="og:title" content="STMicroelectronics STM32MP257F-DK Device Management | Production-Ready OTA | Peridio" />
        <meta property="og:description" content="Deploy STM32MP257F-DK in production 4x faster with Peridio Fleet + Avocado OS. Yocto-based, secure OTA updates, enterprise support." />
        <meta property="og:image" content="/img/stmicro_STM32MP257F-DK.png" />
        <meta property="og:type" content="product" />
        <link rel="canonical" href="https://docs.peridio.com/solutions/stmicro/stm32mp157d-dk" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Peridio + Avocado OS for STMicroelectronics STM32MP257F-DK",
            "description": "Production-ready device management and OTA updates for STM32MP257F-DK with Yocto-based embedded Linux",
            "manufacturer": {
              "@type": "Organization",
              "name": "Peridio"
            },
            "category": "Device Management Software",
            "offers": {
              "@type": "Offer",
              "availability": "https://schema.org/InStock"
            },
            "applicationCategory": "Industrial IoT, Edge AI, Smart Manufacturing",
            "operatingSystem": "Yocto Linux, Avocado OS"
          })}
        </script>
      </Head>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <Heading as="h1" className={styles.heroTitle}>
                Skip 18 Months of <span className={styles.highlight}>STM32MP Development</span>
              </Heading>
              <p className={styles.heroSubtitle}>
                Production-ready STMicroelectronics STM32MP257F-DK deployment in 4 months with Peridio Fleet + Avocado OS
              </p>
              <div className={styles.heroStats}>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>10x</span>
                  <span className={styles.statLabel}>Faster Development</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>3x</span>
                  <span className={styles.statLabel}>Fewer Engineers</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>1.35</span>
                  <span className={styles.statLabel}>TOPS AI Performance</span>
                </div>
              </div>
              <div className={styles.heroCta}>
                <Link to="https://docs.avocadolinux.org/supported-hardware/stm32mp257f-dk" className={styles.ctaPrimary} target="_blank">
                  Get Started
                </Link>
                <Link to="/platform/reference/overview" className={styles.ctaSecondary}>
                  Datasheet
                </Link>
              </div>
            </div>
            <div className={styles.heroImage}>
              <img 
                src="/img/stmicro_STM32MP257F-DK.png" 
                alt="STMicroelectronics STM32MP257F-DK development kit" 
                className={styles.productImage}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Hardware Specs */}
      <section className={styles.specs}>
        <div className={styles.container}>
          <Heading as="h2" className={styles.sectionTitle}>Hardware Specifications</Heading>
          <div className={styles.specsTable}>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>AI Performance</div>
              <div className={styles.specValue}>1.35 TOPS NPU</div>
              <div className={styles.specNote}>Dedicated 3D NPU for AI acceleration</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>Applications CPU</div>
              <div className={styles.specValue}>Dual-core Arm Cortex-A35 @ 1.5 GHz</div>
              <div className={styles.specNote}>64-bit ARMv8-A architecture</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>Real-time CPU</div>
              <div className={styles.specValue}>Arm Cortex-M33 @ 400 MHz</div>
              <div className={styles.specNote}>Real-time processing with TrustZone</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>Memory</div>
              <div className={styles.specValue}>2GB DDR4</div>
              <div className={styles.specNote}>High-bandwidth memory for demanding applications</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>Storage</div>
              <div className={styles.specValue}>128GB eUFS + microSD</div>
              <div className={styles.specNote}>Fast storage with expansion capability</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>Operating Temperature</div>
              <div className={styles.specValue}>-40°C to +85°C</div>
              <div className={styles.specNote}>Extended industrial temperature range</div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className={styles.useCases}>
        <div className={styles.container}>
          <Heading as="h2" className={styles.sectionTitle}>Production Use Cases</Heading>
          <div className={styles.useCaseGrid}>
            <div className={styles.useCase}>
              <img src="/img/factory-quality-inspection.png" alt="Smart Manufacturing" className={styles.useCaseImage} />
              <Heading as="h3">Smart Manufacturing</Heading>
              <p>Real-time quality control with AI-powered visual inspection. OTA updates enable continuous model improvement in production.</p>
            </div>
            <div className={styles.useCase}>
              <img src="/img/environmental-inspection.png" alt="Industrial IoT Gateways" className={styles.useCaseImage} />
              <Heading as="h3">Industrial IoT Gateways</Heading>
              <p>Edge processing for sensor fusion and local decision making. Secure connectivity with cellular and ethernet interfaces.</p>
            </div>
            <div className={styles.useCase}>
              <img src="/img/see-and-spray.png" alt="HMI Controllers" className={styles.useCaseImage} />
              <Heading as="h3">HMI Controllers</Heading>
              <p>Advanced human-machine interfaces with touchscreen support. Real-time responsiveness with dual-core architecture.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className={styles.problemSolution}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <Heading as="h2">From Challenge to Solution</Heading>
            <p>Transform your STM32MP development workflow with enterprise-grade infrastructure</p>
          </div>
          
          <div className={styles.comparisonContainer}>
            <div className={styles.challengeCard}>
              <div className={styles.cardHeader}>
                <div className={styles.challengeIcon}>
                  <XMarkIcon />
                </div>
                <Heading as="h3">The Challenge</Heading>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.challengeItem}>
                  <span className={styles.challengeText}>Complex dual-core system integration</span>
                </div>
                <div className={styles.challengeItem}>
                  <span className={styles.challengeText}>Custom Linux distribution takes months</span>
                </div>
                <div className={styles.challengeItem}>
                  <span className={styles.challengeText}>OTA infrastructure requires dedicated teams</span>
                </div>
                <div className={styles.challengeItem}>
                  <span className={styles.challengeText}>Security compliance adds complexity</span>
                </div>
                <div className={styles.challengeItem}>
                  <span className={styles.challengeText}>Industrial certification challenges</span>
                </div>
              </div>
            </div>

            <div className={styles.solutionCard}>
              <div className={styles.cardHeader}>
                <div className={styles.solutionIcon}>
                  <CheckIcon />
                </div>
                <Heading as="h3">The Solution</Heading>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.solutionItem}>
                  <span className={styles.solutionText}>Pre-configured dual-core system</span>
                </div>
                <div className={styles.solutionItem}>
                  <span className={styles.solutionText}>Production-ready Yocto distribution</span>
                </div>
                <div className={styles.solutionItem}>
                  <span className={styles.solutionText}>Enterprise OTA orchestration</span>
                </div>
                <div className={styles.solutionItem}>
                  <span className={styles.solutionText}>Built-in security compliance</span>
                </div>
                <div className={styles.solutionItem}>
                  <span className={styles.solutionText}>Industrial-grade fleet management</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className={styles.features}>
        <div className={styles.container}>
          <Heading as="h2" className={styles.sectionTitle}>Why Choose Peridio for STM32MP Development</Heading>
          <div className={styles.featureGrid}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}><RocketLaunchIcon /></div>
              <Heading as="h3">Rapid Deployment</Heading>
              <p>Boot production-ready Linux on STM32MP in minutes. Pre-configured dual-core communication and AI acceleration.</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}><LockClosedIcon /></div>
              <Heading as="h3">Production Security</Heading>
              <p>Secure boot with TrustZone, dm-verity, and LUKS encryption. Industrial-grade security from day one.</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}><WifiIcon /></div>
              <Heading as="h3">Fleet Management</Heading>
              <p>Register and manage devices in Peridio Fleet. Phased releases, cohort targeting, and real-time monitoring.</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}><WrenchScrewdriverIcon /></div>
              <Heading as="h3">Hybrid Architecture</Heading>
              <p>Seamless integration of Cortex-A35 and Cortex-M33 cores. Optimized for real-time and AI workloads.</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}><GlobeAltIcon /></div>
              <Heading as="h3">Cross-Platform</Heading>
              <p>Reuse Avocado OS layers across ARM SoCs (NVIDIA Jetson, Qualcomm, NXP i.MX8). Consistent toolchain.</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}><ShieldCheckIcon /></div>
              <Heading as="h3">Long-term Support</Heading>
              <p>10+ years of kernel/security maintenance. STM32MP longevity program ensures extended product lifecycle.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <Heading as="h2">Ready to Accelerate Your STM32MP Development?</Heading>
            <p>Transform your STMicroelectronics STM32MP257F-DK from development kit to secure, deployable industrial platform.</p>
            <div className={styles.ctaButtons}>
              <Link to="https://docs.avocadolinux.org/supported-hardware/stm32mp257f-dk" className={styles.ctaPrimary} target="_blank">
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
          <Heading as="h2" className={styles.sectionTitle}>Documentation & Resources</Heading>
          <div className={styles.resourceGrid}>
            <Link to="/integration/linux/build-tools/yocto" className={styles.resourceCard}>
              <Heading as="h3">Yocto Integration Guide</Heading>
              <p>Step-by-step Yocto build configuration for STM32MP257F-DK</p>
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
