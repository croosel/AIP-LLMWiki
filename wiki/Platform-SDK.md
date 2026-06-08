---
tags: [Palantir, Foundry, SDK, API, 开源]
created: 2026-05-20
source: "[[Palantir_Docs_Research_20260520]], https://github.com/palantir/foundry-platform-python"
---
# Platform SDK v2

## 定义
Palantir **Foundry Platform SDK v2**（`findPackageLinks` 为 `foundry-platform-sdk`）是 Apache 2.0 许可的 Python SDK，提供对 Foundry 和 AIP REST API 的简化编程接口。安装：`pip install foundry-platform-sdk`。

## 核心属性
| 属性 | 值 |
|------|-----|
| 语言 | Python（另有 TypeScript/Java 变体） |
| 许可 | Apache 2.0 |
| 安装 | `pip install foundry-platform-sdk` |
| 认证 | OAuth 2.0 Client Credentials + User Token |
| Ontology API | v1（旧） + v2（新，推荐） |
| Schema 写入 | ❌ 不支持（Issue #318 Open） |

## SDK 服务架构

### 核心客户端
```python
from foundry_platform import FoundryClient

client = FoundryClient(
    hostname="https://your-instance.palantirfoundry.com",
    client_id="...", client_secret="..."
)
```

### 可用服务列表
| Service | 能力 |
|---------|------|
| `client.ontologies.v2` | Object Type / Action / Link / Query CRUD**（仅读）** |
| `client.ontologies.v2.objects` | Object 实例 CRUD |
| `client.ontologies.v2.actions.apply()` | 触发 Action |
| `client.ontologies.v2.queries.execute()` | 执行查询 |
| `client.datasets` | Dataset 管理 |
| `client.filesystem` | 文件读写 |
| `client.functions` | Function 执行 |
| `client.orchestration` | Build 调度 |
| `client.sql` | SQL 查询 |
| `client.connectivity` | 数据连接配置 |
| `client.admin` | 用户/组/权限管理 |
| `client.stream_proxy` | 流式数据 |

## 当前公开端点 vs 缺失

### Ontology v2 Schema — 已公开
| 端点 | 方法 | 说明 |
|------|------|------|
| `/v2/ontologies/{onto}/objectTypes` | GET | 列出所有 Object Type |
| `/v2/ontologies/{onto}/objectTypes/{type}` | GET | 获取单个 Object Type |
| `/v2/ontologies/{onto}/objectTypes/{type}/getByRid` | POST | 批量获取 |
| `/v2/ontologies/{onto}/actionTypes` | GET | 列出所有 Action Type |
| `/v2/ontologies/{onto}/linkTypes` | GET | 列出所有 Link Type |
| `/v2/ontologies/{onto}/queryTypes` | GET | 列出所有 Query Type |

### Ontology v2 Schema — 缺失（Issue #318）
| 端点 | 方法 | 状态 |
|------|------|------|
| Object Type | POST | ❌ 未实现 |
| Action Type | POST | ❌ 未实现 |
| Link Type | POST | ❌ 未实现 |
| Query Type | POST | ❌ 未实现 |

## 外贸应用
> 参见 [[Foundry开发工具链]] · [[Ontology-SDK架构]]

### 对 LILIS 的启示
1. **Schema 管理必须自建**：因为 Foundry 公共 API 不支持 Schema 创建，LILIS 需要自己的 Schema 管理系统
2. **读 SDK 可参考**：Platform SDK v2 的读操作设计可以作为 LILIS 数据访问层的 API 设计参考
3. **Action 模式可迁移**：`actions.apply()` 的设计对应 Alibaba API 的写操作

## 常见问题
**Q: Platform SDK v2 与 Ontology SDK 的区别？**
A: Platform SDK 是通用客户端（任何 Foundry 实例）；Ontology SDK 是针对**特定** Ontology 的代码生成包（类型安全，每个项目唯一）。

**Q: Issue #318 有望解决吗？**
A: 2026-01-19 创建，至今（2026-05-20）仍 Open。Palantir 未给出时间线。Issue 评论中提出者明确表示缺少 Schema 自动化导致开发速度比 AWS+Python+React 慢 100 倍。

## 相关链接
- [[Foundry开发工具链]]
- [[Ontology-SDK架构]]
- [[AI-FDE完整架构]]
- [[LILIS数据模型v2]]
- [[AIP构建完整指南]]
- [[主页]]
- [[术语索引]]
- [[模型部署与运维]]
