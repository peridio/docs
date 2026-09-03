---
title: 'Hardware-Backed Encryption'
slug: /avocado-os/security/encryption
sidebar_position: 2
description: 'LUKS2 encryption of the /var partition in Avocado OS: Argon2id key derivation everywhere, and TPM-sealed keys on targets with the OP-TEE firmware TPM.'
---

# Hardware-Backed Encryption

LUKS2 on the writable partition.

Avocado OS encrypts `/var` (extensions, application data and device state) with LUKS2. The key is derived on the device at first boot, and on a target with the OP-TEE firmware TPM it is additionally sealed to that TPM, so the volume cannot be unsealed on other hardware.

Where the key lives matters as much as the encryption. A LUKS volume whose key sits in a plaintext file on the same disk protects nothing. So it is worth being precise about which of the two paths below a given device is on. Both defend the media once it has been removed; the difference is that the derived key is reconstructible from an identifier any process on the device can read, while the sealed key never leaves the TEE. Neither currently defends against code running on the device.

:::caution Availability

TPM sealing is available on the NXP i.MX 93 FRDM, and only when the image is built with the fTPM feature. Every other target uses the Argon2id key described below, which binds the volume to the device but is not hardware-sealed. `/var` encryption itself is a build-time feature; a device gets it by being provisioned or updated with an image that has it enabled.

:::

## How it works

### LUKS encryption

Avocado uses LUKS2 with AES-256-XTS for full-disk encryption of writable partitions. The BTRFS `/var` partition, which holds extensions, application data, and device state, is encrypted at the block level. The immutable root filesystem is not encrypted, since its contents are public (the OS itself) and integrity matters more than confidentiality there. That integrity comes from the root being read-only and signature-verified at install time; see [Filesystem Integrity](filesystem-integrity) for what that covers.

### Hardware key storage

One mechanism is implemented today, on one target:

| Hardware                                     | Key storage mechanism                                                    | Status                                                                           |
| -------------------------------------------- | ------------------------------------------------------------------------ | -------------------------------------------------------------------------------- |
| TPM 2.0, provided by the OP-TEE firmware TPM | `/var` key sealed to the TPM, so it cannot be unsealed on another device | Available on the NXP i.MX 93 FRDM, when the image is built with the fTPM feature |

The firmware TPM runs as an OP-TEE trusted application in ARM TrustZone's secure world, so on this target the TPM and the TEE are the same mechanism rather than two. The key is sealed under it, with the Argon2id key below retained as a recovery path.

Where a seal is in place, the encryption key is bound to that device: removing the storage media and mounting it elsewhere will not decrypt the data.

:::caution The seal is not bound to a boot measurement

The keyslot is enrolled for PCR 7, and `cryptsetup luksDump` reports it that way, but on this target the PCR policy is **not enforced**. Nothing measures into PCR 7 on the way up: the firmware TPM is an OP-TEE application that only becomes available once the initramfs is running, which is well after the boot chain it would need to measure. `systemd-cryptenroll` says so at enrollment time - "none of the selected PCRs are valid ... PCR policy effectively unenforced".

The practical effect is that the seal binds the key to the device but not to a particular boot state. It stops the volume being read on other hardware; it does not stop code running on this device from asking the TPM to unseal. Treat this page's guarantee as device binding until a measured boot chain feeds the firmware TPM.

:::

:::caution Scope

Discrete TPMs, NXP CAAM, the NVIDIA security engine and crypto authentication co-processors are not wired to `/var` key storage. An earlier version of this page listed them as available mechanisms. On any target other than the one above, `/var` encryption uses the Argon2id key described below and is not hardware-sealed.

:::

### Software fallback

This is the default path, and the only one on targets without the fTPM above. The key is derived with Argon2id, a memory-hard function, from the SoC's hardware-unique identifier. Memory-hardness makes brute-force extraction far more expensive than a passphrase.

Be clear about what this does and does not give you. The SoC identifier binds the key to the device, but it is readable by software on the running system rather than secret, so a derived key protects the volume at rest against someone who takes the storage media, not against code running on the device.

The fTPM seal above is stronger in one specific way: the key lives inside the TEE instead of being derived from an identifier any process can read. It is worth enabling where it exists for that reason. It does not currently close the on-device gap either, because the seal is not bound to a boot measurement - see the caution above.

### Per-application encryption domains

Not implemented. Extensions are not encrypted independently of each other or of system data, and there is no per-application key. An earlier version of this page described separate encryption domains per extension (with an AI model extension encrypting its own weights) as an available capability. Everything under `/var`, including all extensions, is covered by the single `/var` volume key described above.

### Hardware-accelerated cryptography

Avocado automatically detects and uses hardware cryptographic accelerators present on the target platform. Most modern SoCs include dedicated crypto engines (AES-NI on x86, ARM Crypto Extensions on ARM) that handle encryption at near-native throughput. The system falls back to optimized software implementations only when hardware acceleration is unavailable.

## Where the key comes from

Keys are established by the device on its first boot, not by a provisioning step and not by the CLI.

On that first boot the device derives the Argon2id key from its SoC identifier, creates the LUKS2 container on the `/var` partition, and then, on a target with the fTPM, enrolls a second keyslot sealed to the TPM. Every later boot unlocks through the sealed keyslot, falling back to the Argon2id one if the seal cannot be released. Nothing has to be loaded onto the device, and no key material leaves it.

Two consequences worth planning around:

- **Enabling encryption reformats `/var`.** The container is created over whatever was on the partition, so turning it on is a provisioning-time decision, not a field upgrade that preserves data. See [Atomic Update Architecture](/avocado-os/security/update-architecture) for how the OS itself is updated.
- **`avocado provision` does not manage encryption keys.** It deploys a runtime; it does not generate, seal, or program key material, and there is no fleet-level key escrow or key hierarchy. An earlier version of this page described key generation, HSM programming, key hierarchies for multi-tenant encryption, and fleet key metadata as part of the provisioning flow. None of that exists. For the signing keys used on images and extensions, which are a separate concern from volume encryption and do support hardware tokens, see [Secure Boot](/avocado-os/security/secure-boot).
