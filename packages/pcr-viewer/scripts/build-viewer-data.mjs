import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";

import { listPcrs } from "../../pcr-core/src/index.mjs";
import { readYamlFile } from "../../pcr-core/src/yaml-lite.mjs";

const repoRoot = path.resolve(new URL("../../..", import.meta.url).pathname);
const packageRoot = path.resolve(new URL("..", import.meta.url).pathname);
const defaultOutDir = path.join(packageRoot, "dist");
const staticDir = path.join(packageRoot, "static");
const languages = ["en-US", "zh-CN"];

export function buildViewer({ root = repoRoot, outDir = defaultOutDir } = {}) {
  const data = buildViewerData({ root });

  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });
  cpSync(staticDir, outDir, { recursive: true });

  const dataDir = path.join(outDir, "data");
  mkdirSync(dataDir, { recursive: true });
  writeFileSync(path.join(dataDir, "pcr-viewer-data.json"), `${JSON.stringify(data, null, 2)}\n`);

  return data;
}

export function buildViewerData({ root = repoRoot } = {}) {
  const pcrs = listPcrs({ root }).map((pcr) => {
    const markdown = Object.fromEntries(
      languages.map((language) => [language, readOptionalMarkdown({ root, pcr, language })]),
    );
    const guidance = readOptionalGuidance({ root, pcr });
    const classificationText = (pcr.classification_refs ?? [])
      .map((ref) => `${ref.system ?? ""} ${ref.version ?? ""} ${ref.code ?? ""} ${ref.title ?? ""}`)
      .join(" ");

    return {
      ...pcr,
      markdown,
      guidance,
      search_text: [
        pcr.id,
        pcr.path,
        pcr.title?.["en-US"],
        pcr.title?.["zh-CN"],
        pcr.status,
        pcr.content_maturity,
        classificationText,
      ]
        .filter(Boolean)
        .join(" "),
    };
  });

  return {
    schema_version: 1,
    viewer_kind: "tiangong-pcr-static-viewer-data",
    generated_at_utc: new Date().toISOString(),
    pcr_count: pcrs.length,
    pcrs,
  };
}

function readOptionalMarkdown({ root, pcr, language }) {
  try {
    const markdownPath = path.join(root, pcr.path, `pcr.${language}.md`);
    if (!existsSync(markdownPath)) {
      return "";
    }
    return readFileSync(markdownPath, "utf8");
  } catch {
    return "";
  }
}

function readOptionalGuidance({ root, pcr }) {
  try {
    const structuredPath = path.join(root, pcr.path, "structured.yaml");
    if (!existsSync(structuredPath)) {
      throw new Error(`structured.yaml not found for ${pcr.id}`);
    }
    const structured = readYamlFile(structuredPath);
    return {
      schema_version: 1,
      guidance_kind: "tiangong-pcr-agent-guidance",
      pcr,
      source_structured: toPosix(path.relative(root, structuredPath)),
      reference_flow: structured.reference_flow_definition ?? {},
      boundary_abstraction: structured.boundary_abstraction ?? {},
      measurement_rules: structured.measurement_rules ?? structured.unit_conventions ?? [],
      process_map: structured.process_map ?? [],
      process_inventory: structured.process_inventory ?? [],
      production_guidance: {
        collection_protocols: structured.dataset_production?.collection_protocols ?? [],
        calculation_rules: structured.dataset_production?.calculation_rules ?? [],
        data_quality_requirements: structured.dataset_production?.data_quality_requirements ?? [],
      },
      published_dataset_profile: structured.published_dataset_profile ?? {},
      data_quality_rules: structured.data_quality_rules ?? [],
      validation_rules: structured.validation_rules ?? [],
      data_sources: structured.data_sources ?? [],
      validation_notes: [
        "Use this guidance as the source of Tiangong foreground data collection package requirements.",
        "Preserve Tiangong UUIDs exactly and keep PCR-derived UUID references version-free.",
        "Run tiangong-pcr validate-dataset after constructing a foreground data package and draft feedback if PCR guidance is missing or ambiguous.",
      ],
    };
  } catch (error) {
    return { guidance_error: error.message };
  }
}

function toPosix(value) {
  return value.split(path.sep).join("/");
}

function cliOptions(argv) {
  const options = {};
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === "--root") {
      options.root = path.resolve(argv[index + 1]);
      index += 1;
    } else if (token === "--out-dir") {
      options.outDir = path.resolve(argv[index + 1]);
      index += 1;
    } else {
      throw new Error(`Unknown option: ${token}`);
    }
  }
  return options;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const data = buildViewer(cliOptions(process.argv.slice(2)));
  console.log(`Built PCR viewer data for ${data.pcr_count} PCR records.`);
}
