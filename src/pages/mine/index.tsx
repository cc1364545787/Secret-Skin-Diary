import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  User,
  Crown,
  Camera,
  ChartColumn,
  Settings,
  CircleQuestionMark,
  Shield,
  ChevronRight,
  Star
} from 'lucide-react-taro'
import './index.css'

const isPro = false
const usedCapacity = 3
const maxFreeCapacity = 5

const MinePage = () => {
  const handleSubscribe = () => {
    Taro.showModal({
      title: 'PRO 尊享会员',
      content: '即将跳转至订阅页面，确认升级？',
      confirmText: '确认升级',
      cancelText: '再想想'
    })
  }

  const menuItems = [
    { icon: <Camera size={18} color="#636E72" />, label: '拍照设置', desc: '画质、角度引导' },
    { icon: <ChartColumn size={18} color="#636E72" />, label: '数据管理', desc: '导出报告、清理缓存' },
    { icon: <Shield size={18} color="#636E72" />, label: '隐私设置', desc: '照片加密、访问权限' },
    { icon: <Settings size={18} color="#636E72" />, label: '通用设置', desc: '通知、主题、语言' },
    { icon: <CircleQuestionMark size={18} color="#636E72" />, label: '帮助与反馈', desc: '常见问题、联系客服' }
  ]

  return (
    <View className="min-h-screen bg-background pb-6">
      {/* 用户卡片 */}
      <View className="px-5 pt-6 pb-4">
        <Card className="shadow-sm border border-border overflow-hidden">
          <CardContent className="p-5">
            <View className="flex items-center gap-4">
              <View className={`w-14 h-14 rounded-full flex items-center justify-center ${isPro ? 'bg-amber-50' : 'bg-secondary'}`}>
                {isPro ? (
                  <Crown size={28} color="#C4A265" />
                ) : (
                  <User size={28} color="#636E72" />
                )}
              </View>
              <View className="flex-1">
                <View className="flex items-center gap-2">
                  <Text className="block text-base font-medium text-foreground">
                    护肤达人
                  </Text>
                  {isPro ? (
                    <Badge className="bg-amber-50 text-amber-600 border-amber-200 text-xs">
                      <Star size={10} color="#C4A265" className="mr-1" />
                      PRO
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="text-xs">
                      普通用户
                    </Badge>
                  )}
                </View>
                <Text className="block text-xs text-muted-foreground mt-1">
                  {isPro
                    ? `PRO 会员有效期至 2027-07-03`
                    : '升级 PRO 解锁无限存储与高级分析'}
                </Text>
              </View>
              <ChevronRight size={18} color="#636E72" />
            </View>

            {/* 容量进度条 */}
            {!isPro && (
              <View className="mt-4 pt-4" style={{ borderTop: '1px solid #E8E6E1' }}>
                <View className="flex items-center justify-between mb-2">
                  <Text className="block text-xs text-muted-foreground">
                    已用容量
                  </Text>
                  <Text className="block text-xs text-foreground font-medium">
                    {usedCapacity}/{maxFreeCapacity} 张照片
                  </Text>
                </View>
                <View className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <View
                    className="h-full bg-primary rounded-full"
                    style={{
                      width: `${(usedCapacity / maxFreeCapacity) * 100}%`,
                      transition: 'width 0.3s ease-out'
                    }}
                  />
                </View>
                <Text className="block text-xs text-muted-foreground mt-2">
                  剩余 {maxFreeCapacity - usedCapacity} 张免费额度
                </Text>
              </View>
            )}
          </CardContent>
        </Card>
      </View>

      {/* PRO 订阅墙 */}
      {!isPro && (
        <View className="px-5 mb-4">
          <Card className="shadow-sm border-2 border-primary border-opacity-20 bg-gradient-to-br from-primary from-opacity-5 to-transparent">
            <CardContent className="p-5">
              <View className="flex items-center gap-2 mb-3">
                <Crown size={20} color="#C4A265" />
                <Text className="block text-base font-medium text-foreground">
                  升级 PRO 尊享会员
                </Text>
              </View>
              <View className="space-y-2 mb-4">
                {[
                  '无限照片存储容量',
                  'AI 智能皮肤分析',
                  '高清对比图导出',
                  '专属修复保养方案'
                ].map(item => (
                  <View key={item} className="flex items-center gap-2">
                    <View className="w-1 h-1 rounded-full bg-primary" />
                    <Text className="text-sm text-muted-foreground">{item}</Text>
                  </View>
                ))}
              </View>
              <View className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 rounded-lg border-border text-foreground"
                  onClick={handleSubscribe}
                >
                  <View className="flex flex-col items-center">
                    <Text className="block text-sm font-medium">月度</Text>
                    <Text className="block text-xs text-muted-foreground">
                      ¥19/月
                    </Text>
                  </View>
                </Button>
                <Button
                  className="flex-1 rounded-lg bg-primary text-primary-foreground"
                  onClick={handleSubscribe}
                >
                  <View className="flex flex-col items-center">
                    <Text className="block text-sm font-medium">年度推荐</Text>
                    <Text className="block text-xs text-primary-foreground text-opacity-70">
                      ¥128/年 省¥100
                    </Text>
                  </View>
                </Button>
              </View>
            </CardContent>
          </Card>
        </View>
      )}

      {/* 功能菜单 */}
      <View className="px-5">
        <Card className="shadow-sm border border-border">
          <CardContent className="p-0">
            {menuItems.map((item, i) => (
              <View key={item.label}>
                <View className="flex items-center gap-3 px-4 py-4">
                  <View className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                    {item.icon}
                  </View>
                  <View className="flex-1">
                    <Text className="block text-sm font-medium text-foreground">
                      {item.label}
                    </Text>
                    <Text className="block text-xs text-muted-foreground">
                      {item.desc}
                    </Text>
                  </View>
                  <ChevronRight size={16} color="#636E72" />
                </View>
                {i < menuItems.length - 1 && (
                  <Separator className="ml-16 bg-border" />
                )}
              </View>
            ))}
          </CardContent>
        </Card>
      </View>

      {/* 版本信息 */}
      <View className="mt-6 text-center">
        <Text className="block text-xs text-muted-foreground">
          肌秘日志 v1.0.0
        </Text>
      </View>

      <View className="h-4" />
    </View>
  )
}

export default MinePage
