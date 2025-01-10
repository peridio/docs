# Bundle distribution

When a device executes a Device API [get-update](/device-api#devices/operation/get-update) request, Peridio performs bundle resolution. Bundle resolution is the process of determing if there is another bundle, referred to as the target bundle, the device can update to. To make this determination, Peridio must know what the device is currently running.

## Bundle resolution

A target bundle is resolved via either bundle overrides or release resolution. The following subsections give a high-level overview of the two resolution methods. For an exhaustive specification of the entire process, refer to the [resolution algorithm](#resolution-algorithm).

### Bundle override method

[Bundle overrides](/platform/reference/bundle-overrides) are higher priority than release resolution. If there is an applicable bundle override, release resolution will not be considered at all. If Peridio Cloud considers a device to be on a different bundle than the applicable override, then when it checks for an update it will be served the override's bundle. If Peridio Cloud considers a device to be on the bundle of the applicable bundle override, then the device will be served no update ignoring any potential releases should they exist. This state will continue until the bundle override is updated, expired, or deleted.

:::tip bundle but no release
When a device receives a bundle via a bundle override, there is a relevant bundle, but no relevant release.

This requires careful consideration during [device integration](#device-integration).
:::

### Release resolution method

So long as no bundle override is applicable, and the device belongs to a cohort, release resolution will be executed against the device's cohort's [release channel](release-channels). Release resolution is split into two approaches: PRN resolution and version resolution. These approaches differ in how they identify the device's first candidate release, but they are identical in the resolution algorithm they apply thereafter.

PRN resolution uses the `peridio-release-prn` header to indicate a device's current release exactly, and its next release is the first candidate release.

Version resolution uses the `peridio-release-version` header to indicate a [SemVer](https://semver.org/) version. If the channel contains releases with a `version` and `version_requirement` specified, where the header supplied version satisfies the version requirements, then of those releases the one with the lowest version is considered the first candidate release.

:::tip bundle and release
When a device receives a bundle via a release, there is both a relevant release and a relevant bundle.

This requires careful consideration during [device integration](#device-integration).
:::

## Device integration

Whenever a device considers itself to be running a new bundle, it SHOULD inform Peridio Cloud as it will dictate the result of future updates.

### Device HTTP API

When using the Device HTTP API, its [global headers](/device-api#section/Global-Headers) are used to inform Peridio Cloud of what the device is running. After having installed a bundle received via a release or bundle override, supply headers to subsequent requests as specified below.

:::info single source headers
When supplying multiple headers at once, the values of all headers must be informed by the same singular instance of having received a bundle. This is also why when having received a bundle via bundle override that it is never correct to subsequently supply a `peridio-release-prn`, since there is no relevant release in that case.
:::

#### Header rules

Bundle received via a [release](releases):

  - `peridio-release-prn` MUST be supplied.
  - `peridio-bundle-prn` MAY be supplied.
  - `peridio-release-version` MAY be supplied.

Bundle received via a [bundle override](bundle-overrides):

  - `peridio-release-prn` MUST NOT be supplied.
  - `peridio-bundle-prn` MUST be supplied.
  - `peridio-release-version` MAY be supplied.

:::caution releases + bundle overrides
If a device installed a bundle from a release and subsequently installed a bundle from a bundle override: it is critical that the aforementioned header rules are respected, in particular: a `peridio-release-prn` MUST NOT be supplied.
:::

#### Header fallbacks

When supplying multiple headers, Peridio prioritizes them in the order noted below. If a supplied header is malformed, or fails to identify a release or bundle in the device's current cohort, the next highest precedence supplied header will be attempted to be used.

  1. `peridio-release-prn`
  2. `peridio-bundle-prn`
  3. `peridio-release-version`

**Example 1**

Supplied:

  - `peridio-release-prn` malformed and does not identify a release in the device's current cohort
  - `peridio-bundle-prn` well formed and does identify a bundle served by a release in the device's current cohort
  - `peridio-release-version` well formed and does identify a bundle served by a release in the device's current cohort

First, the `peridio-release-prn` header is considered, but is discarded immediately due to being malformed. Second, the `peridio-bundle-prn` is considered, it is well formed, but is discarded still because it fails to identify a bundle served by a release in the device's current cohort. Finally, the `peridio-release-version` is considered, it is well formed, and successfully identifies a release in the device's current cohort.

## Resolution algorithm

Below is a diagram that exhaustively specifies the entire bundle resolution algorithm.

<img src="/img/release-resolution.png" width="auto" />
