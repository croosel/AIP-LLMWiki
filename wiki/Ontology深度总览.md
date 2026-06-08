---
tags: [Ontology, Palantir-AIP, Foundry核心, 数字孪生, 语义层]
created: 2026-05-21
source: "[[raw/palantir_docs_ontology_overview]]"
---
# Ontology深度总览

## 定义

**Ontology（本体）** 是 Palantir Foundry 的**核心操作层**——它不是抽象数据模型，而是将组织中每一个业务实体映射到实际数据上的**数字孪生**。Ontology 作为 Foundry 的语义中心，连接了原始数据管道与终端用户应用程序之间的断层。

Ontology 包含两大维度：

| 维度 | 英文 | 说明 | 构成 |
|------|------|------|------|
| **语义维度** | Semantic | 描述"是什么" | Object Types / Properties / Link Types / Interfaces |
| **动力维度** | Kinetic | 描述"做什么" | Actions / Functions (FOO) / Automations |

## 核心属性

### 1. 语义元素（Semantic Elements）

**Object Types（对象类型）** — 对真实世界实体或事件的模式定义。例如 `Employee`、`Flight`。**Object** 指单个实例（如 "Melissa Chang"），**Object Set** 指一组实例。类比：Object Type ≈ Dataset Schema / Object ≈ Row / Object Set ≈ Filtered Rows。

**Properties（属性）** — 字段定义，支持 Shared Properties 跨 Object Type 复用。每个 Object Type 至少需要一个 Primary Key。

**Link Types（链接类型）** — 两个 Object Type 之间的关系模式。Link 是单个关系实例。支持多对一/多对多。Object-backed Link Types 可将 Link 作为 Object 存储。

**Interfaces（接口）** — 跨 Object Type 的共享形状，实现 **Object Type 多态**：不同 Object Type 实现同一 Interface，允许以统一方式处理不同类型对象。

### 2. 动力元素（Kinetic Elements）

**Actions** — 对 Ontology 的写操作，支持 Workshop/Slate 触发和批量操作。

**Functions on Objects (FOO)** — 读/计算操作，被 Workshop widget 调用，用于派生计算和数据转换。

**Automations** — 基于条件的自动化流程：Time Condition / Object Set Condition → Action/Logic/Notification/Function Effects。

## 业务用途

### Ontology ≠ 数据仓库

数据仓库/数据集是物理存储，面向工程师；Ontology 是语义操作层，面向业务用户。Ontology 解决了"最后一公里"问题：非技术人员也能通过 Object Explorer / Workshop / Quiver 直接探索和操作业务数据。

### 与用户工具深度融合

Ontology 深度集成到全部 Foundry 界面：Object Explorer（搜索+钻取）、Quiver（高级分析+时序）、Workshop（无代码应用）、Slate（灵活+自定义CSS）、Vertex（图可视化+因果分析）、Notepad（对象感知文档）、Carbon（策展工作空间）。

## 外贸应用

### LILIS 国际站 Ontology 映射

| Foundry 概念 | LILIS/Alibaba 映射 | 说明 |
|-------------|-------------------|------|
| Object Type: `Product` | 国际站产品 | 标题/价格/MOQ/星级 |
| Object Type: `Inquiry` | 询盘 | 买家信息/产品ID/内容/时间 |
| Object Type: `Order` | 订单 | 金额/状态/物流 |
| Object Type: `P4P_Campaign` | P4P推广计划 | 预算/关键词/CTR/CPC |
| Link: `Product→Inquiry` | 产品→询盘 | 一对多 |
| Link: `Product→P4P_Campaign` | 产品→P4P | 多对多 |
| Action: `AdjustBid` | P4P调价 | 自动/手动调整出价 |
| Action: `DelistProduct` | 产品下架 | 触发修改→重上架 |
| Automation: `P4P_Budget_Alert` | P4P预算预警 | 消耗>80%通知 |

### 数字孪生视角

LILIS 运营数字孪生结构：
```
P4P 广告表现 (Time Series)
  ├── Keyword CTR 趋势
  ├── 日预算消耗曲线
  └── 竞品出价变化
        ↓ Link
产品数据 (Object)
  ├── 曝光/点击/询盘
  ├── 星级/评价
  └── 橱窗位状态
        ↓ Link
询盘管道 (Object)
  ├── 来源分析
  ├── 响应时间
  └── 转化漏斗
```
这实现 **"Sense→Reason→Act"** 闭环：感知P4P异常→推理原因→执行调价。

## 常见问题

**Q: Ontology 和数据库 Schema 的区别？**
A: 数据库 Schema 是物理存储结构面向机器；Ontology 是业务语义层面向人，通过 Backing Datasource 连接实际数据。

**Q: 没有 Foundry 实例能建 Ontology 吗？**
A: 不能运行原生 Ontology，但可用其设计模式在 Alibaba 数据上构建等效概念本体——统一数据模型、关系和操作定义来组织运营知识和自动化决策。

**Q: Object Type 与 Interface 的关系？**
A: Object Type 定义完整 Schema；Interface 定义多个 Object Type 可共享的部分形状。如 `[Aircraft]` Interface 可被 `[Helicopter]` 和 `[FixedWing]` 同时实现。

## 相关链接
- [[Why-Ontology]] — 商业案例
- [[Ontology应用生态]] — 完整应用矩阵
- [[Ontology接口多态]] — Interfaces与多态
- [[Object-Views构建]] — Object Views设计
- [[Object-Explorer]] — 搜索与钻取
- [[LILIS数据模型v2]] — LILIS数据模型
- [[Action-Types详解]] — Actions与Automations
- [[AIP与Ontology架构关系分析]]
- [[Automate与工作流]]
- [[主页]]
- [[开发者工具链总览]]
- [[术语索引]]
- [[链接类型深度]]
