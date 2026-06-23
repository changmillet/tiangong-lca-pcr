# Process Map Rules

PCR process inventories should start from a process map before detailed flow rows are authored.

The process map should identify:

- stable process id
- process label
- inclusion status, using `builder/vocab/process-inclusion.yaml`
- role in the model, such as foreground production, conditioning, storage, delivery, use, or end-of-life
- quantitative reference or output basis when relevant
- inclusion condition for conditional processes

The detailed `### Process: <process name>` sections should align with the process map. Required processes should have inventory rows or an explicit reason why no material flows are expected.

Use process ids that are stable slugs. Do not use classification codes as process ids.
