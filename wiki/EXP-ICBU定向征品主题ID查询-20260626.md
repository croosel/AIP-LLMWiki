---
tags:
  - 经验记录
  - ICBU
  - 定向征品
  - 浏览器自动化
  - 内部API
created: 2026-06-26
outcome: success
confidence: high
verified: true
---
# EXP-ICBU 定向征品主题 ID 查询

> 通过浏览器自动化提取 ICBU 卖家后台「定向征品」主题推荐 ID 的完整数据，揭示了 Open Platform API 与卖家后台内部 API 的边界。

## 背景

用户要求查询 ICBU 主题 ID 16873279 的详细信息。该 ID 来自卖家后台的「行业定向征品」功能，是平台为卖家推荐的征品主题。

## 关键发现

### 1. 主题 ID ≠ cat_id ≠ product_id

| ID 类型 | 示例 | 查询方式 |
|---------|------|---------|
| cat_id（分类 ID） | 201600204 | `alibaba.icbu.category.get.new` |
| product_id（产品 ID） | 1601639436596 | `alibaba.icbu.product.get` |
| topic_id / collect_topic_id（征品主题 ID） | 16873279 | **仅卖家后台内部 API** |

用 cat_id 或 product_id 的 API 查询 topic_id 会返回「类目不存在」或空响应。

### 2. Open Platform API 不覆盖定向征品

ICBU Open Platform API（`open-api.alibaba.com`）**没有**定向征品相关接口。定向征品数据只能通过卖家后台的内部 API 获取。

### 3. 卖家后台内部 API 端点

页面 URL：`https://hz-productposting.alibaba.com/product/collect_product.htm?subMenuCode=product_direct_collect_manage`

| 端点 | 用途 | 参数 |
|------|------|------|
| `get_collect_topic.do` | **获取单个主题详情** | `collect_topic_id={id}&ctoken=X&_tb_token_=Y` |
| `query_matched_recommend_topic.do` | 获取推荐主题列表 | `orderByName=score&pageSize=48&page=1&businessType=HOT_PRODUCT&strategyTag=ICBU_SHORT` |
| `get_topic_static_config.do` | 获取静态配置（地区列表+UI文案） | `ctoken=X&_tb_token_=Y` |
| `get_valid_cate.do` | 获取有效分类列表 | — |
| `get_topic_gray_config.do` | 灰度配置 | — |
| `list_strategy_tags.do` | 策略标签列表 | — |
| `topic_match_product.do` | 查询主题匹配的产品 | `topicId={id}&page=1` |
| `hot_topic_similar_product.do` | 热门相似产品 | `topicId={id}` |
| `topic/feedback/get.do` | 主题反馈 | `topicId={id}` |

### 4. get_collect_topic.do 返回数据结构（以 16873279 为例）

```json
{
  "topicId": 16873279,
  "gmtCreate": "2026-06-13",
  "title": "橡胶材质圆形成簇装派对气球",
  "categoryId": "201600204",
  "categoryPath": "家居园艺>>庆典派对用品>>派对和节日用品>>派对气球",
  "reason": "派对气球在节日与生日场景需求稳定...",
  "priceRange": "<=$0.88",
  "recommendCountryList": ["菲律宾"],
  "propertyMap": {"适用节日": ["Birthday"]},
  "minOrdQtyFrom": "1",
  "minOrdQtyTo": "50",
  "sampleImgUrl": "//sc02.alicdn.com/kf/He77f46a6e172412ba6f4c414901856113.jpg",
  "ruleDTO": {
    "categoryIds": "15,100001824,201606903,201600204",
    "priceTo": "0.88",
    "coreCapacityList": ["trade_prod", "support_delivery_guarantee"],
    "needPicMatch": "Y",
    "minLadderPeriod": "9",
    "attrDTOList": [
      {"attrName": "Material", "attrValueDTOList": [{"attrValueName": "Rubber"}]},
      {"attrName": "Occasion", "attrValueDTOList": [{"attrValueName": "Birthday"}]}
    ],
    "capacityDtoList": [
      {"name": "可交易品", "field": "trade_prod"},
      {"name": "支持到货保障", "field": "support_delivery_guarantee"}
    ]
  },
  "strategyTag": "ICBU_SHORT",
  "chanceSource": "GLOBAL_INSIGHT_PRODUCT_CLUSTERS_RECOMMEND"
}
```

### 5. 征品要求字段解读

| 字段 | 含义 | 16873279 值 |
|------|------|------------|
| `priceRange` / `ruleDTO.priceTo` | 最高售价（USD） | ≤$0.88 |
| `minOrdQtyFrom/To` | MOQ 范围 | 1–50 件 |
| `ruleDTO.minLadderPeriod` | 最低交期（天） | 9 天 |
| `ruleDTO.needPicMatch` | 首图需与主题相似 | Y |
| `ruleDTO.coreCapacityList` | 需要的服务能力 | 可交易品 + 到货保障 |
| `ruleDTO.canShipCountryList` | 可发货国家 | PH（菲律宾） |
| `ruleDTO.attrDTOList` | 必须的商品属性 | Material=Rubber, Occasion=Birthday |
| `strategyTag` | 策略标签 | ICBU_SHORT（新品加速） |

## 执行路径

1. ❌ 尝试 `alibaba.icbu.category.get.new` 查 cat_id=16873279 → 「类目不存在」
2. ❌ 尝试 `alibaba.icbu.product.get` 查 product_id=16873279 → 空响应
3. ❌ Wiki / Skills 搜索无果
4. ✅ 浏览器导航到卖家后台 → 找到正确 URL：`collect_product.htm?subMenuCode=product_direct_collect_manage`
5. ✅ 通过网络请求分析发现内部 API 端点
6. ✅ 用 `get_collect_topic.do?collect_topic_id=16873279` 成功获取完整主题数据

### 浏览器自动化的坑

- `fetch()` 在 JavaScript tool 中返回 `undefined`（async/await 不被正确处理）
- **解法**：改用 `XMLHttpRequest`（同步回调），用 `new Promise()` 包裹后成功获取数据
- 需要带 `ctoken` 和 `_tb_token_` 参数（从页面 cookie/URL 获取）

## 与 1688→ICBU 管道的整合

定向征品主题数据可以反向指导 1688 选品：

```
主题 ID → get_collect_topic.do → 提取 priceRange/categoryId/属性要求
→ 1688 搜索对应产品 → 1688 价格 × 加价系数 ÷ 汇率 ≤ priceRange → 符合征品要求 → 发布
```

这为管道增加了「征品驱动选品」的新入口，比盲目上架更精准。

## 经验提炼

1. **ICBU 有两套 API 体系**：Open Platform API（对外开放，产品管理）+ 卖家后台内部 API（不公开，征品/数据/运营）
2. **主题 ID 只能从内部 API 查**：`get_collect_topic.do` 是获取征品主题详情的唯一途径
3. **浏览器自动化中 fetch 不可靠**：SPA 页面的 JavaScript tool 中，`fetch()` + `await` 返回 undefined，改用 `XMLHttpRequest` + `Promise` 包裹
4. **网络请求分析是金矿**：`read_network_requests` 可以暴露页面使用的所有内部 API 端点，比猜测高效得多
5. **征品主题可反向驱动选品**：从主题要求倒推 1688 找货，比先找货再想怎么卖更精准

## 相关页面

- [[ICBU_Open_Platform_API技术手册]] — Open Platform API 完整文档
- [[EXP-ICBU开放平台API产品管理-20260614]] — API 产品管理全链路调研
- [[EXP-优品清单API批量提取-20260626]] — product.get 字段映射
- [[经验索引]]
