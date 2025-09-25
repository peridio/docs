---
title: 'Bundle overrides'
description: 'Bundle overrides in Peridio Core force devices to receive specific bundles, taking precedence over releases for controlled device fleet management.'
---

Bundle overrides allow you to force a [device](/peridio-core/reference/device-management/devices) to be served a [bundle](/peridio-core/reference/bundle-management/bundles) of your choosing, taking precedence over any [release](/peridio-core/reference/bundle-management/releases) that otherwise would have been relevant for the duration of the override.

## Scheduling

Bundle overrides may be scheduled via start and end datetimes. In order for a bundle override to ever be applicable, it must have a start datetime. End datetimes are optional. A bundle override without an end datetime has a schedule that begins at the start datetime, and never ends.

### Stacking

When multiple bundle overrides' schedules overlap, only a single bundle override is ever applicable at any given moment. The applicable bundle override is always the one whose schedule you are within, and that started most recently.

## Mutability

Bundle overrides may be modified at any time to update their name, description, scheduling, and the bundle they serve.

## Distribution

Bundle overrides, like [releases](/peridio-core/reference/bundle-management/releases), are a method of bundle resolution detailed in the [bundle distribution](/peridio-core/reference/bundle-management/bundle-distribution) reference.
