---
tags:
  - P4P
  - Alibaba国际站
  - 投流
  - 广告优化
  - LILIS
created: 2026-05-20
source: "[[AIP_Ontology_Alibaba_Blueprint]]"
---

# P4P 投流策略

## 定义

**P4P (Pay for Performance)** 是 Alibaba 国际站的按效果付费广告系统。卖家为关键词出价，按点击付费（CPC），目标是通过付费流量补充自然流量，提升产品曝光、点击和询盘。

在 Palantir AIP 架构中，P4P 投流策略由 [[AIP-Logic|Logic Functions]] 驱动，根据季节性预测和店铺健康度自动建议出价调整。

## 核心属性

### 关键词架构（六类）

| 词类 | 示例 | 匹配策略 | 优先级 |
|------|------|---------|--------|
| **品牌词** | "LILIS artificial flower", "LILIS wedding decor" | 精确匹配 | ⭐ 最高 |
| **品类词** | "artificial flower wholesale", "wedding arch stand" | 精确+广泛混合 | 核心计划 |
| **场景词** | "wedding centerpiece bulk", "birthday balloon arch kit" | 广泛匹配 | 测款计划 |
| **长尾词** | "real touch silk peony flower wholesale" | 精确匹配 | 分组管理 |
| **竞品词** | 同行品牌/店铺词 | 定向攻击 | 谨慎使用 |
| **季节词** | "Christmas balloon set wholesale" | 提前 6 周启动 | 季节性计划 |

### 算法调整节奏（科学化三级体系）

| 层级 | 频率 | 动作 | 验证窗口 |
|------|------|------|---------|
| **Micro-tuning (微调)** | 每 3 天 | 屏蔽 $\leq 2$ 星的无效词，调整出价 ±15% | 3 天 |
| **Tactical Review (战术回顾)** | 每 7 天 | 对比 CPC、CTR、询盘转化率，决定关键词去留 | 7 天 |
| **Strategic Overhaul (战略调整)** | 每 30 天 | 重设日预算、重构分组架构、评估 ROI | 30 天 |

### 分品类策略

| 品类 | 旺季 | P4P 预算增幅 | 核心计划 |
|------|------|------------|---------|
| 人造花 (Artificial Flower) | 5-10 月 | +40% | 品牌词 + 品类词 |
| 拱门支架 (Arch Stand) | 5-10 月 | +40% | 场景词 + 搭配词 |
| 布艺装饰 (Textile) | 5-10 月 | +30% | 品类词 |
| 气球 (Balloon) | 11-12 月 | +50% | 季节词 + 活动词 |
| 灯光霓虹 (LED/Neon) | 全年 | +20% | 品牌词 + 场景词 |

### NA 时区优化

- 北美买家活跃时段：PST 9:00-17:00（对应北京时间次日 0:00-8:00）
- 建议 P4P 预算在该时段倾斜 60%+

## 业务用途

- 补充自然流量不足（LILIS 自然曝光仅 23.4% of 同行）
- 快速测试新品市场反应
- 季节性产品提前预热

## 外贸应用

> 参见 [[AIP_Alibaba_Integration]]

### AIP 驱动的 P4P 优化

| 触发条件 | AIP 动作 | 预期效果 |
|---------|---------|---------|
| StoreHealthScore 流量力 < 10 分 | P4P 日预算从 0→$20/天 | 日均曝光 +1,800 |
| SeasonalDemandForecast 旺季预警 | P4P 预算 +30% | 旺季曝光翻倍 |
| ListingQualityAuditor 发现信号产品 | 单品 P4P 单开计划 | 聚焦资源 |
| 点击→询盘转化率 < 1% | 调整出价，聚焦高意向词 | CPA 降低 |

### 关键词分类规则

| 类目词 (Category Word) | 品牌词 (Brand Word) |
|------------------------|-------------------|
| 无商标/品牌属性的通用产品词 | 包含注册商标或品牌名称 |
| 避免使用"品牌+词"组合出价 | 品牌词出价可高于类目词 50-100% |
| 适合广泛匹配 | 只适合精确匹配 |
| 例: "artificial flower" | 例: "LILIS artificial flower" |

## 常见问题

**Q: 为什么 LILIS 需要 P4P？**
A: 优品占比仅 6.5%，橱窗优品占比 0%，星等级为 0。自然流量被压制在同行 1/4，必须靠 P4P 补充。

**Q: P4P 预算如何设置？**
A: 起步建议 $20/天（核心计划），旺季加至 $25-30/天。必须设每日硬上限防止意外超支。

**Q: 品牌词和品类词可以混投吗？**
A: 不建议。品牌词需要精确匹配以保护品牌认知，品类词可用广泛匹配扩大覆盖面。

## 相关链接

- [[Sense-Reason-Act架构]] — P4P 在 ACT 层的位置
- [[AIP-Logic]] — SeasonalDemandForecast 驱动 P4P 预算调整
- [[LILIS-婚庆派对用品]] — LILIS 店铺上下文
- [[Ontology]] — P4P_Campaign 数据模型
- [[AIP-Observability]]
- [[AIP总览]]
- [[LILIS-AIP方法论-中小卖家AI增效实战手册]]
- [[LILIS每日清单]]
- [[LILIS跨平台预测分析]]
- [[P4P投流完整方法论]]
- [[PAP实验A-B测试结果]]
- [[Prompt_Augmentation_Pipeline]]
- [[主页]]
- [[人造花]]
- [[动力层与写回]]
- [[新品工作流效率模型]]
