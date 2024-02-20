---
title: CA Certificates
---

Generally, a CA certificate is an X.509 certificate that signs other X.509 certificates. In the context of Peridio, they are optionally used to control the registration of [device certificates](device-certificates) during [just in time provisioning](just-in-time-provisioning).

To learn more about how to use CA certificates, see the [creating CA certificates](/platform/guides/creating-ca-certificates) guide.

## Expiration

You cannot create a CA certificate in Peridio with an expired X.509 certificate.

If a CA certificate expires after having been configured into Peridio, no devices will be able to JITP using that CA certificate, however, devices that have already been provisioned into Peridio that were signed by that CA certificate will be unaffected in their ability to connect successfully.
