```
Usage: peridio bundles create [OPTIONS]

Options:
  -a, --artifact-version-prns <ARTIFACT_VERSION_PRNS>...
          The PRNs of the artifact versions to include binaries from in the bundle (API v1 only).

          Values can be provided by passing each value in a flag or by delimiting all values with ","

      --binaries <BINARIES>...
          The binaries to include in the bundle (API v2 only). Format: "prn=prn_value[;custom_metadata={json|null}]" where prn is required and custom_metadata is optional. custom_metadata can be: missing (no metadata), null (explicit null), or JSON object. Example: --binaries 'prn=prn:1:org:binary:id;custom_metadata={"version":"1.0"}' Example: --binaries 'prn=prn:1:org:binary:id;custom_metadata=null' Example: --binaries 'prn=prn:1:org:binary:id' (without metadata)

      --id <ID>
          A user provided custom UUID id for the bundle database record

      --name <NAME>
          The name of the bundle

  -h, --help
          Print help (see a summary with '-h')

```
