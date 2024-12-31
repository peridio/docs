# Cohorts

Cohorts are logical groupings of devices within a [product](/platform/reference/products.md) that enable group metrics and [releases](/platform/reference/releases.md) for sub-sections of your fleet.

## Groups

The first step of using cohorts is creating them. We recommend considering if you would want to target different groups with different release cadences or release content, or if you want to collect and analyze metrics for distinct groups. Those groups may be candidates to specify cohorts for.

The following are common organizational themes:

- **Environments:** Organize devices into development, staging, and production cohorts.
- **Release Channels:** Organize devices into nightly, canary, and stable cohorts.
- **Operational Segments:** Organize devices into geographic, tenant-related, and other domain-specific cohorts.

:::tip simple to complex
Some use cases are satisfied with a single cohort, and some require an elaborate hierarchy. You can always adjust your cohorts and move devices between them.
:::

## Metrics

One of the key benefits of using device cohorts is the ability to view and analyze metrics in the context of specific device groups. By comparing data across cohorts, you can gain valuable insights into how different subsets of your fleet are behaving and performing. Cohort-based metrics enable anomaly detection, release monitoring, and trend analysis.

## Releases

Only devices within a cohort are compatible with using [releases](/platform/reference/releases.md) for updates.

### Release graph

Releases are created within cohorts to orchestrate the delivery of [bundles](/platform/reference/bundles.md) to devices. Within a cohort, releases form an [anti-arborescence](https://en.wikipedia.org/wiki/Arborescence_(graph_theory)) graph. In other words, releases may point to exactly one next release, a release may be pointed to by zero to many releases, and all releases eventually converge to a single [latest release](releases#latest-release).

For example:

```
R4-------->R5---\
                 \
R1---\            |--->R6
      |--->R2----/
R3---/
```

`R6` above would be the latest release that all paths converge towards.

While it is possible to end up with a release graph that looks like the above, it is recommended to keep as linear of a release graph as reasonably possible because it is easier to reason about and maintain.

For example:

```
R1--->R2--->R3--->R4--->R5--->R6
```
