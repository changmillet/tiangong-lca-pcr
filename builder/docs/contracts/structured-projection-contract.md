# Structured Projection Contract

`structured.yaml` is a generated projection from canonical `pcr.en-US.md`.

## Rules

- Regenerate `structured.yaml` with `npm run pcr:sync-structured -- --pcr <library/pcrs/...>` during PCR authoring.
- Commit Markdown and generated structured projection together.
- Keep the projection limited to PCR facts, rules, UUID references, data production rules, dataset profile fields, and source references.

## Projection Fields

Expected generated fields include:

- `schema_version`
- `generated_from`
- `source_markdown`
- `product_category_identity`
- `functional_unit`
- `boundary_abstraction`
- `reference_flow_definition`
- `reference_flows`
- `measurement_rules`
- `process_inventory`
- `dataset_production.collection_protocols`
- `dataset_production.calculation_rules`
- `dataset_production.data_quality_requirements`
- `published_dataset_profile`
- `data_sources`

Legacy fields remain schema-compatible for older records. New material PCR records use the fields above.
