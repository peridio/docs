---
title: Deployments
---

A deployment makes [firmware](firmware) conditionally available to [devices](devices).

**Deprecated**

Superceded by [bundles](bundles) and [releases](releases).

## Deployment eligibility

When a device checks for an update with [get-device-update](/device-api#devices/operation/get-device-update), Peridio resolves which deployment, if any, is applicable to the requesting device, which dictates which firmware Peridio will respond to the request with.

For a device to be eligible for a particular deployment, the following conditions must be met:

- The deployment is active.
- The deployment and the device are not quarantined and belong to the same organization and product.
- The device must have at least the tags the deployment's conditions specify.
- If the deployment has a version condition, the device's firmware's version must satisfy it.
- The device's firmware and the deployment's firmware have matching architecture and platforms, but distinct UUIDs.

Peridio tracks metadata about the current firmware of devices. Devices dictate what Peridio considers their current firmware by supplying [`x-peridio` headers](/device-api#section/Global-Headers) to the Peridio Device API.

### Tags

A deployment must specify at least one tag as a condition. A device must have at least all of the tags specified by the deployment in order to meet the condition.

### Version

A deployment may optionally specify a SemVer version requirement. When specified, a device's firmware's version must satisfy the requirement. Firmware versions are [semantic versions](https://semver.org/spec/v2.0.0.html), for examples of what a version condition on a deployment may look like, reference https://hexdocs.pm/elixir/Version.html#module-requirements.

## Quarantine

Deployment's have a boolean `quarantined` field. When `true`, the deployment will not serve updates. Deployments can be automatically quarantined due to failure rate and failure threshold configurations.

## Failure rates and thresholds

Deployments allow you to configure failure rates and thresholds such that devices and deployments can be quarantined automatically in reaction to devices repeatedly asking for the same update from the same deployment via [get-device-update](/device-api#devices/operation/get-device-update).

### Automatically quarantine deployments

| Field                | Description                                                                                                                                                                                                                |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Failure rate         | How many devices can have asked 2 or more times each for the same update from the same deployment within failure rate seconds before the deployment is automatically quarantined.                                          |
| Failure rate seconds | The duration to use with failure rate.                                                                                                                                                                                     |
| Failure threshold    | How many devices with firmware metadata whose architecture, platform, product, and uuid match that of the deployment's firmware that can be simultaneously quarantined before the deployment is automatically quarantined. |

### Automatically quarantine devices

| Field                       | Description                                                                                                                                                            |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Device failure rate         | How many times a device can have asked for the same update from the same deployment within device failure rate seconds before the device is automatically quarantined. |
| Device failure rate seconds | The duration to use with device failure rate.                                                                                                                          |
| Device Failure threshold    | How many times total a device can have asked for the same update from the same deployment before the device is automatically quarantined.                              |

### Clear failure rates and thresholds

- Unquarantining a deployment will cause device update attempts prior to that to be ignored in failure rates and thresholds.
- Unquarantining a device will cause its update attempts prior to that to be ignored in failure rates and thresholds.
- `device.release_changed` and `device.firmware_changed` events cause update attempts prior to them to be ignored in failure rates and thresholds.
