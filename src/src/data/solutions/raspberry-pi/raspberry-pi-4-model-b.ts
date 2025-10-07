import { SolutionData } from '../types'

export const data: SolutionData = {
  title: 'Raspberry Pi 4 Model B Device Management | Production-Ready OTA',
  description:
    'Deploy Raspberry Pi 4 Model B devices in production with Peridio Fleet + Avocado OS. Yocto-based, secure OTA updates, enterprise support for IoT and edge computing.',
  keywords:
    'raspberry pi 4 model b, device management, ota updates, yocto, embedded linux, iot, edge computing, fleet management',
  ogImage: '/img/raspberry-pi.jpg',
  canonicalUrl: 'https://docs.peridio.com/solutions/raspberry-pi/raspberry-pi',

  hero: {
    title: 'Production-Ready Raspberry Pi 4 Model B Deployment',
    highlight: 'Raspberry Pi 4 Model B',
    subtitle:
      'Transform your Raspberry Pi 4 Model B prototype into a secure, manageable fleet with Peridio + Avocado OS',
    stats: [
      { value: '5x', label: 'Faster to Production' },
      { value: '80%', label: 'Lower TCO' },
      { value: '$55', label: 'Starting Cost' },
    ],
    primaryCTA: {
      text: 'Get Started',
      link: '/hardware/raspberry-pi/raspberry-pi-4-model-b/provision',
    },
    secondaryCTA: {
      text: 'Request Demo',
      link: 'https://peridio.com/book-a-meeting',
    },
    image: '/img/hardware/raspberry-pi/raspberrypi4.png',
    imageAlt: 'Raspberry Pi 4 Model B development board',
  },

  valueProposition: {
    title: 'Solution Overview',
    content:
      "Raspberry Pi 4 Model B, enhanced with Avocado Linux and Peridio Fleet, bridges the gap between prototype and production deployment for edge computing and IoT applications. This integrated solution transforms the proven ARM Cortex-A72 quad-core platform into an enterprise-ready device with production-hardened Linux, atomic OTA updates, and centralized fleet management. By replacing the default Raspberry Pi OS with a Yocto-based, read-only root filesystem, teams eliminate common production issues like SD card corruption while gaining secure boot, remote diagnostics, and compliance features. Whether deploying industrial sensors, smart city infrastructure, or digital signage networks, the Pi 4's mature hardware platform with up to 8GB RAM, Gigabit Ethernet, and USB 3.0 provides the reliability and performance needed for production deployments while maintaining the $55 price point and vast ecosystem compatibility.",
  },

  specs: [
    {
      label: 'Processor',
      value: '1.8GHz Quad-core ARM Cortex-A72',
      note: '64-bit ARMv8 architecture, mature silicon',
    },
    {
      label: 'Memory',
      value: '2GB, 4GB, or 8GB LPDDR4',
      note: 'LPDDR4-3200 SDRAM for reliable performance',
    },
    {
      label: 'Connectivity',
      value: 'Gigabit Ethernet, Wi-Fi 5, Bluetooth 5.0',
      note: 'Dual-band 802.11ac, proven network stack',
    },
    {
      label: 'USB Ports',
      value: '2x USB 3.0, 2x USB 2.0',
      note: 'High-speed peripherals and storage',
    },
    {
      label: 'Display',
      value: '2× micro HDMI ports (up to 4K@60Hz)',
      note: '4K@60Hz on single display or dual 4K@30Hz',
    },
    {
      label: 'Storage',
      value: 'eMMC, USB boot, microSD',
      note: 'USB boot recommended for production',
    },
    {
      label: 'Power',
      value: '5V/3A USB-C',
      note: '15W maximum power consumption',
    },
    {
      label: 'Operating Temp',
      value: '0°C to +50°C (ambient)',
      note: 'Passive cooling sufficient for most applications',
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
    title: 'Ready to Scale Your Raspberry Pi 4 Model B Project?',
    subtitle:
      'Transform your Raspberry Pi 4 Model B prototype into a secure, manageable production fleet with enterprise-grade reliability.',
    primaryCTA: {
      text: 'Get Started',
      link: '/hardware/raspberry-pi/raspberry-pi-4-model-b/provision',
    },
    // secondaryCTA: {
    //   text: 'Learn More',
    //   link: 'https://avocadolinux.org',
    //   target: '_blank',
    // },
  },
}

export const raspberryPi4ModelBData = data
export default data
