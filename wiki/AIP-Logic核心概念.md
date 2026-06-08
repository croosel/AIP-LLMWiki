---
tags: [Palantir, AIP, Logic, Block, CoT, 函数, Automate]
created: 2026-05-20
source: "[[Palantir_Docs_Research_20260520]], https://palantir.com/docs/foundry/logic/overview/, https://palantir.com/docs/foundry/logic/core-concepts/"
---
# AIP Logic 核心概念

## 定义
**AIP Logic** 是 Palantir AIP 的无代码开发环境，用于构建、测试和发布由 LLM 驱动的函数。通过直观的 Block 拖拽界面，应用构建者可以编写 Prompt、测试、评估和监控 AI 函数，无需处理传统开发环境和 API 调用的复杂性。

## 核心属性

| 属性 | 值 |
|------|-----|
| 定位 | No-Code LLM 函数开发 |
| 核心单元 | Block（块） |
| 输入 | Ontology 对象 / 文本字符串 / 参数 |
| 输出 | 值（字符串）/ 对象 / Ontology 编辑 |
| 调试器 | 实时 CoT（思维链）追踪 |
| 评估 | AIP Evals 集成 |
| 自动化 | Automate Logic Effect |
| 权限 | 继承用户和函数权限 |
| 计算 | 按 Block 类型计费（compute-seconds） |

## Block 体系

### Block 类型
| Block | 用途 | 示例 |
|-------|------|------|
| **Read Object** | 从 Ontology 读取对象/属性 | 获取 Product 的所有属性 |
| **Write to Ontology** | 向 Ontology 写入数据 | 更新 Order 状态 |
| **Calculate** | 执行计算/聚合 | 计算平均价格 |
| **Use LLM** | 调用 LLM 进行推理/生成 | 分析询盘建议回复 |
| **Apply Action** | 触发 Action Type | 取消订单、更新库存 |
| **Call Function** | 调用其他 Function | 调用外部验证函数 |

### Block 链式组合
```
输入 (Order Object)
  → Read Object Block (获取订单详情)
  → Use LLM Block (分析订单是否存在异常，Prompt: "分析以下订单...")
  → Calculate Block (计算风险评分)
  → Conditional: 高风险?
     → Apply Action Block (标记订单为待审核)
     → Write Block (记录审计日志)
```

## 运行与调试

### Debugger CoT 追踪
- 运行 Logic 函数时，Debugger 面板展示每个 Block 的 LLM 思维链
- 显示 LLM 在每个步骤调用的支撑工具（Query Objects / Calculator / Apply Action）
- 中间参数可在 Evaluation Suite 中作为独立评估点

### 运行模式
| 模式 | 说明 |
|------|------|
| Test Run | 开发阶段单次运行，观察 Debugger |
| Publish | 发布为可用 Function |
| Automate (Staged) | 自动化触发，Ontology 编辑暂存待人工审核 |
| Automate (Auto-apply) | 自动化触发，自动执行 Ontology 编辑 |

## 发布与评估

### Publish 流程
```
Logic 函数开发完成
  → Publish (生成版本号)
  → 选择 Execution Mode (Staged / Auto-apply)
  → 配置 AIP Evals (编写测试用例)
  → 集成到 Automate / Workshop / Action
```

### AIP Evals 评估
- 为 Logic 函数编写详细测试用例
- 中间参数评估：验证特定 Block 的输出
- 方差分析：多次运行一致性检验
- 跨模型对比：选择最优 LLM 模型

## 计算模型
| Block 类型 | 每 Block 计算秒数 |
|-----------|-----------------|
| LLM Block（无 Action） | 4 compute-seconds |
| Action Block (含 LLM) | 8 compute-seconds |
| 非 LLM Block | 计入 Function compute |

**示例**: 2 个 LLM Block + 1 个 Action Block，运行 2 次 = 32 compute-seconds。

## 外贸应用
> 参见 [[AIP构建完整指南]] · [[LILIS数据模型v2]]

### 对 LILIS 的映射
| Logic Block | LILIS 应用 |
|------------|-----------|
| Read Object | 读取 Product 对象（标题、属性、曝光量） |
| Use LLM | 基于 RAG 数据生成 128 字符标题优化建议 |
| Calculate | 计算 P4P ROI = 询盘数 / 花费 |
| Apply Action | 调用 Alibaba API 调整出价 |
| Write to Ontology | 记录调价审计日志到本地数据模型 |

## 常见问题
**Q: AIP Logic 生成的函数能直接调用外部 API 吗？**
A: 不直接。外部 API 调用通过 Functions 的 `external functions` (Webhooks) 模式间接实现。

**Q: Staged 和 Auto-apply 如何选择？**
A: 高风险操作（库存、价格修改）用 Staged 加人工审核；低风险操作（数据标注、分类）用 Auto-apply。

## 相关链接
- [[AIP构建完整指南]]
- [[Ontology构建实操]]
- [[AIP-Evals]]
- [[AIP评估套件深度]]
- [[AIP+Ontology产品增强分析]]
- [[AIP-Chatbot构建]]
- [[AIP跨境运营中枢-商业系统架构]]
- [[AIP跨境运营方法论-四阶段实施]]
- [[三阶段升级路径-Sense-Reason-Act]]
- [[主页]]
