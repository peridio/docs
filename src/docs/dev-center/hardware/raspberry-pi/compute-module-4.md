---
title: Raspberry Pi Compute Module 4
description: How to develop for Raspberry Pi Compute Module 4.
---

![Raspberry Pi 4](/img/hardware/raspberry-pi/rpi-4.jpg)

The Raspberry Pi 4 is the world’s most widely adopted single-board computer—powerful, affordable, and perfect for rapid prototyping and deployment. With up to 8GB of RAM and a quad-core Cortex-A72 processor, it’s more than capable of running advanced workloads at the edge.

When paired with Avocado OS, developers can accelerate time to production with a streamlined, repeatable Linux development environment—no complex toolchains, no custom Yocto builds.

## Technical Specifications

| Component        | Details                                                    |
|------------------|------------------------------------------------------------|
| CPU              | Quad-core 64-bit Arm Cortex-A72 (1.8 GHz)                  |
| GPU              | Broadcom VideoCore VI (graphics only, not suitable for AI) |
| Memory           | 1GB, 2GB, 4GB, or 8GB LPDDR4-3200 variants                 |
| Memory Bandwidth | 8.5 GB/s                                                   |
| Storage          | microSD card slot                                          |
| Connectivity     | Broadcom BCM43455 wireless module with Wi-Fi and Bluetooth |
| Power Modes      | 3.5W / 5W / 6.5W / 8W                                      |

## Getting Started

Get up and running with the Avocado Linux SDK in minutes.

### Prerequisites

- A Mac (macOS 10.12+) or Linux (Ubuntu 22.04+, Fedora 39+) development machine
- Docker installed
- 3GB+ available disk space

### Provisioning your device

1. Initialize your project

```bash
avocado init --target raspberrypi4 avocado-rpi4
cd avocado-rpi4
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
