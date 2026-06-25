---
schema_version: 1
pcr_id: pcr.agriculture-forestry-and-fishery-products.fish-crustaceans-molluscs-and-other-aquatic-invertebrates-products.coral-and-similar-products-shells-of-molluscs-crustaceans-or-echinoderms-and-cuttle-bone
language: zh-CN
status: candidate
content_maturity: authored_methodology
translation_status: aligned
---

# 珊瑚及类似产品、软体动物、甲壳动物或棘皮动物外壳和乌贼骨

本 PCR 适用于 CPC 3.0 代码 04911。它规定在构建天工 LCA 前景数据时，如何记录来源接收、清洗或脱盐、干燥、分选、可选破碎分级、可选包装和厂门交付过程。本文使用段落式流卡片表达清单流，避免把过程流压缩成难读的表格。

## 1. 产品类别识别

| 字段 | 值 |
| --- | --- |
| canonical_pcr_id | pcr.agriculture-forestry-and-fishery-products.fish-crustaceans-molluscs-and-other-aquatic-invertebrates-products.coral-and-similar-products-shells-of-molluscs-crustaceans-or-echinoderms-and-cuttle-bone |
| classification_system | CPC |
| classification_version | 3.0 |
| classification_code | 04911 |
| classification_title | 珊瑚及类似产品、软体动物、甲壳动物或棘皮动物外壳和乌贼骨 |
| included_products | 作为材料或制备品销售的珊瑚状钙质产品、软体动物外壳、甲壳动物外壳、棘皮动物外壳和乌贼骨。 |
| excluded_products | 活体水生动物、可食用渔业产品、预制食品、珠宝或终端装饰品、合成碳酸钙，以及参考流不是质量口径的产品。 |
| representative_product | 在厂门交付的已清洗、干燥、分选的贝壳或类似生物矿物材料。 |
| production_route | 来源采集或接收、溯源核验、清洗或脱盐、干燥、分选、可选破碎或分级、可选包装、厂门交付。 |
| market_state | 按来源路线、水分基准、等级、适用的粒径范围和合法性或溯源状态声明的散装或包装材料。 |

## 2. 功能单位与参考流

| 字段 | 值 |
| --- | --- |
| what | 在厂门提供 CPC 04911 对应的贝壳、珊瑚状、棘皮动物、甲壳动物、软体动物外壳或乌贼骨材料。 |
| how_much | 1 kg 声明产品质量。 |
| how_well | 产品必须说明来源路线、材料类别、水分基准、适用的等级或粒径类别，以及合法性或溯源证据。 |
| how_long_or_cycle | 一个生产批次或报告期，并归一化到参考流。 |
| reference_flow_link | reference_product_flow |

| 字段 | 值 |
| --- | --- |
| reference_amount | 1 kg |
| reference_product_flow | Coral and similar products, shells of molluscs, crustaceans or echinoderms and cuttle-bone `9d3c928f-f381-4d92-8452-944adaf37906` |
| reference_flow_property | Mass `93a60a56-a3c8-11da-a746-0800200b9a66` |
| reference_unit_group | Units of mass `93a60a57-a4c8-11da-a746-0800200c9a66` |
| reference_unit | kg |
| required_qualifiers | 来源路线；材料类别；水分基准；适用的等级或粒径类别；合法性或溯源证据 |

## 3. 计量与单位规则

| rule_id | applies_to | required_property | required_unit | rule |
| --- | --- | --- | --- | --- |
| reference_mass | 参考产品以及所有产品或废物流质量 | Mass `93a60a56-a3c8-11da-a746-0800200b9a66` | kg | 产品输出、拒收物、残渣和包装废弃物按每 1 kg 声明参考产品归一化。 |
| declared_moisture_basis | 原料和清洗后材料 | Mass `93a60a56-a3c8-11da-a746-0800200b9a66` | kg | 必须声明湿基、风干、烘干或合同约定水分基准；只有在有实测水分证据时才转换。 |
| water_volume_or_mass | 清洗、脱盐或清洁用水 | Mass or volume | kg or m3 | 用设施记录的计量值报告用水；若使用体积，保留原始单位和换算依据。 |
| fuel_or_energy_basis | 采集、干燥、破碎、分级和包装能源 | Energy or mass | kWh, MJ, L, or kg | 归一化前先保留原始燃料或电力单位。 |
| particle_size_declaration | 破碎、粉碎或分级产品 | Declared grade | mm or declared class | 粒径类别是产品限定信息；除非数据集声明独立产品流，否则不是单独参考单位。 |

## 4. 系统边界

默认边界从声明的来源材料被接收或由报告主体直接采集开始。贝壳、珊瑚状材料或乌贼骨的自然形成过程不进入前景生产边界，除非报告主体直接控制养殖、采集或栖息地干预活动。数据集必须披露来源路线，并纳入其直接控制的采集、接收、清洗、干燥、分选、破碎、包装和设施废弃物处理。

### 边界概化

| 字段 | 值 |
| --- | --- |
| declared_starting_condition | declared_source_material_received |
| starting_condition_role | 第一个前景可控物料状态是为 CPC 04911 加工而接收、采集、打捞或采购的来源材料。 |
| product_classification_scope | 仅限 CPC 3.0 代码 04911。同类输入仍在范围内，不能作为通用上游材料隐藏。 |
| recursive_input_rule | 如果 CPC 04911 材料作为输入用于生产 CPC 04911 输出，必须作为同类产品输入报告，并保留自身来源路线、质量和质量限定信息。不得改写为未说明的矿物输入。 |
| upstream_dataset_requirement | 当来源材料由其他主体采购或供应时，应链接供应商数据集，或披露来源路线、地理、采集方法以及合法性或溯源证据。 |
| disclosure | 披露受控采集活动、拒收物去向、废水或卤水去向、粉尘控制、包装类型、水分基准，以及未解析的天工 UUID 替代项。 |

## 5. 分配规则

如果能按产品等级、材料类别或产品去向实测分离批次，应避免分配。一个批次产生多个可销售 CPC 04911 等级时，共享的清洗、干燥、分选和包装负荷默认按干基或声明产品质量分配，除非有经评审的市场价值规则。拒收物、废水、卤水和粉尘是需要处理或排放建模的输出，不是共产品；除非经营者能证明其是具有独立参考流的可销售回收材料。

## 6. 过程清单

| process_id | process_name | inclusion | inclusion_condition | role | quantitative_reference |
| --- | --- | --- | --- | --- | --- |
| source_receipt_and_provenance | 来源接收与溯源 | required | CPC 04911 数据集始终包含。 | 确认来源路线、接收质量、拒收质量、合法性或溯源状态。 | 进入制备过程的已接收来源材料。 |
| washing_drying_and_sorting | 清洗、干燥与分选 | required | 产品在厂门交付前经过清洗、脱盐、干燥、分选、分级或其他制备时包含。 | 将来源材料转化为已清洗分选参考材料，并记录清洗残留。 | 已清洗分选产品质量。 |
| size_reduction_packaging_and_delivery | 破碎、包装与厂门交付 | conditional | 当前景控制破碎、粉碎、分级、装袋、码垛、冷藏或干燥储存、厂门搬运时包含。 | 声明最终厂门产品状态、包装和直接设施释放。 | 厂门声明产品。 |

### 过程：来源接收与溯源（`source_receipt_and_provenance`）

#### 输入

##### 产品流

###### 接收的来源物料（`declared_source_material_received`）

这条流记录制备前的来源材料身份、来源路线和接收质量。

- 选定流：Coral and similar products, shells of molluscs, crustaceans or echinoderms and cuttle-bone `9d3c928f-f381-4d92-8452-944adaf37906`
- 流属性 / 单位：Mass; kg
- 数量规则：按批次、供应商送货单、接收称重或直接采集日志记录进入设施且尚未扣除拒收物的质量。
- 数值来源模式：前景记录（`foreground_record`）
- 适用范围：场址特定（`site_specific`）
- 归一化基准：归一化前的进厂批次或报告期接收记录。
- 基准类型：过程输出（`process_output`）
- 证据类型：采集记录（`collected_record`）
- 采集协议：`cp_source_material_receipt`
- 数量范围：暂定来源材料接收筛选估算
  - 范围角色：默认估算（`default_estimate`）
  - 下限：1
  - 上限：20
  - 单位：kg/kg declared product
  - 基准：接收拒收和制备损失前，每 kg 声明产品的接收来源材料宽范围初筛估算
  - 基准类型：参考流（`reference_flow`）
  - 证据类型：推理估算（`reasoned_estimate`）

###### 采集或交付燃料（`collection_or_delivery_fuel`）

仅当采集、船舶、车辆、装载机或内部运输由报告主体直接控制时使用；采购到厂材料可改由供应商数据集表达。

- 选定流：Diesel oil `9d258d75-6792-4f1c-9856-81602ed8f816`
- 流属性 / 单位：燃料数量；按记录使用 L、kg、MJ 或 kWh
- 数量规则：直接控制采集或交付活动的燃料或能源用量，并归一化到接收来源材料。
- 数值来源模式：前景记录（`foreground_record`）
- 适用范围：路线特定（`route_specific`）
- 归一化基准：与已接收来源材料关联的直接采集或交付运输服务。
- 基准类型：运输服务（`transport_service`）
- 证据类型：采集记录（`collected_record`）
- 采集协议：`cp_collection_or_delivery_energy`
- 数量范围：暂定采集或交付燃料筛选估算
  - 范围角色：默认估计（`default_estimate`）
  - 下限：0
  - 上限：1
  - 单位：L 柴油当量/kg 已接收来源材料
  - 基准：每 kg 已接收来源材料的宽泛首轮直接受控采集或交付燃料估计
  - 基准类型：运输服务（`transport_service`）
  - 证据类型：推理估算（`reasoned_estimate`）

##### 废物流

###### 接收拒收物与非目标残留（`receipt_rejects_and_non_target_residue`）

这条流记录接收阶段移除的石块、混杂碎屑、非目标外壳、生物残留或不合格材料。

- 选定流：选择路线特定的拒收物或残渣废物流
- 流属性 / 单位：Mass; kg
- 数量规则：接收后、清洗或分选前移除的拒收质量及其去向。
- 数值来源模式：前景记录（`foreground_record`）
- 适用范围：场址特定（`site_specific`）
- 归一化基准：相对于进厂来源材料的拒收质量。
- 基准类型：过程输出（`process_output`）
- 证据类型：采集记录（`collected_record`）
- 采集协议：`cp_reject_and_residue_records`
- 数量范围：质量守恒 QA 校验范围
  - 范围角色：QA 校验（`qa_guardrail`）
  - 下限：0
  - 上限：1
  - 单位：kg/kg 接收来源材料
  - 基准：接收来源材料的质量分数
  - 基准类型：过程输出（`process_output`）
  - 证据类型：方法公式（`method_formula`）
  - 来源：`mass-balance-identity`

##### 基本流

###### 采集区域或栖息地交互指标（`collection_area_or_habitat_interaction_indicator`）

对于海岸、海洋、养殖、打捞或加工残余路线的直接受控采集，这是一条前景披露指标。若有更精确的天工基本流，应替换为该流。

- 选定流：选择路线特定的采集区域、栖息地交互或合法采集披露流
- 流属性 / 单位：面积、数量、许可描述或叙述记录
- 数量规则：当前景采集受控时，记录采集区域、许可证、打捞来源、养殖来源或加工残余来源。
- 数值来源模式：前景记录（`foreground_record`）
- 适用范围：路线特定（`route_specific`）
- 归一化基准：与已接收来源材料关联的来源路线披露。
- 基准类型：过程输出（`process_output`）
- 证据类型：采集记录（`collected_record`）
- 采集协议：`cp_collection_area_records`

#### 输出

##### 产品流

###### 接收后的原始生物矿物材料（`accepted_raw_biogenic_mineral_material`）

该过程输出是接收检查后、清洗干燥分选前进入制备的质量。

- 选定流：Coral and similar products, shells of molluscs, crustaceans or echinoderms and cuttle-bone `9d3c928f-f381-4d92-8452-944adaf37906`
- 流属性 / 单位：Mass; kg
- 数量规则：扣除接收拒收物后进入制备的接收质量。
- 数值来源模式：计算值（`calculated_value`）
- 适用范围：场址特定（`site_specific`）
- 归一化基准：进厂来源材料减去接收拒收物，之后再归一化到最终参考流。
- 基准类型：过程输出（`process_output`）
- 证据类型：由采集记录计算（`calculated_from_collection`）
- 采集协议：`cp_source_material_receipt`
- 数量范围：已接收材料 QA 校验范围
  - 范围角色：QA 校验（`qa_guardrail`）
  - 下限：0
  - 上限：1
  - 单位：kg/kg 接收来源材料
  - 基准：接收来源材料中的接收比例
  - 基准类型：过程输出（`process_output`）
  - 证据类型：方法公式（`method_formula`）
  - 来源：`mass-balance-identity`

##### 废物流

除接收拒收物外，默认不设置其他废物输出；若路线特定处理产生单独废物记录，应增加对应流。

##### 基本流

接收过程默认不设基本流输出。若有直接测量排放或本地建模规则要求，应增加路线特定排放。

### 过程：清洗、干燥与分选（`washing_drying_and_sorting`）

#### 输入

##### 产品流

###### 进入清洗分选的原料（`raw_material_input_for_washing_and_sorting`）

这条流把已接收原料转入清洗和制备过程。

- 选定流：Coral and similar products, shells of molluscs, crustaceans or echinoderms and cuttle-bone `9d3c928f-f381-4d92-8452-944adaf37906`
- 流属性 / 单位：Mass; kg
- 数量规则：进入清洗、脱盐、干燥和分选的已接收原料质量。
- 数值来源模式：计算值（`calculated_value`）
- 适用范围：场址特定（`site_specific`）
- 归一化基准：来源接收与溯源过程的输出。
- 基准类型：过程输出（`process_output`）
- 证据类型：由采集记录计算（`calculated_from_collection`）
- 采集协议：`cp_source_material_receipt`
- 数量范围：暂定清洗分选原料输入筛选估算
  - 范围角色：默认估算（`default_estimate`）
  - 下限：1
  - 上限：20
  - 单位：kg/kg cleaned sorted product
  - 基准：每 kg 已清洗分选产品进入清洗和分选的原料输入宽范围初筛估算
  - 基准类型：过程输出（`process_output`）
  - 证据类型：推理估算（`reasoned_estimate`）

###### 清洗或脱盐用水（`washing_or_desalting_water`）

发生清洗、脱盐或湿法清洁时必须记录用水。

- 选定流：Process water `ec205030-248c-496f-9cf2-06d9d26dc6ff`
- 流属性 / 单位：质量或体积；kg 或 m3
- 数量规则：用于清洗或脱盐的计量取水、购水或水箱补水记录。
- 数值来源模式：前景记录（`foreground_record`）
- 适用范围：场址特定（`site_specific`）
- 归一化基准：每单位已清洗分选产品的用水。
- 基准类型：过程输出（`process_output`）
- 证据类型：采集记录（`collected_record`）
- 采集协议：`cp_washing_water_records`
- 数量范围：暂定清洗用水筛选估算
  - 范围角色：默认估计（`default_estimate`）
  - 下限：0
  - 上限：20
  - 单位：L/kg 已清洗分选产品
  - 基准：每 kg 已清洗分选输出的宽泛首轮清洗或脱盐用水估计
  - 基准类型：过程输出（`process_output`）
  - 证据类型：推理估算（`reasoned_estimate`）

###### 清洗、干燥与分选能源（`washing_drying_and_sorting_energy`）

覆盖电力、热燃料、压缩空气或其他直接计量的制备能源。应选择设施实际使用的天工流。

- 选定流：选择用于清洗、干燥和分选的电力、热燃料或设备能源流
- 流属性 / 单位：能源或燃料数量；kWh、MJ、L 或 kg
- 数量规则：用于清洗、脱盐、干燥、分选、分级及相关搬运的计量或分摊能源用量。
- 数值来源模式：前景记录（`foreground_record`）
- 适用范围：场址特定（`site_specific`）
- 归一化基准：每单位已清洗分选产品的能源用量。
- 基准类型：过程输出（`process_output`）
- 证据类型：采集记录（`collected_record`）
- 采集协议：`cp_preparation_energy_records`
- 数量范围：暂定制备能源筛选估算
  - 范围角色：默认估计（`default_estimate`）
  - 下限：0
  - 上限：10
  - 单位：kWh/kg 已清洗分选产品
  - 基准：每 kg 已清洗分选输出的宽泛首轮清洗、干燥、分选和搬运能源估计
  - 基准类型：过程输出（`process_output`）
  - 证据类型：推理估算（`reasoned_estimate`）

##### 废物流

该过程默认没有废物输入。

##### 基本流

该过程默认没有基本流输入。

#### 输出

##### 产品流

###### 已清洗分选参考材料（`cleaned_sorted_reference_material`）

这是进入可选破碎、包装或直接厂门交付之前的制备后材料输出。

- 选定流：Coral and similar products, shells of molluscs, crustaceans or echinoderms and cuttle-bone `9d3c928f-f381-4d92-8452-944adaf37906`
- 流属性 / 单位：Mass; kg
- 数量规则：按声明水分基准和等级计量的已清洗分选质量。
- 数值来源模式：前景记录（`foreground_record`）
- 适用范围：场址特定（`site_specific`）
- 归一化基准：清洗干燥分选过程的已清洗分选产品输出。
- 基准类型：过程输出（`process_output`）
- 证据类型：采集记录（`collected_record`）
- 采集协议：`cp_cleaned_product_mass`
- 数量范围：已清洗分选得率 QA 校验范围
  - 范围角色：QA 校验（`qa_guardrail`）
  - 下限：0
  - 上限：1
  - 单位：kg/kg 原料输入
  - 基准：已清洗分选得率
  - 基准类型：过程输出（`process_output`）
  - 证据类型：方法公式（`method_formula`）
  - 来源：`mass-balance-identity`

##### 废物流

###### 清洗废水或卤水（`washing_wastewater_or_brine`）

湿法清洗、脱盐或清洁产生液体废物、卤水、污泥或送处理废水时记录。

- 选定流：选择路线特定的废水、卤水或污泥废物流
- 流属性 / 单位：质量或体积；kg 或 m3
- 数量规则：实测或平衡推导的废水、卤水、污泥或送处理数量及去向。
- 数值来源模式：前景记录（`foreground_record`）
- 适用范围：场址特定（`site_specific`）
- 归一化基准：每单位已清洗分选产品的液体废物数量。
- 基准类型：过程输出（`process_output`）
- 证据类型：采集记录（`collected_record`）
- 采集协议：`cp_wastewater_records`
- 数量范围：暂定废水或卤水筛选估算
  - 范围角色：默认估计（`default_estimate`）
  - 下限：0
  - 上限：25
  - 单位：L/kg 已清洗分选产品
  - 基准：每 kg 已清洗分选输出的宽泛首轮液体废物数量估计
  - 基准类型：过程输出（`process_output`）
  - 证据类型：推理估算（`reasoned_estimate`）

###### 有机残留、沉积物和分选拒收物（`organic_residue_sediment_and_rejects`）

覆盖清洗、干燥或分选中移除的生物残留、沉积物、非合格碎片和其他拒收物。

- 选定流：选择路线特定的有机残留、沉积物或分选拒收废物流
- 流属性 / 单位：Mass; kg
- 数量规则：清洗、干燥和分选产生的拒收质量及其去向。
- 数值来源模式：前景记录（`foreground_record`）
- 适用范围：场址特定（`site_specific`）
- 归一化基准：每单位已清洗分选产品的拒收质量。
- 基准类型：过程输出（`process_output`）
- 证据类型：采集记录（`collected_record`）
- 采集协议：`cp_reject_and_residue_records`
- 数量范围：清洗分选拒收比例 QA 校验范围
  - 范围角色：QA 校验（`qa_guardrail`）
  - 下限：0
  - 上限：1
  - 单位：kg/kg 原料输入
  - 基准：清洗和分选产生的拒收比例
  - 基准类型：过程输出（`process_output`）
  - 证据类型：方法公式（`method_formula`）
  - 来源：`mass-balance-identity`

##### 基本流

###### 干法处理粉尘或颗粒物（`dust_or_particulate_matter_from_dry_handling`）

当干燥、刷洗、筛分或干法分选产生实测粉尘，或使用经评审的设施因子时使用。

- 选定流：选择适用的颗粒物排放流
- 流属性 / 单位：Mass; kg
- 数量规则：来自干法处理记录的除尘收集损失、滤材捕集量或计算颗粒物释放量。
- 数值来源模式：计算值（`calculated_value`）
- 适用范围：技术特定（`technology_specific`）
- 归一化基准：每单位已清洗分选产品的粉尘或颗粒物释放。
- 基准类型：过程输出（`process_output`）
- 证据类型：由采集记录计算（`calculated_from_collection`）
- 采集协议：`cp_dust_records`
- 数量范围：暂定粉尘释放筛选估算
  - 范围角色：默认估计（`default_estimate`）
  - 下限：0
  - 上限：0.2
  - 单位：kg/kg 已清洗分选产品
  - 基准：每 kg 已清洗分选输出的宽泛首轮粉尘、细料或颗粒物释放估计
  - 基准类型：过程输出（`process_output`）
  - 证据类型：推理估算（`reasoned_estimate`）

### 过程：破碎、包装与厂门交付（`size_reduction_packaging_and_delivery`）

#### 输入

##### 产品流

###### 用于破碎或包装的已清洗材料（`cleaned_material_for_size_reduction_or_packing`）

这条流把已清洗材料转入破碎、粉碎、分级、装袋或直接厂门交付。

- 选定流：Coral and similar products, shells of molluscs, crustaceans or echinoderms and cuttle-bone `9d3c928f-f381-4d92-8452-944adaf37906`
- 流属性 / 单位：Mass; kg
- 数量规则：进入可选破碎、包装、储存或直接厂门交付的已清洗分选质量。
- 数值来源模式：前景记录（`foreground_record`）
- 适用范围：场址特定（`site_specific`）
- 归一化基准：最终产品声明前的已清洗分选材料。
- 基准类型：过程输出（`process_output`）
- 证据类型：采集记录（`collected_record`）
- 采集协议：`cp_cleaned_product_mass`
- 数量范围：暂定洁净材料转入最终制备筛选估算
  - 范围角色：默认估算（`default_estimate`）
  - 下限：1
  - 上限：5
  - 单位：kg/kg declared product
  - 基准：每 kg 声明产品中进入最终制备的已清洗材料宽范围初筛估算
  - 基准类型：参考流（`reference_flow`）
  - 证据类型：推理估算（`reasoned_estimate`）

###### 包装材料（`packaging_material`）

当前景控制袋、桶、托盘、内衬、标签或散装包装时使用。

- 选定流：选择适用的包装材料流
- 流属性 / 单位：质量或数量；kg 或件数
- 数量规则：用于声明产品数量的包装材料实测用量。
- 数值来源模式：前景记录（`foreground_record`）
- 适用范围：产品特定（`product_specific`）
- 归一化基准：每单位厂门声明产品使用的包装。
- 基准类型：参考流（`reference_flow`）
- 证据类型：采集记录（`collected_record`）
- 采集协议：`cp_packaging_records`
- 数量范围：暂定包装材料筛选估算
  - 范围角色：默认估计（`default_estimate`）
  - 下限：0
  - 上限：0.5
  - 单位：kg/kg 声明产品
  - 基准：每 kg 厂门声明产品的宽泛首轮包装材料估计
  - 基准类型：参考流（`reference_flow`）
  - 证据类型：推理估算（`reasoned_estimate`）

###### 破碎、包装或储存能源（`size_reduction_packaging_or_storage_energy`）

覆盖破碎、粉碎、分级、装袋、码垛、储存和厂门搬运的前景电力或燃料。

- 选定流：选择用于破碎、包装、储存或厂门搬运的电力或燃料流
- 流属性 / 单位：能源或燃料数量；kWh、MJ、L 或 kg
- 数量规则：最终产品制备和厂门交付的计量或分摊能源用量。
- 数值来源模式：前景记录（`foreground_record`）
- 适用范围：场址特定（`site_specific`）
- 归一化基准：每单位厂门声明产品的能源用量。
- 基准类型：参考流（`reference_flow`）
- 证据类型：采集记录（`collected_record`）
- 采集协议：`cp_size_reduction_packaging_energy`
- 数量范围：暂定最终制备能源筛选估算
  - 范围角色：默认估计（`default_estimate`）
  - 下限：0
  - 上限：10
  - 单位：kWh/kg 声明产品
  - 基准：每 kg 声明产品的宽泛首轮破碎、包装、储存和厂门搬运能源估计
  - 基准类型：参考流（`reference_flow`）
  - 证据类型：推理估算（`reasoned_estimate`）

##### 废物流

该过程默认没有废物输入。

##### 基本流

该过程默认没有基本流输入。

#### 输出

##### 产品流

###### 厂门声明产品（`declared_product_at_gate`）

这是最终数据集归一化使用的参考产品输出。

- 选定流：Coral and similar products, shells of molluscs, crustaceans or echinoderms and cuttle-bone `9d3c928f-f381-4d92-8452-944adaf37906`
- 流属性 / 单位：Mass; kg
- 数量规则：按水分基准和等级或粒径类别声明的厂门最终产品质量。
- 数值来源模式：前景记录（`foreground_record`）
- 适用范围：产品特定（`product_specific`）
- 归一化基准：设施厂门的声明参考产品。
- 基准类型：参考流（`reference_flow`）
- 证据类型：采集记录（`collected_record`）
- 采集协议：`cp_final_product_mass`
- 数量范围：声明产品参考流恒等式
  - 范围角色：QA 校验范围（`qa_guardrail`）
  - 下限：1
  - 上限：1
  - 单位：kg/kg declared product
  - 基准：设施门口声明产品参考流
  - 基准类型：参考流（`reference_flow`）
  - 证据类型：方法公式（`method_formula`）
  - 来源：`mass-balance-identity`

##### 废物流

###### 包装和粒径不合格废物（`packaging_and_offsize_waste`）

记录最终制备中产生的包装边角料、不合格粒径材料、粉料和不合格最终产品。

- 选定流：选择路线特定的包装边角料、不合格粒径材料或粉料废物流
- 流属性 / 单位：Mass; kg
- 数量规则：包装边角料、不合格粒径材料、粉料或被拒最终产品质量及去向。
- 数值来源模式：前景记录（`foreground_record`）
- 适用范围：场址特定（`site_specific`）
- 归一化基准：每单位厂门声明产品的最终制备废物。
- 基准类型：参考流（`reference_flow`）
- 证据类型：采集记录（`collected_record`）
- 采集协议：`cp_packaging_waste_records`
- 数量范围：暂定包装和粒径不合格废物筛选估算
  - 范围角色：默认估计（`default_estimate`）
  - 下限：0
  - 上限：0.5
  - 单位：kg/kg 声明产品
  - 基准：每 kg 厂门声明产品的宽泛首轮最终制备废物估计
  - 基准类型：参考流（`reference_flow`）
  - 证据类型：推理估算（`reasoned_estimate`）

##### 基本流

###### 直接燃料燃烧产生的化石二氧化碳（`fossil_co2_from_direct_fuel_combustion`）

仅当直接燃料燃烧排放在前景单元过程中建模，而不是通过链接燃料燃烧数据集表达时使用。

- 选定流：Carbon dioxide, fossil, air `08a91e70-3ddc-11dd-923d-0050c2490048`
- 流属性 / 单位：Mass; kg
- 数量规则：当前景边界包含直接燃烧时，由前景燃料消耗计算化石二氧化碳。
- 数值来源模式：计算值（`calculated_value`）
- 适用范围：技术特定（`technology_specific`）
- 归一化基准：最终制备和厂门搬运的直接燃料清单。
- 基准类型：燃料清单（`fuel_inventory`）
- 证据类型：由采集记录计算（`calculated_from_collection`）
- 采集协议：`cp_direct_fuel_combustion_records`
- 数量范围：暂定直接燃料化石 CO2 筛选估算
  - 范围角色：默认估算（`default_estimate`）
  - 下限：0
  - 上限：20
  - 单位：kg CO2/kg declared product
  - 基准：每 kg 声明产品中直接燃料燃烧产生的化石二氧化碳宽范围初筛估算
  - 基准类型：燃料清单（`fuel_inventory`）
  - 证据类型：推理估算（`reasoned_estimate`）

## 7. 同类输入和截断规则

同类 CPC 04911 材料输入必须作为产品输入可见，不得截断为未说明的天然矿物材料。辅助流只有在项目规则允许截断，并且数据集记录被截断流类型、原因和预期相关性时才能排除。合法性或溯源披露、废水去向、残渣去向和最终产品水分基准不能作为截断项。

## 8. 前景数据采集

### 数据采集协议

| protocol_id | process_id | flow_role | record_type | raw_fields | collection_method | unit | frequency | temporal_coverage | site_scope | aggregation_rule | quality_evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| cp_source_material_receipt | source_receipt_and_provenance | 来源物料接收和已接收原料 | 接收记录 | batch_id, source_route, material_family, supplier_or_collection_site, received_mass, rejected_mass, accepted_mass, moisture_basis, legal_or_provenance_record | 地磅、台秤、供应商送货单或直接采集日志，并与批次记录核对 | kg | 每批 | 报告期或生产活动期 | 接收设施和受控采集路线 | 按来源路线汇总接收质量，并归一化到最终声明产品质量 | 称量校准、送货单、批次台账、溯源或许可记录 |
| cp_collection_or_delivery_energy | source_receipt_and_provenance | 采集或交付燃料 | 能源和运输日志 | vehicle_or_vessel_id, route, distance, fuel_type, fuel_quantity, energy_quantity, allocation_basis | 燃料发票、油罐日志、车辆日志、船舶日志或充电计量记录 | L, kg, MJ, or kWh | 每次运输或每月 | 报告期 | 直接控制的采集或交付路线 | 按质量或实测运输批次分摊到已接收来源材料 | 燃料发票、里程或运输日志、计量记录 |
| cp_collection_area_records | source_receipt_and_provenance | 采集区域或栖息地指标 | 路线与合法性披露记录 | source_route, geography, collection_area, permit_id, salvage_or_byproduct_source, collection_method, restrictions | 许可审查、供应商声明、地理记录或现场采集日志 | m2, permit id, or descriptive record | 每个来源路线 | 报告期 | 采集区域、供应商来源或加工残余来源 | 将路线特定披露与已接收来源材料质量共同保留 | 许可证、供应商证明、采集日志、追溯记录 |
| cp_reject_and_residue_records | source_receipt_and_provenance | 接收和分选拒收物 | 废物和残渣记录 | batch_id, reject_type, mass, fate, treatment_destination, moisture_basis | 称量拒收物、废物转移单、处置单或内部残渣台账 | kg | 每批或每次处置 | 报告期 | 接收和制备设施 | 按拒收类型和去向汇总，再归一化到参考产品 | 称量记录、废物转移单、处置发票 |
| cp_washing_water_records | washing_drying_and_sorting | 清洗或脱盐用水 | 公用工程记录 | meter_id, water_source, water_quantity, batch_id, cleaning_step, allocation_basis | 水表、水箱补水日志、购水发票或批次清洗记录 | m3 or kg | 批次、班次或每月 | 报告期 | 清洗和脱盐操作 | 按实测批次或生产时间分摊到已清洗分选输出 | 表计读数、发票、批次日志 |
| cp_preparation_energy_records | washing_drying_and_sorting | 清洗干燥分选能源 | 能源记录 | meter_id, equipment_id, fuel_type, energy_quantity, operating_time, allocation_basis | 分表、主表分摊、燃料发票或设备运行日志 | kWh, MJ, L, or kg | 批次、班次或每月 | 报告期 | 制备设备 | 按分表、运行时间或生产质量分摊到已清洗分选输出 | 表计记录、发票、设备运行日志 |
| cp_cleaned_product_mass | washing_drying_and_sorting | 已清洗分选产品 | 生产输出记录 | batch_id, cleaned_mass, moisture_basis, grade, particle_size_class, destination | 称量单、批次生产台账或库存转移记录 | kg | 每批 | 报告期 | 制备设施 | 按声明等级汇总，并归一化到最终声明产品质量 | 称量校准、批次台账、库存记录 |
| cp_wastewater_records | washing_drying_and_sorting | 废水或卤水 | 液体废物记录 | batch_id, wastewater_quantity, brine_quantity, sludge_quantity, treatment_destination, discharge_or_transfer_record | 流量计、水箱体积平衡、处理站记录或废物转移单 | m3 or kg | 批次、班次或处置事件 | 报告期 | 清洗和处理系统 | 按去向汇总，并归一化到已清洗分选输出或参考流 | 表计记录、处理日志、排放许可记录、转移单 |
| cp_dust_records | washing_drying_and_sorting | 粉尘或颗粒物 | 除尘和损失记录 | equipment_id, dust_collected, filter_change_mass, visible_release_record, emission_factor_if_used | 除尘器记录、滤材质量、清扫记录或经评审的设施因子 | kg | 班次、批次或维护事件 | 报告期 | 干法处理和除尘设备 | 计算每单位已清洗分选输出的颗粒物释放或收集粉尘 | 维护记录、滤材日志、计算表 |
| cp_packaging_records | size_reduction_packaging_and_delivery | 包装材料 | 包装库存记录 | packaging_type, packaging_mass, item_count, product_mass_packed, supplier_record | 包装采购记录、库存领用、物料清单或包装线日志 | kg or item count | 批次或每月 | 报告期 | 包装线或仓库 | 将包装归一化到厂门声明产品 | 采购记录、库存领用、包装日志 |
| cp_size_reduction_packaging_energy | size_reduction_packaging_and_delivery | 最终制备能源 | 能源记录 | meter_id, equipment_id, fuel_type, energy_quantity, operating_time, allocation_basis | 分表、燃料发票、设备运行日志或分摊工作表 | kWh, MJ, L, or kg | 批次、班次或每月 | 报告期 | 破碎、粉碎、分级、包装、储存和厂门搬运 | 按分表、运行时间或生产质量分摊到厂门声明产品 | 表计记录、发票、运行日志 |
| cp_final_product_mass | size_reduction_packaging_and_delivery | 厂门声明产品 | 最终生产和销售记录 | batch_id, final_mass, moisture_basis, grade, particle_size_class, packaging_state, dispatch_record | 最终称量单、仓库出库、销售发运记录或库存结账 | kg | 每批或每次发运 | 报告期 | 设施厂门 | 按产品状态汇总合格声明产品质量 | 称量记录、发运记录、库存结账 |
| cp_packaging_waste_records | size_reduction_packaging_and_delivery | 包装和粒径不合格废物 | 最终废物记录 | waste_type, mass, fate, disposal_or_rework_destination, batch_id | 称量边角料、返工记录、废物转移单或处置发票 | kg | 批次或处置事件 | 报告期 | 最终制备和包装区域 | 按去向汇总，并归一化到厂门声明产品 | 称量记录、返工台账、转移单 |
| cp_direct_fuel_combustion_records | size_reduction_packaging_and_delivery | 直接燃料燃烧排放 | 燃料燃烧计算记录 | fuel_type, fuel_quantity, heating_value_or_density, emission_factor, combustion_scope | 燃料发票、油罐日志和经评审的排放因子计算 | kg CO2 or fuel unit | 批次或报告期 | 报告期 | 前景边界内的直接燃烧设备 | 当前景直接燃烧建模时，由燃料数量计算化石 CO2 | 燃料记录、因子来源、计算表 |

### 计算规则

| rule_id | applies_to | formula_or_rule | inputs | output | source_ids |
| --- | --- | --- | --- | --- | --- |
| calculate_accepted_source_mass | 来源接收与溯源 | accepted_mass = received_mass - receipt_reject_mass，所有质量使用同一声明水分基准。 | received_mass; receipt_reject_mass | 已接收原始生物矿物材料 | `mass-balance-identity` |
| normalize_to_reference_flow | 所有前景行 | normalized_amount = measured_or_calculated_amount / final_declared_product_mass。保留原始记录和归一化结果。 | measured amount; final_declared_product_mass | 每 1 kg 参考产品的数量 | `mass-balance-identity` |
| calculate_cleaned_yield | 清洗、干燥与分选 | cleaned_yield = cleaned_sorted_mass / raw_material_input_mass，必须使用同一水分基准。 | cleaned_sorted_mass; raw_material_input_mass | 已清洗分选得率 | `mass-balance-identity` |
| calculate_direct_fuel_co2_if_modelled | 破碎、包装与厂门交付 | 当前景边界包含直接燃烧时，fossil_CO2 = foreground_fuel_quantity x reviewed fuel emission factor。 | fuel_quantity; emission_factor | 化石二氧化碳基本流 | `ipcc-2006-combustion` |

### 数据质量要求

| requirement_id | applies_to | requirement | evidence |
| --- | --- | --- | --- |
| dq_source_identity | 所有来源材料记录 | 每个来源路线必须说明材料类别、来源路线、地理位置以及合法性或溯源基础。 | 供应商声明、许可证、追溯文件或采集日志 |
| dq_mass_balance | 来源接收、制备和最终厂门产品 | 接收质量、拒收物、清洗后输出、最终产品和废物质量必须在设施称量容差内核对。 | 批次质量平衡工作表和称量记录 |
| dq_moisture_basis | 所有产品和废物质量记录 | 声明湿基、风干、烘干或合同水分基准；没有实测转换证据时不得混用。 | 水分测试、合同基准或批次声明 |
| dq_wastewater_fate | 清洗和脱盐操作 | 识别废水、卤水、污泥、排放、回用、处理或转移去向。 | 处理日志、排放记录、转移单或许可证据 |
| dq_dust_controls | 干法处理操作 | 报告粉尘是被捕集、排放、内部循环还是作为废物处理。 | 滤材日志、除尘器记录或维护日志 |
| dq_packaging_state | 包装产品数据集 | 声明包装材料类型、包装质量或数量，以及被包装产品质量。 | 物料清单、包装日志或库存领用记录 |

## 9. 验证规则

合规数据集必须提供参考流 UUID、质量属性 UUID、单位组 UUID、来源路线、材料类别、声明水分基准和最终产品质量。必需过程必须有前景采集记录，或有明确的零活动声明。产品和废物质量记录必须按批次或报告期核对。若存在更精确的天工流，路线特定的未解析流选择应在发布前评审。同类 CPC 04911 输入必须保持为显式产品输入，不得隐藏为通用矿物或废物输入。

## 10. 发布数据集画像

| 字段 | 值 |
| --- | --- |
| dataset_role | unit_process |
| downstream_use | secondary_dataset; background_dataset |
| allowed_use | 当来源路线、水分基准和加工状态与消费模型匹配时，可作为 CPC 04911 厂门材料的前景单元过程或链接二级数据集使用。 |
| excluded_use | 不得用于活体水生动物生产、食品、终端珠宝或装饰品、合成碳酸钙，或缺少来源路线和合法性或溯源披露的数据集。 |
| required_metadata | PCR id、PCR 版本、CPC 代码 04911、产品标题、来源路线、材料类别、地理、报告期、水分基准、等级或粒径类别、最终产品质量、天工 UUID 替代项和未解析流说明。 |
| required_quality_disclosure | 报告质量平衡完整性、来源身份证据、废水或卤水去向、残渣去向、粉尘控制处理、包装状态，以及多等级产品使用的任何分配规则。 |
| update_trigger | 当天工 UUID 映射、CPC 映射、来源路线或合法性披露规则变化，或经评审的范围和采集证据改进时更新。 |

## 11. 数据源

| source_id | type | reference | used_for |
| --- | --- | --- | --- |
| unsd-cpc-3-0-04911 | official_guidance | United Nations Statistics Division, Central Product Classification Version 3.0, code 04911. | 产品分类身份和覆盖产品范围。 |
| cites-stony-corals | official_guidance | CITES guidance and listings for stony corals and related trade controls, as applicable by route and geography. | 珊瑚状来源路线的合法性和溯源披露。 |
| fao-responsible-fisheries-code | official_guidance | FAO Code of Conduct for Responsible Fisheries. | 渔业和养殖副产物路线的负责任来源披露。 |
| codex-fish-code | official_guidance | Codex Code of Practice for Fish and Fishery Products. | 适用时用于贝类副产物和残余来源路线的卫生与处理背景。 |
| iso-14067-2018 | standard | ISO 14067:2018 Greenhouse gases - Carbon footprint of products - Requirements and guidelines for quantification. | 产品碳足迹边界、数据质量和报告的一般对齐。 |
| mass-balance-identity | method_factor | Conservation of mass applied as a PCR calculation identity for batch input, output, and reject reconciliation. | 质量守恒校验、得率计算和归一化规则。 |
| ipcc-2006-combustion | method_factor | IPCC 2006 Guidelines for National Greenhouse Gas Inventories, stationary and mobile combustion factor approach. | 当前景直接燃烧建模时的燃料燃烧二氧化碳计算。 |
