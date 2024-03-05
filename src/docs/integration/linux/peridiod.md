# peridiod

`peridiod` is a reference implementation of a Peridio Agent for Embedded Linux. Peridio offers several ways to integrate peridiod into your build workflow via several integration paths:

* [yocto](build-tools/yocto)
* [buildroot](build-tools/buildroot)

## Configuring

Peridiod is configured via a json formatted file on the filesystem. The location of the file defaults to `$XDG_CONFIG_HOME/peridio/peridio-config.json`. if `$XDG_CONFIG_HOME` is not set the default path is `$HOME/.config/peridio/peridio-config.json`. This file location can be overwritten by setting `PERIDIO_CONFIG_FILE=/path/to/peridio.json`. The peridiod configuration has the following top level keys:

* `version`: The configuration version number. Currently this is 1.
* `device_api`: Configuration for the device api endpoint
  * `certificate_path`: Path to the device api ca certificate.
  * `url`: The peridio server device api URL.
  * `verify`: Enable client side ssl verification for device api connections.
* fwup: Keys related to the use of fwup for the last mile.
  * `devpath`: The block storage device path to use for applying firmware updates.
  * `public_keys`: A list of authorized public keys used when verifying update archives.
* `remote_shell`: Enable or disable the remote console feature.
* `node`: Node configuration settings
  * `key_pair_source`: Options are `file`, `uboot-env`, `pkcs11`. This determines the source of the identity key information.
  * `key_pair_config`: Different depending on the `key_pair_source`

    `key_pair_source: file`:
      * `private_key_path`: Path on the filesystem to a PEM encoded private key file.
      * `certificate_path`: Path on the filesystem to a PEM encoded x509 certificate file.

    `key_pair_source: uboot-env`:
      * `private_key`: The key in the uboot environment which contains a PEM encoded private key.
      * `certificate`: The key in the uboot environment which contains a PEM encoded x509 certificate.

    `key_pair_source: pkcs11`:
      * `key_id`: The `PKCS11` URI used to for private key operations.
        Examples:
        ATECCx08 TNG using CryptoAuthLib: `pkcs11:token=MCHP;object=device;type=private`
      * `cert_id`: The `PKCS11` URI used for certificate operations.
        Examples:
        ATECCx08 TNG using CryptoAuthLib: `pkcs11:token=MCHP;object=device;type=cert`

For more information about X509 certificates, see [creating CA certificates](/platform/guides/creating-x509-certificates-with-openssl).

### Example Configurations

#### Common

```json
{
  "version": 1,
  "device_api": {
    "certificate_path": "/etc/peridiod/peridio-cert.pem",
    "url": "device.cremini.peridio.com",
    "verify": true
  },
  "fwup": {
    "devpath": "/dev/mmcblk1",
    "public_keys": ["I93H7n/jHkfNqWik9uZf82Vi/HJuZ24EQBJnAtj9svU="]
  },
  "remote_shell": true,
  "node": {
    // ... see Node Configuration
  }
}
```

#### Node Configurations

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

PKCS11 Identity using ATECC608B TrustAndGo

```json
"key_pair_source": "pkcs11",
"key_pair_config": {
  "key_id": "pkcs11:token=MCHP;object=device;type=private",
  "cert_id": "pkcs11:token=MCHP;object=device;type=cert"
}
```

### Packaging Updates

peridiod currently supports updates packaged using. When an update is applied, the fwup upgrade instructions will be executed for the current system. These instructions can perform a variety of functions such as, manage partitions, write raw filesystems, update U-Boot environment variables and files, etc. More information about fwup functionality can be found on the [fwup README](https://github.com/fwup-home/fwup).

An example fwup configuration for the QEmu target can be found in the `meta-avocado-arm` [reference layer](https://github.com/peridio/meta-avocado/blob/main/meta-avocado-arm/conf/peridio/qemu.fwup.conf).
