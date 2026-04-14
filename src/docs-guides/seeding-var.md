---
sidebar_position: 7
title: 'Seeding the var partition'
copy_markdown: true
description: 'Pre-populate the Avocado var partition at build time with static files, configuration data, and Docker image caches using var_files and docker_images.'
---

Avocado systems have two storage areas: the **root filesystem** (read-only, assembled from extension images) and the **var partition** (writable, persistent across updates). Application state, caches, databases, and Docker image layers all live on the var partition.

This guide covers how to pre-populate the var partition at build time so your device has what it needs on first boot — no internet access required.

## Concepts

### The var partition

The var partition mounts at `/var` and survives OTA updates. It is separate from the immutable root so that updates can be applied atomically without wiping runtime state.

Files on the var partition are writable and are not managed by the extension system. This is where Docker stores image layers, databases store their files, and applications write configuration that persists across reboots and updates.

### Extension images vs. var data

When `avocado ext image` builds a `.raw` image from an extension's sysroot, it creates a read-only squashfs or erofs image that is merged into `/usr` and `/opt` at runtime. Files that belong on the var partition must **not** be baked into the read-only image — they need to be on the writable partition.

Avocado provides two mechanisms for getting data onto the var partition at build time:

| Mechanism               | Config location                   | Use case                                                          |
| ----------------------- | --------------------------------- | ----------------------------------------------------------------- |
| Static file seeding     | `runtimes.<name>.var_files`       | Configuration files, certificates, seed databases                 |
| Docker image cache      | `extensions.<name>.docker_images` | Pre-pull container images so they are available offline           |
| Extension var exclusion | `extensions.<name>.var_files`     | Tell `ext image` to exclude certain sysroot paths from the `.raw` |

---

## Seeding static files

Use `var_files` in a runtime config to copy files from your source tree onto the var partition during `avocado build`:

```yaml
runtimes:
  dev:
    extensions: [my-app]
    packages:
      avocado-runtime: '*'
    var_files:
      - source: config/app-defaults/
        dest: lib/myapp/
      - source: certs/device.pem
        dest: lib/myapp/certs/device.pem
```

Each entry has two fields:

| Field    | Description                                         |
| -------- | --------------------------------------------------- |
| `source` | Path relative to `src_dir` (file or directory)      |
| `dest`   | Destination path relative to the var partition root |

Directories are copied recursively. The `dest` for a directory should end with a `/` to make intent explicit.

On the device, `dest: lib/myapp/` maps to `/var/lib/myapp/`.

### When to use this

- Application default configuration that users may modify at runtime
- TLS certificates or device credentials
- Seed data for SQLite or other embedded databases
- Anything that ships as a file in your source tree but must be writable on the device

---

## Seeding a Docker image cache

If your application runs containers with Docker or containerd, you can pre-pull images into the var partition at build time. This allows containers to start on first boot even when the device has no internet access.

### 1. Declare the Docker images in an extension

Add a `docker_images` list to any extension in the runtime:

```yaml
extensions:
  my-app:
    version: '1.0.0'
    docker_images:
      - image: docker.io/library/redis
        tag: '7-alpine'
      - image: docker.io/library/nginx
        tag: '1.25'

  sdk:
    packages:
      nativesdk-docker: '*'
```

Each `docker_images` entry requires:

| Field   | Description                               |
| ------- | ----------------------------------------- |
| `image` | Full image reference (registry/repo/name) |
| `tag`   | Image tag                                 |

### 2. How it works

During `avocado build` (specifically the `runtime build` step), the CLI detects that extensions in the runtime declare `docker_images` and automatically:

1. Adds `--privileged` to the SDK container arguments (required for Docker-in-Docker)
2. Starts a temporary `dockerd` inside the SDK container, with its data-root pointing at the var partition staging area
3. Pulls each declared image for the target architecture (`linux/arm64`, `linux/amd64`, etc.)
4. Shuts down the temporary `dockerd`
5. Includes the populated Docker data-root in the var partition image

The result is a var partition that contains a pre-populated Docker image cache at `/var/lib/docker`.

### 3. Exclude Docker storage from the extension image

The `var_files` list on the extension tells `avocado ext image` to **exclude** those paths from the read-only `.raw` image. Since Docker data belongs on the writable var partition, not the immutable extension, you must declare it:

```yaml
extensions:
  my-app:
    var_files:
      - var/lib/docker/** # exclude from .raw, lives on var partition
```

Without this, `avocado ext image` would try to bake the Docker storage directory into the read-only squashfs image, which is not what you want.

### 4. Complete example

```yaml
cli_requirement: '>=0.27.0'

distro:
  release: 2024
  channel: edge

sdk:
  image: docker.io/avocadolinux/sdk:{{ avocado.distro.release }}-{{ avocado.distro.channel }}
  packages:
    avocado-sdk-toolchain: '*'

extensions:
  my-app:
    version: '1.0.0'
    types: [sysext]

    docker_images:
      - image: docker.io/library/redis
        tag: '7-alpine'
      - image: docker.io/library/nginx
        tag: '1.25'

runtimes:
  dev:
    extensions: [my-app]
    packages:
      avocado-runtime: '*'
    # Static files to seed onto the var partition
    var_files:
      - source: config/redis.conf
        dest: lib/myapp/redis.conf
      - source: config/nginx/
        dest: lib/myapp/nginx/
```

### SDK requirements for Docker-in-Docker

The SDK image must include `dockerd`, `containerd`, `runc`, and the Docker CLI for image priming to work. Standard Avocado SDK images include these tools. If you see an error like `dockerd not found`, verify your SDK image contains these binaries.

---

## Extension `var_files` without `docker_images`

You can use `var_files` on an extension even without `docker_images`. Any glob pattern declared there is excluded from the `.raw` extension image. This is useful for any application that writes to `/var` and whose directory structure is created at runtime rather than seeded at build time:

```yaml
extensions:
  postgres:
    version: '1.0.0'
    types: [sysext]
    packages:
      postgresql: '*'
    var_files:
      - var/lib/pgsql/** # PostgreSQL data dir, created on first start
```

The extension image will not contain any files at `var/lib/pgsql/`. PostgreSQL will create its data directory on first launch.

---

## Build workflow

```bash
# Install dependencies
avocado install

# Build extensions and runtime (var seeding happens here)
avocado build

# Provision the runtime image
avocado provision dev
```

The var seeding steps (static files and Docker image priming) run automatically as part of `avocado build` (specifically `avocado runtime build`). No extra commands are needed.

---

## What's next

- [Extensions reference](/core-concepts#extensions) for complete `var_files` and `docker_images` configuration options
- [Cross-compilation guide](./cross-compilation) for building extension binaries that use the var partition
- [Sideloading](./sideloading) for deploying updates to a running device
