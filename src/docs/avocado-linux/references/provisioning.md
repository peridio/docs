---
title: Provisioning
description: 'Avocado Linux provisioning processes for preparing target hardware - image generation, bootloader configuration, and deployment strategies for reliable installation.'
---

Avocado Linux provisioning encompasses the processes and methodologies for preparing target hardware to run Avocado OS. This reference covers provisioning concepts, target hardware considerations, and programming environment requirements for reliable deployment.

## Concepts

Provisioning transforms build artifacts into deployable images and handles the physical installation process onto target hardware. The provisioning pipeline includes image generation, bootloader configuration, partition layout, and hardware-specific optimizations.

### Provisioning profiles

Provisioning profiles define deployment strategies for different hardware interfaces and deployment scenarios. Available profiles depend on the specific target hardware - some targets may support SD card provisioning for development workflows, while others require specialized interfaces for on-board storage like eMMC. Virtual targets using QEMU or similar environments typically don't require physical hardware interfaces. Additionally, custom profiles can be created for hardware-specific provisioning procedures or specialized deployment scenarios.

## Reliable provisioning

### Provisioning requirements

Hardware provisioning workflows have varying requirements depending on the target hardware and deployment scenario. Some provisioning processes require physical hardware interfaces like USB connections for programming devices or accessing removable storage like SD cards. Others may provision virtual targets that need no physical hardware interaction. Many provisioning workflows include containers as part of their processes, while some require specialized kernel drivers or manufacturer-specific programming tools to interface with hardware programming modes.

### Platform constraints

These diverse provisioning requirements create challenges on macOS and Windows due to their virtualization architectures. Containerization platforms on these systems run inside lightweight hypervisors, creating VM-in-VM architectures that introduce additional abstraction layers between applications and physical hardware interfaces. Device enumeration becomes less reliable as hardware management is mediated through virtualization layers, requiring manual passthrough configuration that can fail or timeout during provisioning workflows. Manufacturer-specific programming interfaces that require kernel-level access or specialized driver stacks may not function consistently in virtualized environments.

### Recommended approach

Use a native Linux environment for hardware provisioning operations. This means running Linux directly on hardware, not within a virtual machine on macOS or Windows, which would reintroduce the same virtualization frictions described above. Native Linux provides consistent hardware device support and reliable enumeration without hypervisor-based virtualization layers. Linux containers can reliably access hardware interfaces, and specialized kernel drivers and programming tools function consistently.

For teams where primary development occurs on other platforms, maintaining a dedicated native Linux machine specifically for hardware provisioning tasks ensures reliable hardware access when needed.
