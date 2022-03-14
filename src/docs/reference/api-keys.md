---
title: API Keys
---

<head>
  <title>Ref | API Keys</title>
</head>

API Keys are used to authenticate requests with the [CLI](/cli/authentication) and [API](/api/0#tag/Authentication).

## Format

API Keys are 123 character strings matching this regex `/[A-Za-z0-9+/]{123}/g`.

## Authorization

API Keys are currently only authorized to access endpoints that read resources. API Keys will eventually derive their authorization from their attached Authorization Policies, but these resources are not yet publicly available.
