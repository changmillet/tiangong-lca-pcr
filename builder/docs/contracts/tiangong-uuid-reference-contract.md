# Tiangong UUID Reference Contract

Tiangong references identify database rows used by PCR rules.

## UUID Rules

- Record UUIDs without dataset versions.
- Do not write references such as `uuid@01.01.002`.
- Do not add `version` fields for Tiangong row references in PCR Markdown or generated structured projections.
- Keep selected UUIDs in the row where they are used.

## Default Source Rule

Tiangong database rows are the default source for UUID-bearing references. Do not list Tiangong rows in `Data Sources` unless a specific row is used as non-default quantitative evidence.

## Lookup Guidance

Agents may use `tiangong-lca-cli` to search and inspect rows, but command traces are not PCR content.

Acceptable PCR content:

```markdown
| Reference product flow | Wheat `12da5e7d-9b93-4404-8c7d-08f98bec6238` |
```

Unacceptable PCR content:

```markdown
flow 12da5e7d-9b93-4404-8c7d-08f98bec6238@01.01.002
tiangong-lca search flow --query wheat seed
```
