---
sidebar_position: 1
---

# Node

An entity for which Elements will be managed.

## Fields

| name | type | description |
| --- | --- | --- |
| distribution_channel_id | uuid | When a Node's element_resolution_strategy is distribution_channel, this field causes it to use a [Distribution Channel](../distributions/distribution-channel.md) that may be different than the [Node Type](node-type.md)'s. |
| element_resolution_strategy_id | text | Which [Node Element Resolution Strategy](node-element-resolution-strategy.md) to use. |
| id | uuid | UUID. |
| name | text | Name. |
| node_type_id | uuid | Which [Node Type](node-type.md) this Node belongs to. |

## API Resource

`/nodes`

```json
{
  "distribution_channel_id": "3deaef43-d21c-4b77-9ecc-138adc8f1e61",
  "element_resolution_strategy_id": "distribution_channel",
  "id": "9dc412cb-78b8-45c3-b3c1-60c1af682dd8",
  "name": "AE3RSGF",
  "node_type_id": "60b06844-1c84-4de7-b2ba-9cd47b5902c8"
}
```
