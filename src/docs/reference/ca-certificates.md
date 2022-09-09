---
title: CA Certificates
---

A CA certificate is an X.509 certificate that signs [device certificates](device-certificates). The validity of said signature on the device's certificate is verified when a [user](users) creates a device certificate and as part of [just in time provisioning](just-in-time-provisioning).

## Just in Time Provisioning

CA certificates that are added to Peridio can optionally enable just in time provisioning. This will allow an unprovisioned [device](devices) to automatically become provisioned at the moment of its first connection to Peridio.

As part of this configuration, you define a description, tags, and product to be applied to devices that provision in this fashion.
