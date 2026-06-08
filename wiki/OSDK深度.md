---
tags: [Dev-Toolchain, OSDK, TypeScript, Python, Palantir-AIP]
created: 2026-05-21
source: "[[raw/palantir_docs_osdk_typescript]], [[raw/palantir_docs_osdk_python]]"
---
# OSDK深度

## 定义

**Ontology SDK (OSDK)** 是开发者访问 Foundry Ontology 的主要编程接口。OSDK 从你的具体 Ontology 定义自动生成类型安全的 SDK 代码，让开发者可以用 TypeScript、Python 或 Java 原生地操作 Ontology 对象。

OSDK 不是通用 SDK——它是**从你的 Ontology Schema 生成的专属 SDK**，包含你定义的 Object Types、Properties、Links、Actions 和 Functions。

## 核心属性

### 生成流程

```
Developer Console 创建应用 → 选择 Ontology 资源 → 生成 OSDK → 安装 SDK 包 → OAuth 认证 → 开发
```

每个应用生成专属 SDK，自带定制 API 文档（含安装指南、代码示例、参考文档）。

### TypeScript OSDK 核心 API

以示例 Object Type `Restaurant` 为例（Restaurant Id, Name, Address, Email, NumberOfReviews, PhoneNumber, ReviewSummary, DateOfOpening）：

**加载单个对象**：
```typescript
const result = await client(Restaurant).fetchOne("primaryKey");
```

**分页加载**：
```typescript
// 按 pageSize 分页，按属性排序
const { data, nextPageToken } = await client(Restaurant)
  .fetchPage({ $pageSize: 100 })
  .orderBy({ numberOfReviews: "asc" });
```

**属性过滤**：
```typescript
// 获取所有评分 > 50 的餐厅
client(Restaurant).where({
  numberOfReviews: { gt: 50 }
}).fetchPage();
```

**遍历 Links**：
```typescript
const review = await client(Restaurant)
  .fetchLinkedObject("primaryKey", "reviews");
```

**执行 Actions**：
```typescript
await client(Restaurant).applyAction("addReview", {
  restaurantId: "primaryKey",
  rating: 5,
  comment: "Great!"
});
```

### Python OSDK 核心 API

**加载单个对象**：
```python
from ontology_sdk.ontology.objects import Restaurant
restaurant = client.ontology.objects.Restaurant.fetch_one("primaryKey")
```

**过滤查询**：
```python
# where + order_by + page_size
restaurants = client.ontology.objects.Restaurant \
    .where(Restaurant.object_type.number_of_reviews > 50) \
    .order_by(Restaurant.object_type.restaurant_name.asc()) \
    .page_size(100) \
    .page()
```

**聚合计算**：
```python
# 按餐厅名称分组，计数
result = client.ontology.objects.Restaurant \
    .group_by(Restaurant.object_type.restaurant_name.exact()) \
    .count() \
    .compute()

# 数值聚合：avg/max/min/sum
avg_reviews = client.ontology.objects.Restaurant \
    .avg(Restaurant.object_type.number_of_reviews) \
    .compute()

# 近似去重计数
distinct = client.ontology.objects.Restaurant \
    .approximate_distinct(Restaurant.object_type.restaurant_name) \
    .compute()
```

**组合过滤**：
```python
# AND 条件
.where((Restaurant.object_type.rating > 4) & (Restaurant.object_type.city == "NYC"))

# OR 条件
.where(Restaurant.object_type.restaurantId.is_null() | (Restaurant.object_type.restaurantId == 'pk'))

# NOT 条件
.where(~Restaurant.object_type.restaurant_name.is_null())
```

### OAuth 认证

OSDK 应用通过 OAuth 2.0 流程访问数据：
- 应用注册为公共客户端或机密客户端
- 在 Developer Console 中配置权限范围和资源限制
- tokens 仅授权访问该应用获批的资源

### Web Hosting

Developer Console 支持直接托管前端应用（React SPA），无需外部托管：
- 在 Foundry 上部署 OSDK React 应用
- 享受 Foundry 的安全和扩展能力

## 业务用途

### OSDK 的核心价值

**类型安全**：OSDK 从你的 Ontology Schema 生成——所有类型、属性、关系在编译时即被校验，IDE 自动补全。

**零学习成本连接数据**：开发者不需要了解底层数据集、SQL 或 API 端点——直接用业务对象编程：
```typescript
// 不需要知道 restaurant 的数据库表是什么，不需要写 SQL
const bestNYCRestaurants = await client(Restaurant)
  .where({ city: "NYC", rating: { gte: 4.5 } })
  .orderBy({ numberOfReviews: "desc" })
  .fetchPage({ $pageSize: 10 });
```

**跨语言一致体验**：TypeScript / Python / Java SDK 提供一致的 API 模式。

## 外贸应用

### LILIS OSDK 等效实现

核心思路：用 OSDK 的 API 设计模式封装 Alibaba 国际站 API，实现面向业务对象的编程体验。

**Python OSDK-Style Wrapper**：
```python
from lilis_osdk import Product, P4P_Campaign, Inquiry, Order

# 查询活跃产品
products = Product.where(status="active") \
    .order_by(Product.impressions_30d.desc()) \
    .page_size(20) \
    .page()

# 聚合 P4P 表现
p4p_stats = P4P_Campaign.where(budget_remaining__gt=0) \
    .group_by(P4P_Campaign.product_id.exact()) \
    .agg(P4P_Campaign.ctr.avg(), P4P_Campaign.cost.sum()) \
    .compute()

# 关联查询：产品 → 关联 P4P 关键词 → 关联询盘
product = Product.fetch_one("LIL-0001")
keywords = product.get_linked("p4p_keywords")
inquiries = product.get_linked("inquiries")

# 执行操作
Order.apply_action("update_status", {
    "order_id": "ORD-123",
    "new_status": "shipped"
})
```

### API 设计原则

1. **面向对象**：用 `Product`、`Order` 等业务对象编程，而非 API 端点
2. **链式调用**：`where().order_by().page()` 链式构建查询
3. **聚合分离**：`group_by().compute()` 将分组和计算分离
4. **Link 导航**：`get_linked()` 方法沿关系链导航
5. **Action 语义**：`apply_action()` 表达操作意图

## 常见问题

**Q: OSDK 能直接访问底层数据集吗？**
A: 不能——OSDK 只操作 Ontology 对象。需要直接访问数据集时应使用 Foundry 的数据集 API 或 Pipeline Builder。

**Q: OSDK 的版本管理如何工作？**
A: 每次 Ontology Schema 变更后，需要重新生成 OSDK。Developer Console 显示当前 OSDK 版本和应用状态。

**Q: LILIS 如何实现类似 OSDK 的体验？**
A: 封装 Alibaba API 为面向对象的 SDK。当 Alibaba 不暴露 API 时（如某些 P4P 数据），先用 web scraping 或 CSV 导出收集数据，再用 SDK 模式加载。

## 相关链接
- [[开发者工具链总览]] — 完整工具链
- [[Functions运行时]] — Functions 与 OSDK 协作
- [[Developer Console详解]] — 应用管理
- [[LILIS数据模型v2]] — LILIS Ontology 设计
- [[Ontology-SDK架构]] — OSDK 的 Schema→SDK 逆向工程
- [[Code-Workspaces与MCP]]
- [[Workshop构建深度]]
- [[主页]]
- [[术语索引]]
