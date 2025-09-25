---
title: 'Creating artifacts'
description: 'Step-by-step guide to creating artifacts in Peridio Core for organizing binary types with CLI and web console instructions.'
---

This guide describes how to create artifacts.

To learn more about Peridio artifacts in general, see the [artifacts](/peridio-core/reference/binary-management/artifacts) reference.

## Prerequisites

- [Peridio CLI](https://github.com/peridio/morel/releases).
  - Last tested with version 0.8.0.

## Create artifact

### CLI

```console
peridio --profile prod artifacts create \
  --organization-prn prn \
  --name name
```

### API

Use the Peridio Admin API [create an artifact](/peridio-core/tools/admin-api#artifacts/operation/create-an-artifact) endpoint.

### Web Console

See the [Peridio Web Console](https://console.peridio.com).
