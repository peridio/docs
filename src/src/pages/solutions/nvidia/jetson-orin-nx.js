import React from 'react'
import SolutionLayout from '@site/src/components/solutions/SolutionLayout'

const solutionData = {
  title: "NVIDIA Jetson Orin NX Production Linux | Day 1 Ready | Peridio",
  description: "Production-ready NVIDIA Jetson Orin NX deployment from day 1 with Peridio Fleet + Avocado OS. Enterprise Linux, secure OTA, and fleet management for high-performance edge AI.",
  keywords: "nvidia jetson orin nx, device management, ota updates, yocto, embedded linux, industrial ai, robotics, fleet management, autonomous systems",
  ogImage: "/img/nvidia-jetson-orin.jpg",
  canonicalUrl: "https://docs.peridio.com/solutions/nvidia/jetson-orin-nx",
  
  hero: {
    title: "Skip 18 Months of Orin NX Development",
    highlight: "Orin NX Development",
    subtitle: "Deploy enterprise-grade NVIDIA Jetson Orin NX fleets from day 1 with deterministic Linux, secure OTA, and managed operations",
    stats: [
      { value: "Day 1", label: "Production Ready" },
      { value: "10+", label: "Year Support" },
      { value: "100", label: "TOPS AI Performance" }
    ],
    primaryCTA: {
      text: "Get Started",
      link: "/dev-center/hardware/nvidia/jetson-orin-nano-evk"
    },
    secondaryCTA: {
      text: "Request Demo",
      link: "https://peridio.com/book-a-meeting"
    },
    image: "/img/jetson-nano.png",
    imageAlt: "NVIDIA Jetson Orin NX development kit"
  },
  
  valueProposition: {
    title: "Solution Overview",
    content: "The NVIDIA Jetson Orin NX, powered by Avocado Linux and Peridio Fleet, transforms high-performance edge AI development from a multi-year engineering project into a production deployment measured in days. This integrated platform delivers up to 100 TOPS of AI performance (157 TOPS in Super Mode) with enterprise-grade Linux, atomic OTA updates, and fleet management built in from day one. Ideal for robotics, drones, industrial AI, and multi-sensor vision systems, the Orin NX balances compute power, efficiency, and small form factor. By eliminating the traditional 18-month journey from developer kit to production system, teams can focus on their AI applications instead of infrastructure. The result is a secure, scalable edge AI platform that's ready for industrial deployment out of the box, with 10+ years of support and pin-compatibility with the entire Orin family."
  },
  
  specs: [
    {
      label: "AI Performance",
      value: "100 TOPS (16GB) / 70 TOPS (8GB)",
      note: "Up to 157/117 TOPS in JetPack 6.2 Super Mode"
    },
    {
      label: "GPU",
      value: "1024-core NVIDIA Ampere GPU",
      note: "32 Tensor Cores for accelerated inference"
    },
    {
      label: "CPU",
      value: "8/6-core Arm Cortex-A78AE @ 2.0 GHz",
      note: "Armv8.2 64-bit with safety features"
    },
    {
      label: "Memory",
      value: "16GB/8GB LPDDR5",
      note: "102 GB/s bandwidth for multi-sensor fusion"
    },
    {
      label: "Power",
      value: "10–25W (40W Super)",
      note: "Configurable profiles for any deployment"
    },
    {
      label: "PCIe",
      value: "Gen4 Support",
      note: "High-speed expansion for storage and networking"
    }
  ],

  useCases: [
    {
      title: "Autonomous Mobile Robots",
      description: "100 TOPS delivers real-time SLAM, path planning, and obstacle avoidance. Avocado OS supports ROS2 and containers for rapid deployment.",
      image: "/img/use-cases/autonomous-mobile-robots.png",
      imageAlt: "Autonomous Mobile Robots"
    },
    {
      title: "Multi-Camera Vision Systems",
      description: "Process up to 8 virtual CSI channels with 4K60 encoding. Perfect for drone surveillance and industrial inspection systems.",
      image: "/img/use-cases/industrial-smart-cameras.png",
      imageAlt: "Multi-Camera Vision Systems"
    },
    {
      title: "Industrial Edge AI",
      description: "PCIe Gen4 and rich I/O for sensors, storage, and 10-GbE networking. Run complex AI models locally in harsh environments.",
      image: "/img/use-cases/edge-iot-gateway.png",
      imageAlt: "Industrial Edge AI"
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
      description: "Boot deterministic Linux on Orin NX in minutes. Hardware-in-the-loop tools reduce iteration from weeks to hours."
    },
    {
      icon: "CpuChip",
      title: "Scalable Performance",
      description: "Pin-compatible with Orin Nano for easy migration. Scale from 10W to 40W Super Mode based on application needs."
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
      description: "Reuse Avocado OS layers across ARM/NPU SoCs (Qualcomm, MediaTek, NXP) and entire Jetson family."
    },
    {
      icon: "ShieldCheck",
      title: "Long-term Support",
      description: "10+ years of kernel/security maintenance. Combined with Jetson's industrial lifecycle ensures device longevity."
    }
  ],

  cta: {
    title: "Ready to Accelerate Your Orin NX Development?",
    subtitle: "Transform your NVIDIA Jetson Orin NX from developer kit to secure, deployable high-performance AI platform.",
    primaryCTA: {
      text: "Get Started",
      link: "/dev-center/hardware/nvidia/jetson-orin-nano-evk"
    },
    secondaryCTA: {
      text: "Visit Avocado Linux",
      link: "https://avocadolinux.org",
      target: "_blank"
    }
  }
}

export default function JetsonOrinNXSolution() {
  return <SolutionLayout {...solutionData} />
}