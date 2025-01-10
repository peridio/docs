# Bundle overrides

Bundle overrides allow you to force a [device](/platform/reference/devices) to be served a [bundle](/platform/reference/bundles) of your choosing, taking precedence over any [release](/platform/reference/releases) that otherwise would have been relevant for the duration of the override.

## Scheduling

Bundle overrides may be scheduled via start and end datetimes. In order for a bundle override to ever be applicable, it must have a start datetime. End datetimes are optional. A bundle override without an end datetime has a schedule that begins at the start datetime, and never ends.

### Stacking

When multiple bundle overrides' schedules overlap, only a single bundle override is ever applicable at any given moment. The applicable bundle override is always the one whose schedule you are within, and that started most recently.

## Mutability

Bundle overrides may be modified at any time to update their name, description, scheduling, and the bundle they serve.

## Distribution

Bundle overrides, like [releases](releases), are a method of bundle resolution detailed in the [bundle distribution](bundle-distribution) reference.
