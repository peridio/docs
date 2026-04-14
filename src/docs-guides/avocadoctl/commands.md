---
description: 'Complete reference of all avocadoctl commands on a single page.'
sidebar_label: 'commands'
sidebar_class_name: 'sidebar-monospace'
sidebar_position: 5
copy_markdown: true
---

# `commands`

A complete reference of every `avocadoctl` command and subcommand on a single page. Use your browser's find (Ctrl+F / Cmd+F) to search.

---

## Top-Level Commands

### `avocadoctl disable`

Disables extensions by removing symlinks from `/var/lib/avocado/os-releases/{version_id}/`.

```
avocadoctl disable [OPTIONS] [EXTENSION]...
```

#### Options

| Option                   | Description                                                 |
| ------------------------ | ----------------------------------------------------------- |
| `--os-release <VERSION>` | OS release version. Defaults to the current system version. |
| `--all`                  | Disable all extensions                                      |

#### Arguments

| Argument       | Description                                                              |
| -------------- | ------------------------------------------------------------------------ |
| `EXTENSION...` | One or more extension names to disable (required unless `--all` is used) |

#### Examples

```bash
# Disable a single extension
avocadoctl disable my-app

# Disable multiple extensions
avocadoctl disable my-app my-config

# Disable all extensions
avocadoctl disable --all
```

---

### `avocadoctl enable`

Enables extensions by creating symlinks in `/var/lib/avocado/os-releases/{version_id}/`. The OS release version defaults to the current system's `VERSION_ID` from `/etc/os-release`.

```
avocadoctl enable [OPTIONS] <EXTENSION>...
```

#### Options

| Option                   | Description                                                 |
| ------------------------ | ----------------------------------------------------------- |
| `--os-release <VERSION>` | OS release version. Defaults to the current system version. |

#### Arguments

| Argument       | Description                                      |
| -------------- | ------------------------------------------------ |
| `EXTENSION...` | One or more extension names to enable (required) |

#### Examples

```bash
# Enable a single extension
avocadoctl enable my-app

# Enable multiple extensions
avocadoctl enable my-app my-config

# Enable for a specific OS release version
avocadoctl enable --os-release 1.2.0 my-app
```

---

### `avocadoctl merge`

Top-level alias for [`avocadoctl ext merge`](#avocadoctl-ext-merge). Merges all enabled extensions into the running system using systemd-sysext and systemd-confext. Runs depmod after merge to update kernel module dependencies.

```
avocadoctl merge [OPTIONS]
```

#### Examples

```bash
avocadoctl merge
```

---

### `avocadoctl refresh`

Top-level alias for [`avocadoctl ext refresh`](#avocadoctl-ext-refresh). Atomically unmerges and then merges all extensions, picking up any changes to the set of enabled extensions or updated extension images.

```
avocadoctl refresh [OPTIONS]
```

#### Examples

```bash
avocadoctl refresh
```

---

### `avocadoctl root-authority`

Displays the TUF (The Update Framework) trust anchor for this device. Shows key IDs, key types, and the roles each key is authorized to sign (timestamp, snapshot, targets, delegations). The root authority is stored at `/var/lib/avocado/metadata/root.json`.

```
avocadoctl root-authority [OPTIONS]
```

#### Examples

```bash
avocadoctl root-authority
```

---

### `avocadoctl serve`

Starts the avocadoctl Varlink daemon, listening for connections from CLI commands and third-party applications. See the [Varlink API](./varlink-api/overview) documentation for details on the exposed interfaces.

```
avocadoctl serve [OPTIONS]
```

#### Options

| Option                | Description                                                  |
| --------------------- | ------------------------------------------------------------ |
| `--address <ADDRESS>` | Listen address. Default: `unix:/run/avocado/avocadoctl.sock` |

#### Examples

```bash
# Start the daemon with default socket
avocadoctl serve

# Start the daemon on a custom address
avocadoctl serve --address unix:/tmp/avocadoctl.sock
```

---

### `avocadoctl status`

Displays the active runtime information including its name, version, short ID, rootfs build ID, and initramfs build ID. Also shows the status of all currently merged extensions.

```
avocadoctl status [OPTIONS]
```

#### Global Options

| Option                    | Description                |
| ------------------------- | -------------------------- |
| `-c`, `--config <PATH>`   | Path to configuration file |
| `-v`, `--verbose`         | Enable verbose output      |
| `-o`, `--output <FORMAT>` | Output format              |
| `--socket <ADDRESS>`      | Varlink socket address     |

#### Examples

```bash
# Show system status
avocadoctl status

# Show status with verbose output
avocadoctl status --verbose
```

---

### `avocadoctl unmerge`

Top-level alias for [`avocadoctl ext unmerge`](#avocadoctl-ext-unmerge). Unmerges all extensions from the running system. Optionally unmounts persistent loop devices used by `.raw` extension images.

```
avocadoctl unmerge [OPTIONS]
```

#### Options

| Option      | Description                                             |
| ----------- | ------------------------------------------------------- |
| `--unmount` | Also unmount all persistent loops for `.raw` extensions |

#### Examples

```bash
# Unmerge all extensions
avocadoctl unmerge

# Unmerge and unmount .raw loop devices
avocadoctl unmerge --unmount
```

---

## `avocadoctl ext` {#ext-commands}

### `avocadoctl ext list`

Lists all extension images found in the configured extensions directory. Shows the name, version, path, and whether each extension is a sysext (overlays `/usr`, `/opt`) or confext (overlays `/etc`).

```
avocadoctl ext list [OPTIONS]
```

#### Examples

```bash
avocadoctl ext list
```

---

### `avocadoctl ext merge`

Merges all enabled extensions into the running system. System extensions (sysext) overlay `/usr` and `/opt` while configuration extensions (confext) overlay `/etc`. After merging, runs depmod to update kernel module dependencies. Supports streaming progress output.

```
avocadoctl ext merge [OPTIONS]
```

#### Examples

```bash
avocadoctl ext merge
```

---

### `avocadoctl ext refresh`

Performs an atomic refresh by first unmerging all extensions, then immediately merging them again. This picks up any changes to the set of enabled extensions or updated extension images.

```
avocadoctl ext refresh [OPTIONS]
```

#### Examples

```bash
avocadoctl ext refresh
```

---

### `avocadoctl ext status`

Shows detailed status of all extensions including name, version, type (sysext or confext), whether currently merged, origin, and image ID.

```
avocadoctl ext status [OPTIONS]
```

#### Examples

```bash
avocadoctl ext status
```

---

### `avocadoctl ext unmerge`

Unmerges all extensions from the running system. With `--unmount`, also unmounts persistent loop devices used by `.raw` extension images.

```
avocadoctl ext unmerge [OPTIONS]
```

#### Options

| Option      | Description                                             |
| ----------- | ------------------------------------------------------- |
| `--unmount` | Also unmount all persistent loops for `.raw` extensions |

#### Examples

```bash
# Unmerge all extensions
avocadoctl ext unmerge

# Unmerge and unmount .raw loop devices
avocadoctl ext unmerge --unmount
```

---

## `avocadoctl hitl` {#hitl-commands}

### `avocadoctl hitl mount`

Mounts extensions from a remote NFS server for hardware-in-the-loop (HITL) development. This enables live development on target hardware by mounting extension directories from the development host. NFS is mounted with NFSv4, hard timeout, and caching disabled for live updates.

```
avocadoctl hitl mount [OPTIONS] -s <SERVER_IP> <EXTENSION>...
```

#### Options

| Option                          | Description                      |
| ------------------------------- | -------------------------------- |
| `-s`, `--server-ip <SERVER_IP>` | NFS server IP address (required) |
| `-e`, `--server-port <PORT>`    | NFS server port                  |

#### Arguments

| Argument       | Description                          |
| -------------- | ------------------------------------ |
| `EXTENSION...` | One or more extension names to mount |

#### Examples

```bash
# Mount a single extension from a remote server
avocadoctl hitl mount -s 192.168.1.100 my-app

# Mount multiple extensions
avocadoctl hitl mount -s 192.168.1.100 my-app my-config

# Mount with a custom NFS port
avocadoctl hitl mount -s 192.168.1.100 -e 2049 my-app
```

---

### `avocadoctl hitl unmount`

Unmounts previously mounted NFS extensions. Extensions are unmerged before unmounting to avoid dangling references.

```
avocadoctl hitl unmount [OPTIONS] <EXTENSION>...
```

#### Arguments

| Argument       | Description                            |
| -------------- | -------------------------------------- |
| `EXTENSION...` | One or more extension names to unmount |

#### Examples

```bash
# Unmount a single extension
avocadoctl hitl unmount my-app

# Unmount multiple extensions
avocadoctl hitl unmount my-app my-config
```

---

## `avocadoctl runtime` {#runtime-commands}

### `avocadoctl runtime activate`

Activates a staged runtime, making it the current active runtime. The ID can be specified as a prefix as long as it is unambiguous.

The activation process:

1. Resolves the runtime by ID prefix.
2. If the runtime includes an OS bundle with a different `os_build_id` than the running system, an OS update is applied and a reboot is required.
3. If no OS change is needed, the `active` symlink is atomically switched and extensions are refreshed.

See [Activation Process](./runtime-management/activation-process) for full details.

```
avocadoctl runtime activate [OPTIONS] <ID>
```

#### Arguments

| Argument | Description                      |
| -------- | -------------------------------- |
| `ID`     | Runtime ID or unambiguous prefix |

#### Examples

```bash
# Activate by full ID
avocadoctl runtime activate a1b2c3d4e5f6

# Activate by ID prefix
avocadoctl runtime activate a1b2
```

---

### `avocadoctl runtime add`

Stages a new runtime on the device. There are two mutually exclusive sources:

- `--url URL` downloads from a TUF-secured repository, verifying the trust chain (`root.json` -> timestamp -> snapshot -> targets). If the repository requires authentication, set the `AVOCADO_TUF_AUTH_TOKEN` environment variable.
- `--manifest PATH` reads a local `manifest.json` file. All extension images referenced in the manifest must already exist in the images directory.

Both paths create a new runtime directory under `/var/lib/avocado/runtimes/{id}/` and install any new extension images into the shared image pool.

```
avocadoctl runtime add [OPTIONS] (--url <URL> | --manifest <PATH>)
```

#### Options

| Option              | Description                        |
| ------------------- | ---------------------------------- |
| `--url <URL>`       | TUF repository URL                 |
| `--manifest <PATH>` | Path to local `manifest.json` file |

#### Examples

```bash
# Add from a TUF repository
avocadoctl runtime add --url https://tuf.example.com/repo

# Add from a TUF repository with authentication
AVOCADO_TUF_AUTH_TOKEN=mytoken avocadoctl runtime add --url https://tuf.example.com/repo

# Add from a local manifest
avocadoctl runtime add --manifest /path/to/manifest.json
```

---

### `avocadoctl runtime inspect`

Shows detailed information about a runtime including manifest version, build time, runtime name and version, all extensions with their image IDs, and OS bundle information if present. Omit the ID to inspect the currently active runtime.

```
avocadoctl runtime inspect [OPTIONS] [ID]
```

#### Arguments

| Argument | Description                                                               |
| -------- | ------------------------------------------------------------------------- |
| `ID`     | Runtime ID or unambiguous prefix. Inspects the active runtime if omitted. |

#### Examples

```bash
# Inspect the active runtime
avocadoctl runtime inspect

# Inspect a specific runtime by ID prefix
avocadoctl runtime inspect a1b2
```

---

### `avocadoctl runtime list`

Lists all runtime manifests on the device. The active runtime is shown first, followed by other staged runtimes sorted by build time (newest first). Shows runtime name, version, short ID, and active status.

```
avocadoctl runtime list [OPTIONS]
```

#### Examples

```bash
avocadoctl runtime list
```

---

### `avocadoctl runtime remove`

Removes a staged runtime directory. The runtime ID can be specified as a prefix as long as it is unambiguous. The currently active runtime cannot be removed — activate a different runtime first. Shared extension images in the image pool are not removed.

```
avocadoctl runtime remove [OPTIONS] <ID>
```

#### Arguments

| Argument | Description                      |
| -------- | -------------------------------- |
| `ID`     | Runtime ID or unambiguous prefix |

#### Examples

```bash
# Remove by full ID
avocadoctl runtime remove a1b2c3d4e5f6

# Remove by ID prefix
avocadoctl runtime remove a1b2
```
