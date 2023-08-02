---
title: create
---

# peridio ca-certificates create

Create a CA certificate.

Just in time provisioning (JITP) is disabled by default, but supplying any of the JITP flags will enable it.

## Flags

`-h`, `--help`

Prints help information

## Options

`--description <description>`

The CA description.

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

`-c`, `--certificate-path <certificate-path>`

The base64 CA certificate path.

`-v`, `--verification-certificate-path <verification-certificate-path>`

The base64 verification certificate path.
