# Translate PCR Workflow

Use this workflow when aligning `pcr.zh-CN.md` with canonical `pcr.en-US.md`.

## Steps

1. Treat English Markdown as the canonical rule.
2. Preserve section order, table structure, source ids, UUIDs, rule ids, process ids, and controlled vocabulary values.
3. Translate explanatory prose and category-specific labels.
4. Do not translate Tiangong flow names, UUIDs, source ids, rule ids, or controlled enum values unless a separate localized display field exists.
5. Keep `Required qualifiers` semantically equivalent across languages.
6. Run `npm run pcr:sync-structured -- --pcr <library/pcrs/...>` only if canonical English changed.
7. Run `npm run validate`.

## Translation Quality Bar

- Chinese and English describe the same reference flow, process list, inventory rows, ranges, and sources.
- No Chinese-only or English-only methodology rules are introduced unless the PCR explicitly declares a locale-specific scope.
