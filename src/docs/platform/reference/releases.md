# Releases

Releases allow you to distribute [bundles](/platform/reference/bundles.md) to [cohorts](/platform/reference/cohorts.md).

Each release belongs to an individual cohort.

## Latest Release

When creating a release you may create it as the "latest release" or not. The latest release refers to the release within the cohort whose `next_release_prn` is `null`. It does not refer to the most recently inserted release. Only one release within a cohort at any given time may be the latest release.

The latest release of a cohort is special in that it is the only release within a cohort that is allowed to limit its availability via scheduling and phasing.

:::info

You cannot create a new latest release while the current latest release is scheduled or phased.

:::

## Availability

The availability of a release, the ability for devices to resolve it when checking for updates, is dictated by three concepts: graph traversal, scheduling, and phasing.

### Graph Traversal

When creating releases within a cohort, they will form a release graph.

For example.

```
R4-------->R5---\
                 \
R1---\            |--->R6
      |--->R2----/
R3---/
```

In order for a release on the graph to be relevant to you, it must be between your current release, and the latest release.

For example, if your current release was R4, then R5 is available with respect to graph traversal, but R2 is not. Keep in mind this is an instantaneous evaluation at it would be possible for example for the device to be factory reset to R1, at which point R2 would be traversible.

### Scheduling

The latest release in a cohort can be scheduled to become available immediately, or a date in the future can be choosen. This allows you to stage a release ahead of time and have it become available automatically at a specific time.

:::tip

When a release has been created, but its schedule date has not occurred yet, the release is said to be "scheduled". Keep in mind you cannot create a new latest release if the current latest release is scheduled.

:::

A release ceases to be scheduled once its schedule date has passed.

### Phasing

The latest release in a cohort can be made available gradually by configuring its phase value. This can be used to limit how many devices are allowed to take the release to either a percent of the cohort, or an absolute threshold of devices. Once the limit is met, the release is unavailable until the phase value is increased.

:::tip

When a release's phase value is not 100%, the release is said to be "phased". Keep in mind you cannot create a new latest release if the current latest release is phased.

:::

A release ceases to be phased once its phase value is 100%.

## Required Release

A release can be configured with its `required` field set to `true` or `false`, and this field can be changed at any time.

When `true`, devices that encounter this release are required to pass through it.

When `false`, device can potentially skip the release if there is a newer subsequent release available.

For example:

```
R4-------->R5---\
                 \
R1---\            |--->R6
      |--->R2----/
R3---/
```

Lets say that `R2` above is the only required release. If a device was on `R1`, it would have to update to `R2` first, even though `R6` is already available. Whereas if a device was on `R4`, it could update directly to `R6`, because `R5` is not required.

## Release Resolution

When a device executes a Device API [get-update](/device-api#devices/operation/get-update) request, Peridio performs release resolution. Release resolution is the process of determing if there is another release, referred to as the target release, the device can update to. To make this determination, Peridio must have some idea of determining where your device currently fits into it's cohort's release graph, since where a device currently is will determine where it needs to go. A cohort's release graph forms an [anti-arborescence](https://en.wikipedia.org/wiki/Arborescence_(graph_theory)). In other words, releases may point to exactly one next release, a release may be pointed to by zero to many releases, all releases eventually converge to a single [latest release](#latest-release).

For example:

```
R4-------->R5---\
                 \
R1---\            |--->R6
      |--->R2----/
R3---/
```

### Resolution

Peridio will first attempt to determine your devices current release via [static resolution](#static-resolution) if possible, and [dynamic](#dynamic-resolution) resolution if that fails.

:::info prefer static resolution
Whenever possible it is recommended to use static resolution over dynamic resolution as the former is easier to reason about and more efficent to perform. However, when required, dynamic resolution can be used in situations where your device does not or can not know the PRN of its current release, yet it still wishes to deterministically update according to its cohort's release graph.
:::

### Static Resolution

Static resolution uses the `peridio-release-prn` header to define a prn that is representative of the device's current release. If it successfully identifies a release in the device's cohort, release resolution will consider it the device's current release and continue with resolution:

1. checks if there is a next release.
    1. If yes, go to #2.
    2. If no, release resolution completes with no target release with a reason of `no_update`.
2. checks if the release is required.
    1. If yes, release resolution completes with a target release with a reason of `update`.
    2. If no, go to #3.
3. checks if there is a next release.
    1. If yes, go to #2.
    2. If no, release resolution completes with a target release with a reason of `update`.

Peridio will recurse between #3.1 and #2 to skip as many not-required releases as possible.

### Dynamic Resolution

Dynamic resolution uses the `peridio-release-version` header to define a semantic version that is representative of the device's current release.

Peridio then finds all releases in the device's cohort that have specified both a `version` and `version_requirement`. The found releases are filtered for those whose `version_requirement` is satisfied by the header-supplied version. From the filtered results, the release with the lowest semantic `version` is selected as the "dynamic entry point". Peridio will then consider your devices current release to be an imaginary release whose next release is the dynamic entry point and continue with resolution:

1. checks if there is a next release.
    1. There always will be because it will be the dynamic entry point, go to #2.
2. checks if the release is required.
    1. If yes, release resolution completes with a target release with a reason of `update`.
    2. If no, go to #3.
3. checks if there is a next release.
    1. If yes, go to #2.
    2. If no, release resolution completes with a target release with a reason of `update`.
