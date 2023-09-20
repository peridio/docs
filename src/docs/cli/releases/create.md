---
title: create
---

# peridio releases create

Create a release.

## Flags

`-h`, `--help`

Prints help information.

## Options

`--description <description>`

The artifact description.

`--next_release_prn <next_release_prn>`

If omitted, the release will be created as latest within the cohort. If there is already at least one release in the cohort, then the latest release in that cohort would have its `next_release_prn` updated to this created release.

If supplied, the release will be created prior to the release identified by `next_release_prn`. If you wish to insert this release between two other releases, you may additionally supply `previous_release_prn`.

`--previous_release_prn <previous_release_prn>`

If omitted, `next_release_prn` will dictate where to create this release within the cohort's release graph.

If supplied, `next_release_prn` is required to be supplied as well. Together, these fields allow the caller to insert a release between two other releases.

### Required

`--bundle_prn <bundle_prn>`

The Peridio Resource Name (PRN) of the bundle.

`--cohort-prn <cohort-prn>`

The Peridio Resource Name (PRN) of the cohort.

`--name <name>`

The name of the release.

`--organization-prn <organization-prn>`

The Peridio Resource Name (PRN) of the organization.

`--phase_value <phase_value>`

The phase value controls the distribution of the update to your fleet.

Decimals in `[0.0, 1.0]` are treated as percents, e.g., to allow 20% of the cohort to update, you would specifiy `0.2`.

Integers >= 2 are treated as absolute device counts, e.g., to allow 40 of the cohort's devices to update, you would specifiy `40`.

**NOTE:** `1` is a special value in that it represents `100%` and  once a release is updated to this value, the phase value can never be changed again.

A release with a `phase_value` not equal to `1` is considered "phased".

**NOTE:** There can only ever be a single release that is phased at a time within a cohort. Because of this, if there is already a phased release, it must be "completed" by setting the phase to `1`.

`--required`

If this option is included, this release must be passed through if encountered by a device.

Otherwise, this release will be skipped over when possible (if there are releases configured after it).

`--schedule_date <schedule_date>`

Before this date-time, the release will not be resolvable when checking for updates. You may use this to schedule a future release.
