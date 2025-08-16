---
title: Development Environment
description: Set up and configure your Avocado OS development environment for building, testing, and deploying embedded Linux systems
---

:::caution Under Development
This documentation is currently under active development. Content and procedures may change as we refine the Avocado OS platform.
:::

Avocado OS provides an interactive development experience that feels more like modern web development than traditional embedded Linux workflows. Developers work in containerized environments with seamless connection to target devices, enabling live code reloading and interactive debugging capabilities. This approach eliminates the traditional barriers between development and target deployment, allowing for rapid iteration and experimentation.

The development workflow includes live NFS-mounted extensions where changes to code or configurations are immediately reflected on the target device without redeployment. Interactive debugging through GDB server integration provides breakpoint and variable inspection capabilities directly on target hardware. Additionally, soft reboot capabilities allow developers to restart only necessary components instead of the entire system, significantly accelerating the development cycle.

**Key Development Features:**
- Containerized development environments with target device integration
- Live NFS-mounted extensions for immediate code reflection
- Interactive debugging with GDB server integration
- Soft reboot capabilities for component-level restarts

**Multi-Target Development Support:**
- Single codebase deployment across multiple hardware platforms
- Unified development approach for different architectures
- QEMU integration for virtualized development environments
- Hardware/software co-development workflows

## Next Steps

- [System Extensions →](./system-extensions) - Learn about building modular system components
- [Architecture Overview →](./architecture-overview) - Understand the foundational system design
- [Build & Provisioning →](./build-provisioning) - Advanced build system configuration