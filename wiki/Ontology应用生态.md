---
tags: [Ontology, Palantir-AIP, Workshop, Slate, Quiver, Vertex]
created: 2026-05-21
source: "[[raw/palantir_docs_ontology_applications]]"
---
# Ontology应用生态

## 定义

Palantir Foundry 提供完整应用生态，让不同技能水平用户基于 Ontology 构建和使用操作工具。从零代码 Object Explorer 到完全自定义 Slate，覆盖从浏览数据到构建复杂运营应用的全部场景。

## 应用全景矩阵

| 应用 | 用户画像 | 主要用途 | 技术门槛 | 数据源 |
|------|---------|---------|---------|--------|
| **Object Explorer** | 非技术用户 | 搜索/浏览/过滤对象 | 极低 | Ontology Objects |
| **Quiver** | 分析师 | 高级分析+时序+仪表盘 | 低 | Objects+Time Series |
| **Workshop** | 应用构建者 | 无代码操作应用 | 低-中 | Ontology Objects |
| **Slate** | 开发者 | 灵活应用+自定义UI | 中-高 | Objects+Datasets |
| **Notepad** | 知识工作者 | 对象感知协作文档 | 极低 | Objects |
| **Vertex** | 战略分析师 | 图可视化+因果分析 | 低 | Objects+Links |
| **Carbon** | 所有用户 | 策展工作空间 | 极低 | 混合资源 |

## 决策矩阵

| 需求场景 | 推荐工具 | 备选 |
|---------|---------|------|
| 快速查客户所有订单 | Object Explorer | — |
| 可视化P4P CTR 90天趋势 | Quiver (Time Series) | Workshop嵌入Quiver |
| 建产品管理后台 | Workshop | Slate |
| 品牌定制客户门户 | Slate | Workshop |
| 看产品→询盘→订单关联链 | Object Explorer + Links | Vertex |
| 分析供应链瓶颈根因 | Vertex | Quiver + Links |
| 写带实时数据的周报 | Notepad | — |
| 整合5个分析工具到一视图 | Carbon | — |

## 各应用详解

### 1. Object Explorer
零门槛浏览工具。核心功能：全局搜索、属性过滤器、探索视图（详情页）、批量 Actions、一键导出到 Quiver。

### 2. Quiver
三种分析模式：Quiver Analysis（全功能/混合数据/建仪表盘）、Time Series Analysis（仅时序/快速对比）、Object Set Path Analysis（仅对象/过滤变换可视化）。简化版可一键升级到 Quiver Analysis。

### 3. Workshop
Widget 生态：Core Display（Object Table/List/View/Property List/Links）、Visualization（Chart XY/Vega Chart/Map/Gantt/Pie/Stepper/Metric Card/Pivot Table/Timeline等）、Filtering（Filter List/Object Dropdown/Date Picker等）、Event/Nav（Button Group/Comments/Tabs）、AIP Widgets（Analyst/Chatbot/Generated Content）、Scenarios、Mobile。

核心概念：Module→Layout→Widget→Variable（输入输出数据传递）→Event（用户交互）→Action（写操作）。

### 4. Slate
拖拽+CSS自定义、支持公开访问（无需Foundry账户）、直连外部数据源（Postgres/API）、Handlebars模板、OSDK编程操作。

### 5. Vertex
图可视化工具：透明化跨功能网络、集中告警系统、模拟未来变化、持续优化。用于供应链根因分析、客户关系图谱、风险传播建模。

### 6. Notepad
对象感知富文本协作文档。可嵌入 Object Cards/Quiver 图表/Workshop Widgets。支持模板系统。适用周报/月报、产品分析文档、After-Action Review。

### 7. Carbon
策展工作空间——组合 Quiver 分析+Workshop 应用+Notepad 文档到一个视图。适用管理驾驶舱、项目空间。

## Workshop vs Slate 选择指南

| 维度 | Workshop | Slate |
|------|---------|-------|
| 学习曲线 | 低（配置化） | 中-高（需JS/HTML/CSS） |
| UI自定义度 | 有限（主题/布局） | 无限（CSS完全控制） |
| 数据源 | Ontology only | Ontology+外部DB/API |
| 公开访问 | 需Foundry账户 | 支持匿名公开访问 |
| 开发速度 | 快（天级） | 中（周级） |
| 适用场景 | 内部运营工具 | 客户门户/品牌页面 |

## 外贸应用

### LILIS 应用生态映射（等效替代方案）

| Foundry 工具 | 等效替代 | LILIS 场景 |
|-------------|---------|-----------|
| Object Explorer | Alibaba产品管理页+CSV | 查找产品→关联P4P关键词 |
| Quiver (Time Series) | Google Sheets+图表/Metabase | CTR趋势/预算预测 |
| Workshop | HTML Dashboard/Retool | 运营仪表盘 |
| Notepad | Google Docs+嵌入表格 | 周报模板+自动刷新 |
| Vertex | D3.js/Graphviz关系图 | 产品→关键词→询盘图 |
| Automations | cron+Alibaba API scripts | P4P预警/库存监控 |

### 分阶段建设建议

**Phase 1 — 立即可建**：LILIS运营仪表盘（整合P4P+产品+询盘）、自动化周报（模板化关键指标）。

**Phase 2 — 中期优化**：图关系可视化（产品→关键词→询盘→订单关联图谱）、P4P自动预警（基于规则）。

**Phase 3 — 高级能力**：ML Pipeline（询盘分类/P4P ROI预测）、跨平台Dashboard（Alibaba+Shopify）。

## 常见问题

**Q: Workshop 适合什么类型的应用？**
A: 标准化、重复性高的运营工作流。例如客服处理工单、运营管理产品上下架、销售追踪询盘。优势是几天内构建完整操作应用，无需代码。

**Q: Slate 和 Workshop 选哪个？**
A: 默认 Workshop。仅当需要高度自定义品牌UI、公开访问或连接外部数据源时才选 Slate。

**Q: LILIS 能用 Alibaba 后台替代所有工具吗？**
A: 部分可以，但三个关键能力缺失：(1)跨模块关联，(2)自定义仪表盘，(3)自动化操作。这正是 Ontology 思维的核心价值。

## 相关链接
- [[Ontology深度总览]] — 概念全景
- [[Why-Ontology]] — 商业案例
- [[Object-Explorer]] — Object Explorer详解
- [[Object-Views构建]] — Object Views设计
- [[Workshop详解]] — Workshop深入
- [[AIP概念总览]] — AIP如何利用应用生态
- [[Code-Workspaces与MCP]]
- [[Observability总览]]
- [[Ontology接口多态]]
- [[Workshop构建深度]]
- [[主页]]
- [[应用构建总览]]
- [[开发者工具链总览]]
- [[术语索引]]
