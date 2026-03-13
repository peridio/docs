---
title: ext merge
description: 'Merge extensions using systemd-sysext and systemd-confext.'
---

Merges all enabled extensions into the running system. System extensions (sysext) overlay `/usr` and `/opt` while configuration extensions (confext) overlay `/etc`. After merging, runs depmod to update kernel module dependencies. Supports streaming progress output.

```
avocadoctl ext merge [OPTIONS]
```

### Examples

```bash
avocadoctl ext merge
```
