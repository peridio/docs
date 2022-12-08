# Creating Firmware Signing Keys

This guide describes how to create firmware signing keys.

To learn more about Peridio firmware signing keys in general, see the [firmware signing keys](/reference/firmware-signing-keys) reference.

## Prerequisites

- [fwup CLI](https://github.com/fwup-home/fwup).
  - Last tested with version 1.9.1.
- [Peridio CLI](https://github.com/peridio/morel/releases).
  - Last tested with version 0.3.0.

## Creation

```text
fwup -g
```

## Submission to Peridio

### Web Console

See the [Peridio Web Console](https://console.cremini.peridio.com).

### CLI

```
peridio signing-keys create \
  --key value \
  --name value
```

The submitted key may now be used to [sign firmware](/guides/creating-firmware#sign-the-fwup-archive).

### API

Use the Peridio Admin API [create key](/admin-api#tag/Keys/paths/~1orgs~1%7Borganization_name%7D~1keys/post) endpoint.

The submitted key may now be used to [sign firmware](/guides/creating-firmware#sign-the-fwup-archive).

