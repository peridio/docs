---
title: 'CA certificates'
description: 'CA certificates in Peridio Core are X.509 intermediate certificates that sign end-entity certificates for device registration control during just-in-time provisioning.'
---

In the context of Peridio, a CA certificate is an X.509 [intermediate CA](/peridio-core/reference/device-management/x509#intermediate) that signs other [end-entity certificates](/peridio-core/reference/device-management/x509#end-entity). In the context of Peridio, they are optionally used to control the registration of [device certificates](device-certificates) during [just in time provisioning](just-in-time-provisioning).

To learn more about how to use CA certificates, see the [creating CA certificates](/peridio-core/guides/device-management/creating-ca-certificates) guide.

## Expiration

You cannot create a CA certificate in Peridio with an expired X.509 certificate.

If a CA certificate expires after having been configured into Peridio, no devices will be able to JITP using that CA certificate, however, devices that have already been provisioned into Peridio that were signed by that CA certificate will be unaffected in their ability to connect successfully.
