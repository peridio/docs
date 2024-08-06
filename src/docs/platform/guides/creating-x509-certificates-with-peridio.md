# Creating X.509 Certificates with Peridio

This guide describes how to create X.509 certificates with the Peridio CLI.

:::tip less speed more flexibility
For more control over key and certificate details, see [creating X.509 certificates with OpenSSL](/platform/guides/creating-x509-certificates-with-openssl).
:::

## Prerequisites

- [Peridio CLI](/cli).
  - Last tested with version 0.24.0.

## Create Certificates

:::warning sensitive private keys
Private keys are sensitive components of a public key infrastructure. If they are leaked the entire downstream chain of trust is compromised.
:::

:::warning certificate validity period
The `--start-date` and `--end-date` options should be specified cautiously as they dictate when the certificate will be valid for. The impact of a certificate not being valid yet or having already expired is dependent on the parties interacting with it.

For information regarding how Peridio interacts with certificates reference [CA Certificates](/platform/reference/ca-certificates) and [Device Certificates](/platform/reference/device-certificates).
:::

:::tip sign by name
The `--signer-key PATH` and `--signer-cert PATH` option pair can be replaced by a single `--signer NAME` option. For context, see [Peridio CLI config](/cli#configjson).
:::

### Root

For context, reference [X.509](/platform/reference/x509#root).

You must fill in the `--start-date` and `--end-date` values.

```console
peridio x509 create \
  --common-name root-ca \
  --is-ca \
  --start-date YYYY-MM-DD \
  --end-date YYYY-MM-DD
```

### Intermediate

For context, reference [X.509 intermediate](/platform/reference/x509#intermediate).

You must fill in the `--start-date` and `--end-date` values.

```console
peridio x509 create \
  --common-name intermediate-ca \
  --is-ca \
  --start-date YYYY-MM-DD \
  --end-date YYYY-MM-DD
  --signer-key root-ca-private-key.pem \
  --signer-cert root-ca-certificate.pem
```

### End-Entity Certificate

For context, reference [X.509 end entity](/platform/reference/x509#end-entity).

You must fill in the `--start-date` and `--end-date` values.

```console
peridio x509 create \
  --common-name end-entity \
  --start-date YYYY-MM-DD \
  --end-date YYYY-MM-DD
  --signer-key intermediate-ca-private-key.pem \
  --signer-cert intermediate-ca-certificate.pem
```
