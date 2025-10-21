---
title: 'Creating deployments'
description: 'Step-by-step guide to creating deployments in Peridio Core LTS for managing device fleet updates with CLI and web console instructions.'
---

This guide describes how to create deployments.

To learn more about Peridio deployments in general, see the [deployments](/peridio-core/reference/long-term-support/deployments) reference.

## Prerequisites

- [Peridio CLI](https://github.com/peridio/morel/releases).
  - Last tested with version 0.8.0.

In order to create a deployment it must be associated with a preexisting product and firmware. To learn how to create a product, see the [creating products](/peridio-core/guides/device-management/creating-products) guide. To learn how to create firmware, see the [creating firmware](/peridio-core/guides/long-term-support/creating-firmware) guide.

## Create deployment

### Web Console

See the [Peridio Web Console](https://console.peridio.com).

### CLI

```
peridio deployments create \
  --firmware-uuid abc \
  --name "My Deployment" \
  --product-name "My Product" \
  --tags tag1,tag2
```

### API

Use the Peridio Admin API [create-a-deployment](/peridio-core/tools/admin-api/v1/popout#deployments/operation/create-a-deployment) endpoint.
