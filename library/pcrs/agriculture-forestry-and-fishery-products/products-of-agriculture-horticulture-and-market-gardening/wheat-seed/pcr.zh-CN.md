---
pcr_id: pcr.agriculture-forestry-and-fishery-products.products-of-agriculture-horticulture-and-market-gardening.wheat-seed
language: zh-CN
status: draft
sync_with: pcr.en-US.md
---

# 小麦播种种子

## 1. 范围与适用性

本 PCR 是用于测试 TianGong PCR 编写结构的样例草案，可用于指导人工或 AI 构建清选后小麦播种种子的 `process` 和 `lifecyclemodel`，包括认证种子、原种、基础种或类似种子等级。本文件中的数值范围是筛查性先验，正式使用前需要农业和 LCA 专家复核。

若研究对象是食用、饲用、淀粉、乙醇或商品交易用小麦籽粒，不应直接使用本 PCR，除非系统边界已排除种子专属处理过程，并且产品已被明确重新分类。

## 2. 产品类别识别

- Canonical PCR id: `pcr.agriculture-forestry-and-fishery-products.products-of-agriculture-horticulture-and-market-gardening.wheat-seed`
- 外部分类入口: CPC 3.0 `01111`, `Wheat, seed`
- 产品类型: 农产品
- 典型生产路线: 种子繁殖田加采后种子加工
- 典型市场状态: 清选、分级、包装、可选药剂处理后，在种子加工厂门或区域交付点交付的小麦种子

PCR 身份不由 CPC 决定。CPC 是映射入口；该目录仍是 canonical 建模规则。

## 3. 参考流

优先参考流：

```text
1 kg wheat seed for sowing, cleaned and graded, at seed plant gate
```

本草案使用的数据库参考流：

| 角色 | Tiangong flow | Flow type | UUID | Version | Flow property | Unit group | 优先单位 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 参考产品 | Wheat | Product flow | `12da5e7d-9b93-4404-8c7d-08f98bec6238` | `01.01.002` | Mass `93a60a56-a3c8-11da-a746-0800200b9a66` | Units of mass `93a60a57-a4c8-11da-a746-0800200c9a66` | kg |

必填限定信息：

- 种子等级或认证等级
- 已处理或未处理状态
- 含水率基准
- 可获得时声明物理净度和发芽率
- 地理范围和交付边界
- 若为袋装种子，声明包装状态

除非研究目标直接关注农艺表现，否则不建议用粒数作为唯一参考流。如使用粒数，应同时提供千粒重或其他质量换算。

## 4. 流属性与单位约定

| Flow property | UUID | Version | Unit group | Unit group UUID | Unit group version | 常用单位 | 用途 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Mass | `93a60a56-a3c8-11da-a746-0800200b9a66` | `03.00.003` | Units of mass | `93a60a57-a4c8-11da-a746-0800200c9a66` | `03.00.003` | kg, t, g | 产品、废物和按质量计的排放 |
| Net calorific value | `93a60a56-a3c8-11da-a746-0800200c9a66` | `03.00.003` | Units of energy | `93a60a57-a3c8-11da-a746-0800200c9a66` | `03.00.003` | MJ, kWh | 电力和能源投入 |
| Number of items | `01846770-4cfe-4a25-8ad9-919d8d378345` | `03.00.004` | Units of items | `5beb6eed-33a9-47b8-9ede-1dfe8f679159` | `03.00.003` | item, dozen | 包装袋或包装件数 |

种子质量属性属于前景属性，不替代 flow property：

| 属性 | 常用单位 | 草案筛查范围 | 来源 id |
| --- | --- | --- | --- |
| 含水率 | 湿基百分比 | 10-14 percent | `fao-wheat-seed-production` |
| 物理净度 | 质量百分比 | 95-99.9 percent | `fao-wheat-seed-production` |
| 发芽率 | 种子百分比 | 85-98 percent | `fao-wheat-seed-production`, `umn-small-grain-seeding-rate` |
| 千粒重 | g/1000 seeds | 25-60 g | `unl-wheat-seeding-rate`, `umn-small-grain-seeding-rate` |
| 种子处理载量 | g active ingredient/kg seed | 0-10 g/kg | `authoring-prior-wheat-seed` |

## 5. 系统边界

默认边界为 cradle-to-gate 小麦种子生产：

1. 上游种子、肥料、燃料、电力、植保产品、种子处理药剂和包装的生产与运输。
2. 田间繁种：整地、播种、施肥、必要时灌溉、植保、必要时田检、收获和田间干燥。
3. 种子加工：干燥、清选、分级、检测、药剂处理、包装和储存。
4. 当参考流为送达种子时，包含至声明交付边界的运输。

除非生命周期模型明确研究种子作为小麦种植投入的下游使用阶段，否则不包含使用该种子生产粮食小麦的过程。默认不包含资本品；若研究目标和范围显示其显著，应单独纳入。若影响方法或研究目标要求土地使用核算，应纳入土地占用和土地转化。

## 6. 过程清单结构

### 过程：田间繁种

该过程表示从上一代种子投入到农场或田边收获种子作物的前景过程。

#### 输入

##### 产品流

| Flow role | Selected flow | Tiangong UUID@version | Flow property / unit | 草案常见范围 | 范围基准 | 范围来源 | 范围质量 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 上一代小麦种子 | Wheat | `12da5e7d-9b93-4404-8c7d-08f98bec6238@01.01.002` | Mass / kg | 25-70 kg | per 1,000 kg harvested seed crop | `tg-process-wheat-cultivation`, `unl-wheat-seeding-rate`, `umn-small-grain-seeding-rate` | draft-prior |
| 氮肥载体 | Urea | `3f8850c0-f718-4c4b-8fcb-8fd42e03aa8e@01.01.001` | Mass / kg | 同时记录 kg product 与 kg N；PCR 不设固定上限 | per 1,000 kg harvested seed crop | `authoring-prior-wheat-seed`, `ipcc-2019-managed-soils-n2o` | pending-review |
| 磷肥 | Phosphate fertilizer | `9c196b01-6aad-4252-a6e8-f853853a830c@01.01.002` | Mass / kg | site-specific | per 1,000 kg harvested seed crop | `authoring-prior-wheat-seed` | pending-review |
| 钾肥 | Potassium fertilizer | `dd008d87-16e4-4e85-a048-b9949f6fbca6@01.01.001` | Mass / kg | site-specific | per 1,000 kg harvested seed crop | `authoring-prior-wheat-seed` | pending-review |
| 作为产品投入的灌溉水 | Irrigation water | `4ad684b1-8e85-4dee-8d9c-55d1fa2d4432@01.01.002` | Mass / kg | 0-5,000 kg | per 1,000 kg harvested seed crop | `tg-process-wheat-cultivation` | observed-row |
| 田间机械燃料 | Diesel, burned in agricultural machinery | `57e0b1a3-2d05-46b2-b61b-cf7b5b167c6f@01.01.000` | Mass / kg | 5-40 kg | per 1,000 kg harvested seed crop | `authoring-prior-wheat-seed` | draft-prior |
| 植保产品，除草剂 proxy | Herbicide | `c1370404-9e2b-4ed6-ba96-c094f74e0f2d@01.01.001` | Mass / kg | 0-5 kg active ingredient | per 1,000 kg harvested seed crop | `authoring-prior-wheat-seed` | pending-review |
| 植保产品，杀菌剂 proxy | Azoxystrobin | `8a1f4968-6428-413f-a50b-b413bf9190cf@01.01.001` | Mass / kg | 0-5 kg active ingredient | per 1,000 kg harvested seed crop | `authoring-prior-wheat-seed` | pending-review |
| 植保产品，杀虫剂 proxy | Insecticide | `ba2ec0c8-d5da-4ca8-bf9f-317478a1ce1b@01.01.002` | Mass / kg | 0-5 kg active ingredient | per 1,000 kg harvested seed crop | `authoring-prior-wheat-seed` | pending-review |

##### 废物流

默认田间繁种过程不要求废物输入。若使用粪肥、堆肥、再生水或废弃物来源的土壤改良剂，应根据来源数据集和本地法律状态明确建模为废物流输入或产品流输入。

##### 基本流

| Flow role | Selected flow | Tiangong UUID@version | Flow property / unit | 草案常见范围 | 范围基准 | 范围来源 | 范围质量 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 土地占用 | Pending Tiangong flow selection | `pending-db-match` | area-time | site-specific | per crop cycle | `authoring-prior-wheat-seed` | pending-review |
| 取水 | water | `419682fe-60fb-4b43-be89-bf2824b51104@00.00.002` | Mass / kg | 与灌溉水输入对齐 | per 1,000 kg harvested seed crop | `tg-process-wheat-cultivation` | observed-row |

#### 输出

##### 产品流

| Flow role | Selected flow | Tiangong UUID@version | Flow property / unit | 草案常见范围 | 范围基准 | 范围来源 | 范围质量 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 收获小麦种子作物 | Wheat | `12da5e7d-9b93-4404-8c7d-08f98bec6238@01.01.002` | Mass / kg | 1,000 kg | field subprocess quantitative reference | `tg-flow-wheat-seed` | observed-row |
| 秸秆或田间残余 | Wheat straw | `bcaf0254-cdd3-43d1-823a-2f69df3801d8@01.01.001` | Mass / kg | 0-2,000 kg | per 1,000 kg harvested seed crop | `authoring-prior-wheat-seed` | draft-prior |

##### 废物流

默认不要求田间废物输出。作物残余根据已证明去向，建模为产品、还田残余或废物。

##### 基本流

| Flow role | Selected flow | Tiangong UUID@version | Flow property / unit | 草案常见范围 | 范围基准 | 范围来源 | 范围质量 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 土壤直接 N2O，以空气排放记录 | nitrous oxide, emissions to air unspecified | `08a91e70-3ddc-11dd-94c3-0050c2490048@03.00.004` | Mass / kg | 根据 N 投入计算；IPCC EF1 默认值为施用 N 的 1 percent，以 N2O-N 计 | per N input | `ipcc-2019-managed-soils-n2o` | literature |
| 氨挥发 | ammonia, emissions to air unspecified | `08a91e70-3ddc-11dd-a2a9-0050c2490048@03.00.004` | Mass / kg | site-specific | per N input | `authoring-prior-wheat-seed` | pending-review |
| 硝酸盐淋失 | nitrate, emissions to fresh water | `4d9a8790-3ddd-11dd-8d68-0050c2490048@03.00.004` | Mass / kg | site-specific | per N input | `ipcc-2019-managed-soils-n2o` | pending-review |
| 化石二氧化碳 | carbon dioxide (fossil), emissions to air unspecified | `08a91e70-3ddc-11dd-923d-0050c2490048@03.00.004` | Mass / kg | 由燃料和能源数据集派生 | per process inventory | `tg-cli-flow-search-2026-06-23` | derived |

### 过程：种子清选、处理与包装

该过程表示必要干燥、清选、分级、实验室检测、可选药剂处理、包装和种子加工厂短期储存。

#### 输入

##### 产品流

| Flow role | Selected flow | Tiangong UUID@version | Flow property / unit | 草案常见范围 | 范围基准 | 范围来源 | 范围质量 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 收获种子作物输入 | Wheat | `12da5e7d-9b93-4404-8c7d-08f98bec6238@01.01.002` | Mass / kg | 1,000-1,250 kg | per 1,000 kg cleaned seed output | `usda-seed-cleaning-handling`, `authoring-prior-wheat-seed` | draft-prior |
| 清选和加工用电 | alternating current | `4d0361a3-56cc-45f9-aa42-bb9103285bf9@01.01.001` | Net calorific value / MJ or kWh | 18-288 MJ | per 1,000 kg cleaned seed output | `authoring-prior-wheat-seed` | draft-prior |
| 种子处理杀菌剂 proxy | Azoxystrobin | `8a1f4968-6428-413f-a50b-b413bf9190cf@01.01.001` | Mass / kg | 0-10 g active ingredient/kg seed | per kg treated seed | `authoring-prior-wheat-seed` | pending-review |
| 种子处理杀虫剂 proxy | Insecticide | `ba2ec0c8-d5da-4ca8-bf9f-317478a1ce1b@01.01.002` | Mass / kg | 0-10 g active ingredient/kg seed | per kg treated seed | `authoring-prior-wheat-seed` | pending-review |
| 包装单元 | Woven polypropylene bag | `9bfaad07-355e-467a-9bab-f95094e7c869@01.01.000` | Number of items / item | 20-50 bags | per 1,000 kg packaged seed, depending on bag size | `tg-cli-flow-search-2026-06-23` | draft-prior |

##### 废物流

默认种子加工过程不要求废物输入。

##### 基本流

默认不要求基本流输入。若调质或抑尘需要加水，应在有测量数据时建模。

#### 输出

##### 产品流

| Flow role | Selected flow | Tiangong UUID@version | Flow property / unit | 草案常见范围 | 范围基准 | 范围来源 | 范围质量 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 清选后小麦播种种子 | Wheat | `12da5e7d-9b93-4404-8c7d-08f98bec6238@01.01.002` | Mass / kg | 1,000 kg | PCR reference output | `tg-flow-wheat-seed` | observed-row |
| 若种子加工厂拥有残余物，市场化秸秆 | Wheat straw | `bcaf0254-cdd3-43d1-823a-2f69df3801d8@01.01.001` | Mass / kg | optional | only if included in seed plant boundary | `authoring-prior-wheat-seed` | pending-review |

##### 废物流

| Flow role | Selected flow | Tiangong UUID@version | Flow property / unit | 草案常见范围 | 范围基准 | 范围来源 | 范围质量 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 筛下物、不合格种子、粉尘和等外物 | Rejects | `e6d6aa78-105e-4acc-a84b-46f68765a1cc@00.00.004` | Mass / kg | 10-200 kg | per 1,000 kg cleaned seed output | `usda-seed-cleaning-handling`, `tg-cli-flow-search-2026-06-23` | proxy |
| 包装废弃物 | Pending Tiangong flow selection | `pending-db-match` | Mass / kg | site-specific | per 1,000 kg packaged seed | `authoring-prior-wheat-seed` | pending-review |

##### 基本流

| Flow role | Selected flow | Tiangong UUID@version | Flow property / unit | 草案常见范围 | 范围基准 | 范围来源 | 范围质量 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 清选粉尘排入空气 | Pending Tiangong flow selection | `pending-db-match` | Mass / kg | site-specific | per 1,000 kg cleaned seed output | `usda-seed-cleaning-handling` | pending-review |
| 加工能源导致的化石二氧化碳 | carbon dioxide (fossil), emissions to air unspecified | `08a91e70-3ddc-11dd-923d-0050c2490048@03.00.004` | Mass / kg | 由能源数据集派生 | per process inventory | `tg-cli-flow-search-2026-06-23` | derived |

### 过程：储存与交付边界运输

该过程是条件性过程。若声明的参考流为储存后种子或送达种子，应纳入本过程。

#### 输入

##### 产品流

| Flow role | Selected flow | Tiangong UUID@version | Flow property / unit | 草案常见范围 | 范围基准 | 范围来源 | 范围质量 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 储存用电 | alternating current | `4d0361a3-56cc-45f9-aa42-bb9103285bf9@01.01.001` | Net calorific value / MJ or kWh | site-specific | per storage duration | `authoring-prior-wheat-seed` | pending-review |
| 交付运输燃料 | Diesel oil | `9d258d75-6792-4f1c-9856-81602ed8f816@01.01.001` | Mass / kg | route-specific | per tonne-km | `tg-cli-flow-search-2026-06-23` | pending-review |

##### 废物流

默认不要求废物输入。

##### 基本流

默认不要求基本流输入。

#### 输出

##### 产品流

| Flow role | Selected flow | Tiangong UUID@version | Flow property / unit | 草案常见范围 | 范围基准 | 范围来源 | 范围质量 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 已声明交付边界产品 | Wheat | `12da5e7d-9b93-4404-8c7d-08f98bec6238@01.01.002` | Mass / kg | 1,000 kg | if reference flow is 1,000 kg delivered seed | `tg-flow-wheat-seed` | observed-row |

##### 废物流

| Flow role | Selected flow | Tiangong UUID@version | Flow property / unit | 草案常见范围 | 范围基准 | 范围来源 | 范围质量 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 储存损耗或受损种子 | Rejects | `e6d6aa78-105e-4acc-a84b-46f68765a1cc@00.00.004` | Mass / kg | 0-20 kg | per 1,000 kg stored seed | `authoring-prior-wheat-seed` | draft-prior |

##### 基本流

| Flow role | Selected flow | Tiangong UUID@version | Flow property / unit | 草案常见范围 | 范围基准 | 范围来源 | 范围质量 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 储存或运输能源导致的化石二氧化碳 | carbon dioxide (fossil), emissions to air unspecified | `08a91e70-3ddc-11dd-923d-0050c2490048@03.00.004` | Mass / kg | 由燃料和能源数据集派生 | per process inventory | `tg-cli-flow-search-2026-06-23` | derived |

## 7. 分配与共产品处理

按以下顺序决策：

1. 通过细分种子生产、类粮食筛下物、秸秆管理和不合格物处理过程来避免分配。
2. 只有在被替代产品和市场有证据时，才使用替代法。
3. 当种子、筛下物和秸秆均为市场产品且价格数据可靠时，使用经济分配。
4. 质量分配仅作为兜底方法，并标记为需要复核。

不合格种子、筛下物、秸秆和包装废弃物必须有声明去向，可为产品输出、废物处理、还田、翻埋、饲料利用、露天焚烧或其他有证据的路线。

## 8. 数据质量与证据规则

最低前景数据要求：

- 地理范围和生产年份，或多年平均
- 种子等级和种批质量
- 田间产量和清选后种子产量
- 播种量和繁种世代
- 肥料类型和施用量
- 灌溉状态、水源，以及灌溉时的抽水能源
- 田间燃料用量或作业清单
- 干燥、清选、药剂处理和包装能源
- 种子处理有效成分和载量
- 筛下物、不合格物、秸秆和包装废弃物去向

优先数据质量：

- 天气敏感地区至少使用三年田间产量平均值
- 种子清选产率和不合格率使用一手数据
- 使用区域化氮和农药排放模型
- 加工能源显著时使用供应商或地点电力结构
- 明确收获和清选后种子的含水率基准

## 9. 校验规则

发布使用本 PCR 的 process 或 lifecyclemodel 前，应检查：

- 参考流包含质量、交付边界、种子处理状态和种子质量限定
- 模型区分种子产品和普通商品粮
- 数据允许时，将田间繁种和种子加工拆成独立过程
- 肥料、燃料、灌溉、加工能源、包装和种子处理投入均已处理
- 范围内已考虑 N2O、氨、硝酸盐、化石 CO2、取水和土地占用
- 筛下物、不合格种子、秸秆和包装废弃物有声明去向
- 分配方法已声明并给出理由
- 所有超出草案筛查范围的值都有来源说明或 review flag

## 10. 数据源

| Source id | Type | Reference | 用途 | 复核状态 |
| --- | --- | --- | --- | --- |
| `tg-flow-wheat-seed` | Tiangong flow row | `12da5e7d-9b93-4404-8c7d-08f98bec6238@01.01.002` | 参考流身份和产品流复用 | selected |
| `tg-cli-flow-search-2026-06-23` | Tiangong CLI search | `search flow` queries for wheat seed, fertilizers, fuel, electricity, packaging, waste proxy, and elementary flows | UUID 候选选择 | selected |
| `tg-cli-support-read-2026-06-23` | Tiangong DB support rows | flowproperties `93a60a56-a3c8-11da-a746-0800200b9a66`, `93a60a56-a3c8-11da-a746-0800200c9a66`, `01846770-4cfe-4a25-8ad9-919d8d378345`; unitgroups `93a60a57-a4c8-11da-a746-0800200c9a66`, `93a60a57-a3c8-11da-a746-0800200c9a66`, `5beb6eed-33a9-47b8-9ede-1dfe8f679159` | flow property 和 unit group UUID | selected |
| `tg-process-wheat-cultivation` | Tiangong process row | `d145ea84-0aa6-4fca-a8f8-99ef3684d016@01.01.000`, `Wheat Cultivation` | 田间清单量级对照，尤其灌溉水输入 | comparator only |
| `fao-wheat-seed-production` | official guidance | <https://www.fao.org/4/y4011e/y4011e0v.htm> | 种子认证、质量控制和过程边界 | background |
| `unl-wheat-seeding-rate` | extension guidance | <https://cropwatch.unl.edu/determining-seeding-rate-your-winter-wheat/> | 播种量背景 | background |
| `umn-small-grain-seeding-rate` | extension guidance | <https://extension.umn.edu/planting-small-grains/seeding-rate-small-grains> | 播种量公式和成苗损失背景 | background |
| `usda-seed-cleaning-handling` | official handbook | <https://www.govinfo.gov/content/pkg/GOVPUB-A-PURL-gpo20323/pdf/GOVPUB-A-PURL-gpo20323.pdf> | 种子清选过程拆分和筛下物背景 | background |
| `ipcc-2019-managed-soils-n2o` | official method guidance | <https://www.ipcc-nggip.iges.or.jp/public/2019rf/pdf/4_Volume4/19R_V4_Ch11_Soils_N2O_CO2.pdf> | N2O 直接排放因子和氮排放建模 | background |
| `authoring-prior-wheat-seed` | reviewer prior | this draft PCR | 仍需专家复核的占位范围 | pending-review |

## 11. CLI 查询记录

| Trace id | Command or lookup | Query intent | Selected references | Notes |
| --- | --- | --- | --- | --- |
| `cli-flow-wheat-seed` | `tiangong-lca search flow --json` | `query=wheat seed`, `flowType=Product flow` | `12da5e7d-9b93-4404-8c7d-08f98bec6238@01.01.002` | 因 classification leaf 为 `Wheat, seed` 选用 |
| `cli-flow-field-inputs` | `tiangong-lca search flow --json` | diesel, electricity, urea, phosphate fertilizer, potassium fertilizer, irrigation water | diesel `57e0b1a3-2d05-46b2-b61b-cf7b5b167c6f`, electricity `4d0361a3-56cc-45f9-aa42-bb9103285bf9`, urea `3f8850c0-f718-4c4b-8fcb-8fd42e03aa8e`, phosphate `9c196b01-6aad-4252-a6e8-f853853a830c`, potassium `dd008d87-16e4-4e85-a048-b9949f6fbca6`, irrigation water `4ad684b1-8e85-4dee-8d9c-55d1fa2d4432` | 作为可复用产品流候选 |
| `cli-flow-crop-protection` | `tiangong-lca search flow --json` | herbicide, fungicide, insecticide, seed treatment | herbicide `c1370404-9e2b-4ed6-ba96-c094f74e0f2d`, azoxystrobin `8a1f4968-6428-413f-a50b-b413bf9190cf`, insecticide `ba2ec0c8-d5da-4ca8-bf9f-317478a1ce1b` | proxy，不是作物特定用药处方 |
| `cli-flow-outputs-waste` | `tiangong-lca search flow --json` | wheat straw and rejected seed/screenings | wheat straw `bcaf0254-cdd3-43d1-823a-2f69df3801d8`; generic rejects `e6d6aa78-105e-4acc-a84b-46f68765a1cc` | rejects 为 proxy，等待 wheat-seed 专用废物流 |
| `cli-flow-elementary` | `tiangong-lca search flow --json` | N2O air, ammonia air, nitrate water, fossil CO2 air, water resource | N2O `08a91e70-3ddc-11dd-94c3-0050c2490048`, ammonia `08a91e70-3ddc-11dd-a2a9-0050c2490048`, nitrate `4d9a8790-3ddd-11dd-8d68-0050c2490048`, fossil CO2 `08a91e70-3ddc-11dd-923d-0050c2490048`, water `419682fe-60fb-4b43-be89-bf2824b51104` | 尽可能按 compartment 选择 |
| `cli-process-wheat-cultivation` | `tiangong-lca search process --json` then `process get --id d145ea84-0aa6-4fca-a8f8-99ef3684d016 --version 01.01.000 --json` | wheat cultivation comparator | process row `d145ea84-0aa6-4fca-a8f8-99ef3684d016@01.01.000` | 用作对照，不作为最终 wheat-seed process |
| `support-flowproperty-unitgroup` | support row lookup using Tiangong DB runtime | flow property and unit group UUIDs referenced by selected flows | Mass, Net calorific value, Number of items, Units of mass, Units of energy, Units of items | 当前 CLI 公开 flow/process/lifecyclemodel search，support row lookup 单独记录 |
