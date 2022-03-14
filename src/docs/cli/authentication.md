---
title: Authentication
---

<head>
  <title>CLI | Authentication</title>
</head>

The CLI authenticates requests with [API Keys](/reference/api-keys). The API Key can be provided via an environment variable or a CLI argument. The CLI argument has higher precedence than the environment variable.

**environment variable**

```shell
PERIDIO_API_KEY=ZjE4M2U5NWYwZTVkNDQyOGEyMmQ5ODRmOWM1MjMzOGVQT2owQzJNSG0rdGhqZWJQTGVwMFA2N2VCSjJsYlU2VW5oR09GUUxPSGEyM0tZOXRnby9vL0oyeXBRRTI \
peridio \
  identity \
    get
```

**CLI argument**

```shell
peridio \
  --api-key ZjE4M2U5NWYwZTVkNDQyOGEyMmQ5ODRmOWM1MjMzOGVQT2owQzJNSG0rdGhqZWJQTGVwMFA2N2VCSjJsYlU2VW5oR09GUUxPSGEyM0tZOXRnby9vL0oyeXBRRTI \
  identity \
    get
```
