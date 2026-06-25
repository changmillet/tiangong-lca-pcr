import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { parseYaml } from "../../packages/pcr-core/src/yaml-lite.mjs";
import {
  CONTENT_MATURITY_VALUES,
  PCR_STATUS_VALUES,
  TRANSLATION_STATUS_VALUES,
} from "./lifecycle-vocab.mjs";
import { parsePcrMarkdownToStructured } from "./markdown-projection.mjs";
import { PCR_EN_FILE, PCR_ZH_FILE } from "./scaffold-templates.mjs";
import { REQUIRED_DIRS } from "./builder-constants.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const defaultRoot = path.resolve(__dirname, "../..");

function rootFromOptions(options) {
  return path.resolve(String(options.root ?? defaultRoot));
}

const PROCESS_INCLUSION_VALUES = new Set(["required", "conditional", "optional", "excluded_by_default"]);
const AMOUNT_VALUE_MODE_VALUES = new Set([
  "fixed_value",
  "foreground_record",
  "calculated_value",
  "modelled_estimate",
  "not_applicable",
]);
const AMOUNT_SPECIFICITY_VALUES = new Set([
  "generic",
  "site_specific",
  "product_specific",
  "route_specific",
  "scenario_specific",
  "technology_specific",
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
const FLOW_TYPE_VALUES = new Set(["product", "waste", "elementary"]);
const RANGE_ROLE_VALUES = new Set([
  "qa_guardrail",
  "typical_range",
  "allowed_range",
  "default_estimate",
  "uncertainty_range",
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
  "reasoned_estimate",
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
const IMPORTANT_RANGE_PATTERNS = [
  {
    reason: "water or liquid waste",
    pattern: /\b(water|wastewater|brine|washing|desalting)\b|用水|清洗|废水|卤水/iu,
  },
  {
    reason: "fuel or energy",
    pattern: /\b(fuel|diesel|gasoline|natural gas|energy|electricity|power|kwh|mj)\b|燃料|柴油|汽油|天然气|能源|电力|电耗|能耗/iu,
  },
  {
    reason: "direct emission or particulate",
    pattern: /\b(dust|particulate|emission|carbon dioxide|co2|methane|nitrous oxide)\b|粉尘|颗粒|排放|二氧化碳|甲烷|氧化亚氮/iu,
  },
  {
    reason: "waste, reject, or residue",
    pattern: /\b(waste|reject|residue|scrap|off-?size|fines|sludge)\b|废物|拒收|残渣|残留|边角|不合格|细料|污泥/iu,
  },
  {
    reason: "material input or product yield",
    pattern: /\b(raw material|source material|feedstock|material input|fertili[sz]er|herbicide|fungicide|insecticide|pesticide|crop protection|seed lot|seed crop|accepted|cleaned|harvested|declared product|reference product|yield|product mass)\b|原料|来源材料|肥料|除草剂|杀菌剂|杀虫剂|农药|种子|收获|接收|已清洗|声明产品|参考产品|得率|产量/iu,
  },
  {
    reason: "packaging",
    pattern: /\b(packaging|package|packing|pallet|bag|drum)\b|包装|托盘|袋|桶/iu,
  },
];

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

function topLevelValue(text, key) {
  const value = parseYaml(text)[key];
  return value === undefined || value === null ? null : String(value);
}

function isMaterialManifest(text) {
  const status = topLevelValue(text, "status");
  const maturity = topLevelValue(text, "content_maturity");
  return (
    ["candidate", "active", "published"].includes(status) ||
    ["authored_methodology", "reviewed_methodology"].includes(maturity)
  );
}

function rangePolicyFromManifest(text) {
  const status = topLevelValue(text, "status");
  const maturity = topLevelValue(text, "content_maturity");
  if (
    ["active", "published"].includes(status) ||
    ["reviewed_methodology", "published_methodology"].includes(maturity)
  ) {
    return "error";
  }
  if (
    status === "candidate" ||
    ["draft_methodology", "authored_methodology"].includes(maturity)
  ) {
    return "warning";
  }
  return "ignore";
}

function importantRangeReason({ processEntry, direction, flowType, row }) {
  if (row.amount?.value_mode === "not_applicable") {
    return "";
  }
  const propertyUnit = String(row.property_unit ?? "");
  if (/(permit|narrative|descriptor|descriptive record|disclosure record)/iu.test(propertyUnit)) {
    return "";
  }
  if (flowType === "waste") {
    return "waste, reject, or residue";
  }
  const searchable = [
    direction,
    flowType,
    row.row_id,
    row.role,
    row.name,
    row.property_unit,
    row.description,
    row.amount?.expression,
    row.amount?.basis?.text,
  ]
    .filter(Boolean)
    .join(" ");
  for (const { reason, pattern } of IMPORTANT_RANGE_PATTERNS) {
    if (pattern.test(searchable)) {
      return reason;
    }
  }
  return "";
}

function validateManifestLifecycle(root, manifestPath, manifestText, problems) {
  const relativePath = toRepoRelative(root, manifestPath);
  const manifest = parseYaml(manifestText);
  if (!PCR_STATUS_VALUES.includes(manifest.status)) {
    problems.push(`${relativePath}: invalid manifest status "${manifest.status}"`);
  }
  if (!CONTENT_MATURITY_VALUES.includes(manifest.content_maturity)) {
    problems.push(`${relativePath}: invalid manifest content_maturity "${manifest.content_maturity}"`);
  }
  const translationStatus = manifest.translation_status ?? {};
  if (translationStatus && typeof translationStatus === "object" && !Array.isArray(translationStatus)) {
    for (const [language, status] of Object.entries(translationStatus)) {
      if (!TRANSLATION_STATUS_VALUES.includes(status)) {
        problems.push(`${relativePath}: invalid translation_status.${language} "${status}"`);
      }
    }
  } else if (translationStatus !== null) {
    problems.push(`${relativePath}: translation_status must be a map`);
  }
}

function validatePcrProjection(
  markdownPath,
  projection,
  problems,
  warnings,
  root,
  { material = false, rangePolicy = "ignore" } = {},
  markdown = "",
) {
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
  for (const { processEntry, direction, flowType, row } of rows) {
    const context = `${relativePath}: process ${processEntry.id} flow "${row.role || row.name}"`;
    if (!row.row_id) {
      problems.push(`${context} is missing row_id`);
    }
    if (!FLOW_TYPE_VALUES.has(row.flow_type)) {
      problems.push(`${context} has invalid flow_type "${row.flow_type}"`);
    }
    const amount = row.amount ?? {};
    if (!AMOUNT_VALUE_MODE_VALUES.has(amount.value_mode)) {
      problems.push(`${context} has invalid amount.value_mode "${amount.value_mode}"`);
    }
    if (!AMOUNT_SPECIFICITY_VALUES.has(amount.specificity)) {
      problems.push(`${context} has invalid amount.specificity "${amount.specificity}"`);
    }
    if (!BASIS_KIND_VALUES.has(amount.basis?.kind)) {
      problems.push(`${context} has invalid amount.basis.kind "${amount.basis?.kind}"`);
    }
    if (!EVIDENCE_KIND_VALUES.has(amount.evidence?.kind)) {
      problems.push(`${context} has invalid amount.evidence.kind "${amount.evidence?.kind}"`);
    }
    if (
      (amount.evidence?.kind === "external_source" || amount.evidence?.kind === "method_formula") &&
      (amount.evidence?.source_ids ?? []).length === 0
    ) {
      problems.push(`${context} requires source_ids for evidence_kind ${amount.evidence.kind}`);
    }
    if (
      material &&
      ["foreground_data", "collected_record", "calculated_from_collection"].includes(amount.evidence?.kind) &&
      amount.value_mode !== "not_applicable"
    ) {
      if (!amount.evidence?.collection_protocol_id) {
        problems.push(`${context} requires collection_protocol_id for evidence_kind ${amount.evidence.kind}`);
      } else if (!collectionProtocolIds.has(amount.evidence.collection_protocol_id)) {
        problems.push(`${context} references unknown collection_protocol_id ${amount.evidence.collection_protocol_id}`);
      }
    }
    for (const sourceId of amount.evidence?.source_ids ?? []) {
      if (!sourceIds.has(sourceId)) {
        problems.push(`${context} references unknown source_id ${sourceId}`);
      }
    }
    for (const range of amount.ranges ?? []) {
      if (!RANGE_ROLE_VALUES.has(range.role)) {
        problems.push(`${context} has invalid amount range role "${range.role}"`);
      }
      if (!range.unit) {
        problems.push(`${context} amount range ${range.role || "(missing role)"} is missing unit`);
      }
      if (!range.basis) {
        problems.push(`${context} amount range ${range.role || "(missing role)"} is missing basis`);
      }
      if (!BASIS_KIND_VALUES.has(range.basis_kind)) {
        problems.push(`${context} amount range ${range.role || "(missing role)"} has invalid basis_kind "${range.basis_kind}"`);
      }
      if (!EVIDENCE_KIND_VALUES.has(range.evidence_kind)) {
        problems.push(`${context} amount range ${range.role || "(missing role)"} has invalid evidence_kind "${range.evidence_kind}"`);
      }
      if (
        (range.evidence_kind === "external_source" || range.evidence_kind === "method_formula") &&
        range.source_ids.length === 0
      ) {
        problems.push(`${context} amount range ${range.role || "(missing role)"} requires source_ids`);
      }
      for (const sourceId of range.source_ids) {
        if (!sourceIds.has(sourceId)) {
          problems.push(`${context} amount range ${range.role || "(missing role)"} references unknown source_id ${sourceId}`);
        }
      }
    }
    const rangeReason = importantRangeReason({ processEntry, direction, flowType, row });
    if (rangeReason && rangePolicy !== "ignore" && (amount.ranges ?? []).length === 0) {
      const finding = `${context} is an important flow (${rangeReason}) and has no amount range; add a Range/数量范围 block with source-backed evidence or a broad reasoned_estimate.`;
      if (rangePolicy === "error") {
        problems.push(finding);
      } else {
        warnings.push(finding);
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

export function lint(options) {
  const root = rootFromOptions(options);
  const problems = [];
  const warnings = [];

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
      validateManifestLifecycle(root, manifest, manifestText, problems);
      const markdownText = readFileSync(canonicalMarkdown, "utf8");
      validatePcrProjection(
        canonicalMarkdown,
        parsePcrMarkdownToStructured(markdownText),
        problems,
        warnings,
        root,
        {
          material: isMaterialManifest(manifestText),
          rangePolicy: rangePolicyFromManifest(manifestText),
        },
        markdownText,
      );
    }
  }

  if (problems.length > 0) {
    throw new Error(`PCR library lint failed.\n${problems.map((problem) => `- ${problem}`).join("\n")}`);
  }

  if (warnings.length > 0) {
    return [
      "PCR library lint passed with warnings.",
      "",
      "Warnings:",
      ...warnings.map((warning) => `- ${warning}`),
      "",
      "Next:",
      "- Add Range/数量范围 blocks for important flows. Use reasoned_estimate when stronger evidence is not available yet.",
    ];
  }

  return ["PCR library lint passed."];
}
