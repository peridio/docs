import { SolutionData } from '../types'

export const data: SolutionData = {
  title: 'Raspberry Pi 5 Device Management | Production-Ready OTA',
  description:
    'Deploy Raspberry Pi 5 devices in production with Peridio Fleet + Avocado OS. Yocto-based, secure OTA updates, enterprise support for IoT and edge computing.',
  keywords:
    'raspberry pi 5, device management, ota updates, yocto, embedded linux, iot, edge computing, fleet management',
  ogImage: '/img/raspberry-pi.jpg',
  canonicalUrl: 'https://docs.peridio.com/solutions/raspberry-pi/raspberry-pi',

  hero: {
    title: 'Production-Ready Raspberry Pi 5 Deployment',
    highlight: 'Raspberry Pi 5',
    subtitle:
      'Transform your Raspberry Pi 5 prototype into a secure, manageable fleet with Peridio + Avocado OS',
    stats: [
      { value: '5x', label: 'Faster to Production' },
      { value: '80%', label: 'Lower TCO' },
      { value: '$60', label: 'Starting Cost' },
    ],
    primaryCTA: {
      text: 'Get Started',
      link: '/hardware/raspberry-pi/raspberry-pi-5/provision',
    },
    secondaryCTA: {
      text: 'Request Demo',
      link: 'https://peridio.com/book-a-meeting',
    },
    image: '/img/hardware/raspberry-pi/raspberrypi.png',
    imageAlt: 'Raspberry Pi 5 development board',
  },

  valueProposition: {
    title: 'Solution Overview',
    content:
      "Raspberry Pi 5, enhanced with Avocado Linux and Peridio Fleet, represents the cutting-edge of single-board computer deployment for edge computing and IoT applications. This integrated solution harnesses the Pi 5's powerful 2.4GHz quad-core ARM Cortex-A76 processor and advanced features like PCIe 2.0 connectivity to create an enterprise-ready platform with production-hardened Linux, atomic OTA updates, and centralized fleet management. By replacing the default Raspberry Pi OS with a Yocto-based, read-only root filesystem, teams eliminate common production issues while gaining secure boot, remote diagnostics, and compliance features. Whether deploying AI-powered edge computing, high-resolution digital signage, or advanced IoT gateways, the Pi 5's next-generation performance with dual 4K@60fps displays, faster I/O, and enhanced processing power enables organizations to build sophisticated applications while maintaining the $60 price point and vast ecosystem compatibility.",
  },

  specs: [
    {
      label: 'Processor',
      value: '2.4GHz Quad-core ARM Cortex-A76',
      note: '64-bit ARMv8.2 architecture, 2-3x Pi 4 performance',
    },
    {
      label: 'Memory',
      value: '4GB or 8GB LPDDR4X',
      note: 'LPDDR4X-4267 SDRAM for maximum throughput',
    },
    {
      label: 'Connectivity',
      value: 'Gigabit Ethernet, Wi-Fi 5, Bluetooth 5.0',
      note: 'Dual-band 802.11ac, enhanced antenna design',
    },
    {
      label: 'PCIe',
      value: 'PCIe 2.0 x1 interface',
      note: 'NVMe SSDs, HAT+ expansion, high-speed peripherals',
    },
    {
      label: 'Display',
      value: 'Dual 4K@60Hz HDMI outputs',
      note: 'HDMI 2.1 with HDR support, enhanced graphics',
    },
    {
      label: 'USB Ports',
      value: '2x USB 3.0, 2x USB 2.0',
      note: 'Improved USB stack and power delivery',
    },
    {
      label: 'Storage',
      value: 'NVMe via PCIe, USB boot, microSD',
      note: 'Native NVMe support for enterprise storage',
    },
    {
      label: 'Power',
      value: '5V/5A USB-C with PD support',
      note: '25W maximum power, active cooling recommended',
    },
  ],

  useCases: [
    {
      title: 'Industrial IoT Sensors',
      description:
        'Environmental monitoring, predictive maintenance, and quality control with secure data collection and edge processing.',
      image: '/img/use-cases/industrial-sensor-hub.png',
      imageAlt: 'Industrial IoT Sensors',
    },
    {
      title: 'Smart City Infrastructure',
      description:
        'Traffic monitoring, air quality sensors, and smart lighting with centralized management and real-time updates.',
      image: '/img/use-cases/traffic-flow-optimization.png',
      imageAlt: 'Smart City Infrastructure',
    },
    {
      title: 'Digital Signage & Kiosks',
      description:
        'Retail displays, information kiosks, and interactive installations with content management and remote monitoring.',
      image: '/img/use-cases/digital-signage-kiosks.png',
      imageAlt: 'Digital Signage & Kiosks',
    },
  ],

  challenges: [
    'Prototypes work great, production deployment fails',
    'SD card corruption in industrial environments',
    'No secure OTA update mechanism',
    "Manual fleet management doesn't scale",
    'Security vulnerabilities in default OS',
  ],

  solutions: [
    'Production-hardened Linux OS',
    'Read-only root with atomic updates',
    'Enterprise OTA orchestration',
    'Centralized fleet management',
    'Built-in security compliance',
  ],

  features: [
    {
      icon: 'ShieldCheck',
      title: 'Production Hardening',
      description:
        'Read-only root filesystem, secure boot, and A/B partitioning eliminate SD card corruption and failed updates.',
    },
    {
      icon: 'GlobeAlt',
      title: 'Fleet-Scale OTA',
      description:
        'Deploy updates to thousands of devices with phased rollouts, rollback capabilities, and real-time monitoring.',
    },
    {
      icon: 'ShieldCheck',
      title: 'Zero-Trust Security',
      description:
        'Code signing, device certificates, and encrypted communication secure your entire fleet from day one.',
    },
    {
      icon: 'Bolt',
      title: 'Rapid Development',
      description:
        'Pre-built Yocto layers and containerized applications accelerate your time-to-market from months to weeks.',
    },
    {
      icon: 'GlobeAlt',
      title: 'Cross-Platform Ready',
      description:
        'Develop on Pi, deploy across ARM architectures. Reuse software stacks on industrial SoCs when you scale.',
    },
    {
      icon: 'CommandLine',
      title: 'Fleet Intelligence',
      description:
        'Real-time telemetry, remote diagnostics, and predictive maintenance keep your devices healthy and operational.',
    },
  ],

  cta: {
    title: 'Ready to Scale Your Raspberry Pi 5 Project?',
    subtitle:
      'Transform your Raspberry Pi 5 prototype into a secure, manageable production fleet with enterprise-grade reliability.',
    primaryCTA: {
      text: 'Get Started',
      link: '/hardware/raspberry-pi/raspberry-pi-5/provision',
    },
    // secondaryCTA: {
    //   text: 'Learn More',
    //   link: 'https://avocadolinux.org',
    //   target: '_blank',
    // },
  },
}

export const raspberryPi5Data = data
export default data
