---
title: 'Creating bundles'
description: 'Step-by-step guide to creating bundles in Peridio Core for organizing immutable sets of binaries with CLI and web console instructions.'
---

This guide describes how to create bundles.

To learn more about Peridio bundles in general, see the [bundles](/peridio-core/reference/bundle-management/bundles)
reference.

## Prerequisites

- [Peridio CLI](https://github.com/peridio/morel/releases).
  - Last tested with version 0.8.0.

## Create bundle

### CLI

```console
peridio bundles create \
  --artifact-version-ids uuid1,uuid2
```

### API

Use the Peridio Admin API
[Create a bundle](/peridio-core/tools/admin-api#bundles/operation/create-a-bundle) endpoint.

### Web Console

See the [Peridio Web Console](https://console.peridio.com).
