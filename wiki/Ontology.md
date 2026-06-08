---
tags:
  - Palantir
  - Ontology
  - 数据模型
  - Foundry
created: 2026-05-20
source: "[[AIP_Ontology_Alibaba_Blueprint]]"
---

# Ontology（本体论）

## 定义

**Ontology** 是 Palantir Foundry 的核心数据建模概念，将现实世界的业务对象映射为数字孪生。它不仅存储数据，还定义了对象间的关系（Links）、可执行的操作（Actions）和业务规则。

在 Palantir AIP 体系中，Ontology 是 LLM 工作流的数据基座——所有 [[AIP-Logic|Logic Functions]] 都通过 Ontology 读写业务数据。

## 核心属性

### 四要素

| 要素 | Palantir 术语 | 说明 |
|------|-------------|------|
| **对象类型** | Object Type | 业务实体的抽象（如 Product、Order、Customer） |
| **属性** | Property | 对象的字段（如 Product.price、Order.total_value） |
| **关系** | Link | 对象间的关联（如 Customer → Order → Product） |
| **操作** | Action | 可执行的动作（如 PublishProduct、UpdatePrice） |

### Ontology 映射画布

```
Palantir AIP 概念           →  业务对应
══════════════════════════════════════════════════
Object Type                →  产品 / 订单 / 客户 / 活动方案
Property                   →  业务字段（尺寸/颜色/材质/用途）
Link                       →  品类关联（搭配链）
Action                     →  上架/组套餐/报价/发货
Function (Logic)           →  搭配推荐/季节性预测/询盘分类
Evaluation Suite           →  品类 KPI / 转化漏斗
Workflow Lineage           →  操作审计（谁创建了套餐，谁调了价）
```

## 业务用途

- 统一企业数据语义，消除数据孤岛
- 为 AI 工作流提供结构化、可查询的数据源
- 内置权限和安全模型，确保数据访问控制

## 外贸应用

> 参见 [[LILIS-婚庆派对用品]]、[[AIP_Ontology_Alibaba_Blueprint]]

在 LILIS 外贸场景中的 Ontology 设计：

| Object Type | 核心属性 | 用途 |
|-------------|---------|------|
| **Product** | id, title, brand, category, price, moq, material, use_case, product_level | 产品目录管理与诊断 |
| **ProductBundle** | id, name, products[], theme, total_price | 婚庆套餐组合（行业独有） |
| **Inquiry** | id, source, content, event_type, urgency_score, category | 询盘分类与路由 |
| **Order** | id, items[], total_value, event_deadline | 订单追踪 |
| **Customer** | id, country, buyer_type, season_preference, lifetime_value | 客户画像与复购 |
| **AfterSales** | id, issue_type, status, customer_satisfaction | 售后质量管理 |
| **P4P_Campaign** | id, keywords[], daily_budget, roi, best_keyword | [[P4P投流策略]] |
| **Store** | id, star_rating, total_products, response_rate | 店铺健康度 |

### 关系图谱

```
Customer ──sends──────→ Inquiry
Customer ──places─────→ Order
Inquiry ──references──→ Product[]
Inquiry ──converts_to─→ Order
Order ──contains─────→ Product[] / ProductBundle
Order ──generates────→ AfterSales
Product ──bundled_in──→ ProductBundle[]
Product ──promoted_by─→ P4P_Campaign
Product ──paired_with──→ Product (交叉销售搭配链)
```

## 常见问题

**Q: Ontology 和传统数据库有什么区别？**
A: Ontology 不仅存储数据，还包含关系（Links）、操作（Actions）和安全规则，是业务对象的完整数字孪生。传统数据库只管 CRUD。

**Q: Ontology Size Limits？**
A: Ontology 大小有限制，过大的 Ontology 影响 AIP 性能。需要精心设计属性粒度和类型数量。

## 相关链接

- [[AIP-Logic]] — Logic 函数通过 Ontology 读写数据
- [[AIP-Evals]] — Ontology 编辑验证
- [[Sense-Reason-Act架构]] — Ontology 在 SENSE 层的位置
- [[AIP总览]] — Foundry 与 AIP 的关系
- [[AIP+Ontology产品增强分析]]
- [[AIP-Analyst]]
- [[AIP-Beacon-产品命名与品牌定位]]
- [[AIP-Chatbot-Studio]]
- [[AIP-Observability]]
- [[AIP神经符号架构]]
- [[LILIS数据模型v2]]
- [[LILIS跨平台预测分析]]
- [[Palantir-MCP]]
- [[ProductBundle]]
- [[Skills技能集与60-40覆盖]]
- [[主页]]
- [[产品策略-国际站AI运营Agent]]
- [[动力层与写回]]
- [[卖家痛点深度分析]]
- [[本体增强生成]]
- [[术语索引]]
- [[经验累积与竞争壁垒]]
- [[询盘]]
