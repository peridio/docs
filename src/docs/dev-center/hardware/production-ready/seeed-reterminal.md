---
title: Seeed reTerminal
description: Industrial HMI device with integrated touchscreen for IoT applications
---

# Seeed reTerminal

![reTerminal](/img/reterminal.jpg)

Seeed Studio's reTerminal is an industrial HMI with the same Raspberry Pi 4 compute module at its heart, but wrapped in a touchscreen interface, expanded I/O, and a form factor designed for real-world deployment.

Since the reTerminal is just a Raspberry Pi 4 with extra peripherals, you can use Avocado OS to develop your application on a Raspberry Pi 4, then quickly retarget your finished Linux image for production hardware.

## Technical Specifications

| Component        | Details                                                    |
|------------------|------------------------------------------------------------|
| CPU              | Quad-core 64-bit Arm Cortex-A72 (1.5 GHz)                  |
| GPU              | Broadcom VideoCore VI (graphics only, not suitable for AI) |
| Memory           | 4GB LPDDR4-3200                                            |
| Memory Bandwidth | 8.5 GB/s                                                   |
| Storage          | 32GB eMMC                                                  |
| Connectivity     | Broadcom BCM43455 wireless module with Wi-Fi and Bluetooth |
| Display          | 5-inch IPS capacitive multi-touch 720x1280 LCD screen      |
| Power Modes      | 2.6W / 4.9W                                                |

## Getting Started

Get up and running with the Avocado Linux SDK in minutes.

### Prerequisites

- A Mac (macOS 10.12+) or Linux (Ubuntu 22.04+, Fedora 39+) development machine
- Docker installed
- 3GB+ available disk space

### Provisioning your device

1. Initialize your project

```bash
avocado init --target reterminal avocado-reterminal
cd avocado-reterminal
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

## Use Cases

### Industrial HMI

- Machine control panels
- Production line monitoring
- Quality control stations
- Equipment status displays

### Building Automation

- HVAC control interfaces
- Lighting control systems
- Security panel displays
- Energy management dashboards

### Edge Computing

- Local data processing
- AI inference at the edge
- Gateway applications
- Protocol conversion

## Support & Resources

- [Seeed Studio Wiki](https://wiki.seeedstudio.com/reTerminal/)
- [Hardware Datasheet](https://files.seeedstudio.com/wiki/ReTerminal/reTerminal.pdf)
- [Peridio Integration Guide](/dev-center/avocado-linux/system-requirements)
- [Community Forum](https://forum.seeedstudio.com/)

## Next Steps

- Review the [Avocado Linux documentation](/dev-center/avocado-linux/introduction)
- Set up your [development environment](/dev-center/avocado-linux/development-environment)
- Deploy your first [OTA update](/dev-center/getting-started/first-ota-update)
