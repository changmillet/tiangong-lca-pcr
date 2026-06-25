---
schema_version: 1
pcr_id: pcr.agriculture-forestry-and-fishery-products.fish-crustaceans-molluscs-and-other-aquatic-invertebrates-products.coral-and-similar-products-shells-of-molluscs-crustaceans-or-echinoderms-and-cuttle-bone
language: en-US
status: candidate
content_maturity: authored_methodology
translation_status: canonical
---

# Coral and similar products, shells of molluscs, crustaceans or echinoderms and cuttle-bone

This PCR defines foreground data collection and model-construction rules for CPC 3.0 code 04911. It covers biogenic mineral or shell-like products placed on the market as coral and similar products, mollusc shells, crustacean shells, echinoderm shells, or cuttle-bone after source receipt, washing, drying, sorting, optional size reduction, and optional packaging.

## 1. Product Category Identity

| Field | Value |
| --- | --- |
| canonical_pcr_id | pcr.agriculture-forestry-and-fishery-products.fish-crustaceans-molluscs-and-other-aquatic-invertebrates-products.coral-and-similar-products-shells-of-molluscs-crustaceans-or-echinoderms-and-cuttle-bone |
| classification_system | CPC |
| classification_version | 3.0 |
| classification_code | 04911 |
| classification_title | Coral and similar products, shells of molluscs, crustaceans or echinoderms and cuttle-bone |
| included_products | Natural or recovered coral-like calcareous products, shells of molluscs, shells of crustaceans, shells of echinoderms, and cuttle-bone sold as materials or prepared goods within CPC 04911. |
| excluded_products | Live aquatic animals, edible fishery products, prepared food, jewellery or finished decorative articles outside CPC 04911, synthetic calcium carbonate, and products whose declared reference flow is not mass based. |
| representative_product | Cleaned, dried, sorted shell or coral-like biogenic mineral material at the facility gate. |
| production_route | Source collection or receipt, provenance check, washing or desalting, drying, sorting, optional crushing or grading, optional packaging, and gate release. |
| market_state | Bulk or packed material declared by source route, moisture basis, grade, particle-size range when applicable, and legal or provenance status. |

## 2. Functional Unit and Reference Flow

| Field | Value |
| --- | --- |
| what | Provision of CPC 04911 shell, coral-like, echinoderm, crustacean-shell, mollusc-shell, or cuttle-bone material at the facility gate. |
| how_much | 1 kg of declared product mass. |
| how_well | Product shall state source route, material family, moisture basis, grade or particle-size class when applicable, and legal or provenance evidence. |
| how_long_or_cycle | One production batch or reporting period, normalized to the reference flow. |
| reference_flow_link | reference_product_flow |

| Field | Value |
| --- | --- |
| reference_amount | 1 kg |
| reference_product_flow | Coral and similar products, shells of molluscs, crustaceans or echinoderms and cuttle-bone `9d3c928f-f381-4d92-8452-944adaf37906` |
| reference_flow_property | Mass `93a60a56-a3c8-11da-a746-0800200b9a66` |
| reference_unit_group | Units of mass `93a60a57-a4c8-11da-a746-0800200c9a66` |
| reference_unit | kg |
| required_qualifiers | source route; material family; moisture basis; grade or particle-size class where applicable; legal or provenance evidence |

## 3. Measurement and Unit Rules

| rule_id | applies_to | required_property | required_unit | rule |
| --- | --- | --- | --- | --- |
| reference_mass | Reference product and all product or waste mass flows | Mass `93a60a56-a3c8-11da-a746-0800200b9a66` | kg | Normalize product outputs, rejected material, residues, and packaging waste to kg per 1 kg declared reference product. |
| declared_moisture_basis | Raw and cleaned source material | Mass `93a60a56-a3c8-11da-a746-0800200b9a66` | kg | State whether mass is wet, air-dry, oven-dry, or contract-declared moisture basis. Convert only when measured moisture evidence is available. |
| water_volume_or_mass | Washing, desalting, or cleaning water | Mass or volume | kg or m3 | Report water as measured facility records. If volume is used, retain the original unit and conversion basis. |
| fuel_or_energy_basis | Collection, drying, crushing, grading, and packaging energy | Energy or mass | kWh, MJ, L, or kg | Record the original fuel or electricity unit before normalization. Convert to reference flow only after preserving source records. |
| particle_size_declaration | Crushed, powdered, or graded product | Declared grade | mm or declared class | Particle-size class is a product qualifier, not a separate reference unit, unless the dataset declares a distinct product flow. |

## 4. System Boundary

The default boundary starts at the declared source material being received or directly collected for this product category. Upstream ecological formation of shells, coral-like material, or cuttle-bone is outside the foreground production boundary unless the operator directly controls aquaculture, harvesting, or habitat intervention. The dataset shall disclose the source route and shall include any directly controlled collection, receipt, cleaning, drying, sorting, size-reduction, packaging, and facility waste handling.

### Boundary Abstraction

| Field | Value |
| --- | --- |
| declared_starting_condition | declared_source_material_received |
| starting_condition_role | The first foreground-controlled material state is source material received, collected, salvaged, or purchased for CPC 04911 processing. |
| product_classification_scope | CPC 3.0 code 04911 only. Same-category inputs remain in scope and must not be hidden as generic upstream material. |
| recursive_input_rule | If CPC 04911 material is used as an input to produce CPC 04911 output, report it as a same-category product input with its own source route, mass, and quality qualifiers. Do not relabel it as an unspecified mineral input. |
| upstream_dataset_requirement | When source material is purchased or supplied by another operator, link a supplier dataset or disclose source route, geography, collection method, and legal or provenance evidence. |
| disclosure | Disclose controlled collection activity, rejected material fate, wastewater or brine fate, dust controls, packaging type, moisture basis, and unresolved Tiangong UUID substitutions. |

## 5. Allocation Rules

Avoid allocation where a batch can be separated by measured product grade, material family, or product destination. When a batch produces several saleable grades of CPC 04911 material, allocate shared washing, drying, sorting, and packaging burdens by dry or declared product mass unless a reviewed market-value rule is documented. Rejects, wastewater, brine, and dust are outputs requiring treatment or emission modelling, not co-products, unless the operator demonstrates a saleable recovered material dataset with a separate reference flow.

## 6. Process Inventory

| process_id | process_name | inclusion | inclusion_condition | role | quantitative_reference |
| --- | --- | --- | --- | --- | --- |
| source_receipt_and_provenance | Source receipt and provenance | required | Always included for CPC 04911 datasets. | Establish source route, accepted mass, rejected mass, and legal or provenance state. | Accepted source material entering preparation. |
| washing_drying_and_sorting | Washing, drying, and sorting | required | Include when the product is cleaned, dried, desalted, sorted, graded, or otherwise prepared before gate release. | Convert source material into cleaned sorted reference material and record cleaning residues. | Cleaned sorted product mass. |
| size_reduction_packaging_and_delivery | Size reduction, packaging, and gate release | conditional | Include when crushing, grinding, grading, bagging, palletizing, cold or dry storage, or direct delivery to gate is foreground controlled. | Declare final gate product state, packaging, and direct facility releases. | Declared product at gate. |

### Process: Source receipt and provenance (`source_receipt_and_provenance`)

#### Inputs

##### Product flows

###### Source material received (`declared_source_material_received`)

As the incoming source material record, this row captures material identity, route, and accepted mass before preparation.

- Selected flow: Coral and similar products, shells of molluscs, crustaceans or echinoderms and cuttle-bone `9d3c928f-f381-4d92-8452-944adaf37906`
- Flow property / unit: Mass; kg
- Amount: Measured incoming mass by batch, supplier delivery note, receiving scale, or direct collection log before rejection adjustment.
- Value mode: Foreground record (`foreground_record`)
- Specificity: Site-specific (`site_specific`)
- Basis: Incoming batch or reporting-period receipt record before normalization.
- Basis kind: Process output (`process_output`)
- Evidence kind: Collected record (`collected_record`)
- Collection protocol: `cp_source_material_receipt`
- Range: Provisional source material receipt screening estimate
  - Range role: Default estimate (`default_estimate`)
  - Lower: 1
  - Upper: 20
  - Unit: kg/kg declared product
  - Basis: broad first-pass received source material per kg declared product before receipt rejection and preparation loss
  - Basis kind: Reference flow (`reference_flow`)
  - Evidence kind: Reasoned estimate (`reasoned_estimate`)

###### Collection or delivery fuel (`collection_or_delivery_fuel`)

Use this row only for directly controlled collection, vessel, truck, loader, or internal transport fuel before facility receipt. Purchased delivered material may report this as supplier dataset input instead.

- Selected flow: Diesel oil `9d258d75-6792-4f1c-9856-81602ed8f816`
- Flow property / unit: Fuel quantity; L, kg, MJ, or kWh as recorded
- Amount: Measured fuel or energy use for directly controlled collection or delivery, normalized to accepted source material.
- Value mode: Foreground record (`foreground_record`)
- Specificity: Route-specific (`route_specific`)
- Basis: Direct collection or delivery transport service associated with the accepted source material.
- Basis kind: Transport service (`transport_service`)
- Evidence kind: Collected record (`collected_record`)
- Collection protocol: `cp_collection_or_delivery_energy`
- Range: Provisional collection or delivery fuel screening estimate
  - Range role: Default estimate (`default_estimate`)
  - Lower: 0
  - Upper: 1
  - Unit: L diesel-equivalent/kg accepted source material
  - Basis: broad first-pass directly controlled collection or delivery fuel per kg accepted source material
  - Basis kind: Transport service (`transport_service`)
  - Evidence kind: Reasoned estimate (`reasoned_estimate`)

##### Waste flows

###### Receipt rejects and non-target residue (`receipt_rejects_and_non_target_residue`)

This row records stones, mixed debris, non-target shells, biological residue, or nonconforming material removed at receipt.

- Selected flow: Select route-specific reject or residue waste flow
- Flow property / unit: Mass; kg
- Amount: Measured rejected mass and declared fate for material removed before washing or sorting.
- Value mode: Foreground record (`foreground_record`)
- Specificity: Site-specific (`site_specific`)
- Basis: Rejected mass relative to incoming received source material.
- Basis kind: Process output (`process_output`)
- Evidence kind: Collected record (`collected_record`)
- Collection protocol: `cp_reject_and_residue_records`
- Range: Mass-balance QA guardrail
  - Range role: QA guardrail (`qa_guardrail`)
  - Lower: 0
  - Upper: 1
  - Unit: kg/kg received source material
  - Basis: mass fraction of received source material
  - Basis kind: Process output (`process_output`)
  - Evidence kind: Method formula (`method_formula`)
  - Sources: `mass-balance-identity`

##### Elementary flows

###### Collection area or habitat interaction indicator (`collection_area_or_habitat_interaction_indicator`)

This row is a foreground disclosure indicator for directly controlled collection from coastal, marine, aquaculture, salvage, or processing-residue routes. Select a more specific Tiangong elementary flow when one is available.

- Selected flow: Select route-specific collection area, habitat interaction, or legal harvest disclosure flow
- Flow property / unit: Area, count, permit descriptor, or narrative record
- Amount: Record collection area, permit identifier, salvage source, aquaculture source, or processing-residue source when foreground collection is controlled.
- Value mode: Foreground record (`foreground_record`)
- Specificity: Route-specific (`route_specific`)
- Basis: Source route disclosure associated with accepted source material.
- Basis kind: Process output (`process_output`)
- Evidence kind: Collected record (`collected_record`)
- Collection protocol: `cp_collection_area_records`

#### Outputs

##### Product flows

###### Accepted raw biogenic mineral material (`accepted_raw_biogenic_mineral_material`)

The process output is the mass accepted into preparation after receipt checks and before washing, drying, or sorting.

- Selected flow: Coral and similar products, shells of molluscs, crustaceans or echinoderms and cuttle-bone `9d3c928f-f381-4d92-8452-944adaf37906`
- Flow property / unit: Mass; kg
- Amount: Accepted incoming mass after receipt rejection, carried forward to preparation.
- Value mode: Calculated value (`calculated_value`)
- Specificity: Site-specific (`site_specific`)
- Basis: Incoming source material minus receipt rejects, before normalization to the final reference flow.
- Basis kind: Process output (`process_output`)
- Evidence kind: Calculated from collection (`calculated_from_collection`)
- Collection protocol: `cp_source_material_receipt`
- Range: Accepted material QA guardrail
  - Range role: QA guardrail (`qa_guardrail`)
  - Lower: 0
  - Upper: 1
  - Unit: kg/kg received source material
  - Basis: accepted fraction of received source material
  - Basis kind: Process output (`process_output`)
  - Evidence kind: Method formula (`method_formula`)
  - Sources: `mass-balance-identity`

##### Waste flows

No additional waste output is expected beyond receipt rejects unless route-specific handling creates separate waste records.

##### Elementary flows

No default elementary output is specified for this receipt process. Add route-specific emissions when directly measured or required by local modelling rules.

### Process: Washing, drying, and sorting (`washing_drying_and_sorting`)

#### Inputs

##### Product flows

###### Raw material input for washing and sorting (`raw_material_input_for_washing_and_sorting`)

This row transfers accepted raw material into the cleaning and preparation process.

- Selected flow: Coral and similar products, shells of molluscs, crustaceans or echinoderms and cuttle-bone `9d3c928f-f381-4d92-8452-944adaf37906`
- Flow property / unit: Mass; kg
- Amount: Accepted raw material mass entering washing, desalting, drying, and sorting.
- Value mode: Calculated value (`calculated_value`)
- Specificity: Site-specific (`site_specific`)
- Basis: Output from source receipt and provenance.
- Basis kind: Process output (`process_output`)
- Evidence kind: Calculated from collection (`calculated_from_collection`)
- Collection protocol: `cp_source_material_receipt`
- Range: Provisional raw material input screening estimate
  - Range role: Default estimate (`default_estimate`)
  - Lower: 1
  - Upper: 20
  - Unit: kg/kg cleaned sorted product
  - Basis: broad first-pass raw material input entering washing and sorting per kg cleaned sorted product
  - Basis kind: Process output (`process_output`)
  - Evidence kind: Reasoned estimate (`reasoned_estimate`)

###### Washing or desalting water (`washing_or_desalting_water`)

Water shall be recorded when washing, desalting, or wet cleaning occurs.

- Selected flow: Process water `ec205030-248c-496f-9cf2-06d9d26dc6ff`
- Flow property / unit: Mass or volume; kg or m3
- Amount: Metered water withdrawal, purchased water, or tank refill records used for washing or desalting.
- Value mode: Foreground record (`foreground_record`)
- Specificity: Site-specific (`site_specific`)
- Basis: Water use per cleaned sorted product output.
- Basis kind: Process output (`process_output`)
- Evidence kind: Collected record (`collected_record`)
- Collection protocol: `cp_washing_water_records`
- Range: Provisional washing water screening estimate
  - Range role: Default estimate (`default_estimate`)
  - Lower: 0
  - Upper: 20
  - Unit: L/kg cleaned sorted product
  - Basis: broad first-pass washing or desalting water use per kg cleaned sorted output
  - Basis kind: Process output (`process_output`)
  - Evidence kind: Reasoned estimate (`reasoned_estimate`)

###### Washing, drying, and sorting energy (`washing_drying_and_sorting_energy`)

This row covers electricity, thermal fuel, compressed air, or other directly metered preparation energy. Select the actual Tiangong flow used by the facility.

- Selected flow: Select electricity, thermal fuel, or equipment energy flow used for washing, drying, and sorting
- Flow property / unit: Energy or fuel quantity; kWh, MJ, L, or kg
- Amount: Metered or allocated energy use for washing, desalting, drying, sorting, grading, and related material handling.
- Value mode: Foreground record (`foreground_record`)
- Specificity: Site-specific (`site_specific`)
- Basis: Energy use per cleaned sorted product output.
- Basis kind: Process output (`process_output`)
- Evidence kind: Collected record (`collected_record`)
- Collection protocol: `cp_preparation_energy_records`
- Range: Provisional preparation energy screening estimate
  - Range role: Default estimate (`default_estimate`)
  - Lower: 0
  - Upper: 10
  - Unit: kWh/kg cleaned sorted product
  - Basis: broad first-pass washing, drying, sorting, and material-handling energy per kg cleaned sorted output
  - Basis kind: Process output (`process_output`)
  - Evidence kind: Reasoned estimate (`reasoned_estimate`)

##### Waste flows

No waste input is expected for this process.

##### Elementary flows

No elementary input is expected by default.

#### Outputs

##### Product flows

###### Cleaned sorted reference material (`cleaned_sorted_reference_material`)

This row is the prepared material output before optional size reduction, packaging, or direct gate release.

- Selected flow: Coral and similar products, shells of molluscs, crustaceans or echinoderms and cuttle-bone `9d3c928f-f381-4d92-8452-944adaf37906`
- Flow property / unit: Mass; kg
- Amount: Measured cleaned and sorted mass by declared moisture basis and grade.
- Value mode: Foreground record (`foreground_record`)
- Specificity: Site-specific (`site_specific`)
- Basis: Cleaned sorted product output from the preparation process.
- Basis kind: Process output (`process_output`)
- Evidence kind: Collected record (`collected_record`)
- Collection protocol: `cp_cleaned_product_mass`
- Range: Cleaned yield QA guardrail
  - Range role: QA guardrail (`qa_guardrail`)
  - Lower: 0
  - Upper: 1
  - Unit: kg/kg raw material input
  - Basis: cleaned sorted yield
  - Basis kind: Process output (`process_output`)
  - Evidence kind: Method formula (`method_formula`)
  - Sources: `mass-balance-identity`

##### Waste flows

###### Washing wastewater or brine (`washing_wastewater_or_brine`)

Record this row when wet washing, desalting, or cleaning generates liquid waste, brine, sludge, or sent-to-treatment wastewater.

- Selected flow: Select route-specific wastewater, brine, or sludge waste flow
- Flow property / unit: Mass or volume; kg or m3
- Amount: Measured or balance-derived wastewater, brine, sludge, or sent-to-treatment quantity and fate.
- Value mode: Foreground record (`foreground_record`)
- Specificity: Site-specific (`site_specific`)
- Basis: Liquid waste quantity per cleaned sorted product output.
- Basis kind: Process output (`process_output`)
- Evidence kind: Collected record (`collected_record`)
- Collection protocol: `cp_wastewater_records`
- Range: Provisional wastewater or brine screening estimate
  - Range role: Default estimate (`default_estimate`)
  - Lower: 0
  - Upper: 25
  - Unit: L/kg cleaned sorted product
  - Basis: broad first-pass liquid waste quantity per kg cleaned sorted output
  - Basis kind: Process output (`process_output`)
  - Evidence kind: Reasoned estimate (`reasoned_estimate`)

###### Organic residue, sediment, and sorting rejects (`organic_residue_sediment_and_rejects`)

This row covers biological residue, sediment, off-grade fragments, and other rejects removed during washing, drying, or sorting.

- Selected flow: Select route-specific organic residue, sediment, or sorting reject waste flow
- Flow property / unit: Mass; kg
- Amount: Measured reject mass and fate from washing, drying, and sorting.
- Value mode: Foreground record (`foreground_record`)
- Specificity: Site-specific (`site_specific`)
- Basis: Reject mass per cleaned sorted product output.
- Basis kind: Process output (`process_output`)
- Evidence kind: Collected record (`collected_record`)
- Collection protocol: `cp_reject_and_residue_records`
- Range: Washing and sorting reject QA guardrail
  - Range role: QA guardrail (`qa_guardrail`)
  - Lower: 0
  - Upper: 1
  - Unit: kg/kg raw material input
  - Basis: reject fraction from washing and sorting
  - Basis kind: Process output (`process_output`)
  - Evidence kind: Method formula (`method_formula`)
  - Sources: `mass-balance-identity`

##### Elementary flows

###### Dust or particulate matter from dry handling (`dust_or_particulate_matter_from_dry_handling`)

Use this row when drying, brushing, screening, or dry sorting creates directly measured dust or when a reviewed facility factor is applied.

- Selected flow: Select applicable particulate matter emission flow
- Flow property / unit: Mass; kg
- Amount: Measured dust collection losses, filter catches, or calculated particulate release from dry handling records.
- Value mode: Calculated value (`calculated_value`)
- Specificity: Technology-specific (`technology_specific`)
- Basis: Dust or particulate release per cleaned sorted product output.
- Basis kind: Process output (`process_output`)
- Evidence kind: Calculated from collection (`calculated_from_collection`)
- Collection protocol: `cp_dust_records`
- Range: Provisional dust release screening estimate
  - Range role: Default estimate (`default_estimate`)
  - Lower: 0
  - Upper: 0.2
  - Unit: kg/kg cleaned sorted product
  - Basis: broad first-pass dust, fines, or particulate release per kg cleaned sorted output
  - Basis kind: Process output (`process_output`)
  - Evidence kind: Reasoned estimate (`reasoned_estimate`)

### Process: Size reduction, packaging, and gate release (`size_reduction_packaging_and_delivery`)

#### Inputs

##### Product flows

###### Cleaned material for size reduction or packing (`cleaned_material_for_size_reduction_or_packing`)

This row transfers cleaned material into crushing, grinding, grading, bagging, or direct gate release.

- Selected flow: Coral and similar products, shells of molluscs, crustaceans or echinoderms and cuttle-bone `9d3c928f-f381-4d92-8452-944adaf37906`
- Flow property / unit: Mass; kg
- Amount: Cleaned sorted mass entering optional size reduction, packaging, storage, or direct gate release.
- Value mode: Foreground record (`foreground_record`)
- Specificity: Site-specific (`site_specific`)
- Basis: Cleaned sorted material before final product declaration.
- Basis kind: Process output (`process_output`)
- Evidence kind: Collected record (`collected_record`)
- Collection protocol: `cp_cleaned_product_mass`
- Range: Provisional cleaned material transfer screening estimate
  - Range role: Default estimate (`default_estimate`)
  - Lower: 1
  - Upper: 5
  - Unit: kg/kg declared product
  - Basis: broad first-pass cleaned material entering final preparation per kg declared product
  - Basis kind: Reference flow (`reference_flow`)
  - Evidence kind: Reasoned estimate (`reasoned_estimate`)

###### Packaging material (`packaging_material`)

Use this row when bags, drums, pallets, liners, labels, or bulk packaging are foreground controlled.

- Selected flow: Select applicable packaging material flow
- Flow property / unit: Mass or count; kg or item count
- Amount: Measured packaging material used for the declared product quantity.
- Value mode: Foreground record (`foreground_record`)
- Specificity: Product-specific (`product_specific`)
- Basis: Packaging used per declared product at gate.
- Basis kind: Reference flow (`reference_flow`)
- Evidence kind: Collected record (`collected_record`)
- Collection protocol: `cp_packaging_records`
- Range: Provisional packaging material screening estimate
  - Range role: Default estimate (`default_estimate`)
  - Lower: 0
  - Upper: 0.5
  - Unit: kg/kg declared product
  - Basis: broad first-pass packaging material per kg declared product at gate
  - Basis kind: Reference flow (`reference_flow`)
  - Evidence kind: Reasoned estimate (`reasoned_estimate`)

###### Size reduction, packaging, or storage energy (`size_reduction_packaging_or_storage_energy`)

This row covers foreground electricity or fuel for crushing, grinding, grading, bagging, palletizing, storage, and direct gate handling.

- Selected flow: Select electricity or fuel flow used for size reduction, packaging, storage, or gate handling
- Flow property / unit: Energy or fuel quantity; kWh, MJ, L, or kg
- Amount: Metered or allocated energy use for final product preparation and gate release.
- Value mode: Foreground record (`foreground_record`)
- Specificity: Site-specific (`site_specific`)
- Basis: Energy use per declared product at gate.
- Basis kind: Reference flow (`reference_flow`)
- Evidence kind: Collected record (`collected_record`)
- Collection protocol: `cp_size_reduction_packaging_energy`
- Range: Provisional final preparation energy screening estimate
  - Range role: Default estimate (`default_estimate`)
  - Lower: 0
  - Upper: 10
  - Unit: kWh/kg declared product
  - Basis: broad first-pass size reduction, packaging, storage, and gate-handling energy per kg declared product
  - Basis kind: Reference flow (`reference_flow`)
  - Evidence kind: Reasoned estimate (`reasoned_estimate`)

##### Waste flows

No waste input is expected for this process.

##### Elementary flows

No elementary input is expected by default.

#### Outputs

##### Product flows

###### Declared product at gate (`declared_product_at_gate`)

This row is the reference product output used for the final dataset normalization.

- Selected flow: Coral and similar products, shells of molluscs, crustaceans or echinoderms and cuttle-bone `9d3c928f-f381-4d92-8452-944adaf37906`
- Flow property / unit: Mass; kg
- Amount: Final declared product mass at facility gate, by moisture basis and grade or particle-size class.
- Value mode: Foreground record (`foreground_record`)
- Specificity: Product-specific (`product_specific`)
- Basis: Declared reference product at the facility gate.
- Basis kind: Reference flow (`reference_flow`)
- Evidence kind: Collected record (`collected_record`)
- Collection protocol: `cp_final_product_mass`
- Range: Declared product reference flow identity
  - Range role: QA guardrail (`qa_guardrail`)
  - Lower: 1
  - Upper: 1
  - Unit: kg/kg declared product
  - Basis: declared product reference flow at the facility gate
  - Basis kind: Reference flow (`reference_flow`)
  - Evidence kind: Method formula (`method_formula`)
  - Sources: `mass-balance-identity`

##### Waste flows

###### Packaging and off-size waste (`packaging_and_offsize_waste`)

This row records packaging scrap, off-size fragments, fines, and nonconforming product removed during final preparation.

- Selected flow: Select route-specific packaging scrap, off-size material, or fines waste flow
- Flow property / unit: Mass; kg
- Amount: Measured packaging scrap, off-size material, fines, or rejected final product mass and fate.
- Value mode: Foreground record (`foreground_record`)
- Specificity: Site-specific (`site_specific`)
- Basis: Waste from final preparation per declared product at gate.
- Basis kind: Reference flow (`reference_flow`)
- Evidence kind: Collected record (`collected_record`)
- Collection protocol: `cp_packaging_waste_records`
- Range: Provisional packaging and off-size waste screening estimate
  - Range role: Default estimate (`default_estimate`)
  - Lower: 0
  - Upper: 0.5
  - Unit: kg/kg declared product
  - Basis: broad first-pass final preparation waste per kg declared product at gate
  - Basis kind: Reference flow (`reference_flow`)
  - Evidence kind: Reasoned estimate (`reasoned_estimate`)

##### Elementary flows

###### Fossil carbon dioxide from direct fuel combustion (`fossil_co2_from_direct_fuel_combustion`)

Use this row only when direct fuel combustion emissions are modelled inside the foreground unit process instead of represented through linked fuel combustion datasets.

- Selected flow: Carbon dioxide, fossil, air `08a91e70-3ddc-11dd-923d-0050c2490048`
- Flow property / unit: Mass; kg
- Amount: Calculated fossil carbon dioxide from directly combusted foreground fuels when combustion is inside the reporting boundary.
- Value mode: Calculated value (`calculated_value`)
- Specificity: Technology-specific (`technology_specific`)
- Basis: Direct fuel inventory for final preparation and gate handling.
- Basis kind: Fuel inventory (`fuel_inventory`)
- Evidence kind: Calculated from collection (`calculated_from_collection`)
- Collection protocol: `cp_direct_fuel_combustion_records`
- Range: Provisional direct fuel fossil CO2 screening estimate
  - Range role: Default estimate (`default_estimate`)
  - Lower: 0
  - Upper: 20
  - Unit: kg CO2/kg declared product
  - Basis: broad first-pass fossil carbon dioxide from direct fuel combustion per kg declared product
  - Basis kind: Fuel inventory (`fuel_inventory`)
  - Evidence kind: Reasoned estimate (`reasoned_estimate`)

## 7. Same-Category Input and Cut-Off Rules

Same-category CPC 04911 material inputs remain visible product inputs. They may not be cut off as unspecified natural mineral material. Ancillary flows may be excluded only when a program-specific cut-off rule permits exclusion and the dataset records the excluded flow type, reason, and expected relevance. Legal or provenance disclosures, wastewater fate, residue fate, and final product moisture basis are not cut-off candidates.

## 8. Foreground Data Collection

### Data Collection Protocols

| protocol_id | process_id | flow_role | record_type | raw_fields | collection_method | unit | frequency | temporal_coverage | site_scope | aggregation_rule | quality_evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| cp_source_material_receipt | source_receipt_and_provenance | source material received and accepted raw material | receiving record | batch_id, source_route, material_family, supplier_or_collection_site, received_mass, rejected_mass, accepted_mass, moisture_basis, legal_or_provenance_record | Weighbridge, floor scale, supplier delivery note, or direct collection log reconciled to batch record | kg | each batch | reporting period or production campaign | receiving facility and controlled collection route | Sum accepted mass by source route and normalize to final declared product mass | scale calibration, delivery tickets, batch ledger, provenance or permit records |
| cp_collection_or_delivery_energy | source_receipt_and_provenance | collection or delivery fuel | energy and transport log | vehicle_or_vessel_id, route, distance, fuel_type, fuel_quantity, energy_quantity, allocation_basis | Fuel invoices, tank logs, vehicle logs, vessel logs, or metered charging records | L, kg, MJ, or kWh | each trip or monthly | reporting period | directly controlled collection or delivery routes | Allocate to accepted source material by mass or measured trip load | fuel invoices, odometer or trip logs, meter records |
| cp_collection_area_records | source_receipt_and_provenance | collection area or habitat indicator | route and legal disclosure record | source_route, geography, collection_area, permit_id, salvage_or_byproduct_source, collection_method, restrictions | Permit review, supplier declaration, geospatial record, or site collection log | m2, permit id, or descriptive record | each source route | reporting period | collection area, supplier source, or processing-residue source | Retain route-specific disclosure with accepted source material mass | permit, supplier attestation, collection log, traceability record |
| cp_reject_and_residue_records | source_receipt_and_provenance | receipt and sorting rejects | waste and residue record | batch_id, reject_type, mass, fate, treatment_destination, moisture_basis | Weighed rejects, waste transfer note, disposal ticket, or internal residue ledger | kg | each batch or disposal event | reporting period | receiving and preparation facility | Sum by reject type and fate, then normalize to reference product | scale record, waste transfer note, disposal invoice |
| cp_washing_water_records | washing_drying_and_sorting | washing or desalting water | utility record | meter_id, water_source, water_quantity, batch_id, cleaning_step, allocation_basis | Water meter, tank refill log, purchased water invoice, or batch cleaning record | m3 or kg | batch, shift, or monthly | reporting period | washing and desalting operations | Allocate to cleaned sorted output by measured batch or production time | meter reading, invoice, batch log |
| cp_preparation_energy_records | washing_drying_and_sorting | washing drying and sorting energy | energy record | meter_id, equipment_id, fuel_type, energy_quantity, operating_time, allocation_basis | Sub-meter, main meter allocation, fuel invoice, or equipment runtime log | kWh, MJ, L, or kg | batch, shift, or monthly | reporting period | preparation equipment | Allocate to cleaned sorted output by sub-metered quantity, runtime, or production mass | meter record, invoice, equipment runtime log |
| cp_cleaned_product_mass | washing_drying_and_sorting | cleaned sorted product | production output record | batch_id, cleaned_mass, moisture_basis, grade, particle_size_class, destination | Scale ticket, batch production ledger, or inventory transfer record | kg | each batch | reporting period | preparation facility | Sum by declared grade and normalize to final declared product mass | scale calibration, batch ledger, inventory record |
| cp_wastewater_records | washing_drying_and_sorting | wastewater or brine | liquid waste record | batch_id, wastewater_quantity, brine_quantity, sludge_quantity, treatment_destination, discharge_or_transfer_record | Flow meter, tank volume balance, treatment plant record, or waste transfer note | m3 or kg | batch, shift, or disposal event | reporting period | washing and treatment system | Sum by fate and normalize to cleaned sorted output or reference flow | meter record, treatment log, discharge permit record, transfer note |
| cp_dust_records | washing_drying_and_sorting | dust or particulate matter | dust control and loss record | equipment_id, dust_collected, filter_change_mass, visible_release_record, emission_factor_if_used | Dust collector records, filter mass, housekeeping records, or reviewed facility factor | kg | shift, batch, or maintenance event | reporting period | dry handling and dust-control equipment | Calculate particulate release or collected dust per cleaned sorted output | maintenance record, filter log, calculation worksheet |
| cp_packaging_records | size_reduction_packaging_and_delivery | packaging material | packaging inventory record | packaging_type, packaging_mass, item_count, product_mass_packed, supplier_record | Packaging purchase records, inventory issue records, bill of materials, or packing line logs | kg or item count | batch or monthly | reporting period | packing line or warehouse | Normalize packaging to declared product at gate | purchase record, inventory issue, packing log |
| cp_size_reduction_packaging_energy | size_reduction_packaging_and_delivery | final preparation energy | energy record | meter_id, equipment_id, fuel_type, energy_quantity, operating_time, allocation_basis | Sub-meter, fuel invoice, equipment runtime log, or allocation worksheet | kWh, MJ, L, or kg | batch, shift, or monthly | reporting period | crushing, grinding, grading, packing, storage, and gate handling | Allocate to declared product at gate by sub-metered quantity, runtime, or production mass | meter record, invoice, runtime log |
| cp_final_product_mass | size_reduction_packaging_and_delivery | declared product at gate | final production and sales record | batch_id, final_mass, moisture_basis, grade, particle_size_class, packaging_state, dispatch_record | Final scale ticket, warehouse release, sales dispatch record, or inventory closeout | kg | each batch or dispatch | reporting period | facility gate | Sum conforming declared product mass by product state | scale record, dispatch record, inventory closeout |
| cp_packaging_waste_records | size_reduction_packaging_and_delivery | packaging and off-size waste | final waste record | waste_type, mass, fate, disposal_or_rework_destination, batch_id | Weighed scrap, rework record, waste transfer note, or disposal invoice | kg | batch or disposal event | reporting period | final preparation and packing area | Sum by fate and normalize to declared product at gate | scale record, rework ledger, transfer note |
| cp_direct_fuel_combustion_records | size_reduction_packaging_and_delivery | direct fuel combustion emissions | fuel combustion calculation record | fuel_type, fuel_quantity, heating_value_or_density, emission_factor, combustion_scope | Fuel invoice, tank log, and reviewed emission-factor calculation | kg CO2 or fuel unit | batch or reporting period | reporting period | direct combustion equipment inside foreground boundary | Calculate fossil CO2 from foreground fuel quantity when combustion is modelled directly | fuel record, factor source, calculation worksheet |

### Calculation Rules

| rule_id | applies_to | formula_or_rule | inputs | output | source_ids |
| --- | --- | --- | --- | --- | --- |
| calculate_accepted_source_mass | source_receipt_and_provenance | accepted_mass = received_mass - receipt_reject_mass, with all masses on the declared moisture basis. | received_mass; receipt_reject_mass | accepted raw biogenic mineral material | `mass-balance-identity` |
| normalize_to_reference_flow | all foreground rows | normalized_amount = measured_or_calculated_amount / final_declared_product_mass. Keep the raw record and normalized result. | measured amount; final_declared_product_mass | amount per 1 kg reference product | `mass-balance-identity` |
| calculate_cleaned_yield | washing_drying_and_sorting | cleaned_yield = cleaned_sorted_mass / raw_material_input_mass on the same declared moisture basis. | cleaned_sorted_mass; raw_material_input_mass | cleaned sorted yield | `mass-balance-identity` |
| calculate_direct_fuel_co2_if_modelled | size_reduction_packaging_and_delivery | fossil_CO2 = foreground_fuel_quantity x reviewed fuel emission factor when direct combustion is inside the foreground boundary. | fuel_quantity; emission_factor | fossil carbon dioxide elementary flow | `ipcc-2006-combustion` |

### Data Quality Requirements

| requirement_id | applies_to | requirement | evidence |
| --- | --- | --- | --- |
| dq_source_identity | all source material records | State material family, source route, geography, and legal or provenance basis for each source route. | supplier declaration, permit, traceability document, or collection log |
| dq_mass_balance | source receipt, preparation, and final gate product | Received mass, rejects, cleaned output, final product, and waste masses shall reconcile within facility-defined weighing tolerance. | batch mass balance worksheet and scale records |
| dq_moisture_basis | all product and waste mass records | Declare wet, air-dry, oven-dry, or contract moisture basis and do not mix bases without measured conversion evidence. | moisture test, contract basis, or batch declaration |
| dq_wastewater_fate | washing and desalting operations | Identify wastewater, brine, sludge, discharge, reuse, treatment, or transfer fate. | treatment log, discharge record, transfer note, or permit evidence |
| dq_dust_controls | dry handling operations | Report whether dust is captured, emitted, internally recycled, or treated as waste. | filter logs, dust collector records, or maintenance logs |
| dq_packaging_state | packed product datasets | Declare packaging material type, packaging mass or count, and packed product mass. | bill of materials, packing log, or inventory issue record |

## 9. Validation Rules

A conforming dataset shall provide the reference flow UUID, mass property UUID, unit group UUID, source route, material family, declared moisture basis, and final product mass. Required processes shall have foreground collection records or explicit zero-activity declarations. Required product and waste mass records shall reconcile by batch or reporting period. Route-specific unresolved flow choices shall be reviewed before publication when a more precise Tiangong flow exists. Same-category CPC 04911 inputs shall remain explicit product inputs and shall not be hidden as generic mineral or waste inputs.

## 10. Published Dataset Profile

| Field | Value |
| --- | --- |
| dataset_role | unit_process |
| downstream_use | secondary_dataset; background_dataset |
| allowed_use | Use as a foreground unit process or linked secondary dataset for CPC 04911 material at facility gate when source route, moisture basis, and processing state match the consuming model. |
| excluded_use | Do not use for live aquatic animal production, food products, finished jewellery or decorative articles, synthetic calcium carbonate, or datasets lacking source route and legal or provenance disclosure. |
| required_metadata | PCR id, PCR version, CPC code 04911, product title, source route, material family, geography, reporting period, moisture basis, grade or particle-size class, final product mass, Tiangong UUID substitutions, and unresolved flow notes. |
| required_quality_disclosure | Report mass balance completeness, source identity evidence, wastewater or brine fate, residue fate, dust-control treatment, packaging state, and any allocation rule used for multiple grades. |
| update_trigger | Update when Tiangong UUID mappings change, CPC mapping changes, source route or legal disclosure rules change, or reviewed range and collection evidence improves. |

## 11. Data Sources

| source_id | type | reference | used_for |
| --- | --- | --- | --- |
| unsd-cpc-3-0-04911 | official_guidance | United Nations Statistics Division, Central Product Classification Version 3.0, code 04911. | Product classification identity and included product scope. |
| cites-stony-corals | official_guidance | CITES guidance and listings for stony corals and related trade controls, as applicable by route and geography. | Legal and provenance disclosure for coral-like source routes. |
| fao-responsible-fisheries-code | official_guidance | FAO Code of Conduct for Responsible Fisheries. | Responsible source-route disclosure for fishery and aquaculture by-product routes. |
| codex-fish-code | official_guidance | Codex Code of Practice for Fish and Fishery Products. | Hygiene and handling context for shellfish by-product and residue source routes where applicable. |
| iso-14067-2018 | standard | ISO 14067:2018 Greenhouse gases - Carbon footprint of products - Requirements and guidelines for quantification. | General product carbon footprint boundary, data quality, and reporting alignment. |
| mass-balance-identity | method_factor | Conservation of mass applied as a PCR calculation identity for batch input, output, and reject reconciliation. | QA guardrails, yield calculations, and normalization rules. |
| ipcc-2006-combustion | method_factor | IPCC 2006 Guidelines for National Greenhouse Gas Inventories, stationary and mobile combustion factor approach. | Direct fuel combustion carbon dioxide calculation when foreground combustion is modelled directly. |
