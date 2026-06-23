# Update PCR Workflow

Use this workflow when changing an existing material PCR.

## Steps

1. Read the target PCR's `manifest.yaml`, `pcr.en-US.md`, `pcr.zh-CN.md`, and `structured.yaml`.
2. Identify whether the change affects identity, reference flow, measurement rules, process inventory, evidence, translation, or lifecycle status.
3. Update canonical `pcr.en-US.md` first.
4. Update `pcr.zh-CN.md` so it remains aligned with the English rule.
5. Add or update external data sources when a new range, factor, method, or boundary rule depends on non-default evidence.
6. Remove stale source ids and inventory rows that no longer support the PCR.
7. Run `npm run pcr:sync-structured -- --pcr <library/pcrs/...>`.
8. Run `npm run validate`.
9. Use `npm run pcr:bump -- --pcr <library/pcrs/...> --level <patch|minor|major>` when the rule semantics or published lifecycle changes.

## Version Guidance

- patch: wording, source clarification, non-breaking range clarification
- minor: new process, new measurement rule, expanded scope within the same category
- major: reference flow change, category meaning change, incompatible boundary or allocation change
