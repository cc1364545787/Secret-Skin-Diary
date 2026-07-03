import { useState } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Camera,
  CircleCheck,
  Circle,
  Sun,
  Droplets,
  ChevronRight,
  Sparkles,
  Shield
} from 'lucide-react-taro'
import './index.css'

interface TaskItem {
  id: string
  title: string
  desc: string
  completed: boolean
  icon: React.ReactNode
  action?: () => void
}

const DEEP_PLUM = 'rgb(78, 18, 98)'
const PRIMARY_PURPLE = 'rgb(210, 170, 204)'

const IndexPage = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([
    {
      id: '1',
      title: '拍摄今日皮肤照片',
      desc: '正脸 + 左右45°各一张',
      completed: false,
      icon: <Camera size={20} color={PRIMARY_PURPLE} />
    },
    {
      id: '2',
      title: '使用医用冷敷贴',
      desc: '术后修复黄金期，建议早晚各一次',
      completed: false,
      icon: <Droplets size={20} color={PRIMARY_PURPLE} />
    },
    {
      id: '3',
      title: '严格物理防晒',
      desc: 'SPF50+ 防晒霜 + 遮阳帽',
      completed: false,
      icon: <Sun size={20} color={DEEP_PLUM} />
    }
  ])

  const projectName = '超光子'
  const daysAfterProcedure = 3

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }

  const goToCamera = () => {
    Taro.navigateTo({ url: '/pages/camera/index' })
  }

  const goToCompare = () => {
    Taro.switchTab({ url: '/pages/compare/index' })
  }

  const goToReport = () => {
    Taro.switchTab({ url: '/pages/report/index' })
  }

  const completedCount = tasks.filter(t => t.completed).length
  const progressPercent = (completedCount / tasks.length) * 100

  return (
    <View className="min-h-screen bg-background">
      {/* 顶部状态栏 - 深紫渐变 */}
      <View className="px-6 pt-8 pb-8 rounded-b-3xl" style={{ background: 'linear-gradient(135deg, rgb(78, 18, 98) 0%, rgb(138, 118, 142) 100%)' }}>
        <View className="flex items-center gap-2 mb-3">
          <Sparkles size={18} color="#FFFFFF" />
          <Text className="block text-white text-sm font-medium opacity-90">
            护肤日志
          </Text>
        </View>
        <Text className="block text-white text-2xl font-semibold mb-1">
          这是你「{projectName}」
        </Text>
        <Text className="block text-white text-2xl font-semibold">
          术后的第 <Text className="font-bold" style={{ fontSize: '28px' }}>{daysAfterProcedure}</Text> 天
        </Text>
        
        {/* 🔴 修复后的进度条区域：改用显式且兼容性更强的 rgba 声明 */}
        <View className="mt-5 rounded-2xl p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.12)' }}>
          <View className="flex items-center justify-between mb-2">
            <Text className="block text-white text-xs opacity-90">
              今日进度
            </Text>
            <Text className="block text-white text-xs font-semibold">
              {completedCount}/{tasks.length}
            </Text>
          </View>
          {/* 进度条轨道背景设为半透明白 */}
          <View className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
            {/* 高亮进度填充 */}
            <View
              className="h-full rounded-full"
              style={{
                width: `${progressPercent}%`,
                backgroundColor: '#FFFFFF',
                transition: 'width 0.3s ease-out'
              }}
            />
          </View>
        </View>
      </View>

      {/* 今日任务 */}
      <View className="px-6 -mt-4">
        <Card className="luxury-shadow border-0 rounded-2xl">
          <CardContent className="p-5">
            <View className="flex items-center justify-between mb-4">
              <Text className="block text-foreground text-base font-semibold">
                今日任务
              </Text>
              <Badge
                variant="secondary"
                className="bg-secondary text-muted-foreground text-xs rounded-full px-3"
              >
                {completedCount === tasks.length ? '已完成' : '进行中'}
              </Badge>
            </View>

            <View className="space-y-1">
              {tasks.map((task, index) => (
                <View key={task.id}>
                  <View
                    className="flex items-center gap-4 py-3"
                    onClick={() => {
                      if (task.id === '1') {
                        if (!task.completed) {
                          toggleTask(task.id)
                        }
                        goToCamera()
                      } else {
                        toggleTask(task.id)
                      }
                    }}
                  >
                    {task.completed ? (
                      <CircleCheck size={22} color={PRIMARY_PURPLE} />
                    ) : (
                      <Circle size={22} color="#F0EDF2" />
                    )}
                    <View className="flex-1">
                      <Text
                        className={`block text-sm font-medium ${task.completed ? 'text-muted-foreground line-through' : 'text-foreground'}`}
                      >
                        {task.title}
                      </Text>
                      <Text className="block text-xs text-muted-foreground mt-1">
                        {task.desc}
                      </Text>
                    </View>
                    {task.icon}
                  </View>
                  {index < tasks.length - 1 && (
                    <Separator style={{ marginLeft: '36px', backgroundColor: '#F0EDF2' }} />
                  )}
                </View>
              ))}
            </View>
          </CardContent>
        </Card>
      </View>

      {/* 快捷入口 */}
      <View className="px-6 mt-6">
        <Text className="block text-foreground text-base font-semibold mb-4">
          快捷入口
        </Text>
        <View className="flex gap-4">
          <Card
            className="flex-1 luxury-shadow-sm border-0 rounded-2xl cursor-pointer"
            onClick={goToCompare}
          >
            <CardContent className="p-5 flex flex-col items-center gap-3">
              <View className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(154, 140, 152, 0.1)' }}>
                <Shield size={22} color={PRIMARY_PURPLE} />
              </View>
              <Text className="block text-sm font-medium text-foreground">
                疗效对比
              </Text>
              <Text className="block text-xs text-muted-foreground text-center">
                查看前后变化
              </Text>
            </CardContent>
          </Card>
          <Card
            className="flex-1 luxury-shadow-sm border-0 rounded-2xl cursor-pointer"
            onClick={goToReport}
          >
            <CardContent className="p-5 flex flex-col items-center gap-3">
              <View className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(74, 59, 78, 0.08)' }}>
                <Sparkles size={22} color={DEEP_PLUM} />
              </View>
              <Text className="block text-sm font-medium text-foreground">
                皮肤报告
              </Text>
              <Text className="block text-xs text-muted-foreground text-center">
                量化数据分析
              </Text>
            </CardContent>
          </Card>
        </View>
      </View>

      {/* 术后保养建议 */}
      <View className="px-6 mt-6 mb-8">
        <Text className="block text-foreground text-base font-semibold mb-4">
          术后黄金期保养建议
        </Text>
        <Card className="luxury-shadow-sm border-0 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(154, 140, 152, 0.06) 0%, rgba(74, 59, 78, 0.03) 100%)' }}>
          <CardContent className="p-5">
            <View className="flex items-start gap-4">
              <View className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(154, 140, 152, 0.1)' }}>
                <Droplets size={24} color={PRIMARY_PURPLE} />
              </View>
              <View className="flex-1">
                <Text className="block text-sm font-semibold text-foreground mb-1">
                  医用冷敷贴推荐
                </Text>
                <Text className="block text-xs text-muted-foreground leading-relaxed">
                  术后72小时内建议使用医用级冷敷贴，帮助镇静修复肌肤屏障，减少红肿不适。
                </Text>
                <View className="flex items-center justify-between mt-4">
                  <Text className="block text-xs font-medium" style={{ color: DEEP_PLUM }}>
                    查看合规好物
                  </Text>
                  <ChevronRight size={14} color={DEEP_PLUM} />
                </View>
              </View>
            </View>
          </CardContent>
        </Card>
      </View>

      {/* 底部安全区 */}
      <View className="h-6" />
    </View>
  )
}

export default IndexPage