---
tags:
  - Palantir
  - MCP
  - Model-Context-Protocol
  - 开发者工具
created: 2026-05-20
source: "[[Palantir_AIP_Wiki]]"
---

# Palantir MCP

## 定义

**Palantir MCP** 是 Model Context Protocol (MCP) 的 Palantir 实现，使外部 AI IDE 和 AI 代理能够自主设计、构建、编辑和审核 Palantir 平台上的端到端应用。

## 核心属性

### 两大优势

1. **代码上下文注入**: 识别当前仓库类型，注入定制化上下文（OSDK 仓库、Python transforms、TypeScript functions），搜索代码片段索引
2. **平台操作能力**: 搜索 [[Ontology]]、安全修改 Ontology、更新 Developer Console 应用、运行 Python transforms

### Palantir MCP vs Ontology MCP

| 维度 | Palantir MCP | Ontology MCP |
|------|-------------|-------------|
| 目标用户 | Ontology 构建者 | Ontology 消费者 |
| 权限 | 可修改 Ontology 类型，不能写数据 | 可安全读写 Ontology 数据 |
| 操作 | 搜索、修改类型、更新应用 | 执行 Action、写数据 |
| 作用域控制 | — | 通过 Application Scopes 限制 |

## 相关链接

- [[AIP-Analyst]]
- [[Ontology]]
- [[AIP总览]]
- [[Foundry开发工具链]]
- [[主页]]
- [[术语索引]]
