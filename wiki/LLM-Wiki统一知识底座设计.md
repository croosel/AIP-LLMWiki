---
tags: [LLM Wiki, 知识底座, 数据层, 规则层, 数据联动, RAG]
created: 2026-05-22
source: "v2/v3 可行性分析报告 + Andrej Karpathy LLM Wiki 概念"
---

# LLM Wiki 统一知识底座设计

> **核心命题**: 不要 RAG + 向量数据库 + 独立知识库。用 LLM Wiki 作为唯一底座，规则层和店铺数据层在同一个 Wiki 内[[双向链接]]交叉引用

---

## 一、为什么不是传统 RAG

| 传统 RAG | LLM Wiki |
|----------|----------|
| 向量检索可能返回无关片段 | Agent 直接读取结构化 Wiki 页面 |
| 知识是"搜索"出来的 | 知识是"推理"出来的 |
| 店铺数据和规则知识分别存储 | 同在一个 Wiki，[[双向链接]] 联动 |
| 需要独立向量数据库、索引管理 | 纯 Markdown，零基础设施 |

**关键差异**: 问"为什么 P4P ROI 低"时，Agent 沿链接链遍历：产品页 → P4P 关键词页 → 出价策略页 → 诊断结论。这是**查询 + 推理**，不是关键词匹配。

---

## 二、Wiki 四层结构

```
LLM Wiki/
├── 公共规则层（厂商知识，不需要用户数据）
│   ├── Alibaba排序逻辑.md
│   ├── 商品等级体系.md
│   ├── P4P投流完整方法论.md
│   ├── 商家星等级.md
│   ├── 全站推与智能推广.md
│   ├── 实战避坑指南.md
│   └── ...（87 页已有 Wiki）
│
├── 店铺数据层（用户私有数据，Agent 自动维护）
│   ├── Store-Overview.md          ← 店铺总览（星等级 + 曝光/点击/询盘趋势）
│   ├── Product-List.md            ← 全量产品表（等级/价格/销量/转化）
│   ├── P4P-Campaigns.md           ← 广告计划详情（词/出价/花费/转化）
│   ├── Inquiry-Log.md             ← 近期询盘记录
│   ├── Compliance-Status.md       ← 合规状态扫描结果
│   └── Diagnostic-History.md      ← 历史诊断记录（不重复回答）
│
├── 联动推理层（Agent 自然推理路径 → 以 [[双向链接]] 实现）
│   ├── [[Store-Overview]] → 星等级下降 → [[商家星等级]] 找因子
│   ├── [[Product-List]] → 低质品发现 → [[商品等级体系]] 晋级路径
│   └── [[P4P-Campaigns]] → ROI异常 → [[P4P投流完整方法论]] 诊断
│
└── 用户专属层（Session 学习记录）
    ├── User-Preferences.md        ← 用户偏好（哪些建议已采纳，哪些忽略）
    └── Q&A-History.md             ← 历史问答精华（Agent 自主学习）
```

---

## 三、数据层联动机制

**关键设计**：店铺数据层不是"手动导入的 CSV"，是 **Agent 自动维护的 Markdown**。

| 数据来源 | 同步方式 | 更新频率 | 存储位置 |
|---------|---------|---------|---------|
| 阿里国际站后台 API | MCP 连接器 | 每日自动 | Store-Overview.md |
| 店铺周报数据 | web_fetch / browser 抓取 | 每周 | 各数据层页面 |
| 卖家自然语言反馈 | 对话中提取 | 实时 | User-Preferences.md / Q&A-History.md |
| 公共规则变更 | web_search + 人工审核 | 规则变更时 | 公共规则层 |

```
[阿里国际站后台] ──MCP──→ [Agent 定时任务] ──写入──→ [LLM Wiki 数据层]
                                                          ↓
[用户提问] ──→ [Agent 读取 Wiki 数据层 + 规则层] ──→ [推理 + 建议]
```

---

## 四、Wiki → Ontology 映射

LLM Wiki 的结构化页面本身就是 Ontology 的"轻量级实现"：

| Ontology 概念 | Wiki 实现方式 |
|-------------|-------------|
| Object Types | Markdown 表格（Store / Product / P4PCampaign / Inquiry） |
| Link Types | `[[双向链接]]`（Product → P4PCampaign → Keyword → Cost） |
| Actions | Cron 任务 → read/write 工具 → 自动更新数据层 |
| Interfaces | 数据层页面标准化格式模板 |

这种"Wiki 模拟 Ontology"在不需要[[动力层与写回|Write-back]] 的 Phase 1 是完全够用的。深度分析见 [[AIP+Ontology产品增强分析]]。

---

## 五、与传统 RAG 的关键差异

### 推理示例对比

**问**："我 3 号产品 P4P ROI 为什么这么低？"

**RAG 方式**：
```
向量搜索 "P4P ROI 低" → 返回 3 段相关文本
  "P4P ROI 低通常是因为出价过高..." (通用知识，不是针对 3 号产品)
  "CPC 过高的常见原因是..." (通用建议)
  "如何优化 P4P 广告..." (不针对具体产品)
```

**LLM Wiki 方式**：
```
Agent 流程：
1. read Product-List.md → 定位 3 号产品
2. 发现 [[P4P-Campaigns]] → read → 找到该产品的广告详情
3. 发现 "wedding arch" 关键词：CPC=$1.50，30天零询盘
4. [[P4P投流完整方法论]] → 同行 CPC=$0.80
5. 结论："你 3 号产品在 'wedding arch' 词上出价 $1.50，同行均价 $0.80，且该词 30 天零转化。建议降到 $0.60 或暂停。"
```

**LLM Wiki 的优势**：每步推理可追溯（指向具体 Wiki 页面和行），结果是针对**这个店铺、这个产品**的具体诊断。

---

## 六、平台能力依赖

| 能力 | 状态 | 用途 |
|------|------|------|
| [[Accio-Work运营工具链|Accio Work Agent]] | ✅ | Agent 宿主，read/write Wiki |
| [[AIP-LLMWiki|LLM Wiki]] | ✅ | 知识底座，支持[[双向链接]] |
| MCP 连接阿里国际站 | ✅ | alibaba-* 工具拉数据 |
| Cron 定时任务 | ✅ | 自动同步到 Wiki 数据层 |
| Agent 配置导出 | ⚠️ 手动 | 交付给用户需手动复制 agent-core |

---

## 相关链接

- [[产品策略-国际站AI运营Agent]] — 产品整体定位
- [[AIP+Ontology产品增强分析]] — Wiki → Ontology 深度集成
- [[卖家痛点深度分析]] — Wiki 解决的核心痛点
- [[Skills技能集与60-40覆盖]] — Skills 如何读取 Wiki 数据
- [[Why-Ontology]] — Ontology 商业价值
- [[AIP跨境运营中枢-商业系统架构]]
- [[AIP跨境运营方法论-四阶段实施]]
- [[三阶段升级路径-Sense-Reason-Act]]
- [[主页]]
- [[生态系消长-AI搜索时代的竞争力转移]]
- [[经验累积与竞争壁垒]]
