```
Run DNF commands in an extension's context

Usage: avocado ext dnf [OPTIONS] --extension <EXTENSION> [COMMAND]...

Arguments:
  [COMMAND]...  DNF command and arguments to execute

Options:
  -C, --config <CONFIG>                 Path to avocado.toml configuration file [default: avocado.toml]
  -v, --verbose                         Enable verbose output
  -e, --extension <EXTENSION>           Name of the extension to operate on
  -t, --target <TARGET>                 Target architecture
      --container-arg <CONTAINER_ARGS>  Additional arguments to pass to the container runtime
      --dnf-arg <DNF_ARGS>              Additional arguments to pass to DNF commands
  -h, --help                            Print help

```
