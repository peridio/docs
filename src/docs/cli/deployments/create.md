---
title: create
---

# peridio deployments create

Create a deployment.

## Flags

`-h`, `--help`

Prints help information.

## Options

`--delta-updatable <delta-updatable>`

Is the deployment delta updatable.

`--version <version>`

The version of the deployment. Must respect this format: https://hexdocs.pm/elixir/Version.html#module-requirements

### Required

`--firmware-uuid <firmware-uuid>`

The firmare uuid.

`--name <name>`

The name of the deployment.

`--organization-name <organization-name>`

The organization to interact with.

`--product-name <product-name>`

The name of the product.

`--tags <tags>`

The device tags list.
