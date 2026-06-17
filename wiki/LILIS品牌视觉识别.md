---
tags:
  - LILIS
  - 品牌
  - 视觉识别
  - Logo
  - 配色
  - 字体
created: 2026-06-13
agent: Agent
source: "lilisaura.com globals.css + AI Logo Design Session"
confidence: high
---

# LILIS 品牌视觉识别

> 本文档记录 LILIS 品牌最终确定的视觉识别系统，包括 Logo、配色、字体和多尺寸资产。
> 所有数值均来源于 lilisaura.com 线上代码（globals.css），为当前生产环境实际使用的规范。

---

## 一、Logo 设计

### 设计概念

LILIS Logo 采用**现代几何**风格，核心元素为两个交叠菱形（diamond），象征品牌的联结与信赖。

| 属性 | 说明 |
|------|------|
| 风格 | 现代几何（Modern Geometric） |
| 核心图形 | 两个 45° 旋转正方形交叠，形成菱形视觉 |
| 设计理念 | 交叠 = 联结/信赖；几何 = 专业/现代 |
| 适用场景 | 独立站 lilisaura.com、社交媒体、产品包装、名片 |
| 设计日期 | 2026-06-13 |

### 图形元素

```
┌─────────────────────────────┐
│      ╱╲     ╱╲              │
│    ╱    ╲ ╱    ╲            │  ← 两个 45° 旋转正方形
│  ╱  Orange ╲ Navy  ╲        │     Orange (后): 左偏
│    ╲    ╱ ╲    ╱            │     Navy (前): 右偏
│      ╲╱     ╲╱              │     交叠区域产生层次感
│       ●      ●              │  ← 两个橙色圆点（"I" 字母上方装饰）
│                             │
│       L I L I S             │  ← 品牌名（Inter 800, 全大写）
│      lilisaura              │  ← 副品牌名（Inter 400, 灰色）
└─────────────────────────────┘
```

### Logo 变体

| 变体 | 说明 | 文件 |
|------|------|------|
| **Light（标准版）** | 白色/透明背景，Navy 菱形 + Navy 文字 | `lilis_logo_light.svg` |
| **Dark（深色版）** | Dark Navy 背景，White 菱形 + White 文字 | `lilis_logo_dark.svg` |

### 安全区域与最小尺寸

| 场景 | 最小宽度 | 安全区域 |
|------|---------|---------|
| 网页导航 | 120px | Logo 高度 × 0.5 四周留白 |
| Favicon | 16px | 仅使用菱形图标，不含文字 |
| 印刷品 | 25mm | Logo 高度 × 0.5 四周留白 |

---

## 二、品牌配色

> 以下配色来源于 lilisaura.com 线上 `globals.css` CSS 变量，为当前生产环境标准。

### 主色板

| 色名 | HEX | RGB | CSS 变量 | 用途 |
|------|-----|-----|---------|------|
| **Burnt Orange** | `#E8530E` | 232,83,14 | `--brand-primary` | 主品牌色 — Logo 菱形、CTA 按钮、强调元素 |
| **Dark Navy** | `#1A1A2E` | 26,26,46 | `--brand-dark` | 深色元素 — Logo 菱形、导航栏、标题文字 |
| **Dark Gray** | `#2D2D3F` | 45,45,63 | `--brand-gray-900` | 正文文字色 |

### 功能色

| 色名 | HEX | CSS 变量 | 用途 |
|------|-----|---------|------|
| **Conversion Green** | `#059669` | `--brand-success` | 成功状态、库存有货、价格优惠 |
| **Trust Blue** | `#1E40AF` | `--brand-trust` | 信任标识、认证徽章 |
| **Burnt Orange Hover** | `#C9440A` | `--brand-primary-hover` | 主色 Hover 状态 |

### 配色使用规则

```
1. Burnt Orange 用于: Logo 图形、主 CTA 按钮、价格强调、"I" 字母装饰圆点
2. Dark Navy 用于: Logo 文字/图形、导航栏背景、标题文字
3. 每个页面主色不超过 3 种: Burnt Orange + Dark Navy + 1 功能色
4. Burnt Orange Hover 仅用于按钮/链接的 hover 状态
5. 文字对比度: Dark Navy on White ≥ 7:1 (WCAG AAA)
```

### 配色历史演变

| 时期 | 配色方案 | 来源 | 状态 |
|------|---------|------|------|
| 2026-05 (品牌手册 PPTX) | Rose Gold #B76E79 + Blush Pink #F5E6E8 + Metallic Gold #D4AF37 | LILIS_Brand_Manual.pptx | ❌ 已弃用 |
| 2026-06-06 (设计系统初版) | Sage Green #7C9070 + Warm Ivory #FAF6F0 + Soft Gold #C8A96E | Wiki 设计系统草案 | ❌ 已弃用 |
| **2026-06-13 (当前)** | **Burnt Orange #E8530E + Dark Navy #1A1A2E** | lilisaura.com globals.css | ✅ **现行标准** |

---

## 三、字体系统

> 与 lilisaura.com 线上代码一致。

### 主字体

| 用途 | 字体 | 字重 | CSS 变量 |
|------|------|------|---------|
| **标题 (H1-H6)** | Inter | 700-800 | `--font-heading` |
| **正文/按钮** | Open Sans | 400-600 | `--font-body` |

### 回退字体链

```
标题: "Inter", ui-sans-serif, system-ui, sans-serif
正文: "Open Sans", ui-sans-serif, system-ui, sans-serif
```

### 品牌名排版规则

```
1. 品牌名永远全大写: "LILIS"（绝不写成 "Lilis" 或 "lilis"）
2. Logo 中品牌名字重: 800 (ExtraBold)
3. 副品牌名 "lilisaura" 全小写，字重 400
4. 字间距: Logo 品牌名 letter-spacing: 4px
```

---

## 四、多尺寸资产清单

所有 PNG 资产均有 light 和 dark 两个版本，存放于 `raw/logo_assets/`（关键文件）和工作目录 `outputs/lilis_png/`（完整集）。

### 宽幅 Logo（含图标 + 文字）

| 名称 | 尺寸 | 用途 |
|------|------|------|
| navbar-200 | 200×140 | 移动端导航栏 |
| navbar-400 | 400×280 | 桌面端导航栏 |
| og-1200 | 1200×840 | OG 社交分享图 |
| banner-2400 | 2400×1680 | 超大 Banner / 印刷 |

### 方形图标（仅菱形图标）

| 名称 | 尺寸 | 用途 |
|------|------|------|
| favicon-16 | 16×16 | 浏览器 Favicon |
| favicon-32 | 32×32 | 浏览器标签 |
| favicon-48 | 48×48 | Windows 磁贴 |
| apple-touch-180 | 180×180 | iOS 主屏幕 |
| android-192 | 192×192 | Android 图标 |
| pwa-512 | 512×512 | PWA 安装图标 |
| avatar-256 | 256×256 | 社交头像 |
| icon-1024 | 1024×1024 | App Store 图标 |

### 方形完整 Logo（图标 + 文字，正方形）

| 名称 | 尺寸 | 用途 |
|------|------|------|
| sq-256 | 256×256 | 社交媒体头像 |
| sq-512 | 512×512 | 高清社交头像 |

### SVG 矢量源文件

| 文件 | 说明 |
|------|------|
| `lilis_logo_light.svg` | 浅色背景矢量版（viewBox 0 0 400 280） |
| `lilis_logo_dark.svg` | 深色背景矢量版（viewBox 0 0 400 280） |

---

## 五、使用规范

### 正确用法

- Logo 在浅色背景上使用 Light 版本
- Logo 在深色背景（#1A1A2E 或类似）上使用 Dark 版本
- 保持原始比例，不拉伸变形
- 四周保留充足安全区域

### 禁止用法

- ❌ 不要改变 Logo 颜色（仅使用 Light/Dark 两版）
- ❌ 不要旋转或倾斜 Logo
- ❌ 不要在 Logo 上叠加文字或图形
- ❌ 不要使用阴影、发光等特效
- ❌ 不要将品牌名 "LILIS" 写成非大写形式

---

## 相关链接

- [[LILIS品牌手册]] — 品牌定位与价值主张
- [[独立站设计系统]] — 完整 UI 设计系统（组件/间距/动效）
- [[独立站网页设计专案]] — 独立站战略规划
- [[lilisaura.com建站进度追踪]] — 建站开发进度
- [[LILIS-婚庆派对用品]] — 品牌总览
- [[主页]]
- [[术语索引]]
