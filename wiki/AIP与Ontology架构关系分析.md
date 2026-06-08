---
tags: [Architecture, AIP, Ontology, Palantir-AIP, 架构分析, Sense-Reason-Act]
created: 2026-05-21
source: "Synthesis of Rounds 1-14 deep research"
---
# AIP 与 Ontology 架构关系分析

## 核心论题

> **Ontology 是 AIP 的"脊柱"，AIP 是 Ontology 的"大脑"。** 没有 Ontology，AIP 是无根之木——AI 决策不知道操作什么对象。没有 AIP，Ontology 是沉睡的数据资产——有完整的业务实体描述但没有智能决策能力。

## 各自提供什么服务

### Ontology 提供的服务：操作层

```
Ontology 不是数据仓库——它是业务语义的数字孪生
┌─────────────────────────────────────────────┐
│              ONTOLOGY 操作层                 │
│                                              │
│  ┌─────────── Semantic（语义）─────────────┐ │
│  │ Object Types   → "产品"、"订单"是什么   │ │
│  │ Properties     → 它们有什么属性          │ │
│  │ Link Types     → 它们如何关联           │ │
│  │ Interfaces     → 不同对象共享的形状      │ │
│  └─────────────────────────────────────────┘ │
│  ┌─────────── Kinetic（动力）──────────────┐ │
│  │ Actions        → 可以执行什么操作        │ │
│  │ Functions(FOO) → 可以计算什么派生值      │ │
│  │ Automations    → 何时自动触发什么        │ │
│  └─────────────────────────────────────────┘ │
│                                              │
│  底层连接：Backing Datasource → 实际数据    │
│  消费工具：Workshop / Slate / Quiver / ...  │
└─────────────────────────────────────────────┘
```

**Ontology 的核心职责**：将分散在数据库/API/Excel 中的原始数据转化为**业务人员可直接理解和操作**的数字孪生。

### AIP 提供的服务：智能层

```
AIP 不是单纯的 ML 平台——它是嵌入在 Ontology 之上的 AI 决策引擎
┌─────────────────────────────────────────────┐
│                  AIP 智能层                  │
│                                              │
│  ┌─────── Reasoning（推理）────────────────┐ │
│  │ AIP Logic Blocks → LLM 驱动的决策链     │ │
│  │   · 读取 Ontology 对象 → 理解上下文     │ │
│  │   · 调用 Functions → 复杂计算          │ │
│  │   · 执行 CoT 推演 → 多步推理           │ │
│  │   · 写入 Ontology → 结果沉淀           │ │
│  └─────────────────────────────────────────┘ │
│  ┌─────── Modeling（建模）─────────────────┐ │
│  │ Model Studio → ML 模型全生命周期        │ │
│  │   · Train: Ontology 数据作为训练集      │ │
│  │   · Serve: 模型部署到 Ontology 动作链   │ │
│  │   · Monitor: 模型指标回到可观测体系     │ │
│  └─────────────────────────────────────────┘ │
│  ┌─────── Engineering（工程）──────────────┐ │
│  │ AI-FDE → 闭环开发范式                    │ │
│  │   · Closed-Loop: 执行→观察→调整→迭代   │ │
│  │   · Skills: 可复用能力单元              │ │
│  │   · Global Branching: 安全实验隔离      │ │
│  └─────────────────────────────────────────┘ │
│  ┌─────── Evaluation（评估）───────────────┐ │
│  │ Evals → 模型质量保证                     │ │
│  │   · Accuracy / Precision / Recall       │ │
│  │   · Groundedness / Factuality          │ │
│  │   · Variance Analysis 一致性检验        │ │
│  └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

**AIP 的核心职责**：在 Ontology 提供的业务上下文之上，增加 AI 驱动的**感知、推理、决策和行动**能力。

## 核心关联：Sense → Reason → Act 范式

这是 AIP 与 Ontology 协作的**灵魂模式**。Ontology 提供"能感知什么"和"能做什么"，AIP 提供"如何推理"。

```
┌──────────────────────────────────────────────────────────────┐
│                  Sense → Reason → Act                         │
│                                                               │
│  ┌──────────┐     ┌──────────┐     ┌──────────┐              │
│  │  SENSE   │ ──► │  REASON  │ ──► │   ACT    │              │
│  │  感知    │     │  推理    │     │  行动    │              │
│  └──────────┘     └──────────┘     └──────────┘              │
│       │                │                 │                    │
│       ▼                ▼                 ▼                    │
│  ┌────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │  ONTOLOGY  │  │     AIP      │  │   ONTOLOGY   │         │
│  │  提供输入  │  │  负责推理    │  │  接收输出    │         │
│  │            │  │              │  │              │         │
│  │ Object     │  │ AIP Logic    │  │ Actions      │         │
│  │ Object Set │  │ Model        │  │ Functions    │         │
│  │ Links      │  │ CoT Chains   │  │ Automations  │         │
│  │ Properties │  │ Live Models  │  │              │         │
│  └────────────┘  └──────────────┘  └──────────────┘         │
│                                                               │
│  Ontology = 数据接口层（AI 看什么 + AI 写哪里）               │
│  AIP      = 推理引擎层（AI 怎么想 + AI 做什么）               │
└──────────────────────────────────────────────────────────────┘
```

### 三阶段详解

| 阶段 | 英文 | 谁提供能力 | 具体行为 | 举例（LILIS P4P） |
|------|------|-----------|---------|------------------|
| **Sense** | 感知 | **Ontology** 提供数据 | 读取对象/属性/链接/时序数据 | 读取 `P4P_Campaign` 对象的 `ctr`/`budget_remaining`/`linked keywords` |
| **Reason** | 推理 | **AIP** 提供智能 | LLM分析+CoT推演+ML模型预测+条件判断 | GPT 分析："CTR 下降 15% + 预算消耗加速 → 竞品可能加价了" |
| **Act** | 行动 | **Ontology** 提供操作 | 执行 Action / 调用 Function / 触发 Automation | `Action: AdjustBid` 降低 20% 出价 + `Notification: Slack` 告警 |

## 整体架构上的协作机制

### 协作全景图

```
                        ┌─────────────────────────────────────┐
                        │         AIP Intelligent Layer         │
                        │                                        │
                        │  ┌─────────────────────────────┐     │
                        │  │ AIP Logic (LLM Reasoning)   │     │
                        │  │  ↑ 读取 Ontology ──────┐    │     │
                        │  │  ├  CoT 推理链          │    │     │
                        │  │  ├  Model 调用         │    │     │
                        │  │  └ 结果写入 Ontology ──┘    │     │
                        │  └─────────────────────────────┘     │
                        │  ┌─────────────────────────────┐     │
                        │  │ AI-FDE (Closed-Loop)         │     │
                        │  │  ├ Model Studio 训练         │     │
                        │  │  ├ Skills 封装能力           │     │
                        │  │  └ Global Branching 隔离     │     │
                        │  └─────────────────────────────┘     │
                        │  ┌─────────────────────────────┐     │
                        │  │ Workshop AIP Widgets         │     │
                        │  │  ├ AIP Analyst (探索分析)     │     │
                        │  │  ├ AIP Chatbot (对话交互)    │     │
                        │  │  └ Gen Content (内容生成)    │     │
                        │  └─────────────────────────────┘     │
                        └──────────┬───────────────────────────┘
                                   │ 双向读写
                                   ▼
┌───────────────────────────────────────────────────────────┐
│              ONTOLOGY Operational Layer                     │
│                                                              │
│  Semantic         Kinetic           Consumer Tools            │
│  ─────────        ───────           ──────────────            │
│  Object Types     Actions           Object Explorer          │
│  Properties       Functions(FOO)    Quiver                   │
│  Link Types       Automations       Workshop                 │
│  Interfaces                         Slate                    │
│                                     Vertex / Notepad / ...   │
└───────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌───────────────────────────────────────────────────────────┐
│  DATA Layer ── Pipeline Builder / Datasets / Code Repos     │
└───────────────────────────────────────────────────────────┘
```

**关键点**：AIP 不直接操作底层数据——它始终通过 Ontology 作为唯一接口。

### 9 个集成触点

AIP 和 Ontology 不是"两层独立系统"，而是在多个层面深度交织：

| # | 集成触点 | AIP 侧 | Ontology 侧 | 协作方式 |
|---|---------|--------|------------|---------|
| 1 | **对象读写** | AIP Logic Block 读取 `Object Set` | Object Types 暴露结构化数据 | AIP 通过 Ontology SDK 读取对象 |
| 2 | **推理写入** | AIP Logic 推导结果 | Actions 接收写操作 | Logic Block → Action: 写入推导结果 |
| 3 | **函数调用** | AIP Logic 调用 Functions | Functions (FOO) 提供计算能力 | Logic Block → FOO → 返回值 → 后续 Block |
| 4 | **模型训练** | Model Studio 训练 ML 模型 | Ontology 对象作为训练数据集 | Object Set → Model Training → Live Model |
| 5 | **模型部署** | Live Model 上线 | Workshop Widget 调用 | Workshop Widget → AIP Chatbot → Live Model → Ontology Objects |
| 6 | **自动化触发** | Automations 条件判断 | Ontology 对象变化触发 | Object Data Condition 满足 → Logic Effect → 读/写 Ontology |
| 7 | **Widget 消费** | AIP Widgets (Analyst/Chatbot) | Workshop 中绑定 Ontology 对象 | 用户在 Workshop 中选择对象 → AIP Widget 分析 |
| 8 | **可观测性** | AIP Observability 监控 | 所有 Ontology 工作流被追踪 | AIP 操作 → FTS → Metrics → AIP Observability Dashboard |
| 9 | **评估闭环** | Evals 评估模型质量 | Ontology 对象作为评估基准 | Ground Truth (Ontology Object) vs Model Output → Evals Score |

### 三种核心协作流

**Flow 1: 推理驱动操作（AIP Logic → Ontology Actions）**

```
Step 1: AIP Logic Block 读取 Ontology
        client.ontology.objects.Product.where(status=="active").fetchPage()
        
Step 2: CoT 推理链
        产品 LIL-0001 CTR下降 15% → 可能是竞品加价 → 建议降价 10%
        产品 LIL-0002 曝光上升 200% → 可能是热门节日 → 建议增投
        
Step 3: 推理结果写入 Ontology
        Action: Product.applyAction("adjustBid", {productId, newBid})
        Action: Product.applyAction("updateTag", {productId, tag: "节日热门"})
```

**Flow 2: 模型驱动预测（Model Studio → Ontology → Workshop）**

```
Step 1: Model Studio 训练
        Object Set: 历史询盘数据（产品/买家/报价/转化）
        Model: 询盘转化概率预测 (XGBoost)
        
Step 2: 模型部署为 Live Model → 注册为 FOO
        Function: predictInquiryConversionRate(inquiry: Inquiry) → float
        
Step 3: Workshop 消费
        Widget: AIP Analyst 自动分析每个询盘的转化概率
        运营人员看到红色标签："高转化询盘 → 请优先回复"
```

**Flow 3: 自动化智能决策（Automations → AIP Logic → Actions）**

```
Automation Condition: Object Data — "产品星级 < 4.0"
    ↓
AIP Logic Effect:
  1. 读取该产品的全部评价文本 (Ontology Links: Product → Reviews)
  2. LLM 分析：负面评价集中在"发货速度"和"包装破损"
  3. CoT 推理：发货延迟 → 检查供应商产能；包装问题 → 检查物流商
  4. 输出诊断报告
    ↓
Action Effects:
  1. 更新产品 Status → "待审核"
  2. 创建供应商产能检查 Task
  3. Notification: Slack #ops → "产品 LIL-0001 星级降至 3.8，AIP 诊断完成"
```

## 外贸应用：LILIS 的 AIP+Ontology 等效实现

### LILIS 没有 Foundry 实例，如何在 Alibaba 上构建等效架构？

```python
# LILIS AIP-on-Ontology 等效架构
# =========================================================

# ─── Ontology 等效层：LILIS Data Model ───
class LILIS_Ontology:
    """Ontology = 业务对象的标准化表示"""
    
    class Product:
        """Object Type: Product"""
        def fetch_one(self, product_id): ...
        def where(self, **filters): ...
        def get_linked(self, link_name): ...  # Product → P4P / Inquiry
    
    class P4P_Campaign:
        """Object Type: P4P Campaign"""
        @property
        def ctr(self): ...       # 点击率
        @property
        def budget(self): ...    # 预算
    
    class Inquiry:
        """Object Type: Inquiry"""
        def classify(self): ...  # 分类
    
    # 动力层
    class Actions:
        def adjust_bid(self, campaign_id, new_bid): ...
        def delist_product(self, product_id): ...
        def mark_priority(self, inquiry_id, priority): ...

# ─── AIP 等效层：LLM + ML Decision Engine ───
class LILIS_AIP:
    """AIP = 基于 Ontology 数据的智能决策"""
    
    def sense(self, ontology: LILIS_Ontology):
        """Sense: 从 Ontology 读取当前状态"""
        campaigns = ontology.P4P_Campaign.where(status="active")
        for c in campaigns:
            c.products = c.get_linked("products")
            c.inquiries = c.get_linked("inquiries")
        return campaigns
    
    def reason(self, sensed_data):
        """Reason: LLM + ML 推理"""
        prompt = f"""
        分析以下 P4P Campaign 表现：
        {sensed_data}
        如果 CTR 下降>10% 且预算消耗加速，建议降低出价。
        如果曝光上升>50%，建议增加预算。
        """
        decisions = gpt4.analyze(prompt)  # LLM 推理
        decisions += ml_model.predict_conversion(sensed_data)  # ML 预测
        return decisions
    
    def act(self, ontology: LILIS_Ontology, decisions):
        """Act: 通过 Ontology Actions 执行决策"""
        for d in decisions:
            ontology.Actions.adjust_bid(d.campaign_id, d.new_bid)
            ontology.Actions.mark_priority(d.inquiry_id, d.priority)
        return {"actions_taken": len(decisions)}

# ─── Sense → Reason → Act 一次完整调用 ───
lilis = LILIS_AIP()
data = lilis.sense(LILIS_Ontology())      # Ontology 提供输入
decisions = lilis.reason(data)            # AIP 提供推理
result = lilis.act(LILIS_Ontology(), decisions)  # Ontology 接收输出
```

### 关键依赖：没有 Ontology 就没有 AIP

| 如果 Ontology 缺失 | AIP 将失去 |
|-------------------|-----------|
| 没有 Object Types 定义 | 不知道操作什么——"产品"和"订单"都分不清 |
| 没有 Link Types | 不知道谁关联谁——"这个询盘属于哪个产品？" |
| 没有 Actions | 推理结果无处写入——"分析了 CTR 但无法调价" |
| 没有 Interfaces | 无法对不同类型对象做统一分析——"Product 和 Campaign 的 CTR 无法同图对比" |

| 如果 AIP 缺失 | Ontology 将失去 |
|-------------|---------------|
| 没有 AIP Logic | 只能被动展示数据，无法主动分析 |
| 没有 Model Studio | 无法学习历史模式 → 每个新场景都从零开始 |
| 没有 AI-FDE | 改进靠试错，没有闭环迭代机制 |
| 没有 Evals | 决策质量无保证——不知道模型是否退化了 |

## 总结：架构分层与协作模型

### 三层能力模型

```
┌─────────────────────────────────────────────────────┐
│  L3：AIP 智能决策层                                    │
│  "看什么 + 怎么想 + 做什么"                             │
│  AIP Logic / Model Studio / AI-FDE / Evals           │
│  Sense → Reason → Act                                │
├─────────────────────────────────────────────────────┤
│  L2：Ontology 操作语义层                               │
│  "有什么 + 怎么关联 + 能怎么操作"                       │
│  Object Types / Properties / Links / Actions / FOO  │
├─────────────────────────────────────────────────────┤
│  L1：Data 物理数据层                                   │
│  "数据在哪里 + 怎么流"                                  │
│  Pipeline Builder / Datasets / Code Repos           │
└─────────────────────────────────────────────────────┘

依赖方向：L3 → L2 → L1（上层依赖下层）
数据方向：L1 → L2 → L3 → L2（数据从底层流入，决策流回中层执行）
```

### 类比理解

| 概念 | 类比 | 角色 |
|------|------|------|
| **Ontology** | 人体的**神经系统 + 肌肉系统** | 感知外部信息 + 执行运动指令 |
| **AIP** | 人体的**大脑皮层** | 分析感知信息 + 做出决策 |
| **Sense** | 眼睛看到物体的**视觉信号** | Ontology 提供结构化数据给 AIP |
| **Reason** | 大脑分析"这是危险吗？**该怎么办？**" | AIP Logic + Model 推理 |
| **Act** | 大脑发指令给肌肉 → **伸手或跑开** | AIP 决策 → Ontology Actions 执行 |

## 常见问题

**Q: 可以用 AIP 而不建 Ontology 吗？**
A: 不能。AIP Logic Blocks 的输入必须是 Ontology Object Set；AIP Actions 的写入目标必须是 Ontology Actions。Ontology 是 AIP 的**唯一数据接口**。

**Q: 可以只用 Ontology 不用 AIP 吗？**
A: 可以。大量 Foundry 用户只构建 Ontology 来支持 Workshop/Slate/Quiver 等操作应用，而不启用 AIP。但这样的系统只能**展示和手动操作数据**，无法进行 AI 驱动的推理。

**Q: AIP 的推理质量取决于 Ontology 的质量吗？**
A: 完全取决于。Ontology 的 Object Types 定义得越清晰、Link Types 建立得越完整、Properties 标注得越准确，AIP 在 Sense 阶段获得的上下文就越丰富，Reason 阶段推理就越准确。垃圾 Ontology → 垃圾 AIP 输出。

**Q: LILIS 如何平衡 Ontology 建设和 AIP 建设的优先级？**
A: 优先 Ontology（标准化数据模型 + 建立关联），再 AIP（在标准化的 Ontology 上增加推理）。具体节奏：
- Phase 1：建立 Product / P4P / Inquiry / Order 四大核心 Object Types 及其 Links
- Phase 2：在标准化的 Ontology 上构建第一个 AIP Logic Flow（如"P4P 智能调价顾问"）
- Phase 3：扩展 AIP 能力（Model Studio 训练转化预测模型、Evals 建立质量闭环）

**Q: Sense→Reason→Act 是一次性的还是持续循环的？**
A: 持续循环。Act 执行后 → Ontology 状态变化 → 触发新的 Sense → Reason → Act。这就是 AI-FDE 的 Closed-Loop 本质。

## 相关链接
- [[Ontology深度总览]] — Ontology 完整定义
- [[AIP概念总览]] — AIP 核心概念
- [[AI-FDE完整架构]] — Closed-Loop 闭环详解
- [[动力层与写回]] — Actions 与 Functions 详解
- [[开发者工具链总览]] — OSDK 连接 AIP 与 Ontology
- [[Observability总览]] — AIP Observability 监控
- [[LILIS数据模型v2]] — LILIS Ontology 设计
- [[AIP+Ontology产品增强分析]]
- [[AIP跨境运营中枢-商业系统架构]]
- [[AI搜索对传统电商的冲击]]
- [[LILIS双轨实施计划-数据驱动正反馈循环]]
- [[主页]]
- [[态势感知系统-OODA循环与经验积累]]
- [[术语索引]]
