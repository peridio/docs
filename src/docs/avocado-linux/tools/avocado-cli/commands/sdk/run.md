```
Create and run an SDK container

Usage: avocado sdk run [OPTIONS] [COMMAND]...

Arguments:
  [COMMAND]...  Command and arguments to run in container

Options:
  -C, --config <CONFIG>                 Path to avocado.toml configuration file [default: avocado.toml]
  -t, --target <TARGET>                 Target architecture
      --name <NAME>                     Assign a name to the container
  -d, --detach                          Run container in background and print container ID
      --rm                              Automatically remove the container when it exits
  -i, --interactive                     Drop into interactive shell in container
  -v, --verbose                         Enable verbose output
  -E, --env                             Source the avocado SDK environment before running command
  -e, --extension <EXTENSION>           Mount extension sysroot and change working directory to it
  -r, --runtime <RUNTIME>               Mount runtime sysroot and change working directory to it
      --container-arg <CONTAINER_ARGS>  Additional arguments to pass to the container runtime
      --dnf-arg <DNF_ARGS>              Additional arguments to pass to DNF commands
      --no-bootstrap                    Skip SDK bootstrap initialization and go directly to container prompt
  -h, --help                            Print help

```
