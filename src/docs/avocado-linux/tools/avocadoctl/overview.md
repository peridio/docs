---
title: Overview
sidebar_position: 1
description: 'avocadoctl is a CLI tool and Varlink IPC daemon for managing Avocado Linux system extensions, runtimes, OS bundles, and hardware-in-the-loop testing on device.'
---

[Source](https://github.com/avocado-linux/avocado-control)

avocadoctl is the on-device management tool for Avocado Linux. It provides both a command-line interface and a Varlink IPC daemon for programmatic access. avocadoctl is pre-installed on all Avocado runtimes.

## Capabilities

- **Extension management** - Merge, unmerge, enable, and disable systemd-sysext and systemd-confext based system extensions
- **Runtime lifecycle** - Stage, activate, inspect, and remove runtime configurations via TUF-secured repositories or local manifests
- **OS bundle updates** - Apply rootfs and initramfs updates using A/B partition switching with integrity verification
- **Hardware-in-the-loop (HITL) testing** - Mount and unmount NFS-based extensions from a remote development server
- **Varlink IPC daemon** - Exposes all functionality over a Unix socket for 3rd party application integration

## Architecture

avocadoctl operates in a client-daemon model. The daemon listens on a Unix socket and exposes four Varlink interfaces. It is automatically started at boot by the included `avocadoctl` service extension, which is enabled by default in both the initramfs and system scopes. CLI commands connect to the daemon to execute operations. Third-party applications on the device can also connect to the same socket.

```
┌─────────────────┐     ┌─────────────────────────────────────┐
│  avocadoctl CLI  │────▶│  avocadoctl serve (Varlink daemon)  │
└─────────────────┘     │                                     │
┌─────────────────┐     │  org.avocado.Extensions             │
│  3rd party app   │────▶│  org.avocado.Runtimes               │
│  (C, Python, etc)│     │  org.avocado.Hitl                   │
└─────────────────┘     │  org.avocado.RootAuthority          │
                        └─────────────────────────────────────┘
                          Socket: unix:/run/avocado/avocadoctl.sock
```

## On-Device Directory Layout

```
/var/lib/avocado/
├── active                          # symlink → runtimes/{active_runtime_id}
├── runtimes/
│   ├── {runtime_id}/
│   │   └── manifest.json           # runtime manifest
│   └── {runtime_id}/
│       └── manifest.json
├── images/
│   ├── {image_id}.raw              # extension images (content-addressable)
│   └── {image_id}.raw              # OS bundle images
├── os-releases/
│   └── {version_id}/
│       ├── {ext_name} → symlink    # enabled extension symlinks
│       └── {ext_name} → symlink
└── metadata/
    └── root.json                   # TUF trust anchor
```

## Global Flags

| Flag | Description |
|------|-------------|
| `-c, --config <FILE>` | Path to custom config file (default: `/etc/avocado/avocadoctl.conf`) |
| `-v, --verbose` | Enable verbose output |
| `-o, --output <FORMAT>` | Output format: `table` (default) or `json` |
| `--socket <ADDRESS>` | Varlink daemon socket address (overrides config) |
