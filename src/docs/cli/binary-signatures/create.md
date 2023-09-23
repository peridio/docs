```
Usage: peridio binary-signatures create [OPTIONS] --binary-prn <BINARY_PRN>

Options:
  -b, --binary-prn <BINARY_PRN>
          The PRN of the binary this signature will be associated with.
  -c, --binary-content-path <BINARY_CONTENT_PATH>
          The path of the file to create a signature for.
  -g, --signature <SIGNATURE>
          The hex encoded signature of the SHA256 hash of the binary content.
  -s, --signing-key-pair <SIGNING_KEY_PAIR>
          The name of a signing key pair as defined in your Peridio CLI config.
      --signing-key-private <SIGNING_KEY_PRIVATE>
          The PEM base64-encoded PKCS #8 private key.
      --signing-key-prn <SIGNING_KEY_PRN>
          The PRN of the signing key to tell Peridio to verify the signature with.
  -h, --help
          Print help

```