import React from 'react'
import SolutionLayout from '@site/src/components/solutions/SolutionLayout'

const solutionData = {
  title: "NVIDIA Jetson Orin Nano Production Linux | Day 1 Ready | Peridio",
  description: "Production-ready NVIDIA Jetson Orin Nano deployment from day 1 with Peridio Fleet + Avocado OS. Enterprise Linux, secure OTA, and fleet management for industrial AI.",
  keywords: "nvidia jetson orin nano, device management, ota updates, yocto, embedded linux, industrial ai, robotics, fleet management",
  ogImage: "/img/nvidia-jetson-orin.jpg",
  canonicalUrl: "https://docs.peridio.com/solutions/nvidia/jetson-orin-nano",
  
  hero: {
    title: "Skip 18 Months of Jetson Development",
    highlight: "Jetson Development",
    subtitle: "Deploy enterprise-grade NVIDIA Jetson Orin Nano fleets from day 1 with deterministic Linux, secure OTA, and managed operations",
    stats: [
      { value: "Day 1", label: "Production Ready" },
      { value: "10+", label: "Year Support" },
      { value: "67", label: "TOPS AI Performance" }
    ],
    primaryCTA: {
      text: "Get Started",
      link: "/dev-center/hardware/nvidia/jetson-orin-nano-evk"
    },
    secondaryCTA: {
      text: "Datasheet",
      link: "/"
    },
    image: "/img/jetson-nano.png",
    imageAlt: "NVIDIA Jetson Orin Nano development kit"
  },
  
  specs: [
    {
      label: "AI Performance",
      value: "67 TOPS (8GB) / 34 TOPS (4GB)",
      note: "Up to 142× performance of Jetson Nano"
    },
    {
      label: "GPU",
      value: "1024/512-core NVIDIA Ampere GPU",
      note: "CUDA-X and TensorRT for real-time inference"
    },
    {
      label: "CPU",
      value: "6-core Arm Cortex-A78AE @ 1.7 GHz",
      note: "Armv8.2 64-bit with safety features"
    },
    {
      label: "Memory",
      value: "8GB/4GB LPDDR5",
      note: "102/51 GB/s bandwidth for multi-sensor vision"
    },
    {
      label: "Power",
      value: "7–25W",
      note: "Scalable to battery-powered devices"
    },
    {
      label: "Operating Temperature",
      value: "-40°C to +70°C",
      note: "Rugged industrial environments"
    }
  ],

  useCases: [
    {
      title: "Industrial Smart Cameras",
      description: "Multi-camera CSI input for AI tasks like object detection and quality inspection. OTA supports model updates in production.",
      image: "/img/use-cases/industrial-smart-cameras.png",
      imageAlt: "Industrial Smart Cameras"
    },
    {
      title: "Autonomous Mobile Robots",
      description: "Real-time sensor fusion and navigation processing. Avocado OS supports ROS2 and containers with scalable fleet rollouts.",
      image: "/img/use-cases/autonomous-mobile-robots.png",
      imageAlt: "Autonomous Mobile Robots"
    },
    {
      title: "Edge AI Gateways",
      description: "Run generative AI or LLMs locally with NVMe and optional 10-GbE. Managed Linux keeps them secure in harsh environments.",
      image: "/img/use-cases/edge-iot-gateway.png",
      imageAlt: "Edge AI Gateways"
    }
  ],

  challenges: [
    "Developer kits aren't production-ready",
    "Custom Yocto builds take 6-18 months",
    "OTA infrastructure requires dedicated teams",
    "Security compliance adds complexity",
    "Fleet management built from scratch"
  ],

  solutions: [
    "Production-ready OS in minutes",
    "Pre-integrated Jetson BSPs",
    "Enterprise OTA orchestration",
    "Built-in security compliance",
    "Managed fleet operations"
  ],

  features: [
    {
      icon: "RocketLaunch",
      title: "Rapid Deployment",
      description: "Boot deterministic Linux on Jetson in minutes. Hardware-in-the-loop tools reduce iteration from weeks to hours."
    },
    {
      icon: "LockClosed",
      title: "Production Security",
      description: "Secure boot, dm-verity, and LUKS encryption across all architectures. Reproducible images simplify certification."
    },
    {
      icon: "Wifi",
      title: "Fleet Management",
      description: "Register and manage devices in Peridio Fleet. Phased releases, cohort targeting, SBOM, and CVE patching."
    },
    {
      icon: "WrenchScrewdriver",
      title: "Composable Architecture",
      description: "Build systems using modular layers and standard secure components. Avoid the fragility of DIY Yocto."
    },
    {
      icon: "GlobeAlt",
      title: "Cross-Platform",
      description: "Reuse Avocado OS layers across ARM/NPU SoCs (Qualcomm Rubik Pi 3, MediaTek Genio, NXP i.MX8MP)."
    },
    {
      icon: "ShieldCheck",
      title: "Long-term Support",
      description: "10+ years of kernel/security maintenance. Combined with Jetson's industrial lifecycle ensures device longevity."
    }
  ],

  cta: {
    title: "Ready to Accelerate Your Jetson Development?",
    subtitle: "Transform your NVIDIA Jetson Orin Nano from developer kit to secure, deployable industrial AI platform.",
    primaryCTA: {
      text: "Get Started",
      link: "/dev-center/hardware/nvidia/jetson-orin-nano-evk"
    },
    secondaryCTA: {
      text: "Visit Avocado Linux",
      link: "https://avocadolinux.org",
      target: "_blank"
    }
  },

  resources: [
    {
      title: "Yocto Integration Guide",
      description: "Step-by-step Yocto build configuration for Jetson Orin Nano",
      link: "/integration/linux/build-tools/yocto"
    },
    {
      title: "Device Security",
      description: "Device certificates, secure boot, and fleet security management",
      link: "/platform/reference/overview"
    },
    {
      title: "Platform Overview",
      description: "Complete Peridio platform architecture and capabilities",
      link: "/platform/reference/overview"
    },
    {
      title: "API Documentation",
      description: "REST API and GraphQL integration for fleet management",
      link: "/admin-api"
    }
  ]
}

export default function JetsonOrinNanoSolutionNew() {
  return <SolutionLayout {...solutionData} />
}