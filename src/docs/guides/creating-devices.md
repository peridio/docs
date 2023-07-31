# Creating Devices

This guide describes how to create devices.

To learn more about Peridio devices in general, see the [devices](/reference/devices) reference.

## Prerequisites

- [Peridio CLI](https://github.com/peridio/morel/releases).
  - Last tested with version 0.3.0.

## Create One Device

Devices may be created one at a time using the Peridio CLI, Peridio Admin API, or the Peridio Web Console.

```console
peridio devices create \
  --identifier my-device \
  --product-name my-product
```

## Create Devices in Bulk

Devices may be created in bulk using the Peridio Web Console.

Peridio supports two file formats for creating devices in bulk, the Peridio Device Import Manifest and the Microchip TrustPlatform Manifest.

### Peridio Device Import Manifest

This is a CSV file that expects the following headers to be included in this order:

- `identifier`
  - The identifier for the devices, must match the common name of the device's certificate(s).
- `description`
  - The description you wish to apply to the devices.
- `tags`
  - The tags you wish to apply to the devices. Multiple tags are separated with commas.
- `product`
  - The name of the product you wish to add the devices to.
- `org`
  - The name of the organization you wish to add the devices to.
- `certificates`
  - The certificates you wish to associate with devices. Values for this field should be PEM encoded certificates. If a device has multiple certificates, separate them with `\n\n`.
- `target`
  - The target you wish to add to the device.

It is recommended that you quote every field.

### Microchip TrustPlatform Manifest

This is a file format defined by Microchip and provided to their customers following a purchase of select hardware security modules. Relevant documentation is available [here](https://www.microchip.com/content/dam/mchp/documents/SCBU/ProductDocuments/SupportingCollateral/TrustPlatformManifestFileFormat_2019-09-26_A.pdf).
