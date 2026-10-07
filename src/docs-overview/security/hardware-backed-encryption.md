---
title: 'Hardware-Backed Encryption'
slug: /avocado-os/security/encryption
sidebar_position: 2
description: 'LUKS2 encryption of the writable /var partition with TPM, TEE, and secure enclave key binding in Avocado OS — data at rest protection standard.'
---

# Hardware-Backed Encryption

Data at rest protection standard.

:::tip Enabling it
See [Encrypted /var](/developer-reference/security/encrypted-var) in the developer reference for the `var.encrypt` opt-in, choosing the key engine with `var.hardware`, and holding an operator recovery key.
:::

Avocado OS implements LUKS (Linux Unified Key Setup) encryption to protect sensitive data on deployed devices. When hardware security modules are available — TPMs, TrustZone TEEs, or secure enclaves — Avocado uses them to bind a `/var` keyslot to the device. For devices without dedicated security hardware, the platform derives the key in software. Either way, every time `/var` is opened its volume key is linked into root's user keyring so `avocadoctl var-key` can change keyslots (see [Encrypted /var](/developer-reference/security/encrypted-var#how-the-keyslot-change-is-authorized)).

Where the keys live matters as much as the encryption itself. A LUKS volume whose key is stored in a plaintext file on the same disk provides no real protection. Hardware-backed key storage ensures that encryption keys are bound to specific hardware and cannot be extracted, even with physical access to the storage media.

## How it works

### LUKS encryption

Avocado uses LUKS2 with AES-256-XTS to encrypt the writable `/var` partition. That BTRFS partition — which holds extensions, application data, and device state — is encrypted at the block level. The immutable root filesystem is not encrypted, since its contents are public (the OS itself) and integrity matters more than confidentiality; dm-verity provides that integrity when you opt in with `rootfs.image.verity`.

### Hardware key storage

When the target hardware provides a security module, Avocado uses it:

| Hardware                                                | Key storage mechanism                                                                |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| TPM 2.0                                                 | Key sealed to TPM PCR state — only released when boot chain is in a known-good state |
| ARM TrustZone TEE                                       | Key stored in secure world, inaccessible from normal world OS                        |
| Secure enclave (NXP CAAM, i.MX 8M)                      | Keyslot passphrase derived from a CAAM black key stored in the LUKS2 header          |

The hardware keyslot is bound to the device it was enrolled on. It is not the only keyslot: every platform also enrolls an Argon2id key derived from the SoC UID, which anyone who can read the UID can reproduce. Enrolling an operator recovery key with `avocado var-key enroll` lets the initramfs retire that keyslot; until it does, treat the media as readable by someone who also has the UID. See the [per-platform table](/developer-reference/security/encrypted-var#what-binds-the-key-on-each-platform).

### Software fallback

Not every embedded platform has a dedicated security module. For these devices, Avocado derives the key with Argon2id, a memory-hard key derivation function, from a single input: the SoC UID (the device tree `serial-number`, then `soc0/serial_number`). That binds the key to the unit but does not keep it secret from anyone who can read the UID, which is why the [operator recovery key](/developer-reference/security/encrypted-var#operator-recovery-key) exists.

### Hardware-accelerated cryptography

Avocado automatically detects and uses hardware cryptographic accelerators present on the target platform. Most modern SoCs include dedicated crypto engines (AES-NI on x86, ARM Crypto Extensions on ARM) that handle encryption at near-native throughput. The system falls back to optimized software implementations only when hardware acceleration is unavailable.

## Provisioning and key management

`avocado provision` flashes the image; it does not create or program the `/var` key. With `var.encrypt` on, the device's first boot encrypts the flashed `/var` in place and, where the board has one, enrolls the hardware keyslot. Enrollment is skipped when `var.hardware` is `none`, and under the default `auto` a board whose backend cannot be enrolled falls back to the derived key and reports it in the posture. An operator-held recovery key is added per unit afterwards with `avocado var-key enroll`, derived from a master secret that never enters a build. See [Encrypted /var](/developer-reference/security/encrypted-var).
