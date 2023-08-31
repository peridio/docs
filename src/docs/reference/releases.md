# Releases

Releases allow you to distribute [bundles](/reference/bundles.md) to [cohorts](/reference/cohorts.md).

Each release belongs to an individual cohort.

## Latest Release

When creating a release you may create it as the "latest release" or not. The latest release refers to the release within the cohort whose `next_release_prn` is `null`. It does not refer to the most recently inserted release. Only one release within a cohort at any given time may be the latest release.

The latest release of a cohort is special in that it is the only release within a cohort that is allowed to limit its availability via scheduling and phasing.

:::info

You cannot create a new latest release while the current latest release is scheduled or phased.

:::

## Availability

The availability of a release, the ability for devices to resolve it when checking for updates, is dictated by three concepts: graph traversal, scheduling, and phasing.

### Types

#### Graph Traversal

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

#### Scheduling

The latest release in a cohort can be scheduled to become available immediately, or a date in the future can be choosen. This allows you to stage a release ahead of time and have it become available automatically at a specific time.

:::tip

When a release has been created, but its schedule date has not occurred yet, the release is said to be "scheduled". Keep in mind you cannot create a new latest release if the current latest release is scheduled.

:::

A release ceases to be scheduled once its schedule date has passed.

#### Phasing

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

## Update Resolution

When a device performs the [get device update](/admin-api#tag/devices/operations/get-device-update) request, Peridio performs update resolution, which comprises release resolution and binary resolution, to determine if there is a release to update to, and to create a set of presigned URLs to facilitate the device acquiring compatible binaries.

### Release resolution

Release resolution is the process of determing if, given the current release of a device, there is another release, referred to as the target release, the device can update to.

This resolution is performed as follows:

1. The device reports its current release to Peridio.
2. Peridio checks if that release belongs to the cohort that the device belongs to.
    1. If yes, go to 3.
    2. If no, release resolution fails.
3. Peridio checks if there is a next release.
    1. If yes, go to 4.
    2. If no, release resolution succeeds with no target release. The device is up to date.
4. Peridio checks if the release is required.
    1. If yes, release resolution succeeds with a target release.
    2. If no, go to 5.
5. Peridio checks if there is a next release.
    1. If yes, go to 4.
    2. If no, release resolution succeeds with a target release.

Peridio will recurse between 5.1 and 4 to skip as many not-required releases as possible.

### Binary resolution

In the case that release resolution succeeds with a target release, binary resolution is then performed. Binary resolution is the process of looking at the target release's [bundle](/reference/bundles.md), and then, for each of the bundle's [artifact versions](/reference/artifact-versions.md), resolving a [compatible binary](/reference/binaries.md#compatibility). If no compatible binary is found for any one or more of the artifact versions, binary resolution fails and the device will not be able to proceed.
