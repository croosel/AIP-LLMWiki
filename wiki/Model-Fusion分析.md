---
tags: [Model-Fusion, agentfw, OpenRouter, DRACO, 成本分析, 多模型]
created: 2026-06-17
source: "OpenRouter Model Fusion 文章分析 + DRACO 基準測試數據"
---

# Model Fusion 分析

> Model Fusion 是 OpenRouter 提出的多模型融合方案，透過 `agentfw` 本地代理實現多 LLM 並行調用與集成投票。這是 [[Scout-then-Swarm架構]] 的起點靈感來源，但經過深入分析後，其 ensemble voting 思路被證明存在根本性缺陷，最終演化為分工協作模式。

## 原始方案：OpenRouter Model Fusion

### 核心機制

OpenRouter 的 Model Fusion 透過一個名為 `agentfw` 的本地代理（localhost:9877）實現：

1. 用戶請求發送到 `agentfw` 代理
2. 代理將請求**同時**轉發給多個 LLM Provider
3. 各模型獨立生成回答
4. 代理使用集成投票（ensemble voting）融合結果
5. 返回最終答案

本質上是**冗餘式**多模型調用——多個模型做同一件事，再選最好的。

### DRACO 基準測試結果

OpenRouter 用 DRACO benchmark 評測了 Fusion 的效果：

| 方案 | DRACO 準確率 | 說明 |
|------|-------------|------|
| Budget Panel（Fusion 預算組） | 64.7% | 多個便宜模型融合 |
| Claude Fable 5（單模型） | 65.3% | 頂級單模型 |
| 差距 | 僅 0.6pp | Fusion 勉強追平頂級單模型 |

**關鍵發現**：用多個便宜模型融合，只能勉強追平頂級單模型，而非超越。

## 成本分析

### 每任務成本對比

| 方案 | 估算成本 / 任務 | 說明 |
|------|----------------|------|
| Model Fusion（Budget Panel） | ~¥0.000158 | 多個便宜模型並行 |
| Claude Fable 5（單模型） | ~¥0.00077 | 頂級模型 |
| 成本節省 | ~80% | Fusion 比 Fable 5 便宜 |

### 但成本的解讀有陷阱

表面上 Fusion 節省 80% 成本，但這個比較忽略了：

1. **延遲成本**：Fusion 需要等待所有模型返回（取最慢的），實際延遲可能更長
2. **品質成本**：Fusion 的 64.7% vs Fable 5 的 65.3%——便宜但稍差
3. **複雜度成本**：維護代理、處理多模型 API 差異、調試融合邏輯

## 關鍵批判：9 個根本性缺陷

深入分析後識別出 ensemble voting 模式的 9 個根本性問題，這些批判直接催生了 [[Scout-then-Swarm架構]] 的分工協作思路：

### 缺陷 1：Token 浪費

三個模型回答同一個問題再投票選最佳 = **浪費 2/3 的 token**。這不是成本優化，而是成本膨脹。

### 缺陷 2：分工 vs 投票的根本差異

Ensemble voting 的本質是**冗餘**（redundancy），而真正有價值的是**分工**（division of labor）。分工產出的最終結果，是任何單個模型都產不出的東西；投票產出的結果，不過是某一個模型本來就能產出的。

### 缺陷 3：模型能力未被利用

所有模型收到相同的 prompt，忽略了各模型在不同任務類型上的特長。例如讓 Kimi K2.7 做翻譯（中文理解強）和讓 DeepSeek V4 Pro 做翻譯（推理強但中文不是最強），是浪費了 Kimi 的優勢。

### 缺陷 4：投票機制無法處理分歧

當三個模型給出三個不同的答案時，簡單多數投票無法處理「2 錯 1 對但 1 的是少數派」的情況。在程式碼審查中，少數派的警報往往是正確的——bug 通常就是大多數人忽略的那個。

### 缺陷 5：沒有任務分解

Fusion 把整個任務原封不動地丟給每個模型，沒有拆解。這意味著每個模型都在做完整的任務，而不是各自做自己最擅長的部分。

### 缺陷 6：缺乏經驗學習

每次調用都是獨立的，沒有從歷史執行中學習。成功的分解模式不會被記錄，錯誤的策略不會被修正。

### 缺陷 7：沒有品質驗證

Fusion 融合結果後直接返回，沒有獨立的驗證步驟。如果所有模型都犯了同一個錯誤（common failure mode），融合也無法發現。

### 缺陷 8：延遲不可控

需要等待所有模型返回才能融合，最慢的模型決定整體延遲。沒有快速通道讓簡單任務跳過完整流程。

### 缺陷 9：與現有框架無差異化

`agentfw` 本質上是一個 API 代理，LangGraph + LiteLLM 可以實現相同功能且更靈活。沒有應用層的創新。

## 從 Ensemble 到 Division of Labor 的演化

這 9 個缺陷推動了思路的三次演化：

```
Ensemble Voting（Model Fusion 原始方案）
    │
    │ 發現：投票 = 冗餘，浪費 2/3 token
    ▼
Division of Labor（分工協作）
    │ 發現：分工需要決策機制來處理多路徑結果
    ▼
Bee Swarm Model（蜂群決策模型）
    │ 結合：偵查 → 搖擺舞 → 交叉驗證 → 法定人數
    ▼
Scout-then-Swarm 架構
```

詳見 [[Scout-then-Swarm架構]] 和 [[蜂群決策映射]]。

## agentfw 作為可選本地代理

儘管 Model Fusion 的 ensemble voting 思路被否定，`agentfw` 本身作為本地代理仍有其價值：

| 特性 | 說明 |
|------|------|
| 地址 | localhost:9877 |
| 功能 | 統一 API 入口，多模型路由 |
| 優勢 | 本地運行，低延遲，可攔截/修改請求 |
| 在 Scout-then-Swarm 中的定位 | **可選**，不作為核心依賴 |

Scout-then-Swarm 最終選擇了 **LiteLLM** 作為統一調用層，而非 `agentfw`。LiteLLM 提供更標準的 OpenAI-compatible API 封裝，且與 LangGraph 生態更相容。

## DRACO 數據的深層啟示

DRACO 基準測試的真正啟示不在於 Fusion 是否有效，而在於：

1. **便宜模型組合 ≈ 頂級單模型**：說明模型間的互補性確實存在，但 ensemble voting 不是利用這種互補性的最佳方式
2. **邊際效益遞減**：加更多便宜模型不會超越頂級單模型，因為它們犯的是類似的錯誤
3. **分工 > 投票**：如果讓每個模型做自己最擅長的部分（而非做相同的事），理論上可以超越單模型上限

這正是 [[多模型分工協作]] 的核心論點。

## 相關連結

- [[Scout-then-Swarm架構]] — 從 Model Fusion 分析中演化出的完整架構
- [[蜂群決策映射]] — 超越 ensemble voting 的蜂群決策機制
- [[多模型分工協作]] — 分工協作的技術實現與模型能力矩陣
- [[Context-Survivable-Agent模式]] — 多模型並行調用時的 Context 管理
- [[Agent并行架构]] — 並行執行的理論基礎與實證數據
- [[Agent-Handoff协议]] — 模型間的資訊交接標準
- [[Agent工作流协议]] — 經驗反饋閉環機制
