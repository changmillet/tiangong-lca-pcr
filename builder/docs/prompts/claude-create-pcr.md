# Claude Code Prompt: Create or Update PCR

Author or update the target TianGong LCA PCR according to repository contracts.

Read first:

- `builder/AGENTS.md`
- `builder/docs/index.md`
- `builder/docs/workflows/create-pcr.md`

Then read only the tool notes, contracts, methods, and vocab files required by the selected workflow and changed PCR surface.

Required behavior:

- Use Markdown as the authored source.
- Preserve bilingual alignment.
- Use UUID-only Tiangong references.
- Keep external evidence in `Data Sources`.
- Use common sense only for create-time initialization, not as final evidence for UUIDs or ranges.
- Treat update work as input-driven and preserve unaffected PCR content.
- Regenerate `structured.yaml` with the builder CLI.
- Validate before reporting completion.
