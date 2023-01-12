# Binaries

A binary is an actual piece of data you wish to distribute to devices.

## Content Versus Record

When referring to binaries there are two distinct concepts: a binary's content and a binary's
record.

A binary's record is the meta information Peridio stores regarding a binary, e.g., its
description, what artifact version it is associated with, its hash, etc. A binary's content is the
literal data, e.g., a firmware image, a machine learning model, etc.

This distinction is important because a binary's content and record are stored independently from
each other for a variety of reasons including the efficient distribution of content to devices and
the efficient queryability of records. It is especially relevant to
[purged binaries](#purged-binaries).

## Targets and Compatibility

Binaries indicate their compatibility via their `target` field. The value of this field is
expected to be either:

1. A target triplet like `arm-linux-androidabi`.
    - The binary in this case is said to be target-specific.
2. The reserved value `portable`.
    - The binary in this case is said to be portable.

Target-specific binaries are compatible with a device if their `target` field matches the device's
product's `target` field.

Portable binaries are universally compatible with all devices.

Note in the case of [binary resolution](/reference/cohorts.md#bianry-resolution), if both a
compatible target-specific binary and a portable binary exist for an artifact version, the
target-specific binary will be preferred.

## Purged Binaries

Purging a binary deletes its content from Peridio while leaving its record intact.

:::danger
This is a one-way, disruptive, and destructive action.
:::

- Purged binaries' content cannot be recovered from Peridio.
- Purged binaries are not valid candidates for
  [binary resolution](/reference/cohorts.md#bianry-resolution). This means purging a binary may
  cause binary resolution to fail where it previously succeeded.  See
  [impact on releases](#impact-on-releases).
- The binary will be updated such that `purged: true, bytes_uploaded: 0`.

### Impact on Releases

A release is affected by a purged binary if the release is associated with a bundle
that is associated with an artifact version that is associated with a purged binary. In this case,
it is said that the release "references a purged binary."

For affected releases, the liklihood of a device checking for an update and encountering an error
because an applicable binary cannot be resolved is dependent on how the affected release has
`must_pass_through` configured, whether their are additional releases configured downstream in the
affected release's cohort, and whether the affected artifact version has a (non-purged) portable
binary associated with it. See [portable binaries](#portable-binaries).

:::info

It is recommended to expeditiously archive affected releases.

:::
