# Releases

Releases allow you to distribute [bundles](/platform/reference/bundles.md) to [cohorts](/platform/reference/cohorts.md). Each release is associated with exactly one cohort. Within a cohort, releases form a [graph](/platform/reference/cohorts.md#release-graph).

## Latest release

The latest release in a graph is the one whose `next_release_prn` is `null`. A graph only ever has at most one latest release at any given time. The latest release of a graph is special in that it is the only release within a graph that is allowed to limit its [rollout](#rollout) via scheduling and phasing.

:::info

You cannot create a new latest release while the current latest release is [scheduled](#scheduling) or [phased](#phasing).

:::

## Rollout

A graph's latest release can schedule or limit its availability in pursuit of more precisely or gradually rolling out a bundle.

### Scheduling

The latest release in a graph can be scheduled to become available immediately, or a date in the future can be choosen. This allows you to stage a release ahead of time and have it become available automatically at a specific time.

A release ceases to be scheduled once its schedule date has passed.

### Phasing

The latest release in a graph can be made available gradually by configuring its phase mode. This can be used to limit how many devices are allowed to take the release either by tags or numerically.

A release ceases to be phased once its phase mode is numeric and its phase value is 100%.

#### Tags

Only devices within the cohort who have any of the specified phase tags are able to update to the latest release.

#### Numeric

Limit the amount of devices that are able to update to the latest release by configuring the phase value:

- When a decimal in `[0.0, 1.0]`, it is treated as a percent, e.g., to allow 20% of the cohort to update, you would specifiy 0.2.
- When an integer `>= 2`, it is treated as an absolute device count, e.g., to allow 40 of the cohort's devices to update, you would specifiy 40.

## Release resolution

When a device executes a Device API [get-update](/device-api#devices/operation/get-update) request, Peridio performs release resolution. Release resolution is the process of determing if there is another release, referred to as the target release, the device can update to. To make this determination, Peridio must have some idea of determining where your device currently fits into it's cohort's release graph, since where a device currently is will determine where it needs to go.

### Graph traversal

In order for a release in the graph to be relevant to you, it must be between your current release, and the latest release.

```
R0-------->R1---\
                 \
R2---\            |--->R5
      |--->R4----/
R3---/
```

For example, if your current release was R0, then R1 is available with respect to graph traversal, but R2 is not.

### Resolution

Peridio must determine the device's current position in its cohort's release graph. Peridio will first attempt to determine this via [static resolution](#static-resolution), but can optionally fallback to [dynamic resolution](#dynamic-resolution).

#### Static resolution

Static resolution uses the `peridio-release-prn` header to supply its current release's PRN. If it successfully identifies a release in the device's cohort, then the current release is known. If the current release has a next release, then resolution continues with its next release. If not, then resolution falls back to dynamic resolution if possible. If not, then resolution completes with no target release.

#### Dynamic resolution

Dynamic resolution uses the `peridio-release-version` header to supply a [SemVer](https://semver.org/) version that is representative of the device's current release so that release version requirements can be leveraged to dynamically enter the release graph. If the cohort contains releases with a `version` and `version_requirement` specified, where the header supplied version satisfies the version requirements, then of those releases the one with the lowest version is considered the next release and resolution continues.

Another variation of dynamic resolution uses the `peridio-bundle-prn` header, which supplies a bundle's PRN. This is relevant when using [bundle overrides](#bundle-overrides). When a device takes a bundle override, there will be no release or version to report back to Peridio. If this header successfully identifies a bundle, we attempt to identify the most appropriate corresponding release, then enter the release graph. When multiple releases in the device's cohort use the same bundle, we will try to select the release with the lowest [SemVer](https://semver.org/) version. As release versions are not required, release options for a bundle may or may not have versions. In the case that some matching releases have versions, and some do not, releases without a version will be discarded and version ranking will proceed. If none of the matching releases have a version, the earliest-created release will be selected.

:::info prefer static resolution

Static resolution should be used whenever possible as it is easier to reason about and more efficent to perform than dynamic resolution. However, when required, dynamic resolution can be used in situations where your device does not or can not know the PRN of its current release, yet it still wishes to deterministically update according to its cohort's release graph. For example, this can be useful when moving devices across cohorts.

:::

#### Bundle overrides

An active bundle override may exist for a device. In this case, all resolution is skipped, and the configured bundle override's bundle will be returned. A bundle override is applicable when the time of resolution falls within the override's configured start and end times. In cases where multiple bundle overrides may apply, the most-recently starting override will be selected.


#### Skip unrequired releases

If static or dynamic resolution identify a next release we enter into a cycle where we attempt to skip as many releases in the graph as possible, only stopping if we encounter a required release or the latest release. If we encounter a required release, then resolution completes with it as the target release. If we encounter the latest release, then the release we just walked that points to it is considered the candidate release and we [evaluate the rollout](#rollout) of the latest release to determine if we can update to it or not right now. If we can, then resolution completes with the latest release as the target release. If not, then resolutions completes with the candidate release as the target release.

### Activity diagram

Below is a diagram that specifies how release resolution works in depth.

:::tip the bigger picture

To best expand the image, right click it and "Open Image in New Tab". From there you can more easily pan and zoom.

:::

<img src="/img/release-resolution.png" width="auto" />
