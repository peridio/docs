---
title: Overview
sidebar_position: 1
description: 'How Peridio Daemon uses U-Boot environment variables for state tracking and device provisioning.'
---

# U-Boot environment overview

Peridiod uses the U-Boot environment as persistent storage for update state tracking and optional device identity credentials. The U-Boot environment provides atomic writes and survives firmware updates, making it ideal for critical device state that must persist across A/B partition switches and recovery scenarios.

## How peridiod interacts with U-Boot environment

Peridiod accesses the U-Boot environment by directly reading and writing to block devices at specific byte offsets. The daemon uses `/etc/fw_env.config` to determine the storage location, which typically specifies a device path (like `/dev/mmcblk0`), byte offset, and environment size.

This follows the standard U-Boot environment format and configuration pattern documented in the [U-Boot Environment Variables](https://docs.u-boot.org/en/latest/usage/environment.html) specification. The `/etc/fw_env.config` file format is defined in the U-Boot source - see the example configuration at [tools/env/fw_env.config](https://github.com/u-boot/u-boot/blob/master/tools/env/fw_env.config) and documentation at `tools/env/README`.

### Direct block device access

The daemon performs raw binary I/O operations on the storage device:

- **Reads** the entire environment block from the specified device offset
- **Validates** data integrity using CRC32 checksums
- **Caches** key-value pairs in memory for fast access
- **Writes** updated data back to the same location with proper CRC calculation

This approach is equivalent to what the standard U-Boot tools `fw_printenv` and `fw_setenv` do, but implemented directly in the daemon without external process spawning.

### Environment block format

The U-Boot environment uses a binary format as specified in the [U-Boot documentation](https://docs.u-boot.org/en/latest/usage/environment.html) with:

- **4-byte CRC32** checksum at the beginning for integrity verification
- **Optional redundancy byte** for dual-bank environments
- **Null-terminated key=value pairs** stored as ASCII strings
- **Padding bytes** (0xFF) to fill the allocated block size

Data constraints include:

- No NULL characters (`\0`) within keys or values
- No equals signs (`=`) in keys
- Values may contain embedded newlines
- ASCII encoding recommended for compatibility with U-Boot and other tools

### Redundant environments

Many systems use redundant U-Boot environments for fault tolerance:

- **Two identical blocks** stored at different offsets
- **Generation counters** track which block is newer
- **Atomic updates** by writing to the inactive block first
- **Automatic failover** if one block becomes corrupted

## State tracking

Peridiod maintains comprehensive update metadata to enable recovery from interrupted updates, provide rollback capabilities, and track update history:

### Firmware slot management

The system tracks active and previous firmware slots using prefixed keys:

- `peridio_active` - currently active firmware slot ("a" or "b")
- `a.peridio_*` - metadata for firmware slot A
- `b.peridio_*` - metadata for firmware slot B

### Update progress tracking

During updates, peridiod stores progress information:

- `peridio_via_progress` - release PRN being installed
- `peridio_bun_progress` - bundle PRN being installed
- `peridio_vsn_progress` - version being installed
- `peridio_bin_progress` - binary being installed
- `peridio_bc_progress` - boot count for rollback detection

### Current and previous state

After successful updates, progress values are promoted to current state:

- `peridio_via_current/previous` - current and previous release PRNs
- `peridio_bun_current/previous` - current and previous bundle PRNs
- `peridio_vsn_current/previous` - current and previous versions
- `peridio_bin_current/previous` - current and previous binary identifiers

### System configuration

The daemon also reads system information from the environment:

- `peridio_disk_devpath` / `nerves_fw_devpath` - device paths for installation
- `peridio_uuid` / `nerves_fw_uuid` - device identifiers
- Application partition paths and filesystem types

## Device identity storage

Device identity credentials can optionally be stored in the U-Boot environment rather than the filesystem. The daemon can load PEM-encoded certificates and private keys from environment variables, with optional Base64 decoding support.

Example configuration:

```elixir
key_pair_source: "uboot-env",
key_pair_options: %{
  "private_key" => "device_private_key",
  "certificate" => "device_certificate"
}
```

While hardware security modules (HSMs) or secure elements are preferred for production deployments, U-Boot environment storage enables provisioning workflows where credentials are injected during manufacturing and must remain accessible before filesystem initialization or survive factory resets.

## Storage considerations

The U-Boot environment typically resides on flash storage with limited write cycles. Peridiod minimizes writes by:

- Only updating variables when values actually change
- Batching multiple updates into single write operations
- Caching values in memory to avoid repeated reads

High-frequency update deployments should consider the write endurance characteristics of their storage medium. Loss of this data can require device re-provisioning and affect update recovery capabilities.

The environment block location and size are configured in `/etc/fw_env.config`, which specifies the device path, offset, and size of the environment storage area.
