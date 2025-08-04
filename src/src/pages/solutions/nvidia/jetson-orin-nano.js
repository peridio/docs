import React from 'react'
import Layout from '@theme/Layout'
import Head from '@docusaurus/Head'
import Link from '@docusaurus/Link'
import styles from './jetson-orin-nano.module.css'

export default function JetsonOrinNanoSolution() {
  return (
    <Layout>
      <Head>
        <title>NVIDIA Jetson Orin Nano Device Management | Production-Ready OTA | Peridio</title>
        <meta 
          name="description" 
          content="Deploy NVIDIA Jetson Orin Nano in production 4x faster with Peridio Fleet + Avocado OS. Yocto-based, secure OTA updates, enterprise support for industrial AI." 
        />
        <meta name="keywords" content="nvidia jetson orin nano, device management, ota updates, yocto, embedded linux, industrial ai, robotics, fleet management" />
        <meta property="og:title" content="NVIDIA Jetson Orin Nano Device Management | Production-Ready OTA | Peridio" />
        <meta property="og:description" content="Deploy NVIDIA Jetson Orin Nano in production 4x faster with Peridio Fleet + Avocado OS. Yocto-based, secure OTA updates, enterprise support." />
        <meta property="og:image" content="/img/nvidia-jetson-orin.jpg" />
        <meta property="og:type" content="product" />
        <link rel="canonical" href="https://docs.peridio.com/solutions/nvidia/jetson-orin-nano" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Peridio + Avocado OS for NVIDIA Jetson Orin Nano",
            "description": "Production-ready device management and OTA updates for NVIDIA Jetson Orin Nano with Yocto-based embedded Linux",
            "manufacturer": {
              "@type": "Organization",
              "name": "Peridio"
            },
            "category": "Device Management Software",
            "offers": {
              "@type": "Offer",
              "availability": "https://schema.org/InStock"
            },
            "applicationCategory": "Industrial AI, Robotics, Edge Computing",
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
                Skip 18 Months of <span className={styles.highlight}>Jetson Development</span>
              </h1>
              <p className={styles.heroSubtitle}>
                Production-ready NVIDIA Jetson Orin Nano deployment in 4 months with Peridio Fleet + Avocado OS
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
                  <span className={styles.statNumber}>67</span>
                  <span className={styles.statLabel}>TOPS AI Performance</span>
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
                src="/img/nvidia-jetson-orin.jpg" 
                alt="NVIDIA Jetson Orin Nano development kit" 
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
            <h2>The Jetson Production Challenge</h2>
            <ul className={styles.problemList}>
              <li>Developer kits aren't production-ready</li>
              <li>Custom Yocto builds take 6-18 months</li>
              <li>OTA infrastructure requires dedicated teams</li>
              <li>Security compliance adds complexity</li>
              <li>Fleet management built from scratch</li>
            </ul>
          </div>
          <div className={styles.solution}>
            <h2>Peridio + Avocado OS Solution</h2>
            <ul className={styles.solutionList}>
              <li>Production-ready OS in minutes</li>
              <li>Pre-integrated Jetson BSPs</li>
              <li>Enterprise OTA orchestration</li>
              <li>Built-in security compliance</li>
              <li>Managed fleet operations</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className={styles.features}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Why Choose Peridio for Jetson Development</h2>
          <div className={styles.featureGrid}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🚀</div>
              <h3>Rapid Deployment</h3>
              <p>Boot deterministic Linux on Jetson in minutes. Hardware-in-the-loop tools reduce iteration from weeks to hours.</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🔒</div>
              <h3>Production Security</h3>
              <p>Secure boot, dm-verity, and LUKS encryption across all architectures. Reproducible images simplify certification.</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>📡</div>
              <h3>Fleet Management</h3>
              <p>Register and manage devices in Peridio Fleet. Phased releases, cohort targeting, SBOM, and CVE patching.</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🔧</div>
              <h3>Composable Architecture</h3>
              <p>Build systems using modular layers and standard secure components. Avoid the fragility of DIY Yocto.</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🌐</div>
              <h3>Cross-Platform</h3>
              <p>Reuse Avocado OS layers across ARM/NPU SoCs (Qualcomm Rubik Pi 3, MediaTek Genio, NXP i.MX8MP).</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🛡️</div>
              <h3>Long-term Support</h3>
              <p>10+ years of kernel/security maintenance. Combined with Jetson's industrial lifecycle ensures device longevity.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Hardware Specs */}
      <section className={styles.specs}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Jetson Orin Nano Hardware Highlights</h2>
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
              <div className={styles.specLabel}>Operating Temp</div>
              <div className={styles.specValue}>-40°C to +70°C</div>
              <div className={styles.specNote}>Rugged industrial environments</div>
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
              <img src="/img/pedestrian-monitoring.png" alt="Industrial Smart Cameras" className={styles.useCaseImage} />
              <h3>Industrial Smart Cameras</h3>
              <p>Multi-camera CSI input for AI tasks like object detection and quality inspection. OTA supports model updates in production.</p>
            </div>
            <div className={styles.useCase}>
              <img src="/img/traffic-flow-optimization.png" alt="Autonomous Mobile Robots" className={styles.useCaseImage} />
              <h3>Autonomous Mobile Robots</h3>
              <p>Real-time sensor fusion and navigation processing. Avocado OS supports ROS2 and containers with scalable fleet rollouts.</p>
            </div>
            <div className={styles.useCase}>
              <img src="/img/workplace-safety.png" alt="Edge AI Gateways" className={styles.useCaseImage} />
              <h3>Edge AI Gateways</h3>
              <p>Run generative AI or LLMs locally with NVMe and optional 10-GbE. Managed Linux keeps them secure in harsh environments.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2>Ready to Accelerate Your Jetson Development?</h2>
            <p>Transform your NVIDIA Jetson Orin Nano from developer kit to secure, deployable industrial AI platform.</p>
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
            <Link to="/integration/linux/build-tools/yocto" className={styles.resourceCard}>
              <h3>Yocto Integration Guide</h3>
              <p>Step-by-step Yocto build configuration for Jetson Orin Nano</p>
              <span className={styles.resourceArrow}>→</span>
            </Link>
            <Link to="/platform/reference/overview" className={styles.resourceCard}>
              <h3>Device Security</h3>
              <p>Device certificates, secure boot, and fleet security management</p>
              <span className={styles.resourceArrow}>→</span>
            </Link>
            <Link to="/platform/reference/overview" className={styles.resourceCard}>
              <h3>Platform Overview</h3>
              <p>Complete Peridio platform architecture and capabilities</p>
              <span className={styles.resourceArrow}>→</span>
            </Link>
            <Link to="/admin-api" className={styles.resourceCard}>
              <h3>API Documentation</h3>
              <p>REST API and GraphQL integration for fleet management</p>
              <span className={styles.resourceArrow}>→</span>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}