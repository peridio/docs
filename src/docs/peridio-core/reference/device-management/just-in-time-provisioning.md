---
title: 'Just in time provisioning'
description: 'Just-in-time provisioning in Peridio Core automatically provisions devices on first connection using CA certificates, eliminating per-device onboarding actions.'
---

Configuring just in time provisioning for a [CA certificate](ca-certificates) enables [devices](/peridio-core/reference/device-management/devices) to be automatically provisioned, "just in time", the moment of their first connection to the [Peridio Device API](/peridio-core/tools/device-api). This alleviates the burden of having to take any per device onboarding action.

## Provisioning flow

1. An unprovisioned device connects to the Peridio Device API for the first time ever.
2. Peridio validates that the device's certificate is signed by a configured and unexpired CA Certificate.
3. Peridio provisions the device by creating a record of it as well as its public certificate and automatically assigning the attributes configured against the relevant CA certificate's JITP config (product, cohort, tags, and description).
