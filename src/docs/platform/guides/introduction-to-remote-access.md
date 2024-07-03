# Introduction to Remote Access

This guide serves as a comprehensive introduction to remote access that will cover tunnels and their **asynchronous** nature.

:::labs
:::

To learn more about Peridio tunnels in general, see the [tunnels](/platform/reference/tunnels) reference.

## Prerequisites

- [Peridio CLI](https://github.com/peridio/morel/releases).
  - Last tested with version 0.22.1.

## Remote Access Resources

Remote access comprises the following resources:

- [Tunnels](/platform/reference/tunnels) - used to securely connect users to devices

## Getting Started

The goal of this guide is to create a tunnel for a device.

### Creating a Tunnel

[Create a tunnel](creating-tunnels) so that we can connect to devices.

```
peridio tunnels create \
  --device-prn $PERIDIO_DEVICE_PRN \
  --device-tunnel-port 22
```

### Checking to see if a tunnel is `open`

Because the create tunnel call is asynchronous, we need to check to see if the tunnel is ready for us to use. We would recommend waiting at least 3 seconds between retries.

```
peridio tunnels get \
  --prn $PERIDIO_TUNNEL_PRN
```

Then look for the `state` key in the response:

```
{
  ...
  "state": "open",
  ...
}
```

### Connecting to a tunnel via SSH

When the tunnel is `open`, then you can use the keys `server_tunnel_ip_address` and `server_tunnel_port` from the response to connect in the form of `ssh [user]@[server_tunnel_ip_address] -p [server_tunnel_port]`.

```
{
  ...
  "server_tunnel_ip_address": "3.82.23.99",
  "server_tunnel_port": 47532,
  ...
}
```

Assuming the device allows the user `user` to ssh in:

```
ssh user@3.82.23.99 -p 47532
```
