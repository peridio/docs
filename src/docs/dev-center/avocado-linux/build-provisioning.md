---
title: Build & Provisioning
description: Advanced build system configuration and device provisioning workflows
---

:::info Under Construction
This documentation is currently under development. Content and features may change as we continue to improve and expand the Avocado OS platform.
:::

Avocado's binary distribution model uses package repositories during the build phase to create custom extensions, resulting in deterministic, immutable, and cryptographically verifiable system images. Unlike traditional approaches that rely on runtime package management, this build-time composition ensures system consistency and eliminates the unpredictability of runtime package conflicts.

The build system is integrated directly into the Yocto Project foundation, providing industry-standard build capabilities while abstracting away the complexity typically associated with Yocto development. Avocado manages the underlying differences in toolchains and kernel configurations, enabling the same declarative configuration to adapt across different hardware platforms with simplified CI/CD integration for multiple hardware targets.

**Build System Features:**
- Deterministic, immutable system image generation
- Cryptographically verifiable build outputs
- Yocto Project integration with complexity abstraction
- Multi-platform toolchain and configuration management

**Provisioning Capabilities:**
- Build-time extension composition and integration
- Hardware-agnostic build configuration
- Automated CI/CD pipeline integration
- Cross-platform deployment consistency

## Next Steps

- [Security Implementation →](./security-implementation) - Configure build-time security features
- [System Extensions →](./system-extensions) - Build custom system extensions
- [Update Mechanisms →](./update-mechanisms) - Configure secure update deployment