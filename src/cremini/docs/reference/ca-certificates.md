---
title: CA Certificates
---

<head>
  <title>Ref | CA Certificates</title>
</head>

A CA certificate is an X.509 certificate that signs [device certificates](device-certificates). The validity of said signature on the device's certificate is verified when a [user](users) creates a device certificate and as part of [just in time registration](just-in-time-registration).

## Just in Time Registration

CA certificates that are added to Peridio can optionally enable just in time registration. This will allow an unregistered [device](devices) to automatically become registered at the moment of its first connection to Peridio.

As part of this configuration, you define a description, tags, and product to be applied to
devices that register in this fashion.
