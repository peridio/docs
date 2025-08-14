import React from 'react'
import SolutionLayout from '@site/src/components/solutions/SolutionLayout'

const solutionData = {
  title: "NXP FRDM-MCXN947 MCU Development | Real-Time IoT | Peridio",
  description: "Production-ready NXP FRDM-MCXN947 development with dual Cortex-M33 cores, ML acceleration, and secure IoT connectivity. Enterprise OTA and fleet management.",
  keywords: "nxp frdm-mcxn947, mcx n94, cortex-m33, mcu development, real-time, iot, embedded, fleet management",
  ogImage: "/img/nxp-frdm-93.jpg",
  canonicalUrl: "https://docs.peridio.com/solutions/nxp/frdm-93",
  
  hero: {
    title: "Industrial MCU Development with NXP FRDM-MCXN947",
    highlight: "NXP FRDM-MCXN947",
    subtitle: "Dual-core Cortex-M33 platform with ML acceleration, secure boot, and industrial connectivity for real-time IoT applications",
    stats: [
      { value: "150MHz", label: "Dual Cortex-M33" },
      { value: "2MB", label: "Flash Memory" },
      { value: "-40°C", label: "Industrial Temp" }
    ],
    primaryCTA: {
      text: "Get Started",
      link: "/dev-center/hardware/nxp/frdm-imx-93"
    },
    secondaryCTA: {
      text: "Datasheet",
      link: "/"
    },
    image: "/img/nxp-frdm-93.jpg",
    imageAlt: "NXP FRDM-MCXN947 development board"
  },
  
  specs: [
    {
      label: "Processor",
      value: "Dual Cortex-M33 @ 150MHz",
      note: "TrustZone security and DSP extensions"
    },
    {
      label: "Memory",
      value: "2MB Flash / 512KB SRAM",
      note: "Execute-in-place from external flash"
    },
    {
      label: "ML Accelerator",
      value: "NPU with eIQ ML support",
      note: "TensorFlow Lite Micro optimized"
    },
    {
      label: "Connectivity",
      value: "CAN FD, USB, UART, SPI, I2C",
      note: "Industrial protocols and automotive CAN"
    },
    {
      label: "Security",
      value: "Secure Boot, Crypto, TRNG",
      note: "Hardware root of trust"
    },
    {
      label: "Operating Temp",
      value: "-40°C to +105°C",
      note: "Automotive and industrial grade"
    }
  ],

  useCases: [
    {
      title: "Industrial Sensor Hub",
      description: "Multi-sensor data fusion with ML inference at the edge. Dual-core architecture separates real-time control from communication tasks.",
      image: "/img/factory-quality-inspection.png",
      imageAlt: "Industrial Sensor Hub"
    },
    {
      title: "Motor Control Systems",
      description: "FOC motor control with CAN FD for automotive and industrial applications. Hardware PWM and encoder interfaces for precision control.",
      image: "/img/environmental-inspection.png",
      imageAlt: "Motor Control Systems"
    },
    {
      title: "Secure IoT Gateway",
      description: "TrustZone-enabled secure gateway with hardware crypto. Bridge industrial sensors to cloud with authenticated OTA updates.",
      image: "/img/workplace-safety.png",
      imageAlt: "Secure IoT Gateway"
    }
  ],

  challenges: [
    "Complex dual-core synchronization",
    "Manual firmware update processes",
    "Limited debugging in production",
    "Security implementation overhead",
    "No fleet management for MCUs"
  ],

  solutions: [
    "Pre-configured multicore RTOS",
    "Secure OTA with rollback",
    "Remote diagnostics and logging",
    "Built-in secure boot chain",
    "Enterprise MCU fleet management"
  ],

  features: [
    {
      icon: "CpuChip",
      title: "Dual-Core Optimization",
      description: "Pre-configured FreeRTOS/Zephyr with inter-core communication. Separate real-time control from application logic seamlessly."
    },
    {
      icon: "Bolt",
      title: "Real-Time Performance",
      description: "Deterministic execution with hardware PWM, timers, and DMA. Low-latency interrupt handling for motor control and sensors."
    },
    {
      icon: "ShieldCheck",
      title: "Hardware Security",
      description: "TrustZone isolation, secure boot, and hardware crypto. Device certificates and secure key storage in PUF."
    },
    {
      icon: "WrenchScrewdriver",
      title: "MCU Fleet OTA",
      description: "Delta updates minimize bandwidth for constrained devices. A/B partitioning with automatic rollback on failure."
    },
    {
      icon: "Beaker",
      title: "ML at the Edge",
      description: "NPU-accelerated inference with TensorFlow Lite Micro. Pre-trained models for anomaly detection and predictive maintenance."
    },
    {
      icon: "ChartBar",
      title: "Production Analytics",
      description: "Real-time telemetry and remote diagnostics. Monitor CPU usage, memory, and custom metrics across your fleet."
    }
  ],

  cta: {
    title: "Ready to Accelerate Your MCU Development?",
    subtitle: "Transform your NXP FRDM-MCXN947 from development board to production-ready industrial platform with secure OTA and fleet management.",
    primaryCTA: {
      text: "Get Started",
      link: "/dev-center/hardware/nxp/frdm-imx-93"
    },
    secondaryCTA: {
      text: "Visit Avocado Linux",
      link: "https://docs.avocadolinux.org/supported-hardware/frdm-mcxn947",
      target: "_blank"
    }
  },

  resources: [
    {
      title: "MCU Development Guide",
      description: "FreeRTOS and Zephyr configuration for dual-core Cortex-M33 platforms",
      link: "/integration/linux/build-tools/yocto"
    },
    {
      title: "Secure Boot Chain",
      description: "Hardware root of trust with TrustZone and secure firmware updates",
      link: "/platform/reference/overview"
    },
    {
      title: "Fleet Management",
      description: "MCU fleet operations with OTA updates and remote diagnostics",
      link: "/platform/reference/overview"
    },
    {
      title: "API Integration",
      description: "REST API for automated testing and continuous deployment",
      link: "/admin-api"
    }
  ]
}

export default function FRDM93SolutionNew() {
  return <SolutionLayout {...solutionData} />
}