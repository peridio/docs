---
title: Deployments
---

A deployment makes [firmware](firmwares) available to [devices](devices) associated with the same [product](products) as the deployment and that satisfy the deployment's conditions. Deployments may be configured as active or not. Only active deployments may be considered when Peridio evaluates if an update is available for a device.

## Conditions

A deployment can restrict the devices it is applicable to by the tags associated with the device and by which version the device is currently on.

### Tags

When tags are specified as a condition for a deployment, a device  must have at least all of the tags specified by the deployment in order to meet the condition.

### Version

When a version is specified as a condition for a deployment, a device must meet meet this version requirement. Firmware versions are [semantic versions](https://semver.org/spec/v2.0.0.html), for examples of what a version condition on a deployment may look like, reference https://hexdocs.pm/elixir/Version.html#module-requirements.
