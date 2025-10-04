---
title: 'Releases'
description: 'Releases in Peridio Core distribute bundles to device cohorts with versioning, ordering, and availability controls for systematic fleet updates.'
---

Releases allow you to distribute [bundles](/peridio-core/reference/bundle-management/bundles.md) to [cohorts](/peridio-core/reference/device-management/cohorts.md) with support for versioning, ordering, required and disabled releases, and availability.

Each release is associated with exactly one cohort, but each cohort can have zero to many releases. Within a cohort, releases form a [release channel](/peridio-core/reference/bundle-management/release-channels). Each release is associated with exactly one bundle, but each bundle can be associated with zero to many releases and [bundle overrides](bundle-overrides).

## Versioning

Releases support optionally specifying a SemVer version and a SemVer version requirement. These fields are useful for your own informational purposes, but also impact dynamic [ordering](#ordering) during [bundle resolution](/peridio-core/reference/bundle-management/bundle-distribution#bundle-resolution) via [release version resolution](/peridio-core/reference/bundle-management/bundle-distribution#release-resolution-method).

:::tip release version resolution
If you **ever** wish to rely on dynamic ordering, it is strongly recommended to **always** specify version and version requirements on releases. Only releases that specify both fields are considered when performing [bundle resolution](/peridio-core/reference/bundle-management/bundle-distribution#bundle-resolution) via [release version resolution](/peridio-core/reference/bundle-management/bundle-distribution#release-resolution-method).
:::

## Ordering

Releases support static and dynamic ordering:

- **static** - Releases have a next release field that specifies an explicit path to be walked through a [release channel](/peridio-core/reference/bundle-management/release-channels) during [bundle resolution](/peridio-core/reference/bundle-management/bundle-distribution#bundle-resolution) via [release PRN resolution](/peridio-core/reference/bundle-management/bundle-distribution#release-resolution-method).
- **dynamic** - Releases have version and version requirement fields that specify an implicit path to be walked through a [release channel](/peridio-core/reference/bundle-management/release-channels) during [bundle resolution](/peridio-core/reference/bundle-management/bundle-distribution#bundle-resolution) via [release version resolution](/peridio-core/reference/bundle-management/bundle-distribution#release-resolution-method).

For a detailed specification of how the [release channel](/peridio-core/reference/bundle-management/release-channels) is walked, see [bundle resolution](/peridio-core/reference/bundle-management/bundle-distribution#bundle-resolution).

## Required and disabled

Releases may be required or disabled to impact how they are treated during [bundle resolution](/peridio-core/reference/bundle-management/bundle-distribution#bundle-resolution):

- **required** - A required release cannot be skipped.
- **disabled** - A disabled release cannot have its bundle selected during [bundle resolution](/peridio-core/reference/bundle-management/bundle-distribution#bundle-resolution), but can be skipped so long as it is not required.

## Availability

The latest release in a release channel can optionally constrain its availability via schedling and phasing in pursuit of more precisely and gradually rolling out a bundle.

With respect to availability evaluations:

- A release that is scheduled for the future is considered scheduled.
  - A releases ceases to be scheduled once its schedule date has passed.
- A release that whose phase mode is not numeric or whose phase value is not 100% is considered phased.
  - A release ceases to be phased once its phase mode is numeric and its phase value is 100%.
- A scheduled or phased release is considered to have its availability constrained.

:::tip availability + release channels
For details about how release availability can impact your ability to create new latest releases, see the [only-sinks-constrain-availability](/peridio-core/reference/bundle-management/release-channels#only-sinks-constrain-availability) release channel rule.
:::

### Scheduling

The latest release in a graph can be scheduled immediately or at a future date.

### Phasing

The latest release in a graph can be made available gradually by configuring its phase mode, this can be used to limit how many devices are allowed to take the release.

There are two supported phase modes that are mutually exclusive but can be updated between:

1. tags
2. numeric

#### Tags

Only devices within the cohort who have any of the specified phase tags are able to update to the latest release.

#### Numeric

Limit the amount of devices that are able to update to the latest release by configuring the phase value:

- When a decimal in `[0.0, 1.0]`, it is treated as a percent, e.g., to allow 20% of the cohort to update, you would specifiy 0.2.
- When an integer `>= 2`, it is treated as an absolute device count, e.g., to allow 40 of the cohort's devices to update, you would specifiy 40.

## Distribution

Releases, like [bundle overrides](bundle-overrides), are a method of bundle resolution detailed in the [bundle distribution](/peridio-core/reference/bundle-management/bundle-distribution) reference.
