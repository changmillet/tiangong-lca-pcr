import assert from "node:assert/strict";
import { execFileSync, spawn } from "node:child_process";
import { existsSync, readFileSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import { buildViewer } from "./scripts/build-viewer-data.mjs";
import { filterPcrs, renderMarkdown, summarizeGuidance } from "./static/viewer-core.js";

const repoRoot = path.resolve(".");
const abalonePcrId =
  "pcr.agriculture-forestry-and-fishery-products.fish-crustaceans-molluscs-and-other-aquatic-invertebrates-products.farmed-abalone-live-fresh-or-chilled";

test("buildViewer writes viewer data and static assets", () => {
  const outDir = mkdtempSync(path.join(tmpdir(), "tiangong-pcr-viewer-"));
  try {
    const data = buildViewer({ root: repoRoot, outDir });
    const dataPath = path.join(outDir, "data", "pcr-viewer-data.json");

    assert.equal(data.schema_version, 1);
    assert.equal(data.viewer_kind, "tiangong-pcr-static-viewer-data");
    assert.ok(data.pcr_count > 0);
    assert.ok(existsSync(dataPath));
    assert.ok(existsSync(path.join(outDir, "index.html")));
    assert.ok(existsSync(path.join(outDir, "styles.css")));
    assert.ok(existsSync(path.join(outDir, "app.js")));
    assert.ok(existsSync(path.join(outDir, "viewer-core.js")));

    const parsed = JSON.parse(readFileSync(dataPath, "utf8"));
    const abalone = parsed.pcrs.find((entry) => entry.id === abalonePcrId);

    assert.ok(abalone);
    assert.equal(abalone.title["en-US"], "Farmed abalone, live, fresh or chilled");
    assert.equal(abalone.markdown["en-US"].includes("# Farmed abalone"), true);
    assert.equal(abalone.markdown["zh-CN"].includes("# 养殖鲍鱼"), true);
    assert.equal(abalone.guidance.reference_flow.reference_unit, "kg");
    assert.ok(abalone.guidance.data_sources.length > 0);
    assert.match(abalone.search_text, /abalone/i);
    assert.match(abalone.search_text, /04412/);
  } finally {
    rmSync(outDir, { recursive: true, force: true });
  }
});

test("viewer-core filters PCRs and renders safe Markdown", () => {
  const records = [
    {
      id: "pcr.example.wheat",
      path: "library/pcrs/example/wheat",
      status: "candidate",
      content_maturity: "authored_methodology",
      title: { "en-US": "Wheat seed", "zh-CN": "小麦种子" },
      search_text: "pcr.example.wheat wheat seed cpc 01111",
    },
    {
      id: "pcr.example.abalone",
      path: "library/pcrs/example/abalone",
      status: "scaffold",
      content_maturity: "empty_scaffold",
      title: { "en-US": "Farmed abalone" },
      search_text: "pcr.example.abalone farmed abalone cpc 04412",
    },
  ];

  assert.deepEqual(filterPcrs(records, { query: "04412", status: "", maturity: "" }).map((pcr) => pcr.id), [
    "pcr.example.abalone",
  ]);
  assert.deepEqual(filterPcrs(records, { query: "", status: "candidate", maturity: "" }).map((pcr) => pcr.id), [
    "pcr.example.wheat",
  ]);
  assert.deepEqual(
    filterPcrs(records, { query: "seed", status: "candidate", maturity: "authored_methodology" }).map(
      (pcr) => pcr.id,
    ),
    ["pcr.example.wheat"],
  );

  const html = renderMarkdown("# Title\n\n- <unsafe>\n\n| Field | Value |\n| --- | --- |\n| A | B |");
  assert.match(html, /<h1>Title<\/h1>/);
  assert.match(html, /&lt;unsafe&gt;/);
  assert.match(html, /<table>/);
});

test("viewer-core summarizes guidance counts", () => {
  const summary = summarizeGuidance({
    reference_flow: { reference_unit: "kg", required_qualifiers: ["species", "gate"] },
    process_map: [{ id: "growout" }],
    process_inventory: [{ id: "growout" }, { id: "packout" }],
    production_guidance: {
      collection_protocols: [{ protocol_id: "cp_feed" }],
      calculation_rules: [{ id: "normalize" }],
      data_quality_requirements: [{ id: "scope" }],
    },
    data_sources: [{ id: "source-1" }, { id: "source-2" }],
  });

  assert.deepEqual(summary, {
    reference_unit: "kg",
    required_qualifier_count: 2,
    process_count: 1,
    inventory_process_count: 2,
    collection_protocol_count: 1,
    calculation_rule_count: 1,
    data_quality_requirement_count: 1,
    data_source_count: 2,
  });
});

test("root viewer scripts can build and serve the static viewer", async () => {
  const outDir = mkdtempSync(path.join(tmpdir(), "tiangong-pcr-viewer-cli-"));
  try {
    const buildOutput = execFileSync(process.execPath, [
      "packages/pcr-viewer/scripts/build-viewer-data.mjs",
      "--root",
      repoRoot,
      "--out-dir",
      outDir,
    ], {
      cwd: repoRoot,
      encoding: "utf8",
    });

    assert.match(buildOutput, /Built PCR viewer data for \d+ PCR records/);

    const server = spawn(process.execPath, [
      "packages/pcr-viewer/scripts/serve-viewer.mjs",
      "--root",
      outDir,
      "--port",
      "0",
    ], {
      cwd: repoRoot,
      stdio: ["ignore", "pipe", "pipe"],
    });

    try {
      const ready = await readUntil(server.stdout, /PCR viewer available at http:\/\/127\.0\.0\.1:\d+/u);
      assert.match(ready, /PCR viewer available/);
    } finally {
      server.kill("SIGTERM");
    }
  } finally {
    rmSync(outDir, { recursive: true, force: true });
  }
});

function readUntil(stream, pattern) {
  return new Promise((resolve, reject) => {
    let text = "";
    const timer = setTimeout(() => reject(new Error(`Timed out waiting for ${pattern}`)), 3000);
    stream.on("data", (chunk) => {
      text += chunk.toString("utf8");
      if (pattern.test(text)) {
        clearTimeout(timer);
        resolve(text);
      }
    });
    stream.on("error", (error) => {
      clearTimeout(timer);
      reject(error);
    });
  });
}
