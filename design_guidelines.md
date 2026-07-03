# 设计指南 - 肌秘日志

## 品牌定位

- **应用定位**：医美护肤数字化追踪日志，帮助用户记录术后修复过程
- **设计风格**：现代高级奢华 × 烟熏紫科技美学，神秘、克制、高贵
- **目标用户**：25-45岁高净值护肤/医美用户

## 配色方案

| 角色 | Tailwind 类名 | 色值 | 用途 |
|------|--------------|------|------|
| 主色 | `bg-primary` / `text-primary` | #9A8C98 (烟熏紫) | 按钮、激活态、关键标识 |
| 强调色 | — | #4A3B4E (深李子紫) | 关键标题、强调按钮 |
| 背景 | `bg-background` | #F7F5F8 (微紫灰) | 页面底色 |
| 卡片 | `bg-card` | #FFFFFF | 卡片、浮层 |
| 前景 | `text-foreground` | #3D3A45 (深石墨灰紫) | 主文字（严禁纯黑） |
| 次级文字 | `text-muted-foreground` | #8C8894 (中灰紫) | 辅助说明 |
| 次级背景 | `bg-secondary` | #F0EDF2 (淡紫灰) | 分组区域底色 |
| 边框 | `border-border` | #F0EDF2 (极淡灰紫) | 分割线、卡片边框 |
| 强调金 | `text-amber-500` | #C4A265 | PRO 会员标识 |
| 成功 | `text-emerald-500` | #8CC9A8 | 打卡完成、健康指标 |
| 警示 | `text-rose-400` | #D49090 | 异常提醒 |

## 字体规范

- 页面标题：`text-xl font-semibold tracking-tight text-foreground`
- 卡片标题：`text-base font-medium text-foreground`
- 正文：`text-sm text-foreground`
- 辅助说明：`text-xs text-muted-foreground`
- 关键数据：`text-3xl font-bold`（颜色使用深李子紫 #4A3B4E）
- 天数/天数标记：`text-2xl font-bold text-primary`

## 间距系统（呼吸感设计）

- 页面边距：`px-6`（左右 24px，比常规更宽）
- 卡片内边距：`p-5` 或 `p-6`（留足呼吸感）
- 卡片间距：`mb-6` 或 `gap-5`（大间距）
- 区块间距：`space-y-8`（大区块）/ `space-y-5`（小分组）
- 列表项间距：`gap-4`（宽松）

## 容器样式

- 卡片：`bg-card rounded-2xl` + 弥散阴影（`shadow-[0_8px_30px_rgba(74,59,78,0.06)]`）
- 去除粗边框，改用极淡灰紫线条或纯阴影分割
- 按钮：胶囊形 `rounded-full`，底色灰紫，文字纯白
- 输入框：`bg-secondary rounded-xl px-4 py-3`
- 分组区域：`bg-secondary rounded-2xl p-5`

## 阴影规范

- 卡片悬浮：`shadow-[0_8px_30px_rgba(74,59,78,0.06)]`
- 轻阴影：`shadow-[0_4px_12px_rgba(74,59,78,0.04)]`
- 禁止纯黑阴影，所有阴影带微弱紫色环境光

## 组件使用原则

- 按钮、输入框、弹窗、Tabs、Toast、Card、Badge、Progress、Separator 等通用 UI 组件统一优先从 `@/components/ui/*` 导入
- 新页面开发前，先拆分 UI 单元，再映射到组件库已有组件
- 禁止用 View/Text 手搓通用组件

## 导航结构

TabBar 包含 4 个页面：
1. **首页**（House 图标）- 今日日程、项目状态、皮肤简报
2. **报告**（TrendingUp 图标）- 数据趋势、量化指标
3. **对比**（Split 图标）- 左右滑块对比照
4. **我的**（User 图标）- 个人信息、PRO 订阅

拍照页从首页任务列表跳转进入（navigateTo）。

## 小程序约束

- 包体积控制在 2MB 以内
- 图片资源使用 TOS 对象存储 URL
- 相机组件需做 H5 降级处理
- Canvas 绘图需注意跨端兼容性

## 合规文案规范

- 禁止使用"医疗诊断"、"治疗"、"处方"、"医生建议"
- 统一使用"护肤日志"、"数据记录"、"智能分析建议"、"修复保养计划"
