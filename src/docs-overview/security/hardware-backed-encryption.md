---
title: 'Hardware-Backed Encryption'
slug: /avocado-os/security/encryption
sidebar_position: 2
description: 'LUKS full-disk encryption with TPM, TEE, and secure enclave integration in Avocado OS — data at rest protection standard.'
---

# Hardware-Backed Encryption

Data at rest protection standard.

Avocado OS implements LUKS (Linux Unified Key Setup) encryption to protect sensitive data on deployed devices. When hardware security modules are available — TPMs, TrustZone TEEs, or secure enclaves — Avocado uses them to seal encryption keys so they never exist in accessible memory. For devices without dedicated security hardware, the platform provides software-based key derivation that still delivers meaningful protection.

Where the keys live matters as much as the encryption itself. A LUKS volume whose key is stored in a plaintext file on the same disk provides no real protection. Hardware-backed key storage ensures that encryption keys are bound to specific hardware and cannot be extracted, even with physical access to the storage media.

## How it works

### LUKS encryption

Avocado uses LUKS2 with AES-256-XTS for full-disk encryption of writable partitions. The BTRFS `/var` partition — which holds extensions, application data, and device state — is encrypted at the block level. The immutable root filesystem uses dm-verity for integrity (not encryption), since its contents are public (the OS itself) and integrity matters more than confidentiality.

### Hardware key storage

When the target hardware provides a security module, Avocado uses it:

| Hardware                                                | Key storage mechanism                                                                |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| TPM 2.0                                                 | Key sealed to TPM PCR state — only released when boot chain is in a known-good state |
| ARM TrustZone TEE                                       | Key stored in secure world, inaccessible from normal world OS                        |
| Secure enclave (e.g., NXP CAAM, NVIDIA security engine) | Key derived from hardware-unique secrets, never leaves the enclave                   |
| Crypto authentication co-processor                      | Key sealed to device-specific identity                                               |

The key point: encryption keys are bound to the hardware. Removing the storage media and mounting it on another device won't decrypt the data. The key only exists inside the security module on the original device.

### Software fallback

Not every embedded platform has a dedicated security module. For these devices, Avocado supports split-knowledge key derivation using Argon2id — a memory-hard key derivation function that combines multiple device-specific inputs (hardware serial numbers, provisioned secrets, boot state) to derive the encryption key. This makes brute-force extraction significantly harder than a simple passphrase, even without hardware protection.

### Per-application encryption domains

Through Avocado's extension system, different applications can maintain separate encryption domains. A system extension containing an AI model can encrypt its model weights with application-specific keys, separate from the system-level encryption. This multi-layered approach means:

- Sensitive application data is encrypted with application-specific keys
- System data uses system-level encryption
- Compromise of one domain doesn't expose the other
- Extensions can be encrypted independently of each other

### Hardware-accelerated cryptography

Avocado automatically detects and uses hardware cryptographic accelerators present on the target platform. Most modern SoCs include dedicated crypto engines (AES-NI on x86, ARM Crypto Extensions on ARM) that handle encryption at near-native throughput. The system falls back to optimized software implementations only when hardware acceleration is unavailable.

## Enabling encrypted `/var`

Encryption is off by default. An unset or `false` value leaves the plaintext
`/var` behaviour untouched.

The packages this needs are published on the **2026** release, `next` channel
only, so a project has to select that feed as well as opting the runtime in.
`cryptsetup-var` does not exist in the 2024 feed at all, and a 2024 project that
sets `encrypt: true` fails during `avocado install` with an error that names no
missing package.

```yaml
distro:
  release: 2026
  channel: next

runtimes:
  prod:
    target: imx93-frdm
    var:
      encrypt: true
      hardware: tpm2
      recovery: var-recovery
```

### Choosing a key engine

`hardware` selects which engine binds the volume, and the default is not the
right choice for production:

| Value | Behaviour |
| --- | --- |
| `auto` (default) | Uses whatever the machine ships and probes successfully. If no engine probes, it degrades to Argon2id and reports the degrade. |
| `tpm2` | Binds to the TPM, and fails closed when that engine is missing. |
| `caam` | Binds to the NXP CAAM, failing closed the same way. |
| `none` | No hardware keyslot. Requires `recovery`. |

On `auto`, a unit whose security module did not come up still boots, using a
software-derived key. Setting `tpm2` turns that case into a failure instead of
a silent downgrade to software protection.

### Supported targets

The key is sealed to an OP-TEE firmware TPM (fTPM). That path is wired and
verified on `imx93-frdm`; it is not available on Jetson yet:

| Target | Status |
| --- | --- |
| `imx93-frdm` | verified on hardware |
| `jetson-orin-nano-devkit` | not available - `optee-ftpm` is not yet wired for this board family |
| `jetson-agx-orin-devkit` | not available - `optee-ftpm` is not yet wired for this board family |

Setting `hardware: tpm2` on a Jetson target hits the "engine missing" case
from the table above: there is no fTPM to bind to on those boards yet, so the
initramfs fails closed rather than mounting `/var` unsealed.

A target whose feed does not declare the `encrypted-var` capability at all, or
does not publish `cryptsetup-var`, fails closed the same way.

### What happens on first boot

First boot runs `luksFormat` on the raw partition and creates a fresh BTRFS
filesystem inside the new LUKS2 container - it does not convert whatever was
already on the partition. Anything seeded into `/var` at build time is
discarded, not preserved; ship seed data through a different mechanism if a
device needs it present on first boot. The initramfs enrols a keyslot sealed
to the security module at the same time, and creates a recovery keyslot
alongside it. Later boots open through the sealed token, falling back to
recovery if the seal no longer matches, which a firmware update can cause.

### Operator-held recovery

The default recovery keyslot derives from the device's SoC UID, which is
readable on the device. For fleet use, hold the master yourself instead.

`avocado signing-keys create` does not apply here - it manages PKCS#11 and
hardware-backed signing keys, not a raw HMAC secret. Generate the master with
a standard tool instead:

```console
$ openssl rand -hex 32 > var-recovery.hex
```

Save it as `var-recovery` to match the runtime's `var.recovery`, then enrol a
device that is already running:

```console
$ avocado var-key enroll prod --device root@<device-ip>
```

Nothing derived from the master enters the build. To recover a unit later, with
the master on the bench and the unit's UID in hand:

```console
$ avocado var-key derive prod --uid <soc-uid>
```

This prints the passphrase as hex; `--raw` emits the bytes for piping into
`cryptsetup --key-file -`.

### Confirming what a device is doing

A unit whose sealed token no longer matches still boots, on the recovery
keyslot. That is deliberate, so a firmware update cannot strand a device, but it
means a device can stop being hardware-bound without anyone noticing.

Ask the device which keyslots it has and which one opened it:

```console
# avocadoctl var-key list
device: /dev/mmcblk0p16
slot 0: passphrase (Argon2id recovery / derived key)
slot 1: systemd-tpm2
```

A unit that still lists a `systemd-tpm2` slot but opened without it is the case
to catch. The same condition is logged at warning level, so it appears in
`journalctl -p warning`:

```text
avocado-posture: /var has a TPM2 keyslot but opened with the Argon2id recovery
key - PCR 7 no longer matches what was sealed
```

On targets that boot through U-Boot the same facts are also published into the
U-Boot environment each boot, as `avocado_var_encrypted`, `avocado_var_unlock`,
`avocado_var_tpm2_token`, `avocado_var_hwkey` and `avocado_var_recovery`, which
gives a fleet a single value to query. The pair worth alerting on there is
`avocado_var_tpm2_token=yes` with `avocado_var_unlock=argon2id`.

**Jetson has no U-Boot in its boot chain**, so that path publishes nothing there
and `fw_printenv` shows no `avocado_var_*` keys. On Jetson use `avocadoctl
var-key list` and the journal.

Treat posture as an observation for spotting drift across a fleet. It is not
tamper-evident and is not an attestation.

## Provisioning and key management

Key provisioning is integrated into the `avocado provision` workflow. During manufacturing provisioning, the CLI can:

- Generate and seal device-unique encryption keys
- Program keys into hardware security modules
- Establish key hierarchies for multi-tenant or multi-domain encryption
- Record key metadata for fleet-level key management

This happens as part of the standard provisioning flow — not as a separate manual step on the manufacturing line.
