---
title: 'Secure Boot'
slug: /avocado-os/security/secure-boot
sidebar_position: 0
description: 'Hardware root of trust and boot chain verification in Avocado OS: signing-key management, per-vendor mechanisms, and what is enforced on which target today.'
---

# Secure Boot

Hardware root of trust, configured at build time.

Secure boot means a cryptographic chain of trust that begins at the silicon and extends through the bootloader into the kernel. Each stage verifies the next before transferring control, and a stage that fails verification refuses to boot, protecting against both malicious tampering and unintentional corruption.

Past the kernel, the root filesystem and extensions rest on immutability and on signature verification at install time, not on verification at read time. Read-time block verification is not enabled yet; see [Filesystem Integrity](filesystem-integrity) for what that covers and what it does not.

:::caution Enforcement status

Boot chain enforcement is not enabled on any target in the current release. What ships today is the groundwork: per-machine key generation at build time, and signing-key management through the CLI, both described below. Signature verification in the bootloader is in development for the NXP i.MX 93, using both the SoC's own AHAB mechanism and U-Boot FIT signature verification; other targets have not been started.

Read the chain of trust below as the model this is being built toward, and the sections around it as what you can set up now. An earlier version of this page described an `avocado secure-boot enable` command and vendor-specific CLI backends. Neither exists.

:::

The challenge is that every silicon vendor has a different mechanism for establishing a root of trust, different fuse provisioning procedures, and different signing toolchains. Avocado's approach is to keep key management uniform in the CLI and let the per-vendor mechanism stay where it belongs, in the board's own build configuration.

## How it works

### Signing keys

Key management is the part that is uniform across hardware. `avocado signing-keys` registers, lists, and removes the keys used for extension and image signing:

```bash
avocado signing-keys create release-signing
avocado signing-keys list
```

A key can live in an external PKCS#11 token rather than on disk, which keeps the private half off the build host entirely. Pass a token URI, or name a device type and let the CLI find it:

```bash
avocado signing-keys create release-signing \
  --uri 'pkcs11:token=YubiKey;object=signing-key'

avocado signing-keys create release-signing \
  --pkcs11-device yubikey --generate
```

`--generate` creates the key inside the device, so the private half never exists outside it. `tpm` is accepted in place of `yubikey` for a TPM-backed key.

### Build-time configuration

Secure boot itself is configured when the image is built, not switched on afterward from the CLI. The `secureboot` distro feature is enabled by default, and generates the UEFI key chain (PK, KEK, db, dbx) per machine during the build. The private halves stay on the build host and are never placed in an image, by design.

The public certificates stay on the build host too, for now. A recipe exists to package them for the target under `/usr/share/avocado/sb-keys`, but no image pulls it in yet, so a running device does not currently carry its own certificates. That is part of the enforcement work rather than a separate gap.

Whether the bootloader then _enforces_ a signature depends on the silicon's own mechanism, and that is configured per board rather than through a common switch. See the enforcement note above for where each target stands.

### Chain of trust

This is the model the work above is building toward. Stages 1 and 2 are what "enforcement" means, and per the note above they are in development rather than shipped. Stages 3 to 5 describe protections that hold today independent of that enforcement, immutability and install-time signature verification, not a verified boot chain reaching the kernel.

1. **Silicon ROM** — Vendor-programmed immutable code validates the first-stage bootloader against keys burned into hardware fuses.
2. **Bootloader** — Verified bootloader validates the kernel image and device tree using developer-provided signing keys.
3. **Kernel** — Mounts the immutable root filesystem read-only. Whether the kernel itself was verified before it started is stage 2's job and isn't enforced yet; block-level verification of the filesystem at read time is not enabled either (see [Filesystem Integrity](filesystem-integrity)).
4. **Root filesystem** — Immutable read-only erofs image, signature-verified when it was installed and unmodifiable at runtime.
5. **Extensions** — System extensions (sysext) and configuration extensions (confext) are replaced whole rather than patched, and can be signed as KAB packages at build time. Per-extension verification before overlay is not enabled yet.

### Multi-vendor signing authorities

Production supply chains are rarely simple. The OEM controls the core system, but third-party vendors may supply extensions, drivers, or application layers. Avocado supports multiple signing authorities: any number of keys can be registered, each held by whoever owns it, and PKCS#11 support means a partner's key can stay in their own token.

This means an OEM can control core system signing while enabling hardware partners to sign their own driver extensions, without either party needing access to the other's keys. What this does not yet give you is a single verified chain linking those signatures together at boot, which is the enforcement work described above.

### Fuse provisioning

Most silicon that offers a hardware root of trust establishes it in one-time programmable (OTP) fuses: you burn a hash of your public key into the SoC, and from then on its ROM will only start a bootloader signed by the matching private key.

Avocado does not program fuses today. `avocado provision` deploys a runtime to a device and does not touch them, and there is no fuse-burning tooling in the board layers either. Burning fuses is a manual step with the silicon vendor's own tool, and folding it into the provisioning flow is part of the enforcement work above.

Treat it as one-way. A fuse cannot be unburned, a wrong value cannot be corrected, and a board whose key hash is burned incorrectly can no longer establish a root of trust at all. Practice the procedure on a board you are willing to lose before running it on anything else, and check the byte order the vendor's tool expects against the byte order your key hash is printed in, because the two do not always match.

## Security from day one

Because the same signing infrastructure is available in development, staging, and production, there's no late-stage "security integration phase." The controls that do ship today (signing keys including hardware-backed ones, per-machine key generation, an immutable root, and [encrypted storage](/avocado-os/security/encryption)) are the same in a development build as in a production one, so you can set them up and validate them early rather than discovering compatibility issues right before ship. Bootloader enforcement lands into that same configuration rather than replacing it.
