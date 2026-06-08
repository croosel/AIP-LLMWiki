---
tags: [Observability, Palantir-AIP, Monitoring, Data-Health, AIP-Observability]
created: 2026-05-21
source: "[[raw/palantir_docs_observability]]"
---
# Observability 总览

## 定义

Palantir **Observability** 是平台内建的四支柱可观测性体系，覆盖从数据管道到 AI 工作流的全链路监控。四支柱协同工作，让团队从被动救火转变为主动预防。

> **Monitor → Debug → Trace → Analyze**：监控发现问题 → 调试定位根因 → 追踪执行链路 → 分析趋势优化。

## 四支柱架构

```
Observability
├── Monitor（监控）
│   ├── Data Health ── 平台资源健康统一入口
│   │   ├── Monitoring Views ── 跨项目规模化监控（9种资源类型）
│   │   └── Health Checks ── 单数据集深度校验（5类预建检查）
│   ├── Alerts ── PagerDuty / Slack / Webhook / Email / Foundry 通知
│   └── Metrics ── Success/Failure + P95 Duration（30天滑动窗口）
│
├── Debug（调试）
│   ├── Workflow Lineage ── 7天执行历史+多维度过滤
│   ├── AIP Observability ── Agent/Function/LLM/Automation 全链路
│   │   ├── Execution History ── 30天完整执行记录
│   │   ├── Distributed Tracing ── 跨服务请求追踪
│   │   └── Log Search ── 跨所有执行日志搜索
│   └── Logs ── 第三方库日志 + 自定义代码日志
│
├── Trace（追踪）
│   ├── Distributed Trace View ── 全请求链路可视化
│   │   └── 每个操作：Duration / Inputs / Outputs / Errors
│   └── Source Executor 追溯 ── 从结果反追到触发源
│
└── Analyze（分析）
    ├── Log Export → Streaming Dataset ── 导出到平台数据分析工具
    ├── Custom Dashboards ── 自建可观测仪表盘
    └── Third-party Export ── 导出到外部可观测系统
```

## 核心属性

### 1. Data Health — 监控统一入口

Data Health 是平台的**监控应用主界面**，从 Foundry 侧边栏直接进入。它提供两种监控模式：

| 模式 | 适用场景 | 监控范围 |
|------|---------|---------|
| **Monitoring Views** | 跨项目/文件夹批量监控，统一规则 | Project / Folder / Single |
| **Health Checks** | 单资源深度内容与 Schema 校验 | Single Dataset / Schedule |

两种模式都生成告警。Health Checks 可在 Dataset Preview 的 Health 标签、Project Catalog、Data Lineage（按健康状态着色）中直接查看。

### 2. Workflow Lineage + AIP Observability — 调试中心

Workflow Lineage 从"构建工具"延伸为"调试中心"：

- **7天执行历史** — 按状态/用户/时长/版本过滤
- **全日志搜索** — 跨 Source Executor 搜索特定错误/模式
- **AIP Observability 集成** — Agent / Function / LLM / Automation 全链路

AIP Observability 即使未启用 AIP 也能工作，覆盖所有 Ontology 和 AIP 工作流。

### 3. Metrics — 量化健康

所有资源类型共享两个核心指标：

| 指标 | 说明 | 数据窗口 |
|------|------|---------|
| **Success/Failure** | 成功/失败计数，近实时 | 30天 |
| **P95 Duration** | 95分位执行时长，定位长尾瓶颈 | 30天 |

数据来源：Foundry Telemetry Service (FTS)，近实时更新。

**权限**：必须为资源的 `viewer` 才可查看指标。

### 4. Log Export — 自建分析

Foundry 可将**全组织所有 telemetry（logs + metrics + traces）**导出到 Streaming Dataset，供平台的 Pipeline Builder / Contour / Quiver 分析，或导出到第三方系统。

## 业务用途

### 从被动到主动的运维转型

传统运维：报警 → 排查 → 修复（被动响应）
Palantir Observability：监控预警 → Workflow Lineage 溯源 → Trace 定位 → 趋势分析预防（主动预防）

### 跨团队协作价值

- **数据工程师**：Data Health 监控 Pipeline 健康
- **ML 工程师**：AIP Observability 监控模型推理性能
- **应用构建者**：Workflow Lineage 调试 Workshop 工作流
- **运营人员**：Metrics Dashboard 监控业务指标趋势

## 外贸应用

### LILIS Observability 等效实现

| Palantir 工具 | LILIS 等效方案 | 实现方式 |
|-------------|-------------|---------|
| **Data Health** | Health Monitor Script Suite | Python脚本定时检查Alibaba API状态 |
| **Monitoring Views** | Centralized Monitor Config | YAML配置文件定义监控规则 |
| **Health Checks** | Dataset Validator | Pandas/Great Expectations校验数据质量 |
| **Alerts (PagerDuty/Slack)** | Slack Webhook + Email | 告警→Slack运营群+Email |
| **Execution History** | Script Run Log | JSON日志文件+SQLite |
| **Distributed Tracing** | OpenTelemetry (手动插桩) | 在API调用链中传递trace_id |
| **Log Search** | ELK Stack (Elasticsearch) | 集中日志+关键词搜索 |
| **Metrics (P95)** | Prometheus + Grafana | 时序指标采集+可视化 |

### LILIS 监控四层模型

```
Level 1: 基础设施监控
  - Alibaba API 可用性 (每分钟 ping)
  - Google Sheets API 连通性
  - cron 任务执行状态

Level 2: 数据管道监控
  - P4P 数据导出是否及时
  - 产品数据同步是否完整
  - 询盘数据是否有缺失

Level 3: 业务指标监控
  - P4P CTR 是否低于阈值
  - 预算消耗率是否异常
  - 产品星级是否下降

Level 4: AI 工作流监控
  - 询盘分类准确率
  - P4P ROI 预测偏差
  - Agent Skill 执行成功率
```

### LILIS 告警规则示例

```yaml
rules:
  - name: P4P Budget Alert
    condition: campaign.budget_remaining < campaign.daily_budget * 0.20
    severity: HIGH
    channel: [slack, email]
    message: "Campaign {{campaign_id}} 预算不足20%"

  - name: Data Sync Delay
    condition: time_since_last_sync > 2 hours
    severity: MEDIUM
    channel: [slack]
    message: "数据同步延迟超过2小时"

  - name: Product Rating Drop
    condition: product.rating < 4.0 AND product.previous_rating >= 4.0
    severity: HIGH
    channel: [slack, email]
    message: "产品 {{product_id}} 星级降至 {{product.rating}}"
```

## 常见问题

**Q: Monitoring Views 和 Health Checks 如何选择？**
A: Monitoring Views 适合跨项目批量监控（统一规则），Health Checks 适合单数据集深度校验（内容+Schema）。推荐组合使用。

**Q: AIP Observability 需要启用 AIP 吗？**
A: 不需要——即使 Enrollment 未启用 AIP，AIP Observability 也能监控所有 Ontology 工作流。

**Q: Log Export 到 Streaming Dataset 有额外成本吗？**
A: 可能不是所有 Enrollment 都可用，需联系 Palantir Support。

**Q: LILIS 如何实现 P95 监控？**
A: 在每次 API 调用和脚本执行时记录执行时长 → 存入 Prometheus → Grafana 计算 P95。

## 相关链接
- [[Data-Health与告警]] — Data Health + Metrics + Run History 详解
- [[Automate与工作流]] — Automate 条件→效果引擎
- [[Ontology应用生态]] — 完整应用矩阵
- [[开发者工具链总览]] — Functions 执行监控
- [[应用构建总览]] — Workflow Lineage 详细能力
- [[AIP与Ontology架构关系分析]]
- [[主页]]
- [[术语索引]]
