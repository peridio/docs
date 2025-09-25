---
title: 'Extensions'
description: 'Avocado Linux extensions system - composable System Extensions (sysext) and Configuration Extensions (confext) for modular embedded development.'
---

Unlike conventional embedded Linux distributions, Avocado uses a sophisticated layered architecture. An immutable, cryptographically verifiable base system combines with composable System Extensions (sysext) and Configuration Extensions (confext) to enable applications and services as self-contained, isolated components. This design delivers web development-like iteration speeds through live NFS-mounted extensions and hardware-in-the-loop debugging.

## System Extensions (sysext)

System Extensions dynamically extend the `/usr/` and `/opt/` directory hierarchies at runtime without modifying the base system. Extensions contain files structured like a regular OS tree, combined with the host OS using overlayfs when activated during boot.

Extensions can be provided as plain directories, btrfs subvolumes, or disk images (GPT-partitioned or raw filesystems like squashfs/erofs). They're automatically activated by systemd-sysext after filesystems mount but before basic.target, ensuring extended functionality is available when services initialize.

## Configuration Extensions (confext)

Configuration Extensions operate exclusively on the `/etc/` hierarchy, enabling runtime reconfiguration of OS services without deploying new code or complete OS updates. This allows independent management of system configuration, security policies, and environment-specific settings.

## Development Workflow

The extension system transforms embedded development from edit-compile-flash-boot-test cycles into interactive workflows:

- **Live NFS-mounted extensions**: Changes reflect immediately on target devices
- **Interactive debugging**: GDB server integration with live code updates
- **Hot reloading**: Update application code without losing system state

Learn how to leverage these capabilities with [hardware-in-the-loop development](../guides/hardware-in-the-loop), which enables web development-like iteration speeds on embedded devices.

Extensions integrate with Avocado's SDK for declarative package selection, custom toolchain extensions, and versioned dependencies across development environments.

## Security and Composition

Extensions maintain security through compatibility enforcement via release files, cryptographic signature verification, and integrity checking during runtime. Multiple extensions compose together with clear isolation boundaries - each contains complete dependencies and cannot modify the immutable base system.

A typical composition might include:

```
Base Avocado OS
├── Container runtime extension
├── AI framework extension
├── Networking tools extension
└── Custom application extension
```

Extensions enable atomic updates, independent rollback capability, and staged deployment across device fleets while maintaining the same composability and security properties from development through production.
