import React from 'react'
import SolutionLayout from '@site/src/components/solutions/SolutionLayout'

const solutionData = {
  title: "STMicroelectronics STM32MP257F-DK Device Management | Production-Ready OTA | Peridio",
  description: "Deploy STM32MP257F-DK in production 4x faster with Peridio Fleet + Avocado OS. Yocto-based, secure OTA updates, enterprise support for industrial IoT.",
  keywords: "stm32mp257f-dk, stmicroelectronics, device management, ota updates, yocto, embedded linux, industrial iot, edge ai, dual core cortex-a35",
  ogImage: "/img/stmicro_STM32MP257F-DK.png",
  canonicalUrl: "https://docs.peridio.com/solutions/stmicro/stm32mp157d-dk",
  
  hero: {
    title: "Skip 18 Months of STM32MP Development",
    highlight: "STM32MP Development",
    subtitle: "Production-ready STMicroelectronics STM32MP257F-DK deployment in 4 months with Peridio Fleet + Avocado OS",
    stats: [
      { value: "10x", label: "Faster Development" },
      { value: "3x", label: "Fewer Engineers" },
      { value: "1.35", label: "TOPS AI Performance" }
    ],
    primaryCTA: {
      text: "Get Started",
      link: "https://docs.avocadolinux.org/supported-hardware/stm32mp257f-dk",
      target: "_blank"
    },
    secondaryCTA: {
      text: "Datasheet",
      link: "/platform/reference/overview"
    },
    image: "/img/stmicro_STM32MP257F-DK.png",
    imageAlt: "STMicroelectronics STM32MP257F-DK development kit"
  },
  
  specs: [
    {
      label: "AI Performance",
      value: "1.35 TOPS NPU",
      note: "Dedicated 3D NPU for AI acceleration"
    },
    {
      label: "Applications CPU",
      value: "Dual-core Arm Cortex-A35 @ 1.5 GHz",
      note: "64-bit ARMv8-A architecture"
    },
    {
      label: "Real-time CPU",
      value: "Arm Cortex-M33 @ 400 MHz",
      note: "Real-time processing with TrustZone"
    },
    {
      label: "Memory",
      value: "2GB DDR4",
      note: "High-bandwidth memory for demanding applications"
    },
    {
      label: "Storage",
      value: "128GB eUFS + microSD",
      note: "Fast storage with expansion capability"
    },
    {
      label: "Operating Temperature",
      value: "-40°C to +85°C",
      note: "Extended industrial temperature range"
    }
  ],

  useCases: [
    {
      title: "Smart Manufacturing",
      description: "Real-time quality control with AI-powered visual inspection. OTA updates enable continuous model improvement in production.",
      image: "/img/use-cases/quality-Inspection.png",
      imageAlt: "Smart Manufacturing"
    },
    {
      title: "Industrial IoT Gateways",
      description: "Edge processing for sensor fusion and local decision making. Secure connectivity with cellular and ethernet interfaces.",
      image: "/img/use-cases/edge-iot-gateway.png",
      imageAlt: "Industrial IoT Gateways"
    },
    {
      title: "HMI Controllers",
      description: "Advanced human-machine interfaces with touchscreen support. Real-time responsiveness with dual-core architecture.",
      image: "/img/use-cases/machine-control-interface.png",
      imageAlt: "HMI Controllers"
    }
  ],

  challenges: [
    "Complex dual-core system integration",
    "Custom Linux distribution takes months",
    "OTA infrastructure requires dedicated teams",
    "Security compliance adds complexity",
    "Industrial certification challenges"
  ],

  solutions: [
    "Pre-configured dual-core system",
    "Production-ready Yocto distribution",
    "Enterprise OTA orchestration",
    "Built-in security compliance",
    "Industrial-grade fleet management"
  ],

  features: [
    {
      icon: "RocketLaunch",
      title: "Rapid Deployment",
      description: "Boot production-ready Linux on STM32MP in minutes. Pre-configured dual-core communication and AI acceleration."
    },
    {
      icon: "LockClosed",
      title: "Production Security",
      description: "Secure boot with TrustZone, dm-verity, and LUKS encryption. Industrial-grade security from day one."
    },
    {
      icon: "Wifi",
      title: "Fleet Management",
      description: "Register and manage devices in Peridio Fleet. Phased releases, cohort targeting, and real-time monitoring."
    },
    {
      icon: "WrenchScrewdriver",
      title: "Hybrid Architecture",
      description: "Seamless integration of Cortex-A35 and Cortex-M33 cores. Optimized for real-time and AI workloads."
    },
    {
      icon: "GlobeAlt",
      title: "Cross-Platform",
      description: "Reuse Avocado OS layers across ARM SoCs (NVIDIA Jetson, Qualcomm, NXP i.MX8). Consistent toolchain."
    },
    {
      icon: "ShieldCheck",
      title: "Long-term Support",
      description: "10+ years of kernel/security maintenance. STM32MP longevity program ensures extended product lifecycle."
    }
  ],

  cta: {
    title: "Ready to Accelerate Your STM32MP Development?",
    subtitle: "Transform your STMicroelectronics STM32MP257F-DK from development kit to secure, deployable industrial platform.",
    primaryCTA: {
      text: "Get Started",
      link: "https://docs.avocadolinux.org/supported-hardware/stm32mp257f-dk",
      target: "_blank"
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
      description: "Step-by-step Yocto build configuration for STM32MP257F-DK",
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

export default function STM32MP157DDKSolutionNew() {
  return <SolutionLayout {...solutionData} />
}