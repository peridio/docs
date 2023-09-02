# Bundles

Bundles are an immutable ordered set of artifact versions. You associate a bundle with a release to specify what the release should distribute to devices. Every release is associated with a single bundle, but a bundle can be associated with any number of releases.

Bundles make it possible to reliably and easily release the same set of artifact versions across multiple cohorts, empowering common use cases like testing changes against a low risk cohort like engineers' devices, and then later promoting those exact changes to other higher risk cohorts like production devices.

See [binary resolution](/reference/releases.md#binary-resolution) for more information regarding how bundles are leveraged.
