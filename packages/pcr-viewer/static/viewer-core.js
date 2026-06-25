export function filterPcrs(pcrs, { query = "", status = "", maturity = "" } = {}) {
  const normalizedQuery = normalize(query);
  return pcrs.filter((pcr) => {
    if (status && pcr.status !== status) {
      return false;
    }
    if (maturity && pcr.content_maturity !== maturity) {
      return false;
    }
    if (!normalizedQuery) {
      return true;
    }
    return normalize(pcr.search_text).includes(normalizedQuery);
  });
}

export function summarizeGuidance(guidance = {}) {
  return {
    reference_unit: guidance.reference_flow?.reference_unit ?? "",
    required_qualifier_count: guidance.reference_flow?.required_qualifiers?.length ?? 0,
    process_count: guidance.process_map?.length ?? 0,
    inventory_process_count: guidance.process_inventory?.length ?? 0,
    collection_protocol_count: guidance.production_guidance?.collection_protocols?.length ?? 0,
    calculation_rule_count: guidance.production_guidance?.calculation_rules?.length ?? 0,
    data_quality_requirement_count: guidance.production_guidance?.data_quality_requirements?.length ?? 0,
    data_source_count: guidance.data_sources?.length ?? 0,
  };
}

export function renderMarkdown(markdown = "") {
  const lines = markdown.split(/\r?\n/u);
  const html = [];
  let paragraph = [];
  let listItems = [];
  let codeLines = [];
  let tableRows = [];
  let inCode = false;

  const flushParagraph = () => {
    if (paragraph.length > 0) {
      html.push(`<p>${paragraph.map(renderInlineMarkdown).join(" ")}</p>`);
      paragraph = [];
    }
  };
  const flushList = () => {
    if (listItems.length > 0) {
      html.push(`<ul>${listItems.map((item) => `<li>${renderInlineMarkdown(item)}</li>`).join("")}</ul>`);
      listItems = [];
    }
  };
  const flushCode = () => {
    if (codeLines.length > 0) {
      html.push(`<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
      codeLines = [];
    }
  };
  const flushTable = () => {
    if (tableRows.length > 0) {
      html.push(renderTable(tableRows));
      tableRows = [];
    }
  };
  const flushBlocks = () => {
    flushParagraph();
    flushList();
    flushTable();
  };

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      if (inCode) {
        inCode = false;
        flushCode();
      } else {
        flushBlocks();
        inCode = true;
      }
      continue;
    }
    if (inCode) {
      codeLines.push(line);
      continue;
    }
    if (!line.trim()) {
      flushBlocks();
      continue;
    }
    if (/^\|.*\|$/u.test(line.trim())) {
      flushParagraph();
      flushList();
      tableRows.push(line);
      continue;
    }
    flushTable();
    const heading = /^(#{1,})\s+(.+)$/u.exec(line);
    if (heading) {
      flushParagraph();
      flushList();
      const level = Math.min(heading[1].length, 6);
      html.push(`<h${level}>${renderInlineMarkdown(stripClosingHeadingMarkers(heading[2]))}</h${level}>`);
      continue;
    }
    const list = /^\s*[-*+]\s+(.+)$/u.exec(line);
    if (list) {
      flushParagraph();
      listItems.push(list[1]);
      continue;
    }
    paragraph.push(line.trim());
  }

  if (inCode) {
    flushCode();
  }
  flushBlocks();
  return html.join("\n");
}

export function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderInlineMarkdown(value = "") {
  const parts = String(value).split(/(`[^`]+`)/u);
  return parts
    .map((part) => {
      if (/^`[^`]+`$/u.test(part)) {
        return `<code>${escapeHtml(part.slice(1, -1))}</code>`;
      }
      return escapeHtml(part);
    })
    .join("");
}

function stripClosingHeadingMarkers(value) {
  return String(value).replace(/\s+#+\s*$/u, "").trim();
}

function renderTable(rows) {
  const parsed = rows
    .filter((row) => !/^\|\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/u.test(row))
    .map((row) => row.split("|").slice(1, -1).map((cell) => cell.trim()));
  if (parsed.length === 0) {
    return "";
  }
  const [header, ...body] = parsed;
  return `<table><thead><tr>${header.map((cell) => `<th>${renderInlineMarkdown(cell)}</th>`).join("")}</tr></thead><tbody>${body
    .map((row) => `<tr>${row.map((cell) => `<td>${renderInlineMarkdown(cell)}</td>`).join("")}</tr>`)
    .join("")}</tbody></table>`;
}

function normalize(value = "") {
  return String(value).toLowerCase().trim();
}
