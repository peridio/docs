---
title: Seeed reTerminal
description: Industrial HMI device with integrated touchscreen for IoT applications
---

# Seeed reTerminal

![reTerminal](/img/reterminal.jpg)

The Seeed reTerminal is a production-ready Human-Machine Interface (HMI) device that integrates a Raspberry Pi Compute Module 4 with a touchscreen display in a rugged tablet form factor. Designed for industrial automation, IoT control panels, and edge AI applications, it's available today from major distributors.

## Why Choose reTerminal?

- **All-in-One Solution**: Integrated display, compute, and I/O in a single device
- **Industrial Grade**: Rugged design suitable for production environments
- **Rich Connectivity**: Built-in wireless, Ethernet, and expansion options
- **Peridio Ready**: Full support for OTA updates and device management
- **Volume Available**: In stock at major distributors worldwide

## Technical Specifications

### Compute
- Quad-Core 64-bit Arm Cortex-A72 CPU at 1.5 GHz
- Raspberry Pi CM4 compatible

### Memory & Storage
- 4GB LPDDR4-3200
- 32GB eMMC onboard storage
- MicroSD card slot for expansion

### Display
- 5-inch IPS capacitive multi-touch LCD
- 720x1280 resolution
- 293 PPI pixel density
- 10-point multi-touch support

### Connectivity
- Built-in Broadcom BCM43455 wireless module
- Dual-band 802.11ac Wi-Fi
- Bluetooth 5.0
- Gigabit Ethernet port

### I/O Interfaces
- 40-pin Raspberry Pi compatible GPIO
- USB 2.0 ports
- RS232/RS485 interfaces
- CAN bus support (with expansion module)
- M.2 connector for expansion modules

### Environmental
- Operating Temperature: 0°C to 50°C
- Storage Temperature: -20°C to 70°C
- Humidity: 10% to 90% non-condensing

## Purchasing Information

The reTerminal is available from:
- **Seeed Studio**: Direct from manufacturer
- **Mouser Electronics**: Global distributor
- **Digi-Key**: Quick shipping worldwide
- **Element14**: Local stock in many regions

## Getting Started with Peridio

### Quick Start

1. **Purchase Hardware**: Order from authorized distributors
2. **Install Avocado Linux**: Flash the Peridio-enabled OS
3. **Register Device**: Connect to Peridio Cloud
4. **Deploy Updates**: Manage via Peridio Console

### Development with Avocado Linux SDK

#### Prerequisites
- Linux development machine (Ubuntu 22.04+, Fedora 39+)
- Podman installed
- 20GB+ available disk space

#### Installing the SDK

1. Pull the SDK container:
```bash
podman pull avocadolinux/sdk:apollo-edge
```

2. Create your workspace:
```bash
mkdir avocado-reterminal
cd avocado-reterminal
```

3. Start the SDK environment:
```bash
podman run -it --rm -e AVOCADO_SDK_TARGET=reterminal \
  -v $(pwd):/opt:z --entrypoint entrypoint.sh \
  avocadolinux/sdk:apollo-edge /bin/bash
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
- [Peridio Integration Guide](/dev-center/avocado-linux/getting-started)
- [Community Forum](https://forum.seeedstudio.com/)

## Next Steps

- Review the [Avocado Linux documentation](/dev-center/avocado-linux/introduction)
- Set up your [development environment](/dev-center/avocado-linux/development-environment)
- Deploy your first [OTA update](/dev-center/getting-started/first-ota-update)