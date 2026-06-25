# Data Package Authoring Loop

1. Resolve or select the PCR.
2. Read `guidance` JSON.
3. Treat `reference_flow.required_qualifiers` as required dataset metadata.
4. Use `boundary_abstraction` to declare same-category recursive starting conditions.
5. Use `process_map` to decide required, conditional, optional, and excluded process coverage.
6. Use `process_inventory` rows as expected foreground flow roles.
7. Use `production_guidance.collection_protocols` to build collection record templates.
8. Use `production_guidance.calculation_rules` to normalize collected records to PCR values.
9. Preserve `value_mode`, `specificity`, `basis_kind`, `evidence_kind`, `collection_protocol_id`, and `source_ids` in data package notes.
10. Use `published_dataset_profile` to describe downstream `secondary_dataset` and `background_dataset` use.
11. Run `validate-dataset` before handoff.
