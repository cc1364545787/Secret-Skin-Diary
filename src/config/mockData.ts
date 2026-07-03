/**
 * 报告页 & 对比页的通用 Mock 数据
 *
 * key 与 projectMapping.ts 中所有 ProjectMetric.key 的并集对齐，
 * 页面根据当前项目的 metrics 列表动态选取对应 key 的数据。
 */

// ─── 报告页时序数据（14 天） ─────────────────────────────────

export interface MetricDailyEntry {
  date: string
  [key: string]: number | string
}

export const REPORT_MOCK_DATA: MetricDailyEntry[] = [
  { date: '06-27', redness: 42, pigmentFade: 35, smoothness: 68, hydration: 52, jawline: 65, fullness: 70, firmness: 72, wrinkle: 78, lifting: 60, glow: 65, brightness: 70, evenTone: 68, barrier: 75, oilBalance: 70, pore: 62, texture: 65, sensitivity: 45 },
  { date: '06-28', redness: 40, pigmentFade: 38, smoothness: 69, hydration: 54, jawline: 66, fullness: 71, firmness: 74, wrinkle: 79, lifting: 61, glow: 66, brightness: 71, evenTone: 69, barrier: 76, oilBalance: 71, pore: 63, texture: 66, sensitivity: 43 },
  { date: '06-29', redness: 38, pigmentFade: 42, smoothness: 71, hydration: 55, jawline: 67, fullness: 71, firmness: 76, wrinkle: 80, lifting: 63, glow: 68, brightness: 72, evenTone: 70, barrier: 77, oilBalance: 72, pore: 64, texture: 67, sensitivity: 41 },
  { date: '06-30', redness: 35, pigmentFade: 45, smoothness: 73, hydration: 58, jawline: 68, fullness: 72, firmness: 78, wrinkle: 82, lifting: 64, glow: 70, brightness: 74, evenTone: 72, barrier: 78, oilBalance: 73, pore: 65, texture: 69, sensitivity: 39 },
  { date: '07-01', redness: 33, pigmentFade: 48, smoothness: 74, hydration: 60, jawline: 70, fullness: 73, firmness: 80, wrinkle: 84, lifting: 66, glow: 72, brightness: 75, evenTone: 73, barrier: 79, oilBalance: 74, pore: 67, texture: 70, sensitivity: 37 },
  { date: '07-02', redness: 30, pigmentFade: 52, smoothness: 76, hydration: 62, jawline: 71, fullness: 74, firmness: 82, wrinkle: 86, lifting: 68, glow: 73, brightness: 77, evenTone: 75, barrier: 80, oilBalance: 75, pore: 68, texture: 72, sensitivity: 35 },
  { date: '07-03', redness: 28, pigmentFade: 55, smoothness: 78, hydration: 64, jawline: 72, fullness: 75, firmness: 85, wrinkle: 88, lifting: 70, glow: 75, brightness: 78, evenTone: 76, barrier: 82, oilBalance: 76, pore: 70, texture: 73, sensitivity: 33 },
  { date: '07-04', redness: 30, pigmentFade: 53, smoothness: 77, hydration: 63, jawline: 73, fullness: 75, firmness: 84, wrinkle: 87, lifting: 69, glow: 74, brightness: 77, evenTone: 75, barrier: 81, oilBalance: 75, pore: 69, texture: 72, sensitivity: 34 },
  { date: '07-05', redness: 26, pigmentFade: 58, smoothness: 79, hydration: 65, jawline: 74, fullness: 76, firmness: 86, wrinkle: 89, lifting: 72, glow: 76, brightness: 79, evenTone: 77, barrier: 83, oilBalance: 77, pore: 71, texture: 74, sensitivity: 32 },
  { date: '07-06', redness: 24, pigmentFade: 62, smoothness: 81, hydration: 67, jawline: 76, fullness: 77, firmness: 88, wrinkle: 90, lifting: 74, glow: 78, brightness: 80, evenTone: 78, barrier: 84, oilBalance: 78, pore: 73, texture: 76, sensitivity: 30 },
  { date: '07-07', redness: 25, pigmentFade: 60, smoothness: 80, hydration: 66, jawline: 75, fullness: 77, firmness: 87, wrinkle: 89, lifting: 73, glow: 77, brightness: 79, evenTone: 77, barrier: 83, oilBalance: 77, pore: 72, texture: 75, sensitivity: 31 },
  { date: '07-08', redness: 22, pigmentFade: 65, smoothness: 82, hydration: 68, jawline: 77, fullness: 78, firmness: 89, wrinkle: 91, lifting: 76, glow: 79, brightness: 81, evenTone: 79, barrier: 85, oilBalance: 79, pore: 74, texture: 77, sensitivity: 28 },
  { date: '07-09', redness: 20, pigmentFade: 68, smoothness: 84, hydration: 70, jawline: 78, fullness: 79, firmness: 90, wrinkle: 91, lifting: 78, glow: 80, brightness: 82, evenTone: 80, barrier: 86, oilBalance: 80, pore: 75, texture: 78, sensitivity: 26 },
  { date: '07-10', redness: 21, pigmentFade: 66, smoothness: 83, hydration: 69, jawline: 79, fullness: 80, firmness: 88.5, wrinkle: 91, lifting: 77, glow: 80, brightness: 82, evenTone: 80, barrier: 85, oilBalance: 79, pore: 75, texture: 77, sensitivity: 27 },
]

// ─── 对比页术前术后数据 ──────────────────────────────────────

export interface CompareMetricEntry {
  label: string
  key: string
  unit: string
  before: number
  after: number
}

/**
 * 按 metric key 索引的对比数据。
 * 页面根据当前项目的 metrics 列表动态选取。
 */
export const COMPARE_MOCK_DATA: Record<string, CompareMetricEntry> = {
  redness: { label: '微红度', key: 'redness', unit: '分', before: 42, after: 21 },
  pigmentFade: { label: '色素淡化', key: 'pigmentFade', unit: '%', before: 35, after: 66 },
  smoothness: { label: '细腻度', key: 'smoothness', unit: '分', before: 68, after: 83 },
  hydration: { label: '含水量', key: 'hydration', unit: '%', before: 52, after: 69 },
  jawline: { label: '下颌线紧致度', key: 'jawline', unit: '分', before: 65, after: 79 },
  fullness: { label: '轮廓饱满度', key: 'fullness', unit: '分', before: 70, after: 80 },
  firmness: { label: '紧致度', key: 'firmness', unit: '分', before: 72, after: 88.5 },
  wrinkle: { label: '细纹改善', key: 'wrinkle', unit: '分', before: 78, after: 91 },
  lifting: { label: '提升效果', key: 'lifting', unit: '分', before: 60, after: 77 },
  glow: { label: '光泽度', key: 'glow', unit: '分', before: 65, after: 80 },
  brightness: { label: '亮度', key: 'brightness', unit: '分', before: 70, after: 82 },
  evenTone: { label: '肤色均匀度', key: 'evenTone', unit: '分', before: 68, after: 80 },
  barrier: { label: '屏障健康度', key: 'barrier', unit: '分', before: 75, after: 85 },
  oilBalance: { label: '水油平衡', key: 'oilBalance', unit: '分', before: 70, after: 79 },
  pore: { label: '毛孔细致度', key: 'pore', unit: '分', before: 62, after: 75 },
  texture: { label: '肤质平整度', key: 'texture', unit: '分', before: 65, after: 77 },
  sensitivity: { label: '敏感度', key: 'sensitivity', unit: '分', before: 45, after: 27 },
}
