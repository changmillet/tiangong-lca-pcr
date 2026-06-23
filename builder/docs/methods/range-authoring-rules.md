# Range Authoring Rules

Typical ranges are authoring priors and QA guardrails. Source-backed field evidence and foreground collection protocols produce the dataset values.

Every inventory amount should declare:

- `amount`: numeric value, range, formula description, or foreground-data requirement
- `amount_kind`: value shape, using `builder/vocab/amount-kind.yaml`
- `basis`: human-readable normalization basis, such as `per 1,000 kg reference product`
- `basis_kind`: normalized basis category, using `builder/vocab/basis-kind.yaml`
- `evidence_kind`: evidence category, using `builder/vocab/evidence-kind.yaml`
- `collection_protocol_id`: required when `evidence_kind` is `collected_record` or `calculated_from_collection`
- `source_ids`: source ids for external evidence or method formulas
- conversion notes when an area-based or process-row value is normalized to the PCR reference flow

Use narrow ranges when a source supports them. For first-dataset values, set `amount_kind` to `site_specific`, set `evidence_kind` to `collected_record` or `calculated_from_collection`, and link the row to the collection protocol that defines how the raw record is obtained and normalized.
