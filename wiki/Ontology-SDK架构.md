---
tags: [Palantir, Foundry, OSDK, 代码生成, API封装]
created: 2026-05-20
source: "[[Palantir_Docs_Research_20260520]], https://palantir.com/docs/foundry/ontology-sdk/overview/"
---
# Ontology SDK 架构

## 定义
**Ontology Software Development Kit (OSDK)** 是 Palantir 的代码生成工具链，从 Ontology Schema 自动生成类型安全的 Python / Java / TypeScript 客户端 SDK。它让开发者以编程方式与 Ontology 交互——搜索对象、应用 Action、执行 Query——就像操作本地 ORM。

## 核心属性
| 属性 | 值 |
|------|-----|
| 输入 | Ontology 的 Object Type / Action Type / Query Type 定义 |
| 输出 | 语言特定的类型安全 SDK 包（pip / Maven / npm） |
| 生成器 | 闭源（Palantir 专有） |
| 生成的代码 | Apache 2.0 许可 |
| 支持语言 | Python、Java、TypeScript |
| 分发方式 | 语言生态包管理器 |

## 工作原理

### Schema → SDK 生成管线
```
Ontology Schema (Object Types + Action Types + Link Types + Query Types)
  → OSDK Generator (闭源)
  → Python Package (pip installable)
  → Java JAR (Maven)
  → TypeScript NPM Package
```

### 生成代码特性
```python
# 自动生成的类型安全客户端示例
from lilis_sdk import LilisOntology

onto = LilisOntology(host="...", token="...")

# 类型安全 — IDE 自动补全
products = onto.Product.where(status="ACTIVE").all()

# 应用 Action — 编译时检查参数类型
product.apply_update_price(new_price=19.99)

# Link 遍历 — 自动加载关联对象
for product in products:
    p4p_campaign = product.linked_p4p_campaign()  # 类型安全
```

### 关键设计模式
| 模式 | 说明 |
|------|------|
| **类型安全** | 每个 Object Type 映射为具体类，IDE 自动补全 |
| **关系感知** | Link 自动转化为方法调用，懒加载关联数据 |
| **Action 封装** | 每个 Action Type 映射为方法，参数编译时验证 |
| **流式 API** | 查询链式调用（`.where().order().limit()`） |
| **跨语言** | 同一 Schema 生成 Python/Java/TS 三种 SDK |

## 业务用途

### 与普通 REST API 对比
| 维度 | 原始 REST API | OSDK 生成 |
|------|-------------|----------|
| 调用方式 | `requests.get(url, headers=...)` | `onto.Product.where(status="ACTIVE")` |
| 类型安全 | 无（JSON 字符串） | 完全（IDE 自动补全 + 类型检查） |
| Action 参数 | 手动构造 JSON body | 编译时验证参数名和类型 |
| 分页 | 手动处理 cursor | 自动迭代器 |
| 错误处理 | 手动解析 HTTP 状态码 | 类型化异常 |

## 外贸应用
> 参见 [[LILIS数据模型v2]] · [[Platform-SDK]] · [[Foundry开发工具链]]

### 可复现模式
LILIS v2 数据模型（7 表 60+ 字段）**已经具备 OSDK 的 Schema 输入**。参照 OSDK 模式可构建：

1. **Schema → OpenAPI Spec 转换器**：将 `LILIS_Data_Model_v2.md` 的结构化表定义转为 OpenAPI 3.0
2. **OpenAPI → SDK 生成**：利用开源工具（openapi-generator）生成 Python/TS 客户端
3. **类型安全包装层**：在生成客户端上添加 Action 封装和 Link 懒加载

### 技术栈映射
| OSDK 组件 | 开源等效 |
|-----------|---------|
| Schema 定义 | OpenAPI 3.0 / JSON Schema / Pydantic |
| 代码生成器 | openapi-generator / Fern / Stainless |
| 类型安全客户端 | Pydantic + httpx (Python) / Zod + axios (TS) |
| Action 封装 | 在生成的客户端上手动包装 |

## 常见问题
**Q: 能否自建 OSDK 等效工具？**
A: 可以。OSDK 的核心思想是「Schema → 类型安全 SDK」，这是 1990 年代的 CORBA IDL / WSDL 模式。现代工具链可以将此完全复现：Schema 定义（OpenAPI）→ 代码生成（openapi-generator）→ 类型安全客户端。

**Q: 生成的代码有依赖性吗？**
A: 生成的 SDK 包依赖轻量的 Platform API 客户端（HTTP 层），但其他部分是完全自包含的。

## 相关链接
- [[Foundry开发工具链]]
- [[Platform-SDK]]
- [[AI-FDE完整架构]]
- [[LILIS数据模型v2]]
- [[AIP构建完整指南]]
- [[OSDK深度]]
- [[Ontology构建实操]]
- [[术语索引]]
