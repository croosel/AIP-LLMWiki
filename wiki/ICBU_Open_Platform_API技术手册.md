---
tags:
  - ICBU
  - API
  - 技术文档
  - Alibaba国际站
  - 产品管理
created: 2026-06-14
verified: true
confidence: high
related_wiki:
  - "[[API_Direct_Access_Investigation_20260524]]"
  - "[[实战避坑指南]]"
  - "[[ICBU_工作流与Skill架构]]"
  - "[[EXP-ICBU开放平台API产品管理-20260614]]"
---

# ICBU Open Platform API 技术手册

> 本文档记录了通过 ICBU 开放平台 API（`open-api.alibaba.com`）进行产品管理的完整技术方案。
> 这是对 [[API_Direct_Access_Investigation_20260524]] 的重大修正：Accio MCP 路径不通，但 ICBU Open Platform API 是完全可用的。

## 1. 与 Accio MCP 路径的区别

| 维度 | Accio MCP 路径（已封堵） | ICBU Open Platform API（可用） |
|------|-------------------------|-------------------------------|
| 入口 | Accio Desktop → MCP Server | `open-api.alibaba.com/sync` |
| 认证 | Accio Gateway Token + agentType 校验 | 独立 OAuth 2.0 + HMAC-SHA256 签名 |
| 限制 | 三重铁壁（权限/余额/OAuth） | 仅受 API 权限配置限制 |
| 产品写操作 | ❌ 不可达 | ✅ schema.add / schema.update |
| 费用 | 需 i-bean 扣费 | 免费（Open Platform 标准接口） |

**核心结论**: 不要走 Accio MCP 路径。直接对接 ICBU Open Platform API。

## 2. API 网关与认证

### 2.1 网关地址

| 用途 | URL |
|------|-----|
| API 调用（读） | `https://open-api.alibaba.com/sync?method=xxx&...` (GET) |
| API 调用（写） | `https://open-api.alibaba.com/sync` (POST) |
| Token 交换 | `https://open-api.alibaba.com/rest/auth/token/create` (POST) |
| OAuth 授权 | `https://open-api.alibaba.com/oauth/authorize` |

**禁止使用**: TOP 网关（`eco.taobao.com`）或 REST 风格路径，会返回 InvalidAppKey。

### 2.2 每次请求必带参数

| 参数 | 值 |
|------|-----|
| `method` | API 方法名，如 `alibaba.icbu.product.list` |
| `app_key` | 应用 App Key |
| `session` | Access Token（注意：参数名是 `session` 不是 `access_token`） |
| `sign_method` | `sha256` |
| `timestamp` | 毫秒级时间戳（13位） |
| `sign` | HMAC-SHA256 签名 |
| `format` | `json` |

### 2.3 签名算法

**普通 API 调用**（`/sync`）— 无路径前缀:

```python
sorted_params = sorted(
    [(k, str(v)) for k, v in params.items() if k != "sign"],
    key=lambda x: x[0]
)
param_str = "".join(f"{k}{v}" for k, v in sorted_params)
sign = hmac.new(secret.encode(), param_str.encode(), hashlib.sha256).hexdigest().upper()
```

**Token 交换** — 有路径前缀:

```python
sign = hmac.new(secret.encode(), ("/auth/token/create" + param_str).encode(), hashlib.sha256).hexdigest().upper()
```

这个区别极其关键。用错签名方式会导致所有请求失败。

### 2.4 OAuth 流程

1. 浏览器打开授权 URL → 用户点击授权 → 获取 `code`
2. POST `/rest/auth/token/create` 用 code 换 Access Token
3. Token 有效期约 30 天，Refresh Token 60 天

## 3. 核心 API 清单

### 3.1 已验证可用的 API

| API | 方法 | 用途 | 状态 |
|-----|------|------|------|
| `alibaba.icbu.product.list` | GET | 产品列表（分页，max 30/页） | ✅ |
| `alibaba.icbu.product.get` | GET | 产品详情 | ✅ |
| `alibaba.icbu.product.schema.add` | POST | 发布新产品 | ✅ |
| `alibaba.icbu.product.schema.update` | POST | 修改现有产品 | ✅ |
| `alibaba.icbu.product.schema.render` | POST | 获取分类字段模板 | ✅ |
| `alibaba.icbu.photobank.upload` | multipart POST | 上传图片到图片银行 | ✅ |
| `alibaba.icbu.photobank.list` | GET | 图片列表 | ✅ |
| `alibaba.icbu.photobank.group.list` | GET | 图片分组 | ✅ |
| `alibaba.icbu.category.get.new` | GET | 分类树 | ✅ |
| `alibaba.icbu.product.group.get` | GET | 产品分组 | ✅ |
| `alibaba.icbu.product.group.add` | GET | 添加分组 | ✅ |

### 3.2 不可用的 API

| API | 问题 | 替代方案 |
|-----|------|---------|
| `alibaba.icbu.product.add` | InsufficientPermission | 用 `schema.add` |
| `alibaba.icbu.product.update` | OFFLINE（已下线） | 用 `schema.update` |
| `alibaba.icbu.product.delist` | InvalidApiPath（不存在） | 用 `schema.update` + `<display>N</display>` |
| `alibaba.icbu.product.delete` | InvalidApiPath（不存在） | 暂无 API 方案 |

## 4. 图片上传（photobank.upload）

**必须使用 multipart POST**，不能用 form-urlencoded 或 base64。

```python
# curl 示例
curl -s -k -X POST https://open-api.alibaba.com/sync \
  -F "app_key=xxx" -F "method=alibaba.icbu.photobank.upload" \
  -F "session=xxx" -F "sign_method=sha256" \
  -F "timestamp=xxx" -F "sign=xxx" -F "format=json" \
  -F "image_bytes=@/path/to/image.jpg"
```

返回:
```json
{
  "alibaba_icbu_photobank_upload_response": {
    "file_id": 32238240185,
    "photobank_url": "//sc04.alicdn.com/kf/xxx.jpg",
    "file_name": "image.jpg"
  }
}
```

**关键**: 发布产品时 scImages 字段必须使用这个 `file_id`，不能直接用外部 URL。

## 5. 产品发布 XML 格式（itemSchema）

`schema.add` 必须使用 `<itemSchema>` 格式，不能用旧的 `<product>` 格式。

### 5.1 字段类型对照

| 类型 | XML 标签 | 说明 |
|------|---------|------|
| `input` | `<value>文本</value>` | 文本输入 |
| `singleCheck` | `<value>选项值</value>` | 单选（从 options 中选） |
| `multiCheck` | `<values><value>v1</value><value>v2</value></values>` | 多选 |
| `complex` | `<complex-value>子字段</complex-value>` | 复合（单数） |
| `multiComplex` | `<complex-values>子字段</complex-values>` | 复合列表（复数） |

### 5.2 必填字段示例

```xml
<itemSchema>
  <field id="productTitle" type="input">
    <value>产品标题</value>
  </field>
  <field id="scImages" type="complex">
    <value fileFlag="yes" fileId="FILE_ID">IMAGE_URL</value>
  </field>
  <field id="priceUnit" type="singleCheck"><value>4</value></field>
  <field id="saleType" type="singleCheck"><value>normal</value></field>
  <field id="scPrice" type="singleCheck"><value>1</value></field>
  <field id="ladderPrice" type="complex">
    <complex-value>
      <field id="ladderPrice_0" type="complex">
        <complex-value>
          <field id="quantity" type="input"><value>1</value></field>
          <field id="price" type="input"><value>1.00</value></field>
        </complex-value>
      </field>
    </complex-value>
  </field>
  <field id="minOrderQuantity" type="input"><value>100</value></field>
  <field id="ladderPeriod" type="complex">
    <complex-value>
      <field id="ladderPeriod_0" type="complex">
        <complex-value>
          <field id="quantity" type="input"><value>100</value></field>
          <field id="day" type="input"><value>15</value></field>
        </complex-value>
      </field>
    </complex-value>
  </field>
  <field id="productDescType" type="singleCheck"><value>2</value></field>
  <field id="detailImage" type="multiComplex">
    <complex-values>
      <field id="gallery" type="singleCheck">
        <value displayName="Scene image">200</value>
      </field>
      <field id="images" type="multiComplex">
        <complex-values>
          <field id="imageURL" type="input"><value>IMAGE_URL</value></field>
        </complex-values>
      </field>
    </complex-values>
  </field>
  <field id="superText" type="input">
    <value>&lt;p&gt;描述&lt;/p&gt;&lt;img src="URL" /&gt;</value>
  </field>
</itemSchema>
```

### 5.3 关键格式规则

1. **图片必须含 fileId**: `<value fileFlag="yes" fileId="FILE_ID">URL</value>`
2. **multiComplex 用复数**: `<complex-values>` 不是 `<complex-value>`
3. **complex 用单数**: `<complex-value>` 不是 `<complex-values>`
4. **superText 必须含 HTML img 标签**: 纯文本会被拒绝，报"商品详情不能为空"
5. **HTML 必须 entity 编码**: `<` → `&lt;`, `>` → `&gt;`, `"` → `&quot;`
6. **priceUnit 值为数字代码**: 不是文本 "Piece"，而是对应选项值（如 1=Bag, 4=Pieces）

## 6. 产品修改（schema.update）

`schema.update` 同时接受 `<product>` 格式和 `<itemSchema>` 格式。

**简单操作推荐 `<product>` 格式**:
```xml
<!-- 修改标题 -->
<product>
  <product_id>1601652175807</product_id>
  <productTitle>新标题</productTitle>
</product>

<!-- 下架 -->
<product>
  <product_id>1601652175807</product_id>
  <display>N</display>
</product>

<!-- 上架 -->
<product>
  <product_id>1601652175807</product_id>
  <display>Y</display>
</product>
```

## 7. 审核机制

任何写操作（add/update/delist/relist）后产品进入 **auditing** 状态：
- `status` 变为 `modified`
- `display` 可能变为 `N`
- 审核期间对该产品的所有修改会返回 `PUB_BIZCHECK_PRODUCT_IN_AUDITING`
- 审核时间：几分钟到几小时不等

## 8. 工具与脚本

- **CLI 工具**: `icbu_product_manager.py`（15 个子命令）
- **Python 引擎**: `icbu_engine.py`（ICBUClient 类，可 import）
- **Skill 入口**: `icbu-product-ops`（原子操作）和 `icbu-workflow`（工作流编排）

详见 [[ICBU_工作流与Skill架构]]。

## 相关链接

- [[API_Direct_Access_Investigation_20260524]] — Accio MCP 路径的封堵记录（本文修正了其结论）
- [[实战避坑指南]] — Alibaba 运营避坑
- [[ICBU_工作流与Skill架构]] — 自动化工作流和 Skill 设计
- [[EXP-ICBU开放平台API产品管理-20260614]] — 完整经验记录（含所有踩坑记录）
- [[AIP跨境运营方法论-四阶段实施]]
- [[主页]]
