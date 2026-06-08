---
tags:
  - 概念
  - ProductBundle
  - 套餐
  - 婚庆
  - 交叉销售
created: 2026-05-20
source: "[[AIP_Ontology_Alibaba_Blueprint]]"
---

# ProductBundle（产品套餐）

## 定义

**ProductBundle** 是 LILIS 针对婚庆派对行业设计的 Ontology 对象类型，将多个关联产品组合成套餐销售。这是婚庆行业的差异化策略——买家通常需要一站式采购花、拱门、灯光、布艺等多个品类。

## 核心属性

| 属性 | 说明 | 示例 |
|------|------|------|
| id | 套餐 ID | "BUN-001" |
| name | 套餐名 | "Complete Wedding Arch Decor Kit" |
| products | 包含的产品及数量 | [{product_id, qty}] |
| theme | 主题风格 | "Romantic Rose" / "Forest Green" / "Modern White" |
| total_price | 套餐总价 | $89.99 |
| target_event | 适用活动 | "Wedding Ceremony" / "Birthday Party" |
| estimated_setup_time | 搭建时间 | "30 min" |

## 业务用途

- 通过套餐提高客单价 30-50%
- 降低买家的采购决策成本（一站购齐）
- 强化 LILIS 品牌在婚庆行业的专业定位

## 外贸应用

> 参见 [[AIP-Logic]]、[[LILIS-婚庆派对用品]]

**现有套餐建议** (由 [[AIP-Logic#Function 2: CrossSellBundleGenerator|CrossSellBundleGenerator]] 生成):

| Bundle | 内容 | 建议价 | 利润 |
|--------|------|--------|------|
| Wedding Ceremony Starter Kit | Peony ×50 + Arch Stand + LED ×2 + Chair Sashes ×50 | $69.99 | ~$35 |
| Birthday Party Balloon Bonanza | Foil Set ×3 + Arch Kit ×1 + LED Letter ×1 | $29.99 | ~$15 |
| Hotel Lobby Flower Wall Kit | Wall Panel ×4 + Frame ×2 + Wreath ×4 | $149.99 | ~$75 |

## 常见问题

**Q: ProductBundle 和普通的多 SKU 订单有什么区别？**
A: ProductBundle 是预先设计的主题套餐（如"浪漫玫瑰婚礼套装"），有明确的事件定位和搭配逻辑。普通多 SKU 订单只是买家自行组合。

## 相关链接

- [[Ontology]] — ProductBundle Object Type
- [[人造花]]
- [[LILIS-婚庆派对用品]]
- [[MOQ]]
- [[主页]]
- [[术语索引]]
- [[独立站信息架构]]
- [[独立站网页设计专案]]
- [[独立站设计系统]]
