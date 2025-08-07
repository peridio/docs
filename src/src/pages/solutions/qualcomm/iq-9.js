import React from 'react'
import Layout from '@theme/Layout'
import Head from '@docusaurus/Head'
import Link from '@docusaurus/Link'
import styles from './iq-9.module.css'
import { 
  RocketLaunchIcon, 
  CpuChipIcon, 
  BoltIcon, 
  LockClosedIcon, 
  WifiIcon, 
  GlobeAltIcon,
  XMarkIcon,
  CheckIcon
} from '@heroicons/react/24/outline'

export default function IQ9Solution() {
  return (
    <Layout>
      <Head>
        <title>Qualcomm IQ-9 Premium Edge AI | Flagship Performance | Peridio</title>
        <meta 
          name="description" 
          content="Deploy Qualcomm IQ-9 (QCS8550) flagship edge AI platform with 45 TOPS performance. Production-ready with Peridio Fleet + Avocado OS for automotive and premium applications." 
        />
        <meta name="keywords" content="qualcomm iq-9, qcs8550, flagship edge ai, 45 tops, automotive ai, premium edge computing, device management, ota updates" />
        <meta property="og:title" content="Qualcomm IQ-9 Premium Edge AI | Flagship Performance | Peridio" />
        <meta property="og:description" content="Deploy Qualcomm IQ-9 flagship edge AI platform with 45 TOPS performance. Production-ready with Peridio Fleet + Avocado OS." />
        <meta property="og:image" content="/img/iq-9.jpeg" />
        <meta property="og:type" content="product" />
        <link rel="canonical" href="https://docs.peridio.com/solutions/qualcomm/iq-9" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Peridio + Avocado OS for Qualcomm IQ-9",
            "description": "Premium edge AI platform with flagship performance for automotive and high-performance applications",
            "manufacturer": {
              "@type": "Organization",
              "name": "Peridio"
            },
            "category": "Premium Edge AI Platform",
            "offers": {
              "@type": "Offer",
              "availability": "https://schema.org/InStock"
            },
            "applicationCategory": "Automotive AI, Premium Edge Computing, Advanced Manufacturing",
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
                <span className={styles.highlight}>Premium Edge AI</span> Performance with Qualcomm IQ-9
              </h1>
              <p className={styles.heroSubtitle}>
                Flagship-grade edge AI with 45 TOPS compute power, production-ready with Peridio Fleet + Avocado OS
              </p>
              <div className={styles.heroStats}>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>45</span>
                  <span className={styles.statLabel}>TOPS AI Performance</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>4nm</span>
                  <span className={styles.statLabel}>Premium Process</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>Wi-Fi 7</span>
                  <span className={styles.statLabel}>Next-Gen Connectivity</span>
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
                src="/img/Qualcomm-IQ9.png" 
                alt="Qualcomm IQ-9 QCS8550 development platform" 
                className={styles.productImage}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Hardware Specs */}
      <section className={styles.specs}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>IQ-9 Hardware Highlights</h2>
          <div className={styles.specsTable}>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>AI Performance</div>
              <div className={styles.specValue}>45 TOPS (INT8)</div>
              <div className={styles.specNote}>Flagship Hexagon NPU for multi-model inference</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>SoC</div>
              <div className={styles.specValue}>Qualcomm QCS8550</div>
              <div className={styles.specNote}>Premium 4nm process with advanced AI architecture</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>CPU</div>
              <div className={styles.specValue}>8-core Kryo (1×X3 @ 3.2GHz, 4×A715, 3×A510)</div>
              <div className={styles.specNote}>Flagship mobile CPU configuration</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>GPU</div>
              <div className={styles.specValue}>Adreno 740</div>
              <div className={styles.specNote}>Console-class graphics with compute support</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>Memory</div>
              <div className={styles.specValue}>Up to 16GB LPDDR5X</div>
              <div className={styles.specNote}>High-capacity for large AI models</div>
            </div>
            <div className={styles.specsRow}>
              <div className={styles.specLabel}>Connectivity</div>
              <div className={styles.specValue}>Wi-Fi 7, Bluetooth 5.3, 5G mmWave</div>
              <div className={styles.specNote}>Next-generation wireless connectivity</div>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Benchmarks */}
      <section className={styles.benchmarks}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Performance Benchmarks</h2>
          <div className={styles.benchmarkGrid}>
            <div className={styles.benchmark}>
              <h3>Multi-Model Inference</h3>
              <p>Simultaneously run object detection, semantic segmentation, and classification models</p>
            </div>
            <div className={styles.benchmark}>
              <h3>Real-Time Processing</h3>
              <p>8K video processing with AI overlay at 30fps</p>
            </div>
            <div className={styles.benchmark}>
              <h3>Thermal Performance</h3>
              <p>Sustained 45 TOPS performance with advanced thermal management</p>
            </div>
            <div className={styles.benchmark}>
              <h3>Memory Bandwidth</h3>
              <p>Up to 51.2 GB/s memory throughput for large model processing</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className={styles.useCases}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Premium Use Cases</h2>
          <div className={styles.useCaseGrid}>
            <div className={styles.useCase}>
              <img src="/img/traffic-flow-optimization.png" alt="Autonomous Vehicles" className={styles.useCaseImage} />
              <h3>Autonomous Vehicles</h3>
              <p>Real-time sensor fusion, object detection, and path planning with multiple AI models running simultaneously for ADAS and autonomous driving.</p>
            </div>
            <div className={styles.useCase}>
              <img src="/img/workplace-safety.png" alt="Advanced Manufacturing" className={styles.useCaseImage} />
              <h3>Advanced Manufacturing</h3>
              <p>High-speed quality inspection with multi-camera systems and complex AI models for defect detection and classification.</p>
            </div>
            <div className={styles.useCase}>
              <img src="/img/factory-quality-inspection.png" alt="Smart City Infrastructure" className={styles.useCaseImage} />
              <h3>Smart City Infrastructure</h3>
              <p>Multi-modal AI for traffic optimization, security monitoring, and environmental sensing with 5G coordination.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className={styles.problemSolution}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>From Challenge to Solution</h2>
            <p>Transform your IQ-9 development workflow with enterprise-grade infrastructure</p>
          </div>
          
          <div className={styles.comparisonContainer}>
            <div className={styles.challengeCard}>
              <div className={styles.cardHeader}>
                <div className={styles.challengeIcon}>
                  <XMarkIcon />
                </div>
                <h3>The Challenge</h3>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.challengeItem}>
                  <span className={styles.challengeText}>Complex flagship SoC integration</span>
                </div>
                <div className={styles.challengeItem}>
                  <span className={styles.challengeText}>Multi-model inference orchestration</span>
                </div>
                <div className={styles.challengeItem}>
                  <span className={styles.challengeText}>Thermal management at scale</span>
                </div>
                <div className={styles.challengeItem}>
                  <span className={styles.challengeText}>Enterprise-grade security requirements</span>
                </div>
                <div className={styles.challengeItem}>
                  <span className={styles.challengeText}>Long development cycles for premium platforms</span>
                </div>
              </div>
            </div>

            <div className={styles.solutionCard}>
              <div className={styles.cardHeader}>
                <div className={styles.solutionIcon}>
                  <CheckIcon />
                </div>
                <h3>The Solution</h3>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.solutionItem}>
                  <span className={styles.solutionText}>Fully optimized QCS8550 drivers</span>
                </div>
                <div className={styles.solutionItem}>
                  <span className={styles.solutionText}>Dynamic resource allocation</span>
                </div>
                <div className={styles.solutionItem}>
                  <span className={styles.solutionText}>Advanced thermal controls</span>
                </div>
                <div className={styles.solutionItem}>
                  <span className={styles.solutionText}>Hardware-backed security</span>
                </div>
                <div className={styles.solutionItem}>
                  <span className={styles.solutionText}>Rapid premium platform deployment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className={styles.features}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Why Choose Peridio for IQ-9 Development</h2>
          <div className={styles.featureGrid}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}><RocketLaunchIcon /></div>
              <h3>Flagship Optimization</h3>
              <p>Fully utilizes QCS8550's AI capabilities with optimized drivers for Hexagon NPU, Adreno GPU compute, and advanced ISP processing.</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}><CpuChipIcon /></div>
              <h3>Multi-Model Inference</h3>
              <p>Support for concurrent execution of multiple AI models with dynamic resource allocation and thermal management.</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}><BoltIcon /></div>
              <h3>Hardware Acceleration</h3>
              <p>Native integration with Qualcomm AI Engine Direct SDK for maximum performance and efficiency at flagship scale.</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}><LockClosedIcon /></div>
              <h3>Enterprise Security</h3>
              <p>Hardware-backed security with Qualcomm Secure Processing Unit, secure boot chain, and encrypted storage.</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}><WifiIcon /></div>
              <h3>Advanced Fleet Operations</h3>
              <p>Sophisticated device management with A/B update partitions, rollback protection, and remote diagnostics.</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}><GlobeAltIcon /></div>
              <h3>Future-Ready Connectivity</h3>
              <p>5G and Wi-Fi 7 support enables ultra-low latency edge-to-cloud coordination for premium applications.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2>Ready for Flagship Edge AI Performance?</h2>
            <p>Transform your Qualcomm IQ-9 into the ultimate edge AI platform for the most demanding applications requiring flagship performance and enterprise reliability.</p>
            <div className={styles.ctaButtons}>
              <Link to="/evk" className={styles.ctaPrimary}>
                Start Premium Demo
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
              <h3>Advanced Yocto Configuration</h3>
              <p>Flagship SoC optimization and multi-model inference setup for QCS8550</p>
            </Link>
            <Link to="/platform/reference/overview" className={styles.resourceCard}>
              <h3>Device Security</h3>
              <p>Enterprise security with device certificates and fleet management</p>
            </Link>
            <Link to="/platform/reference/overview" className={styles.resourceCard}>
              <h3>Premium Platform Features</h3>
              <p>Advanced fleet management and enterprise-grade device operations</p>
            </Link>
            <Link to="/admin-api" className={styles.resourceCard}>
              <h3>Advanced API Integration</h3>
              <p>REST API and GraphQL for sophisticated automotive and industrial applications</p>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}