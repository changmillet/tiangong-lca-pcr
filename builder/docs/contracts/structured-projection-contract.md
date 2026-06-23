# Structured Projection Contract

`structured.yaml` is a generated projection from canonical `pcr.en-US.md`.

## Rules

- Do not hand-edit `structured.yaml` during PCR authoring.
- Regenerate with `npm run pcr:sync-structured -- --pcr <library/pcrs/...>`.
- Commit Markdown and generated structured projection together.
- The projection must not contain CLI traces, review notes, or Tiangong dataset versions.

## Projection Fields

Expected generated fields include:

- `schema_version`
- `generated_from`
- `source_markdown`
- `reference_flow_definition`
- `reference_flows`
- `measurement_rules`
- `process_inventory`
- `data_sources`

Legacy fields may be tolerated by schema compatibility but should not be authored in new PCR records.
