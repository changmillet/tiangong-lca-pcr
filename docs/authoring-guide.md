# Authoring Guide

Author PCR content in canonical PCR files under `library/pcrs/`.

Use mapping files under `classifications/mappings/` to connect external classification codes to canonical PCR ids.

Do not create duplicate PCR files only because two classification systems describe the same product category.

Each material PCR should be a directory:

```text
library/pcrs/<domain>/<subdomain>/<pcr-slug>/
  manifest.yaml
  pcr.en.md
  pcr.zh-CN.md
  structured.yaml
```

Keep language-independent identity and lifecycle state in `manifest.yaml`. Keep machine-oriented rules in `structured.yaml`. Keep human-readable English and Chinese text in `pcr.en.md` and `pcr.zh-CN.md`.
