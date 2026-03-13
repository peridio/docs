---
title: disable
description: 'Disable extensions for a specific runtime version.'
---

Disables extensions by removing symlinks from `/var/lib/avocado/os-releases/{version_id}/`.

```
avocadoctl disable [OPTIONS] [EXTENSION]...
```

### Options

| Option                   | Description                                                 |
| ------------------------ | ----------------------------------------------------------- |
| `--os-release <VERSION>` | OS release version. Defaults to the current system version. |
| `--all`                  | Disable all extensions                                      |

### Arguments

| Argument       | Description                                                              |
| -------------- | ------------------------------------------------------------------------ |
| `EXTENSION...` | One or more extension names to disable (required unless `--all` is used) |

### Examples

```bash
# Disable a single extension
avocadoctl disable my-app

# Disable multiple extensions
avocadoctl disable my-app my-config

# Disable all extensions
avocadoctl disable --all
```
