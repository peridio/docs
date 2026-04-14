---
title: 'Secure Boot'
sidebar_position: 0
description: 'Hardware root of trust and cryptographic boot chain verification in Avocado OS — configured out of the box across NVIDIA, NXP, Raspberry Pi, and more.'
---

# Secure Boot

Hardware root of trust configured out of the box.

Secure boot establishes an unbroken cryptographic chain of trust beginning at the silicon and extending through the bootloader, kernel, root filesystem, and every loaded system extension. Each component in the chain verifies the next before transferring control. If any component fails verification, the system refuses to boot — protecting against both malicious tampering and unintentional corruption.

The challenge is that every silicon vendor has a different mechanism for establishing a root of trust, different fuse provisioning procedures, and different signing toolchains. Avocado abstracts this behind a unified interface that works the same way regardless of the underlying hardware.

## How it works

### Board-agnostic CLI

Avocado's CLI abstracts the vendor-specific complexity behind consistent commands. When you issue a command to configure secure boot, the CLI automatically invokes the appropriate board-specific module — handling key management, signature generation, and hardware configuration for you.

```
# Same command, different hardware — the CLI handles the rest
avocado secure-boot enable
```

Under the hood, this leverages a modular backend with board-specific modules created from host tools provided by vendor Yocto layers. These modules are packaged into Avocado's composable SDK package repositories, so secure boot tooling is installed only when needed and stays consistently versioned with the rest of your development environment.

### Chain of trust

The boot chain verification flows through each stage:

1. **Silicon ROM** — Vendor-programmed immutable code validates the first-stage bootloader against keys burned into hardware fuses.
2. **Bootloader** — Verified bootloader validates the kernel image and device tree using developer-provided signing keys.
3. **Kernel** — Verified kernel enforces dm-verity on the root filesystem (see [Filesystem Integrity](filesystem-integrity)).
4. **Root filesystem** — Immutable SquashFS image, verified block-by-block at read time.
5. **Extensions** — Every system extension (sysext) and configuration extension (confext) is independently signed and verified before overlay.

### Multi-vendor signing authorities

Production supply chains are rarely simple. The OEM controls the core system, but third-party vendors may supply extensions, drivers, or application layers. Avocado supports multiple signing authorities — different components can be authorized by separate entities while maintaining an end-to-end chain of trust.

This means an OEM can control core system signing while enabling hardware partners to sign their own driver extensions, without either party needing access to the other's keys.

### Fuse provisioning

For silicon vendors that use one-time programmable (OTP) fuses to establish the hardware root of trust, Avocado's provisioning toolchain handles fuse programming as part of the manufacturing flow. The `avocado provision` command manages this alongside image flashing — one step, not a separate manual procedure.

## Security from day one

Because the same signing infrastructure is available in development, staging, and production, there's no late-stage "security integration phase." Development builds can run with the same security controls that production uses. Teams can progressively enable and validate security features throughout development rather than discovering compatibility issues right before ship.
