---
tags: [Palantir, AIP, Logic, Block, CoT, 函数, Automate, LLM编排, 核心概念]
created: 2026-05-20
updated: 2026-06-21
source: "[[Palantir_Docs_Research_20260520]], https://palantir.com/docs/foundry/logic/overview/, https://palantir.com/docs/foundry/logic/core-concepts/, 53AI 深度解析"
---
# AIP Logic 核心概念

## 定义

**AIP Logic** 是 Palantir AIP 的无代码开发环境，本质是一个 **LLM 功能编排器**——通过 Block 拖拽界面，将 Prompt 工程、Ontology 数据交互、确定性计算和 Action 执行编排成可测试、可评估、可发布的 AI 函数。应用构建者无需处理传统开发环境和 API 调用的复杂性，即可构建生产级 AI 工作流。

> 定位区分：[[AIP-Logic]] 是入口页面（偏业务用途），本页是技术深度参考。

## 核心属性

| 属性 | 值 |
|------|-----|
| 定位 | No-Code LLM 函数编排器 |
| 核心单元 | Block（块），链式组合 |
| 输入 | Ontology 对象 / 文本字符串 / 原始类型（string, timestamp, boolean, array） |
| 输出 | 值（字符串）/ 对象 / Ontology 编辑（必须通过 Action 写回） |
| 调试器 | 实时 CoT（思维链）追踪，可展开/折叠每步卡片 |
| 评估 | [[AIP-Evals]] 集成（中间参数评估 + 方差分析 + 跨模型对比） |
| 自动化 | Automate Logic Effect（Staged / Auto-apply） |
| 权限 | 继承当前用户权限 + 函数级访问控制 |
| 计算 | 按 Block 类型计费（compute-seconds） |

---

## Block 完整体系

### Block 类型全景

| Block | 类型 | 用途 | LLM 参与 |
|-------|------|------|---------|
| **Use LLM** | AI 推理 | 调用 LLM 进行推理/生成，核心 Block | 是 |
| **Apply Action** | 确定性执行 | 触发 Action Type，直接编辑 Ontology | 否 |
| **Execute Function** | 确定性执行 | 调用 Foundry 函数（TS/Python/Logic） | 否 |
| **Create Variable** | 数据准备 | 创建变量供后续 Block 引用 | 否 |
| **Read Object / Property Extraction** | 数据读取 | 从 Ontology 读取对象或提取特定属性 | 否 |
| **Write to Ontology** | 数据写入 | 向 Ontology 写入（需通过 Action） | 否 |
| **Calculate / Transformation** | 数据处理 | 执行计算、JSON 解析、日期转换、聚合 | 否 |
| **Conditionals** | 流程控制 | if-then-else 条件判断，支持多分支 | 否 |
| **Loops** | 流程控制 | 对集合中每个元素运行转换 | 视内部 Block |

> **关键区分**：确定性 Block（Apply Action / Execute Function / Calculate）不消耗 LLM token，执行结果可预测；Use LLM Block 是非确定性的，需要通过 Evals 验证质量。

### Use LLM Block 深度解析

Use LLM Block 是整个 Logic 的核心，内部由三部分构成：

#### ① Prompt（指令层）

- **System Prompt**：定义 LLM 的角色、权限边界和行为约束
- **User Prompt**：具体任务指令，通过 `/` 斜杠命令注入上游变量
- **Few-shot Examples**：示范正确的工具调用结构，引导 LLM 行为
- **最佳实践**：先定义主要目标，再列出数据需求；明确告诉 LLM 遇到缺失参数时应该追问，而非幻觉填充

#### ② Tools（工具层，四件套）

| Tool | 功能 | 依赖 |
|------|------|------|
| **Query Objects** | 访问指定 Object Type 的属性（优化 token 用量，只拉需要的字段） | Ontology Manager 中的元数据描述 |
| **Call Function** | 调用已发布的 TS/Python/Logic 函数 | LLM 通过 JSDoc 注释和 display name 理解参数用途 |
| **Apply Action** | 编辑 Ontology 数据（创建/更新对象） | Ontology Manager 中清晰的 Action 描述 |
| **Calculator** | 精确数学计算（避免 LLM 算数错误） | 无外部依赖 |

> **Call Function 的关键陷阱**：LLM 无法阅读函数代码，完全依赖 JSDoc 注释（`/**...*/`）和 display name 来理解参数含义。参数应尽量使用简单数据类型，避免复杂 JSON 对象。

#### ③ Output（输出层，两种模式）

| 模式 | 行为 | 适用场景 |
|------|------|---------|
| **Feedback to LLM** | 工具执行结果回传 LLM context，由 LLM 生成自然语言回复 | 需要综合总结的场景（默认） |
| **Pass to Logic Output** | 绕过 LLM 最终回复，直接将工具返回值作为工作流输出变量 | 需要精确数据传递的场景 |

#### Tool 参数映射（三种模式）

配置 Tool 参数时，每个参数可选择以下映射方式：

| 映射模式 | 行为 | 适用 |
|---------|------|------|
| **LLM Generated** | LLM 从用户自然语言输入中推断参数值 | 参数来自用户对话内容 |
| **Fixed / Static** | 硬编码固定值，不受 Prompt 影响 | 常量参数（如固定分类标签） |
| **Variable** | 直接映射上游 Block 的输出变量，绕过 LLM 推断 | 参数来自前序确定性计算 |

### Block 链式组合与数据流

Block 之间通过**变量引用**传递数据：前一个 Block 的输出成为后续 Block 的输入。

```
输入 (Order Object)
  → Create Variable Block (存储 order_id)
  → Read Object Block (读取订单详情 + 客户信息)
  → Use LLM Block (分析订单异常)
      Prompt: "分析以下订单是否存在风险: /order_details"
      Tools: [Query Objects (Product), Calculator]
      Output: Feedback to LLM
  → Calculate Block (风险评分 = LLM输出 × 权重)
  → Conditional: 风险评分 > 阈值?
      → Yes: Apply Action Block (标记订单为待审核)
      → No: Write Block (记录审计日志)
  → Use LLM Block (生成审核建议摘要)
```

**数据流规则**：
- 无 Action 的 Loop 迭代**并行执行**（提升性能）
- 有 Action 的 Loop 迭代**串行执行**（保证数据一致性）
- Conditionals 支持多分支（不止 if-else，可有 elif）

---

## 运行与调试

### Debugger CoT 追踪

运行 Logic 函数时，Debugger 面板展示：
- 每个 Block 的 LLM **思维链**（Chain-of-Thought）
- LLM 在每个步骤调用的**支撑工具**（Query Objects / Calculator / Apply Action）
- 可**展开/折叠**每步卡片，审查生成的完整 Prompt
- 中间参数可在 [[AIP-Evals|Evaluation Suite]] 中作为独立评估点

> **调试器中的 Ontology 编辑是假设性的**——AI 提议的修改仅在 Debugger 中模拟，不会实际写入 Ontology。要真正提交编辑，必须发布函数并通过 Action 或 Automate 触发。

### 运行模式

| 模式 | 说明 | 适用阶段 |
|------|------|---------|
| **Test Run** | 开发阶段单次运行，观察 Debugger | 开发 / 迭代 |
| **Publish** | 发布为可用 Function，生成版本号 | 上线 |
| **Automate (Staged)** | 自动化触发，Ontology 编辑暂存待人工审核 | 高风险操作 |
| **Automate (Auto-apply)** | 自动化触发，自动执行 Ontology 编辑 | 低风险操作 |

---

## 发布与评估

### Publish 流程

```
Logic 函数开发完成
  → Publish (生成版本号)
  → 选择 Execution Mode (Staged / Auto-apply)
  → 配置 AIP Evals (编写测试用例)
  → 集成到 Automate / Workshop / Action
```

发布后的 Logic 函数行为类似标准 Object Function，可：
- 驱动 Workshop Markdown Widget（需返回字符串）
- 嵌套在其他 Logic Function 中复用
- 被 Action 触发执行

### AIP Evals 评估

- 为 Logic 函数编写详细测试用例
- **中间参数评估**：验证特定 Block 的输出（不只是最终结果）
- **方差分析**：多次运行一致性检验（非确定性 Block 的关键）
- **跨模型对比**：选择最优 LLM 模型
- 运行面板支持保存特定场景为**单元测试**，用于持续性能评估

---

## 计算模型

| Block 类型 | 每 Block 计算秒数 |
|-----------|-----------------|
| LLM Block（无 Action） | 4 compute-seconds |
| Action Block (含 LLM) | 8 compute-seconds |
| 非 LLM Block | 计入 Function compute |

**示例**: 2 个 LLM Block + 1 个 Action Block，运行 2 次 = (2×4 + 1×8) × 2 = 32 compute-seconds。

> **优化提示**：Use LLM Block 的 Query Objects Tool 只拉需要的字段（而非整个 Object），可显著降低 token 消耗。

---

## 错误处理

Logic 的错误处理分两层：

### 代码层（Function 内部）

- 被调用的 TS/Python 函数应内置 `try-catch` 逻辑
- **不要抛出原始异常**，而是返回清晰的文本字符串（如 `"No order found"`），让 LLM 能礼貌地回复用户
- 函数返回值应尽量简洁（如单个 Double 值），便于 LLM 理解和综合

### Prompt 层（LLM 行为控制）

- 在 Prompt 中指示 LLM：**遇到缺失的必要参数时，应向用户追问，而非幻觉填充**
- 为边界情况提供 Few-shot 示例（如空输入、异常格式）
- 对高风险操作（库存修改、价格调整）加入确认步骤

---

## 安全与权限

| 层面 | 机制 |
|------|------|
| **用户权限继承** | Action 在当前用户权限下执行，LLM 只能访问用户有权访问的数据 |
| **函数级访问控制** | 平台安全控制只授予 LLM 完成任务所需的最小访问权限 |
| **破坏性操作门控** | 删除、批量修改等操作应限制权限或走审批工作流（Staged 模式） |
| **Ontology 写回路径** | Logic 函数本身不能直接修改 Ontology——必须通过 Action 发布和调用 |

> **核心安全原则**：AI 提议的修改在 Debugger 中仅是模拟；真正写回 Ontology 的唯一路径是发布 → Action/Action 触发。

---

## 整合模式

### Logic × Workshop

Logic 函数可作为 Workshop Module 的数据源，驱动 Markdown Widget 展示 AI 分析结果。Workshop 提供前端交互界面，Logic 提供后端 AI 推理。

### Logic × Automate

通过 Automate Logic Effect，Logic 函数可按规则自动触发：
- **Staged 模式**：自动运行但 Ontology 编辑暂存，需人工审核后手动应用
- **Auto-apply 模式**：自动运行并直接执行 Ontology 编辑

### Logic × Action

Logic 函数发布后，可被 Action 调用。Action 提供确定性触发入口（按钮、表单），Logic 提供 AI 推理能力。这是 Workshop 用户触发 AI 功能的主要路径。

### Logic × Logic（函数嵌套）

Logic 函数可调用其他已发布的 Logic 函数（通过 Execute Function Block），实现复杂工作流的模块化组合。

---

## 外贸应用

> 参见 [[AIP构建完整指南]] · [[LILIS数据模型v2]]

### 对 LILIS 的映射

| Logic Block | LILIS 应用 |
|------------|-----------|
| Read Object | 读取 Product 对象（标题、属性、曝光量） |
| Create Variable | 存储产品 ID、时间范围等查询参数 |
| Use LLM | 基于 RAG 数据生成 128 字符标题优化建议 |
| Calculate | 计算 P4P ROI = 询盘数 / 花费 |
| Apply Action | 调用 Alibaba API 调整出价（Execute Tools 模式） |
| Conditional | 判断 ROI 是否低于阈值，决定是否触发优化 |
| Write to Ontology | 记录调价审计日志到本地数据模型 |

### 典型 Function 设计

```
Function: ClassifyInquiryIntent
  输入: 询盘文本 (string)
  → Use LLM Block
      Prompt: "分类以下询盘的意图，提取产品、数量、活动日期..."
      Tools: [Query Objects (Product catalog)]
      Output: Pass to Logic Output (结构化 JSON)
  → Calculate Block (解析 JSON，提取紧急度评分)
  → Conditional: 紧急度 > 高?
      → Apply Action: 标记询盘为优先处理
      → Write: 记录分类结果
  输出: {intent, products, urgency, event_date}
```

---

## 常见问题

**Q: AIP Logic 生成的函数能直接调用外部 API 吗？**
A: 不直接。外部 API 调用通过 Functions 的 `external functions`（Webhooks）模式间接实现。Logic 通过 Execute Function Block 调用已封装的 TS/Python 函数。

**Q: Staged 和 Auto-apply 如何选择？**
A: 高风险操作（库存、价格修改）用 Staged 加人工审核；低风险操作（数据标注、分类）用 Auto-apply。

**Q: Logic 函数如何写回 Ontology？**
A: 必须通过 Action 调用。Logic 函数本身不能直接修改 Ontology 数据。Apply Action Block 提供确定性写入路径。Debugger 中的编辑仅为模拟。

**Q: Use LLM Block 的 Call Function Tool 为什么经常调错参数？**
A: LLM 无法阅读函数代码，完全依赖 JSDoc 注释和 display name。如果注释不清晰或参数类型过于复杂（嵌套 JSON），LLM 容易误解。解法：简化参数类型 + 完善 JSDoc + 添加 Few-shot 示例。

**Q: 循环是否支持并行执行？**
A: 无 Action 的循环迭代并行执行（性能优先）；有 Action 的循环串行执行（数据一致性优先）。

**Q: 如何优化 Logic 函数的 token 消耗？**
A: 用 Query Objects Tool 只拉需要的字段（非整个 Object）；用 Variable Block 缓存确定性计算结果，避免重复送入 LLM；用 Calculator Tool 替代 LLM 做数学运算。

---

## 相关链接

- [[AIP-Logic]] — 入口页面（业务用途视角）
- [[AIP构建完整指南]] — AIP 整体构建指南
- [[AIP-Evals]] — Logic 函数的测试与评估
- [[AIP-Observability]] — 可观测性监控
- [[Ontology构建实操]] — Ontology 数据模型实操
- [[AIP+Ontology产品增强分析]] — OAG 架构分析
- [[AIP-Chatbot构建]] — Chatbot 与 Logic 的配合
- [[AIP跨境运营中枢-商业系统架构]] — 运营架构中的 Logic 定位
- [[AIP跨境运营方法论-四阶段实施]] — 四阶段实施路径
- [[三阶段升级路径-Sense-Reason-Act]] — Logic 在 Sense-Reason-Act 中的位置
- [[Automate与工作流]] — Automate 自动化触发详解
- [[Functions运行时]] — Functions 运行时环境
- [[Action-Types详解]] — Action Type 详解
- [[主页]]
