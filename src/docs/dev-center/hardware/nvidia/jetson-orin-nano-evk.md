---
title: NVIDIA Jetson Orin Nano EVK
description: How to develop for NVIDIA Jetson Orin Nano EVK.
---

![Jetson Orin Nano Super](/img/hardware/nvidia/orin-nano.jpg)

The Jetson Orin Nano Developer Kit delivers exceptional performance for real-time ML at the edge—up to 67 TOPS of AI compute. Paired with Avocado OS, you can deploy full inference pipelines in minutes, without the typical headaches of cross-compiling or system reboots.

Whether you're building computer vision, robotics, or edge AI applications, this target gets you production-ready fast.

## Technical Specifications

| Component        | Details                                                    |
|------------------|------------------------------------------------------------|
| CPU              | 6-core Arm Cortex-A78AE v8.2 (1.7 GHz)                     |
| GPU              | NVIDIA Ampere GPU with 1024 CUDA cores and 32 tensor cores |
| AI Performance   | Up to 67 TOPS (INT8)                                       |
| Memory           | 8GB 128-bit LPDDR5                                         |
| Memory Bandwidth | 102 GB/s                                                   |
| Storage          | 2 x M.2 Key M slots for PCIe NVMe SSDs                     |
| Connectivity     | Single M.2 Key E wireless module with Wi-Fi and Bluetooth  |
| Power Modes      | 7W / 15W / 25W                                             |

## Getting Started

Get up and running with the Avocado Linux SDK in minutes.

### Prerequisites

- A Mac (macOS 10.12+) or Linux (Ubuntu 22.04+, Fedora 39+) development machine
- Docker installed
- 10GB+ available disk space


### Provisioning your device

1. Initialize your project

```bash
avocado init --target jetson-orin-nano-devkit-nvme avocado-jetson-orin-nano
cd avocado-jetson-orin-nano
```

2. Install all components (SDK, extensions, and runtime dependencies):

```bash
avocado install -f
```

3. Build all components

```bash
avocado build
```

4. Provision a runtime

```bash
avocado provision -r dev
```
