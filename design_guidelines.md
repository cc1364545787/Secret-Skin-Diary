# 设计指南 - 肌秘日志

## 品牌定位

- **应用定位**：医美护肤数字化追踪日志，帮助用户记录术后修复过程
- **设计风格**：微冷淡医疗美学 × 日式极简护肤仪式，克制、安静、专业但不冰冷
- **目标用户**：25-40岁关注医美护肤的女性用户

## 配色方案

| 角色 | Tailwind 类名 | 色值 | 用途 |
|------|--------------|------|------|
| 主色 | `bg-primary` / `text-primary` | #7C9A8E (Sage Green) | 按钮、激活态、关键标识 |
| 背景 | `bg-background` | #F8F7F4 (Warm Linen) | 页面底色 |
| 卡片 | `bg-card` | #FFFFFF | 卡片、浮层 |
| 前景 | `text-foreground` | #2D3436 (Charcoal) | 主文字 |
| 次级文字 | `text-muted-foreground` | #636E72 | 辅助说明 |
| 次级背景 | `bg-secondary` | #F0EFEB | 分组区域底色 |
| 边框 | `border-border` | #E8E6E1 | 分割线、卡片边框 |
| 强调金 | `text-amber-600` | #C4A265 | PRO 会员标识 |
| 成功 | `text-emerald-400` | #A8D8C8 | 打卡完成、健康指标 |
| 警示 | `text-rose-300` | #E8A0A0 | 异常提醒 |

## 字体规范

- 页面标题：`text-xl font-semibold tracking-tight`
- 卡片标题：`text-base font-medium`
- 正文：`text-sm`
- 辅助说明：`text-xs text-muted-foreground`
- 数据大字：`text-3xl font-light`

## 间距系统

- 页面边距：`px-5`（左右 20px）
- 卡片内边距：`p-4` 或 `p-5`
- 卡片间距：`gap-3` 或 `gap-4`
- 元素间距：`gap-2`（紧凑）/ `gap-3`（常规）
- 区块间距：`space-y-6`（大区块）/ `space-y-4`（小分组）

## 容器样式

- 卡片：`bg-card rounded-lg shadow-sm border border-border`
- 分组区域：`bg-secondary rounded-xl p-4`
- 按钮：`rounded-lg`（常规）/ `rounded-full`（胶囊）
- 输入框：`bg-secondary rounded-lg`

## 组件使用原则

- 按钮、输入框、弹窗、Tabs、Toast、Card、Badge、Progress、Separator 等通用 UI 组件统一优先从 `@/components/ui/*` 导入
- 新页面开发前，先拆分 UI 单元，再映射到组件库已有组件
- 禁止用 View/Text 手搓通用组件

## 导航结构

TabBar 包含 4 个页面：
1. **首页**（House 图标）- 今日日程、项目状态、皮肤简报
2. **报告**（BarChart3 图标）- 数据趋势、量化指标
3. **对比**（Columns 图标）- 左右滑块对比照
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
