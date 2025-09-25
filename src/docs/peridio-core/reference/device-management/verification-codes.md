---
title: 'Verification codes'
description: 'Verification codes in Peridio Core are credentials used to prove ownership of private keys during CA certificate creation for secure device authentication.'
---

A verification code is a credential that is consumed during the process of [creating a CA certificate](/peridio-core/guides/device-management/creating-ca-certificates) in Peridio to prove ownership of the associated private key. Without this step, it would be possible for anyone in possession of a [CA certificate](/peridio-core/reference/device-management/ca-certificates), regardless of whether they also own its private key, to associate it with their organization. Ultimately a verificate code is used as the common name of a [verification certificate](/peridio-core/reference/device-management/verification-certificates) which is to be uploaded alongside the potential CA certificate.
