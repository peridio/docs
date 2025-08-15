import React from 'react'
import SolutionLayout from '@site/src/components/solutions/SolutionLayout'

const solutionData = {
  title: "NXP i.MX 8M Plus Industrial Vision | Edge AI Camera Systems | Peridio",
  description: "Deploy NXP i.MX 8M Plus for industrial vision and edge AI. 2.3 TOPS NPU, dual cameras, real-time processing. Production-ready with Peridio Fleet + Avocado OS.",
  keywords: "nxp imx8mp, i.mx 8m plus, industrial vision, edge ai camera, npu, dual camera, real-time processing, device management",
  ogImage: "/img/nxp-imx8mp.jpg",
  canonicalUrl: "https://docs.peridio.com/solutions/nxp/imx8mp",
  
  hero: {
    title: "Unlock Industrial Vision & Edge AI with NXP i.MX 8M Plus",
    highlight: "Industrial Vision & Edge AI",
    subtitle: "Production-ready industrial IoT and vision systems with 2.3 TOPS NPU, dual cameras, and real-time processing",
    stats: [
      { value: "2.3", label: "TOPS NPU Performance" },
      { value: "Dual", label: "MIPI CSI Cameras" },
      { value: "-40°C", label: "Industrial Temperature" }
    ],
    primaryCTA: {
      text: "Get Started",
      link: "/dev-center/hardware/nxp/imx8mp"
    },
    secondaryCTA: {
      text: "Request Demo",
      link: "https://peridio.com/book-a-meeting"
    },
    image: "/img/nxp_iMX8M_Plus.png",
    imageAlt: "NXP i.MX 8M Plus development board"
  },
  
  valueProposition: {
    title: "Solution Overview",
    content: "The NXP i.MX 8M Plus, powered by Avocado Linux and Peridio Fleet, delivers the ideal platform for industrial vision and edge AI applications requiring real-time processing and neural network acceleration. With 2.3 TOPS of NPU performance, dual MIPI CSI camera interfaces, and a dedicated Cortex-M7 real-time core, this solution enables sophisticated computer vision workloads at the edge without cloud dependency. The pre-integrated multi-core Linux and RTOS environment streamlines development of complex vision systems, while TSN-enabled Gigabit Ethernet ensures deterministic networking for synchronized multi-camera deployments. Built for -40°C to +85°C operation with enterprise OTA and fleet management, the platform transforms months of custom integration into a production-ready vision system that scales from prototype to thousands of units."
  },
  
  specs: [
    {
      label: "NPU",
      value: "2.3 TOPS AI Acceleration",
      note: "On-device ML without cloud dependency"
    },
    {
      label: "CPU",
      value: "Quad Cortex-A53 @ 2.0 GHz",
      note: "Application processors for Linux workloads"
    },
    {
      label: "Real-Time Core",
      value: "Cortex-M7 @ 800 MHz",
      note: "Dedicated real-time control processing"
    },
    {
      label: "Camera Support",
      value: "Dual MIPI CSI @ 12MP/375MP/s",
      note: "Stereo vision and multi-camera processing"
    },
    {
      label: "Networking",
      value: "Dual GbE (one with TSN)",
      note: "Time-sensitive industrial networking"
    },
    {
      label: "Operating Temp",
      value: "-40°C to +85°C",
      note: "Industrial and harsh environments"
    }
  ],

  useCases: [
    {
      title: "Smart Industrial Camera",
      description: "Dual-camera stereo vision with real-time inference for defect detection and classification. NPU accelerates ResNet/YOLO models at the edge.",
      image: "/img/use-cases/industrial-smart-cameras.png",
      imageAlt: "Smart Industrial Camera"
    },
    {
      title: "Autonomous Inspection System",
      description: "Low-latency TSN-based Gigabit connection enables synchronized multi-sensor deployments with persistent vision monitoring.",
      image: "/img/use-cases/workplace-safety.png",
      imageAlt: "Autonomous Inspection System"
    },
    {
      title: "Voice-Controlled Industrial Gateway",
      description: "Audio streaming and voice recognition via HiFi 4 DSP with wake-word detection handled on-chip for operator assistance.",
      image: "/img/use-cases/voice-controlled-industrial-gateway.png",
      imageAlt: "Voice-Controlled Gateway"
    }
  ],

  challenges: [
    "Complex multi-core integration (A53 + M7)",
    "NPU optimization for vision workloads",
    "Dual camera synchronization",
    "Real-time processing requirements",
    "Industrial-grade reliability needs"
  ],

  solutions: [
    "Pre-integrated multi-core support",
    "Optimized NPU drivers and ML runtime",
    "Synchronized camera pipeline",
    "Deterministic real-time performance",
    "Industrial-grade OS and fleet management"
  ],

  features: [
    {
      icon: "BuildingOffice",
      title: "Industrial-Grade OS",
      description: "Avocado OS provides deterministic builds optimized for industrial applications with secure boot and verified boot capabilities."
    },
    {
      icon: "Camera",
      title: "Dual Camera Vision",
      description: "Supports dual MIPI CSI cameras at up to 12MP/375MP/s for stereo vision, multi-angle capture, or simultaneous RGB+IR processing."
    },
    {
      icon: "CpuChip",
      title: "NPU AI Acceleration",
      description: "2.3 TOPS of on-device AI acceleration enables real-time vision and ML workloads without relying on cloud compute."
    },
    {
      icon: "Bolt",
      title: "Real-Time Processing",
      description: "Cortex-M7 real-time core at 800 MHz handles latency-sensitive tasks like motor control and sensor polling."
    },
    {
      icon: "GlobeAlt",
      title: "TSN Networking",
      description: "Time-sensitive networking with dual Gigabit Ethernet supports deterministic control and multi-device synchronization."
    },
    {
      icon: "WrenchScrewdriver",
      title: "Long-Term Support",
      description: "10-15 year availability with enterprise maintenance ensures supply stability for long-lived industrial products."
    }
  ],

  cta: {
    title: "Ready to Accelerate Industrial Vision Development?",
    subtitle: "Transform your NXP i.MX 8M Plus into a secure, deployable industrial vision platform ready for harsh environments.",
    primaryCTA: {
      text: "Get Started",
      link: "/dev-center/hardware/nxp/imx8mp"
    },
    secondaryCTA: {
      text: "Visit Avocado Linux",
      link: "https://docs.avocadolinux.org/supported-hardware/imx-8m-plus",
      target: "_blank"
    }
  },

  resources: [
    {
      title: "Industrial Yocto Configuration",
      description: "Multi-core optimization and NPU integration for i.MX 8M Plus industrial applications",
      link: "/integration/linux/build-tools/yocto"
    },
    {
      title: "Device Security",
      description: "Industrial security with device certificates and fleet management",
      link: "/platform/reference/overview"
    },
    {
      title: "Fleet Management",
      description: "Industrial device operations with remote diagnostics and secure OTA updates",
      link: "/platform/reference/overview"
    },
    {
      title: "Industrial Integration APIs",
      description: "REST API and GraphQL for industrial automation and camera system integration",
      link: "/admin-api"
    }
  ]
}

export default function IMX8MPSolutionNew() {
  return <SolutionLayout {...solutionData} />
}