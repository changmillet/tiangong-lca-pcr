---
title: PCR Library Architecture
docType: reference
scope: repo
status: draft
authoritative: true
owner: tiangong-lca-pcr
language: en
whenToUse:
  - when changing canonical PCR identity, classification source handling, mappings, or modules
  - when deciding whether a classification system should create PCR records or mapping records
whenToUpdate:
  - when PCR directory structure changes
  - when classification import or mapping architecture changes
  - when generated scaffold governance changes
checkPaths:
  - docs/architecture.md
  - AGENTS.md
  - README.md
  - .docpact/config.yaml
  - builder/**
  - classifications/**
  - library/modules/**
lastReviewedAt: 2026-06-23
lastReviewedCommit: 839db92417f09a1c8c6757e505933d333461bdb9
---

# Architecture

The PCR library separates canonical PCR records from classification systems.

```text
classification code -> mapping -> canonical PCR -> modules -> rendered PCR
```

Canonical PCR records live under `library/pcrs/`. Classification source data and mappings live under `classifications/`.

For CPC-backed bootstrapping, the builder stores the official source file and normalized hierarchy under `classifications/systems/cpc/<version>/`, then writes an explicit mapping file under `classifications/mappings/`. The CPC hierarchy seeds the initial PCR scaffold, but the generated PCR directory remains the canonical PCR identity.

PCR directory slugs must not embed external classification codes. A CPC leaf such as `01111 Wheat, seed` maps to a semantic PCR directory such as `wheat-seed`; `01111` stays in `classifications/mappings/` and `classification_refs`.

PCR records use a directory-level bilingual structure:

```text
library/pcrs/<domain>/<subdomain>/<pcr-slug>/
  manifest.yaml
  pcr.en-US.md
  pcr.zh-CN.md
  structured.yaml
```

This keeps one PCR identity while allowing English and Chinese markdown renderings to coexist.

Within one PCR identity, inventory rules are process-oriented. A PCR describes common modelling processes, then each process separates `inputs` and `outputs`, then separates `product`, `waste`, and `elementary` flows. This structure is used in Markdown and mirrored in `structured.yaml` as `process_inventory`.

Database-backed references are not classification identity. PCR Markdown records selected Tiangong UUIDs without dataset versions, and `structured.yaml` is regenerated as the machine projection of those Markdown tables. CLI command traces and lookup logs are authoring-time evidence and do not belong in PCR content. External classification codes still belong in the mapping layer.

Generated leaf PCR scaffolds may remain empty until reviewed methodology content is authored. Governance and docpact checks cover the builder, mappings, modules, and project contracts; generated `library/pcrs/**` content is excluded until those PCR files become material authored records.
