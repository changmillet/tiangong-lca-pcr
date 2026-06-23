import { existsSync } from "node:fs";

const requiredPaths = [
  "library/catalog.yaml",
  "library/pcrs",
  "library/modules",
  "classifications/systems",
  "classifications/mappings",
  "builder/templates",
  "builder/schemas",
];

const missing = requiredPaths.filter((path) => !existsSync(path));

if (missing.length > 0) {
  console.error("PCR library validation failed. Missing paths:");
  for (const path of missing) {
    console.error(`- ${path}`);
  }
  process.exit(1);
}

console.log("PCR library scaffold validation passed.");

