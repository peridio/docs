---
title: root-authority
description: 'Show the trusted signing keys from the TUF root authority.'
---

Displays the TUF (The Update Framework) trust anchor for this device. Shows key IDs, key types, and the roles each key is authorized to sign (timestamp, snapshot, targets, delegations). The root authority is stored at `/var/lib/avocado/metadata/root.json`.

```
avocadoctl root-authority [OPTIONS]
```

### Examples

```bash
avocadoctl root-authority
```
