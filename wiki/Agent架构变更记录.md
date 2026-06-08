---
tags:
  - Agent架构
  - SOUL
  - Skill注册
  - 配置变更
  - PAP
created: 2026-05-29
source: "[[Prompt_Augmentation_Pipeline]]"
verified: true
priority: 2
---

# Agent 架构变更记录

## 变更日期: 2026-05-29

## 变更概述
为实现 PAP（Prompt Augmentation Pipeline）自动增强 + 经验闭环，对 Accio Work Agent 做了三处核心修改。

---

## 变更 1: SOUL.md — 常驻指令升级

### 文件
`${agent_core}/SOUL.md` 行 181-189

### 修改前
```
- 认知先行 (Search-First)：在执行任何任务或推理前，必须优先检索 LLM Wikis。
```

### 修改后
```
- 认知先行 (Search-First)：在执行任何任务或推理前，必须优先检索 LLM Wikis。
- Prompt Augmentation Pipeline (PAP · 强制自动激活)：认知先行的唯一正确实现。
  任何涉及 Alibaba/LILIS/P4P/国际站/e-commerce/选品/诊断/投流/优化/标题/信保/橱窗/
  运营数据/询盘/SEO/店铺/产品 的任务，自动执行 4 阶段管线：
  Stage 1 memory_search → 领域匹配
  Stage 2 read → 规则检索
  Stage 3 清洗 → 五型分类 [MUST]/[FORBID]/[THRESHOLD]/[FORMAT]/[PITFALL]
  Stage 4 重组 → 增强 Prompt → sessions_spawn 注入执行 Agent
  管线延迟 2-4s | 精度提升验证 +95pp
  Fallback: memory_search 无命中 → 裸执行 + 标注 [NO_WIKI_MATCH]
  禁止裸执行业务任务——裸执行精度 0.5/10，这是完成任务的必要前置。
```

### 影响
- 每次 session 启动时加载，对所有 LILIS 业务任务**自动生效**
- 与五条强制律兼容（裸执行精度 0.5/10 证明 PAP 是必要前置）

---

## 变更 2: Skill 注册 — 新增两个 Skill

### 文件
`${agent_skills}/skills.jsonc`

### 新增 Skill 1: lilis-wiki-lookup
| 维度 | 值 |
|------|-----|
| ID | `lilis-wiki-lookup` |
| 类型 | directory |
| 路径 | `skills/lilis-wiki-lookup/SKILL.md` |
| 触发 | Alibaba/LILIS/P4P/选品/诊断/投流/优化/标题/信保/橱窗/运营/SEO/产品 |
| 功能 | 4 阶段 PAP 管线自动执行 |

### 新增 Skill 2: weekly-review
| 维度 | 值 |
|------|-----|
| ID | `weekly-review` |
| 类型 | directory |
| 路径 | `skills/weekly-review/SKILL.md` |
| 触发 | "每周复盘" / "weekly review" / 每周日 10:00 定时 |
| 功能 | 扫描 PAP 记录 → 五类分析 → 提案 → 等用户拍板 |

### 新增 Cron Job
| 维度 | 值 |
|------|-----|
| Job ID | `cron-1780029705195-t56ihihq` |
| 名称 | Weekly LLM Wiki Review |
| 频率 | 每周日 10:00 Asia/Shanghai |
| 内容 | 触发 weekly-review skill 执行复盘管线 |
| 权限 | 只读 + 提案，不修改 Wiki |

---

## 变更 3: AIP-LLMWiki — 新增 4 篇核心 Wiki

| Wiki 页 | 内容 | 优先级 |
|---------|------|--------|
| [[Prompt Augmentation Pipeline]] | PAP 四阶段完整规范 | P1 |
| [[PAP实验A-B测试结果]] | A/B 测试数据与根因分析 | P1 |
| [[Weekly Review协议]] | 经验闭环协议与 Cron 配置 | P1 |
| [[Agent架构变更记录]] | 本文 | P2 |

---

## 变更后的 Agent 技能总数
- 变更前: 22
- 变更后: 24

## 相关页面
- [[Prompt Augmentation Pipeline]]
- [[PAP实验A-B测试结果]]
- [[Weekly Review协议]]

## 相关链接

- [[Weekly_Review_协议]]
