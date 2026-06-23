---
pcr_id: pcr.agriculture-forestry-and-fishery-products.products-of-agriculture-horticulture-and-market-gardening.wheat-seed
language: en-US
status: draft
sync_with: pcr.zh-CN.md
---

# Wheat Seed for Sowing

## 1. Scope and Applicability

This PCR is an example draft for testing the TianGong PCR authoring structure. It can guide human and AI construction of `process` and `lifecyclemodel` records for cleaned wheat seed intended for sowing, including certified, foundation, or comparable seed classes. Numerical ranges are screening priors and require agronomy and LCA review before operational use.

Do not use this PCR for commodity wheat grain for food, feed, starch, ethanol, or trading unless seed-specific operations are outside the system boundary and the product is explicitly reclassified.

## 2. Product Category Identity

- Canonical PCR id: `pcr.agriculture-forestry-and-fishery-products.products-of-agriculture-horticulture-and-market-gardening.wheat-seed`
- External classification entry: CPC 3.0 `01111`, `Wheat, seed`
- Product type: agricultural product
- Typical production route: seed multiplication field plus post-harvest seed conditioning
- Typical market state: cleaned, graded, packaged, and optionally treated wheat seed at seed plant gate or regional delivery point

The PCR identity is independent of CPC. CPC provides a mapping entry; this directory remains the canonical modelling rule.

## 3. Reference Flow

Preferred reference flow:

```text
1 kg wheat seed for sowing, cleaned and graded, at seed plant gate
```

Database-backed flow reference for this draft:

| Role | Tiangong flow | Flow type | UUID | Version | Flow property | Unit group | Preferred unit |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Reference product | Wheat | Product flow | `12da5e7d-9b93-4404-8c7d-08f98bec6238` | `01.01.002` | Mass `93a60a56-a3c8-11da-a746-0800200b9a66` | Units of mass `93a60a57-a4c8-11da-a746-0800200c9a66` | kg |

Required qualifiers:

- seed class or certification class
- treated or untreated status
- moisture basis
- physical purity and germination rate when known
- geography and gate
- packaging state for packaged seed

Avoid seed-count reference flows unless the study goal is agronomic performance. If seed count is used, also provide thousand-kernel weight or another conversion to mass.

## 4. Flow Properties and Unit Conventions

| Flow property | UUID | Version | Unit group | Unit group UUID | Unit group version | Common units | Use |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Mass | `93a60a56-a3c8-11da-a746-0800200b9a66` | `03.00.003` | Units of mass | `93a60a57-a4c8-11da-a746-0800200c9a66` | `03.00.003` | kg, t, g | product, waste, emissions by mass |
| Net calorific value | `93a60a56-a3c8-11da-a746-0800200c9a66` | `03.00.003` | Units of energy | `93a60a57-a3c8-11da-a746-0800200c9a66` | `03.00.003` | MJ, kWh | electricity and energy inputs |
| Number of items | `01846770-4cfe-4a25-8ad9-919d8d378345` | `03.00.004` | Units of items | `5beb6eed-33a9-47b8-9ede-1dfe8f679159` | `03.00.003` | item, dozen | bag count or package count |

Seed quality properties are foreground attributes, not replacement flow properties:

| Attribute | Common unit | Draft screening range | Source ids |
| --- | --- | --- | --- |
| Moisture content | percent wet basis | 10-14 percent | `fao-wheat-seed-production` |
| Physical purity | percent by mass | 95-99.9 percent | `fao-wheat-seed-production` |
| Germination rate | percent of seeds | 85-98 percent | `fao-wheat-seed-production`, `umn-small-grain-seeding-rate` |
| Thousand-kernel weight | g/1000 seeds | 25-60 g | `unl-wheat-seeding-rate`, `umn-small-grain-seeding-rate` |
| Seed treatment loading | g active ingredient/kg seed | 0-10 g/kg | `authoring-prior-wheat-seed` |

## 5. System Boundary

The default boundary is cradle-to-gate for wheat seed production:

1. Upstream production and transport of seed, fertilizer, fuel, electricity, crop protection products, seed treatment chemicals, and packaging.
2. Field seed multiplication: land preparation, sowing, fertilization, irrigation where applicable, crop protection, inspections when material, harvesting, and field drying.
3. Seed conditioning: drying, cleaning, grading, testing, treatment, packaging, and storage.
4. Transport to the declared gate when the reference flow is delivered seed.

Exclude downstream crop production using the seed unless the lifecycle model explicitly studies seed as an input to wheat cultivation. Exclude capital goods by default unless they are material for the goal and scope. Include land occupation and land transformation when required by the impact method or study goal.

## 6. Process Inventory Structure

### Process: Field Seed Multiplication

This process represents the foreground seed crop from previous-generation seed input through harvested seed crop at farm or field edge.

#### Inputs

##### Product flows

| Flow role | Selected flow | Tiangong UUID@version | Flow property / unit | Draft typical range | Range basis | Range sources | Range quality |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Previous-generation wheat seed | Wheat | `12da5e7d-9b93-4404-8c7d-08f98bec6238@01.01.002` | Mass / kg | 25-70 kg | per 1,000 kg harvested seed crop | `tg-process-wheat-cultivation`, `unl-wheat-seeding-rate`, `umn-small-grain-seeding-rate` | draft-prior |
| Nitrogen fertilizer carrier | Urea | `3f8850c0-f718-4c4b-8fcb-8fd42e03aa8e@01.01.001` | Mass / kg | record as kg product and kg N; no fixed PCR limit | per 1,000 kg harvested seed crop | `authoring-prior-wheat-seed`, `ipcc-2019-managed-soils-n2o` | pending-review |
| Phosphate fertilizer | Phosphate fertilizer | `9c196b01-6aad-4252-a6e8-f853853a830c@01.01.002` | Mass / kg | site-specific | per 1,000 kg harvested seed crop | `authoring-prior-wheat-seed` | pending-review |
| Potassium fertilizer | Potassium fertilizer | `dd008d87-16e4-4e85-a048-b9949f6fbca6@01.01.001` | Mass / kg | site-specific | per 1,000 kg harvested seed crop | `authoring-prior-wheat-seed` | pending-review |
| Irrigation water as product input | Irrigation water | `4ad684b1-8e85-4dee-8d9c-55d1fa2d4432@01.01.002` | Mass / kg | 0-5,000 kg | per 1,000 kg harvested seed crop | `tg-process-wheat-cultivation` | observed-row |
| Field machinery fuel | Diesel, burned in agricultural machinery | `57e0b1a3-2d05-46b2-b61b-cf7b5b167c6f@01.01.000` | Mass / kg | 5-40 kg | per 1,000 kg harvested seed crop | `authoring-prior-wheat-seed` | draft-prior |
| Crop protection, herbicide proxy | Herbicide | `c1370404-9e2b-4ed6-ba96-c094f74e0f2d@01.01.001` | Mass / kg | 0-5 kg active ingredient | per 1,000 kg harvested seed crop | `authoring-prior-wheat-seed` | pending-review |
| Crop protection, fungicide proxy | Azoxystrobin | `8a1f4968-6428-413f-a50b-b413bf9190cf@01.01.001` | Mass / kg | 0-5 kg active ingredient | per 1,000 kg harvested seed crop | `authoring-prior-wheat-seed` | pending-review |
| Crop protection, insecticide proxy | Insecticide | `ba2ec0c8-d5da-4ca8-bf9f-317478a1ce1b@01.01.002` | Mass / kg | 0-5 kg active ingredient | per 1,000 kg harvested seed crop | `authoring-prior-wheat-seed` | pending-review |

##### Waste flows

No required waste input is expected for the default field multiplication process. If manure, compost, recycled irrigation water, or waste-derived soil amendment is used, model it explicitly as waste input or product input according to the source dataset and local legal status.

##### Elementary flows

| Flow role | Selected flow | Tiangong UUID@version | Flow property / unit | Draft typical range | Range basis | Range sources | Range quality |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Land occupation | Pending Tiangong flow selection | `pending-db-match` | area-time | site-specific | per crop cycle | `authoring-prior-wheat-seed` | pending-review |
| Water withdrawal | water | `419682fe-60fb-4b43-be89-bf2824b51104@00.00.002` | Mass / kg | align with irrigation water input | per 1,000 kg harvested seed crop | `tg-process-wheat-cultivation` | observed-row |

#### Outputs

##### Product flows

| Flow role | Selected flow | Tiangong UUID@version | Flow property / unit | Draft typical range | Range basis | Range sources | Range quality |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Harvested wheat seed crop | Wheat | `12da5e7d-9b93-4404-8c7d-08f98bec6238@01.01.002` | Mass / kg | 1,000 kg | quantitative reference for field subprocess | `tg-flow-wheat-seed` | observed-row |
| Straw or field residue | Wheat straw | `bcaf0254-cdd3-43d1-823a-2f69df3801d8@01.01.001` | Mass / kg | 0-2,000 kg | per 1,000 kg harvested seed crop | `authoring-prior-wheat-seed` | draft-prior |

##### Waste flows

No default field waste output is required. Crop residues are product, residue returned to field, or waste depending on documented fate.

##### Elementary flows

| Flow role | Selected flow | Tiangong UUID@version | Flow property / unit | Draft typical range | Range basis | Range sources | Range quality |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Direct soil N2O, reported to air | nitrous oxide, emissions to air unspecified | `08a91e70-3ddc-11dd-94c3-0050c2490048@03.00.004` | Mass / kg | calculate from N inputs; IPCC EF1 default is 1 percent of N applied as N2O-N | per N input | `ipcc-2019-managed-soils-n2o` | literature |
| Ammonia volatilization | ammonia, emissions to air unspecified | `08a91e70-3ddc-11dd-a2a9-0050c2490048@03.00.004` | Mass / kg | site-specific | per N input | `authoring-prior-wheat-seed` | pending-review |
| Nitrate leaching | nitrate, emissions to fresh water | `4d9a8790-3ddd-11dd-8d68-0050c2490048@03.00.004` | Mass / kg | site-specific | per N input | `ipcc-2019-managed-soils-n2o` | pending-review |
| Fossil carbon dioxide | carbon dioxide (fossil), emissions to air unspecified | `08a91e70-3ddc-11dd-923d-0050c2490048@03.00.004` | Mass / kg | derived from fuel and energy datasets | per process inventory | `tg-cli-flow-search-2026-06-23` | derived |

### Process: Seed Conditioning, Treatment, and Packaging

This process represents drying when required, cleaning, grading, laboratory testing, optional treatment, packaging, and short-term storage at a seed plant.

#### Inputs

##### Product flows

| Flow role | Selected flow | Tiangong UUID@version | Flow property / unit | Draft typical range | Range basis | Range sources | Range quality |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Harvested seed crop input | Wheat | `12da5e7d-9b93-4404-8c7d-08f98bec6238@01.01.002` | Mass / kg | 1,000-1,250 kg | per 1,000 kg cleaned seed output | `usda-seed-cleaning-handling`, `authoring-prior-wheat-seed` | draft-prior |
| Cleaning and conditioning electricity | alternating current | `4d0361a3-56cc-45f9-aa42-bb9103285bf9@01.01.001` | Net calorific value / MJ or kWh | 18-288 MJ | per 1,000 kg cleaned seed output | `authoring-prior-wheat-seed` | draft-prior |
| Seed treatment fungicide proxy | Azoxystrobin | `8a1f4968-6428-413f-a50b-b413bf9190cf@01.01.001` | Mass / kg | 0-10 g active ingredient/kg seed | per kg treated seed | `authoring-prior-wheat-seed` | pending-review |
| Seed treatment insecticide proxy | Insecticide | `ba2ec0c8-d5da-4ca8-bf9f-317478a1ce1b@01.01.002` | Mass / kg | 0-10 g active ingredient/kg seed | per kg treated seed | `authoring-prior-wheat-seed` | pending-review |
| Packaging unit | Woven polypropylene bag | `9bfaad07-355e-467a-9bab-f95094e7c869@01.01.000` | Number of items / item | 20-50 bags | per 1,000 kg packaged seed, depending on bag size | `tg-cli-flow-search-2026-06-23` | draft-prior |

##### Waste flows

No waste input is expected for the default seed conditioning process.

##### Elementary flows

No required elementary inputs are expected. Water addition for conditioning or dust suppression should be modelled when measured.

#### Outputs

##### Product flows

| Flow role | Selected flow | Tiangong UUID@version | Flow property / unit | Draft typical range | Range basis | Range sources | Range quality |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Cleaned wheat seed for sowing | Wheat | `12da5e7d-9b93-4404-8c7d-08f98bec6238@01.01.002` | Mass / kg | 1,000 kg | PCR reference output | `tg-flow-wheat-seed` | observed-row |
| Marketable straw, if conditioning site owns residue | Wheat straw | `bcaf0254-cdd3-43d1-823a-2f69df3801d8@01.01.001` | Mass / kg | optional | only if included in seed plant boundary | `authoring-prior-wheat-seed` | pending-review |

##### Waste flows

| Flow role | Selected flow | Tiangong UUID@version | Flow property / unit | Draft typical range | Range basis | Range sources | Range quality |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Screenings, rejected seed, dust, and off-grade material | Rejects | `e6d6aa78-105e-4acc-a84b-46f68765a1cc@00.00.004` | Mass / kg | 10-200 kg | per 1,000 kg cleaned seed output | `usda-seed-cleaning-handling`, `tg-cli-flow-search-2026-06-23` | proxy |
| Packaging waste | Pending Tiangong flow selection | `pending-db-match` | Mass / kg | site-specific | per 1,000 kg packaged seed | `authoring-prior-wheat-seed` | pending-review |

##### Elementary flows

| Flow role | Selected flow | Tiangong UUID@version | Flow property / unit | Draft typical range | Range basis | Range sources | Range quality |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Dust to air from cleaning | Pending Tiangong flow selection | `pending-db-match` | Mass / kg | site-specific | per 1,000 kg cleaned seed output | `usda-seed-cleaning-handling` | pending-review |
| Fossil carbon dioxide from conditioning energy | carbon dioxide (fossil), emissions to air unspecified | `08a91e70-3ddc-11dd-923d-0050c2490048@03.00.004` | Mass / kg | derived from energy datasets | per process inventory | `tg-cli-flow-search-2026-06-23` | derived |

### Process: Storage and Gate Delivery

This process is conditional. Include it when the declared reference flow is stored seed or delivered seed.

#### Inputs

##### Product flows

| Flow role | Selected flow | Tiangong UUID@version | Flow property / unit | Draft typical range | Range basis | Range sources | Range quality |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Storage electricity | alternating current | `4d0361a3-56cc-45f9-aa42-bb9103285bf9@01.01.001` | Net calorific value / MJ or kWh | site-specific | per storage duration | `authoring-prior-wheat-seed` | pending-review |
| Delivery fuel | Diesel oil | `9d258d75-6792-4f1c-9856-81602ed8f816@01.01.001` | Mass / kg | route-specific | per tonne-km | `tg-cli-flow-search-2026-06-23` | pending-review |

##### Waste flows

No required waste input is expected.

##### Elementary flows

No required elementary input is expected.

#### Outputs

##### Product flows

| Flow role | Selected flow | Tiangong UUID@version | Flow property / unit | Draft typical range | Range basis | Range sources | Range quality |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Declared gate product | Wheat | `12da5e7d-9b93-4404-8c7d-08f98bec6238@01.01.002` | Mass / kg | 1,000 kg | if reference flow is 1,000 kg delivered seed | `tg-flow-wheat-seed` | observed-row |

##### Waste flows

| Flow role | Selected flow | Tiangong UUID@version | Flow property / unit | Draft typical range | Range basis | Range sources | Range quality |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Storage losses or damaged seed | Rejects | `e6d6aa78-105e-4acc-a84b-46f68765a1cc@00.00.004` | Mass / kg | 0-20 kg | per 1,000 kg stored seed | `authoring-prior-wheat-seed` | draft-prior |

##### Elementary flows

| Flow role | Selected flow | Tiangong UUID@version | Flow property / unit | Draft typical range | Range basis | Range sources | Range quality |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Fossil carbon dioxide from storage or delivery energy | carbon dioxide (fossil), emissions to air unspecified | `08a91e70-3ddc-11dd-923d-0050c2490048@03.00.004` | Mass / kg | derived from fuel and energy datasets | per process inventory | `tg-cli-flow-search-2026-06-23` | derived |

## 7. Allocation and Co-product Handling

Use this decision order:

1. Avoid allocation by subdividing seed production, grain-like screenings, straw management, and reject treatment.
2. Apply substitution only when the displaced product and market are documented.
3. Apply economic allocation when seed, screenings, and straw are marketed products and price data are reliable.
4. Apply mass allocation only as a fallback and flag it for review.

Rejected seed, screenings, straw, and packaging waste must have a declared fate. They can be product output, waste treatment, field return, incorporation, animal feed use, open burning, or another documented route.

## 8. Data Quality and Evidence Rules

Minimum foreground data:

- geography and production year or multi-year average
- seed class and seed lot quality
- field yield and cleaned seed yield
- seed rate and seed multiplication generation
- fertilizer types and application rates
- irrigation status, water source, and pumping energy when irrigated
- field fuel use or operation list
- drying, cleaning, treatment, and packaging energy
- seed treatment active ingredients and loading
- screenings, rejects, straw, and packaging waste fate

Preferred data quality:

- at least three-year average for field yield in weather-sensitive regions
- primary data for seed cleaning yield and reject rate
- region-specific nitrogen and pesticide emission models
- supplier-specific electricity mix when conditioning energy is material
- explicit moisture basis for harvested and cleaned seed

## 9. Validation Rules

Before publishing a process or lifecycle model using this PCR, check:

- reference flow includes mass, gate, seed treatment status, and seed quality qualifiers
- model distinguishes seed product from commodity grain
- field seed multiplication and seed conditioning are separate when data are available
- fertilizer, fuel, irrigation, conditioning energy, packaging, and seed treatment inputs are addressed
- N2O, ammonia, nitrate, fossil CO2, water withdrawal, and land occupation are considered when in scope
- screenings, rejected seed, straw, and packaging waste have declared fates
- allocation method is declared and justified
- values outside draft screening ranges have a source note or review flag

## 10. Data Sources

| Source id | Type | Reference | Used for | Review status |
| --- | --- | --- | --- | --- |
| `tg-flow-wheat-seed` | Tiangong flow row | `12da5e7d-9b93-4404-8c7d-08f98bec6238@01.01.002` | reference flow identity and product flow reuse | selected |
| `tg-cli-flow-search-2026-06-23` | Tiangong CLI search | `search flow` queries for wheat seed, fertilizers, fuel, electricity, packaging, waste proxy, and elementary flows | UUID candidate selection | selected |
| `tg-cli-support-read-2026-06-23` | Tiangong DB support rows | flowproperties `93a60a56-a3c8-11da-a746-0800200b9a66`, `93a60a56-a3c8-11da-a746-0800200c9a66`, `01846770-4cfe-4a25-8ad9-919d8d378345`; unitgroups `93a60a57-a4c8-11da-a746-0800200c9a66`, `93a60a57-a3c8-11da-a746-0800200c9a66`, `5beb6eed-33a9-47b8-9ede-1dfe8f679159` | flow property and unit group UUIDs | selected |
| `tg-process-wheat-cultivation` | Tiangong process row | `d145ea84-0aa6-4fca-a8f8-99ef3684d016@01.01.000`, `Wheat Cultivation` | observed reference for selected field inventory magnitudes, especially water input | comparator only |
| `fao-wheat-seed-production` | official guidance | <https://www.fao.org/4/y4011e/y4011e0v.htm> | seed certification, quality control, and process boundary | background |
| `unl-wheat-seeding-rate` | extension guidance | <https://cropwatch.unl.edu/determining-seeding-rate-your-winter-wheat/> | seeding rate background | background |
| `umn-small-grain-seeding-rate` | extension guidance | <https://extension.umn.edu/planting-small-grains/seeding-rate-small-grains> | seeding rate formula and stand loss background | background |
| `usda-seed-cleaning-handling` | official handbook | <https://www.govinfo.gov/content/pkg/GOVPUB-A-PURL-gpo20323/pdf/GOVPUB-A-PURL-gpo20323.pdf> | seed cleaning process decomposition and reject/screenings context | background |
| `ipcc-2019-managed-soils-n2o` | official method guidance | <https://www.ipcc-nggip.iges.or.jp/public/2019rf/pdf/4_Volume4/19R_V4_Ch11_Soils_N2O_CO2.pdf> | N2O direct emission factor and nitrogen emission modelling | background |
| `authoring-prior-wheat-seed` | reviewer prior | this draft PCR | placeholder ranges that need expert review | pending-review |

## 11. CLI Lookup Trace

| Trace id | Command or lookup | Query intent | Selected references | Notes |
| --- | --- | --- | --- | --- |
| `cli-flow-wheat-seed` | `tiangong-lca search flow --json` | `query=wheat seed`, `flowType=Product flow` | `12da5e7d-9b93-4404-8c7d-08f98bec6238@01.01.002` | selected because classification leaf is `Wheat, seed` |
| `cli-flow-field-inputs` | `tiangong-lca search flow --json` | diesel, electricity, urea, phosphate fertilizer, potassium fertilizer, irrigation water | diesel `57e0b1a3-2d05-46b2-b61b-cf7b5b167c6f`, electricity `4d0361a3-56cc-45f9-aa42-bb9103285bf9`, urea `3f8850c0-f718-4c4b-8fcb-8fd42e03aa8e`, phosphate `9c196b01-6aad-4252-a6e8-f853853a830c`, potassium `dd008d87-16e4-4e85-a048-b9949f6fbca6`, irrigation water `4ad684b1-8e85-4dee-8d9c-55d1fa2d4432` | selected as reusable product flow candidates |
| `cli-flow-crop-protection` | `tiangong-lca search flow --json` | herbicide, fungicide, insecticide, seed treatment | herbicide `c1370404-9e2b-4ed6-ba96-c094f74e0f2d`, azoxystrobin `8a1f4968-6428-413f-a50b-b413bf9190cf`, insecticide `ba2ec0c8-d5da-4ca8-bf9f-317478a1ce1b` | proxies, not crop-specific prescriptions |
| `cli-flow-outputs-waste` | `tiangong-lca search flow --json` | wheat straw and rejected seed/screenings | wheat straw `bcaf0254-cdd3-43d1-823a-2f69df3801d8`; generic rejects `e6d6aa78-105e-4acc-a84b-46f68765a1cc` | rejects is a proxy pending wheat-seed-specific waste flow |
| `cli-flow-elementary` | `tiangong-lca search flow --json` | N2O air, ammonia air, nitrate water, fossil CO2 air, water resource | N2O `08a91e70-3ddc-11dd-94c3-0050c2490048`, ammonia `08a91e70-3ddc-11dd-a2a9-0050c2490048`, nitrate `4d9a8790-3ddd-11dd-8d68-0050c2490048`, fossil CO2 `08a91e70-3ddc-11dd-923d-0050c2490048`, water `419682fe-60fb-4b43-be89-bf2824b51104` | selected by compartment where possible |
| `cli-process-wheat-cultivation` | `tiangong-lca search process --json` then `process get --id d145ea84-0aa6-4fca-a8f8-99ef3684d016 --version 01.01.000 --json` | wheat cultivation comparator | process row `d145ea84-0aa6-4fca-a8f8-99ef3684d016@01.01.000` | used as comparator, not as final wheat-seed process |
| `support-flowproperty-unitgroup` | support row lookup using Tiangong DB runtime | flow property and unit group UUIDs referenced by selected flows | Mass, Net calorific value, Number of items, Units of mass, Units of energy, Units of items | CLI currently exposes flow/process/lifecyclemodel search, so support row lookup is recorded separately |
