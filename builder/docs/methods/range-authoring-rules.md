# Range Authoring Rules

Typical ranges are authoring priors, default estimates, uncertainty notes, and QA guardrails. They help data producers build first datasets, but they do not replace foreground records. Source-backed field evidence, foreground collection protocols, and calculation rules produce the dataset values.

Every inventory amount should declare:

- `amount`: numeric value, formula description, or foreground-data requirement
- `value_mode`: value production mode, using `builder/vocab/amount-value-mode.yaml`
- `specificity`: dependency scope, using `builder/vocab/amount-specificity.yaml`
- `basis`: human-readable normalization basis, such as `per 1,000 kg reference product`
- `basis_kind`: normalized basis category, using `builder/vocab/basis-kind.yaml`
- `evidence_kind`: evidence category, using `builder/vocab/evidence-kind.yaml`
- `collection_protocol_id`: required when `evidence_kind` is `collected_record` or `calculated_from_collection`
- `source_ids`: source ids for external evidence or method formulas
- optional nested `Range` / `数量范围` bullets with range role, lower and upper bounds, unit, basis, evidence kind, and source ids when source-backed ranges or useful provisional estimates are available
- conversion notes when an area-based or process-row value is normalized to the PCR reference flow

## Range Evidence Tiers

Prefer stronger evidence when available, but do not leave important flows without any reference range only because exact literature is unavailable.

Use these tiers:

| Tier | Use when | `evidence_kind` | Source ids |
| --- | --- | --- | --- |
| External evidence range | Literature, standards, industry guidance, public datasets, PCR/EPD rules, or technical handbooks provide a range or factor interval. | `external_source` or `observed_dataset` | Required for `external_source`; preferred for `observed_dataset`. |
| Method or physical constraint | The range comes from mass balance, stoichiometry, conservation laws, calculation formulas, or factor method boundaries. | `method_formula` | Required. Use a method source id or a stable method identity such as `mass-balance-identity`. |
| Reviewed empirical range | The range comes from accumulated foreground batches, supplier records, or reviewed internal datasets. | `observed_dataset`, `collected_record`, or `calculated_from_collection` | Required when represented as an external or reviewed dataset; collection protocol id remains on the amount row when the range is calculated from foreground records. |
| Reasoned provisional estimate | No strong source exists yet, but an important flow needs a broad initial reference range for authoring, QA screening, or model initialization. | `reasoned_estimate` | Optional. Do not invent source ids. The range label and basis must make the estimate status clear. |

`reasoned_estimate` is allowed for AI or author common-sense ranges. Keep these ranges deliberately broad, mark them as provisional, and replace them when source-backed evidence becomes available. Do not use `reasoned_estimate` for publication-critical allowed ranges unless the review record explicitly accepts it.

Important flows should usually have either a range or a documented unresolved range evidence need. Important flows include reference product yields, major raw material inputs, water, fuel, electricity, major process chemicals, reject or waste fractions, wastewater or brine, direct emissions, and treatment outputs.

## Lint Policy

The builder lint uses an important-flow heuristic rather than a per-row `required` or `recommended` flag.

Important flows include rows whose role, id, selected flow, property, amount rule, or basis indicates water, fuel, energy, electricity, major material input, product yield, reject, residue, waste, wastewater, brine, dust, particulate matter, direct emissions, or packaging.

If an important flow has no `Range` / `数量范围` block:

| PCR lifecycle | Lint behavior |
| --- | --- |
| `scaffold` or `empty_scaffold` | No warning. |
| `candidate`, `draft_methodology`, or `authored_methodology` | Warning; lint exits successfully. |
| `active`, `published`, `reviewed_methodology`, or `published_methodology` | Error; lint exits non-zero. |

When lint warns on a candidate PCR, add a source-backed range when available. If stronger evidence is not yet available, add a broad `reasoned_estimate` range instead of leaving the flow range-free.

Use narrow ranges when a source supports them. Use broad ranges when the evidence is provisional. Ranges are separate amount metadata, not a replacement for `value_mode`. In Markdown, write ranges as readable nested fields, not semicolon-delimited key strings:

```markdown
- Range: Mass-balance QA guardrail
  - Range role: QA guardrail (`qa_guardrail`)
  - Lower: 0
  - Upper: 1
  - Unit: kg/kg received source material
  - Basis: mass fraction of received source material
  - Basis kind: Process output (`process_output`)
  - Evidence kind: Method formula (`method_formula`)
  - Sources: `mass-balance-identity`
```

For first-dataset values, set `value_mode` to `foreground_record` or `calculated_value`, set `specificity` to the relevant scope such as `site_specific` or `route_specific`, set `evidence_kind` to `collected_record` or `calculated_from_collection`, and link the row to the collection protocol that defines how the raw record is obtained and normalized.

When no strong source is available but a range is useful for an important flow, use a provisional common-sense range:

```markdown
- Range: Provisional screening estimate
  - Range role: Default estimate (`default_estimate`)
  - Lower: 0.01
  - Upper: 10
  - Unit: kWh/kg dried product
  - Basis: broad first-pass drying energy estimate per kg dried product
  - Basis kind: Process output (`process_output`)
  - Evidence kind: Reasoned estimate (`reasoned_estimate`)
```
