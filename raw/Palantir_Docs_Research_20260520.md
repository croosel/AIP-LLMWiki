# Palantir Foundry 文档调研记录 (2026-05-20)

## 调研来源

| URL | 主题 |
|-----|------|
| https://www.palantir.com/docs/foundry/dev-toolchain/overview/ | 开发工具链总览 |
| https://www.palantir.com/docs/foundry/ontology-sdk/overview/ | OSDK 总览 |
| https://www.palantir.com/docs/foundry/palantir-mcp/overview/ | Palantir MCP |
| https://www.palantir.com/docs/foundry/code-workspaces/overview/ | Code Workspaces |
| https://www.palantir.com/docs/foundry/custom-endpoints/overview/ | Custom Endpoints |
| https://www.palantir.com/docs/foundry/architecture-center/overview/ | 架构中心 |
| https://www.palantir.com/docs/foundry/api-reference/ | API 参考 |
| https://www.palantir.com/docs/foundry/ai-fde/overview/ | AI FDE 总览 |
| https://www.palantir.com/docs/foundry/ai-fde/modes-and-skills/ | AI FDE 模式与技能 |
| https://www.palantir.com/docs/foundry/api/ontologies-v2-resources/object-types/list-object-types/ | Ontology v2 API - Object Types |
| https://www.palantir.com/docs/foundry/announcements/2026-03/ | 2026-03 公告 |
| https://learn.palantir.com/deep-dive-creating-your-first-ontology | 本体创建课程 |
| https://github.com/palantir/foundry-platform-python | Platform SDK v2 |
| https://github.com/palantir/foundry-platform-python/issues/318 | Issue #318: Create Object/Action/Link Type API |
| https://github.com/palantir/foundry-platform-python/issues/169 | Issue #169: Old v1 SDK create request |

## 关键发现

1. AI FDE 使用内部工具（非公共 API）进行 Ontology Schema 创建
2. 公共 Platform SDK v2 仅支持读取操作（GET/LIST），无 POST/PUT 用于 Schema 管理
3. Issue #318 (2026-01-19, 仍 Open) 请求公开 Ontology Schema 创建端点
4. Code Workspaces + OSDK + Palantir MCP 构成完整开发工具链
5. 可逆向工程：OSDK 的 Schema→SDK 自动生成模式
