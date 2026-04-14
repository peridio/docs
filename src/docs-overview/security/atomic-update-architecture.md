---
title: 'Atomic Update Architecture'
sidebar_position: 3
description: 'A/B partitions, automatic rollback, delta compression, and power-loss resilience in Avocado OS updates.'
---

# Atomic Update Architecture

If something goes wrong, every device rolls back automatically.

Avocado OS uses a dual-partition A/B update architecture where updates are written to the inactive partition while the active system continues running. The switch to the new version is atomic — it either completes fully or doesn't happen at all. Combined with automatic rollback, delta compression, and power-loss resilience, this means updates in the field are safe even on constrained, unreliable networks. There is no point in the update lifecycle where a power loss, corrupted download, or incompatible configuration can leave the device unbootable.

## How it works

### A/B partition layout

Avocado maintains two complete boot slots:

```
Disk layout
├── Boot A        (bootloader, kernel, device tree)
├── Boot B        (bootloader, kernel, device tree)
├── RootFS A      (immutable SquashFS + dm-verity)
├── RootFS B      (immutable SquashFS + dm-verity)
└── var partition  (BTRFS — extensions, data, state)
    ├── /var/lib/extensions
    └── /var/lib/overlays
```

At any given time, one slot is active and one is inactive. Updates are written entirely to the inactive slot. The active system is never modified during an update.

### Update flow

1. **Download** — The update payload is downloaded and written to the inactive slot. The active system continues running normally throughout.
2. **Verify** — Cryptographic signatures are validated against the signing keys provisioned on the device. The dm-verity hash tree is verified for the new root filesystem.
3. **Commit** — The bootloader is atomically updated to point to the new slot on next boot. This is a single flag flip — not a gradual migration.
4. **Reboot** — The device boots into the new slot. The bootloader marks it as "pending verification."
5. **Health check** — The new system runs self-diagnostics. If the system is healthy, the slot is marked as "good." If not, the next reboot automatically falls back to the previous slot.

### Automatic rollback

The bootloader tracks boot attempts. If the new slot fails to boot successfully (kernel panic, application crash, health check failure, or any condition you define), the bootloader automatically reverts to the previous known-good slot on the next reboot. No manual intervention. No remote access required.

This means you can deploy updates aggressively knowing that a bad update will self-heal rather than brick the fleet.

### Composable updates

Avocado's extension architecture means you don't always need to update the entire system. Because the OS is composed of independent layers — core OS, system extensions, configuration extensions — you can update just the components that changed:

- **OS update** — New root filesystem written to inactive A/B slot
- **Extension update** — New extension version written to BTRFS var partition, overlaid on next boot
- **Configuration update** — New confext written to var partition, applied on next boot
- **Model update** — AI model extension updated independently of the OS

This modularity is critical for bandwidth-constrained deployments. Updating a 50MB application extension over cellular is very different from pushing a 500MB monolithic firmware image.

### Delta compression

For OS-level updates that do require writing to the A/B slots, Avocado supports delta updates — computing and transmitting only the binary differences between the old and new images. This dramatically reduces bandwidth requirements for devices on metered connections (cellular, satellite, LoRa).

### Power-loss resilience

The update architecture is designed to survive power loss at any point in the process:

- **During download** — Partial downloads are discarded. The active system is untouched.
- **During write to inactive slot** — The active slot is untouched. The incomplete write is detected on next boot attempt and the system stays on the active slot.
- **During boot flag commit** — Atomic flag operations ensure the pointer is either fully updated or not. No partial state.
- **During first boot of new slot** — Health check failure triggers automatic rollback to previous slot.

There is no point in the update lifecycle where power loss can leave the device unbootable.
