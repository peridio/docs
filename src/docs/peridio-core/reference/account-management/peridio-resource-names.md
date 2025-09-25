---
title: 'Peridio resource names'
description: 'Peridio Resource Names (PRNs) uniquely identify resources across the platform for authorization policies and API calls with standardized formatting.'
---

Peridio Resource Names (PRNs) uniquely identify Peridio resources. We require a PRN when you need to specify a resource unambiguously across all of Peridio, such as in authorization policies and API calls.

## PRN format

The following are the general formats for PRNs.

```text
prn:prn-version:organization-id
prn:prn-version:organization-id:resource-type:resource-id
```

The former is special case for organizations so that they don't repeat a value twice. This is an
example PRN for an organization.

```text
prn:1:eec5cabf-c4a8-46ab-ae5a-70ca847d558d
```

This is an example PRN for an artifact in that organization.

```text
prn:1:eec5cabf-c4a8-46ab-ae5a-70ca847d558d:artifacts:ddfd22a7-d928-4dce-8de2-cd98bd0dd72a
```
