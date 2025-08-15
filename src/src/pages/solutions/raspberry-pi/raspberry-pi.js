import React from 'react'
import SolutionLayout from '@site/src/components/solutions/SolutionLayout'

const solutionData = {
  title: "Raspberry Pi Device Management | Production-Ready OTA",
  description: "Deploy Raspberry Pi devices in production with Peridio Fleet + Avocado OS. Yocto-based, secure OTA updates, enterprise support for IoT and edge computing.",
  keywords: "raspberry pi, device management, ota updates, yocto, embedded linux, iot, edge computing, fleet management",
  ogImage: "/img/raspberry-pi.jpg",
  canonicalUrl: "https://docs.peridio.com/solutions/raspberry-pi/raspberry-pi",
  
  hero: {
    title: "Production-Ready Raspberry Pi Deployment",
    highlight: "Raspberry Pi",
    subtitle: "Transform your Raspberry Pi prototype into a secure, manageable fleet with Peridio + Avocado OS",
    stats: [
      { value: "5x", label: "Faster to Production" },
      { value: "80%", label: "Lower TCO" },
      { value: "$35", label: "Starting Cost" }
    ],
    primaryCTA: {
      text: "Get Started →",
      link: "/dev-center/hardware/raspberry-pi/compute-module-4"
    },
    secondaryCTA: {
      text: "Request Demo",
      link: "https://peridio.com/book-a-meeting"
    },
    image: "/img/hardware/raspberry-pi/raspberrypi.png",
    imageAlt: "Raspberry Pi development board"
  },
  
  specs: [
    {
      label: "Raspberry Pi 5",
      value: "2.4GHz Quad-core ARM Cortex-A76",
      note: "8GB RAM, PCIe 2.0, dual 4K displays"
    },
    {
      label: "Raspberry Pi 4",
      value: "1.8GHz Quad-core ARM Cortex-A72",
      note: "8GB RAM, USB 3.0, Gigabit Ethernet"
    },
    {
      label: "Raspberry Pi Zero 2W",
      value: "1GHz Quad-core ARM Cortex-A53",
      note: "512MB RAM, WiFi/Bluetooth, ultra-compact"
    },
    {
      label: "Compute Module 4",
      value: "Industrial form factor",
      note: "Custom carrier boards, extended temperature"
    },
    {
      label: "Storage",
      value: "eMMC, NVMe, USB boot",
      note: "SD cards supported for development only"
    },
    {
      label: "Operating Temp",
      value: "0°C to +70°C (standard)",
      note: "Industrial variants available"
    }
  ],
  
  useCases: [
    {
      title: "Industrial IoT Sensors",
      description: "Environmental monitoring, predictive maintenance, and quality control with secure data collection and edge processing.",
      image: "/img/use-cases/industrial-sensor-hub.png"
    },
    {
      title: "Smart City Infrastructure",
      description: "Traffic monitoring, air quality sensors, and smart lighting with centralized management and real-time updates.",
      image: "/img/use-cases/traffic-flow-optimization.png"
    },
    {
      title: "Digital Signage & Kiosks",
      description: "Retail displays, information kiosks, and interactive installations with content management and remote monitoring.",
      image: "/img/use-cases/digital-signage-kiosks.png"
    }
  ],
  
  challenges: [
    "Prototypes work great, production deployment fails",
    "SD card corruption in industrial environments",
    "No secure OTA update mechanism",
    "Manual fleet management doesn't scale",
    "Security vulnerabilities in default OS"
  ],
  
  solutions: [
    "Production-hardened Linux OS",
    "Read-only root with atomic updates",
    "Enterprise OTA orchestration",
    "Centralized fleet management",
    "Built-in security compliance"
  ],
  
  features: [
    {
      icon: "ShieldCheck",
      title: "Production Hardening",
      description: "Read-only root filesystem, secure boot, and A/B partitioning eliminate SD card corruption and failed updates."
    },
    {
      icon: "GlobeAlt",
      title: "Fleet-Scale OTA",
      description: "Deploy updates to thousands of devices with phased rollouts, rollback capabilities, and real-time monitoring."
    },
    {
      icon: "ShieldCheck",
      title: "Zero-Trust Security",
      description: "Code signing, device certificates, and encrypted communication secure your entire fleet from day one."
    },
    {
      icon: "Bolt",
      title: "Rapid Development",
      description: "Pre-built Yocto layers and containerized applications accelerate your time-to-market from months to weeks."
    },
    {
      icon: "GlobeAlt",
      title: "Cross-Platform Ready",
      description: "Develop on Pi, deploy across ARM architectures. Reuse software stacks on industrial SoCs when you scale."
    },
    {
      icon: "CommandLine",
      title: "Fleet Intelligence",
      description: "Real-time telemetry, remote diagnostics, and predictive maintenance keep your devices healthy and operational."
    }
  ],
  
  cta: {
    title: "Ready to Scale Your Raspberry Pi Project?",
    description: "Transform your Raspberry Pi prototype into a secure, manageable production fleet with enterprise-grade reliability.",
    primaryButton: {
      text: "Get Started",
      link: "/dev-center/hardware/raspberry-pi/compute-module-4"
    },
    secondaryButton: {
      text: "Visit Avocado Linux",
      link: "https://avocadolinux.org"
    }
  },
  
  resources: [
    {
      title: "Raspberry Pi 5 Guide",
      description: "Complete setup and configuration guide for Raspberry Pi 5 with Avocado OS",
      link: "/integration/linux/reference-designs/raspberrypi5/overview"
    },
    {
      title: "Raspberry Pi 4 Guide",
      description: "Production deployment guide for Raspberry Pi 4 with enterprise features",
      link: "/integration/linux/reference-designs/raspberrypi4/overview"
    },
    {
      title: "Fleet Management",
      description: "Learn how to manage thousands of Raspberry Pi devices at scale",
      link: "/platform/reference/overview"
    },
    {
      title: "Custom OS Build",
      description: "Build custom Yocto images for your specific Raspberry Pi application",
      link: "/integration/linux/build-tools/yocto"
    }
  ]
}

export default function RaspberryPiSolution() {
  return <SolutionLayout {...solutionData} />
}