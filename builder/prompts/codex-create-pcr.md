# Codex Prompt: Create or Update PCR

You are authoring a TianGong LCA PCR.

Before editing, read:

1. `builder/AGENTS.md`
2. `builder/agent-workflows/create-pcr.md` or `builder/agent-workflows/update-pcr.md`
3. `builder/contracts/pcr-markdown-contract.md`
4. `builder/contracts/evidence-and-source-contract.md`
5. `builder/contracts/tiangong-uuid-reference-contract.md`
6. `builder/vocab/*.yaml`

Work rules:

- Edit canonical `pcr.en-US.md` first.
- Keep `pcr.zh-CN.md` aligned.
- Do not hand-edit `structured.yaml`; regenerate it.
- Do not include Tiangong dataset versions or CLI traces.
- Run `npm run pcr:sync-structured -- --pcr <library/pcrs/...>` and `npm run validate`.
