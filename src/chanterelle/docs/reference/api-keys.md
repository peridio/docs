---
title: API Keys
---

<head>
  <title>Ref | API Keys</title>
</head>

API keys are used to authenticate requests with the [CLI](/chanterelle/cli/authentication) and [API](/chanterelle/api). They are strings matching this regex `/[A-Za-z0-9+/]{92}/g`.

When an API key is created it is associated with a new authentication identity. The new authentication identity is given the same authorization role as the authenticated identity that created it.
