# Cohorts

Cohorts are created within [products](/reference/products.md) and are a means to group devices.
[Releases](/reference/releases.md) are created within cohorts to orchestrate the delivery of
[binaries](/reference/binaries.md) to devices.

## Release Graph

Within a cohort, releases form a particular type of graph, an
[anti-arborescence](https://en.wikipedia.org/wiki/Arborescence_(graph_theory)). In other words,
releases may point to exactly one next release, a release may be pointed to by zero to many
releases, all releases eventually converge to a single "[latest release](releases#latest-release)"

For example:

```
R4-------->R5---\
                 \
R1---\            |--->R6
      |--->R2----/
R3---/
```

`R6` above would be the latest release.

While it is possible to end up with a release graph that looks like the above, it is recommended to keep as linear of a release graph as reasonably possible because it is easier to reason about and maintain.

For example:

```
R1--->R2--->R3--->R4--->R5--->R6
```
