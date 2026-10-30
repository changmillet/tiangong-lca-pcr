---
title: TianGong LCA PCR Library Agent Guide
docType: contract
scope: repo
status: draft
authoritative: true
owner: tiangong-lca-pcr
language: en
whenToUse:
  - when working in the PCR library repository
  - when changing PCR identity, classification mapping, builder, or validation contracts
whenToUpdate:
  - when PCR directory contracts change
  - when classification mapping or builder CLI behavior changes
  - when public PCR consumption CLI, skill, or feedback intake behavior changes
  - when repository validation expectations change
checkPaths:
  - AGENTS.md
  - README.md
  - .docpact/config.yaml
  - package.json
  - product-release.json
  - builder/**
  - packages/**
  - skills/**
  - .github/workflows/**
  - .github/ISSUE_TEMPLATE/**
  - classifications/**
  - library/modules/**
  - docs/**
lastReviewedAt: 2026-10-30
lastReviewedCommit: 56e912858aa769ff13075fa852a344d0b730a3b9
lastReviewedNote: "PCR #159: reviewed stable product 0.4.10 preparation at 56e91285. Authority, three package mirrors and docs lock root metadata advance together; dependency resolutions, canonical content, methodology/translation state, reader minimum and runtime pins remain unchanged. Current preparation notes distinguish verified public 0.4.9 from pending new tag qualification, coordinated npm/site publication and exact workspace integration."
---

# AGENTS.md - TianGong LCA PCR Library

This repository owns canonical PCR and modelling methodology assets for TianGong LCA data authoring.

The canonical GitHub repository is `tiangong-lca/pcr`. When the consuming workspace delivery profile includes this repository, use its controller and `pcr` label for tracked delivery. Keep repository changes in this repository, target `main`, and hand off the exact eligible commit for workspace integration. Physical submodule presence alone does not establish delivery-controller support.

## Boundaries

- PCR files are classification-independent methodology records.
- Classification systems map to PCR records through `classifications/mappings/`.
- Do not duplicate PCR records only because a new classification system is added.
- A classification leaf is coverage input, not a request to create canonical PCR identity. Create a PCR only when a
  reviewed semantic product boundary and material methodology need a canonical record.
- Keep reusable method rules in `library/modules/` and category-specific rules in `library/pcrs/`.
- Builder scripts must not depend on private workspace state.
- Keep PCR production and PCR consumption separate: `builder/` owns library maintenance, while `packages/` and `skills/` expose reviewed PCR guidance to agents and humans.

## PCR Directory Contract

Canonical PCR identity is directory-based. Each PCR record must use one directory with shared metadata, structured rules, and bilingual Markdown:

```text
library/pcrs/<domain>/<subdomain>/<pcr-slug>/
  manifest.yaml
  pcr.en-US.md
  pcr.zh-CN.md
  structured.yaml
```

After first publication the same leaf also owns its audited release lineage, and may own one explicit open revision:

```text
  release-history.yaml
  revision/
    revision.yaml
    manifest.next.yaml
    pcr.en-US.md
    pcr.zh-CN.md
    structured.yaml
  releases/<semver>/
    release.yaml
    manifest.snapshot.yaml
    pcr.en-US.md
    pcr.zh-CN.md
    structured.yaml
```

Rules:

- `manifest.yaml` owns language-independent PCR identity, title map, lifecycle status, content maturity, target entities, module references, and available languages.
- `pcr.en-US.md` and `pcr.zh-CN.md` are two language renderings of the same PCR record, not separate PCR records.
- `structured.yaml` is the machine-oriented projection of the canonical Markdown PCR. It carries reference flow definitions, measurement rules, process inventories, validation-facing fields, external data sources, and deterministic projection metadata without authoring trace logs.
- Material projections must satisfy `packages/pcr-core/schemas/structured-projection.schema.json` and carry a current canonical-Markdown/content SHA-256 fingerprint. Missing, malformed, stale, or unsupported projections are unavailable to guidance and validation.
- Do not create parallel `pcrs/en/` and `pcrs/zh-CN/` directory trees.
- Do not use CPC, HS, ISIC, NAICS, or another external classification system as the canonical PCR directory tree.
- Do not include external classification codes in PCR directory names. Use semantic PCR slugs such as `wheat-seed`; keep CPC, HS, ISIC, NAICS, and similar codes in mappings and `classification_refs`.
- If a classification leaf maps to an existing PCR, update the mapping file instead of duplicating the PCR.
- After publication, the top-level four files are the current consumer-facing release. Open later work with
  `pcr:revise` and operate explicitly on `--workspace revision`; never edit, sync, or bump published/deprecated current
  content in place.
- `releases/<semver>/` is immutable and `release-history.yaml` is append-only. Do not create or edit them manually;
  publication maintains them through a recoverable whole-directory transaction.
- A published current record may move only to `deprecated/deprecated_methodology`. A deprecated PCR cannot be
  reopened by lifecycle or revision commands.

Reusable modules may use the same localized directory pattern:

```text
library/modules/<group>/<module-slug>/
  manifest.yaml
  module.en-US.md
  module.zh-CN.md
  structured.yaml
```

Legacy single-file module stubs under `library/modules/core/*.md` are scaffold placeholders and should be migrated to the directory pattern when their content becomes material.

## Classification Mapping Contract

Classification data and mappings live outside canonical PCR records:

```text
classifications/systems/<system>/<version>/
classifications/mappings/<system>-<version>-to-pcr.yaml
classifications/aliases/pcr-id-aliases.yaml
classifications/indexes/<system>-<version>-coverage.json
```

Mapping files are the authoritative link from external classification codes to canonical PCR ids. Current
`schema_version: 2` / `status: current` mappings contain accepted positive edges only. Each edge must point to a
material PCR, use `exact`, `broader`, `narrower`, or `proxy`, and carry an `acceptance` decision with status,
decision-maker, UTC time, and durable decision reference. Candidate and `manual_review` evidence belongs in coverage
assessment, not in the positive mapping.

`pcr:import:cpc -- --source <csv>` is classification-only by default. Every invocation requires an explicit source;
the command writes raw source, source metadata, and normalized classification artifacts, creates zero PCR records,
creates a zero-edge mapping only when the mapping is absent, and validates then preserves the exact bytes of any
existing mapping. A retained raw artifact name is immutable: importing different bytes under the same name fails
closed. A non-3.0 import requires a registered coverage descriptor.

The `scaffold-cpc` compatibility alias must fail unless `--legacy-scaffolds` is explicit. That mode exists only for
migration reproduction and tests, never for a new classification import. It may operate only on a legacy v1/scaffold
mapping. A current v2 mapping makes the compatibility mode fail before mutation, so it cannot inject an unaccepted
edge or rehydrate a retired leaf-derived PCR directory. For retained v1 fixtures, a missing target may be created as
one complete four-file legacy scaffold; an existing target must already be complete and byte-for-byte equal to the
expected legacy template. It must never repair partial directories, replace an accepted edge, or overwrite PCR
content.

CPC import mutations are protected by one lock per classification coordinate, no-follow reads, a baseline
compare-and-swap check, and staged writes. The mapping is the final committed artifact, so a failed import cannot
publish an edge whose identity or PCR target was not installed.

Only an explicitly accepted edge to a material PCR is a positive mapping. Read the current accepted set and count
from `classifications/mappings/<system>-<version>-to-pcr.yaml` and its durable ADR references; this guide does not
maintain a second inventory.
Classification coverage is a derived read model under `classifications/indexes/`; it combines normalized leaves,
mapping input, target PCR state, and coverage assessment for bounded CLI and viewer reads. Each checked-in index must
record exact-byte SHA-256 fingerprints for its normalized-leaf and mapping sources, and consumers must reject a stale
or substituted source. A mapped entry projects its acceptance evidence and runtime resolution rechecks it against the
canonical mapping. The index is not authoring truth and must be regenerated from those sources. Read current leaf
and status counts from `classifications/indexes/<system>-<version>-coverage.json` or the CLI's `coverage summary`.

Retired CPC leaf-derived PCR ids are recorded in the deterministic registry at
`classifications/aliases/pcr-id-aliases.yaml`. Its entries are terminal locators to classification coverage;
they are checked before catalog lookup, cannot chain or cycle, and must not be silently followed into a PCR.
`resolve --pcr` returns the locator and a copyable next command, while content commands fail with
`PCR_LEGACY_ID_REDIRECT`. One physical pilot has removed CPC `99000`; it is known-unmapped and its old id redirects.
Remaining legacy directories are compatibility artifacts. Inventory them from canonical manifests under
`library/pcrs/`; `library/indexes/pcr-index.yaml` separately enumerates material records. Bulk physical migration
is not complete.

## Builder CLI and Authoring Docs

The builder CLI lives under `builder/cli/`.

Agent-facing PCR production guidance lives under `builder/`. Use `builder/AGENTS.md` for task routing and hard rules, then use `builder/docs/index.md` to choose the smallest relevant workflow, contract, tool note, method note, or prompt.

CLI commands and command meanings are documented in `builder/README.md`. Keep detailed CLI usage there instead of duplicating it in this repo-level contract.

Material PCRs must have a deterministic, schema-valid `structured.yaml` projection whose source and generated-content
fingerprints match canonical Markdown and the projection bytes. Lifecycle state, content maturity, and translation
state are one validated contract. Publication must pass the builder preflight before either the manifest or structured
projection is replaced.

First publication uses the current workspace and creates the initial immutable release snapshot and history. Later
publication requires a `pcr:revise` workspace whose target SemVer is fixed at open time. Builder sync, bump,
lifecycle, revise, and publish mutations use per-PCR lock/journal/stage/backup state under
`library/.pcr-builder-state/`; recover interrupted state with `pcr:recover`, and use `--force-stale-lock` only after
confirming no writer is active.

Local batch production uses the `goal:*` Harness commands and persistent state under
`library/.pcr-builder-state/goals/<goal-id>/`. Authors must be durable visible Codex app-server tasks, one PCR per
independent worktree; never fall back to hidden agents or shared-directory writers. Synthetic dirty baselines may
include only configured repository roots and exact untracked allowlists without changing the user's real index or
branch. Author commits are limited to one PCR's four canonical files. Shared mappings, aliases, indexes, catalog,
coverage, viewer derivatives, and accepted-mapping ADRs are updated only by serial integration snapshots and land
through exact-byte compare-and-swap. `goal:stop` preserves worktrees and results.

Builder measurement inspection reuses canonical reference, inventory, collection and calculation rules in both languages.
General lint is report-only for measurement findings. `pcr:check` enforces a complete, finite measurement check on
one explicitly selected current/revision workspace; unresolved relationships require review. Symbolic machine mass M
is valid with a collection method, scope and conversion; PCR methodology never invents a per-machine weight.
New untouched Goal tasks pin authoring contract 2 at dispatch. Finalized UUID receipts are hash-bound in Goal events;
`goal:prepare-report` preserves the author's draft, assembles only uniquely derivable receipt fields, performs actual
PCR/sync/evidence checks and returns a report reference. Intake verifies the reference before independent acceptance.
Existing authors without that contract, released PCRs, quarantined results and exhausted repair budgets retain their
previous behavior. Roll out through one naturally free author slot after branch validation; never reset old tasks to
make them eligible. Detailed commands and field ownership live in `builder/README.md` and the Harness tool note.

Stable machine tokens are authored only in `builder/vocab/*.yaml`. Do not hand-edit the generated runtime constants
or controlled-vocabulary Schema under `packages/pcr-core/`; run `npm run vocab:generate`, and keep token validity
separate from lifecycle, readiness, evidence, and other cross-field policy.

Build or check the deterministic legacy-id registry with `npm run aliases:build` and `npm run aliases:check`.
The catalog binds the registry's canonical path, exact-byte SHA-256, and entry count; a missing or mismatched binding
must fail closed at runtime. Catalog publication replaces the catalog, material index, and coverage indexes as one
journaled, recoverable artifact set. If publication is interrupted, use `npm run catalog:recover`; use its
`--force-stale-lock` option only after confirming no writer is active. Do not hand-edit catalog transaction state
under `library/.pcr-builder-state/catalog/`.

Generated PCR leaf scaffolds under `library/pcrs/**` are intentionally excluded from docpact coverage. The builder, classification sources, mappings, schemas, modules, and project documents remain governed.

## Public PCR Consumption CLI and Skill

Offline packaging is governed by `docs/offline-distribution.md`. Build the tool and
English-only SQLite content package as separate artifacts of one product version; never promote methodology status
or alter source language declarations merely to package content.

The bundled thin Skill uses Tiangong CLI to prepare and verify an immutable task
snapshot, then delegates to this repository's offline reader. Tiangong CLI owns
online discovery/cache/task locks. Reader/content compatibility follows declared
capabilities rather than equal versions; continuing tasks retain their original
pins. Explicit standalone/repository consumption remains supported.

The public Agent-facing CLI lives under `packages/tiangong-pcr-cli/` and uses shared logic from `packages/pcr-core/`.

Use this CLI for general LCA authoring, optional TIDAS process authoring, and Agent-led review of native TIDAS
process/model inputs. Foreground data packages are optional working artifacts. See `docs/agentic-consumption.md`.

```bash
npm --silent run tiangong-pcr -- tree --format markdown
npm --silent run tiangong-pcr -- list --scope material --format json
npm --silent run tiangong-pcr -- list --path-prefix <domain/subdomain> --format json
npm --silent run tiangong-pcr -- list --scope legacy --page 1 --page-size 10 --format json
npm --silent run tiangong-pcr -- list --page 2 --page-size 10
npm --silent run tiangong-pcr -- coverage summary --classification cpc:3.0 --format json
npm --silent run tiangong-pcr -- coverage list --classification cpc:3.0 --page 1 --page-size 10 --format json
npm --silent run tiangong-pcr -- resolve --classification cpc:3.0:01111 --format json
npm --silent run tiangong-pcr -- resolve --pcr <pcr-id> --format json
npm --silent run tiangong-pcr -- guidance --pcr <pcr-id> --format json
npm --silent run tiangong-pcr -- feedback draft --pcr <pcr-id> --type <feedback-type>
```

Rules:

- `tree` and `list` are explicit catalog-browsing tools, not fuzzy search. They default to material PCRs; use
  `--scope material|legacy|all` when the requested record scope must be explicit.
- `tree` defaults to the bounded material domain/subdomain view at depth 2. Use paginated `list --path-prefix` to drill down; request depth 3 only when the complete selected-scope hierarchy is required.
- `list` is paginated by default with 10 records per page. Output must expose active filters, pagination completeness, and copyable next/previous commands.
- `coverage summary|list --classification <system>:<version>` exposes classification coverage separately from the
  methodology catalog. `coverage list` is paginated and candidate/manual-review evidence must never be auto-selected.
- `resolve` requires exactly one of `--classification` or `--pcr`. Classification resolution uses deterministic
  accepted mappings and the derived coverage index; a missing coverage index fails closed and must never fall back to
  selecting directly from a mapping file. A known but unmapped leaf is a successful resolution with `mapping: null`
  and `pcr: null`. A retired PCR id returns a terminal alias locator and copyable next command without auto-following
  it. Neither result implies usable methodology.
- Catalog, resolve, and guidance results must expose PCR readiness. Empty scaffolds are excluded from default material
  browsing, remain available through explicit legacy/all compatibility scope, and must be rejected by guidance and validation.
- `guidance` and validation must re-check the target projection's Schema and fingerprint at runtime, present Agent-facing boundary, allocation, inventory, production, and validation rules, and never mutate PCR content.
- Validation output must distinguish status from coverage by reporting accepted input, checks performed, checks skipped, findings, and completeness. Error findings and inconclusive validation fail the CLI by default; report-only exit behavior must be explicitly requested.
- `feedback draft` creates issue-ready candidate evidence; it does not update PCR truth.
- `--help` must work globally and for each public command. Command help should include purpose, options, output shape where relevant, and Agent next-step guidance.
- Output formats are command-specific contracts. JSON-only commands must never silently emit another representation, and JSON-requested failures must keep stdout empty while returning a stable error code and details on stderr.
- The Agent owns applicability and methodological interpretation. CLI inspection exposes original fields and local references; calculations require explicit bases. Reuse TIDAS-owned format tooling rather than copying its schemas or claiming schema validation from inspection.
- Selected guidance preserves verified projection hashes, JSON Pointers and existing rule IDs. Agent review envelopes bind input/PCR evidence while keeping reasoning free. `review check` never establishes methodology approval; uncertainty and unreviewed scope remain explicit.
- Legacy `validate-model` checks qualifier text presence and `validate-dataset` checks collection protocol ID presence. Preserve their report/exit compatibility and do not advertise them as semantic or TIDAS validation.
- Agent skill guidance lives under `skills/tiangong-pcr/` and must remain thin. It should point agents to CLI commands and library contracts instead of duplicating PCR rules.
- GitHub feedback intake surfaces live under `.github/ISSUE_TEMPLATE/`.

Public `guidance batch` uses an owned synchronous read session for one verified source. Preserve complete units, input order and duplicate IDs; fail the complete operation when an item is unavailable. Context freshness also applies to metadata-only pages and shallow trees. See `docs/agentic-consumption.md` for source identity and lifetime boundaries.

## Generated Public Documentation

`packages/pcr-docs/` owns the public Fumadocs site. Read
`docs/pcr-documentation-site-contract.md` before changing its exporter, language
policy, source mapping, SEO or EdgeOne deployment. It consumes complete core
bundles and the shared Builder history verifier; it cannot mutate canonical PCR
content or promote methodology/translation status. English and Chinese remain
required; declared optional language artifacts are verified and preserved.

Generated `.generated/`, `public/generated/`, `.next/` and `out/` are derivatives,
not authoring sources. Use `npm run docs:build` for the complete static publication
gate. Production uses the existing EdgeOne Git project and the `release/production` deployment
pointer advanced only to qualified product tags on `main`; preview remains disabled. The provider
imports the sealed web artifact instead of rebuilding it. This pointer is not another development trunk. Root owns exact workspace gitlink integration after child merge.

## Context Routing

Read only the context needed for the current task.

- For repo structure, PCR identity, classification mapping, or governance changes, use `AGENTS.md`, `README.md`, `docs/architecture.md`, and the target files.
- For PCR content authoring, use `docs/authoring-guide.md`, then route through `builder/AGENTS.md`.
- For builder CLI, schema, script, template, or vocab changes, use `builder/README.md`, then inspect only the affected implementation files.
- For public PCR consumption CLI, Agent skill, or feedback issue template changes, inspect `packages/**`, `skills/tiangong-pcr/**`, `.github/ISSUE_TEMPLATE/**`, `README.md`, and `docs/architecture.md`.
- For create, update, translate, review, or publish PCR workflows, start at `builder/AGENTS.md` and `builder/docs/index.md`.

## Normative source context

Follow `docs/semantic-projection-contract.md` for projection v2, complete unit/ancestor context, legacy v1 enrichment and distinct citation identities. Flat rules alone do not establish applicability. Preserve published bytes and scientific/translation gates; regenerate unpublished projections through the normal transaction.

## TypeScript engineering

New first-party implementation, tests and scripts use TypeScript/TSX under the
strict [engineering contract](docs/typescript-engineering.md). Existing authored
JavaScript is an explicit shrinking migration inventory, not permission to add
new JavaScript. Generated runtime artifacts and the approved manifest-bound Python
SEO checker remain classified separately. Native Node execution does not replace
`tsc` checking. Preserve complete semantic context; reproducible old projections
are not semantic goldens for the known conditions/actions defect.

## Validation

Run the local validation entry point before handoff when files in this repo change:

```bash
npm run validate
```

Canonical lint retains full diagnostics in `.reports/pcr-lint.json` and prints a bounded summary.
Warnings retain their existing severity; report-write failures fail validation. See `builder/README.md`.

CI uses the stable `validate` aggregate gate under
[the engineering qualification contract](docs/typescript-engineering.md#ci-qualification-lanes).
Full mode requires all eight fresh source-bound shard receipts, independent
full-corpus reproducibility and authenticated coverage measurements. A proven
current-PCR-only data lane retains whole-library contracts, changed-record
semantic/projection checks and complete fresh sealed-product acceptance; full
code coverage is explicitly unmeasured. Unknown/shared/runtime changes and every
reusable release invocation select full mode, including empty product tags.
Do not satisfy a failed qualification with prior-attempt shard artifacts or
report compact portable tests as complete corpus qualification.

Bounded npm/Actions monitoring follows `docs/dependency-maintenance.md` and
reuses that full qualification. The root/core Ajv declarations remain
coordinated; discovery never grants reader/snapshot adoption, product release
or methodology authority.

Product releases use one version source (`product-release.json`), immutable `v<version>` tags,
main-bound qualification and coordinated npm/website publication with verified retry receipts. See the [offline distribution contract](docs/offline-distribution.md#npm-release-automation)
for setup, first publication and retries. Npm release does not approve PCR methodology.
