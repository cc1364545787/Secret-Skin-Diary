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

const DEEP_PLUM = '#4A3B4E'
const PRIMARY_PURPLE = '#9A8C98'
const MUTED_PURPLE = '#8C8894'

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
    { icon: <Camera size={18} color={MUTED_PURPLE} />, label: '拍照设置', desc: '画质、角度引导' },
    { icon: <ChartColumn size={18} color={MUTED_PURPLE} />, label: '数据管理', desc: '导出报告、清理缓存' },
    { icon: <Shield size={18} color={MUTED_PURPLE} />, label: '隐私设置', desc: '照片加密、访问权限' },
    { icon: <Settings size={18} color={MUTED_PURPLE} />, label: '通用设置', desc: '通知、主题、语言' },
    { icon: <CircleQuestionMark size={18} color={MUTED_PURPLE} />, label: '帮助与反馈', desc: '常见问题、联系客服' }
  ]

  return (
    <View className="min-h-screen bg-background pb-8">
      {/* 用户卡片 */}
      <View className="px-6 pt-6 pb-4">
        <Card className="luxury-shadow border-0 rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            <View className="flex items-center gap-4">
              <View className={`w-14 h-14 rounded-full flex items-center justify-center ${isPro ? '' : 'bg-secondary'}`} style={isPro ? { backgroundColor: 'rgba(74, 59, 78, 0.1)' } : undefined}>
                {isPro ? (
                  <Crown size={28} color={DEEP_PLUM} />
                ) : (
                  <User size={28} color={MUTED_PURPLE} />
                )}
              </View>
              <View className="flex-1">
                <View className="flex items-center gap-2">
                  <Text className="block text-base font-semibold text-foreground">
                    护肤达人
                  </Text>
                  {isPro ? (
                    <Badge className="text-xs rounded-full px-2" style={{ backgroundColor: 'rgba(74, 59, 78, 0.1)', color: DEEP_PLUM, border: '1px solid rgba(74, 59, 78, 0.15)' }}>
                      <Star size={10} color={DEEP_PLUM} className="mr-1" />
                      PRO
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="text-xs rounded-full px-2">
                      普通用户
                    </Badge>
                  )}
                </View>
                <Text className="block text-xs text-muted-foreground mt-1">
                  {isPro
                    ? 'PRO 会员有效期至 2027-07-03'
                    : '升级 PRO 解锁无限存储与高级分析'}
                </Text>
              </View>
              <ChevronRight size={18} color={MUTED_PURPLE} />
            </View>

            {/* 容量进度条 */}
            {!isPro && (
              <View className="mt-5 pt-5" style={{ borderTop: '1px solid #F0EDF2' }}>
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
                    className="h-full rounded-full"
                    style={{
                      width: `${(usedCapacity / maxFreeCapacity) * 100}%`,
                      backgroundColor: PRIMARY_PURPLE,
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
        <View className="px-6 mb-5">
          <Card className="luxury-shadow border-0 rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(154, 140, 152, 0.08) 0%, rgba(74, 59, 78, 0.04) 100%)', borderLeft: '3px solid #4A3B4E' }}>
            <CardContent className="p-6">
              <View className="flex items-center gap-2 mb-4">
                <Crown size={20} color={DEEP_PLUM} />
                <Text className="block text-base font-semibold text-foreground">
                  升级 PRO 尊享会员
                </Text>
              </View>
              <View className="space-y-3 mb-5">
                {[
                  '无限照片存储容量',
                  'AI 智能皮肤分析',
                  '高清对比图导出',
                  '专属修复保养方案'
                ].map(item => (
                  <View key={item} className="flex items-center gap-3">
                    <View className="w-2 h-2 rounded-full" style={{ backgroundColor: PRIMARY_PURPLE }} />
                    <Text className="text-sm text-muted-foreground">{item}</Text>
                  </View>
                ))}
              </View>
              <View className="flex gap-4">
                <Button
                  variant="outline"
                  className="flex-1 rounded-full border-secondary text-foreground py-5"
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
                  className="flex-1 rounded-full text-primary-foreground py-5"
                  style={{ backgroundColor: DEEP_PLUM }}
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
      <View className="px-6">
        <Card className="luxury-shadow border-0 rounded-2xl">
          <CardContent className="p-0">
            {menuItems.map((item, i) => (
              <View key={item.label}>
                <View className="flex items-center gap-4 px-5 py-4">
                  <View className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center">
                    {item.icon}
                  </View>
                  <View className="flex-1">
                    <Text className="block text-sm font-medium text-foreground">
                      {item.label}
                    </Text>
                    <Text className="block text-xs text-muted-foreground mt-1">
                      {item.desc}
                    </Text>
                  </View>
                  <ChevronRight size={16} color={MUTED_PURPLE} />
                </View>
                {i < menuItems.length - 1 && (
                  <Separator style={{ marginLeft: '52px', backgroundColor: '#F0EDF2' }} />
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
