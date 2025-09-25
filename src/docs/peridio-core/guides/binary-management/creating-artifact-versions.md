---
title: 'Creating artifact versions'
description: 'Step-by-step guide to creating artifact versions in Peridio Core for organizing binary deployments with CLI and web console instructions.'
---

This guide describes how to create artifact versions.

To learn more about Peridio artifact versions in general, see the [artifact versions](/peridio-core/reference/binary-management/artifact-versions) reference.

## Prerequisites

- [Peridio CLI](https://github.com/peridio/morel/releases).
  - Last tested with version 0.8.0.

## Create artifact version

### CLI

```
peridio artifact-versions create \
  --artifact-prn prn \
  --version version
```

### API

Use the Peridio Admin API [Create an artifact version](/peridio-core/tools/admin-api#artifact-versions/operation/create-an-artifact-version) endpoint.

### Web Console

See the [Peridio Web Console](https://console.peridio.com).
