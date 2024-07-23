# Getting Started

`peridiod` is a reference implementation of a Peridio Agent for Embedded Linux.

Peridio offers several ways to integrate peridiod into your build workflow via the following integration paths:

* Build system integration with [Yocto](../build-tools/yocto) or [Buildroot](../build-tools/buildroot)
* Leverage one of our pre compiled artifacts from the [Github releases page](https://github.com/peridio/peridiod/releases)
* Running in a container leveraging one of our [official container images](https://hub.docker.com/r/peridio/peridiod).
* Cross-Compiling as part of your custom build tools.
* As part of an existing [Elixir based application](https://github.com/peridio/peridio-nerves-example).

Connecting Peridiod to Peridio Cloud requires your device to have an x509 certificate that represents its unique identity. Peridiod supports storing your x509 certificate and key pair in several locations ranging from insecure to most secure. The following key pair sources are supported:

* Filesystem: PEM Files on a mounted filesystem.
* Environment: Base64 encoded PEM content stored in environment variables.
* UBootEnv: Base64 encoded PEM content stored in the UBoot Environment.
* PKCS11: A PKCS#11 provider like an HSM, ARM TrustZone, or other secure storage.

To get started using peridiod in your device check out the following guides:

* [Configuring](configuration)
* [Bundling Updates](updates)
* [Running in Containers](containers)
