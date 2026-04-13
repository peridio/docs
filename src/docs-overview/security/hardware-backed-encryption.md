---
title: 'Hardware-Backed Encryption'
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

| Hardware | Key storage mechanism |
|---|---|
| TPM 2.0 | Key sealed to TPM PCR state — only released when boot chain is in a known-good state |
| ARM TrustZone TEE | Key stored in secure world, inaccessible from normal world OS |
| Secure enclave (e.g., NXP CAAM, NVIDIA security engine) | Key derived from hardware-unique secrets, never leaves the enclave |
| Crypto authentication co-processor | Key sealed to device-specific identity |

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

## Provisioning and key management

Key provisioning is integrated into the `avocado provision` workflow. During manufacturing provisioning, the CLI can:

- Generate and seal device-unique encryption keys
- Program keys into hardware security modules
- Establish key hierarchies for multi-tenant or multi-domain encryption
- Record key metadata for fleet-level key management

This happens as part of the standard provisioning flow — not as a separate manual step on the manufacturing line.
