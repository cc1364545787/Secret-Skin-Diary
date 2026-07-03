# DESIGN.md - 肌秘日志 (Skin Journal)

## 气质与意象

清晨六点的日式护肤仪式。白色陶瓷碗中盛着清水，旁边放着一片刚摘下的鼠尾草叶。晨光透过亚麻纱帘，在大理石台面上投下柔和的条纹光影。一切都是安静的、有序的、克制的——这不是医疗诊所的冰冷，而是一个人对自我修复过程的温柔记录。

用户打开这个小程序时，感受到的应该是"翻开自己的护肤手帐"，而非"进入一个医疗系统"。

## 视觉策略

- **图像方向**：真实皮肤质感，不做磨皮美化。对比照是唯一的核心视觉资产。
- **图形语言**：细线条（1px border）、极轻的阴影（shadow-sm）、大量留白。数据图表用柔和曲线而非锐利折线。
- **图标风格**：线性图标，stroke-width 1.5，圆角端点。
- **卡片设计**：纯白卡片在暖灰背景上浮起，圆角 lg，无彩色边框。

## 配色方案

| 角色 | 色值 | 意象来源 | Tailwind 映射 |
|------|------|----------|---------------|
| 主色 | #7C9A8E (Sage Green) | 鼠尾草叶，修复与生长 | --primary |
| 主色文字 | #FFFFFF | 白瓷 | --primary-foreground |
| 背景 | #F8F7F4 (Warm Linen) | 亚麻纱帘的暖白 | --background |
| 前景文字 | #2D3436 (Charcoal) | 炭笔记录 | --foreground |
| 卡片 | #FFFFFF (Pure White) | 白色陶瓷碗 | --card |
| 次级背景 | #F0EFEB (Raw Silk) | 生丝质感 | --secondary |
| 次级文字 | #636E72 (Warm Gray) | 铅笔痕迹 | --muted-foreground |
| 强调金 | #C4A265 (Soft Gold) | 晨光中的金色条纹 | --accent-gold |
| 成功 | #A8D8C8 (Mint) | 薄荷冷敷贴 | --success |
| 警示 | #E8A0A0 (Soft Coral) | 轻微泛红的皮肤 | --warning |
| 边框 | #E8E6E1 (Linen Edge) | 亚麻布边缘 | --border |

## 字体排版

- **中文**：系统默认（-apple-system, PingFang SC）
- **数字**：DIN Alternate / Tabular Nums（数据展示时等宽对齐）
- **排版节奏**：
  - 页面标题：text-xl font-semibold tracking-tight
  - 卡片标题：text-base font-medium
  - 正文：text-sm
  - 辅助说明：text-xs text-muted-foreground
  - 数据大字：text-3xl font-light（轻盈感，不笨重）

## 动效与交互

- **运动性格**：克制、平稳。像水面涟漪，不是弹跳球。
- **缓动曲线**：ease-out（进入），ease-in-out（状态切换）
- **过渡时长**：200ms（微交互），300ms（页面切换）
- **打卡完成**：Checkbox 填充动画 + 轻微 scale(1.05) 回弹
- **滑块对比**：跟手响应，无延迟，滑动时分割线有微弱 glow

## 设计禁忌

- 不要使用纯蓝色系（#0066FF 等）——这是护肤日志，不是 SaaS 后台
- 不要使用渐变按钮或渐变背景——克制，不花哨
- 不要使用圆角超过 lg 的卡片——保持精致感
- 不要使用饱和度过高的颜色——所有颜色都像是"蒙了一层纱"
- 不要出现"医疗诊断"、"治疗"等词汇——用"护肤日志"、"数据记录"、"智能分析建议"
- 不要使用超过 3 种颜色的页面——主色 + 中性色 + 最多一个语义色
- 不要使用粗重阴影——只用 shadow-sm 或 shadow-md
- 不要使用大面积纯灰色块——背景要有暖色调
