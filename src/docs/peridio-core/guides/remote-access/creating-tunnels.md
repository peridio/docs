---
title: 'Creating tunnels'
description: 'Step-by-step guide to creating secure remote access tunnels in Peridio Core for device management and troubleshooting with CLI instructions.'
---

This guide describes how to create tunnels.

To learn more about Peridio tunnels in general, see the [tunnels](/peridio-core/reference/remote-access/tunnels) reference.

## Prerequisites

- [Peridio CLI](https://github.com/peridio/morel/releases).
  - Last tested with version 0.21.0.

## Create tunnel

### CLI

```
peridio tunnels create \
  --device-prn $PERIDIO_DEVICE_PRN \
  --device-tunnel-port 22
```

### API

Use the Peridio Admin API [create-a-tunnel](/peridio-core/tools/admin-api#tunnels/operation/create-a-tunnel) endpoint.

### Web Console

See the [Peridio Web Console](https://console.peridio.com).
