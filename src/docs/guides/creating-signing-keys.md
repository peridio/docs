# Creating Signing Keys

This guide describes how to create signing keys.

To learn more about Peridio signing keys in general, see the [signing keys](/reference/signing-keys) reference.

## Prerequisites

- [fwup CLI](https://github.com/fwup-home/fwup).
  - Last tested with version 1.9.1.
- [Peridio CLI](https://github.com/peridio/morel/releases).
  - Last tested with version 0.4.0.

## Create Key Pair

Signing keys can be formatted in the recommended [PEM](/reference/signing-keys#pem) format or the legacy [raw](/reference/signing-keys#raw) format. This guide will create them in the PEM format.

Create a PEM private key:

```
openssl genpkey -algorithm Ed25519 -out private.pem
```

Derive a PEM public key from the PEM private key:

```
openssl pkey -in private.pem -pubout -out public.pem
```

## Create Signing Key

You must submit your public key to Peridio so that it can verify binaries as they are uploaded.

### Web Console

See the [Peridio Web Console](https://console.cremini.peridio.com).

### CLI

```
peridio signing-keys create \
  --value value \
  --name value
```

The `--value` option expects your public key in raw format.

To convert a PEM public key to a raw public key, see the [convert keys](/reference/signing-keys#convert-keys) section of the signing keys reference.

```
openssl pkey -outform DER -pubin -in public.pem -pubout \
  | tail -c +13 \
  | base64 > public.raw
```

The submitted key may now be used to sign [binaries](/guides/creating-binary-signatures) and [firmware](/guides/creating-firmware#sign-the-fwup-archive).

### API

Use the Peridio Admin API [create-a-signing-key](/admin-api#signing-keys/operation/create-a-signing-key) endpoint.

The submitted key may now be used to sign [binaries](/guides/creating-binary-signatures) and [firmware](/guides/creating-firmware#sign-the-fwup-archive).
