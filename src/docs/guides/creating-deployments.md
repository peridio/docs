# Creating Deployments

This guide describes how to create deployments.

To learn more about Peridio deployments in general, see the [deployments](/reference/deployments) reference.

## Prerequisites

- [Peridio CLI](https://github.com/peridio/morel/releases).
  - Last tested with version 0.8.0.

In order to create a deployment it must be associated with a preexisting product and firmware. To learn how to create a product, see the [creating products](/guides/creating-products) guide. To learn how to create firmware, see the [creating firmware](/guides/creating-firmware) guide.

## Create Deployment

### Web Console

See the [Peridio Web Console](https://console.cremini.peridio.com).

### CLI

```
peridio deployments create \
  --firmware-uuid abc \
  --name "My Deployment" \
  --product-name "My Product" \
  --tags tag1,tag2
```

### API

Use the Peridio Admin API [create-a-deployment](/admin-api#deployments/operation/create-a-deployment) endpoint.
