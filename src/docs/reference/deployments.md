---
title: Deployments
---

:::info Legacy
This functionality has been superceded by [bundles](bundles) and [releases](releases).
:::

A deployment makes [firmware](firmware) available to [devices](devices) associated with the same [product](products) as the deployment and that satisfy the deployment's conditions. Deployments may be configured as active or not. Only active deployments may be considered when Peridio evaluates if an update is available for a device.

## Deployment Eligibility

When a device checks for an update, Peridio identifies which deployment is applicable to the requesting device, which dictates which firmware Peridio will respond to the request with. This determination is impacted by the device tags the deployment requires and by the version condition specified by the deployment, if any.

For a device to be eligible for any deployment, the device must not be quarantined.

For a device to be eligible for a particular deployment, the following conditions must be met:

- The deployment and the device are of the same organization.
- The deployment and the device are of the same product.
- The deployment is active.
- The deployment is not quarantined.
- The device's current firmware's architecture matches the architecture of the deployment's firmware.
- The device's current firmware's platform matches the platform of the deployment's firmware.
- The device's current firmware's UUID is not the same as the UUID of the deployment's firmware.

Peridio tracks metadata about the current firmware of devices. Devices themselves dictate what Peridio considers their current firmware by supplying the `x-peridio-uuid` header to the Peridio Device API [get device update](/device-api#tag/Devices/paths/~1device~1update/get) endpoint.

### Tags

A deployment must specify at least one tag as a condition. A device must have at least all of the tags specified by the deployment in order to meet the condition.

### Version

A deployment may optionally specify a version requirement. When a version is specified as a condition for a deployment, a device must meet meet this version requirement. Firmware versions are [semantic versions](https://semver.org/spec/v2.0.0.html), for examples of what a version condition on a deployment may look like, reference https://hexdocs.pm/elixir/Version.html#module-requirements.
