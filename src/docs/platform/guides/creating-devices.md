# Creating devices

This guide describes how to create devices.

To learn more about Peridio devices in general, see the [devices](/platform/reference/devices) reference.

## Prerequisites

- [Peridio CLI](https://github.com/peridio/morel/releases).
  - Last tested with version 0.8.0.

## Create one device

Devices may be created one at a time using the Peridio CLI, Peridio Admin API, or the Peridio Web Console.

```console
peridio devices create \
  --identifier my-device \
  --product-name my-product
```

## Create devices in bulk

Devices may be created in bulk using the Peridio Web Console.

Peridio supports two file formats for creating devices in bulk, the Peridio Device Import Manifest and the Microchip TrustPlatform Manifest.

### Peridio device import manifest

This is a CSV file that expects the following headers to be included in this order:

- `identifier`
  - The identifier for the devices, must match the common name of the device's certificate(s).
- `description`
  - The description you wish to apply to the devices.
- `tags`
  - The tags you wish to apply to the devices. Multiple tags are separated with commas.
- `product_prn`
  - The PRN of the product you wish to add the devices to.
- `cohort_prn`
  - The PRN of the cohort you wish to add the devices to.
- `certificates`
  - The certificates you wish to associate with devices. Values for this field should be PEM encoded certificates. If a device has multiple certificates, separate them with `\n\n`.
- `target`
  - The target you wish to add to the device.

It is recommended that you quote every field.

### Microchip TrustPlatform manifest

This is a file format defined by Microchip and provided to their customers following a purchase of select hardware security modules. Relevant documentation is available [here](https://ww1.microchip.com/downloads/aemDocuments/documents/SCBU/ProductDocuments/ReferenceManuals/Trust-Platform-Manifest-File-Format-60001759.pdf).
