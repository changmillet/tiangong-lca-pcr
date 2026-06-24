import assert from "node:assert/strict";
import test from "node:test";

import { normalizeHeader, parseTable, tableCell } from "./markdown-table.mjs";

test("parseTable removes separator rows and empty data rows", () => {
  const lines = [
    "| Flow role | `Tiangong UUID` | Amount |",
    "| --- | --- | --- |",
    "| seed output | `11111111-1111-4111-8111-111111111111` | 1 kg |",
    "|  |  |  |",
    "not a table",
  ];

  const { table, nextIndex } = parseTable(lines, 0);

  assert.equal(nextIndex, 4);
  assert.deepEqual(table.headers, ["Flow role", "`Tiangong UUID`", "Amount"]);
  assert.deepEqual(table.rows, [["seed output", "`11111111-1111-4111-8111-111111111111`", "1 kg"]]);
});

test("tableCell reads normalized header aliases", () => {
  const table = parseTable([
    "| Flow role | `Tiangong UUID` |",
    "| --- | --- |",
    "| seed output | abc |",
  ], 0).table;
  const headerIndex = new Map(table.headers.map((header, index) => [normalizeHeader(header), index]));

  assert.equal(headerIndex.has("tiangong_uuid"), true);
  assert.equal(tableCell(table.rows[0], headerIndex, ["uuid", "tiangong_uuid"]), "abc");
  assert.equal(tableCell(table.rows[0], headerIndex, ["missing"]), "");
});
