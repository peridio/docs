---
title: hitl unmount
description: 'Unmount NFS extensions.'
---

Unmounts previously mounted NFS extensions. Extensions are unmerged before unmounting to avoid dangling references.

```
avocadoctl hitl unmount [OPTIONS] <EXTENSION>...
```

### Arguments

| Argument       | Description                            |
| -------------- | -------------------------------------- |
| `EXTENSION...` | One or more extension names to unmount |

### Examples

```bash
# Unmount a single extension
avocadoctl hitl unmount my-app

# Unmount multiple extensions
avocadoctl hitl unmount my-app my-config
```
