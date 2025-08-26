# Cohorts

Cohorts are logical groupings of devices within a [product](/dev-center/peridio-core/device-management/products) that enable group metrics and [releases](/platform/reference/releases) for sub-sections of your fleet.

## Purpose

Cohorts provide a powerful way to segment your device fleet for:

- Staged deployments and rollouts
- A/B testing and experimentation
- Geographic or customer-specific configurations
- Risk mitigation through canary releases
- Granular metrics and monitoring

## Logical Groupings

You may structure your cohorts as you wish, but the following are common approaches:

### Environments

Organize devices into development, staging, and production cohorts to mirror your software development lifecycle.

### Release Channels

Organize devices into nightly, canary, and stable cohorts to control update cadence and risk.

### Operational Segments

Organize devices into geographic, tenant-related, and other domain-specific cohorts based on business needs.

:::tip You can always change
Some use cases are satisfied with a single cohort, and some require an elaborate hierarchy. You can always adjust your cohorts and move devices between them server-side later without requiring device-side changes.
:::

:::tip Consider cadence, content, and metrics
We recommend considering if you would want to target different devices with different release cadences or bundles, or if you want to collect and analyze metrics for distinct groups. Those groups may be candidates to specify cohorts for.
:::

## Metrics

One of the key benefits of using cohorts is the ability to view and analyze metrics segmented by logical groups of devices. By comparing data across cohorts, you can gain valuable insights into how different subsets of your fleet are behaving and performing.

### Cohort-Based Analytics

- Device health and connectivity rates
- Update success/failure ratios
- Performance metrics comparison
- Anomaly detection across groups
- Release adoption tracking

## Release Channels

Cohorts are associated with zero to one [release channel](/platform/reference/release-channels). Release channels are associated with zero to many cohorts. [Releases](/platform/reference/releases) are associated with exactly one release channel.

:::tip Release resolution requires cohorts
Only devices within a cohort are able to perform bundle resolution via release resolution. Devices not in a cohort cannot receive releases through channels.
:::

## Common Patterns

### Progressive Rollout

```
1. Canary Cohort (1% of fleet)
   ↓ Monitor for 24 hours
2. Beta Cohort (10% of fleet)
   ↓ Monitor for 3 days
3. Production Cohort (remaining fleet)
```

### Geographic Distribution

```
- cohort-us-east
- cohort-us-west
- cohort-eu-central
- cohort-asia-pacific
```

### Customer Segmentation

```
- cohort-enterprise-tier1
- cohort-enterprise-tier2
- cohort-standard
- cohort-trial
```

## Managing Cohorts

### Creation

Cohorts are created within a product and require:

- Unique name within the product
- Optional description
- Optional release channel association

### Device Assignment

Devices can be assigned to cohorts:

- During JITP configuration
- Via bulk operations
- Through individual device updates
- Programmatically via API

### Best Practices

1. **Start simple** - Begin with a basic structure and evolve as needed
2. **Document your strategy** - Maintain clear documentation of cohort purposes
3. **Monitor transitions** - Track devices as they move between cohorts
4. **Plan for growth** - Design cohort structures that scale with your fleet
5. **Use meaningful names** - Choose descriptive names that indicate purpose

## Related Topics

- [Products](/dev-center/peridio-core/device-management/products)
- [Devices](/dev-center/peridio-core/device-management/devices)
- [Release Channels](/platform/reference/release-channels)
- [Releases](/platform/reference/releases)
