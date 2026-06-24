---
name: tiangong-pcr
description: Use when selecting a TianGong PCR, reading PCR data-production guidance, validating a foreground data package against PCR rules, or drafting PCR feedback for maintainers.
---

# TianGong PCR

Use the checked-in PCR library through `tiangong-pcr`. Treat CLI guidance as the source of PCR rules for data production.

Use command-specific help when unsure about arguments or output shape:

```bash
npm --silent run tiangong-pcr -- --help
npm --silent run tiangong-pcr -- list --help
npm --silent run tiangong-pcr -- guidance --help
```

## Workflow

1. If the user provides an external classification code, resolve it deterministically:

   ```bash
   npm --silent run tiangong-pcr -- resolve --classification cpc:3.0:01111 --format json
   ```

2. If no classification code is available, inspect the catalog explicitly:

   ```bash
   npm --silent run tiangong-pcr -- tree --depth 3 --format markdown
   npm --silent run tiangong-pcr -- list --status candidate --format json
   npm --silent run tiangong-pcr -- list --page 2 --page-size 10
   ```

   `list` defaults to 10 records per page. Follow `next_command` in JSON output or the "Next page" line in human-readable output. Choose a PCR from product meaning, declared gate, reference flow, and process boundary.

3. Read Agent-facing data-production guidance:

   ```bash
   npm --silent run tiangong-pcr -- guidance --pcr <pcr-id> --format json
   ```

4. Build the foreground data package from `reference_flow`, `boundary_abstraction`, `measurement_rules`, `process_map`, `process_inventory`, `production_guidance`, and `published_dataset_profile`.

5. Validate the foreground data package:

   ```bash
   npm --silent run tiangong-pcr -- validate-dataset --pcr <pcr-id> --input <dataset-file> --format json
   ```

6. Draft feedback when the PCR is missing, ambiguous, outdated, mistranslated, or has weak evidence:

   ```bash
   npm --silent run tiangong-pcr -- feedback draft --pcr <pcr-id> --type range_evidence_update --summary "<finding>"
   ```

## Boundaries

- `pcr.en-US.md` remains the canonical authored PCR source.
- `structured.yaml` is generated and consumed by `tiangong-pcr guidance`.
- PCR guidance is foreground-data-package first; process and lifecyclemodel outputs are projections of that package.
- Tiangong UUIDs from PCR guidance must be copied without dataset versions.
- Feedback issues are candidate evidence for maintainers before review and merge.
- Use `missing_pcr` feedback only after checking `tree`, `list`, and any relevant classification mapping.
