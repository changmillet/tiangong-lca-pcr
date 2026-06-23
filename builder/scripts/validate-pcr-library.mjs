import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cliPath = path.resolve(__dirname, "../cli/index.mjs");
const result = spawnSync(process.execPath, [cliPath, "lint"], {
  stdio: "inherit",
});

process.exit(result.status ?? 1);
