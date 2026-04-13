---
title: 'Meta Avocado'
sidebar_position: 9
description: 'Avocado distro layer for Yocto — immutable Linux distribution built on systemd with BSP layers for NVIDIA, NXP, Raspberry Pi, Qualcomm, and more.'
---

<a href="https://github.com/avocado-linux/meta-avocado" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/Source_Code-GitHub-7b6ff0?logo=github&logoColor=white&style=for-the-badge" alt="Source Code on GitHub" /></a>

# Meta Avocado

Meta Avocado is the Yocto distro layer that powers Avocado OS. It's the build infrastructure that compiles the package feeds, kernels, BSPs, and SDK toolchains that the Avocado CLI consumes. Most users never interact with it directly — this is the layer Avocado maintains so you don't have to.

## Layer Structure

| Layer | Purpose |
|---|---|
| `meta-avocado-distro` | Core distribution configuration |
| `meta-avocado-sdk` | SDK tools and cross-compilation support |
| `meta-avocado-shared` | Common shared configurations |
| `meta-avocado-qemu` | QEMU emulation support |
| `meta-avocado-tpm` | TPM secure boot integration |

### Platform BSP Layers

| Layer | Targets |
|---|---|
| `meta-avocado-raspberrypi` | Raspberry Pi 5, Pi 4, Pi Zero 2 W |
| `meta-avocado-nvidia` | Jetson Orin Nano, Jetson AGX Orin |
| `meta-avocado-nxp` | i.MX 8M Plus, i.MX 93, i.MX 91 |
| `meta-avocado-x86-64` | Intel x86-64-v2, x86-64-v3 |
| `meta-avocado-rockchip` | Rockchip platforms |
| `meta-avocado-stm` | STMicroelectronics STM32MP |
| `meta-avocado-rubikpi` | Qualcomm RB3 Gen 2 |

## Technical Details

- **Build system**: BitBake via [KAS](https://kas.readthedocs.io/)
- **License**: Apache 2.0
- **Languages**: BitBake (60%), Shell (36%), Python (4%)

## Building from Source

Meta Avocado uses KAS for build orchestration:

```bash
source init-build $KAS_YML
kas build $KAS_YML
```

For QEMU testing:

```bash
run-qemux86-64-swtpm
```

:::note
Most users do not need to build meta-avocado directly. The Avocado CLI pulls pre-built packages from the Avocado package feeds. This repository is primarily for Avocado OS contributors and users who need to customize the distribution layer itself.
:::
