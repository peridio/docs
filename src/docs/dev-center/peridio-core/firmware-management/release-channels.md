---
title: Release Channels
---

# Release Channels

A release channel is a graph of releases associated with zero to many cohorts that specify the possible update paths devices within associated cohorts can traverse. Release channels form the backbone of Peridio's sophisticated update orchestration capabilities.

## Overview

Release channels enable you to define complex update paths that devices follow when checking for updates. They ensure devices progress through updates in a controlled, predictable manner while providing flexibility for different deployment scenarios.

:::tip Bundle Distribution
For information about how release channels participate in resolving target bundles for devices, see the [bundle distribution](bundle-distribution) reference.
:::

## Graph Structure

A release channel forms an [anti-arborescence](<https://en.wikipedia.org/wiki/Arborescence_(graph_theory)>) graph. This mathematical structure provides important properties for update management:

### Graph Properties

- **Single Path Forward**: Each release may point to exactly one next release
- **Multiple Paths In**: A release may be pointed to by zero to many releases
- **Single Destination**: All releases eventually converge to a single release that points to no node
- **No Cycles**: The graph structure prevents infinite loops in update paths

## Node Categories

When reasoning about releases as nodes in a release channel graph, there are three categories:

### Source Nodes
Nodes that no other nodes point to. These represent entry points into the update channel.

**Characteristics:**
- Starting points for update paths
- Often represent initial versions or migration entry points
- Multiple source nodes can exist in a channel

### Intermediate Nodes
Nodes that are pointed to, and that point to other nodes. These form the bulk of most update paths.

**Characteristics:**
- Bridge between source and sink nodes
- Can be required or optional in the update path
- Enable complex update orchestration

### Sink Nodes
Nodes that are pointed to, but point to no other nodes. This is the current "latest" release.

**Characteristics:**
- Represents the most current release
- Only one sink node can exist at a time
- Special availability controls apply

:::tip Latest Release
In conversation, the sink node is often referred to as the latest release. This is the release that devices will ultimately converge toward.
:::

## Channel Rules

Release channels enforce several important rules that govern their behavior:

### Zero-to-One Sinks Rule

There can only ever be at most a single latest release at any given time. In graph terms, an anti-arborescence graph is either empty, or has at most a single sink node.

**Implications:**
- Prevents ambiguity about the target version
- Ensures predictable update behavior
- Simplifies rollout management

### Only-Sinks-Constrain-Availability Rule

The latest release of a graph is special in that it is the only release within a graph that is allowed to constrain its [availability](/dev-center/peridio-core/firmware-management/releases#availability) through scheduling or phasing.

**Implications:**
- Historical releases cannot be phased or scheduled
- Simplifies availability management
- Focuses control on current rollouts

:::tip Latest Release Creation Prerequisites
This rule has the side effect of requiring the current latest release, should it exist, to have its availability unconstrained before a new latest release can be created.
:::

### Unconstrained-Sink-Before-New-Sink Rule

You cannot create a new latest release while the current latest release has constrained availability.

**Required Actions:**
1. Complete phasing (set to 100%)
2. Remove scheduling constraints
3. Then create new latest release

## Channel Examples

### Complex Branching Channel

Consider the following release channel with multiple paths:

```
R4-------->R5---\
                 \
R1---\            |--->R6
      |--->R2----/
R3---/
```

**Analysis:**
- **Source nodes**: `R4`, `R1`, and `R3` (entry points)
- **Intermediate nodes**: `R5` and `R2` (path bridges)
- **Sink nodes**: `R6` (latest release)

**Use Case:**
This structure supports devices entering from different starting points (different hardware versions or migration paths) but converging to a common latest release.

### Linear Progression Channel

A more straightforward, linear update path:

```
R1--->R2--->R3--->R4--->R5--->R6
```

**Analysis:**
- **Source nodes**: `R1` (single entry point)
- **Intermediate nodes**: `R2`, `R3`, `R4`, `R5` (sequential updates)
- **Sink nodes**: `R6` (latest release)

**Use Case:**
Ideal for simple, sequential update scenarios where all devices follow the same path.

## Managing Release Channels

### Creating a Channel Strategy

1. **Define Update Paths**: Map out required update sequences
2. **Identify Entry Points**: Determine source nodes for different device types
3. **Plan Convergence**: Design how paths merge toward latest release
4. **Set Requirements**: Mark critical releases as required
5. **Test Paths**: Validate update sequences in development

### Channel Operations

#### Adding a New Latest Release

```bash
# Ensure current latest release is unconstrained
peridio releases update \
  --release-prn $CURRENT_LATEST \
  --phase-value 1.0

# Create new latest release
peridio releases create \
  --cohort-prn $COHORT_PRN \
  --bundle-prn $NEW_BUNDLE \
  --previous-release-prn $CURRENT_LATEST
```

#### Branching Paths

Create alternate update paths for different device groups:

```javascript
// Main path
{
  "release": "R1",
  "next_release": "R2"
}

// Alternate path for legacy devices
{
  "release": "R1-legacy",
  "next_release": "R2"
}

// Convergence point
{
  "release": "R2",
  "next_release": "R3"
}
```

#### Managing Required Releases

Mark critical updates that cannot be skipped:

```bash
peridio releases update \
  --release-prn $CRITICAL_RELEASE \
  --required true \
  --description "Security patch - mandatory for all devices"
```

## Best Practices

### Channel Design

1. **Keep It Simple**: Start with linear channels, add complexity only when needed
2. **Document Paths**: Maintain clear documentation of update paths and requirements
3. **Test Thoroughly**: Validate all paths in staging before production
4. **Plan for Rollback**: Design channels that support backward movement if needed
5. **Monitor Progress**: Track device distribution across the channel

### Version Management

1. **Consistent Versioning**: Use semantic versioning throughout the channel
2. **Clear Requirements**: Define version requirements that reflect dependencies
3. **Migration Paths**: Design clear paths for devices on older versions
4. **Skip Capabilities**: Allow skipping intermediate versions when safe

### Safety Considerations

1. **Required Updates**: Use sparingly for critical security or compatibility updates
2. **Gradual Rollout**: Leverage sink node phasing for controlled deployment
3. **Monitoring**: Track success rates at each node in the channel
4. **Escape Hatches**: Plan for emergency overrides if needed

## Advanced Patterns

### Multi-Stage Channels

Create channels that support different deployment stages:

```
dev-R1 --> dev-R2 --> dev-R3
              |
              v
       staging-R1 --> staging-R2
                           |
                           v
                    prod-R1 --> prod-R2
```

### Hardware-Specific Branches

Support different hardware versions with converging paths:

```
hw-v1-R1 --> hw-v1-R2 --\
                          --> unified-R3 --> unified-R4
hw-v2-R1 --> hw-v2-R2 --/
```

### Fast-Track Paths

Allow certain devices to skip intermediate updates:

```
R1 ---------> R2 ---------> R3
  \                        /
   ----------------------->
   (fast-track for compatible devices)
```

## Troubleshooting

### Common Issues

#### Cannot Create New Release
- **Cause**: Current latest release has constrained availability
- **Solution**: Set phase to 100% and remove scheduling

#### Devices Not Following Expected Path
- **Cause**: Version requirements not met or releases disabled
- **Solution**: Verify version requirements and release states

#### Update Loops
- **Cause**: Circular references in release channel
- **Solution**: Review and fix next_release pointers

#### Devices Stuck at Release
- **Cause**: Next release is disabled or required but unavailable
- **Solution**: Check release states and availability

### Validation Tools

Use CLI to inspect channel structure:

```bash
# View channel structure
peridio releases list \
  --cohort-prn $COHORT_PRN \
  --format graph

# Validate update path for device
peridio devices check-update-path \
  --device-prn $DEVICE_PRN \
  --target-release $TARGET
```

## Integration Considerations

### With Bundle Distribution

Release channels work in conjunction with [bundle distribution](bundle-distribution) to determine what updates devices receive. The channel defines the path, while bundle distribution handles the resolution.

### With Cohort Management

Each cohort has its own release channel, allowing different device groups to have different update strategies while sharing the same bundles.

### With Bundle Overrides

Bundle overrides take precedence over release channels, providing an escape hatch for emergency updates outside the normal channel flow.

## API Reference

For detailed API documentation, see:
- [Releases API Reference](/admin-api#releases)
- [Bundle Distribution Reference](bundle-distribution)
- [Cohorts Reference](/dev-center/peridio-core/device-management/cohorts)