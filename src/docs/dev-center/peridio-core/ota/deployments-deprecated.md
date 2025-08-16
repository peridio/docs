---
title: Deployments (Deprecated)
---

# Deployments (Deprecated)

:::warning Deprecated Feature
Deployments have been superseded by [bundles](/platform/reference/bundles) and [releases](/platform/reference/releases). This documentation is maintained for backward compatibility with existing implementations.
:::

A deployment makes [firmware](/platform/reference/firmware) conditionally available to [devices](/platform/reference/devices).

## Deployment Eligibility

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

## Failure Rates and Thresholds

Deployments allow you to configure failure rates and thresholds such that devices and deployments can be quarantined automatically in reaction to devices repeatedly asking for the same update from the same deployment via [get-device-update](/device-api#devices/operation/get-device-update).

### Automatically Quarantine Deployments

| Field                | Description                                                                                                                                                                                                                |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Failure rate         | How many devices can have asked 2 or more times each for the same update from the same deployment within failure rate seconds before the deployment is automatically quarantined.                                          |
| Failure rate seconds | The duration to use with failure rate.                                                                                                                                                                                     |
| Failure threshold    | How many devices with firmware metadata whose architecture, platform, product, and uuid match that of the deployment's firmware that can be simultaneously quarantined before the deployment is automatically quarantined. |

### Automatically Quarantine Devices

| Field                       | Description                                                                                                                                                            |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Device failure rate         | How many times a device can have asked for the same update from the same deployment within device failure rate seconds before the device is automatically quarantined. |
| Device failure rate seconds | The duration to use with device failure rate.                                                                                                                          |
| Device Failure threshold    | How many times total a device can have asked for the same update from the same deployment before the device is automatically quarantined.                              |

### Clear Failure Rates and Thresholds

- Unquarantining a deployment will cause device update attempts prior to that to be ignored in failure rates and thresholds.
- Unquarantining a device will cause its update attempts prior to that to be ignored in failure rates and thresholds.
- [`device.release_changed`](/admin-api#device-events/operation/device-release-changed) and [`device.firmware_changed`](/admin-api#device-events/operation/device-firmware-changed) events cause update attempts prior to them to be ignored in failure rates and thresholds.

## Creating Deployments

To learn more about creating deployments, see the [creating deployments](/platform/guides/creating-deployments) guide.

### Prerequisites

- [Peridio CLI](https://github.com/peridio/morel/releases) (Last tested with version 0.8.0)

In order to create a deployment it must be associated with a preexisting product and firmware. To learn how to create a product, see the [creating products](/platform/guides/creating-products) guide. To learn how to create firmware, see the [creating firmware](/platform/guides/creating-firmware) guide.

### Create Deployment

#### Web Console

See the [Peridio Web Console](https://console.peridio.com).

#### CLI

```bash
peridio deployments create \
  --firmware-uuid abc \
  --name "My Deployment" \
  --product-name "My Product" \
  --tags tag1,tag2
```

#### API

Use the Peridio Admin API [create-a-deployment](/admin-api#deployments/operation/create-a-deployment) endpoint.