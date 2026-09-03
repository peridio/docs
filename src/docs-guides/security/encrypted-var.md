---
title: 'Encrypted /var'
sidebar_position: 1
copy_markdown: true
description: 'Enable LUKS2 encryption of the Avocado OS var partition with a hardware-bound key, choose the key engine with var.hardware, and hold an operator recovery key with var.recovery and avocado var-key.'
---

`/var` is the only writable partition on an Avocado OS device: extensions, application data, Docker layers, and device state all live there. `runtimes.<name>.var.encrypt` turns it into a LUKS2 container whose key is bound to the device's hardware key store.

The root filesystem is not encrypted — its contents are the OS, which is public. It gets [dm-verity](/developer-reference/security/verity) instead, where integrity is what matters.

## Enable it

```yaml title="avocado.yaml"
runtimes:
  prod:
    var:
      encrypt: true
```

```bash title="Host machine"
avocado build
avocado provision -r prod --profile sd
```

That is the whole opt-in. The CLI does the rest:

- adds `cryptsetup-var` to the initramfs package set and `cryptsetup-var-udev` to the rootfs package set,
- writes an `/etc/avocado/var-encrypt` marker into _this runtime's_ initramfs.

`cryptsetup-var.service` is conditioned on that marker, so a feed image or a runtime that did not opt in always boots a plaintext `/var`. With the marker, the first boot **encrypts the flashed var image in place** — seeded content (subvolumes, `var_files`, primed Docker images) survives — and later boots open it as `/dev/mapper/var`.

Leaving `var.encrypt` unset produces a byte-identical image to before.

:::note This can ship as an OTA
Enabling `var.encrypt` works through a normal OS update: the first boot of the new slot encrypts the flashed `/var` in place. Turning it back **off** afterwards does not — the partition stays LUKS and `/var` will not mount. Reprovision instead.
:::

## Choosing the key engine

```yaml title="avocado.yaml"
runtimes:
  prod:
    var:
      encrypt: true
      hardware: tpm2
```

| Value            | Behavior                                                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `auto` (default) | Enrol whatever engine the machine ships and probes successfully; degrade to the derived key and report it in the posture.             |
| `caam`           | The NXP CAAM must hold a keyslot. If it cannot, the boot fails to the emergency target rather than opening `/var` on the derived key. |
| `tpm2`           | Same contract, for a TPM 2.0 or an OP-TEE fTPM.                                                                                       |
| `none`           | No hardware keyslot at all. Refused unless `var.recovery` is also set — otherwise nothing would hold a key.                           |

`caam` and `tpm2` fail closed in all three ways this could otherwise slip: the engine is unusable at preflight, an existing hardware keyslot will not unlock (wiped key store, moved PCRs), or enrolment itself fails. The single exception is the **first-enrolment boot** — before any hardware token exists, the derived key is the only thing `luksAddKey` can authenticate with, so that one open is allowed. The carve-out keys on the absence of the token, not on the mode.

An explicit choice rides in the initramfs as `/etc/avocado/var-hardware`, next to the `var-encrypt` marker. `auto` writes nothing.

### What binds the key on each platform

| Platform  | First boot                                                          | Later boots                                |
| --------- | ------------------------------------------------------------------- | ------------------------------------------ |
| i.MX 8M   | Argon2id key from the SoC UID, plus a keyslot from a CAAM black key | CAAM-derived passphrase, Argon2id fallback |
| i.MX 9    | Argon2id key from the SoC UID                                       | same key (ELE backend pending)             |
| Jetson    | Argon2id key, plus a TPM2 keyslot sealed to the OP-TEE fTPM (PCR 7) | TPM2 token, Argon2id fallback              |
| qemu, x86 | Argon2id, plus swtpm/TPM 2.0 where present                          | as Jetson                                  |

The hardware blob is stored in the LUKS2 header as an `avocado-hwkey` token — no extra partition, and it travels with the container.

## Operator recovery key

Every keyslot above is bound to the device: a dead SoC takes `/var` with it. `var.recovery` names a **master secret** you hold, from which each unit's passphrase is derived. Nothing derived from the master enters a build, and nothing but the resulting keyslot is on the device.

### 1. Create the master

```bash title="Host machine"
avocado signing-keys create fleet-var-master --algorithm hmac-sha256
```

This is a new secret key kind in the signing-key registry: 32 random bytes, stored `0600`. It lives **outside** the signing-keys directory the SDK bind-mounts into build containers, so no build hook can read it. A master found in the old location is refused with the commands to move it, rather than migrated automatically — the move is a rename plus a registry rewrite, and a failure between the two would lose the key that opens a fleet's `/var`.

:::warning Back this up off the build host
Losing the master means every unit that has retired its derived keyslot is unrecoverable.
:::

### 2. Name it in the runtime

```yaml title="avocado.yaml"
runtimes:
  prod:
    var:
      encrypt: true
      recovery: fleet-var-master
```

### 3. Enrol a device

```bash title="Host machine"
avocado var-key enroll prod --device root@192.168.1.80
```

`enroll` reads the device's SoC UID over SSH — the device tree `serial-number`, then `soc0/serial_number`, the same sources the initramfs uses — derives that unit's passphrase as `HMAC-SHA256(master, "avocado-var-recovery\0" || UID)`, and pipes it to `avocadoctl var-key enroll` on the device, which adds it as a LUKS2 keyslot carrying an `avocado-recovery` token.

Once a recovery token exists, the initrd **retires the SoC-UID-derived keyslot** — the one key that anyone who can read the UID could reproduce — unless that key is what opened `/var` this boot.

### 4. Recover a unit on the bench

```bash title="Host machine"
avocado var-key derive prod --uid 0x0123456789abcdef --raw \
  | cryptsetup open --key-file - /dev/disk/by-partlabel/var var
```

`--raw` emits the 32 raw bytes for `cryptsetup --key-file -`; without it you get hex.

### How the keyslot change is authorized

None of the passphrases that open `/var` are reachable from the running system — that is the point. So `cryptsetup-var` links the volume key into root's user keyring on every open (`--link-vk-to-keyring @u::%user:cryptsetup:var`) and `avocadoctl var-key` authorizes with `luksAddKey --volume-key-keyring`.

## On the device

```bash title="Target device"
avocadoctl var-key list          # keyslots, and what unlocks each
avocadoctl var-key enroll        # passphrase on stdin, or --key-file
avocadoctl var-key remove --yes  # drop the recovery keyslot
```

Encryption posture is published into the device's U-Boot environment block, so read it with `fw_printenv`:

```bash title="Target device"
fw_printenv avocado_var_encrypted avocado_var_hwkey avocado_var_recovery
```

| Key                     | Meaning                                                                 |
| ----------------------- | ----------------------------------------------------------------------- |
| `avocado_var_encrypted` | Whether `/var` came up as a LUKS container this boot                    |
| `avocado_var_hwkey`     | Name of the hardware backend in use, or `no`                            |
| `avocado_var_recovery`  | `key` (operator slot enrolled) or `soc-uid` (still on the derived slot) |

These are facts the initramfs observed that userspace cannot reconstruct. They are written only when a value **changes**, since the backing store is a U-Boot environment block and re-writing on every boot would be flash wear for no new information — a change is also the interesting event, being the first enrollment or the day a device silently dropped to the recovery slot. A device that has a hardware keyslot but opened without it is called out explicitly, so a fleet-wide degrade is visible rather than silent.

On an image built without `/var` encryption the reporter is a no-op and publishes nothing.

## Requirements for a board

A machine must have a dm-crypt kernel fragment reachable from its kernel recipe and a GPT `var` partlabel before it can declare `encrypted-var`. Raspberry Pi has neither today. See [Security features](/developer-reference/security) for the current board matrix.

On a fresh flash the var partition is grown to fill its disk _before_ the container is opened, so the LUKS mapping and the filesystem are full size from the first boot and the first OTA has room.
