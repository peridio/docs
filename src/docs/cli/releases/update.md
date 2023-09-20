---
title: update
---

# peridio releases update

Update a release.

## Flags

`-h`, `--help`

Prints help information.

### Options

`--description <description>`

The release description.

`--name <name>`

The name of the release.

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

### Required

`--prn <prn>`

The Peridio Resource Name (PRN) of the release.
