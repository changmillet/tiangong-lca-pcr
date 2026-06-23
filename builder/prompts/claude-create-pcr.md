# Claude Code Prompt: Create or Update PCR

Author or update the target TianGong LCA PCR according to repository contracts.

Read first:

- `builder/AGENTS.md`
- `builder/agent-workflows/create-pcr.md`
- `builder/contracts/pcr-markdown-contract.md`
- `builder/contracts/structured-projection-contract.md`
- `builder/vocab/*.yaml`

Required behavior:

- Use Markdown as the authored source.
- Preserve bilingual alignment.
- Use UUID-only Tiangong references.
- Keep external evidence in `Data Sources`.
- Regenerate `structured.yaml` with the builder CLI.
- Validate before reporting completion.
