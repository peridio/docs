# Updating devices

This guide describes the what updating devices looks like, and how to achieve it.

## Overview

Updating devices is thought about in the following manner:

1. Device configuration.
2. Release configuration.
3. Update resolution.
4. Update consumption.

## Device configuration

See the [creating devices](/guides/creating-devices.md) guide.

Once you have at least one device, you must assign it to a cohort.

## Release configuration

1. [Create an artifact](/guides/creating-artifacts).
2. [Create an artifact version](/guides/creating-artifact-versions).
3. [Create a binary](/guides/creating-binaries).
4. [Create a bundle](/guides/creating-bundles).
5. [Create a release](/guides/creating-releases).

## Update resolution

Update resolution is the process of a device making a
[get device update](/admin-api#tag/devices/operations/get-device-update) request, and the work
Peridio does to respond. Peridio's work is referred to as [update
resolution](/reference/update-resolution).

When an update is resolved, the response to the device's request will include a presigned URL for
each binary that is part of the update.

## Update consumption

Having received the presigned URLs from update resolution, the update consumption is the act of
downloading the binaries on the device and doing something with them. What exactly is done with a
downloaded binary varies greatly and is specific to your particular use case.
