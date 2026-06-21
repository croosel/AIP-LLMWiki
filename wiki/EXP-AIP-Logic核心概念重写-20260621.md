---
tags:
  - 经验记录
  - Palantir
  - AIP
  - Logic
  - vault写入
  - 多Agent协作
created: 2026-06-21
agent: QoderWork
outcome: success
confidence: high
related_wiki:
  - "[[AIP-Logic核心概念]]"
  - "[[AIP-Logic]]"
  - "[[多Agent并写守门规则]]"
  - "[[Agent工作流协议]]"
---

# AIP-Logic核心概念 全面重寫 + 3 層守門首次實戰

## 背景
- **目标**: 重寫 [[AIP-Logic核心概念]] 頁面，補齊原文件 119 行中的技術缺口
- **Agent**: QoderWork
- **时间**: 2026-06-21
- **上下文**: 首次以 3 層守門規則 v1（正式生效版）執行 vault 寫入，同時有多個 Agent 可能並寫

## 执行路径
- **选择的方法**: 先調研 Palantir 官方文檔 + 53AI 深度解析文章，補齊知識缺口後重寫
- **替代方案**: 僅增量補充（放棄，因原文件結構不足以承載新內容深度）
- **关键步骤**:
  1. 讀取現有 AIP-Logic核心概念.md（119 行）+ AIP-Logic.md + AIP总览.md
  2. 調研 Palantir 官方文檔（core-concepts / overview）+ 中文深度解析文章
  3. 備份原文件到 wiki/.bak/（層 2）
  4. 全面重寫為 302 行（12 章節、19 個 WikiLinks）
  5. cat 校驗確認內容正確（層 2）
  6. 在 [[Agent工作流协议]] 新建附錄 B「近期寫入」表並登記（層 3）
  7. git commit + push（SSH 方式）

## 结果
- **实际结果**: 119 行 → 302 行，補齊 6 大核心缺口
- **验证方式**: wc -l 確認行數、grep 確認章節結構、WikiLinks 格式校驗（無 .md 後綴違規）
- **与预期对比**: 超出預期——原計劃增量補充，實際因結構不足改為全面重寫

### 補齊的核心缺口

| 缺口 | 說明 |
|------|------|
| Use LLM Block 深度解析 | 三層內部結構（Prompt / Tools 四件套 / Output 雙模式），原文件完全未覆蓋 |
| 變量與參數映射 | 三種映射模式（LLM Generated / Fixed / Variable），決定 Block 間數據流 |
| Tool 參數配置陷阱 | Call Function 完全依賴 JSDoc 注釋，LLM 讀不到代碼本身 |
| 錯誤處理 | 代碼層（try-catch 返回文本而非異常）+ Prompt 層（缺參追問而非幻覺填充） |
| 安全與權限 | 用戶權限繼承 + 函數級 ACL + Debugger 中編輯僅為模擬 |
| 整合模式 | Logic × Workshop / Automate / Action / Logic 嵌套，四條整合路徑 |
| 外貿典型 Function | ClassifyInquiryIntent 完整 Block 鏈示例 |

### 3 層守門執行情況

| 層 | 規則 | 執行結果 |
|----|------|---------|
| 層 1 | 粒度拆分 | 只寫 AIP-Logic核心概念.md，未越界 |
| 層 2 | 寫入前必查 | 備份於 wiki/.bak/，寫後 cat 校驗通過 |
| 層 3 | 寫後必登記 | Agent工作流協議 附錄 B 已建立並登記首條 |

## 经验提炼
- **核心教训**: 3 層守門規則 v1 完全可執行，流程順暢無卡點。備份 → 重寫 → 校驗 → 登記四步機械化操作，約 5 分鐘完成全部守門動作。
- **可复用规则**:
  - 超過 100 行的頁面務必先建 .bak/ 目錄再備份（首次寫入時 .bak/ 不存在）
  - 調研外部資料時，Palantir 官方文檔子頁面（blocks-overview / use-llm-block）返回 404（需登入），中文第三方文章反而更有深度
  - 新建附錄表格時，用 Edit 而非 Write（避免覆蓋原有內容）
- **避坑指南**: Palantir 官方文檔的詳細技術頁面藏在登入牆後，公開可取的只有 overview + core-concepts 兩頁，深度調研需依賴第三方分析文章
- **Wiki 更新建议**: [[AIP-Logic]]（入口頁面）的 Block 類型表可考慮加一行指向 [[AIP-Logic核心概念]] 的「深度解析見」鏈接

## 相关链接
- [[经验索引]]
- [[AIP-Logic核心概念]]
- [[多Agent并写守门规则]]
- [[Agent工作流协议]]
