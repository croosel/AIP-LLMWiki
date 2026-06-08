---
tags:
  - Palantir
  - AIP
  - 架构
  - 运营框架
  - Sense-Reason-Act
created: 2026-05-20
source: "[[AIP_Ontology_Alibaba_Blueprint]]"
---

# Sense → Reason → Act 架构

## 定义

**Sense → Reason → Act** 是 Palantir AIP 的核心运营范式，将 AI 驱动的运营流程分为三个层次：感知层采集数据，推理层分析决策，行动层执行操作。这一范式源自 Palantir 的军事/情报背景，被适配到商业运营场景。

在外贸场景中，该架构实现从「Alibaba 国际站数据拉取」到「AI 诊断」再到「自动执行优化动作」的完整闭环。

## 核心属性

### 三层架构

```
SENSE (感知层)
├─ Alibaba 店铺         ← 产品/询盘/订单/售后
├─ Google Trends        ← 季节性关键词趋势
├─ Pinterest/Instagram  ← 婚礼潮流趋势
└─ Amazon (未来)        ← 婚庆品类竞品价格监控
     ↓
REASON (推理层)
├─ ClassifyInquiryIntent      ← 询盘分类+活动提取
├─ CrossSellBundleGenerator   ← 搭配推荐
├─ SeasonalDemandForecast     ← 季节性预测
├─ ListingQualityAuditor      ← 列表诊断
└─ StoreHealthScore           ← 店铺评分
     ↓
ACT (行动层)
├─ 高紧急度询盘 → 24h 内人工优先跟进
├─ 搭配套餐 → 自动推荐，提高客单价
├─ 旺季前 8 周 → 备货提醒 + P4P 加预算
├─ 低质产品 → 自动诊断清单
└─ 月度健康报告 → 仪表盘推送
```

### 各层定位

| 层 | 职能 | 输入 | 输出 | 工具 |
|----|------|------|------|------|
| **SENSE** | 数据采集 | API / 爬虫 | [[Ontology]] 数据 | Alibaba CRM API、浏览器会话 |
| **REASON** | 分析决策 | Ontology 数据 | 诊断/预测/建议 | [[AIP-Logic|Logic Functions]]、[[AIP-Evals]] |
| **ACT** | 执行操作 | AI 建议 | 运营动作 | Actions、[[P4P投流策略|P4P]]、人工审批 |

## 业务用途

- 实现运营自动化闭环，减少人工决策环节
- 将分散的业务数据统一到 Ontology 进行集中分析
- 通过分阶段执行（P0 → P1 → P2）管控风险

## 外贸应用

> 参见 [[AIP_Alibaba_Integration]]、[[LILIS-婚庆派对用品]]

### 分期执行方案 (LILIS 案例)

| 阶段 | 时间 | 动作 | AIP 驱动 |
|------|------|------|---------|
| **P0** | 当天 | 23 优品入橱窗、P4P $20/天启动 | StoreHealthScore Alert |
| **P1** | 本周 | 加品牌前缀、场景化主图、回复率提升 | ListingQualityAuditor |
| **P2** | 30 天 | 7 普通品晋级优品、TOP5 详情页优化 | 持续监控 |

### 预期效果

| 指标 | 执行前 | 执行后 (P0) | 变化 |
|------|--------|-----------|------|
| 周曝光 | 2,901 | 4,500 | +55% |
| 周点击 | 63 | 120 | +90% |
| 周询盘 | 13 | 20 | +54% |
| 橱窗优品占比 | 0% | 100% | P0 达成 |

## 常见问题

**Q: 为什么要分 P0/P1/P2 三个阶段？**
A: P0 是最低风险、最高回报的操作（如橱窗操作），可立即执行。P1/P2 涉及价格调整、详情页修改等需要验证的优化，需逐步推进。

**Q: REASON 层能否完全自动化？**
A: 建议 StoreHealthScore 和 ListingQualityAuditor 自动运行，但价格调整、P4P 预算修改等高风险操作必须人工确认（参见 [[AIP-伦理与治理]]）。

## 相关链接

- [[AIP-Logic]] — REASON 层的 Logic Functions
- [[Ontology]] — SENSE 层的数据模型
- [[AIP-Evals]] — REASON 层的质量闸门
- [[P4P投流策略]] — ACT 层的投流操作
- [[AIP-伦理与治理]] — 人机协同检查点
- [[AI-FDE完整架构]]
- [[AIP-Beacon-产品命名与品牌定位]]
- [[AIP总览]]
- [[AIP神经符号架构]]
- [[AIP跨境运营中枢-商业系统架构]]
- [[AIP跨境运营方法论-四阶段实施]]
- [[Agent并行架构]]
- [[LILIS数据模型v2]]
- [[LILIS跨平台预测分析]]
- [[三阶段升级路径-Sense-Reason-Act]]
- [[主页]]
- [[态势感知系统-OODA循环与经验积累]]
- [[术语索引]]
- [[生态系消长-AI搜索时代的竞争力转移]]
- [[询盘]]
- [[运营数据分析SOP]]
