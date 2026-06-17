---
tags:
  - OPC
  - 信息卡片
  - 技術工作流
  - ImageGen
  - Chrome-headless
  - SeaDance
  - 圖片生成
created: 2026-06-16
confidence: high
---

# OPC 信息卡片 — 技術工作流

> **用途**: 記錄 OPC 行銷卡片的圖片生成技術方案、踩坑經驗與未來替代方案。
> **關聯**: [[OPC信息卡片-行銷素材設計]]（文案與視覺設計方案）

---

## 一、三種技術方案對比

| 維度 | ImageGen（內建） | HTML/CSS + Chrome Headless | 豆包 SeaDance 2.0 API（推薦） |
|------|-----------------|---------------------------|------------------------------|
| **海報級視覺** | ✅ 極佳 — 構圖、色塊、圖形語言 | ❌ 弱 — 只能做文字排版 | ✅ 預期佳（待驗證） |
| **中文渲染** | ⚠️ 不精準 — 字體變形/缺筆 | ✅ 完美 — 系統字體精確渲染 | ✅ 優於 ImageGen（火山引擎訓練） |
| **水印** | ❌ 自動加「Qoder AI 生成」，prompt 無法排除 | ✅ 無水印 | ✅ 無水印 |
| **創意構圖** | ✅ 海報級大膽構圖 | ❌ 受限於 CSS 布局能力 | ✅ 待驗證 |
| **成本** | 內建免費 | 免費 | Coding Plan 計費（火山引擎） |
| **可重現性** | ⚠️ 每次生成不同 | ✅ 100% 可重現（HTML 模板） | ⚠️ 每次生成不同 |

---

## 二、ImageGen 方案（本次使用）

### 使用方法

QoderWork 內建 ImageGen 工具，直接給出視覺描述 prompt 即可生成。

### Prompt 設計原則

1. **必須描述具體的視覺構圖**，不能只寫文案內容。例如：「深色背景，大號數字 8x 作為視覺焦點，珊瑚橙色強調」
2. **指定設計風格參照**：「Apple/Aesop-level minimalism」「poster-level design with bold composition」
3. **明確排除**：「no watermark」「no illustrations」「no gradients」
4. **中文字體指示**：prompt 中寫入具體中文文字，但生成結果中文可能不精準

### 已知限制

1. **水印無法排除**：無論 prompt 如何指示，生成的圖片右下角都會有「Qoder AI 生成」水印。加 `no watermark` 等指令無效。
2. **中文字渲染不精準**：AI 生成的中文字存在變形、缺筆、字體不一致等問題。英文和數字渲染正常。
3. **每次結果不同**：相同的 prompt 可能生成不同的構圖和色調。需要多次生成選擇最佳版本。

### 水印處理嘗試

- **PIL 白色遮蓋**: 用 Python PIL 在底部水印區域畫白色矩形。效果：遮蓋不徹底，邊緣殘留。
- **PIL 底部裁切**: 裁掉底部 90px。效果：水印位置不固定，部分圖片仍有殘留。
- **Auto-detect**: 掃描右下角非白色像素自動定位水印。效果：不穩定，容易誤判。
- **結論**: 後處理無法完美去除水印，根本解決方案是換用無水印生成工具。

### 本次生成的 8 張卡片

所有圖片位於 `outputs/OPC信息卡片/`：

| 檔案 | 主題 | 視覺效果評分 |
|------|------|------------|
| `01-cover-ai-revolution.png` | AI 搜索改寫遊戲規則（封面） | 70/100 — 視覺效果佳，中文略偏 |
| `02-industry-shift.png` | 產業巨變 8x/13x 數據 | 70/100 |
| `03-ai-agents-era.png` | AI 代理時代 | 70/100 |
| `04-micro-b-opportunity.png` | Micro-B 買家新藍海 | 70/100 |
| `05-opc-advantages.png` | OPC 三大優勢 | 70/100 |
| `06-real-data.png` | 359 品 10 分鐘實績 | 70/100 |
| `07-why-opc.png` | 四個核心差異 | 70/100 |
| `08-cta-invitation.png` | 正面邀請 CTA | 70/100 |

評分說明：海報級視覺效果（構圖、色塊、圖形語言）表現優秀，但中文字渲染不精準導致扣 30 分。如中文能精確渲染，可達 90+ 分。

---

## 三、HTML/CSS + Chrome Headless 方案

### 使用方法

1. 建立 HTML 模板（1024×1536 viewport），內嵌 CSS 完成所有排版
2. 用 Chrome Headless 截圖輸出 PNG

```bash
# Chrome Headless 截圖命令
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
  --headless \
  --screenshot=output.png \
  --window-size=1024,1536 \
  --force-device-scale-factor=2 \
  --hide-scrollbars \
  file:///path/to/template.html
```

### 關鍵參數

| 參數 | 說明 |
|------|------|
| `--force-device-scale-factor=2` | Retina @2x 輸出，得到 2048×3072 像素 |
| `--hide-scrollbars` | 隱藏滾動條 |
| `--window-size=1024,1536` | 2:3 比例，匹配小紅書/微信尺寸 |

### HTML 模板位置

`image-cards/opc-dual-track/html/` 下保存了 8 張卡片的 HTML 模板，可隨時修改文案重新截圖。

### 優劣分析

- **優勢**: 中文完美渲染（使用系統字體）、無水印、100% 可重現、文案修改方便
- **劣勢**: 視覺效果受限於 CSS — 只能做文字排版和簡單幾何圖形，無法生成海報級的創意構圖、色塊對比、圖形語言
- **用戶反饋**: 「視覺效果等於沒有傳達」「只是把文字做了排列」「最差勁的視覺表現」

### 適用場景

- 需要精確中文文字的場景（如定價表、功能列表）
- 需要頻繁更新文案的場景（如每週報告）
- 作為 ImageGen/SeaDance 方案的文字疊加層（生成底圖後用 HTML 疊加精確中文）

---

## 四、豆包 SeaDance 2.0 API（推薦未來方案）

### 為什麼推薦

1. **無水印**: 火山引擎 API 生成圖片不自帶水印
2. **中文渲染更好**: 字節跳動 / 火山引擎的中文訓練數據更豐富
3. **海報級視覺**: 與 ImageGen 同級別的 AI 圖片生成能力
4. **成本合理**: Coding Plan 價格，同時支持圖片 + 視頻生成

### 接入方式

- **平台**: 火山引擎（Volcano Engine）
- **模型**: 豆包 SeaDance 2.0
- **協議**: 標準 REST API，可通過 MCP 或直接 HTTP 調用
- **認證**: API Key（需在火山引擎控制台申請）

### 待驗證項目

1. 中文字體渲染的實際精度（需測試）
2. Prompt 對中文排版的控制力度
3. 生成速度與並發限制
4. 圖片風格一致性（同系列卡片是否風格統一）

---

## 五、混合方案建議

基於本次實戰經驗，推薦以下混合工作流：

```
Step 1: 用 ImageGen 或 SeaDance 生成海報級底圖（創意構圖 + 色塊 + 圖形語言）
Step 2: 用 HTML/CSS 疊加精確中文文字（解決中文渲染不精準問題）
Step 3: Chrome Headless 截圖合成最終輸出
```

這個混合方案的優勢：

- 底圖保留海報級的視覺衝擊力
- 中文文字 100% 精確
- 無水印
- 可重現（HTML 模板保存後可修改文案重新生成）

### 具體實現思路

```html
<!-- 底圖 + 中文疊加層 -->
<div style="position: relative; width: 1024px; height: 1536px;">
  <!-- AI 生成的底圖 -->
  <img src="base-image.png" style="width: 100%; height: 100%;" />
  
  <!-- 中文文字疊加層 -->
  <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
    <h1 style="color: white; font-size: 72px; ...">AI 搜索改寫遊戲規則</h1>
    <!-- 其他文字元素 -->
  </div>
</div>
```

---

## 六、baoyu-image-cards Skill 集成

本次使用了 `baoyu-image-cards` skill 規劃卡片結構。該 skill 提供：

- **12 種視覺風格**: minimal, gradient, glassmorphism, brutalist 等
- **8 種布局**: sparse, balanced, comparison, dense, list 等
- **3 種配色**: default, warm, cool

### 自定義配置

`~/.baoyu-skills/baoyu-image-cards/EXTEND.md` 記錄用戶偏好：

```yaml
preferred_style: minimal
watermark.enabled: false
language: zh
```

### 已知限制

- `references/` 目錄不存在（skill 只有 SKILL.md），agent 需從 SKILL.md 推斷 workflow
- EXTEND.md 首次設定需手動建立路徑：`~/.baoyu-skills/baoyu-image-cards/EXTEND.md`

---

## 七、相關頁面

- [[OPC信息卡片-行銷素材設計]] — 8 張卡片完整文案與視覺概念
- [[OPC双轨出海商业模式]] — 卡片內容的商業模式基礎
- [[OPC双轨出海PitchDeck]] — 12 頁 Pitch Deck（另一種行銷素材形式）
