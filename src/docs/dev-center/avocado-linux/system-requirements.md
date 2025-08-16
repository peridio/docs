---
title: System Requirements
description: Hardware and software requirements for running Avocado OS and the SDK.
---

:::info Under Construction
This documentation is currently under development. Content and features may change as we continue to improve and expand the Avocado OS platform.
:::

Avocado OS is built on the Yocto Project foundation, chosen for its industry-standard approach and comprehensive hardware support. The system leverages Yocto to create pre-built binary packages and images, allowing users to compose complete systems without dealing with Yocto's inherent complexity. Unlike traditional approaches that rely on runtime package management, Avocado's binary distribution model uses package repositories during the build phase to create custom extensions.

The development environment operates through containerized workflows that provide seamless connection to target devices. This approach eliminates the complexity typically associated with embedded Linux development while maintaining the power and flexibility of the underlying Yocto build system. The SDK provides all necessary tools for building system extensions, creating bootable images, and deploying to both virtual and physical hardware targets.

**Key Requirements:**
- Yocto Project-compatible development environment
- Container runtime support for SDK deployment
- Hardware abstraction through device tree support
- Multi-platform toolchain compatibility

**Supported Deployment Targets:**
- QEMU virtualized environments for development and testing
- Multiple hardware architectures through unified toolchain
- Custom hardware integration through device tree overlays

## Next Steps

- [Development Environment →](./development-environment) - Set up your containerized development workflow
- [Architecture Overview →](./architecture-overview) - Understand the foundational system design
- [System Extensions →](./system-extensions) - Learn about the modular extension system
