---
title: Activation Process
sidebar_position: 3
description: 'Detailed walkthrough of what happens when a runtime is activated, including OS update detection, symlink switching, and extension refresh.'
---

This page describes the full sequence of steps that occur when `avocadoctl runtime activate <ID>` is called.

## Activation Flow

### Step 1: Resolve Runtime

The provided ID (or prefix) is matched against staged runtimes. If the prefix matches multiple runtimes, an `AmbiguousRuntimeId` error is returned with the list of candidates.

### Step 2: Check for OS Change

If the target runtime includes an `os_bundle` with an `os_build_id`, it is compared against the running system's `AVOCADO_OS_BUILD_ID` (read from `/etc/os-release`). If they differ, an OS update is required.

### Step 3a: OS Update Path

When an OS change is needed:

1. The OS bundle `.raw` image is extracted and its `bundle.json` parsed.
2. The current boot slot is detected (using uboot-env, command, or sdboot-efi strategy).
3. Artifacts are written to the inactive slot's partitions with SHA-256 verification.
4. Boot activation actions are executed to mark the new slot as bootable.
5. A `pending-update.json` marker is written containing the runtime ID.
6. The system must be rebooted to boot into the new OS.
7. On next boot, the pending update is verified and the runtime is activated.

See [OS Bundle Update Process](../os-bundles/update-process) for full details.

### Step 3b: Extension-Only Path

When no OS change is needed:

1. The `/var/lib/avocado/active` symlink is atomically switched to point to the target runtime.
2. Extensions are refreshed: all existing extensions are unmerged, then the new runtime's extensions are merged.
3. During merge, extensions are ordered deterministically based on their position in the [manifest](./manifest-spec).
4. `depmod` is run to update kernel module dependencies.

## Extension Refresh During Activation

The extension refresh process during activation:

1. Scan enabled extensions for the current OS release version.
2. Detect sysext vs confext types from extension metadata.
3. Apply deterministic ordering (extensions listed in manifest get merge index prefixes).
4. Execute `systemd-sysext merge` for system extensions.
5. Execute `systemd-confext merge` for configuration extensions.
6. Run `depmod` to rebuild kernel module dependency information.

## Atomicity

The symlink switch from the old runtime to the new runtime is atomic on Linux (a single `rename` system call). If the process crashes between the symlink switch and extension refresh, the active runtime is correct but extensions may need a manual refresh with `avocadoctl refresh`.
