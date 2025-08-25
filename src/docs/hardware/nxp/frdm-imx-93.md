---
title: NXP i.MX 93 FRDM SBC
description: How to develop for NXP i.MX 93 FRDM SBC.
---

![FRDM i.MX 93](/img/hardware/nxp/frdm-imx-93.jpg)

The FRDM i.MX 93 is a low-cost development board for rapid prototyping. It includes built-in Wi-Fi and Bluetooth and requires extremely little power, making it ideal for modern industrial and IoT applications.

## Technical Specifications

| Component      | Details                                                     |
| -------------- | ----------------------------------------------------------- |
| CPU            | Dual-core Arm Cortex-A55 (1.7 GHz)                          |
| MCU            | Single Arm Cortex-M33 (250 MHz)                             |
| NPU            | Arm Ethos U-65 microNPU                                     |
| AI Performance | Up to 0.5 TOPS (INT8)                                       |
| Memory         | 2GB 16-bit LPDDR4X                                          |
| Storage        | 32GB eMMC + microSD card slot + M.2 Key M PCIe NVMe SSD     |
| Connectivity   | Built-in NXP IW612 wireless module with Wi-Fi and Bluetooth |

## Getting Started

Get up and running with the Avocado Linux SDK in minutes.

### Prerequisites

- A Mac (macOS 10.12+) or Linux (Ubuntu 22.04+, Fedora 39+) development machine
- Docker installed
- 10GB+ available disk space

### Provisioning your device

1. Initialize your project

```bash
avocado init --target imx93-frdm avocado-imx93
cd avocado-imx93
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
