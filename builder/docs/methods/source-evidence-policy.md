# Source Evidence Policy

PCR content that constrains modelling choices should cite evidence. Scaffold files may remain empty, but generated PCR records must keep their maturity status explicit in `manifest.yaml`.

Material PCRs should include a `Data Sources` section in Markdown and a `data_sources` array in `structured.yaml`.

Use stable source ids, then reference those ids from reference-flow, process-inventory, allocation, data-quality, and validation rules. A source record should include:

- source id
- title
- source type, such as `official-guidance`, `literature`, `standard`, `dataset`, or `method-factor`
- URL, DOI, report identifier, or other stable reference when available
- retrieved date when the source is web-hosted
- the PCR use, such as `flow identity`, `range evidence`, `process decomposition`, or `emission factor`

Tiangong database rows are the default source for UUID-bearing flow, flow property, unit group, process, and lifecyclemodel references. Record selected Tiangong UUIDs without dataset versions in PCR content. Do not list Tiangong database rows in `Data Sources` unless a specific dataset row is being used as non-default quantitative evidence.

CLI search commands, lookup traces, query logs, API keys, session files, and private user tokens are authoring-time artifacts and must not be stored in PCR Markdown or `structured.yaml`.
