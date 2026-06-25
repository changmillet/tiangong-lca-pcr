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

## Process Inventory Amount Shape

Generated `process_inventory` rows use stable `row_id` plus a nested `amount` object:

```yaml
amount:
  expression: measured water use
  value_mode: foreground_record
  specificity: site_specific
  basis:
    text: per 1,000 kg cleaned product output
    kind: process_output
  evidence:
    kind: collected_record
    collection_protocol_id: cp_washing_water_records
    source_ids: []
  ranges:
    - role: qa_guardrail
      lower: "0.5"
      upper: "3.0"
      unit: m3
      basis: per 1,000 kg cleaned product output
      basis_kind: process_output
      evidence_kind: external_source
      source_ids:
        - source-id
```

`ranges` are optional amount metadata. They must not be collapsed into `value_mode`.
