---
tags: [Palantir, AIP, Ontology, 实操, Object Type, Link Type, Action Type]
created: 2026-05-20
source: "[[Palantir_Docs_Research_20260520]], https://palantir.com/docs/foundry/object-link-types/, https://palantir.com/docs/foundry/object-link-types/create-object-type/"
---
# Ontology 构建实操

## 定义
基于 Palantir 官方 UI 文档，详述如何通过 **Ontology Manager** 创建和管理 **语义元素**（Object Types、Link Types）与 **动力学元素**（Action Types、Functions），构建企业的操作层数字孪生。

## 核心架构

### 四层构建模型
```
数据层 (Datasets, Virtual Tables)
  → 语义层 (Object Types + Properties + Link Types)
  → 动力学层 (Action Types + Functions)
  → 应用层 (Workshop, Object Explorer, Quiver)
```

## 创建 Object Type

### 前置条件
- 已有一个后备数据集（Backing Datasource）
- 每行数据的 Primary Key 值唯一
- 了解各列的语义

### UI 操作流程
1. **Ontology Manager** → Create Object Type
2. **命名** → 输入 Display Name 和 API Name
   - API Name 遵循编码规范（camelCase）
   - 保留关键字禁止使用：`ontology, object, property, link, relation, rid, primaryKey, typeId, ontologyObject`
3. **选择后备数据源** → 从数据源面板选择 Dataset
4. **映射属性** → 四种方式：
   - 悬停列名 → `Add as new property`（自动推断 ID、display name、base type）
   - 悬停已有属性 → `Map to a column`（手动绑定）
   - `Add all unmapped columns as new properties`（批量映射）
   - 手动创建属性（不映射列）
5. **配置 Primary Key** → 属性编辑器中将某属性设为 Primary Key
6. **配置 Title Key** → 指定显示名称属性
7. **保存** → 完成

### 属性类型
| Base Type | 说明 |
|-----------|------|
| String | 文本 |
| Integer / Double | 数值 |
| Boolean | 布尔 |
| Date / Timestamp | 时间 |
| Array | 数组 |
| Struct | 嵌套结构 |
| Geoshape | 地理形状 |

### Value Types（值类型）
- 在 Field Type 基础上封装语义约束
- 常用示例：Email、URL、UUID、Enumeration
- 在 Space 范围内动态创建

## Link Types 创建

### 类型
| 方向 | 说明 |
|------|------|
| One-to-One | `Order ↔ Invoice` |
| One-to-Many | `Product ↔ OrderItem` |
| Many-to-Many | `Product ↔ Tag` |

### 创建方式
1. 两个 Object Type 必须有共享列
2. Ontology Manager → Create Link Type
3. 选择源 Object Type → 目标 Object Type
4. 映射共享属性
5. 设置基数（Cardinality）

## Action Types 创建

### 定义
Action Type 是对 Ontology 的一组编辑操作的 Schema 定义，包括副作用行为。

### Action 类型
| 类型 | 说明 |
|------|------|
| **Simple Action** | 用户手动填写表单执行 |
| **Function-backed Action** | 由 Function 执行复杂编辑逻辑 |
| **Logic-backed Action** | 由 AIP Logic 函数生成编辑 |
| **Automate-triggered Action** | 由 Automate 事件触发 |

### Function 集成
- Functions 可在 Workshop / Slate / Quiver 中直接调用
- 支持 Function-backed Columns（派生属性）
- 支持 External Functions（Webhooks 查询外部系统）
- 支持 Python Functions in Pipeline Builder（侧车容器）

## 对象 vs 类型

| 术语 | 英文 | 含义 |
|------|------|------|
| Object Type | Type-level | Schema 定义（属性名、类型、描述） |
| Object Instance | Instance-level | 实际数据（`product_id=123, name="Rose Arch"`） |

## 外贸应用
> 参见 [[LILIS数据模型v2]] · [[AIP构建完整指南]]

### LILIS Ontology 映射
| Foundry 概念 | LILIS 等效 |
|-------------|-----------|
| Object Type: Product | 产品表（id, title, shape, material, occasion, status） |
| Property: status | 枚举：Premium / Directed Sourcing / Regular |
| Link Type: Product ↔ P4PCampaign | 多对多：一个产品投多个词 |
| Action Type: UpdateP4PBid | 修改 P4P 出价 |
| Function: CalculateROI | 计算 ROI = 询盘数 / P4P 花费 |

## 常见问题
**Q: API Name 为什么重要？**
A: API Name 是代码中引用 Object Type/Property 的标识符。在 OSDK 生成的客户端中，`Product.where(status="ACTIVE")` 的 `status` 就是 API Name。

**Q: 一个数据集可以后备多个 Object Type 吗？**
A: 不可以。同一数据集只能后备一个 Object Type。如果需要共享数据，用 Link Types 关联不同 Object Type。

## 相关链接
- [[AIP构建完整指南]]
- [[AIP-Logic核心概念]]
- [[LILIS数据模型v2]]
- [[Ontology-SDK架构]]
- [[AIP-Chatbot构建]]
- [[LILIS-AIP方法论-中小卖家AI增效实战手册]]
- [[主页]]
- [[模型开发生命周期]]
- [[模型部署与运维]]
