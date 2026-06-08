# P0 DryRun 全量扫描报告 — 119 个普通品 Slot 5/6 现状

**执行时间**: 2026-05-25
**执行路径**: `asyRender.json` (P0 API 直连)
**耗时**: 约 7 分钟（119 商品 × 2s/单 + GET 延迟）
**成功率**: 119/119 = **100%** ✅
**失败数**: 0

---

## 📊 核心结论

### 1. 图片槽位填充情况

| 现有图片数 | 商品数 | 占比 |
|-----------|--------|------|
| 6 张 | 115 | 96.6% |
| 5 张 | 4 | 3.4% |

### 2. LILIS 品牌图（OEM/ODM + 美国仓）覆盖情况

| Slot | 已合规 | 待替换 | 空槽 |
|------|--------|--------|------|
| Slot 5 (OEM/ODM) | **0** | 119 | 0 |
| Slot 6 (美国仓) | **0** | 115 | 4 |

### 3. 一句话总结

**119 个商品 100% 都需要做 Slot 5/6 替换**，其中：
- **115 个**：覆盖现有 Slot 5/6 图（fileFlag: replace）
- **4 个**：Slot 5 覆盖 + Slot 6 直接 add（参考 [345] 的 add 模式）

---

## 🔧 4 个仅 5 张图的特殊商品

需要特殊处理（Slot 6 没东西要覆盖，直接 add）：

| itemId |
|--------|
| 1601722694768 |
| 1601733967383 |
| 1601719382805 |
| 1601651451059 |

---

## ✅ 技术验证成果

1. **P0 API 路径 100% 稳定**：119 个连续请求 0 失败，平均响应 ~2s
2. **Cookie 全程有效**：7 分钟运行期间无 401/418/无 cookie 失效
3. **完整 jsonBody 解析正常**：每个商品都成功获取 197KB 完整 GPF 数据
4. **Slot 5/6 品牌指纹检测准确**：基于 `H0caf9ba66c53478ea0e87c8a950693c1c` (Slot5) 和 `H8b61f51c93164f889d5d73ab5ab0d36cJ` (Slot6) 哈希精确识别

---

## 🎯 下一步执行方案

### Phase 1: 写完 submitDraft.json 逻辑（30 分钟）

参照 HAR5 [345] 实际请求体：
- URL: `https://post.alibaba.com/product/submitDraft.json?from=common&notRefresh=false&X-XSRF-TOKEN={token}`
- Body 仅 3 字段: `catId`, `itemId`, `jsonBody` (URL-encoded 21KB JSON)
- 不需要 `awsc-token` / `bx-v` / `bx-ua`（HAR 实际成功请求无此字段）
- 响应：HTTP 200 + 空 body = 成功

### Phase 2: 真跑 1 个低优先级商品（5 分钟）

候选低优先级（4 张图商品里挑 1 个，影响最小）：
- `1601722694768` — Best Party Theme Idea Design...

### Phase 3: 物理验证（人工 1 分钟）

打开 `post.alibaba.com/product/publish.htm?itemId=1601722694768` 看 Slot 5/6 是不是变成了 LILIS 品牌图。

### Phase 4: 批量 119 个（10 分钟）

```bash
python3 alibaba_batch_image_save.py --all --delay 3
```

预估耗时：119 × (2s GET + 1s POST + 3s delay) ≈ 12 分钟。

---

## 📁 关联文件

- 脚本: `/Users/tungdebby/Downloads/AIP/scripts/alibaba_batch_image_save.py`
- 报告原始数据: `/Users/tungdebby/Downloads/AIP/batch_save_logs/diagnostic_report.tsv`
- 运行日志: `/Users/tungdebby/Downloads/AIP/batch_save_logs/dryrun_all_*.log`
- 突破记录: `wiki/P0_True_API_Path_BREAKTHROUGH_20260525.md`

---

**生成方**: Accio (DID-F456DA-2B0D4C) | 默认决策：用户超时未回复，选择最安全的 dry-run 方案确保数据扎实再推进
