# Source Evidence Policy

PCR content that constrains modelling choices should cite evidence. Scaffold files may remain empty, but generated PCR records must keep their maturity status explicit in `manifest.yaml`.

Material PCRs should include a `Data Sources` section in Markdown and a `data_sources` array in `structured.yaml`.

Use stable source ids, then reference those ids from reference-flow, process-inventory, calculation, allocation, data-quality, and validation rules. A source record should include:

- source id
- title
- source type, such as `official-guidance`, `literature`, `standard`, `dataset`, or `method-factor`
- URL, DOI, report identifier, or other stable reference when available
- retrieved date when the source is web-hosted
- the PCR use, such as `method rule`, `range evidence`, `process decomposition`, `emission factor`, or `quality requirement`

Tiangong database rows are the identity source for UUID-bearing flow, flow property, unit group, process, and dataset references. PCR content records selected Tiangong UUIDs without dataset versions in the relevant tables.

Data collection protocols define how real foreground records become first datasets. External sources support method choices, boundary rules, factors, ranges, and quality requirements. A completed dataset may then be published as a `secondary_dataset` or `background_dataset` according to the Published Dataset Profile.

CLI search commands, lookup traces, query logs, API keys, session files, and private user tokens are authoring-time artifacts stored outside PCR Markdown and `structured.yaml`.
