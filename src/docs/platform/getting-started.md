# Getting started

Hello, and welcome to Peridio.

If you're reading this, you're either evaluating our platform for use in your project, looking for a reasonable starting point for how to go about integration, or hoping to replicate our functionality and launch a competing product.

Either way, we're glad you're here

Peridio, at its core, is a CI/CD platform for embedded devices. We support multiple device types and integration strategies, and give our customers high-level tools and control to enable safe collaboration for software built for embedded or distributed environments. Additionally, in the case of embedded linux environments, we even provide the ability to remotely connect to and access remote systems via wireguard.

We consider ourselves the #1 solution for generalized software distribution to the edge.

## FAQs

- **How long does the setup process typically take?** The initial setup process described in this guide typically takes less than 20 minutes for a new user, including account creation, CLI setup, and performing your first simulated update.
- **Does this guide cover device integration?** Not at this time. This guide covers cloud-only integration and how to issue simulated device updates. This approach is most commonly leveraged in API-only utilization of the Peridio platform.
- **Are all these steps required for every update?** Absolutely not. This guide exists to introduce you to the core concepts of Peridio. In real-world use, 90% of this is automated leveraging just a few CLI commands. If you're interested in how to "speed run" file upload to delivery, we suggest you look into leveraging "bundle overrides".
- **How does Peridio ensure secure updates?** Peridio uses code signing with a key pair system where your private key signs the firmware and devices verify authenticity using the public key before accepting updates.
- **What's a common issue with CLI setup?** Users often face confusion with the config.json and credentials.json setup. Make sure your organization names match exactly between files, and that your signing key paths are correct. Also, verify that your API key is properly formatted without any extra spaces or line breaks.

## Guide overview

This guide will walk you through the process of readying a firmware for release, and simulating final the update through leveraging our CLI. In the interest of simplicity, *we are going to make a few assumptions*, but feel free to detour at any point and explore the broader product and platform.

In this guide, we'll walk through the following steps:

1. Account creation
2. Initialize a product, cohort, and device
3. CLI setup
4. Creating and registering signing keys
5. Creating binaries
6. Creating a release
7. Performing a simulated update

## Account creation

In order to get started with Peridio, you will first need an active account associated to an organization. In order to get an account, please submit the [following form](https://www.peridio.com/sign-up) and await confirmation. Soon after, you'll receive an email from our team confirming creation of your account and an invitation to the organization in your email domain.

After accepting the invitation and logging in — you'll see your fleet with 0 initial devices. Congratulations!

<img src="/img/getting-started/fleet-view.png" width="auto" />

## Creating a product, device, and cohort

### Creating a product

Navigate to the Products tab, and create "create product". You'll need to enter the product name and click "save".

Following that, you'll be able to see your first product listed in the products table.

<img src="/img/getting-started/products.png" width="auto" />

Similarly, you'll need to create

1. a cohort
2. a device

### Creating a cohort

Now, navigate to the Cohorts tab, and click "create cohort". You'll need to enter the cohort name, description, and associate that cohort to a product.

Now click "save". You can see that cohort in the cohorts table.

<img src="/img/getting-started/cohorts.png" width="auto" />

### Creating a device

Last, let's navigate to the Devices tab and repeat this process. We'll want this device to be related to this product, cohort, and optionally, you can specify a target.

<img src="/img/getting-started/devices.png" width="auto" />

So, at this point we should have the following hierarchy:

**Product**: my-first-product

**Cohort**: my-first-cohort

**Device**: device-001

Ok, now that we have a device, we're going to want to upload software to the platform for distribution. Given that this requires code-signing, the most efficient way to perform these actions are from the CLI.

So, lets get that set up.

## CLI setup

The Peridio CLI is simply a wrapper around our  Rest-based API. [Full documentation for the CLI is available here.](https://docs.peridio.com/cli)

To get started, we'll need to

1. download the CLI
2. configure our preferences and secrets
3. and verify successful communication

Ok, lets get into it.

### Downloading the CLI

Go ahead and download the `peridio` cli from our releases page on Github [here](https://docs.peridio.com/cli).

### Configuring the CLI

To keep things simple, we'll assume you're on OS X. If that is not the case, you'll want to update the paths to match your specific environment, as documented here: [configuration-files](https://docs.peridio.com/cli#configuration-files).

There are two files we need to manage:

1. config.json - example available [here](https://docs.peridio.com/cli#configjson)
2. credentials.json - example available [here](https://docs.peridio.com/cli#credentialsjson)

Think of the `config.json` as the store for your peridio profiles and preferences, and the `credentials.json` as the associated secret store for each organization you belong to.

First, create the files:

```bash
# default configuration files location for OS X

touch $HOME/Library/Application\ Support/peridio/config.json
touch $HOME/Library/Application\ Support/peridio/credentials.json
```

Now that we have the CLI installed and the configurations created, lets set up our `config.json`. Copy the default config from [here](https://docs.peridio.com/cli#configjson), and paste it into the file we created above.

We'll want to replace `my-profile-name` and `my-organization-name` with our organization, in this case `peridio-b-demo`. Note that the profile name could be whatever is convenient for you. We can leave the signing key details in place for now, we'll replace them in a bit.

`$HOME/Library/Application\ Support/peridio/config.json`:

```json
{
  "version": 1,
  "profiles": {
    "peridio-b-demo": {
      "organization_name": "peridio-b-demo"
    }
  },
  "signing_key_pairs": {
    "signing-key-pair-name": {
      "signing_key_prn": "prn:xxxxxxxxxxxxxxxx"
      "signing_key_private_path": "private.pem"
    }
  },
  "ca_certificates": {
    "my-ca-certificate-name": {
      "certificate": "certificate.pem",
      "private_key": "private-key.pem"
    }
  }
}
```

Next, lets update our credentials (secrets). Copy the default config from [here](https://docs.peridio.com/cli#configjson), and paste it into the file we created above.

`$HOME/Library/Application\ Support/peridio/credentials.json`:

```json
{
  "my-profile-name": {
    "api_key": "my-api-key"
  }
}
```

Now that those are in place, we'll want to get an API key from the service. Go back to [console.peridio.com](http://console.peridio.com), and select API Keys from the left hand sidebar.

Now create a key, and copy that down. If you accidentally refresh and lose the value, just create another, you can have as many as you like (and they're easy to delete).

<img src="/img/getting-started/api-keys.png" width="auto" />

Now, paste that key into the `credentials.json` file, and update `my-profile-name` to match what you set in `config.json`. In this case, `peridio-b-demo`.

`$HOME/Library/Application\ Support/peridio/credentials.json`:

```json
{
  "peridio-b-demo": {
    "api_key": "OTNjYWZiMzItMThiNC00OTJiLWFmZTMtZmZiNGE2YTgwMWY0EPsDVhCb5dC3RIJdpoLaLwr8F0aMtc+5NbYiB2otVbg"
  }
}
```

### Verifying the CLI configuration

Now, if we've completed this copy/paste kung-fu correctly, we'll be able to verify CLI communication.

We'll do this by running the `peridio users me` command, but specify the profile we just created by passing `---profile` flag into the CLI.

This is always the first argument supplied, following `peridio`. For example:

```bash
peridio --profile peridio-b-demo users me
```

Response:

```json
{"data":{"email":"bill@peridio.com","username":"idunno"}}
```

If you see `data`, you're in business.

## Creating and registering signing keys

Code signing adds a digital signature to your firmware, proving who created it and confirming it hasn't been tampered with. For embedded devices managed through Peridio, this verification step prevents unauthorized code from being installed, protecting your devices from potential security breaches. The process uses a key pair system where your private key signs the code and devices use the matching public key to verify authenticity before accepting updates.

### Creating and cloud-registering signing keys

The creation of signing keys is fairly straight forward and documented in this step: [here](https://docs.peridio.com/platform/guides/creating-signing-keys). Once you have the key-pair, you can either add it manually in the console, or register it via the CLI.

:::tip organization prn
If you happen to be prompted for `--organization-prn <ORGANIZATION_PRN>` you can retrieve that value from your organization's detail page by clicking the name of your organization at the top of the left hand menu.
:::

### Configuring signing keys into the CLI

Now that your signing keys are registered, we inform the CLI where they live locally so that it can leverage them during binary upload. This is accomplished by updating your `configuration.json` file to point to the correct location (remember when I said we'd come back to this earlier?).

Three items are important here:

1. The key-name will need to match the name of the key that you created in the last step. Ensure that this matches by going to Signing Keys in the left hand nav, and copy `name` from the key you provided.
2. The `signing_key_prn` is available in at console.peridio.com. Simply go to Signing Keys in the left hand nav, and copy the `prn` from the key you just uploaded.
3. The `signing_key_private_path` will need to point to the private certificate you generated earlier.

Your configuration should now look similar to the following:

```json
{
  "version": 1,
  "profiles": {
    "profile-name": {
      "organization_name": "peridio-b-demo"
    }
  },
  "signing_key_pairs": {
    "peridio-b-demo": {
      "signing_key_prn": "prn:1:3a0438c7-79e3-469b-9bc7-16380d1ef369:signing_key:f05f36eb-f4d6-412d-a447-7a746ddc8663"
      "signing_key_private_path": "$HOME/Development/keys/dev-keys/private.pem"
    }
  },
  "ca_certificates": {
    "ca-certificate-name": {
      "certificate": "certificate.pem",
      "private_key": "private-key.pem"
    }
  }
}
```

## Check in

- [x]  Account creation
- [x]  Initialize a product & device
- [x]  Configuring the development environment
- [x]  Creating and registering our signing keys
- [ ]  Creating binaries
- [ ]  Creating a release
- [ ]  Performing a simulated update

We're now on the home stretch — all that's remaining is to get our assets into peridio, create the release, and then perform the update.

## Creating a binary

Similar to the Product, Cohort and Device hierarchy, Artifacts, Versions and Binaries have a similar relationship. Given that we're already using the CLI, we're going to quickly create what we need with just a few commands.

### Create an artifact

Artifacts need association to a particular organization, when creating, make sure to pass in the `prn` of your parent organization.

```bash
peridio --profile peridio-b-demo artifacts create \
  --name my-first-artifact \
  --organization-prn prn:1:3a0438c7-79e3-469b-9bc7-16380d1ef369
```

Response:

```json
{
  "artifact": {
    "custom_metadata": null,
    "description": null,
    "inserted_at": "2025-02-26T02:15:41.584650Z",
    "name": "my-first-artifact",
    "organization_prn": "prn:1:3a0438c7-79e3-469b-9bc7-16380d1ef369",
    "prn": "prn:1:3a0438c7-79e3-469b-9bc7-16380d1ef369:artifact:71d1c1fa-81dc-4368-ac60-440679aff29e",
    "updated_at": "2025-02-26T02:15:41.584650Z"
  }
}
```

### Create a version

Taking the `prn` from the artifact, we can now create our `1.0.0` version.

```bash
peridio --profile peridio-b-demo artifact-versions create \
  --version 1.0.0 \
  --artifact-prn prn:1:3a0438c7-79e3-469b-9bc7-16380d1ef369:artifact:71d1c1fa-81dc-4368-ac60-440679aff29e
```

Response:

```json
{
  "artifact_version": {
    "artifact_prn": "prn:1:3a0438c7-79e3-469b-9bc7-16380d1ef369:artifact:71d1c1fa-81dc-4368-ac60-440679aff29e",
    "custom_metadata": null,
    "description": null,
    "inserted_at": "2025-02-26T02:19:58.249028Z",
    "organization_prn": "prn:1:3a0438c7-79e3-469b-9bc7-16380d1ef369",
    "prn": "prn:1:3a0438c7-79e3-469b-9bc7-16380d1ef369:artifact_version:25962ceb-896b-4a89-a94b-d8b1d1261795",
    "version": "1.0.0",
    "updated_at": "2025-02-26T02:19:58.249028Z"
  }
}
```

### Create a binary

Lets create a file

```bash
touch my-first-binary.fw
echo "Hello, Binary" >> my-first-binary.fw
```

We can now sign and upload our binary, note that we are providing a few key pieces of information here.

- `target`: any
- `content-path`: the location of the binary we are uploading
- `signing-key-pair`: the signing key we are referencing in our `configuration.json`
- `artifact-version-prn` : the artifact version that we are association this with

```bash
peridio --profile peridio-b-demo binaries create \
  --target any \
  --content-path my-first-binary.fw \
  --signing-key-pair peridio-b-demo \
  --artifact-version-prn prn:1:3a0438c7-79e3-469b-9bc7-16380d1ef369:artifact_version:25962ceb-896b-4a89-a94b-d8b1d1261795
```

### Creating a binary recap

So, click over to [console.peridio.com](http://console.peridio.com) and review what we've done by going to Artifacts.

Here you'll be able to see the Artifact, which has a Version, with an associated Binary.

**Artifact**: my-first-artifact

**Artifact Version**: 1.0.0

**Binary**: with a target of `any`, and status `signed`

<img src="/img/getting-started/artifacts.png" width="auto" />

<img src="/img/getting-started/artifact-versions.png" width="auto" />

<img src="/img/getting-started/binaries.png" width="auto" />

## Creating a release

Now, this next step can be completed either from the command line, or from [console.peridio.com](http://console.peridio.com) . Since we've gone through the last few commands in the CLI, lets skip back to the UI to tie it all together.

Lets first go to our cohorts list view and select `my-first-cohort`. Click "Releases" and you'll see an empty table.

<img src="/img/getting-started/empty-releases.png" width="auto" />

Click "+ Create" to initiate our first release.

Give the release a name, 1.0.0 and then select a Bundle. Note that none exist as we have yet to create any bundles and no prior releases exist.

<img src="/img/getting-started/release-bundle-selection.png" width="auto" />

That's ok! We'll just create a bundle in-line  for this release. In the contents section, click the `Artifact` drop menu, and select our artifact. Since we only have one version and one target available, they should auto-populate.

<img src="/img/getting-started/release-bundle-artifiact-selection.png" width="auto" />

For the remainder of the form, we'll keep it simple.

- Required: `false`
- Cohort Availability: `100%`
- Schedule Availability: click "now"
- Version: `1.0.0`
- Version Requirement: `>= 0.0.0`
- Disabled: `false`

Click Save and enter the launch confirmation code.

<img src="/img/getting-started/release-confirmation-code.png" width="auto" />

And navigating back to our release detail, we see that this relase has been created and is `active`

<img src="/img/getting-started/one-release.png" width="auto" />

## Updating our device

Last last piece, we now go to the device detail screen to see if its eligible for an update.

Go to Devices > Device > Overview and scroll down. You'll see a section at the bottom, Pending Updates.

<img src="/img/getting-started/device-overview.png" width="auto" />

And note that this device has "No pending updates", weird… didn't we just create that release?

Why yes, we did, but in order for a device to be eligible for an update, we must make known what version or bundle that device is currently running, as the server does NOT make those assumptions on behalf of the device.

### Checking to see if a device has an update

Lets get back to the CLI and see how updates actually work. We can check to see if a device has an update available using the `devices get-update` command:

```bash
peridio --profile peridio-b-demo devices get-update \
  --device-prn prn:1:3a0438c7-79e3-469b-9bc7-16380d1ef369:device:7d907b9d-3872-4957-a2af-4e2b273c3a4e
```

Response:

```text
error: the following required arguments were not provided:
  --release-prn <RELEASE_PRN>
  --bundle-prn <BUNDLE_PRN>
  --release-version <RELEASE_VERSION>
```

And we get back an error. This is because a device MUST make known its current state in order to receive and update. Lets assume this device is at `0.0.0` as that was the version requirement for our release.

```bash
peridio --profile peridio-b-demo devices get-update \
  --release-version 0.0.0 \
  --device-prn prn:1:3a0438c7-79e3-469b-9bc7-16380d1ef369:device:7d907b9d-3872-4957-a2af-4e2b273c3a4e
```

Response:

```json
{
  "status": "update",
  "bundle_prn": "prn:1:3a0438c7-79e3-469b-9bc7-16380d1ef369:bundle:346c6658-b281-4793-aafa-2d2dfd4ecc2d",
  "source_prn": "prn:1:3a0438c7-79e3-469b-9bc7-16380d1ef369:release:4e3092c6-b508-4692-969f-a8a40796d796",
  "source_type": "release",
  "manifest": [
    {
      "artifact_prn": "prn:1:3a0438c7-79e3-469b-9bc7-16380d1ef369:artifact:71d1c1fa-81dc-4368-ac60-440679aff29e",
      "artifact_version_prn": "prn:1:3a0438c7-79e3-469b-9bc7-16380d1ef369:artifact_version:25962ceb-896b-4a89-a94b-d8b1d1261795",
      "custom_metadata": null,
      "prn": "prn:1:3a0438c7-79e3-469b-9bc7-16380d1ef369:binary:58d38d95-faaa-4203-8c08-71f2d8ee595b",
      "hash": "403ccc806332775b59558608031ce2656bfee95b32229bdd9aed5aab433af55b",
      "signatures": [
        {
          "signing_key_prn": "prn:1:3a0438c7-79e3-469b-9bc7-16380d1ef369:signing_key:f05f36eb-f4d6-412d-a447-7a746ddc8663",
          "signature": "4052859E638991284519221D5C972123E0C11B58F99223D9F075FFD28B0DF7664045037251BF94C2F6F8B100203F4CBACFDF48C5B72010B010717755E675F00B"
        }
      ],
      "size": 14,
      "target": "any",
      "url": "https://s3.us-east-2.amazonaws.com/peridio-cremini-default-web/binaries/3a0438c7-79e3-469b-9bc7-16380d1ef369/58d38d95-faaa-4203-8c08-71f2d8ee595b?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAX2ZJDQVUSZ5MP2R2%2F20250226%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20250226T041329Z&X-Amz-Expires=86400&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBoaCXVzLWVhc3QtMiJGMEQCIDBU6TxBsNPpdkPSZ62UI3K5DojAxkQoSqEOSZXM7W7eAiAdGy6J2ys%2F8dq8Cy0dnJnx7kjGyYxQjiYjEaDg8rLN8Sr1AwhTEAMaDDUzODU2NzczODcyOSIMEFTG9D6KISBLV6OqKtID%2F9G3zLpXH807FzgTutqujkYXp3GHOw1x2eqR3eqhVbzui0Tx11E%2B74XLYMew1Gt%2BoGEgAKud4VwNDg3snz2g93g7o%2FTJNCwaYtLVaHeT3Do%2Bm%2Ff700O6FsePZLlS5QmKTpHfpDds%2BxtRE%2FOojMjPIB5UHkiQq3H%2BE5nwnNOjntatsxVim63UkZ5mGRvnuwlc%2Fj0fSnaxv7YAcw78IAJ0pdNqdh0s82vTq%2FbdDNIrY4IdDIdXya%2FhmSEhTuw6PjOgcsibQrWFY9TQCKejGlZm%2B31yWK%2BGw9%2Byb%2BOAUkKCU55rvsuSkqukPxpaD3O9IxA7SqBvw1HhCioOrPXpBJJhqfoRgLfoQ8VoiZdOSxI%2FUmNNmmFiDXPElqjlpQgDT%2B8SHI%2FHO1UXf3avbMKZU6vkOuJzcgMT2NVlH9YR8DeEgdwwKrnn1tJ4F6M1PY%2FOd6cVkaVBRYPZypwPAuFmd19vAJnRQxD5ylt45RGgteLfdNd6thfaGNLuFEaLoXGMjJwkIUvqjeilZf6kBExZdX%2FocZBJ7aZSai36tdpOum5VjGooifNzakUsrHdLd7R4J9Jb914lD8FfvtGTD0%2FCZX0dvLEpoMuX9tDrx0GyjLDAc0cEeTDK6Pm9BjqmAQv9RvnZUmgCpLe680LtSp8fhmVbFOueSuiyES026131E7uOy56nE2jP02%2Bc7AJCkHf%2F%2Bhi5tQig0eEouGRJZHFx%2BPi2O3A%2FlS7%2Fe5J0kta874ysaI%2FWZat9opKPTPsDJwHanZIZJAI86AIq5md%2FZ%2Boay9E2G9ZKW9yiO7Do8UCN8qtyHUMf7765RwjzKN%2BAOref2yUQ4RPI7pUbZRBf7aLvE%2F0QYLg%3D&X-Amz-SignedHeaders=host&X-Amz-Signature=8c1d26e67e7e544eb04f0e1ae2157841129b02c67baa5a05d7952299f0b46fcb"
    }
  ]
}
```

Evaluating that payload, it contains everything we need in order to apply that update in the field, specifically the value in `manifest:url` contains the pre-signed url of the file we wish to install.

### Simulating a device update

Now, lets simulate the actual update — if we want the server to "think" that this device took the update, we simply make the request again, but pass in the `release-prn` from that update (rather than the version), and pass in the `--write` flag. Note that we're pulling that `release-prn` from the source

```bash
peridio --profile peridio-b-demo devices get-update \
  --bundle-prn prn:1:3a0438c7-79e3-469b-9bc7-16380d1ef369:bundle:346c6658-b281-4793-aafa-2d2dfd4ecc2d \
  --release-prn prn:1:3a0438c7-79e3-469b-9bc7-16380d1ef369:release:4e3092c6-b508-4692-969f-a8a40796d796 \
  --device-prn prn:1:3a0438c7-79e3-469b-9bc7-16380d1ef369:device:7d907b9d-3872-4957-a2af-4e2b273c3a4e \
  --write
```

Response:

```json
{
  "status": "no_update",
  "bundle_prn": null,
  "source_prn": null,
  "source_type": null,
  "manifest": null
}
```

### Verifying that an update was registered in the console

And note, now when we go back to the console, we're reporting that the device has progressed to this release!

<img src="/img/getting-started/device-on-release.png" width="auto" />

## Wrapping up

This guide has walked you through the basics of using Peridio for embedded device firmware updates, but it's by no means an authoritative or exhaustive resource. We've covered the fundamental concepts and workflows to help you get started:

- Setting up your account and organization
- Creating your first product, cohort, and device
- Configuring your development environment
- Managing signing keys for secure updates
- Uploading binaries and creating releases
- Simulating device updates

We hope this introduction has provided you with a solid understanding of Peridio's core capabilities and workflow. From here, you can explore more advanced features through our comprehensive documentation, experiment with real device deployments, implement CI/CD pipelines, and leverage Peridio's APIs for deeper integration with your development processes.

If you have questions or need assistance, don't hesitate to reach out to our support team. We're excited to see what you'll build and deploy with Peridio!
