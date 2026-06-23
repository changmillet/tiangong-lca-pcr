# Measurement and Unit Rules

Section 4 of a PCR is a rule surface, not a flow property catalog.

Add a measurement rule only when it affects one of:

- reference flow consistency
- unit conversion
- foreground data requirements
- validation behavior
- interpretation of inventory rows

Common rule patterns:

- reference product mass basis
- count-to-mass conversion for seed, packaging, or item-count data
- fertilizer product mass versus nutrient mass
- energy unit preservation and conversion
- active ingredient versus formulated product mass

Do not duplicate every flow property or unit that appears in inventory rows. Ordinary row-specific units belong in the process inventory table.
