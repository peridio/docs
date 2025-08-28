# Direct API integration

Direct [Device API](/device-api) integration of Android devices with Peridio involves the following:

- Authentication
- Discover updates
- Download updates
- Install updates
- Optional extensions

## Authentication

Devices authenticate to the Device API via mutual TLS (mTLS), sometimes referred to as mutual authentication. That is, where TLS typically requires the client to verify the server, mTLS requires the client and the server to verify eachother. mTLS is an industry standard variation of transport layer security and is not a Peridio-specific concept. For example, AWS IoT Core uses mTLS. This standardization allows devices to connect to a variety of systems using the same credentials in the same way, simplifying integration while ensuring security.

In the context of Android, this requires that your devices have a device-specific identity that is
attestable via an X.509 v3 certificate, hereafter refered to as a [device certificate](/platform/reference/device-certificates). The device certificate must be stored on device in a manner that persists in all cases, e.g., across reboots, updates, and factory resets.

:::info mutable identities
There are exceptional scenarios where one may desire the ability to mutate (delete or reset) a device's identity, which is to say delete or reset the device certificate. Such scenarios are outside the scope of this document.
:::

The device certificate is then supplied when making requests to the Device API as part of mutual authentication. How exactly this manifests in code is dependent on the client HTTP library you use. For example, when using retrofit/okhttp, reference their [client authentication](https://github.com/square/okhttp/blob/master/okhttp-tls/README.md?utm_source=chatgpt.com#client-authentication) documentation.

A device correctly supplying its certificate is half of the effort, the server must also know to trust the client's certificate. This can be can be achieved in a couple of ways:

- The CLI's [device-certificates create](/peridio-cli/device-certificates/create) command.
  - Typically used in ad-hoc development contexts.
- The Admin API's [create-a-device-certificate](/admin-api#device-certificates/operation/create-a-device-certificate) route.
  - Typically used in ad-hoc production contexts.
- [Just-in-time provisioning](/platform/reference/just-in-time-provisioning).
  - Typically used in mass-manufacturing production contexts.

## Discover updates

Device's may check if an update is available by hitting the Device API [get-update](/device-api#devices/operation/get-update) route. This will inform them of if an update is available, as well as provide pre-signed download URLs for each of the bundle's binaries. Interaction with this API is also how the device informs Peridio of its current status, i.e., what release/bundle/version it is currently running.

## Download updates

After a device learns an update is available, it is free to download none, some, or all of the available binaries as it deems fit. This decision is as simple or complex as the use case demands, ranging from always downloading immediately when available, to potentially involving custom metadata configured into Peridio, environmental and operational factors like time of day and system status, and even local human operator input.

In any case, it is important to consider:

- How the download is performed.
- Where the content is downloaded to.

### Fast downloads

Pending the size of your binaries and your operational requirements, it is common to desire "fast downloads". This effectively translates to parallel resumable downloads.

#### Parallel downloads

Parallel downloads involve splitting the binary into smaller chunks and downloading these chunks concurrently using multiple network connections. This approach can significantly improve download speeds, especially in high-bandwidth or low-latency environments, by maximizing network throughput and minimizing the impact of slow segments. Implementing parallel downloads requires support for HTTP range requests, which Peridio supports, and careful management of concurrent streams to avoid overwhelming the device's network stack or storage subsystem. For Android, leveraging libraries like OkHttp with custom interceptors can simplify this implementation.

#### Resumable downloads

Resumable downloads ensure that a download interrupted by network issues, device reboots, or other disruptions can continue from where it left off, rather than restarting from the beginning. This feature is particularly important for large binaries or devices operating in unreliable network conditions. Resumable downloads typically rely on HTTP range requests and metadata tracking to store the progress of each chunk. On Android, this can be achieved by managing state in local storage and using libraries or APIs that support partial downloads, ensuring seamless recovery and efficient use of bandwidth.

## Install updates

After a binary is downloaded, how you install it depends on what the binary is as well as your wider platform context. For apps you may handoff to the Package Installer API. For system updates you may handoff to the Update Engine API. For other artifact types, installation may simply be persisting the binary to a particular location.

## Optional extensions

Beyond OTA and connectivity information described earlier, there are other categories of functionality you may wish to optionally leverage.

### Remote access tunnels

Peridio supports remote access tunnels, that is, secure wireguard connections with your device. From the device's perspective these connections are outbound-initiated, so no inbound ports are required for initiation of the tunnel. The effort to support these tunnels is primarily ensuring wireguard is available on-device, either as a kernel module or a user-space implementation. Beyond that, the device must integrate with the Peridio Device WS API to support control plane operations of this functionality like discovering a tunnel is desired as well as exchanging network configuration handshakes.

For integration support for remote access tunnels, please contact our support team.
