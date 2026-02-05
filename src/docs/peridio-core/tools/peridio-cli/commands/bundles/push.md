```
Usage: peridio bundles push [OPTIONS] --path <PATH>

Options:
  -p, --path <PATH>
          The path to the zstd compressed cpio archive containing the bundle and binaries
      --binary-part-size <BINARY_PART_SIZE>
          The size to use when creating binary parts. All binary parts will be equal to this size, except the last one which will be less than or equal to this size [default: 5242880]
      --concurrency <CONCURRENCY>
          Limit the concurrency of jobs that create and upload binary parts. [default: 2x the core count, to a maximum of 16]
  -h, --help
          Print help

```
