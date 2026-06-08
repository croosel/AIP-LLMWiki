---
tags:
  - 经验记录
  - 决策经验
  - Palantir
  - AIP
created: 2026-05-23
related_wiki:
  - "[[LILIS_AIP_Failure_PostMortem_20260523]]"
  - "[[AIP总览]]"
  - "[[Ontology]]"
---

# 🧠 AIP & Ontology 决策累积经验报告 (Decision Analytics)

> **目标**：通过对 LIL-0001 任务的复盘，建立一套基于 AIP 范式的“最优执行路径”决策模型。

## 1. AIP 决策范式建模 (Sense → Reason → Act)

| 阶段 | 传统模式 (P2) | AIP 进化模式 (P0) | 决策经验累积 |
| :--- | :--- | :--- | :--- |
| **Sense (感知)** | 仅关注“网页按钮”和“UI 视觉”。 | 深度检索 **MCP Tool Schema** 与 **API 接口描述**。 | **经验 1**：感知层必须包含“工具能力边界”的静态调研，而非仅关注动态 UI。 |
| **Reason (推理)** | 模拟人类动作，试图通过“打字”同步状态。 | 识别 **SPA 框架状态机** 与 **Native API 权限**。 | **经验 2**：推理逻辑应优先考虑“数据直连”，而非“模拟操作”。 |
| **Act (行动)** | 逐个点击，不断 Snapshot 确认。 | **批量 JSON 指令分发**，秒级物理写入。 | **经验 3**：行动应追求“事务原子性”（即 API 请求），以减少执行偏移。 |

## 2. Ontology 业务对象映射 (Object Mapping)

我们通过本次任务，为 LILIS 运营体系定义了新的 **决策元属性**：

- **Object: `Executor_Path` (执行路径)**
    - `path_cost` (时间/Token 成本)：P2=100%, P0=2.5%。
    - `drift_risk` (偏移风险)：UI 模拟高，API 直接调用零。
    - `verification_reliability` (验证可靠性)：物理回读 100% 确定。

- **Logic Function: `SelectBestPath(Task)`**
    - **逻辑定义**：若 `API_Exists == True`，则强制 `Execution_Mode = P0`；禁止 `Path_Downgrade`。

## 3. 决策累积结论：指挥官模式的必然性

- **经验累积 A (路径依赖拦截)**：Agent 必须在启动前识别“路径陷阱”。如果 Wiki 中已记录 P0 路径，则在执行层锁定该路径，屏蔽所有低效干扰。
- **经验累积 B (双 Agent 协同效率)**：
    - **Accio (Conductor)** 负责处理复杂的、非结构化的 Wiki 知识。
    - **Plugin Agent (Executor)** 负责处理高速的、结构化的 API 任务。
    - **结论**：这种“认知+执行”的解耦，是达成“最短时间目标”的最佳实践。

---
**本决策经验已作为“AIP 决策引擎”的一部分，永久沉淀于 LILIS 业务知识库。**
