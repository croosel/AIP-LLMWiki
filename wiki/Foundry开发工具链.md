---
tags: [Palantir, Foundry, 开发工具链, OSDK, MCP, Code Workspaces]
created: 2026-05-20
source: "[[Palantir_Docs_Research_20260520]], https://palantir.com/docs/foundry/dev-toolchain/overview/"
---
# Foundry 开发工具链

## 定义
Palantir Foundry 的开发者工具链，提供从 Ontology 定义到应用部署的全栈开发能力。核心组件包括 OSDK、Palantir MCP、Code Workspaces、Compute Modules、Custom Endpoints 和 Global Branching。

## 核心属性
| 组件 | 说明 |
|------|------|
| **Ontology SDK (OSDK)** | 从 Ontology Schema 自动生成类型安全 SDK（Python/Java/TypeScript） |
| **Palantir MCP** | MCP 协议实现，AI IDE 可操控 Foundry |
| **Code Workspaces** | 平台内置 VS Code 环境 |
| **Compute Modules** | 容器化部署自定义 Python/Java 代码 |
| **Custom Endpoints** | 将 Foundry API 重映射为自定义 URL |
| **Global Branching** | 安全沙箱开发 + PR 审核 |
| **Platform APIs** | Foundry APIs、Ontology APIs、Data Proxy |

## 各组件详解

### Ontology SDK (OSDK)
> 参见 [[Ontology-SDK架构]]

- **自动生成**：从 Ontology Object Type / Action Type 生成类型安全客户端
- **多语言**：Python (`pip install foundry-ontology-sdk`)、Java (Maven)、TypeScript (npm)
- **代码示例**：
  ```python
  from ontology_sdk import Ontology
  onto = Ontology(host="...", token="...")
  products = onto.products.search(where="status == 'ACTIVE'")
  for p in products:
      p.apply_action("updatePrice", {"newPrice": 19.99})
  ```

### Palantir MCP
> 参见 [[Palantir-MCP]]

- **工具**：search_foundry_documentation / modify_ontology / update_dev_console
- **定位**：面向 Ontology Builder + 开发工作流
- **能力边界**：可修改 Ontology 类型（非数据），不可写入 Ontology 实例数据

### Code Workspaces
- 平台内置 VS Code（含 Git 集成、终端、调试器）
- 直接构建 Foundry 内嵌 React 应用（Workshop、Quiver）
- 支持从 Code Repositories 拖入代码模块

### Compute Modules
- 打包自定义 Python/Java 代码为可部署容器
- 通过 Functions 或 Custom Endpoints 暴露
- 适合机器学习推理、复杂 ETL、自定义 API 逻辑

### Custom Endpoints
- 将 Foundry API 调用重映射为自定义 URL 路径
- 调用者无需知晓底层 Foundry 结构
- 支持认证、限流、日志

### Platform APIs
| API 层 | 用途 |
|--------|------|
| Foundry APIs | 用户管理、数据治理、安全策略 |
| Ontology APIs | Object Type CRUD、Action 应用、Query 执行 |
| Data Proxy | S3 兼容接口，大规模数据集读写 |

## 外贸应用
> 参见 [[Platform-SDK]] · [[LILIS数据模型v2]] · [[AI-FDE完整架构]]

### 可借鉴模式
1. **OSDK 模式 → LILIS 数据层**：从 LILIS v2 数据模型自动生成 Python/TypeScript 客户端
2. **Palantir MCP 模式 → Accio-Work**：构建 MCP Server 暴露 Alibaba API
3. **Code Workspaces 模式**：为运营团队提供低代码数据看板环境
4. **Custom Endpoints 模式**：将 Alibaba MA 复杂 API 封装为运营友好的 REST 端点

## 常见问题
**Q: OSDK 是开源的吗？**
A: OSDK 代码生成器闭源（Palantir 专有），但生成的客户端代码使用 Apache 2.0 许可。

**Q: Palantir MCP 需要什么前置条件？**
A: 需要 Foundry 实例 + 已配置的 Ontology + 已注册的 Developer Console 应用。

## 相关链接
- [[Ontology-SDK架构]]
- [[Platform-SDK]]
- [[Palantir-MCP]]
- [[AI-FDE完整架构]]
- [[LILIS数据模型v2]]
- [[主页]]
- [[术语索引]]
