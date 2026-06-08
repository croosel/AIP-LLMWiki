---
tags:
  - Palantir
  - AIP
  - AI平台
  - 企业AI
created: 2026-05-20
source: "[[Palantir_AIP_Wiki]]"
---

# AIP 总览

## 定义

**Palantir AIP (Artificial Intelligence Platform)** 是将 AI 与组织数据和运营连接起来的平台。AIP 驱动跨运营流程的自动化，提供从开发者到一线用户的完整工具链。

## 核心属性

### 三大平台定位

| 平台 | 角色 |
|------|------|
| **Foundry** | 数据运营平台（[[Ontology]]、数据集成、应用构建） |
| **Apollo** | 自主软件部署的任务控制中心 |
| **AIP** | AI 层，将 LLM 能力嵌入 Foundry 和 Apollo |

### 五大关键优势

| 优势 | 说明 |
|------|------|
| 无缝集成 | 与组织在 Foundry 上的现有数据集成，构建可访问多种数据源的 LLM 工作流 |
| 安全与治理 | 访问控制、加密、审计能力，内置治理工具确保 AI 操作的问责性和历史溯源 |
| 模型管理 | 构建、训练和部署 LLM 的综合工具套件，支持多模型选择、版本控制和协作 |
| 可扩展性与性能 | 分布式计算架构，支持大规模数据操作、高性能处理和实时分析 |
| 可解释性与透明度 | 审计追踪、解释和评估工具，助力理解和信任模型决策 |

### 七大哥伦布应用

| 应用 | 描述 | 目标用户 |
|------|------|---------|
| [[AIP-Assist]] | LLM 驱动的支持工具，实时自然语言帮助 | 所有平台用户 |
| [[AIP-Logic]] | 无代码 AI 函数开发环境 | 应用构建者 |
| [[AIP-Chatbot-Studio]] | 交互式聊天机器人构建器 | 应用构建者 |
| [[AIP-Evals]] | LLM 函数测试与评估环境 | 开发者 |
| AIP Threads | 拖放文档与聊天机器人交互 | 业务用户 |
| [[Palantir-MCP]] | 外部 AI IDE 连接平台的协议实现 | 开发者 |
| [[AIP-Analyst]] | 自然语言进行 Ontology 自主分析 | 分析师 |

## 业务用途

- LLM 驱动的 Web 应用
- 使用视觉语言模型的移动应用
- 嵌入本地化 AI 的边缘应用
- 跨运营流程的端到端自动化

## 外贸应用

> 参见 [[LILIS-婚庆派对用品]]、[[Sense-Reason-Act架构]]

AIP 在外贸场景中通过 "[[Sense-Reason-Act架构|Sense → Reason → Act]]" 范式驱动运营自动化：
- **Sense**: 自动拉取 Alibaba 国际站周报数据至 [[Ontology]]
- **Reason**: [[AIP-Logic|Logic Functions]] 诊断店铺健康度、产品列表质量、季节性预测
- **Act**: 触发橱窗操作、[[P4P投流策略|P4P 出价]]、详情页优化等执行动作

## 常见问题

**Q: AIP 与 Foundry 的关系？**
A: Foundry 是数据基座（Ontology 存储、数据管道），AIP 是 AI 能力层，两者共同构成 Palantir 的操作系统。

**Q: AIP 是否必须配合 Foundry 使用？**
A: 是的，AIP 的 LLM 工作流深度依赖 Foundry 的 Ontology 数据模型和权限体系。

**Q: 小团队能用 AIP 吗？**
A: AIP 面向企业级部署，最小部署单元需 Foundry 实例。

## 相关链接

- [[AIP-Logic]] — Logic 函数开发环境深入
- [[AIP-Evals]] — 评估体系深入
- [[AIP-Observability]] — 可观测性深入
- [[AIP-伦理与治理]] — 八大伦理主题
- [[Ontology]] — 本体论数据模型
- [[Sense-Reason-Act架构]] — 三层运营架构
- [[Agent并行架构]]
- [[主页]]
- [[术语索引]]
