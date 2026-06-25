import { cpSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";

import { buildGuidance, listPcrs, readPcrMarkdown } from "../../pcr-core/src/index.mjs";

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
    return readPcrMarkdown({ root, pcrId: pcr.id, language });
  } catch {
    return "";
  }
}

function readOptionalGuidance({ root, pcr }) {
  try {
    return buildGuidance({ root, pcrId: pcr.id });
  } catch (error) {
    return { guidance_error: error.message };
  }
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
