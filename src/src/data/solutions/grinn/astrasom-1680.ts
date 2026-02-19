import { SolutionData } from '../types'

export const data: SolutionData = {
  title: 'Grinn AstraSOM-1680 Edge AI Vision | Production-Ready Smart Cameras | Peridio',
  description:
    'Deploy production-grade smart cameras and edge AI vision systems on the Grinn AstraSOM-1680 with Avocado OS. 7.9 TOPS NPU, OTA updates, and CRA-compliant security in a 37×42mm module.',
  keywords:
    'grinn astrasom-1680, astra sl1680, edge ai vision, smart camera, npu, dual camera, avocado os, cra compliance, ota updates',
  ogImage: '/img/grinn-astra-som-1680.png',
  canonicalUrl: 'https://docs.peridio.com/solutions/grinn/astrasom-1680',

  hero: {
    title: 'Edge AI Vision from Prototype to Production on Grinn AstraSOM-1680',
    highlight: 'Edge AI Vision',
    subtitle:
      'Ship smart cameras and vision systems in months, not years. Avocado OS transforms the Grinn AstraSOM-1680 into a production-grade edge AI platform with enterprise fleet management and CRA-compliant security.',
    stats: [
      { value: '7.9', label: 'TOPS NPU Performance' },
      { value: 'Dual', label: 'MIPI CSI Cameras' },
      { value: '37×42mm', label: 'Ultra-Compact LGA' },
      { value: '6x Faster', label: 'Time to Production' },
    ],
    primaryCTA: {
      text: 'Request Demo',
      link: 'https://peridio.com/book-a-meeting',
    },
    secondaryCTA: {
      text: 'Get Started',
      link: '/avocado-linux/guides/getting-started',
    },
    image: '/img/grinn-astra-som-1680.png',
    imageAlt: 'Grinn AstraSOM-1680 system-on-module',
  },

  valueProposition: {
    title: 'Solution Overview',
    content:
      'The Grinn AstraSOM-1680, powered by the Synaptics Astra SL1680 and running Avocado OS, delivers a production-grade edge AI platform purpose-built for smart camera and computer vision deployments. With 7.9 TOPS of NPU performance, dual MIPI CSI camera interfaces, and HDMI 2.1 input in a compact 37×42.6mm LGA footprint, the AstraSOM-1680 provides the compute density needed for real-time vision workloads at the edge.\n\nAvocado OS eliminates the 18+ months of custom Linux infrastructure work that typically stands between a working prototype and a shippable product. Application engineers can begin iterating on vision models from day one with a validated BSP, atomic OTA updates, and CRA-compliant CVE tracking built in. Together, Grinn and Peridio provide a complete, programmable foundation for industrial-grade vision systems that can move seamlessly from lab to volume production.',
  },

  specs: [
    {
      label: 'NPU',
      value: '7.9 TOPS AI Acceleration',
      note: 'On-device inference for real-time computer vision without cloud dependency',
    },
    {
      label: 'CPU',
      value: 'Quad Cortex-A73 @ 2.1 GHz',
      note: 'High-performance application processors for Linux workloads',
    },
    {
      label: 'GPU',
      value: 'PowerVR Series9XE GE9920',
      note: 'Hardware-accelerated graphics and display compositing',
    },
    {
      label: 'Camera Input',
      value: 'Dual MIPI CSI2 (8MP + 4MP)',
      note: 'Stereo vision, multi-angle capture, or simultaneous RGB+IR processing',
    },
    {
      label: 'Video Input',
      value: 'HDMI RX 2.1',
      note: '4K video input for inspection and monitoring applications',
    },
    {
      label: 'Display',
      value: '2× MIPI DSI + HDMI TX 2.1 (4K60)',
      note: 'Multi-display output for HMI and visual feedback',
    },
    {
      label: 'Memory',
      value: '4 GB 64-bit LPDDR4 @ 3733 Mbps',
      note: 'High-bandwidth memory for vision processing pipelines',
    },
    {
      label: 'Storage',
      value: '16 GB eMMC',
      note: 'On-module storage for OS, models, and application data',
    },
    {
      label: 'Connectivity',
      value: 'USB 3.0, USB 2.0, PCIe ×2 Gen 2.0, GbE MAC',
      note: 'Flexible high-speed peripheral and network connectivity',
    },
    {
      label: 'Form Factor',
      value: '37 × 42.6 mm, LGA196',
      note: 'Ultra-compact system-on-module for space-constrained designs',
    },
  ],

  useCases: [
    {
      title: 'Smart Camera Deployments',
      description:
        'Deploy 7.9 TOPS of NPU performance for real-time object detection, classification, and tracking in compact smart camera form factors. Dual MIPI CSI inputs enable stereo vision or simultaneous visible/IR capture for industrial inspection and security applications.',
      image: '/img/use-cases/quality-Inspection.png',
      imageAlt: 'Smart Camera Deployments',
    },
    {
      title: 'Off-Grid Edge AI Vision',
      description:
        'Ultra-low-power standby architecture with sensor-based wake enables battery and solar-powered vision applications in remote locations. Process vision workloads on-device without continuous connectivity, uploading results when network access is available.',
      image: '/img/use-cases/solar-off-grid.png',
      imageAlt: 'Off-Grid Edge AI Vision',
    },
    {
      title: 'Ruggedized Industrial Vision',
      description:
        "Grinn's validated LGA196 module design with Avocado OS LTS support enables customers to move from prototype to volume production in quarters, not years. Compact form factor fits into IP-rated enclosures for harsh environment deployment.",
      image: '/img/use-cases/workplace-safety.png',
      imageAlt: 'Ruggedized Industrial Vision',
    },
  ],

  challenges: [
    '18+ months building custom Linux infrastructure before shipping a single unit',
    "Manual firmware updates that don't scale across deployed camera fleets",
    'No CVE tracking or audit trail for EU Cyber Resilience Act compliance',
    'Complex vision pipeline integration without version control or rollback',
    'Limited remote diagnostics when deployed vision systems need attention',
  ],

  solutions: [
    'Production-ready in weeks with a pre-validated BSP for Synaptics Astra SL1680',
    'Atomic OTA updates for models, firmware, and system software with automatic rollback',
    'CRA-compliant CVE tracking and security patching from day one',
    'Reproducible, immutable Linux environments that eliminate configuration drift',
    'Enterprise remote diagnostics with secure tunnel access to deployed devices',
  ],

  features: [
    {
      icon: 'Bolt',
      title: 'Production-Ready from Day One',
      description:
        'Avocado OS provides a pre-validated, hardened Linux foundation with the Synaptics Astra SL1680 BSP fully integrated. No prototype-to-production gap — start building your application, not your infrastructure.',
    },
    {
      icon: 'CommandLine',
      title: 'Atomic OTA Updates',
      description:
        'Zero-downtime firmware, model, and application deployment with automatic rollback on failure. Version control and staged rollouts for continuous improvement across your fleet.',
    },
    {
      icon: 'ShieldCheck',
      title: 'CRA-Compliant Security',
      description:
        'Secure boot, CVE tracking, and audit-ready processes built into the platform. Meet EU Cyber Resilience Act requirements without years of custom security infrastructure.',
    },
    {
      icon: 'GlobeAlt',
      title: 'Vision Fleet Management',
      description:
        'Deploy and manage hundreds of AstraSOM-1680-based cameras across sites. Device-specific configurations with centralized policy enforcement and remote diagnostics.',
    },
    {
      icon: 'CpuChip',
      title: 'Cross-Platform Portability',
      description:
        'Develop on AstraSOM-1680, deploy across Avocado OS-supported platforms. Unified toolchain prevents vendor lock-in and reduces engineering overhead as you expand your product line.',
    },
    {
      icon: 'WrenchScrewdriver',
      title: 'Long-Term Support',
      description:
        'Enterprise LTS ensures your production Linux foundation stays maintained, patched, and secure. Focus on your application roadmap while Peridio handles the platform.',
    },
  ],

  cta: {
    title: 'Ready to Ship Production-Ready Edge AI Vision?',
    subtitle:
      'Transform the Grinn AstraSOM-1680 into a managed smart camera platform with atomic updates, remote diagnostics, and enterprise support.',
    primaryCTA: {
      text: 'Get Started',
      link: '/avocado-linux/guides/getting-started',
    },
    secondaryCTA: {
      text: 'Request a Demo',
      link: 'https://peridio.com/book-a-meeting',
      target: '_blank',
    },
  },
}

export const astrasom1680Data = data
export const grinnAstrasom1680Data = data
export default data
