---
tags: [App-Building, Workshop, Palantir-AIP, Events, Variables, Layouts]
created: 2026-05-21
source: "[[raw/palantir_docs_workshop_getting_started]], [[raw/palantir_docs_workshop_events]]"
---
# Workshop 构建深度

## 定义

Workshop 是 Foundry 的面向对象应用构建器。它利用 Ontology 语义原语（Objects/Links）和动力原语（Actions/Functions），让构建者通过 Widget → Variable → Event → Action 的架构创建高度交互的操作应用。从零代码 Widget 拖拽到代码级 Function 扩展，Workshop 覆盖了完整的能力光谱。

## 核心架构

```
Module (页面)
  ├── Layout (布局)
  │     ├── Page 1: 对象表格 + 过滤器
  │     ├── Page 2: 对象详情 + 图表
  │     └── Overlay (抽屉/弹窗)
  ├── Widget (UI组件)
  │     ├── Object Table / List / View / Map / Chart ...
  │     └── 配置绑定 Variable + Ontology
  ├── Variable (数据状态)
  │     ├── 输入：接收外部数据
  │     └── 输出：传递内部状态
  ├── Event (用户交互)
  │     └── Set Variable / Switch Page / Open Overlay / Execute Action
  └── Action (Ontology 写操作)
        └── Create / Modify / Delete Objects & Links
```

## 核心属性

### 1. Variables — 数据流动的命脉

Variable 是 Workshop 的数据状态管理机制。所有 Widget 通过 Variable 连接数据和交互。

**完整 Variable 类型**：

| 类型 | 用途 | 示例场景 |
|------|------|---------|
| **Static** | 硬编码常量 | 配置阈值、默认值 |
| **Object** | 单个 Ontology 对象 | 当前选中的产品 |
| **Object Set** | 一组 Ontology 对象 | 过滤后的产品列表 |
| **String** | 文本值 | 搜索关键词 |
| **Integer / Double** | 数值 | 预算金额、评分 |
| **Boolean** | 真/假 | 是否启用自动调价 |
| **Date / Timestamp** | 日期时间 | 分析时间范围 |
| **String Array** | 字符串数组 | 多选标签 |
| **Struct** | 结构化对象 | 复杂配置 |
| **Function-backed** | 函数计算结果 | 产品健康度评分 |

**Variable Transformations**：可通过事件动态转换 Variable 值（例如：选中的产品 ID → 获取产品名称）。

### 2. Events — 用户交互驱动

Event 定义了"用户做了什么 → 系统如何反应"。Events 按配置顺序**顺序执行，但不等待前置 Event 的下游计算完成**。如需完整传播，将 Events 拆分为多次用户触发。

**四类事件**：

| 事件类别 | 示例 | 触发源 |
|---------|------|--------|
| **Layout Events** | Switch to Page / Expand Section / Switch Tab | Button / Table Row Click |
| **Layer Events** | Open Drawer / Open Modal / Close Overlay | Button / Table Row Click |
| **Variable Events** | Set Variable Value / Reset Variable | Button / Dropdown Change |
| **Action Events** | Execute Action (Create/Modify/Delete) | Button / Inline Action Form |

**关键行为差异**：
- Switch to Page → **不更新** Variable-backed 的页面选择 Variable
- Switch Tab → **会更新** Variable-backed 的 Tab 选择 Variable
- 需要同步时用 Set Variable Value Event 代替

### 3. Layouts — 页面结构

**页面（Page）**：Module 内的顶层导航单元。通过 Layout Event 切换。

**可折叠区块（Collapsible Section）**：支持 Boolean Variable 控制折叠状态。三个可用事件：Expand / Collapse / Toggle。

**Tab 区块**：支持 String Variable 控制选中 Tab。Tab 切换会自动更新绑定的 Variable。

**变量驱动布局（Variable-backed Layouts）**：
- 页面选择：String Variable 值决定当前页面
- 区块折叠：Boolean Variable 决定展开/折叠

**Loop Layouts**：对 Object Set 或 Array 循环渲染嵌入式 Module，每个对象/条目一个实例。

### 4. Module Interface — 封装与复用

Module Interface 定义 Module 对外暴露的变量——父 Module 嵌入时映射参数，URL 初始化。

**URL 初始化模式**：
```
/workshop/app/latest/module?variable.productId=LIL-0001
```
这使得应用支持深度链接和跨应用跳转。

### 5. Embedded Modules — 模块嵌套

嵌入式 Module Widget 可将一个 Module 嵌入另一个，并建立变量映射。在父 Module 中选择对象 → 子 Module 自动展示该对象详情。

## 构建实战：Flight Alert 应用

以官方 Getting Started 教程为例，构建一个航班告警管理应用：

```
Schema 设计：
  Object Type: Flight (航班号, 出发地, 目的地, 状态)
  Object Type: Alert (优先级, 描述, 关联航班, 状态)
  Link Type: Flight → Alert (一对多)

Module 拆分：
  1. Flight List Module
     - Widget: Object Table (航班列表)
     - Filter: 状态过滤
     - Variable: selectedFlight → 传递给子 Module
  2. Flight Details Module (Embedded)
     - Widget: Object View (航班详情)
     - Widget: Object Table (关联 Alerts)
     - Variable: flightId (从父 Module 接收)
  3. Alert Inbox Module
     - Widget: Object Table (告警列表)
     - Event: 点击行 → Set Variable selectedAlert
     - Widget: Object View (告警详情)
     - Action: "Resolve Alert" Button → Action Effect

Workflow Lineage 节点追踪：
  Flight → Alert link → Workshop Widget → Variable → Event → Action
```

## 外贸应用

### LILIS Workshop 等效架构

```
LILIS 运营仪表盘 Workshop-Style 设计

Module: P4P监控页
  Layout: Tab (关键词表现 / 预算趋势 / 竞品对比)
  Variable: selectedCampaign (Object), dateRange (Date[])
  Widget: Object Table (P4P关键词列表)
  Widget: Chart XY (CTR趋势)
  Event: 点击行 → Set Variable selectedKeyword → Open Drawer (关键词详情)

Module: 产品管理页 (Embedded by productId)
  Variable: productId (Object)
  Widget: Object View (产品详情)
  Widget: Object Table (关联询盘)
  Widget: Object Table (关联P4P关键词)
  Action: "下架修改重上架" Button → Delist-Modify-Relist Workflow

Module Interface (URL深度链接):
  /dashboard/latest/p4p?campaign=CP-001&dateRange=2026-05-01..2026-05-21
  /dashboard/latest/product?product=LIL-0001
```

### 事件驱动运营示例

```python
# Event → Action Flow (LILIS 等效)
# 用户点击"自动调整出价"按钮
Event: Button Click
  ↓ Set Variable: targetCPC = currentCPC * 0.9
  ↓ Execute Action: AdjustBid(campaign="CP-001", newCPC=targetCPC)
  ↓ Set Variable: status = "调价成功"
  ↓ Notification: Toast "出价已调整至 $0.45"
```

## 常见问题

**Q: Variable 和 Widget Property 的区别？**
A: Widget Property 是静态配置（如表格列宽），Variable 是动态状态（如当前选中的行）。Variables 可在 Widget 间共享和传递。

**Q: Events 不等待前置 Event 的下游计算完成——这会造成问题吗？**
A: 如果后续 Event 依赖前置 Event 的结果，建议拆分为多次用户触发事件。例如：先点击"计算"→ 等待结果显示 → 再点击"保存"。

**Q: Embedded Module 和 Iframe Widget 的区别？**
A: Embedded Module 是原生 Workshop 组件，共享 Variable 和 Ontology 上下文。Iframe 是外部页面嵌入，无法直接传递 Ontology 数据。

**Q: LILIS 仪表盘如何模拟 Embedded Module？**
A: 父子页面的数据传递通过 URL 参数（如 `?product=LIL-0001`）或 JavaScript postMessage 实现。

## 相关链接
- [[应用构建总览]] — 完整 App Building 生态
- [[Automate与工作流]] — Automate + Workflow Lineage
- [[Ontology应用生态]] — Workshop Widget 完整列表
- [[OSDK深度]] — OSDK 与 Workshop 协作
- [[LILIS数据模型v2]] — LILIS Ontology
- [[Data-Health与告警]]
- [[主页]]
- [[术语索引]]
