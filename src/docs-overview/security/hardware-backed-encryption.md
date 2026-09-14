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
`/var` behaviour untouched. Opt a runtime in through its `var` block:

```yaml
runtimes:
  prod:
    target: jetson-orin-nano
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

On Jetson the key is sealed to the OP-TEE firmware TPM. These targets support
it today, on the `2026` release and `next` channel:

- `jetson-orin-nano`
- `jetson-orin-nx`
- `jetson-agx-orin`
- `jetson-agx-thor`

A target whose feed does not declare the `encrypted-var` capability and publish
`cryptsetup-var` fails closed. The initramfs refuses to touch the partition and
`/var` does not mount, rather than silently staying plaintext.

### What happens on first boot

The flashed partition is encrypted in place, so content seeded at build time
survives. The initramfs enrols a keyslot sealed to the security module, and
creates a recovery keyslot alongside it. Later boots open through the sealed
token, falling back to recovery if the seal no longer matches, which a firmware
update can cause.

### Operator-held recovery

The default recovery keyslot derives from the device's SoC UID, which is
readable on the device. For fleet use, hold the master yourself instead:

```console
$ avocado signing-keys create var-recovery --algorithm hmac-sha256
```

Name that key in the runtime's `var.recovery`, then enrol a device that is
already running:

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
keyslot. That is deliberate, so a firmware update cannot strand a device, but
it means a device can stop being hardware-bound without anyone noticing. Each
boot publishes its posture, and the pair worth alerting on is a device that has
a TPM keyslot and did not use it. The same condition is logged at warning level.

Treat posture as an observation for spotting drift across a fleet. It is not
tamper-evident and is not an attestation.

## Provisioning and key management

Key provisioning is integrated into the `avocado provision` workflow. During manufacturing provisioning, the CLI can:

- Generate and seal device-unique encryption keys
- Program keys into hardware security modules
- Establish key hierarchies for multi-tenant or multi-domain encryption
- Record key metadata for fleet-level key management

This happens as part of the standard provisioning flow — not as a separate manual step on the manufacturing line.
