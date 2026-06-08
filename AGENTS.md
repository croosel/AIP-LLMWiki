# AIP-LLMWiki Knowledge Base — Agent Mandatory Rules

> **THIS FILE IS READ BY ALL AGENTS. DO NOT SKIP ANY RULE.**
> 
> 本文件是知识库的强制执行规则。任何 Agent 在此知识库中执行任何任务前，必须遵守以下规则。
> 违反规则的产出将被回滚。

---

## 0. 启动检查（每次任务前必做）

```
□ 读取 wiki/经验索引.md，检查是否有与当前任务相关的历史经验
□ 如有相关失败复盘（outcome: failure），必须确认当前方案已规避已知陷阱
□ 如有 verified: true 的实验结论，优先采用已验证方案
```

## 1. 目录权限

| 目录 | 权限 | 说明 |
|------|------|------|
| `wiki/` | 读写 | 结构化知识页面，所有 Agent 的产出写入此目录 |
| `raw/` | **只读** | 原始资料，禁止任何 Agent 修改 |
| `schema/` | 受控 | 仅 Human Editor 可修改 |
| `.obsidian/` | 禁止 | 不要碰 Obsidian 配置 |

## 2. 页面创建规范

- 必须有 YAML frontmatter：`tags`, `created`, `outcome`（经验记录时）
- 必须使用 `[[wikilinks]]` 链接相关页面（不用 `.md` 后缀，不用 `\` 转义）
- 新页面至少链接 2 个已有页面
- 创建前检查是否已有同名或同义页面

## 3. 经验反馈闭环（强制）

**执行前**：查 `wiki/经验索引.md`，读取相关经验页面

**执行后**：按 `wiki/经验记录模板.md` 记录本次经验（除非是纯读取/格式修复任务），并更新经验索引

**验证等级**：
- `verified: true` → 可直接作为决策依据
- `confidence: high` → 可作为主要参考
- `confidence: medium` → 仅供参考，需自行验证
- `confidence: low` → 不建议直接引用

## 4. Agent 交接

任务完成需交接时，按 `wiki/Agent-Handoff协议.md` 格式传递信息。交接前确认经验记录已归档。

## 5. 详细协议索引

| 协议 | 路径 | 用途 |
|------|------|------|
| Agent 工作流协议 | `wiki/Agent工作流协议.md` | 完整工作规范 |
| Handoff 协议 | `wiki/Agent-Handoff协议.md` | Agent 间交接 |
| 维护 SOP | `wiki/知识库维护SOP.md` | 日/周/月维护 |
| 经验索引 | `wiki/经验索引.md` | 经验查询入口 |
| 经验模板 | `wiki/经验记录模板.md` | 记录标准格式 |

---

*Last updated: 2026-06-08 | Managed by Human Editor*
