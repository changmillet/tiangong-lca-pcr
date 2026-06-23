# TianGong LCA PCR Library

This repository stores TianGong LCA product category rules and modelling methodology assets.

PCR records are canonical methodology documents. Classification systems such as CPC, HS, ISIC, and NAICS are entry points that map to canonical PCR records; they do not own the PCR directory structure.

## Repository Shape

- `library/pcrs/`: canonical PCR markdown records grouped by TianGong methodology domains.
- `library/modules/`: reusable modelling method modules referenced by PCR records.
- `library/indexes/`: generated and maintained PCR indexes.
- `classifications/systems/`: source and normalized classification-system data.
- `classifications/mappings/`: mappings from external classification codes to canonical PCR ids.
- `builder/`: templates, schemas, scripts, and construction method documents for building the PCR library.
- `docs/`: project-level architecture and authoring notes.

## PCR Record Shape

Each material PCR should use one directory with shared metadata, bilingual Markdown, and machine-readable rules:

```text
library/pcrs/<domain>/<subdomain>/<pcr-slug>/
  manifest.yaml
  pcr.en.md
  pcr.zh-CN.md
  structured.yaml
```

## Builder CLI

```bash
npm run init
npm run lint
npm run validate
```

## Initial Status

This repository is intentionally scaffold-only. It establishes the layout and contracts for later CPC-backed PCR scaffold generation without committing to a completed PCR content set.
