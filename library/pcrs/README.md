# PCR Records

Each canonical PCR is represented as a directory:

```text
library/pcrs/<domain>/<subdomain>/<pcr-slug>/
  manifest.yaml
  pcr.en.md
  pcr.zh-CN.md
  structured.yaml
```

The PCR directory is the stable identity boundary. Classification systems map to PCR ids through `classifications/mappings/`.
