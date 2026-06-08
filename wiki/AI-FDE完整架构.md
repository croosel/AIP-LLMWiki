---
tags: [Palantir, AIP, AI-FDE, 架构, 闭环Agent, Mode, Skill]
created: 2026-05-20
source: "[[Palantir_Docs_Research_20260520]], https://palantir.com/docs/foundry/ai-fde/overview/"
---
# AI-FDE 完整架构

## 定义
**AI FDE (AI-Powered Forward Deployed Engineer)** 是 Palantir Foundry 平台内嵌的交互式 AI Agent。它通过自然语言对话操控 Foundry 全栈能力，包括数据集成、Ontology 编辑、Function 构建和应用开发，是 Palantir「从 NL 到生产应用」的核心工具。

## 核心属性
| 属性 | 值 |
|------|-----|
| 全称 | AI-Powered Forward Deployed Engineer |
| 运行环境 | Palantir Foundry（需 AIP 启用） |
| 操作模式 | Closed-Loop（闭环迭代） |
| 隔离机制 | Global Branching（沙箱 + PR 审核） |
| 权限模型 | 继承用户 Foundry 权限 |
| 模型支持 | Anthropic Claude / OpenAI / Google / xAI（需 token API 支持） |
| 上下文策略 | 最小基线 → 拖放扩展 |

## 核心架构

### 闭环操作模型 (Closed-Loop)
```
自然语言输入
  → 模式匹配（Mode Selection）
  → 工具选择（Matching Foundry Internal Tools）
  → 执行（Global Branching 沙箱）
  → 观察结果 → 反馈调整
  → 重复迭代 → 达成目标 → 提交 PR
```

### 模式 (Modes)
| Mode | 功能 | 典型工具 |
|------|------|---------|
| Data Integration | 导入数据、构建 Pipeline、配置 Sync | Transforms, Builds, Data Connection |
| Ontology Editing | 创建/编辑 Object Type、Link Type、Action Type | Ontology Manager, Backing Datasets |
| Function Editing | 编写/修改 TypeScript/Python Functions | Code Repositories, Builds |
| Application Building | 构建 Workshop/React 应用 | Developer Console, Code Workspaces |

### 技能 (Skills)
| 类别 | 说明 |
|------|------|
| Agent Skills | 通用能力（代码生成、数据查询、文档搜索） |
| Domain Skills | Foundry 专属能力（Ontology Manager、Pipeline Builder、Code Repository） |
| 管理方式 | 可独立开关每个 Skill，控制 Agent 行为边界 |

### Global Branching 机制
1. AI FDE 所有操作在独立分支中执行
2. 修改通过 Pull Request 提交人工审核
3. 审核通过 → 合并到主分支
4. 确保生产环境不受 AI 实验影响

## 业务用途

### AI-FDE vs 传统 Agent 对比
| 维度 | 传统 LLM Agent | AI FDE |
|------|---------------|--------|
| 操作对象 | 文本/搜索 | Foundry 平台全栈 |
| 执行通道 | 无/Webhook | Global Branching 沙箱 |
| 权限模型 | 无/简单 API Key | 继承用户完整权限 |
| 回滚机制 | 无 | PR + 分支回滚 |
| 上下文注入 | 系统 Prompt | 拖放 Dataset/Ontology 对象 |

### AI-FDE vs AI-FDE（概念层）对比
| 维度 | 概念层（Wiki 旧版） | 实际架构（本次调研） |
|------|--------------------|---------------------|
| NL→代码 | 抽象描述 | 具体 Mode→Tool→Branching 管线 |
| 低代码 | 模糊概念 | Code Workspaces + Developer Console |
| 业务自服务 | 愿景 | 明确的 Skill 开关 + 权限继承 |
| 安全边界 | 未定义 | Global Branching + PR 审核 |

## 外贸应用
> 参见 [[LILIS数据模型v2]] · [[Foundry开发工具链]] · [[Platform-SDK]]

### 对 LILIS 的启示
- **闭合循环设计**：AI-FDE 的 execute→observe→adjust 是对 [[Sense-Reason-Act架构]] 的工程化实现
- **分支隔离**：借鉴 Global Branching 思想，为 P4P 自动调价设计「模拟模式」→人工确认→执行
- **Skill 粒度**：为 LILIS Agent 按功能拆分 Skill（标题优化 / 属性补全 / P4P 调价 / 询盘路由）

## 常见问题
**Q: AI-FDE 能脱离 Foundry 运行吗？**
A: 不能。AI-FDE 的所有 Tool 都是 Foundry 内部操作，不存在独立版本。

**Q: AI-FDE 和现有 [[AI前沿开发工程师]] 页面的关系？**
A: [[AI前沿开发工程师]] 描述的是 NotebookLM 导出材料中的概念层理解。本文基于 Palantir 官方文档提供了完整的架构层描述。

## 相关链接
- [[Foundry开发工具链]]
- [[Platform-SDK]]
- [[Ontology-SDK架构]]
- [[Sense-Reason-Act架构]]
- [[AI前沿开发工程师]]
- [[AIP与Ontology架构关系分析]]
- [[AIP构建完整指南]]
- [[AIP跨境运营中枢-商业系统架构]]
- [[AIP跨境运营方法论-四阶段实施]]
- [[Code-Workspaces与MCP]]
- [[Functions运行时]]
- [[LILIS-AIP方法论-中小卖家AI增效实战手册]]
- [[三阶段升级路径-Sense-Reason-Act]]
- [[主页]]
- [[产品策略-国际站AI运营Agent]]
- [[态势感知系统-OODA循环与经验积累]]
- [[术语索引]]
