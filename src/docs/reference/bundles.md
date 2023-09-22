# Bundles

Bundles are an immutable ordered set of [binaries](binaries). You associate a bundle with a [release](releases) to specify what binaries the release should distribute to [devices](devices). Every release is associated with a single bundle, but a bundle can be associated with any number of releases.

Bundles make it possible to reliably and easily release the same set of binaries across multiple cohorts, empowering common use cases like testing changes against a low risk cohort like engineers' devices, and then later promoting those exact changes to other higher risk cohorts like production devices.
