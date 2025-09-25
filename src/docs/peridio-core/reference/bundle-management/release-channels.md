---
title: 'Release channels'
description: 'Release channels in Peridio Core define graphs of releases for cohorts, specifying possible update paths devices can traverse within associated cohorts.'
---

A release channel is a graph of releases associated with zero to many cohorts that specify the possible update paths devices within associated cohorts can traverse.

:::tip bundle distribution
For information about how release channels participate in resolving target bundles for devices, see the [bundle distribution](/peridio-core/reference/bundle-management/bundle-distribution) reference.
:::

## Graph details

A release channel forms a [anti-arborescence](<https://en.wikipedia.org/wiki/Arborescence_(graph_theory)>) graph. In other words, releases may point to exactly one next release, a release may be pointed to by zero to many releases, and all releases eventually converge to a single release that points to no node.

When reasoning about releases as nodes in such a graph, there are three categories of nodes:

- **source nodes** - Nodes that no other nodes point to.
- **intermediate nodes** - Nodes that are pointed to, and that point to other nodes.
- **sink nodes** - Nodes that are pointed to, but point to no other nodes.

:::tip latest release
In conversation, the sink node is often referred to as the latest release.
:::

### Rules

#### zero-to-one-sinks

There can only ever be at most a single latest release at any given time. Or in graph terms, an anti-arborescence graph is either empty, or has at most a single sink node.

#### only-sinks-constrain-availability

The latest release of a graph is special in that it is the only release within a graph that is allowed to constrain its [availability](/peridio-core/reference/bundle-management/releases#availability).

:::tip latest release creation pre-requisites
This rule has the side effect of requiring the current latest release, should it exist, to have its availability unconstrained before a new latest release can be created.
:::

#### unconstrained-sink-before-new-sink

You cannot create a new latest release while the current latest release has constrained availability.

### Example

Consider the following release channel:

#### Figure 1

```
R4-------->R5---\
                 \
R1---\            |--->R6
      |--->R2----/
R3---/
```

- **source nodes** - `R4`, `R1`, and `R3`.
- **intermediate nodes** - `R5` and `R2`.
- **sink nodes** - `R6`.

Or a more linear variation:

#### Figure 2

```
R1--->R2--->R3--->R4--->R5--->R6
```

- **source nodes** - `R1`.
- **intermediate nodes** - `R2-5`.
- **sink nodes** - `R6`.

In both [figure 1](#figure-1) and [figure 2](#figure-2) the latest release is the sink node `R6`.
