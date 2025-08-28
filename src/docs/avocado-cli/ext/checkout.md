```
Check out files from extension sysroot to source directory

Usage: avocado ext checkout [OPTIONS] --extension <EXTENSION> --ext-path <EXT_PATH> --src-path <SRC_PATH>

Options:
  -C, --config <CONFIG>
          Path to avocado.toml configuration file [default: avocado.toml]
  -v, --verbose
          Enable verbose output
  -e, --extension <EXTENSION>
          Name of the extension to checkout from
  -t, --target <TARGET>
          Target architecture
      --ext-path <EXT_PATH>
          Path within the extension sysroot to checkout (e.g., /etc/config.json or /etc for directory)
      --src-path <SRC_PATH>
          Destination path in source directory (relative to src root)
      --container-tool <CONTAINER_TOOL>
          Container tool to use (docker/podman) [default: docker]
  -h, --help
          Print help

```