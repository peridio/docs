import { SolutionData } from '../types'

export const data: SolutionData = {
  title: 'NVIDIA Jetson Orin NX Production Linux | Day 1 Ready | Peridio',
  description:
    'Production-ready NVIDIA Jetson Orin NX deployment from day 1 with Peridio Fleet + Avocado OS. Enterprise Linux, secure OTA, and fleet management for high-performance edge AI.',
  keywords:
    'nvidia jetson orin nx, device management, ota updates, yocto, embedded linux, industrial ai, robotics, fleet management, autonomous systems',
  ogImage: '/img/nvidia-jetson-orin.jpg',
  canonicalUrl: 'https://docs.peridio.com/solutions/nvidia/jetson-orin-nx',

  hero: {
    title: 'Fast-Track Your Orin NX Production Deployment',
    highlight: 'Orin NX Production Deployment',
    subtitle:
      'Production-grade software for high-performance AI edge computing. Deploy NVIDIA Jetson Orin NX fleets from day 1 with deterministic Linux, secure OTA, and fleet management',
    stats: [
      { value: 'Day 1', label: 'Production Ready' },
      { value: '10+', label: 'Year Support' },
      { value: '100', label: 'TOPS AI Performance' },
    ],
    primaryCTA: {
      text: 'Get Started',
      link: '/hardware/nvidia/jetson-orin-nano-developer-kit/provision',
    },
    secondaryCTA: {
      text: 'Request Demo',
      link: 'https://peridio.com/book-a-meeting',
    },
    image: '/img/jetson-nano.png',
    imageAlt: 'NVIDIA Jetson Orin NX development kit',
  },

  valueProposition: {
    title: 'Solution Overview',
    content:
      "The NVIDIA Jetson Orin NX stands as the premier high-performance edge AI platform, delivering up to 100 TOPS (157 TOPS in Super Mode) while maintaining exceptional efficiency. When combined with Avocado Linux and Peridio Fleet, this industry-leading hardware gains the production-grade software foundation needed for mission-critical deployments. Perfect for robotics, drones, industrial AI, and multi-sensor vision systems, the Orin NX's exceptional compute capabilities are fully unleashed with our enterprise Linux, atomic OTA updates, and fleet management infrastructure. This powerful integration accelerates your path to production, allowing teams to leverage Orin NX's superior AI performance while we handle the complex infrastructure requirements. The result is a secure, scalable edge AI solution that matches NVIDIA's hardware excellence with enterprise-grade software, backed by 10+ years of support and seamless pin-compatibility across the entire Orin family.",
    // videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID"
  },

  specs: [
    {
      label: 'AI Performance',
      value: '100 TOPS (16GB) / 70 TOPS (8GB)',
      note: 'Up to 157/117 TOPS in JetPack 6.2 Super Mode',
    },
    {
      label: 'GPU',
      value: '1024-core NVIDIA Ampere GPU',
      note: '32 Tensor Cores for accelerated inference',
    },
    {
      label: 'CPU',
      value: '8/6-core Arm Cortex-A78AE @ 2.0 GHz',
      note: 'Armv8.2 64-bit with safety features',
    },
    {
      label: 'Memory',
      value: '16GB/8GB LPDDR5',
      note: '102 GB/s bandwidth for multi-sensor fusion',
    },
    {
      label: 'Power',
      value: '10–25W (40W Super)',
      note: 'Configurable profiles for any deployment',
    },
    {
      label: 'PCIe',
      value: 'Gen4 Support',
      note: 'High-speed expansion for storage and networking',
    },
  ],

  useCases: [
    {
      title: 'Autonomous Mobile Robots',
      description:
        '100 TOPS delivers real-time SLAM, path planning, and obstacle avoidance. Avocado OS supports ROS2 and containers for rapid deployment.',
      image: '/img/use-cases/autonomous-mobile-robots.png',
      imageAlt: 'Autonomous Mobile Robots',
    },
    {
      title: 'Multi-Camera Vision Systems',
      description:
        'Process up to 8 virtual CSI channels with 4K60 encoding. Perfect for drone surveillance and industrial inspection systems.',
      image: '/img/use-cases/industrial-smart-cameras.png',
      imageAlt: 'Multi-Camera Vision Systems',
    },
    {
      title: 'Industrial Edge AI',
      description:
        'PCIe Gen4 and rich I/O for sensors, storage, and 10-GbE networking. Run complex AI models locally in harsh environments.',
      image: '/img/use-cases/edge-iot-gateway.png',
      imageAlt: 'Industrial Edge AI',
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
        'Boot deterministic Linux on Orin NX in minutes. Hardware-in-the-loop tools reduce iteration from weeks to hours.',
    },
    {
      icon: 'CpuChip',
      title: 'Scalable Performance',
      description:
        'Pin-compatible with Orin Nano for easy migration. Scale from 10W to 40W Super Mode based on application needs.',
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
        'Reuse Avocado OS layers across ARM/NPU SoCs (Qualcomm, MediaTek, NXP) and entire Jetson family.',
    },
    {
      icon: 'ShieldCheck',
      title: 'Long-term Support',
      description:
        "10+ years of kernel/security maintenance. Combined with Jetson's industrial lifecycle ensures device longevity.",
    },
  ],

  cta: {
    title: 'Ready to Accelerate Your Orin NX Deployment?',
    subtitle:
      'Empower your NVIDIA Jetson Orin NX with production-grade software infrastructure for secure, scalable high-performance AI.',
    primaryCTA: {
      text: 'Get Started',
      link: '/hardware/nvidia/jetson-orin-nano-developer-kit/provision',
    },
    secondaryCTA: {
      text: 'Learn More',
      link: 'https://avocadolinux.org',
      target: '_blank',
    },
  },
}

export const jetsonOrinNxData = data
export const nvidiaJetsonOrinNxData = data
export default data
