---
title: QEMU
description: Getting started with Avocado OS using QEMU virtual machine.
sidebar_position: 1
---

# QEMU

QEMU is the fastest way to try Avocado OS. No hardware required — the virtual machine runs inside Docker on your development machine.

## Prerequisites

- macOS 10.12+ or Linux (Ubuntu 22.04+, Fedora 39+)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running
- The latest version of the [Avocado CLI](/developer-reference/avocado-cli/overview)
- 8 GB available disk space

## Initialize

Create a new project targeting QEMU x86-64. The `init` command scaffolds an `avocado.yaml` with the default configuration for the target.

```bash
avocado init --target qemux86-64 qemux86-64
cd qemux86-64
```

## Install

Install the SDK toolchain, extension dependencies, and runtime packages defined in `avocado.yaml`.

```bash
avocado install -f
```

This pulls the SDK container image and installs all required packages into their respective sysroots. The `-f` flag skips confirmation prompts.

## Build

Build the system image — this compiles extensions and assembles the runtime.

```bash
avocado build
```

### Troubleshooting a stale build volume

If `avocado build` fails during `runtime build dev` with a missing `/etc/passwd` (or `/etc/shadow` / `/etc/group`) under `rootfs-work`, the build volume is stale or half-populated. This happens when a previous install was interrupted, or when a project directory was deleted manually without first running `avocado clean`. The per-project Docker volume outlives the folder.

Reset the build state and rebuild:

```bash
avocado clean
avocado prune
avocado install -f
avocado build
```

`avocado clean` drops the current project's volume; `avocado prune` clears abandoned volumes left behind by deleted projects. Run both, since `clean` alone may not clear an abandoned volume that is shadowing the build.

## Provision

Provision creates the bootable disk image for the `dev` runtime. Because QEMU is virtual, the provisioning artifacts are written to disk on your development machine rather than flashed to hardware.

```bash
avocado provision -r dev
```

## Run

Boot the virtual machine using the SDK container's built-in QEMU:

```bash
avocado sdk run -iE vm dev
```

Log in as `root` with an empty password.

To verify the system is running:

```bash
uname -a
systemctl status
```

To shut down the VM:

```bash
poweroff
```

### SSH access

:::note Linux only
The `--host-fwd` flag is supported on Linux only.
:::

To boot QEMU with SSH port forwarding:

```bash
avocado sdk run -iE vm dev --host-fwd "2222-:22"
```

Then from another terminal:

```bash
ssh -o StrictHostKeyChecking=no -p 2222 root@localhost
```
