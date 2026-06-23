# Create PCR Workflow

Use this workflow when the current best PCR for a target product category has no existing canonical PCR record and must be written as a new PCR directory.

## Inputs

- target PCR directory under `library/pcrs/**`
- target product category and classification mapping context
- Tiangong CLI or database access for UUID lookup
- external sources for method rules, factors, process decomposition, and boundary rules
- optional user notes, seed examples, or source files

The AI produces the current best PCR from available evidence. This workflow writes that result into a new canonical PCR record. UUIDs, quantitative ranges, allocation formulas, and mandatory boundary rules use Tiangong lookup, cited public evidence, or declared foreground collection protocols before they are treated as final PCR content.

## Steps

1. Read `builder/AGENTS.md`, `builder/docs/tools/tiangong-lca-cli.md`, `builder/docs/tools/data-sources-and-tools.md`, `builder/docs/contracts/pcr-markdown-contract.md`, `builder/docs/contracts/evidence-and-source-contract.md`, and `builder/vocab/*.yaml`.
2. Inspect `manifest.yaml`, classification refs, and mapping entries.
3. Confirm that no existing canonical PCR record covers the same semantic product category.
4. Write scope, exclusions, product category identity, typical market state, candidate processes, and likely flows from the current PCR synthesis.
5. Define product category identity with canonical PCR id, classification refs, covered products, excluded products, representative product, production route, and market state.
6. Define functional unit and reference flow objects using `Field | Value` tables.
7. Use Tiangong CLI or database search to select UUID-bearing flow, flow property, and unit group references. Unresolved UUIDs stay blank and are tracked in `manifest.yaml` review metadata.
8. Define measurement and unit rules where they affect consistency, conversion, or validation.
9. Populate `Boundary Abstraction` with the resulting declared starting condition, role, classification scope, recursive input rule, upstream dataset requirement, and disclosure.
10. Define common data production processes before writing detailed inventory rows.
11. For each process, write inventory rows by direction and flow type: product, waste, elementary.
12. Record amounts, exact values, ranges, formulas, or foreground collection requirements with controlled `amount_kind`, `basis_kind`, and `evidence_kind`.
13. Link collected foreground rows and calculated foreground rows to `collection_protocol_id`.
14. Define data collection protocols with raw fields, collection method, unit, frequency, coverage, scope, aggregation rule, and quality evidence.
15. Define calculation rules from collected fields to normalized PCR values.
16. Define data quality requirements for identity, measurement, temporal coverage, completeness, and disclosure.
17. Define the published dataset profile with dataset role, downstream use, allowed use, excluded use, metadata, quality disclosure, and update trigger.
18. Add external data sources and reference their source ids from inventory or rule rows.
19. Keep authoring traces, unresolved review notes, and lifecycle state in `manifest.yaml`, issue records, or PR records.
20. Write `pcr.en-US.md` first.
21. Write `pcr.zh-CN.md` as an aligned rendering of the same rule.
22. Run `npm run pcr:sync-structured -- --pcr <library/pcrs/...>`.
23. Run `npm run validate`.
24. Update `manifest.yaml` lifecycle fields when content maturity changes.

## Required PCR Facts

- PCR identity: canonical PCR id, classification refs, included products, excluded products, representative product, route, and market state.
- Functional unit and reference flow: what is measured, quantity, quality qualifiers, time or production cycle, Tiangong flow UUID, property UUID, unit group UUID, and unit.
- Boundary abstraction: declared starting condition, role, same-category recursive input rule, classification scope, required disclosure, and upstream dataset requirement.
- Foreground production basis: process map, inventory rows, collection protocols, calculation rules, data quality requirements, and source ids.
- Published dataset profile: role, downstream use as `secondary_dataset` and/or `background_dataset`, allowed use, excluded use, required metadata, required quality disclosure, and update trigger.
