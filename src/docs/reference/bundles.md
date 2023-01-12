# Bundles

Bundles are an immutable selection of artifact versions. You associate a bundle with a release to
specify what the release should distribute to devices. Every release is associated with a single
bundle, but a bundle can be associated with any number of releases.

Bundles make it possible to reliably and easily release the same set of artifact versions across
multiple cohorts, empowering common use cases like testing changes against a low risk cohort like
engineers' devices, and then later promoting those exact changes to other higher risk cohorts like
production devices.

See [binary resolution](/reference/cohorts.md#binary-resolution) for more information regarding
how bundles are leveraged.

## Hashes and Enforced Uniquenes

A bundle's `artifact_version_ids` field is an array of artifact version IDs. A bundle's
`hash` is the SHA256 hash of the canonical JSON representation of that array. Bundles are enforced
to be unique by hash, meaning it is impossible to create two different bundles with identical
`artifact_version_ids`.
