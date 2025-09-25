---
title: 'Cohorts'
description: 'Cohorts in Peridio Core provide logical groupings of devices within products for group metrics and releases targeting sub-sections of your fleet.'
---

Cohorts are logical groupings of devices within a [product](/peridio-core/reference/device-management/products.md) that enable group metrics and [releases](/peridio-core//reference/bundle-management/releases.md) for sub-sections of your fleet.

## Logical groupings

You may structure your cohorts as you wish, but the following are common approaches:

- **Environments:** Organize devices into development, staging, and production cohorts.
- **Release Channels:** Organize devices into nightly, canary, and stable cohorts.
- **Operational Segments:** Organize devices into geographic, tenant-related, and other domain-specific cohorts.

:::tip you can always change
Some use cases are satisfied with a single cohort, and some require an elaborate hierarchy. You can always adjust your cohorts and move devices between them server-side later without requiring device-side changes.
:::

:::tip consider cadence, content, and metrics
We recommend considering if you would want to target different devices with different release cadences or bundles, or if you want to collect and analyze metrics for distinct groups. Those groups may be candidates to specify cohorts for.
:::

## Metrics

One of the key benefits of using cohorts is the ability to view and analyze metrics segmented by logical groups of devices. By comparing data across cohorts, you can gain valuable insights into how different subsets of your fleet are behaving and performing. Cohort-based metrics enable anomaly detection, release monitoring, and trend analysis.

## Release channel

Cohorts are associated with zero to one [release channels](/peridio-core/reference/bundle-management/release-channels). Release channels are associated with zero to many cohorts. [Releases](/peridio-core/reference/bundle-management/releases) are associated with exactly one release channel.

:::tip release resolution requires cohorts
Only devices within a cohort are able to perform [bundle resolution](/peridio-core/reference/bundle-management/bundle-distribution#bundle-resolution) via [release resolution](/peridio-core/reference/bundle-management/bundle-distribution#release-resolution-method).
:::
