/**
 * 皮肤管理项目数据映射字典
 *
 * 集中维护所有项目的分类、任务、建议、追踪指标等配置。
 * 页面组件通过 currentProject 从本字典中读取对应数据，严禁硬编码 if-else。
 */

// ─── 类型定义 ────────────────────────────────────────────────

export type ProjectCategory =
  | 'photoelectric'
  | 'invasive'
  | 'daily'
  | 'whitening'
  | 'injection'
  | 'rf'
  | 'peel'
  | 'laser'
  | 'custom'

export interface ProjectTask {
  title: string
  desc: string
  icon: string
}

export interface ProjectSuggestion {
  title: string
  desc: string
  linkText: string
}

export interface ProjectMetric {
  key: string
  label: string
  unit: string
  color: string
  higher: boolean
  icon: string
}

export interface SkinProjectConfig {
  name: string
  category: ProjectCategory
  categoryLabel: string
  tasks: ProjectTask[]
  suggestion: ProjectSuggestion
  metrics: ProjectMetric[]
}

// ─── 颜色常量 ────────────────────────────────────────────────

const PRIMARY_PURPLE = 'rgb(210, 170, 204)'
const DEEP_PLUM = 'rgb(78, 18, 98)'
const MUTED_PURPLE = '#8C8894'
const SOFT_ROSE = '#C4A0A0'

// ─── 预设项目列表 ────────────────────────────────────────────

export const PRESET_PROJECTS = [
  '日常护肤',
  '亮肤美白',
  '抗炎修复',
  '水光针',
  '超声炮',
  '热玛吉',
  '超光子',
  '黄金微针',
  '刷酸',
  '超皮秒',
] as const

export const DEFAULT_PROJECT = '超光子'

// ─── 项目映射字典 ────────────────────────────────────────────

export const PROJECT_MAP: Record<string, SkinProjectConfig> = {
  超光子: {
    name: '超光子',
    category: 'photoelectric',
    categoryLabel: '光电类',
    tasks: [
      { title: '严格物理防晒', desc: 'SPF50+ 防晒霜 + 遮阳帽', icon: 'sun' },
      { title: '医用冷敷贴镇静', desc: '术后 72 小时内早晚各一次', icon: 'droplets' },
      { title: '禁止使用果酸产品', desc: '避免刺激术后敏感肌肤', icon: 'shield' },
    ],
    suggestion: {
      title: '术后修复重点',
      desc: '超光子术后重点在于色素代谢与光热修复，建议持续使用医用冷敷贴 72 小时，配合修复类精华加速恢复。',
      linkText: '查看术后护理指南',
    },
    metrics: [
      { key: 'redness', label: '微红度', unit: '分', color: SOFT_ROSE, higher: false, icon: 'zap' },
      { key: 'pigmentFade', label: '色素淡化', unit: '%', color: PRIMARY_PURPLE, higher: true, icon: 'droplets' },
      { key: 'smoothness', label: '细腻度', unit: '分', color: DEEP_PLUM, higher: true, icon: 'trending' },
      { key: 'hydration', label: '含水量', unit: '%', color: MUTED_PURPLE, higher: true, icon: 'droplets' },
    ],
  },

  热玛吉: {
    name: '热玛吉',
    category: 'photoelectric',
    categoryLabel: '光电类',
    tasks: [
      { title: '严格物理防晒', desc: 'SPF50+ 防晒霜 + 遮阳帽', icon: 'sun' },
      { title: '医用冷敷贴镇静', desc: '术后 48 小时内使用', icon: 'droplets' },
      { title: '禁止使用果酸产品', desc: '2 周内避免酸性护肤品', icon: 'shield' },
    ],
    suggestion: {
      title: '胶原增生黄金期',
      desc: '热玛吉术后 3-6 个月为胶原蛋白增生高峰期，效果持续显现。注意补水保湿，避免高温环境（桑拿、温泉）。',
      linkText: '查看紧致提升指南',
    },
    metrics: [
      { key: 'jawline', label: '下颌线紧致度', unit: '分', color: DEEP_PLUM, higher: true, icon: 'trending' },
      { key: 'fullness', label: '轮廓饱满度', unit: '分', color: PRIMARY_PURPLE, higher: true, icon: 'zap' },
      { key: 'firmness', label: '皮肤紧致度', unit: '分', color: MUTED_PURPLE, higher: true, icon: 'zap' },
      { key: 'wrinkle', label: '细纹改善', unit: '分', color: SOFT_ROSE, higher: true, icon: 'trending' },
    ],
  },

  超声炮: {
    name: '超声炮',
    category: 'photoelectric',
    categoryLabel: '光电类',
    tasks: [
      { title: '严格物理防晒', desc: 'SPF50+ 防晒霜 + 遮阳帽', icon: 'sun' },
      { title: '医用冷敷贴镇静', desc: '术后 48 小时内使用', icon: 'droplets' },
      { title: '禁止使用果酸产品', desc: '2 周内避免酸性护肤品', icon: 'shield' },
    ],
    suggestion: {
      title: '胶原增生黄金期',
      desc: '超声炮术后 3-6 个月为胶原蛋白重塑期，SMAS 层持续收缩提升。避免高温环境，注重深层补水。',
      linkText: '查看提升紧致指南',
    },
    metrics: [
      { key: 'jawline', label: '下颌线紧致度', unit: '分', color: DEEP_PLUM, higher: true, icon: 'trending' },
      { key: 'fullness', label: '轮廓饱满度', unit: '分', color: PRIMARY_PURPLE, higher: true, icon: 'zap' },
      { key: 'lifting', label: '提升效果', unit: '分', color: MUTED_PURPLE, higher: true, icon: 'trending' },
      { key: 'firmness', label: '皮肤紧致度', unit: '分', color: SOFT_ROSE, higher: true, icon: 'zap' },
    ],
  },

  水光针: {
    name: '水光针',
    category: 'invasive',
    categoryLabel: '有创/破皮类',
    tasks: [
      { title: '24 小时内禁水', desc: '避免生水接触治疗区域', icon: 'droplets' },
      { title: '涂抹表皮生长因子', desc: 'EGF 促进创面修复', icon: 'sparkles' },
      { title: '加强补水保湿', desc: '使用医用修复面膜', icon: 'heart' },
    ],
    suggestion: {
      title: '水合修复黄金期',
      desc: '水光针术后 7 天为玻尿酸稳定期，皮肤吸水量达峰值。每日使用医用修复面膜，避免化妆和剧烈运动。',
      linkText: '查看补水修复指南',
    },
    metrics: [
      { key: 'hydration', label: '含水量', unit: '%', color: PRIMARY_PURPLE, higher: true, icon: 'droplets' },
      { key: 'smoothness', label: '细腻度', unit: '分', color: DEEP_PLUM, higher: true, icon: 'trending' },
      { key: 'glow', label: '光泽度', unit: '分', color: MUTED_PURPLE, higher: true, icon: 'sparkles' },
      { key: 'pore', label: '毛孔细致度', unit: '分', color: SOFT_ROSE, higher: true, icon: 'zap' },
    ],
  },

  黄金微针: {
    name: '黄金微针',
    category: 'invasive',
    categoryLabel: '有创/破皮类',
    tasks: [
      { title: '24 小时内禁水', desc: '避免生水接触治疗区域', icon: 'droplets' },
      { title: '涂抹表皮生长因子', desc: 'EGF 促进微针通道修复', icon: 'sparkles' },
      { title: '加强补水保湿', desc: '使用医用修复面膜', icon: 'heart' },
    ],
    suggestion: {
      title: '胶原再生修复期',
      desc: '黄金微针术后 7 天为胶原重塑启动期，微针通道逐步闭合。注意防晒、禁水 24 小时，配合 EGF 修复精华。',
      linkText: '查看微针修复指南',
    },
    metrics: [
      { key: 'pore', label: '毛孔细致度', unit: '分', color: DEEP_PLUM, higher: true, icon: 'zap' },
      { key: 'texture', label: '肤质平整度', unit: '分', color: PRIMARY_PURPLE, higher: true, icon: 'trending' },
      { key: 'firmness', label: '紧致度', unit: '分', color: MUTED_PURPLE, higher: true, icon: 'zap' },
      { key: 'oilBalance', label: '水油平衡', unit: '分', color: SOFT_ROSE, higher: true, icon: 'droplets' },
    ],
  },

  刷酸: {
    name: '刷酸',
    category: 'peel',
    categoryLabel: '剥脱类',
    tasks: [
      { title: '24 小时内禁水', desc: '避免生水接触治疗区域', icon: 'droplets' },
      { title: '涂抹表皮生长因子', desc: 'EGF 加速屏障重建', icon: 'sparkles' },
      { title: '加强补水保湿', desc: '使用温和修复类护肤品', icon: 'heart' },
    ],
    suggestion: {
      title: '屏障修复关键期',
      desc: '刷酸术后 7-14 天为角质层重建期，皮肤屏障功能暂时降低。使用温和修复类产品，严格防晒，避免再次去角质。',
      linkText: '查看屏障修复指南',
    },
    metrics: [
      { key: 'barrier', label: '屏障健康度', unit: '分', color: PRIMARY_PURPLE, higher: true, icon: 'shield' },
      { key: 'redness', label: '泛红指数', unit: '分', color: SOFT_ROSE, higher: false, icon: 'zap' },
      { key: 'texture', label: '肤质平整度', unit: '分', color: DEEP_PLUM, higher: true, icon: 'trending' },
      { key: 'hydration', label: '含水量', unit: '%', color: MUTED_PURPLE, higher: true, icon: 'droplets' },
    ],
  },

  日常护肤: {
    name: '日常护肤',
    category: 'daily',
    categoryLabel: '日常保养',
    tasks: [
      { title: '温和洁面', desc: '氨基酸洁面乳，水温不超过 37°C', icon: 'droplets' },
      { title: '保湿补水', desc: '精华 + 面霜锁水', icon: 'heart' },
      { title: '防晒保护', desc: 'SPF30+ 日常防晒', icon: 'sun' },
    ],
    suggestion: {
      title: '日常保养要点',
      desc: '坚持温和清洁、充分保湿、严格防晒三大基础步骤，是维持肌肤健康状态的核心。建议每周进行一次皮肤状态记录。',
      linkText: '查看护肤百科',
    },
    metrics: [
      { key: 'hydration', label: '含水量', unit: '%', color: PRIMARY_PURPLE, higher: true, icon: 'droplets' },
      { key: 'oilBalance', label: '水油平衡', unit: '分', color: DEEP_PLUM, higher: true, icon: 'zap' },
      { key: 'smoothness', label: '细腻度', unit: '分', color: MUTED_PURPLE, higher: true, icon: 'trending' },
      { key: 'glow', label: '光泽度', unit: '分', color: SOFT_ROSE, higher: true, icon: 'sparkles' },
    ],
  },

  亮肤美白: {
    name: '亮肤美白',
    category: 'whitening',
    categoryLabel: '亮肤管理',
    tasks: [
      { title: '使用维 C 精华', desc: '早 C 晚 A，抗氧化提亮', icon: 'sparkles' },
      { title: '严格防晒', desc: 'SPF50+ 防止色素沉着', icon: 'sun' },
      { title: '补水保湿', desc: '维持肌肤水润透亮', icon: 'droplets' },
    ],
    suggestion: {
      title: '美白提亮要点',
      desc: '美白核心在于抑制黑色素生成与加速代谢。坚持使用美白精华，严格防晒，配合规律作息效果更佳。',
      linkText: '查看美白方案',
    },
    metrics: [
      { key: 'brightness', label: '亮度', unit: '分', color: PRIMARY_PURPLE, higher: true, icon: 'sparkles' },
      { key: 'pigmentFade', label: '色素淡化', unit: '%', color: DEEP_PLUM, higher: true, icon: 'droplets' },
      { key: 'evenTone', label: '肤色均匀度', unit: '分', color: MUTED_PURPLE, higher: true, icon: 'trending' },
      { key: 'glow', label: '光泽度', unit: '分', color: SOFT_ROSE, higher: true, icon: 'sparkles' },
    ],
  },

  抗炎修复: {
    name: '抗炎修复',
    category: 'daily',
    categoryLabel: '修复管理',
    tasks: [
      { title: '温和清洁', desc: '避免过度清洁破坏屏障', icon: 'droplets' },
      { title: '使用修复精华', desc: '含神经酰胺或积雪草成分', icon: 'heart' },
      { title: '物理防晒', desc: '减少紫外线对炎症的刺激', icon: 'sun' },
    ],
    suggestion: {
      title: '抗炎修复要点',
      desc: '抗炎核心在于舒缓镇静与屏障重建。选择温和无刺激的修复类产品，避免功效性成分叠加，给肌肤自我修复的时间。',
      linkText: '查看修复方案',
    },
    metrics: [
      { key: 'redness', label: '泛红指数', unit: '分', color: SOFT_ROSE, higher: false, icon: 'zap' },
      { key: 'barrier', label: '屏障健康度', unit: '分', color: PRIMARY_PURPLE, higher: true, icon: 'shield' },
      { key: 'hydration', label: '含水量', unit: '%', color: DEEP_PLUM, higher: true, icon: 'droplets' },
      { key: 'sensitivity', label: '敏感度', unit: '分', color: MUTED_PURPLE, higher: false, icon: 'heart' },
    ],
  },

  超皮秒: {
    name: '超皮秒',
    category: 'laser',
    categoryLabel: '激光类',
    tasks: [
      { title: '严格物理防晒', desc: 'SPF50+ 防晒霜 + 遮阳帽', icon: 'sun' },
      { title: '医用冷敷贴镇静', desc: '术后 72 小时内使用', icon: 'droplets' },
      { title: '禁止使用刺激性产品', desc: '2 周内避免酸类和酒精', icon: 'shield' },
    ],
    suggestion: {
      title: '色素代谢周期',
      desc: '超皮秒术后色素颗粒需 2-4 周逐步代谢排出。期间严格防晒，使用修复类产品辅助恢复，避免色素反弹。',
      linkText: '查看祛斑修复指南',
    },
    metrics: [
      { key: 'pigmentFade', label: '色素淡化', unit: '%', color: DEEP_PLUM, higher: true, icon: 'droplets' },
      { key: 'evenTone', label: '肤色均匀度', unit: '分', color: PRIMARY_PURPLE, higher: true, icon: 'trending' },
      { key: 'redness', label: '微红度', unit: '分', color: SOFT_ROSE, higher: false, icon: 'zap' },
      { key: 'smoothness', label: '细腻度', unit: '分', color: MUTED_PURPLE, higher: true, icon: 'trending' },
    ],
  },
}

// ─── 工具函数 ────────────────────────────────────────────────

/**
 * 根据项目名称获取配置。
 * 若为预设项目则直接返回；若为自定义项目则返回默认配置。
 */
export function getProjectConfig(name: string): SkinProjectConfig {
  return (
    PROJECT_MAP[name] ?? {
      name,
      category: 'custom' as ProjectCategory,
      categoryLabel: '自定义',
      tasks: [
        { title: '拍摄今日皮肤照片', desc: '正脸 + 左右 45° 各一张', icon: 'camera' },
        { title: '基础保湿补水', desc: '使用温和保湿产品', icon: 'droplets' },
        { title: '严格防晒', desc: 'SPF50+ 防晒霜', icon: 'sun' },
      ],
      suggestion: {
        title: '自定义项目护理',
        desc: '当前为自定义护肤项目，建议根据具体项目类型调整护理方案，坚持每日记录皮肤状态。',
        linkText: '查看通用护理指南',
      },
      metrics: [
        { key: 'hydration', label: '含水量', unit: '%', color: PRIMARY_PURPLE, higher: true, icon: 'droplets' },
        { key: 'smoothness', label: '细腻度', unit: '分', color: DEEP_PLUM, higher: true, icon: 'trending' },
        { key: 'firmness', label: '紧致度', unit: '分', color: MUTED_PURPLE, higher: true, icon: 'zap' },
        { key: 'glow', label: '光泽度', unit: '分', color: SOFT_ROSE, higher: true, icon: 'sparkles' },
      ],
    }
  )
}
