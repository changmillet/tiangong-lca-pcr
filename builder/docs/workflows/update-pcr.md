# Update PCR Workflow

Use this workflow when the current best PCR for a target product category should be written into an existing canonical PCR record.

Existing PCR content is prior evidence and the canonical write target. Direct user instructions, source files, reviewer notes, datasets, and database alignments can narrow the changed surface, but the AI still synthesizes the current best PCR before editing.

## Inputs

An update may be driven by:

- direct user instruction
- source document, file, table, or dataset
- reviewer feedback
- Tiangong database alignment change
- classification mapping correction
- publication or lifecycle requirement

## Steps

1. Read `builder/AGENTS.md`, `builder/docs/tools/tiangong-lca-cli.md`, `builder/docs/tools/data-sources-and-tools.md`, and the relevant contracts.
2. Read the target PCR's `manifest.yaml`, `pcr.en-US.md`, `pcr.zh-CN.md`, and `structured.yaml`.
3. Compare the current PCR synthesis with the existing record.
4. Identify whether the synthesis or driving input changes identity, reference flow, measurement rules, boundary abstraction, process inventory, evidence, translation, classification refs, or lifecycle status.
5. If the input is a document, file, or dataset, extract only the PCR-relevant claims and create or update stable source ids.
6. If the input is a Tiangong alignment change, update UUID-bearing references without adding Tiangong rows to `Data Sources` unless they provide non-default quantitative evidence.
7. Update canonical `pcr.en-US.md` first.
8. Update `pcr.zh-CN.md` so it remains aligned with the English rule.
9. Add or update external data sources when a new range, factor, method, or boundary rule depends on non-default evidence.
10. Remove stale source ids and inventory rows that no longer support the PCR.
11. Update `manifest.yaml` review metadata when the input creates unresolved identity, evidence, or translation gaps.
12. Run `npm run pcr:sync-structured -- --pcr <library/pcrs/...>`.
13. Run `npm run validate`.
14. Use `npm run pcr:lifecycle -- --pcr <library/pcrs/...> --status <status> --content-maturity <state> --translation <lang=status>` when review, maturity, or translation state changes.
15. Use `npm run pcr:bump -- --pcr <library/pcrs/...> --level <patch|minor|major>` when the rule semantics or published lifecycle changes.

## Version Guidance

- patch: wording, source clarification, non-breaking range clarification
- minor: new process, new measurement rule, expanded scope within the same category
- major: reference flow change, category meaning change, incompatible boundary or allocation change
