---
tags:
  - 复盘
  - Wiki维护
  - 知识闭环
  - 经验沉淀
  - 自动化
created: 2026-05-29
source: "[[Prompt_Augmentation_Pipeline]]"
verified: false
priority: 1
---

# Weekly Review 协议

## 概述
Weekly Review 是 PAP 管线的反向回路——执行结果的经验沉淀回 Wiki，形成自进化的知识系统。

```
Wiki ──→ PAP ──→ 执行 ──→ 结果
  ↑                         │
  │                    diary 记录
  │                         │
  └──── 每周日 10:00 ←──────┘
        (自动复盘)
```

## 触发机制
- **定时**: 每周日 10:00（Asia/Shanghai），Cron: `0 10 * * 0`
- **手动**: 说"每周复盘" / "weekly review"
- **Job ID**: `cron-1780029705195-t56ihihq`

## 四阶段复盘管线

### Stage 1: 数据采集
扫描本周所有 PAP 执行记录：
- `memory_search` 查找 PAP 标记
- 读取本周 7 天 diary 文件
- 搜集 `[NO_WIKI_MATCH]` / `[PAP_PARTIAL]` 标记

### Stage 2: 模式识别（五类产出）

| 类型 | 判定 | Wiki 操作 |
|------|------|-----------|
| **验证有效** | 同一规则 3+ 次正确命中，无用户修正 | 标记 `verified: true` |
| **用户修正** | 用户说"不对"/"应该是 X"/"重做" | 修订规则，记录修正后的正确版本 |
| **新发现** | 本周出现 Wiki 未覆盖的任务/规则 | 新建 Wiki 页或新增规则块 |
| **规则冲突** | 两个 Wiki 规则执行中互斥 | 明确优先级，合并冲突 |
| **可能过时** | 规则被绕过或标记不适用 | 更新阈值或标记 `expired: true` |

### Stage 3: 提案生成
每条提案包含：
- 目标文件（AIP-LLMWiki/wiki/xxx.md）
- 操作类型（新增/修订/标记 verified/标记 expired/合并/新建）
- 原文引用 + 修订内容 + 修订理由 + 影响范围 + 风险提示

### Stage 4: 用户审批
用 `ask_user mode="form"` 展示所有提案。
**⚠️ 绝不代写——用户批准前，不修改任何 Wiki 文件。**

## 硬约束

| # | 约束 | 说明 |
|---|------|------|
| 1 | 只读优先 | Stage 1-3 全只读，Stage 4 才涉及写 |
| 2 | 用户拍板 | 任何 Wiki 修改必须通过 ask_user 审批 |
| 3 | 证据驱动 | 每条提案必须有本周实际执行记录支撑 |
| 4 | 增量更新 | 只改有变化的规则，不大规模重写 |
| 5 | 失败安全 | 数据不足时报告并退出 |

## 复盘摘要模板

```markdown
## Weekly Review — YYYY 年第 W 周

### 执行统计
- 总任务数: N
- Wiki 命中率: X%
- 用户修正率: Y%
- 新增 [NO_WIKI_MATCH]: Z

### Wiki 变更
- 新增规则: N 条
- 修订规则: N 条
- 标记 verified: N 条
- 标记 expired: N 条
- 新建 Wiki 页: N 页

### 待观察
- 规则冲突: N 条
- 建议新增覆盖: N 个
```

## 实现位置
- **Skill 操作手册**: `skills/weekly-review/SKILL.md`
- **Skill 注册**: `skills/skills.jsonc` → `weekly-review`
- **Cron 配置**: `cron-1780029705195-t56ihihq`

## 相关页面
- [[Prompt Augmentation Pipeline]]
- [[PAP实验A-B测试结果]]
- [[Agent架构变更记录]]
