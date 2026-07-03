import { useState, useRef, useMemo } from 'react'
import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Download, Eye, EyeOff, ChevronLeft, ChevronRight } from 'lucide-react-taro'
import { useProjectStore } from '@/store/useProjectStore'
import { getProjectConfig } from '@/config/projectMapping'
import { COMPARE_MOCK_DATA } from '@/config/mockData'
import './index.css'

const MOCK_BEFORE =
  'https://lf-coze-web-cdn.coze.cn/obj/eden-cn/lm-lgvj/ljhwZthlaukjlkulzlp/coze-coding/icon/coze-coding.gif'
const MOCK_AFTER =
  'https://lf-coze-web-cdn.coze.cn/obj/eden-cn/lm-lgvj/ljhwZthlaukjlkulzlp/coze-coding/icon/coze-coding.gif'

const DEEP_PLUM = 'rgb(78, 18, 98)'
const FOREGROUND_PURPLE = '#3D3A45'

const ComparePage = () => {
  const currentProject = useProjectStore((s) => s.currentProject)
  const config = useMemo(() => getProjectConfig(currentProject), [currentProject])

  const [sliderPosition, setSliderPosition] = useState(50)
  const [showPrivacyMask, setShowPrivacyMask] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<any>(null) // eslint-disable-line @typescript-eslint/no-explicit-any

  // 根据当前项目配置动态生成关键指标对比数据
  const compareItems = useMemo(() => {
    return config.metrics.map((m) => {
      const mock = COMPARE_MOCK_DATA[m.key]
      return {
        label: m.label,
        before: mock?.before ?? 0,
        after: mock?.after ?? 0,
        unit: m.unit,
        better: m.higher
          ? (mock?.after ?? 0) >= (mock?.before ?? 0)
            ? 'up'
            : 'down'
          : (mock?.after ?? 0) <= (mock?.before ?? 0)
            ? 'down'
            : 'up',
      }
    })
  }, [config.metrics])

  const handleTouchStart = () => {
    setIsDragging(true)
  }

  const handleTouchMove = (e: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    if (!isDragging && e.type !== 'touchstart') return
    const touch = e.touches?.[0] || e.changedTouches?.[0]
    if (!touch || !containerRef.current) return

    const query = Taro.createSelectorQuery()
    query.select('#compare-container').boundingClientRect()
    query.exec((res: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
      if (res && res[0]) {
        const { left, width } = res[0]
        const x = touch.clientX - left
        const percent = Math.max(0, Math.min(100, (x / width) * 100))
        setSliderPosition(percent)
      }
    })
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  const handleSave = async () => {
    Taro.showToast({ title: '正在生成对比图...', icon: 'loading' })
    setTimeout(() => {
      Taro.showToast({ title: '对比图已保存', icon: 'success' })
    }, 1500)
  }

  return (
    <View className="min-h-screen bg-background pb-8">
      {/* 页面标题 */}
      <View className="px-6 pt-5 pb-3">
        <Text className="block text-xl font-semibold tracking-tight text-foreground">
          疗效对比
        </Text>
        <Text className="block text-sm text-muted-foreground mt-1">
          {config.name} — 拖动滑块查看术前术后变化
        </Text>
      </View>

      {/* 对比区域 */}
      <View className="px-6 mt-3">
        <Card className="luxury-shadow border-0 rounded-2xl overflow-hidden">
          <CardContent className="p-0">
            <View
              id="compare-container"
              className="relative w-full overflow-hidden"
              style={{ height: '320px' }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* 底层：术后照片 */}
              <View className="absolute inset-0">
                <Image src={MOCK_AFTER} className="w-full h-full" mode="aspectFill" />
                {showPrivacyMask && (
                  <View
                    className="absolute w-3/5 h-12 rounded-full flex items-center justify-center"
                    style={{
                      top: '25%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: 'rgba(74, 59, 78, 0.65)',
                    }}
                  >
                    <Text className="text-xs text-white text-opacity-90">隐私保护</Text>
                  </View>
                )}
                <View
                  className="absolute bottom-3 right-3 rounded-full px-3 py-1"
                  style={{ backgroundColor: 'rgba(154, 140, 152, 0.85)' }}
                >
                  <Text className="text-xs text-white">术后</Text>
                </View>
              </View>

              {/* 上层：术前照片（裁剪） */}
              <View
                className="absolute top-0 bottom-0 left-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <Image
                  src={MOCK_BEFORE}
                  className="h-full"
                  style={{ width: `${100 / (sliderPosition / 100)}%`, maxWidth: 'none' }}
                  mode="aspectFill"
                />
                {showPrivacyMask && (
                  <View
                    className="absolute w-3/5 h-12 rounded-full flex items-center justify-center"
                    style={{
                      top: '25%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: 'rgba(74, 59, 78, 0.65)',
                    }}
                  >
                    <Text className="text-xs text-white text-opacity-90">隐私保护</Text>
                  </View>
                )}
                <View
                  className="absolute bottom-3 left-3 rounded-full px-3 py-1"
                  style={{ backgroundColor: 'rgba(61, 58, 69, 0.65)' }}
                >
                  <Text className="text-xs text-white">术前</Text>
                </View>
              </View>

              {/* 分割线 + 紫色光晕 */}
              <View
                className="absolute top-0 bottom-0 z-10"
                style={{
                  left: `${sliderPosition}%`,
                  transform: 'translateX(-50%)',
                  width: '2px',
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 0 12px rgba(154, 140, 152, 0.4)',
                }}
              >
                {/* 拖拽手柄 */}
                <View
                  className="absolute w-8 h-8 rounded-full bg-white flex items-center justify-center"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    boxShadow: '0 4px 16px rgba(74, 59, 78, 0.15)',
                  }}
                >
                  <ChevronLeft size={12} color={FOREGROUND_PURPLE} />
                  <ChevronRight size={12} color={FOREGROUND_PURPLE} />
                </View>
              </View>
            </View>
          </CardContent>
        </Card>
      </View>

      {/* 操作栏 */}
      <View className="px-6 mt-5">
        <View className="flex gap-4">
          <Button
            variant={showPrivacyMask ? 'default' : 'outline'}
            className={`flex-1 rounded-full py-5 ${
              showPrivacyMask
                ? 'text-primary-foreground'
                : 'border-secondary text-foreground'
            }`}
            style={showPrivacyMask ? { backgroundColor: DEEP_PLUM } : undefined}
            onClick={() => setShowPrivacyMask(!showPrivacyMask)}
          >
            {showPrivacyMask ? (
              <Eye size={16} color="#FFFFFF" className="mr-2" />
            ) : (
              <EyeOff size={16} color={FOREGROUND_PURPLE} className="mr-2" />
            )}
            <Text>{showPrivacyMask ? '已开启隐私保护' : '隐私保护'}</Text>
          </Button>
          <Button
            variant="outline"
            className="flex-1 rounded-full border-secondary text-foreground py-5"
            onClick={handleSave}
          >
            <Download size={16} color={FOREGROUND_PURPLE} className="mr-2" />
            <Text>保存对比图</Text>
          </Button>
        </View>
      </View>

      {/* 数据对比 - 动态化 */}
      <View className="px-6 mt-6">
        <Text className="block text-sm font-semibold text-foreground mb-4">
          关键指标变化
        </Text>
        <Card className="luxury-shadow border-0 rounded-2xl">
          <CardContent className="p-5">
            {compareItems.map((item, i) => (
              <View key={item.label}>
                <View className="flex items-center justify-between py-3">
                  <Text className="text-sm text-foreground font-medium">
                    {item.label}
                  </Text>
                  <View className="flex items-center gap-3">
                    <Text className="text-sm text-muted-foreground">
                      {item.before}
                      {item.unit}
                    </Text>
                    <Text className="text-xs text-muted-foreground">→</Text>
                    <Text
                      className="text-sm font-bold"
                      style={{ color: DEEP_PLUM }}
                    >
                      {item.after}
                      {item.unit}
                    </Text>
                  </View>
                </View>
                {i < compareItems.length - 1 && (
                  <Separator style={{ backgroundColor: '#F0EDF2' }} />
                )}
              </View>
            ))}
          </CardContent>
        </Card>
      </View>

      {/* 历史记录 */}
      <View className="px-6 mt-6">
        <Text className="block text-sm font-semibold text-foreground mb-4">
          历史对比记录
        </Text>
        <View className="flex gap-3 overflow-x-auto">
          {['Day 1 vs Day 3', 'Day 1 vs Day 7', 'Day 3 vs Day 7'].map((label, i) => (
            <Card
              key={i}
              className="flex-shrink-0 luxury-shadow-sm border-0 rounded-2xl cursor-pointer"
              style={{ minWidth: '150px' }}
            >
              <CardContent className="p-4">
                <View className="flex gap-2 mb-3">
                  <View className="flex-1 h-12 rounded-xl bg-secondary" />
                  <View
                    className="flex-1 h-12 rounded-xl"
                    style={{ backgroundColor: 'rgba(154, 140, 152, 0.1)' }}
                  />
                </View>
                <Text className="block text-xs text-foreground font-medium">
                  {label}
                </Text>
              </CardContent>
            </Card>
          ))}
        </View>
      </View>

      <View className="h-4" />
    </View>
  )
}

export default ComparePage
