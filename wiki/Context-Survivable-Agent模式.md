---
tags: [Agent模式, Context管理, 並行執行, 經驗教訓, 多Agent協調]
created: 2026-06-17
source: "Scout-then-Swarm 多 Agent 執行實務 + 審稿蜂風險分析"
---

# Context-Survivable Agent 模式

> 在多 Agent 並行執行中，Orchestrator 的 context window 是最脆弱的資源。當 context 耗盡觸發 compaction 時，所有進行中的 Agent 狀態都可能瞬間消失。本頁面記錄了這一關鍵問題的根因分析和五條生存規則。

## 問題：Context 視窗耗盡殺死進行中的 Agent

多 Agent 系統有一個反直覺的致命弱點：**不是 Agent 本身會失敗，而是管理 Agent 的 Orchestrator 會因為 context window 耗盡而崩潰**，連帶殺死所有正在執行的子 Agent。

### 事件還原

在 [[Scout-then-Swarm架構]] 的四蜂協作過程中，Orchestrator 同時管理 4 個並行 Agent（偵查蜂、建築蜂、工程蜂、審稿蜂）。隨著各 Agent 產出大量中間結果，Orchestrator 的 context window 快速膨脹：

1. 每個 Agent 的產出被回傳到 Orchestrator 的 context 中
2. 4 個 Agent 同時產出，context 消耗速度是單 Agent 的 4 倍以上
3. Context window 達到上限，系統觸發 **compaction**（上下文壓縮）
4. Compaction 過程中，**3/4 的 Agent 產出被丟失**
5. 只有最後一個 Agent 的結果倖存

結果：大量計算資源（token、時間、API 調用）被浪費，因為 Agent 的產出沒有被持久化。

### 根因分析

**Orchestrator context = volatile memory。**

| 特性 | Volatile Memory（RAM） | Orchestrator Context |
|------|----------------------|---------------------|
| 斷電丟失 | ✅ | ✅ Context compaction 丟失 |
| 容量有限 | ✅ | ✅ Context window 有硬上限 |
| 寫入速度 | 快 | 受 API 限制 |
| 持久化 | 需要明確 write-through | 需要明確持久化 |

關鍵問題：預設行為是**所有 Agent 產出回傳到 Orchestrator 的 context 中**。這意味著：

- Agent 越多 → context 消耗越快
- Agent 產出越大 → context 越快達到上限
- Compaction 是不可預測的 → 無法提前準備

這個模式與 [[Agent并行架构]] 中的 3-Phase 流水線有直接關聯：Phase 2 的 N 個並行 Agent 產出如果全部回到 Phase 1 主 Agent 的 context 中，同樣會觸發此問題。

## 五條生存規則

### Rule 1: Write-Through（直寫持久化）

**每個 Agent 的產出必須即時寫入持久化存儲，而非回傳到 Orchestrator context。**

```
❌ 錯誤模式：
Agent 產出 → Orchestrator context → (compaction → 丟失)

✅ 正確模式：
Agent 產出 → 檔案系統 / DB → Orchestrator 只收到摘要引用
```

在 Scout-then-Swarm 中，這對應經驗庫的 write-through 機制：
- Worker Bee 的完整產出寫入 SQLite 經驗庫
- Orchestrator 只保留 `subtask_id` + 摘要 + 置信度
- 需要完整內容時，從經驗庫按需讀取

### Rule 2: Thin Orchestrator（薄 Orchestrator）

**Orchestrator 的 context 應該盡可能薄，只保留必要的協調資訊。**

Orchestrator context 中應該有的：

| 應該有 | 不應該有 |
|--------|---------|
| 任務描述（原始輸入） | Worker 的完整產出 |
| 子任務 ID 列表 | Worker 的中間推理過程 |
| 各子任務狀態（running/done/failed） | 歷史對話記錄 |
| 路由決策結果 | 完整的經驗庫搜尋結果 |
| 最終融合結果的引用 | 所有驗證的完整報告 |

審稿蜂的致命風險 O1（Orchestrator 單點故障）進一步強化了這條規則：Orchestrator 做的事越少，它的 context 壓力越小，出錯的概率越低。這也是模板匹配取代自由分解的核心原因——分類比自由生成消耗的 context 少一個數量級。

### Rule 3: Checkpoint State（檢查點持久化）

**每個階段結束後，將完整狀態寫入 checkpoint，而非依賴 context 中的隱式狀態。**

在 Scout-then-Swarm 的三種執行模式中，[[蜂群決策映射]] 的 Checkpoint 模式直接體現了這條規則：

```python
class Checkpoint:
    """Pipeline/Checkpoint 模式下的階段驗證點。"""
    MAX_RETRIES = 2

    def validate(self, stage_output, task_spec, strategy):
        # 1. 將 stage_output 持久化到檔案
        persist_to_disk(stage_output)

        # 2. 驗證
        checks = [self._run_check(c, stage_output) for c in strategy["checks"]]
        passed = all(r.passed for r in checks)

        if not passed and self.retry_count < self.MAX_RETRIES:
            return CheckpointResult(passed=False, retry=True,
                                    feedback=[r for r in checks if not r.passed])
        return CheckpointResult(passed=passed)
```

Checkpoint 的核心不是「驗證」，而是**持久化**。即使 Orchestrator context 被 compaction，checkpoint 檔案仍在。

### Rule 4: Direct-Write to Final Location（直寫最終位置）

**Agent 的產出應該直接寫入最終目的地，而非經過 Orchestrator 中轉。**

```
❌ 錯誤模式：
Worker Bee → 產出回傳 Orchestrator → Orchestrator 寫入最終位置

✅ 正確模式：
Worker Bee → 直接寫入最終位置 → 通知 Orchestrator "已完成，路徑: /path/to/output"
```

在 Scout-then-Swarm 中的應用：
- Worker Bee 的完整產出直接寫入 `data/outputs/{subtask_id}.json`
- Orchestrator 只收到 `{ "subtask_id": "st_1", "status": "done", "output_path": "data/outputs/st_1.json", "confidence": 0.85 }`
- Synthesizer 按需從檔案讀取，不依賴 Orchestrator context

這也呼應了 [[Agent并行架构]] 的關鍵約束：「每個 Agent 輸出獨立檔案」。Phase 2 的 5 個並行 Agent 各自寫入獨立檔案，Phase 3 的主 Agent 從檔案讀取，而非從 context 讀取。

### Rule 5: Budget Context（Context 預算制）

**為每個 Agent 和整個系統設定 context 預算，主動控制而非被動 compaction。**

Scout-then-Swarm 的延遲預算本質上也是 context 預算：

| 階段 | Token 預算 | 說明 |
|------|-----------|------|
| Scout（分解） | ~500 tokens out | 模板匹配，不需要大量生成 |
| Worker（單個） | max_tokens = 4096 | 配置檔中明確限制 |
| Verify（驗證） | ~1000 tokens out | 結構化檢查，非自由生成 |
| Fuse（融合） | ~2000 tokens out | 加權融合，有明確格式 |
| **子任務上限** | **<= 8 個** | 超過 = 過度分解，context 爆炸 |

子任務數量上限（<= 8）不僅是分解品質的約束，也是 context 預算的體現：8 個子任務 × 4096 tokens = 32768 tokens，加上 Orchestrator 本身的 context，不會超過任何模型的 context window。

## 恢復協議

當 context compaction 已經發生、Agent 產出已經丟失時，需要恢復協議：

### Step 1: 評估損失

```python
def assess_damage(checkpoint_dir: str, expected_subtasks: list[str]):
    """檢查哪些子任務的產出倖存了。"""
    survived = []
    lost = []
    for st_id in expected_subtasks:
        path = f"{checkpoint_dir}/{st_id}.json"
        if os.path.exists(path):
            survived.append(st_id)
        else:
            lost.append(st_id)
    return survived, lost
```

### Step 2: 只重做丟失的

不要重新執行整個任務。只重新調用丟失的子任務，並利用 checkpoint 中已有的結果。

### Step 3: 降級鏈

Scout-then-Swarm 定義了完整的降級鏈：

```
完整 Swarm/Checkpoint/Pipeline
    │ (某子任務失敗 2 次)
    ▼
跳過失敗子任務 + 標記缺口
    │ (缺口導致後續也失敗)
    ▼
降級到 Pipeline 模式
    │ (Pipeline 也失敗)
    ▼
降級到 Fast-Track（單模型嘗試）
    │ (單模型也失敗)
    ▼
返回錯誤 + 記錄負面經驗 + 通知用戶
```

### Step 4: 記錄教訓

將 compaction 事件記錄到經驗庫，標記為 `outcome: "failure"`，`lesson: "context_compaction"`。後續遇到類似規模的任務時，系統會自動選擇更保守的執行模式。

## 與 Agent 並行架構的關聯

[[Agent并行架构]] 的 3-Phase 流水線已經隱含了 Context-Survivable 的設計：

| 3-Phase 約束 | Context-Survivable 對應 |
|-------------|----------------------|
| 切分點唯一（Phase 1 JSON 是唯一分發點） | Rule 2: Thin Orchestrator |
| 每個 Agent 入參獨立 | Rule 4: Direct-Write |
| 每個 Agent 輸出獨立檔案 | Rule 1: Write-Through |
| Phase 3 聚合驗證 | Rule 3: Checkpoint State |
| 按產品拆 5 Agent，牆鐘 ↓80% | Rule 5: Budget Context（5 個 Agent 的產出量可控） |

關鍵洞察：**並行度越高，context 管理越重要**。5 路並行意味著 context 消耗速度是串行的 5 倍。如果沒有 Write-Through 和 Direct-Write，並行化帶來的速度優勢會被 compaction 導致的重做完全抵消。

## 實作檢查清單

在設計任何多 Agent 系統時，逐一檢查：

- [ ] 每個 Agent 的產出是否即時持久化？（Rule 1）
- [ ] Orchestrator 的 context 是否只保留必要資訊？（Rule 2）
- [ ] 每個階段結束後是否有 checkpoint？（Rule 3）
- [ ] Agent 產出是否直接寫入最終位置？（Rule 4）
- [ ] 是否設定了 context 預算和子任務數量上限？（Rule 5）
- [ ] 是否有 compaction 後的恢復協議？
- [ ] 降級鏈是否覆蓋了所有可能的失敗路徑？
- [ ] 失敗經驗是否被記錄以便未來規避？

## 相關連結

- [[Scout-then-Swarm架構]] — Context-Survivable 模式所屬的整體架構
- [[Model-Fusion分析]] — 多模型調用的基礎分析
- [[蜂群決策映射]] — Checkpoint 模式和三種執行模式的詳細設計
- [[多模型分工協作]] — 分工協作的模型路由和經驗回饋機制
- [[Agent并行架构]] — 3-Phase 流水線模板，Context-Survivable 設計的理論基礎
- [[Agent-Handoff协议]] — Agent 間交接的標準格式，確保資訊不因 compaction 丟失
- [[Agent工作流协议]] — 經驗反饋閉環，失敗經驗的記錄與複用
