---
tags: [Palantir, AIP, 安全, 隐私, 伦理, 合规, LLM]
created: 2026-05-20
source: "[[Palantir_Docs_Research_20260520]], https://palantir.com/docs/foundry/aip/aip-security/, https://palantir.com/docs/foundry/security/overview/"
---
# AIP 安全与治理

## 定义
Palantir AIP 的安全和治理体系。包括第三方 LLM 使用策略、数据保护、AI 伦理原则、权限模型和审计机制。

## 核心安全保障

### 第三方 LLM 六大保证
| 保证 | 说明 |
|------|------|
| **不存储数据** | 第三方不保留 Prompt 或 Completion 中的客户数据 |
| **不用于训练** | 客户数据绝不用于重新训练第三方模型 |
| **无人查看** | 第三方人员无权限访问 Prompt 或 Completion |
| **区域端点** | 优先就近使用区域端点（US/UK/EU） |
| **合同约束** | 技术 + 合同双重保证，引入新模型前严格审查 |
| **认证合规** | 第三方服务商持有 ISO 27017 / SOC (1,2,3) / CSA STAR |

### 平台内置安全
- **权限模型**：用户和 Function 双重权限控制
- **LLM 隔离**：仅授予完成任务所需的最小数据访问权限
- **审计日志**：所有 AIP 操作可追溯（Workflow Lineage）
- **加密**：传输和静态数据全链路加密

## 治理工具

### 可观测性
| 工具 | 用途 |
|------|------|
| Workflow Lineage | 谁在何时对 Ontology 做了什么 |
| Debugger CoT | LLM 思维链透明化 |
| Evals Dashboard | 准确率趋势、方差分析 |
| Metrics | Token 消耗、响应延迟、成本 |

### AI 伦理原则
1. **隐私与公民自由** — 专门的 Privacy & Civil Liberties Team
2. **透明与可解释** — 审计追踪 + CoT + 评估报告
3. **人机协作** — 所有关键决策保留 Human-in-the-Loop
4. **反偏见** — LLM 输出需经人工审核 + Evals 评估
5. **责任归属** — 操作审计 + 权限控制

## 隐私 FAQ 精选

| 问题 | 答案 |
|------|------|
| 第三方 LLM 存储客户数据吗？ | 否。严格的技术 + 合同保证。 |
| 客户数据用于训练吗？ | 否。客户可选择在 AIP 内私有微调自有模型。 |
| 人类能查看 Prompt 吗？ | 否。第三方人员无法访问。 |
| 数据处理协议？ | 签署数据保护协议（含 BAA） |
| 自托管模型支持？ | 支持，可私有部署。 |

## 外贸应用
> 参见 [[AIP-伦理与治理]] · [[LILIS伦理审查]]

### LILIS 安全映射
| AIP 机制 | LILIS 映射 |
|---------|-----------|
| 最小权限 | Agent 仅访问必要产品/询盘数据 |
| Human-in-the-Loop | P4P 出价调整 → 人工确认 → 执行 |
| 审计日志 | OPERATIONS_TRACKER.md 决策审计 |
| Evals 评估 | P4P 出价效果 7 天验证周期 |

## 常见问题
**Q: AIP 的 LLM 数据真的不传回 OpenAI/Anthropic 训练吗？**
A: Palantir 签署了严格的技术和合同约束。第三方服务商不存储 Prompt、不用于训练、人类无法查看。数据在 Completion 完成后立即丢弃。

**Q: BYOM（自带模型）的安全性如何保障？**
A: BYOM 模式下，模型运行在 Palantir 安全边界内或客户的自有基础设施上，适用同等级别的权限控制和审计。

## 相关链接
- [[AIP-伦理与治理]]
- [[LILIS伦理审查]]
- [[AIP-Evals]]
- [[AIP-Observability]]
- [[AIP构建完整指南]]
- [[主页]]
