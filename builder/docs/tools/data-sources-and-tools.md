# Data Sources and Tools

AI PCR production may combine domain common sense, Tiangong database lookup, external evidence, user-provided materials, and foreground collection protocols. The output must distinguish AI judgment from evidence-backed modelling constraints and real collected records.

## Source Roles

Use Tiangong database lookup for identity:

- flow identity
- flow property identity
- unit or unit group identity
- process or dataset identity when required

Use external evidence for modelling constraints:

- quantitative ranges
- emission factors
- yield, loss, moisture, conversion, and allocation factors
- process decomposition that constrains what must be included
- system boundary and cut-off rules
- official product specifications
- data collection and quality rules when standards or guidance define them

Use foreground collection protocols for first-dataset production:

- raw record fields
- measurement or source record method
- collection frequency and temporal coverage
- site or supplier scope
- aggregation and normalization rule
- quality evidence to retain with the dataset

Use domain common sense for initialization:

- candidate process list
- likely input and output flow candidates
- likely product state and required qualifiers
- first-pass boundary hypotheses
- terms to use in searches
- broad provisional ranges for important flows when marked as `reasoned_estimate`

Final PCR constraints use Tiangong identity lookup, external evidence, user-provided source material, or declared foreground collection protocols. Common-sense ranges may remain in candidate PCRs only when explicitly labelled as `reasoned_estimate`; do not record them as `Data Sources`.

## Preferred Evidence Order

Prefer sources in this order when multiple sources are available:

1. official standards, PCR program rules, regulations, and technical guidance
2. official statistical datasets and institutional reports
3. peer-reviewed literature
4. manufacturer or industry technical documents
5. first-party foreground records and supplier primary activity records
6. AI judgment or domain common sense for initialization

## Tooling

Useful production tools include:

- Tiangong LCA CLI for database UUID lookup
- web search for official source discovery
- PDF readers for standards, reports, and articles
- spreadsheet tools for tabular datasets
- classification mappings under `classifications/mappings/**`
- builder CLI commands for sync, lint, version bump, and publish

When using web or file sources, cite the stable source in `Data Sources` and reference the source id from the relevant PCR row or rule. Store search histories and temporary extraction notes outside PCR Markdown.

## User-Provided Inputs

An update request may be driven by:

- a direct user instruction
- a source document or file
- a table or dataset
- reviewer feedback
- a database alignment change
- a classification mapping correction

For every update, identify the driving input before editing. If the input changes rule semantics, update source ids, bilingual text, `structured.yaml`, and manifest lifecycle fields as needed.
