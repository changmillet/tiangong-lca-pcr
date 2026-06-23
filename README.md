---
title: TianGong LCA PCR Library README
docType: overview
scope: repo
status: draft
authoritative: true
owner: tiangong-lca-pcr
language: en
whenToUse:
  - when onboarding to the PCR library repository
  - when checking the repository layout or builder CLI entry points
whenToUpdate:
  - when repository layout changes
  - when builder CLI commands change
  - when the scaffold status changes
checkPaths:
  - README.md
  - AGENTS.md
  - package.json
  - builder/**
  - classifications/**
  - library/modules/**
  - docs/**
lastReviewedAt: 2026-06-23
lastReviewedCommit: 101edae81bc0c765f5a47803abf75bf421f2368d
---

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
  pcr.en-US.md
  pcr.zh-CN.md
  structured.yaml
```

Material PCR content should use this authoring shape:

- reference flow, flow property, and unit conventions
- system boundary and allocation rules
- process inventory organized by process, then inputs/outputs, then product/waste/elementary flows
- data quality and validation rules
- data sources and CLI lookup trace for database UUIDs, range evidence, and review status

## Builder CLI

```bash
npm run init
npm run lint
npm run pcr:scaffold:cpc -- --source <cpc-structure.csv> --classification-version 3.0 --source-url <official-source-url>
npm run validate
```

`pcr:scaffold:cpc` imports a CPC structure CSV, stores the raw and normalized classification data under `classifications/systems/cpc/<version>/`, writes a CPC-to-PCR mapping file, and creates empty bilingual PCR directories for leaf classes only. PCR directory names are semantic slugs, not CPC codes; the CPC code remains in the mapping layer and PCR metadata.

PCR authors may use `tiangong-lca-cli` to search Tiangong database flow/process/lifecyclemodel records and copy selected UUID/version references into PCR content. The CLI is an authoring evidence tool, not a runtime dependency of this repository.

## Initial Status

This repository is intentionally scaffold-first. It establishes the layout and contracts for CPC-backed PCR scaffold generation without treating the generated empty PCR files as reviewed PCR content.
