---
pcr_id: pcr.agriculture-forestry-and-fishery-products.products-of-agriculture-horticulture-and-market-gardening.wheat-seed
language: en-US
status: candidate
sync_with: pcr.zh-CN.md
---

# Wheat Seed for Sowing

## 1. Scope and Applicability

This PCR guides foreground data package construction for cleaned wheat seed intended for sowing, including certified, foundation, registered, or comparable seed classes. It covers seed multiplication, post-harvest seed conditioning, optional seed treatment, packaging, storage, and delivery to the declared gate.

Excluded products are commodity wheat grain for food, feed, starch, ethanol, or trading.

## 2. Product Category Identity

| Field | Value |
| --- | --- |
| canonical_pcr_id | `pcr.agriculture-forestry-and-fishery-products.products-of-agriculture-horticulture-and-market-gardening.wheat-seed` |
| classification_refs | CPC 3.0 `01111`, `Wheat, seed` |
| covered_products | cleaned wheat seed intended for sowing, including certified, foundation, registered, or comparable seed classes |
| excluded_products | commodity wheat grain for food, feed, starch, ethanol, or trading |
| representative_product | cleaned and graded wheat sowing seed at declared moisture basis |
| production_route | seed multiplication field plus post-harvest seed conditioning |
| market_state | cleaned, graded, packaged, and optionally treated wheat seed at seed plant gate or regional delivery point |

## 3. Reference Flow

| Field | Value |
| --- | --- |
| What | cleaned wheat seed for sowing |
| How much | 1 kg |
| How well | declared seed class, treatment status, moisture basis, physical purity, and germination rate |
| How long or cycle | one seed production crop cycle; storage duration declared separately when included |
| reference_flow_link | Reference amount and product flow below |

| Field | Value |
| --- | --- |
| Reference amount | 1 kg |
| Reference product flow | Wheat `12da5e7d-9b93-4404-8c7d-08f98bec6238` |
| Reference flow property | Mass `93a60a56-a3c8-11da-a746-0800200b9a66` |
| Reference unit group | Units of mass `93a60a57-a4c8-11da-a746-0800200c9a66` |
| Reference unit | kg |
| Required qualifiers | seed class or certification class; treatment status; moisture basis; physical purity; germination rate; geography and declared gate; packaging state |

When constructing a foreground data package, the items listed in `Required qualifiers` must be declared in dataset metadata, process notes, reference flow comment, product description, or an equivalent data package field. Missing required qualifiers make the reference flow definition incomplete for that data package.

Mass is the primary reference flow basis. Seed-count data require thousand-kernel weight or another transparent conversion to mass.

## 4. Measurement and Unit Rules

| rule_id | Applies to | Required property | Required unit | Rule |
| --- | --- | --- | --- | --- |
| `reference_mass` | reference product | Mass `93a60a56-a3c8-11da-a746-0800200b9a66` | kg | The reference flow must be expressed as kg cleaned wheat seed for sowing. |
| `seed_count_conversion` | optional seed-count data | Mass `93a60a56-a3c8-11da-a746-0800200b9a66` | kg | Seed count data may be used only when thousand-kernel weight or another transparent conversion to mass is provided. |
| `fertilizer_n_basis` | nitrogen fertilizer inputs and nitrogen emissions | Mass `93a60a56-a3c8-11da-a746-0800200b9a66` | kg | Record nitrogen fertilizer as kg product and kg N when nitrogen emissions are calculated. |
| `energy_inventory` | electricity, fuel, and drying energy | Net calorific value `93a60a56-a3c8-11da-a746-0800200c9a66` | MJ or kWh | State the energy unit used in each inventory row and preserve enough information for conversion. |
| `packaging_count` | count-based packaging data | Number of items `01846770-4cfe-4a25-8ad9-919d8d378345` | item | Count-based packaging data must also state bag capacity or mass when packaging material quantities are calculated by mass. |

Seed quality properties are foreground attributes recorded alongside the mass reference flow:

| Attribute | Common unit | Typical range | Source ids |
| --- | --- | --- | --- |
| Moisture content | percent wet basis | 10-14 percent | `fao-wheat-seed-production` |
| Physical purity | percent by mass | 95-99.9 percent | `fao-wheat-seed-production` |
| Germination rate | percent of seeds | 85-98 percent | `fao-wheat-seed-production`, `umn-small-grain-seeding-rate` |
| Thousand-kernel weight | g/1000 seeds | 25-60 g | `unl-wheat-seeding-rate`, `umn-small-grain-seeding-rate` |
| Seed treatment loading | g active ingredient/kg seed | product-specific |  |

## 5. System Boundary

The default boundary is foreground data collection to the declared gate for wheat seed production:

1. Source seed lot, fertilizer, fuel, electricity, crop protection products, seed treatment chemicals, packaging, and their transport records when they are part of the foreground data package.
2. Field seed multiplication: land preparation, sowing, fertilization, irrigation where applicable, crop protection, field inspections when material, harvesting, and field drying.
3. Seed conditioning: drying, cleaning, grading, testing, treatment, packaging, and storage.
4. Transport to the declared gate when the reference flow is delivered seed.

The foreground data package covers seed production to the declared gate. Downstream wheat cultivation using the seed is described in downstream use metadata when the completed dataset is consumed. Capital goods, land occupation, and land transformation are recorded when the declared data package scope includes them.

This boundary is a data-production abstraction. A declared source seed lot is the reproduction starting condition for the foreground package. The source seed lot carries variety and lot identity; seed biomass formation is represented through field material and elementary flows such as water, nutrients, land use, emissions, and biogenic carbon accounting when declared.

### Boundary Abstraction

| Field | Value |
| --- | --- |
| declared_starting_condition | source_seed_lot |
| starting_condition_role | identity_and_reproduction_condition |
| product_classification_scope | current CPC 3.0 product category `01111`, `Wheat, seed` |
| recursive_input_rule | input flow in the same product category that causes recursive tracing is recorded as declared starting condition |
| upstream_dataset_requirement | source seed lot disclosure and collection protocol record |
| disclosure | record source seed lot identity, propagation class, mass, moisture basis, treatment status, supplier or source field, and evidence |

## 6. Process Inventory Structure

### Process Map

| process_id | process_name | inclusion | inclusion_condition | role | quantitative_reference |
| --- | --- | --- | --- | --- | --- |
| field_seed_multiplication | Field Seed Multiplication | required |  | foreground | harvested seed crop |
| seed_conditioning_and_treatment | Seed Conditioning and Treatment | required |  | foreground | cleaned seed output |
| storage_and_delivery | Storage and Delivery | conditional | include when the declared gate is delivered seed or storage materially affects the reference flow | foreground/downstream | delivered seed |

### Process: Field Seed Multiplication (`field_seed_multiplication`)

#### Inputs

##### Product flows

###### Source seed lot used for multiplication (`source_seed_lot_used_for_multiplication`)

Source seed lot used for multiplication is recorded as an input product flow. Amount rule: site-specific measured mass; normalization basis: per 1,000 kg harvested seed crop.

- Selected flow: Wheat `12da5e7d-9b93-4404-8c7d-08f98bec6238`
- Flow property / unit: Mass / kg
- Amount rule: site-specific measured mass
- Value mode: Foreground record (`foreground_record`)
- Specificity: Site-specific (`site_specific`)
- Normalization basis: per 1,000 kg harvested seed crop
- Basis kind: Process output (`process_output`)
- Evidence kind: Collected record (`collected_record`)
- Collection protocol: `cp_source_seed_lot_mass`
- Sources: `unl-wheat-seeding-rate`, `umn-small-grain-seeding-rate`
- Range: Provisional source seed lot screening estimate
  - Range role: Default estimate (`default_estimate`)
  - Lower: 0.001
  - Upper: 0.2
  - Unit: kg/kg harvested seed crop
  - Basis: broad first-pass source seed lot mass per kg harvested seed crop
  - Basis kind: Process output (`process_output`)
  - Evidence kind: Reasoned estimate (`reasoned_estimate`)

###### Nitrogen fertilizer carrier (`nitrogen_fertilizer_carrier`)

Nitrogen fertilizer carrier is recorded as an input product flow. Amount rule: measured product mass and kg N; normalization basis: per 1,000 kg harvested seed crop.

- Selected flow: Urea `3f8850c0-f718-4c4b-8fcb-8fd42e03aa8e`
- Flow property / unit: Mass / kg
- Amount rule: measured product mass and kg N
- Value mode: Foreground record (`foreground_record`)
- Specificity: Site-specific (`site_specific`)
- Normalization basis: per 1,000 kg harvested seed crop
- Basis kind: Process output (`process_output`)
- Evidence kind: Collected record (`collected_record`)
- Collection protocol: `cp_fertilizer_input_records`
- Sources: `ipcc-2019-managed-soils-n2o`
- Range: Provisional nitrogen fertilizer screening estimate
  - Range role: Default estimate (`default_estimate`)
  - Lower: 0
  - Upper: 0.5
  - Unit: kg fertilizer product/kg harvested seed crop
  - Basis: broad first-pass nitrogen fertilizer carrier mass per kg harvested seed crop
  - Basis kind: Process output (`process_output`)
  - Evidence kind: Reasoned estimate (`reasoned_estimate`)

###### Phosphate fertilizer (`phosphate_fertilizer`)

Phosphate fertilizer is recorded as an input product flow. Amount rule: measured product mass; normalization basis: per 1,000 kg harvested seed crop.

- Selected flow: Phosphate fertilizer `9c196b01-6aad-4252-a6e8-f853853a830c`
- Flow property / unit: Mass / kg
- Amount rule: measured product mass
- Value mode: Foreground record (`foreground_record`)
- Specificity: Site-specific (`site_specific`)
- Normalization basis: per 1,000 kg harvested seed crop
- Basis kind: Process output (`process_output`)
- Evidence kind: Collected record (`collected_record`)
- Collection protocol: `cp_fertilizer_input_records`
- Range: Provisional phosphate fertilizer screening estimate
  - Range role: Default estimate (`default_estimate`)
  - Lower: 0
  - Upper: 0.3
  - Unit: kg fertilizer product/kg harvested seed crop
  - Basis: broad first-pass phosphate fertilizer mass per kg harvested seed crop
  - Basis kind: Process output (`process_output`)
  - Evidence kind: Reasoned estimate (`reasoned_estimate`)

###### Potassium fertilizer (`potassium_fertilizer`)

Potassium fertilizer is recorded as an input product flow. Amount rule: measured product mass; normalization basis: per 1,000 kg harvested seed crop.

- Selected flow: Potassium fertilizer `dd008d87-16e4-4e85-a048-b9949f6fbca6`
- Flow property / unit: Mass / kg
- Amount rule: measured product mass
- Value mode: Foreground record (`foreground_record`)
- Specificity: Site-specific (`site_specific`)
- Normalization basis: per 1,000 kg harvested seed crop
- Basis kind: Process output (`process_output`)
- Evidence kind: Collected record (`collected_record`)
- Collection protocol: `cp_fertilizer_input_records`
- Range: Provisional potassium fertilizer screening estimate
  - Range role: Default estimate (`default_estimate`)
  - Lower: 0
  - Upper: 0.3
  - Unit: kg fertilizer product/kg harvested seed crop
  - Basis: broad first-pass potassium fertilizer mass per kg harvested seed crop
  - Basis kind: Process output (`process_output`)
  - Evidence kind: Reasoned estimate (`reasoned_estimate`)

###### Irrigation water supplied as a product input (`irrigation_water_supplied_as_a_product_input`)

Irrigation water supplied as a product input is recorded as an input product flow. Amount rule: measured irrigation water mass; normalization basis: per 1,000 kg harvested seed crop.

- Selected flow: Irrigation water `4ad684b1-8e85-4dee-8d9c-55d1fa2d4432`
- Flow property / unit: Mass / kg
- Amount rule: measured irrigation water mass
- Value mode: Foreground record (`foreground_record`)
- Specificity: Site-specific (`site_specific`)
- Normalization basis: per 1,000 kg harvested seed crop
- Basis kind: Process output (`process_output`)
- Evidence kind: Collected record (`collected_record`)
- Collection protocol: `cp_irrigation_water_records`
- Range: Provisional irrigation water screening estimate
  - Range role: Default estimate (`default_estimate`)
  - Lower: 0
  - Upper: 5
  - Unit: m3/kg harvested seed crop
  - Basis: broad first-pass irrigation water supplied per kg harvested seed crop
  - Basis kind: Process output (`process_output`)
  - Evidence kind: Reasoned estimate (`reasoned_estimate`)

###### Field machinery fuel (`field_machinery_fuel`)

Field machinery fuel is recorded as an input product flow. Amount rule: measured field fuel use; normalization basis: per 1,000 kg harvested seed crop.

- Selected flow: Diesel, burned in agricultural machinery `57e0b1a3-2d05-46b2-b61b-cf7b5b167c6f`
- Flow property / unit: Mass / kg
- Amount rule: measured field fuel use
- Value mode: Foreground record (`foreground_record`)
- Specificity: Site-specific (`site_specific`)
- Normalization basis: per 1,000 kg harvested seed crop
- Basis kind: Process output (`process_output`)
- Evidence kind: Collected record (`collected_record`)
- Collection protocol: `cp_field_fuel_records`
- Range: Provisional field fuel screening estimate
  - Range role: Default estimate (`default_estimate`)
  - Lower: 0
  - Upper: 0.2
  - Unit: L diesel-equivalent/kg harvested seed crop
  - Basis: broad first-pass field machinery fuel per kg harvested seed crop
  - Basis kind: Process output (`process_output`)
  - Evidence kind: Reasoned estimate (`reasoned_estimate`)

###### Crop protection herbicide proxy (`crop_protection_herbicide_proxy`)

Crop protection herbicide proxy is recorded as an input product flow. Amount rule: measured active ingredient or formulated product mass; normalization basis: per active ingredient or formulated product.

- Selected flow: Herbicide `c1370404-9e2b-4ed6-ba96-c094f74e0f2d`
- Flow property / unit: Mass / kg
- Amount rule: measured active ingredient or formulated product mass
- Value mode: Foreground record (`foreground_record`)
- Specificity: Product-specific (`product_specific`)
- Normalization basis: per active ingredient or formulated product
- Basis kind: Process output (`process_output`)
- Evidence kind: Collected record (`collected_record`)
- Collection protocol: `cp_crop_protection_records`
- Range: Provisional herbicide screening estimate
  - Range role: Default estimate (`default_estimate`)
  - Lower: 0
  - Upper: 0.02
  - Unit: kg active substance or product/kg harvested seed crop
  - Basis: broad first-pass herbicide active substance or formulated product per kg harvested seed crop
  - Basis kind: Process output (`process_output`)
  - Evidence kind: Reasoned estimate (`reasoned_estimate`)

###### Crop protection fungicide proxy (`crop_protection_fungicide_proxy`)

Crop protection fungicide proxy is recorded as an input product flow. Amount rule: measured active ingredient or formulated product mass; normalization basis: per active ingredient or formulated product.

- Selected flow: Azoxystrobin `8a1f4968-6428-413f-a50b-b413bf9190cf`
- Flow property / unit: Mass / kg
- Amount rule: measured active ingredient or formulated product mass
- Value mode: Foreground record (`foreground_record`)
- Specificity: Product-specific (`product_specific`)
- Normalization basis: per active ingredient or formulated product
- Basis kind: Process output (`process_output`)
- Evidence kind: Collected record (`collected_record`)
- Collection protocol: `cp_crop_protection_records`
- Range: Provisional fungicide screening estimate
  - Range role: Default estimate (`default_estimate`)
  - Lower: 0
  - Upper: 0.02
  - Unit: kg active substance or product/kg harvested seed crop
  - Basis: broad first-pass fungicide active substance or formulated product per kg harvested seed crop
  - Basis kind: Process output (`process_output`)
  - Evidence kind: Reasoned estimate (`reasoned_estimate`)

###### Crop protection insecticide proxy (`crop_protection_insecticide_proxy`)

Crop protection insecticide proxy is recorded as an input product flow. Amount rule: measured active ingredient or formulated product mass; normalization basis: per active ingredient or formulated product.

- Selected flow: Insecticide `ba2ec0c8-d5da-4ca8-bf9f-317478a1ce1b`
- Flow property / unit: Mass / kg
- Amount rule: measured active ingredient or formulated product mass
- Value mode: Foreground record (`foreground_record`)
- Specificity: Product-specific (`product_specific`)
- Normalization basis: per active ingredient or formulated product
- Basis kind: Process output (`process_output`)
- Evidence kind: Collected record (`collected_record`)
- Collection protocol: `cp_crop_protection_records`
- Range: Provisional insecticide screening estimate
  - Range role: Default estimate (`default_estimate`)
  - Lower: 0
  - Upper: 0.01
  - Unit: kg active substance or product/kg harvested seed crop
  - Basis: broad first-pass insecticide active substance or formulated product per kg harvested seed crop
  - Basis kind: Process output (`process_output`)
  - Evidence kind: Reasoned estimate (`reasoned_estimate`)

##### Waste flows

No waste input is normally required for the field multiplication process. Include reused organic amendments or recovered irrigation water only when they cross the process boundary as waste-derived inputs.

##### Elementary flows

###### Land occupation (`land_occupation`)

Land occupation is recorded as an input elementary flow. Amount rule: measured field area and crop duration; normalization basis: per crop cycle.

- Selected flow: Select applicable elementary flow for land occupation
- Flow property / unit: Area-time / ha a
- Amount rule: measured field area and crop duration
- Value mode: Foreground record (`foreground_record`)
- Specificity: Site-specific (`site_specific`)
- Normalization basis: per crop cycle
- Basis kind: Crop cycle (`crop_cycle`)
- Evidence kind: Collected record (`collected_record`)
- Collection protocol: `cp_land_use_records`

###### Water withdrawal (`water_withdrawal`)

Water withdrawal is recorded as an input elementary flow. Amount rule: calculated from irrigation water record; normalization basis: per 1,000 kg harvested seed crop.

- Selected flow: water `419682fe-60fb-4b43-be89-bf2824b51104`
- Flow property / unit: Mass / kg
- Amount rule: calculated from irrigation water record
- Value mode: Calculated value (`calculated_value`)
- Specificity: Generic (`generic`)
- Normalization basis: per 1,000 kg harvested seed crop
- Basis kind: Process output (`process_output`)
- Evidence kind: Calculated from collection (`calculated_from_collection`)
- Collection protocol: `cp_irrigation_water_records`
- Range: Provisional water withdrawal screening estimate
  - Range role: Default estimate (`default_estimate`)
  - Lower: 0
  - Upper: 5
  - Unit: m3/kg harvested seed crop
  - Basis: broad first-pass water withdrawal per kg harvested seed crop
  - Basis kind: Process output (`process_output`)
  - Evidence kind: Reasoned estimate (`reasoned_estimate`)

#### Outputs

##### Product flows

###### Harvested wheat seed crop (`harvested_wheat_seed_crop`)

Harvested wheat seed crop is recorded as an output product flow. Amount rule: measured harvested mass; normalization basis: field subprocess quantitative reference.

- Selected flow: Wheat `12da5e7d-9b93-4404-8c7d-08f98bec6238`
- Flow property / unit: Mass / kg
- Amount rule: measured harvested mass
- Value mode: Foreground record (`foreground_record`)
- Specificity: Site-specific (`site_specific`)
- Normalization basis: field subprocess quantitative reference
- Basis kind: Process output (`process_output`)
- Evidence kind: Collected record (`collected_record`)
- Collection protocol: `cp_harvested_seed_mass`
- Range: Harvested seed output identity
  - Range role: QA guardrail (`qa_guardrail`)
  - Lower: 1
  - Upper: 1
  - Unit: kg/kg field process reference output
  - Basis: field subprocess quantitative reference output
  - Basis kind: Process output (`process_output`)
  - Evidence kind: Method formula (`method_formula`)
  - Sources: `mass-balance-identity`

###### Straw or field residue (`straw_or_field_residue`)

Straw or field residue is recorded as an output product flow. Amount rule: measured residue mass when it crosses the boundary; normalization basis: per 1,000 kg harvested seed crop.

- Selected flow: Wheat straw `bcaf0254-cdd3-43d1-823a-2f69df3801d8`
- Flow property / unit: Mass / kg
- Amount rule: measured residue mass when it crosses the boundary
- Value mode: Foreground record (`foreground_record`)
- Specificity: Site-specific (`site_specific`)
- Normalization basis: per 1,000 kg harvested seed crop
- Basis kind: Process output (`process_output`)
- Evidence kind: Collected record (`collected_record`)
- Collection protocol: `cp_field_residue_records`
- Range: Provisional straw or residue screening estimate
  - Range role: Default estimate (`default_estimate`)
  - Lower: 0
  - Upper: 2
  - Unit: kg/kg harvested seed crop
  - Basis: broad first-pass straw or field residue leaving the boundary per kg harvested seed crop
  - Basis kind: Process output (`process_output`)
  - Evidence kind: Reasoned estimate (`reasoned_estimate`)

##### Waste flows

Declare any field waste sent to treatment separately when it leaves the field boundary.

##### Elementary flows

###### Direct soil N2O emission to air (`direct_soil_n2o_emission_to_air`)

Direct soil N2O emission to air is recorded as an output elementary flow. Amount rule: calculate from N inputs; IPCC EF1 default is 1 percent of applied N as N2O-N; normalization basis: per N input.

- Selected flow: nitrous oxide, emissions to air unspecified `08a91e70-3ddc-11dd-94c3-0050c2490048`
- Flow property / unit: Mass / kg
- Amount rule: calculate from N inputs; IPCC EF1 default is 1 percent of applied N as N2O-N
- Value mode: Calculated value (`calculated_value`)
- Specificity: Generic (`generic`)
- Normalization basis: per N input
- Basis kind: Nitrogen input (`n_input`)
- Evidence kind: Method formula (`method_formula`)
- Sources: `ipcc-2019-managed-soils-n2o`
- Range: Provisional direct soil N2O screening estimate
  - Range role: Default estimate (`default_estimate`)
  - Lower: 0
  - Upper: 0.02
  - Unit: kg N2O/kg harvested seed crop
  - Basis: broad first-pass direct soil N2O per kg harvested seed crop after applying nitrogen emission methods
  - Basis kind: Process output (`process_output`)
  - Evidence kind: Reasoned estimate (`reasoned_estimate`)

###### Ammonia volatilization to air (`ammonia_volatilization_to_air`)

Ammonia volatilization to air is recorded as an output elementary flow. Amount rule: site-specific or regional emission method; normalization basis: per N input.

- Selected flow: ammonia, emissions to air unspecified `08a91e70-3ddc-11dd-a2a9-0050c2490048`
- Flow property / unit: Mass / kg
- Amount rule: site-specific or regional emission method
- Value mode: Foreground record (`foreground_record`)
- Specificity: Site-specific (`site_specific`)
- Normalization basis: per N input
- Basis kind: Nitrogen input (`n_input`)
- Evidence kind: Method formula (`method_formula`)
- Sources: `ipcc-2019-managed-soils-n2o`
- Range: Provisional ammonia volatilization screening estimate
  - Range role: Default estimate (`default_estimate`)
  - Lower: 0
  - Upper: 0.1
  - Unit: kg NH3/kg harvested seed crop
  - Basis: broad first-pass ammonia volatilization per kg harvested seed crop after applying nitrogen emission methods
  - Basis kind: Process output (`process_output`)
  - Evidence kind: Reasoned estimate (`reasoned_estimate`)

###### Nitrate leaching to water (`nitrate_leaching_to_water`)

Nitrate leaching to water is recorded as an output elementary flow. Amount rule: site-specific or regional emission method; normalization basis: per N input.

- Selected flow: nitrate, emissions to fresh water `4d9a8790-3ddd-11dd-8d68-0050c2490048`
- Flow property / unit: Mass / kg
- Amount rule: site-specific or regional emission method
- Value mode: Foreground record (`foreground_record`)
- Specificity: Site-specific (`site_specific`)
- Normalization basis: per N input
- Basis kind: Nitrogen input (`n_input`)
- Evidence kind: Method formula (`method_formula`)
- Sources: `ipcc-2019-managed-soils-n2o`
- Range: Provisional nitrate leaching screening estimate
  - Range role: Default estimate (`default_estimate`)
  - Lower: 0
  - Upper: 0.5
  - Unit: kg nitrate/kg harvested seed crop
  - Basis: broad first-pass nitrate leaching per kg harvested seed crop after applying nitrogen leaching methods
  - Basis kind: Process output (`process_output`)
  - Evidence kind: Reasoned estimate (`reasoned_estimate`)

###### Fossil carbon dioxide from field energy (`fossil_carbon_dioxide_from_field_energy`)

Fossil carbon dioxide from field energy is recorded as an output elementary flow. Amount rule: calculated from field fuel records and emission factor; normalization basis: per fuel inventory.

- Selected flow: carbon dioxide (fossil), emissions to air unspecified `08a91e70-3ddc-11dd-923d-0050c2490048`
- Flow property / unit: Mass / kg
- Amount rule: calculated from field fuel records and emission factor
- Value mode: Calculated value (`calculated_value`)
- Specificity: Generic (`generic`)
- Normalization basis: per fuel inventory
- Basis kind: Fuel inventory (`fuel_inventory`)
- Evidence kind: Calculated from collection (`calculated_from_collection`)
- Collection protocol: `cp_field_fuel_records`
- Range: Provisional field energy fossil CO2 screening estimate
  - Range role: Default estimate (`default_estimate`)
  - Lower: 0
  - Upper: 2
  - Unit: kg CO2/kg harvested seed crop
  - Basis: broad first-pass fossil carbon dioxide from field fuel and energy per kg harvested seed crop
  - Basis kind: Fuel inventory (`fuel_inventory`)
  - Evidence kind: Reasoned estimate (`reasoned_estimate`)

### Process: Seed Conditioning and Treatment (`seed_conditioning_and_treatment`)

#### Inputs

##### Product flows

###### Harvested seed crop input (`harvested_seed_crop_input`)

Harvested seed crop input is recorded as an input product flow. Amount rule: 1,000-1,250 kg; normalization basis: per 1,000 kg cleaned seed output.

- Selected flow: Wheat `12da5e7d-9b93-4404-8c7d-08f98bec6238`
- Flow property / unit: Mass / kg
- Amount rule: 1,000-1,250 kg
- Value mode: Modelled estimate (`modelled_estimate`)
- Specificity: Generic (`generic`)
- Normalization basis: per 1,000 kg cleaned seed output
- Basis kind: Process output (`process_output`)
- Evidence kind: External source (`external_source`)
- Sources: `usda-seed-cleaning-handling`
- Range: Seed cleaning input yield range
  - Range role: Default estimate (`default_estimate`)
  - Lower: 1
  - Upper: 1.25
  - Unit: kg harvested seed crop/kg cleaned seed output
  - Basis: harvested seed crop input required per kg cleaned seed output
  - Basis kind: Process output (`process_output`)
  - Evidence kind: External source (`external_source`)
  - Sources: `usda-seed-cleaning-handling`

###### Electricity for drying, cleaning, grading, treatment, and packaging (`electricity_for_drying_cleaning_grading_treatment_and_packaging`)

Electricity for drying, cleaning, grading, treatment, and packaging is recorded as an input product flow. Amount rule: measured electricity use; normalization basis: per 1,000 kg cleaned seed output.

- Selected flow: alternating current `4d0361a3-56cc-45f9-aa42-bb9103285bf9`
- Flow property / unit: Net calorific value / MJ or kWh
- Amount rule: measured electricity use
- Value mode: Foreground record (`foreground_record`)
- Specificity: Site-specific (`site_specific`)
- Normalization basis: per 1,000 kg cleaned seed output
- Basis kind: Process output (`process_output`)
- Evidence kind: Collected record (`collected_record`)
- Collection protocol: `cp_conditioning_energy_records`
- Sources: `usda-seed-cleaning-handling`
- Range: Provisional conditioning electricity screening estimate
  - Range role: Default estimate (`default_estimate`)
  - Lower: 0
  - Upper: 5
  - Unit: kWh/kg cleaned seed output
  - Basis: broad first-pass electricity for drying, cleaning, grading, treatment, and packaging per kg cleaned seed output
  - Basis kind: Process output (`process_output`)
  - Evidence kind: Reasoned estimate (`reasoned_estimate`)

###### Seed treatment fungicide proxy (`seed_treatment_fungicide_proxy`)

Seed treatment fungicide proxy is recorded as an input product flow. Amount rule: measured active ingredient or formulated product mass; normalization basis: per kg treated seed.

- Selected flow: Azoxystrobin `8a1f4968-6428-413f-a50b-b413bf9190cf`
- Flow property / unit: Mass / kg
- Amount rule: measured active ingredient or formulated product mass
- Value mode: Foreground record (`foreground_record`)
- Specificity: Product-specific (`product_specific`)
- Normalization basis: per kg treated seed
- Basis kind: Process output (`process_output`)
- Evidence kind: Collected record (`collected_record`)
- Collection protocol: `cp_seed_treatment_records`
- Range: Provisional seed treatment fungicide screening estimate
  - Range role: Default estimate (`default_estimate`)
  - Lower: 0
  - Upper: 0.01
  - Unit: kg active substance or product/kg cleaned seed output
  - Basis: broad first-pass seed treatment fungicide per kg cleaned seed output
  - Basis kind: Process output (`process_output`)
  - Evidence kind: Reasoned estimate (`reasoned_estimate`)

###### Seed treatment insecticide proxy (`seed_treatment_insecticide_proxy`)

Seed treatment insecticide proxy is recorded as an input product flow. Amount rule: measured active ingredient or formulated product mass; normalization basis: per kg treated seed.

- Selected flow: Insecticide `ba2ec0c8-d5da-4ca8-bf9f-317478a1ce1b`
- Flow property / unit: Mass / kg
- Amount rule: measured active ingredient or formulated product mass
- Value mode: Foreground record (`foreground_record`)
- Specificity: Product-specific (`product_specific`)
- Normalization basis: per kg treated seed
- Basis kind: Process output (`process_output`)
- Evidence kind: Collected record (`collected_record`)
- Collection protocol: `cp_seed_treatment_records`
- Range: Provisional seed treatment insecticide screening estimate
  - Range role: Default estimate (`default_estimate`)
  - Lower: 0
  - Upper: 0.01
  - Unit: kg active substance or product/kg cleaned seed output
  - Basis: broad first-pass seed treatment insecticide per kg cleaned seed output
  - Basis kind: Process output (`process_output`)
  - Evidence kind: Reasoned estimate (`reasoned_estimate`)

###### Packaging unit (`packaging_unit`)

Packaging unit is recorded as an input product flow. Amount rule: measured bag count and capacity; normalization basis: per 1,000 kg packaged seed.

- Selected flow: Woven polypropylene bag `9bfaad07-355e-467a-9bab-f95094e7c869`
- Flow property / unit: Number of items / item
- Amount rule: measured bag count and capacity
- Value mode: Foreground record (`foreground_record`)
- Specificity: Site-specific (`site_specific`)
- Normalization basis: per 1,000 kg packaged seed
- Basis kind: Process output (`process_output`)
- Evidence kind: Collected record (`collected_record`)
- Collection protocol: `cp_packaging_input_records`
- Range: Provisional packaging unit screening estimate
  - Range role: Default estimate (`default_estimate`)
  - Lower: 0
  - Upper: 0.5
  - Unit: kg packaging/kg packaged seed
  - Basis: broad first-pass packaging material equivalent per kg packaged seed
  - Basis kind: Process output (`process_output`)
  - Evidence kind: Reasoned estimate (`reasoned_estimate`)

##### Waste flows

No waste input is normally required for seed conditioning. Include reused packaging or recovered materials only when they cross the process boundary as waste-derived inputs.

##### Elementary flows

Include direct dust emissions, water use, and combustion emissions when plant records show direct emissions or direct resource use at the conditioning facility.

#### Outputs

##### Product flows

###### Cleaned wheat seed for sowing (`cleaned_wheat_seed_for_sowing`)

Cleaned wheat seed for sowing is recorded as an output product flow. Amount rule: measured cleaned seed mass; normalization basis: PCR reference output.

- Selected flow: Wheat `12da5e7d-9b93-4404-8c7d-08f98bec6238`
- Flow property / unit: Mass / kg
- Amount rule: measured cleaned seed mass
- Value mode: Foreground record (`foreground_record`)
- Specificity: Site-specific (`site_specific`)
- Normalization basis: PCR reference output
- Basis kind: Reference flow (`reference_flow`)
- Evidence kind: Collected record (`collected_record`)
- Collection protocol: `cp_cleaned_seed_mass`
- Range: Cleaned seed reference output identity
  - Range role: QA guardrail (`qa_guardrail`)
  - Lower: 1
  - Upper: 1
  - Unit: kg/kg PCR reference output
  - Basis: cleaned wheat seed reference output
  - Basis kind: Reference flow (`reference_flow`)
  - Evidence kind: Method formula (`method_formula`)
  - Sources: `mass-balance-identity`

###### Marketable straw or residue owned by seed plant (`marketable_straw_or_residue_owned_by_seed_plant`)

Marketable straw or residue owned by seed plant is recorded as an output product flow. Amount rule: optional; normalization basis: only if included in seed plant boundary.

- Selected flow: Wheat straw `bcaf0254-cdd3-43d1-823a-2f69df3801d8`
- Flow property / unit: Mass / kg
- Amount rule: optional
- Value mode: Not applicable (`not_applicable`)
- Specificity: Not applicable (`not_applicable`)
- Normalization basis: only if included in seed plant boundary
- Basis kind: Process output (`process_output`)
- Evidence kind: Source rule (`source_rule`)

##### Waste flows

###### Screenings, rejected seed, dust, and off-grade material (`screenings_rejected_seed_dust_and_off_grade_material`)

Screenings, rejected seed, dust, and off-grade material is recorded as an output waste flow. Amount rule: measured reject mass; normalization basis: per 1,000 kg cleaned seed output.

- Selected flow: Rejects `e6d6aa78-105e-4acc-a84b-46f68765a1cc`
- Flow property / unit: Mass / kg
- Amount rule: measured reject mass
- Value mode: Foreground record (`foreground_record`)
- Specificity: Site-specific (`site_specific`)
- Normalization basis: per 1,000 kg cleaned seed output
- Basis kind: Process output (`process_output`)
- Evidence kind: Collected record (`collected_record`)
- Collection protocol: `cp_reject_mass`
- Sources: `usda-seed-cleaning-handling`
- Range: Provisional conditioning reject screening estimate
  - Range role: Default estimate (`default_estimate`)
  - Lower: 0
  - Upper: 1
  - Unit: kg/kg cleaned seed output
  - Basis: broad first-pass screenings, rejected seed, dust, and off-grade material per kg cleaned seed output
  - Basis kind: Process output (`process_output`)
  - Evidence kind: Reasoned estimate (`reasoned_estimate`)

###### Packaging waste (`packaging_waste`)

Packaging waste is recorded as an output waste flow. Amount rule: measured packaging waste mass; normalization basis: per 1,000 kg packaged seed.

- Selected flow: Select applicable packaging waste flow
- Flow property / unit: Mass / kg
- Amount rule: measured packaging waste mass
- Value mode: Foreground record (`foreground_record`)
- Specificity: Site-specific (`site_specific`)
- Normalization basis: per 1,000 kg packaged seed
- Basis kind: Process output (`process_output`)
- Evidence kind: Collected record (`collected_record`)
- Collection protocol: `cp_packaging_waste_records`
- Range: Provisional packaging waste screening estimate
  - Range role: Default estimate (`default_estimate`)
  - Lower: 0
  - Upper: 0.2
  - Unit: kg/kg packaged seed
  - Basis: broad first-pass packaging waste per kg packaged seed
  - Basis kind: Process output (`process_output`)
  - Evidence kind: Reasoned estimate (`reasoned_estimate`)

##### Elementary flows

###### Cleaning dust emitted to air (`cleaning_dust_emitted_to_air`)

Cleaning dust emitted to air is recorded as an output elementary flow. Amount rule: measured or calculated cleaning dust mass; normalization basis: per 1,000 kg cleaned seed output.

- Selected flow: Select applicable particulate flow
- Flow property / unit: Mass / kg
- Amount rule: measured or calculated cleaning dust mass
- Value mode: Foreground record (`foreground_record`)
- Specificity: Site-specific (`site_specific`)
- Normalization basis: per 1,000 kg cleaned seed output
- Basis kind: Process output (`process_output`)
- Evidence kind: Collected record (`collected_record`)
- Collection protocol: `cp_cleaning_dust_records`
- Sources: `usda-seed-cleaning-handling`
- Range: Provisional cleaning dust screening estimate
  - Range role: Default estimate (`default_estimate`)
  - Lower: 0
  - Upper: 0.1
  - Unit: kg dust/kg cleaned seed output
  - Basis: broad first-pass cleaning dust emitted or collected per kg cleaned seed output
  - Basis kind: Process output (`process_output`)
  - Evidence kind: Reasoned estimate (`reasoned_estimate`)

###### Fossil carbon dioxide from conditioning energy (`fossil_carbon_dioxide_from_conditioning_energy`)

Fossil carbon dioxide from conditioning energy is recorded as an output elementary flow. Amount rule: calculated from conditioning energy records and emission factor; normalization basis: per process inventory.

- Selected flow: carbon dioxide (fossil), emissions to air unspecified `08a91e70-3ddc-11dd-923d-0050c2490048`
- Flow property / unit: Mass / kg
- Amount rule: calculated from conditioning energy records and emission factor
- Value mode: Calculated value (`calculated_value`)
- Specificity: Generic (`generic`)
- Normalization basis: per process inventory
- Basis kind: Fuel inventory (`fuel_inventory`)
- Evidence kind: Calculated from collection (`calculated_from_collection`)
- Collection protocol: `cp_conditioning_energy_records`
- Range: Provisional conditioning energy fossil CO2 screening estimate
  - Range role: Default estimate (`default_estimate`)
  - Lower: 0
  - Upper: 5
  - Unit: kg CO2/kg cleaned seed output
  - Basis: broad first-pass fossil carbon dioxide from conditioning energy per kg cleaned seed output
  - Basis kind: Fuel inventory (`fuel_inventory`)
  - Evidence kind: Reasoned estimate (`reasoned_estimate`)

### Process: Storage and Delivery (`storage_and_delivery`)

#### Inputs

##### Product flows

###### Storage electricity (`storage_electricity`)

Storage electricity is recorded as an input product flow. Amount rule: measured storage electricity use; normalization basis: per storage duration.

- Selected flow: alternating current `4d0361a3-56cc-45f9-aa42-bb9103285bf9`
- Flow property / unit: Net calorific value / MJ or kWh
- Amount rule: measured storage electricity use
- Value mode: Foreground record (`foreground_record`)
- Specificity: Site-specific (`site_specific`)
- Normalization basis: per storage duration
- Basis kind: Storage duration (`storage_duration`)
- Evidence kind: Collected record (`collected_record`)
- Collection protocol: `cp_storage_energy_records`
- Range: Provisional storage electricity screening estimate
  - Range role: Default estimate (`default_estimate`)
  - Lower: 0
  - Upper: 1
  - Unit: kWh/kg delivered seed
  - Basis: broad first-pass storage electricity per kg delivered seed over the declared storage duration
  - Basis kind: Storage duration (`storage_duration`)
  - Evidence kind: Reasoned estimate (`reasoned_estimate`)

###### Delivery transport fuel (`delivery_transport_fuel`)

Delivery transport fuel is recorded as an input product flow. Amount rule: measured delivery fuel or route fuel estimate; normalization basis: per tonne-km.

- Selected flow: Diesel oil `9d258d75-6792-4f1c-9856-81602ed8f816`
- Flow property / unit: Mass / kg
- Amount rule: measured delivery fuel or route fuel estimate
- Value mode: Modelled estimate (`modelled_estimate`)
- Specificity: Route-specific (`route_specific`)
- Normalization basis: per tonne-km
- Basis kind: Transport service (`transport_service`)
- Evidence kind: Collected record (`collected_record`)
- Collection protocol: `cp_delivery_transport_records`
- Range: Provisional delivery fuel screening estimate
  - Range role: Default estimate (`default_estimate`)
  - Lower: 0
  - Upper: 0.5
  - Unit: L diesel-equivalent/kg delivered seed
  - Basis: broad first-pass delivery transport fuel per kg delivered seed for route-screening
  - Basis kind: Transport service (`transport_service`)
  - Evidence kind: Reasoned estimate (`reasoned_estimate`)

##### Waste flows

No waste input is normally required.

##### Elementary flows

Include direct storage emissions only when measured or required by the study goal.

#### Outputs

##### Product flows

###### Declared delivered product (`declared_delivered_product`)

Declared delivered product is recorded as an output product flow. Amount rule: measured delivered seed mass; normalization basis: if reference flow is delivered seed.

- Selected flow: Wheat `12da5e7d-9b93-4404-8c7d-08f98bec6238`
- Flow property / unit: Mass / kg
- Amount rule: measured delivered seed mass
- Value mode: Foreground record (`foreground_record`)
- Specificity: Site-specific (`site_specific`)
- Normalization basis: if reference flow is delivered seed
- Basis kind: Reference flow (`reference_flow`)
- Evidence kind: Collected record (`collected_record`)
- Collection protocol: `cp_delivered_seed_mass`

##### Waste flows

###### Storage loss or damaged seed (`storage_loss_or_damaged_seed`)

Storage loss or damaged seed is recorded as an output waste flow. Amount rule: measured storage loss or damaged seed mass; normalization basis: per 1,000 kg stored seed.

- Selected flow: Rejects `e6d6aa78-105e-4acc-a84b-46f68765a1cc`
- Flow property / unit: Mass / kg
- Amount rule: measured storage loss or damaged seed mass
- Value mode: Foreground record (`foreground_record`)
- Specificity: Site-specific (`site_specific`)
- Normalization basis: per 1,000 kg stored seed
- Basis kind: Process output (`process_output`)
- Evidence kind: Collected record (`collected_record`)
- Collection protocol: `cp_storage_loss_records`
- Range: Provisional storage loss screening estimate
  - Range role: Default estimate (`default_estimate`)
  - Lower: 0
  - Upper: 0.2
  - Unit: kg/kg stored seed
  - Basis: broad first-pass storage loss or damaged seed per kg stored seed
  - Basis kind: Process output (`process_output`)
  - Evidence kind: Reasoned estimate (`reasoned_estimate`)

##### Elementary flows

###### Fossil carbon dioxide from storage or transport energy (`fossil_carbon_dioxide_from_storage_or_transport_energy`)

Fossil carbon dioxide from storage or transport energy is recorded as an output elementary flow. Amount rule: calculated from storage energy and delivery transport records; normalization basis: per process inventory.

- Selected flow: carbon dioxide (fossil), emissions to air unspecified `08a91e70-3ddc-11dd-923d-0050c2490048`
- Flow property / unit: Mass / kg
- Amount rule: calculated from storage energy and delivery transport records
- Value mode: Calculated value (`calculated_value`)
- Specificity: Generic (`generic`)
- Normalization basis: per process inventory
- Basis kind: Fuel inventory (`fuel_inventory`)
- Evidence kind: Calculated from collection (`calculated_from_collection`)
- Collection protocol: `cp_delivery_transport_records`
- Range: Provisional storage and transport fossil CO2 screening estimate
  - Range role: Default estimate (`default_estimate`)
  - Lower: 0
  - Upper: 2
  - Unit: kg CO2/kg delivered seed
  - Basis: broad first-pass fossil carbon dioxide from storage and delivery energy per kg delivered seed
  - Basis kind: Fuel inventory (`fuel_inventory`)
  - Evidence kind: Reasoned estimate (`reasoned_estimate`)

## 7. Allocation and Co-product Handling

Apply allocation decisions in this order:

1. Avoid allocation by subdividing seed production, screenings, straw management, and reject handling processes.
2. Use substitution only when the displaced product and market are supported by evidence.
3. Use economic allocation when seed, screenings, and straw are all marketable products and price data are reliable.
4. Use mass allocation only as a fallback and disclose the sensitivity.

Rejected seed, screenings, straw, and packaging waste must have declared fates, such as product output, waste treatment, field return, incorporation, feed use, open burning, or another evidenced route.

## 8. Foreground Data Collection, Calculation, and Quality Rules

### Data Collection Protocols

| protocol_id | process_id | flow_role | record_type | raw_fields | collection_method | unit | frequency | temporal_coverage | site_scope | aggregation_rule | quality_evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| cp_source_seed_lot_mass | field_seed_multiplication | Source seed lot used for multiplication | seed lot receiving record | lot id; supplier or source field; propagation class; mass; moisture basis; seed class | weighbridge, calibrated scale, or supplier primary activity record | kg | per seed lot | crop cycle | seed multiplication site | sum seed lot mass and normalize to harvested seed output | scale calibration, receiving record, and seed lot certificate |
| cp_harvested_seed_mass | field_seed_multiplication | Harvested wheat seed crop | harvest and field receiving record | field id; harvest date; harvested mass; moisture basis | weighbridge or calibrated scale | kg | per harvest event | crop cycle | seed multiplication site | sum harvested mass at declared moisture basis | scale calibration and harvest record |
| cp_fertilizer_input_records | field_seed_multiplication | fertilizer inputs | input application record | product name; nutrient content; product mass; application date; field id | farm operation log, invoice, or applicator record | kg product and kg nutrient | per application | crop cycle | seed multiplication site | sum product and nutrient mass and normalize to harvested seed output | invoice, field log, applicator record |
| cp_irrigation_water_records | field_seed_multiplication | irrigation water | irrigation record | water source; volume or mass; pumping period; field id | meter reading, pumping log, or water invoice | kg or m3 converted to kg | per irrigation event | crop cycle | irrigated seed multiplication field | sum irrigation water and convert to mass where needed | meter record, pumping log, or water invoice |
| cp_field_fuel_records | field_seed_multiplication | field machinery fuel | field operation fuel record | operation; machine; fuel type; fuel quantity; field id | fuel log, invoice, or machine telematics | kg or L converted to kg | per field operation | crop cycle | seed multiplication site | sum fuel by operation and normalize to harvested seed output | fuel log, invoice, or telematics record |
| cp_crop_protection_records | field_seed_multiplication | crop protection products | crop protection application record | product name; active ingredient; formulated product mass; application date; field id | farm spray log or applicator record | kg active ingredient or kg product | per application | crop cycle | seed multiplication site | sum active ingredient or product mass and normalize to harvested seed output | spray log, product label, or applicator record |
| cp_land_use_records | field_seed_multiplication | land occupation | field area record | field id; planted area; crop duration | farm field record or GIS area record | ha and crop duration | per crop cycle | crop cycle | seed multiplication site | multiply area by crop duration where area-time is required | field map, GIS record, or farm record |
| cp_field_residue_records | field_seed_multiplication | straw or field residue | residue handling record | field id; residue stream; mass; fate | baling ticket, scale record, or field residue management log | kg | per residue handling event | crop cycle | seed multiplication site | sum residue mass crossing the boundary and declare fate | scale record, baling ticket, or field log |
| cp_cleaned_seed_mass | seed_conditioning_and_treatment | Cleaned wheat seed for sowing | conditioning output record | batch id; cleaned seed mass; moisture basis; physical purity; germination rate | calibrated scale plus quality test record | kg | per cleaned seed batch | conditioning campaign | seed conditioning facility | sum accepted cleaned seed batches at declared moisture basis | scale calibration and seed quality test |
| cp_reject_mass | seed_conditioning_and_treatment | Screenings, rejected seed, dust, and off-grade material | conditioning reject record | batch id; reject stream; mass; fate | calibrated scale or container mass balance | kg | per conditioning batch | conditioning campaign | seed conditioning facility | sum reject streams and declare fate | scale record, reject log, and fate record |
| cp_conditioning_energy_records | seed_conditioning_and_treatment | conditioning energy | facility energy record | meter id; energy type; quantity; period; process line | meter reading, utility bill, or equipment log | kWh, MJ, or fuel kg | per conditioning campaign | conditioning campaign | seed conditioning facility | allocate and normalize energy to cleaned seed output | meter record, utility bill, or equipment log |
| cp_seed_treatment_records | seed_conditioning_and_treatment | seed treatment chemicals | seed treatment application record | treatment product; active ingredient; dose; treated seed mass; batch id | treatment log or supplier treatment certificate | kg active ingredient or kg product | per treated batch | conditioning campaign | seed conditioning facility | sum treatment chemical mass and normalize to treated seed mass | treatment log, product label, or supplier certificate |
| cp_packaging_input_records | seed_conditioning_and_treatment | packaging units | packaging use record | packaging type; item count; capacity; mass when available; batch id | packaging inventory issue record or packing line log | item and kg where available | per packaged batch | conditioning campaign | seed conditioning facility | sum packaging items and convert to mass when required | packing log or packaging inventory record |
| cp_packaging_waste_records | seed_conditioning_and_treatment | packaging waste | packaging waste record | waste type; mass; fate; batch or period | scale record or waste contractor record | kg | per waste shipment or campaign | conditioning campaign | seed conditioning facility | sum packaging waste by fate | scale ticket or waste contractor record |
| cp_cleaning_dust_records | seed_conditioning_and_treatment | cleaning dust emitted to air | dust collection or emission record | dust collector mass; emission estimate; operating period | dust collector log, maintenance record, or emission calculation | kg | per campaign or operating period | conditioning campaign | seed conditioning facility | sum collected or emitted dust and normalize to cleaned seed output | dust collector log or emission calculation |
| cp_storage_energy_records | storage_and_delivery | storage electricity | storage energy record | meter id; energy quantity; storage period; stored mass | meter reading or utility bill | kWh or MJ | per storage period | declared storage duration | storage site | allocate storage energy by stored mass and duration | meter record or utility bill |
| cp_delivery_transport_records | storage_and_delivery | delivery transport fuel | transport service record | route; distance; vehicle; fuel quantity or tonne-km; delivered mass | fuel log, carrier invoice, or transport dispatch record | kg fuel or tonne-km | per shipment | delivery period | declared delivery route | sum route-specific transport service and normalize to delivered seed | carrier invoice, dispatch record, or fuel log |
| cp_delivered_seed_mass | storage_and_delivery | declared delivered product | delivery or dispatch record | lot id; delivered mass; delivery date; receiver or gate; moisture basis | weighbridge, calibrated scale, or dispatch record | kg | per shipment | delivery period | declared delivery route | sum delivered seed mass at declared moisture basis | dispatch record, scale ticket, or delivery note |
| cp_storage_loss_records | storage_and_delivery | storage loss or damaged seed | storage loss record | lot id; loss mass; damage category; fate | inventory reconciliation, scale record, or disposal record | kg | per storage period or lot | declared storage duration | storage site | sum storage loss and declare fate | inventory reconciliation, scale record, or disposal record |

### Calculation Rules

| rule_id | Applies to | Formula or rule | Inputs | Output | source_ids |
| --- | --- | --- | --- | --- | --- |
| normalize_source_seed_lot_input | source seed lot input | source seed lot kg / harvested seed kg * reference output | cp_source_seed_lot_mass; cp_harvested_seed_mass | kg source seed lot per reference output |  |
| normalize_cleaning_yield | seed conditioning yield | cleaned seed kg / harvested seed crop input kg | cp_cleaned_seed_mass; harvested seed crop input record | cleaning yield and reject rate | `usda-seed-cleaning-handling` |
| calculate_water_withdrawal | irrigation water withdrawal | convert metered irrigation volume to mass and normalize to harvested seed output | cp_irrigation_water_records; cp_harvested_seed_mass | kg water withdrawal per reference output |  |
| calculate_field_energy_co2 | field energy fossil CO2 | fuel quantity * declared fuel emission factor, normalized to harvested seed output | cp_field_fuel_records; cp_harvested_seed_mass | kg fossil CO2 from field energy per reference output |  |
| calculate_conditioning_energy_co2 | conditioning energy fossil CO2 | conditioning energy quantity * declared energy emission factor, normalized to cleaned seed output | cp_conditioning_energy_records; cp_cleaned_seed_mass | kg fossil CO2 from conditioning energy per reference output |  |
| calculate_storage_delivery_energy_co2 | storage and delivery fossil CO2 | storage energy and delivery transport energy * declared emission factors, normalized to delivered or stored seed | cp_storage_energy_records; cp_delivery_transport_records | kg fossil CO2 from storage and delivery energy per reference output |  |

### Data Quality Requirements

| requirement_id | Applies to | Requirement | Evidence |
| --- | --- | --- | --- |
| dq_seed_identity | seed lot and cleaned seed identity | Seed class, propagation class, treatment status, moisture basis, physical purity, and germination rate must be declared for the reference flow and source seed lots. | seed certificate, quality test, or receiving record |
| dq_mass_records | mass records | Mass values must identify record date, site or batch, unit, moisture basis where relevant, and measurement device or source record. | calibration record, weighbridge ticket, scale log, or supplier primary activity record |
| dq_temporal_coverage | crop-cycle data | Field production data should cover the declared crop cycle; weather-sensitive comparative work should disclose whether one-year or multi-year average data are used. | crop-year production records |

## 9. Validation Rules

Before publishing a foreground data package using this PCR, check:

- reference flow includes mass, gate, seed treatment status, and seed quality qualifiers
- dataset metadata distinguishes seed product from commodity grain
- field seed multiplication and seed conditioning are separate when data are available
- fertilizer, fuel, irrigation, conditioning energy, packaging, and seed treatment inputs are addressed
- N2O, ammonia, nitrate, fossil CO2, water withdrawal, and land occupation are considered when in scope
- screenings, rejected seed, straw, and packaging waste have declared fates
- allocation method is declared and justified
- values outside typical ranges include a source note and method rationale

## 10. Published Dataset Profile

| Field | Value |
| --- | --- |
| dataset_role | unit_process |
| downstream_use | secondary_dataset; background_dataset |
| allowed_use | downstream wheat seed or wheat cultivation data construction where seed class, treatment status, geography, moisture basis, and declared gate match the dataset metadata |
| excluded_use | commodity wheat grain, seed production outside the declared route, and studies requiring omitted breeding research or capital goods burdens |
| required_metadata | reference flow; geography; crop cycle; seed class; treatment status; moisture basis; physical purity; germination rate; declared gate; collection protocol coverage; DQR |
| required_quality_disclosure | record coverage, calculation rules, measurement devices or primary records, unresolved omissions, and data quality scores |
| update_trigger | material change in production route, geography, seed treatment, conditioning technology, reference flow qualifiers, collection protocol coverage, or data quality score |

## 11. Data Sources

| Source id | Type | Reference | Used for |
| --- | --- | --- | --- |
| `fao-wheat-seed-production` | official guidance | <https://www.fao.org/4/y4011e/y4011e0v.htm> | seed certification, quality control, seed quality attributes, and process boundary |
| `unl-wheat-seeding-rate` | extension guidance | <https://cropwatch.unl.edu/determining-seeding-rate-your-winter-wheat/> | seeding rate and thousand-kernel weight method context |
| `umn-small-grain-seeding-rate` | extension guidance | <https://extension.umn.edu/planting-small-grains/seeding-rate-small-grains> | seeding rate formula, stand loss, and germination method context |
| `usda-seed-cleaning-handling` | official handbook | <https://www.govinfo.gov/content/pkg/GOVPUB-A-PURL-gpo20323/pdf/GOVPUB-A-PURL-gpo20323.pdf> | seed cleaning process decomposition and screenings or reject context |
| `ipcc-2019-managed-soils-n2o` | official method guidance | <https://www.ipcc-nggip.iges.or.jp/public/2019rf/pdf/4_Volume4/19R_V4_Ch11_Soils_N2O_CO2.pdf> | N2O direct emission factor and nitrogen emission calculation |
| `mass-balance-identity` | method_factor | Conservation of mass applied as a PCR calculation identity for process reference outputs and batch reconciliation. | QA guardrails for reference outputs and mass-balance checks. |
