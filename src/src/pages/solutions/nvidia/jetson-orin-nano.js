import React from 'react'
import SolutionLayout from '@site/src/components/solutions/SolutionLayout'

const solutionData = {
  title: 'NVIDIA Jetson Orin Nano Production Linux | Day 1 Ready | Peridio',
  description:
    'Production-ready NVIDIA Jetson Orin Nano deployment from day 1 with Peridio Fleet + Avocado OS. Enterprise Linux, secure OTA, and fleet management for industrial AI.',
  keywords:
    'nvidia jetson orin nano, device management, ota updates, yocto, embedded linux, industrial ai, robotics, fleet management',
  ogImage: '/img/nvidia-jetson-orin.jpg',
  canonicalUrl: 'https://docs.peridio.com/solutions/nvidia/jetson-orin-nano',

  hero: {
    title: 'Fast-Track Your Jetson Production Deployment',
    highlight: 'Jetson Production Deployment',
    subtitle:
      "Production-grade software for the industry's leading AI edge hardware. Deploy NVIDIA Jetson Orin Nano fleets from day 1 with deterministic Linux, secure OTA, and fleet management",
    stats: [
      { value: 'Day 1', label: 'Production Ready' },
      { value: '10+', label: 'Year Support' },
      { value: '67', label: 'TOPS AI Performance' },
    ],
    primaryCTA: {
      text: 'Get Started',
      link: '/hardware/nvidia/jetson-orin-nano-evk',
    },
    secondaryCTA: {
      text: 'Request Demo',
      link: 'https://peridio.com/book-a-meeting',
    },
    image: '/img/jetson-nano.png',
    imageAlt: 'NVIDIA Jetson Orin Nano development kit',
  },

  valueProposition: {
    title: 'Solution Overview',
    content:
      "The NVIDIA Jetson Orin Nano represents the pinnacle of AI edge computing hardware, delivering 67 TOPS of performance in an efficient, compact form factor. When paired with Avocado Linux and Peridio Fleet, this industry-leading platform gains the production-grade software infrastructure it deserves. Teams can accelerate their time to market with enterprise Linux, atomic OTA updates, and fleet management built in from day one. This powerful combination enables you to fully leverage Jetson's exceptional AI capabilities while our integrated platform handles the complex infrastructure requirements. The result is a secure, scalable edge AI solution that matches Jetson's hardware excellence with enterprise-grade software, backed by 10+ years of support and cross-platform portability across the entire NVIDIA Jetson family.",
  },

  specs: [
    {
      label: 'AI Performance',
      value: '67 TOPS (8GB) / 34 TOPS (4GB)',
      note: 'Up to 142× performance of Jetson Nano',
    },
    {
      label: 'GPU',
      value: '1024/512-core NVIDIA Ampere GPU',
      note: 'CUDA-X and TensorRT for real-time inference',
    },
    {
      label: 'CPU',
      value: '6-core Arm Cortex-A78AE @ 1.7 GHz',
      note: 'Armv8.2 64-bit with safety features',
    },
    {
      label: 'Memory',
      value: '8GB/4GB LPDDR5',
      note: '102/51 GB/s bandwidth for multi-sensor vision',
    },
    {
      label: 'Power',
      value: '7–25W',
      note: 'Scalable to battery-powered devices',
    },
    {
      label: 'Operating Temperature',
      value: '-40°C to +70°C',
      note: 'Rugged industrial environments',
    },
  ],

  useCases: [
    {
      title: 'Industrial Smart Cameras',
      description:
        'Multi-camera CSI input for AI tasks like object detection and quality inspection. OTA supports model updates in production.',
      image: '/img/use-cases/industrial-smart-cameras.png',
      imageAlt: 'Industrial Smart Cameras',
    },
    {
      title: 'Autonomous Mobile Robots',
      description:
        'Real-time sensor fusion and navigation processing. Avocado OS supports ROS2 and containers with scalable fleet rollouts.',
      image: '/img/use-cases/autonomous-mobile-robots.png',
      imageAlt: 'Autonomous Mobile Robots',
    },
    {
      title: 'Edge AI Gateways',
      description:
        'Run generative AI or LLMs locally with NVMe and optional 10-GbE. Managed Linux keeps them secure in harsh environments.',
      image: '/img/use-cases/edge-iot-gateway.png',
      imageAlt: 'Edge AI Gateways',
    },
  ],

  challenges: [
    "Developer kits aren't production-ready",
    'Custom Yocto builds require significant time investment',
    'OTA infrastructure requires dedicated teams',
    'Security compliance adds complexity',
    'Fleet management built from scratch',
  ],

  solutions: [
    'Production-ready OS in minutes',
    'Pre-integrated Jetson BSPs',
    'Enterprise OTA orchestration',
    'Built-in security compliance',
    'Managed fleet operations',
  ],

  features: [
    {
      icon: 'RocketLaunch',
      title: 'Rapid Deployment',
      description:
        'Boot deterministic Linux on Jetson in minutes. Hardware-in-the-loop tools reduce iteration from weeks to hours.',
    },
    {
      icon: 'LockClosed',
      title: 'Production Security',
      description:
        'Secure boot, dm-verity, and LUKS encryption across all architectures. Reproducible images simplify certification.',
    },
    {
      icon: 'Wifi',
      title: 'Fleet Management',
      description:
        'Register and manage devices in Peridio Fleet. Phased releases, cohort targeting, SBOM, and CVE patching.',
    },
    {
      icon: 'WrenchScrewdriver',
      title: 'Composable Architecture',
      description:
        'Build systems using modular layers and standard secure components. Avoid the fragility of DIY Yocto.',
    },
    {
      icon: 'GlobeAlt',
      title: 'Cross-Platform',
      description:
        'Reuse Avocado OS layers across ARM/NPU SoCs (Qualcomm Rubik Pi 3, MediaTek Genio, NXP i.MX8MP).',
    },
    {
      icon: 'ShieldCheck',
      title: 'Long-term Support',
      description:
        "10+ years of kernel/security maintenance. Combined with Jetson's industrial lifecycle ensures device longevity.",
    },
  ],

  cta: {
    title: 'Ready to Accelerate Your Jetson Deployment?',
    subtitle:
      'Empower your NVIDIA Jetson Orin Nano with production-grade software infrastructure for secure, scalable industrial AI.',
    primaryCTA: {
      text: 'Get Started',
      link: '/hardware/nvidia/jetson-orin-nano-evk',
    },
    secondaryCTA: {
      text: 'Visit Avocado Linux',
      link: 'https://avocadolinux.org',
      target: '_blank',
    },
  },
}

export default function JetsonOrinNanoSolutionNew() {
  return <SolutionLayout {...solutionData} />
}
