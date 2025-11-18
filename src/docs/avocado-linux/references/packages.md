---
sidebar_position: 3
---

# Packages

Avocado compiles and distributes millions of packages that cover a majority of common use cases.

The following sections detail how Avocado categorizes packages as well as what options are
available to users that wish to bring their own packages or wish to request Avocado to support
additional packages.

## Managed

Avocado considers a package "managed" if it is served from an Avocado repository.

Managed packages may be public or private.

### Public

Most managed packages are public: they are generally available from Avocado
repositories to all users.

:::tip don't see what you want?
If you wish a package was available in a managed, public fashion from Avocado, please submit a
request for our team's consideration.
:::

Users may reach out in the following ways:

- Enterprise users: Slack
- Community users: [Discord](https://www.peridio.com/join-our-discord)

Please include the following information in the request as applicable:

- Package name.
- Package version considerations.
- Use case / reasoning.
- Link to package source code / prior art.

#### Consideration criteria

Every package is handled case-by-case, but generally we consider:

- Community relevance
- Build complexity
- Build time
- Output size

For example, a package that is challenging and slow to build, with a giant output, that only a
single user would ever use is extremely unlikely to ever be supported as a managed, public
package. For packages like that, see [managed, private packages](#private), as well as [unmanaged
packages](#unmanaged).

### Private

:::info roadmapped
This functionality is not yet generally available. If you are an interested user, we would love to
talk. Please [contact us](https://www.peridio.com/contact).
:::

Some managed packages are private, which is to say they are selectively availabe from Avocado
repositories to authorized users.

## Unmanaged

Unmanaged packages are otherwise obtained (e.g. built and included via an
[extension](/avocado-linux/references/extensions), sourced from non-Avocado repositories, etc.).
