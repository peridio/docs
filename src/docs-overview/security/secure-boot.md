---
title: 'Secure Boot'
slug: /avocado-os/security/secure-boot
sidebar_position: 0
description: 'Hardware root of trust and cryptographic boot chain verification in Avocado OS — configured out of the box across NVIDIA, NXP, Raspberry Pi, and more.'
---

# Secure Boot

Hardware root of trust configured out of the box.

:::tip Enabling it
See [Boot signing](/developer-reference/security/boot-signing) in the developer reference for the `signing.fit_key` workflow, making the bootloader enforce your key, and AHAB on i.MX 9.
:::

Secure boot establishes a cryptographic chain of trust beginning at the silicon and extending through the bootloader and kernel: each stage verifies the next before transferring control, and if any stage fails verification the system refuses to boot — protecting against both malicious tampering and unintentional corruption.

The chain can be carried further, to the root filesystem and to individual system extensions, with dm-verity. That is an opt-in per image (`image.verity`) rather than something enabled by default, and for the rootfs it currently depends on the target being able to carry the root hash in a signed boot image. See [Filesystem Integrity](filesystem-integrity) for what applies where.

The challenge is that every silicon vendor has a different mechanism for establishing a root of trust, different fuse provisioning procedures, and different signing toolchains. Avocado abstracts this behind a unified interface that works the same way regardless of the underlying hardware.

## How it works

### Board-agnostic CLI

Avocado's CLI abstracts the vendor-specific complexity behind configuration rather than per-vendor commands. You name a signing key in `avocado.yaml`; the build invokes the appropriate board-specific module — handling key management, signature generation, and bootloader enforcement for you.

```yaml title="avocado.yaml"
runtimes:
  prod:
    signing:
      fit_key: product-fit
```

Under the hood, this leverages a modular backend with board-specific modules created from host tools provided by vendor Yocto layers. These modules are packaged into Avocado's composable SDK package repositories, so secure boot tooling is installed only when needed and stays consistently versioned with the rest of your development environment.

### Chain of trust

The boot chain verification flows through each stage:

1. **Silicon ROM** — Vendor-programmed immutable code validates the first-stage bootloader against keys burned into hardware fuses.
2. **Bootloader** — Verified bootloader validates the kernel image and device tree using developer-provided signing keys.
3. **Kernel** — Verified kernel can enforce dm-verity on the root filesystem when the rootfs image opts in (see [Filesystem Integrity](filesystem-integrity)).
4. **Root filesystem** — Immutable EROFS image. With verity enabled it is verified block-by-block at read time; without it the image is still read-only, but unverified.
5. **Extensions** — Each system extension (sysext) and configuration extension (confext) can be verity-protected with `image.verity`, and is then verified before overlay.

### Multi-vendor signing authorities

Production supply chains are rarely simple. The OEM controls the core system, but third-party vendors may supply extensions, drivers, or application layers. Avocado supports multiple signing authorities — different components can be authorized by separate entities while maintaining an end-to-end chain of trust.

This means an OEM can control core system signing while enabling hardware partners to sign their own driver extensions, without either party needing access to the other's keys.

### Fuse provisioning

For silicon vendors that use one-time programmable (OTP) fuses to establish the hardware root of trust, Avocado's provisioning toolchain handles fuse programming as part of the manufacturing flow. The `avocado provision` command manages this alongside image flashing — one step, not a separate manual procedure.

## Security from day one

Because the same signing infrastructure is available in development, staging, and production, there's no late-stage "security integration phase." Development builds can run with the same security controls that production uses. Teams can progressively enable and validate security features throughout development rather than discovering compatibility issues right before ship.
