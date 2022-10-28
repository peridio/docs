---
title: Firmware Signing Keys
---

Firmware signing keys are ED25519 keys which consist of a public/private key pair.

The private portion of firmware signing keys are used by users to sign firmwares.

The public portion of firmware signing keys are provided to Peridio as well as devices to facilitate the attestation of firmwares' signatures.

To learn more about how to use firmware signing keys, see the [creating firmware signing keys](/guides/creating-firmware-signing-keys) guide.

## Format

The public key is the base64 encoding of the raw 32 byte public key. The private key is the base64 encoding of 64 bytes where the first 32 bytes are the raw private key and the last 32 bytes are the raw public key.
