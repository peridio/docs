import React from 'react'
import SolutionLayout from '@site/src/components/solutions/SolutionLayout'

const solutionData = {
  title: 'NXP FRDM i.MX 93 Edge AI Development | Industrial Linux | Peridio',
  description:
    'Production-ready NXP FRDM i.MX 93 development with dual Cortex-A55, Cortex-M33, Ethos U-65 NPU, and secure edge connectivity. Enterprise OTA and fleet management.',
  keywords:
    'nxp frdm imx93, i.mx 93, cortex-a55, edge ai, ethos u65, industrial linux, embedded, fleet management',
  ogImage: '/img/NXP-FRDM-93.png',
  canonicalUrl: 'https://docs.peridio.com/solutions/nxp/frdm-93',

  hero: {
    title: 'Edge AI Development with NXP FRDM i.MX 93',
    highlight: 'NXP FRDM i.MX 93',
    subtitle:
      'Dual Cortex-A55 + Cortex-M33 heterogeneous platform with Ethos U-65 NPU, EdgeLock secure enclave, and industrial connectivity for edge AI applications',
    stats: [
      { value: '1.7GHz', label: 'Dual Cortex-A55' },
      { value: '0.5 TOPS', label: 'Ethos U-65 NPU' },
      { value: '2GB', label: 'LPDDR4X Memory' },
    ],
    primaryCTA: {
      text: 'Get Started',
      link: '/hardware/nxp/frdm-imx-93',
    },
    secondaryCTA: {
      text: 'Request Demo',
      link: 'https://peridio.com/book-a-meeting',
    },
    image: '/img/hardware/nxp/NXP-FRDM-MCXN947.png',
    imageAlt: 'NXP FRDM i.MX 93 development board',
  },

  valueProposition: {
    title: 'Solution Overview',
    content:
      'The NXP FRDM i.MX 93 development platform, enhanced with Avocado Linux and Peridio Fleet, delivers a production-ready heterogeneous computing solution for edge AI applications. This integrated platform combines dual Cortex-A55 application processors, a Cortex-M33 real-time core, and an Ethos U-65 NPU to enable sophisticated edge processing with 0.5 TOPS of AI performance. The pre-integrated Linux and RTOS environment eliminates months of complex multi-core development, while EdgeLock security and atomic OTA updates ensure enterprise-grade deployment from prototype to production. Teams can leverage industrial connectivity options including CAN FD and Gigabit Ethernet to build secure, scalable edge AI systems that operate reliably in -40°C to +85°C environments with 10+ years of platform support.',
  },

  specs: [
    {
      label: 'Applications CPU',
      value: 'Dual Cortex-A55 @ 1.7GHz',
      note: '64-bit ARM v8.2-A architecture',
    },
    {
      label: 'Real-time CPU',
      value: 'Cortex-M33 @ 250MHz',
      note: 'Dedicated real-time processing',
    },
    {
      label: 'AI Accelerator',
      value: 'Ethos U-65 NPU',
      note: '0.5 TOPS for edge AI inference',
    },
    {
      label: 'Memory',
      value: '2GB LPDDR4X',
      note: '16GB eMMC storage included',
    },
    {
      label: 'Connectivity',
      value: 'Gigabit Ethernet, CAN FD, USB 3.0',
      note: 'Industrial and automotive interfaces',
    },
    {
      label: 'Operating Temp',
      value: '-40°C to +85°C',
      note: 'Industrial temperature range',
    },
  ],

  useCases: [
    {
      title: 'Edge AI Vision Systems',
      description:
        'Real-time object detection and classification with Ethos U-65 NPU. Process camera streams locally with low latency for industrial inspection.',
      image: '/img/use-cases/industrial-sensor-hub.png',
      imageAlt: 'Edge AI Vision Systems',
    },
    {
      title: 'Industrial HMI Controllers',
      description:
        'Rich graphical interfaces on Cortex-A55 with real-time control on Cortex-M33. Heterogeneous processing for responsive industrial control panels.',
      image: '/img/use-cases/motor-control-systems.png',
      imageAlt: 'Industrial HMI Controllers',
    },
    {
      title: 'Smart IoT Gateways',
      description:
        'Bridge OT and IT networks with secure EdgeLock enclave. Local AI processing reduces cloud dependency and improves response times.',
      image: '/img/use-cases/edge-iot-gateway.png',
      imageAlt: 'Smart IoT Gateways',
    },
  ],

  challenges: [
    'Complex heterogeneous architecture setup',
    'Linux and RTOS integration challenges',
    'NPU optimization requires expertise',
    'Security configuration complexity',
    'Long development cycles for edge AI',
  ],

  solutions: [
    'Pre-integrated Linux + RTOS system',
    'Optimized NPU drivers and frameworks',
    'Secure OTA for both cores',
    'EdgeLock security pre-configured',
    'Production-ready in weeks not months',
  ],

  features: [
    {
      icon: 'CpuChip',
      title: 'Heterogeneous Processing',
      description:
        'Seamless Linux on Cortex-A55 with RTOS on Cortex-M33. Pre-configured inter-core communication for optimal workload distribution.',
    },
    {
      icon: 'Bolt',
      title: 'Edge AI Acceleration',
      description:
        'Ethos U-65 NPU with optimized TensorFlow Lite and ONNX runtime. Hardware acceleration for computer vision and anomaly detection.',
    },
    {
      icon: 'ShieldCheck',
      title: 'EdgeLock Security',
      description:
        'Hardware root of trust with secure enclave. Secure boot, encrypted storage, and runtime attestation built-in.',
    },
    {
      icon: 'WrenchScrewdriver',
      title: 'Dual-OS Fleet Management',
      description:
        'Unified OTA updates for Linux and RTOS partitions. Coordinate updates across heterogeneous cores with rollback protection.',
    },
    {
      icon: 'Beaker',
      title: 'Industrial Linux Stack',
      description:
        'Yocto-based Linux with real-time patches. Pre-integrated industrial protocols and containerization support.',
    },
    {
      icon: 'ChartBar',
      title: 'Multi-Core Analytics',
      description:
        'Monitor both application and real-time cores. Track AI inference performance and system health metrics.',
    },
  ],

  cta: {
    title: 'Ready to Accelerate Your Edge AI Development?',
    subtitle:
      'Transform your NXP FRDM i.MX 93 from development board to production-ready edge AI platform with heterogeneous processing and fleet management.',
    primaryCTA: {
      text: 'Get Started',
      link: '/hardware/nxp/frdm-imx-93',
    },
    secondaryCTA: {
      link: 'https://docs.avocadolinux.org/supported-hardware/frdm-imx93',
      target: '_blank',
    },
  },
}

export default function FRDM93SolutionNew() {
  return <SolutionLayout {...solutionData} />
}
