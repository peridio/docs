---
title: 'Hardware-Backed Encryption'
slug: /avocado-os/security/encryption
sidebar_position: 2
description: 'LUKS2 encryption of the /var partition in Avocado OS: Argon2id key derivation everywhere, and a TPM-sealed keyslot on the OP-TEE firmware TPM that is implemented but not yet validated on hardware.'
---

# Hardware-Backed Encryption

LUKS2 on the writable partition.

Avocado OS encrypts `/var` (extensions, application data and device state) with LUKS2. The key is derived on the device at first boot, and on a target with the OP-TEE firmware TPM a second keyslot is additionally sealed to that TPM. The derived keyslot stays enrolled underneath it as a recovery path, so sealing raises the cost of opening a copy of the volume elsewhere rather than making it impossible.

Where the key lives matters as much as the encryption. A LUKS volume whose key sits in a plaintext file on the same disk protects nothing. So it is worth being precise about which of the two paths below a given device is on. Both defend the media once it has been removed. The difference is that the derived key is reconstructible from an identifier any process on the device can read, while the sealed secret is held by the TPM and released only when asked. That is not the same as the volume key never being exposed: unsealing hands the secret to `cryptsetup`, which then installs the volume key in normal-world kernel memory. The TPM protects the secret at rest and gates its release; it does not keep key material out of the running kernel. Neither path currently defends against code running on the device.

:::caution Availability

`/var` encryption is a build-time capability, and most targets do not declare it. The ones that do are the seven NVIDIA Jetson-family machines, the NXP i.MX 8M Plus EVK and i.MX 93 FRDM, and the two QEMU targets. The Intel x86-64 targets and the Raspberry Pi family do not declare it, so on those `/var` is plaintext and nothing on this page applies to them.

TPM sealing is narrower again. It targets the NXP i.MX 93 FRDM, and only when the image is built with the fTPM feature. It is implemented but has not been validated on that hardware yet, so read it as a path under test rather than a shipped guarantee. Every other target uses the Argon2id key described below, which is not hardware-sealed.

A device gets `/var` encryption by being provisioned with an image that has it enabled. Turning it on reformats `/var`, so it is not a data-preserving upgrade for a device already in the field; see [Where the key comes from](#where-the-key-comes-from) below.

:::

## How it works

### LUKS encryption

Avocado uses LUKS2 with AES-256-XTS to encrypt the writable partition. This is partition encryption rather than full-disk encryption: the root filesystem is deliberately left in the clear, for the reason given next. The BTRFS `/var` partition, which holds extensions, application data, and device state, is encrypted at the block level. The immutable root filesystem is not encrypted, since its contents are public (the OS itself) and integrity matters more than confidentiality there. That integrity comes from the root being read-only and signature-verified at install time; see [Filesystem Integrity](filesystem-integrity) for what that covers.

### Hardware key storage

One mechanism is implemented, on two target families, and its hardware validation is outstanding on both:

| Hardware                                                 | Key storage mechanism                                                                 | Status                                                                                          |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| TPM 2.0, provided by the OP-TEE firmware TPM, on i.MX 93 | `/var` key sealed to the TPM, with the Argon2id keyslot retained as the recovery path | Implemented for the NXP i.MX 93 FRDM with the fTPM feature; not yet validated on that hardware   |
| The same mechanism, on the NVIDIA Jetson family          | As above                                                                              | Built and wired on all seven Jetson-family targets; not yet validated on that hardware          |

The firmware TPM runs as an OP-TEE trusted application in ARM TrustZone's secure world, so on these targets the TPM and the TEE are the same mechanism rather than two. The key is sealed under it, with the Argon2id key below retained as a recovery path.

The two rows are at different depths even though neither is validated. On the i.MX 93 the enrolment path is implemented end to end. On Jetson the kernel fragments, the OP-TEE trusted application, the NV store partition and the cryptsetup TPM2 plugin are all present in the build and resolve, but the capability was added as groundwork and no board has been observed sealing and reopening a volume. Plan against the Argon2id guarantee on both until that changes.

Where a seal is in place, the sealed keyslot is bound to that device. That alone does not make a copied volume unreadable, because the Argon2id keyslot stays enrolled and its key is derived from an identifier any process on the original device can read. Anyone who has read that identifier can derive the recovery key and open a copy of the volume anywhere. Sealing raises the cost of an offline attack; it is not an unlock-on-this-device-only guarantee.

:::caution The seal is not bound to a boot measurement

The keyslot is enrolled for PCR 7, and `cryptsetup luksDump` reports it that way, but on this target the PCR policy is **not enforced**. Nothing measures into PCR 7 on the way up: the firmware TPM is an OP-TEE application that only becomes available once the initramfs is running, which is well after the boot chain it would need to measure. `systemd-cryptenroll` says so at enrollment time - "none of the selected PCRs are valid ... PCR policy effectively unenforced".

The practical effect is that the seal binds the sealed keyslot to the device but not to a particular boot state. It does not stop code running on this device from asking the TPM to unseal, and with the Argon2id keyslot still enrolled it does not stop a copied volume being opened elsewhere either. Until a measured boot chain feeds the firmware TPM, treat the seal as raising the cost of an offline attack rather than as a binding guarantee.

:::

:::caution Scope

Discrete TPMs, NXP CAAM, the NVIDIA security engine and crypto authentication co-processors are not wired to `/var` key storage. An earlier version of this page listed them as available mechanisms. On any target other than the one above, `/var` encryption uses the Argon2id key described below and is not hardware-sealed.

:::

### Software fallback

This is the default path, and the only one on targets without the fTPM above. The key is derived with Argon2id, a memory-hard function, from the SoC's hardware-unique identifier. Memory-hardness makes brute-force extraction far more expensive than a passphrase.

Be clear about what this does and does not give you. The SoC identifier ties the key to one device's identity, but it is readable by software on the running system rather than secret. Anyone who has read it can derive the key and open a copy of the volume on any machine, so this protects the media against whoever takes the storage and nothing more. It does not protect against code running on the device, and it does not survive an attacker who has already had code there.

The fTPM seal above is stronger in one specific way: the unlock secret is held by the TPM and released only when asked, instead of being derivable by anything that can read the SoC identifier. It is worth enabling where it exists for that reason. It does not close the on-device gap, because the seal is not bound to a boot measurement (see the caution above), and it does not close the copied-volume gap either while the Argon2id keyslot remains enrolled as recovery.

Which identifier a target uses is per silicon: the SoC UID on i.MX, the device-tree serial number on Jetson, DMI board identifiers on x86-64. What they have in common is being unique per board and readable early enough for the initramfs to unlock with.

A build will not produce an image whose key could not be derived. A target that asks for `/var` encryption has to ship a key provider declaring which identifiers it reads, and the build runs that provider against two synthetic identities and requires two different keys out of it, then against an empty one and requires it to refuse. A provider that returns a fixed value, that reads past its declared sources, or that substitutes a constant when it finds no identity fails the build rather than shipping. That check runs where the image is built, so it establishes the derivation is sound and device-dependent; whether the identifier is readable on a particular board at boot is a property of that board and is settled by booting it.

:::caution QEMU derives a shared key

The QEMU targets are the exception, and it matters if you are evaluating on them. A virtual machine has no unique board identifier, so the provider substitutes a fixed value and every VM built from the same image derives the same `/var` key. That provider is marked test-only in the build for exactly this reason, and the build warns whenever a machine resolves to it. It is correct for a disposable evaluation target and is not a property to carry into an assessment of the hardware targets.

:::

### Per-application encryption domains

Not implemented. Extensions are not encrypted independently of each other or of system data, and there is no per-application key. An earlier version of this page described separate encryption domains per extension (with an AI model extension encrypting its own weights) as an available capability. Everything under `/var`, including all extensions, is covered by the single `/var` volume key described above.

### Hardware-accelerated cryptography

Avocado automatically detects and uses hardware cryptographic accelerators present on the target platform. Most modern SoCs include dedicated crypto engines (AES-NI on x86, ARM Crypto Extensions on ARM) that handle encryption at near-native throughput. The system falls back to optimized software implementations only when hardware acceleration is unavailable.

## Where the key comes from

Keys are established by the device on its first boot, not by a provisioning step and not by the CLI.

On that first boot the device derives the Argon2id key from its SoC identifier, creates the LUKS2 container on the `/var` partition, and then, on a target with the fTPM, enrolls a second keyslot sealed to the TPM. Every later boot unlocks through the sealed keyslot, falling back to the Argon2id one if the seal cannot be released. Nothing has to be loaded onto the device, and no key material is written to it in the clear. The Argon2id keyslot is never removed, which is what keeps a device with a broken or re-provisioned TPM recoverable, and equally what keeps the volume reachable by anyone holding that device's SoC identifier.

Two consequences worth planning around:

- **Enabling encryption reformats `/var`.** The container is created over whatever was on the partition, so turning it on is a provisioning-time decision, not a field upgrade that preserves data. See [Atomic Update Architecture](/avocado-os/security/update-architecture) for how the OS itself is updated.
- **`avocado provision` does not manage encryption keys.** It deploys a runtime; it does not generate, seal, or program key material, and there is no fleet-level key escrow or key hierarchy. An earlier version of this page described key generation, HSM programming, key hierarchies for multi-tenant encryption, and fleet key metadata as part of the provisioning flow. None of that exists. For the signing keys used on images and extensions, which are a separate concern from volume encryption and do support hardware tokens, see [Secure Boot](/avocado-os/security/secure-boot).
