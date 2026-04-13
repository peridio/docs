---
title: runtime inspect
description: 'Inspect runtime details.'
---

Shows detailed information about a runtime including manifest version, build time, runtime name and version, all extensions with their image IDs, and OS bundle information if present. Omit the ID to inspect the currently active runtime.

```
avocadoctl runtime inspect [OPTIONS] [ID]
```

### Arguments

| Argument | Description                                                               |
| -------- | ------------------------------------------------------------------------- |
| `ID`     | Runtime ID or unambiguous prefix. Inspects the active runtime if omitted. |

### Examples

```bash
# Inspect the active runtime
avocadoctl runtime inspect

# Inspect a specific runtime by ID prefix
avocadoctl runtime inspect a1b2
```
