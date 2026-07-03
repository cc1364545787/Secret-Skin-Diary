import { useState, useRef } from 'react'
import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Download, Eye, EyeOff, ChevronLeft, ChevronRight } from 'lucide-react-taro'
import './index.css'

const MOCK_BEFORE = 'https://lf-coze-web-cdn.coze.cn/obj/eden-cn/lm-lgvj/ljhwZthlaukjlkulzlp/coze-coding/icon/coze-coding.gif'
const MOCK_AFTER = 'https://lf-coze-web-cdn.coze.cn/obj/eden-cn/lm-lgvj/ljhwZthlaukjlkulzlp/coze-coding/icon/coze-coding.gif'

const ComparePage = () => {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [showPrivacyMask, setShowPrivacyMask] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<any>(null)
  const handleTouchStart = () => {
    setIsDragging(true)
  }

  const handleTouchMove = (e: any) => {
    if (!isDragging && e.type !== 'touchstart') return
    const touch = e.touches?.[0] || e.changedTouches?.[0]
    if (!touch || !containerRef.current) return

    const query = Taro.createSelectorQuery()
    query.select('#compare-container').boundingClientRect()
    query.exec((res: any) => {
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
    <View className="min-h-screen bg-background pb-6">
      {/* 页面标题 */}
      <View className="px-5 pt-4 pb-2">
        <Text className="block text-xl font-semibold tracking-tight text-foreground">
          疗效对比
        </Text>
        <Text className="block text-sm text-muted-foreground mt-1">
          拖动滑块查看术前术后变化
        </Text>
      </View>

      {/* 对比区域 */}
      <View className="px-5 mt-2">
        <Card className="shadow-sm border border-border overflow-hidden">
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
                <Image
                  src={MOCK_AFTER}
                  className="w-full h-full"
                  mode="aspectFill"
                />
                {showPrivacyMask && (
                  <View className="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/5 h-12 bg-black bg-opacity-60 rounded-full flex items-center justify-center">
                    <Text className="text-xs text-white text-opacity-80">隐私保护</Text>
                  </View>
                )}
                <View className="absolute bottom-3 right-3 bg-primary bg-opacity-80 rounded-full px-2 py-1">
                  <Text className="text-xs text-primary-foreground">术后</Text>
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
                  <View className="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/5 h-12 bg-black bg-opacity-60 rounded-full flex items-center justify-center">
                    <Text className="text-xs text-white text-opacity-80">隐私保护</Text>
                  </View>
                )}
                <View className="absolute bottom-3 left-3 bg-foreground bg-opacity-60 rounded-full px-2 py-1">
                  <Text className="text-xs text-background">术前</Text>
                </View>
              </View>

              {/* 分割线 */}
              <View
                className="absolute top-0 bottom-0 w-1 bg-white shadow-md z-10"
                style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
              >
                {/* 拖拽手柄 */}
                <View className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center">
                  <ChevronLeft size={12} color="#2D3436" />
                  <ChevronRight size={12} color="#2D3436" />
                </View>
              </View>
            </View>
          </CardContent>
        </Card>
      </View>

      {/* 操作栏 */}
      <View className="px-5 mt-4">
        <View className="flex gap-3">
          <Button
            variant={showPrivacyMask ? 'default' : 'outline'}
            className={`flex-1 rounded-lg ${
              showPrivacyMask
                ? 'bg-primary text-primary-foreground'
                : 'border-border text-foreground'
            }`}
            onClick={() => setShowPrivacyMask(!showPrivacyMask)}
          >
            {showPrivacyMask ? (
              <Eye size={16} color="#FFFFFF" className="mr-2" />
            ) : (
              <EyeOff size={16} color="#2D3436" className="mr-2" />
            )}
            <Text>{showPrivacyMask ? '已开启隐私保护' : '隐私保护'}</Text>
          </Button>
          <Button
            variant="outline"
            className="flex-1 rounded-lg border-border text-foreground"
            onClick={handleSave}
          >
            <Download size={16} color="#2D3436" className="mr-2" />
            <Text>保存对比图</Text>
          </Button>
        </View>
      </View>

      {/* 数据对比 */}
      <View className="px-5 mt-4">
        <Text className="block text-sm font-medium text-foreground mb-3">
          关键指标变化
        </Text>
        <Card className="shadow-sm border border-border">
          <CardContent className="p-4">
            {[
              { label: '紧致度', before: 72, after: 88.5, unit: '分', better: 'up' },
              { label: '色斑面积', before: 18.5, after: 12.4, unit: 'mm²', better: 'down' },
              { label: '红肿痘痘', before: 5, after: 2, unit: '个', better: 'down' },
              { label: '细纹评分', before: 78, after: 91, unit: '分', better: 'up' }
            ].map((item, i) => (
              <View key={item.label}>
                <View className="flex items-center justify-between py-3">
                  <Text className="text-sm text-foreground">{item.label}</Text>
                  <View className="flex items-center gap-3">
                    <Text className="text-sm text-muted-foreground">
                      {item.before}{item.unit}
                    </Text>
                    <Text className="text-xs text-muted-foreground">→</Text>
                    <Text className="text-sm font-medium text-primary">
                      {item.after}{item.unit}
                    </Text>
                  </View>
                </View>
                {i < 3 && <Separator className="bg-border" />}
              </View>
            ))}
          </CardContent>
        </Card>
      </View>

      {/* 历史记录 */}
      <View className="px-5 mt-4">
        <Text className="block text-sm font-medium text-foreground mb-3">
          历史对比记录
        </Text>
        <View className="flex gap-2 overflow-x-auto">
          {['Day 1 vs Day 3', 'Day 1 vs Day 7', 'Day 3 vs Day 7'].map((label, i) => (
            <Card
              key={i}
              className="flex-shrink-0 shadow-sm border border-border cursor-pointer"
              style={{ minWidth: '140px' }}
            >
              <CardContent className="p-3">
                <View className="flex gap-1 mb-2">
                  <View className="flex-1 h-12 rounded bg-secondary" />
                  <View className="flex-1 h-12 rounded bg-primary bg-opacity-10" />
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
