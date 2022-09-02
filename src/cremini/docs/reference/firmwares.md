---
title: Firmwares
---

<head>
  <title>Ref | Firmwares</title>
</head>

Firmwares are the data you wish to distribute to devices.

Peridio leverages [fwup](https://github.com/fwup-home/fwup) to package, sign, verify, and apply firmwares. fwup uses cryptographically signed ZIP archives to package firmwares.

## Time to Live (TTL)

Firmwares can be configured on a per-firmware basis to be deleted automatically after a set amount of seconds by configuring their `ttl` field. Firmware associated with a deployment will never be automatically deleted. Dissassociating a firmware with a configured TTL from all deployments will cause the TTL to begin counting down again from its maximum value.

### Example

1. Firmware (A) is created with `ttl: 60` and is associated with zero deployments.
    - Firmware (A)'s TTL begins counting down and it will be automatically deleted once it runs out.
2. Firmware (A) is associated with deployment (B).
    - Firmware (A)'s TTL is ignored and it will not be automatically deleted.
3. Firmware (A) is associated with deployment (C).
    - Firmware (A) is now associated with two deployments, its TTL continues to be ignored and it still will not be automatically deleted.
4. Deployment (B) is deleted.
    - Firmware (A) is still associated with at least one deployment, its TTL continues to be ignored and it still will not be automatically deleted.
5. Deployment (C) is deleted.
    - Firmware (A) is associated with zero deployments, its TTL begins counting down from its maximum value of `60` and it will be automatically deleted once it runs out.
