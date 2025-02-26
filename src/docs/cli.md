---
title: Getting started
---

# Peridio command line interface overview

Peridio CLI, or `peridio`, is a command-line interface to Peridio for use in your terminal or your scripts.

It aims to have complete support for the [Peridio Admin API](/admin-api).

## Installation

`peridio` is available as a downloadable binary from the [releases page](https://github.com/peridio/morel/releases).

### Upgrade

The CLI can upgrade itself in place via `peridio upgrade`.

## Precedence of supplied values

Options can be supplied in up to three ways, from highest to lowest precedence:

1. CLI arguments
2. Environment variables
3. Configuration files

## Configuration files

The Peridio CLI supports profile based configuration files as a means of supplying options that are relevant to many subcommands. A particular profile can be choosen explicitly via [--profile](#profile). To use this functionality you must specify at least a [config.json](#configjson) file and optionally, if you wish to specify API keys via this method, a [credentials.json](#credentialsjson) in the same directory.

By default, the directory searched for these files is:

| OS | Default Config Directory |
| - | - |
| Linux | `$HOME/.config/peridio` |
| Windows | `{FOLDERID_RoamingAppData}/peridio/config`|
| macOS | `$HOME/Library/Application\ Support/peridio` |

To override this directory, see [--config-directory](#config-directory).

### config.json

Contains a single object of the format:

```json title="Example"
{
  "version": 1,
  "profiles": {
    "my-profile-name": {
      "organization_name": "my-organization-name"
    }
  },
  "signing_key_pairs": {
    "my-signing-key-pair-name": {
      "signing_key_prn": "prn:1:b8af964b-2736-423c-852b-a19d05e00d83:signing_key:15ba050a-82ee-4381-b461-d42181f9a81b",
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

```json title="Schema"
{
  "version": VERSION,
  "profiles": {
    PROFILE_NAME: {
      "base_url": BASE_URL,
      "ca_path": CA_PATH,
      "organization_name": ORGANIZATION_NAME
    }
  },
  "signing_key_pairs": {
    SIGNING_KEY_PAIR_NAME: {
      "signing_key_prn": SIGNING_KEY_PRN,
      "signing_key_private_path": SIGNING_KEY_PRIVATE_PATH
    }
  },
  "ca_certificates": {
    CA_CERTIFICATE_NAME: {
      "certificate": CA_CERTIFICATE_PATH,
      "private_key": PRIVATE_KEY_PATH
    }
  }
  ...
}
```

<table>
  <thead>
    <tr>
      <th>Field</th>
      <th>Required</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>VERSION</td>
      <td><code>true</code></td>
      <td>integer</td>
      <td>
        Should be <code>1</code>. See <a href="#versioning">versioning</a>.
      </td>
    </tr>
    <tr>
      <td>PROFILE_NAME</td>
      <td><code>false</code></td>
      <td>string</td>
      <td>The name of a profile. Corresponds to an entry in <a href="#credentialsjson">credentials.json</a>. A particular profile can be choosen explicitly via <a href="#profile">--profile</a>.</td>
    </tr>
    <tr>
      <td>BASE_URL</td>
      <td><code>false</code></td>
      <td>string</td>
      <td>See <a href="#base-url">--base-url</a>.</td>
    </tr>
    <tr>
      <td>CA_PATH</td>
      <td><code>false</code></td>
      <td>string</td>
      <td>See <a href="#ca-path">--ca-path</a>.</td>
    </tr>
    <tr>
      <td>ORGANIZATION_NAME</td>
      <td><code>false</code></td>
      <td>string</td>
      <td>See <a href="#organization-name">--organization-name</a>.</td>
    </tr>
    <tr>
      <td>SIGNING_KEY_PAIR_NAME</td>
      <td><code>false</code></td>
      <td>string</td>
      <td>The name of a signing key pair. Some commands that make use of signing keys will let you reference this configuration by name.</td>
    </tr>
    <tr>
      <td>SIGNING_KEY_PRN</td>
      <td><code>true</code></td>
      <td>string</td>
      <td>The PRN of the signing key that corresponds to the private key identified by the sibling <i>SIGNING_KEY_PRIVATE_PATH</i> field.</td>
    </tr>
    <tr>
      <td>SIGNING_KEY_PRIVATE_PATH</td>
      <td><code>true</code></td>
      <td>string</td>
      <td>The path to a <a href="/platform/reference/signing-keys#pem">private key's PEM file</a>.</td>
    </tr>
    <tr>
      <td>CA_CERTIFICATE_NAME</td>
      <td><code>false</code></td>
      <td>string</td>
      <td>The name of a CA certificate. Some commands that make use of CA certificates will let you reference this configuration by name.</td>
    </tr>
    <tr>
      <td>CA_CERTIFICATE_PATH</td>
      <td><code>true</code></td>
      <td>string</td>
      <td>The path to a <a href="/platform/reference/ca-certificates">CA certificate's</a> PEM file.</td>
    </tr>
    <tr>
      <td>PRIVATE_KEY_PATH</td>
      <td><code>true</code></td>
      <td>string</td>
      <td>The path to a <a href="/platform/reference/ca-certificates">CA certificate's</a> private key's PEM file.</td>
    </tr>
  </tbody>
</table>

### credentials.json

Contains a single object of the format:

```json title="Example"
{
  "my-profile-name": {
    "api_key": "my-api-key"
  }
}
```

```json title="Schema"
{
  PROFILE_NAME: {
    "api_key": API_KEY
  },
  ...
}
```

<table>
  <thead>
    <tr>
      <th>Field</th>
      <th>Required</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>PROFILE_NAME</td>
      <td><code>false</code></td>
      <td>string</td>
      <td>The name of a profile. Must correspond to an entry in <a href="#configjson">config.json</a>. A particular profile can be choosen explicitly via <a href="#profile">--profile</a>.</td>
    </tr>
    <tr>
      <td>API_KEY</td>
      <td><code>false</code></td>
      <td>string</td>
      <td>See <a href="#api-key">--api-key</a>.</td>
    </tr>
  </tbody>
</table>

## Global options

Global options are options that are relevant to many commands. They are supplied after `peridio` but before a command, e.g., `peridio --profile foo products list`.

### API key

`-a`, `--api-key <api-key>`, `$PERIDIO_API_KEY`

The API key used to authenticate and authorize requests against the Peridio Admin API.

Can be provided via configuration files.

### Base URL

`-b`, `--base-url <base-url>`, `$PERIDIO_BASE_URL`

Defaults to `https://api.cremini.peridio.com`.

The base URL of the Peridio Admin API.

Can be provided via configuration files.

### CA path

`-c`, `--ca-path <ca-path>`, `$PERIDIO_CA_PATH`

A path identifying a file containing PEM encoded CA certificates to additionally trust when making API requests.

Can be provided via configuration files.

### Config directory

`-d`, `--config-directory <config-directory>`, `$PERIDIO_CONFIG_DIRECTORY`

Defaults to `$HOME/Library/Application\ Support/peridio` on macOS.

A path identifying the directory the CLI should look within to find Peridio CLI configuration files.

### Organization name

`-o`, `--organization-name <organization-name>`, `$PERIDIO_ORGANIZATION_NAME`

If applicable, the case-sensitive name of the organization against which Peridio Admin API requests will be executed.

Can be provided via configuration files.

### Profile

`-p`, `--profile <profile>`, `$PERIDIO_PROFILE`

Explicitly chooses a profile within a [config.json](#configjson) to use. See [configuration files](#configuration-files).

## Versioning

The current version of the CLI is `1`.

### Stale configs

Starting with version `0.8.0`, the CLI will halt and prompt you to upgrade your config if it is stale.

### Unversioned configs

The very first iteration of a config file was unversioned, accordingly, that "version" is identified by a config file that does not have a `version` key.
