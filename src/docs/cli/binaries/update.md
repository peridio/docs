```
Usage: peridio binaries update [OPTIONS] --prn <PRN>

Options:
      --prn <PRN>
          The PRN of the resource you wish to update
      --custom-metadata <CUSTOM_METADATA>
          A JSON object that informs the metadata that will be associated with this binary when it is included in bundles
      --description <DESCRIPTION>
          An arbitrary string attached to the resource. Often useful for displaying to users
      --state <STATE>
          The state to transition the binary to [possible values: destroyed, hashable, hashing, signable, signed, uploadable]
      --hash <HASH>
          The lowercase hex encoding of the SHA256 hash of the binary's content
      --size <SIZE>
          The size of the binary in bytes
  -h, --help
          Print help

```