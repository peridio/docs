---
title: ext refresh
description: 'Unmerge and then merge extensions atomically.'
---

Performs an atomic refresh by first unmerging all extensions, then immediately merging them again. This picks up any changes to the set of enabled extensions or updated extension images.

```
avocadoctl ext refresh [OPTIONS]
```

### Examples

```bash
avocadoctl ext refresh
```
