---
title: runtime activate
description: 'Activate a staged runtime by ID.'
---

Activates a staged runtime, making it the current active runtime. The ID can be specified as a prefix as long as it is unambiguous.

The activation process:

1. Resolves the runtime by ID prefix.
2. If the runtime includes an OS bundle with a different `os_build_id` than the running system, an OS update is applied and a reboot is required.
3. If no OS change is needed, the `active` symlink is atomically switched and extensions are refreshed.

See [Activation Process](../../runtime-management/activation-process) for full details.

```
avocadoctl runtime activate [OPTIONS] <ID>
```

### Arguments

| Argument | Description                      |
| -------- | -------------------------------- |
| `ID`     | Runtime ID or unambiguous prefix |

### Examples

```bash
# Activate by full ID
avocadoctl runtime activate a1b2c3d4e5f6

# Activate by ID prefix
avocadoctl runtime activate a1b2
```
