---
title: 'Creating products'
description: 'Step-by-step guide to creating products in Peridio Core for organizing and managing device fleets with web console and CLI instructions.'
---

This guide describes how to create produts.

To learn more about Peridio products in general, see the [products](/peridio-core/reference/device-management/products) reference.

## Prerequisites

- [Peridio CLI](https://github.com/peridio/morel/releases) >= 0.11.0.

## Create product

### Web Console

See the [Peridio Web Console](https://console.peridio.com).

### CLI

```
peridio products-v2 create \
  --name name \
  --organization-prn prn
```

### API

Use the Peridio Admin API [create-a-product-v2](/peridio-core/tools/admin-api#products/operation/create-a-product) endpoint.
