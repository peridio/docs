```
Fetch and refresh repository metadata for sysroots

Usage: avocado fetch [OPTIONS]

Options:
  -C, --config <CONFIG>                 Path to avocado.toml configuration file [default: avocado.toml]
  -v, --verbose                         Enable verbose output
  -e, --extension <EXTENSION>           Extension name to fetch metadata for (if not provided, fetches for all sysroots)
  -r, --runtime <RUNTIME>               Runtime name to fetch metadata for (if not provided, fetches for all sysroots)
  -t, --target <TARGET>                 Target architecture
      --container-arg <CONTAINER_ARGS>  Additional arguments to pass to the container runtime
      --dnf-arg <DNF_ARGS>              Additional arguments to pass to DNF commands
  -h, --help                            Print help

```
