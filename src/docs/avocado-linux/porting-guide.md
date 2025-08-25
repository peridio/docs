---
title: Porting Guide
description: Port Avocado OS to new hardware platforms and customize for specific deployment requirements
---

:::caution Under Development
This documentation is currently under active development. Content and procedures may change as we refine the Avocado OS platform.
:::

Avocado's architecture supports multiple target devices with a single codebase through sophisticated hardware abstraction. The same declarative configuration can be adapted for different hardware platforms, with Avocado managing the underlying differences in toolchains and kernel configurations. This unified approach provides simplified CI/CD integration for multiple hardware targets and supports products with diverse hardware variants using a single codebase.

The system's modular architecture provides comprehensive support for heterogeneous computing environments on modern SoCs. Specialized processing units like DSPs, GPUs, or AI accelerators can be managed through specific extension layers that encapsulate drivers, runtimes, and integration code. This allows teams to maintain accelerator support independently from application code while providing consistent APIs across different hardware acceleration technologies.

**Multi-Platform Support:**

- Single codebase deployment across multiple hardware architectures
- Unified development approach for different platforms
- Hardware abstraction through device tree and overlay systems
- Simplified CI/CD integration for multiple hardware targets

**Heterogeneous Computing Integration:**

- Co-processor integration for DSPs, GPUs, and AI accelerators
- Hardware abstraction layer for consistent APIs
- Extension-based driver and runtime encapsulation
- Independent accelerator support maintenance

## Next Steps

- [Architecture Overview →](./architecture-overview) - Understand the multi-platform architecture
- [System Extensions →](./system-extensions) - Build hardware-specific extensions
- [Development Environment →](./development-environment) - Set up cross-platform development
