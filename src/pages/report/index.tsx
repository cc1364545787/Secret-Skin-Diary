import { useState, useMemo } from 'react'
import { View, Text } from '@tarojs/components'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TrendingUp, TrendingDown, Minus, Droplets, Zap } from 'lucide-react-taro'
import './index.css'

interface MetricData {
  date: string
  firmness: number
  pigmentArea: number
  acneCount: number
  wrinkleScore: number
}

const MOCK_DATA: MetricData[] = [
  { date: '06-27', firmness: 72, pigmentArea: 18.5, acneCount: 5, wrinkleScore: 78 },
  { date: '06-28', firmness: 74, pigmentArea: 17.2, acneCount: 4, wrinkleScore: 79 },
  { date: '06-29', firmness: 76, pigmentArea: 16.8, acneCount: 4, wrinkleScore: 80 },
  { date: '06-30', firmness: 78, pigmentArea: 15.1, acneCount: 3, wrinkleScore: 82 },
  { date: '07-01', firmness: 80, pigmentArea: 14.3, acneCount: 3, wrinkleScore: 84 },
  { date: '07-02', firmness: 82, pigmentArea: 13.6, acneCount: 2, wrinkleScore: 86 },
  { date: '07-03', firmness: 85, pigmentArea: 12.4, acneCount: 2, wrinkleScore: 88 },
  { date: '07-04', firmness: 84, pigmentArea: 12.8, acneCount: 3, wrinkleScore: 87 },
  { date: '07-05', firmness: 86, pigmentArea: 11.9, acneCount: 2, wrinkleScore: 89 },
  { date: '07-06', firmness: 88, pigmentArea: 11.2, acneCount: 1, wrinkleScore: 90 },
  { date: '07-07', firmness: 87, pigmentArea: 11.5, acneCount: 2, wrinkleScore: 89 },
  { date: '07-08', firmness: 89, pigmentArea: 10.8, acneCount: 1, wrinkleScore: 91 },
  { date: '07-09', firmness: 90, pigmentArea: 10.2, acneCount: 1, wrinkleScore: 91 },
  { date: '07-10', firmness: 88.5, pigmentArea: 12.4, acneCount: 2, wrinkleScore: 91 }
]

type TimeRange = '7' | '30' | '90'
type MetricKey = 'firmness' | 'pigmentArea' | 'acneCount' | 'wrinkleScore'

interface MetricConfig {
  key: MetricKey
  label: string
  unit: string
  color: string
  higher: boolean
}

const PRIMARY_PURPLE = 'rgb(210, 170, 204)'
const DEEP_PLUM = 'rgb(78, 18, 98)'
const MUTED_PURPLE = '#8C8894'
const SOFT_ROSE = '#C4A0A0'

const METRICS: MetricConfig[] = [
  { key: 'firmness', label: '紧致度', unit: '分', color: PRIMARY_PURPLE, higher: true },
  { key: 'pigmentArea', label: '色斑面积', unit: 'mm²', color: DEEP_PLUM, higher: false },
  { key: 'acneCount', label: '红肿痘痘', unit: '个', color: SOFT_ROSE, higher: false },
  { key: 'wrinkleScore', label: '细纹评分', unit: '分', color: MUTED_PURPLE, higher: true }
]

const ReportPage = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('7')
  const [activeMetric, setActiveMetric] = useState<MetricKey>('firmness')

  const filteredData = useMemo(() => {
    const days = parseInt(timeRange)
    return MOCK_DATA.slice(-days)
  }, [timeRange])

  const currentMetric = METRICS.find(m => m.key === activeMetric)!
  const latestValue = filteredData[filteredData.length - 1]?.[activeMetric] ?? 0
  const prevValue = filteredData.length > 1 ? filteredData[filteredData.length - 2][activeMetric] : latestValue
  const diff = latestValue - prevValue

  const chartData = useMemo(() => {
    const values = filteredData.map(d => d[activeMetric])
    const max = Math.max(...values) * 1.1
    const min = Math.min(...values) * 0.9
    const range = max - min || 1
    return values.map(v => ({
      value: v,
      ratio: (v - min) / range
    }))
  }, [filteredData, activeMetric])

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
  const chartWidth = '100%'

  return (
    <View className="min-h-screen bg-background pb-8">
      {/* 页面标题 */}
      <View className="px-6 pt-5 pb-3">
        <Text className="block text-xl font-semibold tracking-tight text-foreground">
          皮肤报告
        </Text>
        <Text className="block text-sm text-muted-foreground mt-1">
          追踪各项指标的量化趋势
        </Text>
      </View>

      {/* 时间范围切换 */}
      <View className="px-6 pb-2">
        <Tabs defaultValue="7" onValueChange={(v) => setTimeRange(v as TimeRange)}>
          <TabsList className="bg-secondary rounded-full p-1">
            <TabsTrigger value="7" className="rounded-full text-sm data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:luxury-shadow-sm">
              7天
            </TabsTrigger>
            <TabsTrigger value="30" className="rounded-full text-sm data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:luxury-shadow-sm">
              30天
            </TabsTrigger>
            <TabsTrigger value="90" className="rounded-full text-sm data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:luxury-shadow-sm">
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
                    color: Math.abs(diff) < 0.1 ? MUTED_PURPLE : diff > 0 ? PRIMARY_PURPLE : SOFT_ROSE
                  }}
                >
                  {diff > 0 ? '+' : ''}{diff.toFixed(1)}
                </Text>
              </View>
            </View>
            <View className="flex items-baseline gap-2">
              <Text className="text-4xl font-bold" style={{ color: DEEP_PLUM }}>
                {latestValue.toFixed(1)}
              </Text>
              <Text className="text-sm text-muted-foreground">
                {currentMetric.unit}
              </Text>
            </View>

            {/* 折线图 */}
            <View className="mt-6 relative" style={{ height: `${chartHeight}px`, width: chartWidth }}>
              {/* Y轴参考线 */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
                <View
                  key={i}
                  className="absolute left-0 right-0"
                  style={{ bottom: `${ratio * 100}%`, borderTop: '1px dashed #F0EDF2' }}
                />
              ))}
              {/* 折线 */}
              <View className="absolute inset-0 flex items-end justify-between">
                {chartData.map((point, i) => (
                  <View key={i} className="flex flex-col items-center" style={{ flex: 1 }}>
                    <View
                      className="w-2 h-2 rounded-full mb-0"
                      style={{
                        backgroundColor: currentMetric.color,
                        marginBottom: `${point.ratio * (chartHeight - 20)}px`
                      }}
                    />
                  </View>
                ))}
              </View>
              {/* SVG 折线 */}
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
                  d={chartData
                    .map((p, i) => {
                      const x = (i / (chartData.length - 1)) * (chartData.length * 40)
                      const y = chartHeight - 10 - p.ratio * (chartHeight - 20)
                      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
                    })
                    .join(' ') +
                    ` L ${(chartData.length - 1) / (chartData.length - 1) * chartData.length * 40} ${chartHeight} L 0 ${chartHeight} Z`}
                  fill={currentMetric.color}
                  fillOpacity="0.06"
                />
              </svg>
            </View>

            {/* X轴日期 */}
            <View className="flex justify-between mt-3">
              {filteredData
                .filter((_, i) => i % Math.ceil(filteredData.length / 5) === 0 || i === filteredData.length - 1)
                .map(d => (
                  <Text key={d.date} className="text-xs text-muted-foreground">
                    {d.date}
                  </Text>
                ))}
            </View>
          </CardContent>
        </Card>
      </View>

      {/* 指标选择 */}
      <View className="px-6 mt-6">
        <Text className="block text-sm font-semibold text-foreground mb-4">
          切换指标
        </Text>
        <View className="grid grid-cols-2 gap-4">
          {METRICS.map(metric => {
            const val = filteredData[filteredData.length - 1]?.[metric.key] ?? 0
            const isActive = activeMetric === metric.key
            return (
              <Card
                key={metric.key}
                className={`cursor-pointer transition-all rounded-2xl ${
                  isActive ? 'luxury-shadow border-0' : 'luxury-shadow-sm border-0'
                }`}
                style={isActive ? { borderLeft: `3px solid ${metric.color}` } : undefined}
                onClick={() => setActiveMetric(metric.key)}
              >
                <CardContent className="p-4">
                  <View className="flex items-center gap-2 mb-2">
                    {metric.key === 'firmness' && <Zap size={14} color={metric.color} />}
                    {metric.key === 'pigmentArea' && <Droplets size={14} color={metric.color} />}
                    {metric.key === 'wrinkleScore' && <TrendingUp size={14} color={metric.color} />}
                    <Text className="text-xs text-muted-foreground">
                      {metric.label}
                    </Text>
                  </View>
                  <View className="flex items-baseline gap-1">
                    <Text className="text-2xl font-bold" style={{ color: isActive ? DEEP_PLUM : undefined }}>
                      {val.toFixed(1)}
                    </Text>
                    <Text className="text-xs text-muted-foreground">
                      {metric.unit}
                    </Text>
                  </View>
                </CardContent>
              </Card>
            )
          })}
        </View>
      </View>

      {/* 智能分析建议 */}
      <View className="px-6 mt-6">
        <Card className="luxury-shadow-sm border-0 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(154, 140, 152, 0.06) 0%, rgba(74, 59, 78, 0.03) 100%)' }}>
          <CardContent className="p-5">
            <Text className="block text-sm font-semibold text-foreground mb-3">
              智能分析建议
            </Text>
            <Text className="block text-xs text-muted-foreground leading-relaxed">
              近7天数据显示，您的紧致度指标呈稳步上升趋势，平均提升2.1分。色斑面积持续缩小，修复效果良好。建议继续保持当前护理方案，注意防晒和补水。
            </Text>
          </CardContent>
        </Card>
      </View>

      <View className="h-4" />
    </View>
  )
}

export default ReportPage
