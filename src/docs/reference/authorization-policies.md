# Authorization Policies

Authorization Policies are entities against which Authorization Scopes may be explicitly allowed or denied.

Zero to many Authorization Policies can be attached to [Members](members) and [API Keys](api-keys) to control their access. By default Members and API Keys have no Authorization Policies attached to them.

## Policy evaluation

For every Authorization Policy, every Authorization Scope is categorized in one of three ways:

- __explicitly allowed__ - the scope was explicitly allowed in the policy.
- __explicitly denied__ - the scope was explicitly denied in the policy.
- __implicitly denied__ - the scope was never mentioned in the policy.

This means for any given Authorization Policy, a ruling on every Authorization Scope that exists can be determined, regardless of whether the Authorization Policy ever even mentions the Authorization Scope. However, because Members and API Keys can have multiple Authorization Policies attached to them, at the moment of evaluation Peridio merges all Authorization Policies into a single ephemeral Authorization Policy against which access can be evaluated.

When there is a conflict in whether to allow or deny access to an Authorization Scope, the following heuristic is applied: explicit denies override explicit allows override implicit denies.
