---
tags: [Dev-Toolchain, Functions, TypeScript, Python, Palantir-AIP]
created: 2026-05-21
source: "[[raw/palantir_docs_functions_language_support]]"
---
# Functions 运行时

## 定义

**Functions** 是 Foundry 的服务器端逻辑执行环境。开发者可以编写 TypeScript 或 Python 代码，让这些函数在 Workshop 仪表盘、Slate 应用、Quiver 分析等操作上下文中快速执行。所有函数在隔离环境中服务器端运行。

Functions 对 Ontology 有一等公民支持——可以直接读取对象属性、遍历链接、灵活编辑 Ontology。

## 核心属性

### 语言支持矩阵

| 能力 | AIP Logic | TypeScript v1 | TypeScript v2 | Python |
|------|-----------|---------------|---------------|--------|
| Ontology 对象访问 | ✅ | ✅ | ✅ | ✅ |
| Ontology Interfaces | ❌ | ❌ | ✅ | ❌ |
| Ontology 编辑 | ✅ | ✅ | ✅ | ✅ |
| Workshop 中查询 | ✅ | ✅ | ✅ | ✅ |
| Pipeline Builder | ❌ | ❌ | ❌ | ✅ |
| 调用 Live Model | ✅ | ✅ | ❌ | ❌ |
| 语义搜索 | ✅ | ✅ | ✅ | ✅ |
| Webhook 调用 | ❌ | ✅ | ❌ | ❌ |
| 外部 API 调用 | ❌ | ✅ | ✅ | ✅ |
| Serverless 执行 | ✅ | ✅ | ✅ | ✅ |
| Deployed 执行 | ❌ | ❌ | ✅ | ✅ |
| API Gateway 调用 | ✅ | ✅ | ✅ | ✅ |
| Marketplace 打包 | ✅ | ✅ | ✅ | ✅ |
| Bring-Your-Own-Model | ✅ | ✅ | ❌ | ❌ |
| **OSDK 支持** | ❌ | ❌ | ✅ | ✅ |

**推荐选择**：Python 或 TypeScript v2（支持 OSDK + Developer Console 集成 + OSDK 版本管理）。

### TS v1 → TS v2 升级价值

| 改进 | 说明 |
|------|------|
| Node.js 22 | 现代化运行时，更多 NPM 库兼容 |
| 系统级操作 | `fs`、`child_process`、`crypto` 等 Node API |
| NPM 库兼容 | 需要文件系统或 CPU 密集操作的库可用 |
| OSDK 集成 | 享受类型安全和自动补全 |

### Serverless vs Deployed

| 维度 | Serverless（推荐） | Deployed |
|------|-------------------|---------|
| 启动方式 | 按需启动 | 常驻运行 |
| 多版本 | ✅ 多版本共存 | 一次一个版本 |
| 升级安全 | ✅ 安全（新版本就绪后切流） | 需手动管理 |
| 适用场景 | 大部分用例 | 特殊低延迟/专用资源需求 |
| 默认选项 | ✅ 新仓库默认 | 需显式选择 |

## 业务用途

### Functions 的 8 大使用场景

| # | 场景 | 示例 | 工具集成 |
|---|------|------|---------|
| 1 | 返回对象集/变量值 | 获取"高价值客户"列表 | Workshop Widget |
| 2 | 派生表格列 | 计算"订单利润率"派生列 | Workshop Function-backed Column |
| 3 | 聚合图表数据 | 按月统计销售额 | Workshop Chart 聚合层 |
| 4 | 复杂 Ontology 编辑 | 批量更新关联订单状态 | Action Type (Function-backed) |
| 5 | Slate 后端逻辑 | 返回前端展示信息 | Slate |
| 6 | 自定义指标/聚合 | 计算客户终身价值 (LTV) | Quiver |
| 7 | 外部系统查询 | 调用汇率 API 更新价格 | External Functions (Webhook) |
| 8 | Pipeline Builder 侧车 | Python 脚本丰富管道数据 | Pipeline Builder |

### TypeScript v2 优势示例

```typescript
// TypeScript v2 Function — 使用 OSDK 直接操作 Ontology
import { Product, Supplier } from "@ontology/sdk";
import { Edits } from "@osdk/functions";

export async function enrichProductInfo(productId: string): Promise<void> {
  const product = await Product.fetchOne(productId);
  const supplier = await product.fetchLinked("supplier");
  
  // 调用外部 API 丰富产品数据
  const marketData = await fetch(`https://api.example.com/market/${product.category}`);
  const data = await marketData.json();
  
  // 写入 Ontology
  await Edits.update(product, {
    marketTrend: data.trend,
    competitorPrice: data.avgPrice,
    enrichedAt: new Date().toISOString()
  });
}
```

## 外贸应用

### LILIS Functions 映射

| Foundry Function | LILIS 等效 | 实现方式 |
|-----------------|-----------|---------|
| P4P Budget Check | Google Cloud Function | 定时检查预算 → 超阈值推送通知 |
| Inquiry Classifier | AWS Lambda + AI | 新询盘 → GPT分类 → 标记优先级 |
| Product Health Score | Python Script (cron) | 多维度加权计算 → 写入 Google Sheets |
| Order Risk Alert | Zapier / webhook | 高风险订单 → Slack 通知 |
| Competitor Price Monitor | Scheduled script | 竞品价格爬虫 → 差异分析 |

### LILIS Functions 设计指南

1. **幂等性**：所有写入操作的 Function 必须支持重复调用
2. **超时处理**：Alibaba API 可能不稳定——添加重试 + 超时机制
3. **版本管理**：每次重大逻辑变更应作为新版本发布
4. **可观测性**：记录每次 Function 调用的输入/输出/耗时

## 常见问题

**Q: AIP Logic vs TypeScript vs Python 应该选哪个？**
A: AIP Logic 适合简单逻辑和 AI 驱动的决策流；TypeScript v2 适合需要 OSDK 和外部 API 调用的场景；Python 适合数据科学场景和 Pipeline Builder 集成。推荐 TypeScript v2 或 Python。

**Q: Serverless 函数的冷启动会影响性能吗？**
A: 会有毫秒级冷启动延迟。对于 Workshop 交互场景，通常可接受。如需亚毫秒级延迟，用 Deployed。

**Q: Functions 能和外部系统交互吗？**
A: TypeScript v1/v2 支持 Webhook 调用。TypeScript v2 和 Python 支持外部 API 调用（HTTP）。AIP Logic 不支持外部调用。

**Q: LILIS 如何实施 Function-backed Actions？**
A: 将复杂的多步 Ontology 操作封装为 Alibaba API Wrapper 中的"复合操作"方法。例如 `Product.delist_and_relist()` 方法内部执行：下架 → 修改 → 重新上架 → 验证。

## 相关链接
- [[开发者工具链总览]] — 完整工具链
- [[OSDK深度]] — OSDK 与 Functions 协作
- [[AI-FDE完整架构]] — Functions 在 AI-FDE 中的角色
- [[动力层与写回]] — Ontology Actions 与 Functions
- [[LILIS数据模型v2]] — LILIS 数据模型
- [[Code-Workspaces与MCP]]
- [[主页]]
- [[术语索引]]
