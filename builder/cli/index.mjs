#!/usr/bin/env node
import { createHash } from "node:crypto";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const defaultRoot = path.resolve(__dirname, "../..");

const REQUIRED_DIRS = [
  "library/pcrs",
  "library/modules",
  "library/indexes",
  "classifications/systems",
  "classifications/mappings",
  "builder/cli",
  "builder/docs",
  "builder/docs/contracts",
  "builder/docs/methods",
  "builder/docs/prompts",
  "builder/docs/tools",
  "builder/docs/workflows",
  "builder/templates",
  "builder/schemas",
  "builder/scripts",
  "packages/pcr-core",
  "packages/tiangong-pcr-cli",
  "skills/tiangong-pcr",
  ".github/ISSUE_TEMPLATE",
  "docs",
];

const PCR_EN_FILE = "pcr.en-US.md";
const PCR_ZH_FILE = "pcr.zh-CN.md";
const MODULE_EN_FILE = "module.en-US.md";
const MODULE_ZH_FILE = "module.zh-CN.md";
const PROCESS_INCLUSION_VALUES = new Set(["required", "conditional", "optional", "excluded_by_default"]);
const AMOUNT_KIND_VALUES = new Set([
  "exact",
  "range",
  "formula",
  "site_specific",
  "product_specific",
  "route_specific",
  "not_applicable",
]);
const BASIS_KIND_VALUES = new Set([
  "reference_flow",
  "process_output",
  "n_input",
  "fuel_inventory",
  "transport_service",
  "storage_duration",
  "crop_cycle",
]);
const EVIDENCE_KIND_VALUES = new Set([
  "external_source",
  "observed_dataset",
  "method_formula",
  "foreground_data",
  "tiangong_default",
  "collected_record",
  "calculated_from_collection",
  "identity_reference",
  "source_rule",
]);
const BOUNDARY_ABSTRACTION_REQUIRED_FIELDS = [
  "declared_starting_condition",
  "starting_condition_role",
  "product_classification_scope",
  "recursive_input_rule",
  "upstream_dataset_requirement",
  "disclosure",
];
const RECURSIVE_ORIGIN_TERM_PATTERN =
  /\b(first[- ]generation|previous[- ]generation)\b|第一代|上一代/giu;

function parseArgs(argv) {
  const [command, ...rest] = argv;
  const options = { _: [] };

  for (let index = 0; index < rest.length; index += 1) {
    const token = rest[index];
    if (!token.startsWith("--")) {
      options._.push(token);
      continue;
    }
    const key = token.slice(2);
    const next = rest[index + 1];
    if (next === undefined || next.startsWith("--")) {
      options[key] = true;
      continue;
    }
    options[key] = next;
    index += 1;
  }

  return { command, options };
}

function rootFromOptions(options) {
  return path.resolve(String(options.root ?? defaultRoot));
}

function ensureDir(root, relativePath) {
  mkdirSync(path.join(root, relativePath), { recursive: true });
}

function writeIfMissing(root, relativePath, content) {
  const target = path.join(root, relativePath);
  if (existsSync(target)) {
    return false;
  }
  mkdirSync(path.dirname(target), { recursive: true });
  writeFileSync(target, content);
  return true;
}

function normalizeSlug(value) {
  return String(value ?? "")
    .trim()
    .replace(/^\/+|\/+$/gu, "")
    .replaceAll("\\", "/")
    .replace(/\/{2,}/gu, "/");
}

function pcrManifest(options) {
  const pcrId = String(options["pcr-id"] ?? "pcr.placeholder");
  const titleEn = String(options["title-en-US"] ?? options["title-en"] ?? "PCR Placeholder");
  const titleZh = String(options["title-zh-CN"] ?? "PCR 占位");

  return `schema_version: 1
id: ${pcrId}
title:
  en-US: ${JSON.stringify(titleEn)}
  zh-CN: ${JSON.stringify(titleZh)}
status: scaffold
pcr_kind: product_category_rule
content_maturity: empty_scaffold
languages:
  canonical: en-US
  available:
    - en-US
    - zh-CN
translation_status:
  zh-CN: scaffold
target_entities:
  - flow
  - process
  - dataset
`;
}

function pcrMarkdown(options, language) {
  const pcrId = String(options["pcr-id"] ?? "pcr.placeholder");
  const title =
    language === "zh-CN"
      ? String(options["title-zh-CN"] ?? "PCR 占位")
      : String(options["title-en-US"] ?? options["title-en"] ?? "PCR Placeholder");

  return `---
pcr_id: ${pcrId}
language: ${language}
status: scaffold
sync_with: ${language === "zh-CN" ? PCR_EN_FILE : PCR_ZH_FILE}
---

# ${title}

${language === "zh-CN" ? zhPcrBody() : enPcrBody()}`;
}

function structuredYaml() {
  return `schema_version: 1
status: scaffold
product_category_identity: {}
functional_unit: {}
reference_flows: []
flow_properties: []
unit_conventions: []
system_boundary: {}
boundary_abstraction: {}
process_map: []
process_inventory: []
dataset_production:
  collection_protocols: []
  calculation_rules: []
  data_quality_requirements: []
published_dataset_profile: {}
allocation_rules: []
data_quality_rules: []
validation_rules: []
data_sources: []
`;
}

function enPcrBody() {
  return `## 1. Scope and Applicability

## 2. Product Category Identity

| Field | Value |
| --- | --- |
| canonical_pcr_id |  |
| classification_refs |  |
| covered_products |  |
| excluded_products |  |
| representative_product |  |
| production_route |  |
| market_state |  |

## 3. Reference Flow

| Field | Value |
| --- | --- |
| What |  |
| How much |  |
| How well |  |
| How long or cycle |  |
| reference_flow_link |  |

| Field | Value |
| --- | --- |
| Reference amount |  |
| Reference product flow |  |
| Reference flow property |  |
| Reference unit group |  |
| Reference unit |  |
| Required qualifiers |  |

When constructing a foreground data package, the items listed in \`Required qualifiers\` must be declared in dataset metadata, process notes, reference flow comment, product description, or an equivalent data package field. Missing required qualifiers make the reference flow definition incomplete for that data package.

## 4. Measurement and Unit Rules

| rule_id | Applies to | Required property | Required unit | Rule |
| --- | --- | --- | --- | --- |

## 5. System Boundary

### Boundary Abstraction

| Field | Value |
| --- | --- |
| declared_starting_condition |  |
| starting_condition_role |  |
| product_classification_scope |  |
| recursive_input_rule |  |
| upstream_dataset_requirement |  |
| disclosure |  |

## 6. Process Inventory Structure

### Process Map

| process_id | process_name | inclusion | inclusion_condition | role | quantitative_reference |
| --- | --- | --- | --- | --- | --- |

### Process: <process_id>

#### Inputs

##### Product flows

| Flow role | Selected flow | Tiangong UUID | Flow property / unit | Amount | amount_kind | Basis | basis_kind | evidence_kind | collection_protocol_id | source_ids |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

##### Waste flows

##### Elementary flows

#### Outputs

##### Product flows

##### Waste flows

##### Elementary flows

## 7. Allocation and Co-product Handling

## 8. Foreground Data Collection, Calculation, and Quality Rules

### Data Collection Protocols

| protocol_id | process_id | flow_role | record_type | raw_fields | collection_method | unit | frequency | temporal_coverage | site_scope | aggregation_rule | quality_evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

### Calculation Rules

| rule_id | Applies to | Formula or rule | Inputs | Output | source_ids |
| --- | --- | --- | --- | --- | --- |

### Data Quality Requirements

| requirement_id | Applies to | Requirement | Evidence |
| --- | --- | --- | --- |

## 9. Validation Rules

## 10. Published Dataset Profile

| Field | Value |
| --- | --- |
| dataset_role |  |
| downstream_use |  |
| allowed_use |  |
| excluded_use |  |
| required_metadata |  |
| required_quality_disclosure |  |
| update_trigger |  |

## 11. Data Sources
`;
}

function zhPcrBody() {
  return `## 1. 范围与适用性

## 2. 产品类别识别

| 字段 | 值 |
| --- | --- |
| canonical_pcr_id |  |
| classification_refs |  |
| covered_products |  |
| excluded_products |  |
| representative_product |  |
| production_route |  |
| market_state |  |

## 3. 参考流

| 字段 | 值 |
| --- | --- |
| What |  |
| How much |  |
| How well |  |
| How long or cycle |  |
| reference_flow_link |  |

| 字段 | 值 |
| --- | --- |
| 参考数量 |  |
| 参考产品流 |  |
| 参考流属性 |  |
| 参考单位组 |  |
| 参考单位 |  |
| 必需限定信息 |  |

构建前景数据包时，\`必需限定信息\` 中列出的信息应在数据集元数据、过程说明、参考流备注、产品说明或等效数据包字段中明确声明。缺失必需限定信息的数据包视为参考流定义不完整。

## 4. 计量与单位规则

| rule_id | 适用对象 | 必需流属性 | 必需单位 | 规则 |
| --- | --- | --- | --- | --- |

## 5. 系统边界

### 边界概化

| 字段 | 值 |
| --- | --- |
| declared_starting_condition |  |
| starting_condition_role |  |
| product_classification_scope |  |
| recursive_input_rule |  |
| upstream_dataset_requirement |  |
| disclosure |  |

## 6. 过程清单结构

### 过程图

| process_id | 过程名称 | 纳入状态 | 纳入条件 | 建模角色 | 定量参考 |
| --- | --- | --- | --- | --- | --- |

### 过程：<process_id>

#### 输入

##### 产品流

| 流角色 | 选定流 | 天工 UUID | 流属性/单位 | 数量 | amount_kind | 基准 | basis_kind | evidence_kind | collection_protocol_id | source_ids |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

##### 废物流

##### 基本流

#### 输出

##### 产品流

##### 废物流

##### 基本流

## 7. 分配与共产品处理

## 8. 前景数据采集、计算与质量规则

### 数据采集协议

| protocol_id | process_id | flow_role | record_type | raw_fields | collection_method | unit | frequency | temporal_coverage | site_scope | aggregation_rule | quality_evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

### 计算规则

| rule_id | Applies to | Formula or rule | Inputs | Output | source_ids |
| --- | --- | --- | --- | --- | --- |

### 数据质量要求

| requirement_id | Applies to | Requirement | Evidence |
| --- | --- | --- | --- |

## 9. 校验规则

## 10. 发布数据集画像

| 字段 | 值 |
| --- | --- |
| dataset_role |  |
| downstream_use |  |
| allowed_use |  |
| excluded_use |  |
| required_metadata |  |
| required_quality_disclosure |  |
| update_trigger |  |

## 11. 数据源
`;
}

function parseCsvRows(text) {
  const rows = [];
  let current = "";
  let row = [];
  let inQuotes = false;
  const normalized = text.replace(/^\uFEFF/u, "");

  for (let index = 0; index < normalized.length; index += 1) {
    const char = normalized[index];
    const next = normalized[index + 1];
    if (char === '"' && inQuotes && next === '"') {
      current += '"';
      index += 1;
      continue;
    }
    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }
    if (char === "," && !inQuotes) {
      row.push(current);
      current = "";
      continue;
    }
    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") {
        index += 1;
      }
      row.push(current);
      if (row.some((value) => value.trim() !== "")) {
        rows.push(row);
      }
      row = [];
      current = "";
      continue;
    }
    current += char;
  }

  if (current.length > 0 || row.length > 0) {
    row.push(current);
    if (row.some((value) => value.trim() !== "")) {
      rows.push(row);
    }
  }

  return rows;
}

function readCpcCsv(sourcePath) {
  const rows = parseCsvRows(readFileSync(sourcePath, "utf8"));
  const entries = [];
  for (const [index, row] of rows.entries()) {
    if (index === 0) {
      continue;
    }
    const [codeRaw, titleRaw] = row;
    const code = String(codeRaw ?? "").trim();
    const title = String(titleRaw ?? "").trim();
    if (!code || !title) {
      continue;
    }
    entries.push({ code, title, level: code.length - 1 });
  }
  return entries;
}

function parentCodeFor(code) {
  return code.length > 1 ? code.slice(0, code.length - 1) : null;
}

function normalizeAsciiSlug(value) {
  return String(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/gu, "")
    .toLowerCase()
    .replace(/&/gu, " and ")
    .replace(/[^a-z0-9]+/gu, "-")
    .replace(/^-+|-+$/gu, "")
    .replace(/-{2,}/gu, "-");
}

function stableHash(value) {
  return createHash("sha256").update(String(value)).digest("hex").slice(0, 8);
}

function boundedSlug(value, maxLength = 96) {
  const slug = normalizeAsciiSlug(value) || "untitled";
  if (slug.length <= maxLength) {
    return slug;
  }
  const hash = stableHash(value);
  const prefix = slug.slice(0, maxLength - hash.length - 1).replace(/-+$/gu, "");
  return `${prefix}-${hash}`;
}

function yamlString(value) {
  return JSON.stringify(String(value));
}

function buildCpcModel(entries) {
  const byCode = new Map(entries.map((entry) => [entry.code, { ...entry }]));
  const childCodesByParent = new Map();

  for (const entry of byCode.values()) {
    const parentCode = parentCodeFor(entry.code);
    entry.parent_code = parentCode;
    if (parentCode && byCode.has(parentCode)) {
      const childCodes = childCodesByParent.get(parentCode) ?? [];
      childCodes.push(entry.code);
      childCodesByParent.set(parentCode, childCodes);
    }
  }

  function pathFor(code) {
    const pathEntries = [];
    let current = byCode.get(code);
    while (current) {
      pathEntries.push(current);
      current = current.parent_code ? byCode.get(current.parent_code) : null;
    }
    return pathEntries.reverse();
  }

  const nodes = Array.from(byCode.values()).map((entry) => {
    const pathEntries = pathFor(entry.code);
    const children = childCodesByParent.get(entry.code) ?? [];
    return {
      code: entry.code,
      title: entry.title,
      level: entry.level,
      parent_code: entry.parent_code,
      path_codes: pathEntries.map((pathEntry) => pathEntry.code),
      path_titles: pathEntries.map((pathEntry) => pathEntry.title),
      child_codes: children,
      is_leaf: children.length === 0,
    };
  });

  const leaves = nodes.filter((node) => node.is_leaf);
  return { nodes, leaves };
}

function basePcrDirectoryForLeaf(leaf) {
  const section = leaf.path_titles[0] ?? "unclassified";
  const division = leaf.path_titles[1] ?? section;
  return path.join(
    boundedSlug(section, 80),
    boundedSlug(division, 80),
    boundedSlug(leaf.title, 96),
  );
}

function pcrIdForLeaf(leaf) {
  const pcrDirectory = leaf.pcr_directory ?? basePcrDirectoryForLeaf(leaf);
  return `pcr.${pcrDirectory.replaceAll(path.sep, ".")}`;
}

function withPcrIdentity(leaves) {
  const leavesByBaseDirectory = new Map();
  for (const leaf of leaves) {
    const baseDirectory = basePcrDirectoryForLeaf(leaf);
    const entries = leavesByBaseDirectory.get(baseDirectory) ?? [];
    entries.push(leaf);
    leavesByBaseDirectory.set(baseDirectory, entries);
  }

  const directoryByCode = new Map();
  for (const [baseDirectory, entries] of leavesByBaseDirectory.entries()) {
    if (entries.length === 1) {
      directoryByCode.set(entries[0].code, baseDirectory);
      continue;
    }
    for (const leaf of entries) {
      directoryByCode.set(leaf.code, `${baseDirectory}-${stableHash(`${leaf.code}:${leaf.title}`)}`);
    }
  }

  return leaves.map((leaf) => {
    const pcrDirectory = directoryByCode.get(leaf.code);
    return {
      ...leaf,
      pcr_directory: pcrDirectory,
      pcr_dir: `library/pcrs/${pcrDirectory.replaceAll(path.sep, "/")}`,
      pcr_id: `pcr.${pcrDirectory.replaceAll(path.sep, ".")}`,
    };
  });
}

function cpcLeafManifest(leaf, classificationVersion) {
  const pcrId = pcrIdForLeaf(leaf);
  return `schema_version: 1
id: ${pcrId}
title:
  en-US: ${yamlString(leaf.title)}
  zh-CN: null
status: scaffold
pcr_kind: product_category_rule
content_maturity: empty_scaffold
domains:
  - ${yamlString(normalizeAsciiSlug(leaf.path_titles[0] ?? "unclassified"))}
modules:
  core:
    - pcr-minimum-content
    - unit-of-analysis
    - reference-flow
    - inventory-flow-taxonomy
    - system-boundary
    - allocation
    - data-quality
    - validation-rules
target_entities:
  - flow
  - process
  - dataset
languages:
  canonical: en-US
  available:
    - en-US
    - zh-CN
translation_status:
  zh-CN: scaffold_pending_translation
classification_refs:
  - system: CPC
    version: ${yamlString(classificationVersion)}
    code: ${yamlString(leaf.code)}
    title: ${yamlString(leaf.title)}
    mapping_type: exact
`;
}

function cpcLeafMarkdown(leaf, language) {
  const pcrId = pcrIdForLeaf(leaf);
  const title = language === "zh-CN" ? "待补充" : leaf.title;
  return `---
pcr_id: ${pcrId}
language: ${language}
status: scaffold
sync_with: ${language === "zh-CN" ? PCR_EN_FILE : PCR_ZH_FILE}
---

# ${title}

${language === "zh-CN" ? zhPcrBody() : enPcrBody()}`;
}

function cpcStructuredYaml(leaf, classificationVersion) {
  return `schema_version: 1
status: scaffold
classification_seed:
  system: CPC
  version: ${yamlString(classificationVersion)}
  code: ${yamlString(leaf.code)}
  title: ${yamlString(leaf.title)}
reference_flows: []
flow_properties: []
unit_conventions: []
system_boundary: {}
boundary_abstraction: {}
process_map: []
process_inventory: []
dataset_production:
  collection_protocols: []
  calculation_rules: []
  data_quality_requirements: []
published_dataset_profile: {}
allocation_rules: []
data_quality_rules: []
validation_rules: []
data_sources: []
`;
}

function pcrDirectoryFromOptions(root, options) {
  const pcr = options.pcr ? normalizeSlug(options.pcr) : null;
  if (!pcr) {
    console.error("Missing required --pcr <library/pcrs/...> option.");
    process.exit(1);
  }
  const candidate = path.resolve(root, pcr);
  if (!existsSync(candidate)) {
    console.error(`PCR directory not found: ${candidate}`);
    process.exit(1);
  }
  return candidate;
}

function stripInlineCode(value) {
  return String(value ?? "").replace(/`([^`]+)`/gu, "$1").trim();
}

function extractFirstUuid(value) {
  const match = stripInlineCode(value).match(
    /\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/iu,
  );
  return match ? match[0].toLowerCase() : "";
}

function extractSourceIds(value) {
  const matches = String(value ?? "").match(/`([^`]+)`/gu) ?? [];
  if (matches.length > 0) {
    return matches.map((match) => match.slice(1, -1).trim()).filter(Boolean);
  }
  return stripInlineCode(value)
    .split(/[,;]/u)
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function splitListValue(value) {
  return stripInlineCode(value)
    .split(/[;,]/u)
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function labelWithoutUuid(value) {
  return stripInlineCode(value)
    .replace(/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/giu, "")
    .replace(/\s{2,}/gu, " ")
    .trim();
}

function normalizeHeader(value) {
  return stripInlineCode(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/gu, "_")
    .replace(/^_+|_+$/gu, "");
}

function tableCell(row, headerIndex, names) {
  for (const name of names) {
    const index = headerIndex.get(name);
    if (index !== undefined) {
      return row[index] ?? "";
    }
  }
  return "";
}

function isTableLine(line) {
  const trimmed = line.trim();
  return trimmed.startsWith("|") && trimmed.endsWith("|");
}

function parseTableLine(line) {
  return line
    .trim()
    .replace(/^\|/u, "")
    .replace(/\|$/u, "")
    .split("|")
    .map((cell) => cell.trim());
}

function isSeparatorRow(cells) {
  return cells.every((cell) => /^:?-{3,}:?$/u.test(cell.trim()));
}

function parseTable(lines, startIndex) {
  const rows = [];
  let index = startIndex;
  while (index < lines.length && isTableLine(lines[index])) {
    rows.push(parseTableLine(lines[index]));
    index += 1;
  }
  if (rows.length < 2) {
    return { table: null, nextIndex: index };
  }
  const headers = rows[0];
  const dataRows = isSeparatorRow(rows[1]) ? rows.slice(2) : rows.slice(1);
  return {
    table: {
      headers,
      rows: dataRows.filter((row) => row.some((cell) => cell.trim() !== "")),
    },
    nextIndex: index,
  };
}

function yamlScalar(value) {
  if (value === null || value === undefined || value === "") {
    return "\"\"";
  }
  return JSON.stringify(String(value));
}

function yamlPlainOrQuoted(value) {
  const normalized = String(value ?? "");
  if (/^[A-Za-z0-9_.-]+$/u.test(normalized)) {
    return normalized;
  }
  return yamlScalar(normalized);
}

function yamlKeyValue(lines, indent, key, value) {
  lines.push(`${" ".repeat(indent)}${key}: ${yamlScalar(value)}`);
}

function yamlStringArray(lines, indent, key, values) {
  if (!values || values.length === 0) {
    lines.push(`${" ".repeat(indent)}${key}: []`);
    return;
  }
  lines.push(`${" ".repeat(indent)}${key}:`);
  for (const value of values) {
    lines.push(`${" ".repeat(indent + 2)}- ${yamlPlainOrQuoted(value)}`);
  }
}

function yamlFlatObject(lines, indent, object) {
  const entries = Object.entries(object ?? {}).filter(([, value]) => value !== "");
  if (entries.length === 0) {
    lines.push(`${" ".repeat(indent)}{}`);
    return;
  }
  for (const [key, value] of entries) {
    yamlKeyValue(lines, indent, key, value);
  }
}

function normalizeStructuredId(value) {
  return normalizeAsciiSlug(value).replaceAll("-", "_");
}

function parseReferenceFlowTable(table) {
  const headerIndex = new Map(table.headers.map((header, index) => [normalizeHeader(header), index]));
  return table.rows
    .map((row) => {
      const uuid = extractFirstUuid(
        tableCell(row, headerIndex, ["uuid", "tiangong_uuid", "tiangong_flow"]),
      );
      return {
        role: stripInlineCode(tableCell(row, headerIndex, ["role"])),
        name: stripInlineCode(tableCell(row, headerIndex, ["tiangong_flow", "selected_flow"])),
        flow_type: stripInlineCode(tableCell(row, headerIndex, ["flow_type"])),
        uuid,
        flow_property_uuid: extractFirstUuid(tableCell(row, headerIndex, ["flow_property"])),
        unit_group_uuid: extractFirstUuid(tableCell(row, headerIndex, ["unit_group"])),
        preferred_unit: stripInlineCode(tableCell(row, headerIndex, ["preferred_unit"])),
      };
    })
    .filter((row) => row.uuid);
}

function parseReferenceFlowDefinitionTable(table) {
  const headerIndex = new Map(table.headers.map((header, index) => [normalizeHeader(header), index]));
  if (!headerIndex.has("field") || !headerIndex.has("value")) {
    return null;
  }
  const fields = new Map();
  for (const row of table.rows) {
    const key = normalizeHeader(tableCell(row, headerIndex, ["field"]));
    const value = tableCell(row, headerIndex, ["value"]);
    if (key) {
      fields.set(key, value);
    }
  }
  const productValue = fields.get("reference_product_flow") ?? fields.get("product_flow") ?? "";
  const propertyValue = fields.get("reference_flow_property") ?? fields.get("flow_property") ?? "";
  const unitGroupValue = fields.get("reference_unit_group") ?? fields.get("unit_group") ?? "";
  const referenceUnit = fields.get("reference_unit") ?? fields.get("preferred_unit") ?? "";
  const referenceAmount = fields.get("reference_amount") ?? fields.get("declared_unit") ?? "";
  const qualifiers = fields.get("required_qualifiers") ?? fields.get("qualifiers") ?? "";
  const productUuid = extractFirstUuid(productValue);

  if (!referenceAmount && !productUuid && !referenceUnit && !qualifiers) {
    return null;
  }

  return {
    reference_amount: stripInlineCode(referenceAmount),
    product_flow: {
      name: labelWithoutUuid(productValue),
      uuid: productUuid,
    },
    flow_property_uuid: extractFirstUuid(propertyValue),
    unit_group_uuid: extractFirstUuid(unitGroupValue),
    reference_unit: stripInlineCode(referenceUnit),
    required_qualifiers: splitListValue(qualifiers),
  };
}

function parseFieldValueTable(table) {
  const headerIndex = new Map(table.headers.map((header, index) => [normalizeHeader(header), index]));
  if (!headerIndex.has("field") && !headerIndex.has("字段")) {
    return null;
  }
  if (!headerIndex.has("value") && !headerIndex.has("值")) {
    return null;
  }
  const result = {};
  for (const row of table.rows) {
    const key = normalizeStructuredId(tableCell(row, headerIndex, ["field", "字段"]));
    const value = stripInlineCode(tableCell(row, headerIndex, ["value", "值"]));
    if (key) {
      result[key] = value;
    }
  }
  return Object.keys(result).length > 0 ? result : null;
}

function parseFunctionalUnitTable(table) {
  const fields = parseFieldValueTable(table);
  if (!fields) {
    return null;
  }
  const hasFunctionalUnitField =
    fields.what ||
    fields.how_much ||
    fields.how_well ||
    fields.how_long ||
    fields.how_long_or_cycle ||
    fields.reference_flow_link;
  return hasFunctionalUnitField ? fields : null;
}

function parseMeasurementRuleRows(table) {
  const headerIndex = new Map(table.headers.map((header, index) => [normalizeHeader(header), index]));
  return table.rows
    .map((row) => {
      const requiredProperty = tableCell(row, headerIndex, ["required_property", "flow_property"]);
      return {
        id: normalizeStructuredId(tableCell(row, headerIndex, ["rule_id", "id"])),
        applies_to: stripInlineCode(tableCell(row, headerIndex, ["applies_to", "scope"])),
        required_property: labelWithoutUuid(requiredProperty),
        required_property_uuid: extractFirstUuid(requiredProperty),
        required_unit: stripInlineCode(tableCell(row, headerIndex, ["required_unit", "unit"])),
        rule: stripInlineCode(tableCell(row, headerIndex, ["rule", "description"])),
      };
    })
    .filter((row) => row.id || row.applies_to || row.rule);
}

function parseInventoryRows(table, flowType) {
  const headerIndex = new Map(table.headers.map((header, index) => [normalizeHeader(header), index]));
  return table.rows
    .map((row) => {
      const uuid = extractFirstUuid(tableCell(row, headerIndex, ["tiangong_uuid", "uuid"]));
      return {
        role: stripInlineCode(tableCell(row, headerIndex, ["flow_role", "role"])),
        name: stripInlineCode(tableCell(row, headerIndex, ["selected_flow", "flow"])),
        flow_type: flowType,
        uuid,
        property_unit: stripInlineCode(tableCell(row, headerIndex, ["flow_property_unit"])),
        amount: stripInlineCode(tableCell(row, headerIndex, ["amount", "typical_range", "range"])),
        amount_kind: stripInlineCode(tableCell(row, headerIndex, ["amount_kind", "range_kind", "range_type"])),
        basis: stripInlineCode(tableCell(row, headerIndex, ["basis", "range_basis"])),
        basis_kind: stripInlineCode(tableCell(row, headerIndex, ["basis_kind"])),
        evidence_kind: stripInlineCode(tableCell(row, headerIndex, ["evidence_kind", "range_type"])),
        collection_protocol_id: normalizeStructuredId(
          tableCell(row, headerIndex, ["collection_protocol_id", "protocol_id"]),
        ),
        source_ids: extractSourceIds(tableCell(row, headerIndex, ["source_ids", "range_sources", "sources"])),
      };
    })
    .filter((row) => row.role || row.name || row.uuid);
}

function parseProcessMapRows(table) {
  const headerIndex = new Map(table.headers.map((header, index) => [normalizeHeader(header), index]));
  if (!headerIndex.has("process_id")) {
    return [];
  }
  return table.rows
    .map((row) => ({
      id: normalizeStructuredId(tableCell(row, headerIndex, ["process_id", "id"])),
      name: stripInlineCode(tableCell(row, headerIndex, ["process_name", "name"])),
      inclusion: stripInlineCode(tableCell(row, headerIndex, ["inclusion"])),
      inclusion_condition: stripInlineCode(tableCell(row, headerIndex, ["inclusion_condition", "condition"])),
      role: stripInlineCode(tableCell(row, headerIndex, ["role"])),
      quantitative_reference: stripInlineCode(
        tableCell(row, headerIndex, ["quantitative_reference", "reference"]),
      ),
    }))
    .filter((row) => row.id || row.name);
}

function parseDataSourceRows(table) {
  const headerIndex = new Map(table.headers.map((header, index) => [normalizeHeader(header), index]));
  return table.rows
    .map((row) => ({
      id: stripInlineCode(tableCell(row, headerIndex, ["source_id", "id"])),
      type: stripInlineCode(tableCell(row, headerIndex, ["type"])),
      reference: stripInlineCode(tableCell(row, headerIndex, ["reference"])),
      used_for: stripInlineCode(tableCell(row, headerIndex, ["used_for", "use", "用途"])),
    }))
    .filter((row) => row.id && !/^tg-/u.test(row.id));
}

function parseCollectionProtocolRows(table) {
  const headerIndex = new Map(table.headers.map((header, index) => [normalizeHeader(header), index]));
  if (!headerIndex.has("protocol_id")) {
    return [];
  }
  return table.rows
    .map((row) => ({
      protocol_id: normalizeStructuredId(tableCell(row, headerIndex, ["protocol_id"])),
      process_id: normalizeStructuredId(tableCell(row, headerIndex, ["process_id"])),
      flow_role: stripInlineCode(tableCell(row, headerIndex, ["flow_role"])),
      record_type: stripInlineCode(tableCell(row, headerIndex, ["record_type"])),
      raw_fields: stripInlineCode(tableCell(row, headerIndex, ["raw_fields"])),
      collection_method: stripInlineCode(tableCell(row, headerIndex, ["collection_method"])),
      unit: stripInlineCode(tableCell(row, headerIndex, ["unit"])),
      frequency: stripInlineCode(tableCell(row, headerIndex, ["frequency"])),
      temporal_coverage: stripInlineCode(tableCell(row, headerIndex, ["temporal_coverage"])),
      site_scope: stripInlineCode(tableCell(row, headerIndex, ["site_scope"])),
      aggregation_rule: stripInlineCode(tableCell(row, headerIndex, ["aggregation_rule"])),
      quality_evidence: stripInlineCode(tableCell(row, headerIndex, ["quality_evidence"])),
    }))
    .filter((row) => row.protocol_id);
}

function parseCalculationRuleRows(table) {
  const headerIndex = new Map(table.headers.map((header, index) => [normalizeHeader(header), index]));
  if (!headerIndex.has("rule_id")) {
    return [];
  }
  return table.rows
    .map((row) => ({
      id: normalizeStructuredId(tableCell(row, headerIndex, ["rule_id", "id"])),
      applies_to: stripInlineCode(tableCell(row, headerIndex, ["applies_to"])),
      rule: stripInlineCode(tableCell(row, headerIndex, ["formula_or_rule", "rule", "formula"])),
      inputs: splitListValue(tableCell(row, headerIndex, ["inputs"])),
      output: stripInlineCode(tableCell(row, headerIndex, ["output"])),
      source_ids: extractSourceIds(tableCell(row, headerIndex, ["source_ids", "sources"])),
    }))
    .filter((row) => row.id);
}

function parseDataQualityRequirementRows(table) {
  const headerIndex = new Map(table.headers.map((header, index) => [normalizeHeader(header), index]));
  if (!headerIndex.has("requirement_id")) {
    return [];
  }
  return table.rows
    .map((row) => ({
      id: normalizeStructuredId(tableCell(row, headerIndex, ["requirement_id", "id"])),
      applies_to: stripInlineCode(tableCell(row, headerIndex, ["applies_to"])),
      requirement: stripInlineCode(tableCell(row, headerIndex, ["requirement"])),
      evidence: stripInlineCode(tableCell(row, headerIndex, ["evidence"])),
    }))
    .filter((row) => row.id);
}

function parsePcrMarkdownToStructured(markdown) {
  const lines = markdown.split(/\r?\n/u);
  let productCategoryIdentity = null;
  let functionalUnit = null;
  let boundaryAbstraction = null;
  const referenceFlows = [];
  let referenceFlowDefinition = null;
  const measurementRules = [];
  const processMap = [];
  const processInventory = [];
  const collectionProtocols = [];
  const calculationRules = [];
  const dataQualityRequirements = [];
  let publishedDatasetProfile = null;
  const dataSources = [];
  let section = "";
  let subSection = "";
  let currentProcess = null;
  let direction = null;
  let flowType = null;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index].trim();
    const h2 = line.match(/^##\s+(?:\d+\.\s*)?(.+)$/u);
    if (h2) {
      const title = h2[1].toLowerCase();
      if (title.includes("product category identity") || title.includes("产品类别识别")) {
        section = "product_category_identity";
      } else if (title.includes("reference flow") || title.includes("参考流")) {
        section = "reference_flow";
      } else if (title.includes("system boundary") || title.includes("系统边界")) {
        section = "system_boundary";
      } else if (
        title.includes("measurement and unit rules") ||
        title.includes("计量与单位规则") ||
        title.includes("flow properties and unit conventions") ||
        title.includes("流属性与单位约定")
      ) {
        section = "measurement_rules";
      } else if (
        title.includes("foreground data collection") ||
        title.includes("data quality and evidence rules") ||
        title.includes("前景数据采集") ||
        title.includes("数据质量与证据规则")
      ) {
        section = "dataset_production";
      } else if (title.includes("process inventory") || title.includes("过程清单")) {
        section = "process_inventory";
      } else if (title.includes("published dataset profile") || title.includes("发布数据集画像")) {
        section = "published_dataset_profile";
      } else if (title.includes("data sources") || title.includes("数据源")) {
        section = "data_sources";
      } else {
        section = "";
      }
      subSection = "";
      direction = null;
      flowType = null;
      continue;
    }

    const h3Boundary = line.match(/^###\s+(.+)$/u);
    if (h3Boundary && section === "system_boundary") {
      const title = h3Boundary[1].toLowerCase();
      if (title.includes("boundary abstraction") || title.includes("边界概化")) {
        subSection = "boundary_abstraction";
      } else {
        subSection = "";
      }
      continue;
    }

    const h3 = line.match(/^###\s+(.+)$/u);
    if (h3 && section === "dataset_production") {
      const title = h3[1].toLowerCase();
      if (title.includes("data collection protocols") || title.includes("数据采集协议")) {
        subSection = "collection_protocols";
      } else if (title.includes("calculation rules") || title.includes("计算规则")) {
        subSection = "calculation_rules";
      } else if (title.includes("data quality requirements") || title.includes("数据质量要求")) {
        subSection = "data_quality_requirements";
      } else {
        subSection = "";
      }
      continue;
    }

    const h3Process = line.match(/^###\s+(?:Process:\s*|过程：)(.+)$/u);
    if (h3Process && section === "process_inventory") {
      currentProcess = {
        id: normalizeStructuredId(h3Process[1]),
        label: stripInlineCode(h3Process[1]),
        inputs: { product: [], waste: [], elementary: [] },
        outputs: { product: [], waste: [], elementary: [] },
      };
      processInventory.push(currentProcess);
      direction = null;
      flowType = null;
      continue;
    }

    if (/^####\s+(Inputs|输入)$/iu.test(line)) {
      direction = "inputs";
      flowType = null;
      continue;
    }
    if (/^####\s+(Outputs|输出)$/iu.test(line)) {
      direction = "outputs";
      flowType = null;
      continue;
    }

    if (/^#####\s+(Product flows|产品流)$/iu.test(line)) {
      flowType = "product";
      continue;
    }
    if (/^#####\s+(Waste flows|废物流)$/iu.test(line)) {
      flowType = "waste";
      continue;
    }
    if (/^#####\s+(Elementary flows|基本流)$/iu.test(line)) {
      flowType = "elementary";
      continue;
    }

    if (isTableLine(line)) {
      const { table, nextIndex } = parseTable(lines, index);
      if (table) {
        if (section === "reference_flow") {
          const definition = parseReferenceFlowDefinitionTable(table);
          if (definition) {
            referenceFlowDefinition = definition;
          } else {
            const parsedFunctionalUnit = parseFunctionalUnitTable(table);
            if (parsedFunctionalUnit) {
              functionalUnit = parsedFunctionalUnit;
            } else {
              referenceFlows.push(...parseReferenceFlowTable(table));
            }
          }
        } else if (section === "product_category_identity") {
          const identity = parseFieldValueTable(table);
          if (identity) {
            productCategoryIdentity = identity;
          }
        } else if (section === "measurement_rules") {
          measurementRules.push(...parseMeasurementRuleRows(table));
        } else if (section === "system_boundary" && subSection === "boundary_abstraction") {
          const abstraction = parseFieldValueTable(table);
          if (abstraction) {
            boundaryAbstraction = abstraction;
          }
        } else if (section === "process_inventory" && !currentProcess) {
          processMap.push(...parseProcessMapRows(table));
        } else if (section === "process_inventory" && currentProcess && direction && flowType) {
          currentProcess[direction][flowType].push(...parseInventoryRows(table, flowType));
        } else if (section === "dataset_production" && subSection === "collection_protocols") {
          collectionProtocols.push(...parseCollectionProtocolRows(table));
        } else if (section === "dataset_production" && subSection === "calculation_rules") {
          calculationRules.push(...parseCalculationRuleRows(table));
        } else if (section === "dataset_production" && subSection === "data_quality_requirements") {
          dataQualityRequirements.push(...parseDataQualityRequirementRows(table));
        } else if (section === "published_dataset_profile") {
          const profile = parseFieldValueTable(table);
          if (profile) {
            publishedDatasetProfile = profile;
          }
        } else if (section === "data_sources") {
          dataSources.push(...parseDataSourceRows(table));
        }
      }
      index = nextIndex - 1;
    }
  }

  const processMapById = new Map(processMap.map((entry) => [entry.id, entry]));
  for (const processEntry of processInventory) {
    const mappedProcess = processMapById.get(processEntry.id);
    if (mappedProcess?.name) {
      processEntry.label = mappedProcess.name;
    }
  }

  return {
    productCategoryIdentity,
    functionalUnit,
    boundaryAbstraction,
    referenceFlowDefinition,
    referenceFlows,
    measurementRules,
    processMap,
    processInventory,
    collectionProtocols,
    calculationRules,
    dataQualityRequirements,
    publishedDatasetProfile,
    dataSources,
  };
}

function structuredProjectionYaml(projection) {
  const lines = [
    "schema_version: 1",
    "generated_from: markdown",
    `source_markdown: ${PCR_EN_FILE}`,
  ];

  lines.push("product_category_identity:");
  yamlFlatObject(lines, 2, projection.productCategoryIdentity);

  lines.push("functional_unit:");
  yamlFlatObject(lines, 2, projection.functionalUnit);

  lines.push("boundary_abstraction:");
  yamlFlatObject(lines, 2, projection.boundaryAbstraction);

  lines.push("reference_flow_definition:");
  if (projection.referenceFlowDefinition) {
    const definition = projection.referenceFlowDefinition;
    yamlKeyValue(lines, 2, "reference_amount", definition.reference_amount);
    lines.push("  product_flow_ref:");
    yamlKeyValue(lines, 4, "name", definition.product_flow.name);
    yamlKeyValue(lines, 4, "uuid", definition.product_flow.uuid);
    lines.push("  flow_property_ref:");
    yamlKeyValue(lines, 4, "uuid", definition.flow_property_uuid);
    lines.push("  unit_group_ref:");
    yamlKeyValue(lines, 4, "uuid", definition.unit_group_uuid);
    yamlKeyValue(lines, 2, "reference_unit", definition.reference_unit);
    yamlStringArray(lines, 2, "required_qualifiers", definition.required_qualifiers);
  } else {
    lines.push("  {}");
  }

  lines.push("reference_flows:");
  if (projection.referenceFlows.length === 0) {
    lines.push("  []");
  } else {
    for (const flow of projection.referenceFlows) {
      lines.push("  - role: " + yamlScalar(flow.role));
      yamlKeyValue(lines, 4, "name", flow.name);
      yamlKeyValue(lines, 4, "flow_type", flow.flow_type);
      lines.push("    flow_ref:");
      yamlKeyValue(lines, 6, "uuid", flow.uuid);
      lines.push("    flow_property_ref:");
      yamlKeyValue(lines, 6, "uuid", flow.flow_property_uuid);
      lines.push("    unit_group_ref:");
      yamlKeyValue(lines, 6, "uuid", flow.unit_group_uuid);
      yamlKeyValue(lines, 4, "preferred_unit", flow.preferred_unit);
    }
  }

  lines.push("measurement_rules:");
  if (projection.measurementRules.length === 0) {
    lines.push("  []");
  } else {
    for (const rule of projection.measurementRules) {
      lines.push("  - id: " + yamlPlainOrQuoted(rule.id));
      yamlKeyValue(lines, 4, "applies_to", rule.applies_to);
      lines.push("    required_property_ref:");
      yamlKeyValue(lines, 6, "name", rule.required_property);
      yamlKeyValue(lines, 6, "uuid", rule.required_property_uuid);
      yamlKeyValue(lines, 4, "required_unit", rule.required_unit);
      yamlKeyValue(lines, 4, "rule", rule.rule);
    }
  }

  lines.push("process_map:");
  if (projection.processMap.length === 0) {
    lines.push("  []");
  } else {
    for (const processEntry of projection.processMap) {
      lines.push("  - id: " + processEntry.id);
      yamlKeyValue(lines, 4, "name", processEntry.name);
      yamlKeyValue(lines, 4, "inclusion", processEntry.inclusion);
      yamlKeyValue(lines, 4, "inclusion_condition", processEntry.inclusion_condition);
      yamlKeyValue(lines, 4, "role", processEntry.role);
      yamlKeyValue(lines, 4, "quantitative_reference", processEntry.quantitative_reference);
    }
  }

  lines.push("process_inventory:");
  if (projection.processInventory.length === 0) {
    lines.push("  []");
  } else {
    for (const processEntry of projection.processInventory) {
      lines.push("  - id: " + processEntry.id);
      yamlKeyValue(lines, 4, "label", processEntry.label);
      for (const direction of ["inputs", "outputs"]) {
        lines.push(`    ${direction}:`);
        for (const flowType of ["product", "waste", "elementary"]) {
          lines.push(`      ${flowType}:`);
          const rows = processEntry[direction][flowType];
          if (rows.length === 0) {
            lines.push("        []");
            continue;
          }
          for (const row of rows) {
            lines.push("        - role: " + yamlScalar(row.role));
            yamlKeyValue(lines, 10, "name", row.name);
            yamlKeyValue(lines, 10, "flow_type", row.flow_type);
            if (row.uuid) {
              lines.push("          flow_ref:");
              yamlKeyValue(lines, 12, "uuid", row.uuid);
            }
            yamlKeyValue(lines, 10, "property_unit", row.property_unit);
            yamlKeyValue(lines, 10, "amount", row.amount);
            yamlKeyValue(lines, 10, "amount_kind", row.amount_kind);
            yamlKeyValue(lines, 10, "basis", row.basis);
            yamlKeyValue(lines, 10, "basis_kind", row.basis_kind);
            yamlKeyValue(lines, 10, "evidence_kind", row.evidence_kind);
            if (row.collection_protocol_id) {
              lines.push("          collection_protocol_id: " + yamlPlainOrQuoted(row.collection_protocol_id));
            }
            yamlStringArray(lines, 10, "source_ids", row.source_ids);
          }
        }
      }
    }
  }

  lines.push("dataset_production:");
  lines.push("  collection_protocols:");
  if (projection.collectionProtocols.length === 0) {
    lines.push("    []");
  } else {
    for (const protocol of projection.collectionProtocols) {
      lines.push("    - protocol_id: " + yamlPlainOrQuoted(protocol.protocol_id));
      yamlKeyValue(lines, 6, "process_id", protocol.process_id);
      yamlKeyValue(lines, 6, "flow_role", protocol.flow_role);
      yamlKeyValue(lines, 6, "record_type", protocol.record_type);
      yamlKeyValue(lines, 6, "raw_fields", protocol.raw_fields);
      yamlKeyValue(lines, 6, "collection_method", protocol.collection_method);
      yamlKeyValue(lines, 6, "unit", protocol.unit);
      yamlKeyValue(lines, 6, "frequency", protocol.frequency);
      yamlKeyValue(lines, 6, "temporal_coverage", protocol.temporal_coverage);
      yamlKeyValue(lines, 6, "site_scope", protocol.site_scope);
      yamlKeyValue(lines, 6, "aggregation_rule", protocol.aggregation_rule);
      yamlKeyValue(lines, 6, "quality_evidence", protocol.quality_evidence);
    }
  }
  lines.push("  calculation_rules:");
  if (projection.calculationRules.length === 0) {
    lines.push("    []");
  } else {
    for (const rule of projection.calculationRules) {
      lines.push("    - id: " + yamlPlainOrQuoted(rule.id));
      yamlKeyValue(lines, 6, "applies_to", rule.applies_to);
      yamlKeyValue(lines, 6, "rule", rule.rule);
      yamlStringArray(lines, 6, "inputs", rule.inputs);
      yamlKeyValue(lines, 6, "output", rule.output);
      yamlStringArray(lines, 6, "source_ids", rule.source_ids);
    }
  }
  lines.push("  data_quality_requirements:");
  if (projection.dataQualityRequirements.length === 0) {
    lines.push("    []");
  } else {
    for (const requirement of projection.dataQualityRequirements) {
      lines.push("    - id: " + yamlPlainOrQuoted(requirement.id));
      yamlKeyValue(lines, 6, "applies_to", requirement.applies_to);
      yamlKeyValue(lines, 6, "requirement", requirement.requirement);
      yamlKeyValue(lines, 6, "evidence", requirement.evidence);
    }
  }

  lines.push("published_dataset_profile:");
  yamlFlatObject(lines, 2, projection.publishedDatasetProfile);

  lines.push("data_sources:");
  if (projection.dataSources.length === 0) {
    lines.push("  []");
  } else {
    for (const source of projection.dataSources) {
      lines.push("  - id: " + yamlScalar(source.id));
      yamlKeyValue(lines, 4, "type", source.type);
      yamlKeyValue(lines, 4, "reference", source.reference);
      yamlKeyValue(lines, 4, "used_for", source.used_for);
    }
  }

  return `${lines.join("\n")}\n`;
}

function syncStructured(options) {
  const root = rootFromOptions(options);
  const pcrDir = pcrDirectoryFromOptions(root, options);
  const markdownPath = path.join(pcrDir, PCR_EN_FILE);
  if (!existsSync(markdownPath)) {
    console.error(`Missing canonical markdown file: ${markdownPath}`);
    process.exit(1);
  }
  const markdown = readFileSync(markdownPath, "utf8");
  const projection = parsePcrMarkdownToStructured(markdown);
  writeFileSync(path.join(pcrDir, "structured.yaml"), structuredProjectionYaml(projection));
  console.log(`Synced structured PCR from ${toRepoRelative(root, markdownPath)}.`);
}

function readManifest(root, pcrDir) {
  const manifestPath = path.join(pcrDir, "manifest.yaml");
  if (!existsSync(manifestPath)) {
    console.error(`Missing manifest file: ${toRepoRelative(root, manifestPath)}`);
    process.exit(1);
  }
  return { manifestPath, text: readFileSync(manifestPath, "utf8") };
}

function topLevelValue(text, key) {
  const match = text.match(new RegExp(`^${key}:\\s*"?([^"\\n]+)"?\\s*$`, "mu"));
  return match ? match[1].trim() : null;
}

function setTopLevelValue(text, key, value) {
  const rendered = `${key}: ${yamlScalar(value)}`;
  const pattern = new RegExp(`^${key}:.*$`, "mu");
  if (pattern.test(text)) {
    return text.replace(pattern, rendered);
  }
  return `${text.replace(/\s*$/u, "")}\n${rendered}\n`;
}

function setTopLevelPlainValue(text, key, value) {
  const rendered = `${key}: ${String(value)}`;
  const pattern = new RegExp(`^${key}:.*$`, "mu");
  if (pattern.test(text)) {
    return text.replace(pattern, rendered);
  }
  return `${text.replace(/\s*$/u, "")}\n${rendered}\n`;
}

function incrementVersion(current, level) {
  const match = String(current ?? "0.0.0").match(/^(\d+)\.(\d+)\.(\d+)$/u);
  let [major, minor, patch] = match ? match.slice(1).map(Number) : [0, 0, 0];
  if (level === "major") {
    major += 1;
    minor = 0;
    patch = 0;
  } else if (level === "minor") {
    minor += 1;
    patch = 0;
  } else {
    patch += 1;
  }
  return `${major}.${minor}.${patch}`;
}

function updateManifest(options, updater) {
  const root = rootFromOptions(options);
  const pcrDir = pcrDirectoryFromOptions(root, options);
  const { manifestPath, text } = readManifest(root, pcrDir);
  writeFileSync(manifestPath, updater(text));
  return { root, manifestPath };
}

function bump(options) {
  const level = String(options.level ?? "patch");
  if (!["major", "minor", "patch"].includes(level)) {
    console.error("--level must be one of major, minor, or patch.");
    process.exit(1);
  }
  const now = new Date().toISOString();
  const result = updateManifest(options, (text) => {
    const nextVersion = incrementVersion(topLevelValue(text, "version"), level);
    let updated = setTopLevelValue(text, "version", nextVersion);
    updated = setTopLevelValue(updated, "updated_at_utc", now);
    return updated;
  });
  console.log(`Updated PCR manifest version at ${toRepoRelative(result.root, result.manifestPath)}.`);
}

function publish(options) {
  const root = rootFromOptions(options);
  const pcrDir = pcrDirectoryFromOptions(root, options);
  syncStructured({ ...options, root, pcr: toRepoRelative(root, pcrDir) });
  const now = new Date().toISOString();
  const { manifestPath, text } = readManifest(root, pcrDir);
  const version = String(options.version ?? topLevelValue(text, "version") ?? "0.1.0");
  let updated = setTopLevelPlainValue(text, "status", "published");
  updated = setTopLevelValue(updated, "version", version);
  updated = setTopLevelValue(updated, "published_at_utc", now);
  updated = setTopLevelValue(updated, "updated_at_utc", now);
  writeFileSync(manifestPath, updated);
  console.log(`Published PCR manifest at ${toRepoRelative(root, manifestPath)}.`);
}

function writeJson(root, relativePath, payload) {
  const target = path.join(root, relativePath);
  mkdirSync(path.dirname(target), { recursive: true });
  writeFileSync(target, `${JSON.stringify(payload, null, 2)}\n`);
}

function writeText(root, relativePath, content) {
  const target = path.join(root, relativePath);
  mkdirSync(path.dirname(target), { recursive: true });
  writeFileSync(target, content);
}

function sha256File(filePath) {
  return createHash("sha256").update(readFileSync(filePath)).digest("hex");
}

function mappingYaml(classificationVersion, leaves) {
  const lines = [
    "schema_version: 1",
    "classification_system: CPC",
    `classification_version: ${yamlString(classificationVersion)}`,
    "status: scaffold",
    "mappings:",
  ];
  for (const leaf of leaves) {
    lines.push(
      `  - code: ${yamlString(leaf.code)}`,
      `    label: ${yamlString(leaf.title)}`,
      `    pcr_id: ${yamlString(pcrIdForLeaf(leaf))}`,
      "    mapping_type: exact",
      "    confidence: scaffold",
    );
  }
  return `${lines.join("\n")}\n`;
}

function scaffoldCpc(options) {
  const root = rootFromOptions(options);
  init({ root });
  const classificationVersion = String(options["classification-version"] ?? "3.0");
  const source = options.source
    ? path.resolve(String(options.source))
    : path.join(
        root,
        "classifications/systems/cpc",
        classificationVersion,
        "raw/CPC_Ver_3.0_Structure_30Jun2025.csv",
      );
  if (!existsSync(source)) {
    console.error(`CPC source file not found: ${source}`);
    process.exit(1);
  }

  const entries = readCpcCsv(source);
  const { nodes, leaves } = buildCpcModel(entries);
  const pcrLeaves = withPcrIdentity(leaves);
  const rawDir = path.join(root, "classifications/systems/cpc", classificationVersion, "raw");
  mkdirSync(rawDir, { recursive: true });
  const rawTarget = path.join(rawDir, path.basename(source));
  if (path.resolve(source) !== path.resolve(rawTarget)) {
    copyFileSync(source, rawTarget);
  }

  writeText(
    root,
    `classifications/systems/cpc/${classificationVersion}/raw/source-metadata.yaml`,
    `schema_version: 1
classification_system: CPC
classification_version: ${yamlString(classificationVersion)}
source_file: ${yamlString(path.basename(source))}
source_url: ${yamlString(options["source-url"] ?? "")}
sha256: ${yamlString(sha256File(source))}
retrieved_at_utc: ${yamlString(new Date().toISOString())}
`,
  );

  writeJson(root, `classifications/systems/cpc/${classificationVersion}/normalized/hierarchy.json`, {
    schema_version: 1,
    classification_system: "CPC",
    classification_version: classificationVersion,
    status: "scaffold",
    nodes,
  });
  writeJson(root, `classifications/systems/cpc/${classificationVersion}/normalized/leaves.json`, {
    schema_version: 1,
    classification_system: "CPC",
    classification_version: classificationVersion,
    status: "scaffold",
    leaves,
  });
  writeJson(root, `classifications/systems/cpc/${classificationVersion}/normalized/paths.json`, {
    schema_version: 1,
    classification_system: "CPC",
    classification_version: classificationVersion,
    status: "scaffold",
    paths: nodes.map((node) => ({
      code: node.code,
      title: node.title,
      path_codes: node.path_codes,
      path_titles: node.path_titles,
      is_leaf: node.is_leaf,
    })),
  });
  writeJson(root, `classifications/systems/cpc/${classificationVersion}/normalized/leaf-slugs.json`, {
    schema_version: 1,
    classification_system: "CPC",
    classification_version: classificationVersion,
    status: "scaffold",
    leaves: pcrLeaves.map((leaf) => ({
      code: leaf.code,
      title: leaf.title,
      pcr_dir: leaf.pcr_dir,
      pcr_id: pcrIdForLeaf(leaf),
    })),
  });
  writeText(
    root,
    `classifications/mappings/cpc-${classificationVersion}-to-pcr.yaml`,
    mappingYaml(classificationVersion, pcrLeaves),
  );

  for (const leaf of pcrLeaves) {
    const pcrRoot = path.join("library/pcrs", leaf.pcr_directory);
    writeIfMissing(root, path.join(pcrRoot, "manifest.yaml"), cpcLeafManifest(leaf, classificationVersion));
    writeIfMissing(root, path.join(pcrRoot, PCR_EN_FILE), cpcLeafMarkdown(leaf, "en-US"));
    writeIfMissing(root, path.join(pcrRoot, PCR_ZH_FILE), cpcLeafMarkdown(leaf, "zh-CN"));
    writeIfMissing(root, path.join(pcrRoot, "structured.yaml"), cpcStructuredYaml(leaf, classificationVersion));
  }

  console.log(`Scaffolded ${leaves.length} CPC leaf PCR records from ${entries.length} CPC rows.`);
}

function init(options) {
  const root = rootFromOptions(options);
  for (const dir of REQUIRED_DIRS) {
    ensureDir(root, dir);
  }

  writeIfMissing(
    root,
    "library/pcrs/README.md",
    `# PCR Records

Each canonical PCR is represented as a directory:

\`\`\`text
library/pcrs/<domain>/<subdomain>/<pcr-slug>/
  manifest.yaml
  ${PCR_EN_FILE}
  ${PCR_ZH_FILE}
  structured.yaml
\`\`\`

The PCR directory is the stable identity boundary. Classification systems map to PCR ids through \`classifications/mappings/\`.
`,
  );

  writeIfMissing(
    root,
    "library/modules/README.md",
    `# PCR Method Modules

Reusable modules use the same directory pattern when localized:

\`\`\`text
library/modules/<group>/<module-slug>/
  manifest.yaml
  ${MODULE_EN_FILE}
  ${MODULE_ZH_FILE}
  structured.yaml
\`\`\`
`,
  );

  writeIfMissing(
    root,
    "builder/README.md",
    `# PCR Library Builder

Human and agent documentation lives under \`builder/docs/\`. Machine-facing builder assets such as CLI, scripts, schemas, templates, and vocabularies stay directly under \`builder/\`.

## Builder CLI

\`\`\`bash
node builder/cli/index.mjs init
node builder/cli/index.mjs lint
\`\`\`

\`init\` creates the expected scaffold directories and optional PCR scaffold records. \`lint\` validates the repository structure.
`,
  );

  writeIfMissing(
    root,
    "builder/docs/index.md",
    `# Builder Documentation Index

Use this index to route to the smallest relevant builder documentation for the current task.

- \`workflows/\`: PCR create, update, translate, review, and publish workflows.
- \`contracts/\`: Markdown, manifest, structured projection, evidence, and UUID contracts.
- \`methods/\`: reusable modelling method notes.
- \`tools/\`: authoring-time tool and source guidance.
- \`prompts/\`: thin agent prompt entrypoints.
`,
  );

  if (options["sample-pcr"]) {
    const sampleSlug = normalizeSlug(options["sample-pcr"]);
    const sampleRoot = path.join("library/pcrs", sampleSlug);
    writeIfMissing(root, path.join(sampleRoot, "manifest.yaml"), pcrManifest(options));
    writeIfMissing(root, path.join(sampleRoot, PCR_EN_FILE), pcrMarkdown(options, "en-US"));
    writeIfMissing(root, path.join(sampleRoot, PCR_ZH_FILE), pcrMarkdown(options, "zh-CN"));
    writeIfMissing(root, path.join(sampleRoot, "structured.yaml"), structuredYaml());
  }

  console.log(`Initialized PCR library scaffold at ${root}`);
}

function walkDirectories(root) {
  if (!existsSync(root)) {
    return [];
  }
  const results = [];
  const stack = [root];
  while (stack.length > 0) {
    const current = stack.pop();
    results.push(current);
    for (const entry of readdirSync(current)) {
      const child = path.join(current, entry);
      if (statSync(child).isDirectory()) {
        stack.push(child);
      }
    }
  }
  return results;
}

function toRepoRelative(root, absolutePath) {
  return path.relative(root, absolutePath).replaceAll(path.sep, "/");
}

function inventoryRows(processInventory) {
  const rows = [];
  for (const processEntry of processInventory) {
    for (const direction of ["inputs", "outputs"]) {
      for (const flowType of ["product", "waste", "elementary"]) {
        for (const row of processEntry[direction][flowType]) {
          rows.push({ processEntry, direction, flowType, row });
        }
      }
    }
  }
  return rows;
}

function isMaterialManifest(text) {
  const status = topLevelValue(text, "status");
  const maturity = topLevelValue(text, "content_maturity");
  return (
    ["candidate", "active", "published"].includes(status) ||
    ["authored_methodology", "reviewed_methodology"].includes(maturity)
  );
}

function validatePcrProjection(markdownPath, projection, problems, root, material = false, markdown = "") {
  const relativePath = toRepoRelative(root, markdownPath);
  const rows = inventoryRows(projection.processInventory);
  if (rows.length === 0 && projection.processMap.length === 0) {
    return;
  }

  const processMapById = new Map(projection.processMap.map((entry) => [entry.id, entry]));
  const processInventoryById = new Map(projection.processInventory.map((entry) => [entry.id, entry]));

  if (projection.processMap.length === 0) {
    problems.push(`${relativePath}: missing Process Map table in section 6`);
  }

  for (const entry of projection.processMap) {
    if (!entry.id) {
      problems.push(`${relativePath}: Process Map row is missing process_id`);
    }
    if (!PROCESS_INCLUSION_VALUES.has(entry.inclusion)) {
      problems.push(`${relativePath}: Process Map ${entry.id || "(missing id)"} has invalid inclusion "${entry.inclusion}"`);
    }
    if (entry.inclusion === "conditional" && !entry.inclusion_condition) {
      problems.push(`${relativePath}: conditional process ${entry.id} is missing inclusion_condition`);
    }
    if (entry.inclusion === "required" && !processInventoryById.has(entry.id)) {
      problems.push(`${relativePath}: required process ${entry.id} has no detailed inventory section`);
    }
  }

  for (const entry of projection.processInventory) {
    if (projection.processMap.length > 0 && !processMapById.has(entry.id)) {
      problems.push(`${relativePath}: detailed process ${entry.id} is not declared in Process Map`);
    }
  }

  const sourceIds = new Set(projection.dataSources.map((source) => source.id));
  const collectionProtocolIds = new Set(
    projection.collectionProtocols.map((protocol) => protocol.protocol_id).filter(Boolean),
  );
  for (const { processEntry, row } of rows) {
    const context = `${relativePath}: process ${processEntry.id} flow "${row.role || row.name}"`;
    if (!AMOUNT_KIND_VALUES.has(row.amount_kind)) {
      problems.push(`${context} has invalid amount_kind "${row.amount_kind}"`);
    }
    if (!BASIS_KIND_VALUES.has(row.basis_kind)) {
      problems.push(`${context} has invalid basis_kind "${row.basis_kind}"`);
    }
    if (!EVIDENCE_KIND_VALUES.has(row.evidence_kind)) {
      problems.push(`${context} has invalid evidence_kind "${row.evidence_kind}"`);
    }
    if ((row.evidence_kind === "external_source" || row.evidence_kind === "method_formula") && row.source_ids.length === 0) {
      problems.push(`${context} requires source_ids for evidence_kind ${row.evidence_kind}`);
    }
    if (
      material &&
      ["foreground_data", "collected_record", "calculated_from_collection"].includes(row.evidence_kind) &&
      row.amount_kind !== "not_applicable"
    ) {
      if (!row.collection_protocol_id) {
        problems.push(`${context} requires collection_protocol_id for evidence_kind ${row.evidence_kind}`);
      } else if (!collectionProtocolIds.has(row.collection_protocol_id)) {
        problems.push(`${context} references unknown collection_protocol_id ${row.collection_protocol_id}`);
      }
    }
    for (const sourceId of row.source_ids) {
      if (!sourceIds.has(sourceId)) {
        problems.push(`${context} references unknown source_id ${sourceId}`);
      }
    }
  }

  if (!material) {
    return;
  }

  for (const match of String(markdown).matchAll(RECURSIVE_ORIGIN_TERM_PATTERN)) {
    problems.push(`${relativePath}: contains prohibited recursive-origin term "${match[0]}"`);
  }

  const boundaryAbstraction = projection.boundaryAbstraction ?? {};
  for (const key of BOUNDARY_ABSTRACTION_REQUIRED_FIELDS) {
    if (!boundaryAbstraction[key]) {
      problems.push(`${relativePath}: Boundary Abstraction is missing ${key}`);
    }
  }

  for (const protocol of projection.collectionProtocols) {
    const context = `${relativePath}: collection protocol ${protocol.protocol_id}`;
    for (const key of [
      "process_id",
      "flow_role",
      "record_type",
      "raw_fields",
      "collection_method",
      "unit",
      "frequency",
      "temporal_coverage",
      "site_scope",
      "aggregation_rule",
      "quality_evidence",
    ]) {
      if (!protocol[key]) {
        problems.push(`${context} is missing ${key}`);
      }
    }
  }

  const profile = projection.publishedDatasetProfile ?? {};
  for (const key of [
    "dataset_role",
    "downstream_use",
    "allowed_use",
    "excluded_use",
    "required_metadata",
    "required_quality_disclosure",
    "update_trigger",
  ]) {
    if (!profile[key]) {
      problems.push(`${relativePath}: Published Dataset Profile is missing ${key}`);
    }
  }
}

function lint(options) {
  const root = rootFromOptions(options);
  const problems = [];

  for (const dir of REQUIRED_DIRS) {
    if (!existsSync(path.join(root, dir))) {
      problems.push(`Missing required directory: ${dir}`);
    }
  }

  const pcrRoot = path.join(root, "library/pcrs");
  for (const directory of walkDirectories(pcrRoot)) {
    const manifest = path.join(directory, "manifest.yaml");
    if (!existsSync(manifest)) {
      continue;
    }
    for (const fileName of [PCR_EN_FILE, PCR_ZH_FILE, "structured.yaml"]) {
      const candidate = path.join(directory, fileName);
      if (!existsSync(candidate)) {
        problems.push(`Missing PCR file: ${toRepoRelative(root, candidate)}`);
      }
    }
    const canonicalMarkdown = path.join(directory, PCR_EN_FILE);
    if (existsSync(canonicalMarkdown)) {
      const manifestText = readFileSync(manifest, "utf8");
      const markdownText = readFileSync(canonicalMarkdown, "utf8");
      validatePcrProjection(
        canonicalMarkdown,
        parsePcrMarkdownToStructured(markdownText),
        problems,
        root,
        isMaterialManifest(manifestText),
        markdownText,
      );
    }
  }

  if (problems.length > 0) {
    console.error("PCR library lint failed.");
    for (const problem of problems) {
      console.error(`- ${problem}`);
    }
    process.exit(1);
  }

  console.log("PCR library lint passed.");
}

function printHelp() {
  console.log(`PCR Library Builder CLI

Usage:
  node builder/cli/index.mjs init [--root <path>] [--sample-pcr <domain/path/slug>]
  node builder/cli/index.mjs lint [--root <path>]
  node builder/cli/index.mjs scaffold-cpc --source <csv> [--classification-version 3.0]
  node builder/cli/index.mjs sync-structured --pcr <library/pcrs/...> [--root <path>]
  node builder/cli/index.mjs bump --pcr <library/pcrs/...> [--level patch|minor|major] [--root <path>]
  node builder/cli/index.mjs publish --pcr <library/pcrs/...> [--version <semver>] [--root <path>]
`);
}

const { command, options } = parseArgs(process.argv.slice(2));

if (command === "init") {
  init(options);
} else if (command === "lint") {
  lint(options);
} else if (command === "scaffold-cpc") {
  scaffoldCpc(options);
} else if (command === "sync-structured") {
  syncStructured(options);
} else if (command === "bump") {
  bump(options);
} else if (command === "publish") {
  publish(options);
} else {
  printHelp();
  process.exit(command ? 1 : 0);
}
