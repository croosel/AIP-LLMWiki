---
tags:
  - Palantir
  - AIP
  - Evals
  - 测试
  - LLM评估
created: 2026-05-20
source: "[[Palantir_AIP_Wiki]]"
---

# AIP Evals

## 定义

**AIP Evals** 是专为 LLM 非确定性行为设计的测试环境，用于评估 [[AIP-Logic|Logic 函数]]、AIP Chatbot 函数或代码编写的函数。它通过测试用例、评估函数和指标仪表板，将 AI 的推理逻辑转化为可衡量的定量数据。

## 核心属性

### 关键概念

| 概念 | 定义 |
|------|------|
| **Evaluation Suite** | 测试用例 + 目标函数 + 评估函数的集合 |
| **Target Function** | 被评估的函数（套件可同时评估多个） |
| **Evaluation Function** | 比较实际输出与期望输出的方法 |
| **Test Cases** | 定义的输入集和期望输出 |
| **Metrics** | 评估函数的结果，按测试用例产生，可汇总或单独比较 |
| **Experiments** | 多版本对比实验结果 |
| **Metrics Dashboard** | 图表和统计信息的仪表盘视图 |

### 数据流

```
编写测试用例 → 创建评估套件（指定目标函数 + 绑定评估函数）
    → 运行评估套件 → 结果自动写入 Dataset
    → Metrics Dashboard 读取 Dataset → 图形化呈现
```

### 使用场景

- 构建 LLM 函数的生产部署信心
- 修改现有实现前的基线验证
- 比较不同模型的表现（如 GPT-4 vs GPT-3.5）
- 检查运行间方差，识别「幻觉」或输出漂移

### 核心性能指标可视化

| 维度 | 说明 |
|------|------|
| **模型横向对比** | 定量比较不同 LLM 在相同 Logic 函数上的准确率、响应时间、Token 消耗 |
| **决策稳定性分析 (Variance)** | 展示多次运行间的偏差，可视化 AI 决策一致性 |
| **中间过程质量评估** | 展示特定 Block 的输出性能，精准定位薄弱环节 |
| **Ontology 编辑验证** | 可视化 AI 对 Ontology 编辑的准确性，检测越权修改、格式违规 |

## 业务用途

确保 AI 驱动的运营决策在部署到生产环境前达到质量标准，防止不可预测的 LLM 行为影响业务流程。

## 外贸应用

> 参见 [[AIP_Alibaba_Integration]]、[[LILIS-婚庆派对用品]]

在 LILIS 外贸运营中，Evals 作为「质量闸门」：

| Suite | 目标 | 通过阈值 |
|-------|------|---------|
| StoreHealthScoreSuite | 店铺健康评分准确性 | 偏差 < 10 分 |
| ListingQualityAuditorSuite | 产品问题召回率 | vs 人工审查 > 90% |
| SeasonalForecastSuite | 季节性预测准确性 | MAPE < 20% |
| CrossSellBundleSuite | 套餐推荐匹配率 | vs 专家 > 75% |
| InquiryClassificationSuite | 询盘分类准确率 | Accuracy > 85% |

## 常见问题

**Q: Evals 和传统单元测试的区别？**
A: 传统测试验证确定性逻辑（输入 A → 输出 B），Evals 处理 LLM 的非确定性输出，需通过聚合统计（准确率、方差）评估。

**Q: Metrics Dashboard 的数据存在哪里？**
A: 评估运行结果自动写入 Palantir Dataset（数据集），Dashboard 从 Dataset 中读取并可视化。

**Q: Evals 能否自动化运行？**
A: 可以，评估套件可通过 Automate 定时触发，作为 CI/CD 质量门禁。

## 相关链接

- [[AIP-Logic]] — 被评估的函数开发环境
- [[AIP-Observability]] — Dashboard + Debugger 协同
- [[AIP总览]] — AIP 平台全貌
- [[Sense-Reason-Act架构]] — Evals 在 REASON 层的位置
- [[AIP+Ontology产品增强分析]]
- [[AIP-Beacon-产品命名与品牌定位]]
- [[AIP-Chatbot-Studio]]
- [[AIP-Logic核心概念]]
- [[AIP-伦理与治理]]
- [[AIP安全与治理]]
- [[AIP评估套件深度]]
- [[AIP跨境运营中枢-商业系统架构]]
- [[AIP跨境运营方法论-四阶段实施]]
- [[LILIS-AIP方法论-中小卖家AI增效实战手册]]
- [[LILIS伦理审查]]
- [[Ontology]]
- [[Skills技能集与60-40覆盖]]
- [[三阶段升级路径-Sense-Reason-Act]]
- [[主页]]
- [[产品策略-国际站AI运营Agent]]
- [[卖家痛点深度分析]]
- [[术语索引]]
- [[模型评估与治理]]
- [[经验累积与竞争壁垒]]
