import React from 'react'
import SolutionLayout from '@site/src/components/solutions/SolutionLayout'

const solutionData = {
  title: "Seeed reTerminal Industrial HMI | Raspberry Pi CM4",
  description: "Deploy Seeed reTerminal industrial HMI with Raspberry Pi CM4, 5-inch touchscreen, and enterprise fleet management. Production-ready edge computing.",
  keywords: "seeed reterminal, raspberry pi cm4, industrial hmi, touchscreen, edge computing, fleet management",
  ogImage: "/img/reterminal.jpg",
  canonicalUrl: "https://docs.peridio.com/solutions/seeed",
  
  hero: {
    title: "Industrial HMI with Seeed reTerminal",
    highlight: "Seeed reTerminal",
    subtitle: "Production-Ready Industrial HMI Platform. Deploy fleets of Raspberry Pi CM4-powered touch interfaces with deterministic Linux, secure OTA updates, and enterprise fleet management from Day 1.",
    stats: [
      { value: "5\"", label: "IPS Touchscreen" },
      { value: "1.5GHz", label: "Quad-Core ARM" },
      { value: "IP64", label: "Front Panel" },
      { value: "<30s", label: "Cold boot to UI" },
      { value: "1000+", label: "Fleet scalability" },
      { value: "7yr", label: "Avocado OS LTS" }
    ],
    primaryCTA: {
      text: "Request Demo",
      link: "https://peridio.com/book-a-meeting"
    },
    image: "/img/hardware/seeed/seeed_reterminal.png",
    imageAlt: "Seeed reTerminal industrial HMI"
  },
  
  valueProposition: {
    title: "Solution Overview",
    content: "The Seeed Studio reTerminal, powered by Avocado Linux and Peridio Core on the Raspberry Pi Compute Module 4, delivers an industrial-grade HMI platform ready for deployment in days or weeks, not months. Built-in WebKit support and other utilities enable application engineers to start building interfaces and user experiences on day one. This turnkey, programmable device provides a production-ready foundation for industrial, IoT, and embedded applications. Together, Seeed and Peridio offer a cost-effective, Linux-first solution that scales seamlessly from prototype to full-scale field deployment."
  },
  
  specs: [
    {
      label: "Processor",
      value: "Raspberry Pi CM4",
      note: "Quad-core Cortex-A72 @ 1.5GHz"
    },
    {
      label: "Display",
      value: "5-inch IPS LCD",
      note: "1280x720, 10-point multi-touch"
    },
    {
      label: "Memory",
      value: "2/4/8GB LPDDR4",
      note: "Up to 32GB eMMC storage"
    },
    {
      label: "Connectivity",
      value: "WiFi 5 + BT 5.0",
      note: "Gigabit Ethernet, dual USB"
    },
    {
      label: "Expansion",
      value: "40-pin GPIO",
      note: "Compatible with reTerminal E10-1 modules"
    },
    {
      label: "Operating Temp",
      value: "0°C to +50°C",
      note: "Industrial-grade components"
    }
  ],
  
  useCases: [
    {
      title: "Machine Control Interface",
      description: "Real-time PLC Integration with responsive multi-touch interface. Optimized UI rendering for smooth operator interactions. Native Modbus RTU/TCP, OPC UA, and MQTT support through Avocado OS.",
      image: "/img/use-cases/machine-control-interface.png"
    },
    {
      title: "Building Automation",
      description: "Multi-site HVAC/BMS deployment with centralized management. Deploy identical HMI configurations across facilities with group-based fleet management. Node-RED visual programming with pre-built automation blocks.",
      image: "/img/use-cases/building-automation.png"
    },
    {
      title: "Edge IoT Gateway",
      description: "Process 10,000+ sensor messages/sec at the edge with local data aggregation and filtering. LoRaWAN and Zigbee expansion modules for wireless sensor networks. Real-time visualization with sub-second latency.",
      image: "/img/use-cases/edge-iot-gateway.png"
    }
  ],
  
  challenges: [
    "Weeks to configure each HMI manually with custom SD card images",
    "No rollback when UI updates fail in production",
    "Consumer-grade OS unsuitable for 24/7 industrial operation",
    "Custom BSP development for each deployment scenario",
    "No centralized visibility across distributed HMI fleets"
  ],
  
  solutions: [
    "Deploy 100s of HMIs in hours with zero-touch provisioning",
    "Atomic updates with instant rollback on failure",
    "Industrial Linux with real-time kernel and 7-year support",
    "Pre-integrated BSP with optimized display drivers out-of-the-box",
    "Single dashboard for monitoring and managing entire fleet"
  ],
  
  features: [
    {
      icon: "DeviceTablet",
      title: "Avocado OS - Production Linux for reTerminal",
      description: "Deterministic Yocto Linux optimized for reTerminal and Raspberry Pi CM4. Pre-integrated Qt 6, Flutter, and LVGL UI frameworks. Wayland compositor optimized for IPS multi-touch display performance."
    },
    {
      icon: "CpuChip",
      title: "Day 1 Production Ready",
      description: "Skip months of BSP development with pre-integrated Raspberry Pi CM4 support. Optimized drivers for the IPS multi-touch display and wireless connectivity. Real-time kernel patches for deterministic performance in industrial environments."
    },
    {
      icon: "ShieldCheck",
      title: "Enterprise Security & Compliance",
      description: "Secure boot chain from bootloader to application. Encrypted storage with TPM 2.0 support. SBOM generation for supply chain compliance. Kiosk mode with lockdown policies for operator terminals."
    },
    {
      icon: "GlobeAlt",
      title: "Fleet-Scale Operations",
      description: "Manage 1000+ reTerminals from a single dashboard. Phased rollouts with automatic rollback on failure. Group-based configuration for site-specific settings. Real-time health monitoring and alerting."
    },
    {
      icon: "CommandLine",
      title: "Industrial Protocol Suite",
      description: "Native Modbus RTU/TCP with optimized response times. OPC UA server/client with security profiles. MQTT 5.0 with QoS and retained messages. Pre-built Node-RED flows for common automation patterns."
    },
    {
      icon: "WrenchScrewdriver",
      title: "Developer Acceleration",
      description: "Hardware-in-the-loop development reduces iteration from weeks to hours. Remote debugging with full stack traces. Performance profiling for UI and system optimization. Cross-compilation SDK for CI/CD pipelines."
    }
  ],
  
  cta: {
    title: "Ready to Deploy reTerminal at Scale?",
    description: "Transform your Seeed reTerminal HMIs into a production fleet. Get deterministic Linux, secure OTA orchestration, and enterprise fleet management - all production-ready from Day 1.",
    primaryButton: {
      text: "Request a Demo",
      link: "https://peridio.com/book-a-meeting"
    }
  }
}

export default function SeeedSolution() {
  return <SolutionLayout {...solutionData} />
}