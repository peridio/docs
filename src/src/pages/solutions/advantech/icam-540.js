import React from 'react'
import SolutionLayout from '@site/src/components/solutions/SolutionLayout'

const solutionData = {
  title: 'Advantech ICAM-540 Industrial AI Camera | Edge Vision Computing | Peridio',
  description:
    'Deploy Advantech ICAM-540 industrial AI cameras with NVIDIA Jetson Orin NX, 100 TOPS AI performance, and enterprise fleet management. Production-ready edge vision.',
  keywords:
    'advantech icam-540, industrial ai camera, nvidia jetson orin nx, sony imx334, edge ai, computer vision, camnavi sdk, deepstream, fleet management',
  ogImage: '/img/icam540.png',
  canonicalUrl: 'https://docs.peridio.com/solutions/advantech/icam-540',

  hero: {
    title: 'All-in-One AI Vision from Development to Production',
    highlight: 'Development to Production',
    subtitle:
      'Transform your Advantech ICAM-540 from AI development platform to production-grade industrial vision system with enterprise Linux and fleet management',
    stats: [
      { value: '100 TOPS', label: 'AI Performance' },
      { value: '8MP @ 45fps', label: 'Sony IMX334 Sensor' },
      { value: 'C-Mount', label: 'Flexible Lens Options' },
      { value: '6x Faster', label: 'Time to Production' },
    ],
    primaryCTA: {
      text: 'Request Demo',
      link: 'https://peridio.com/book-a-meeting',
    },
    image: '/img/hardware/advantech/advantech-icam540.png',
    imageAlt: 'Advantech ICAM-540 industrial AI camera',
  },

  valueProposition: {
    title: 'Solution Overview',
    content:
      'The Advantech iCAM-540, featuring the NVIDIA Jetson Orin NX and powered by Avocado OS, delivers a production-grade smart camera platform ready to ship value in days, not months. Turnkey integration with the underlying Jetson hardware and Triton Inference Server allows application engineers to begin iterating on computer vision models from day one. This scale-ready Linux environment ensures secure, reliable deployment across fleets, with rollback protection and centralized control built in. Together, Advantech and Peridio provide a complete, programmable foundation for industrial-grade vision systems that can move seamlessly from lab to large-scale field operations.',
  },

  specs: [
    {
      label: 'AI Processor',
      value: 'NVIDIA Jetson Orin NX',
      note: '100 TOPS for multi-model concurrent inference',
    },
    {
      label: 'Camera Sensor',
      value: 'Sony IMX334 8MP CMOS',
      note: 'Industrial-grade sensor with exceptional low-light performance',
    },
    {
      label: 'Frame Rate',
      value: '45 fps at full resolution',
      note: 'Real-time processing for high-speed inspection',
    },
    {
      label: 'Lens Mount',
      value: 'C-Mount Compatible',
      note: 'Wide selection of industrial optics available',
    },
    {
      label: 'SDK Support',
      value: 'CAMNavi + DeepStream',
      note: 'Python-based development with NVIDIA optimization',
    },
    {
      label: 'Operating Temp',
      value: '-20°C to +60°C',
      note: 'Reliable operation in industrial environments',
    },
  ],

  useCases: [
    {
      title: 'Automated Optical Inspection (AOI)',
      description:
        'Deploy 100 TOPS of AI performance for real-time defect detection on high-speed production lines. Process multiple inspection models simultaneously with sub-10ms latency.',
      image: '/img/use-cases/quality-Inspection.png',
      imageAlt: 'Quality Inspection',
    },
    {
      title: 'Industrial Safety & Compliance',
      description:
        'Monitor PPE compliance, detect safety violations, and track worker movement patterns. Edge processing ensures privacy compliance without cloud data transmission.',
      image: '/img/use-cases/workplace-safety.png',
      imageAlt: 'Safety Monitoring',
    },
    {
      title: 'Smart Factory Analytics',
      description:
        'Real-time production monitoring with on-device inference for quality metrics, throughput optimization, and predictive maintenance triggers.',
      image: '/img/use-cases/logistics-automation.png',
      imageAlt: 'Logistics Automation',
    },
  ],

  challenges: [
    '18-month custom integration for production vision deployment',
    "Manual on-camera updates that don't scale across facilities",
    'Complex AI model lifecycle without version control',
    'No unified management across camera fleets',
    'Limited remote diagnostics when vision systems fail',
  ],

  solutions: [
    'Production-ready in weeks with pre-configured vision BSPs',
    'Atomic OTA updates for models, firmware, and applications',
    'Built-in DeepStream SDK with TensorRT optimization',
    'Cross-camera orchestration with centralized management',
    'Enterprise remote diagnostics with secure tunnel access',
  ],

  features: [
    {
      icon: 'Camera',
      title: 'Production-Ready from Day One',
      description:
        'Pre-hardened Linux OS with CAMNavi SDK, DeepStream, and TensorRT pre-integrated. No prototype-to-production gap.',
    },
    {
      icon: 'CpuChip',
      title: 'Atomic AI Model Updates',
      description:
        'Zero-downtime model deployment with automatic rollback on performance degradation. Version control and A/B testing for continuous improvement.',
    },
    {
      icon: 'ShieldCheck',
      title: 'Enterprise Security',
      description:
        'Hardware-accelerated encryption, secure boot, and certificate-based authentication. Zero-trust architecture built for industrial vision systems.',
    },
    {
      icon: 'GlobeAlt',
      title: 'Vision Fleet Management',
      description:
        'Deploy and manage hundreds of ICAM-540 cameras across industrial sites. Site-specific configurations with centralized policy enforcement.',
    },
    {
      icon: 'BuildingOffice',
      title: 'Cross-Platform Portability',
      description:
        'Develop on ICAM-540 with Orin NX, deploy across NVIDIA Jetson platforms. Unified toolchain prevents vendor lock-in and reduces engineering overhead.',
    },
    {
      icon: 'WrenchScrewdriver',
      title: 'Optimized Vision Performance',
      description:
        'Hardware acceleration for GStreamer pipelines and TensorRT inference. Automatic resource allocation for multi-model concurrent processing.',
    },
  ],

  cta: {
    title: 'Ready to Deploy Production-Ready AI Vision?',
    subtitle:
      'Transform your Advantech ICAM-540 cameras into a managed vision fleet with atomic updates, remote diagnostics, and enterprise support.',
    primaryCTA: {
      text: 'Request a Demo',
      link: 'https://peridio.com/book-a-meeting',
      target: '_blank',
    },
  },

  workInProgress: {
    title: 'Provisioning Guide Coming Soon',
    message: 'We\'re actively working on a comprehensive provisioning guide for the Advantech ICAM-540. This will include step-by-step instructions for device setup, configuration, and deployment.',
    type: 'provisioning',
  },
}

export default function ICAM540SolutionNew() {
  return <SolutionLayout {...solutionData} />
}
