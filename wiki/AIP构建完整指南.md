---
tags: [Palantir, AIP, 构建, Speedrun, 实操, Pipeline, Ontology, Chatbot, Workshop]
created: 2026-05-20
source: "[[Palantir_Docs_Research_20260520]], https://learn.palantir.com/speedrun-your-e2e-aip-workflow, https://palantir.com/docs/foundry/aip/getting-started-with-aip/"
---
# AIP 构建完整指南

## 定义
基于 Palantir 官方 Speedrun 课程（60-90 分钟）和全部公开文档，提炼出的 **AIP 从零到应用的完整构建流水线**。

## 前置条件

| 条件 | 说明 |
|------|------|
| **Foundry 实例** | 必须。可通过 Developer Tier 免费注册或企业已有 |
| **AIP 已启用** | 管理员在 `enable-aip-features` 面板开启 |
| **项目权限** | 需要有 Project + Folder 创建权限 |
| **数据源** | PDF、CSV、数据库连接 — 任意结构化/非结构化数据 |

## 完整构建六步流程

### Step 1 — 设置项目与文件夹
```
Foundry 首页 → Create Project → 命名 (如 "AIP Speedrun")
  → Create Folder → 命名 (课程专用)
```
- 创建 `Foundry Learning Project`（内置预配置）
- 或使用已有的组织项目

### Step 2 — 上传数据
- 通过 Data Connection 代理批量上传 PDF / 媒体集
- 或导入已有的 Foundry Dataset
- 可使用 Marketplace 部署预构建数据集

### Step 3 — 构建数据管道 (Pipeline Builder)
| 子步骤 | 操作 |
|--------|------|
| Create New Pipeline | 在 Project 文件夹中创建新 Pipeline |
| Add Data | 将上传的原始数据集作为 Pipeline 输入 |
| Process PDFs | 使用 PDF 解析 transform 提取文本 |
| Extract Chunks | 按语义分割为短块（每块包含一个信息点） |
| Create Chunk ID | 为每个块生成唯一标识符 |
| Use LLM | 批量调用 LLM 提取实体（Entity）|
| Embedding | 为文本块生成嵌入向量 |
| Add Output | 输出 `Chunks` 和 `Entities` 两个数据集 |

### Step 4 — 构建 Ontology
| 子步骤 | 操作 |
|--------|------|
| Create Object Type | `Chunks` 和 `Entities` 各创建一个 Object Type |
| Backing Datasource | 将 Pipeline 输出的数据集映射为 Object Type 的后备数据源 |
| Map Properties | 数据集列 → Ontology 属性（自动推断 display name、base type） |
| Set Primary Key | 指定唯一 ID 列为主键（如 `chunk_id`、`entity_id`） |
| Set Title Key | 指定显示名称列（如 `entity_name`） |
| Create Link Types | 用共享列（如 `entity_id`）建立 Chunk ↔ Entity 的 Link |
| Add Action Types | 定义可执行操作（编辑属性、关联/解除 Link） |

**Ontology 最终结构**：
```
Object Type: Chunk
  - Properties: chunk_id (PK), text, embedding, entity_id...
Object Type: Entity  
  - Properties: entity_id (PK), entity_name, entity_type...
Link Type: Chunk ↔ Entity (多对多)
```

### Step 5 — 配置 AIP Chatbot
| 子步骤 | 操作 |
|--------|------|
| 打开 AIP Chatbot Studio | （原名 AIP Agent Studio，2026-04 周更名） |
| 创建新 Chatbot | 命名 + 指定使用哪个 Ontology |
| 配置检索上下文 | Context Types：选择 Chunks / Entities 作为知识源 |
| 配置工具 | Tools → 启用 Ontology 查询、对象浏览 |
| 配置引用 | Citations → 启用来源引用，确保回答可追溯 |
| 测试 | 在 Studio 内对话测试：提问 → 观察知识图谱援引 |

### Step 6 — 构建交互式应用 (Workshop)
- 在 Workshop 中创建新应用
- 拖入 AIP Chatbot Widget（绑定 Step 5 的 Chatbot）
- 配置应用状态变量，连接 Graph 可视化 Widget
- 发布应用，团队即刻使用

## 架构简图
```
原始数据 (PDF/CSV)
  → Pipeline Builder (PDF解析 → LLM提取 → 嵌入)
  → Ontology (Object Types + Link Types)
  → AIP Chatbot (知识图谱驱动，无幻觉)
  → Workshop App (用户交互界面)
```

## 后续进阶流程

### 投入生产
1. **AIP Evals** — 编写测试用例，定量评估 Chatbot 和 Logic 函数质量
2. **Automate** — 配置 Logic Effect，当触发条件满足时自动执行 Logic 函数
3. **Global Branching** — 通过分支隔离修改，PR 审核后合并到生产
4. **Observability** — 监控 Token 消耗、响应延迟、准确率

### 自定义 Logic 函数
```
AIP Logic → 创建新 Logic 函数
  → 添加 Block (Read Object / Calculate / Use LLM / Apply Action)
  → 链式连接 Block
  → 运行 → Debugger 观察 CoT（思维链）
  → 调试满意后 Publish
  → 配置 Evaluation Suite 自动化测试
  → 集成到 Automate / Workshop / Action
```

## 外贸应用
> 参见 [[LILIS数据模型v2]] · [[Ontology-SDK架构]] · [[AI-FDE完整架构]]

### 对 LILIS 的映射
| AIP 步骤 | LILIS 等效 |
|---------|-----------|
| 上传数据 | `alibaba_store_raw_data.json` + MA 后台导出 |
| Pipeline Builder | Python 脚本（PDF 解析 → SEO 关键词提取 → LLM 生成标题） |
| Ontology | [[LILIS数据模型v2]]（7 表 60+ 字段）|
| AIP Chatbot | LILIS 运营助手（自动回答询盘、生成 P4P 出价建议） |
| Workshop | 数据看板（`Alibaba_Operations_Dashboard.html`） |

**不需要 Palantir Foundry 即可实现**，但需要自建等效组件。

## 常见问题
**Q: 没有 Foundry 实例能构建 AIP 吗？**
A: 不能原样复制。但可以用开源工具链等效实现：FastAPI（替代 Functions）+ PostgreSQL（替代 Ontology）+ LangChain（替代 Logic）+ Streamlit（替代 Workshop）。

**Q: Pipeline Builder 的 LLM block 调用的是什么模型？**
A: Palantir 不公开默认模型。AIP 支持 BYOM（自带模型），可选择 OpenAI / Anthropic / Google / xAI。

## 相关链接
- [[AIP-Logic核心概念]]
- [[Ontology构建实操]]
- [[AIP-Chatbot构建]]
- [[AIP安全与治理]]
- [[Platform-SDK]]
- [[主页]]
- [[模型开发生命周期]]
- [[模型部署与运维]]
