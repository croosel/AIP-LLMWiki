---
tags: [Ontology, Object-Views, Palantir-AIP, 可复用视图]
created: 2026-05-21
source: "[[raw/palantir_docs_object_views]]"
---
# Object Views 构建

## 定义

**Object Views** 是 Ontology 对象在用户界面中的**可复用表示形式**。它们定义了某个 Object Type 在 Workshop / Notepad / Object Explorer 等工具中如何展示——展示哪些属性、以什么顺序、用什么格式。一个 Object View 可以跨多个应用复用，确保同一类对象在任何地方都呈现一致的外观。

## 核心属性

### 两种形态因子（Form Factor）

| 形态 | 英文 | 适用场景 | 典型位置 |
|------|------|---------|---------|
| **完整视图** | Full Object View | 需要展示对象全部信息的深度页面 | Object Explorer 详情页、Workshop Object View Widget |
| **面板视图** | Panel Object View | 侧边栏/内嵌快速预览 | Workshop 侧面板、Notepad Object Card |

Full View 是详细信息页（如客户360视图），Panel View 是快速预览卡片（如搜索结果旁边的客户摘要卡）。

### 关键能力

- **可复用性**：一个 Object View 定义后可被 Workshop / Notepad / Quiver / Object Explorer 等多个工具同时消费
- **属性选择**：选择展示哪些 Properties，以及它们的排序
- **Links 展示**：可选择展示哪些关联对象（如 Product 的 View 中展示关联的 Inquiry 列表）
- **与 Workshop 深度集成**：Workshop 的 Object View Widget 可直接嵌入已定义的 Object View

## 业务用途

### 为什么需要 Object Views？

在大型组织中，同一个 Object Type（如 `Product`）可能出现在几十个不同的 Workshop 应用中。如果没有 Object Views：
- 每个应用构建者自行决定展示哪些属性
- 同一产品的展示不一致（应用A展示10个字段，应用B只展示5个）
- 用户体验割裂

通过 Object Views 的中央定义：
- 组织统一管理"标准产品视图"
- 所有消费此 View 的应用自动同步更新
- 确保一致性

### 共享 Object Views

Object Views 可以在组织内共享：
- 一个团队定义 View → 其他团队直接引用
- View 更新后，所有引用者自动获得最新定义
- 作为 Marketplace 产品的一部分发布

## 外贸应用

### LILIS Object Views 设计

| View 名称 | Object Type | 形态 | 展示内容 | 嵌入位置 |
|-----------|------------|------|---------|---------|
| `Product_Card` | Product | Panel | 主图+标题+价格+星级+最近7天点击 | Workshop 产品列表 Widget |
| `Product_Detail` | Product | Full | 全部属性+关联Inquiry列表+关联P4P Campaign+最近90天趋势图 | 产品详情弹窗 |
| `Inquiry_Summary` | Inquiry | Panel | 买家名+产品名+消息摘要+发送时间 | 询盘队列 Widget |
| `Order_Status` | Order | Panel | 订单号+金额+状态+预计发货日 | 订单追踪 Widget |
| `P4P_Campaign_Health` | P4P_Campaign | Full | 预算+消耗+CTR+CPC+关键词表+预算消耗预测 | P4P监控页 |

### 等效实现

虽然 LILIS 没有 Foundry，但可用以下方式实现类似的标准化视图：
- **Product_Card** → HTML 卡片组件，所有运营仪表盘内统一调用
- **Product_Detail** → 单一产品详情页模板，内嵌 P4P 数据 API
- **P4P_Campaign_Health** → 标准化 P4P 监控 Widget

## 常见问题

**Q: Object Views 和 Workshop Widgets 的区别？**
A: Object View 是"数据展示模板"（定义展示什么），Widget 是"UI 容器"（定义怎么展示）。Workshop 的 Object View Widget 就是读取 Object View 定义并渲染。

**Q: 修改 Object View 会影响所有使用者吗？**
A: 是的——这是设计目的。中央定义更新后，所有引用此 View 的应用同步更新。

**Q: 可以为同一个 Object Type 创建多个 View 吗？**
A: 可以。例如 `Product` 可以有 `Product_Brief`（5个关键字段）和 `Product_Detailed`（全部字段）两个 View。

## 相关链接
- [[Ontology深度总览]] — Ontology全景
- [[Object-Explorer]] — 搜索与钻取
- [[Ontology应用生态]] — 应用矩阵
- [[Workshop详解]] — Workshop Widgets
- [[Ontology接口多态]]
- [[主页]]
- [[术语索引]]
- [[链接类型深度]]
