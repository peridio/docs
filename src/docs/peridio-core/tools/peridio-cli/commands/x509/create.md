```
Usage: peridio x509 create [OPTIONS] --common-name <COMMON_NAME> --start-date <YYYY-MM-DD> --end-date <YYYY-MM-DD>

Options:
      --common-name <COMMON_NAME>  The Common Name (CN) for the certificate
      --is-ca                      Whether this certificate is a Certificate Authority (CA)
      --start-date <YYYY-MM-DD>    The start date of the certificate's validity period
      --end-date <YYYY-MM-DD>      The end date of the certificate's validity period
      --signer-key <SIGNER_KEY>    Path to the private key file of the signer (required if signer_cert is provided)
      --signer-cert <SIGNER_CERT>  Path to the certificate file of the signer (required if signer_key is provided)
      --out <OUT>                  Directory to save the created certificate and private key to (defaults to current working directory)
      --signer <SIGNER>            The name of a certificate authority in your Peridio CLI config
  -h, --help                       Print help

```
