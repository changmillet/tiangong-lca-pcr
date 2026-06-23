#!/usr/bin/env node
import { existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from "node:fs";
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
  const pcrId = String(options["pcr-id"] ?? "pcr.sample.placeholder");
  const titleEn = String(options["title-en"] ?? "Sample PCR Placeholder");
  const titleZh = String(options["title-zh-CN"] ?? "PCR 样例占位");

  return `schema_version: 1
id: ${pcrId}
title:
  en: ${JSON.stringify(titleEn)}
  zh-CN: ${JSON.stringify(titleZh)}
status: scaffold
pcr_kind: product_category_rule
content_maturity: empty_scaffold
languages:
  canonical: en
  available:
    - en
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
  const pcrId = String(options["pcr-id"] ?? "pcr.sample.placeholder");
  const title =
    language === "zh-CN"
      ? String(options["title-zh-CN"] ?? "PCR 样例占位")
      : String(options["title-en"] ?? "Sample PCR Placeholder");
  const sections =
    language === "zh-CN"
      ? [
          "范围与适用性",
          "分析单位",
          "参考流模式",
          "清单流模式",
          "系统边界",
          "分配与计算规则",
          "数据质量与证据规则",
          "生命周期模型指导",
          "校验规则",
          "开放问题",
        ]
      : [
          "Scope and Applicability",
          "Unit of Analysis",
          "Reference Flow Patterns",
          "Inventory Flow Patterns",
          "System Boundary",
          "Allocation and Calculation Rules",
          "Data Quality and Evidence Rules",
          "Lifecycle Model Guidance",
          "Validation Rules",
          "Open Questions",
        ];

  return `---
pcr_id: ${pcrId}
language: ${language}
status: scaffold
sync_with: ${language === "zh-CN" ? "pcr.en.md" : "pcr.zh-CN.md"}
---

# ${title}

${sections.map((section) => `## ${section}\n`).join("\n")}`;
}

function structuredYaml() {
  return `schema_version: 1
status: scaffold
reference_flows: []
inventory_patterns: []
qa_rules: []
`;
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
  pcr.en.md
  pcr.zh-CN.md
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
  module.en.md
  module.zh-CN.md
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

\`init\` creates the expected scaffold directories and optional sample PCR records. \`lint\` validates the repository structure.
`,
  );

  if (options["sample-pcr"]) {
    const sampleSlug = normalizeSlug(options["sample-pcr"]);
    const sampleRoot = path.join("library/pcrs", sampleSlug);
    writeIfMissing(root, path.join(sampleRoot, "manifest.yaml"), pcrManifest(options));
    writeIfMissing(root, path.join(sampleRoot, "pcr.en.md"), pcrMarkdown(options, "en"));
    writeIfMissing(root, path.join(sampleRoot, "pcr.zh-CN.md"), pcrMarkdown(options, "zh-CN"));
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
    for (const fileName of ["pcr.en.md", "pcr.zh-CN.md", "structured.yaml"]) {
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
`);
}

const { command, options } = parseArgs(process.argv.slice(2));

if (command === "init") {
  init(options);
} else if (command === "lint") {
  lint(options);
} else {
  printHelp();
  process.exit(command ? 1 : 0);
}

