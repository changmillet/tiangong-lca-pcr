# Architecture

The PCR library separates canonical PCR records from classification systems.

```text
classification code -> mapping -> canonical PCR -> modules -> rendered PCR
```

Canonical PCR records live under `library/pcrs/`. Classification source data and mappings live under `classifications/`.

PCR records use a directory-level bilingual structure:

```text
library/pcrs/<domain>/<subdomain>/<pcr-slug>/
  manifest.yaml
  pcr.en.md
  pcr.zh-CN.md
  structured.yaml
```

This keeps one PCR identity while allowing English and Chinese markdown renderings to coexist.
