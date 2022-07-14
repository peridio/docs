# Creating Element Signing Keys

This guide describes how to create an element signing key pair with the [fwup CLI](https://github.com/fwup-home/fwup).

Last tested with fwup 1.9.0.

## Generation

Element signing keys are ED25519 key pairs. While you are free to generate a key pair with any tooling, fwup will produce files [in the format that Peridio expects](/cremini/reference/element-signing-keys#format). If you use other tooling, you must ensure it is in the required format before use with Peridio.

```sh
fwup -g
```

This will create `fwup-key.priv` and `fwup-key.pub`.

## Registration

The public key must be registered with Peridio to facilitate element attestation on upload.

```sh
peridio \
  element-signing-key \
  create \
  --key base64-encoding-of-raw-public-key \
  --name "key name"
```
