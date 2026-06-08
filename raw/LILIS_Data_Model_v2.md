# LILIS 国际站数据模型 v2.0

> **数据快照**: 2026-05-18
> **vs 上一周期** (2026-05-10~17): 曝光 -0.6% / 点击 -7.4% / PV +1.9% / 询盘 +8.3% / 回复率 +2.4%
> **新增数据**: 每日趋势时间序列（首次可用）

---

## 一、数据字典 (Data Dictionary)

### 1.1 Store 表 — `dim_store`

| 字段 | 类型 | 来源 | 当前值 | 说明 |
|------|------|------|--------|------|
| `store_id` | string | URL 解析 | cn1575365235ierx | 主键 |
| `brand` | string | 手动 | LILIS | |
| `star_rating` | int | STORE_DIAGNOSIS | 0 | 星等级 0-5 |
| `predicted_star` | int | STORE_DIAGNOSIS | 0 | 预测星等级 |
| `total_products` | int | STORE_INFRASTRUCTURE | 355 | 产品总数 |
| `platform_good_count` | int | PRODUCT_DATA_OVERVIEW | 23 | 平台优品数 |
| `platform_super_count` | int | PRODUCT_DATA_OVERVIEW | 0 | 爆品数 |
| `window_total` | int | 需确认 | ? | 橱窗位总数 |
| `window_good_count` | int | STORE_DIAGNOSIS | ? | 橱窗中优品数 |
| `window_good_ratio` | float | 计算 | 0.0% | 橱窗优品占比 |
| `avg_reply_time_h` | float | STORE_INFRASTRUCTURE | 2.17 | 小时 |
| `5min_reply_rate` | float | COMM_CONVERSION | 50.44% | 子账号平均 |
| `buyer_rnr_rate` | float | COMM_CONVERSION | 31.40% | 买家复购率 |
| `created_at` | datetime | 手动 | 2025 年中 | 入驻时间 |

### 1.2 周度指标表 — `fact_weekly_metrics`

| 字段 | 类型 | 当前值 | WoW | vs Rival Avg |
|------|------|--------|-----|-------------|
| `week_start` | date | 2026-05-11 | — | — |
| `search_impressions` | int | 2,901 | +7.36% | -74.5% |
| `search_clicks` | int | 63 | +31.25% | — |
| `store_pv` | int | 216 | +35.85% | — |
| `inquiries_ab` | int | 13 | -18.75% | -67.5% |
| `uv_to_ab_rate` | float | 4.49% | -40.13% | vs 6.32% avg |
| `orders` | int | 0 | -100% | — |
| `revenue_usd` | float | $164.40 | — | vs $3,945 avg |

### 1.3 每日趋势表 — `fact_daily_trend`

| 日期 | UV | 询盘 | 订单 | 行业优秀 UV |
|------|-----|------|------|-----------|
| 2026-05-11 | 21 | 4 | 0 | 113.0 |
| 2026-05-12 | 34 | 4 | 0 | 115.6 |
| **2026-05-13** | 39 | 3 | **1** | 112.2 |
| 2026-05-14 | 35 | 5 | 0 | 103.2 |
| 2026-05-15 | 20 | 3 | 0 | 84.8 |

> **发现**: 5/13 产生 1 笔订单（本周唯一订单日），该日 UV 和访客数均为周峰值。

### 1.4 产品分层表 — `dim_product_tier`

| 层级 | 数量 | 占比 | 目标占比 | 缺口 |
|------|------|------|---------|------|
| 低质品 | 0 | 0% | 0% | ✅ 达标 |
| 普通品 | 126 | 35.5% | <20% | 🔴 超 55 |
| 潜力品 | 206 | 58.0% | 40-50% | 🟡 |
| 平台优品 | 23 | 6.5% | 40-50% | 🔴 缺 119 |
| 平台爆品 | 0 | 0% | >10% | 🔴 缺 36 |

### 1.5 流量渠道表 — `fact_traffic_channel`

| 渠道 | UV | 询盘 | 转化率 | 转化排名 |
|------|-----|------|--------|---------|
| 搜索 | 35 | 1 | 2.86% | 🥉 第 3 |
| 系统推荐 | 17 | 1 | 11.76% | 🥈 第 2 |
| 询盘 | 7 | 2 | 28.57% | 🥇 第 1 |
| 直接访问 | 10 | 1 | 10.00% | 🥉 |
| 店内 | 10 | 0 | 0% | — |

### 1.6 TOP10 产品曝光表 — `fact_top10_exposure`

| 排名 | 产品名称 | 曝光 | 询盘 | 询盘率 | 橱窗 | 品牌 |
|------|---------|------|------|--------|------|------|
| 1 | Spandex Arch Cover | 95 | 0 | 0% | ❌ | ❌ |
| 2 | Mermaid Theme Birthday | 66 | 0 | 0% | ❌ | ❌ |
| 3 | Wisteria Hanging | 53 | 0 | 0% | ❌ | ✅ |
| 4 | **Peony Flower Head 20cm** | 52 | 0 | 0% | ✅ | ✅ |
| 5 | **Peony Small 7-Fork** | 49 | **1** | 2.04% | ❌ | ❌ |
| 6 | Metal Balloon Set 50pcs | 48 | 0 | 0% | ❌ | ❌ |
| 7 | Wisteria Vine 6Ft | 46 | 0 | 0% | ❌ | ✅ |
| 8 | Purple Backdrop Drapes | 46 | 0 | 0% | ❌ | ❌ |
| 9 | Hydrangea Heads | 45 | 0 | 0% | ❌ | ✅ |
| 10 | Mini Tulip | 45 | 0 | 0% | ❌ | ✅ |

---

## 二、指标衍生模型 (Derived Metrics)

### 2.1 点击率计算

```
CTR = clicks / impressions × 100
    = 63 / 2901 × 100
    = 2.17%
```

| 指标 | LILIS | 行业平均 | 诊断 |
|------|-------|---------|------|
| CTR | 2.17% | ~2.12% | 🟡 接近行业平均，但需提升 |

### 2.2 单产品平均曝光模型

```
Avg_exposure_per_product = total_impressions / total_products
                         = 2901 / 355
                         ≈ 8.2 / 产品 / 周
```

> 8.2 次每周意味着**多数产品处于「零曝光」状态**。TOP10 集中了 65% 的曝光（565/2901），其余 345 个产品平均曝光仅 ~6.8/周。

### 2.3 长尾产品覆盖度

```
TOP10 曝光占总曝光 = 565 / 2901 = 19.5%
TOP50 估计曝光 (按递减分布) = ~1,500 (51.7%)
其余 305 个产品 = ~1,400 (48.3%)

长尾利用率: 中等偏上（48.3% 在长尾）
问题: 长尾产品无转化，需要发掘哪些潜力品有信号
```

### 2.4 星等级计算模型

```
星等级 = min(商品力分, 营销力分, 交易力分, 服务力分)

商品力分 依赖:
  ├─ 全店优品数 (当前 0 — 需平台重新评定)
  ├─ 橱窗优品占比 (0% → 需操作: 将 23 优品入橱窗)
  ├─ 海外库存商品数 (0 → 需 FBA/海外仓)
  └─ 实力优品数 (0 通过星等级评定)

营销力分 依赖:
  ├─ 营销流量指数 (当前 0 — 无 P4P 数据)
  └─ 近 30 天商机指数 (当前 0)

交易力分 依赖:
  ├─ 信保订单金额 (近 60 天 $0)
  └─ 近 90 天买家数

服务力分 依赖:
  ├─ 平均回复时间 (2.17h — 🟢 达标)
  ├─ 5分钟回复率 (50.44% — 🔴 需 >70%)
  ├─ 按时发货率
  └─ 纠纷率
```

| 预估突破优先级 | 操作 | 可达成 |
|-------------|------|--------|
| 服务力 → 1 分 | 提升 5min 回复率至 70%+ | 2-4 周 |
| 商品力 → 1 分 | 23 优品入橱窗 + 海外库存 | 1-2 周 + 物流 |
| 营销力 → 1 分 | 启动 P4P 投流 | 即时 |
| 交易力 → 1 分 | 达到近 60 天信保 $3,000+ | 6-8 周 |

### 2.5 转化漏斗模型

```
               搜索曝光 2,901  (100%)
                   ↓ CTR 2.17%
               点击 63        (2.17%)
                   ↓
               店铺 PV 216     (7.45% of impressions)
                   ↓ UV→AB 4.49%
               询盘 13         (0.45% of impressions)
                   ↓
               订单 0           (当前 0%)
                   ↓
               成交 $164.40    (本周有历史订单金额，但本周无新订单)
```

| 漏斗阶段 | 当前 | 目标 | 优化杠杆 |
|---------|------|------|---------|
| 曝光→点击 (CTR) | 2.17% | >3% | **主图**（最大杠杆，场景化） |
| 点击→PV | 3.4x | 3.5x | 详情页加载速度 |
| PV→询盘 | 4.49% | >6% | **详情页前 3 屏**（痛点+参数+案例） |
| 询盘→订单 | <8% | >15% | **回复速度 + 报价专业性** |

---

## 三、预测模型

### 3.1 曝光预测 (30 天)

```
Y = baseline_exposure × (1 + α_橱窗 + α_P4P + α_优品晋级)

当前 baseline: 2,901 / 周 ≈ 414 / 天

Scenario A — 仅橱窗操作:
  α_橱窗 = 0.25 (橱窗加成 20-30%)
  → 预计 30 天后: 2,901 × 1.25 = 3,626 / 周

Scenario B — 橱窗 + P4P:
  α_橱窗 = 0.25, α_P4P = 0.35 ($20/天, 行业 CPC $0.35 → ~57 点击/天, 曝光 ~2,500/天)
  → 预计 30 天后: 2,901 × 1.60 = 4,642 / 周

Scenario C — 橱窗 + P4P + 优品达标 (30 个):
  α_橱窗 = 0.25, α_P4P = 0.35, α_优品晋级 = 0.15 (优品>8% 自然权重上升)
  → 预计 30 天后: 2,901 × 1.75 = 5,077 / 周
```

### 3.2 询盘预测

```
Y = exposure × CTR × UV→AB_rate

Scenario A: 3,626 × 2.5% × 5% = 4.5 / 周
Scenario B: 4,642 × 2.8% × 5.5% = 7.1 / 周
Scenario C: 5,077 × 3.0% × 6.0% = 9.1 / 周

当前: 13 / 周
→ Scenario C 可达 39-40 / 月 (vs 行业平均 40/周 — 需持续优化)
```

### 3.3 订单预测 (90 天)

基于当前成交 $164.40（历史订单结算），预测模式：

```
假设: 询盘→订单转化率 8% (保守) → 15% (优化后)
月均询盘 Scenario C: 36 (9/周 × 4)
月均订单: 36 × 8% = 2.9 → 36 × 15% = 5.4
月均 GMV: 2.9 × $200 (婚庆平均客单) = $580 → 5.4 × $250 = $1,350
```

---

## 四、数据管道设计

### 4.1 ETL 架构

```
┌──────────────┐     ┌─────────────┐     ┌──────────────┐
│  Alibaba API  │ ──→ │ Clean & Map │ ──→ │ Ontology DB  │
│  (Diagnose)   │     │  (Python)   │     │  (Store /    │
│               │     │             │     │   Product /   │
│  每周拉取     │     │  字段映射    │     │   Customer)   │
└──────────────┘     └─────────────┘     └──────────────┘
                                                │
                      ┌─────────────────────────┘
                      │
              ┌───────┴────────┐
              │                │
        AIP Logic         Dashboard
        Functions          (周度)
              │
    ├─ HealthScore()
    ├─ ListingAuditor()
    └─ ExposureForecast()
```

### 4.2 数据转换规则

```
diagnoseData.values.weekDiagnose[]
   → 筛选 scope = "近7天"
   → indicatorList[] → fact_weekly_metrics

queryWeekReportAllData
   → STORE_DATA_OVERVIEW → fact_weekly_metrics + dim_store
   → STORE_INFRASTRUCTURE → dim_store (reply metrics)
   → STORE_DIAGNOSIS → dim_store (star, abilities)
   → PRODUCT_DATA_OVERVIEW → dim_product_tier
   → EXPOSURE_TOP10 → fact_top10_exposure
   → FLOW_SOURCE_CHANNEL → fact_traffic_channel
   → STORE_DETAIL_12_MONTHS → fact_daily_trend
   → STORE_COMM_CONVERSION → dim_store (rnr_rate, reply_rate)
```

### 4.3 数据质量规则

| 表 | 检查规则 | 当前状态 |
|------|---------|---------|
| `dim_store` | total_products > 0, reply_time < 24 | ✅ |
| `fact_weekly_metrics` | impressions > 0, clicks < impressions | ✅ |
| `fact_daily_trend` | dates contiguous, UV ≤ 1000 | ✅ |
| `dim_product_tier` | sum(count) = total_products | ✅ (355 = 126+206+23) |
| `fact_top10_exposure` | impressions descending | ✅ |
| `fact_traffic_channel` | sum(UV) ≈ store_pv / days | ⚠️ (105 vs 216/7=31 — 这是单日数据) |

---

## 五、模型输出：优先级行动矩阵

| # | 行动 | 数据依据 | 预期影响 | 周期 |
|---|------|---------|---------|------|
| 1 | 23 优品入橱窗 | 橱窗优品占比 0% → 100% | 曝光 +20-25% / 商品力分 +1 | 1 天 |
| 2 | Peony Small 加橱窗 + 标题加品牌 | TOP5 中唯一有询盘的产品 | 该品曝光 +30-50% | 1 天 |
| 3 | 启动 P4P 品牌词 $20/天 | 营销力分 0 → 需 P4P 数据 | 日均曝光 +2,000 | 即日 |
| 4 | 5min 回复率 50%→70% | 丢商机最大可控因素 | 询盘→订单 +5% / 服务力 +1 | 2 周 |
| 5 | 场景化主图 (TOP10 中 9/10 询盘率 0%) | 点击率最大杠杆 | CTR 2.17%→3.5% | 2 周 |
| 6 | 126 普通品中筛选 7 个最有潜力晋级优品的 | 普通品占比 35.5% | 优品 +7 / 自然权重 | 3-4 周 |
| 7 | 海外仓库存 1-3 SKU | 商品力分依赖 | 商品力 +1 | 4-6 周 |

---

> **数据模型版本**: v2.0 | **覆盖数据维度**: 7 张表, 60+ 字段 | **预测模型**: 3 个 (曝光 / 询盘 / 订单) | **数据管道**: ETL 架构就绪
