# Evidence and Source Contract

Evidence must support modelling choices without turning PCR files into authoring logs.

## Data Sources

Record a source when it supports:

- amount ranges
- emission factors
- process decomposition
- boundary decisions
- allocation decisions
- official product specifications
- method formulas

Do not record a source when it is only:

- a Tiangong UUID lookup
- a CLI command trace
- a local search session
- a private note
- a review checklist

## Source Ids

Source ids must be stable lowercase slugs:

```text
fao-wheat-seed-production
ipcc-2019-managed-soils-n2o
usda-seed-cleaning-handling
```

Do not use timestamps, local file names, or agent names in source ids.

## Source Types

Use `builder/vocab/source-type.yaml`.

## Source References

Use the most stable available reference:

- official URL
- DOI
- report identifier
- standard identifier
- dataset name and publisher

When a web source is unstable, prefer an official PDF, DOI, or archived publication identifier.
