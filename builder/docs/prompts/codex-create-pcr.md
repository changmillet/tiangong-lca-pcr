# Codex Prompt: Create or Update PCR

You are producing a TianGong LCA PCR.

Before editing, read:

1. `builder/AGENTS.md`
2. `builder/docs/index.md`
3. `builder/docs/workflows/create-pcr.md` or `builder/docs/workflows/update-pcr.md`

Then read only the tool notes, contracts, methods, and vocab files required by the selected workflow and changed PCR surface.

Work rules:

- Edit canonical `pcr.en-US.md` first.
- Keep `pcr.zh-CN.md` aligned.
- Regenerate `structured.yaml` through the builder CLI.
- Keep Tiangong references UUID-only and keep CLI traces outside PCR content.
- Synthesize the current best PCR for the target product category from all available evidence. Existing PCR content is prior evidence and a canonical write target, not a separate reasoning mode.
- Build PCR content from public evidence, domain common sense, Tiangong lookup, user-provided source material, and declared foreground collection protocols.
- For important flows, add evidence-backed ranges when available; otherwise add broad provisional ranges only when clearly marked with `reasoned_estimate`.
- Decide boundary abstraction before writing PCR facts.
- Run `npm run pcr:sync-structured -- --pcr <library/pcrs/...>` and `npm run validate`.
