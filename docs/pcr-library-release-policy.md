# PCR Library Release Policy

PCR release state is managed per PCR in `manifest.yaml`.

Use:

- `npm run pcr:lifecycle -- --pcr <library/pcrs/...> ...` for review, content maturity, and translation state changes.
- `npm run pcr:bump -- --pcr <library/pcrs/...> --level patch|minor|major` for semantic version increments.
- `npm run pcr:publish -- --pcr <library/pcrs/...> --version <semver>` to regenerate structured output and mark the PCR as published.

Publication requires aligned English and Chinese Markdown, regenerated `structured.yaml`, no unresolved methodology blockers, and passing `npm run validate`.
