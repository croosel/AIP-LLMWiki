---
tags:
  - Scout-then-Swarm
  - OODA
  - 态势感知
  - OPC
  - 双轨出海
  - 经验沉淀
created: 2026-06-17
source: "[[态势感知系统-OODA循环与经验积累]], [[AIP_Ontology决策累积报告]], croosel/swarm"
---

# Scout-then-Swarm 作为 OODA 循环引擎

## 核心定位

**Scout-then-Swarm 不是"任务执行工具",是 [[态势感知系统-OODA循环与经验积累]] 的工程化执行引擎。**

每条业务数据变化(P4P 曝光、询盘、订单、平台事件)都是态势变化。Scout-then-Swarm 让 OODA 循环跑得更快、数据变化到决策依据的链路更短。

## 与 Wiki 四层架构的对应

| Wiki 层级 | 内容 | Scout-then-Swarm 组件 |
|---------|------|---------------------|
| **L1 数据层** | Ontology 实时数据 | Scout 阶段(数据变化感知) |
| **L2 决策层** | Sense→Reason→Act | Worker 协作 + Judge 验证 |
| **L3 学习层** | 反馈校准 | Synthesizer 输出 + Evals 验证 |
| **L4 经验层** | 模式库 + 决策日志 | 经验沉淀到 Wiki [[经验索引]] |

**对应表**:
```
L1 (数据层)       → Scout 阶段:从 Ontology 抓数据变化
L2 (Sense→Reason)  → Worker 协作:理解"这个变化意味着什么"
L2 (Act)            → Worker 执行 / Judge 验证
L3 (Learn)          → Judge + Synthesizer 反馈校准
L4 (Experience)     → 经验沉淀到 Wiki 模式库
```

## Fast-Track vs Swarm 路由

| 态势类型 | 路由 | 原因 |
|---------|------|------|
| L4 模式库命中(高置信) | **Fast-Track** | 已知模式,直接走 L4 经验 |
| 简单数据变化 | **Fast-Track** | 常见模式,单模型即可 |
| 复杂态势变化 | Swarm | 需 LLM 推理 + 风险评估 |
| 新态势(无历史) | Swarm | L4 模式库空,需 L2 推理 |

**目标分布:80% Fast-Track + 20% Swarm**(与规格书 §3.3 一致)

## OPC 业务五大感知域的 OODA 映射

| 感知域 | 关键信号 | OODA 循环 |
|--------|---------|----------|
| **需求感知** | P4P 曝光/CTR 突增 | 季度循环 7 轮 |
| **竞争感知** | 竞品排名变化 | 月度循环 4 轮 |
| **买家感知** | 询盘情感/回复率 | 周循环 1 轮 |
| **季节感知** | 婚礼季/节日前置流量 | 季前 3 周启动 |
| **平台感知** | 星等级/健康分 | 日循环 + 异常告警 |

## 与 [[AIP_Ontology决策累积报告]] 的衔接

报告里已定义的 `SelectBestPath(Task)` Logic Function:

```yaml
Object: Executor_Path
  - path_cost
  - drift_risk
  - verification_reliability

Logic: SelectBestPath(Task)
  若 API_Exists == True → 强制 Execution_Mode = P0
  禁止 Path_Downgrade
```

**Scout-then-Swarm 是这个 Logic Function 的运行时实现**。

## 第一刀:从规格书到工作代码

| 阶段 | 现状 | 目标 |
|------|------|------|
| 规格书(366KB) | ✅ 4 蜂产出完整 | 已定稿 |
| Wiki 框架对接 | ❌ 缺这页 | ✅ 写这页 |
| 代码实现 | ❌ 0 行 | Phase 1 写 Fast-Track v0.1 |
| 接 OPC 真实数据 | ❌ 0 任务 | 1 个月内跑通第 1 个感知域 |

**Phase 1(本周)**:
1. 写 `briefing.py` 态势感知简报生成器(1 个文件)
2. 挑 1 个感知域(建议"季节感知")做端到端 demo
3. 跑 1 个真实 OODA 循环,沉淀第 1 条模式到 Wiki

**Phase 2(下月)**:
1. 扩展到 5 大感知域
2. 接 ICBU API / Google Analytics 实时数据
3. 模式库 ≥ 10 条,L4 自动匹配率 ≥ 60%

## 反向工程:删什么

**简化版砍掉**:
- ❌ Waggle Dance(辩论收敛) — 占 CEO 注意力,不是"决策依据"
- ❌ 加权融合(0.4/0.6) — 魔法常量,无数据校准
- ❌ 3 种执行模式 — 90% 任务走单 Worker 串行
- ❌ Dashboard 详细指标 — Phase 2 再说

**保留**:
- ✅ Fast-Track 规则分类器
- ✅ Scout 阶段(任务分解)
- ✅ Worker + Judge(单实例)
- ✅ 经验沉淀到 Wiki(对接 [[经验索引]])

## 衡量标准(CEO 视角)

**不要**:
- 5% 质量提升(单次指标)
- P95 < 15s(延迟指标)
- 100 任务 A/B 测(产品指标)

**要**:
- 老板的"看输出 → 决策 → 反馈"时间从 30 分钟 → 3 分钟
- L4 模式库命中率从 0% → 60%(3 个月内)
- 每周完整 OODA 循环数从 1 → 7

## 相关链接

- [[态势感知系统-OODA循环与经验积累]] — OODA 理论基础
- [[AIP_Ontology决策累积报告]] — 决策经验累积 + SelectBestPath
- [[Sense-Reason-Act架构]] — 三层执行模型
- [[三阶段升级路径-Sense-Reason-Act]] — 演化地图
- [[经验累积与竞争壁垒]] — 护城河数学本质
- [[经验索引]] — L4 模式库对接入口
- [[LILIS双轨实施计划-数据驱动正反馈循环]] — 业务侧的 OODA 实践
- [[LILIS-AIP方法论-中小卖家AI增效实战手册]] — 中小卖家 OODA 入门
- [[OPC双轨出海商业模式]] — 业务全景
- [[lilisaura.com建站进度追踪]] — 首位客户,可能的 L1 数据源
- [[Agent并行架构]] — 4 蜂架构的先验
- [[OPC质检Agent独立审计框架]] — 质检 Agent 与 Judge Bee 对应
