---
title: runtime remove
description: 'Remove a staged runtime by ID.'
---

Removes a staged runtime directory. The runtime ID can be specified as a prefix as long as it is unambiguous. The currently active runtime cannot be removed — activate a different runtime first. Shared extension images in the image pool are not removed.

```
avocadoctl runtime remove [OPTIONS] <ID>
```

### Arguments

| Argument | Description |
|---|---|
| `ID` | Runtime ID or unambiguous prefix |

### Examples

```bash
# Remove by full ID
avocadoctl runtime remove a1b2c3d4e5f6

# Remove by ID prefix
avocadoctl runtime remove a1b2
```
