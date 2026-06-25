---
pcr_id: pcr.agriculture-forestry-and-fishery-products.fish-crustaceans-molluscs-and-other-aquatic-invertebrates-products.farmed-abalone-live-fresh-or-chilled
language: zh-CN
status: candidate
sync_with: pcr.en-US.md
---

# 养殖鲍鱼，活、鲜或冷藏

## 1. 范围与适用性

本 PCR 用于指导构建养殖鲍鱼（Haliotis spp.）活、鲜或冷藏产品的前景数据包。范围覆盖声明的苗种或幼鲍来源、可选的场内育苗和中间培育、陆基水槽或流水槽、悬挂或网箱系统、声明的海区增养殖系统中的养成、采收、分级、活体暂养、冷藏、包装以及至声明边界的交付。

排除产品包括野生鲍鱼、冷冻、烟熏、干制、盐腌、盐水浸泡、熟制、罐装、其他加工或保藏鲍鱼、作为独立水产苗种投入销售的鲍鱼苗、缺少鲍鱼身份的通用贝类产品，以及具有独立非食品参考流的贝壳或肉类副产品。

## 2. 产品类别识别

| 字段 | 值 |
| --- | --- |
| canonical_pcr_id | `pcr.agriculture-forestry-and-fishery-products.fish-crustaceans-molluscs-and-other-aquatic-invertebrates-products.farmed-abalone-live-fresh-or-chilled` |
| classification_refs | CPC 3.0 `04412`, `Farmed abalone, live, fresh or chilled` |
| covered_products | 由水产养殖系统生产、以活、鲜或冷藏状态销售的 Haliotis spp.，包括带壳或声明去壳形态 |
| excluded_products | 野生鲍鱼；冷冻、烟熏、干制、盐腌、盐水浸泡、熟制、罐装、加工或保藏鲍鱼；作为苗种销售的水产苗种；贝壳废物或贝壳产品；非鲍鱼贝类 |
| representative_product | 达到声明市场规格和声明产品形态的活体或冷藏养殖鲍鱼 |
| production_route | 育苗或外购幼鲍投入、相关中间培育、养成管理、采收、分级、活体暂养或冷藏、包装和声明边界放行 |
| market_state | 声明物种、产品形态、养殖系统、规格等级、带壳或去壳状态和交付边界的活、鲜或冷藏鲍鱼 |

## 3. 参考流

| 字段 | 值 |
| --- | --- |
| What | 作为活、鲜或冷藏市场产品的养殖鲍鱼 |
| How much | 1 kg |
| How well | 声明物种或杂交类型、产品形态、活/鲜/冷藏状态、带壳或去壳基准、规格等级、采收和暂养条件以及养殖系统 |
| How long or cycle | 归一化到市场化产品输出的一个生产批次、采收批次或报告期 |
| reference_flow_link | 见下方参考数量和产品流 |

| 字段 | 值 |
| --- | --- |
| 参考数量 | 1 kg |
| 参考产品流 | Abalone `7b973a02-b45b-4f5a-a640-a9b5ae65584b` |
| 参考流属性 | Mass `93a60a56-a3c8-11da-a746-0800200b9a66` |
| 参考单位组 | Units of mass `93a60a57-a4c8-11da-a746-0800200c9a66` |
| 参考单位 | kg |
| 必需限定信息 | 物种或杂交类型；养殖系统；苗种或幼鲍来源；产品状态；带壳或去壳基准；规格等级；含水或沥水基准；地理范围和声明边界；暂养或冷藏时长；饲料制度；许可或认证状态 |

构建前景数据包时，`必需限定信息` 中列出的信息应在数据集元数据、过程说明、参考流备注、产品说明或等效数据包字段中明确声明。缺失必需限定信息的数据包视为参考流定义不完整。

质量是主要参考基准。采用计数记录时，必须保留平均个体质量和产品形态，使前景数据包能够将计数换算为 kg 产品。

## 4. 计量与单位规则

| rule_id | 适用对象 | 必需流属性 | 必需单位 | 规则 |
| --- | --- | --- | --- | --- |
| `reference_mass` | 参考产品 | Mass `93a60a56-a3c8-11da-a746-0800200b9a66` | kg | 参考流必须以声明活、鲜或冷藏产品形态下的 kg 养殖鲍鱼表示。 |
| `product_form_mass_basis` | 带壳、去壳、沥水或冷藏产品记录 | Mass `93a60a56-a3c8-11da-a746-0800200b9a66` | kg | 产品质量必须声明是带壳活重、带壳冷藏质量、去壳肉质量、沥水质量或其他合同声明基准。只有在有实测得率证据时才可换算。 |
| `count_to_mass_conversion` | 投苗、死亡、分级和销售计数记录 | Mass `93a60a56-a3c8-11da-a746-0800200b9a66` | kg | 计数记录必须包含平均个体质量、规格等级和抽样方法，之后才可归一化为 kg 参考产品。 |
| `water_volume_or_mass` | 海水取水、工艺用水、活体暂养水和废水 | Mass or volume | kg or m3 | 保留原始计量单位和换算基准。对于流水式或开放水域系统，应区分泵送水与通过养殖场地的环境水体。 |
| `feed_mass_basis` | 大型藻类、海藻、配合饲料和混合饲料 | Mass `93a60a56-a3c8-11da-a746-0800200b9a66` | kg | 饲料投入必须声明湿重、干重或原样质量。只有在有实测含水率或供应商数据时才可进行湿/干基换算。 |
| `energy_inventory` | 泵送、曝气、过滤、照明、冷藏、活体暂养和交付能源 | Energy or fuel quantity | kWh, MJ, L, or kg | 在归一化到参考流之前记录原始电力、燃料或能源载体单位。 |
| `feed_marine_fraction` | 含鱼粉、鱼油或其他海洋原料的配合饲料 | Mass fraction | kg/kg feed | 当使用海洋原料依赖或 ASC 饲料效率指标时，必须声明饲料组成或供应商配方。 |

关键产品属性作为质量参考流的前景限定信息记录：

| 属性 | 常用单位 | 必需处理 |
| --- | --- | --- |
| 物种或杂交类型 | 学名和通用名 | 所有数据集必填 |
| 养殖系统 | 陆基流水槽、RAS、悬挂网箱、海区增养殖或其他声明系统 | 用于系统边界和水排放解释，必填 |
| 产品形态 | 带壳活体、带壳鲜品、带壳冷藏、去壳鲜品或声明变体 | 用于质量基准解释，必填 |
| 规格等级 | 壳长、每 kg 个数或市场等级 | 使用计数或等级记录时必填 |
| 饲料制度 | 大型藻类、配合饲料、混合饲料或海区天然饵料 | 用于饲料清单和来源披露，必填 |

## 5. 系统边界

默认边界覆盖前景可控的养殖鲍鱼生产至声明养殖场、采收、包装场或交付边界：

1. 苗种或幼鲍来源；当报告主体控制育苗和中间培育时纳入场内育苗和中间培育活动；外购幼鲍时披露供应来源。
2. 养成管理，包括养殖单元、投苗、饲料、水体流动、曝气、过滤、防污清理、死亡管理、捕食者或逃逸控制以及直接控制的维护。
3. 采收、分级、必要时净化或暂养、活体暂养、冷藏、包装和声明边界放行。
4. 当参考产品为送达产品而非养殖场门或包装场门产品时，纳入至声明边界的交付。

资本品、基础设施建设和长期栖息地改变仅在声明的数据包范围要求时纳入。饲料和苗种上游数据集作为上游输入链接，除非同一运营者控制并在前景包中报告其生产。

### 边界概化

| 字段 | 值 |
| --- | --- |
| declared_starting_condition | declared_seed_or_juvenile_stocking_event |
| starting_condition_role | aquaculture_stock_identity_and_biological_starting_condition |
| product_classification_scope | 当前 CPC 3.0 产品类别 `04412`, `Farmed abalone, live, fresh or chilled` |
| recursive_input_rule | 用于生产商品鲍鱼的养殖鲍鱼苗种或幼鲍记录为带供应商或育苗披露的声明苗种/幼鲍起点，不递归作为成品参考产品输出追溯 |
| upstream_dataset_requirement | 苗种或幼鲍供应商数据集、场内育苗记录，或记录来源、物种、批次、质量或数量、规格、健康状态、认证或许可证据的文件 |
| disclosure | 披露物种或杂交类型、养殖系统、投苗批次、饲料制度、水源和排放路径、养成时长、死亡量、采收和暂养条件、产品形态、包装状态以及未解析的 Tiangong UUID 替代项 |

## 6. 过程清单结构

### 过程图

| process_id | 过程名称 | 纳入状态 | 纳入条件 | 数据角色 | 定量参考 |
| --- | --- | --- | --- | --- | --- |
| seed_supply_hatchery_and_nursery | 苗种供应、育苗与中间培育 | required | 必须声明外购苗种或场内育苗路径 | 前景/上游衔接 | 进入养成阶段的投放幼鲍 |
| growout_husbandry | 养成管理 | required |  | 前景生产 | 包装前的采收规格鲍鱼 |
| harvest_grading_and_live_holding | 采收、分级与活体暂养 | required |  | 前景调理和边界放行 | 声明的市场化活、鲜或冷藏鲍鱼 |
| delivery_to_declared_gate | 至声明边界交付 | conditional | 当参考流为超出养殖场门或包装场门的送达产品时纳入 | 前景运输 | 声明边界的送达产品 |

### 过程：苗种供应、育苗与中间培育（`seed_supply_hatchery_and_nursery`）

#### 输入

##### 产品流

###### 亲鲍、苗种或幼鲍投入（`seed_or_juvenile_abalone_input`）

本行记录进入前景生产路径的外购幼鲍、转入的中间培育苗种，或由亲鲍繁育得到的苗种。

- 选定流：Abalone `7b973a02-b45b-4f5a-a640-a9b5ae65584b`
- 流属性/单位：Mass or count with mean mass / kg or item
- 数量规则：进入声明养成批次的实测苗种或幼鲍数量和质量
- 数值来源模式：前景记录（`foreground_record`）
- 适用范围：场址特定（`site_specific`）
- 归一化基准：每 1,000 kg 市场化鲍鱼输出
- 基准类型：过程输出（`process_output`）
- 证据类型：采集记录（`collected_record`）
- 采集协议：`cp_seed_stocking_records`
- 来源：`fao-abalone-breeding-1990`, `ca-dfg-culture-of-abalone`
- 数量范围：暂定苗种投入筛选估算
  - 范围角色：默认估算（`default_estimate`）
  - 下限：0.01
  - 上限：2
  - 单位：kg seed or juvenile live mass/kg marketable abalone
  - 基准：苗种或幼鲍质量相对市场化输出的宽泛首轮估计
  - 基准类型：过程输出（`process_output`）
  - 证据类型：推理估算（`reasoned_estimate`）

###### 育苗和中间培育用水（`hatchery_nursery_water`）

本行覆盖场内育苗和中间培育使用的计量工艺水、海水或循环系统补充水。

- 选定流：Process water `ec205030-248c-496f-9cf2-06d9d26dc6ff`
- 流属性/单位：Mass or volume / kg or m3
- 数量规则：实测取水量、补充水量或循环更换水量
- 数值来源模式：前景记录（`foreground_record`）
- 适用范围：场址特定（`site_specific`）
- 归一化基准：每 1,000 kg 市场化鲍鱼输出，或归一化前按投苗批次记录
- 基准类型：过程输出（`process_output`）
- 证据类型：采集记录（`collected_record`）
- 采集协议：`cp_water_intake_and_discharge_records`
- 来源：`fao-abalone-breeding-1990`
- 数量范围：暂定育苗和中间培育用水筛选估算
  - 范围角色：默认估算（`default_estimate`）
  - 下限：0
  - 上限：1000
  - 单位：m3/1,000 kg marketable abalone
  - 基准：相对市场化输出的苗种生产泵送或供应用水宽泛首轮估计
  - 基准类型：过程输出（`process_output`）
  - 证据类型：推理估算（`reasoned_estimate`）

###### 育苗和中间培育电力（`hatchery_nursery_electricity`）

本行覆盖场内育苗或中间培育中泵、曝气、过滤、照明、藻类饵料培养、温控和水处理用电。

- 选定流：Electricity `f872677d-2f66-428a-a94e-f0fba61231df`
- 流属性/单位：Energy / kWh
- 数量规则：计量电力或分摊电力记录
- 数值来源模式：前景记录（`foreground_record`）
- 适用范围：场址特定（`site_specific`）
- 归一化基准：每 1,000 kg 市场化鲍鱼输出
- 基准类型：过程输出（`process_output`)
- 证据类型：采集记录（`collected_record`）
- 采集协议：`cp_energy_records`
- 来源：`asc-farm-standard-2025`
- 数量范围：暂定育苗用电筛选估算
  - 范围角色：默认估算（`default_estimate`）
  - 下限：0
  - 上限：5000
  - 单位：kWh/1,000 kg marketable abalone
  - 基准：相对市场化输出的场内育苗和中间培育用电宽泛首轮估计
  - 基准类型：过程输出（`process_output`）
  - 证据类型：推理估算（`reasoned_estimate`）

##### 废物流

###### 育苗死亡物和生物污损残留（`hatchery_mortalities_and_biofouling_residue`）

本行记录从场内育苗和中间培育系统移除的卵、幼体、幼鲍、生物污损、藻类残余、贝壳碎片或其他有机残留。

- 选定流：Select route-specific organic aquaculture residue or mortality waste flow
- 流属性/单位：Mass / kg
- 数量规则：实测或估计残留和死亡物质量，并声明去向
- 数值来源模式：前景记录（`foreground_record`）
- 适用范围：场址特定（`site_specific`）
- 归一化基准：按投放幼鲍批次记录，并在归一化后换算为每 1,000 kg 市场化输出
- 基准类型：过程输出（`process_output`）
- 证据类型：采集记录（`collected_record`）
- 采集协议：`cp_mortality_and_residue_records`
- 数量范围：暂定育苗残留筛选估算
  - 范围角色：默认估算（`default_estimate`）
  - 下限：0
  - 上限：1
  - 单位：kg residue/kg stocked juvenile live mass
  - 基准：残留或死亡物质量相对投放幼鲍活质量的宽泛首轮估计
  - 基准类型：过程输出（`process_output`）
  - 证据类型：推理估算（`reasoned_estimate`）

##### 基本流

苗种供应默认不指定基本流投入。当 Tiangong 身份和场址范围已选择时，加入场址特定海水取用、土地占用或海域占用流。

#### 输出

##### 产品流

###### 投放幼鲍（`stocked_juvenile_abalone`）

本输出将声明的苗种或幼鲍带入养成阶段。

- 选定流：Abalone `7b973a02-b45b-4f5a-a640-a9b5ae65584b`
- 流属性/单位：Mass or count with mean mass / kg or item
- 数量规则：育苗转移损失后的投放质量或数量
- 数值来源模式：计算值（`calculated_value`）
- 适用范围：场址特定（`site_specific`）
- 归一化基准：进入养成的投放幼鲍批次
- 基准类型：过程输出（`process_output`）
- 证据类型：基于采集记录计算（`calculated_from_collection`）
- 采集协议：`cp_seed_stocking_records`
- 数量范围：投苗质量平衡 QA 校验
  - 范围角色：QA 校验（`qa_guardrail`）
  - 下限：0
  - 上限：1
  - 单位：kg/kg seed or juvenile input
  - 基准：苗种接收、分选和中间培育转移后的投放幼鲍比例
  - 基准类型：过程输出（`process_output`）
  - 证据类型：方法公式（`method_formula`）
  - 来源：`mass-balance-identity`

##### 废物流

除已记录的育苗死亡物和残留外，不指定额外默认废物输出。

##### 基本流

苗种供应默认不指定基本流输出。当实测或规则要求时，加入来自场址特定水处理、化学品使用或燃料燃烧的直接排放。

### 过程：养成管理（`growout_husbandry`）

#### 输入

##### 产品流

###### 转入养成的投放幼鲍（`stocked_juvenile_transfer_to_growout`）

本行将投放幼鲍转入声明的养成系统。

- 选定流：Abalone `7b973a02-b45b-4f5a-a640-a9b5ae65584b`
- 流属性/单位：Mass or count with mean mass / kg or item
- 数量规则：按养殖单元记录的投放幼鲍质量或数量
- 数值来源模式：计算值（`calculated_value`）
- 适用范围：场址特定（`site_specific`）
- 归一化基准：归一化至采收前的养成批次
- 基准类型：过程输出（`process_output`）
- 证据类型：基于采集记录计算（`calculated_from_collection`）
- 采集协议：`cp_seed_stocking_records`
- 数量范围：暂定投放幼鲍转入估算
  - 范围角色：默认估算（`default_estimate`）
  - 下限：0.01
  - 上限：2
  - 单位：kg stocked juveniles/kg marketable abalone
  - 基准：每 kg 市场化输出的投放幼鲍质量宽泛首轮估计
  - 基准类型：过程输出（`process_output`）
  - 证据类型：推理估算（`reasoned_estimate`）

###### 大型藻类或海藻饲料（`macroalgae_or_seaweed_feed`）

本行记录供给鲍鱼养殖单元的海带、Laminaria、Gracilaria 或其他大型藻类饲料。

- 选定流：Laminaria `a79a3a63-1c4a-4cd4-83cc-5f3bc3cb70af`
- 流属性/单位：Mass / kg wet or dry basis declared
- 数量规则：投入养殖单元的实测饲料量，声明湿基或干基，并在重要时记录剩料
- 数值来源模式：前景记录（`foreground_record`）
- 适用范围：场址特定（`site_specific`）
- 归一化基准：每 1,000 kg 采收规格鲍鱼输出
- 基准类型：过程输出（`process_output`）
- 证据类型：采集记录（`collected_record`）
- 采集协议：`cp_feed_records`
- 来源：`seafood-watch-abalone-worldwide-2022`, `fao-abalone-breeding-1990`
- 数量范围：暂定大型藻类饲料筛选估算
  - 范围角色：默认估算（`default_estimate`）
  - 下限：0
  - 上限：30000
  - 单位：kg wet macroalgae/1,000 kg marketable abalone
  - 基准：每市场化输出的大型藻类湿料投喂量宽泛首轮估计
  - 基准类型：过程输出（`process_output`）
  - 证据类型：推理估算（`reasoned_estimate`）

###### 配合水产饲料（`formulated_aquaculture_feed`）

当配合颗粒或混合饲料补充或替代大型藻类饲料时使用本行。

- 选定流：Fry feed `3b09065d-9675-4dad-8d0e-1035b5cca324`
- 流属性/单位：Mass / kg as-fed or dry basis declared
- 数量规则：按产品和批次记录的实测饲料投入，并保留供应商配方或饲料类别
- 数值来源模式：前景记录（`foreground_record`）
- 适用范围：产品特定（`product_specific`）
- 归一化基准：每 1,000 kg 采收规格鲍鱼输出
- 基准类型：过程输出（`process_output`）
- 证据类型：采集记录（`collected_record`）
- 采集协议：`cp_feed_records`
- 来源：`asc-farm-standard-2025`, `seafood-watch-abalone-worldwide-2022`
- 数量范围：暂定配合饲料筛选估算
  - 范围角色：默认估算（`default_estimate`）
  - 下限：0
  - 上限：5000
  - 单位：kg formulated feed/1,000 kg marketable abalone
  - 基准：每市场化输出的配合饲料投入宽泛首轮估计
  - 基准类型：过程输出（`process_output`）
  - 证据类型：推理估算（`reasoned_estimate`）

###### 养成水体流动或补充水（`growout_water_movement_or_makeup`）

本行记录陆基或循环养成系统的泵送海水、补充水或供应水。对于开放海区增养殖或网箱系统，仅记录前景可控的泵送、冲洗或供应水。

- 选定流：Process water `ec205030-248c-496f-9cf2-06d9d26dc6ff`
- 流属性/单位：Mass or volume / kg or m3
- 数量规则：计量取水、泵送量或补充水量，并声明系统类型
- 数值来源模式：前景记录（`foreground_record`）
- 适用范围：技术特定（`technology_specific`）
- 归一化基准：每 1,000 kg 采收规格鲍鱼输出
- 基准类型：过程输出（`process_output`）
- 证据类型：采集记录（`collected_record`）
- 采集协议：`cp_water_intake_and_discharge_records`
- 来源：`asc-farm-standard-2025`
- 数量范围：暂定养成用水筛选估算
  - 范围角色：默认估算（`default_estimate`）
  - 下限：0
  - 上限：100000
  - 单位：m3/1,000 kg marketable abalone
  - 基准：跨 RAS、流水槽和流水式系统的泵送或供应用水宽泛首轮估计
  - 基准类型：过程输出（`process_output`）
  - 证据类型：推理估算（`reasoned_estimate`）

###### 养成电力（`growout_electricity`）

本行覆盖泵送、曝气、过滤、照明、传感器、自动投喂和养殖单元运行用电。

- 选定流：Electricity `f872677d-2f66-428a-a94e-f0fba61231df`
- 流属性/单位：Energy / kWh
- 数量规则：养成作业的计量电力或分摊电力记录
- 数值来源模式：前景记录（`foreground_record`）
- 适用范围：技术特定（`technology_specific`）
- 归一化基准：每 1,000 kg 采收规格鲍鱼输出
- 基准类型：过程输出（`process_output`）
- 证据类型：采集记录（`collected_record`）
- 采集协议：`cp_energy_records`
- 来源：`asc-abalone-standard-2012`, `asc-farm-standard-2025`
- 数量范围：暂定养成用电筛选估算
  - 范围角色：默认估算（`default_estimate`）
  - 下限：0
  - 上限：50000
  - 单位：kWh/1,000 kg marketable abalone
  - 基准：低能耗海区增养殖和高能耗陆基系统的每市场化输出用电宽泛首轮估计
  - 基准类型：过程输出（`process_output`）
  - 证据类型：推理估算（`reasoned_estimate`）

###### 养成燃料和作业船能源（`growout_fuel_and_workboat_energy`）

本行覆盖作业船、叉车、发电机、场内车辆或直接控制维护活动使用的柴油或其他燃料。

- 选定流：Diesel oil `9d258d75-6792-4f1c-9856-81602ed8f816`
- 流属性/单位：Fuel quantity / L, kg, or MJ
- 数量规则：实测燃料采购、油罐记录、船舶日志或分摊场内车辆燃料
- 数值来源模式：前景记录（`foreground_record`）
- 适用范围：路线特定（`route_specific`）
- 归一化基准：每 1,000 kg 采收规格鲍鱼输出
- 基准类型：燃料清单（`fuel_inventory`）
- 证据类型：采集记录（`collected_record`）
- 采集协议：`cp_fuel_and_transport_records`
- 数量范围：暂定养成燃料筛选估算
  - 范围角色：默认估算（`default_estimate`）
  - 下限：0
  - 上限：1000
  - 单位：L diesel-equivalent/1,000 kg marketable abalone
  - 基准：每市场化输出的直接控制燃料使用宽泛首轮估计
  - 基准类型：燃料清单（`fuel_inventory`）
  - 证据类型：推理估算（`reasoned_estimate`）

##### 废物流

###### 养成死亡物和贝壳残留（`growout_mortalities_and_shell_residue`）

本行记录养成期间移除的死亡物、贝壳、破损产品、捕食者损伤个体和有机残留。

- 选定流：Abalone shells `8caae24b-92f0-4ece-b1de-730bfbe4d9da`
- 流属性/单位：Mass / kg
- 数量规则：实测死亡数量、死亡质量、贝壳残留和处置或回收路径
- 数值来源模式：前景记录（`foreground_record`）
- 适用范围：场址特定（`site_specific`）
- 归一化基准：按养成批次记录，并在归一化后换算为每 1,000 kg 市场化输出
- 基准类型：过程输出（`process_output`）
- 证据类型：采集记录（`collected_record`）
- 采集协议：`cp_mortality_and_residue_records`
- 来源：`asc-farm-standard-2025`
- 数量范围：暂定死亡物和残留筛选估算
  - 范围角色：默认估算（`default_estimate`）
  - 下限：0
  - 上限：2
  - 单位：kg mortality or residue/kg marketable abalone
  - 基准：死亡物和残留质量相对市场化输出的宽泛首轮估计
  - 基准类型：过程输出（`process_output`）
  - 证据类型：推理估算（`reasoned_estimate`）

###### 养成废水或排放养殖水（`growout_wastewater_or_discharge`）

当养殖场存在点源排放或可控水处理过程时，本行记录排放水、污泥、沉降固体或废水处理输出。

- 选定流：Wastewater `bc2cd1d5-69d5-42d7-818f-38a69ebb18ef`
- 流属性/单位：Volume or mass / m3 or kg
- 数量规则：实测排放体积，或由取水量扣除循环量和留存水量计算
- 数值来源模式：计算值（`calculated_value`）
- 适用范围：技术特定（`technology_specific`）
- 归一化基准：每 1,000 kg 采收规格鲍鱼输出
- 基准类型：过程输出（`process_output`）
- 证据类型：基于采集记录计算（`calculated_from_collection`）
- 采集协议：`cp_water_intake_and_discharge_records`
- 来源：`asc-farm-standard-2025`
- 数量范围：暂定养成排放筛选估算
  - 范围角色：默认估算（`default_estimate`）
  - 下限：0
  - 上限：100000
  - 单位：m3/1,000 kg marketable abalone
  - 基准：跨 RAS、流水槽和流水式系统的可控排放宽泛首轮估计
  - 基准类型：过程输出（`process_output`）
  - 证据类型：推理估算（`reasoned_estimate`）

##### 基本流

###### 场内燃料燃烧直接二氧化碳（`direct_carbon_dioxide_from_fuel_combustion`）

仅当前景养殖场直接燃烧燃料且过程数据集未已承载燃烧排放时纳入本行。

- 选定流：carbon dioxide (fossil) `041f5d0e-6556-11dd-ad8b-0800200c9a66`
- 流属性/单位：Mass / kg
- 数量规则：当前景过程建模直接燃烧时，由计量燃料记录和选定排放因子计算
- 数值来源模式：计算值（`calculated_value`）
- 适用范围：场址特定（`site_specific`）
- 归一化基准：每 1,000 kg 采收规格鲍鱼输出
- 基准类型：燃料清单（`fuel_inventory`）
- 证据类型：基于采集记录计算（`calculated_from_collection`）
- 采集协议：`cp_fuel_and_transport_records`
- 数量范围：暂定直接 CO2 筛选估算
  - 范围角色：默认估算（`default_estimate`）
  - 下限：0
  - 上限：3000
  - 单位：kg CO2/1,000 kg marketable abalone
  - 基准：每市场化输出的直接燃料燃烧 CO2 宽泛首轮估计
  - 基准类型：燃料清单（`fuel_inventory`）
  - 证据类型：推理估算（`reasoned_estimate`）

#### 输出

##### 产品流

###### 采收规格养殖鲍鱼（`harvest_size_farmed_abalone`）

本行记录最终分级、活体暂养、冷藏或包装损失之前的养成输出。

- 选定流：Abalone `7b973a02-b45b-4f5a-a640-a9b5ae65584b`
- 流属性/单位：Mass / kg
- 数量规则：按批次、等级和产品形态实测的采收活质量
- 数值来源模式：前景记录（`foreground_record`）
- 适用范围：场址特定（`site_specific`）
- 归一化基准：养成过程定量参考
- 基准类型：过程输出（`process_output`）
- 证据类型：采集记录（`collected_record`）
- 采集协议：`cp_harvest_and_product_records`
- 数量范围：养成采收质量平衡 QA 校验
  - 范围角色：QA 校验（`qa_guardrail`）
  - 下限：0
  - 上限：1
  - 单位：kg/kg total live abalone biomass before harvest adjustment
  - 基准：声明批次中可采生物量的市场规格采收比例
  - 基准类型：过程输出（`process_output`）
  - 证据类型：方法公式（`method_formula`）
  - 来源：`mass-balance-identity`

##### 废物流

除养成死亡物、贝壳残留和可控水排放外，不指定额外默认废物输出。

##### 基本流

当实测或当地建模规则要求时，加入直接养分、化学品或栖息地相互作用基本流。

### 过程：采收、分级与活体暂养（`harvest_grading_and_live_holding`）

#### 输入

##### 产品流

###### 进入包装的采收鲍鱼（`harvested_abalone_input_to_packout`）

本行将采收规格鲍鱼转入分级、净化、活体暂养、冷藏和包装。

- 选定流：Abalone `7b973a02-b45b-4f5a-a640-a9b5ae65584b`
- 流属性/单位：Mass / kg
- 数量规则：进入包装的实测采收质量
- 数值来源模式：前景记录（`foreground_record`）
- 适用范围：场址特定（`site_specific`）
- 归一化基准：按包装批次
- 基准类型：过程输出（`process_output`）
- 证据类型：采集记录（`collected_record`）
- 采集协议：`cp_harvest_and_product_records`
- 数量范围：包装输入质量平衡 QA 校验
  - 范围角色：QA 校验（`qa_guardrail`）
  - 下限：0
  - 上限：2
  - 单位：kg/kg reference product
  - 基准：采收鲍鱼输入相对于声明市场化参考产品的比例
  - 基准类型：参考流（`reference_flow`）
  - 证据类型：方法公式（`method_formula`）
  - 来源：`mass-balance-identity`

###### 活体暂养和冷藏用水（`live_holding_and_chilling_water`）

本行记录采收后的净化、暂养、冰融水或活体暂养系统用水。

- 选定流：Process water `ec205030-248c-496f-9cf2-06d9d26dc6ff`
- 流属性/单位：Mass or volume / kg or m3
- 数量规则：净化、暂养、活体保持、冷藏和清洗用水或冰的实测使用量
- 数值来源模式：前景记录（`foreground_record`）
- 适用范围：场址特定（`site_specific`）
- 归一化基准：每 1,000 kg 参考产品
- 基准类型：参考流（`reference_flow`）
- 证据类型：采集记录（`collected_record`）
- 采集协议：`cp_water_intake_and_discharge_records`
- 数量范围：暂定暂养和冷藏用水筛选估算
  - 范围角色：默认估算（`default_estimate`）
  - 下限：0
  - 上限：2000
  - 单位：m3/1,000 kg reference product
  - 基准：每参考产品的活体暂养、净化和冷藏用水宽泛首轮估计
  - 基准类型：参考流（`reference_flow`）
  - 证据类型：推理估算（`reasoned_estimate`）

###### 包装出货电力（`packout_electricity`）

本行覆盖活体暂养、冷藏、泵、曝气、分级设备、称重和包装用电。

- 选定流：Electricity `f872677d-2f66-428a-a94e-f0fba61231df`
- 流属性/单位：Energy / kWh
- 数量规则：采收、分级、活体暂养、冷藏和包装的计量或分摊电力
- 数值来源模式：前景记录（`foreground_record`）
- 适用范围：场址特定（`site_specific`）
- 归一化基准：每 1,000 kg 参考产品
- 基准类型：参考流（`reference_flow`）
- 证据类型：采集记录（`collected_record`）
- 采集协议：`cp_energy_records`
- 数量范围：暂定包装出货用电筛选估算
  - 范围角色：默认估算（`default_estimate`）
  - 下限：0
  - 上限：5000
  - 单位：kWh/1,000 kg reference product
  - 基准：每参考产品的采收、暂养、冷藏和包装用电宽泛首轮估计
  - 基准类型：参考流（`reference_flow`）
  - 证据类型：推理估算（`reasoned_estimate`）

###### 包装材料（`packaging_materials`）

本行记录随产品跨越前景边界的袋、箱、内衬、保温容器、冰袋、标签和托盘。

- 选定流：Plastic Packaging Box and Container `7eb7726d-f3e5-4d23-b24d-dde3f34ff35a`
- 流属性/单位：Mass or item count / kg or item
- 数量规则：实测包装件数和材料质量；计数记录必须包含容量或皮重
- 数值来源模式：前景记录（`foreground_record`）
- 适用范围：产品特定（`product_specific`）
- 归一化基准：每 1,000 kg 参考产品
- 基准类型：参考流（`reference_flow`）
- 证据类型：采集记录（`collected_record`）
- 采集协议：`cp_packaging_records`
- 数量范围：暂定包装筛选估算
  - 范围角色：默认估算（`default_estimate`）
  - 下限：0
  - 上限：500
  - 单位：kg packaging/1,000 kg reference product
  - 基准：每参考产品的包装材料质量宽泛首轮估计
  - 基准类型：参考流（`reference_flow`）
  - 证据类型：推理估算（`reasoned_estimate`）

##### 废物流

###### 包装阶段不合格、损伤或死亡产品（`offgrade_damaged_or_dead_product_packout`）

本行记录非市场化产品、包装阶段死亡物、破碎贝壳、适用时的去壳残留和拒收个体。

- 选定流：Abalone shells `8caae24b-92f0-4ece-b1de-730bfbe4d9da`
- 流属性/单位：Mass / kg
- 数量规则：按去向和原因实测拒收质量
- 数值来源模式：前景记录（`foreground_record`）
- 适用范围：场址特定（`site_specific`）
- 归一化基准：每 1,000 kg 参考产品
- 基准类型：参考流（`reference_flow`）
- 证据类型：采集记录（`collected_record`）
- 采集协议：`cp_mortality_and_residue_records`
- 数量范围：包装拒收 QA 校验
  - 范围角色：QA 校验（`qa_guardrail`）
  - 下限：0
  - 上限：1
  - 单位：kg/kg harvested abalone input
  - 基准：进入包装的采收鲍鱼中被拒收或成为残留的比例
  - 基准类型：过程输出（`process_output`）
  - 证据类型：方法公式（`method_formula`）
  - 来源：`mass-balance-identity`

###### 包装出货废水（`packout_wastewater`）

本行记录来自清洗、净化、暂养、冷藏或活体保持操作的排放水。

- 选定流：Wastewater `bc2cd1d5-69d5-42d7-818f-38a69ebb18ef`
- 流属性/单位：Volume or mass / m3 or kg
- 数量规则：实测或计算排放体积和处理路径
- 数值来源模式：计算值（`calculated_value`）
- 适用范围：场址特定（`site_specific`）
- 归一化基准：每 1,000 kg 参考产品
- 基准类型：参考流（`reference_flow`）
- 证据类型：基于采集记录计算（`calculated_from_collection`）
- 采集协议：`cp_water_intake_and_discharge_records`
- 数量范围：暂定包装废水筛选估算
  - 范围角色：默认估算（`default_estimate`）
  - 下限：0
  - 上限：2000
  - 单位：m3/1,000 kg reference product
  - 基准：每参考产品的活体暂养、净化、清洗和冷藏废水宽泛首轮估计
  - 基准类型：参考流（`reference_flow`）
  - 证据类型：推理估算（`reasoned_estimate`）

##### 基本流

包装出货默认不指定基本流输出。只有在实测或选定建模规则要求时，加入直接制冷剂泄漏、燃烧排放或水体排放。

#### 输出

##### 产品流

###### 市场化养殖鲍鱼参考产品（`marketable_farmed_abalone_reference_product`）

本行是声明的参考产品输出。

- 选定流：Abalone `7b973a02-b45b-4f5a-a640-a9b5ae65584b`
- 流属性/单位：Mass / kg
- 数量规则：分级和包装后的实测市场化活、鲜或冷藏产品质量
- 数值来源模式：前景记录（`foreground_record`）
- 适用范围：场址特定（`site_specific`）
- 归一化基准：reference flow
- 基准类型：参考流（`reference_flow`）
- 证据类型：采集记录（`collected_record`）
- 采集协议：`cp_harvest_and_product_records`
- 数量范围：参考产品身份
  - 范围角色：QA 校验（`qa_guardrail`）
  - 下限：1
  - 上限：1
  - 单位：kg/kg reference product
  - 基准：归一化参考产品输出
  - 基准类型：参考流（`reference_flow`）
  - 证据类型：方法公式（`method_formula`）
  - 来源：`mass-balance-identity`

###### 可销售低等级鲍鱼共产品（`saleable_offgrade_abalone_coproduct`）

仅当低等级活、鲜或冷藏鲍鱼仍作为同一产品族内的独立等级销售时使用本行。

- 选定流：Abalone `7b973a02-b45b-4f5a-a640-a9b5ae65584b`
- 流属性/单位：Mass / kg
- 数量规则：按等级和去向实测的可销售低等级质量
- 数值来源模式：前景记录（`foreground_record`）
- 适用范围：产品特定（`product_specific`）
- 归一化基准：按包装批次，并在分配或分割后换算为每参考产品
- 基准类型：过程输出（`process_output`）
- 证据类型：采集记录（`collected_record`）
- 采集协议：`cp_harvest_and_product_records`
- 数量范围：暂定低等级产品筛选估算
  - 范围角色：默认估算（`default_estimate`）
  - 下限：0
  - 上限：1
  - 单位：kg off-grade saleable product/kg reference product
  - 基准：低等级可销售鲍鱼质量相对参考产品的宽泛首轮估计
  - 基准类型：参考流（`reference_flow`）
  - 证据类型：推理估算（`reasoned_estimate`）

##### 废物流

除包装拒收物和废水外，不指定额外废物输出。

##### 基本流

参考包装出货过程默认不指定基本流输出。

## 7. 分配与共产品处理

当批次记录可按养殖单元、采收批次、等级、产品形态或去向分割负荷时，应避免分配。活、鲜、冷藏、带壳、去壳、规格等级和低等级产品应先按实测质量分开，再应用分配。

当一个前景批次产生多个 CPC 04412 范围内的可销售鲍鱼等级时，除非有经审查的市场价值规则，否则共享的养成、采收、暂养和包装负荷按声明产品质量分配。贝壳、死亡物、废水、污泥、生物污损残留以及破损或死亡产品属于废物或处理输出，除非它们以独立产品数据集和参考流出售。

若同一场地在同一系统中养殖其他物种或共产品，共享能源、水、饲料准备和维护记录按计量养殖单元服务量、生物量-时间或产品质量的优先顺序分配。必须披露所选分配基准。

## 8. 前景数据采集、计算与质量规则

### 数据采集协议

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

### 计算规则

| rule_id | Applies to | Formula or rule | Inputs | Output | source_ids |
| --- | --- | --- | --- | --- | --- |
| `normalize_to_reference_flow` | all foreground rows | normalized_amount = measured_or_calculated_amount / marketable_reference_product_mass. Preserve raw records and product-form basis. | measured amount; marketable_reference_product_mass | amount per 1 kg reference product | `mass-balance-identity` |
| `calculate_stocking_survival` | seed_supply_hatchery_and_nursery and growout_husbandry | survival_to_harvest = harvested_count / stocked_count, with count-to-mass conversion retained separately. | stocked_count; harvested_count; mortality_count | survival indicator and QA check | `mass-balance-identity` |
| `calculate_feed_conversion_indicator` | growout_husbandry | feed_conversion_indicator = net_feed_mass / harvest_size_abalone_mass on the declared feed mass basis. Do not compare wet and dry feed without conversion evidence. | feed_mass; moisture basis; harvest_size_abalone_mass | feed mass per kg harvest-size abalone | `asc-farm-standard-2025` |
| `reconcile_packout_mass` | harvest_grading_and_live_holding | harvested_input_mass = reference_product_mass + offgrade_saleable_mass + reject_mass + measured holding loss on the same product-form basis. | harvested_input_mass; reference_product_mass; offgrade_mass; reject_mass; holding_loss | pack-out mass balance | `mass-balance-identity` |
| `calculate_controlled_discharge` | water intake and discharge rows | controlled_discharge = measured_discharge or intake - retained_product_water - recirculated_volume adjustment when meters are incomplete. | intake; discharge; recirculated volume; retained water | discharge volume by process | `mass-balance-identity` |
| `calculate_delivery_transport_service` | delivery_to_declared_gate | transport_service = delivered_product_mass_tonnes * one-way controlled delivery distance. | delivered mass; controlled distance | tonne-kilometres | `mass-balance-identity` |

### 数据质量要求

| requirement_id | Applies to | Requirement | Evidence |
| --- | --- | --- | --- |
| `identity_and_scope` | all datasets | Declare CPC code, species or hybrid, culture system, seed source, product form, geography, and declared gate. | dataset metadata, stocking records, product description, permit or certification evidence |
| `mass_basis_consistency` | reference product, seed, harvest, pack-out, and rejects | Keep shell-on, shucked, live, fresh, chilled, drained, wet, and dry bases separate unless measured conversion evidence exists. | scale records, product specifications, moisture or drainage evidence |
| `feed_and_water_disclosure` | grow-out and hatchery rows | Retain feed type, feed basis, water source, water discharge route, and water quality monitoring where applicable. | feed logs, supplier data, water meter, discharge permit, monitoring report |
| `mortality_and_residue_completeness` | seed, grow-out, and pack-out rows | Record mortalities, rejects, shell residue, biofouling residue, and fate by batch or reporting period. | mortality log, reject sheet, waste manifest, recovery record |
| `allocation_transparency` | multi-grade or multi-species systems | State the partitioning or allocation basis before publishing a secondary or background dataset. | allocation worksheet, grade mass records, culture-unit records |
| `temporal_representativeness` | all foreground rows | Cover a complete production batch, harvest lot, or representative reporting period; disclose partial-cycle datasets. | production calendar, stocking and harvest dates, reporting-period records |

## 9. 校验规则

前景数据包只有在满足以下条件时才符合本 PCR：

- 参考产品归一化为 1 kg 声明活、鲜或冷藏产品形态的养殖鲍鱼；
- 声明物种或杂交类型、养殖系统、苗种或幼鲍来源、产品状态、产品形态、规格等级、地理范围、声明边界、暂养时长和饲料制度；
- 苗种或幼鲍投入、饲料、水、能源、燃料、死亡物或残留、采收、包装出货和包装记录存在，或以原因说明标记为不适用；
- 计数记录包含平均个体质量或其他透明的 kg 换算；
- 饲料记录区分大型藻类、配合饲料和混合饲料，并保持湿基、干基和原样基准分开；
- 水流行区分泵送或供应水与开放水体的环境交换；
- 包装出货质量平衡能够核对采收输入、参考产品、可销售低等级产品、拒收物和暂养损失；
- 同场多物种或多等级分配在数据集作为背景或二级数据集使用前已记录。

## 10. 发布数据集画像

| 字段 | 值 |
| --- | --- |
| dataset_role | 可在审查后发布为 `secondary_dataset` 或 `background_dataset` 的前景生产包 |
| downstream_use | 作为养殖鲍鱼输入，用于海产品加工、餐饮、零售、冷链或区域食品产品生命周期模型 |
| allowed_use | 具有声明物种、养殖系统、产品形态、边界、饲料制度和质量披露的养殖鲍鱼活、鲜或冷藏数据集 |
| excluded_use | 野生鲍鱼、冷冻/烟熏/干制/盐腌/盐水浸泡/加工鲍鱼、通用贝类数据集，以及缺少产品形态或养殖系统披露的数据集 |
| required_metadata | canonical PCR id；CPC code；物种或杂交类型；养殖系统；苗种来源；产品形态；带壳或去壳基准；规格等级；地理范围；声明边界；暂养或冷藏时长；饲料制度；数据期；分配基准 |
| required_quality_disclosure | 缺失 UUID；未解析海水或栖息地流身份；饲料湿/干换算；水排放路径；死亡记录完整性；包装出货质量平衡；部分周期或代理数据使用 |
| update_trigger | CPC 映射变化、Tiangong 鲍鱼/海水/饲料/排放/栖息地流身份更新、ASC 或等效水产养殖标准变化，或经审查的鲍鱼前景数据集提供更好范围时修订 |

## 11. 数据源

| Source id | Type | Reference | Used for |
| --- | --- | --- | --- |
| `fao-abalone-breeding-1990` | handbook | <https://www.fao.org/4/ab731e/ab731e00.htm> | 鲍鱼生物学、育苗、中间培育、养成阶段、摄食、水质和生产周期背景 |
| `ca-dfg-culture-of-abalone` | official_guidance | <https://nrm.dfg.ca.gov/FileHandler.ashx?DocumentID=34422> | 育苗、中间培育、养成系统选项、转移时间和市场规格过程分解 |
| `asc-abalone-standard-2012` | standard | <https://asc-aqua.org/wp-content/uploads/2023/07/ASC-Abalone-Standard_v1.0.pdf> | 鲍鱼养殖议题范围、能源、饲料、生物安全、生态系统影响、废物管理和范围背景 |
| `asc-farm-standard-2025` | standard | <https://programme-centre.asc-aqua.org/app/uploads/2025/08/ASC-STD-001-ASC-Farm-Standard-V1.0.1-Aug-2025.pdf> | 当前 ASC 养成范围、符合条件的 Haliotis 物种、水质、饲料效率、可追溯性、动物健康和数据要求 |
| `seafood-watch-abalone-worldwide-2022` | official_guidance | <https://www.seafoodwatch.org/globalassets/sfw-data-blocks/reports/a/seafood-watch-abalone-worldwide-27815.pdf> | 鲍鱼生产阶段、养殖系统、饲料模式、化学品使用背景、苗种来源、疾病和数据质量缺口 |
| `mass-balance-identity` | method_factor | Conservation of mass applied as a PCR calculation identity for stocking, grow-out, pack-out, discharge, transport-service, and reference-flow normalization. | QA 校验、生存率、得率、包装质量平衡和归一化规则 |
