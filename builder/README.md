# PCR Library Builder

This directory contains construction methods, templates, schemas, fixtures, and CLI tools for maintaining the PCR library.

The builder treats classification systems as inputs and mappings. It does not make PCR records subordinate to any one classification system.

## Builder CLI

```bash
npm run init
npm run lint
npm run validate
```

- `init` creates required scaffold directories and guide files.
- `lint` checks required repository paths and bilingual PCR directory completeness.
- `validate` runs lint plus tests.

The direct CLI entry point is:

```bash
node builder/cli/index.mjs <command>
```
