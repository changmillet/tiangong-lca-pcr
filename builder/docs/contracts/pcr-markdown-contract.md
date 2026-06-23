# PCR Markdown Contract

This contract defines the authored PCR Markdown shape consumed by agents and builder tooling.

## Files

Each PCR directory must contain:

- `manifest.yaml`
- `pcr.en-US.md`
- `pcr.zh-CN.md`
- `structured.yaml`

`pcr.en-US.md` is the canonical authored source. `pcr.zh-CN.md` is an aligned rendering of the same rule. New scaffolds should use the language-specific templates `builder/templates/pcr.en-US.md.hbs` and `builder/templates/pcr.zh-CN.md.hbs`.

Chinese Markdown should translate human-facing headings, table labels, process names, explanatory notes, and ordinary prose. Stable machine-facing identifiers and controlled vocabulary values, such as `process_id`, `amount_kind`, `basis_kind`, `evidence_kind`, `source_ids`, Tiangong UUIDs, and source ids, should remain unchanged unless the parser and vocabulary contract explicitly support a localized equivalent.

## Required Sections

Material PCR Markdown must use this section order:

1. Scope and Applicability
2. Product Category Identity
3. Reference Flow
4. Measurement and Unit Rules
5. System Boundary
6. Process Inventory Structure
7. Allocation and Co-product Handling
8. Foreground Data Collection, Calculation, and Quality Rules
9. Validation Rules
10. Published Dataset Profile
11. Data Sources

## Product Category Identity

The product category identity section defines the stable PCR meaning independently from any one external classification system:

```markdown
| Field | Value |
| --- | --- |
| canonical_pcr_id |  |
| classification_refs |  |
| covered_products |  |
| excluded_products |  |
| representative_product |  |
| production_route |  |
| market_state |  |
```

## Reference Flow

The reference flow section must first define the functional unit:

```markdown
| Field | Value |
| --- | --- |
| What |  |
| How much |  |
| How well |  |
| How long or cycle |  |
| reference_flow_link |  |
```

The reference flow section then defines the Tiangong reference flow object:

```markdown
| Field | Value |
| --- | --- |
| Reference amount |  |
| Reference product flow | <name> `<uuid>` |
| Reference flow property | <name> `<uuid>` |
| Reference unit group | <name> `<uuid>` |
| Reference unit |  |
| Required qualifiers | qualifier; qualifier |
```

`Required qualifiers` are category-specific descriptors that must be declared when constructing a concrete foreground data package.

## Measurement and Unit Rules

The measurement section defines rules that affect data consistency, conversion, or validation:

```markdown
| rule_id | Applies to | Required property | Required unit | Rule |
| --- | --- | --- | --- | --- |
| `reference_mass` | reference product | Mass `<uuid>` | kg | ... |
```

Rules should constrain data consistency, conversion, or validation. Ordinary units used by individual inventory rows belong in those rows.

## System Boundary

The system boundary section states the foreground data collection boundary and the boundary abstraction used for recursive product-category inputs:

```markdown
### Boundary Abstraction

| Field | Value |
| --- | --- |
| declared_starting_condition |  |
| starting_condition_role |  |
| product_classification_scope |  |
| recursive_input_rule |  |
| upstream_dataset_requirement |  |
| disclosure |  |
```

`recursive_input_rule` describes how an input flow in the same product category is recorded when product-category tracing would recurse. `declared_starting_condition` and `disclosure` define the starting condition facts that the foreground data package must declare.

## Process Inventory

Process inventory must be organized as:

```markdown
### Process Map

| process_id | process_name | inclusion | inclusion_condition | role | quantitative_reference |
| --- | --- | --- | --- | --- | --- |

### Process: <process_id>

#### Inputs

##### Product flows
##### Waste flows
##### Elementary flows

#### Outputs

##### Product flows
##### Waste flows
##### Elementary flows
```

Inventory row tables must keep stable columns:

```markdown
| Flow role | Selected flow | Tiangong UUID | Flow property / unit | Amount | amount_kind | Basis | basis_kind | evidence_kind | collection_protocol_id | source_ids |
```

`collection_protocol_id` links a foreground collected or calculated inventory row to a protocol in section 8.

## Foreground Data Collection, Calculation, and Quality Rules

Section 8 defines how the first foreground data package is produced from real records.

```markdown
### Data Collection Protocols

| protocol_id | process_id | flow_role | record_type | raw_fields | collection_method | unit | frequency | temporal_coverage | site_scope | aggregation_rule | quality_evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

### Calculation Rules

| rule_id | Applies to | Formula or rule | Inputs | Output | source_ids |
| --- | --- | --- | --- | --- | --- |

### Data Quality Requirements

| requirement_id | Applies to | Requirement | Evidence |
| --- | --- | --- | --- |
```

## Published Dataset Profile

Section 10 defines how a completed foreground data package is described for downstream users:

```markdown
| Field | Value |
| --- | --- |
| dataset_role |  |
| downstream_use |  |
| allowed_use |  |
| excluded_use |  |
| required_metadata |  |
| required_quality_disclosure |  |
| update_trigger |  |
```

## Data Sources

Data Sources must use stable source ids:

```markdown
| Source id | Type | Reference | Used for |
```

List external sources, standards, literature, official guidance, and non-default quantitative or method evidence. Tiangong UUID-bearing identity rows are represented by their UUIDs in the relevant PCR tables.
