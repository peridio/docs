---
title: 'Artifacts'
description: 'Artifacts in Peridio Core define types for binaries - organize ML models, kernels, filesystems, and other content for device deployment.'
---

Artifacts define a type for your [binaries](/peridio-core/reference/binary-management/binaries).

Artifacts can represent anything: a machine learning model, a Linux kernal, a file system, a piece of media, a black box, etc.

For example, you may create an artifact "ML-Model". Within that artifact you would create [artifact versions](/peridio-core/reference/binary-management/artifact-versions). Within versions you would create binaries.

:::tip
For field-level information and requirements, see the Admin API's [create-an-artifact](/peridio-core/tools/admin-api#artifacts/operation/create-an-artifact) endpoint.
:::

## Immutable reference

Artifacts act as an immutable reference to a type of binary that remains consistent before and after any version or binaries are created for it. This enables code to perform different actions based on the type of binary.

For example, your bundles may typically contain your base firmware image and a machine learning model. A device performing a Device API [get-update](/peridio-core/tools/device-api#devices/operation/get-update) request could distinguish between the two binaries by observing the artifact PRNs reported alongside the binaries in the response's manifest.
