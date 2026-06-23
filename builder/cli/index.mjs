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
  "builder/method",
  "builder/templates",
  "builder/schemas",
  "builder/scripts",
  "docs",
];

const PCR_EN_FILE = "pcr.en-US.md";
const PCR_ZH_FILE = "pcr.zh-CN.md";
const MODULE_EN_FILE = "module.en-US.md";
const MODULE_ZH_FILE = "module.zh-CN.md";

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
  - lifecyclemodel
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
reference_flows: []
flow_properties: []
unit_conventions: []
system_boundary: {}
process_inventory: []
allocation_rules: []
data_quality_rules: []
validation_rules: []
data_sources: []
`;
}

function enPcrBody() {
  return `## 1. Scope and Applicability

## 2. Product Category Identity

## 3. Reference Flow

## 4. Flow Properties and Unit Conventions

## 5. System Boundary

## 6. Process Inventory Structure

### Process: <process name>

#### Inputs

##### Product flows

##### Waste flows

##### Elementary flows

#### Outputs

##### Product flows

##### Waste flows

##### Elementary flows

## 7. Allocation and Co-product Handling

## 8. Data Quality and Evidence Rules

## 9. Validation Rules

## 10. Data Sources
`;
}

function zhPcrBody() {
  return `## 1. 范围与适用性

## 2. 产品类别识别

## 3. 参考流

## 4. 流属性与单位约定

## 5. 系统边界

## 6. 过程清单结构

### 过程：<过程名称>

#### 输入

##### 产品流

##### 废物流

##### 基本流

#### 输出

##### 产品流

##### 废物流

##### 基本流

## 7. 分配与共产品处理

## 8. 数据质量与证据规则

## 9. 校验规则

## 10. 数据源
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
  - lifecyclemodel
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
process_inventory: []
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
        typical_range: stripInlineCode(tableCell(row, headerIndex, ["typical_range", "range"])),
        range_basis: stripInlineCode(tableCell(row, headerIndex, ["range_basis", "basis"])),
        range_type: stripInlineCode(tableCell(row, headerIndex, ["range_type", "range_kind"])),
        source_ids: extractSourceIds(tableCell(row, headerIndex, ["range_sources", "source_ids", "sources"])),
      };
    })
    .filter((row) => row.role || row.name || row.uuid);
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

function parsePcrMarkdownToStructured(markdown) {
  const lines = markdown.split(/\r?\n/u);
  const referenceFlows = [];
  const processInventory = [];
  const dataSources = [];
  let section = "";
  let currentProcess = null;
  let direction = null;
  let flowType = null;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index].trim();
    const h2 = line.match(/^##\s+(?:\d+\.\s*)?(.+)$/u);
    if (h2) {
      const title = h2[1].toLowerCase();
      if (title.includes("reference flow") || title.includes("参考流")) {
        section = "reference_flow";
      } else if (title.includes("process inventory") || title.includes("过程清单")) {
        section = "process_inventory";
      } else if (title.includes("data sources") || title.includes("数据源")) {
        section = "data_sources";
      } else {
        section = "";
      }
      direction = null;
      flowType = null;
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
          referenceFlows.push(...parseReferenceFlowTable(table));
        } else if (section === "process_inventory" && currentProcess && direction && flowType) {
          currentProcess[direction][flowType].push(...parseInventoryRows(table, flowType));
        } else if (section === "data_sources") {
          dataSources.push(...parseDataSourceRows(table));
        }
      }
      index = nextIndex - 1;
    }
  }

  return { referenceFlows, processInventory, dataSources };
}

function structuredProjectionYaml(projection) {
  const lines = [
    "schema_version: 1",
    "generated_from: markdown",
    `source_markdown: ${PCR_EN_FILE}`,
    "reference_flows:",
  ];
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
            yamlKeyValue(lines, 10, "typical_range", row.typical_range);
            yamlKeyValue(lines, 10, "range_basis", row.range_basis);
            yamlKeyValue(lines, 10, "range_type", row.range_type);
            yamlStringArray(lines, 10, "source_ids", row.source_ids);
          }
        }
      }
    }
  }

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

## Builder CLI

\`\`\`bash
node builder/cli/index.mjs init
node builder/cli/index.mjs lint
\`\`\`

\`init\` creates the expected scaffold directories and optional PCR scaffold records. \`lint\` validates the repository structure.
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
