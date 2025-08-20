import React from 'react'
import SolutionLayout from '@site/src/components/solutions/SolutionLayout'

const solutionData = {
  title: "Qualcomm IQ-9 Premium Edge AI | Flagship Performance | Peridio",
  description: "Deploy Qualcomm IQ-9 (QCS8550) flagship edge AI platform with 45 TOPS performance. Production-ready with Peridio Fleet + Avocado OS for automotive and premium applications.",
  keywords: "qualcomm iq-9, qcs8550, flagship edge ai, 45 tops, automotive ai, premium edge computing, device management, ota updates",
  ogImage: "/img/iq-9.jpeg",
  canonicalUrl: "https://docs.peridio.com/solutions/qualcomm/iq-9",
  
  hero: {
    title: "Premium Edge AI Performance with Qualcomm IQ-9",
    highlight: "Premium Edge AI",
    subtitle: "Flagship-grade edge AI with 45 TOPS compute power, production-ready with Peridio Fleet + Avocado OS",
    stats: [
      { value: "45", label: "TOPS AI Performance" },
      { value: "4nm", label: "Premium Process" },
      { value: "Wi-Fi 7", label: "Next-Gen Connectivity" }
    ],
    primaryCTA: {
      text: "Request Demo",
      link: "https://peridio.com/book-a-meeting"
    },
    image: "/img/Qualcomm-IQ9.png",
    imageAlt: "Qualcomm IQ-9 QCS8550 development platform"
  },
  
  valueProposition: {
    title: "Solution Overview",
    content: "The Qualcomm IQ-9 (QCS8550), enhanced with Avocado Linux and Peridio Fleet, delivers flagship-grade edge AI performance with 45 TOPS of compute power in a production-ready platform. Built on a premium 4nm process, this solution brings smartphone-class AI capabilities to industrial and automotive applications, featuring an 8-core Kryo CPU, Adreno 740 GPU, and advanced Hexagon NPU for concurrent multi-model inference. The pre-integrated Linux environment with Wi-Fi 7, 5G, and comprehensive driver support eliminates months of complex SoC bring-up, while enterprise OTA and fleet management enable secure deployment at scale. Perfect for autonomous vehicles, advanced manufacturing, and smart city infrastructure, the IQ-9 platform transforms cutting-edge silicon into deployable edge AI systems with thermal management, hardware security, and 10+ years of support."
  },
  
  specs: [
    {
      label: "AI Performance",
      value: "45 TOPS (INT8)",
      note: "Flagship Hexagon NPU for multi-model inference"
    },
    {
      label: "SoC",
      value: "Qualcomm QCS8550",
      note: "Premium 4nm process with advanced AI architecture"
    },
    {
      label: "CPU",
      value: "8-core Kryo (1×X3 @ 3.2GHz, 4×A715, 3×A510)",
      note: "Flagship mobile CPU configuration"
    },
    {
      label: "GPU",
      value: "Adreno 740",
      note: "Console-class graphics with compute support"
    },
    {
      label: "Memory",
      value: "Up to 16GB LPDDR5X",
      note: "High-capacity for large AI models"
    },
    {
      label: "Connectivity",
      value: "Wi-Fi 7, Bluetooth 5.3, 5G mmWave",
      note: "Next-generation wireless connectivity"
    }
  ],

  useCases: [
    {
      title: "Autonomous Vehicles",
      description: "Real-time sensor fusion, object detection, and path planning with multiple AI models running simultaneously for ADAS and autonomous driving.",
      image: "/img/use-cases/autonomous-mobile-robots.png",
      imageAlt: "Autonomous Vehicles"
    },
    {
      title: "Advanced Manufacturing",
      description: "High-speed quality inspection with multi-camera systems and complex AI models for defect detection and classification.",
      image: "/img/use-cases/workplace-safety.png",
      imageAlt: "Advanced Manufacturing"
    },
    {
      title: "Smart City Infrastructure",
      description: "Multi-modal AI for traffic optimization, security monitoring, and environmental sensing with 5G coordination.",
      image: "/img/use-cases/quality-Inspection.png",
      imageAlt: "Smart City Infrastructure"
    }
  ],

  challenges: [
    "Complex flagship SoC integration",
    "Multi-model inference orchestration",
    "Thermal management at scale",
    "Enterprise-grade security requirements",
    "Long development cycles for premium platforms"
  ],

  solutions: [
    "Fully optimized QCS8550 drivers",
    "Dynamic resource allocation",
    "Advanced thermal controls",
    "Hardware-backed security",
    "Rapid premium platform deployment"
  ],

  features: [
    {
      icon: "RocketLaunch",
      title: "Flagship Optimization",
      description: "Fully utilizes QCS8550's AI capabilities with optimized drivers for Hexagon NPU, Adreno GPU compute, and advanced ISP processing."
    },
    {
      icon: "CpuChip",
      title: "Multi-Model Inference",
      description: "Support for concurrent execution of multiple AI models with dynamic resource allocation and thermal management."
    },
    {
      icon: "Bolt",
      title: "Hardware Acceleration",
      description: "Native integration with Qualcomm AI Engine Direct SDK for maximum performance and efficiency at flagship scale."
    },
    {
      icon: "LockClosed",
      title: "Enterprise Security",
      description: "Hardware-backed security with Qualcomm Secure Processing Unit, secure boot chain, and encrypted storage."
    },
    {
      icon: "Wifi",
      title: "Advanced Fleet Operations",
      description: "Sophisticated device management with A/B update partitions, rollback protection, and remote diagnostics."
    },
    {
      icon: "GlobeAlt",
      title: "Future-Ready Connectivity",
      description: "5G and Wi-Fi 7 support enables ultra-low latency edge-to-cloud coordination for premium applications."
    }
  ],

  cta: {
    title: "Ready for Flagship Edge AI Performance?",
    subtitle: "Transform your Qualcomm IQ-9 into the ultimate edge AI platform for the most demanding applications requiring flagship performance and enterprise reliability.",
    primaryCTA: {
      text: "Request Demo",
      link: "https://peridio.com/book-a-meeting"
    }
  }
}

export default function IQ9SolutionNew() {
  return <SolutionLayout {...solutionData} />
}