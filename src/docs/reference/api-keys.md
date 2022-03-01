# API Keys

API Keys are used to authenticate requests against the Peridio API.

API Keys derive their authorization from their attached [Authorization Policies](authorization-policies).

## Attributes

__Username__

A 52 character string that would match this regex `/[a-z0-9]{32}[A-Za-z0-9+/]{20}/g`.

Example: `f183e95f0e5d4428a22d984f9c52338ePOj0C2MHm+thjebPLep0`.

__Password__

A 40 character string that would match this regex `/[a-zA-Z0-9+/]{40}/g`.

Example: `P67eBJ2lbU6UnhGOFQLOHa23KY9tgo/o/J2ypQE2`.
