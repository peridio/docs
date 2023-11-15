```
Usage: peridio binary-signatures create [OPTIONS] --binary-prn <BINARY_PRN>

Options:
  -b, --binary-prn <BINARY_PRN>
          The PRN of the binary to create a binary signature for

  -c, --binary-content-path <BINARY_CONTENT_PATH>
          The path of the file to automatically create a signature for. If you instead want to compute and provide the signature yourself, use the --signature option

  -g, --signature <SIGNATURE>
          The signature of the binary content.
          
          The hex encoded Ed25519 signature of the SHA256 hash of the binary content. To avoid computing this yourself, you can use the --binary-content-path option.

  -s, --signing-key-pair <SIGNING_KEY_PAIR>
          The name of a signing key pair as defined in your Peridio CLI config.
          
          If you instead want to provide the private key and PRN of the signing key yourself, use the --signing-key-private and --signing-key-prn options.

      --signing-key-private <SIGNING_KEY_PRIVATE>
          The path of the file containing the private key to sign the binary with.
          
          If you instead want to provide the name of a signing key pair as defined in your Peridio CLI config, use the --signing-key-pair option.

      --signing-key-prn <SIGNING_KEY_PRN>
          The PRN of the signing key to tell Peridio to verify the signature with.
          
          If you instead want to provide the name of a signing key pair as defined in your Peridio CLI config, use the --signing-key-pair option.

  -h, --help
          Print help (see a summary with '-h')

```