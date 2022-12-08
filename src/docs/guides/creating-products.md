# Creating Products

This guide describes how to create produts.

To learn more about Peridio products in general, see the [products](/reference/products) reference.

## Prerequisites

- [Peridio CLI](https://github.com/peridio/morel/releases).
  - Last tested with version 0.3.0.

## Create Product

### Web Console

See the [Peridio Web Console](https://console.cremini.peridio.com).

### CLI

```
peridio products create \
  --name "My Product"
```

### API

Use the Peridio Admin API [create product](/admin-api#tag/Products/paths/~1orgs~1%7Borganization_name%7D~1products/post) endpoint.
