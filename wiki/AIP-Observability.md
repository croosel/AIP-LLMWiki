---
tags:
  - Palantir
  - AIP
  - 可观测性
  - 监控
  - Dashboard
created: 2026-05-20
source: "[[Palantir_AIP_Wiki]]"
---

# AIP Observability（可观测性）

## 定义

**AIP Observability** 是 Workflow Lineage 中的一组能力，提供对 AIP 和 [[Ontology]] 工作流执行的可见性。它形成「决策质量 + 运行性能」的双维度可观测性体系。

## 核心属性

### 五大核心组件

| 组件 | 说明 |
|------|------|
| **Metrics** | 性能指标 |
| **Execution History** | 执行历史记录 |
| **Distributed Tracing** | 分布式追踪 |
| **Logging (Service Logs & Debugging)** | 服务日志与调试 |
| **Log Search** | 日志搜索 |

### 双维度监控

**维度 1：资源消耗监测**

| 指标 | 监控维度 | 价值 |
|------|---------|------|
| Token 消耗 | 按 Function / Agent / 时间段 | 成本治理、异常预算预警 |
| LLM 调用延迟 | P50 / P95 / P99 | 识别性能瓶颈 |
| 并发吞吐量 | 同时执行的 Logic 函数数 | 容量规划 |
| 错误率 | 按 Block / 按错误类型 | 故障定位 |

**维度 2：决策质量评估** 参见 [[AIP-Evals#核心性能指标可视化|Evals 指标可视化]]

### Dashboard + Debugger 协同

| 工具 | 视角 | 输出 | 定位 |
|------|------|------|------|
| **Debugger** | 微观 | LLM 思维链 (Chain-of-Thought) | 单个请求的推理过程排查 |
| **Metrics Dashboard** | 宏观 | 多请求的聚合趋势图表 | 系统性模式识别和性能基线 |

**闭环工作流**:
```
Dashboard 发现异常（宏观趋势）→ Debugger 定位根因（微观排查）
→ 修复 Logic 函数 → 重新运行评估 → Dashboard 验证回升
```

### 集成范围

- AIP 代理、函数、语言模型、自动化、Actions、Ontology
- 是 Palantir 平台级可观测性策略的一部分
- 即使未启用 AIP 也可使用

## 业务用途

将原本「黑盒」的 AI 推理过程转变为受治理、可审计且可量化的生产流程，确保企业级 AI 决策的可靠性。

## 外贸应用

> 参见 [[AIP_Alibaba_Integration]]

在外贸场景中，可观测性监控覆盖：

- **成本治理链**: Dashboard Token 消耗 → 对比预算 → 超标告警 → 优化 Prompt 长度或模型选择
- **[[P4P投流策略|P4P 投放]]效果追踪**: 曝光→点击→询盘→订单全链路漏斗
- **[[AIP-伦理与治理|伦理合规]]验证**: 审计追踪记录 AI 决策的每一步

## 常见问题

**Q: 可观测性和 AIP Evals 有什么区别？**
A: Evals 是在部署前评估函数质量（离线），Observability 是在生产运行时监控（在线）。两者通过 Metrics Dashboard 打通。

**Q: 未启用 AIP 是否能用这些监控能力？**
A: Workflow Lineage 的基础监控（Execution History、Logging）在未启用 AIP 时也可使用，但 LLM 相关的 Token 消耗、调用延迟等需要 AIP。

## 相关链接

- [[AIP-Evals]] — 评估体系与 Dashboard
- [[AIP-Logic]] — Logic 函数调试
- [[AIP-伦理与治理]] — 审计与问责
- [[AIP总览]] — AIP 平台全貌
- [[AIP-Beacon-产品命名与品牌定位]]
- [[AIP安全与治理]]
- [[AIP评估套件深度]]
- [[AIP跨境运营中枢-商业系统架构]]
- [[LILIS伦理审查]]
- [[Skills技能集与60-40覆盖]]
- [[主页]]
- [[产品策略-国际站AI运营Agent]]
- [[术语索引]]
