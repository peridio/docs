# Creating Products

This guide describes how to create produts.

To learn more about Peridio products in general, see the [products](/reference/products) reference.

## Prerequisites

- [Peridio CLI](https://github.com/peridio/morel/releases) >= 0.11.0.

## Create Product

### Web Console

See the [Peridio Web Console](https://console.cremini.peridio.com).

### CLI

```
peridio products-v2 create \
  --name name \
  --organization-prn prn
```

### API

Use the Peridio Admin API [create-a-product-v2](/admin-api#products/operation/create-a-product-v2) endpoint.
