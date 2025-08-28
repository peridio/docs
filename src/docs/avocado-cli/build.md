```
Build all components (SDK compile, extensions, and runtime images)

Usage: avocado build [OPTIONS]

Options:
  -C, --config <CONFIG>                 Path to avocado.toml configuration file [default: avocado.toml]
  -v, --verbose                         Enable verbose output
  -r, --runtime <RUNTIME>               Runtime name to build (if not provided, builds all runtimes)
  -e, --extension <EXTENSION>           Extension name to build (if not provided, builds all required extensions)
  -t, --target <TARGET>                 Target architecture
      --container-arg <CONTAINER_ARGS>  Additional arguments to pass to the container runtime
      --dnf-arg <DNF_ARGS>              Additional arguments to pass to DNF commands
  -h, --help                            Print help

```