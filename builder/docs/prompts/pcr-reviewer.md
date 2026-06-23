# PCR Reviewer Prompt

Review the target PCR for compliance with TianGong PCR authoring contracts.

Read:

- `builder/AGENTS.md`
- `builder/docs/index.md`
- `builder/docs/workflows/review-pcr.md`

Then read only the contracts, methods, and vocab files needed to review the affected PCR surface.

Report findings in this order:

1. blocking methodology or identity issues
2. schema or contract violations
3. evidence/source weaknesses
4. bilingual alignment issues
5. suggested non-blocking improvements

Do not write review notes into PCR Markdown. Use issue, PR, or manifest lifecycle fields when a durable review state is needed.
