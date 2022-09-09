---
title: Devices
---

A device is the logical representation of a physical or virtual thing you wish to manage firmware for with Peridio.

## Creation

Devices can be created proactively or reactively. The former is sometimes convenient when just starting out or taking a one off action, but quickly becomes untenable. When you wish to optimize the process of onboarding devices it is typically best to take a reactive approach.

### Proactive

Proactive creation of devices means that you create a device before it ever attempts to connect to the Peridio Device API. You may do this via the Console or the Peridio Device API. When taking this approach you must subsequently create a certificate for it as well in order to facilitate its authentication with the Peridio Device API.

### Reactive

Reactive creation of devices means that you configure Peridio in such a way that groups of devices are able to connect to the Peridio Device API without you having taken any per device action, and in that moment they are reactively created by Peridio for you "just in time".

For documentation regarding configuring Peridio in this fashion, reference [just in time provisioning](just-in-time-provisioning).

## Tags

Devices can be associated with tags to achieve logical groupings. These grouping may have external
meaning to you, but they may also be used within Peridio to adjust the scope of devices to which a
deployment is applicable as part of its configured [conditions](deployments#tags).
