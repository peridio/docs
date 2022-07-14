---
title: Element Signing Keys
---

<head>
  <title>Ref | Element Signing Keys</title>
</head>

Element signing keys are ED25519 keys which consist of a public/private key pair.

The private portion of element signing keys are used by users to sign elements.

The public portion of element signing keys are provided to Peridio as well as devices to facilitate the attestation of elements' signatures.

## Format

The public key is the base64 encoding of the raw 32 byte public key. The private key is the base64 encoding of 64 bytes where the first 32 bytes are the raw private key and the last 32 bytes are the raw public key.

## Creation

See [Creating Element Signing Keys](/cremini/guides/creating-element-signing-keys).
