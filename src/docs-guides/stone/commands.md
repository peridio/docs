---
title: Commands
sidebar_position: 4
description: 'Reference for every stone command and its flags.'
---

# Commands

Every stone command reads the [manifest](/developer-reference/stone/usage). These flags recur across commands, but not every command accepts every one — each command's synopsis below shows what it takes:

| Flag                         | Default         | Description                                                                         |
| ---------------------------- | --------------- | ----------------------------------------------------------------------------------- |
| `-m, --manifest-path <PATH>` | `manifest.json` | Path to the manifest file. (`provision` locates it inside `--input-dir` instead.)   |
| `-i, --input-dir <DIR>`      | `.`             | Directory to search for referenced files. Repeatable — earlier directories win.     |
| `--overlay <PATH>`           | —               | Overlay file deep-merged onto the base manifest. Repeatable, applied left-to-right. |
| `-v, --verbose`              | off             | Verbose output.                                                                     |

Availability: `--overlay` is accepted by every command. `-m/--manifest-path` by all except `provision`. `-i/--input-dir` by all except `describe-manifest`. `-v/--verbose` only by `create`, `bundle`, and `provision`.

## `stone describe-manifest`

Prints a human-readable summary of a manifest: platform, storage devices, images, and the partition layout table.

```
stone describe-manifest -m manifest.json [--overlay overlay.json ...]
```

## `stone validate`

Checks that every file the manifest references (images, FAT source files, fwup templates, provision scripts and extra files) is present in the input directories, and that provision profile references resolve. Fails with a list of everything missing.

```
stone validate -m manifest.json -i . [--overlay overlay.json ...]
```

## `stone create`

Stages every input referenced by the manifest into an output directory — image sources, FAT files, fwup templates, provision scripts, the provision file, plus the `os-release` file (copied as `os-release`) and the manifest itself (the merged manifest when overlays are used). This is the staging step that gives `provision` a self-contained directory to work from.

```
stone create -m manifest.json --os-release ./os-release -i . -o ./out [--overlay overlay.json ...]
```

| Flag                     | Default      | Description                                 |
| ------------------------ | ------------ | ------------------------------------------- |
| `--os-release <PATH>`    | — (required) | OS release file to include as `os-release`. |
| `-o, --output-dir <DIR>` | `.`          | Output directory (created if missing).      |

## `stone bundle`

Builds FAT images, collects the OS artifacts named in `update.os_artifacts` (or all images if there is no `update` section), computes SHA-256 and sizes, generates `bundle.json`, and packages everything into a compressed `.aos` (tar + zstd). The `os-release` files provide the build IDs written into `bundle.json` for post-update verification.

```
stone bundle -m manifest.json --os-release ./os-release -o os-bundle.aos -i . \
  [--os-release-initrd ./os-release-initrd] [--partition-size var=536870912] [--overlay overlay.json ...]
```

| Flag                            | Default           | Description                                                           |
| ------------------------------- | ----------------- | --------------------------------------------------------------------- |
| `--os-release <PATH>`           | — (required)      | OS release file; source of `AVOCADO_OS_BUILD_ID`.                     |
| `--os-release-initrd <PATH>`    | —                 | Initramfs os-release; adds `initramfs_build_id` / `verify_initramfs`. |
| `-o, --output <PATH>`           | `os-bundle.aos`   | Output `.aos` path.                                                   |
| `--build-dir <DIR>`             | `<output>/_build` | Directory for intermediate artifacts.                                 |
| `--partition-size <NAME=BYTES>` | —                 | Concrete size for a size-less `expand` partition. Repeatable.         |

The resulting `.aos` is applied on-device by avocadoctl — see [Bundle Format](/developer-reference/avocadoctl/os-bundles/bundle-format).

## `stone provision`

Builds all images, builds the device image via its fwup template (passing partition geometry and device/OS metadata as `AVOCADO_*` env vars), resolves any size-less `expand` partition to a concrete size, then runs the selected provision profile's script against the target.

```
stone provision -i ./out [--partition-size var=536870912] [--overlay overlay.json ...]
```

`provision` locates `manifest.json` inside `--input-dir` rather than taking `-m`. It requires an `os-release` file in the input directory and uses a fresh `_build` directory next to the manifest. The profile is chosen from the `AVOCADO_PROVISION_PROFILE` environment variable, falling back to `runtime.provision_default`. The script runs with these env vars set:

| Variable                  | Description                               |
| ------------------------- | ----------------------------------------- |
| `AVOCADO_STONE_MANIFEST`  | Absolute path to the (resolved) manifest. |
| `AVOCADO_STONE_BUILD_DIR` | Absolute path to the `_build` directory.  |
| `AVOCADO_STONE_DATA_DIR`  | Absolute path to the input directory.     |

...plus every variable resolved from the profile's `envs`.

:::warning
`provision` writes to real storage. Confirm the target device before running it.
:::
