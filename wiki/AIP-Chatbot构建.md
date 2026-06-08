---
tags: [Palantir, AIP, Chatbot, Agent, 知识图谱, Workshop]
created: 2026-05-20
source: "[[Palantir_Docs_Research_20260520]], https://palantir.com/docs/foundry/chatbot-studio/getting-started/, https://palantir.com/docs/foundry/workshop/widgets-aip-chatbot"
---
# AIP Chatbot 构建

## 定义
**AIP Chatbot**（2026-04 周前称 AIP Agent）是 Palantir AIP 中基于 Ontology 知识图谱构建的对话式 AI 助手。Chatbot 直接绑定企业 Ontology，通过检索上下文实现「无幻觉」回答。

## 核心属性
| 属性 | 值 |
|------|-----|
| 构建工具 | AIP Chatbot Studio |
| 知识基础 | Ontology 知识图谱 |
| 检索机制 | Retrieval Context（上下文类型） |
| 引用机制 | Citations（如数据源透明可追溯） |
| 工具扩展 | Tools（命令 / 对象查询） |
| 部署方式 | Workshop Widget / API |
| 幻觉控制 | 基于本体增强生成 (OAG)，非文本片段检索 |

## 构建流程

### 1. 打开 Chatbot Studio
```
Foundry → AIP → Chatbot Studio → Create New Chatbot
```

### 2. 配置检索上下文 (Retrieval Context)
| Context Type | 说明 |
|-------------|------|
| **Ontology Objects** | 指定哪些 Object Type 作为知识源 |
| **Documents** | 指定已有的文档/数据集 |
| **Custom Content** | 手动添加 FAQ、规则等文本 |

### 3. 配置 Tools
| Tool | 功能 |
|------|------|
| **Ontology Query** | 查询对象、遍历 Link |
| **Use Commands** | 执行预定义命令 |
| **Apply Actions** | 触发 Action Type |

### 4. 配置 Citations
- 启用后，Chatbot 每次回答附带信息来源引用
- 引用指向具体的 Ontology Object 或文档片段

### 5. 测试
- 在 Studio 内置对话窗口测试
- 验证问答准确性、引用正确性

### 6. 部署到 Workshop
- Workshop 应用 → 拖入 AIP Chatbot Widget
- 绑定 Chatbot ID
- 配置 Workshop Variables 实现应用状态联动
- 发布应用

## 幻觉抑制机制

Chatbot 使用 **OAG（本体增强生成）**，而非传统 RAG：

| RAG | OAG（Chatbot 使用） |
|-----|-------------------|
| 向量检索文本片段 | 查询 Ontology 结构化对象 |
| 可能存在无关片段 | 基于确定的属性和关系推理 |
| 引用是文本位置 | 引用是具体的 Object RID |

## Workshop Widget 集成
```
Workshop Application
  ├── AIP Chatbot Widget (绑定 Chatbot)
  ├── Graph Visualization Widget (展示回答引用的知识图谱子图)
  ├── Object Table Widget (展示相关 Object)
  └── Variable Binding (Chatbot 结果驱动其他 Widget)
```

## 外贸应用
> 参见 [[AIP构建完整指南]] · [[Ontology构建实操]]

### LILIS Chatbot 设计
| 功能 | 实现 |
|------|------|
| 「哪些产品曝光高但零询盘？」 | Ontology Query → Product 对象 → filter exposure>30 |
| 「这个产品的 P4P ROI 如何？」 | Link 遍历 → P4PCampaign → Calculate ROI |
| 「推荐 5 个改善方案」 | Logic 函数 → LLM 分析 → Apply Action 建议 |

## 常见问题
**Q: Chatbot Studio 和 AIP Logic 的区别？**
A: Chatbot Studio 构建面向用户的多轮对话助手；AIP Logic 构建面向流程的 LLM 函数。Logic 函数可以被 Chatbot 作为 Tool 调用。

**Q: 一个 Enrollment 可以创建多个 Chatbot 吗？**
A: 可以。每个 Chatbot 可绑定不同的 Ontology 子集，面向不同业务场景。

## 相关链接
- [[AIP构建完整指南]]
- [[AIP-Logic核心概念]]
- [[本体增强生成]]
- [[Ontology构建实操]]
- [[主页]]
