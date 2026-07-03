import { useState, useMemo } from 'react'
import { View, Text } from '@tarojs/components'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TrendingUp, TrendingDown, Minus, Droplets, Zap, Sparkles, Shield, Heart } from 'lucide-react-taro'
import { useProjectStore } from '@/store/useProjectStore'
import { getProjectConfig } from '@/config/projectMapping'
import type { ProjectMetric } from '@/config/projectMapping'
import { REPORT_MOCK_DATA } from '@/config/mockData'
import './index.css'

/** lucide 图标名称 → 组件映射（使用 any 兼容 lucide FC<IconProps>） */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ICON_COMPONENT: Record<string, any> = {
  zap: Zap,
  droplets: Droplets,
  trending: TrendingUp,
  sparkles: Sparkles,
  shield: Shield,
  heart: Heart,
}

const PRIMARY_PURPLE = 'rgb(210, 170, 204)'
const DEEP_PLUM = 'rgb(78, 18, 98)'
const MUTED_PURPLE = '#8C8894'
const SOFT_ROSE = '#C4A0A0'

type TimeRange = '7' | '30' | '90'

const ReportPage = () => {
  const currentProject = useProjectStore((s) => s.currentProject)
  const config = useMemo(() => getProjectConfig(currentProject), [currentProject])

  // 动态指标列表 & 默认选中第一个
  const metrics = config.metrics
  const [timeRange, setTimeRange] = useState<TimeRange>('7')
  const [activeMetricKey, setActiveMetricKey] = useState(metrics[0]?.key ?? '')

  // 当项目切换时，如果当前 activeMetricKey 不在新项目的指标中，自动切到第一个
  const effectiveActiveKey = metrics.find((m) => m.key === activeMetricKey)
    ? activeMetricKey
    : metrics[0]?.key ?? ''

  // 从通用 mock 数据中按当前项目指标 key 提取时序数据
  const filteredData = useMemo(() => {
    const days = parseInt(timeRange)
    return REPORT_MOCK_DATA.slice(-days)
  }, [timeRange])

  const currentMetric = metrics.find((m: ProjectMetric) => m.key === effectiveActiveKey)!
  const latestValue = (filteredData[filteredData.length - 1]?.[effectiveActiveKey] as number) ?? 0
  const prevValue =
    filteredData.length > 1
      ? ((filteredData[filteredData.length - 2]?.[effectiveActiveKey] as number) ?? latestValue)
      : latestValue
  const diff = latestValue - prevValue

  const chartData = useMemo(() => {
    const values = filteredData.map((d) => (d[effectiveActiveKey] as number) ?? 0)
    const max = Math.max(...values) * 1.1
    const min = Math.min(...values) * 0.9
    const range = max - min || 1
    return values.map((v) => ({
      value: v,
      ratio: (v - min) / range,
    }))
  }, [filteredData, effectiveActiveKey])

  const getTrendIcon = () => {
    if (Math.abs(diff) < 0.1) return <Minus size={14} color={MUTED_PURPLE} />
    if (currentMetric.higher) {
      return diff > 0 ? (
        <TrendingUp size={14} color={PRIMARY_PURPLE} />
      ) : (
        <TrendingDown size={14} color={SOFT_ROSE} />
      )
    }
    return diff < 0 ? (
      <TrendingDown size={14} color={PRIMARY_PURPLE} />
    ) : (
      <TrendingUp size={14} color={SOFT_ROSE} />
    )
  }

  const chartHeight = 160

  /** 根据指标 icon 名称渲染对应图标 */
  const renderMetricIcon = (iconName: string, size: number, color: string) => {
    const Icon = ICON_COMPONENT[iconName]
    return Icon ? <Icon size={size} color={color} /> : <Zap size={size} color={color} />
  }

  return (
    <View className="min-h-screen bg-background pb-8">
      {/* 页面标题 */}
      <View className="px-6 pt-5 pb-3">
        <Text className="block text-xl font-semibold tracking-tight text-foreground">
          皮肤报告
        </Text>
        <Text className="block text-sm text-muted-foreground mt-1">
          {config.name} — 追踪各项指标的量化趋势
        </Text>
      </View>

      {/* 时间范围切换 */}
      <View className="px-6 pb-2">
        <Tabs defaultValue="7" onValueChange={(v) => setTimeRange(v as TimeRange)}>
          <TabsList className="bg-secondary rounded-full p-1">
            <TabsTrigger
              value="7"
              className="rounded-full text-sm data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:luxury-shadow-sm"
            >
              7天
            </TabsTrigger>
            <TabsTrigger
              value="30"
              className="rounded-full text-sm data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:luxury-shadow-sm"
            >
              30天
            </TabsTrigger>
            <TabsTrigger
              value="90"
              className="rounded-full text-sm data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:luxury-shadow-sm"
            >
              90天
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </View>

      {/* 核心指标卡片 */}
      <View className="px-6 mt-3">
        <Card className="luxury-shadow border-0 rounded-2xl">
          <CardContent className="p-6">
            <View className="flex items-center justify-between mb-2">
              <Text className="block text-sm text-muted-foreground">
                {currentMetric.label}
              </Text>
              <View className="flex items-center gap-1">
                {getTrendIcon()}
                <Text
                  className="text-xs font-medium"
                  style={{
                    color:
                      Math.abs(diff) < 0.1
                        ? MUTED_PURPLE
                        : diff > 0
                          ? PRIMARY_PURPLE
                          : SOFT_ROSE,
                  }}
                >
                  {diff > 0 ? '+' : ''}
                  {diff.toFixed(1)}
                </Text>
              </View>
            </View>
            <View className="flex items-baseline gap-2">
              <Text className="text-4xl font-bold" style={{ color: DEEP_PLUM }}>
                {latestValue.toFixed(1)}
              </Text>
              <Text className="text-sm text-muted-foreground">{currentMetric.unit}</Text>
            </View>

            {/* 折线图 */}
            <View
              className="mt-6 relative"
              style={{ height: `${chartHeight}px`, width: '100%' }}
            >
              {/* Y 轴参考线 */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
                <View
                  key={i}
                  className="absolute left-0 right-0"
                  style={{ bottom: `${ratio * 100}%`, borderTop: '1px dashed #F0EDF2' }}
                />
              ))}
              {/* 折线圆点 */}
              <View className="absolute inset-0 flex items-end justify-between">
                {chartData.map((point, i) => (
                  <View key={i} className="flex flex-col items-center" style={{ flex: 1 }}>
                    <View
                      className="w-2 h-2 rounded-full mb-0"
                      style={{
                        backgroundColor: currentMetric.color,
                        marginBottom: `${point.ratio * (chartHeight - 20)}px`,
                      }}
                    />
                  </View>
                ))}
              </View>
              {/* SVG 折线 + 面积 */}
              <svg
                className="absolute inset-0"
                viewBox={`0 0 ${chartData.length * 40} ${chartHeight}`}
                preserveAspectRatio="none"
                style={{ width: '100%', height: '100%' }}
              >
                <path
                  d={chartData
                    .map((p, i) => {
                      const x = (i / (chartData.length - 1)) * (chartData.length * 40)
                      const y = chartHeight - 10 - p.ratio * (chartHeight - 20)
                      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
                    })
                    .join(' ')}
                  fill="none"
                  stroke={currentMetric.color}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d={
                    chartData
                      .map((p, i) => {
                        const x = (i / (chartData.length - 1)) * (chartData.length * 40)
                        const y = chartHeight - 10 - p.ratio * (chartHeight - 20)
                        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
                      })
                      .join(' ') +
                    ` L ${((chartData.length - 1) / (chartData.length - 1)) * chartData.length * 40} ${chartHeight} L 0 ${chartHeight} Z`
                  }
                  fill={currentMetric.color}
                  fillOpacity="0.06"
                />
              </svg>
            </View>

            {/* X 轴日期 */}
            <View className="flex justify-between mt-3">
              {filteredData
                .filter(
                  (_, i) =>
                    i % Math.ceil(filteredData.length / 5) === 0 ||
                    i === filteredData.length - 1,
                )
                .map((d) => (
                  <Text key={d.date} className="text-xs text-muted-foreground">
                    {d.date}
                  </Text>
                ))}
            </View>
          </CardContent>
        </Card>
      </View>

      {/* 指标选择 - 动态化 */}
      <View className="px-6 mt-6">
        <Text className="block text-sm font-semibold text-foreground mb-4">
          切换指标
        </Text>
        <View className="grid grid-cols-2 gap-4">
          {metrics.map((metric: ProjectMetric) => {
            const val =
              (filteredData[filteredData.length - 1]?.[metric.key] as number) ?? 0
            const isActive = effectiveActiveKey === metric.key
            return (
              <Card
                key={metric.key}
                className={`cursor-pointer transition-all rounded-2xl ${isActive ? 'luxury-shadow border-0' : 'luxury-shadow-sm border-0'}`}
                style={isActive ? { borderLeft: `3px solid ${metric.color}` } : undefined}
                onClick={() => setActiveMetricKey(metric.key)}
              >
                <CardContent className="p-4">
                  <View className="flex items-center gap-2 mb-2">
                    {renderMetricIcon(metric.icon, 14, metric.color)}
                    <Text className="text-xs text-muted-foreground">{metric.label}</Text>
                  </View>
                  <View className="flex items-baseline gap-1">
                    <Text
                      className="text-2xl font-bold"
                      style={{ color: isActive ? DEEP_PLUM : undefined }}
                    >
                      {val.toFixed(1)}
                    </Text>
                    <Text className="text-xs text-muted-foreground">{metric.unit}</Text>
                  </View>
                </CardContent>
              </Card>
            )
          })}
        </View>
      </View>

      {/* 智能分析建议 - 动态化 */}
      <View className="px-6 mt-6">
        <Card
          className="luxury-shadow-sm border-0 rounded-2xl"
          style={{
            background:
              'linear-gradient(135deg, rgba(154, 140, 152, 0.06) 0%, rgba(74, 59, 78, 0.03) 100%)',
          }}
        >
          <CardContent className="p-5">
            <Text className="block text-sm font-semibold text-foreground mb-3">
              智能分析建议
            </Text>
            <Text className="block text-xs text-muted-foreground leading-relaxed">
              近 7 天数据显示，您的「{currentMetric.label}」指标呈
              {Math.abs(diff) < 0.1
                ? '平稳'
                : (currentMetric.higher && diff > 0) || (!currentMetric.higher && diff < 0)
                  ? '稳步改善'
                  : '波动'}
              趋势，变化幅度 {Math.abs(diff).toFixed(1)} {currentMetric.unit}。
              {config.suggestion.desc}
            </Text>
          </CardContent>
        </Card>
      </View>

      <View className="h-4" />
    </View>
  )
}

export default ReportPage
