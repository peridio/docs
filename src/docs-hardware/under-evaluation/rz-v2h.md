---
title: 'Renesas RZ/V2H Robot RDK'
sidebar_class_name: hidden
description: 'Renesas Robot Development Kit (WS125-V2HRDKREFZ) for AI vision and robotics on the RZ/V2H MPU — up to 80 TOPS DRP-AI3, multi-core CPU, multi-OS support, and ROS 2 Jazzy.'
---

# Renesas RZ/V2H Robot RDK

Robotic Development Kit for high-performance AI vision and robotics on the Renesas RZ/V2H MPU.

**4x Cortex-A55 @ 1.8GHz** | **2x Cortex-R8 @ 800MHz** | **80 TOPS DRP-AI3** | **10 TOPS/W efficiency** | **ROS 2 Jazzy**

<a href="https://www.renesas.com/en/design-resources/boards-kits/ws125-v2hrdkrefz" target="_blank" rel="noopener noreferrer">View on Renesas.com</a>

## Overview

The Renesas RZ/V2H Robot Development Kit (WS125-V2HRDKREFZ) accelerates AI vision and robotics development on the RZ/V2H MPU. The RDK delivers up to 80 TOPS (sparse) AI inference performance via Renesas' DRP-AI3 accelerator at an industry-leading 10 TOPS/W power efficiency, alongside multi-core CPU flexibility and simultaneous multi-OS operation. The kit ships with Yocto 5.1 (Styhead) and Ubuntu 24.04 support and includes ROS 2 Jazzy for robotics workflows. Quad Cortex-A55 application cores, dual Cortex-R8 real-time cores, and a Cortex-M33 for system management unify vision AI and real-time motor/sensor control in a single platform — purpose-built for next-generation robotics, drones, and edge AI vision systems.

## Specifications

| Specification    | Value                              | Notes                           |
| ---------------- | ---------------------------------- | ------------------------------- |
| Application CPU  | 4x Arm Cortex-A55 @ 1.8GHz         |                                 |
| Real-Time CPU    | 2x Arm Cortex-R8 @ 800MHz          |                                 |
| System CPU       | 1x Arm Cortex-M33 @ 200MHz         | FPU + DSP                       |
| AI Accelerator   | DRP-AI3 (up to 80 TOPS sparse)     |                                 |
| AI Efficiency    | 10 TOPS/W                          |                                 |
| Image Processing | DRP (HW-accelerated OpenCV)        |                                 |
| GPU              | Mali-G31 (select variants)         |                                 |
| Memory           | LPDDR4/DDR4                        |                                 |
| Storage          | eMMC, xSPI, SD card                |                                 |
| High-Speed I/O   | PCIe, USB 3.2, 2x Gigabit Ethernet |                                 |
| Camera           | MIPI CSI-2                         |                                 |
| Display          | HDMI (via expansion board)         |                                 |
| OS Support       | Yocto 5.1 (Styhead), Ubuntu 24.04  | Simultaneous multi-OS operation |
| Robotics Stack   | ROS 2 Jazzy                        |                                 |
| Debug            | Onboard JTAG, DIP switches         | Flexible power architecture     |

## Use Cases

- **Robotics development and deployment** with ROS 2 Jazzy and real-time motor/sensor control on the Cortex-R8 cores
- **UAV/drone flight control systems** combining edge AI vision with deterministic real-time control
- **AI-enabled vision processing** for autonomous machines, AGVs, and AMRs
- **Industrial vision systems** requiring hardware-accelerated OpenCV alongside neural network inference
