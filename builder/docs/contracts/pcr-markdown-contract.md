# PCR Markdown Contract

This contract defines the authored PCR Markdown shape consumed by agents and builder tooling.

## Files

Each PCR directory must contain:

- `manifest.yaml`
- `pcr.en-US.md`
- `pcr.zh-CN.md`
- `structured.yaml`

`pcr.en-US.md` is the canonical authored source. `pcr.zh-CN.md` is an aligned rendering of the same rule. New scaffolds should use the language-specific templates `builder/templates/pcr.en-US.md.hbs` and `builder/templates/pcr.zh-CN.md.hbs`.

Chinese Markdown should translate human-facing headings, table labels, process names, explanatory notes, and ordinary prose. Stable machine-facing identifiers and controlled vocabulary values, such as `process_id`, `row_id`, `direction`, `flow_type`, `value_mode`, `specificity`, `basis_kind`, `evidence_kind`, `source_ids`, Tiangong UUIDs, and source ids, should remain unchanged unless the parser and vocabulary contract explicitly support a localized equivalent.

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

### Process: <process name> (`<process_id>`)

#### Inputs

##### Product flows
##### Waste flows
##### Elementary flows

#### Outputs

##### Product flows
##### Waste flows
##### Elementary flows
```

Inventory flow rows are authored as flow cards under their process, direction, and flow-type headings. Each card heading uses a human-readable role followed by a stable `row_id` in backticks. Direction and flow type are inherited from the surrounding headings, so they should not be repeated inside the card.

```markdown
###### Washing or de-salting water supplied as product input (`washing_water`)

Washing or de-salting water is recorded when it crosses the foreground process boundary as a product input.

- Selected flow: Process water `<uuid>`
- Flow property / unit: Mass / kg
- Amount rule: measured water use
- Value mode: Foreground record (`foreground_record`)
- Specificity: Site-specific (`site_specific`)
- Normalization basis: per 1,000 kg cleaned product output
- Basis kind: Process output (`process_output`)
- Evidence kind: Collected record (`collected_record`)
- Collection protocol: `cp_washing_water_records`
- Sources: `source-id`
```

`collection_protocol_id` links a foreground collected or calculated inventory row to a protocol in section 8.

Chinese Markdown should localize human-facing flow card labels:

```markdown
###### 作为产品投入的清洗或脱盐水（`washing_water`）

清洗或脱盐水作为产品输入跨越前景过程边界时记录。

- 选定流：Process water `<uuid>`
- 流属性/单位：Mass / kg
- 数量规则：计量用水量
- 数值来源模式：前景记录（`foreground_record`）
- 适用范围：场址特定（`site_specific`）
- 归一化基准：每 1,000 kg 清洁产品输出
- 基准类型：过程输出（`process_output`）
- 证据类型：采集记录（`collected_record`）
- 采集协议：`cp_washing_water_records`
- 来源：`source-id`
```

When a quantity range is needed, keep it attached to the flow card as a separate range bullet. The range role identifies how the range is used; it is not the amount value mode. Prefer source-backed ranges, but broad provisional ranges may use `reasoned_estimate` when important flows need initial AI or author guidance and stronger evidence is not yet available:

```markdown
- Range: Water-use QA guardrail
  - Range role: QA guardrail (`qa_guardrail`)
  - Lower: 0.5
  - Upper: 3.0
  - Unit: m3
  - Basis: per 1,000 kg cleaned product output
  - Basis kind: Process output (`process_output`)
  - Evidence kind: External source (`external_source`)
  - Sources: `source-id`
```

Use the same nested shape in Chinese Markdown:

```markdown
- 数量范围：用水 QA 校验范围
  - 范围角色：QA 校验（`qa_guardrail`）
  - 下限：0.5
  - 上限：3.0
  - 单位：m3
  - 基准：每 1,000 kg 清洁产品输出
  - 基准类型：过程输出（`process_output`）
  - 证据类型：外部来源（`external_source`）
  - 来源：`source-id`
```

For provisional AI or author ranges without strong evidence, omit `Sources` and mark the evidence kind explicitly:

```markdown
- 数量范围：暂定筛选估算
  - 范围角色：默认估计（`default_estimate`）
  - 下限：0.01
  - 上限：10
  - 单位：kWh/kg 干燥产品
  - 基准：每 kg 干燥产品的宽泛首轮干燥能耗估计
  - 基准类型：过程输出（`process_output`）
  - 证据类型：推理估算（`reasoned_estimate`）
```

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
