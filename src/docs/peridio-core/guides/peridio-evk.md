---
sidebar_position: 1
title: 'Peridio EVK'
description: 'Peridio Evaluation Kit for streamlined demonstration product configuration and deployment - familiarize yourself with Peridio Cloud features and setup.'
---

The Peridio EVK (Evaluation Kit) offers a streamlined approach to configuring and deploying a demonstration product that you can use to familiarize yourself with how Peridio Cloud can be configured and used. The EVK is designed to be run from your workstation and only requires access to a Peridio Cloud organization where it can deploy a sample product.

## Dependencies

To get started with the Peridio EVK you will need access to a workstation with the following requirements:

- Python 3.6+
- [Peridio CLI](/peridio-core/tools/peridio-cli/overview)
- docker

## Getting started

You can install the `peridio-evk` from PyPI

```bash
pip install peridio-evk
```

Once the Peridio EVK is installed, you will need the following to initialize an environment

- A Peridio Cloud organization

This should be an organization that you have administrative rights to create new products and operate within. If you are just getting started with Peridio, you can deploy the EVK into your desired corporate org. If you are new to Peridio, but operating from within an existing corporate organization and you wish to leverage the Peridio EVK to help familiarize yourself with Peridio, it is advised that you create a new organization.

- An API Key

You can generate a new API key in Peridio from the [API Authentication](https://console.peridio.com/settings/api-authentication) page. The generated token will only be displayed to you once, be sure to copy it down for the next steps.

### Initializing the EVK demo product

Initializing the Peridio EVK demo product is easy and can be done in a single step. From your command line execute the following

```bash
peridio-evk initialize --organization-name <ORGANIZATION_NAME> --organization-prn <ORGANIZARION_PRN> --api-key <API_KEY>
```

Replace the following tokens in the command with your values

- `<ORGANIZATION_NAME>`: This is the string value of the name of the organization Peridio EVK will deploy the demo product into. If this value contains spaces or special characters, you should wrap it in double quotes.
- `<ORGANIZARION_PRN>`: The PRN (Peridio Resource Name) of the organization. You can find the organization PRN from the [Organization List](https://console.peridio.com/organizations). Click the copy link next to the PRN column.
- `<API_KEY>`: The API key that you generated in the [API Authentication](https://console.peridio.com/settings/api-authentication) page

You should see output like the following:

```bash
📋 Initializing EVK
  ℹ Organization Name: evk-demo
  ℹ Organization PRN: prn:1:70c48079-0c40-4668-a7c2-3a15e003bc6b
  ℹ Product Name: edge-inference
  ℹ API key: <API_KEY>
Running this task may take several minutes to complete.
You may run this task over again in the case of errors as it will not duplicate data

Proceed? [y/N]:
```

You can run the above command against the same organization over again and it will not duplicate data. It will take some time to complete depending on your network connectivity.

As the Peridio EVK program executes, you'll notice a lot of output being presented in the console. Useful information will be presented with the following key

#### Tasks

```bash
📋 Creating Artifact
```

Tasks are top level items, They illustrate what part of the system is currently being configured

#### Sub tasks

```bash
  ℹ edge-inference-os: v1.12.1
  ℹ edge-inference-service: v1.5.3
  ℹ edge-inference-peripheral: v1.9.10
  ℹ edge-inference-model: v1.4.0
```

Subtasks provide more information about the data that is being used during the current task operation

#### File modifications

```bash
  📁 Modifying File: /home/username/.config/peridio/config.json
```

Rendered any time the Peridio EVK modifies a local file. Useful for tracking where Peridio EVK is storing data.

#### CLI commands

```bash
⬆️  CLI command: peridio --profile peridio-evk devices create --identifier EI-ML-0001 --product-name edge-inference --cohort-prn prn:1:70c48079-0c40-4668-a7c2-3a15e003bc6b:cohort:96686516-e2c0-4690-8405-343429cd9714 --tags canary --target arm64-v8
```

When Peridio EVK executes a Peridio CLI command, the command will be rendered to the console. This is helpful for understanding how you can use the Peridio CLI later to execute and configure your own commands in your CI / CD pipelines and development / production workflows.

CLI responses will be rendered just below the CLI command. For streaming operations, such as uploading binaries to Peridio Cloud, The test will be output in realtime as the CLI executes.

### EVK demo product overview

The Peridio EVK deploys a demo product called `edge-inference` into your organization which illustrates a common way to configure Peridio Cloud for use with an embedded device. The following resources are deployed into the organization:

Product:

- edge-inference

Cohorts:

- release
- release-debug
- daily-release
- daily-debug

Signing-Keys:

- release-signing-key
- release-debug-signing-key
- daily-release-signing-key
- daily-debug-signing-key

CA Certificates:

- Intermediate CA: edge-inference:release
- Intermediate CA: edge-inference:release-debug
- Intermediate CA: edge-inference:daily-release
- Intermediate CA: edge-inference:daily-debug

Artifacts, Versions, Binaries:

- edge-inference-os
  - v1.12.1
    - target: x86_64
    - target: arm64-v8
- edge-inference-service
  - v1.5.3
    - target: x86_64
    - target: arm64-v8
  - v2.0.0
    - target: x86_64
    - target: arm64-v8
- edge-inference-peripheral
  - v1.9.10
    - target: arm-cortex-m33
- edge-inference-model
  - v1.4.0
    - target: x86_64
    - target: arm64-v8
  - v2.1.0
    - target: x86_64
    - target: arm64-v8

Devices:

- EI-ML-0001
  - tags: canary
- EI-ML-0002
  - tags: canary
- EI-ML-0003
  - tags: JITP
- EI-ML-0004
  - tags: JITP
- EI-ML-0005
  - tags: JITP
- EI-ML-0006
  - tags: JITP

Releases:

- release-r1001
  - edge-inference-os v1.12.1
  - edge-inference-service v1.5.3
  - edge-inference-peripheral v1.9.10
  - edge-inference-model v1.4.0

- release-r1002
  - edge-inference-os v1.12.1
  - edge-inference-service v2.0.0
  - edge-inference-peripheral v1.9.10
  - edge-inference-model v2.1.0

The Peridio EVK simulates an environment where you have six devices, where four of the devices are Just-In-Time-Provisioned. These devices are in the release cohort and start on release-r1001. There is a release that has been staged for the release cohort titled release-r1002. This release will update the edge-inference-service and edge-inference-model to the latest version. The release is initially staged in a disabled state, and it is configured to deploy to only devices tagged with `canary`. Once you enable the release, and start virtual devices, the `canary` devices will begin to take an update.

### Running virtual devices

Peridio EVK can create, launch, and attach containerized devices using docker to demonstrate device updates and test remote capabilities.

:::info Remote Access Tunnels
Testing remote access tunnels using the Peridio EVK containerized devices will require running docker on a linux host with the wireguard kernel module enabled. Using remote access tunnels with Docker Desktop from a Mac, Windows, or Linux desktop will execute the containers inside a VM where the wireguard kernel extensions will not be enabled and will not function properly. You can still connect to these devices using the web based remote shell functionality.
:::

Peridio EVK will generate Identities for six devices.

Two of the six devices are already known to Peridio Cloud as they are registered during the initialization process. These devices are tagged with the `canary` tag. Once the next release is "enabled" these two devices will receive the update first.

The remaining four device identities are intended to demonstrate Just-In-Time-Provisioning to register these devices as they come online. This resembles a common production strategy where the certificates of devices may not be known to peridio at the time of manufacture and will instead be registered when they connect for the first time. After initial execution of the EVK, when you subsequently start these devices they will not be able to connect. This is because JITP is disabled. To allow these devices to be JITP'd and connect successfully you must enable JITP for the relevant CA certificate in the web console.

#### Enabling JITP

In the left side-bar of the web console navigate to the CA Certificates section to view the certificates, there will be four. The one we want to click into has a description that starts with `Intermediate CA: edge-inference:release.` (not debug or daily). Edit that certificate, check the box to enable JITP, and enter the following information:

- Description: `JITP`
- Product: `edge-inference`
- Cohort: `release`
- Target: `arm64-v8`
- Tags: `JITP`

Note that once you hit save devices 3, 4, 5, and 6 will be able to successfully JITP. If you have already started the virtual devices it may take a minute for their re-connection attempt to occur. If you haven't started them yet, read on.

#### Starting virtual devices

To start the virtual devices execute the following:

```bash
peridio-evk devices-start --tag latest
```

Peridio EVK will first pull the latest container image from docker-hub for `peridio/peridiod:latest` and launch six containers with unique identities. These devices will appear in Peridio Cloud device list once running. If you have already "enabled" the staged `release-r1002`, the canary devices will immediately start updating.

#### Stopping virtual devices

To stop virtual devices execute the following command

```bash
peridio-evk devices-stop
```

Peridio EVK will stop all running container images.

#### Attaching to a virtual device container

You can attach to a virtual device container to inspect the process of placing release files by executing the following:

```bash
peridio-evk device-attach <DEVICE_IDENTIFIER>
```

Replace the token `<DEVICE_IDENTIFIER>` with the Peridio device identifier of the device that you want to attach your terminal to. For example `EI-ML-0001`. Once connected, you will receive a bash prompt where you can navigate and interact with the running container. Type `exit` to detach from the running container.

:::tip Trouble Attaching?
If you are having trouble attaching to a container using this command you can attach using docker directly with the following command:

```bash
docker exec -it peridio-<DEVICE_IDENTIFIER> /bin/bash
```

:::

### Next steps

Now that you have deployed the release-r1002 to the canary devices, its time to start deploying it to the rest of the fleet. Navigate to the release page in Peridio Cloud and edit the release. Change the "Cohort Availability" from Tags: Canary, to Percentage: %80. Once the release is saved two more of your devices should begin to take the update the next time they check for an update. Change this to 100% to deploy to the entire fleet. If you do not want to wait for the devices to poll for an update, you can stop / start the devices to force them to check for an update on boot.

Try out remote access with one of your running devices. Navigate to the Device detail page of a connected device and click the shell button. The username / password combo to log in to the virtual device is `peridio/peridio`.

To use remote access tunnels, Navigate to the device detail page of a device you would like to connect to and copy the PRN. Execute the following from the Peridio CLI:

```bash
peridio --profile <ORGANIZATION_NAME> tunnels create --device-prn <DEVICE_PRN> --device-tunnel-port 22 --wait 10
```

In the response, you will use the `tunnel.server_tunnel_port` as the ssh port for connecting to the machine and `tunnel.server_tunnel_ip_address`. Execute the following ssh command to connect through remote access tunnels to your virtual device:

```bash
ssh peridio@<server_tunnel_ip> -p <server_tunnel_ip_address>
```

:::tip Use `jq` to format output

Pipe Peridio CLI commands to `jq` for better formatting

```bash
peridio --profile evk users me | jq
{
  "data": {
    "email": "me@test.com",
    "username": "my_username"
  }
}
```

:::

After you are finished, you'll have configured a workstation with a functional Peridio CLI that can be used to create new products and begin working with real devices. Check out the [getting started guide](/peridio-core/guides/getting-started) for a good starting point to deploying peridiod onto real devices.
