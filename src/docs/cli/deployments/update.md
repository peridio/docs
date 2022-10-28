---
title: update
---

# peridio deployments update

Update a deployment.

## Flags

`-h`, `--help`

Prints help information.

## Options

`--delta-updatable <delta-updatable>`

Is the deployment delta updatable.

`--tags <tags>`

The device tags list.

`--version <version>`

The version of the deployment. Must respect this format: https://hexdocs.pm/elixir/Version.html#module-requirements

`--name <name>`

The name of the deployment.

`--firmware-uuid <firmware-uuid>`

The firmare uuid.

`--is-active <is-active>`

Whether or not the deployment is active.

### Required

`--deployment-name <deployment-name>`

The name of the deployment.

`--organization-name <organization-name>`

The organization to interact with.

`--product-name <product-name>`

The name of the product.
