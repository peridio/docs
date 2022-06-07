---
title: Nerves
---

<head>
  <title>Ref | Peridio for Nerves</title>
</head>

## Migrating from nerves-hub.org

Following the automatic migration of users and organizations from nerves-hub.org to Peridio, you will be able to log in and manage your devices at console.cremini.peridio.com. Your devices will automatically be connected to the new service by the DNS redirect from device.nerves-hub.org to device.cremini.peridio.com. It is highly recommended that you update your device firmware to connect directly to Peridio by following the next steps:

### User authentication

Start by ensuring that the nerves_hub_cli tools can communicate with Peridio for Nerves by updating your project to use the new server location:

```elixir
config :nerves_hub_user_api,
  host: "api.cremini.peridio.com"
```

Once your configuration is updated, you can re-authenticate with the server by running

```elixir
mix nerves_hub.user auth
```

### Device connectivity

You will need to update your mix project configuration to instruct the nerves_hub_link dependency to connect directly to Peridio instead of going through the nerves-hub.org redirects. Editing your mix config.exs to change the server location:

```elixir
config :nerves_hub_link,
  device_api_host: "device.cremini.peridio.com"
```

### Pushing a new release

Thats it, once your project has been updated you will be able to `mix firmware` and push a new release to Peridio for Nerves just as you would when using nerves-hub.org. All existing nerves-hub documentation can be used as a reference. If you run into any issues, you can reach out to us at support@peridio.com.
