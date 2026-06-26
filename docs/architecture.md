---
title: PCR 资料库架构
docType: reference
scope: repo
status: draft
authoritative: true
owner: tiangong-lca-pcr
language: zh-CN
whenToUse:
  - 当变更 canonical PCR identity、分类来源处理、映射或模块时
  - 当判断某个分类体系应该创建 PCR 记录还是 mapping 记录时
whenToUpdate:
  - 当 PCR 目录结构变化时
  - 当分类导入或 mapping 架构变化时
  - 当生成 scaffold 的治理规则变化时
  - 当公开 PCR 消费 CLI、Agent skill 或 feedback intake 架构变化时
checkPaths:
  - docs/architecture.md
  - AGENTS.md
  - README.md
  - .docpact/config.yaml
  - builder/**
  - packages/**
  - skills/**
  - .github/ISSUE_TEMPLATE/**
  - classifications/**
  - library/modules/**
lastReviewedAt: 2026-06-26
lastReviewedCommit: dae1dbce5c42f410b706e5c4dfcfbf35e2aab0b0
---

# PCR 资料库架构

## 项目定位

本仓库是 TianGong LCA 的 PCR 方法学资料库。它负责存储 canonical PCR 内容，
并提供用于构建、校验、消费、预览和反馈 PCR 的工具链。

这个仓库同时服务两类使用者：

- 维护者和 AI production agent：创建、更新、审核、发布 PCR。
- 外部用户和 AI consumer agent：查找、解析、读取、验证、预览 PCR，并提交反馈。

架构文档的目标不是重复每个 CLI 的用法，而是说明：PCR truth 放在哪里、各层为什么存在、
跨层变更应该走哪条边界。

## 核心原则

- PCR 方法学 truth 存在 `library/pcrs/**`。
- 可复用方法规则存在 `library/modules/**`。
- 外部分类体系只是入口和索引，不拥有 PCR identity。
- `builder/` 负责构建、投影、校验和发布 PCR 内容。
- `packages/` 负责消费侧工具和运行时能力，不直接维护 PCR truth。
- `skills/` 只指导 agent 使用工具，不复制 PCR 方法学。
- feedback 是 candidate evidence，必须经过 maintainer intake 才能变成仓库变更。
- 生成物和派生物不能成为独立 truth source。

## 架构视图

```text
                         +----------------------+
                         | classifications/     |
                         | 外部分类 -> PCR id    |
                         +----------+-----------+
                                    |
                                    v
+-------------+        +------------+------------+        +---------------------+
| builder/    | -----> | library/                | -----> | packages/pcr-core/  |
| 构建与维护   |        | canonical PCR truth     |        | 共享只读消费核心       |
+------+------+        +------------+------------+        +----------+----------+
       |                            |                                |
       v                            v                                v
+------+-------+        +-----------+----------+          +----------+-----------+
| builder/docs |        | library/modules/     |          | CLI / viewer / skill |
| workflow     |        | shared method rules  |          | 面向用户和 agent       |
+--------------+        +----------------------+          +----------------------+

feedback -> issue template / feedback draft -> maintainer intake -> builder workflow -> library
```

读这个图时要注意三点：

- `builder/` 是写入侧，负责把维护者或 AI production agent 的工作落到 `library/`。
- `packages/pcr-core/` 是读取侧核心，负责把 `library/` 和 `classifications/` 变成稳定消费 API。
- CLI、viewer、skill 都是消费界面；它们不能绕过 `pcr-core` 自己发明一套 PCR 读取和投影规则。

## 组件职责

| 组件 | 职责 | 可以写什么 | 不能做什么 |
| --- | --- | --- | --- |
| `builder/` | PCR 构建、投影、lint、lifecycle、publish 工具层 | 通过 workflow 写入 `library/pcrs/**`、生成 `structured.yaml`、维护 builder schema/template/vocab | 不存储独立 PCR truth |
| `library/` | canonical PCR 内容和可复用方法规则 | `library/pcrs/**`、`library/modules/**`、必要索引 | 不放 CLI runtime、viewer UI 或 agent skill 行为 |
| `classifications/` | 外部分类体系 source、normalized data 和 mapping | `classifications/systems/**`、`classifications/mappings/**` | 不定义 PCR 目录结构，不用外部 code 充当 PCR identity |
| `packages/pcr-core/` | 共享只读消费核心 | catalog read、classification resolve、Markdown read、guidance projection、validation、feedback draft | 不直接修改 PCR 文件 |
| `packages/tiangong-pcr-cli/` | 外部用户和 AI agent 的命令行入口 | CLI command、help、output formatting、exit behavior | 不复制 `pcr-core` 的 library traversal 规则，不修改 PCR truth |
| `packages/pcr-viewer/` | 本地静态预览界面 | viewer build、static UI、local server | 不成为 PCR editor，不成为另一套 PCR database |
| `skills/tiangong-pcr/` | 指导外部 AI agent 使用 PCR CLI 和反馈流程 | 使用流程、CLI 指南、agent checklist | 不复制 PCR 方法学细节 |
| `.github/ISSUE_TEMPLATE/` | 结构化反馈入口 | missing PCR、mapping gap、UUID issue、range evidence、translation 等反馈模板 | 不直接改变 canonical PCR |
| `docs/` | repo 级架构、政策、authoring、release、coding 指南 | 稳定说明和跨层规则 | 不承载 builder 细节 workflow；细节放 `builder/docs/` |

## 核心数据模型

### PCR Record

一个 material PCR 是一个目录，而不是一个单文件，也不是一个外部分类 code。

```text
library/pcrs/<domain>/<subdomain>/<pcr-slug>/
  manifest.yaml      # identity / lifecycle / language-independent metadata
  pcr.en-US.md       # English human-readable methodology
  pcr.zh-CN.md       # Chinese human-readable methodology
  structured.yaml    # machine-facing projection for tools
```

文件职责：

- `manifest.yaml`：PCR id、title map、status、version、content maturity、translation state、target entities、module references、classification references。
- `pcr.en-US.md` / `pcr.zh-CN.md`：同一 PCR 方法学的双语人类可读文本。
- `structured.yaml`：供工具消费的结构化投影，包含 reference flow、boundary abstraction、measurement rules、process map、process inventory、dataset production requirements、validation rules、published dataset profile、data sources。

### Classification Mapping

classification mapping 把外部分类 code 映射到 canonical PCR id。

```text
classifications/systems/<system>/<version>/      # source / normalized classification data
classifications/mappings/<system>-<version>-to-pcr.yaml
```

同一个 PCR 可以被多个外部分类体系或多个分类 leaf 映射。新增分类体系通常应该新增 mapping，
而不是复制一棵 PCR 目录树。

### Module

`library/modules/**` 保存多个 PCR 可复用的方法规则，例如 reference flow、system boundary、
allocation、data quality 和 validation 规则。模块是方法学资产，不是消费工具。

### Guidance Output

`packages/pcr-core` 从 `structured.yaml` 构造 Agent-facing guidance。这个 guidance 是消费视图，
不是新的 authoring truth。CLI、viewer 和 skill 都应把它当作读取结果，而不是修改源。

### Feedback Draft

feedback draft 和 GitHub issue 是候选证据。它们可能指向 PCR 内容、mapping、UUID、range、
source、translation 或 validator 问题，但必须经过 maintainer intake 和 builder workflow
才能改变仓库 truth。

## 关键流程

### 创建或更新 PCR

```text
builder/AGENTS.md + builder/docs/index.md
  -> 选择 create/update/translate/review/publish workflow
  -> 编写或更新 library/pcrs/<...>/pcr.*.md
  -> npm run pcr:sync-structured -- --pcr <library/pcrs/...>
  -> npm run validate
  -> lifecycle / bump / publish when applicable
```

PCR production 可以使用公共证据和领域常识初始化候选过程结构，但最终 UUID 和关键定量规则
必须来自 Tiangong lookup 或可引用 evidence。lookup trace、session path、API key 和 access
token 不进入 PCR 内容。

### 外部分类 code 解析到 PCR

```text
classification code
  -> classifications/mappings/<system>-<version>-to-pcr.yaml
  -> canonical PCR id
  -> packages/pcr-core
  -> tiangong-pcr resolve / viewer search / agent guidance
```

外部分类 code 是入口，不是 PCR identity。如果两个分类 leaf 指向相同方法学品类，应映射到
同一个 PCR id。

### 外部用户或 AI agent 消费 PCR

```text
agent / user
  -> skills/tiangong-pcr or README
  -> npm --silent run tiangong-pcr -- <command>
  -> packages/tiangong-pcr-cli
  -> packages/pcr-core
  -> library + classifications
```

公开 CLI 提供 catalog browsing、classification resolution、PCR display、guidance output、
model validation、dataset validation 和 feedback draft。它是消费契约，不是 authoring 入口。

### 本地 viewer 预览 PCR

```text
npm run viewer:build
  -> packages/pcr-core reads library + classifications
  -> packages/pcr-viewer/dist/data/pcr-viewer-data.json
  -> npm run viewer:serve
  -> local static browser viewer
```

viewer 是只读预览界面。它可以帮助浏览、搜索和检查 Markdown/guidance/source，但不能编辑 PCR。

### feedback 回流

```text
user / agent finding
  -> tiangong-pcr feedback draft or GitHub issue template
  -> maintainer intake
  -> builder update workflow
  -> library/pcrs/** or classifications/mappings/**
```

feedback 可以触发 PCR 内容更新、mapping 修复、UUID 修正、range evidence 更新、translation
修正、source 更新、validator 调整或 CLI 行为修复。feedback 本身不是 truth。

## Source of Truth 与派生物

| 类型 | 路径 | 说明 |
| --- | --- | --- |
| PCR 方法学 truth | `library/pcrs/**` | canonical PCR 内容 |
| 可复用方法 truth | `library/modules/**` | 多个 PCR 共享的方法规则 |
| 外部分类 truth | `classifications/systems/**` | 分类体系 source 和 normalized 数据 |
| mapping truth | `classifications/mappings/**` | 外部分类 code 到 PCR id 的映射 |
| authoring behavior | `builder/**` | 构建、投影、lint、publish 行为 |
| consumption behavior | `packages/**`、`skills/**` | 读取、验证、展示和 agent 使用方式 |
| feedback intake | `.github/ISSUE_TEMPLATE/**`、`tiangong-pcr feedback draft` | 候选证据入口 |

派生物：

- `structured.yaml`：canonical PCR 内容的机器侧投影。
- `library/indexes/**`：用于浏览和检索的索引。
- `packages/pcr-viewer/dist/**`：由 `npm run viewer:build` 生成的静态 viewer artifact。
- `classifications/systems/<system>/<version>/normalized/**`：由 retained source artifact 和 import logic 派生的 normalized 分类数据。

派生物必须能从其 source input 和工具重新生成。派生物不能成为独立方法学 truth。

## 变更入口指南

| 你要做什么 | 应该改哪里 |
| --- | --- |
| 新建或实质更新一个 PCR | `library/pcrs/**`，并走 `builder/docs/workflows/**` |
| 同步 Markdown 到结构化规则 | `npm run pcr:sync-structured -- --pcr <library/pcrs/...>` |
| 调整 PCR lifecycle / version / publish 状态 | `manifest.yaml`，通过 `pcr:lifecycle`、`pcr:bump`、`pcr:publish` |
| 新增或修复分类映射 | `classifications/mappings/**` |
| 新增分类体系 source | `classifications/systems/**` 和对应 mapping |
| 修改 PCR 构建、lint 或 projection 规则 | `builder/lib/**`、`builder/schemas/**`、`builder/vocab/**` |
| 修改公开消费核心 API | `packages/pcr-core/**` |
| 修改 CLI 命令或输出 | `packages/tiangong-pcr-cli/**` |
| 修改 viewer UI 或本地预览能力 | `packages/pcr-viewer/**` |
| 修改 agent 使用说明 | `skills/tiangong-pcr/**` |
| 修改反馈入口 | `.github/ISSUE_TEMPLATE/**` 或 `packages/pcr-core` feedback draft |
| 修改 repo 级规则或说明 | `AGENTS.md`、`README.md`、`docs/**`、`.docpact/config.yaml` |

## 禁止跨层行为

- 不要让 classification code 成为 PCR directory slug。
- 不要因为新增分类体系而复制 PCR 记录。
- 不要让 CLI、viewer 或 skill 直接修改 `library/pcrs/**`。
- 不要让 viewer 绕过 `packages/pcr-core` 自己解析 PCR truth。
- 不要在 skill 中复制详细 PCR 方法学规则；skill 应指向 CLI 和 contracts。
- 不要把 feedback 当作已验证 truth；它必须经过 maintainer intake。
- 不要把 lookup trace、命令历史、session path、API key、access token 写入 PCR 文件。
- 不要把 `packages/pcr-viewer/dist/**` 当作源文件维护；它是 build artifact。

## 治理边界

生成的 leaf PCR scaffold 可以在 reviewed 方法学内容写入前保持空状态。Governance 和
docpact 检查覆盖 builder assets、mappings、modules、package surfaces、skills、feedback
intake 和 project contracts；大型生成目录 `library/pcrs/**` 在 PCR 文件成为 material
authored records 前仍保持排除。
