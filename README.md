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
  - when public PCR consumption CLI or Agent skill behavior changes
  - when classification import or legacy scaffold compatibility behavior changes
checkPaths:
  - README.md
  - AGENTS.md
  - package.json
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

# TianGong LCA PCR Library

This repository stores TianGong LCA product category rules and data production methodology assets.

Canonical source: [tiangong-lca/pcr](https://github.com/tiangong-lca/pcr). The integration workspace's physical checkout directory is `pcr`; its retained submodule metadata name is `tiangong-lca-pcr`. Repository renaming does not change PCR identifiers, package names, or release history.

PCR records are canonical methodology documents. Classification systems such as CPC, HS, ISIC, and NAICS are entry points that map to canonical PCR records; they do not own the PCR directory structure.

## Start with an Agent

Read the [Agent getting-started guide](packages/pcr-docs/public/getting-started.md)
for installation, the bundled Skill, task-pinned snapshots, LCA/TIDAS authoring,
review and fully offline use. The website exports this source verbatim at
`/getting-started.md`; the public URL becomes available with the next qualified
website release containing it.

## Repository Shape

- `library/pcrs/`: canonical PCR markdown records grouped by TianGong methodology domains.
- `library/modules/`: reusable data production method modules referenced by PCR records.
- `library/indexes/`: generated material PCR indexes.
- `classifications/systems/`: source and normalized classification-system data.
- `classifications/mappings/`: accepted mappings from external classification codes to canonical material PCR ids.
- `classifications/aliases/`: deterministic terminal locators for retired leaf-derived PCR ids.
- `classifications/indexes/`: derived classification coverage read models for the CLI and viewer.
- `builder/`: CLI, implementation modules, scripts, schemas, templates, controlled vocabularies, and builder documentation for constructing and validating the PCR library.
- `packages/pcr-docs/`: generated public Fumadocs documentation at https://pcr.tiangong.earth.
- `packages/pcr-core/`: shared library for reading PCR catalog, mapping, guidance, validation, and feedback draft data.
- `packages/tiangong-pcr-cli/`: public Agent-facing CLI for consuming PCR guidance during foreground data package construction.
- `skills/tiangong-pcr/`: thin Agent skill for preparing an immutable task snapshot through Tiangong CLI, selecting PCRs, using guidance, validating drafts, and creating feedback.
- `.github/workflows/`: repository validation gates for pull requests and main-branch updates.
- `.github/ISSUE_TEMPLATE/`: structured PCR feedback and missing-PCR issue forms.
- `docs/`: project-level architecture, authoring notes, release policy, and the phased optimization roadmap.

## PCR Record Shape

Each material PCR should use one directory with shared metadata, bilingual Markdown, and machine-readable rules:

```text
library/pcrs/<domain>/<subdomain>/<pcr-slug>/
  manifest.yaml
  pcr.en-US.md
  pcr.zh-CN.md
  structured.yaml
```

After first publication, the same canonical leaf also carries an immutable release chain. While a later version is
being authored, one explicit revision workspace may coexist with the stable current release:

```text
  release-history.yaml
  revision/                         # present only while one revision is open
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

The top-level four files remain the current consumer-facing release. Release snapshots are immutable, history is
append-only, and managed subtrees never contain another `manifest.yaml`.

Material PCR content should use this authoring shape:

- reference flow definition with UUID-bearing product flow and category-specific required qualifiers
- measurement and unit rules for modelling consistency, conversion, and validation
- system boundary, boundary abstraction, and allocation rules
- process inventory organized by process, then inputs/outputs, then product/waste/elementary flows
- foreground data collection protocols, calculation rules, and data quality requirements
- published dataset profile for downstream `secondary_dataset` and `background_dataset` use
- validation rules
- selected Tiangong UUIDs without dataset versions
- external data sources for ranges, factors, official guidance, and non-default evidence

## Development and verification

Use `nvm install && nvm use` for the exact Node 24 version in `.nvmrc`, select
`npm install --global npm@12.2.0`, then install both locked graphs with
`npm ci && npm --prefix packages/pcr-docs ci`. `npm run validate` checks the runtime,
reviewed migration inventory, all scoped TypeScript projects, library contracts and all
source tests, including documentation tests. Full validation currently runs on Linux because the Goal Harness requires descriptor-anchored `/proc` access; portable suites remain available separately. `npm run test:list` shows suite
membership; `npm run test:coverage` collects the full test/build sources and enforces
the complete coverage targets from fresh report paths.
CI retains the stable `validate` aggregate check and separates full source tests
into eight complete, source-bound shards. Full-corpus reproducibility remains a
mandatory separate gate; `npm run test:offline:portable` runs compact real offline
contracts on supported platforms. Proven current-PCR-only changes can select a
reduced data lane with full global contracts and complete fresh sealed-product
acceptance; its full code coverage is explicitly unmeasured. Every reusable
release qualification selects full mode, even with an empty product tag. See
[CI qualification lanes](docs/typescript-engineering.md#ci-qualification-lanes)
for allowed changes, evidence binding and complete-attempt retry requirements.
All first-party implementation, scripts and tests use strict TypeScript/TSX; installed packages and browsers receive compiled JavaScript. The shared SEO checker remains Python. Read [TypeScript and test engineering](docs/typescript-engineering.md) for current
migration boundaries and final qualification requirements. The Python SEO checker
is retained. Projection v2 now preserves normative source context; see the [semantic contract](docs/semantic-projection-contract.md). Authored JavaScript inventory is zero; final production qualification and cutover remain tracked under #69/#79 until live acceptance.

## Builder CLI

```bash
npm run init
npm run lint
npm run aliases:build
npm run aliases:check
npm run catalog:build
npm run catalog:check
npm run catalog:recover [-- --force-stale-lock]
npm run pcr:import:cpc -- --source <cpc-structure.csv> --classification-version 3.0 --source-url <official-source-url>
npm run pcr:import:cpc -- --source <cpc-structure.csv> --classification-version 3.0 --legacy-scaffolds  # migration compatibility only
npm run pcr:sync-structured -- --pcr <library/pcrs/...> [--workspace current|revision]
npm run pcr:check -- --pcr <library/pcrs/...> [--workspace current|revision] --format json
npm run pcr:bump -- --pcr <library/pcrs/...> --level patch
npm run pcr:publish -- --pcr <library/pcrs/...> --workspace current --version <semver>
npm run pcr:revise -- --pcr <library/pcrs/...> --version <target-semver>
npm run pcr:publish -- --pcr <library/pcrs/...> --workspace revision
npm run pcr:recover -- --pcr <library/pcrs/...> [--force-stale-lock]
npm run goal:doctor -- --config <goal.yaml>
npm run goal:plan -- --config <goal.yaml> --dry-run
npm run goal:start -- --config <goal.yaml> --slots 1
npm run goal:status -- --config <goal.yaml>
npm run goal:resume -- --config <goal.yaml>
npm run goal:integrate -- --config <goal.yaml>
npm run goal:land -- --config <goal.yaml>
npm run goal:stop -- --config <goal.yaml>
npm run validate
```

Canonical lint writes complete diagnostics to `.reports/pcr-lint.json` while
printing a bounded summary. Warning/error semantics and every check are unchanged;
see [Complete lint diagnostics](builder/README.md#complete-lint-diagnostics) for
report paths, failure behavior and CI artifacts.

The local `goal:*` Harness turns a bounded classification/category objective into a persistent, hash-chained queue.
It captures an allowlisted synthetic commit without changing the user's index or branch, gives each author a durable
Codex-visible task in its own Git worktree through one Goal-owned loopback app-server daemon, verifies the exact four-file
author commit, and serializes accepted mapping,
catalog, coverage, viewer, validation, and consumer checks in integration snapshots. Landing uses exact-byte
compare-and-swap and keeps author/integration worktrees after `stop` or a failed recovery. See
`builder/docs/tools/goal-harness.md` for the configuration schema, state paths, recovery behavior, JSON output, and
stable error codes.

`pcr:import:cpc` is the canonical CPC import entry point, and every invocation must pass `--source` explicitly. It
stores the raw source and metadata and regenerates the normalized hierarchy, leaves, and paths. The default mode
creates zero PCR records. If the version's mapping file is missing, it creates a zero-edge current mapping document; if the
mapping already exists, import validates it first and then preserves its exact bytes. A non-3.0 version must have a
coverage descriptor registered before import so the generated sources participate in catalog and runtime integrity
checks. Reusing a retained raw filename with different bytes fails closed; when source artifacts legitimately change,
the command reports coverage/catalog output as stale and points to the rebuild action.

`--legacy-scaffolds` is an explicit migration/test-only mode for retained v1/scaffold mapping fixtures. A current
v2 mapping makes it fail closed before mutation, so it cannot inject an unaccepted edge or rehydrate a retired
leaf-derived PCR directory. On a retained v1 fixture it may create one complete four-file scaffold when the target is
absent; an existing target must contain all four expected files and match the deterministic legacy template
byte-for-byte. It never repairs a partial directory or overwrites an accepted edge or PCR content. The old
`pcr:scaffold:cpc` command name is a protected compatibility alias and refuses to run without
`--legacy-scaffolds`. Do not use either legacy path for new classification imports.

The importer holds one lock for the CPC system/version coordinate, reads managed inputs without following symlinks,
checks that its preflight baseline has not changed, and stages each file or complete legacy directory before its
atomic installation. It commits the mapping last, so an interrupted or rejected import cannot leave a newly
published edge without its identity or PCR target; earlier classification-only artifacts may already be installed
and are safe to regenerate on the next run.

`pcr:sync-structured` regenerates `structured.yaml` from canonical Markdown and appends deterministic projection metadata: a generator contract version, canonical Markdown SHA-256, and generated-content SHA-256, with no timestamp. Repository lint validates every material projection against the shared JSON Schema, verifies its fingerprint, and rejects stale output. `--workspace` defaults to `current`; a published or deprecated current release cannot be synced or bumped in place.

First publication uses `pcr:publish --workspace current --version <semver>` and creates both the current release and its
initial immutable `releases/<semver>/` snapshot plus `release-history.yaml`. For a later version, `pcr:revise` opens
`revision/`, fixes a greater target version, and leaves the top-level release unchanged. Sync and lifecycle commands
must then use `--workspace revision`; reviewed revision publication uses `pcr:publish --workspace revision` without a
version argument. A deprecated PCR cannot be reopened.

Builder sync, bump, lifecycle, revise, and publish mutations replace the complete canonical leaf through a recoverable
directory transaction. Lock, journal, staging, and backup state live under `library/.pcr-builder-state/`;
`pcr:recover` rolls back interrupted pre-commit work or finishes committed cleanup. `--force-stale-lock` is only for
verified stale state when ordinary recovery requires it. Publication preflight still requires active reviewed
methodology, reviewed Chinese translation, valid SemVer, fresh projection content, and no unresolved review blocker.

`aliases:build` deterministically projects the retired CPC leaf-derived identity inventory into
`classifications/aliases/pcr-id-aliases.yaml`; `aliases:check` rejects a stale registry. Current mapping v2 files
contain accepted positive edges only, with reviewer, UTC decision time, and durable decision reference. Catalog
publication pins the alias registry path, exact-byte SHA-256, and entry count, then replaces `library/catalog.yaml`,
the material index, and coverage indexes as one journaled recoverable artifact set. Runtime alias reads fail closed
when that binding or registry drifts. If a catalog publication is interrupted, run `catalog:recover`, then
`catalog:check`; use `catalog:recover -- --force-stale-lock` only after confirming no writer is active.

PCR production agents may use `tiangong-lca-cli` to search Tiangong database flow, process, and dataset identity records and copy selected UUID references into PCR content. The CLI is an evidence tool for identity selection.

Builder docs live under `builder/docs/`. Start with `builder/AGENTS.md` for task routing and `builder/docs/index.md` for the compact documentation map. AI PCR production always synthesizes the current best PCR for the target product category; existing PCR content is prior evidence and a canonical write target.

## Public PCR CLI

Use `tiangong-pcr` to guide general LCA data creation, optionally author a TIDAS process,
or support Agent-led review of an existing TIDAS process/model:

```bash
npm --silent run tiangong-pcr -- tree --format markdown
npm --silent run tiangong-pcr -- list --scope material --format json
npm --silent run tiangong-pcr -- list --path-prefix agriculture-forestry-and-fishery-products/products-of-agriculture-horticulture-and-market-gardening --format json
npm --silent run tiangong-pcr -- list --scope legacy --page 1 --page-size 10 --format json
npm --silent run tiangong-pcr -- list --page 2 --page-size 10
npm --silent run tiangong-pcr -- coverage summary --classification cpc:3.0 --format json
npm --silent run tiangong-pcr -- coverage list --classification cpc:3.0 --page 1 --page-size 10 --format json
npm --silent run tiangong-pcr -- resolve --classification cpc:3.0:01111 --format json
npm --silent run tiangong-pcr -- resolve --pcr <pcr-id> --format json
npm --silent run tiangong-pcr -- show --pcr <pcr-id> --lang zh-CN
npm --silent run tiangong-pcr -- guidance --pcr <pcr-id> --format json
npm --silent run tiangong-pcr -- guidance batch --input <request.json> --output <new-file> --format json
npm --silent run tiangong-pcr -- guidance --pcr <pcr-id> --topic boundary --format json
npm --silent run tiangong-pcr -- inspect --input <process.json> --related <local-package> --section exchanges --format json
npm --silent run tiangong-pcr -- review prepare --pcr <pcr-id> --input <process.json> --output <new-review.json> --format json
npm --silent run tiangong-pcr -- review check --pcr <pcr-id> --input <process.json> --report <review.json> --format json
npm --silent run tiangong-pcr -- validate-dataset --pcr <pcr-id> --input <dataset-file> --format json
npm --silent run tiangong-pcr -- feedback draft --pcr <pcr-id> --type range_evidence_update --summary "<finding>"
```

The public CLI provides deterministic classification `resolve`, explicit `tree` and `list` methodology-catalog
browsing, classification `coverage summary|list`, structured and source-cited `guidance`, native TIDAS `inspect`,
explicit-basis `calculate`, Agent `review prepare|check`, limited legacy diagnostics and issue-ready feedback drafting.
`tree`, `list`, and the viewer default to material records. Use `--scope material|legacy|all` on catalog commands
when the scope must be explicit. `tree` defaults to a bounded depth-2 category view; use paginated
`list --path-prefix` to drill into a category. `list` defaults to 10 records per page and reports its filters,
effective scope, `has_more`, and copyable next/previous commands.

Classification coverage is separate from the methodology catalog. `coverage summary --classification cpc:3.0`
returns bounded aggregate counts, while `coverage list --classification cpc:3.0` returns explicit leaves in pages of
10 by default and supports `--status`. The checked-in coverage index is a deterministic read model derived from
normalized leaves, accepted mapping input, and material-target state; it is not a new authoring
truth. Its source descriptor records generator/contract versions plus exact-byte SHA-256 fingerprints for both input
files, and runtime reads fail closed when either source path or bytes no longer match. Mapped entries also project
the acceptance decision, which runtime resolution checks against the canonical mapping. Classification resolution
also fails closed when the derived coverage index is absent; it never falls back to selecting directly from mapping.

Material catalog and mapped resolve results carry a `readiness` object. A mapped edge identifies a PCR record; it does
not by itself claim that methodology is usable. Authored candidates are marked `review_required`. A known
classification leaf without an accepted mapping is a successful `resolve` result with `mapping: null` and
`pcr: null`.

`resolve` accepts exactly one selector: `--classification <system>:<version>:<code>` or `--pcr <pcr-id>`. Retired
leaf-derived ids are checked in the alias registry before catalog lookup. Their result is
`legacy_id_redirect` with a terminal coverage locator and copyable next command; the CLI never auto-follows that
locator into a PCR. `show`, `guidance`, and validation reject the same id with stable code
`PCR_LEGACY_ID_REDIRECT`, so retirement cannot be mistaken for ordinary not-found or usable methodology.

For material PCRs, readiness also reports `projection_fingerprint`. `pcr-core` validates the current
`structured.yaml` against the shared material projection Schema and recomputes its canonical-source and
generated-content hashes at runtime. A missing or invalid Schema/fingerprint is a readiness blocker, even when
the file exists. Runtime readiness separately checks material methodology completeness, so a current,
Schema-valid but empty projection is also unavailable. Empty scaffolds report the fingerprint as `not_required`.

Validation output reports `validation_status`, `completeness`, accepted input shape, checks performed, checks skipped, and findings by severity. Public readiness and validation reports are checked for both JSON shape and cross-field consistency, including blocker/usability alignment, finding totals, coverage totals, completeness, and status. A `passed` result applies only to `checks_performed`; consumers must inspect partial coverage. Validation commands default to `--fail-on error` and exit 2 when error findings are present or the result is inconclusive. Use `--fail-on never` explicitly when a report-only workflow must keep exit code 0.

The Skill has separate general-authoring, optional TIDAS-authoring and existing-data-review routes. A foreground
package is optional. The Agent judges scope, PCR applicability and evidence; the CLI exposes facts, citations and
arithmetic. Partial process boundaries must not be confused with whole-model omissions. Findings distinguish
confirmed issues, suspected anomalies and evidence gaps; `review check` validates the report envelope and source
bindings, never the truth of its conclusions. Legacy `validate-model` checks qualifier text presence and
`validate-dataset` checks protocol ID presence. Use TIDAS-owned tools for actual format validation.
See [agent-led consumption](docs/agentic-consumption.md) and the [consumer Skill](skills/tiangong-pcr/SKILL.md).

Use `npm --silent run tiangong-pcr -- --help` for the global Agent workflow and `npm --silent run tiangong-pcr -- <command> --help` for command-specific options, output shape, and next-step guidance.

Formats are enforced per command: `resolve`, `guidance`, and validation are JSON; `show` is Markdown; `tree` supports JSON or Markdown; `list` supports JSON, Markdown, or table output; feedback drafts support JSON or Markdown. With `--format json`, usage or runtime failures leave stdout empty and return a stable `{ "error": { "code", "message", "details", "exit_code" } }` envelope on stderr.

## Public PCR Documentation

The [English Getting started page](https://pcr.tiangong.earth/en/docs/getting-started/)
and [Chinese guide](https://pcr.tiangong.earth/zh/docs/getting-started/)
explain installation, Skill discovery and LCA/TIDAS tasks, with localized copyable
Agent prompts. Their [English raw Markdown](https://pcr.tiangong.earth/getting-started.md)
and [Chinese raw Markdown](https://pcr.tiangong.earth/getting-started.zh-CN.md) are
exported from the corresponding authored sources for direct Agent reading. Website availability
follows the next qualified product release containing these documentation pages.
Website guide translations do not change the English-only npm methodology content.


The public site in `packages/pcr-docs/` reads the canonical library through the core
consistent document API and the shared immutable-history verifier. It renders
ordinary Markdown as complete semantic HTML in a Next.js static export. Fumadocs
provides the documentation layout, navigation and search dialog. Unified tag qualification
builds the web artifact once; the existing EdgeOne Git project imports it from the
`release/production` deployment pointer. There is no request-time SSR; preview auto
deployment remains disabled. A bounded manual preview may qualify provider runtime
selection under the site contract without moving the production pointer.

```bash
npm ci
npm --prefix packages/pcr-docs ci
npm run docs:build
```

`docs:build` generates the full library, builds Next.js, then checks exported text,
source blocks, original-download hashes, source-bound search transport, routes, SEO and provider file limits,
and reports the export's total bytes and artifact composition. There is no fixed
aggregate-byte build cap; deployment capacity is checked against actual hosting
storage and retention. Use
`npm run docs:dev` for local work. Generated `.generated/`, `public/generated/`,
`.next/` and `out/` are ignored and must never be hand-authored.

English and Chinese are required for every material PCR. Optional languages use
canonical BCP 47 identities and must be explicitly declared; a declared missing
file fails validation. Valid optional translations receive real localized routes.
Candidate methodology and pending translation states remain visible; rendering
never grants review or publication approval. Raw YAML and Markdown retain their
original bytes, and the field inspector exposes complete parsed data.

See [the documentation site contract](docs/pcr-documentation-site-contract.md)
for source coverage, multilingual history, splitting, SEO and production gates.

## Local PCR Viewer

Use the static PCR viewer when you want to browse PCR records in a browser:

```bash
npm run viewer:build
npm run viewer:build -- --scope legacy
npm run viewer:serve
```

The build step defaults to material PCRs; use `--scope material|legacy|all` to choose another explicit record scope.
It reads records through `packages/pcr-core`, writes generated data under `packages/pcr-viewer/dist/data/`, and copies
the read-only browser assets into `packages/pcr-viewer/dist/`. Missing or empty selected-scope catalogs fail before
replacement. Custom output directories are replaced only when empty or marked as a previous viewer build; protected
repository and source paths are rejected after canonical path resolution. The replacement is prepared in a sibling
temporary directory so a failed build does not erase the last usable output. The local server also rejects requested
files whose resolved symlink target escapes the build root.

The viewer is a consumption surface only. It does not edit PCR Markdown, manifests, mappings, or `structured.yaml`.

## Migration Status

The consumption surfaces are now material-first: default catalog, tree, list, and viewer output represent methodology
records, while complete classification coverage remains queryable separately. Phase 2 steps 1-5 are complete:
ordinary CPC imports create zero PCR records, current mapping v2 retains accepted material edges only, and the
deterministic registry preserves retired leaf-derived ids as coverage locators. Read accepted edges from
`classifications/mappings/`, current coverage totals from `coverage summary` or `classifications/indexes/`, and alias
membership from `classifications/aliases/pcr-id-aliases.yaml`, whose count and digest are pinned by `library/catalog.yaml`.

The first Phase 3 physical pilot removed only CPC `99000`. Canonical manifests under `library/pcrs/` define the current
physical inventory; `library/indexes/pcr-index.yaml` enumerates material records, and explicit `list --scope legacy`
browsing inventories surviving scaffolds. Code `99000` now resolves as known-unmapped and its old PCR
id redirects through the alias registry. CPC `98000` and the broader physical migration remain pending; do not treat
the pilot as completion of bulk migration. Only authored or reviewed material records can enter guidance and
validation.

## Offline consumer distribution

The [offline distribution contract](docs/offline-distribution.md) defines the separate `@tiangong-lca/pcr` tool and
`@tiangong-lca/pcr-library` SQLite packages. The snapshot contains English Markdown and
structured YAML only; source authoring and translation workflows remain unchanged.
Use explicit snapshot selection and verification for offline consumption.

The 0.4.6 release-preparation examples target PCR tool/content 0.4.6 and the
qualified minimum `@tiangong-lca/cli` 0.1.25. Confirm the corresponding registry
versions are available before installation; source metadata or a preparing release
does not establish completed publication. Offline consumer targets include Linux
x64/ARM64, Windows x64 and macOS ARM64. Use the qualified Node 24.19.0 runtime
for task preparation; Tiangong CLI supports `>=24.19.0 <25`.

At the preparation boundary of a new task, select the installed PCR reader and a
dedicated absolute task directory:

```sh
tiangong-lca pcr snapshot ensure --task-dir <absolute-task-dir> --tool-root <absolute-installed-PCR-package> --json
tiangong-lca pcr snapshot status --task-dir <absolute-task-dir> --json
tiangong-lca pcr exec --task-dir <absolute-task-dir> -- list --format json
```

Require `task_usable: true`. Existing task directories retain their content and
reader pins without discovery. A capable reader 0.4.1 may consume newer content
under declared compatibility and any audited legacy reader profile; reader and
content SemVers need not match.

Package-specific installation and usage instructions live in the
[CLI README](packages/tiangong-pcr-cli/README.md) and the
[content library README](packages/tiangong-pcr-library/README.md). Each generated
npm package includes its own README and the full MIT license.

Product releases use one version source (`product-release.json`), immutable `v<version>` tags,
main-bound qualification and coordinated npm/website publication with verified retry receipts. See the [offline distribution contract](docs/offline-distribution.md#npm-release-automation)
for setup, first publication and retries. Npm release does not approve PCR methodology.

## License

TianGong LCA code and authored methodology content are licensed under the
[MIT License](LICENSE). Bundled dependencies and referenced third-party material
retain their own licenses and notices.
