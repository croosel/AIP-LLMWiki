---
tags:
  - ICBU
  - 工作流
  - Skill
  - 自动化
  - 架构设计
created: 2026-06-14
verified: true
confidence: high
related_wiki:
  - "[[ICBU_Open_Platform_API技术手册]]"
  - "[[EXP-ICBU开放平台API产品管理-20260614]]"
  - "[[OPC独立站建站SOP与Agent自动化]]"
---

# ICBU 工作流与 Skill 架构

> ICBU 产品管理自动化的完整 Skill 体系设计。按第一性原理分层：原子操作层 + 工作流编排层 + 数据导出层。

## 1. 架构总览

```
用户指令（自然语言）
       │
       ▼
┌─────────────────────────────┐
│   icbu-workflow（编排层）      │  链式操作：上传图片→发布产品
│   工作流 1~4                 │  批量操作：查询→筛选→逐个下架
└──────────────┬──────────────┘
               │ 调用
┌──────────────▼──────────────┐
│   icbu-product-ops（原子层）  │  每个操作独立可用
│   上传/发布/修改/上下架/查询  │  有明确输入输出
└──────────────┬──────────────┘
               │ import
┌──────────────▼──────────────┐
│   icbu_engine.py（基础设施）  │  ICBUClient + 签名 + XML Builder
│   共享核心引擎               │
└──────────────┬──────────────┘
               │ HTTP
┌──────────────▼──────────────┐
│   ICBU Open Platform API    │  open-api.alibaba.com/sync
└─────────────────────────────┘
```

另有一个独立的只读 Skill:
- **icbu-product-downloader**: 产品数据批量导出（product.list + product.get）

## 2. Skill 文件结构

```
~/.qoderwork/skills/
├── icbu-product-downloader/     # 数据导出（只读）
│   ├── SKILL.md
│   ├── reference.md
│   └── scripts/download_products.py
│
├── icbu-product-ops/            # 产品写操作（原子层）
│   ├── SKILL.md
│   └── scripts/
│       ├── icbu_engine.py       # 共享核心引擎
│       └── icbu_product_manager.py  # CLI 工具（15个子命令）
│
├── icbu-product-sync/           # ICBU → 独立站数据同步
│   ├── SKILL.md
│   ├── field-mapping.md
│   └── scripts/pipeline.py
│
├── icbu-workflow/               # 工作流编排（编排层）
│   ├── SKILL.md
│   └── scripts/
│       └── icbu_engine.py → ../../icbu-product-ops/scripts/icbu_engine.py
│
├── qc-deployment-gate/          # QC 审计关卡（12 道关卡，≥80 分放行）
│   └── SKILL.md
│
└── qoder-cn-engineering-prompt/ # Agent IDE 工程层部署指令生成器
    └── SKILL.md
```

**设计决策**: `icbu-workflow` 通过 symlink 引用 `icbu_engine.py`，保证代码只维护一份。`qc-deployment-gate` 是独立审计框架，在每个阶段节点执行质量关卡。`qoder-cn-engineering-prompt` 生成工程层部署指令，实现运营层→工程层的标准化交接。完整工作流架构参见 [[独立站产品上架工作流架构]]。

## 3. 原子操作一览

| 操作 | ICBUClient 方法 | 输入 | 输出 | 审核阻塞 |
|------|----------------|------|------|---------|
| 上传图片 | `upload_image(path)` | 本地文件路径 | `{file_id, url}` | 否 |
| 发布产品 | `publish_product(cat_id, xml)` | 分类ID + itemSchema XML | `product_id` | 是 |
| 修改标题 | `update_title(pid, cid, title)` | 产品ID + 新标题 | 成功/失败 | 是 |
| 修改图片 | `update_product(pid, cid, xml)` | 产品ID + 图片XML | 成功/失败 | 是 |
| 下架 | `delist(pid, cid)` | 产品ID | 成功/失败 | 是 |
| 上架 | `relist(pid, cid)` | 产品ID | 成功/失败 | 是 |
| 批量操作 | `batch_toggle(entries, action)` | `[(pid,cid),...]` | 结果数组 | 是 |
| 查询列表 | `list_products(page)` | 页码 | 产品数组 | 否 |
| 获取详情 | `get_product(pid)` | 产品ID | 完整数据 | 否 |
| 获取Schema | `get_schema(cat_id, pid)` | 分类ID | itemSchema XML | 否 |

## 4. 四大工作流

### 工作流 1: 新品发布（从图片到上架）

```
上传N张图片 → 获取file_id列表 → 构建itemSchema XML → schema.add → 产品进入审核
```

**数据流**: `upload_image()` 输出的 `file_id` → `build_product_add_xml()` 的 `file_ids` 参数 → `publish_product()` 的 `xml` 参数。

### 工作流 2: 批量下架/上架

```
list_products → 筛选条件过滤 → 逐个 delist/relist（间隔2秒）→ 汇总结果
```

**注意**: 没有专用的下架 API。下架 = `schema.update` + `<display>N</display>`。

### 工作流 3: 修改产品信息

```
get_product（检查审核状态）→ 修改指定字段 → 等待审核完成 → 验证结果
```

**关键约束**: 审核后无法再次修改，多个字段的修改必须串行执行，每次等待审核完成。

### 工作流 4: 端到端批量铺货

```
读取产品数据源（CSV/JSON）→ 逐行: 上传图片 → 构建XML → 发布产品 → 间隔3秒
```

## 5. 决策树

```
用户需求 → 选择哪个 Skill / 工作流？
│
├── "上传这张图片" → icbu-product-ops: upload_image()
├── "发布新产品" → icbu-workflow: 工作流1
├── "改标题" → icbu-product-ops: update_title()
├── "批量下架所有XX产品" → icbu-workflow: 工作流2
├── "修改这个产品的图片" → icbu-workflow: 工作流3
├── "下载所有产品数据" → icbu-product-downloader
├── "从CSV批量铺货" → icbu-workflow: 工作流4
└── "同步到独立站" → icbu-product-sync
```

## 6. 凭据管理

所有 Skill 共享凭据，通过环境变量传递:

```bash
export ICBU_APP_KEY="509764"
export ICBU_APP_SECRET="67bf412f2438855ed00e6d4a3998350c"
export ICBU_ACCESS_TOKEN="..."
```

Token 有效期约 30 天。过期需重新 OAuth 获取。

## 7. 扩展方向

- **定时同步**: Agent cron 定期检查审核状态
- **智能补货**: 结合库存数据自动调整上下架策略
- **A/B 测试**: 自动切换产品标题/图片并追踪效果
- **独立站联动**: icbu-product-sync 同步到 lilisaura 独立站

## 相关链接

- [[ICBU_Open_Platform_API技术手册]] — 完整 API 技术文档
- [[EXP-ICBU开放平台API产品管理-20260614]] — 经验记录（含所有踩坑）
- [[独立站产品上架工作流架构]] — 359 产品批量上架完整工作流（7 阶段 + 12 道 QC 关卡）
- [[EXP-独立站359产品批量上架-20260614]] — 359 产品上架实战经验记录
- [[OPC独立站建站SOP与Agent自动化]] — 独立站建站全流程
- [[AIP跨境运营方法论-四阶段实施]]
- [[Skills技能集与60-40覆盖]]
- [[主页]]
