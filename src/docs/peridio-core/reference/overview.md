---
title: Overview
sidebar_position: 1
description: 'Peridio Core reference documentation covering organizations, devices, binaries, artifacts, bundles, and releases for comprehensive device fleet management.'
---

[Organizations](/peridio-core/reference/account-management/organizations) are the highest level of resource isolation in Peridio. Within an organization you can create [products](/peridio-core/reference/device-management/products) and [cohorts](/peridio-core/reference/device-management/cohorts) to categorize your [devices](/peridio-core/reference/device-management/devices). Devices can be created manually, imported in bulk, and just-in-time provisioned.

[Binaries](/peridio-core/reference/binary-management/binaries) are the assets you wish to distribute to your devices. There is no restriction on the format of their content. [Artifacts](/peridio-core/reference/binary-management/artifacts) are used to define types for your binaries, and [artifact versions](/peridio-core/reference/binary-management/artifact-versions) allow you to track a binary of a certain type across distinct version. [Bundles](/peridio-core/reference/bundle-management/bundles) allow you to create immutable, reusable ordered sets of Binaries.

[Releases](/peridio-core/reference/bundle-management/releases) are what ties together devices and binaries. Within a cohort of devices you can create graphs of releases to define the update paths available to your devices. Each release is associated with a bundle, and that is what determines the content of the update when a device resolves that release.

<img src="/img/guides-overview.png" width="auto" />
