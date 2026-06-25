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

Controlled lifecycle values are defined in `builder/vocab/`:

- `status`: `scaffold`, `candidate`, `active`, `published`, `deprecated`
- `content_maturity`: `empty_scaffold`, `draft_methodology`, `authored_methodology`, `reviewed_methodology`, `published_methodology`, `deprecated_methodology`
- `translation_status.<language>`: `not_available`, `scaffold`, `scaffold_pending_translation`, `draft_translation`, `aligned`, `reviewed`, `out_of_sync`

Use the lifecycle CLI to update review and translation state:

```bash
npm run pcr:lifecycle -- --pcr <library/pcrs/...> --status active --content-maturity reviewed_methodology --translation zh-CN=reviewed
```

`pcr:lifecycle` updates `updated_at_utc` but does not regenerate `structured.yaml` and does not publish a PCR. Use `pcr:publish` only when assigning a published version and `published_at_utc`.
