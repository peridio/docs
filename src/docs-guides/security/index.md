---
title: 'Security features'
sidebar_position: 0
copy_markdown: true
description: 'How Avocado OS splits security features between the feed that builds them and the runtime that opts in: encrypted /var, dm-verity, and signed boot, enabled from avocado.yaml.'
---

Avocado OS splits every security feature into two decisions, made by two different parties:

| Decision                              | Who makes it    | Where                                                 |
| ------------------------------------- | --------------- | ----------------------------------------------------- |
| Can this machine deliver the feature? | The board's BSP | `AVOCADO_SECURITY_CAPABILITIES` in the machine config |
| Does this product use it?             | You             | `avocado.yaml`, via the Avocado CLI                   |

The published feed builds everything the machine declares — kernel options, initramfs tooling, rootfs helpers, partition layout — so that you can make the second decision later, per runtime, **without rebuilding the distro**. A runtime that does not opt in behaves exactly as if the capability did not exist.

That is why enabling encrypted `/var` or dm-verity on a supported board is a few lines of `avocado.yaml` and a rebuild, not a Yocto exercise.

## The knobs

| Feature                                      | Config                                          | Guide                                                         |
| -------------------------------------------- | ----------------------------------------------- | ------------------------------------------------------------- |
| Encrypted `/var` (LUKS2, hardware-bound key) | `runtimes.<name>.var.encrypt`                   | [Encrypted /var](/developer-reference/security/encrypted-var) |
| Which key engine binds `/var`                | `runtimes.<name>.var.hardware`                  | [Encrypted /var](/developer-reference/security/encrypted-var) |
| Operator-held `/var` recovery key            | `runtimes.<name>.var.recovery`                  | [Encrypted /var](/developer-reference/security/encrypted-var) |
| dm-verity on the rootfs                      | `rootfs.image.verity`                           | [Filesystem verity](/developer-reference/security/verity)     |
| dm-verity on an extension                    | `extensions.<name>.image.verity`                | [Filesystem verity](/developer-reference/security/verity)     |
| Signed boot FIT                              | `runtimes.<name>.signing.fit_key`               | [Boot signing](/developer-reference/security/boot-signing)    |
| Bootloader enforces your key                 | `runtimes.<name>.signing.fit_key_in_bootloader` | [Boot signing](/developer-reference/security/boot-signing)    |

Signing keys themselves live in a machine-local registry managed by [`avocado signing-keys`](/developer-reference/avocado-cli/commands#avocado-signing-keys-create) — nothing secret is committed to `avocado.yaml`, which names keys only.

## What a board supports

A machine's declaration is shipped to the device as `/etc/avocado-security-capabilities`, so on-device tooling can refuse to do something the image was never built for:

```bash title="Target device"
cat /etc/avocado-security-capabilities
# encrypted-var verified-boot
```

Current state of the published 2026 (wrynose) feed:

| Target                                                  | Encrypted `/var` | Signed boot FIT                        | Rootfs verity                  | Declared capabilities                                                        |
| ------------------------------------------------------- | ---------------- | -------------------------------------- | ------------------------------ | ---------------------------------------------------------------------------- |
| `imx8mp-evk`                                            | yes              | yes                                    | yes                            | `encrypted-var verified-boot` — CAAM-backed key                              |
| `imx93-frdm`                                            | yes              | yes                                    | yes                            | `encrypted-var verified-boot` (plus `ftpm tpm2` with OP-TEE); AHAB available |
| `imx91-frdm`                                            | not yet declared | —                                      | hash partitions staged, no FIT | AHAB boot-container signing only                                             |
| `imx93-evk`, `imx95-frdm`, `var-dart`, `ucm-imx8m-plus` | not yet declared | —                                      | hash partitions staged, no FIT | `booti` boot flow                                                            |
| `jetson-*`                                              | yes              | n/a — NVIDIA boot chain, no U-Boot FIT | —                              | `encrypted-var ftpm tpm2` — key sealed to the OP-TEE fTPM                    |
| `qemuarm64`                                             | yes              | —                                      | —                              | `encrypted-var ftpm tpm2`                                                    |
| `qemux86-64`                                            | yes              | —                                      | —                              | `encrypted-var tpm2`                                                         |
| `intel-x86-64-v2/v3/v4`                                 | not yet declared | —                                      | —                              | `tpm2`                                                                       |
| `raspberrypi*`                                          | no               | —                                      | —                              | `""` — MBR layout, no dm-crypt kernel fragment yet                           |

**Extension** dm-verity is not in this table because it does not depend on the machine: it is carried in the runtime manifest and applied by avocadoctl, so `extensions.<name>.image.verity` works on every target running avocadoctl 0.11.0 or newer. Only _rootfs_ verity needs the boot FIT and the per-slot hash partitions above.

A board that is not listed as declaring a capability is not broken — it has not been wired up for it. See [adding a machine target](https://github.com/avocado-linux/meta-avocado/blob/wrynose/docs/adding-a-machine-target.md) in `meta-avocado`.

## Order of operations for a fleet

An OS update is applied by the **avocadoctl already on the device**, so a fix in the apply path never helps the update that carries it.

1. Ship the current avocadoctl in a plain OS update first.
2. Then turn on the manifest-level feature (`image.verity`, `var.encrypt`) and ship that.

Two transitions are one-way and need a reprovision rather than an update:

- Turning `var.encrypt` **off** after a device has encrypted. The partition stays LUKS; nothing opens it; `/var` does not mount.
- Moving a device onto a **new partition layout**. An update cannot add partitions.
