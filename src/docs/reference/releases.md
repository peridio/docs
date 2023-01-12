# Releases

Releases allow you to distribute [bundles](/reference/bundles.md) to
[cohorts](/reference/cohorts.md).

Each release belongs to an individual cohort.

## Cohort Availability

The latest release in a cohort can be made available gradually by configuring its
`cohort_availability`. This field specifies a percentage of the cohorts total device count that
can receieve the release. Once the threshold is met, the release is unavailable until the
percentage is increased.

## Schedule Availability

The latest release in a cohort can be scheduled to become available immediately, or a date in the
future can be choosen. This allows you to stage a release ahead of time and have it become
available automatically at a specific time.

## Required Releases

A release can be configured with its `required` field set to `true` or `false`. And this field can
be changed at any time. When `true`, devices that encounter this release are required to pass
through it. When `false`, device can potentially skip the release if there is a newer subsequent
release available.

For example:

```
R4-------->R5---\
                 \
R1---\            |--->R6
      |--->R2----/
R3---/
```

Lets say that `R2` above is the only required release. If a device was on `R1`, it would have to
update to `R2` first, even though `R6` is already available. Whereas if a device was on `R4`, it
could update directly to `R6`, because `R5` is not required.
