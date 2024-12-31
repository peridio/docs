---
title: Verification certificates
---

A verification certificate is an X.509 certificate that is consumed during the process of [creating a CA certificate](/platform/guides/creating-ca-certificates) in Peridio to prove ownership of the associated private key. Without this step, it would be possible for anyone in possession of a [CA certificate](/platform/reference/ca-certificates), regardless of whether they also own its private key, to associate it with their organization. Ultimately a verification certificate must be created using a [verification code](/platform/reference/verification-codes) as its common name and then uploaded alongside the potential CA certificate.
