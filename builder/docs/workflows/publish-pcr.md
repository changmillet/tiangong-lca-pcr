# Publish PCR Workflow

Use this workflow when preparing a PCR for published consumption by agents, CLI, or downstream systems.

## Preconditions

- English and Chinese Markdown are aligned.
- `structured.yaml` has been regenerated from canonical Markdown.
- UUID references do not include dataset versions.
- Data Sources only include external or non-default evidence.
- Validation passes.
- Important flows have range blocks; reviewed or published PCRs must not rely on missing important-flow ranges.

## Steps

1. Run `npm run pcr:sync-structured -- --pcr <library/pcrs/...>`.
2. Run `npm run validate`.
3. Inspect `manifest.yaml` lifecycle fields.
4. If review or translation state must change before publication, run `npm run pcr:lifecycle -- --pcr <library/pcrs/...> --status active --content-maturity reviewed_methodology --translation zh-CN=reviewed`.
5. Choose the version explicitly.
6. Run `npm run pcr:publish -- --pcr <library/pcrs/...> --version <semver>`.
7. Re-run `npm run validate`.
8. Commit Markdown, manifest, and generated structured projection together.

## Publication Rule

Publication changes `manifest.yaml` lifecycle state. It does not make unresolved methodology questions acceptable inside PCR content.
