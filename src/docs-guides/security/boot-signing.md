---
title: 'Boot signing'
sidebar_position: 3
copy_markdown: true
description: 'Sign the Avocado OS boot FIT from the CLI key registry with signing.fit_key, make the bootloader enforce your key, and sign the i.MX 9 boot container with AHAB.'
---

There are two independent links in the boot chain you can close, and they are enforced by different things:

| Link                                | Enforced by                      | Turned on with                                      |
| ----------------------------------- | -------------------------------- | --------------------------------------------------- |
| Bootloader → kernel/initramfs (FIT) | U-Boot                           | `runtimes.<name>.signing.fit_key` in `avocado.yaml` |
| ROM → bootloader (i.MX 9 container) | The SoC's ELE, against SRK fuses | The `ahab` feed feature, at build time              |

The first is a per-project choice you make in config. The second is a property of the feed and of the fuses burned into the part.

## Signing the boot FIT

The FIT carries the kernel, the device tree, this runtime's initramfs, and — when [rootfs verity](/developer-reference/security/verity) is on — the rootfs root hash. Signing it is what makes that root hash mean anything.

### 1. Get a key into the registry

Either import an existing RSA key pair:

```bash title="Host machine"
avocado signing-keys import product-fit --key FIT.key --cert FIT.crt
```

Or have the CLI generate one (a PEM key plus a self-signed certificate, via the host's `openssl`):

```bash title="Host machine"
avocado signing-keys create product-fit --algorithm rsa2048
```

`rsa2048` and `rsa4096` are the accepted algorithms. The key is stored as `<keyid>.key` (mode `0600`) with its certificate as `<keyid>.crt`; the key id is the SHA-256 of the certificate DER. ed25519 and PKCS#11 entries are refused for FIT signing, with a message saying why — `mkimage` needs the private key material.

### 2. Name it in the runtime

```yaml title="avocado.yaml"
runtimes:
  prod:
    signing:
      fit_key: product-fit
```

`avocado build` resolves the name, stages the pair as `FIT.key`/`FIT.crt` in a private temporary directory, and mounts it read-only where the FIT assembly looks for it. The signed FIT is now reproducible from `avocado.yaml` plus the registry — nothing about the build depends on an environment variable being set the same way twice.

:::note Replaces `AVOCADO_FIT_KEY_DIR` and `AVOCADO_FIT_UNSIGNED`
Those environment variables are no longer read. If they are set, the CLI names the config keys that replace them.
:::

### Opting out explicitly

```yaml title="avocado.yaml"
runtimes:
  dev:
    signing:
      fit_unsigned: true
```

Mutually exclusive with `fit_key`. It exists so that an unsigned boot image is a decision someone wrote down, never the accidental result of a missing key.

### Making the bootloader enforce it

```yaml title="avocado.yaml"
runtimes:
  prod:
    signing:
      fit_key: product-fit
      fit_key_in_bootloader: true # default when fit_key is set
```

A signed FIT that the bootloader does not require is only half the feature, so this defaults to **true** whenever `fit_key` is set. The build re-packs the feed's bootloader with your public key in the control DTB, using the tooling the feed ships (`imx-boot-tools/rekey-imx-boot.sh` on i.MX 8M), so provisioning writes a bootloader closed to the project key from the very first flash.

Set it to `false` when the distro's own key is the one being enforced — a feed built with the `verified-boot` feature, below.

### Bootloader updates over OTA (i.MX 8M eMMC)

The bootloader is the thing that enforces the FIT key, so a key change has to ship with the OS update that makes it. On eMMC the i.MX BootROM loads `imx-boot` from a hardware boot partition selected by `PARTITION_CONFIG`. There are two, and the stone manifest couples them to the OS slots so a slot always boots with the bootloader that verifies its FIT: slot A ↔ `boot0`, slot B ↔ `boot1`, with rollback flipping back.

On a medium that has no boot partitions — an SD card — those targets are skipped with a message and the rest of the update proceeds. So on SD the bootloader stays whatever provisioning flashed; eMMC is the path that carries bootloader updates.

An `imx-boot` that does not boot at all still needs USB recovery (`uuu`) — the BootROM has no fallback across boot partitions. Validate bootloader changes on a bench device before a fleet rollout.

## `verified-boot`: the feed-level mode

`verified-boot` is the one security capability that is a **build-time mode**, because it embeds a signing key into the bootloader. It is requested with `kas/feature/verified-boot.yml` and refused unless the machine declares it.

- **Without it** (the published feeds), U-Boot boots any FIT, signed or not. Your project still enforces its own key by signing the FIT and re-keying the bootloader — that is what `fit_key` + `fit_key_in_bootloader` do above.
- **With it**, the distro's `sb-keys` public key is embedded in U-Boot and `CONFIG_FIT_SIGNATURE` enforces it. A project's own FIT will not boot without replacing the bootloader. This is why the published `complete` feeds never turn it on.

Declaring the capability builds FIT support into U-Boot and the kernel's FIT artifacts regardless, so the unsigned and project-signed paths are always available on a board that declares it.

## AHAB: signing the i.MX 9 boot container

On i.MX 9, AHAB is what authenticates SPL, ATF and U-Boot itself against SRK hashes burned into fuses. It is applied when the feed is built, not from `avocado.yaml`, because it signs the boot container the ROM loads.

```bash title="Build host"
kas build meta-avocado/kas/machine/imx93-frdm.yml:meta-avocado/kas/feature/ahab.yml
```

The feature needs two things on the build host, and the build fails at parse if either is missing rather than producing an unsigned image for a target that asked to be signed:

| Variable                    | What it points at                             |
| --------------------------- | --------------------------------------------- |
| `AVOCADO_AHAB_KEYS_DIR`     | An `nxpcrypto pki-tree ahab` output directory |
| `AVOCADO_AHAB_SPSDK_BINDIR` | The directory holding SPSDK's `nxpimage`      |

Generate the PKI tree once, off the build machine, on a host that will hold the private keys:

```bash title="Key host"
nxpcrypto pki-tree ahab -k secp384r1 -o <outdir> -n 4 -d 5
```

Four SRKs is the hardware's count: the SRK table holds four keys and the fuses hold the hash of that table, so a compromised or expired SRK is revoked by switching to another of the four rather than by re-fusing.

:::warning Signing does not close the device; fusing does
A signed image boots on an OPEN part **without being checked**. That is the window to validate in: boot it, read `ahab_status`, and burn SRK fuses only once it reports zero authentication events. Fusing is irreversible.
:::

`imx93-frdm` and `imx91-frdm` carry the machine-side wiring today. The full procedure — PKI tree, SRK table, fuse hash, and the three NXP variables that look like the switch and are not — is in [`meta-avocado-nxp/docs/imx93-srk-pki.md`](https://github.com/avocado-linux/meta-avocado/blob/wrynose/meta-avocado-nxp/docs/imx93-srk-pki.md).

## Where fusing belongs

Burning fuses and deriving per-device keys are **provisioning** operations: they happen once, on one physical unit, and cannot be undone. `avocado build` is machine-agnostic and does none of it. Keep them on the provisioning side of your line.
