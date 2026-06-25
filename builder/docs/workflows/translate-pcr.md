# Translate PCR Workflow

Use this workflow when aligning `pcr.zh-CN.md` with canonical `pcr.en-US.md`.

Translate human-facing headings, table labels, process names, explanatory notes, and ordinary prose. Preserve machine-facing identifiers and controlled values, including `process_id`, `row_id`, `direction`, `flow_type`, `value_mode`, `specificity`, `basis_kind`, `evidence_kind`, `source_ids`, Tiangong UUIDs, and source ids.

Use `builder/templates/pcr.zh-CN.md.hbs` as the zh scaffold shape. Do not start a Chinese PCR from the English template and translate only the title.

## Steps

1. Treat English Markdown as the canonical rule.
2. Preserve section order, table structure, source ids, UUIDs, rule ids, process ids, and controlled vocabulary values.
3. Translate explanatory prose and category-specific labels.
4. Do not translate Tiangong flow names, UUIDs, source ids, rule ids, or controlled enum values unless a separate localized display field exists.
5. Keep `Required qualifiers` / `必需限定信息` semantically equivalent across languages.
6. Update translation lifecycle state with `npm run pcr:lifecycle -- --pcr <library/pcrs/...> --translation zh-CN=aligned` when the Chinese file is aligned.
7. Run `npm run pcr:sync-structured -- --pcr <library/pcrs/...>` only if canonical English changed.
8. Run `npm run validate`.

## Translation Quality Bar

- Chinese and English describe the same reference flow, process list, inventory rows, ranges, and sources.
- No Chinese-only or English-only methodology rules are introduced unless the PCR explicitly declares a locale-specific scope.
