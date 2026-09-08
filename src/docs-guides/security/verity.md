---
title: 'Filesystem verity'
sidebar_position: 2
copy_markdown: true
description: 'Enable dm-verity on the Avocado OS root filesystem and on extension images with image.verity, and understand what provisioning carries versus what OTA publishes today.'
---

dm-verity gives a read-only filesystem a Merkle hash tree and a single root hash. Every block is verified as it is read; a modified image cannot be mounted, and tampering after the fact is caught at read time rather than at install time.

Avocado OS applies it to the two read-only image kinds: the root filesystem and extension images. It is not a declared machine capability — every i.MX kernel carries `dm-verity.cfg`, every i.MX stone manifest carries per-slot hash partitions, and the U-Boot environment reads a root hash out of the boot FIT when one is present. A FIT without a root hash boots a plain rootfs. The choice is entirely yours.

## Enable it

```yaml title="avocado.yaml"
rootfs:
  image:
    verity: true

extensions:
  security-agent:
    image:
      verity: true
```

`verity` sits beside `type` under `image:` because it is orthogonal to the container format — a raw image and a KAB-wrapped image are both verified at the same single dissect call.

It is a strict boolean. `verity: "true"`, `verity: 1` and `verity: yes` are rejected rather than coerced: this is a security opt-in, and a value that only looks true should not decide it.

## What gets produced

`avocado ext image` and the rootfs build run `veritysetup format` over the finished image and emit a hash tree plus its root hash.

| Image     | Hash tree           | Root hash lands in                                                                                                        |
| --------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Extension | `<image_id>.verity` | The runtime manifest, as the entry's `root_hash`                                                                          |
| Rootfs    | `<rootfs>.verity`   | The boot FIT, as `avocado,roothash`; the tree goes to the machine's per-slot `rootfs-a-hash` / `rootfs-b-hash` partitions |

On boot, U-Boot reads `avocado,roothash` out of the FIT configuration node and hands the kernel `root=/dev/mapper/root roothash=<hash> systemd.verity_root_data=<rootdev> systemd.verity_root_hash=<hashdev>`, so systemd's veritysetup generator activates the mapping before the root is mounted. A FIT with no root hash boots the plain rootfs on the same environment.

The salt is fixed at zero. The manifest and the FIT are the trust anchors, so a public salt costs nothing and buys reproducible root hashes.

The rootfs tree is written as a standalone image, not appended, because systemd's veritysetup generator wants a block device and has no hash-offset option.

## Requirements

- `veritysetup` in the SDK (present in the published SDKs).
- `CONFIG_DM_VERITY` on the target kernel.
- For **rootfs** verity: a machine that boots a FIT and whose U-Boot environment reads `avocado,roothash` back out of it. Today that is `imx8mp-evk` and `imx93-frdm`. The build refuses unless the FIT can be built, so `runtimes.<name>.signing.fit_key` must name a key — or `runtimes.<name>.signing.fit_unsigned: true` must state explicitly that this machine's U-Boot enforces none:

  ```
  ERROR: rootfs.image.verity is on, which needs the boot FIT rebuilt with the
  root hash, but no FIT signing key is configured. Set
  runtimes.<name>.signing.fit_key to an RSA key in the signing-key registry, or
  signing.fit_unsigned: true if this machine's U-Boot enforces no key.
  ```

  The other i.MX stone manifests (`imx93-evk`, `imx91-frdm`, `imx95-frdm`, `var-dart`, `ucm-imx8m-plus`) already stage the hash partitions, but boot with `booti` rather than a FIT, so there is nothing to carry the root hash yet.

- For **extension** verity: avocadoctl 0.11.0 or newer on the device — it passes `--root-hash` to its single dissect call. This is machine-agnostic, so extension verity works on targets that have no rootfs verity path, Jetson included. Older avocadoctl builds mount an extension unverified without complaining.

## What ships it today

**`avocado provision` carries everything** — the whole var-staging tree plus the hash partition.

**`avocado deploy` and `avocado connect upload` do not.** They do not publish `<image_id>.verity` as a target yet, so they **refuse** a runtime whose manifest carries extension root hashes:

```
ERROR: this runtime has extensions with image.verity: true; deploy does not
publish their dm-verity hash trees yet, so the device would refuse them.
Provision instead, or build without verity.
```

`avocado connect upload` refuses on the same reasoning, in its own wording.

Rootfs verity is not affected — its root hash travels in the boot FIT with no sidecar, so a runtime with `rootfs.image.verity: true` and no verity extensions deploys normally.

Publishing extension hash trees as OTA targets is a follow-up.

## Rolling it out

Ship the current avocadoctl in a plain OS update **before** turning on extension verity. An older avocadoctl on the device mounts a verity extension unverified and says nothing — the update that carries the fix is applied by the avocadoctl that predates it.
