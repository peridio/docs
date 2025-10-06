import { SolutionData } from '../types'

export const data: SolutionData = {
  title: 'NVIDIA Jetson AGX Orin Production Linux | Day 1 Ready | Peridio',
  description:
    'Production-ready NVIDIA Jetson AGX Orin deployment from day 1 with Peridio Fleet + Avocado OS. Enterprise Linux, secure OTA, and fleet management for the most powerful edge AI platform.',
  keywords:
    'nvidia jetson agx orin, device management, ota updates, yocto, embedded linux, industrial ai, robotics, fleet management, autonomous systems, edge computing',
  ogImage: '/img/nvidia-jetson-agx-orin.jpg',
  canonicalUrl: 'https://docs.peridio.com/solutions/nvidia/jetson-agx-orin',

  hero: {
    title: 'Fast-Track Your AGX Orin Production Deployment',
    highlight: 'AGX Orin Production Deployment',
    subtitle:
      'Production-grade software for the most powerful edge AI platform. Deploy NVIDIA Jetson AGX Orin fleets from day 1 with deterministic Linux, secure OTA, and fleet management',
    stats: [
      { value: 'Day 1', label: 'Production Ready' },
      { value: '10+', label: 'Year Support' },
      { value: '275', label: 'TOPS AI Performance' },
    ],
    primaryCTA: {
      text: 'Get Started',
      link: '/hardware/nvidia/jetson-orin-nano-developer-kit/provision',
    },
    secondaryCTA: {
      text: 'Request Demo',
      link: 'https://peridio.com/book-a-meeting',
    },
    image: '/img/jetson-agx-orin.png',
    imageAlt: 'NVIDIA Jetson AGX Orin development kit',
  },

  valueProposition: {
    title: 'Solution Overview',
    content:
      "The NVIDIA Jetson AGX Orin represents the pinnacle of edge AI computing, delivering unprecedented performance with up to 275 TOPS of AI compute in a compact, energy-efficient package. As NVIDIA's flagship edge platform, the AGX Orin combines exceptional processing power with enterprise-grade reliability, making it ideal for the most demanding autonomous systems, industrial AI, and robotics applications. When paired with Avocado Linux and Peridio Fleet, this powerhouse platform gains the production-ready software foundation required for mission-critical deployments at scale. Our enterprise Linux distribution, atomic OTA updates, and comprehensive fleet management unlock the AGX Orin's full potential while dramatically reducing time-to-market. From autonomous vehicles and surgical robots to smart city infrastructure and aerospace applications, teams can focus on breakthrough AI innovation while we handle the complex system integration, security, and lifecycle management. The result is a robust, scalable edge AI solution that matches NVIDIA's hardware excellence with enterprise-grade software infrastructure, backed by 10+ years of support and seamless compatibility across the entire Jetson ecosystem.",
    // videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID"
  },

  specs: [
    {
      label: 'AI Performance',
      value: '275 TOPS',
      note: 'Up to 408 TOPS in JetPack 6.2 Super Mode',
    },
    {
      label: 'GPU',
      value: '2048-core NVIDIA Ampere GPU',
      note: '64 Tensor Cores for maximum inference throughput',
    },
    {
      label: 'CPU',
      value: '12-core Arm Cortex-A78AE @ 2.2 GHz',
      note: 'Armv8.2 64-bit with advanced safety features',
    },
    {
      label: 'Memory',
      value: '32GB/64GB LPDDR5',
      note: '204 GB/s bandwidth for complex multi-modal AI',
    },
    {
      label: 'Power',
      value: '15–60W (75W Super)',
      note: 'Configurable power modes for any deployment scenario',
    },
    {
      label: 'Storage',
      value: '64GB eUFS + NVMe',
      note: 'High-speed storage for large AI models and datasets',
    },
  ],

  useCases: [
    {
      title: 'Autonomous Vehicles',
      description:
        '275 TOPS powers full self-driving stacks with real-time sensor fusion, path planning, and decision making for Level 4+ autonomy.',
      image: '/img/use-cases/autonomous-vehicles.png',
      imageAlt: 'Autonomous Vehicles',
    },
    {
      title: 'Surgical Robotics',
      description:
        'Ultra-low latency AI inference for precision surgical procedures. Real-time computer vision and haptic feedback systems.',
      image: '/img/use-cases/surgical-robotics.png',
      imageAlt: 'Surgical Robotics',
    },
    {
      title: 'Smart City Infrastructure',
      description:
        'Process hundreds of camera feeds for traffic optimization, crowd analysis, and emergency response with enterprise reliability.',
      image: '/img/use-cases/smart-city.png',
      imageAlt: 'Smart City Infrastructure',
    },
  ],

  challenges: [
    "Developer kits aren't enterprise-ready",
    'Complex BSP integration and customization',
    'Large-scale OTA orchestration complexity',
    'High-availability system requirements',
    'Multi-tier fleet management at scale',
  ],

  solutions: [
    'Enterprise-ready OS deployment',
    'Pre-validated AGX Orin BSPs',
    'Scalable OTA infrastructure',
    'High-availability architecture',
    'Multi-tier fleet orchestration',
  ],

  features: [
    {
      icon: 'RocketLaunch',
      title: 'Enterprise Deployment',
      description:
        'Deploy production-grade Linux on AGX Orin in minutes. Enterprise toolchain reduces complex system integration time.',
    },
    {
      icon: 'CpuChip',
      title: 'Maximum Performance',
      description:
        'Unleash all 275 TOPS with optimized BSPs. Scale across the entire Jetson family with pin-compatibility.',
    },
    {
      icon: 'Wifi',
      title: 'Enterprise Fleet Management',
      description:
        'Manage thousands of AGX Orin devices with advanced targeting, A/B deployments, and comprehensive observability.',
    },
    {
      icon: 'WrenchScrewdriver',
      title: 'High-Availability Architecture',
      description:
        'Built for mission-critical systems with redundancy, failover, and recovery mechanisms for 24/7 operations.',
    },
    {
      icon: 'GlobeAlt',
      title: 'Ecosystem Compatibility',
      description:
        'Seamless integration across NVIDIA ecosystem (Isaac, DeepStream, Triton) and cloud platforms.',
    },
    {
      icon: 'ShieldCheck',
      title: 'Enterprise Support',
      description:
        "10+ years of maintenance with enterprise SLAs. Combined with Jetson's industrial lifecycle for maximum ROI.",
    },
  ],

  cta: {
    title: 'Ready to Deploy AGX Orin at Enterprise Scale?',
    subtitle:
      'Unlock the full potential of NVIDIA Jetson AGX Orin with production-grade software infrastructure for the most demanding edge AI applications.',
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

export const jetsonAgxOrinData = data
export const nvidiaJetsonAgxOrinData = data
export default data
