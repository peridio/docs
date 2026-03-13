---
title: hitl mount
description: 'Mount NFS extensions from a remote development server.'
---

Mounts extensions from a remote NFS server for hardware-in-the-loop (HITL) development. This enables live development on target hardware by mounting extension directories from the development host. NFS is mounted with NFSv4, hard timeout, and caching disabled for live updates.

```
avocadoctl hitl mount [OPTIONS] -s <SERVER_IP> <EXTENSION>...
```

### Options

| Option | Description |
|---|---|
| `-s`, `--server-ip <SERVER_IP>` | NFS server IP address (required) |
| `-e`, `--server-port <PORT>` | NFS server port |

### Arguments

| Argument | Description |
|---|---|
| `EXTENSION...` | One or more extension names to mount |

### Examples

```bash
# Mount a single extension from a remote server
avocadoctl hitl mount -s 192.168.1.100 my-app

# Mount multiple extensions
avocadoctl hitl mount -s 192.168.1.100 my-app my-config

# Mount with a custom NFS port
avocadoctl hitl mount -s 192.168.1.100 -e 2049 my-app
```
