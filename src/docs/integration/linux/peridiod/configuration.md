# Configuring

Peridiod is configured via a json formatted file on the filesystem. The location of the file defaults to `$XDG_CONFIG_HOME/peridio/peridio-config.json`. if `$XDG_CONFIG_HOME` is not set the default path is `$HOME/.config/peridio/peridio-config.json`. This file location can be overwritten by setting `PERIDIO_CONFIG_FILE=/path/to/peridio.json`.

The peridiod configuration has the following top level keys:

- `version`: The configuration version number. Currently this is 1.
- `cache_dir`: A location on disk where peridiod can store intermediate files. This directory needs to be writable. Defaults to `/var/peridiod`
- `device_api`: Configuration for the device api endpoint
- `fwup`: Global keys related to the use of fwup.
- `remote_shell`: Enable or disable the remote getty feature.
- `remote_iex`: Enable or disable the remote IEx feature. Useful if you are deploying a Nerves distribution. Enabling this takes precedence over `remote_shell`
- `remote_access_tunnels`
- `update_poll_enabled`: (true | false) Enable or Disable update server polling
- `update_poll_interval`: (non negative integer) The interval in which the update server should poll for updates. Defaults to every 30 min.
- `trusted_signing_keys`: (list of strings) A list of raw ed25519 public signing keys. Binaries in peridio are signed by private keys that you own, this list should contain the public parts of the signing keys this device should trust installing.
- `targets`: (list of strings) A list of binary target strings. When peridiod received a bundle, it will install only binaries with target strings in this list. Defaults to `["portable"]`
- `node`: Node configuration settings

For more information about X509 certificates, see [creating CA certificates](/platform/guides/creating-x509-certificates-with-openssl).

## `node` options

- `key_pair_source`: Options are `file`, `uboot-env`, `pkcs11`. This determines the source of the identity key information.
- `key_pair_config`: Different depending on the `key_pair_source`

  `key_pair_source: file`:
  - `private_key_path`: Path on the filesystem to a PEM encoded private key file.
  - `certificate_path`: Path on the filesystem to a PEM encoded x509 certificate file.

  `key_pair_source: uboot-env`:
  - `private_key`: The key in the uboot environment which contains a PEM encoded private key.
  - `certificate`: The key in the uboot environment which contains a PEM encoded x509 certificate.

  `key_pair_source: pkcs11`:
  - `key_id`: The `PKCS11` URI used to for private key operations.
    Examples:
    ATECCx08 TNG using CryptoAuthLib: `pkcs11:token=MCHP;object=device;type=private`
  - `cert_id`: The `PKCS11` URI used for certificate operations.
    Examples:
    ATECCx08 TNG using CryptoAuthLib: `pkcs11:token=MCHP;object=device;type=cert`

Filesystem

```json
"key_pair_source": "file",
"key_pair_config": {
  "private_key_path": "/etc/peridiod/device-key.pem",
  "certificate_path": "/etc/peridiod/device.pem"
}
```

Environment

```json
"key_pair_source": "env",
"key_pair_config": {
  "private_key": "PERIDIO_PRIVATE_KEY",
  "certificate": "PERIDIO_CERTIFICATE"
}
```

U-Boot Environment

```json
"key_pair_source": "uboot-env",
"key_pair_config": {
  "private_key": "peridio_identity_private_key",
  "certificate": "peridio_identity_certificate"
}
```

PKCS11 Identity using ATECC608B TrustAndGo

```json
"key_pair_source": "pkcs11",
"key_pair_config": {
  "key_id": "pkcs11:token=MCHP;object=device;type=private",
  "cert_id": "pkcs11:token=MCHP;object=device;type=cert"
}
```

## `device_api` options

The device api options will default to enable connecting peridiod to the Peridio Cloud instance at peridio.com. You will need to modify these settings if you are using a Peridio OnPrem offering.

- `certificate_path`: Filesystem path to the device api ca certificate PEM file.
- `url`: The peridio server device api URL.
- `verify`: Enable client side ssl verification for device api connections.

## `fwup` options

The following keys inform how the use of distributions will be applied in the system. They will also act as a global default when using fwup installer. You can override these settings on a per binary basis by passing them in `installer_opts` for the [fwup installer](updates#installers)

- `devpath`: The block storage device path to use for applying firmware updates.
- `public_keys`: A list of authorized public keys used when verifying update archives.
- `extra_args`: A list of extra arguments to pass to the fwup command used for applying fwup archives. Helpful when needing to use the --unsafe flag in fwup.
- `env`: A json object of `"ENV_VAR": "value"` pairs to decorate the environment which fwup is executed from.

## `remote_access_tunnels` options

- `enabled` (true | false): Enable or disable remote access tunnels for the device.
- `service_ports` ([integer]): A list of device side service ports that remote access tunnels can be opened for.
- `persistent_keepalive` (integer): number in seconds keep alives should be sent for tunnels. Defaults to `25`.
- `hooks`:
  - `pre_up` (path): A path to an executable script to be executed before bringing up the tunnel network interface.
  - `post_up` (path): A path to an executable script to be executed after bringing up the tunnel network interface.
  - `pre_down` (path): A path to an executable script to be executed before tearing down the tunnel network interface.
  - `post_down` (path): A path to an executable script to be executed after tearing down the tunnel network interface.

See the [introduction to remote access](/platform/guides/introduction-to-remote-access) for more information on configuring and using remote access tunnels.

## Node configurations

Filesystem

```json
"key_pair_source": "file",
"key_pair_config": {
  "private_key_path": "/etc/peridiod/device-key.pem",
  "certificate_path": "/etc/peridiod/device.pem"
}
```

U-Boot Environment

```json
"key_pair_source": "uboot-env",
"key_pair_config": {
  "private_key": "peridio_identity_private_key",
  "certificate": "peridio_identity_certificate"
}
```

System Environment

```json
"key_pair_source": "env",
"key_pair_config": {
  "private_key": "PERIDIO_PRIVATE_KEY",
  "certificate": "PERIDIO_CERTIFICATE"
}
```

PKCS11 Identity using ATECC608B TrustAndGo

```json
"key_pair_source": "pkcs11",
"key_pair_config": {
  "key_id": "pkcs11:token=MCHP;object=device;type=private",
  "cert_id": "pkcs11:token=MCHP;object=device;type=cert"
}
```

## Examples

### Minimal keys required for cohort workflows

```json
{
  "version": 1,
  "update_poll_enabled": true,
  "update_poll_interval": 1800000,
  "trusted_signing_keys": ["I93H7n/jHkfNqWik9uZf82Vi/HJuZ24EQBJnAtj9svU="],
  "node": {
    // ... see Node Configuration
  }
}
```

### Minimal with remote access for SSH

```json
{
  "version": 1,
  "update_poll_enabled": true,
  "update_poll_interval": 1800000,
  "trusted_signing_keys": ["I93H7n/jHkfNqWik9uZf82Vi/HJuZ24EQBJnAtj9svU="],
  "remote_shell": true,
  "remote_access_tunnels": {
    "enabled": true,
    "service_ports": [22]
  },
  "node": {
    // ... see Node Configuration
  }
}
```

### Elixir and Nerves

The peridiod application can be set using config.exs in a Nerves based application. The following is an example of the keys that can be set:

```elixir
config :peridiod,
  device_api_host: "device.cremini.peridio.com",
  device_api_port: 443,
  device_api_sni: "device.cremini.peridio.com",
  device_api_verify: :verify_peer,
  device_api_ca_certificate_path: nil,
  key_pair_source: "env",
  key_pair_config: %{"private_key" => "PERIDIO_PRIVATE_KEY", "certificate" => "PERIDIO_CERTIFICATE"},
  fwup_public_keys: [],
  fwup_devpath: "/dev/mmcblk0",
  fwup_env: [],
  fwup_extra_args: [],
  remote_shell: false,
  remote_iex: true,
```

### U-Boot environment additions

peridiod will track and expose update metadata in the uboot environment under the following new keys

- `peridio_via_current`: the PRN of the current installed release or bundle override
- `peridio_via_previous`: the PRN of the previous installed release or bundle override
- `peridio_via_progress`: the PRN of the release or bundle override in progress
- `peridio_vsn_current`: the semantic version of the current installed release
- `peridio_vsn_previous`: the semantic version of the previous installed release
- `peridio_vsn_progress`: the semantic version of the release in progress
- `peridio_bin_current`: an concatenated key / value paired encoded string of `<binary_id><custom_metadata_sha256_hash>` internally used to diff installed binaries from bundle to bundle
- `peridio_bin_previous`: an concatenated key / value paired encoded string of `<binary_id><custom_metadata_sha256_hash>` internally used to diff installed binaries from bundle to bundle
- `peridio_bin_progress`: an concatenated key / value paired encoded string of `<binary_id><custom_metadata_sha256_hash>` internally used to diff installed binaries from bundle to bundle
- `peridio_bun_current`: the PRN of the current installed bundle
- `peridio_bun_previous`: the PRN of the previous installed bundle
- `peridio_bun_progress`: the PRN of the bundle install in progress
