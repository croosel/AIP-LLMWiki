# AIP-LLMWiki 参考文档

## 目录结构

```
AIP-LLMWiki/
├── AGENTS.md          # 所有 Agent 强制规则
├── CLAUDE.md          # Claude 专用规则
├── .cursorrules       # Cursor 专用规则
├── README.md          # 知识库说明
├── wiki/              # 所有 wiki 页面（可读写）
│   ├── 经验索引.md     # 经验记录总索引
│   ├── 经验记录模板.md  # 经验记录标准模板
│   ├── Agent工作流协议.md
│   ├── Agent-Handoff协议.md
│   ├── 知识库维护SOP.md
│   └── ...（120+ 知识页面）
├── raw/               # 原始资料（只读）
└── schema/            # 数据模型（人工编辑）
```

## Agent 工作流协议要点

1. **知识库边界**: Agent 只写 wiki/，不改 raw/ 和 schema/
2. **页面创建**: 必须有 frontmatter，必须用 wikilinks，至少链接 2 个已有页面
3. **双向链接**: 新建页面时，被链接页面也要加回链
4. **冲突解决**: 先查 git log，发现冲突先 pull 再操作
5. **质量检查**: 完成后检查无断链、有 frontmatter、无格式错误

## Handoff 协议要点

当工作需要在 Agent 间交接时：
1. 归档所有未提交的经验记录
2. 按 `wiki/Agent-Handoff协议.md` 格式输出交接摘要
3. 包含修改文件清单和关键决策

## 经验记录完整模板

```yaml
---
tags:
  - 经验记录
  - LILIS
  - 外贸跨境
created: {YYYY-MM-DD}
agent: Accio Work
task_id: {可选}
outcome: {success / failure / partial}
confidence: {high / medium / low}
related_wiki:
  - {相关页面路径}
---
```

## 验证等级说明

- **verified**: 经过多次验证的结论，可直接用于决策
- **high**: 高置信度，作为主要参考
- **medium**: 中等置信度，仅供参考，建议独立验证
- **low**: 低置信度，不可直接引用，需重新验证

## Git 操作规范

```bash
# 拉取最新
git pull --rebase

# 提交变更（经验记录）
git add wiki/EXP-*.md wiki/经验索引.md
git commit -m "EXP: {简述} by Accio Work {日期}"
git push

# 提交变更（wiki 页面）
git add wiki/{页面名}.md
git commit -m "wiki: {变更描述} by Accio Work"
git push
```

注意：提交前务必 `git pull --rebase` 避免冲突。
