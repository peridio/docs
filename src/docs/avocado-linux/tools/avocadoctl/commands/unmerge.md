---
title: unmerge
description: 'Unmerge extensions using systemd-sysext and systemd-confext. Alias for ext unmerge.'
---

Top-level alias for [`avocadoctl ext unmerge`](ext/unmerge). Unmerges all extensions from the running system. Optionally unmounts persistent loop devices used by `.raw` extension images.

```
avocadoctl unmerge [OPTIONS]
```

### Options

| Option      | Description                                             |
| ----------- | ------------------------------------------------------- |
| `--unmount` | Also unmount all persistent loops for `.raw` extensions |

### Examples

```bash
# Unmerge all extensions
avocadoctl unmerge

# Unmerge and unmount .raw loop devices
avocadoctl unmerge --unmount
```
