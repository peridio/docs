```
Creates a new signing key resource in the Peridio Admin API. You can either generate a new signing key by specifying a supported algorithm (using --algorithm and --out together) or provide an existing public key using one of the mutually exclusive options (--value, --key, or --path). Additionally, if you use --config, the generated key is automatically added to your CLI configuration under the signing-key-pairs section

Usage: peridio signing-keys create [OPTIONS] --name <NAME> --organization-prn <ORGANIZATION_PRN>

Options:
      --value <VALUE>
          The public key raw file contents. --value cannot be used with --algorithm, --key, --out, or --path
      --name <NAME>
          The name to create the key in the Peridio Admin API with
      --organization-prn <ORGANIZATION_PRN>
          The PRN of the organization you wish to create the resource within
      --key <KEY>
          The path to the public key raw file. --key cannot be used with --algorithm, --out, --path, or --value
      --path <PATH>
          The path to the public key pem file
      --algorithm <ALGORITHM>
          Specifies the cryptographic algorithm to use for generating the signing key. Note that only Ed25519 is supported at this time. --algorithm must be used together with --out. --algorithm cannot be used with --value, --key, or --path [possible values: Ed25519]
      --out <OUT>
          Specifies the output directory where the generated key will be saved. --out must be used together with --algorithm. --out cannot be used with --key, --path, or --value
      --config <CONFIG>
          Automatically configures the generated signing key into your CLI configuration's signing-key-pairs section
  -h, --help
          Print help

```