#!/usr/bin/env node
import { readFileSync } from "node:fs";
import path from "node:path";

import {
  buildGuidance,
  buildPcrTree,
  createFeedbackDraft,
  listPcrs,
  readPcrMarkdown,
  resolveClassification,
  validateDatasetAgainstGuidance,
  validateModelAgainstGuidance,
} from "../../pcr-core/src/index.mjs";

const defaultRoot = path.resolve(new URL("../../..", import.meta.url).pathname);

function main() {
  try {
    const { command, positional, options } = parseArgs(process.argv.slice(2));
    const root = path.resolve(String(options.root ?? defaultRoot));
    const format = String(options.format ?? "table");

    if (options.help || command === "help") {
      process.stdout.write(helpText());
      return;
    }
    if (command === "list") {
      writeOutput(paginateList(filterPcrs(listPcrs({ root }), options), options), format, formatListTable);
      return;
    }
    if (command === "tree") {
      const depth = options.depth ? Number(options.depth) : Infinity;
      const tree = buildPcrTree({ root, depth });
      writeOutput(tree, format, formatTreeMarkdown);
      return;
    }
    if (command === "resolve") {
      const classification = String(options.classification ?? "");
      const [system, version, code] = classification.split(":");
      if (!system || !version || !code) {
        throw new Error("Use --classification <system>:<version>:<code>, for example cpc:3.0:01111");
      }
      writeOutput(resolveClassification({ root, system, version, code }), format, JSON.stringify);
      return;
    }
    if (command === "show") {
      requireOption(options, "pcr");
      process.stdout.write(readPcrMarkdown({ root, pcrId: String(options.pcr), language: String(options.lang ?? "en-US") }));
      return;
    }
    if (command === "guidance") {
      requireOption(options, "pcr");
      writeOutput(buildGuidance({ root, pcrId: String(options.pcr) }), format, JSON.stringify);
      return;
    }
    if (command === "validate-model") {
      requireOption(options, "pcr");
      requireOption(options, "input");
      const modelText = readFileSync(path.resolve(String(options.input)), "utf8");
      writeOutput(
        validateModelAgainstGuidance({ root, pcrId: String(options.pcr), model: modelText }),
        format,
        JSON.stringify,
      );
      return;
    }
    if (command === "validate-dataset") {
      requireOption(options, "pcr");
      requireOption(options, "input");
      const datasetText = readFileSync(path.resolve(String(options.input)), "utf8");
      writeOutput(
        validateDatasetAgainstGuidance({ root, pcrId: String(options.pcr), dataset: parseDatasetInput(datasetText) }),
        format,
        JSON.stringify,
      );
      return;
    }
    if (command === "feedback" && positional[0] === "draft") {
      requireOption(options, "type");
      const draft = createFeedbackDraft({
        root,
        pcrId: options.pcr ? String(options.pcr) : "",
        type: String(options.type),
        affectedSection: String(options["affected-section"] ?? ""),
        processId: String(options["process-id"] ?? ""),
        flowRole: String(options["flow-role"] ?? ""),
        summary: String(options.summary ?? ""),
        evidence: String(options.evidence ?? ""),
        proposedChange: String(options["proposed-change"] ?? ""),
      });
      if (format === "json") {
        process.stdout.write(`${JSON.stringify(draft, null, 2)}\n`);
        return;
      }
      process.stdout.write(`# ${draft.title}\n\n${draft.body}`);
      return;
    }

    process.stdout.write(helpText());
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  }
}

function parseArgs(argv) {
  const options = {};
  const positional = [];
  let command = "";

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token.startsWith("--")) {
      const key = token.slice(2);
      const next = argv[index + 1];
      if (next === undefined || next.startsWith("--")) {
        options[key] = true;
        continue;
      }
      options[key] = next;
      index += 1;
      continue;
    }
    if (!command) {
      command = token;
      continue;
    }
    positional.push(token);
  }

  return { command, positional, options };
}

function writeOutput(value, format, tableFormatter) {
  if (format === "json") {
    process.stdout.write(`${JSON.stringify(value, null, 2)}\n`);
    return;
  }
  if (format === "markdown") {
    process.stdout.write(`${tableFormatter(value)}\n`);
    return;
  }
  process.stdout.write(`${tableFormatter(value)}\n`);
}

function parseDatasetInput(text) {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function filterPcrs(pcrs, options) {
  let result = pcrs;
  if (options.status) {
    result = result.filter((entry) => entry.status === String(options.status));
  }
  if (options["content-maturity"]) {
    result = result.filter((entry) => entry.content_maturity === String(options["content-maturity"]));
  }
  return result;
}

function paginateList(pcrs, options) {
  const pageSize = positiveInteger(options["page-size"] ?? options.limit, 10);
  const page = positiveInteger(options.page, 1);
  const totalCount = pcrs.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const boundedPage = Math.min(page, totalPages);
  const startIndex = (boundedPage - 1) * pageSize;
  const items = pcrs.slice(startIndex, startIndex + pageSize);
  const nextPage = boundedPage < totalPages ? boundedPage + 1 : null;
  const previousPage = boundedPage > 1 ? boundedPage - 1 : null;

  return {
    page: boundedPage,
    page_size: pageSize,
    total_count: totalCount,
    total_pages: totalPages,
    items,
    previous_command: previousPage ? buildListCommand({ ...options, page: previousPage }) : null,
    next_command: nextPage ? buildListCommand({ ...options, page: nextPage }) : null,
    next_steps: [
      "If you have a classification code, prefer resolve --classification <system>:<version>:<code>.",
      "If the correct PCR is unclear, inspect tree --depth 3 and then open candidate guidance.",
      "After selecting a PCR, run guidance --pcr <pcr-id> --format json.",
    ],
  };
}

function formatListTable(page) {
  const lines = ["PCR id | Status | Title", "--- | --- | ---"];
  for (const pcr of page.items) {
    lines.push(`${pcr.id} | ${pcr.status} | ${pcr.title["en-US"] ?? ""}`);
  }
  const start = page.total_count === 0 ? 0 : (page.page - 1) * page.page_size + 1;
  const end = Math.min(page.page * page.page_size, page.total_count);
  lines.push("");
  lines.push(`Showing ${start}-${end} of ${page.total_count} PCR records. Page ${page.page} of ${page.total_pages}.`);
  if (page.previous_command) {
    lines.push(`Previous page: ${page.previous_command}`);
  }
  if (page.next_command) {
    lines.push(`Next page: ${page.next_command}`);
  }
  lines.push("Next step: use `resolve` when you have a classification code, otherwise open candidate PCRs with `guidance --pcr <pcr-id> --format json`.");
  return lines.join("\n");
}

function positiveInteger(value, fallback) {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    return fallback;
  }
  return parsed;
}

function buildListCommand(options) {
  const parts = ["tiangong-pcr", "list"];
  if (options.status) {
    parts.push("--status", shellToken(String(options.status)));
  }
  if (options["content-maturity"]) {
    parts.push("--content-maturity", shellToken(String(options["content-maturity"])));
  }
  if (options["page-size"]) {
    parts.push("--page-size", shellToken(String(options["page-size"])));
  } else if (options.limit) {
    parts.push("--page-size", shellToken(String(options.limit)));
  }
  if (options.page) {
    parts.push("--page", shellToken(String(options.page)));
  }
  return parts.join(" ");
}

function shellToken(value) {
  return /^[A-Za-z0-9._:-]+$/u.test(value) ? value : JSON.stringify(value);
}

function formatTreeMarkdown(tree) {
  const lines = [];
  renderTreeNode(tree, lines, 0);
  return lines.join("\n");
}

function renderTreeNode(node, lines, depth) {
  for (const [segment, value] of Object.entries(node).sort(([left], [right]) => left.localeCompare(right))) {
    lines.push(`${"  ".repeat(depth)}- ${segment}`);
    for (const pcr of value.pcrs ?? []) {
      lines.push(`${"  ".repeat(depth + 1)}- ${pcr.id}`);
    }
    renderTreeNode(value.children ?? {}, lines, depth + 1);
  }
}

function requireOption(options, key) {
  if (!options[key]) {
    throw new Error(`Missing required option --${key}`);
  }
}

function helpText() {
  return `tiangong-pcr

Commands:
  list [--status <status>] [--content-maturity <state>] [--page <n>] [--page-size <n>] [--format json|markdown|table]
  tree [--depth <n>] [--format json|markdown]
  resolve --classification <system>:<version>:<code> [--format json]
  show --pcr <pcr-id> [--lang en-US|zh-CN]
  guidance --pcr <pcr-id> [--format json]
  validate-dataset --pcr <pcr-id> --input <file> [--format json]
  feedback draft --pcr <pcr-id> --type <type> [--summary <text>]

Agent workflow:
  1. If a classification code is available, run resolve --classification <system>:<version>:<code> --format json.
  2. If no code is available, use tree/list to browse explicit PCR hierarchy. list defaults to 10 records per page.
  3. After choosing a PCR, run guidance --pcr <pcr-id> --format json.
  4. Build the foreground data collection package, then run validate-dataset.
  5. If PCR guidance is missing or ambiguous, run feedback draft with the observed gap.
`;
}

main();
