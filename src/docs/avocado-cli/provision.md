```
Provision a runtime (shortcut for 'runtime provision')

Usage: avocado provision [OPTIONS] --runtime <RUNTIME>

Options:
  -C, --config <CONFIG>
          Path to avocado.toml configuration file [default: avocado.toml]
  -v, --verbose
          Enable verbose output
  -f, --force
          Force the operation to proceed, bypassing warnings or confirmation prompts
  -r, --runtime <RUNTIME>
          Runtime name to provision
  -t, --target <TARGET>
          Target architecture
      --provision-profile <PROVISION_PROFILE>
          Provision profile to use
      --env <ENV>
          Environment variables to pass to the provision process
      --container-arg <CONTAINER_ARGS>
          Additional arguments to pass to the container runtime
      --dnf-arg <DNF_ARGS>
          Additional arguments to pass to DNF commands
  -h, --help
          Print help

```