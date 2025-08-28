```
Package extension sysroot into an RPM

Usage: avocado ext package [OPTIONS] --extension <EXTENSION> --target <TARGET>

Options:
  -C, --config <CONFIG>                 Path to avocado.toml configuration file [default: avocado.toml]
  -v, --verbose                         Enable verbose output
  -e, --extension <EXTENSION>           Name of the extension to package
  -t, --target <TARGET>                 Target architecture (e.g., x86_64-unknown-linux-gnu, aarch64-unknown-linux-gnu)
      --out-dir <OUTPUT_DIR>            Output directory on host for the RPM package (relative or absolute path). If not specified, RPM stays in container at $AVOCADO_PREFIX/output/extensions
      --container-arg <CONTAINER_ARGS>  Additional arguments to pass to the container runtime
      --dnf-arg <DNF_ARGS>              Additional arguments to pass to DNF commands
  -h, --help                            Print help

```