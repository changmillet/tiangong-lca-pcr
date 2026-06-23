# Tiangong UUID Reference Contract

Tiangong references identify database rows used by PCR rules.

## UUID Rules

- Record UUIDs without dataset versions.
- Keep selected UUIDs in the row where they are used.
- Keep Tiangong row version metadata outside PCR Markdown and generated structured projections.

## Default Source Rule

Tiangong database rows are the identity source for UUID-bearing references. `Data Sources` records external sources and non-default quantitative evidence.

## Lookup Guidance

Agents may use `tiangong-lca-cli` to search and inspect rows. Command traces stay outside PCR content.

PCR content:

```markdown
| Reference product flow | Wheat `12da5e7d-9b93-4404-8c7d-08f98bec6238` |
```

Authoring artifacts:

```markdown
flow 12da5e7d-9b93-4404-8c7d-08f98bec6238@01.01.002
tiangong-lca search flow --query wheat seed
```
