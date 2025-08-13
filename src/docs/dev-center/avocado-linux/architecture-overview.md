---
title: Architecture Overview
description: Understand the core architecture and design principles of Avocado OS
---

:::info Under Construction
This documentation is currently under development. Content and features may change as we continue to improve and expand the Avocado OS platform.
:::

Avocado OS reimagines embedded Linux with a composable, layered architecture designed for both rapid development and production deployment. Built on proven technologies while introducing modern approaches to system composition and management.

## System Components

### Core System Layer
The foundation of Avocado OS is a minimal, immutable base system that provides essential services and kernel functionality. This layer is intentionally kept small and stable, reducing attack surface and simplifying validation.

**Key characteristics:**
- Immutable root filesystem for consistency
- Minimal service footprint
- Hardware abstraction through device tree
- Standardized boot process across platforms

### System Extensions Framework
Extensions provide modular functionality that can be dynamically added to the base system without modifying the core image. Each extension is self-contained and versioned independently.

**Extension capabilities:**
- Kernel modules and drivers
- System services and daemons
- Runtime libraries and dependencies
- Configuration overlays

### Container Runtime
Avocado OS includes a lightweight container runtime for application deployment, enabling portable services that run consistently across different hardware platforms.

**Container features:**
- OCI-compliant runtime
- Resource isolation and limits
- Network namespace management
- Persistent volume support

## Extension Model

### Extension Architecture
Extensions in Avocado OS follow a well-defined structure that ensures compatibility and predictable behavior across different system configurations.

**Extension components:**
- Manifest defining metadata and dependencies
- Binary artifacts and libraries
- Configuration templates
- Lifecycle hooks for installation and removal

### Extension Loading
The extension loader manages the discovery, validation, and integration of extensions into the running system. Extensions can be loaded at boot time or dynamically during runtime.

**Loading process:**
- Signature verification
- Dependency resolution
- Filesystem overlay mounting
- Service registration and startup

### Extension Isolation
Each extension runs in a controlled environment with defined boundaries to prevent conflicts and ensure system stability.

**Isolation mechanisms:**
- Filesystem namespaces
- Resource quotas
- Capability restrictions
- Inter-extension communication channels

## Boot Process

### Secure Boot Chain
Avocado OS implements a trusted boot process that validates each component before execution, establishing a chain of trust from hardware to application.

**Boot stages:**
1. Hardware initialization and ROM code
2. Bootloader verification and execution
3. Kernel and initramfs validation
4. Root filesystem mounting
5. Extension loading and verification
6. Service initialization

### Boot Configuration
The boot process is configured through a combination of bootloader parameters, device tree, and runtime configuration files.

**Configuration sources:**
- U-Boot environment variables
- Device tree and overlays
- Kernel command line parameters
- System configuration in `/etc/avocado`

### Recovery and Fallback
Built-in recovery mechanisms ensure system resilience in case of boot failures or corrupted updates.

**Recovery features:**
- Dual partition scheme for A/B updates
- Automatic rollback on boot failure
- Recovery mode for system repair
- Factory reset capability

## Next Steps

- [Development Environment →](./development-environment) - Set up your development tools
- [System Extensions →](./system-extensions) - Learn to build custom extensions
- [Security Implementation →](./security-implementation) - Configure security features