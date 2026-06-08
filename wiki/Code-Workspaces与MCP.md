---
tags: [Dev-Toolchain, Code-Workspaces, MCP, Compute-Modules, Palantir-AIP]
created: 2026-05-21
source: "[[raw/palantir_docs_code_workspaces]], [[raw/palantir_docs_mcp]]"
---
# Code Workspaces 与 MCP

## 定义

本页面涵盖开发者工具链中的**开发环境与集成工具**四大部分：Code Workspaces（IDE 集成）、Compute Modules（交互式容器）、Palantir MCP（AI 代理开发）、Custom Endpoints（自定义 API）。

## 1. Code Workspaces

### 定义

Code Workspaces 将 JupyterLab、RStudio Workbench 和 VS Code 三大主流 IDE 原生集成到 Foundry 平台。用户在熟悉的 IDE 中使用 Foundry 的高质量 Ontology 数据，同时享受平台的安全、分支、调度和资源管理。

### 三种环境

| 环境 | 适用场景 | 技术特点 |
|------|---------|---------|
| **JupyterLab** | 数据科学实验、ML 模型构建 | Notebook 交互式分析 |
| **RStudio Workbench** | 统计分析、数据可视化 | R 语言生态 |
| **VS Code** | React 应用开发、OSDK 开发 | 与 Developer Console 深度集成 |

### 核心约束

**单节点运行**：Code Workspaces 在单节点上运行——不适合大规模数据转换。如需大规模转换，用 Pipeline Builder（Spark 集群）或 Code Repositories。

**OSDK 集成**：每个 Code Workspace 可生成一个 OSDK，支持多版本并存。

### 典型场景

- 数据科学家用 Jupyter 探索客户行为模式
- 统计师用 RStudio 做 A/B 测试分析
- 前端开发者用 VS Code 构建 OSDK React 应用

## 2. Compute Modules

### 定义

Compute Modules 让你在 Foundry 中部署交互式容器——无论代码用什么语言编写，都能带入平台运行。例如将第三方 ML 模型打包为容器，直接在 Foundry 中集成。

**关键特性**：
- 支持任意语言（不限于 TypeScript/Python）
- 交互式容器运行
- 无缝集成到 Foundry 工作流
- Idle 自动超时释放资源

## 3. Palantir MCP

### 定义

Palantir MCP 是 Model Context Protocol 的实现，让 AI IDE 和 AI Agent 可以**自主设计、构建、编辑和审查**完整的 Foundry 应用——从数据集成到 Ontology 配置到应用开发。

### 两大 MCP 方案对比

| 维度 | Palantir MCP | Ontology MCP (OMCP) |
|------|-------------|-------------------|
| **用户** | Ontology 构建者 | Ontology 消费者 |
| **数据操作** | 修改 Ontology 类型，不写数据 | 读写 Ontology 数据 |
| **暴露方式** | VS Code / Continue 等 AI IDE | Developer Console 应用 → 外部 AI |
| **应用场景** | 自动构建 Ontology Schema | 外部 AI 代理（Copilot Studio / Gemini）操作数据 |
| **安全** | Foundry 内部权限 | Application Scopes 限制 AI 动作 |

### MCP 核心能力

**代码上下文注入**：MCP 识别当前仓库类型（OSDK / Python Transforms / TypeScript Functions），自动注入对应的代码示例和上下文。

**Ontology 操作工具**：
- `search_ontology` — 搜索对象/链接/函数
- `create_object_type` / `create_link_type` — 创建 Ontology 类型
- `apply_proposal` — 将提案应用到 Developer Console

**Transform 迭代修复**：
- `preview_transform` → 失败 → 自动修复 → 重新预览 → 直到成功

### Palantir MCP 典型对话

> "Find me the object/links/functions to manage inventory"
> "Create this object-type/link-type and integrate it with my application"
> "Apply this proposal to my Developer Console application"

## 4. Custom Endpoints (Beta)

### 定义

Custom Endpoints 让开发者定义自定义 URL 模式的 API 端点——匹配企业现有标准，底层由 Ontology Actions/Functions 驱动。

**核心概念**：

```
Endpoint Set（资源容器）
  ├── Endpoint Definitions（API 定义：URL + 参数 + 映射到 Actions/Functions）
  ├── Subdomain（自定义域名）
  └── Releases（版本化快照 + 部署）
```


**发布部署流程**：定义端点 → 发布（创建不可变快照/语义版本）→ 部署到子域 → 端点可访问

**标准 API vs Custom Endpoint**：
```http
# 标准 Foundry API
POST https://{enrollment}.palantirfoundry.com/api/v2/ontologies/{ontology}/actions/{action}/execute

# 自定义端点
GET https://subdomain.domain.com/myApi/form/{form_id}/section/{section_id}
```

## 外贸应用

### LILIS 开发环境等效实现

| Foundry 工具 | LILIS 等效 | 阶段 |
|-------------|-----------|------|
| **VS Code Workspace** | VS Code + Git | 立即可用 |
| **Jupyter Workspace** | Jupyter Notebook (本地) | 立即可用 |
| **Developer Console** | GitHub + CI/CD | Phase 1 |
| **Compute Modules** | Docker + Cloud Run | Phase 2 |
| **Custom Endpoints** | FastAPI + 自定义域名 | Phase 2 |
| **Palantir MCP** | Accio Work Agent Skills | Phase 3 |

### Accio Work → MCP 等效

Accio Work 的 Agent + Skill 体系可实现类似 MCP 的 AI 代理开发体验：

| MCP 能力 | Accio Work 等效 |
|---------|----------------|
| 搜索 Ontology | Agent 读取 LILIS Wiki + Schema |
| 创建 Object Type | Agent 创建 Wiki 新页面 |
| Transform 迭代修复 | Agent 执行脚本 → 检查输出 → 重试 |
| 自动构建应用 | Agent 生成 Dashboard HTML |
| 代码上下文注入 | Agent Memory + Wiki 上下文 |

### LILIS MCP-Style Agent 示例

```
用户: "帮我监控 P4P 预算，当消耗超过 80% 时通知我"
Agent:
  1. 搜索现有 P4P 数据 Schema
  2. 创建 Budget Monitor 脚本
  3. 配置定时任务（cron: 每小时检查）
  4. 测试：模拟预算超限 → 验证通知
  5. 部署监控
```

## 常见问题

**Q: Code Workspaces 使用哪些 IDE？**
A: JupyterLab、RStudio Workbench、VS Code。管理与安全由 Foundry 平台统一处理。

**Q: Compute Modules 支持什么语言？**
A: 任意语言——只要可以打包为容器。

**Q: Palantir MCP 和 Ontology MCP 应该用哪个？**
A: 构建/修改 Ontology → Palantir MCP；让外部 AI 系统操作数据 → Ontology MCP。

**Q: Custom Endpoints 还在 Beta 吗？**
A: 是的——功能可能变化，需联系 Palantir Support 申请访问。

**Q: LILIS 能直接用 Palantir MCP 吗？**
A: 不能（需要 Foundry 实例）。但 Accio Work Agent + Skills 提供等效能力。

## 相关链接
- [[开发者工具链总览]] — 完整工具链
- [[OSDK深度]] — OSDK TypeScript/Python
- [[Functions运行时]] — Functions 详解
- [[Ontology应用生态]] — Workshop/Slate 应用
- [[AI-FDE完整架构]] — Global Branching 在 AI-FDE 中
- [[主页]]
- [[术语索引]]
