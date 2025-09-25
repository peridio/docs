---
title: 'Device certificates'
description: 'Device certificates in Peridio Core are X.509 certificates signed by CA certificates for device authentication with Peridio Device API and just-in-time provisioning.'
---

A [device](/peridio-core/reference/device-management/devices) certificate is an X.509 certificate that is signed by a [CA certificate](ca-certificates). Devices use their certificates to authenticate with the [Peridio Device API](/peridio-core/tools/device-api) as well as during [just in time provisioning](just-in-time-provisioning).

## Expiration

You cannot create a device certificate in Peridio with an expired X.509 certificate.

If a device certificate expires after having been configured into Peridio, the associated device will be unaffected in their ability to connect successfully.
