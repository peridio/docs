# Binaries

A binary is an actual piece of data you wish to distribute to devices.

## Content Versus Record

When referring to binaries there are two distinct concepts: a binary's content and a binary's record.

A binary's record is the meta information Peridio stores regarding a binary, e.g., its description, what artifact version it is associated with, its hash, etc. A binary's content is the literal data, e.g., a firmware image, a machine learning model, etc.

This distinction is important because a binary's content and record are stored independently from each other for a variety of reasons including the efficient distribution of content to devices and the efficient queryability of records. It is especially relevant to [destroyed binaries](#destroyed-binaries).

## Targets and Compatibility

Binaries indicate their compatibility via their `target` field. The value of this field is expected to be either:

1. A target triplet like `arm-linux-androidabi`.
    - The binary in this case is said to be target-specific.
2. The reserved value `portable`.
    - The binary in this case is said to be portable.

Target-specific binaries are compatible with a device if their `target` field matches the device's product's `target` field.

Portable binaries are universally compatible with all devices.

Note in the case of [binary resolution](/reference/cohorts.md#bianry-resolution), if both a compatible target-specific binary and a portable binary exist for an artifact version, the target-specific binary will be preferred.

## Destroyed Binaries

Binaries with a state of signed can be destroyed. Destroying a binary deletes its content from Peridio but leaves its record mostly intact, see [content versus record](#content-versus-record).

:::danger
Destroying a binary is an irreversible and destructive action.

- The binary's record is updated such that `destroyed: true, bytes_uploaded: 0`.
- The binary's content is irrecoverably deleted.
- Devices' ability to update may be interupted, see [impact on releases](#impact-on-releases).
:::

### Impact on Releases

A release is affected by a destroyed binary if the release is associated with a bundle that is associated with an artifact version that is associated with a destroyed binary.

:::caution
During [update resolution](/reference/cohorts.md#update-resolution), release resolution completes before binary resolution begins, but destroyed binaries are not valid candidates for binary resolution. This means that if release resolution resolves a release that then fails binary resolution, the requesting device will fail to resolve an update.
:::


For impacted releases, whether it causes a device to fail to resolve an update or not is dictated by:

1. The impacted release's `required` and `next_release_prn` fields.
2. Whether the impacted artifact version has a resolveable portable binary associated with it or not. See [targets and compatibility](#targets-and-compatibility).

:::tip
To avoid disrupting update resolution, it is recommended to archive any release that would be impacted before destroying the binary. You can see a list of releases associated with a binary most conveniently by viewing the binary in the Peridio Web Console.
:::
