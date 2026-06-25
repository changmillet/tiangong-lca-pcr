import assert from "node:assert/strict";
import test from "node:test";

import { parsePcrMarkdownToStructured } from "./markdown-projection.mjs";

test("parsePcrMarkdownToStructured reads localized Chinese flow cards", () => {
  const projection = parsePcrMarkdownToStructured(`
## 6. 过程清单结构

### 过程：清洗（\`cleaning\`）

#### 输入

##### 产品流

###### 清洗水（\`washing_water\`）

清洗水作为输入产品流记录。

- 选定流：Process water \`ec205030-248c-496f-9cf2-06d9d26dc6ff\`
- 流属性/单位：Mass / kg
- 数量规则：计量用水量
- 数值来源模式：前景记录（\`foreground_record\`）
- 适用范围：场址特定（\`site_specific\`）
- 归一化基准：每 1,000 kg 清洁产品输出
- 基准类型：过程输出（\`process_output\`）
- 证据类型：采集记录（\`collected_record\`）
- 采集协议：\`cp_washing_water_records\`
- 来源：\`source-id\`
`);

  const row = projection.processInventory[0].inputs.product[0];

  assert.equal(row.row_id, "washing_water");
  assert.equal(row.role, "清洗水");
  assert.equal(row.uuid, "ec205030-248c-496f-9cf2-06d9d26dc6ff");
  assert.equal(row.amount.value_mode, "foreground_record");
  assert.equal(row.amount.specificity, "site_specific");
  assert.equal(row.amount.basis.kind, "process_output");
  assert.equal(row.amount.evidence.kind, "collected_record");
  assert.equal(row.amount.evidence.collection_protocol_id, "cp_washing_water_records");
  assert.deepEqual(row.amount.evidence.source_ids, ["source-id"]);
});

test("parsePcrMarkdownToStructured reads nested localized range fields", () => {
  const projection = parsePcrMarkdownToStructured(`
## 6. 过程清单结构

### 过程：接收（\`receipt\`）

#### 输出

##### 废物流

###### 接收拒收物（\`receipt_rejects\`）

接收阶段移除的不合格材料。

- 选定流：选择路线特定废物流
- 流属性/单位：Mass / kg
- 数量规则：接收后移除的拒收质量。
- 数值来源模式：前景记录（\`foreground_record\`）
- 适用范围：场址特定（\`site_specific\`）
- 归一化基准：相对于进厂来源材料的拒收质量。
- 基准类型：过程输出（\`process_output\`）
- 证据类型：采集记录（\`collected_record\`）
- 采集协议：\`cp_reject_records\`
- 数量范围：质量守恒 QA 校验范围
  - 范围角色：QA 校验（\`qa_guardrail\`）
  - 下限：0
  - 上限：1
  - 单位：kg/kg 接收来源材料
  - 基准：接收来源材料的质量分数
  - 基准类型：过程输出（\`process_output\`）
  - 证据类型：方法公式（\`method_formula\`）
  - 来源：\`mass-balance-identity\`
`);

  const row = projection.processInventory[0].outputs.waste[0];

  assert.deepEqual(row.amount.ranges, [
    {
      role: "qa_guardrail",
      lower: "0",
      upper: "1",
      unit: "kg/kg 接收来源材料",
      basis: "接收来源材料的质量分数",
      basis_kind: "process_output",
      evidence_kind: "method_formula",
      source_ids: ["mass-balance-identity"],
    },
  ]);
});
