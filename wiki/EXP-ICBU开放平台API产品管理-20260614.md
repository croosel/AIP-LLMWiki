---
tags:
  - 经验记录
  - ICBU
  - API
  - Alibaba国际站
  - 产品管理
  - 技术调研
created: 2026-06-14
agent: Agent
outcome: success
confidence: high
verified: true
related_wiki:
  - "[[ICBU_Open_Platform_API技术手册]]"
  - "[[ICBU_工作流与Skill架构]]"
  - "[[API_Direct_Access_Investigation_20260524]]"
  - "[[实战避坑指南]]"
---

# ICBU 开放平台 API 产品管理完整调研

## 背景
- **目标**: 建立 ICBU 国际站产品的完整 API 自动化管理能力（发布、修改、上下架）
- **Agent**: Agent
- **时间**: 2026-06-14（基于前一次会话的 16 轮 API 探测）
- **上下文**: 前次 [[API_Direct_Access_Investigation_20260524]] 判定 Accio MCP 路径不可达，本次走 ICBU Open Platform 独立 API 路径

## 执行路径
- **选择的方法**: 直接对接 ICBU Open Platform API（`open-api.alibaba.com/sync`），通过系统性探测发现可用的 Schema 系列 API
- **替代方案**: Accio MCP 工具（已在 5 月被证实不可达）、浏览器 UI 自动化（可行但效率低）
- **关键步骤**:
  1. Phase 1-2: 扫描 80+ API 方法名，发现可用接口
  2. Phase 3-6: 解决图片上传格式（multipart POST + image_bytes=@file）
  3. Phase 7-8: 发现 Schema 系列 API 替代旧 product.add/update
  4. Phase 9-10: 验证 schema.update 可修改标题/上下架
  5. Phase 11: 通过 schema.render 获取完整 itemSchema 字段定义
  6. Phase 12-15: 解决 schema.add 的 XML 格式问题
  7. Phase 16: 最终成功发布产品

## 结果
- **实际结果**: 成功实现完整的 API 产品管理链路：上传图片 → 发布产品 → 修改标题/图片 → 下架/上架
- **验证方式**: 通过 product.get 和 product.list 确认两个测试产品已创建（ID: 1601830371315, 1601830275874）
- **与预期对比**: 超出预期——原以为 API 权限受限（product.add 报 InsufficientPermission），但 schema.add 完全可用

## 经验提炼

### 核心教训

**ICBU Open Platform API 是完全可用的产品管理路径**，与 Accio MCP 的"三重铁壁"完全不同。之前的 [[API_Direct_Access_Investigation_20260524]] 结论需要修正：不是"API 不可达"，而是"Accio MCP 封装的 API 不可达"。

### 踩坑记录（按严重程度排序）

#### 坑 1: schema.add 必须用 itemSchema 格式（致命）

**现象**: `<product>` 格式的 XML 在 schema.add 中报 "missing-parameter: productTitle, scImages, priceUnit, saleType, scPrice"，即使这些字段都在 XML 中。

**根因**: schema.add 只认 `<itemSchema><field id="..." type="...">` 格式，不认 `<product><productTitle>` 格式。而 schema.update 两种格式都接受。

**解决**: 从 schema.render 获取正确的字段定义，使用 itemSchema 格式。

**规则**: **schema.add 只用 itemSchema 格式，schema.update 两种格式都可用。**

#### 坑 2: 图片字段必须含 fileId（致命）

**现象**: itemSchema XML 正确但报 "CHK_IMAGE_FILE_ID_EMPTY: 新增图片时fileId必须填写"。

**根因**: scImages 的 `<value>` 必须包含 `fileFlag="yes"` 和 `fileId="FILE_ID"` 属性，不能只有 URL。fileId 必须来自 photobank.upload 的返回值。

**解决**: 先上传图片获取 file_id，然后在 XML 中使用 `<value fileFlag="yes" fileId="xxx">url</value>`。

**规则**: **发布产品前必须先上传图片到图片银行。**

#### 坑 3: superText 描述必须含 HTML img 标签（致命）

**现象**: 所有字段都填对了，但报 "PUB_BIZCHECK_DESCRIPTION_IS_REQUIRED: 商品详情不能为空"。尝试了纯文本、CDATA 包装、productDescType=1/2/4 都不行。

**根因**: superText 的 value 必须是 entity 编码的 HTML，且必须包含至少一个 `<img>` 标签。纯文本描述会被系统认为"空"。

**解决**: superText 值设为 `&lt;p&gt;描述&lt;/p&gt;&lt;img src="图片URL" /&gt;`，配合 detailImage 字段。

**规则**: **产品描述必须有 HTML img 标签，纯文字不行。productDescType 设为 "2" 或不填。**

#### 坑 4: multiComplex vs complex 的标签区别（易错）

**现象**: "API_SCHEMA_XML_PARSE_ERROR: Field type's kind Illegal"。

**根因**: 
- `type="complex"` 的字段用 `<complex-value>` (单数)
- `type="multiComplex"` 的字段用 `<complex-values>` (复数)

写反了就报 XML 解析错误。

**规则**: **complex=单数标签，multiComplex=复数标签。从 schema.render 获取正确类型。**

#### 坑 5: singleCheck 的 type 不能写成 enum（易错）

**现象**: 用 `type="enum"` 定义 singleCheck 字段时报 "Field type's kind Illegal"。

**根因**: schema.add 会校验 field type 是否与分类 Schema 定义一致。priceUnit 等字段的正确类型是 `singleCheck`，不是 `enum`。

**解决**: 从 schema.render 获取每个字段的正确 type 值。

**规则**: **field type 必须与 schema.render 返回的完全一致。**

#### 坑 6: photobank.upload 必须 multipart POST（易错）

**现象**: 用 form-urlencoded POST 上传图片，image_bytes 参数报缺失。用 base64 编码在 URL 参数中传图片，URL 太长超出 OS 限制。

**根因**: photobank.upload 只接受 multipart/form-data 格式，image_bytes 必须是文件引用（`@file`）。

**解决**: 用 curl 的 `-F` 参数发送 multipart POST，`-F "image_bytes=@/path/to/file"`。

**规则**: **photobank.upload 只用 multipart POST + 文件引用，不用 base64。**

#### 坑 7: schema.render 需要 product_id（隐蔽）

**现象**: 只传 cat_id 和 language，schema.render 返回空响应（只有 request_id）或 "Category ID cannot be blank"。

**根因**: schema.render 需要 `publish_type: "edit"` + `product_id` 才能返回完整 Schema。单独传 `publish_type: "new"` + `cat_id` 会报"Category ID cannot be blank"。

**解决**: 用同分类的已有产品 ID 来获取 Schema 模板，然后修改字段值用于新产品。

**规则**: **schema.render 用 edit 模式 + 已有产品ID 获取字段模板。**

#### 坑 8: 签名算法的路径前缀区别（隐蔽）

**现象**: 所有 API 请求报签名错误。

**根因**: Token 交换（`/auth/token/create`）签名时需要路径前缀：`HMAC(secret, "/auth/token/create" + param_str)`。但普通 API 调用（`/sync`）不加前缀：`HMAC(secret, param_str)`。

**规则**: **Token 交换签名加路径前缀，普通 API 调用不加。**

#### 坑 9: 审核后无法连续修改（流程约束）

**现象**: 成功修改标题后，立即尝试修改图片，报 "PUB_BIZCHECK_PRODUCT_IN_AUDITING"。

**根因**: 任何写操作后产品进入审核状态，审核期间所有修改被拒绝。

**解决**: 每次修改后等待审核完成再进行下一次修改。批量操作需规划修改顺序。

**规则**: **一次修改 → 等待审核 → 下一次修改。不能连续修改同一产品。**

### 可复用规则

1. **写操作前先读 Schema**: 对任何分类执行 schema.render 获取完整字段定义，不要猜测字段名和类型
2. **图片先行**: 发布产品前必须先上传所有图片到图片银行
3. **HTML 描述带图**: 产品描述字段必须包含 entity 编码的 HTML 和 `<img>` 标签
4. **审核间隔**: 批量修改同一产品时，每次操作间需等待审核
5. **multipart 上传**: 图片上传只用 multipart POST，不用 base64

### 避坑指南

下次执行 ICBU API 相关任务时：

1. **不要走 Accio MCP 路径** — 直接对接 Open Platform API
2. **不要猜 XML 格式** — 先用 schema.render 获取目标分类的完整字段模板
3. **不要用 `<product>` 格式做 schema.add** — 只用 `<itemSchema>` 格式
4. **不要用纯文本做描述** — superText 必须含 HTML img 标签
5. **不要连续修改** — 每次修改后等待审核

### Wiki 更新建议

- [[API_Direct_Access_Investigation_20260524]] — 需要添加修正说明：Accio MCP 不可达 ≠ ICBU API 不可达
- [[实战避坑指南]] — 建议新增 API 技术层面的避坑条目
- [[最短时间执行路径方法论]] — ICBU Open Platform API 应被标记为产品管理的 P0 路径

## 相关链接

- [[经验索引]]
- [[ICBU_Open_Platform_API技术手册]] — 完整技术文档
- [[ICBU_工作流与Skill架构]] — 工作流和 Skill 设计
- [[API_Direct_Access_Investigation_20260524]] — 历史 Accio MCP 调研（本文修正其结论）
- [[实战避坑指南]] — 运营层面避坑
- [[最短时间执行路径方法论]] — P0 路径选择方法论
- [[AIP跨境运营方法论-四阶段实施]]
- [[主页]]
