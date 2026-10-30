---
lastReviewedAt: 2026-10-30
lastReviewedCommit: 56e912858aa769ff13075fa852a344d0b730a3b9
lastReviewedNote: "PCR #159: reviewed stable product 0.4.10 preparation at 56e91285. Authority, three package mirrors and docs lock root metadata advance together; dependency resolutions, canonical content, methodology/translation state, reader minimum and runtime pins remain unchanged. Current preparation notes distinguish verified public 0.4.9 from pending new tag qualification, coordinated npm/site publication and exact workspace integration."
title: Agent-led PCR consumption and review
docType: contract
scope: repo
status: active
authoritative: true
owner: tiangong-lca-pcr
language: en
whenToUse:
  - when authoring LCA data or reviewing TIDAS inputs with the PCR consumer
whenToUpdate:
  - when consumption commands, review evidence or Skill responsibilities change
checkPaths:
  - packages/pcr-core/src/consumption-*.ts
  - packages/pcr-core/src/tidas-inspection.ts
  - packages/pcr-core/schemas/agent-review.schema.json
  - packages/tiangong-pcr-cli/**
  - skills/tiangong-pcr/**
related:
  - docs/offline-distribution.md
  - docs/architecture.md
---

# Agent-led PCR consumption

PCR supports general LCA data authoring, optional TIDAS process authoring, and
review of existing TIDAS process/model data. A foreground collection package is
an optional working artifact, not a universal input format. The consuming Agent
selects applicable methodology, investigates evidence, considers alternative
explanations and writes a review. CLI operations expose facts, source locations
and arithmetic; they do not run an LLM or approve methodology.

## Representation decision

- Entities: source-addressable input/guidance views (F3 boundary) and an Agent
  review (F2 projection with a versioned envelope and free semantic content).
- Consumers: the invoking Agent, the user, and optional report tooling.
- Maturity/truth: input views are observed facts; review conclusions are attributed
  interpretations, not publication or compliance decisions.
- Evidence: exact input bytes, verified PCR projection identity, JSON Pointers,
  applicability explanations, limitations and reproducible calculations.
- Mutation: source inputs remain unchanged; the Agent may revise its report as
  evidence changes. Report checking requires the same explicitly selected inputs.
- Evolution: promote additional fields only after consumer evaluations demonstrate
  stable need; remove constraints that force unsupported or misleading conclusions.
- Validation loop: meaningful negative fixtures, offline package smoke tests and
  simple-prompt Agent trials; schema validity never certifies semantic correctness.

The Skill metadata names all three tasks. Its body carries scope/evidence judgment;
optional references carry TIDAS mapping and review examples. PCR methodology stays
in the selected library. Local facts and tooling failures must remain distinguishable
from issues inferred by the Agent.

## Responsibilities and compatibility

TIDAS owns its format. PCR's read-only adapter uses the public process, lifecycle
model, flow, flow-property and unit-group field paths. The inspected contract is
the toolkit's pinned public-spec candidate 0.2.3 at
`f118660dbcbfbf736be74837cce0bf26cd177245` (toolkit source
`6ede550618b274b8b3044ba8124bc6e9beab3e8e`). This records the field-contract basis,
not a claim that the candidate is a formal specification release. No TIDAS schemas
or executable validation policies are copied into PCR.

For structural validation use the separately provisioned offline `tidas` toolkit:
`tidas validate <package-dir> --issues <issues.jsonl> --format json`; record its
version and actual report. Use its command help for the installed version. PCR
inspection remains useful for incomplete drafts and explicitly does not assert
schema validity. TIDAS SDK creation/validation is optional for the TIDAS authoring
route; general LCA authoring has no SDK/toolkit prerequisite.

Existing `validate-model` checks qualifier text presence and `validate-dataset`
checks collection protocol ID presence. Their report/exit contracts remain
compatible. Their results cover only reported performed checks. Neither command
performs TIDAS structural or agentic methodology review.

## Review scope and evidence

| Command | Contract |
| --- | --- |
| `guidance --topic <topic>` | Paged complete projection values with stored hashes, rule IDs and complete source context |
| `guidance --pointer <pointer>` | Complete value at a verified projection location |
| `inspect --input <file> [--related <directory>]` | Native TIDAS summary, exchanges/instances, local references or original pointer values; no schema-validity claim |
| `calculate --input <request.json>` | Explicit-basis normalization, conversion or balance arithmetic with the source request hash |
| `review prepare --pcr <id> --input <file>` | An unreviewed report with input/PCR bindings and open coverage |
| `review check --pcr <id> --input <file> --report <review.json>` | Shape, binding and source-pointer checks with `methodology_approval: false` |

Inspection views retain their explicit preview/page contracts. Guidance schema 2 paginates complete values without character truncation, retaining source units and ancestor preambles. Exact pointer reads preserve original values; use `--output` when
the complete result exceeds the stdout budget. Output files are created exclusively.
Reference resolution uses dataset kind, UUID and the requested version. A unique
match without a requested version is labeled unspecified; duplicates and mismatched
versions never silently choose a file. Only supplied local files are examined.

First establish the intended product, reference basis, declared gate and whether
the input describes one operation, an aggregated process, or a connected model.
A whole-lifecycle PCR requirement need not be fulfilled inside every individual
process. Resolve supplied related process data before deciding a model stage is
missing. Unavailable references mean unavailable evidence, not proof of absence.

Guidance selection preserves rule text, applicability, source IDs and the
projection pointer. Existing explicit rule IDs remain stable; pointer-only
locations are snapshot-bound and must not be treated as cross-version identities.
Candidate PCR readiness remains visible in views and reports.

Review findings carry confirmed_issue, suspected_anomaly or evidence_gap separately
from severity. They retain observations, rationale, input/PCR references, remaining
questions and suggested action. The report records reviewed, not-applicable and
unreviewed topics in prose with reasons. No count-based compliance percentage or
overall pass/fail is inferred from Agent coverage.

## Validation packet

Use synthetic, explicitly labeled TIDAS-shaped fixtures with real field names:
a partial sowing process, its surrounding model, repeated process instances,
missing/ambiguous/version-mismatched references, and a stated reference-basis error.
Also exercise singleton/array representations, zero versus missing quantities,
pointer escaping, page bounds, stale source hashes and maliciously shaped reports.
These drafts exercise inspection, not full TIDAS schema compliance.

Consumer prompts remain simple: “Create LCA data for 1 kg of wheat”, “Create a
TIDAS process draft for 1 kg of wheat”, and “Review this TIDAS process/model”.
Evaluate supported findings, false lifecycle-gap claims, uncertainty handling,
traceable evidence and repair/review behavior. A single Agent trial is smoke
evidence rather than a statistical accuracy claim.

Package ownership is unchanged: the tool contains CLI/Skill/adapter/report support;
the library contains English methodology. Both operate without network access.
Fully offline semantic review additionally requires an offline-capable Agent/model
provided by the caller.

## Product release selection

A product release gives its reader, SQLite package and website one immutable
version/source identity. Consumption can select a newer content release with an
older capable reader: the declared library format, projection contracts, command
protocol and minimum reader version decide compatibility, not equal SemVers.
Historical releases without declarations require an audited consumer profile.
See [the distribution contract](offline-distribution.md) for these declarations.

The qualified task-preparation runtime is Node 24.19.0; Tiangong CLI supports
`>=24.19.0 <25`. The minimum preparation CLI is released `@tiangong-lca/cli` 0.1.25;
confirm publication before installing it. Product 0.4.6 preparation does not prove
registry or website availability, and its compatibility minimum remains reader
0.4.1. The bundled thin Skill prepares a dedicated PCR task with Tiangong CLI's
`pcr snapshot ensure --task-dir <absolute-task-dir> --tool-root <installed-reader> --json`.
A new connected task obtains the latest compatible complete stable release and
requires `task_usable: true` before consumption. Explicit version/local selections
and offline requests take precedence. Existing task directories retain their data
and reader pins without discovery; continuing a task never upgrades its methodology.
Preserve the lock files and invoke native PCR arguments through
`pcr exec --task-dir <absolute-task-dir> -- ...`. The wrapper verifies the retained
context and supplies the library/hash; follow-up pagination retains query arguments
but does not forward standalone source overrides. Paths resolve from the task
folder, so use absolute paths for inputs elsewhere.

Tiangong CLI owns discovery, download, cache and task bindings. PCR core remains
an offline read-only consumer; this Skill is an explicit preparation workflow, not
a hook intercepting every host's task creation. A requested standalone or repository
workflow keeps its explicit source selection and is not described as auto-updating.
Installing an npm package does not activate its Skill or approve methodology.

Retain content version, source commit and full-source fingerprint independently
from individual PCR/readiness and SQLite payload hashes. The product fingerprint
and English-only SQLite source hash cover different domains. A newer website or
published snapshot does not invalidate or silently replace an existing task's pin.

## Normative source context

Follow the [semantic projection contract](semantic-projection-contract.md) for v2 source units, normalized positions, snapshot-local IDs and legacy enrichment provenance. Read a selected rule together with its complete unit and `ancestor_context`; the flat display and generic `applies_to` do not determine scientific applicability. Old immutable v1 snapshots remain readable with separately identified source-derived context.

## Complete batch reads

Use `guidance batch --input request.json --output <new-result.json> --library <snapshot> --format json` for several known PCR IDs. The request is `{ "schema_version": 1, "pcr_ids": ["<id>"] }` with one to 100 IDs. Input order and duplicates are preserved. The entire batch succeeds or fails; an unavailable item never produces a partial output file. Optional topic/pointer/page selection retains complete normative units and ancestor context for each result. Large results require an exclusive `--output` file, rather than truncation.

One owned synchronous session opens the immutable library once and reuses verified selected projections. It returns source identity and operation statistics. Repository sessions recheck selected bytes before return; SQLite sessions use one readonly transaction, verify the full file by default, and still verify selected artifacts. The public session API does not accept cached validation receipts. Callback Promises are rejected, source scopes remain isolated when nested, and reads after closure fail. Statistics remain inspectable after closure.
