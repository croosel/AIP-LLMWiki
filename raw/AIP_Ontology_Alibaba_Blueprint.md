# AIP Ontology 业务映射蓝图 — LILIS 婚庆派对用品 (国际站)

> **框架**: Palantir AIP "Sense → Reason → Act" 范式
> **店铺**: [cn1575365235ierx.en.alibaba.com](https://cn1575365235ierx.en.alibaba.com)
> **品牌**: LILIS — Wedding / Party / Event Decoration Supplies
> **核心品类**: 人造花 | 气球装饰 | 纺织品 | 灯光霓虹 | 背景板 | 拱门支架
> **数据源**: 国际站后台 + 产品线 23 页 + 行业趋势报告
> **当前状态**: 1 年店，响应率 96.06%，人工花核心品类，低 MOQ 模式

---

## 目录

1. [店铺诊断](#1-店铺诊断)
2. [Ontology 映射](#2-ontology-映射)
3. [Logic Functions 设计](#3-logic-functions-设计)
4. [AIP Evals 评估体系](#4-aip-evals-评估体系)
5. [伦理治理检查清单](#5-伦理治理检查清单)
6. [可观测性架构](#6-可观测性架构)
7. [跨平台预测分析路线图](#7-跨平台预测分析路线图)
8. [P4P 投流策略 (婚庆派对定制版)](#8-p4p-投流策略)

---

## 1. 店铺诊断

### 1.1 五维支柱评估

| 支柱 | 评分 | 现状 | 差距与行动 |
|------|------|------|----------|
| **无缝集成** | 🟡 中 | 23 页产品可调用 API，有一定销售数据 | 需统一 Ontology 数据模型 |
| **安全与治理** | 🟢 良好 | 平台自有合规框架 | 需增加 AI 建议审批流程 |
| **模型管理** | 🔴 低 | 无 AI 决策链路 | 需构建 Logic Functions |
| **可扩展性** | 🟡 中 | 单店运营，但品类高度标准化 | 易扩展至 Amazon/Shopify 婚庆类目 |
| **可解释性** | 🔴 低 | 决策依赖人工经验 | 需建立决策追踪 |

### 1.2 店铺快照

| 指标 | 数值 | 评估 |
|------|------|------|
| 开店时长 | 1 年 | 🟡 起步 |
| 响应率 | 96.06% | 🟢 优秀 |
| 响应时间 | ≤3h | 🟢 良好 |
| 品类丰富度 | 8+ 子类（人造花/气球/灯光/布艺/支架/背板） | 🟢 丰满 |
| 价格带宽 | $0.30 - $52.39 | 🟢 有梯次 |
| MOQ 策略 | 1-5 件起步 | 🟢 B2B 友好 |
| 主营品类 | Artificial Flower, Artificial Flower Wall | 🟢 有聚焦 |
| 品牌标识 | LILIS（全产品线统一品牌）| 🟢 品牌化启动 |

### 1.3 行业特性

- **买家画像**: 婚礼策划师 / 派对装饰公司 / 酒店宴会部 / 花店批发商 / 活动租赁公司
- **核心市场**: 英语国家（US/UK/AU）+ 欧洲（DE/FR/IT/ES）+ 东南亚
- **季节性**: 明显（5-10 月婚礼旺季；节日气球 12 月-2 月高峰）
- **趋势**: 人造花技术提升（real touch）、LED 氛围灯、可定制气球印刷、模块化快速搭建系统
- **竞争**: 义乌人造花供应商密集，差异化靠 品牌 LILIS + 组合方案

---

## 2. Ontology 映射

### 2.1 映射画布

```
Palantir AIP 概念           →  LILIS 婚庆派对业务对应
══════════════════════════════════════════════════════════
Object Type                →  产品 / 订单 / 客户 / 活动方案
Property                   →  国际站字段（尺寸/颜色/材质/用途）
Link                       →  品类关联（人造花→拱门→灯光 搭配链）
Action                     →  上架/组套餐/报价/发货
Function (Logic)           →  搭配推荐/季节性预测/询盘分类
Evaluation Suite           →  品类 KPI / 客户复购率 / 转化漏斗
Workflow Lineage           →  操作审计（谁创建了套餐，谁调了价）
```

### 2.2 Object Types

#### OT-01: Product（产品）

| Property | Type | Source | 示例 (LILIS) |
|----------|------|--------|-------------|
| `id` | string | 国际站 Product ID | "P-LED-001" |
| `title` | string | 后台标题 | "LILIS Alphabet LED Marquee Sign Wedding Party Decor" |
| `brand` | string | 品牌 | "LILIS" |
| `category` | string | 一级类目 | "Artificial Flower" |
| `subcategory` | string | 二级类目 | "Peony" / "Balloon Set" / "LED Sign" |
| `price` | float | 页面价 | 0.35 |
| `price_range` | float[] | 价格区间 | [0.35, 0.36] |
| `moq` | integer | 最小起订量 | 2 |
| `material` | string | 材质 | "Silk" / "Latex" / "Metal" / "Polyester" |
| `color_options` | string[] | 颜色 | ["White", "Pink", "Red"] |
| `size_options` | string[] | 尺寸 | ["20cm", "7-Fork"] |
| `use_case` | string[] | 用途 | ["Wedding", "Party", "Home Decor", "Garden"] |
| `season` | string[] | 旺季 | ["Spring", "Summer", "Christmas"] |
| `customizable` | boolean | 是否可定制 | true |
| `sales_volume` | integer | 累计销量 | 18 |
| `product_level` | enum | 等级 | 普通品 / 潜力优品 / 优品 / 爆品 |
| `image_count` | integer | 主图+辅图数 | 6 |
| `has_video` | boolean | 有无视频 | false |
| `competitor_price_range` | float[] | 同行价格区间 | [0.25, 0.50] |

#### OT-02: ProductBundle（产品套餐 — 婚庆行业独有）

| Property | Type | Source | 示例 |
|----------|------|--------|------|
| `id` | string | 套餐 ID | "BUN-001" |
| `name` | string | 套餐名 | "Complete Wedding Arch Decor Kit" |
| `products` | object[] | 包含的产品 | [{product_id, qty}] |
| `theme` | string | 主题 | "Romantic Rose" / "Forest Green" / "Modern White" |
| `total_price` | float | 套餐总价 | 89.99 |
| `target_event` | string | 适用活动 | "Wedding Ceremony" / "Birthday Party" |
| `estimated_setup_time` | string | 搭建时间 | "30 min" |

#### OT-03: Inquiry（询盘）

| Property | Type | Source | 示例 |
|----------|------|--------|------|
| `id` | string | TM/询盘 ID | "INQ-001" |
| `source` | enum | 来源 | RFQ / TM / 商品详情页 / 推荐 |
| `customer_id` | string | 买家 ID | → Customer |
| `product_refs` | string[] | 询盘产品 | ["P-LED-001", "P-FLW-045"] |
| `content` | text | 询盘原文 | "Hi, I'm a wedding planner in LA..." |
| `language` | string | 语言 | "en" |
| `event_type` | string | 活动类型（AI 提取）| "Wedding" |
| `event_date` | date | 活动日期（AI 提取）| "2026-09-15" |
| `urgency_score` | float | 意向度 | 0.85 |
| `project_scale` | string | 项目规模 | "200 guests" |
| `category` | enum | AI 分类 | bulk_order / sample_request / custom_design / price_inquiry / spam |
| `responded` | boolean | 是否已回 | false |
| `response_time_hours` | float | 响应时长 | — |
| `converted_to_order` | boolean | 成交 | false |

#### OT-04: Order（订单）

| Property | Type | Source | 示例 |
|----------|------|--------|------|
| `id` | string | 信保订单 ID | "ORD-001" |
| `customer_id` | string | 买家 | → Customer |
| `items` | object[] | 订单明细 | [{product_id, qty, unit_price, customization}] |
| `total_value` | float | 总金额 | 2350.00 |
| `payment_status` | enum | 支付状态 | paid / pending |
| `shipping_status` | enum | 物流 | packaging / shipped / delivered |
| `delivery_deadline` | date | 发货截止 | "2026-07-20" |
| `event_deadline` | date | 活动日期（婚庆刚需）| "2026-09-15" |
| `is_repeat` | boolean | 是否复购 | false |

#### OT-05: Customer（客户）

| Property | Type | Source | 示例 |
|----------|------|--------|------|
| `id` | string | 买家 ID | "CUST-001" |
| `country` | string | 国家 | "US" |
| `buyer_type` | enum | 买家类型 | wedding_planner / party_store / hotel / florist / rental_company / individual |
| `typical_order_size` | float | 典型订单额 | 2500.00 |
| `season_preference` | string[] | 采购季节 | ["Spring", "Summer"] |
| `preferred_categories` | string[] | 偏好品类 | ["Artificial Flower", "LED Lighting"] |
| `inquiry_count` | integer | 历史询盘数 | 5 |
| `order_count` | integer | 历史订单数 | 2 |
| `lifetime_value` | float | 累计交易额 | 4800.00 |
| `repeat_rate` | float | 复购率 | 0.40 |
| `avg_response_time` | float | 平均响应时长 | 1.5h |
| `risk_score` | float | AI 风险评分 | 0.05 |
| `language_preference` | string | 语言偏好 | "en" |

#### OT-06: AfterSales（售后）

| Property | Type | Source | 示例 |
|----------|------|--------|------|
| `id` | string | 售后 ID | "AS-001" |
| `order_ref` | string | 关联订单 | → Order |
| `issue_type` | enum | 问题类型 | damaged_goods / color_difference / missing_items / late_delivery / quality |
| `status` | enum | 状态 | open / processing / resolved |
| `resolution_time_hours` | float | 解决时长 | 24 |
| `customer_satisfaction` | integer | 满意度 1-5 | 5 |
| `affected_product_category` | string | 受影响的品类 | "Artificial Flower" |
| `is_pattern` | boolean | 是否为重复问题 | false |

#### OT-07: P4P_Campaign（广告）

| Property | Type | Source | 示例 |
|----------|------|--------|------|
| `id` | string | 计划 ID | "P4P-001" |
| `product_refs` | string[] | 推广产品 | → Product[] |
| `campaign_type` | enum | 类型 | core_product / testing / attack |
| `daily_budget` | float | 日预算 | 30.00 |
| `keywords` | object[] | 关键词出价 | [{kw, bid, impressions, clicks, inquiries}] |
| `target_countries` | string[] | 目标国家 | ["US", "UK", "AU"] |
| `l3_premium_pct` | float | L3+ 溢价比例 | 20 |
| `roi` | float | 投资回报率 | 1.8 |
| `best_keyword` | string | 表现最好的词 | "artificial wedding flower wholesale" |

#### OT-08: Store（店铺）

| Property | Type | 来源 | 值 |
|----------|------|------|-----|
| `id` | string | 店铺 ID | "cn1575365235ierx" |
| `brand` | string | 品牌 | "LILIS" |
| `url` | string | 首页 | "cn1575365235ierx.en.alibaba.com" |
| `star_rating` | integer | 星等级 | 0（未评级） |
| `total_products` | integer | 产品总数 | ~360（23 页 × ~15/页） |
| `categories` | string[] | 主营类目 | 8 个 |
| `response_rate` | float | 响应率 | 96.06% |
| `response_time_h` | float | 响应时间 | 3h |
| `year_on_platform` | integer | 入驻年数 | 1 |
| `languages` | string[] | 多语言 | 12 种 |
| `moq_model` | string | MOQ 模式 | 低 MOQ（1-5 pcs） |
| `has_brand` | boolean | 有无品牌 | true |

### 2.3 Links（关系图谱）

```
Customer ──sends──────→ Inquiry
Customer ──places─────→ Order
Inquiry ──references──→ Product[]
Inquiry ──references──→ ProductBundle (套餐询盘)
Inquiry ──converts_to─→ Order
Order ──contains─────→ Product[] / ProductBundle
Order ──generates────→ AfterSales
Product ──belongs_to──→ Subcategory
Product ──bundled_in──→ ProductBundle[]
Product ──promoted_by─→ P4P_Campaign
Product ──listed_in───→ Store
Product ──paired_with──→ Product (交叉销售: 花+拱门+灯光 搭配)
AfterSales ──belongs_to→ Order
```

### 2.4 Actions（运营操作）

| Action | 描述 | 执行方式 | SOP 约束 |
|--------|------|---------|---------|
| `PublishProduct` | 上架新品 | 手动 / AI 辅助 | 标题 128 字符，场景化主图 |
| `CreateBundle` | 创建产品套餐 | AI 建议 + 人工审核 | 基于搭配链匹配 |
| `UpdatePrice` | 修改价格 | 手动 / AI 建议 | 信保成交价 ≥ 页面价 50% |
| `RespondToInquiry` | 回复询盘（含活动日期跟进）| AI 草拟 + 人工审核 | 提取活动日期，到期前 4 周跟进 |
| `SuggestSeasonalPrep` | 季节性备货建议 | AI 自动 | 旺季前 8 周触发 |
| `FlagQualityIssue` | 标记质量问题品类 | AI 标记 + 人工确认 | 同品类售后 > 5% 触发 |
| `OptimizeP4PBid` | 调整 P4P 出价 | AI 优化 | 根据季节性调整（婚礼旺季加投） |

---

## 3. Logic Functions 设计

### Function 1: Classify Inquiry Intent + Extract Event Info

**目标**: 分类询盘意图，并提取活动类型/日期/规模信息（婚庆询盘独有需求）

```
输入:  Inquiry.content, Customer.buyer_type
输出: Inquiry.category, Inquiry.event_type, Inquiry.event_date, Inquiry.project_scale, Inquiry.urgency_score

Blocks:
  1. [Use LLM] Prompt:
     "分析婚庆派对用品询盘:
      - 分类: bulk_order / sample_request / custom_design / price_inquiry / spam
      - 提取: 活动类型(wedding/birthday/party/corporate)、日期(如 9月15日)、嘉宾规模
      - 意向度: 0-1 (有明确日期+数量 > 仅问价)"
     - Tools: Query Customer 历史记录
  2. [Conditionals]
     - 若 event_date 存在 → urgency_score += 0.2（有活动压⼒的更紧急）
     - 若 buyer_type = "wedding_planner" AND event_date 在未来 8 周内 → urgency_score = max(0.9, score)
  3. [Create Variable] 输出各字段

测试用例:
  - "I am planning a wedding on Sept 15, need 200 centerpieces and an arch"
    → category: bulk_order, event_type: wedding, event_date: 2026-09-15, project_scale: 200, urgency: >0.8
  - "What is your best price for 1000 balloons?"
    → category: price_inquiry, urgency: 0.4
```

### Function 2: Cross-Sell Bundle Generator

**目标**: 基于买家询盘的产品，自动推荐搭配产品组成套餐（婚庆业交叉销售）

```
输入:  Product[] (询盘中提到的产品)
输出: ProductBundle (建议套餐), upsell_products[], bundle_price, reasoning

Blocks:
  1. [Execute Function] 获取所询产品的 category + use_case
  2. [Use LLM] Prompt:
     "询盘产品: {products}。
      按搭配链匹配互补产品:
      花类 → 推荐: 拱门支架/绿叶装饰/灯光/桌布
      气球 → 推荐: 气球拱门支架/背景布/LED灯/桌花
      灯光 → 推荐: 背景板/花墙/支架
      目标: 让客户一站式采购，提高客单价 30-50%"
  3. [Create Variable] bundle, upsell_products[]

测试用例:
  - Inquiry includes: "Artificial Rose Vine" 
    → upsell: Flower Wall Frame, LED Backdrop Light, Chair Sashes (matching color)
  - Inquiry includes: "Balloon Arch Kit"
    → upsell: Metal Arch Stand, Foil Balloons (same theme), LED Cloud Ceiling
```

### Function 3: Seasonal Demand Forecast

**目标**: 基于 12 个月数据和行业季节性，预测下月需求量

```
输入:  Store(id), target_month
输出: forecast_by_category[], recommended_stock_levels[], p4p_budget_suggestion

Blocks:
  1. [Execute Function] 获取近 12 个月各品类销量
  2. [Use LLM] Prompt:
     "婚庆派对用品季节性预测:
      - 婚礼旺季: 5-10月 (人造花/拱门/纺织品)
      - 节日气球: 11-2月 (圣诞节/新年/情人节)
      - 春季展会: 3-4月
      基于历史销量 × 季节性权重 → 预测下月需求"
  3. [Create Variable] forecast_by_category[]
  4. [Conditionals]
     - 若预测旺季 → 建议 P4P 预算 +30%
     - 若预测淡季 → 建议 P4P 聚焦长尾词降低 CPA

测试用例:
  - target_month: "June" → 人造花/拱门类预测 +40%, P4P 预算建议 $42/天
  - target_month: "December" → 气球/灯光类预测 +60%, P4P 预算建议 $39/天
```

### Function 4: Listing Quality Auditor (LILIS 品牌版)

**目标**: 对标 SOP 规则 + LILIS 品牌标准，诊断产品列表质量

```
输入:  Product(id)
输出: issues[], suggestions[], brand_score

Blocks:
  1. [Execute Function] 获取产品当前数据
  2. [Use LLM] Prompt:
     "对标国际站 SOP + LILIS 品牌标准诊断:
      - 标题: 128 字符？格式 'LILIS + [品类] + [材质] + [用途] + [场景]'？
      - 主图: 场景化展示（非白底单调图）？有人造花搭配效果？
      - 卖点: 2000 字符是否充分利用？是否写明了 MOQ/交货期/定制选项？
      - 颜色: 是否标注了可选项？
      - 搭配: 是否在详情页推荐了搭配产品？
      - 视频: 有没有产品使用视频（如婚礼现场效果）？"
  3. [Create Variable] issues[], suggestions[]

测试用例:
  - 缺少 'LILIS' 品牌前缀 → issue: "添加品牌前缀，统一品牌识别"
  - 仅有白底图 → issue: "建议添加花墙/拱门场景图作为首图"
  - 无搭配推荐 → issue: "建议添加 2-3 个搭配产品链接 (拱门+灯光+桌花)"
```

### Function 5: Store Health Score

**目标**: 综合评估店铺健康度

```
输入:  Store(id)
输出: health_score (0-100), dimension_scores{}, alerts[]

Blocks:
  1. [Execute Function] 获取各维度指标
  2. [Conditionals] 多维度评分:
     - 产品: 优品/爆品占比 → <30% 扣分
     - 响应: 响应率 → <90% 扣分
     - 品牌: 统一品牌标识 → 无品牌扣分
     - 品类: 品类丰富度 → <5 扣分
     - 转化: 询盘率 vs 行业 → 低于行业扣分
     - 售后: 重复性问题品类 → 存在扣分
  3. [Create Variable] health_score, alerts[]
```

---

## 4. AIP Evals 评估体系

### 评估套件

| Suite | 目标函数 | 测试用例 | 指标 | 通过阈值 |
|-------|---------|---------|------|---------|
| `InquiryClassificationSuite` | ClassifyInquiryIntent | 50 条标注询盘 | Accuracy, F1 | > 85% |
| `BundleRecommendationSuite` | CrossSellBundleGenerator | 30 组询盘 + 专家推荐 | Match Rate (vs 专家) | > 75% |
| `SeasonalForecastSuite` | SeasonalDemandForecast | 12 个月回测 | MAPE (平均绝对百分比误差) | < 20% |
| `ListingQualitySuite` | ListingQualityAuditor | 20 个 LILIS 产品 | Issue Recall vs 人工审查 | > 90% |
| `HealthScoreSuite` | StoreHealthScore | 月度评分 vs 专家评估 | 偏差 | < 10 分 |

### 实施路径

```
Phase 1: 收集 30 条询盘手动标注 → ClassifyInquiryIntent
Phase 2: 单品销售 ≥ 10，搭配推荐准确率达 75% → BundleRecommendationSuite
Phase 3: 积累 12 个月历史 → SeasonalForecastSuite
Phase 4: 产品数 > 100 时持续运行 → ListingQualityAuditor
```

---

## 5. 伦理治理检查清单

| # | 主题 | LILIS 检查项 | 状态 | 行动 |
|---|------|------------|------|------|
| 1 | **公平性** | 套餐定价对所有国家是否一致？ | 🟡 待验证 | 监控报价差异 |
| 2 | **可解释性** | AI 推荐套餐理由是否可说明？ | 🟢 已设计 | `reasoning` 字段输出 |
| 3 | **安全性** | 自动回复是否包含不实承诺（如保证交期）？ | 🔴 未实现 | 加免责声明 |
| 4 | **问责性** | AI 操作是否记录？ | 🔴 未实现 | 建立审计日志 |
| 5 | **多方协作** | 旺季备货建议是否经运营确认？ | 🟡 待建立 | AI 建议需审批 |
| 6 | **明确责任** | AI 预测错误导致库存过剩谁负责？ | 🔴 未定义 | 运营经理承担 |
| 7 | **以人为中心** | 搭配推荐是否可被人工修改？ | 🟢 已设计 | 人工可增删 |
| 8 | **系统化** | 6 项是否形成持续改进？ | 🔴 未建立 | 季度审查 |

### 人机协同检查点

| 操作 | 风险 | AI 角色 | 人机协同 |
|------|------|---------|---------|
| 询盘分类 | 低 | 自动 | 人工修正 |
| 搭配推荐 | 低 | 建议 | 人工确认后发送 |
| 季节性备货建议 | 中 | 建议 | **运营经理审批** |
| P4P 预算调整 | 中 | 建议 | 人工确认（设预算上限） |
| 套餐创建 | 低 | AI 生成 | 人工编辑后发布 |
| 价格调整 | 高 | AI 建议 | **必须人工审批** |
| 质量问题标记 | 中 | AI 标记 | **人工核实** |

---

## 6. 可观测性架构

### 6.1 关键 KPI

| KPI | 目标 | 预警 | 频率 |
|-----|------|------|------|
| 日均搜索曝光 | > 300 | < 100 | Daily |
| 点击率 | > 2% | < 1% | Weekly |
| 询盘转化率 | > 3% | < 1% | Weekly |
| 1h 响应率 | > 90% | < 70% | Real-time |
| 订单转化率 | > 8% | < 3% | Monthly |
| 售后率 | < 3% | > 5% | Monthly |
| 复购率 | > 15% | < 8% | Monthly |
| 优品占比 | > 50% | < 20% | Monthly |
| P4P ROI | > 1.5 | < 0.8 | Weekly |
| 品牌搜索量 | > 10/月 | < 3/月 | Monthly |

### 6.2 三级预警系统

```
Level 1 🟢: 曝光 > 300 AND 点击率 > 2%
Level 2 🟡: 曝光 100-300 OR 点击率 1-2%
Level 3 🔴: 曝光 < 100 (当前接近)
```

---

## 7. 跨平台预测分析路线图

### 7.1 "Sense → Reason → Act" 架构

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

### 7.2 季节日历（婚庆派对业）

| 月份 | 旺季品类 | P4P 预算 | 备货提醒 |
|------|---------|---------|---------|
| 1-2 月 | 情人节花束/气球 | 维持 | — |
| 3-4 月 | 春季展会/复活节 | +20% | 3 月初补货 |
| **5-6 月** | **婚礼旺季: 花/拱门/布艺** | **+40%** | 4 月初多备 SKU |
| **7-8 月** | **夏季婚礼 + 毕业季气球** | **+30%** | 6 月补货 |
| **9-10 月** | **秋季婚礼第二波** | **+40%** | 8 月备货 |
| 11-12 月 | 圣诞/年末派对/新年气球 | +50% | 10 月备货 |

---

## 8. P4P 投流策略 (婚庆派对版)

### 8.1 关键词架构

| 词类 | 示例 | 策略 |
|------|------|------|
| **品牌词** | "LILIS artificial flower", "LILIS wedding decor" | ⭐ 最高优先级，精确匹配 |
| **品类词** | "artificial flower wholesale", "wedding arch stand", "LED party light" | 核心产品计划，精确+广泛混合 |
| **场景词** | "wedding centerpiece bulk", "birthday balloon arch kit", "party backdrop decoration" | 测款计划，广泛匹配 |
| **长尾词** | "real touch silk peony flower wholesale", "2M metal balloon arch stand for wedding", "custom neon sign for wedding" | 分组管理，精确匹配 |
| **竞品词** | 同行品牌/店铺词 | 定向攻击计划（谨慎） |
| **季节词** | "Christmas balloon set wholesale", "Valentine rose artificial bulk" | 提前 6 周启动季节性计划 |

### 8.2 分品类 P4P 策略

| 品类 | 关键词数量 | 预算占比 | 主投市场 | 特殊策略 |
|------|----------|---------|---------|---------|
| 人工花 | 50+ | 35% | US/UK/AU/DE | 场景化主图优先，突出 "real touch" |
| 气球装饰 | 30+ | 20% | US/UK | 节日季节性大幅波动，提前抢量 |
| 灯光霓虹 | 15+ | 15% | US/DE | 突出 "custom text" 可定制 |
| 背板/布艺 | 20+ | 15% | US/AU | 搭配产品链推荐 |
| 支架/拱门 | 10+ | 15% | US/UK | 高客单价，MOQ 友好 |

### 8.3 季节性 P4P 预算日历

| 时期 | 日预算 | 主推品类 |
|------|--------|---------|
| 日常 | $20 | 品牌词 + 长尾精准词 |
| 婚礼旺季 (5-10月) | $30 | + 人工花/拱门/布艺 强投 |
| 节日季 (11-12月) | $28 | + 气球/灯光 强投 |
| 情人节前 (1月中-2月) | $25 | 花束品类 |

---

## 附录：立刻可执行

| 优先级 | 任务 | AIP 映射 | 预期 |
|--------|------|---------|------|
| 🔴 P0 | 所有产品标题加 "LILIS" 品牌前缀 | Ontology: Product.brand | 品牌搜索量提升 |
| 🔴 P0 | 从 23 页产品中筛选 Top 20 优品放入橱窗 | SOP 橱窗规则 | 自然排名提升 |
| 🟡 P1 | 创建 5 组搭配套餐（花+拱门+灯光+桌布） | Logic: BundleGenerator | 客单价 +30% |
| 🟡 P1 | 设置 P4P 品牌词 "LILIS" + 核心品类词计划 | Logic: P4P 策略 | 精准流量 |
| 🟢 P2 | 标注 20 条询盘的事件类型和日期 | Evals: 测试用例 | 训练分类器 |
| 🟢 P2 | 所有产品补充 2000 字符卖点 | Ontology: selling_points | 搜索覆盖率 |

---

> **下次更新**: 说 `AIP 理论应用到 LILIS 店铺业务` 即可拉取最新数据
> **店铺**: [cn1575365235ierx.en.alibaba.com](https://cn1575365235ierx.en.alibaba.com)
