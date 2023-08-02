---
title: update
---

# peridio ca-certificates update

Update a CA information.

Supplying any of the JITP flags will enable Just in time provisioning (JITP).

## Flags

`-h`, `--help`

Prints help information.

## Options

`--description <description>`

The CA description.

`--disable-jitp`

Use this flag if you want to disable JITP (overrides any other JITP option).

`--jitp-description <jitp-description>`

The JITP description.

`--jitp-product-name <jitp-product-name>`

The JITP product name.

`--jitp-tags <jitp-tags>`

A comma separated set of tags to apply to affected devices.

`--jitp-cohort-prn <jitp-cohort-prn>`

The PRN of the cohort to apply to a device upon JITP.

### Required

`--organization-name <organization-name>`

The organization to interact with.

`--ca-certificate-serial <ca-certificate-serial>`

The CA certificate serial.

