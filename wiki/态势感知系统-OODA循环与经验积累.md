---
tags: [Palantir, AIP, Ontology, OODA, 态势感知, 经验积累, 竞争优势, LILIS]
created: 2026-05-21
source: "[[AIP与Ontology架构关系分析]], [[AI-FDE完整架构]], [[Sense-Reason-Act架构]]"
---
# 态势感知系统：OODA 循环与经验积累

## 定义

**态势感知系统 (Situational Awareness System)** 是对 AIP + Ontology 在 LILIS 业务中的重新定位：不是被动决策引擎，而是**主动感知市场变化 → 动态响应 → 累积经验 → 进化决策模型**的自适应系统。

```
传统定位: AIP + Ontology = 决策系统（Sense→Reason→Act）
重新定位: AIP + Ontology = 态势感知系统（Sense→Learn→Accumulate→Evolve）
```

> 参见 [[AIP与Ontology架构关系分析]] 了解基础架构

## 理论基础：John Boyd 的 OODA 循环

OODA（Observe-Orient-Decide-Act）是美军战略家 John Boyd 提出的决策框架，也是 Palantir 作为国防情报公司未曾明说的设计哲学：

| OODA 阶段 | 军事含义 | AIP + Ontology 等效 | LILIS 实例 |
|-----------|---------|--------------------|-----------|
| **Observe** | 感知战场态势 | Ontology 实时捕获市场数据 | P4P 曝光/CTR/询盘/订单实时流入 |
| **Orient** | 理解态势含义 | AIP Logic + Model 推理 | "曝光+200%=婚礼季前置流量?" |
| **Decide** | 形成决策 | Evals 验证 → 选择策略 | "增投 30% 还是维持?" |
| **Act** | 执行 + 观察结果 | Actions 写入 + Automations 触发 | 自动调价 + 监控新数据 |

Boyd 的核心论点：**OODA 的胜负不是靠单次决策的质量，而是靠循环速度。你的 OODA 每比对手多转一圈，对手就落后你一圈。**

## 四层架构：从数据到经验的进化

```
┌──────────────────────────────────────────────────┐
│  L4：经验层（Institutional Experience）             │
│  "过去 90 天里，婚礼季前 3 周加大投放的 ROI 最高"      │
│  高置信规则库 = 模式识别能力 = 护城河                 │
│  工具: 模式库 / 决策日志 / 胜率追踪                  │
├──────────────────────────────────────────────────┤
│  L3：学习层（AI-FDE Closed-Loop）                   │
│  执行 → 观察结果 → 反馈 → 调整参数 → 再执行           │
│  每次循环让下一次 Sense 更有针对性                     │
│  工具: Evals / A/B 对照 / 模型重训                   │
├──────────────────────────────────────────────────┤
│  L2：决策层（Sense → Reason → Act）                 │
│  Ontology 提供输入 → AIP 推理 → Actions 执行         │
│  工具: AIP Logic / Model Studio / Automations       │
├──────────────────────────────────────────────────┤
│  L1：数据层（Ontology 实时数据）                      │
│  P4P 曝光 / 点击 / 询盘 / 订单 / 售后                │
│  工具: Pipeline Builder / Dataset / Sync            │
└──────────────────────────────────────────────────┘

数据流向上: L1 → L2 → L3 → L4
决策流向下: L4 → L3 → L2 → L1（经验指导决策）
```

> 参见 [[Sense-Reason-Act架构]] · [[AI-FDE完整架构]]

## 经验积累的进化机制：三轮案例

以 LILIS 婚礼季为例，展示四层架构如何从零经验进化到自主决策：

### 第一轮：空白状态（无经验）

```
L1（Sense）：3 月 10 日，P4P 曝光突然上升 200%
L2（Reason）：不知道原因——季节性？竞品退出？平台流量波动？
L2（Decide）：不做任何调整（保守策略）
结果：错过第一波询盘
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
L3（Learn）：记录到模式库                                    ┃
  {                                                          ┃
    "日期": "3月10日",                                        ┃
    "信号": "曝光+200%, Q2",                                  ┃
    "决策": "不调整",                                         ┃
    "结果": "错失询盘",                                       ┃
    "置信度": "单次观察"                                      ┃
  }                                                          ┃
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
L4（Experience）：空 → 1 条待验证模式
```

### 第二轮：有了参考（1 次经验）

```
L1（Sense）：4 月 15 日，P4P 曝光再次上升 180%
L2（Orient）：匹配 L4 模式库 → 找到相似信号
  "3月事件：曝光+200% → Q2 婚礼季前置流量"
L2（Decide）：自动建议→人工确认→增加 P4P 预算 30%
L2（Act）：执行增投 + 开始监控
结果：询盘量跟随上升
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
L3（Learn）：升级模式                                        ┃
  {                                                          ┃
    "模式": "Q2婚礼季增投",                                   ┃
    "触发条件": "曝光>150% + Q2",                             ┃
    "动作": "增投30%",                                        ┃
    "胜率": "2/2 正确",                                      ┃
    "置信度": "中"                                           ┃
  }                                                          ┃
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
L4（Experience）：2 条模式，1 条中置信
```

### 第三轮以后：自主决策（高置信经验）

```
L1（Sense）：2027 年 Q2，P4P 曝光上升 170%
L2（Orient）：自动匹配 L4 "Q2婚礼季"规则（3/3 正确，高置信）
L2（Decide→Act）：无需人工确认——Automations 自动执行增投
结果：领先竞争对手 7 天进入婚礼季
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
L3（Learn）：规则锁定                                        ┃
  {                                                          ┃
    "模式": "Q2婚礼季增投",                                   ┃
    "胜率": "3/3 正确",                                      ┃
    "置信度": "高",                                          ┃
    "状态": "自动化执行（仅异常时人工介入）"                     ┃
  }                                                          ┃
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
L4（Experience）：护城河形成——对手仍在手动逐产品调整
```

## 竞争优势的数学本质

```
你的 OODA 循环:  ○→○→○→○→○→○→○  (7轮/季)
对手的循环:      ○→  →○→  →○      (3轮/季)

你第3轮的反应 → 基于第2轮的新数据
对手第2轮的反应 → 基于你第1轮的结果
→ 对手永远看到的是你的"上一轮状态"
→ 你每季比对手多看 4 轮市场变化
→ 4 轮差距 = 定价权 + 市场份额 + 买家心智
```

**经验层的价值公式**：

```
经验资产 = Σ (响应速度ᵢ × 决策准确度ᵢ)
           i=1→n

其中:
- 响应速度 = 信号出现到决策执行的时间（越小越好）
- 决策准确度 = 正确决策 / 总决策
- n = 循环次数（时间不可压缩）
```

**关键推论**：时间是不可压缩的变量。对手无法通过增加预算来追赶你的经验积累——他们只能从今天开始自己的 OODA 循环，而你已经有 n 轮领先。

## 外贸应用：LILIS 态势感知系统设计

### 五大感知域

| 感知域 | Ontology Object | 关键信号 | 触发响应 |
|--------|----------------|---------|---------|
| **需求感知** | P4P_Campaign.ctr + 曝光 | 曝光突增 >150% | 增投 / 新词测试 |
| **竞争感知** | Product.avg_position | 竞品加价→排名下降 20% | 防御性调价 / 差异化 Listing |
| **买家感知** | Inquiry.sentiment + 回复率 | 负面评价聚集 | 产品质量审查 / 供应商会议 |
| **季节感知** | Calendar Event + 历史模式 | Q2 婚礼季 / Q4 圣诞季 | 提前 3 周自动启动季节性策略 |
| **平台感知** | Store.health_score | 星等级下降 | 诊断根因 → 止血操作 |

### LILIS Python 等效实现框架

```python
class LILIS_SituationalAwareness:
    """四层态势感知系统"""
    
    def __init__(self):
        self.ontology = LILIS_Ontology()     # L1: 数据层
        self.decision_engine = AIP_Logic()   # L2: 决策层
        self.evals = EvalsTracker()          # L3: 学习层
        self.pattern_library = PatternDB()   # L4: 经验层
    
    def sense(self):
        """L1: 从 Ontology 捕获当前态势"""
        return {
            "p4p": self.ontology.P4P_Campaign.current_state(),
            "product": self.ontology.Product.health(),
            "inquiry": self.ontology.Inquiry.sentiment(),
            "platform": self.ontology.Store.health_score()
        }
    
    def orient_and_decide(self, state):
        """L2+L4: 匹配经验 + 推理 + 决策"""
        # 先查模式库（L4 经验）
        matching_patterns = self.pattern_library.match(state)
        
        if matching_patterns.high_confidence:
            # 高置信 → 自动执行，跳过人工
            return matching_patterns.recommended_action
        
        # 中等/低置信 → AIP 推理 + 人工确认
        reasoning = self.decision_engine.analyze(state)
        return reasoning.suggest(with_confidence=True)
    
    def act(self, decisions):
        """L2: 执行决策"""
        results = []
        for d in decisions:
            if d.confidence > 0.8:
                # 高置信：自动执行
                result = self.ontology.Actions.execute(d)
                results.append(result)
            else:
                # 低置信：推送人工确认
                self.notify_operator(d)
        return results
    
    def learn(self, results):
        """L3: 反馈闭环"""
        for r in results:
            # 对比决策 vs 实际结果
            accuracy = self.evals.compare(r.decision, r.outcome)
            # 更新模式库（L4）
            self.pattern_library.update(r.pattern_id, accuracy)
            # 如果准确度下降 → 触发模型重训
            if accuracy < 0.6:
                self.pattern_library.demote(r.pattern_id)
    
    def run_ooda_loop(self):
        """一次完整的 OODA 循环"""
        state = self.sense()             # Observe
        decisions = self.orient_and_decide(state)  # Orient + Decide
        results = self.act(decisions)    # Act
        self.learn(results)              # Observe（反馈）→ 下一轮
        return results
```

## 常见问题

**Q: OODA 和 Sense→Reason→Act 的关系是什么？**
A: Sense→Reason→Act 是 OODA 在 AIP 中的工程实现。OODA 更强调「循环速度和经验积累」，Sense→Reason→Act 更强调「单次决策流程」。完整系统 = OODA 驱动 Sense→Reason→Act 循环。

**Q: 经验积累需要多长时间才能形成护城河？**
A: 取决于市场变化频率。高频品类（如婚庆装饰，季节性明显）每一季可完成 3-5 轮有效 OODA 循环，6-8 季（约 2 年）可形成明显护城河。低频品类需要更长时间。

**Q: 如果没有 Foundry 实例，LILIS 如何实现 OODA？**
A: 用 Python + Cron + Streamlit 等效实现。核心不在平台，而在四层架构的设计思想：数据结构化（Ontology 等效）+ 推理引擎（GPT API）+ 反馈记录（Log 分析）+ 模式库（经验数据库）。

**Q: 自动化会不会放大错误决策？**
A: 这正是 L3 学习层和 L4 经验层的作用——只有高置信（>80% 胜率，≥3 次验证）的模式才允许自动化执行。新模式始终保留人工确认环节。这是 AI-FDE 的 Global Branching 思想的等效实现。

## 相关链接
- [[AIP与Ontology架构关系分析]] — 基础架构与 9 个集成触点
- [[AI-FDE完整架构]] — Closed-Loop 闭环详解
- [[Sense-Reason-Act架构]] — 三层执行模型
- [[Why-Ontology]] — 为什么 Ontology 是前提
- [[LILIS数据模型v2]] — LILIS Ontology 设计
- [[AI搜索对传统电商的冲击]]
- [[LILIS-AIP方法论-中小卖家AI增效实战手册]]
- [[LILIS双轨实施计划-数据驱动正反馈循环]]
- [[主页]]
- [[术语索引]]
