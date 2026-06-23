# Reference Flow Decision Rules

Reference flow guidance belongs in PCR records and reusable modules. Deterministic tooling should validate consistency with the selected PCR; it should not silently invent category methodology.

Material PCRs should define one reference flow object rather than separate free-text and UUID-backed alternatives. Use a `Field` / `Value` table for reference amount, product flow UUID, flow property UUID, unit group UUID, reference unit, and category-specific required qualifiers.
