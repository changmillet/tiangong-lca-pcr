---
pcr_id: pcr.agriculture-forestry-and-fishery-products.fish-crustaceans-molluscs-and-other-aquatic-invertebrates-products.farmed-abalone-live-fresh-or-chilled
language: en-US
status: candidate
sync_with: pcr.zh-CN.md
---

# Farmed abalone, live, fresh or chilled

## 1. Scope and Applicability

This PCR guides foreground data package construction for farmed abalone (Haliotis spp.) placed on the market as live, fresh, or chilled product. It covers declared seed or juvenile supply, optional on-site hatchery and nursery activity, grow-out in land-based tanks or raceways, suspended or cage systems, or declared sea-ranch grow-out, harvest, grading, live holding, chilling, packaging, and delivery to the declared gate.

Excluded products are wild abalone, frozen, smoked, dried, salted, brined, cooked, canned, otherwise prepared or preserved abalone, abalone seed sold as a separate aquaculture input, generic mollusc products without abalone identity, and shell or meat by-products with a separate non-food reference flow.

## 2. Product Category Identity

| Field | Value |
| --- | --- |
| canonical_pcr_id | `pcr.agriculture-forestry-and-fishery-products.fish-crustaceans-molluscs-and-other-aquatic-invertebrates-products.farmed-abalone-live-fresh-or-chilled` |
| classification_refs | CPC 3.0 `04412`, `Farmed abalone, live, fresh or chilled` |
| covered_products | farmed Haliotis spp. sold live, fresh, or chilled, shell-on or declared shucked form, from aquaculture production systems |
| excluded_products | wild abalone; frozen, smoked, dried, salted, brined, cooked, canned, prepared, or preserved abalone; aquaculture seed sold as seed; shell waste or shell products; non-abalone molluscs |
| representative_product | live or chilled farmed abalone at declared market size and declared product form |
| production_route | hatchery or purchased juvenile input, nursery where relevant, grow-out husbandry, harvest, grading, live holding or chilling, packaging, and declared gate release |
| market_state | live, fresh, or chilled abalone with declared species, product form, culture system, size grade, shell-on or shucked state, and gate |

## 3. Reference Flow

| Field | Value |
| --- | --- |
| What | farmed abalone as live, fresh, or chilled market product |
| How much | 1 kg |
| How well | declared species or hybrid, product form, live/fresh/chilled state, shell-on or shucked basis, size grade, harvest and holding condition, and culture system |
| How long or cycle | one production batch, harvest lot, or reporting period normalized to marketable product output |
| reference_flow_link | Reference amount and product flow below |

| Field | Value |
| --- | --- |
| Reference amount | 1 kg |
| Reference product flow | Abalone `7b973a02-b45b-4f5a-a640-a9b5ae65584b` |
| Reference flow property | Mass `93a60a56-a3c8-11da-a746-0800200b9a66` |
| Reference unit group | Units of mass `93a60a57-a4c8-11da-a746-0800200c9a66` |
| Reference unit | kg |
| Required qualifiers | species or hybrid; culture system; seed or juvenile source; product state; shell-on or shucked basis; size grade; moisture or drainage basis; geography and declared gate; holding or chilling duration; feed regime; permit or certification status |

When constructing a foreground data package, the items listed in `Required qualifiers` must be declared in dataset metadata, process notes, reference flow comment, product description, or an equivalent data package field. Missing required qualifiers make the reference flow definition incomplete for that data package.

Mass is the primary reference basis. Count records may be used only when mean individual mass and product form are retained so the foreground package can convert count to kg product.

## 4. Measurement and Unit Rules

| rule_id | Applies to | Required property | Required unit | Rule |
| --- | --- | --- | --- | --- |
| `reference_mass` | reference product | Mass `93a60a56-a3c8-11da-a746-0800200b9a66` | kg | The reference flow must be expressed as kg farmed abalone in the declared live, fresh, or chilled product form. |
| `product_form_mass_basis` | shell-on, shucked, drained, or chilled product records | Mass `93a60a56-a3c8-11da-a746-0800200b9a66` | kg | Product mass must state whether it is shell-on live weight, shell-on chilled weight, shucked meat mass, drained mass, or another contract-declared basis. Convert only with measured yield evidence. |
| `count_to_mass_conversion` | stocking, mortality, grading, and sales count records | Mass `93a60a56-a3c8-11da-a746-0800200b9a66` | kg | Count-based records must include mean individual mass, size grade, and sampling method before normalization to kg reference product. |
| `water_volume_or_mass` | seawater intake, process water, live holding water, and wastewater | Mass or volume | kg or m3 | Preserve the original measured unit and conversion basis. For flow-through or open-water systems, distinguish pumped water from ambient water passing through the culture site. |
| `feed_mass_basis` | macroalgae, seaweed, formulated feed, and mixed feed | Mass `93a60a56-a3c8-11da-a746-0800200b9a66` | kg | Feed inputs must state wet mass, dry mass, or as-fed mass. Convert between wet and dry basis only when measured moisture or supplier data are available. |
| `energy_inventory` | pumping, aeration, filtration, lighting, chilling, live holding, and delivery energy | Energy or fuel quantity | kWh, MJ, L, or kg | Record original electricity, fuel, or energy carrier units before normalizing to the reference flow. |
| `feed_marine_fraction` | formulated feed containing fishmeal, fish oil, or other marine ingredients | Mass fraction | kg/kg feed | Declare feed composition or supplier formulation when marine ingredient dependency or ASC feed-efficiency indicators are used. |

Key product attributes are foreground qualifiers recorded alongside the mass reference flow:

| Attribute | Common unit | Required handling |
| --- | --- | --- |
| Species or hybrid | scientific and common name | required for all datasets |
| Culture system | land-based raceway, RAS, suspended cage, sea ranch, or other declared system | required for system boundary and water discharge interpretation |
| Product form | live shell-on, fresh shell-on, chilled shell-on, shucked fresh, or declared variant | required for mass-basis interpretation |
| Size grade | shell length, count per kg, or market grade | required when count or grade records are used |
| Feed regime | macroalgae, formulated feed, mixed feed, or natural feed at sea-ranch site | required for feed inventory and source disclosure |

## 5. System Boundary

The default boundary covers foreground-controlled farmed abalone production to the declared farm, harvest, packhouse, or delivery gate:

1. Seed or juvenile sourcing, including on-site hatchery and nursery activity when controlled by the reporting operator, or purchased juvenile disclosure when supplied by another hatchery.
2. Grow-out husbandry, including culture units, stocking, feed, water movement, aeration, filtration, biofouling control, mortality management, predator or escape controls, and directly controlled maintenance.
3. Harvest, grading, purging or depuration when performed, live holding, chilling, packaging, and declared gate release.
4. Delivery to the declared gate when the reference product is delivered rather than farm-gate product.

Capital goods, infrastructure construction, and long-term habitat modification are included only when the declared data package scope requires them. Feed and seed upstream datasets are linked as upstream inputs unless the same operator controls and reports their production in the foreground package.

### Boundary Abstraction

| Field | Value |
| --- | --- |
| declared_starting_condition | declared_seed_or_juvenile_stocking_event |
| starting_condition_role | aquaculture_stock_identity_and_biological_starting_condition |
| product_classification_scope | current CPC 3.0 product category `04412`, `Farmed abalone, live, fresh or chilled` |
| recursive_input_rule | farmed abalone seed or juveniles used to produce market abalone are recorded as declared seed or juvenile starting condition with supplier or hatchery disclosure, not recursively as finished reference product output |
| upstream_dataset_requirement | seed or juvenile supplier dataset, on-site hatchery records, or documented source, species, batch, mass or count, size, health status, and certification or permit evidence |
| disclosure | disclose species or hybrid, culture system, stocking batch, feed regime, water source and discharge route, grow-out duration, mortalities, harvest and holding conditions, product form, packaging state, and unresolved Tiangong UUID substitutions |

## 6. Process Inventory Structure

### Process Map

| process_id | process_name | inclusion | inclusion_condition | role | quantitative_reference |
| --- | --- | --- | --- | --- | --- |
| seed_supply_hatchery_and_nursery | Seed Supply, Hatchery, and Nursery | required | purchased seed or on-site hatchery path must be declared | foreground/upstream bridge | stocked juvenile abalone entering grow-out |
| growout_husbandry | Grow-out Husbandry | required |  | foreground production | harvest-size abalone before pack-out |
| harvest_grading_and_live_holding | Harvest, Grading, and Live Holding | required |  | foreground conditioning and gate release | declared marketable live, fresh, or chilled abalone |
| delivery_to_declared_gate | Delivery to Declared Gate | conditional | include when the reference flow is delivered product beyond the farm or packhouse gate | foreground transport | delivered product at declared gate |

### Process: Seed Supply, Hatchery, and Nursery (`seed_supply_hatchery_and_nursery`)

#### Inputs

##### Product flows

###### Broodstock, seed, or juvenile abalone input (`seed_or_juvenile_abalone_input`)

This row records purchased juveniles, transferred nursery stock, or broodstock-derived seed entering the foreground production route.

- Selected flow: Abalone `7b973a02-b45b-4f5a-a640-a9b5ae65584b`
- Flow property / unit: Mass or count with mean mass / kg or item
- Amount rule: measured seed or juvenile count and mass entering the declared grow-out batch
- Value mode: Foreground record (`foreground_record`)
- Specificity: Site-specific (`site_specific`)
- Normalization basis: per 1,000 kg marketable abalone output
- Basis kind: Process output (`process_output`)
- Evidence kind: Collected record (`collected_record`)
- Collection protocol: `cp_seed_stocking_records`
- Sources: `fao-abalone-breeding-1990`, `ca-dfg-culture-of-abalone`
- Range: Provisional seed input screening estimate
  - Range role: Default estimate (`default_estimate`)
  - Lower: 0.01
  - Upper: 2
  - Unit: kg seed or juvenile live mass/kg marketable abalone
  - Basis: broad first-pass seed or juvenile mass input relative to marketable output
  - Basis kind: Process output (`process_output`)
  - Evidence kind: Reasoned estimate (`reasoned_estimate`)

###### Hatchery and nursery water (`hatchery_nursery_water`)

This row covers metered process water, seawater, or recirculation make-up water used in on-site hatchery and nursery operations.

- Selected flow: Process water `ec205030-248c-496f-9cf2-06d9d26dc6ff`
- Flow property / unit: Mass or volume / kg or m3
- Amount rule: measured water intake, make-up water, or recirculation replacement volume
- Value mode: Foreground record (`foreground_record`)
- Specificity: Site-specific (`site_specific`)
- Normalization basis: per 1,000 kg marketable abalone output or per stocking batch before normalization
- Basis kind: Process output (`process_output`)
- Evidence kind: Collected record (`collected_record`)
- Collection protocol: `cp_water_intake_and_discharge_records`
- Sources: `fao-abalone-breeding-1990`
- Range: Provisional hatchery and nursery water screening estimate
  - Range role: Default estimate (`default_estimate`)
  - Lower: 0
  - Upper: 1000
  - Unit: m3/1,000 kg marketable abalone
  - Basis: broad first-pass pumped or supplied water for seed production relative to marketable output
  - Basis kind: Process output (`process_output`)
  - Evidence kind: Reasoned estimate (`reasoned_estimate`)

###### Hatchery and nursery electricity (`hatchery_nursery_electricity`)

This row covers electricity for pumps, aeration, filtration, lighting, algal feed culture, temperature control, and water treatment in on-site hatchery or nursery operations.

- Selected flow: Electricity `f872677d-2f66-428a-a94e-f0fba61231df`
- Flow property / unit: Energy / kWh
- Amount rule: metered electricity or allocated electricity records
- Value mode: Foreground record (`foreground_record`)
- Specificity: Site-specific (`site_specific`)
- Normalization basis: per 1,000 kg marketable abalone output
- Basis kind: Process output (`process_output`)
- Evidence kind: Collected record (`collected_record`)
- Collection protocol: `cp_energy_records`
- Sources: `asc-farm-standard-2025`
- Range: Provisional hatchery electricity screening estimate
  - Range role: Default estimate (`default_estimate`)
  - Lower: 0
  - Upper: 5000
  - Unit: kWh/1,000 kg marketable abalone
  - Basis: broad first-pass on-site hatchery and nursery electricity relative to marketable output
  - Basis kind: Process output (`process_output`)
  - Evidence kind: Reasoned estimate (`reasoned_estimate`)

##### Waste flows

###### Hatchery mortalities and biofouling residue (`hatchery_mortalities_and_biofouling_residue`)

This row records eggs, larvae, juveniles, biofouling, algal residue, shell fragments, or other organic residue removed from on-site hatchery and nursery systems.

- Selected flow: Select route-specific organic aquaculture residue or mortality waste flow
- Flow property / unit: Mass / kg
- Amount rule: measured or estimated residue and mortality mass with declared fate
- Value mode: Foreground record (`foreground_record`)
- Specificity: Site-specific (`site_specific`)
- Normalization basis: per stocked juvenile batch and per 1,000 kg marketable output after normalization
- Basis kind: Process output (`process_output`)
- Evidence kind: Collected record (`collected_record`)
- Collection protocol: `cp_mortality_and_residue_records`
- Range: Provisional hatchery residue screening estimate
  - Range role: Default estimate (`default_estimate`)
  - Lower: 0
  - Upper: 1
  - Unit: kg residue/kg stocked juvenile live mass
  - Basis: broad first-pass residue or mortality mass relative to stocked juvenile live mass
  - Basis kind: Process output (`process_output`)
  - Evidence kind: Reasoned estimate (`reasoned_estimate`)

##### Elementary flows

No default elementary input is specified for seed supply. Add site-specific seawater withdrawal, land occupation, or marine area occupation flows when the Tiangong identity and site scope are selected.

#### Outputs

##### Product flows

###### Stocked juvenile abalone (`stocked_juvenile_abalone`)

This output carries the declared seed or juvenile stock into grow-out.

- Selected flow: Abalone `7b973a02-b45b-4f5a-a640-a9b5ae65584b`
- Flow property / unit: Mass or count with mean mass / kg or item
- Amount rule: calculated stocked mass or count after nursery transfer losses
- Value mode: Calculated value (`calculated_value`)
- Specificity: Site-specific (`site_specific`)
- Normalization basis: stocked juvenile batch entering grow-out
- Basis kind: Process output (`process_output`)
- Evidence kind: Calculated from collection (`calculated_from_collection`)
- Collection protocol: `cp_seed_stocking_records`
- Range: Stocking mass-balance QA guardrail
  - Range role: QA guardrail (`qa_guardrail`)
  - Lower: 0
  - Upper: 1
  - Unit: kg/kg seed or juvenile input
  - Basis: stocked juvenile fraction after seed receipt, sorting, and nursery transfer
  - Basis kind: Process output (`process_output`)
  - Evidence kind: Method formula (`method_formula`)
  - Sources: `mass-balance-identity`

##### Waste flows

No additional default waste output is specified beyond recorded hatchery mortalities and residues.

##### Elementary flows

No default elementary output is specified for seed supply. Add direct emissions from site-specific water treatment, chemical use, or fuel combustion when measured.

### Process: Grow-out Husbandry (`growout_husbandry`)

#### Inputs

##### Product flows

###### Stocked juvenile transfer to grow-out (`stocked_juvenile_transfer_to_growout`)

This row transfers stocked juveniles into the declared grow-out culture system.

- Selected flow: Abalone `7b973a02-b45b-4f5a-a640-a9b5ae65584b`
- Flow property / unit: Mass or count with mean mass / kg or item
- Amount rule: stocked juvenile mass or count by grow-out unit
- Value mode: Calculated value (`calculated_value`)
- Specificity: Site-specific (`site_specific`)
- Normalization basis: per grow-out batch before harvest normalization
- Basis kind: Process output (`process_output`)
- Evidence kind: Calculated from collection (`calculated_from_collection`)
- Collection protocol: `cp_seed_stocking_records`
- Range: Provisional stocked juvenile transfer estimate
  - Range role: Default estimate (`default_estimate`)
  - Lower: 0.01
  - Upper: 2
  - Unit: kg stocked juveniles/kg marketable abalone
  - Basis: broad first-pass stocked juvenile mass per marketable output
  - Basis kind: Process output (`process_output`)
  - Evidence kind: Reasoned estimate (`reasoned_estimate`)

###### Macroalgae or seaweed feed (`macroalgae_or_seaweed_feed`)

This row records kelp, Laminaria, Gracilaria, or other macroalgae feed supplied to the abalone culture units.

- Selected flow: Laminaria `a79a3a63-1c4a-4cd4-83cc-5f3bc3cb70af`
- Flow property / unit: Mass / kg wet or dry basis declared
- Amount rule: measured feed issued to culture units, with wet or dry basis and leftovers recorded where material
- Value mode: Foreground record (`foreground_record`)
- Specificity: Site-specific (`site_specific`)
- Normalization basis: per 1,000 kg harvest-size abalone output
- Basis kind: Process output (`process_output`)
- Evidence kind: Collected record (`collected_record`)
- Collection protocol: `cp_feed_records`
- Sources: `seafood-watch-abalone-worldwide-2022`, `fao-abalone-breeding-1990`
- Range: Provisional macroalgae feed screening estimate
  - Range role: Default estimate (`default_estimate`)
  - Lower: 0
  - Upper: 30000
  - Unit: kg wet macroalgae/1,000 kg marketable abalone
  - Basis: broad first-pass wet macroalgae feed issued per marketable output
  - Basis kind: Process output (`process_output`)
  - Evidence kind: Reasoned estimate (`reasoned_estimate`)

###### Formulated aquaculture feed (`formulated_aquaculture_feed`)

This row is used when formulated pellets or mixed feed supplement or replace macroalgae feed.

- Selected flow: Fry feed `3b09065d-9675-4dad-8d0e-1035b5cca324`
- Flow property / unit: Mass / kg as-fed or dry basis declared
- Amount rule: measured feed issued by product and batch, with supplier formulation or feed class retained
- Value mode: Foreground record (`foreground_record`)
- Specificity: Product-specific (`product_specific`)
- Normalization basis: per 1,000 kg harvest-size abalone output
- Basis kind: Process output (`process_output`)
- Evidence kind: Collected record (`collected_record`)
- Collection protocol: `cp_feed_records`
- Sources: `asc-farm-standard-2025`, `seafood-watch-abalone-worldwide-2022`
- Range: Provisional formulated feed screening estimate
  - Range role: Default estimate (`default_estimate`)
  - Lower: 0
  - Upper: 5000
  - Unit: kg formulated feed/1,000 kg marketable abalone
  - Basis: broad first-pass formulated feed issued per marketable output
  - Basis kind: Process output (`process_output`)
  - Evidence kind: Reasoned estimate (`reasoned_estimate`)

###### Grow-out water movement or make-up water (`growout_water_movement_or_makeup`)

This row records pumped seawater, make-up water, or supplied water for land-based or recirculating grow-out systems. For open sea-ranch or cage systems, record only foreground-controlled pumping, flushing, or supplied water.

- Selected flow: Process water `ec205030-248c-496f-9cf2-06d9d26dc6ff`
- Flow property / unit: Mass or volume / kg or m3
- Amount rule: metered intake, pumped volume, or make-up water volume with system type declared
- Value mode: Foreground record (`foreground_record`)
- Specificity: Technology-specific (`technology_specific`)
- Normalization basis: per 1,000 kg harvest-size abalone output
- Basis kind: Process output (`process_output`)
- Evidence kind: Collected record (`collected_record`)
- Collection protocol: `cp_water_intake_and_discharge_records`
- Sources: `asc-farm-standard-2025`
- Range: Provisional grow-out water screening estimate
  - Range role: Default estimate (`default_estimate`)
  - Lower: 0
  - Upper: 100000
  - Unit: m3/1,000 kg marketable abalone
  - Basis: broad first-pass pumped or supplied water use across RAS, raceway, and flow-through systems
  - Basis kind: Process output (`process_output`)
  - Evidence kind: Reasoned estimate (`reasoned_estimate`)

###### Grow-out electricity (`growout_electricity`)

This row covers electricity for pumping, aeration, filtration, lighting, sensors, automatic feeding, and culture-unit operation.

- Selected flow: Electricity `f872677d-2f66-428a-a94e-f0fba61231df`
- Flow property / unit: Energy / kWh
- Amount rule: metered electricity or allocated electricity records for grow-out operations
- Value mode: Foreground record (`foreground_record`)
- Specificity: Technology-specific (`technology_specific`)
- Normalization basis: per 1,000 kg harvest-size abalone output
- Basis kind: Process output (`process_output`)
- Evidence kind: Collected record (`collected_record`)
- Collection protocol: `cp_energy_records`
- Sources: `asc-abalone-standard-2012`, `asc-farm-standard-2025`
- Range: Provisional grow-out electricity screening estimate
  - Range role: Default estimate (`default_estimate`)
  - Lower: 0
  - Upper: 50000
  - Unit: kWh/1,000 kg marketable abalone
  - Basis: broad first-pass electricity demand across low-energy sea-ranch and energy-intensive land-based systems
  - Basis kind: Process output (`process_output`)
  - Evidence kind: Reasoned estimate (`reasoned_estimate`)

###### Grow-out fuel and workboat energy (`growout_fuel_and_workboat_energy`)

This row covers diesel or other fuel for workboats, forklifts, generators, farm vehicles, or directly controlled maintenance activity.

- Selected flow: Diesel oil `9d258d75-6792-4f1c-9856-81602ed8f816`
- Flow property / unit: Fuel quantity / L, kg, or MJ
- Amount rule: measured fuel purchase, tank records, vessel logs, or allocated farm-vehicle fuel
- Value mode: Foreground record (`foreground_record`)
- Specificity: Route-specific (`route_specific`)
- Normalization basis: per 1,000 kg harvest-size abalone output
- Basis kind: Fuel inventory (`fuel_inventory`)
- Evidence kind: Collected record (`collected_record`)
- Collection protocol: `cp_fuel_and_transport_records`
- Range: Provisional grow-out fuel screening estimate
  - Range role: Default estimate (`default_estimate`)
  - Lower: 0
  - Upper: 1000
  - Unit: L diesel-equivalent/1,000 kg marketable abalone
  - Basis: broad first-pass directly controlled fuel use per marketable output
  - Basis kind: Fuel inventory (`fuel_inventory`)
  - Evidence kind: Reasoned estimate (`reasoned_estimate`)

##### Waste flows

###### Grow-out mortalities and shell residue (`growout_mortalities_and_shell_residue`)

This row records mortalities, shells, broken product, predator-damaged animals, and organic residues removed during grow-out.

- Selected flow: Abalone shells `8caae24b-92f0-4ece-b1de-730bfbe4d9da`
- Flow property / unit: Mass / kg
- Amount rule: measured mortality count, mortality mass, shell residue, and disposal or recovery route
- Value mode: Foreground record (`foreground_record`)
- Specificity: Site-specific (`site_specific`)
- Normalization basis: per grow-out batch and per 1,000 kg marketable output after normalization
- Basis kind: Process output (`process_output`)
- Evidence kind: Collected record (`collected_record`)
- Collection protocol: `cp_mortality_and_residue_records`
- Sources: `asc-farm-standard-2025`
- Range: Provisional mortality and residue screening estimate
  - Range role: Default estimate (`default_estimate`)
  - Lower: 0
  - Upper: 2
  - Unit: kg mortality or residue/kg marketable abalone
  - Basis: broad first-pass mortality and residue mass relative to marketable output
  - Basis kind: Process output (`process_output`)
  - Evidence kind: Reasoned estimate (`reasoned_estimate`)

###### Grow-out wastewater or discharged culture water (`growout_wastewater_or_discharge`)

This row records discharged water, sludge, settled solids, or wastewater treatment outputs when the farm has a point-source discharge or controlled water treatment process.

- Selected flow: Wastewater `bc2cd1d5-69d5-42d7-818f-38a69ebb18ef`
- Flow property / unit: Volume or mass / m3 or kg
- Amount rule: measured discharge volume or calculated from intake minus recirculation and retained water
- Value mode: Calculated value (`calculated_value`)
- Specificity: Technology-specific (`technology_specific`)
- Normalization basis: per 1,000 kg harvest-size abalone output
- Basis kind: Process output (`process_output`)
- Evidence kind: Calculated from collection (`calculated_from_collection`)
- Collection protocol: `cp_water_intake_and_discharge_records`
- Sources: `asc-farm-standard-2025`
- Range: Provisional grow-out discharge screening estimate
  - Range role: Default estimate (`default_estimate`)
  - Lower: 0
  - Upper: 100000
  - Unit: m3/1,000 kg marketable abalone
  - Basis: broad first-pass controlled discharge across RAS, raceway, and flow-through systems
  - Basis kind: Process output (`process_output`)
  - Evidence kind: Reasoned estimate (`reasoned_estimate`)

##### Elementary flows

###### Direct carbon dioxide from on-site fuel combustion (`direct_carbon_dioxide_from_fuel_combustion`)

This row is included only when the foreground farm directly burns fuel and the process dataset does not already carry combustion emissions.

- Selected flow: carbon dioxide (fossil) `041f5d0e-6556-11dd-ad8b-0800200c9a66`
- Flow property / unit: Mass / kg
- Amount rule: calculated from metered fuel records and selected emission factor when direct combustion is modelled in the foreground process
- Value mode: Calculated value (`calculated_value`)
- Specificity: Site-specific (`site_specific`)
- Normalization basis: per 1,000 kg harvest-size abalone output
- Basis kind: Fuel inventory (`fuel_inventory`)
- Evidence kind: Calculated from collection (`calculated_from_collection`)
- Collection protocol: `cp_fuel_and_transport_records`
- Range: Provisional direct CO2 screening estimate
  - Range role: Default estimate (`default_estimate`)
  - Lower: 0
  - Upper: 3000
  - Unit: kg CO2/1,000 kg marketable abalone
  - Basis: broad first-pass direct fuel combustion CO2 per marketable output
  - Basis kind: Fuel inventory (`fuel_inventory`)
  - Evidence kind: Reasoned estimate (`reasoned_estimate`)

#### Outputs

##### Product flows

###### Harvest-size farmed abalone (`harvest_size_farmed_abalone`)

This row records the grow-out output before final grading, live holding, chilling, or pack-out losses.

- Selected flow: Abalone `7b973a02-b45b-4f5a-a640-a9b5ae65584b`
- Flow property / unit: Mass / kg
- Amount rule: measured harvested live mass by batch, grade, and product form before pack-out
- Value mode: Foreground record (`foreground_record`)
- Specificity: Site-specific (`site_specific`)
- Normalization basis: grow-out process quantitative reference
- Basis kind: Process output (`process_output`)
- Evidence kind: Collected record (`collected_record`)
- Collection protocol: `cp_harvest_and_product_records`
- Range: Grow-out harvest mass-balance QA guardrail
  - Range role: QA guardrail (`qa_guardrail`)
  - Lower: 0
  - Upper: 1
  - Unit: kg/kg total live abalone biomass before harvest adjustment
  - Basis: harvested market-size fraction of available biomass in the declared batch
  - Basis kind: Process output (`process_output`)
  - Evidence kind: Method formula (`method_formula`)
  - Sources: `mass-balance-identity`

##### Waste flows

No additional default waste output is specified beyond grow-out mortalities, shell residue, and controlled water discharge.

##### Elementary flows

Add direct nutrient, chemical, or habitat-interaction elementary flows when measured or required by local modelling rules.

### Process: Harvest, Grading, and Live Holding (`harvest_grading_and_live_holding`)

#### Inputs

##### Product flows

###### Harvested abalone input to pack-out (`harvested_abalone_input_to_packout`)

This row transfers harvest-size abalone into grading, purging, live holding, chilling, and pack-out.

- Selected flow: Abalone `7b973a02-b45b-4f5a-a640-a9b5ae65584b`
- Flow property / unit: Mass / kg
- Amount rule: measured harvested mass entering pack-out
- Value mode: Foreground record (`foreground_record`)
- Specificity: Site-specific (`site_specific`)
- Normalization basis: per pack-out batch
- Basis kind: Process output (`process_output`)
- Evidence kind: Collected record (`collected_record`)
- Collection protocol: `cp_harvest_and_product_records`
- Range: Pack-out input mass-balance QA guardrail
  - Range role: QA guardrail (`qa_guardrail`)
  - Lower: 0
  - Upper: 2
  - Unit: kg/kg reference product
  - Basis: harvested abalone input relative to declared marketable reference product
  - Basis kind: Reference flow (`reference_flow`)
  - Evidence kind: Method formula (`method_formula`)
  - Sources: `mass-balance-identity`

###### Live holding and chilling water (`live_holding_and_chilling_water`)

This row records water, seawater, ice melt, or live holding system water used after harvest.

- Selected flow: Process water `ec205030-248c-496f-9cf2-06d9d26dc6ff`
- Flow property / unit: Mass or volume / kg or m3
- Amount rule: measured water or ice use for purging, depuration, live holding, chilling, and cleaning
- Value mode: Foreground record (`foreground_record`)
- Specificity: Site-specific (`site_specific`)
- Normalization basis: per 1,000 kg reference product
- Basis kind: Reference flow (`reference_flow`)
- Evidence kind: Collected record (`collected_record`)
- Collection protocol: `cp_water_intake_and_discharge_records`
- Range: Provisional holding and chilling water screening estimate
  - Range role: Default estimate (`default_estimate`)
  - Lower: 0
  - Upper: 2000
  - Unit: m3/1,000 kg reference product
  - Basis: broad first-pass live holding, purging, and chilling water per reference product
  - Basis kind: Reference flow (`reference_flow`)
  - Evidence kind: Reasoned estimate (`reasoned_estimate`)

###### Pack-out electricity (`packout_electricity`)

This row covers electricity for live holding, chilling, pumps, aeration, grading equipment, weighing, and packing.

- Selected flow: Electricity `f872677d-2f66-428a-a94e-f0fba61231df`
- Flow property / unit: Energy / kWh
- Amount rule: metered or allocated electricity for harvest, grading, live holding, chilling, and pack-out
- Value mode: Foreground record (`foreground_record`)
- Specificity: Site-specific (`site_specific`)
- Normalization basis: per 1,000 kg reference product
- Basis kind: Reference flow (`reference_flow`)
- Evidence kind: Collected record (`collected_record`)
- Collection protocol: `cp_energy_records`
- Range: Provisional pack-out electricity screening estimate
  - Range role: Default estimate (`default_estimate`)
  - Lower: 0
  - Upper: 5000
  - Unit: kWh/1,000 kg reference product
  - Basis: broad first-pass harvest, holding, chilling, and pack-out electricity per reference product
  - Basis kind: Reference flow (`reference_flow`)
  - Evidence kind: Reasoned estimate (`reasoned_estimate`)

###### Packaging materials (`packaging_materials`)

This row records bags, boxes, liners, insulated containers, gel ice packs, labels, and pallets that cross the foreground boundary with the product.

- Selected flow: Plastic Packaging Box and Container `7eb7726d-f3e5-4d23-b24d-dde3f34ff35a`
- Flow property / unit: Mass or item count / kg or item
- Amount rule: measured packaging item count and material mass; include capacity or tare mass for count records
- Value mode: Foreground record (`foreground_record`)
- Specificity: Product-specific (`product_specific`)
- Normalization basis: per 1,000 kg reference product
- Basis kind: Reference flow (`reference_flow`)
- Evidence kind: Collected record (`collected_record`)
- Collection protocol: `cp_packaging_records`
- Range: Provisional packaging screening estimate
  - Range role: Default estimate (`default_estimate`)
  - Lower: 0
  - Upper: 500
  - Unit: kg packaging/1,000 kg reference product
  - Basis: broad first-pass packaging material mass per reference product
  - Basis kind: Reference flow (`reference_flow`)
  - Evidence kind: Reasoned estimate (`reasoned_estimate`)

##### Waste flows

###### Off-grade, damaged, or dead product at pack-out (`offgrade_damaged_or_dead_product_packout`)

This row records non-marketable product, pack-out mortalities, broken shells, shucking residues when applicable, and rejected animals.

- Selected flow: Abalone shells `8caae24b-92f0-4ece-b1de-730bfbe4d9da`
- Flow property / unit: Mass / kg
- Amount rule: measured reject mass by fate and reason
- Value mode: Foreground record (`foreground_record`)
- Specificity: Site-specific (`site_specific`)
- Normalization basis: per 1,000 kg reference product
- Basis kind: Reference flow (`reference_flow`)
- Evidence kind: Collected record (`collected_record`)
- Collection protocol: `cp_mortality_and_residue_records`
- Range: Pack-out reject QA guardrail
  - Range role: QA guardrail (`qa_guardrail`)
  - Lower: 0
  - Upper: 1
  - Unit: kg/kg harvested abalone input
  - Basis: rejected or residue fraction of harvested abalone entering pack-out
  - Basis kind: Process output (`process_output`)
  - Evidence kind: Method formula (`method_formula`)
  - Sources: `mass-balance-identity`

###### Pack-out wastewater (`packout_wastewater`)

This row records cleaning, purging, depuration, chilling, or holding water discharged from pack-out operations.

- Selected flow: Wastewater `bc2cd1d5-69d5-42d7-818f-38a69ebb18ef`
- Flow property / unit: Volume or mass / m3 or kg
- Amount rule: measured or calculated discharge volume and treatment route
- Value mode: Calculated value (`calculated_value`)
- Specificity: Site-specific (`site_specific`)
- Normalization basis: per 1,000 kg reference product
- Basis kind: Reference flow (`reference_flow`)
- Evidence kind: Calculated from collection (`calculated_from_collection`)
- Collection protocol: `cp_water_intake_and_discharge_records`
- Range: Provisional pack-out wastewater screening estimate
  - Range role: Default estimate (`default_estimate`)
  - Lower: 0
  - Upper: 2000
  - Unit: m3/1,000 kg reference product
  - Basis: broad first-pass wastewater from live holding, purging, cleaning, and chilling per reference product
  - Basis kind: Reference flow (`reference_flow`)
  - Evidence kind: Reasoned estimate (`reasoned_estimate`)

##### Elementary flows

No default elementary output is specified for pack-out. Add direct refrigerant losses, combustion emissions, or waterborne emissions only when measured or required by the selected modelling rule.

#### Outputs

##### Product flows

###### Marketable farmed abalone reference product (`marketable_farmed_abalone_reference_product`)

This row is the declared reference product output.

- Selected flow: Abalone `7b973a02-b45b-4f5a-a640-a9b5ae65584b`
- Flow property / unit: Mass / kg
- Amount rule: measured marketable live, fresh, or chilled product mass after grading and pack-out
- Value mode: Foreground record (`foreground_record`)
- Specificity: Site-specific (`site_specific`)
- Normalization basis: reference flow
- Basis kind: Reference flow (`reference_flow`)
- Evidence kind: Collected record (`collected_record`)
- Collection protocol: `cp_harvest_and_product_records`
- Range: Reference product identity
  - Range role: QA guardrail (`qa_guardrail`)
  - Lower: 1
  - Upper: 1
  - Unit: kg/kg reference product
  - Basis: normalized reference product output
  - Basis kind: Reference flow (`reference_flow`)
  - Evidence kind: Method formula (`method_formula`)
  - Sources: `mass-balance-identity`

###### Saleable off-grade abalone co-product (`saleable_offgrade_abalone_coproduct`)

Use this row only when off-grade live, fresh, or chilled abalone remains saleable as a separate grade within the same product family.

- Selected flow: Abalone `7b973a02-b45b-4f5a-a640-a9b5ae65584b`
- Flow property / unit: Mass / kg
- Amount rule: measured saleable off-grade mass by grade and destination
- Value mode: Foreground record (`foreground_record`)
- Specificity: Product-specific (`product_specific`)
- Normalization basis: per pack-out batch and per reference product after allocation or partitioning
- Basis kind: Process output (`process_output`)
- Evidence kind: Collected record (`collected_record`)
- Collection protocol: `cp_harvest_and_product_records`
- Range: Provisional off-grade product screening estimate
  - Range role: Default estimate (`default_estimate`)
  - Lower: 0
  - Upper: 1
  - Unit: kg off-grade saleable product/kg reference product
  - Basis: broad first-pass off-grade saleable abalone mass relative to reference product
  - Basis kind: Reference flow (`reference_flow`)
  - Evidence kind: Reasoned estimate (`reasoned_estimate`)

##### Waste flows

No additional waste output is specified beyond pack-out rejects and wastewater.

##### Elementary flows

No default elementary output is specified for the reference pack-out process.

## 7. Allocation and Co-product Handling

Avoid allocation where batch records can partition burdens by culture unit, harvest lot, grade, product form, or destination. Separate live, fresh, chilled, shell-on, shucked, size-grade, and off-grade products by measured mass before applying allocation.

When a single foreground batch produces several saleable abalone grades within CPC 04412, allocate shared grow-out, harvest, holding, and pack-out burdens by declared product mass unless a reviewed market-value rule is documented. Shells, mortalities, wastewater, sludge, biofouling residue, and broken or dead product are waste or treatment outputs unless they are sold with a separate product dataset and reference flow.

If the same site grows other species or co-products in the same system, allocate shared energy, water, feed preparation, and maintenance records by measured culture-unit service, biomass-time, or product mass in that order of preference. The selected allocation basis must be disclosed.

## 8. Foreground Data Collection, Calculation, and Quality Rules

### Data Collection Protocols

| protocol_id | process_id | flow_role | record_type | raw_fields | collection_method | unit | frequency | temporal_coverage | site_scope | aggregation_rule | quality_evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `cp_seed_stocking_records` | seed_supply_hatchery_and_nursery | seed or juvenile abalone input and stocked juvenile output | hatchery transfer, supplier invoice, stocking log, health certificate | species; batch id; supplier or hatchery; count; mean mass; total mass; size grade; health status; transfer date | supplier records, hatchery logs, stocking count, sampling and weighing | item and kg | each stocking event | complete production batch or reporting year | supplier, hatchery, nursery, and grow-out unit | sum stocked counts and masses by batch; calculate mean mass and survival to grow-out transfer | signed transfer records, sampling sheet, weighing record, health or permit evidence |
| `cp_feed_records` | growout_husbandry | macroalgae, seaweed, and formulated feed | feed issue log, supplier invoice, feed formulation, leftover record | feed product; wet/dry/as-fed basis; moisture; quantity issued; leftovers; feed source; marine ingredient fraction when relevant | feed inventory, supplier declarations, farm feeding logs | kg | each feed issue or batch summary | full grow-out period | grow-out unit or farm | normalize net feed supplied to harvest-size output; retain wet/dry conversion basis | feed purchase records, supplier formulation, stock movement logs |
| `cp_water_intake_and_discharge_records` | seed_supply_hatchery_and_nursery; growout_husbandry; harvest_grading_and_live_holding | water intake, pumped seawater, live holding water, wastewater, and discharge | meter readings, pump logs, discharge permits, water-quality records | intake volume; make-up water; recirculated volume; discharge volume; water source; discharge route; treatment; salinity where relevant | meter, pump runtime calculation, permit report, or water management log | m3 or kg | daily, batch, or reporting period | process-specific operation period | hatchery, grow-out, live holding, packhouse, and discharge point | reconcile intake, recirculation, and discharge; normalize to process output and reference flow | meter calibration, permit report, water-quality monitoring record |
| `cp_energy_records` | seed_supply_hatchery_and_nursery; growout_husbandry; harvest_grading_and_live_holding | electricity and non-fuel energy | meter reading, utility bill, submeter, equipment log | electricity use; meter id; process allocation; operating hours; chilling or pumping service | utility bill, submeter, runtime allocation | kWh or MJ | monthly or batch | reporting period and production batch overlap | farm, hatchery, grow-out unit, or packhouse | allocate by metered subprocess first, then operating hours or product mass | utility bill, submeter records, allocation worksheet |
| `cp_fuel_and_transport_records` | growout_husbandry; delivery_to_declared_gate | diesel, vessel fuel, vehicle fuel, and delivery energy | fuel purchase, tank drawdown, vessel log, delivery log | fuel type; quantity; route; vehicle or vessel; distance; load; process purpose | fuel invoice, tank gauge, vehicle or vessel log | L, kg, MJ, or tonne-km | each trip or reporting period | grow-out, harvest, or delivery period | directly controlled routes and equipment | normalize fuel or tonne-km to product mass; avoid double counting supplier-delivered inputs | fuel invoice, odometer or vessel log, delivery manifest |
| `cp_mortality_and_residue_records` | seed_supply_hatchery_and_nursery; growout_husbandry; harvest_grading_and_live_holding | mortalities, shells, residues, rejects, and biofouling | mortality log, reject sheet, waste manifest, recovery record | count; mass; reason; fate; date; culture unit; shell or organic residue category | farm log, weighing, waste contractor record | item and kg | event, batch, or reporting period | full production batch or pack-out period | hatchery, grow-out unit, packhouse, waste handling route | sum by fate and normalize to process output and reference product | signed waste record, farm mortality log, mass balance |
| `cp_harvest_and_product_records` | growout_husbandry; harvest_grading_and_live_holding | harvest-size product, marketable reference product, and off-grade product | harvest log, grading sheet, sales invoice, pack-out record | harvest date; culture unit; product form; live/fresh/chilled state; shell-on or shucked basis; grade; count; mass; destination | harvest weighing, grader records, packhouse records, invoice | kg and item | each harvest or pack-out batch | declared production batch or reporting period | harvest area, packhouse, and declared gate | reconcile harvested input, marketable output, off-grade product, rejects, and reference product | calibrated scale record, sales invoice, batch reconciliation |
| `cp_packaging_records` | harvest_grading_and_live_holding | boxes, liners, bags, labels, ice packs, and pallets | packaging issue log, purchase invoice, bill of materials | packaging item; material; item count; tare mass; capacity; reuse rate; destination | warehouse issue record, bill of materials, supplier invoice | kg and item | each pack-out batch or reporting period | pack-out period | packhouse and delivery preparation | convert count to mass using tare or supplier data; normalize to reference product | supplier specification, packaging issue sheet, scale record |

### Calculation Rules

| rule_id | Applies to | Formula or rule | Inputs | Output | source_ids |
| --- | --- | --- | --- | --- | --- |
| `normalize_to_reference_flow` | all foreground rows | normalized_amount = measured_or_calculated_amount / marketable_reference_product_mass. Preserve raw records and product-form basis. | measured amount; marketable_reference_product_mass | amount per 1 kg reference product | `mass-balance-identity` |
| `calculate_stocking_survival` | seed_supply_hatchery_and_nursery and growout_husbandry | survival_to_harvest = harvested_count / stocked_count, with count-to-mass conversion retained separately. | stocked_count; harvested_count; mortality_count | survival indicator and QA check | `mass-balance-identity` |
| `calculate_feed_conversion_indicator` | growout_husbandry | feed_conversion_indicator = net_feed_mass / harvest_size_abalone_mass on the declared feed mass basis. Do not compare wet and dry feed without conversion evidence. | feed_mass; moisture basis; harvest_size_abalone_mass | feed mass per kg harvest-size abalone | `asc-farm-standard-2025` |
| `reconcile_packout_mass` | harvest_grading_and_live_holding | harvested_input_mass = reference_product_mass + offgrade_saleable_mass + reject_mass + measured holding loss on the same product-form basis. | harvested_input_mass; reference_product_mass; offgrade_mass; reject_mass; holding_loss | pack-out mass balance | `mass-balance-identity` |
| `calculate_controlled_discharge` | water intake and discharge rows | controlled_discharge = measured_discharge or intake - retained_product_water - recirculated_volume adjustment when meters are incomplete. | intake; discharge; recirculated volume; retained water | discharge volume by process | `mass-balance-identity` |
| `calculate_delivery_transport_service` | delivery_to_declared_gate | transport_service = delivered_product_mass_tonnes * one-way controlled delivery distance. | delivered mass; controlled distance | tonne-kilometres | `mass-balance-identity` |

### Data Quality Requirements

| requirement_id | Applies to | Requirement | Evidence |
| --- | --- | --- | --- |
| `identity_and_scope` | all datasets | Declare CPC code, species or hybrid, culture system, seed source, product form, geography, and declared gate. | dataset metadata, stocking records, product description, permit or certification evidence |
| `mass_basis_consistency` | reference product, seed, harvest, pack-out, and rejects | Keep shell-on, shucked, live, fresh, chilled, drained, wet, and dry bases separate unless measured conversion evidence exists. | scale records, product specifications, moisture or drainage evidence |
| `feed_and_water_disclosure` | grow-out and hatchery rows | Retain feed type, feed basis, water source, water discharge route, and water quality monitoring where applicable. | feed logs, supplier data, water meter, discharge permit, monitoring report |
| `mortality_and_residue_completeness` | seed, grow-out, and pack-out rows | Record mortalities, rejects, shell residue, biofouling residue, and fate by batch or reporting period. | mortality log, reject sheet, waste manifest, recovery record |
| `allocation_transparency` | multi-grade or multi-species systems | State the partitioning or allocation basis before publishing a secondary or background dataset. | allocation worksheet, grade mass records, culture-unit records |
| `temporal_representativeness` | all foreground rows | Cover a complete production batch, harvest lot, or representative reporting period; disclose partial-cycle datasets. | production calendar, stocking and harvest dates, reporting-period records |

## 9. Validation Rules

A foreground data package conforms to this PCR only when:

- the reference product is normalized to 1 kg farmed abalone in a declared live, fresh, or chilled product form;
- species or hybrid, culture system, seed or juvenile source, product state, product form, size grade, geography, declared gate, holding duration, and feed regime are declared;
- seed or juvenile input, feed, water, energy, fuel, mortality or residue, harvest, pack-out, and packaging records are either present or explicitly marked not applicable with a reason;
- count records include mean individual mass or another transparent conversion to kg;
- feed records distinguish macroalgae, formulated feed, and mixed feed, and keep wet, dry, and as-fed bases separate;
- water rows distinguish pumped or supplied water from ambient open-water exchange;
- pack-out mass balance reconciles harvested input, reference product, saleable off-grade product, rejects, and holding losses;
- same-site multi-species or multi-grade allocation is documented before the dataset is used as a background or secondary dataset.

## 10. Published Dataset Profile

| Field | Value |
| --- | --- |
| dataset_role | foreground production package that may be published as a `secondary_dataset` or `background_dataset` after review |
| downstream_use | use as farmed abalone input to seafood processing, food service, retail, cold-chain, or regional food-product lifecycle models |
| allowed_use | farmed abalone live, fresh, or chilled datasets with declared species, culture system, product form, gate, feed regime, and quality disclosures |
| excluded_use | wild abalone, frozen/smoked/dried/salted/brined/prepared abalone, generic mollusc datasets, and datasets lacking product-form or culture-system disclosure |
| required_metadata | canonical PCR id; CPC code; species or hybrid; culture system; seed source; product form; shell-on or shucked basis; size grade; geography; declared gate; holding or chilling duration; feed regime; data period; allocation basis |
| required_quality_disclosure | missing UUIDs; unresolved seawater or habitat flow identities; feed wet/dry conversion; water discharge route; mortality completeness; pack-out mass balance; partial-cycle or proxy data use |
| update_trigger | revise when CPC mapping changes, Tiangong abalone, seawater, feed, discharge, or habitat flow identities are updated, ASC or equivalent aquaculture standards change, or reviewed foreground abalone datasets provide better ranges |

## 11. Data Sources

| Source id | Type | Reference | Used for |
| --- | --- | --- | --- |
| `fao-abalone-breeding-1990` | handbook | <https://www.fao.org/4/ab731e/ab731e00.htm> | abalone biology, hatchery, nursery, grow-out stages, feeding, water quality, and production-cycle context |
| `ca-dfg-culture-of-abalone` | official_guidance | <https://nrm.dfg.ca.gov/FileHandler.ashx?DocumentID=34422> | hatchery, nursery, grow-out system options, transfer timing, and market-size process decomposition |
| `asc-abalone-standard-2012` | standard | <https://asc-aqua.org/wp-content/uploads/2023/07/ASC-Abalone-Standard_v1.0.pdf> | abalone aquaculture issue areas, energy, feed, biosecurity, ecosystem effects, waste management, and scope context |
| `asc-farm-standard-2025` | standard | <https://programme-centre.asc-aqua.org/app/uploads/2025/08/ASC-STD-001-ASC-Farm-Standard-V1.0.1-Aug-2025.pdf> | current ASC grow-out scope, eligible Haliotis species, water quality, feed efficiency, traceability, animal health, and data requirements |
| `seafood-watch-abalone-worldwide-2022` | official_guidance | <https://www.seafoodwatch.org/globalassets/sfw-data-blocks/reports/a/seafood-watch-abalone-worldwide-27815.pdf> | abalone production phases, culture systems, feed patterns, chemical use context, source-of-stock, disease, and data-quality gaps |
| `mass-balance-identity` | method_factor | Conservation of mass applied as a PCR calculation identity for stocking, grow-out, pack-out, discharge, transport-service, and reference-flow normalization. | QA guardrails, survival, yield, pack-out reconciliation, and normalization rules |
