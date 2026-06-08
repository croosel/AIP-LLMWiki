---
tags:
  - Palantir
  - AIP
  - Logic
  - 无代码
  - LLM函数
created: 2026-05-20
source: "[[Palantir_AIP_Wiki]]"
---

# AIP Logic

## 定义

**AIP Logic** 是 Palantir AIP 中的无代码开发环境，用于构建、测试和发布由 LLM 驱动的函数。用户通过直观的点按式界面工程化 prompts，使 LLM 能与 [[Ontology]] 数据交互。

## 核心属性

### 基本概念

| 概念 | 说明 |
|------|------|
| **Logic Function** | 接收输入（Ontology 对象、文本字符串），返回输出（值、对象或 Ontology 编辑） |
| **Blocks** | Logic 函数的组成单元，每个 Block 有特定目的 |
| **Debugger** | 运行时显示 LLM 思维链（Chain-of-Thought），展示每个步骤和使用的工具 |
| **Evaluations** | 为 Logic 函数编写的详细测试（参见 [[AIP-Evals]]） |
| **Ontology 编辑** | 必须通过 Action 发布和调用才能写回 Ontology |
| **自动化** | Logic 函数可自动执行 Ontology 编辑或暂存供人工审核 |

### Block 类型

| Block | 功能 |
|-------|------|
| **Use LLM Block** | 核心 Block，由 Prompt + Tools + Output 三部分构成 |
| **Apply Action Block** | 确定性调用 Action，无需经过 LLM Block |
| **Execute Function Block** | 调用 Foundry 中的现有函数（TypeScript/Python/Logic） |
| **Conditionals** | 类似 if-then-else 的条件判断，支持多分支 |
| **Loops** | 对集合中每个元素运行转换，支持并行执行 |
| **Create Variable Block** | 创建可在后续 Block 中引用的变量 |

### Use LLM Block 可用的 Tools

| Tool | 功能 |
|------|------|
| Apply actions | 使用 Action 编辑 Ontology |
| Call function | 调用其他 TypeScript/Python/Logic 函数 |
| Query objects | 访问指定 Object Type 的属性 |
| Calculator | 精确数学计算 |

## 业务用途

- 将非结构化输入（如 [[询盘]] 文本）连接到 Ontology
- 自动分类和路由业务请求
- 解决排程冲突
- 优化资产性能
- 响应供应链中断

## 外贸应用

> 参见 [[AIP_Ontology_Alibaba_Blueprint]]、[[LILIS-婚庆派对用品]]

在外贸运营中，AIP Logic 可实现：

| Function | 用途 | 输入 | 输出 |
|----------|------|------|------|
| ClassifyInquiryIntent | 询盘意图分类 + 活动信息提取 | [[询盘]] 内容 | 分类标签、活动日期、紧急度 |
| CrossSellBundleGenerator | 婚庆套餐搭配推荐 | 询盘中产品 | [[ProductBundle]] 套餐建议 |
| SeasonalDemandForecast | 季节性需求预测 | 12 个月历史销量 | 各品类预测 + [[P4P投流策略|P4P 预算]]建议 |
| ListingQualityAuditor | 产品列表质量诊断 | 产品 ID | 问题清单 + 优化建议 |
| StoreHealthScore | 店铺综合健康度 | 店铺 ID | 四维评分 + 预警 |

## 常见问题

**Q: Logic 函数如何写回 Ontology？**
A: 必须通过 Action 调用，Logic 函数本身不能直接修改 Ontology 数据。Apply Action Block 提供确定性写入路径。

**Q: 无代码是否意味着非技术人员也能使用？**
A: 目标用户是"应用构建者"，需要理解 Ontology 结构和业务逻辑，但无需编程技能。

**Q: 循环是否支持并行执行？**
A: 无 Action 的循环迭代将并行执行，有 Action 的循环串行执行以保证数据一致性。

## 相关链接

- [[AIP总览]] — AIP 平台全貌
- [[AIP-Evals]] — Logic 函数的测试与评估
- [[Ontology]] — 本体论数据模型
- [[AIP-Observability]] — 可观测性监控
- [[Sense-Reason-Act架构]] — Logic 函数在架构中的位置
- [[AIP+Ontology产品增强分析]]
- [[AIP-Beacon-产品命名与品牌定位]]
- [[AIP-Chatbot-Studio]]
- [[AIP-伦理与治理]]
- [[AIP神经符号架构]]
- [[AIP跨境运营中枢-商业系统架构]]
- [[AI前沿开发工程师]]
- [[LILIS-AIP方法论-中小卖家AI增效实战手册]]
- [[Skills技能集与60-40覆盖]]
- [[三阶段升级路径-Sense-Reason-Act]]
- [[主页]]
- [[产品策略-国际站AI运营Agent]]
- [[动力层与写回]]
- [[卖家痛点深度分析]]
- [[本体增强生成]]
- [[术语索引]]
