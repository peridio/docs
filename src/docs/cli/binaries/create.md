```
Idempotently create, upload in parallel, and sign a binary.

This command idempotently: creates a binary record, uploads its content in parallel via binary parts, and creates a binary signature.

Usage: peridio binaries create [OPTIONS] --artifact-version-prn <ARTIFACT_VERSION_PRN> --target <TARGET>

Options:
      --artifact-version-prn <ARTIFACT_VERSION_PRN>
          The PRN of the artifact version you wish to create a binary for

      --custom-metadata <CUSTOM_METADATA>
          A JSON object that informs the metadata that will be associated with this binary when it is included in bundles

      --custom-metadata-path <CUSTOM_METADATA_PATH>
          The path to the JSON file value for custom_metadata

      --description <DESCRIPTION>
          An arbitrary string attached to the resource. Often useful for displaying to users

      --hash <HASH>
          The lowercase hex encoding of the SHA256 hash of the binary's content

      --id <ID>
          A user provided custom UUID id for the binary database record

      --size <SIZE>
          The expected size in bytes of the binary

      --target <TARGET>
          An arbitrary string attached to the resource. Often a target triplet to indicate compatibility

      --content-path <CONTENT_PATH>
          The path to the file you wish to upload as the binary's content

      --binary-part-size <BINARY_PART_SIZE>
          The size to use when creating binary parts. All binary parts will be equal to this size, except the last one which will be less than or equal to this size
          
          [default: 5242880]

      --concurrency <CONCURRENCY>
          Limit the concurrency of jobs that create and upload binary parts. [default: 2x the core count, to a maximum of 16]

  -s, --signing-key-pair <SIGNING_KEY_PAIR>
          The name of a signing key pair in your Peridio CLI config. This will dictate both the private key to create a binary signature with as well as the signing key Peridio will use to verify the binary signature

      --signing-key-private <SIGNING_KEY_PRIVATE>
          A path to a PKCS#8 private key encoded as a pem to create a binary signature binary with

      --signing-key-prn <SIGNING_KEY_PRN>
          The PRN of the signing key Peridio will use to verify the binary signature

      --skip-upload
          Create the binary record but do not upload its content nor sign it

      --bundle-override-prn <BUNDLE_OVERRIDE_PRN>
          The PRN of the bundle override to associate with this binary.
          
          A bundle will be created for the newly-created binary.
          
          The given bundle override will be updated to this bundle.

      --device-prn <DEVICE_PRN>
          The PRN of the device to stage this binary for.
          
          A bundle will be created for the newly-created binary.
          
          A bundle override will be created with this bundle.
          
          The given device will be added to the bundle override.

      --cohort-prn <COHORT_PRN>
          The PRN of a cohort, in which to create a release for.
          
          A bundle will be created for the newly-created binary.
          
          A release will be created for the given cohort with this bundle.
          
          The created release is not required, has scheduled availability of "now", and 100% availability.

  -h, --help
          Print help (see a summary with '-h')

```