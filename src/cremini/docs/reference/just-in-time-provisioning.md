---
title: Just in Time Provisioning
---

<head>
  <title>Ref | Just in Time Provisioning</title>
</head>

[Configuring just in time provisioning for a CA Certificate](ca-certificates#just-in-time-provisioning) enables a [device](devices) whose [certificate](device-certificates) is signed by that CA certificate to reactively provision itself at the moment of its first connection to the [Peridio Device API](../device-api). This alleviates the burden of having to take any per device onboarding action.

## Provisioning Flow

1. An unprovisioned device attempts to connect to Peridio Device API for the first time ever. Typically via the [get device me](../device-api#tag/Devices/paths/~1device~1me/get) endpoint, but any endpoint will do.
2. Peridio validates that the device's certificate is signed by a present and valid CA Certificate.
3. Peridio provisions the device creating a record of the device as well as its certificate and automatically assigning the attributes configured against the relevant CA certificate.
