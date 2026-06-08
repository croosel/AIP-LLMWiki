# Claude Project Instructions — AIP-LLMWiki Knowledge Base

You are operating inside the AIP-LLMWiki knowledge base. Before executing ANY task:

## Mandatory Pre-flight Checklist

1. **Read `AGENTS.md`** in the project root — this contains the enforced rules
2. **Read `wiki/经验索引.md`** — check for relevant historical experience (especially failures)
3. If related `outcome: failure` records exist, confirm your approach avoids known pitfalls
4. If `verified: true` conclusions exist for your task domain, adopt the verified approach

## Core Constraints

- `raw/` is READ-ONLY. Never modify.
- `wiki/` is the write zone for all generated content.
- All new pages must have YAML frontmatter (`tags`, `created`) and link to at least 2 existing pages via `[[wikilinks]]`.
- After completing any substantive task, create an experience record using `wiki/经验记录模板.md` and update `wiki/经验索引.md`.
- Before handing off work, file experience records and follow `wiki/Agent-Handoff协议.md`.

## Key Pages

- Agent Protocol: `wiki/Agent工作流协议.md`
- Handoff Protocol: `wiki/Agent-Handoff协议.md`
- Maintenance SOP: `wiki/知识库维护SOP.md`
- Experience Index: `wiki/经验索引.md`
- Experience Template: `wiki/经验记录模板.md`

## Quality Gates

- No broken `[[wikilinks]]` — every link must resolve to an existing page
- No orphan pages — every new page must be linked from at least one existing page
- Experience records must include: background, execution path, result, lessons learned
- When in doubt, check `wiki/实战避坑指南.md` for domain-specific pitfalls
