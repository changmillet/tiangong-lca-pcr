# PCR Manifest Contract

`manifest.yaml` owns PCR identity and lifecycle state that should not be duplicated in Markdown prose.

## Required Identity Fields

- `schema_version`
- `id`
- `title.en-US`
- `title.zh-CN`
- `status`
- `pcr_kind`
- `content_maturity`
- `target_entities`
- `languages.canonical`
- `languages.available`

## Classification References

Classification references may appear in `classification_refs`, but classification systems do not own PCR identity.

Use classification refs for mapping context only:

```yaml
classification_refs:
  - system: CPC
    version: "3.0"
    code: "01111"
    title: "Wheat, seed"
    mapping_type: exact
```

## Lifecycle Fields

Use top-level lifecycle fields for version state:

- `version`
- `status`
- `updated_at_utc`
- `published_at_utc`
- `content_maturity`
- `translation_status`

Review or publication state belongs here or in GitHub issue/PR records, not in PCR Markdown sections.
