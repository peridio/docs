---
title: 'Creating X.509 certificates with Peridio'
description: 'Step-by-step guide to creating X.509 certificates with Peridio CLI for streamlined device authentication and secure certificate management.'
---

This guide describes how to create X.509 certificates with the Peridio CLI.

:::tip less speed more flexibility
For more control over key and certificate details, see [creating X.509 certificates with OpenSSL](/peridio-core/guides/device-management/creating-x509-certificates-with-openssl).
:::

## Prerequisites

- [Peridio CLI](/peridio-core/tools/peridio-cli/overview).
  - Last tested with version 0.24.0.

## Create certificates

:::warning sensitive private keys
Private keys are sensitive components of a public key infrastructure. If they are leaked the entire downstream chain of trust is compromised.
:::

:::warning certificate validity period
The `--start-date` and `--end-date` options should be specified cautiously as they dictate when the certificate will be valid for. The impact of a certificate not being valid yet or having already expired is dependent on the parties interacting with it.

For information regarding how Peridio interacts with certificates reference [CA Certificates](/peridio-core/reference/device-management/ca-certificates) and [Device Certificates](/peridio-core/reference/device-management/device-certificates).
:::

:::tip sign by name
The `--signer-key PATH` and `--signer-cert PATH` option pair can be replaced by a single `--signer NAME` option. For context, see [Peridio CLI config](/peridio-core/tools/peridio-cli/configuration#configjson).
:::

### Root

For context, reference [X.509](/peridio-core/reference/device-management/x509#root).

You must fill in the `--start-date` and `--end-date` values.

```console
peridio x509 create \
  --common-name root-ca \
  --is-ca \
  --start-date YYYY-MM-DD \
  --end-date YYYY-MM-DD
```

### Intermediate

For context, reference [X.509 intermediate](/peridio-core/reference/device-management/x509#intermediate).

You must fill in the `--start-date` and `--end-date` values.

```console
peridio x509 create \
  --common-name intermediate-ca \
  --is-ca \
  --start-date YYYY-MM-DD \
  --end-date YYYY-MM-DD \
  --signer-key root-ca-private-key.pem \
  --signer-cert root-ca-certificate.pem
```

### End-entity certificate

For context, reference [X.509 end entity](/peridio-core/reference/device-management/x509#end-entity).

You must fill in the `--start-date` and `--end-date` values.

```console
peridio x509 create \
  --common-name end-entity \
  --start-date YYYY-MM-DD \
  --end-date YYYY-MM-DD \
  --signer-key intermediate-ca-private-key.pem \
  --signer-cert intermediate-ca-certificate.pem
```
