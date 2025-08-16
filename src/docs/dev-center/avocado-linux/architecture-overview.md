---
title: Architecture Overview
description: Understand the core architecture and design principles of Avocado OS
---

:::info Under Construction
This documentation is currently under development. Content and features may change as we continue to improve and expand the Avocado OS platform.
:::

Avocado OS is a comprehensive product framework built on proven open-source technologies, designed to bridge the gap between development agility and production readiness in embedded Linux systems. Built on the Yocto Project foundation with systemd service management, btrfs for atomic updates, and overlayfs for layered system architecture, it provides a robust platform that combines data integrity with system flexibility through its sophisticated extension mechanism.

The system implements a layered architecture consisting of a read-only Core OS Layer and modular Extension Layers that enable application isolation, simplified deployment, and custom application integration. Avocado's architecture supports multiple target devices with a single codebase through hardware abstraction, managing underlying differences in toolchains and kernel configurations while providing comprehensive support for heterogeneous computing environments on modern SoCs with specialized processing units.

**Foundation Technologies:**
- Yocto Project integration for industry-standard build capabilities
- systemd service management with extension mechanism support
- btrfs and overlayfs combination for atomic updates and layered architecture
- System Extensions (sysext) and Configuration Extensions (confext)

**Multi-Platform Architecture:**
- Single codebase deployment across multiple hardware platforms
- Hardware abstraction through device tree and overlay systems  
- Heterogeneous computing support for DSPs, GPUs, and AI accelerators
- QEMU integration for virtualized development environments

## Next Steps

- [Development Environment →](./development-environment) - Set up your development tools and workflow
- [System Extensions →](./system-extensions) - Learn to build and deploy custom extensions
- [Security Implementation →](./security-implementation) - Configure comprehensive security features
- [Build & Provisioning →](./build-provisioning) - Advanced build system configuration