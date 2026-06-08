---
tags:
  - PAP
  - 提示词工程
  - Agent增强
  - Wiki架构
  - 核心方法论
created: 2026-05-29
source: "[[Prompt_Augmentation_Pipeline_Design]]"
verified: true
priority: 1
---

# Prompt Augmentation Pipeline (PAP)

## 概述
PAP 是 LLM Wiki 与 Accio Work Agent 之间的自动增强管线。它解决了核心问题：**裸 Agent 执行 LILIS 业务任务时精度仅为 5%，因为领域知识不在 LLM 训练语料中**。

## 四阶段管线

```
用户任务 ──→ ① 领域匹配 ──→ ② 规则检索 ──→ ③ 规则清洗 ──→ ④ 提示词重组 ──→ 执行 Agent
             memory_search    read wiki      五型分类          模板组装
             <1s              <1s           MUST/FORBID/      1-3s
                                            THRESHOLD/
                                            FORMAT/PITFALL
```

### Stage 1: 领域匹配
- **工具**: `memory_search`
- **输入**: 用户自然语言任务
- **输出**: 命中的 Wiki 页面列表（top 5, score ≥ 0.35）
- **搜索范围**: `AIP-LLMWiki/wiki/`

### Stage 2: 规则检索
- **工具**: `read`
- **输入**: Stage 1 输出的文件列表
- **提取目标**: 表格、数值阈值、禁止项、流程步骤、历史踩坑
- **输出**: 原始规则文本块

### Stage 3: 规则清洗（五型分类）
- **动作**: 去叙事 → 去重 → 五型分类 → 排序

| 类型 | 标签 | 含义 | 示例 |
|------|------|------|------|
| 必须做 | `[MUST]` | 不执行会出错 | 品牌词精确匹配 |
| 禁止做 | `[FORBID]` | 做了会出事故 | 品牌词与品类词混投 |
| 判断阈值 | `[THRESHOLD]` | 数字判断标准 | 日预算 $20-30 |
| 输出格式 | `[FORMAT]` | 结果结构要求 | 分三部分输出 |
| 历史踩坑 | `[PITFALL]` | 之前犯过的错 | node 版本不对打包失败 |

- **排序优先级**: FORBID > MUST > THRESHOLD > FORMAT > PITFALL
- **上限**: 总长度 ≤ 2000 字符

### Stage 4: 提示词重组
- **模板**:
```
[角色定义]（从 Wiki "角色"字段提取）
[用户任务]（原始任务，一字不改）
[领域规则 — 来自 LLM Wiki，必须遵守]
  - 必须做: ...
  - 禁止做: ...
  - 判断标准: ...
  - 输出格式: ...
  - 历史踩坑: ...
```
- **交付方式**: `sessions_spawn` 注入执行 Agent

## 管线性能

| 指标 | 数值 |
|------|------|
| 总延迟 | 2-4 秒 |
| 精度提升（P4P 诊断实测） | +95pp（0.5/10 → 10/10） |
| Fallback 策略 | memory_search 无命中 → 裸执行 + `[NO_WIKI_MATCH]` |
| 超时阈值 | 任一阶段 >5s → 跳过该阶段，继续 |

## 触发条件

| 触发 | 不触发 |
|------|--------|
| Alibaba / P4P / 国际站 / LILIS | 纯闲聊 / 问候 |
| 选品 / 诊断 / 投流 / 优化 / 标题 | 文件操作（不涉及业务逻辑） |
| 信保 / 橱窗 / 运营数据 / 询盘 | 图片生成 / 编辑 |
| SEO / 产品 / 竞品 / 定价 / 关键词 | 翻译 / 系统配置 |

## 实现位置
- **Skill 操作手册**: `skills/lilis-wiki-lookup/SKILL.md`
- **常驻指令**: `SOUL.md` 行 181-189（认知先行 + PAP 强制自动激活）
- **Skill 注册**: `skills/skills.jsonc` → `lilis-wiki-lookup`

## 与现有强制律的兼容性
PAP 不违反五条强制律，因为裸执行精度 0.5/10 意味着 Wiki 增强是**完成任务的必要前置**，不是额外步骤。

## 相关页面
- [[PAP实验A-B测试结果]]
- [[Weekly Review协议]]
- [[P4P投流策略]]
- [[运营数据分析SOP]]

## 相关链接

- [[Agent架构变更记录]]
- [[Weekly_Review_协议]]
