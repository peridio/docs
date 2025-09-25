```
Run DNF commands in the SDK context

Usage: avocado sdk dnf [OPTIONS] [COMMAND]...

Arguments:
  [COMMAND]...  DNF command and arguments to execute

Options:
  -C, --config <CONFIG>                 Path to avocado.toml configuration file [default: avocado.toml]
  -v, --verbose                         Enable verbose output
  -t, --target <TARGET>                 Target architecture
      --container-arg <CONTAINER_ARGS>  Additional arguments to pass to the container runtime
      --dnf-arg <DNF_ARGS>              Additional arguments to pass to DNF commands
  -h, --help                            Print help

```
