---
title: Update Process
sidebar_position: 3
description: 'Step-by-step walkthrough of the OS bundle update process including extraction, artifact writing, slot activation, and verification.'
---

This page describes the end-to-end OS bundle update flow that occurs when a runtime with a different `os_build_id` than the running system is [activated](../runtime-management/activation-process).

## End-to-End Update Flow

### 1. Extract Bundle

The `.aos` file (a tar.zst compressed archive) is extracted to a staging directory at `/var/lib/avocado/.os-update-staging/`. Any previous staging artifacts are cleaned up first.

### 2. Parse bundle.json

The `bundle.json` file is read and parsed. See [Bundle Format](./bundle-format) for the full specification.

### 3. Check If Already Up-to-Date

If a `verify` configuration is present, avocadoctl checks the current system's `/etc/os-release` (or `/sysroot/etc/os-release` in initrd scope). If the field already matches the expected value, the update is skipped.

### 4. Detect Current Slot

The configured slot detection strategy determines the currently active boot slot:

- **uboot-env** -- Reads the U-Boot environment variable.
- **command** -- Runs the configured command and reads stdout.
- **sdboot-efi** -- Checks which EFI partition is mounted.

### 5. Determine Inactive Slot

For an A/B strategy, the inactive slot is the opposite of the current slot (e.g., if current is "a", target is "b").

### 6. Write Artifacts

Each artifact is written to the inactive slot's target partition:

1. The artifact file's SHA-256 hash is verified against the expected value.
2. For GPT targets: the partition is identified by PARTLABEL.
3. For MBR targets: the partition offset is resolved from the `layout` configuration.
4. The artifact is written to the target device/partition using buffered I/O with fsync.

### 7. Activate New Slot

The `activate` actions are executed in order to update the boot configuration:

- U-Boot environment variables are set.
- Shell commands are executed.
- MBR partition tables are rewritten.
- EFI boot entries are updated.

### 8. Write Pending Update Marker

A `pending-update.json` file is written to the avocado base directory containing:

```json
{
  "os_build_id": "avocado-os-20260312",
  "initramfs_build_id": "initramfs-20260312",
  "verify": {
    "type": "os-release",
    "field": "AVOCADO_OS_BUILD_ID",
    "expected": "avocado-os-20260312"
  },
  "verify_initramfs": {
    "type": "os-release",
    "field": "AVOCADO_INITRAMFS_BUILD_ID",
    "expected": "initramfs-20260312"
  },
  "rollback": [],
  "previous_slot": "a",
  "layout": {},
  "runtime_id": "a1b2c3d4-e5f6-7890-abcd-ef0123456789"
}
```

The `runtime_id` field identifies which runtime to activate after successful verification.

### 9. Reboot

The system must be rebooted to boot into the new OS image on the inactive slot.

### 10. Post-Boot Verification

On the next boot, avocadoctl checks for `pending-update.json`:

1. If present, reads the verify configuration.
2. Checks `/etc/os-release` for the expected field value.
3. If verification succeeds: activates the runtime (switches the active symlink) and refreshes extensions.
4. If verification fails: executes rollback actions to restore the previous boot slot.

## Streaming Mode

When `stream_os_to_partition = true` is set in the [configuration](../configuration), OS bundle artifacts are streamed directly from HTTP to the target partition during a TUF-based update. This skips the intermediate staging step.

**Trade-offs:**

- Reduces disk I/O and temporary storage requirements.
- Disables resumable downloads for the OS bundle (the entire artifact must be re-downloaded on failure).
- Extension images are still staged normally.

## Cleanup

After a successful update (or skip), the staging directory at `/var/lib/avocado/.os-update-staging/` is removed.
