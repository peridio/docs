---
title: enable
description: 'Enable extensions for a specific runtime version.'
---

Enables extensions by creating symlinks in `/var/lib/avocado/os-releases/{version_id}/`. The OS release version defaults to the current system's `VERSION_ID` from `/etc/os-release`.

```
avocadoctl enable [OPTIONS] <EXTENSION>...
```

### Options

| Option                   | Description                                                 |
| ------------------------ | ----------------------------------------------------------- |
| `--os-release <VERSION>` | OS release version. Defaults to the current system version. |

### Arguments

| Argument       | Description                                      |
| -------------- | ------------------------------------------------ |
| `EXTENSION...` | One or more extension names to enable (required) |

### Examples

```bash
# Enable a single extension
avocadoctl enable my-app

# Enable multiple extensions
avocadoctl enable my-app my-config

# Enable for a specific OS release version
avocadoctl enable --os-release 1.2.0 my-app
```
