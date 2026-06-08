---
tags: [Ontology, Object-Explorer, Palantir-AIP, 搜索, 钻取]
created: 2026-05-21
source: "[[raw/palantir_docs_object_explorer]]"
---
# Object Explorer

## 定义

**Object Explorer** 是 Foundry 中最基础也是最广泛使用的 Ontology 浏览工具。它无需任何预配置即可使用，为非技术用户提供搜索、过滤和钻取 Ontology 对象的能力。Object Explorer 是进入 Ontology 世界的"第一站"。

## 核心属性

### 核心功能

**全局搜索**：按 Object ID 或任意 Property 值搜索对象。无预配置需求——只要 Object Type 已在 Ontology 中定义，就能被搜索到。

**属性过滤器（Property Filters）**：对搜索结果按任意属性值进行筛选。支持多条件组合过滤。

**探索视图（Exploration View）**：每个 Object Type 的标准化详情页面，展示该对象的所有 Properties + Link Types + Linked Objects。

**批量 Actions**：对筛选出的 Object Set 执行批量操作（如批量更新状态、批量关联）。

**导出到 Quiver**：一键将当前 Object Set 发送到 Quiver 进行深度分析。

### 使用流程

```
搜索对象 → 过滤结果 → 打开探索视图 → 查看关联对象 → (可选)批量操作/导出Quiver
```

### 与其他工具的衔接

Object Explorer 是 Ontology 工具的"入口大厅"：
- 找到感兴趣的对象 → **导出到 Quiver** 做深度分析
- 发现需要监控的指标 → 在 **Workshop** 中构建仪表盘
- 需要协作分析 → 嵌入到 **Notepad** 文档中

## 业务用途

### 典型应用场景

**运营人员日常查询**：运营经理想查"产品 LIL-0001 最近30天的表现" → Object Explorer 搜索产品 → 打开探索视图 → 看关联的 P4P 数据 → 导出到 Quiver 做趋势对比。

**客服快速响应**：客户反馈订单延迟 → 客服搜索订单号 → 打开探索视图 → 查看关联的物流对象 → 在 Workshop 中更新状态。

**数据分析前探查**：分析师在导出到 Quiver 前，先用 Object Explorer 快速了解数据分布（哪些产品询盘最多？哪个地区买家最活跃？）

### 优势

- **零培训成本**：无需了解底层数据模型
- **即时可用**：不需要预配置（Workshop 必须有人先构建应用）
- **Link 遍历**：从任意对象出发，沿 Link 链走到任意关联对象

## 外贸应用

### LILIS 等效实现

Alibaba 国际站后台虽然提供了产品管理和数据概览页面，但缺少两个关键能力：

1. **跨模块 Link 遍历**：无法从产品页直接看到"这个产品关联的所有 P4P 关键词和对应的 CTR 趋势"。Object Explorer 的核心价值是遍历关系链。

2. **统一搜索**：无法一次搜索在"产品+询盘+订单+P4P"四个模块中同时找到结果。

**替代方案**：
- 构建统一的 LILIS 运营仪表盘，内置全局搜索（搜索产品ID → 聚合展示关联的P4P+询盘+订单数据）
- 每个实体页添加"关联跳转"链接（产品页→点击 P4P 关键词→跳转关键词分析页）

## 常见问题

**Q: Object Explorer 和 Workshop 的使用场景区别？**
A: Object Explorer 是"探索工具"——你不知道要找什么时用它浏览；Workshop 是"工作工具"——你知道每天都做什么时用它高效执行。

**Q: 非技术用户真的能直接用 Object Explorer 吗？**
A: 是的——不需要了解 SQL、表结构、数据集。只需要知道业务对象叫什么（"产品"、"订单"、"客户"），搜索和过滤都是通过自然属性名称完成。

## 相关链接
- [[Ontology深度总览]] — Ontology全景
- [[Ontology应用生态]] — 完整应用矩阵
- [[Object-Views构建]] — Object Views设计
- [[Why-Ontology]] — 商业案例
- [[主页]]
- [[术语索引]]
