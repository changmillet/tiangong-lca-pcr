# Source Evidence Policy

PCR content that constrains modelling choices should cite evidence or record review status. Scaffold files may remain empty, but generated PCR records must keep their maturity status explicit.

Material PCRs should include a `Data Sources` section in Markdown and a `data_sources` array in `structured.yaml`.

Use stable source ids, then reference those ids from reference-flow, process-inventory, allocation, data-quality, and validation rules. A source record should include:

- source id
- title
- source type, such as `tiangong-cli-search`, `tiangong-db-row`, `official-guidance`, `literature`, or `expert-review`
- URL or database command when available
- retrieved date or CLI run timestamp
- the PCR use, such as `flow identity`, `range evidence`, `process decomposition`, or `emission factor`
- review status

When Tiangong CLI results are used, keep a separate `CLI Lookup Trace` section in Markdown and `cli_lookup_trace` array in `structured.yaml`. Record the command, query intent, selected ids, and reviewer rationale. Do not store API keys, session files, or private user tokens in PCR files.
