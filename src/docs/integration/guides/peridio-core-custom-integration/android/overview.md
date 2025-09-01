# Android

Peridio can be integrated with any variant of the Android OS by programming against the Peridio [Device API](/device-api) via [direct API integration](/integration/guides/peridio-core-custom-integration/android/reference-designs/direct-api-integration).

## Reference agent

The code that runs on a device that integrates with Peridio is referred to as an agent. For a platform-agnostic overview of its optional and required capabilities, please reference the [agent](/integration/guides/peridio-core-custom-integration/introduction#agent) documentation.

`peridiod`, the Peridio Daemon (Peridio's official agent implementation), does not currently support Android-specific interfaces, e.g., interacting with Android APIs and libraries to:

- **Install APKs**: Managing package installations directly on the device using the Android Package Manager (e.g., `PackageInstaller` API).
- **Perform A/B updates**: Orchestrating seamless updates using the Android A/B (seamless updates) system, which involves switching between active and inactive partitions while ensuring rollback protection.
- **Store configuration and metadata**: Persisting configuration or metadata in areas that survive across reboots, are independent of A/B partitions, and are not wiped during factory resets (e.g., storing in a device-protected storage area or using Android's Key-Value Backup or Device Owner features).

These capabilities require deeper integration with Android's ecosystem than the current implementation provides.

:::info
Support for Android-specific capabilities in `peridiod` is in-progress, but not yet ready for general consumption. If you would like to participate in a private beta, please reach out.
:::

The implication of the above is that while the surface area of the Peridio Device API is intentionally small to minimize integration efforts, there will be non-repeatable engineering required to complete the last-mile of integration: the download and application of binaries served by the Peridio Device API.

## Reference designs

While Android-specific hardware reference designs are still in private beta, the following options are available:

- [Direct API integration](/integration/guides/peridio-core-custom-integration/android/reference-designs/direct-api-integration).
- Peridio maintains opinionated reference implementations for a variety of development kits and evaluation boards with respect to Embedded Linux platforms. These will still serve as a helpful context when reasoning about system design with Peridio. For more information, refer to the [Linux reference designs](/integration/guides/peridio-core-custom-integration/linux/overview#reference-designs).
