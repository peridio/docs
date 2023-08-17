---
title: list
---

# peridio artifacts list

List artifacts information.

## Flags

`-h`, `--help`

Prints help information.

## Options

`--limit <limit>`

Specifies the max length of the returned results.

`--order <order>`

Controls whether the order of results is ascending or descending.

`--page <page>`

A cursor for pagination across multiple pages of results. Don't include this parameter on the first call. Use the `next_page` value returned in a previous response to request subsequent results.

### Required

`--search <search>`

A search query per the [search query language](https://docs.peridio.com/admin-api#section/Search-Query-Language). The search query must include the organization prn.
