---
pcr_id: pcr.agriculture-forestry-and-fishery-products.products-of-agriculture-horticulture-and-market-gardening.wheat-seed
language: zh-CN
status: candidate
sync_with: pcr.en-US.md
---

# 小麦播种种子

## 1. 范围与适用性

本 PCR 用于指导构建清选后小麦播种种子的前景数据包，包括认证种子、基础种、登记种或类似种子等级。范围覆盖繁种田、采后种子加工、可选种子处理、包装、储存以及至声明交付边界的交付。

排除产品为食用、饲用、淀粉、乙醇或商品交易用小麦籽粒。

## 2. 产品类别识别

| 字段 | 值 |
| --- | --- |
| canonical_pcr_id | `pcr.agriculture-forestry-and-fishery-products.products-of-agriculture-horticulture-and-market-gardening.wheat-seed` |
| classification_refs | CPC 3.0 `01111`, `Wheat, seed` |
| covered_products | 用于播种的清选小麦种子，包括认证种、基础种、登记种或类似种子等级 |
| excluded_products | 食用、饲用、淀粉、乙醇或商品交易用小麦籽粒 |
| representative_product | 已按声明含水率清选和分级的小麦播种种子 |
| production_route | 种子繁殖田加采后种子加工 |
| market_state | 清选、分级、包装、可选药剂处理后，在种子加工厂门或区域交付点交付的小麦种子 |

## 3. 参考流

| 字段 | 值 |
| --- | --- |
| What | 清选后小麦播种种子 |
| How much | 1 kg |
| How well | 声明种子等级、处理状态、含水率基准、物理净度和发芽率 |
| How long or cycle | 一个种子生产作物周期；纳入储存时另行声明储存时长 |
| reference_flow_link | 见下方参考数量和参考产品流 |

| 字段 | 值 |
| --- | --- |
| 参考数量 | 1 kg |
| 参考产品流 | Wheat `12da5e7d-9b93-4404-8c7d-08f98bec6238` |
| 参考流属性 | Mass `93a60a56-a3c8-11da-a746-0800200b9a66` |
| 参考单位组 | Units of mass `93a60a57-a4c8-11da-a746-0800200c9a66` |
| 参考单位 | kg |
| 必需限定信息 | 种子等级或认证等级；处理状态；含水率基准；物理净度；发芽率；地理范围和声明交付边界；包装状态 |

构建前景数据包时，`必需限定信息` 中列出的信息应在数据集元数据、过程说明、参考流备注、产品说明或等效数据包字段中明确声明。缺失必需限定信息的数据包视为参考流定义不完整。

质量是主要参考流基准。粒数数据需要同时提供千粒重或其他透明质量换算。

## 4. 计量与单位规则

| rule_id | 适用对象 | 必需流属性 | 必需单位 | 规则 |
| --- | --- | --- | --- | --- |
| `reference_mass` | 参考产品 | Mass `93a60a56-a3c8-11da-a746-0800200b9a66` | kg | 参考流必须以 kg 清选后小麦播种种子表示。 |
| `seed_count_conversion` | 可选粒数数据 | Mass `93a60a56-a3c8-11da-a746-0800200b9a66` | kg | 只有在提供千粒重或其他透明质量换算时，才可使用粒数数据。 |
| `fertilizer_n_basis` | 氮肥投入和氮排放 | Mass `93a60a56-a3c8-11da-a746-0800200b9a66` | kg | 计算氮排放时，氮肥应同时记录 kg product 和 kg N。 |
| `energy_inventory` | 电力、燃料和干燥能源 | Net calorific value `93a60a56-a3c8-11da-a746-0800200c9a66` | MJ or kWh | 每个能源清单行必须声明所用能源单位，并保留可换算信息。 |
| `packaging_count` | 按件数记录的包装数据 | Number of items `01846770-4cfe-4a25-8ad9-919d8d378345` | item | 采用包装件数数据时，如包装材料数量按质量计算，必须同时声明袋容量或质量。 |

种子质量属性作为质量参考流的前景属性记录：

| 属性 | 常用单位 | 常见范围 | 来源 id |
| --- | --- | --- | --- |
| 含水率 | 湿基百分比 | 10-14 percent | `fao-wheat-seed-production` |
| 物理净度 | 质量百分比 | 95-99.9 percent | `fao-wheat-seed-production` |
| 发芽率 | 种子百分比 | 85-98 percent | `fao-wheat-seed-production`, `umn-small-grain-seeding-rate` |
| 千粒重 | g/1000 seeds | 25-60 g | `unl-wheat-seeding-rate`, `umn-small-grain-seeding-rate` |
| 种子处理载量 | g active ingredient/kg seed | 按产品确定 |  |

## 5. 系统边界

默认边界为小麦种子生产至声明交付边界的前景数据采集：

1. 来源种批、肥料、燃料、电力、植保产品、种子处理药剂、包装，以及纳入前景数据包时的相关运输记录。
2. 田间繁种：整地、播种、施肥、必要时灌溉、植保、重要时纳入田检、收获和田间干燥。
3. 种子加工：干燥、清选、分级、检测、药剂处理、包装和储存。
4. 当参考流为送达种子时，包含至声明交付边界的运输。

前景数据包覆盖至声明交付边界的小麦种子生产。使用该种子开展下游小麦种植的数据构建属于发布后使用场景，在数据集元数据中声明。资本品、土地占用和土地转化在声明的数据包范围包含时记录。

该边界是一种数据生产概化。声明的繁殖用来源种批作为前景数据包的繁殖起点。来源种批承载品种和种批身份；种子生物质形成通过田间物质流和基本流表达，包括水、养分、土地使用、排放，以及声明时的生物碳核算。

### 边界概化

| 字段 | 值 |
| --- | --- |
| declared_starting_condition | source_seed_lot |
| starting_condition_role | identity_and_reproduction_condition |
| product_classification_scope | 当前 CPC 3.0 产品类别 `01111`, `Wheat, seed` |
| recursive_input_rule | 与目标产品属于同一产品类别并造成递归追溯的输入流记录为声明起点 |
| upstream_dataset_requirement | 来源种批披露和采集协议记录 |
| disclosure | 记录来源种批身份、繁殖等级、质量、含水率基准、处理状态、供应方或来源田块和证据 |

## 6. 过程清单结构

### 过程图

| process_id | 过程名称 | 纳入状态 | 纳入条件 | 数据角色 | 定量参考 |
| --- | --- | --- | --- | --- | --- |
| field_seed_multiplication | 田间繁种 | required |  | 前景 | 收获种子作物 |
| seed_conditioning_and_treatment | 种子加工与处理 | required |  | 前景 | 清选后种子输出 |
| storage_and_delivery | 储存与交付 | conditional | 当声明边界为送达种子或储存对参考流有显著影响时纳入 | 前景/下游 | 已交付种子 |

### 过程：field_seed_multiplication

#### 输入

##### 产品流

| 流角色 | 选定流 | 天工 UUID | 流属性/单位 | 数量 | amount_kind | 基准 | basis_kind | evidence_kind | collection_protocol_id | source_ids |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 繁殖用来源种批 | Wheat | `12da5e7d-9b93-4404-8c7d-08f98bec6238` | Mass / kg | 按现场记录实测质量 | site_specific | 每 1,000 kg 收获种子作物 | process_output | collected_record | cp_source_seed_lot_mass | `unl-wheat-seeding-rate`, `umn-small-grain-seeding-rate` |
| 氮肥载体 | Urea | `3f8850c0-f718-4c4b-8fcb-8fd42e03aa8e` | Mass / kg | 计量产品质量和 kg N | site_specific | 每 1,000 kg 收获种子作物 | process_output | collected_record | cp_fertilizer_input_records | `ipcc-2019-managed-soils-n2o` |
| 磷肥 | Phosphate fertilizer | `9c196b01-6aad-4252-a6e8-f853853a830c` | Mass / kg | 计量产品质量 | site_specific | 每 1,000 kg 收获种子作物 | process_output | collected_record | cp_fertilizer_input_records |  |
| 钾肥 | Potassium fertilizer | `dd008d87-16e4-4e85-a048-b9949f6fbca6` | Mass / kg | 计量产品质量 | site_specific | 每 1,000 kg 收获种子作物 | process_output | collected_record | cp_fertilizer_input_records |  |
| 作为产品投入的灌溉水 | Irrigation water | `4ad684b1-8e85-4dee-8d9c-55d1fa2d4432` | Mass / kg | 计量灌溉水质量 | site_specific | 每 1,000 kg 收获种子作物 | process_output | collected_record | cp_irrigation_water_records |  |
| 田间机械燃料 | Diesel, burned in agricultural machinery | `57e0b1a3-2d05-46b2-b61b-cf7b5b167c6f` | Mass / kg | 计量田间燃料用量 | site_specific | 每 1,000 kg 收获种子作物 | process_output | collected_record | cp_field_fuel_records |  |
| 植保产品，除草剂代理流 | Herbicide | `c1370404-9e2b-4ed6-ba96-c094f74e0f2d` | Mass / kg | 计量有效成分或制剂产品质量 | product_specific | 按有效成分或制剂产品 | process_output | collected_record | cp_crop_protection_records |  |
| 植保产品，杀菌剂代理流 | Azoxystrobin | `8a1f4968-6428-413f-a50b-b413bf9190cf` | Mass / kg | 计量有效成分或制剂产品质量 | product_specific | 按有效成分或制剂产品 | process_output | collected_record | cp_crop_protection_records |  |
| 植保产品，杀虫剂代理流 | Insecticide | `ba2ec0c8-d5da-4ca8-bf9f-317478a1ce1b` | Mass / kg | 计量有效成分或制剂产品质量 | product_specific | 按有效成分或制剂产品 | process_output | collected_record | cp_crop_protection_records |  |

##### 废物流

田间繁种过程通常不需要废物输入。只有当再利用有机物料或回收灌溉水以废物来源输入跨越过程边界时，才单独纳入。

##### 基本流

| 流角色 | 选定流 | 天工 UUID | 流属性/单位 | 数量 | amount_kind | 基准 | basis_kind | evidence_kind | collection_protocol_id | source_ids |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 土地占用 | 选择适用的土地占用基本流 |  | Area-time / ha a | 计量田块面积和作物周期 | site_specific | 每个作物周期 | crop_cycle | collected_record | cp_land_use_records |  |
| 取水 | water | `419682fe-60fb-4b43-be89-bf2824b51104` | Mass / kg | 由灌溉水记录计算 | formula | 每 1,000 kg 收获种子作物 | process_output | calculated_from_collection | cp_irrigation_water_records |  |

#### 输出

##### 产品流

| 流角色 | 选定流 | 天工 UUID | 流属性/单位 | 数量 | amount_kind | 基准 | basis_kind | evidence_kind | collection_protocol_id | source_ids |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 收获小麦种子作物 | Wheat | `12da5e7d-9b93-4404-8c7d-08f98bec6238` | Mass / kg | 实测收获质量 | site_specific | 田间子过程定量参考 | process_output | collected_record | cp_harvested_seed_mass |  |
| 秸秆或田间残余 | Wheat straw | `bcaf0254-cdd3-43d1-823a-2f69df3801d8` | Mass / kg | 跨越边界时计量残余物质量 | site_specific | 每 1,000 kg 收获种子作物 | process_output | collected_record | cp_field_residue_records |  |

##### 废物流

若有离开田间边界并进入处理的田间废物，应单独声明。

##### 基本流

| 流角色 | 选定流 | 天工 UUID | 流属性/单位 | 数量 | amount_kind | 基准 | basis_kind | evidence_kind | collection_protocol_id | source_ids |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 土壤直接 N2O，以空气排放记录 | nitrous oxide, emissions to air unspecified | `08a91e70-3ddc-11dd-94c3-0050c2490048` | Mass / kg | 根据 N 投入计算；IPCC EF1 默认值为施用 N 的 1 percent，以 N2O-N 计 | formula | 按 N 投入 | n_input | method_formula | | `ipcc-2019-managed-soils-n2o` |
| 氨挥发 | ammonia, emissions to air unspecified | `08a91e70-3ddc-11dd-a2a9-0050c2490048` | Mass / kg | 按地点或区域排放方法确定 | site_specific | 按 N 投入 | n_input | method_formula | | `ipcc-2019-managed-soils-n2o` |
| 硝酸盐淋失 | nitrate, emissions to fresh water | `4d9a8790-3ddd-11dd-8d68-0050c2490048` | Mass / kg | 按地点或区域排放方法确定 | site_specific | 按 N 投入 | n_input | method_formula | | `ipcc-2019-managed-soils-n2o` |
| 田间能源导致的化石二氧化碳 | carbon dioxide (fossil), emissions to air unspecified | `08a91e70-3ddc-11dd-923d-0050c2490048` | Mass / kg | 由田间燃料记录和排放因子计算 | formula | 按燃料清单 | fuel_inventory | calculated_from_collection | cp_field_fuel_records |  |

### 过程：seed_conditioning_and_treatment

#### 输入

##### 产品流

| 流角色 | 选定流 | 天工 UUID | 流属性/单位 | 数量 | amount_kind | 基准 | basis_kind | evidence_kind | collection_protocol_id | source_ids |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 收获种子作物输入 | Wheat | `12da5e7d-9b93-4404-8c7d-08f98bec6238` | Mass / kg | 1,000-1,250 kg | range | 每 1,000 kg 清选种子输出 | process_output | external_source | | `usda-seed-cleaning-handling` |
| 干燥、清选、分级、药剂处理和包装用电 | alternating current | `4d0361a3-56cc-45f9-aa42-bb9103285bf9` | Net calorific value / MJ or kWh | 计量用电量 | site_specific | 每 1,000 kg 清选种子输出 | process_output | collected_record | cp_conditioning_energy_records | `usda-seed-cleaning-handling` |
| 种子处理杀菌剂代理流 | Azoxystrobin | `8a1f4968-6428-413f-a50b-b413bf9190cf` | Mass / kg | 计量有效成分或制剂产品质量 | product_specific | 每 kg 处理种子 | process_output | collected_record | cp_seed_treatment_records |  |
| 种子处理杀虫剂代理流 | Insecticide | `ba2ec0c8-d5da-4ca8-bf9f-317478a1ce1b` | Mass / kg | 计量有效成分或制剂产品质量 | product_specific | 每 kg 处理种子 | process_output | collected_record | cp_seed_treatment_records |  |
| 包装单元 | Woven polypropylene bag | `9bfaad07-355e-467a-9bab-f95094e7c869` | Number of items / item | 计量包装袋数量和容量 | site_specific | 每 1,000 kg 包装种子 | process_output | collected_record | cp_packaging_input_records |  |

##### 废物流

种子加工通常不需要废物输入。只有当再利用包装或回收材料以废物来源输入跨越过程边界时，才单独纳入。

##### 基本流

当加工设施记录显示直接粉尘排放、直接用水或现场燃烧排放时，纳入对应直接基本流。

#### 输出

##### 产品流

| 流角色 | 选定流 | 天工 UUID | 流属性/单位 | 数量 | amount_kind | 基准 | basis_kind | evidence_kind | collection_protocol_id | source_ids |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 清选后小麦播种种子 | Wheat | `12da5e7d-9b93-4404-8c7d-08f98bec6238` | Mass / kg | 实测清选种子质量 | site_specific | PCR 参考输出 | reference_flow | collected_record | cp_cleaned_seed_mass |  |
| 若种子加工厂拥有残余物，市场化秸秆 | Wheat straw | `bcaf0254-cdd3-43d1-823a-2f69df3801d8` | Mass / kg | 可选 | not_applicable | 仅当纳入种子加工厂边界时 | process_output | source_rule | |  |

##### 废物流

| 流角色 | 选定流 | 天工 UUID | 流属性/单位 | 数量 | amount_kind | 基准 | basis_kind | evidence_kind | collection_protocol_id | source_ids |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 筛下物、不合格种子、粉尘和等外物 | Rejects | `e6d6aa78-105e-4acc-a84b-46f68765a1cc` | Mass / kg | 实测不合格物质量 | site_specific | 每 1,000 kg 清选种子输出 | process_output | collected_record | cp_reject_mass | `usda-seed-cleaning-handling` |
| 包装废弃物 | 选择适用的包装废物流 |  | Mass / kg | 计量包装废弃物质量 | site_specific | 每 1,000 kg 包装种子 | process_output | collected_record | cp_packaging_waste_records |  |

##### 基本流

| 流角色 | 选定流 | 天工 UUID | 流属性/单位 | 数量 | amount_kind | 基准 | basis_kind | evidence_kind | collection_protocol_id | source_ids |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 清选粉尘排入空气 | 选择适用的颗粒物基本流 |  | Mass / kg | 计量或计算清选粉尘质量 | site_specific | 每 1,000 kg 清选种子输出 | process_output | collected_record | cp_cleaning_dust_records | `usda-seed-cleaning-handling` |
| 加工能源导致的化石二氧化碳 | carbon dioxide (fossil), emissions to air unspecified | `08a91e70-3ddc-11dd-923d-0050c2490048` | Mass / kg | 由加工能源记录和排放因子计算 | formula | 按过程清单 | fuel_inventory | calculated_from_collection | cp_conditioning_energy_records |  |

### 过程：storage_and_delivery

#### 输入

##### 产品流

| 流角色 | 选定流 | 天工 UUID | 流属性/单位 | 数量 | amount_kind | 基准 | basis_kind | evidence_kind | collection_protocol_id | source_ids |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 储存用电 | alternating current | `4d0361a3-56cc-45f9-aa42-bb9103285bf9` | Net calorific value / MJ or kWh | 计量储存用电量 | site_specific | 按储存时长 | storage_duration | collected_record | cp_storage_energy_records |  |
| 交付运输燃料 | Diesel oil | `9d258d75-6792-4f1c-9856-81602ed8f816` | Mass / kg | 计量交付燃料或按路线估算燃料 | route_specific | 每 tonne-km | transport_service | collected_record | cp_delivery_transport_records |  |

##### 废物流

通常不需要废物输入。

##### 基本流

只有当研究目标要求或有测量数据时，才纳入直接储存排放。

#### 输出

##### 产品流

| 流角色 | 选定流 | 天工 UUID | 流属性/单位 | 数量 | amount_kind | 基准 | basis_kind | evidence_kind | collection_protocol_id | source_ids |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 已声明交付边界产品 | Wheat | `12da5e7d-9b93-4404-8c7d-08f98bec6238` | Mass / kg | 计量交付种子质量 | site_specific | 当参考流为送达种子时 | reference_flow | collected_record | cp_delivered_seed_mass |  |

##### 废物流

| 流角色 | 选定流 | 天工 UUID | 流属性/单位 | 数量 | amount_kind | 基准 | basis_kind | evidence_kind | collection_protocol_id | source_ids |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 储存损耗或受损种子 | Rejects | `e6d6aa78-105e-4acc-a84b-46f68765a1cc` | Mass / kg | 计量储存损耗或受损种子质量 | site_specific | 每 1,000 kg 储存种子 | process_output | collected_record | cp_storage_loss_records |  |

##### 基本流

| 流角色 | 选定流 | 天工 UUID | 流属性/单位 | 数量 | amount_kind | 基准 | basis_kind | evidence_kind | collection_protocol_id | source_ids |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 储存或运输能源导致的化石二氧化碳 | carbon dioxide (fossil), emissions to air unspecified | `08a91e70-3ddc-11dd-923d-0050c2490048` | Mass / kg | 由储存能源和交付运输记录计算 | formula | 按过程清单 | fuel_inventory | calculated_from_collection | cp_delivery_transport_records |  |

## 7. 分配与共产品处理

按以下顺序决策：

1. 通过细分种子生产、筛下物、秸秆管理和不合格物处理过程来避免分配。
2. 只有在被替代产品和市场有证据时，才使用替代法。
3. 当种子、筛下物和秸秆均为市场产品且价格数据可靠时，使用经济分配。
4. 质量分配仅作为兜底方法，并披露敏感性。

不合格种子、筛下物、秸秆和包装废弃物必须有声明去向，可为产品输出、废物处理、还田、翻埋、饲料利用、露天焚烧或其他有证据的路线。

## 8. 前景数据采集、计算与质量规则

### 数据采集协议

| protocol_id | process_id | flow_role | record_type | raw_fields | collection_method | unit | frequency | temporal_coverage | site_scope | aggregation_rule | quality_evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| cp_source_seed_lot_mass | field_seed_multiplication | 繁殖用来源种批 | 种批接收记录 | 种批编号；供应方或来源田块；繁殖等级；质量；含水率基准；种子等级 | 地磅、校准秤或供应商一手活动记录 | kg | 每个种批 | 作物周期 | 繁种场地 | 汇总种批质量并按收获种子输出归一化 | 秤校准记录、接收记录和种批证书 |
| cp_harvested_seed_mass | field_seed_multiplication | 收获小麦种子作物 | 收获和田间接收记录 | 田块编号；收获日期；收获质量；含水率基准 | 地磅或校准秤 | kg | 每次收获 | 作物周期 | 繁种场地 | 按声明含水率汇总收获质量 | 秤校准记录和收获记录 |
| cp_fertilizer_input_records | field_seed_multiplication | 肥料投入 | 投入施用记录 | 产品名称；养分含量；产品质量；施用日期；田块编号 | 农事作业记录、发票或施肥服务记录 | kg 产品和 kg 养分 | 每次施用 | 作物周期 | 繁种场地 | 汇总产品和养分质量并按收获种子输出归一化 | 发票、田间记录或施用服务记录 |
| cp_irrigation_water_records | field_seed_multiplication | 灌溉水 | 灌溉记录 | 水源；体积或质量；抽水时段；田块编号 | 水表读数、抽水记录或水费单 | kg 或 m3 换算为 kg | 每次灌溉 | 作物周期 | 灌溉繁种田块 | 汇总灌溉水并按需换算为质量 | 水表记录、抽水记录或水费单 |
| cp_field_fuel_records | field_seed_multiplication | 田间机械燃料 | 田间作业燃料记录 | 作业；机械；燃料类型；燃料数量；田块编号 | 燃料台账、发票或机械遥测记录 | kg 或 L 换算为 kg | 每次田间作业 | 作物周期 | 繁种场地 | 按作业汇总燃料并按收获种子输出归一化 | 燃料台账、发票或遥测记录 |
| cp_crop_protection_records | field_seed_multiplication | 植保产品 | 植保施用记录 | 产品名称；有效成分；制剂产品质量；施用日期；田块编号 | 农场喷施记录或植保服务记录 | kg 有效成分或 kg 产品 | 每次施用 | 作物周期 | 繁种场地 | 汇总有效成分或产品质量并按收获种子输出归一化 | 喷施记录、产品标签或施用服务记录 |
| cp_land_use_records | field_seed_multiplication | 土地占用 | 田块面积记录 | 田块编号；播种面积；作物周期时长 | 农场田块记录或 GIS 面积记录 | ha 和作物周期 | 每个作物周期 | 作物周期 | 繁种场地 | 需要面积时间时将面积乘以作物周期 | 田块图、GIS 记录或农场记录 |
| cp_field_residue_records | field_seed_multiplication | 秸秆或田间残余 | 残余物处置记录 | 田块编号；残余物流；质量；去向 | 打包票据、称重记录或田间残余管理记录 | kg | 每次残余物处置 | 作物周期 | 繁种场地 | 汇总跨越边界的残余物质量并声明去向 | 称重记录、打包票据或田间记录 |
| cp_cleaned_seed_mass | seed_conditioning_and_treatment | 清选后小麦播种种子 | 加工输出记录 | 批次编号；清选种子质量；含水率基准；物理净度；发芽率 | 校准秤加种子质量检测记录 | kg | 每个清选种批 | 种子加工周期 | 种子加工设施 | 按声明含水率汇总合格清选种子批次 | 秤校准记录和种子质量检测记录 |
| cp_reject_mass | seed_conditioning_and_treatment | 筛下物、不合格种子、粉尘和等外物 | 加工不合格物流记录 | 批次编号；不合格物流类别；质量；去向 | 校准秤或容器质量平衡 | kg | 每个加工批次 | 种子加工周期 | 种子加工设施 | 汇总不合格物流并声明去向 | 称量记录、不合格物流台账和去向记录 |
| cp_conditioning_energy_records | seed_conditioning_and_treatment | 加工能源 | 设施能源记录 | 表计编号；能源类型；数量；期间；产线 | 表计读数、公用事业账单或设备日志 | kWh、MJ 或燃料 kg | 每个加工周期 | 种子加工周期 | 种子加工设施 | 将能源分配并按清选种子输出归一化 | 表计记录、公用事业账单或设备日志 |
| cp_seed_treatment_records | seed_conditioning_and_treatment | 种子处理药剂 | 种子处理施用记录 | 处理产品；有效成分；剂量；处理种子质量；批次编号 | 处理日志或供应商处理证明 | kg 有效成分或 kg 产品 | 每个处理批次 | 种子加工周期 | 种子加工设施 | 汇总处理药剂质量并按处理种子质量归一化 | 处理日志、产品标签或供应商证明 |
| cp_packaging_input_records | seed_conditioning_and_treatment | 包装单元 | 包装使用记录 | 包装类型；件数；容量；可得时的质量；批次编号 | 包装领用记录或包装线日志 | item，必要时 kg | 每个包装批次 | 种子加工周期 | 种子加工设施 | 汇总包装件数并在需要时换算为质量 | 包装线日志或包装库存记录 |
| cp_packaging_waste_records | seed_conditioning_and_treatment | 包装废弃物 | 包装废弃物记录 | 废物类型；质量；去向；批次或期间 | 称重记录或废弃物承包商记录 | kg | 每次废弃物转运或加工周期 | 种子加工周期 | 种子加工设施 | 按去向汇总包装废弃物 | 称重票据或废弃物承包商记录 |
| cp_cleaning_dust_records | seed_conditioning_and_treatment | 清选粉尘排入空气 | 粉尘收集或排放记录 | 集尘器质量；排放估算；运行期间 | 集尘器日志、维护记录或排放计算 | kg | 每个加工周期或运行期间 | 种子加工周期 | 种子加工设施 | 汇总收集或排放粉尘并按清选种子输出归一化 | 集尘器日志或排放计算 |
| cp_storage_energy_records | storage_and_delivery | 储存用电 | 储存能源记录 | 表计编号；能源数量；储存期间；储存质量 | 表计读数或公用事业账单 | kWh 或 MJ | 每个储存期间 | 声明储存时长 | 储存场地 | 按储存质量和时长分配储存能源 | 表计记录或公用事业账单 |
| cp_delivery_transport_records | storage_and_delivery | 交付运输燃料 | 运输服务记录 | 路线；距离；车辆；燃料数量或 tonne-km；交付质量 | 燃料台账、承运商发票或运输调度记录 | kg 燃料或 tonne-km | 每次运输 | 交付期间 | 声明交付路线 | 汇总路线运输服务并按交付种子归一化 | 承运商发票、调度记录或燃料台账 |
| cp_delivered_seed_mass | storage_and_delivery | 已声明交付边界产品 | 交付或发运记录 | 种批编号；交付质量；交付日期；接收方或交付边界；含水率基准 | 地磅、校准秤或发运记录 | kg | 每次发运 | 交付期间 | 声明交付路线 | 按声明含水率汇总交付种子质量 | 发运记录、称重票据或交付单 |
| cp_storage_loss_records | storage_and_delivery | 储存损耗或受损种子 | 储存损耗记录 | 种批编号；损耗质量；损伤类别；去向 | 库存盘点、称重记录或处置记录 | kg | 每个储存期间或种批 | 声明储存时长 | 储存场地 | 汇总储存损耗并声明去向 | 库存盘点、称重记录或处置记录 |

### 计算规则

| rule_id | Applies to | Formula or rule | Inputs | Output | source_ids |
| --- | --- | --- | --- | --- | --- |
| normalize_source_seed_lot_input | 来源种批投入 | 来源种批 kg / 收获种子 kg * 参考输出 | cp_source_seed_lot_mass; cp_harvested_seed_mass | 每参考输出的来源种批 kg |  |
| normalize_cleaning_yield | 种子加工产率 | 清选种子 kg / 收获种子作物输入 kg | cp_cleaned_seed_mass; harvested seed crop input record | 清选产率和不合格率 | `usda-seed-cleaning-handling` |
| calculate_water_withdrawal | 灌溉取水 | 将计量灌溉体积换算为质量并按收获种子输出归一化 | cp_irrigation_water_records; cp_harvested_seed_mass | 每参考输出的取水 kg |  |
| calculate_field_energy_co2 | 田间能源化石 CO2 | 燃料数量 * 声明燃料排放因子，并按收获种子输出归一化 | cp_field_fuel_records; cp_harvested_seed_mass | 每参考输出的田间能源化石 CO2 kg |  |
| calculate_conditioning_energy_co2 | 加工能源化石 CO2 | 加工能源数量 * 声明能源排放因子，并按清选种子输出归一化 | cp_conditioning_energy_records; cp_cleaned_seed_mass | 每参考输出的加工能源化石 CO2 kg |  |
| calculate_storage_delivery_energy_co2 | 储存和交付化石 CO2 | 储存能源和交付运输能源 * 声明排放因子，并按交付或储存种子归一化 | cp_storage_energy_records; cp_delivery_transport_records | 每参考输出的储存和交付能源化石 CO2 kg |  |

### 数据质量要求

| requirement_id | Applies to | Requirement | Evidence |
| --- | --- | --- | --- |
| dq_seed_identity | 种批和清选种子身份 | 参考流和来源种批必须声明种子等级、繁殖等级、处理状态、含水率基准、物理净度和发芽率。 | 种子证书、质量检测或接收记录 |
| dq_mass_records | 质量记录 | 质量数值必须标明记录日期、场地或批次、单位、相关含水率基准，以及计量设备或来源记录。 | 校准记录、地磅单、秤记录或供应商一手活动记录 |
| dq_temporal_coverage | 作物周期数据 | 田间生产数据应覆盖声明作物周期；天气敏感比较研究应披露使用一年数据还是多年平均数据。 | 作物年度生产记录 |

## 9. 校验规则

发布使用本 PCR 的前景数据包前，应检查：

- 参考流包含质量、交付边界、种子处理状态和种子质量限定
- 数据集元数据区分种子产品和普通商品粮
- 数据允许时，将田间繁种和种子加工拆成独立过程
- 肥料、燃料、灌溉、加工能源、包装和种子处理投入均已处理
- 范围内已考虑 N2O、氨、硝酸盐、化石 CO2、取水和土地占用
- 筛下物、不合格种子、秸秆和包装废弃物有声明去向
- 分配方法已声明并给出理由
- 所有超出常见范围的值都有来源说明和方法理由

## 10. 发布数据集画像

| 字段 | 值 |
| --- | --- |
| dataset_role | unit_process |
| downstream_use | secondary_dataset; background_dataset |
| allowed_use | 下游小麦种子或小麦种植数据构建，且种子等级、处理状态、地理范围、含水率基准和声明交付边界与数据集元数据匹配 |
| excluded_use | 商品粮小麦、声明路线外的种子生产，以及要求纳入但本数据集未覆盖的育种研发或资本品负荷的研究 |
| required_metadata | 参考流；地理范围；作物周期；种子等级；处理状态；含水率基准；物理净度；发芽率；声明交付边界；采集协议覆盖率；DQR |
| required_quality_disclosure | 记录覆盖率、计算规则、计量设备或一手记录、未解决缺项和数据质量评分 |
| update_trigger | 生产路线、地理范围、种子处理、加工技术、参考流限定信息、采集协议覆盖率或数据质量评分发生实质变化 |

## 11. 数据源

| 来源 ID | 类型 | 引用 | 用途 |
| --- | --- | --- | --- |
| `fao-wheat-seed-production` | 官方指南 | <https://www.fao.org/4/y4011e/y4011e0v.htm> | 种子认证、质量控制、种子质量属性和过程边界 |
| `unl-wheat-seeding-rate` | 推广指南 | <https://cropwatch.unl.edu/determining-seeding-rate-your-winter-wheat/> | 播种量和千粒重方法语境 |
| `umn-small-grain-seeding-rate` | 推广指南 | <https://extension.umn.edu/planting-small-grains/seeding-rate-small-grains> | 播种量公式、成苗损失和发芽率方法语境 |
| `usda-seed-cleaning-handling` | 官方手册 | <https://www.govinfo.gov/content/pkg/GOVPUB-A-PURL-gpo20323/pdf/GOVPUB-A-PURL-gpo20323.pdf> | 种子清选过程拆分和筛下物或不合格物方法语境 |
| `ipcc-2019-managed-soils-n2o` | 官方方法指南 | <https://www.ipcc-nggip.iges.or.jp/public/2019rf/pdf/4_Volume4/19R_V4_Ch11_Soils_N2O_CO2.pdf> | N2O 直接排放因子和氮排放计算 |
