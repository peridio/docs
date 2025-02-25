---
title: Signing keys
---

Signing keys are ED25519 keys which consist of a public/private key pair.

The private key is used by users to sign firmware and binaries.

The public key is provided to Peridio as well as devices to enable attestation of firmware and binary signatures.

:::tip
For field-level information and requirements, see the Admin API's [create-a-signing-key](/admin-api#signing-keys/operation/create-a-signing-key) endpoint.
:::

## Format

Ed25519 keys can be represented in a variety of ways in the wild.

### PEM

PEM is the recommended format for signing keys.

Example `private.pem`:

```
-----BEGIN PRIVATE KEY-----
MC4CAQAwBQYDK2VwBCIEIP3kk9k67kg6NJmqhA3pcEhS+yHSE/iX2PUBRU4NIv8O
-----END PRIVATE KEY-----
```

Example `public.pem`:

```
-----BEGIN PUBLIC KEY-----
MCowBQYDK2VwAyEAusHn/U1x9H6SUo3fM1Uf9bsEuKcHXWD2mj6a1GRa8z0=
-----END PUBLIC KEY-----
```

### Raw

The public key is the base64 encoding of the raw 32 byte public key. The private key is the base64 encoding of 64 bytes where the first 32 bytes are the raw private key and the last 32 bytes are the raw public key.

Example `private.raw`:

```
Vz/xXB/pdbOphbyjLKj5MBpH/TKXjWEYZdRWzhkKM5fIOXkBQLksx+B5UXUcxIQD8xfg4AioLFeZDrZ8VQIfZQ==
```

Example `public.raw`:

```
yDl5AUC5LMfgeVF1HMSEA/MX4OAIqCxXmQ62fFUCH2U=
```

## Useful commands

### Create keys

#### Create a PEM private key

```
openssl genpkey -algorithm Ed25519 -out private.pem
```

#### Derive a PEM public key From a PEM private key

```
openssl pkey -in private.pem -pubout -out public.pem
```

### Create hashes and signatures

These commands are unnecessary if you use the Peridio CLI as it will handle hashing and signatures for you.

#### Create a hash

```
cat to-be-hashed | sha256sum | grep -o '^\w\+' | tr -d "\n" > hash
```

The hash is in the format you'd, for example, supply to the Peridio Admin API [create-a-binary](/admin-api#binaries/operation/create-a-binary) endpoint.

#### Create a signature

```
openssl pkeyutl -sign -inkey private.pem -rawin -in hash > raw-signature
cat raw-signature | xxd -ps -c 0 | tr a-z A-Z > encoded-signature
```

The encoded signature is in the format you'd, for example, supply to the Peridio Admin API [create-a-binary-signature](/admin-api#binary-signatures/operation/create-a-binary-signature) endpoint.

#### Verify a signature

```
openssl pkeyutl -verify -pubin -inkey public.pem -rawin -in hash -sigfile raw-signature
```

### Convert keys

#### Convert a raw private key into a PEM private key

```
echo -n "\x30\x2e\x02\x01\x00\x30\x05\x06\x03\x2b\x65\x70\x04\x22\x04\x20$(cat private.raw | base64 -d)" \
  | openssl pkey -inform der -outform pem > private.pem
```

The raw byte sequence is a static DER prefix for private Ed25519 keys. You can verify this by hexdumping any private ed25519 key as follows:

```
cat private.pem | openssl pkey -outform DER -in private.pem | hexdump -C
```

You will see the same sequence of bytes at the beginning of the output.

#### Convert a raw public key into a PEM public key


```
echo -n "\x30\x2a\x30\x05\x06\x03\x2b\x65\x70\x03\x21\x00$(cat public.raw | base64 -d)" \
  | openssl pkey -inform der -outform pem -pubin -pubout > public.pem
```

The raw byte sequence is a static DER prefix for public Ed25519 keys. You can verify this by hexdumping any public ed25519 key as follows:

```
cat public.pem | openssl pkey -outform DER -pubin -in public.pem -pubout | hexdump -C
```

You will see the same sequence of bytes at the beginning of the output.

#### Convert a PEM private key into a raw private key

```
openssl pkey -outform DER -in private.pem | tail -c +17 | base64 > private.raw
```

#### Convert a PEM public key into a raw public key

```
openssl pkey -outform DER -pubin -in public.pem -pubout | tail -c +13 | base64 > public.raw
```
