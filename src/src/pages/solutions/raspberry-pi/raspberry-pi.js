import React from 'react'
import Layout from '@theme/Layout'
import Head from '@docusaurus/Head'
import Link from '@docusaurus/Link'
import styles from './raspberry-pi.module.css'

export default function RaspberryPiSolution() {
  return (
    <Layout>
      <Head>
        <title>Raspberry Pi Device Management | Production-Ready OTA | Peridio</title>
        <meta 
          name="description" 
          content="Deploy Raspberry Pi devices in production with Peridio Fleet + Avocado OS. Yocto-based, secure OTA updates, enterprise support for IoT and edge computing." 
        />
        <meta name="keywords" content="raspberry pi, device management, ota updates, yocto, embedded linux, iot, edge computing, fleet management" />
        <meta property="og:title" content="Raspberry Pi Device Management | Production-Ready OTA | Peridio" />
        <meta property="og:description" content="Deploy Raspberry Pi devices in production with Peridio Fleet + Avocado OS. Yocto-based, secure OTA updates, enterprise support." />
        <meta property="og:image" content="/img/raspberry-pi.jpg" />
        <meta property="og:type" content="product" />
        <link rel="canonical" href="https://docs.peridio.com/solutions/raspberry-pi/raspberry-pi" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Peridio + Avocado OS for Raspberry Pi",
            "description": "Production-ready device management and OTA updates for Raspberry Pi with Yocto-based embedded Linux",
            "manufacturer": {
              "@type": "Organization",
              "name": "Peridio"
            },
            "category": "Device Management Software",
            "offers": {
              "@type": "Offer",
              "availability": "https://schema.org/InStock"
            },
            "applicationCategory": "IoT, Edge Computing, Industrial Automation",
            "operatingSystem": "Yocto Linux, Avocado OS"
          })}
        </script>
      </Head>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <h1 className={styles.heroTitle}>
                Production-Ready <span className={styles.highlight}>Raspberry Pi</span> Deployment
              </h1>
              <p className={styles.heroSubtitle}>
                Transform your Raspberry Pi prototype into a secure, manageable fleet with Peridio + Avocado OS
              </p>
              <div className={styles.heroStats}>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>5x</span>
                  <span className={styles.statLabel}>Faster to Production</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>80%</span>
                  <span className={styles.statLabel}>Lower TCO</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>$35</span>
                  <span className={styles.statLabel}>Starting Cost</span>
                </div>
              </div>
              <div className={styles.heroCta}>
                <Link to="/evk" className={styles.ctaPrimary}>
                  Start Free Demo →
                </Link>
                <Link to="/platform/reference/overview" className={styles.ctaSecondary}>
                  View Documentation
                </Link>
              </div>
            </div>
            <div className={styles.heroImage}>
              <img 
                src="/img/raspberry-pi.jpg" 
                alt="Raspberry Pi development board" 
                className={styles.productImage}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className={styles.problemSolution}>
        <div className={styles.container}>
          <div className={styles.problem}>
            <h2>The Raspberry Pi Production Gap</h2>
            <ul className={styles.problemList}>
              <li>Prototypes work great, production deployment fails</li>
              <li>SD card corruption in industrial environments</li>
              <li>No secure OTA update mechanism</li>
              <li>Manual fleet management doesn&apos;t scale</li>
              <li>Security vulnerabilities in default OS</li>
            </ul>
          </div>
          <div className={styles.solution}>
            <h2>Peridio + Avocado OS Solution</h2>
            <ul className={styles.solutionList}>
              <li>Production-hardened Linux OS</li>
              <li>Read-only root with atomic updates</li>
              <li>Enterprise OTA orchestration</li>
              <li>Centralized fleet management</li>
              <li>Built-in security compliance</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className={styles.features}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Why Choose Peridio for Raspberry Pi</h2>
          <div className={styles.featureGrid}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🛡️</div>
              <h3>Production Hardening</h3>
              <p>Read-only root filesystem, secure boot, and A/B partitioning eliminate SD card corruption and failed updates.</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>📡</div>
              <h3>Fleet-Scale OTA</h3>
              <p>Deploy updates to thousands of devices with phased rollouts, rollback capabilities, and real-time monitoring.</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🔒</div>
              <h3>Zero-Trust Security</h3>
              <p>Code signing, device certificates, and encrypted communication secure your entire fleet from day one.</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>⚡</div>
              <h3>Rapid Development</h3>
              <p>Pre-built Yocto layers and containerized applications accelerate your time-to-market from months to weeks.</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🌐</div>
              <h3>Cross-Platform Ready</h3>
              <p>Develop on Pi, deploy across ARM architectures. Reuse software stacks on industrial SoCs when you scale.</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>📊</div>
              <h3>Fleet Intelligence</h3>
              <p>Real-time telemetry, remote diagnostics, and predictive maintenance keep your devices healthy and operational.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Hardware Specs */}
      <section className={styles.specs}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Raspberry Pi Platform Support</h2>
          <div className={styles.specsTable}>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>Raspberry Pi 5</div>
              <div className={styles.specValue}>2.4GHz Quad-core ARM Cortex-A76</div>
              <div className={styles.specNote}>8GB RAM, PCIe 2.0, dual 4K displays</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>Raspberry Pi 4</div>
              <div className={styles.specValue}>1.8GHz Quad-core ARM Cortex-A72</div>
              <div className={styles.specNote}>8GB RAM, USB 3.0, Gigabit Ethernet</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>Raspberry Pi Zero 2W</div>
              <div className={styles.specValue}>1GHz Quad-core ARM Cortex-A53</div>
              <div className={styles.specNote}>512MB RAM, WiFi/Bluetooth, ultra-compact</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>Compute Module 4</div>
              <div className={styles.specValue}>Industrial form factor</div>
              <div className={styles.specNote}>Custom carrier boards, extended temperature</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>Storage</div>
              <div className={styles.specValue}>eMMC, NVMe, USB boot</div>
              <div className={styles.specNote}>SD cards supported for development only</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>Operating Temp</div>
              <div className={styles.specValue}>0°C to +70°C (standard)</div>
              <div className={styles.specNote}>Industrial variants available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className={styles.useCases}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Production Use Cases</h2>
          <div className={styles.useCaseGrid}>
            <div className={styles.useCase}>
              <img src="/img/factory-quality-inspection.png" alt="Industrial IoT Sensors" className={styles.useCaseImage} />
              <h3>Industrial IoT Sensors</h3>
              <p>Environmental monitoring, predictive maintenance, and quality control with secure data collection and edge processing.</p>
            </div>
            <div className={styles.useCase}>
              <img src="/img/traffic-flow-optimization.png" alt="Smart City Infrastructure" className={styles.useCaseImage} />
              <h3>Smart City Infrastructure</h3>
              <p>Traffic monitoring, air quality sensors, and smart lighting with centralized management and real-time updates.</p>
            </div>
            <div className={styles.useCase}>
              <img src="/img/environmental-inspection.png" alt="Digital Signage" className={styles.useCaseImage} />
              <h3>Digital Signage & Kiosks</h3>
              <p>Retail displays, information kiosks, and interactive installations with content management and remote monitoring.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2>Ready to Scale Your Raspberry Pi Project?</h2>
            <p>Transform your Raspberry Pi prototype into a secure, manageable production fleet with enterprise-grade reliability.</p>
            <div className={styles.ctaButtons}>
              <Link to="/evk" className={styles.ctaPrimary}>
                Start Free Demo
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
          <h2 className={styles.sectionTitle}>Documentation & Resources</h2>
          <div className={styles.resourceGrid}>
            <Link to="/integration/linux/reference-designs/raspberrypi5/overview" className={styles.resourceCard}>
              <h3>Raspberry Pi 5 Guide</h3>
              <p>Complete setup and configuration guide for Raspberry Pi 5 with Avocado OS</p>
              <span className={styles.resourceArrow}>→</span>
            </Link>
            <Link to="/integration/linux/reference-designs/raspberrypi4/overview" className={styles.resourceCard}>
              <h3>Raspberry Pi 4 Guide</h3>
              <p>Production deployment guide for Raspberry Pi 4 with enterprise features</p>
              <span className={styles.resourceArrow}>→</span>
            </Link>
            <Link to="/platform/reference/overview" className={styles.resourceCard}>
              <h3>Fleet Management</h3>
              <p>Learn how to manage thousands of Raspberry Pi devices at scale</p>
              <span className={styles.resourceArrow}>→</span>
            </Link>
            <Link to="/integration/linux/build-tools/yocto" className={styles.resourceCard}>
              <h3>Custom OS Build</h3>
              <p>Build custom Yocto images for your specific Raspberry Pi application</p>
              <span className={styles.resourceArrow}>→</span>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}