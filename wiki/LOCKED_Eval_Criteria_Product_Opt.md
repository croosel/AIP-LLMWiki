# 🔒 EVALUATION CRITERIA: 普通品优化 (LOCKED)
> **原则**：二元评分 (YES/NO)，Agent 不得修改此文件。

## 核心指标 (Core Metrics)
1. **[YES/NO] 标题前缀合规**：标题是否以 "LILIS " (含空格) 开头？
2. **[YES/NO] 物理存储确认**：在 MA 后台列表页刷新后，是否能搜索到该 ID 且标题已变更？
3. **[YES/NO] 属性覆盖**：自定义属性中是否包含 "Features" 且值为 Wiki 要求的 3 个关键词？
4. **[YES/NO] 卖点完整性**：描述栏是否包含 5 个独立的、以品牌手册 USP 为核心的 Bullet Points？

## 成功定义 (Best Record)
- 只有以上 4 项全部为 **YES**，该实验才被视为成功 (BEST)，否则触发 REVERT。
