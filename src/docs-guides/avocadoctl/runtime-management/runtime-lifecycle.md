---
title: Runtime Lifecycle
sidebar_position: 2
description: 'How runtimes are staged, listed, inspected, activated, and removed on an Avocado Linux device.'
---

A runtime progresses through several states during its lifecycle on a device. This page describes each state and the operations that transition between them.

## Runtime States

- **Staged** -- A runtime manifest exists under `/var/lib/avocado/runtimes/{id}/` but is not the active runtime. All referenced extension images (and optional OS bundle image) are present in the shared image pool.
- **Active** -- The `/var/lib/avocado/active` symlink points to this runtime. Its extensions are merged into the running system.
- **Pending reboot** -- An OS update has been written to the inactive partition slot and a reboot is required to complete activation. A `pending-update.json` marker file is present.

## Adding a Runtime

Runtimes can be added to the device through two methods.

### From a TUF Repository

Using `runtime add --url`:

1. Load the local TUF trust anchor (`metadata/root.json`).
2. Download and verify the TUF metadata chain: `timestamp.json` -> `snapshot.json` -> `targets.json`.
3. Walk TUF delegations for extension targets.
4. Download the manifest and all referenced `.raw` extension images to a staging area (`.update-staging/`).
5. Verify SHA-256 hashes of all downloaded files.
6. Install images from staging to the shared image pool (`/var/lib/avocado/images/`), skipping any that already exist (content-addressable deduplication).
7. Create the runtime directory and write `manifest.json`.

### From a Local Manifest

Using `runtime add --manifest`:

1. Read the manifest JSON file from the provided path.
2. Validate that all referenced extension images and optional OS bundle image already exist on disk.
3. Create the runtime directory and copy `manifest.json`.

## Listing Runtimes

Runtimes are listed with the active runtime first, then remaining runtimes sorted by build time (newest first). Each entry shows:

- Runtime name
- Version
- Short ID (first 8 characters)
- Whether it is active

## Inspecting a Runtime

Inspect shows full details for a specific runtime or the active runtime (when ID is omitted). Details include:

- Manifest version
- Full ID
- Build timestamp
- Runtime name and version
- All extensions with their image IDs
- OS bundle information if present

## Removing a Runtime

- The active runtime cannot be removed. Activate a different runtime first.
- Removing a runtime deletes the runtime directory (`/var/lib/avocado/runtimes/{id}/`).
- Shared images in `/var/lib/avocado/images/` are not removed, as they may be referenced by other runtimes.

## The Active Symlink

The active runtime is tracked by a symlink at `/var/lib/avocado/active` pointing to `runtimes/{active_runtime_id}`. This symlink is switched atomically during [activation](./activation-process). Because it uses a single `rename` system call, there is no window where the symlink is missing or points to an invalid target.
