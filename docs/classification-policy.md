---
title: PCR Classification Policy
docType: policy
scope: repo
status: draft
authoritative: true
owner: tiangong-lca-pcr
language: en
whenToUse:
  - when importing classification sources
  - when mapping external classification codes to canonical PCR ids
  - when adding a new classification system
whenToUpdate:
  - when source retention rules change
  - when mapping relation types change
  - when classification systems are added or removed
checkPaths:
  - docs/classification-policy.md
  - AGENTS.md
  - .docpact/config.yaml
  - builder/**
  - classifications/**
lastReviewedAt: 2026-06-23
lastReviewedCommit: c9d9ff61cb5485fc9d90c0ee3d970d4df8ad3dbf
---

# Classification Policy

Classification systems are maintained as external indexing layers. They may seed scaffolding and search, but they do not determine canonical PCR identity.

Supported mapping relation types should include:

- `exact`
- `broader`
- `narrower`
- `proxy`
- `manual_review`

## Source Handling

Classification imports should keep the official source artifact under `classifications/systems/<system>/<version>/raw/` with source metadata and checksum. Normalized files under the same system/version directory may be regenerated from the raw source.

Mappings under `classifications/mappings/` are the maintained link from external codes to canonical PCR ids. Adding another classification system should normally add a new mapping layer, not a duplicate PCR tree.
