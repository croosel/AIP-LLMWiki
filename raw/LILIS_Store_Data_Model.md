# LILIS 国际站店铺数据模型

> **AIP 范式**: Ontology 数据建模
> **店铺**: [cn1575365235ierx.en.alibaba.com](https://cn1575365235ierx.en.alibaba.com)
> **数据周期**: 2026-05-10 → 2026-05-17
> **数据源**: `diagnoseData.json` + `queryWeekReportAllData.json`

---

## 一、真实数据快照

### 1.1 核心 KPI 仪表盘

| 指标 | 本周 | 上周环比 | vs 同行均值 | 评级 |
|------|------|---------|-----------|------|
| 全店曝光量 | **2,919** | ⬆️ +10.4% | ⬇️ -76.6% (同行 12,500+) | 🔴 严重偏低 |
| 点击量 | **68** | ⬆️ +28.3% | — | 🟡 在追赶 |
| 商机量 | **12** | ⬇️ -20.0% | ⬇️ -75.5% | 🔴 严重偏低 |
| 成交金额 | **$164.40** | — | — | 🟡 小额成交 |
| 店铺 PV | **212** | — | — | 🟡 |
| 点击→商机转化率 | **5.55%** | ⬇️ -36.57% | — | 🟡 有下滑 |
| 5 分钟回复率 | **50.38%** | — | — | 🔴 不达标 |

### 1.2 店铺诊断

| 维度 | 数值 |
|------|------|
| 当前星等级 | **0 星** |
| 预测星等级 | **0 星** |
| 商品力 | 0 分 |
| 营销力 | 0 分 |
| 交易力 | 0 分 |
| 服务力 | 0 分 |
| 全店优品数 | **0 个**（需要优品等级判定） |
| 橱窗优品占比 | **0.00%** |

> ⚠️ 注意：后台显示 23 个“平台优品”，但星等级评定系统中“全店优品数”为 0。说明 23 个产品在平台产品分层中已达到优品，但星等级的商品力积分规则可能需要更多维度达标。

### 1.3 商品结构

| 层级 | 数量 | 占比 | 标准 |
|------|------|------|------|
| 低质品 | 0 | 0% | ✅ 已清退 |
| 普通品 | **127** | 35.9% | 🔴 超 1/3 普通品 |
| 潜力品 | **204** | 57.6% | 🟡 预备役丰富 |
| 平台优品 | **23** | 6.5% | 🔴 远低于 50% 目标 |
| 平台爆品 | **0** | 0% | 🔴 无爆品 |
| **合计** | **354** | 100% | |

### 1.4 流量来源

| 渠道 | UV | 询盘 | 转化率 |
|------|-----|------|--------|
| 搜索 | 35 | 1 | 2.86% |
| 系统推荐 | 17 | 1 | 11.76% |
| 直接访问 | 10 | 1 | 10.00% |
| 店内 | 10 | 1 (反馈) | 10.00% |
| 询盘 | 7 | 2 | 28.57% |
| 会场 | 6 | 0 | 0% |

### 1.5 沟通转化

| 指标 | 数值 |
|------|------|
| 5 分钟回复率 | 50.38% |
| 180 天复购率 | **31.47%** ⭐ |
| 平均回复时间 | 2.13h |

### 1.6 TOP10 曝光产品

| # | 产品 | 曝光 | 询盘率 | 橱窗 | 分析 |
|---|------|------|--------|------|------|
| 1 | Bulk Wholesale High Elastic Spandex Arch Cover | 95 | 0% | ❌ | 拱门套 — 点击率低 |
| 2 | Wholesale Under the Sea Mermaid Theme Birthday | 66 | 0% | ❌ | 美人鱼派对 — 场景化 |
| 3 | LILIS 12PCS 3.6Ft Artificial Wisteria Hanging | 53 | 0% | ❌ | 紫藤花挂 — 潜力品 |
| 4 | **LILIS Handcrafted 20cm Peony Flower Head** | 52 | 0% | ✅ | 牡丹花头 — 橱窗有加成 |
| 5 | **Handmade 7-Fork Artificial Silk Peony Small** | 49 | **12.5%** | ❌ | ⭐ 唯一有询盘率的 TOP10 产品 |
| 6 | Manufacturer Wholesale Metal Balloon Set 50pcs | 48 | 0% | ❌ | 气球套装 |
| 7 | LILIS 2 Pcs 6Ft Pink Artificial Wisteria Vine | 46 | 0% | ❌ | 紫藤藤蔓 |
| 8 | Customize Romantic Purple Backdrop Drapes | 46 | 0% | ❌ | 背景布 |
| 9 | LILIS Hydrangea Heads Silk Artificial Flowers | 45 | 0% | ❌ | 绣球花 |
| 10 | LILIS Handmade PU Mini Tulip Artificial Flower | 45 | 0% | ❌ | 迷你郁金香 |

> 🚨 发现：TOP10 产品中仅 1 个 (Peony Small) 产生了询盘，且该产品 **不在橱窗**。在橱窗的牡丹花头（#4）曝光 52 但询盘率为 0%。说明影响询盘的不是曝光量，而是产品本身的内容质量。

---

## 二、Ontology 数据映射

### 2.1 数据源 → Ontology Object 映射

```
diagnoseData.json                    →  Store (店铺) + Product[] (产品) + Task[] (任务)
queryWeekReportAllData.json          →  全部 10 个模块
├── STORE_DATA_OVERVIEW              →  Store.daily_exposure, .daily_clicks, .daily_inquiries
├── STORE_INFRASTRUCTURE_SITUATION   →  Store.total_products, .premium_product_ratio, .avg_response_rate
├── STORE_DIAGNOSIS                  →  Store.star_rating + 四维能力分
├── PRODUCT_DATA_OVERVIEW            →  Product.product_level (distributed)
├── EXPOSURE_TOP10_PRODUCT_DATA      →  Product.exposure (top 10)
├── BUYER_DISTRIBUTION_DATA          →  Customer.country (aggregated)
├── P4P_PLAN_OPTIMIZ_SUGGESTION      →  P4P_Campaign (暂无数据)
├── FLOW_SOURCE_CHANNEL_ANALYSIS     →  Store.traffic_sources
├── STORE_DETAIL_12_MONTHS           →  Store 时间序列
└── STORE_COMMUNICATION_CONVERSION   →  Customer.repeat_rate, Store.response_rate
```

### 2.2 已填充数据 vs 缺失数据

| Object Type | 已填充字段 | 缺失字段 | 影响 |
|-------------|----------|---------|------|
| **Store** | exposure, clicks, inquiries, revenue, total_products, star_rating, response_rate, response_time | — | 基本完整 |
| **Product** | exposure (TOP10), product_level (distributed) | price, click_rate, inquiry_rate, order_rate per product | 无法做单品级分析 |
| **Customer** | repeat_rate (aggregate) | country, buyer_type, lifetime_value per customer | 无客户画像 |
| **Inquiry** | 无 | 全部 | 无法做询盘分类/转化预测 |
| **Order** | revenue (aggregate) | customer_id, products, delivery_deadline | 无订单级分析 |
| **AfterSales** | 无 | 全部 | 无法监控售后质量 |
| **P4P_Campaign** | 无 | 全部 | 无广告数据 |

### 2.3 数据质量评估

| 字段 | 来源 | 质量 | 备注 |
|------|------|------|------|
| `exposure` | weekDiagnose | ✅ | 近 7 天，可按 scope 过滤 |
| `clicks` | weekDiagnose | ✅ | |
| `inquiries` | weekDiagnose | ✅ | |
| `revenue` | weekDiagnose | ⚠️ | 仅本周 $164.40，近 60 天显示 0（本周刚产生） |
| `product_level` | PRODUCT_DATA_OVERVIEW | ⚠️ | 只有分布，无单品级 |
| `exposure (per product)` | EXPOSURE_TOP10 | ⚠️ | 只有 TOP10 |
| `buyer_country` | BUYER_DISTRIBUTION | ❌ | 暂无数据 |
| `p4p_data` | P4P_PLAN_OPTIMIZ | ❌ | 暂无 P4P 数据 |
| `star_ability` | STORE_DIAGNOSIS | ✅ | 四维 0 分 |

---

## 三、数据模型架构

### 3.1 Entity-Relationship Diagram

```
Store (1) ──── has ──── (N) Product
Store (1) ──── has ──── (N) Inquiry
Store (1) ──── has ──── (N) Order
Store (1) ──── has ──── (N) P4P_Campaign
Store (1) ──── has ──── (N) Customer

Product (1) ──── promoted_by ──── (N) P4P_Campaign
Product (1) ──── referenced_in ──── (N) Inquiry
Product (N) ──── contained_in ──── (N) Order

Customer (1) ──── sends ──── (N) Inquiry
Customer (1) ──── places ──── (N) Order

Order (1) ──── generates ──── (N) AfterSales
```

### 3.2 Store 对象完整 Schema

```json
{
  "store": {
    "id": "cn1575365235ierx",
    "brand": "LILIS",
    "url": "cn1575365235ierx.en.alibaba.com",
    "star_rating": 0,
    "predicted_star": 0,
    "total_products": 354,
    "product_distribution": {
      "low_quality": 0,
      "normal": 127,
      "potential": 204,
      "platform_good": 23,
      "platform_super": 0
    },
    "weekly_metrics": {
      "exposure": 2919,
      "exposure_wow_change_pct": 10.4,
      "exposure_vs_industry_pct": -76.6,
      "clicks": 68,
      "clicks_wow_change_pct": 28.3,
      "business_opportunities": 12,
      "opportunities_wow_change_pct": -20.0,
      "opportunities_vs_industry_pct": -75.5,
      "revenue_usd": 164.40,
      "store_pv": 212,
      "click_to_opportunity_rate": 5.55,
      "click_to_opp_rate_wow_pct": -36.57
    },
    "response_metrics": {
      "avg_response_time_hours": 2.13,
      "five_min_reply_rate_pct": 50.38,
      "buyer_180d_repeat_rate_pct": 31.47
    },
    "ability_scores": {
      "product_score": 0,
      "marketing_score": 0,
      "transaction_score": 0,
      "service_score": 0
    },
    "ability_indicators": {
      "total_premium_products": 0,
      "window_premium_ratio_pct": 0.00,
      "premium_or_hot_ratio_pct": 0.00,
      "overseas_stock_products": 0,
      "marketing_traffic_index": 0.0,
      "opportunity_index": 0,
      "opportunity_conversion_rate_pct": 0.00,
      "60d_onsite_revenue_usd": 0,
      "60d_offsite_revenue_usd": 0
    },
    "traffic_sources": [
      {"channel": "search", "uv": 35, "inquiry_uv": 1, "conversion_rate_pct": 2.86},
      {"channel": "system_recommendation", "uv": 17, "inquiry_uv": 1, "conversion_rate_pct": 11.76},
      {"channel": "direct", "uv": 10, "inquiry_uv": 1, "conversion_rate_pct": 10.00},
      {"channel": "in_store", "uv": 10, "feedback_uv": 1, "conversion_rate_pct": 10.00},
      {"channel": "inquiry", "uv": 7, "inquiry_uv": 2, "conversion_rate_pct": 28.57},
      {"channel": "venue", "uv": 6, "inquiry_uv": 0, "conversion_rate_pct": 0.0}
    ],
    "diagnosis_summary": "商品点击率待提升，完成任务预计增长20%-30%",
    "ma_tasks": [
      {
        "task_id": "287207",
        "title": "打造30个优爆品",
        "current": 23,
        "target": 30,
        "status": "DOING",
        "impact": "商品点击率预估提升20%-30%"
      },
      {
        "task_id": "287205",
        "title": "发布1个市场热卖商品",
        "current": 0,
        "target": 1,
        "status": "DOING",
        "impact": "商品点击率预估提升20%-30%"
      },
      {
        "task_id": "287206",
        "title": "优化3个推荐商品定价",
        "current": 0,
        "target": 3,
        "status": "DOING",
        "sub_tasks": ["1601665063975 → Metal Oval Wedding Arch", "1601651851297 → Hydrangea Decoration", "126pcs Mermaid Tail Balloon Kit"]
      }
    ]
  }
}
```

### 3.3 Product (TOP10) 数据模型

```json
{
  "products": [
    {
      "id": "ARCH_COVER_001",
      "title": "Bulk Wholesale High Elastic Spandex Arch Cover...",
      "exposure": 95,
      "inquiry_rate_pct": 0.0,
      "is_window": false,
      "is_lilis_branded": false,
      "category": "arch_cover"
    },
    {
      "id": "PEONY_SMALL_001",
      "title": "Handmade 7-Fork Artificial Silk Peony Small...",
      "exposure": 49,
      "inquiry_rate_pct": 12.5,
      "is_window": false,
      "is_lilis_branded": false,
      "category": "artificial_flower",
      "priority": "HIGH — 唯一有询盘率的TOP10产品，应立刻加橱窗并优化定价"
    },
    {
      "id": "PEONY_20CM_001",
      "title": "LILIS Handcrafted 20cm Peony Flower Head...",
      "exposure": 52,
      "inquiry_rate_pct": 0.0,
      "is_window": true,
      "is_lilis_branded": true,
      "category": "artificial_flower"
    }
  ]
}
```

---

## 四、数据驱动的诊断与预测

### 4.1 根本原因分析

```
问题: 曝光 2,919（vs 同行均值 12,500+）
       ↓
      曝光不足的原因？
       ↓
  ┌────┴────┐
  │         │
关键词覆盖不足  产品等级低
  │         │
  ├→ 354个产品但仅23个优品    ← 优品占比 6.5%，自然流量近乎为零
  ├→ 橱窗优品占比 0%          ← 橱窗位无优品，无排名加成
  ├→ P4P 未投放               ← 无付费流量补充
  └→ 零爆品                   ← 无权重最大的爆品
       ↓
  点击量 68
       ↓
      点击→商机转化率 5.55%（下降 36%）
       ↓
  什么导致转化下降？
  ├→ 主图点击率低（曝光高但点击低的产品多）
  ├→ TOP10 产品中 9/10 询盘率为 0%
  ├→ 详情页转化不够
  └→ 5 分钟回复率仅 50% — 商机未及时跟进流失
```

### 4.2 场景模拟：如果完成 MA 任务

**假设模型**: 完成「打造 30 个优爆品」+「发布 1 个热卖品」+「优化 3 个产品定价」

| 指标 | 当前 | 预测 (30 天后) | 变化 | 依据 |
|------|------|--------------|------|------|
| 曝光量 | 2,919 | 4,000-4,500 | ⬆️ 37-54% | 优品占比提高 → 自然流量加权 |
| 点击量 | 68 | 95-120 | ⬆️ 40-76% | 平台预测 20-30%，优品+橱窗叠加 20% |
| 商机量 | 12 | 18-22 | ⬆️ 50-83% | 点击量↑ + 优化详情页 |
| 优品数 | 23 | 28+ | ⬆️ 22% | 直接完成目标 |
| 曝光 TOP1 产品 | 95 | 130-160 | ⬆️ 37-68% | 橱窗加成 |
| P4P 投放后 (若启动 $20/天) | — | +500-800 曝光/天 | 新增 | 行业平均 CPC $0.30-0.50 |

### 4.3 复购率 31.47% 的深层意义

LILIS 的 180 天复购率 31.47% 对 0 星店铺来说 **异常高**。这意味着:
- 产品本身受买家认可
- 但新客获取能力严重不足（曝光远低于同行）
- **策略**: 先扩曝光拉新客，用高复购率留存

---

## 五、数据建模行动方案

### 5.1 立即建模 (本周)

| 模型 | 输入 | 输出 | 价值 |
|------|------|------|------|
| **曝光预测模型** | 产品等级分布 + 橱窗数量 + P4P 预算 | 30 天曝光预测 | 指导 P4P 预算决策 |
| **优品晋级预测** | 普通品列表 + SOP 规则匹配 | 哪些普通品最容易晋级优品 | 高效打造优品 |
| **TOP10 → TOP100 扩展** | TOP10 曝光 + 品类分布 | Top 100 产品曝光估算 | 发现隐藏的高潜力产品 |

### 5.2 数据采集缺口补齐 (2 周内)

| 缺失数据 | 采集方式 | AIP 用途 |
|---------|---------|---------|
| 单品级详细数据 | 产品参谋导出 CSV → 上传 | Product 对象完整填充 |
| 询盘具体内容 | 后台导出 → 手动标注 30 条 | ClassifyInquiryIntent 训练 |
| P4P 数据 | 启动 P4P → 1 周后拉取 | P4PBidSuggest 建模 |
| 买家分布 | 等数据积累 | Customer 对象建模 |

### 5.3 数据管道架构

```
每周日 cron 任务
    │
    ├─ alibaba-store-analysis → 拉取周报 JSON
    │
    ├─ 数据清洗脚本:
    │   ├─ 解析 JSON → Store / Product[] / Task[]
    │   ├─ 计算衍生指标 (CTR / CVR / 优品占比 / 橱窗占比)
    │   └─ 写入 Ontology DB
    │
    ├─ AIP Logic Functions 运行:
    │   ├─ StoreHealthScore()      → 店铺评分 + 预警
    │   ├─ ListingQualityAuditor() → 产品诊断
    │   └─ SeasonalDemandForecast()→ 季节性预测
    │
    └─ 输出: 周度仪表盘 + 行动建议
```

---

> **核心数据结论**: LILIS 拥有 **354 个产品 + 31.47% 复购率** 的优秀基础，但 **曝光仅为同行 23%** + **优品占比 6.5%** + **0 星** 说明产品上线后的运营深度严重不足。当前最紧急的动作是：打造 30 个优品 + 将已有 23 个优品入橱窗 + 启动 P4P 品牌词计划，即可在 30 天内将曝光提升 40-70%。
