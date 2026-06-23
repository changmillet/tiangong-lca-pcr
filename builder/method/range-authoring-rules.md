# Range Authoring Rules

Typical ranges are authoring priors and QA guardrails. They are not substitutes for source-backed field evidence.

Every range should declare:

- numeric lower and upper bound, or `not_applicable`
- reference basis, such as `per 1,000 kg reference product`
- intended use, such as `screening`, `authoring-prior`, or `hard-validation`
- source ids for the range
- range quality
- conversion notes when an area-based or process-row value is normalized to the PCR reference flow

Prefer narrow ranges only when a source supports them. Use wider `draft-prior` ranges for early PCR examples and mark them as pending review.
