import { SolutionData } from '../types'

export const data: SolutionData = {
  title: 'Qualcomm Rubik Pi Edge AI Development | Production-Ready Robotics | Peridio',
  description:
    'Deploy Qualcomm Rubik Pi (RB3 Gen 2) in production 3x faster with Peridio Fleet + Avocado OS. 15.5 TOPS AI performance, secure OTA updates, enterprise robotics support.',
  keywords:
    'qualcomm rubik pi, rb3 gen 2, edge ai, robotics, qcs6490, device management, ota updates, yocto, embedded linux',
  ogImage: '/img/rubik-pi.jpeg',
  canonicalUrl: 'https://docs.peridio.com/solutions/qualcomm/rubik-pi',

  hero: {
    title: 'Accelerate Edge AI & Robotics with Qualcomm Rubik Pi',
    highlight: 'Edge AI & Robotics',
    subtitle:
      'Production-ready Qualcomm RB3 Gen 2 deployment in 3-6 months with Peridio Fleet + Avocado OS',
    stats: [
      { value: '15.5', label: 'TOPS AI Performance' },
      { value: '3-6', label: 'Months to Production' },
      { value: '5G', label: 'Ready Connectivity' },
    ],
    primaryCTA: {
      text: 'Request Demo',
      link: 'https://peridio.com/book-a-meeting',
    },
    image: '/img/Qualcomm-Rubikpi.png',
    imageAlt: 'Qualcomm Rubik Pi RB3 Gen 2 development kit',
  },

  valueProposition: {
    title: 'Solution Overview',
    content:
      'The Qualcomm Rubik Pi (RB3 Gen 2), powered by Avocado Linux and Peridio Fleet, accelerates edge AI and robotics development from years to months. Built on the QCS6490 platform with 15.5 TOPS of AI performance, this solution combines Hexagon NPU acceleration with octa-core processing to enable sophisticated autonomous systems. The pre-integrated Linux environment eliminates 12-18 months of custom Yocto development, while built-in support for multi-camera vision, 5G connectivity, and ROS2 makes it ideal for autonomous mobile robots, smart cameras, and industrial IoT gateways. With enterprise OTA updates, fleet management, and security compliance built in from day one, teams can focus on their robotics applications instead of infrastructure, achieving production deployment 3x faster than traditional approaches.',
  },

  specs: [
    {
      label: 'AI Performance',
      value: '15.5 TOPS (INT8)',
      note: 'Hexagon NPU + GPU acceleration',
    },
    {
      label: 'SoC',
      value: 'Qualcomm QCS6490',
      note: 'Octa-core Kryo 670 with AI engine',
    },
    {
      label: 'CPU',
      value: '8-core ARM (2×A78 @ 2.7GHz, 6×A55)',
      note: 'High-performance + efficiency cores',
    },
    {
      label: 'Memory',
      value: '8GB LPDDR5',
      note: 'High-bandwidth for AI model processing',
    },
    {
      label: 'Connectivity',
      value: 'Wi-Fi 6E, Bluetooth 5.2, 5G ready',
      note: 'Advanced wireless for IoT and edge',
    },
    {
      label: 'Camera Support',
      value: 'Dual 13MP ISPs, up to 4K@60fps',
      note: 'Multi-camera vision for robotics',
    },
  ],

  useCases: [
    {
      title: 'Autonomous Mobile Robots',
      description:
        'Real-time SLAM, obstacle avoidance, and path planning with multi-camera fusion. OTA enables algorithm updates and new capabilities.',
      image: '/img/use-cases/autonomous-mobile-robots.png',
      imageAlt: 'Autonomous Mobile Robots',
    },
    {
      title: 'Smart Security Cameras',
      description:
        'AI-powered video analytics with edge processing for privacy-sensitive environments. Fleet management simplifies large-scale deployments.',
      image: '/img/use-cases/industrial-smart-cameras.png',
      imageAlt: 'Smart Security Cameras',
    },
    {
      title: 'Industrial IoT Gateways',
      description:
        'Edge inference for predictive maintenance and quality control. 5G connectivity enables real-time coordination with cloud systems.',
      image: '/img/use-cases/edge-iot-gateway.png',
      imageAlt: 'Industrial IoT Gateways',
    },
  ],

  challenges: [
    'Complex Qualcomm AI Engine integration',
    '12-18 month Yocto development cycles',
    'Custom fleet management infrastructure',
    'Security compliance overhead',
    'Fragmented toolchain across projects',
  ],

  solutions: [
    'Pre-integrated Hexagon NPU support',
    'Production-ready OS in weeks',
    'Enterprise OTA orchestration',
    'Built-in security compliance',
    'Unified cross-platform development',
  ],

  features: [
    {
      icon: 'CommandLine',
      title: 'AI-Optimized Stack',
      description:
        'Native support for Qualcomm AI Engine and Hexagon SDK. Streamlined deployment of TensorFlow Lite, ONNX, and PyTorch models.',
    },
    {
      icon: 'RocketLaunch',
      title: 'Rapid Deployment',
      description:
        'Optimized BSPs for Qualcomm silicon enable fast boot and deterministic builds. Pre-integrated drivers reduce development time.',
    },
    {
      icon: 'LockClosed',
      title: 'Hardware Security',
      description:
        'Hardware-backed security with TrustZone, secure boot, and verified boot. LUKS encryption and dm-verity ensure data integrity.',
    },
    {
      icon: 'Wifi',
      title: 'Fleet Operations',
      description:
        'Comprehensive device management through Peridio Core with remote diagnostics, phased updates, and fleet-wide security patching.',
    },
    {
      icon: 'GlobeAlt',
      title: 'Cross-Platform',
      description:
        'Unified development experience across ARM SoCs (NVIDIA Jetson, NXP i.MX, Qualcomm QCS) with portable application layers.',
    },
    {
      icon: 'ShieldCheck',
      title: 'Long-term Support',
      description:
        '10+ years of maintenance ensures device longevity and reduces lifecycle management overhead for enterprise deployments.',
    },
  ],

  cta: {
    title: 'Ready to Accelerate Your Edge AI Development?',
    subtitle:
      'Transform your Qualcomm Rubik Pi from development kit to secure, deployable edge AI platform ready for production.',
    primaryCTA: {
      text: 'Request Demo',
      link: 'https://peridio.com/book-a-meeting',
    },
  },
}

export default data
