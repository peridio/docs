---
title: Firmware Signing Keys
---

Firmware signing keys are ED25519 keys which consist of a public/private key pair.

The private portion of firmware signing keys are used by users to sign firmwares.

The public portion of firmware signing keys are provided to Peridio as well as devices to facilitate the attestation of firmwares' signatures.

## Format

The public key is the base64 encoding of the raw 32 byte public key. The private key is the base64 encoding of 64 bytes where the first 32 bytes are the raw private key and the last 32 bytes are the raw public key.

## Creation

The [fwup CLI](https://github.com/fwup-home/fwup) can be used to generate a valid pair of key files.

```text
fwup -g
```

Register the public key with Peridio.

```text
peridio signing-keys create \
  --key value \
  --api-key value \
  --name value \
  --organization-name value
```

Now firmware [signed with the private key](firmwares#sign-a-fwup-archive) will be authorized for submission into Peridio.
