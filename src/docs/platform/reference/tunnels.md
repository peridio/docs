# Tunnels

Tunnels expose your device via a public IP address and port. The creation of tunnels are **asynchronous**. This means that a tunnel may not be open and available immediately after it's creation. You will then have to check the tunnel's `state` to see when it is `open` before attempting to connect.

:::labs
:::

Find additional information in the Admin API remote access [tunnels section](/admin-api#Tunnels) and the [creating tunnels guide](/platform/guides/creating-tunnels) guide.
