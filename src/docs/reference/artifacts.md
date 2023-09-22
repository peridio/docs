# Artifacts

An artifact is an asset type you wish to create [versions](artifact-versions) and [binaries](binaries) for in pursuit of distributing content to devices.

The easiest example of an artifact is the complete firmware for a device. However, you can use artifacts to represent anything: a machine learning model, a Linux kernal, a file system, a piece of media, a black box, etc.

## Immutable Reference

Artifacts act as an immutable reference to a type of binary that remains consistent before and after any version or binaries are created for it. This enables code to perform different actions based on the type of binary.

For example, your bundles may typically contain your base firmware image and a machine learning model. A device performing a Device API `get-update` request could distinguish between the two binaries by observing the artifact PRNs reported alongside the binaries in the response's manifest.
