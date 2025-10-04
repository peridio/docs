import { SolutionData } from './types'

export const seeedReterminalData: SolutionData = {
  title: 'Seeed reTerminal Industrial HMI | Raspberry Pi CM4',
  description:
    'Deploy Seeed reTerminal industrial HMI with Raspberry Pi CM4, 5-inch touchscreen, and enterprise fleet management. Production-ready edge computing.',
  keywords:
    'seeed reterminal, raspberry pi cm4, industrial hmi, touchscreen, edge computing, fleet management',
  ogImage: '/img/reterminal.jpg',
  canonicalUrl: 'https://docs.peridio.com/solutions/seeed',

  hero: {
    title: 'Industrial HMI with Seeed reTerminal',
    highlight: 'Seeed reTerminal',
    subtitle:
      'Production-Ready Yocto Linux for reTerminal in Days, Not Months. Build industrial HMI applications with the security and scalability of Yocto, plus the rapid development cycles your team needs.',
    stats: [
      { value: '5"', label: 'IPS Touchscreen' },
      { value: '1.5GHz', label: 'Quad-Core ARM' },
      { value: 'IP64', label: 'Front Panel' },
      { value: '<30s', label: 'Cold boot to UI' },
      { value: '1000+', label: 'Fleet scalability' },
      { value: '7yr', label: 'Avocado OS LTS' },
    ],
    primaryCTA: {
      text: 'Request Demo',
      link: 'https://peridio.com/book-a-meeting',
    },
    image: '/img/hardware/seeed/seeed_reterminal.png',
    imageAlt: 'Seeed reTerminal industrial HMI',
  },

  valueProposition: {
    title: 'Solution Overview',
    content:
      "Avocado OS gives teams the ability to build production-grade applications on the Seeed reTerminal with the security and scalability guarantees provided by Yocto Linux, but with the immediate feedback loops that developers need. Start building UIs and application code in under 10 minutes with our turnkey development environment - no months of BSP configuration or toolchain setup required. This complete platform combines the Raspberry Pi CM4's computing power with production-hardened Linux, atomic OTA updates, and enterprise fleet management. Deploy your first device in days, not months, while maintaining the deterministic behavior and long-term support essential for industrial applications. Whether you're building machine interfaces, building automation systems, or edge AI applications, Avocado OS and Peridio transform the reTerminal from a development board into a production-ready platform that scales from prototype to thousands of devices.",
    videoUrl: 'https://www.youtube.com/embed/2jujJtewuPw?start=450',
  },

  specs: [
    {
      label: 'Processor',
      value: 'Raspberry Pi CM4',
      note: 'Quad-core Cortex-A72 @ 1.5GHz',
    },
    {
      label: 'Display',
      value: '5-inch IPS LCD',
      note: '1280x720, 10-point multi-touch',
    },
    {
      label: 'Memory',
      value: '2/4/8GB LPDDR4',
      note: 'Up to 32GB eMMC storage',
    },
    {
      label: 'Connectivity',
      value: 'WiFi 5 + BT 5.0',
      note: 'Gigabit Ethernet, dual USB',
    },
    {
      label: 'Expansion',
      value: '40-pin GPIO',
      note: 'Compatible with reTerminal E10-1 modules',
    },
    {
      label: 'Operating Temp',
      value: '0°C to +50°C',
      note: 'Industrial-grade components',
    },
  ],

  useCases: [
    {
      title: 'Machine Control Interface',
      description:
        'Real-time PLC Integration with responsive multi-touch interface. Optimized UI rendering for smooth operator interactions. Native Modbus RTU/TCP, OPC UA, and MQTT support through Avocado OS.',
      image: '/img/use-cases/machine-control-interface.png',
    },
    {
      title: 'Building Automation',
      description:
        'Multi-site HVAC/BMS deployment with centralized management. Deploy identical HMI configurations across facilities with group-based fleet management. Node-RED visual programming with pre-built automation blocks.',
      image: '/img/use-cases/building-automation.png',
    },
    {
      title: 'Edge IoT Gateway',
      description:
        'Process 10,000+ sensor messages/sec at the edge with local data aggregation and filtering. LoRaWAN and Zigbee expansion modules for wireless sensor networks. Real-time visualization with sub-second latency.',
      image: '/img/use-cases/edge-iot-gateway.png',
    },
  ],

  challenges: [
    'Weeks to configure each HMI manually with custom SD card images',
    'No rollback when UI updates fail in production',
    'Consumer-grade OS unsuitable for 24/7 industrial operation',
    'Custom BSP development for each deployment scenario',
    'No centralized visibility across distributed HMI fleets',
  ],

  solutions: [
    'Deploy 100s of HMIs in hours with zero-touch provisioning',
    'Atomic updates with instant rollback on failure',
    'Industrial Linux with real-time kernel and 7-year support',
    'Pre-integrated BSP with optimized display drivers out-of-the-box',
    'Single dashboard for monitoring and managing entire fleet',
  ],

  features: [
    {
      icon: 'DeviceTablet',
      title: 'Avocado OS - Production Linux for reTerminal',
      description:
        'Deterministic Yocto Linux optimized for reTerminal and Raspberry Pi CM4. Pre-integrated Qt 6, Flutter, and LVGL UI frameworks. Wayland compositor optimized for IPS multi-touch display performance.',
    },
    {
      icon: 'CpuChip',
      title: 'Day 1 Production Ready',
      description:
        'Skip months of BSP development with pre-integrated Raspberry Pi CM4 support. Optimized drivers for the IPS multi-touch display and wireless connectivity. Real-time kernel patches for deterministic performance in industrial environments.',
    },
    {
      icon: 'ShieldCheck',
      title: 'Enterprise Security & Compliance',
      description:
        'Secure boot chain from bootloader to application. Encrypted storage with TPM 2.0 support. SBOM generation for supply chain compliance. Kiosk mode with lockdown policies for operator terminals.',
    },
    {
      icon: 'GlobeAlt',
      title: 'Fleet-Scale Operations',
      description:
        'Manage 1000+ reTerminals from a single dashboard. Phased rollouts with automatic rollback on failure. Group-based configuration for site-specific settings. Real-time health monitoring and alerting.',
    },
    {
      icon: 'CommandLine',
      title: 'Industrial Protocol Suite',
      description:
        'Native Modbus RTU/TCP with optimized response times. OPC UA server/client with security profiles. MQTT 5.0 with QoS and retained messages. Pre-built Node-RED flows for common automation patterns.',
    },
    {
      icon: 'WrenchScrewdriver',
      title: 'Developer Acceleration',
      description:
        'Hardware-in-the-loop development reduces iteration from weeks to hours. Remote debugging with full stack traces. Performance profiling for UI and system optimization. Cross-compilation SDK for CI/CD pipelines.',
    },
  ],

  cta: {
    title: 'Ready to Deploy reTerminal at Scale?',
    subtitle:
      'Transform your Seeed reTerminal HMIs into a production fleet. Get deterministic Linux, secure OTA orchestration, and enterprise fleet management - all production-ready from Day 1.',
    primaryCTA: {
      text: 'Request a Demo',
      link: 'https://peridio.com/book-a-meeting',
      target: '_blank',
    },
  },

  workInProgress: {
    title: 'Provisioning Guide Coming Soon',
    message:
      "We're actively working on a comprehensive provisioning guide for the Seeed reTerminal. This will include step-by-step instructions for device setup, configuration, and deployment.",
    type: 'provisioning',
  },
}

export default seeedReterminalData
