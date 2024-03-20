import ContentSectionTag from '@site/src/components/ContentSectionTag';

# Cloud Platform

The Peridio Cloud platform provides the [Admin API](/admin-api), [Device API](/device-api), [Web Console](https://console.peridio.com/), and Remote Access services.

## Content Sections

The cloud platform documentation is split into references and guides. The reference specifies the
concepts and resources that make up Peridio. If you wish to explore Peridio conceptually, or know exactly what
you're looking for, the reference is likely what you want. The guides thread together the concepts
from the reference into multi-step activities. If you're trying to see the bigger picture, or move
quickly through a task, the guides are likely what you want.

### Reference

The [reference](/platform/reference/overview) section enumerates and describes all Peridio resources.

### Guides

The [guides](/platform/guides/introduction-to-binary-management) section demonstrates how to manage Peridio resources.


## Content Subsections

Sections across the reference and guides typically group content into the following subsections:

- **Account Management:** Users and organizations.
- **Binary Management:** Uploading and signing digital assets.
- **Device Management:** Certificates, products, cohorts, and devices.
- **Integration Management:** Webhooks.
- **Release Management:** Bundling and distributing digital assets.
- **Remote Access:** Tunnels.

## Content Labels

Labels are used to denote special content. They typically are specified as admonitions and tags within content.

### Labs

The labs label denotes that the content is specific to functionality or process that is part of a closed beta available exclusively to select organizations.

**Admonition**

:::labs
:::

**Tag**

<ContentSectionTag type='labs' />

### Legacy

The legacy label denotes that the content is deprecated: no new organizations are able to use it and only certain legacy organizations are still in the process of migrating off of it.

**Admonition**

:::legacy
:::

**Tag**

<ContentSectionTag type='legacy' />
