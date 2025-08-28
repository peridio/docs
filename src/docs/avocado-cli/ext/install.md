```
Install dependencies into extension sysroots

Usage: avocado ext install [OPTIONS]

Options:
  -C, --config <CONFIG>                 Path to avocado.toml configuration file [default: avocado.toml]
  -v, --verbose                         Enable verbose output
  -f, --force                           Force the operation to proceed, bypassing warnings or confirmation prompts
  -e, --extension <EXTENSION>           Name of the extension to install (if not provided, installs all extensions)
  -t, --target <TARGET>                 Target architecture
      --container-arg <CONTAINER_ARGS>  Additional arguments to pass to the container runtime
      --dnf-arg <DNF_ARGS>              Additional arguments to pass to DNF commands
  -h, --help                            Print help

```