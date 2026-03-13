---
title: status
description: 'Show overall system status including active runtime and merged extensions.'
---

Displays the active runtime information including its name, version, short ID, rootfs build ID, and initramfs build ID. Also shows the status of all currently merged extensions.

```
avocadoctl status [OPTIONS]
```

### Global Options

| Option                    | Description                |
| ------------------------- | -------------------------- |
| `-c`, `--config <PATH>`   | Path to configuration file |
| `-v`, `--verbose`         | Enable verbose output      |
| `-o`, `--output <FORMAT>` | Output format              |
| `--socket <ADDRESS>`      | Varlink socket address     |

### Examples

```bash
# Show system status
avocadoctl status

# Show status with verbose output
avocadoctl status --verbose
```
