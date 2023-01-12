# Update resolution

When a device performs the
[get device update](/admin-api#tag/devices/operations/get-device-update) request, Peridio performs
release resolution and binary resolution to determine if there is a release to update to, and to
create a set of presigned URLs to facilitate the device acquiring compatible binaries.

## Release resolution

Release resolution is the process of determing if, given the current release of a device, there is
another release, referred to as the target release, the device can update to.

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

## Binary resolution

In the case that release resolution succeeds with a target release, binary resolution is then
performed. Binary resolution is the process of looking at the target release's
[bundle](/reference/bundles.md), and then, for each of the bundle's
[artifact versions](/reference/artifact-versions.md), resolving a
[compatible binary](/reference/binaries.md#compatibility). If no compatible binary is found for
any one or more of the artifact versions, binary resolution fails and the device will not be able
to proceed.
