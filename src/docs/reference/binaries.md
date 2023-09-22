# Binaries

Binaries record the content you wish to distribute to devices.

Once you've created an [artifact version](artifact-versions), you can create binaries for it.

## Content Versus Record

When referring to binaries there are two distinct concepts: a binary's content and a binary's record.

A binary's record is the meta information Peridio stores regarding a binary, e.g., its description, what artifact version it is associated with, its hash, etc. A binary's content is the literal data, e.g., a firmware image, a machine learning model, etc.

This distinction is important because a binary's content and record are stored independently from each other for a variety of reasons including the efficient distribution of content to devices and the efficient queryability of records. It is especially relevant to [destroyed binaries](#destroyed-binaries).

## Targets and Compatibility

Binaries indicate their compatibility via their `target` field. The value of this field is expected to be either:

1. A target triplet like `arm-linux-androidabi`.
    - The binary in this case is said to be target-specific.
2. The reserved value `portable`.
    - The binary in this case is said to be portable.

:::info Artifact Versions
An artifact version can have zero to many binaries associated with it as long as each binary has a unique target.

[Destroyed binaries](#destroyed-binaries) do not count towards this conflict.
:::

### Devices
Target-specific binaries are compatible with a device if their `target` field matches the device's product's `target` field.

Portable binaries are universally compatible with all devices.

Note in the case of [binary resolution](/reference/cohorts.md#bianry-resolution), if both a compatible target-specific binary and a portable binary exist for an artifact version, the target-specific binary will be preferred.

## Lifecycle

A binary's lifecycle is tracked and managed by its `state` field.

### States

- `uploadable`
- `hashable`
- `hashing`
- `signable`
- `signed`
- `destroyed`

<img src="/img/binary-states.png" height="200" />

#### Uploadable

The initial state that every binary is created in. The binary is awaiting data to be uploaded via [binary parts](/reference/binary-parts.md).

If the binary storage backend has an initial step, like is typical in multipart upload scenarios, it is performed as part of this step.

:::tip
When you create a binary in the web console, it will be in the `uploadable` state. Note that successful upload of a file via the web console will automatically transition the binary to the `hashing` state which will eventually automatically transition to the `signable` state.
:::

#### Hashable

Use this state to indicate you have completed your upload.

If the binary storage backend has a final step, like is typical in multipart upload scenarios, it is performed as part of this state transition.

#### Hashing

Use this state to kickoff Peridio's own verification process that computes its own hash over the data and verifies it matches the user provided hash and the hash reported

:::info Automatic State Transition
Once Peridio's verification process completes, the binary will automatically transition states from `hashing` to `signable`.
:::

#### Signable

This state indicates the binary as awaiting a [signature](/reference/binary-signatures.md).

:::info Automatic State Transition
Once a signature is attached to a signable binary, the binary will automatically transition states from `signable` to `signed`.
:::

#### Signed

The binary is complete and ready to be attached to [bundles](/reference/bundles.md) and distributed via [releases](/reference/releases.md).

#### Destroyed

The binary has been destroyed and can no longer be attached to new bundles nor distributed via releases. See [destroyed binaries](#destroyed-binaries).

### Resetting Binaries

Hashable, hashing, and signable binaries can be reset to the uploadable state. This is achieved with an Admin API [update-a-binary](/admin-api#binaries/operation/update-a-binary) request that sets the state to uploadable. Doing this will delete associated binary parts and a new attempt at uploading may be made.

## Destroyed Binaries

Binaries with a state of signed can be destroyed. Destroying a binary deletes its content from Peridio and alters its record, to understand the difference between the two see [content versus record](#content-versus-record).

:::danger
Destroying a binary is an irreversible and destructive action.

- The binary's record is updated such that `destroyed: true, bytes_uploaded: 0`.
- The binary's content is irrecoverably deleted.
- Devices' ability to update may be interupted, see [impact on releases](#impact-on-releases).
:::

### Impact on Releases

A release is affected by a destroyed binary if the release is associated with a bundle that is associated with an artifact version that is associated with a destroyed binary.

:::caution
Affected releases will not serve updates to devices which can cause devices to be be unable to update if the release is also required.
:::

:::tip
To avoid disrupting device updates, it is recommended to archive any release that would be impacted before destroying the binary. You can see a list of releases associated with a binary most conveniently by viewing the binary in the Peridio Web Console.
:::
