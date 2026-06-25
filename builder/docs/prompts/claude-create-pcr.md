# Claude Code Prompt: Create or Update PCR

Produce the target TianGong LCA PCR according to repository contracts.

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
- Synthesize the current best PCR for the target product category from all available evidence. Existing PCR content is prior evidence and a canonical write target, not a separate reasoning mode.
- Build PCR content from public evidence, domain common sense, Tiangong lookup, user-provided source material, and declared foreground collection protocols.
- For important flows, add evidence-backed ranges when available; otherwise add broad provisional ranges only when clearly marked with `reasoned_estimate`.
- Decide boundary abstraction before writing PCR facts.
- Regenerate `structured.yaml` with the builder CLI.
- Validate before reporting completion.
