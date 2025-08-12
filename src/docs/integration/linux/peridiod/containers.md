# Containerizing peridiod

Peridiod can be run from within a container for testing, development, and production use cases. For example, [Peridio EVK](/evk) leverages containerized peridiod for managing virtual devices. Running peridiod in a container orchestrator requires several considerations.

- Access to the UBoot Environment for state storage.
- Access to `/dev` devices to perform block level operations when modifying partitions etc with tools like fwup or swupdate.
- `NET_ADMIN` capabilities for managing network interfaces for use with remote access tunnels.
- Access to the chosen identity provider.
  - `file`: bind mount a host directory that contains the certificate / key pair.
  - `env`: Pass the base 64 encoded PEM into environment variables directly from the run command.
  - `uboot-env`: Access ot the host u-boot environment, or you can construct a u-boot environment file and bind mount it in a directory from the host.
  - `pkcs11`: Access to shared libraries and or device files required by the pkcs11 engine / provider.

## Running a container

You can run peridiod from a container using any OCI container orchestration engine such as docker and kubernetes. Container images are produced for every peridiod tagged release for amd64 (x86_64) and arm64 architectures and uploaded to docker-hub. peridiod will need to store state between reboots and therefore it is advised to either attach a instance specific volume or bind mount an instance specific host directory to the container.

A simple and common approach to getting started with containers is to bind mount a host directory over `/etc/peridiod`. Peridiod containers are configured to look in this directory for the `peridio.json` configuration file.

Here is an example from the Peridio EVK of a host directory we will bind mount into the container. In this example we are assuming the device identifier to be `EI-ML-0001`:

```bash
EI-ML-0001
    ├── device-certificate.pem
    ├── device-private-key.pem
    ├── fw_env.config
    ├── peridio.json
    └── uboot.env
```

Here is what the `peridio.json` file looks like:

```json
{
  "version": 1,
  "cache_dir": "/etc/peridiod/cache",
  "release_poll_enabled": true,
  "remote_shell": true,
  "targets": ["arm64-v8"],
  "remote_access_tunnels": {
    "enabled": true,
    "service_ports": [22]
  },
  "node": {
    "key_pair_source": "file",
    "key_pair_config": {
      "private_key_path": "/etc/peridiod/device-private-key.pem",
      "certificate_path": "/etc/peridiod/device-certificate.pem"
    }
  },
  "trusted_signing_keys": ["I93H7n/jHkfNqWik9uZf82Vi/HJuZ24EQBJnAtj9svU="]
}
```

In this example, we configure the node to use the certificate and private key files mounted into the container runtime as part of the bind mount. We have enabled remote access tunnels and allow connections over remote access tunnels to ssdh on 22.

To run the container we would execute the following command:

```bash
docker run -it --rm -v "EI-ML-0001":/etc/peridiod:z --cap-add=NET_ADMIN --entrypoint /etc/peridiod/entrypoint.sh peridio/peridiod:latest
```

## Overriding the entrypoint

There are occasions where you may want to override the entrypoint of a container image to customize the container runtime before launching peridiod. The following examples come from our [Peridio EVK](/evk) and demonstrate overriding the entrypoint to configure sshd before starting the service.

You can include a custom `entrypoint.sh` in your bind mounted directory:

```bash
EI-ML-0001
    ├── device-certificate.pem
    ├── device-private-key.pem
    ├── entrypoint.sh
    ├── fw_env.config
    ├── peridio.json
    └── uboot.env
```

Here is an example from [Peridio EVK](/evk) of an entrypoint script where we generate sshd keys add a simple username / password to our container (for demo purposes, do not do this in production!)

```bash
#!/usr/bin/env bash
ssh-keygen -A
addgroup "peridio"
adduser --disabled-password --ingroup "peridio" "peridio"
echo "peridio:peridio" | chpasswd
exec "$@"
```

When we run the container, we need to both override the entrypoint and pass the original command:

```bash
docker run -it --rm -v "EI-ML-0001":/etc/peridiod:z --cap-add=NET_ADMIN --entrypoint /etc/peridiod/entrypoint.sh peridio/peridiod:latest /opt/peridiod/bin/peridiod start_iex
```
