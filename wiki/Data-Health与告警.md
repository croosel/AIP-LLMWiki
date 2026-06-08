---
tags: [Observability, Data-Health, Monitoring, Alerts, Palantir-AIP]
created: 2026-05-21
source: "[[raw/palantir_docs_data_health]], [[raw/palantir_docs_monitoring_views]]"
---
# Data Health 与告警

## 定义

**Data Health** 是 Foundry 平台资源监控的统一入口应用。它通过 Monitoring Views（跨项目规模化监控）和 Health Checks（单资源深度校验）两种模式，配合多通道告警（PagerDuty/Slack/Webhook/Email/Foundry通知），让团队在问题影响业务前就被发现和解决。

## 1. Monitoring Views — 规模化监控

### 定义

Monitoring Views 是取代旧 Check Groups 的新一代监控机制，支持对**9种资源类型**进行跨项目/文件夹批量监控。

### 支持的资源类型与范围

| 资源类型 | 支持范围 | 典型监控规则 |
|---------|---------|------------|
| **Agent** | Single, Project | 心跳超时、版本过期、CPU>80%、Heap>70%、磁盘<10GB |
| **Object Type** | Single, Project | (关联规则) |
| **Link Type** | Single, Project | (关联规则) |
| **Schedule** | Single, Project | Job未按期完成、延迟超时 |
| **Streaming Dataset** | Single, Folder, Project | 未处理积压>1000条、吞吐量<100条/checkpoint |
| **Live Deployment** | Project | 心跳超时>1分钟 |
| **Time Series Sync** | Single | 写入点数<阈值 |
| **Geotemporal Observation** | Single | 发送观测数<阈值 |
| **Automation** | Single, Project | 超时未评估、最近执行失败数>阈值 |

### 规则配置要素

每条监控规则包含：
- **Alert Severity**（Low/Medium/High）—— 可配置仅发送达到某严重级别以上的告警
- **阈值**（大于/小于/等于）
- **时间窗口**（对 Function/Action 规则可用）

### 升级建议

官方推荐将现有 Check Groups 全部升级到 Monitoring Views——获得更广资源覆盖和更强的配置能力。

## 2. Health Checks — 深度校验

### 定义

Health Checks 是对单个资源的**深度内容和 Schema 校验**。Data Health 预建了 5 类检查。

**5类预建检查**：
- **Status** — 数据集构建是否成功
- **Time** — 数据是否按时更新
- **Size** — 数据量是否在预期范围
- **Content** — 数据内容是否符合规则（空值、重复、范围）
- **Schema** — 表结构是否变更

**4种查看方式**：
1. Dataset Preview → Health 标签（添加/修改/查看历史）
2. Project Catalog → Project Maintenance 区域（全项目汇总）
3. Data Lineage → 按健康状态着色 + Data Health 底部面板
4. Data Health 应用 → 全局概览（过滤/排序/添加新检查）

### Monitoring Views vs Health Checks 选择

| 维度 | Monitoring Views | Health Checks |
|------|-----------------|---------------|
| 粒度 | 粗（资源级别指标） | 细（内容/Schema 校验） |
| 范围 | 跨项目/文件夹批量 | 单资源 |
| 覆盖资源 | 9种（Agent→Automation） | Dataset + Schedule |
| 典型问题 | "Agent 心跳停了？" | "这个字段突然多了空值？" |
| 推荐 | 新型监控首选方案 | 深度数据质量校验 |

**最佳实践**：两者组合使用——Monitoring Views 做广覆盖，Health Checks 做深校验。

## 3. Alerts — 多通道告警

### 告警通道

| 通道 | 适用场景 | 配置方式 |
|------|---------|---------|
| **Foundry 通知** | 平台内弹窗/通知中心 | 默认 |
| **Email Digest** | 定时摘要报告 | Data Health 设置 |
| **PagerDuty** | 严重事件即时响应 | 外部集成 |
| **Slack** | 团队协作即时通知 | Webhook 集成 |
| **Webhook** | 自定义下游处理 | 通用 Webhook |

### Alert Severity 过滤

Monitoring Views 可以配置仅发送**达到或超过某严重级别**的告警（如仅发送 High Severity），避免噪音淹没关键信号。

## 4. AIP Metrics — 量化一切

### 核心指标

每类资源（Function / Action / AIP Logic）共享两个核心指标：

| 指标 | 含义 | 用途 |
|------|------|------|
| **Success/Failure Count** | 近实时成功与失败计数 | 快速识别故障爆发 |
| **P95 Duration** | 95分位执行时长 | 定位性能长尾瓶颈 |

数据源：Foundry Telemetry Service (FTS)，近实时更新，30天窗口。

### Function Metrics

Function 监控覆盖：执行成功率、P95 延迟、失败类型分类。

### Action Metrics — 8种失败类型

| 失败类型 | 说明 |
|---------|------|
| **Invalid Parameter** | 提交参数无效 |
| **Scale Limit** | 影响对象超限（默认10,000） |
| **Authentication** | 用户未通过安全提交标准 |
| **Side Effect** | Webhook 或副作用配置错误 |
| **Function Failure** | 底层 Function 失败（仅 Function-backed Action） |
| **User-facing Function Failure** | Function 抛出面向用户的错误 |
| **Conflict** | 并发修改冲突 |
| **Unclassified** | 未归类失败 |

Action Metrics 不需要 Action Log 即可显示——与 Action Log 不同，Metrics 会追踪失败。

### 权限要求

所有 Metrics 要求用户是该资源的 `viewer`。

## 5. Run History — 执行历史

### 核心能力

Run History 是 Functions/Actions/Automations 的**完整执行审计记录**。

**记录字段**：
- **Timestamp** — 执行完成时间
- **Status** — 成功(✓) / 失败(✗)
- **Runtime** — 总执行时间
- **Caller** — 触发源（Workshop / Agent / Third-party App / Automation / Action）
- **Source Executor** — 调用链顶层执行资源

**数据窗口**：30天，按时间戳排序。

**多维度过滤**：状态 / 时间范围 / 用户 / 运行时长 / 版本(仅Function) / Caller / 失败类型。多过滤条件以 AND 组合。

**单次执行检查**：`View log details` → 进入完整 Trace View → 查看 Duration/Inputs/Outputs/Errors。

**限制**：Pipeline Builder 的 Sidecar UDF（Python/Java）不提供执行历史。

## 外贸应用

### LILIS Data Health 等效架构

```python
# LILIS Health Monitor 核心框架
from lilis_observability import HealthMonitor, Rule, Alert

monitor = HealthMonitor()

# Monitoring Views 等效：批量规则
monitor.add_monitoring_view("P4P_Health", scope="project", rules=[
    Rule("Budget", severity="HIGH",
         condition=lambda: campaign.budget_remaining_percent() < 20,
         alert=Alert(slack="#ops", email=True)),
    
    Rule("CTR_Drop", severity="MEDIUM",
         condition=lambda: campaign.ctr() < 0.5,
         alert=Alert(slack="#ops")),
    
    Rule("Sync_Delay", severity="MEDIUM",
         condition=lambda: data_sync.last_success_age() > timedelta(hours=2),
         alert=Alert(slack="#engineering")),
])

# Health Checks 等效：单资源深度校验
monitor.add_health_check("Product_LIL0001", 
    status_check=True,    # 产品是否存在
    content_check={       # 字段完整性
        "title": lambda t: len(t) == 128,
        "main_image": lambda i: i is not None,
        "keywords": lambda ks: len(ks) >= 3,
    },
    schema_check=True     # Schema 是否变更
)

# Run History 等效
monitor.record_execution(
    resource="adjust_p4p_bid",
    status="success",
    runtime_ms=234,
    caller="automation",
    source_executor="budget_guardian"
)

monitor.run()
```

### LILIS Run History 设计

```python
# Run History Schema
run_history = {
    "timestamp": "2026-05-21T14:30:00Z",
    "resource": "adjust_p4p_bid",
    "status": "success",
    "runtime_ms": 234,
    "caller": "budget_guardian_automation",
    "source_executor": "Function",
    "logs": [
        "Fetching campaign CP-001...",
        "Current bid: $0.50, target: $0.45",
        "Bid adjusted successfully"
    ],
    "trace_id": "trace-abc-123"
}
```

### LILIS 告警通道映射

| Palantir | LILIS等效 |
|---------|----------|
| Foundry 通知 | Desktop Notification / Console Output |
| Email Digest | Daily Summary Email (cron + smtplib) |
| PagerDuty | （可选，需企业开通） |
| Slack | Slack SDK → #ops / #alerts 频道 |
| Webhook | 自定义 HTTP Endpoint → 下游处理 |

## 常见问题

**Q: Monitoring Views 和 Health Checks 的核心区别？**
A: Views 是"广度"监控（跨项目看 Agent 心跳/CPU），Checks 是"深度"校验（单数据集看字段空值/内容异常）。两者非替代关系，推荐组合使用。

**Q: Metrics 的 30 天窗口是否可延长？**
A: 平台指标 30 天固定。如需更长周期分析，通过 Log Export 导出到 Streaming Dataset 自定义存储。

**Q: Run History 和 Metrics 的区别？**
A: Run History 是每次执行的详细记录（谁/何时/多久/成功/失败），Metrics 是聚合统计（总成功/失败计数、P95延迟）。

**Q: LILIS 如何选择告警通道？**
A: 紧急（P4P预算耗尽、产品下架）→ Slack(实时) + Email；中等（数据同步延迟、CTR下降）→ Slack；低（日报摘要）→ Email Digest。

## 相关链接
- [[Observability总览]] — 四支柱全景
- [[Automate与工作流]] — Automate 自动化引擎
- [[Workshop构建深度]] — Workshop Events/Variables
- [[开发者工具链总览]] — Functions Metrics
- [[AIP评估套件深度]] — AIP Evals
- [[主页]]
- [[术语索引]]
