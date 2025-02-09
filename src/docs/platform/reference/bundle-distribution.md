# Bundle distribution

The process Peridio undergoes to check for an update for a device is referred to as bundle resolution. Bundle resolution determines if there is a [bundle](/platform/reference/bundles), referred to as the target bundle, the [device](/platform/reference/devices) can update to. To make this determination, Peridio must consider what bundle the device is currently running.

Users may check for an update on behalf of a device via the Admin API [get-device-udpate](/admin-api#devices/operation/devices-get-update) route. Devices may check for an update via the Device API [get-update](/device-api#devices/operation/get-update) route.


## Bundle resolution

A target bundle is resolved via either bundle overrides or release resolution. The following subsections give a high-level overview of the two resolution methods. For an exhaustive specification of the entire process, refer to the [resolution algorithm](#resolution-algorithm).

### Bundle override method

[Bundle overrides](/platform/reference/bundle-overrides) are higher priority than release resolution. If there is an applicable bundle override, release resolution will not be considered at all. If Peridio considers a device to be on a different bundle than the applicable override, then when it checks for an update it will be served the override's bundle. If Peridio considers a device to be on the bundle of the applicable bundle override, then the device will be served no update ignoring any potential releases should they exist. This state will continue until the bundle override is updated, expired, deleted, or another bundle override takes precedence.

:::tip bundle but no release
When a device receives a bundle via a bundle override, there is a relevant bundle, but no relevant release. This requires careful consideration during [device integration](#device-integration).
:::

### Release resolution method

So long as no bundle override is applicable, and the device belongs to a cohort, release resolution will be executed against the device's cohort's [release channel](release-channels). Release resolution is split into two approaches: PRN resolution and version resolution. These approaches differ in how they identify the device's first candidate release, but they are identical in the [resolution algorithm](#resolution-algorithm) they apply thereafter.

PRN resolution uses a release PRN to indicate a device's current release exactly, and the identified release's next release is the first candidate release.

Version resolution uses a release version to dynamically enter a release channel based on [SemVer](https://semver.org/) version requirements. If the release channel contains releases with a `version` and `version_requirement` specified, where the header supplied version satisfies the version requirements, then of those releases the one with the lowest version is considered the first candidate release.

:::tip bundle and release
When a device receives a bundle via a release, there is both a relevant release and a relevant bundle. This requires careful consideration during [device integration](#device-integration).
:::

## Device integration

### Integration types

Devices can be integrated with Peridio either indirectly via cloud delegated updates, or directly via device direct updates.

#### Cloud delegated updates

Cloud delegated updates describe a scenario where your devices do not talk directly to Peridio, but rather your backend interacts with Peridio on behalf of devices. The Admin API [get-device-udpate](/admin-api#devices/operation/devices-get-update) route is used to check for updates on behalf of devices and report into Peridio the current state of what devices are running through the lens of a release PRN, a bundle PRN, and a release version.

#### Device direct updates

Device direct updates describe a scenario where your devices talk directly to Peridio. The Device HTTP API [get-update](/device-api#devices/operation/get-update) route and [global headers](/device-api#section/Global-Headers) are used to check for updates on behalf of devices and report into Peridio the current state of what devices are running through the lens of a release PRN, a bundle PRN, and a release version.

### Reporting device update state to Peridio

Regardless of whether you use cloud delegated updates or device direct updates, a device's update state must be reported to Peridio. That is, as applicable, the release PRN, bundle PRN, and release version that corresponds to the device's current update state. The Admin API will use body params to facilitate this whereas the Device HTTP API will use headers. In either case, it is critical to understand that informing Peridio of this data is treated as an atomic action. You must supply all of these values that are relevant at once.

:::info atomic updates
When supplying multiple headers at once, or multiple body params at once, the values must be informed by the same singular instance of having received a bundle.
:::

#### Update state rules

Bundle received via a [release](releases):

  - Release PRN must be supplied.
  - Bundle PRN must be supplied.
  - Release version must be supplied.

Bundle received via a [bundle override](bundle-overrides):

  - Release PRN must not be supplied.
  - Bundle PRN must be supplied.
  - Release version must not be supplied.

:::caution releases + bundle overrides
If a device installed a bundle from a release and subsequently installed a bundle from a bundle override: it is critical that the aforementioned update state rules are respected, in this instance: a `peridio-bundle-prn` must be exclusively supplied.
:::

#### Resolution fallbacks

When supplying multiple update state values, bundle resolution processes them in the order noted below. If a supplied value is malformed, or fails to identify a release or bundle in the device's current cohort, the next highest precedence supplied header will be attempted.

  1. Release PRN.
  2. Bundle PRN.
  3. Release version.

**Example**

Supplied:

  - A malformed release PRN.
  - A well-formed bundle PRN that fails to identify a release in the device's current cohort.
  - A well-formed release version that identifies a release in the device's current cohort.

Therefore:

  1. First, the release PRN is considered, but is discarded immediately due to being malformed.
  2. Second, the bundle PRN is considered, it is well formed, but is discarded still because it fails to identify a bundle served by a release in the device's current cohort.
  3. Finally, the release version is considered, it is well formed, and successfully identifies a release in the device's current cohort.

## Resolution algorithm

Below is a diagram that exhaustively specifies the entire bundle resolution algorithm.

<img src="/img/release-resolution.png" width="auto" />
