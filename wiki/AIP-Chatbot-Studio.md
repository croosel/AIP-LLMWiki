---
tags:
  - Palantir
  - AIP
  - Chatbot
  - RAG
  - 聊天机器人
created: 2026-05-20
source: "[[Palantir_AIP_Wiki]]"
---

# AIP Chatbot Studio

## 定义

**AIP Chatbot Studio** 是构建交互式聊天机器人的开发环境（原称 AIP Agent Studio / AIP Agents）。聊天机器人配备企业特定信息和工具，由 LLM、[[Ontology]]、文档和自定义工具驱动。

## 核心属性

### 关键概念

| 概念 | 说明 |
|------|------|
| **AIP Chatbots** | 配备企业信息和工具的交互式助手 |
| **Application State** | 应用变量，在 Prompt 中定制和控制 LLM 行为 |
| **Instructions & Descriptions** | 编译为 LLM 的系统提示 |
| **RAG** | 检索增强生成，动态利用外部数据源 |
| **Retrieval Context** | 针对每条消息检索的特定信息 |
| **Tools** | LLM 可调用的外部功能/API |
| **Vector Embeddings** | 文本的数值表示，用于语义搜索 |
| **Context Window** | LLM 一次可处理的文本量上限 |
| **Chatbots as Functions** | 聊天机器人可发布为 Functions，在 [[AIP-Evals|Evals]]、Automate 中使用 |

### Prompt 编写建议

1. 先写最重要的信息（任务概述）
2. 后跟必要数据和工具使用指导
3. LLM 只能访问显式提供的信息

## 相关链接

- [[AIP-Logic]] — Logic 函数 vs Chatbot
- [[AIP-Evals]] — Chatbot 函数评估
- [[Ontology]] — 数据源
- [[AIP-Assist]]
- [[AIP总览]]
- [[主页]]
- [[术语索引]]
