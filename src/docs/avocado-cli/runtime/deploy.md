```
Deploy a runtime to a device

Usage: avocado runtime deploy [OPTIONS] --runtime <RUNTIME> --device <DEVICE>

Options:
  -C, --config <CONFIG>                 Path to avocado.toml configuration file [default: avocado.toml]
  -v, --verbose                         Enable verbose output
  -r, --runtime <RUNTIME>               Runtime name to deploy
  -t, --target <TARGET>                 Target architecture
  -d, --device <DEVICE>                 Device IP address or hostname to deploy to
      --container-arg <CONTAINER_ARGS>  Additional arguments to pass to the container runtime
      --dnf-arg <DNF_ARGS>              Additional arguments to pass to DNF commands
  -h, --help                            Print help

```