# Range Authoring Rules

Typical ranges are authoring priors and QA guardrails. They are not substitutes for source-backed field evidence.

Every range should declare:

- numeric lower and upper bound, or `not_applicable`
- reference basis, such as `per 1,000 kg reference product`
- intended use, such as `screening`, `comparison`, or `hard_validation`
- source ids for the range
- range type, such as `observed_dataset`, `external_source`, `method_formula`, or `site_specific`
- conversion notes when an area-based or process-row value is normalized to the PCR reference flow

Prefer narrow ranges only when a source supports them. When no defensible range is available, state that the value is `site_specific` and require foreground evidence instead of inserting a placeholder range.
