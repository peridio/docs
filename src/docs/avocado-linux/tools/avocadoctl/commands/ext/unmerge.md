---
title: ext unmerge
description: 'Unmerge extensions using systemd-sysext and systemd-confext.'
---

Unmerges all extensions from the running system. With `--unmount`, also unmounts persistent loop devices used by `.raw` extension images.

```
avocadoctl ext unmerge [OPTIONS]
```

### Options

| Option | Description |
|---|---|
| `--unmount` | Also unmount all persistent loops for `.raw` extensions |

### Examples

```bash
# Unmerge all extensions
avocadoctl ext unmerge

# Unmerge and unmount .raw loop devices
avocadoctl ext unmerge --unmount
```
