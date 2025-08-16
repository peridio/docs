---
title: System Extensions
description: Build, deploy, and manage modular system extensions in Avocado OS
---

:::info Under Construction
This documentation is currently under development. Content and features may change as we continue to improve and expand the Avocado OS platform.
:::

Avocado OS utilizes systemd's extension mechanism to provide two distinct types of extensions that enable modular system composition. System Extensions (sysext) dynamically extend the `/usr/` and `/opt/` hierarchies with executable code and resources using overlayfs, activating automatically during boot. Configuration Extensions (confext) operate on the `/etc/` hierarchy to manage and deploy system configuration independently from system software.

The extension system creates a layered architecture where multiple extension layers can be composed on top of the core OS. Each extension layer contains a self-contained application environment with all dependencies, preventing conflicts between different applications or services while enabling independent versioning and updates. Applications are packaged as self-contained extension layers that are added during builds or updates, eliminating complex installation procedures.

**Extension System Benefits:**
- System Extensions (sysext) for executable code and resources
- Configuration Extensions (confext) for system configuration management  
- Self-contained application environments with dependency isolation
- Independent versioning and update capabilities

**Extension Architecture:**
- Prebuilt solutions for common requirements (container runtimes, development tools)
- Custom application integration through Avocado SDK
- Extension compatibility across different hardware platforms
- Overlayfs-based layering for efficient resource utilization

## Next Steps

- [Build & Provisioning →](./build-provisioning) - Advanced extension build configuration
- [Development Environment →](./development-environment) - Set up extension development workflow
- [Architecture Overview →](./architecture-overview) - Understand the layered system design