# Overview

[Organizations](/reference/organizations) are the highest level of resource isolation in Peridio. Within an organization you can create [products](/reference/products) and [cohorts](/reference/cohorts) to categorize your [devices](/reference/devices). Devices can be created manually, imported in bulk, and just-in-time provisioned.

[Binaries](/reference/binaries) are the assets you wish to distribute to your devices. There is no restriction on the format of their content. [Artifacts](/reference/artifacts) are used to define types for your binaries, and [artifact versions](/reference/artifact-versions) allow you to track a binary of a certain type across distinct version. [Bundles](/reference/bundles) allow you to create immutable, reusable ordered sets of Binaries.

[Releases](/reference/releases) are what ties together devices and binaries. Within a cohort of devices you can create graphs of releases to define the update paths available to your devices. Each release is associated with a bundle, and that is what determines the content of the update when a device resolves that release.

<img src="/img/guides-overview.png" width="auto" />
