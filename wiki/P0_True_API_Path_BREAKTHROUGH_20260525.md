# 🎯 P0 API 路径 - 完整反向工程突破 (2026-05-25)

> **Status**: ✅ DRY-RUN 已物理验证成功
> **Item**: `1601639436596` (LILIS Made China 2025 Wholesale Plastic Rose Petals)
> **关键修正**: 三个之前调研时遗漏的关键点

---

## ⭐ 三个被遗漏的关键真相

### 1. ❌ 旧理解：`asyRender.json` = 拿商品数据
### ✅ 新真相：`asyRender.json` **必须带 `spm` 参数**才返回真实数据

```
❌ 错误: GET /product/asyRender.json?itemId=X
   → success:true, ignore:true, data:{content:"记录不存在"}  (151B)

✅ 正确: GET /product/asyRender.json?spm=a2747.product_manager.0.0.XXXXXX&itemId=X
   → success:true, ignore:true, data.noIcmpResult:{components,models,rules,layout} (197KB)
```

**`spm` 是阿里 SPA 框架的"页面路径+授权 token"**，没它 alibaba 后台一律返回"记录不存在"。

可用 spm（用户当前 session）：`a2747.product_manager.0.0.2fc171d2XR0i5g`

### 2. ❌ 旧理解：响应直接是 `{data: {jsonBody fields}}`
### ✅ 新真相：响应是 `{data: {noIcmpResult: {...实际数据...}, locale, umidLocation}}`

完整路径：
```
response.data.noIcmpResult.components       ← UI 组件树
response.data.noIcmpResult.models.formValues  ← 🔥 实际表单数据（scImages 在这里！）
response.data.noIcmpResult.models.global.catId  ← 类目 ID
response.data.noIcmpResult.rules            ← 校验规则
response.data.noIcmpResult.layout           ← 布局
```

而且 `scImages` 还在三处出现：
- `components.scImages.props` (UI 配置)
- `models.formValues.scImages.list` ← **真正的图片数据**（要改这个）
- `models.__fields__.scImages` (字段标志)

### 3. ❌ 旧理解：`pubAction=draft` 直接 POST submit.json 保存
### ✅ 新真相：浏览器实际链路是 **先 POST `submitDraft.json` 创建草稿**

HAR5 实际请求时序：
```
T+0s    [0]   GET /product/publish.htm?spm=...&itemId=X         (用户点击进入)
T+0.9s  [18]  GET /product/asyRender.json?spm=...&itemId=X      ← 拿到初始 jsonBody (197KB)
... 用户编辑 ...
T+24s   [262] GET /product/asyncOpt.htm?optType=...              ← 副请求
T+32s   [345] POST /product/submitDraft.json?from=common         ← 🔥 保存草稿（37KB body）
T+40s   [357] GET /product/publish.htm?itemId=X&pubAction=draft  ← 刷新页面进 draft 模式
T+41s   [377] GET /product/asyRender.json?itemId=X&pubAction=draft ← 重新拿 draft 数据
T+45s   [638] POST /product/submit.json?...&pubAction=draft       ← 最终提交（之前以为这个是核心）
```

`submit.json` 是**最终提交**（pubAction=draft 模式下走预发布流程）
`submitDraft.json` 才是**真正的保存草稿**接口

---

## 🔥 完整正确的 API 链路

### 路径 A（推荐 - 保存草稿模式，商品 ID 不变）

```bash
# Step 1: GET 商品数据
GET https://post.alibaba.com/product/asyRender.json
    ?spm=a2747.product_manager.0.0.2fc171d2XR0i5g
    &itemId=<ITEM_ID>
    &X-XSRF-TOKEN=<XSRF>

→ 解析 response.data.noIcmpResult.models.formValues 为 jb

# Step 2: 修改 jb.scImages.list 追加 Slot 5/6

# Step 3: POST 保存草稿
POST https://post.alibaba.com/product/submitDraft.json
    ?from=common
    &notRefresh=false
    &X-XSRF-TOKEN=<XSRF>

Body (form-encoded):
  catId=<cat_id>
  &itemId=<item_id>
  &jsonBody=<URL-encoded JSON of full jb>
  (可能还需要 bx-ua / bx-umidtoken 风控字段)

# Step 4: 物理验证
GET https://post.alibaba.com/product/publish.htm?itemId=<id>&pubAction=draft
→ HTML 里能看到新图片即成功
```

---

## 🔑 已固定的认证参数 (2026-05-25 拿到的 cookie 有效)

| 参数 | 值 | 来源 |
|------|-----|------|
| XSRF-TOKEN | `eede4ed0-cb1c-4cb2-a9ff-4364ef32f16b` | cookie 内 HttpOnly |
| SPM | `a2747.product_manager.0.0.2fc171d2XR0i5g` | 用户从商品管理后台进入时的页面 token |
| adminAliId | `2500000762452` | 用户主账号 ID |
| 用户名 | `cn1575365235ierx` | cookie.cnaui |
| Cookie 总长 | 3316 chars (71 字段) | DevTools Copy as cURL |

---

## ✅ DRY-RUN 验证记录

执行命令:
```bash
cd /Users/tungdebby/Downloads/AIP/scripts
python3 alibaba_batch_image_save.py --item 1601639436596 --dry-run
```

输出:
```
✅ GET 成功 catId=201610703
   title=LILIS Made China 2025 Wholesale Plastic Large Circle-Shaped 
   现有图片数: 6
✅ 成功: 1/1
```

---

## 📋 下一步执行计划

1. ✅ Cookie 完整 (含 HttpOnly)
2. ✅ asyRender.json 拿到真实 jsonBody (197KB)
3. ✅ jsonBody 解析正确（catId/title/scImages 都拿到）
4. ⏳ **真跑 1 个商品验证 submitDraft.json**（需要先研究 [345] 完整 body 结构）
5. ⏳ 物理验证 publish.htm 看图片是否替换
6. ⏳ 批量跑 121 个

**风险**: [345] submitDraft.json 的 body 长 37KB 包含完整 jb，需要保证序列化格式与浏览器一致；可能还有 bx-ua 等风控字段。
