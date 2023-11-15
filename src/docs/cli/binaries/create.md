```
Idempotently create, upload in parallel, and sign a binary.

This command idempotently: creates a binary record, uploads its content in parallel via binary parts, and creates a binary signature.

Usage: peridio binaries create [OPTIONS] --artifact-version-prn <ARTIFACT_VERSION_PRN> --target <TARGET>

Options:
      --artifact-version-prn <ARTIFACT_VERSION_PRN>
          The PRN of the artifact version you wish to create a binary for

      --description <DESCRIPTION>
          An arbitrary string attached to the resource. Often useful for displaying to users

      --hash <HASH>
          The base64 encoding of the SHA256 hash of the binary's content

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
          Limit the concurrency of jobs that create and upload binary parts. [default: 2x the core count]

  -s, --signing-key-pair <SIGNING_KEY_PAIR>
          The name of a signing key pair in your Peridio CLI config. This will dictate both the private key to create a binary signature with as well as the signing key Peridio will use to verify the binary signature

      --signing-key-private <SIGNING_KEY_PRIVATE>
          A path to a PKCS#8 private key encoded as a pem to create a binary signature binary with

      --signing-key-prn <SIGNING_KEY_PRN>
          The PRN of the signing key Peridio will use to verify the binary signature

      --skip-upload
          Create the binary record but do not upload its content nor sign it

  -h, --help
          Print help (see a summary with '-h')

```