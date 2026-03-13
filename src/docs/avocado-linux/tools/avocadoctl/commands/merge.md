---
title: merge
description: 'Merge extensions using systemd-sysext and systemd-confext. Alias for ext merge.'
---

Top-level alias for [`avocadoctl ext merge`](ext/merge). Merges all enabled extensions into the running system using systemd-sysext and systemd-confext. Runs depmod after merge to update kernel module dependencies.

```
avocadoctl merge [OPTIONS]
```

### Examples

```bash
avocadoctl merge
```
