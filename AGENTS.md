---
title: TianGong LCA PCR Library Agent Guide
docType: contract
scope: repo
status: draft
authoritative: true
owner: tiangong-lca-pcr
language: en
---

# AGENTS.md - TianGong LCA PCR Library

This repository owns canonical PCR and modelling methodology assets for TianGong LCA data authoring.

## Boundaries

- PCR files are classification-independent methodology records.
- Classification systems map to PCR records through `classifications/mappings/`.
- Do not duplicate PCR records only because a new classification system is added.
- Keep reusable method rules in `library/modules/` and category-specific rules in `library/pcrs/`.
- Builder scripts must not depend on private workspace state.

## Default Load Order

1. `AGENTS.md`
2. `README.md`
3. `docs/architecture.md`
4. `docs/authoring-guide.md`
5. target PCR, module, schema, or mapping file

## Validation

Run the local validation entry point before handoff when files in this repo change:

```bash
npm run validate
```

