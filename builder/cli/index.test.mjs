import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, unlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

const cliPath = path.resolve("builder/cli/index.mjs");

function makeTempRoot() {
  return mkdtempSync(path.join(tmpdir(), "tiangong-pcr-cli-test-"));
}

function runCli(args, options = {}) {
  return execFileSync(process.execPath, [cliPath, ...args], {
    cwd: path.resolve("."),
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    ...options,
  });
}

test("init creates the bilingual PCR repository scaffold", () => {
  const root = makeTempRoot();
  try {
    const output = runCli(["init", "--root", root]);

    assert.match(output, /initialized PCR library scaffold/i);
    assert.match(
      readFileSync(path.join(root, "library/pcrs/README.md"), "utf8"),
      /manifest.yaml/,
    );
    assert.match(
      readFileSync(path.join(root, "library/modules/README.md"), "utf8"),
      /module.en.md/,
    );
    assert.match(
      readFileSync(path.join(root, "builder/README.md"), "utf8"),
      /Builder CLI/,
    );
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("lint passes for initialized scaffold", () => {
  const root = makeTempRoot();
  try {
    runCli(["init", "--root", root]);
    const output = runCli(["lint", "--root", root]);

    assert.match(output, /PCR library lint passed/i);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("lint rejects PCR directories missing the Chinese markdown file", () => {
  const root = makeTempRoot();
  try {
    runCli(["init", "--root", root]);
    const pcrDir = path.join(root, "library/pcrs/agriculture/crops/wheat-seed");
    runCli([
      "init",
      "--root",
      root,
      "--sample-pcr",
      "agriculture/crops/wheat-seed",
      "--pcr-id",
      "pcr.agriculture.crops.wheat-seed",
      "--title-en",
      "Wheat seed production",
      "--title-zh-CN",
      "小麦种子生产",
    ]);
    unlinkSync(path.join(pcrDir, "pcr.zh-CN.md"));

    assert.throws(
      () => runCli(["lint", "--root", root]),
      (error) =>
        String(error.stderr).includes("library/pcrs/agriculture/crops/wheat-seed/pcr.zh-CN.md"),
    );
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

