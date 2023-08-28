---
title: Device Certificates
---

A [device](devices) certificate is an X.509 certificate that is signed by a [CA certificate](ca-certificates). Devices use their certificates to authenticate with the [Peridio Device API](../device-api) as well as during [just in time provisioning](just-in-time-provisioning).

# Expiration

You cannot create a device certificate in Peridio with an expired X.509 certificate.

If a device certificate expires after having been configured into Peridio, the associated device will be unaffected in their ability to connect successfully.
