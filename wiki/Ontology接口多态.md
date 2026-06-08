---
tags: [Ontology, Interfaces, Palantir-AIP, 多态]
created: 2026-05-21
source: "[[raw/palantir_docs_interfaces_overview]]"
---
# Ontology 接口多态

## 定义

**Interfaces（接口）** 是 Foundry Ontology 中实现 **Object Type 多态** 的核心机制。Interface 定义了一组共享的属性和 Link Types，多个不同的 Object Type 可以同时实现同一个 Interface——从而让不同对象类型表现出相同的"形状"。

## 核心属性

### Interface 的本质

Interface 不定义完整的 Object Type——它只定义**部分形状（partial shape）**：
```
Interface [Aircraft]
  ├── Property: "Tail Number"
  ├── Property: "Max Altitude"
  └── Link: "Manufacturer → Company"
        ↓ 实现
  Object Type [Helicopter]  +  "Rotor Count", "Hover Capability" ...
  Object Type [FixedWing]   +  "Wing Span", "Runway Required" ...
```

两个不同的 Object Type 共享 Interface 定义的属性，但各自还有额外的专有属性。

### 多态的应用

因为 Interface 创建了共享形状，Workshop / Slate / Quiver 等工具可以：
- **以统一方式处理不同类型对象**：一个 Widget 配置为绑定 `[Aircraft]` Interface → 可同时显示 `Helicopter` 和 `FixedWing` 对象
- **Interface 条件**：在 Automations 中基于 Interface 设置条件（如"对所有实现 `[Safety_Critical]` 接口的对象执行检查"）
- **跨类型查询**：在 Quiver 中同时分析所有实现了同一 Interface 的对象

### Interface 与 Object Type 的关系

| 概念 | 范围 | 类比 |
|------|------|------|
| Object Type | 一类事物的完整定义 | 编程中的 Class |
| Interface | 多类事物的共享形状 | 编程中的 Interface/Trait |
| Object Instance | 某个具体事物 | 编程中的 Instance |

## 业务用途

### 为什么需要 Interface？

**场景**：一个组织有 5 种不同类型的资产（设备、车辆、建筑、IT系统、许可证），每种都有不同的属性——但它们都需要一个共同的"维护计划"概念。

**Without Interface**：每个 Object Type 各自定义维护相关字段（命名不统一、结构不一致）→ 无法统一管理 "所有需要维护的东西"。

**With Interface**：定义 `[Maintainable]` Interface（含 "Next Maintenance Date"、"Maintenance Interval"、"Assigned Technician"）→ 5 个 Object Type 全部实现此 Interface → Workshop 中一个 Widget 就可以展示所有 5 类资产的维护状态。

### 典型使用模式

1. **合规标签**：定义 `[GDPR_Relevant]` Interface → 所有涉及个人数据的 Object Type 实现它 → 一次扫描所有合规对象
2. **财务属性**：定义 `[Billable]` Interface → 所有可计费对象共享计费逻辑 → 统一账单生成
3. **状态追踪**：定义 `[Trackable]` Interface → 所有需要追踪状态的对象共享 Status 属性 → 统一状态看板

## 外贸应用

### LILIS Interface 设计

| Interface 名称 | 共享属性 | 实现的 Object Type | 用途 |
|---------------|---------|-------------------|------|
| `[DateTrackable]` | Created_Date, Last_Updated, Status | Product, Inquiry, Order, P4P_Campaign | 统一时效性监控 |
| `[Analyzable]` | CTR, Impressions, Clicks, Conversion_Rate | Product, P4P_Campaign | 统一效果分析 |
| `[Reviewable]` | Avg_Rating, Review_Count, Last_Review_Date | Product | 评价监（未来扩展到 Supplier） |
| `[BudgetTrackable]` | Budget, Spent, Remaining, ROI | P4P_Campaign | P4P预算统一管理 |

### 实际价值

```python
# Without Interface — 需要分别为每个类型写分析逻辑
analyze_product_performance(product_id)
analyze_p4p_performance(campaign_id)

# With Interface — 统一接口
analyze_performance(object_id)  # 自动判断是 Product 还是 Campaign
```

这大大简化了运营仪表盘的构建——同一个 Chart XY Widget 可以同时展示产品和 P4P 的 CTR 趋势，因为两者都实现了 `[Analyzable]` Interface。

## 常见问题

**Q: Interface 和 Shared Property 有什么区别？**
A: Shared Property 是单个属性的复用；Interface 是一组属性+Link 的组合复用。Interface 提供的是"形状级别"的复用，更粗粒度。

**Q: 一个 Object Type 可以实现多个 Interface 吗？**
A: 可以。例如 `Product` 可以同时实现 `[DateTrackable]`、`[Analyzable]`、`[Reviewable]` 三个 Interface。

**Q: LILIS 没有 Foundry 实例，如何利用 Interface 概念？**
A: 在数据模型设计中引入 "Trait" 设计模式——为共享属性集定义标准字段名，确保不同实体中同一概念使用相同字段名和类型。例如所有需要"时效性追踪"的实体都包含 `created_at`、`updated_at`、`status` 三个字段。

## 相关链接
- [[Ontology深度总览]] — Ontology全景
- [[Object-Views构建]] — Object Views设计
- [[LILIS数据模型v2]] — LILIS数据模型
- [[Ontology应用生态]] — 应用矩阵
- [[主页]]
- [[术语索引]]
- [[链接类型深度]]
