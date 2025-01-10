# Creating tunnels

This guide describes how to create tunnels.

To learn more about Peridio tunnels in general, see the [tunnels](/platform/reference/tunnels) reference.

## Prerequisites

- [Peridio CLI](https://github.com/peridio/morel/releases).
  - Last tested with version 0.21.0.

## Create tunnel

### CLI

```
peridio tunnels create \
  --device-prn $PERIDIO_DEVICE_PRN \
  --device-tunnel-port 22
```


### API

Use the Peridio Admin API [create-a-tunnel](/admin-api#tunnels/operation/create-a-tunnel) endpoint.

### Web Console

See the [Peridio Web Console](https://console.peridio.com).
