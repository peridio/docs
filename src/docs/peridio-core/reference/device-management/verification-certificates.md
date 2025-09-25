---
title: 'Verification certificates'
description: 'Verification certificates in Peridio Core are X.509 certificates used to prove ownership of private keys during CA certificate creation for secure device authentication.'
---

A verification certificate is an X.509 certificate that is consumed during the process of [creating a CA certificate](/peridio-core/guides/device-management/creating-ca-certificates) in Peridio to prove ownership of the associated private key. Without this step, it would be possible for anyone in possession of a [CA certificate](/peridio-core/reference/device-management/ca-certificates), regardless of whether they also own its private key, to associate it with their organization. Ultimately a verification certificate must be created using a [verification code](/peridio-core/reference/device-management/verification-codes) as its common name and then uploaded alongside the potential CA certificate.
