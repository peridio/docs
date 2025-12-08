import { SolutionData } from '../types'

export const data: SolutionData = {
  title: 'OnLogic FR201 Industrial Gateway | Production-Ready Edge Computing',
  description:
    'Deploy OnLogic FR201 fanless industrial gateways with atomic updates, protocol bridging, and enterprise fleet management. Production-ready software on industrial grade hardware.',
  keywords:
    'onlogic fr201, industrial gateway, fanless pc, protocol bridge, atomic updates, fleet management, modbus, opc-ua',
  ogImage: '/img/FR201.png',
  canonicalUrl: 'https://docs.peridio.com/solutions/onlogic',

  hero: {
    title: 'Production-Ready Software on Industrial Grade Hardware',
    highlight: 'Industrial Grade Hardware',
    subtitle:
      'Transform your OnLogic FR201 from development platform to production gateway with enterprise-grade Linux deployment',
    stats: [
      { value: 'Fanless', label: 'Silent Operation' },
      { value: '-20°C to +60°C', label: 'Wide Temperature Range' },
      { value: '6x Faster', label: 'Time to Production' },
    ],
    primaryCTA: {
      text: 'Request Demo',
      link: 'https://peridio.com/book-a-meeting',
    },
    image: '/img/hardware/onlogic/OnLogic-FR201.png',
    imageAlt: 'OnLogic FR201 fanless industrial PC',
  },

  valueProposition: {
    title: 'Solution Overview',
    content:
      "OnLogic's FR201, powered by Avocado Linux and Peridio Core, becomes a production-ready gateway platform with enterprise-grade OTA updates and centralized fleet management. This partnership addresses hardware obsolescence, helps right-size deployments for optimal ROI, and supports a wide range of industrial use cases from manufacturing to transportation. Together, OnLogic and Peridio enable secure, scalable edge infrastructure that can move from prototype to large-scale deployment in weeks instead of months. The result is a proven hardware-software foundation designed to operate for years with 99.9% uptime and automatic rollback protection.",
  },

  specs: [
    {
      label: 'Processor',
      value: 'Raspberry Pi CM4 - Broadcom BCM2711 Cortex-A72 (ARM v8)',
      note: 'Quad-core 64-bit ARM processor for efficient protocol handling',
    },
    {
      label: 'Memory',
      value: 'Up to 8GB LPDDR4-3200',
      note: 'High-bandwidth memory for data buffering and processing',
    },
    {
      label: 'Storage',
      value: 'eMMC (up to 32GB) + M.2 SATA (up to 2TB)',
      note: 'Dual storage options for OS and data separation',
    },
    {
      label: 'Networking',
      value: 'Dual GbE LAN + Optional WiFi 802.11ac',
      note: 'Redundant connectivity with wireless backup',
    },
    {
      label: 'I/O Expansion',
      value: 'USB 3.2, 2x USB 2.0, RS-232/422/485, GPIO',
      note: 'Industrial-grade connectivity for sensors and equipment',
    },
    {
      label: 'Operating Temp',
      value: '-20°C to +60°C',
      note: 'Fanless operation in harsh industrial environments',
    },
  ],

  useCases: [
    {
      title: 'Factory Data Aggregation',
      description:
        'Consolidate data from PLCs, sensors, and SCADA systems. Process and filter industrial protocols before cloud transmission with built-in security.',
      image: '/img/use-cases/edge-iot-gateway.png',
    },
    {
      title: 'Remote Site Management',
      description:
        'Manage distributed industrial equipment with secure remote access tunnels. Monitor system health and perform maintenance without site visits.',
      image: '/img/use-cases/ml-inference-server.png',
    },
    {
      title: 'Protocol Bridge Gateway',
      description:
        'Convert between industrial protocols (Modbus, OPC-UA, CAN) and modern APIs. Enable legacy equipment integration with cloud platforms.',
      image: '/img/use-cases/industrial-sensor-hub.png',
    },
  ],

  challenges: [
    '18-month custom Linux builds for production deployment',
    "Manual on-site updates that don't scale across sites",
    'Complex integration of industrial protocols and security',
    'Vendor lock-in with proprietary gateway solutions',
    'No remote diagnostics when systems fail in the field',
  ],

  solutions: [
    'Production-ready in weeks with pre-built industrial BSPs',
    'Atomic OTA updates with automatic rollback protection',
    'Built-in protocol support for Modbus, OPC-UA, and CAN',
    'Cross-platform deployment - same software, any hardware',
    'Enterprise remote diagnostics with secure tunnel access',
  ],

  features: [
    {
      icon: 'ServerStack',
      title: 'Production-Ready from Day One',
      description:
        'Pre-hardened Linux OS with read-only root filesystem, secure boot, and atomic updates. No prototype-to-production gap.',
    },
    {
      icon: 'Bolt',
      title: 'Atomic Update Architecture',
      description:
        'Zero-downtime updates with automatic rollback on failure. System integrity guaranteed with cryptographic verification and watchdog protection.',
    },
    {
      icon: 'GlobeAlt',
      title: 'Industrial-Grade Fleet Management',
      description:
        'Deploy and manage thousands of gateways across industrial sites. Site-specific configurations with centralized policy enforcement.',
    },
    {
      icon: 'WrenchScrewdriver',
      title: 'Cross-Platform Portability',
      description:
        'Develop on FR201, deploy across industrial hardware. Unified toolchain prevents vendor lock-in and reduces engineering overhead.',
    },
    {
      icon: 'ShieldCheck',
      title: 'Enterprise Security',
      description:
        'TPM 2.0 integration, full-disk encryption, and certificate-based authentication. Zero-trust architecture built for industrial environments.',
    },
    {
      icon: 'Fire',
      title: 'Hardware-Optimized Performance',
      description:
        'Thermal management optimizations for fanless operation. Automatic resource allocation and workload distribution for 24/7 uptime.',
    },
  ],

  cta: {
    title: 'Ready to Deploy Production-Ready Gateways?',
    subtitle:
      'Transform your OnLogic FR201 systems into a managed gateway fleet with atomic updates, remote diagnostics, and enterprise support.',
    primaryCTA: {
      text: 'Provision Guide',
      link: '/hardware/onlogic/fr201/provision',
    },
    secondaryCTA: {
      text: 'Request a Demo',
      link: 'https://peridio.com/book-a-meeting',
      target: '_blank',
    },
  },
}

export const onlogicData = data
export const onlogicFr201Data = data
export default data
