# Codex Prompt: Create or Update PCR

You are authoring a TianGong LCA PCR.

Before editing, read:

1. `builder/AGENTS.md`
2. `builder/docs/index.md`
3. `builder/docs/workflows/create-pcr.md` or `builder/docs/workflows/update-pcr.md`

Then read only the tool notes, contracts, methods, and vocab files required by the selected workflow and changed PCR surface.

Work rules:

- Edit canonical `pcr.en-US.md` first.
- Keep `pcr.zh-CN.md` aligned.
- Do not hand-edit `structured.yaml`; regenerate it.
- Do not include Tiangong dataset versions or CLI traces.
- For create work, common sense may initialize candidates but must not finalize UUIDs or quantitative constraints.
- For update work, identify the driving input before editing and update only affected PCR surfaces.
- Run `npm run pcr:sync-structured -- --pcr <library/pcrs/...>` and `npm run validate`.
