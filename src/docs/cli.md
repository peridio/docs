# Getting Started

Peridio CLI, or `peridio`, is a command-line interface to Peridio for use in your terminal or your scripts.

## Installation

`peridio` is available as a downloadable binary from the [releases page](https://github.com/peridio/morel/releases).

### Upgrade

The CLI can upgrade itself in place via `peridio upgrade`.

## Precedence of Supplied Values

Options can be supplied in up to three ways, from highest to lowest precedence:

1. CLI arguments
2. Environment variables
3. Configuration files

## Configuration Files

The Peridio CLI supports profile based configuration files as a means of supplying options that are relevant to many subcommands. A particular profile can be choosen explicitly via [--profile](#profile). To use this functionality you must specify at least a `config.json` file and optionally, if you wish to specify API keys via this method, a `credentials.json` in the same directory.

By default the directory searched for these files is `$HOME/Library/Application\ Support/peridio` on macOS. To override this directory, see [--config-directory](#config-directory).

### config.json

Contains a single object of the format:

```json title="Example"
{
  "my-first-profile" : {
    "organization_name": "my-organizations-name"
  }
}
```

```json title="Schema"
{
  PROFILE_NAME: { 
    "base_url": BASE_URL,
    "ca_path": CA_PATH,
    "organization_name": ORGANIZATION_NAME
  },
  ...
}
```

***BASE_URL***

Optional. String. See [--base-url](#base-url).

***CA_PATH***

Optional. String. See [--ca-path](#ca-path).

***ORGANIZATION_NAME***

Optional. String. See [--organization-name](#organization-name).

***PROFILE_NAME***

The name of a profile. Can correspond to an entry in credentials.json. A particular profile can be choosen explicitly via [--profile](#profile).

### credentials.json

Contains a single object of the format:

```json title="Example"
{
  "my-first-profile" : {
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

***API_KEY***

Optional. String. See [--api-key](#api-key).

***PROFILE_NAME***

The name of a profile. Must correspond to an entry in `config.json`. A particular profile can be choosen explicitly via [--profile](#profile).

## Global Options

Global options are options that are relevant to many commands. They are supplied after `peridio` but before a command, e.g., `peridio --profile foo products list`.

### API Key

`-a`, `--api-key <api-key>`, `$PERIDIO_API_KEY`

The API key used to authenticate and authorize requests against the Peridio Admin API.

Can be provided via configuration files.

### Base URL

`-b`, `--base-url <base-url>`, `$PERIDIO_BASE_URL`

Defaults to `https://api.cremini.peridio.com`.

The base URL of the Peridio Admin API.

Can be provided via configuration files.

### CA Path

`-c`, `--ca-path <ca-path>`, `$PERIDIO_CA_PATH`

A path identifying a file containing PEM encoded CA certificates to additionally trust when making API requests.

Can be provided via configuration files.

### Config Directory

`-d`, `--config-directory <config-directory>`, `$PERIDIO_CONFIG_DIRECTORY`

Defaults to `$HOME/Library/Application\ Support/peridio` on macOS.

A path identifying the directory the CLI should look within to find Peridio CLI configuration files.

### Organization Name

`-o`, `--organization-name <organization-name>`, `$PERIDIO_ORGANIZATION_NAME`

If applicable, the case-sensitive name of the organization against which Peridio Admin API requests will be executed.

Can be provided via configuration files.

### Profile

`-p`, `--profile <profile>`, `$PERIDIO_PROFILE`

Explicitly chooses a profile within a `config.json` to use. See [configuration files](#configuration-files).
