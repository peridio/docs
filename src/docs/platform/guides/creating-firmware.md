# Creating Firmware

This guide describes how to create firmware.

To learn more about Peridio firmware in general, see the [firmware](/platform/reference/firmware) reference.

## Prerequisites

- [fwup CLI](https://github.com/fwup-home/fwup).
  - Last tested with version 1.9.1.
- [Peridio CLI](https://github.com/peridio/morel/releases).
  - Last tested with version 0.8.0.

In order to create a firmware it must be associated with a preexisting product. To learn how to create a product, see the [creating products](/platform/guides/creating-products) guide.

## fwup Archive Creation

### Create a Dummy Asset

```
echo "russet" > tuber.txt
```

### Create a fwup conf

Create `fwup.conf` containing:

```
meta-architecture = "arm"
meta-misc = "{\"foo\":\"bar\",\"baz\":12}"
meta-platform = "Jetson Nano"
meta-product = "Smart Potato"
meta-vcs-identifier = "23758867219c8d84c8363316e6dd2f9fd7ae3049"
meta-version = "1.0.0"

file-resource tuber.txt {
  host-path = "tuber.txt"
}
```

### Create a fwup Archive

```text
fwup \
  -c \
  -f fwup.conf \
  -o demo.fw
```

### Sign the fwup Archive

See [signing keys](/platform/reference/signing-keys).

```text
fwup \
  -S \
  -s fwup-key.priv \
  -i demo.fw \
  -o signed-demo.fw
```

### Verify the fwup Archive is Signed

```text
fwup \
  -m \
  -p fwup-key.pub \
  -i signed-demo.fw
```

A failure would print an error like:

> fwup: Firmware archive's meta.conf fails digital signature verification.

## Submission to Peridio

### Web Console

See the [Peridio Web Console](https://console.peridio.com).

### CLI

```
peridio firmwares create \
  --firmware-path signed-demo.fw \
  --product-name "Smart Potato"
```

### API

Use the Peridio Admin API [create a firmware](/admin-api#firmware/operation/create-a-firmware) endpoint.
