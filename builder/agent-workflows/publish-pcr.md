# Publish PCR Workflow

Use this workflow when preparing a PCR for published consumption by agents, CLI, or downstream systems.

## Preconditions

- English and Chinese Markdown are aligned.
- `structured.yaml` has been regenerated from canonical Markdown.
- UUID references do not include dataset versions.
- Data Sources only include external or non-default evidence.
- Validation passes.

## Steps

1. Run `npm run pcr:sync-structured -- --pcr <library/pcrs/...>`.
2. Run `npm run validate`.
3. Inspect `manifest.yaml` lifecycle fields.
4. Choose the version explicitly.
5. Run `npm run pcr:publish -- --pcr <library/pcrs/...> --version <semver>`.
6. Re-run `npm run validate`.
7. Commit Markdown, manifest, and generated structured projection together.

## Publication Rule

Publication changes `manifest.yaml` lifecycle state. It does not make unresolved methodology questions acceptable inside PCR content.
