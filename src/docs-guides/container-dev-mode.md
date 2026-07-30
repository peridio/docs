---
sidebar_position: 3
title: 'Container dev mode'
copy_markdown: true
description: 'Layer-aware hot-reload for containers on Avocado OS - change one line and ship only the changed layer to a running device, with no reflash and no full image re-push.'
---

Container dev mode is the inner development loop for a containerized application running on an Avocado OS device. You keep building images the way you already do (`docker build`), and the changed layer is pushed to the device and the container restarted, in place, on the running system. There is no reflash, no full image re-transfer, and no rebuild of the OS.

This matters because Avocado OS has an immutable root filesystem. Without a dev loop, every application change means either re-shipping the whole container image to the device or rebuilding and reprovisioning the system, which is slow enough to break concentration when the image is measured in gigabytes. Container dev mode reuses the container engine's own pull protocol so only the layers that actually changed move across the wire.

If you have used [hardware in the loop](./hardware-in-the-loop.md) to iterate on extensions, this is the same idea applied to containers: a host-side server, a live device, and a feedback loop measured in seconds.

:::info
Run all commands in this guide from the root of your Avocado project on your host machine, the directory that contains your Avocado config.
:::

:::warning Development only
Container dev mode is a development feature. The device-side agent ships as its own extension so it is present only in a dev runtime and absent from production runtimes. It opens an authenticated registry endpoint on your host for the device to pull from. Do not enable it on production devices, and do not use it as a production container delivery mechanism.
:::

## How it works

The loop keeps a real device in it. You edit and build on your machine, the changed layer crosses to the device, and the service restarts there, so what you are looking at is your code running on the target rather than an emulator of it. A QEMU target and a physical board are the same thing to this loop: both are just an SSH-reachable device.

```text
// highlight-orange-start
                      edit your app                     <-- you
                            │
                            ▼
              docker build -t my-app:dev .              <-- your normal build
                            │
                            ▼
// highlight-orange-end
// highlight-green-start
                  avocado container dev                 <-- started by dev up
               ┌─────────────────────────┐
               │ watcher   sees the tag  │
               │ registry  keeps layers  │
               │ control   notifies      │
               └─────────────────────────┘
                            │
                            │   only the changed layer
                            ▼
// highlight-green-end
// highlight-blue-start
              the device (QEMU or a board)              <-- hardware in the loop
               ┌─────────────────────────┐
               │ container-agent-dev     │  pulls over the pinned CA
               │ engine  my-app:dev      │  changed layer applied
               │ systemd restart app     │  service back up
               └─────────────────────────┘
                            │
                            ▼
              watch it run on real hardware
// highlight-blue-end
                            │
                            └────▶ edit again, seconds, no reflash
```

When you run `avocado container dev up`, the CLI:

1. Mints a per-project certificate authority and two separate session tokens (one for reading and control, one for writing).
2. Starts an embedded OCI registry on your host, with a dedicated bulk read listener and a distinct write listener.
3. Starts a watcher on your container engine that streams tag events.
4. Opens a control WebSocket the device connects back to.
5. Writes the bootstrap once over SSH to the device's writable partition: the bulk listener endpoint, the read and control token, and the CA certificate.

After that, steady state runs over the control WebSocket with no further SSH. When you run a normal `docker build` that retags a watched image, the watcher notices, pushes the changed layers into the embedded registry, and notifies the device. The device-side agent pulls over the pinned CA and restarts the mapped service.

## Prerequisites

- A device running Avocado OS, reachable over SSH from your host.
- A container engine on your host. Both `docker` and `podman` are supported. The watcher streams tag events from the engine CLI (`docker events` / `podman events`) rather than the API socket, so a rootless podman with no socket still works.
- Two extensions in your dev runtime: a container engine extension (`avocado-ext-docker` or `avocado-ext-podman`) and the dev agent extension `avocado-ext-container-agent-dev`.

## Configure the runtime

Container dev mode is enabled structurally: the presence of a `container_dev` block under a runtime turns it on for that runtime. A block placed anywhere else is not honored.

```yaml title="avocado.yaml"
default_target: qemux86-64
supported_targets:
  - qemux86-64

runtimes:
  dev:
    extensions:
      - avocado-dev
      # highlight-added-start
      - avocado-ext-docker
      - avocado-ext-container-agent-dev
      # highlight-added-end
    packages:
      avocado-runtime: '*'
    # highlight-added-start
    container_dev:
      images:
        - ref: my-app:dev
          service: app
    # highlight-added-end
```

Each entry under `images` maps an image you build on your host (`ref`) to the device service that consumes it (`service`). When a watched image is retagged, the agent restarts that service after pulling.

Only one runtime may enable container dev mode per config. If two runtimes carry a `container_dev` block, the CLI refuses to start and names them both.

## Point the CLI at your device

The subcommands take no positional arguments. The device is sourced from the environment, which also lets the CLI auto-detect which host address the device can reach:

```bash title="On Host"
export AVOCADO_CONTAINER_DEV_DEVICE=root@192.168.1.50
```

## Start the loop

```bash title="On Host"
avocado container dev up
```

This bootstraps the device and leaves the registry, watcher, and control WebSocket running.

## Iterate

Build your image the way you normally would. No wrapper command is required:

```bash title="On Host"
docker build -t my-app:dev .
```

The watcher observes the tag event, pushes the changed layers, and notifies the device, which pulls them and restarts the `app` service. Layers that did not change are already present on the device by digest and are not re-sent.

## Force a sync

To re-push the current watched image and notify the device without rebuilding:

```bash title="On Host"
avocado container dev sync
```

## Check the loop state

```bash title="On Host"
avocado container dev status
```

`status` reports registry, watcher, and last-sync state. It also surfaces the case where a device presents a stale token and needs `up` to be re-run to re-bootstrap.

## Stop the loop

```bash title="On Host"
avocado container dev down
```

`down` stops the listeners and tears down the write listener through a guaranteed-cleanup guard, so an interrupted session does not leave an authenticated write port bound.

## Reclaim disk

The embedded registry keeps a per-project store of pushed blobs. To garbage-collect it:

```bash title="On Host"
avocado container dev prune
```

This is scoped to the container dev mode store and is distinct from the top-level `avocado clean`, which removes Docker volumes and project state.

## Command reference

| Command                        | Purpose                                                                |
| ------------------------------ | ---------------------------------------------------------------------- |
| `avocado container dev up`     | Start the dev registry and watcher, and bootstrap the device.          |
| `avocado container dev sync`   | One-shot re-push of the current watched image, then notify the device. |
| `avocado container dev status` | Report registry, watcher, and last-sync state.                         |
| `avocado container dev down`   | Stop the registry and watcher, and tear down the listeners.            |
| `avocado container dev prune`  | Garbage-collect this project's container dev mode registry store.      |

## Configuration reference

| Key                              | Required | Description                                                           |
| -------------------------------- | -------- | --------------------------------------------------------------------- |
| `runtimes.<name>.container_dev`  | yes      | Presence of the block enables the feature for that runtime.           |
| `container_dev.images[].ref`     | yes      | Image reference (`repository[:tag]`) watched on the host engine.      |
| `container_dev.images[].service` | yes      | Device service that consumes the image and is restarted after a pull. |
| `container_dev.registry.port`    | no       | Port for the bulk read listener. Defaults to `5599`.                  |

## Environment variables

| Variable                           | Purpose                                                                     |
| ---------------------------------- | --------------------------------------------------------------------------- |
| `AVOCADO_CONTAINER_DEV_DEVICE`     | Device SSH target (`user@host`). Required by `up`.                          |
| `AVOCADO_CONTAINER_DEV_VM`         | Engine guest SSH target. Only used when pushing through a helper VM engine. |
| `AVOCADO_CONTAINER_DEV_HOST`       | Override host address auto-detection.                                       |
| `AVOCADO_CONTAINER_DEV_PORT`       | Override the bulk read listener port.                                       |
| `AVOCADO_CONTAINER_DEV_WS_PORT`    | Override the control WebSocket port.                                        |
| `AVOCADO_CONTAINER_DEV_WRITE_PORT` | Override the write listener port.                                           |

## Default ports

| Port   | Listener                                             |
| ------ | ---------------------------------------------------- |
| `5599` | Bulk read (the device pulls image layers from here). |
| `5600` | Control WebSocket.                                   |
| `5601` | Write (the host engine pushes here).                 |

Port `5000` is deliberately avoided because it collides with the AirPlay receiver on macOS.

## Trust model

Each `up` mints fresh TLS material and two distinct tokens for the project. The read and control token is what lands on the device at bootstrap; the write token never leaves the host side of the push. The CA is delivered to the device's writable partition at bootstrap rather than baked into the image, so no long-lived credential ships in a runtime.

## Limitations

- One runtime per config may enable container dev mode.
- Promotion of a dev image into a production runtime is not part of this feature. Production container delivery continues to use the existing paths.
- The device agent extension is development only and must not be included in a production runtime.
