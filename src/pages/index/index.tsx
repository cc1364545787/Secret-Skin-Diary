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

const IndexPage = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([
    {
      id: '1',
      title: '拍摄今日皮肤照片',
      desc: '正脸 + 左右45°各一张',
      completed: false,
      icon: <Camera size={20} color="#7C9A8E" />
    },
    {
      id: '2',
      title: '使用医用冷敷贴',
      desc: '术后修复黄金期，建议早晚各一次',
      completed: false,
      icon: <Droplets size={20} color="#7C9A8E" />
    },
    {
      id: '3',
      title: '严格物理防晒',
      desc: 'SPF50+ 防晒霜 + 遮阳帽',
      completed: false,
      icon: <Sun size={20} color="#C4A265" />
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
      {/* 顶部状态栏 */}
      <View className="bg-primary px-5 pt-8 pb-6 rounded-b-2xl">
        <View className="flex items-center gap-2 mb-2">
          <Sparkles size={18} color="#FFFFFF" />
          <Text className="block text-primary-foreground text-sm font-medium opacity-90">
            护肤日志
          </Text>
        </View>
        <Text className="block text-primary-foreground text-xl font-semibold mb-1">
          这是你「{projectName}」
        </Text>
        <Text className="block text-primary-foreground text-xl font-semibold">
          术后的第 {daysAfterProcedure} 天
        </Text>
        <View className="mt-4 bg-white bg-opacity-20 rounded-lg p-3">
          <View className="flex items-center justify-between mb-2">
            <Text className="block text-primary-foreground text-xs opacity-80">
              今日进度
            </Text>
            <Text className="block text-primary-foreground text-xs font-medium">
              {completedCount}/{tasks.length}
            </Text>
          </View>
          <View className="w-full h-2 bg-white bg-opacity-20 rounded-full overflow-hidden">
            <View
              className="h-full bg-white rounded-full"
              style={{
                width: `${progressPercent}%`,
                transition: 'width 0.3s ease-out'
              }}
            />
          </View>
        </View>
      </View>

      {/* 今日任务 */}
      <View className="px-5 -mt-3">
        <Card className="shadow-sm border border-border">
          <CardContent className="p-4">
            <View className="flex items-center justify-between mb-3">
              <Text className="block text-foreground text-base font-medium">
                今日任务
              </Text>
              <Badge
                variant="secondary"
                className="bg-secondary text-muted-foreground text-xs"
              >
                {completedCount === tasks.length ? '已完成' : '进行中'}
              </Badge>
            </View>

            <View className="space-y-3">
              {tasks.map((task, index) => (
                <View key={task.id}>
                  <View
                    className="flex items-center gap-3 py-2"
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
                      <CircleCheck size={22} color="#7C9A8E" />
                    ) : (
                      <Circle size={22} color="#E8E6E1" />
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
                    <Separator className="ml-10 bg-border" />
                  )}
                </View>
              ))}
            </View>
          </CardContent>
        </Card>
      </View>

      {/* 快捷入口 */}
      <View className="px-5 mt-4">
        <Text className="block text-foreground text-base font-medium mb-3">
          快捷入口
        </Text>
        <View className="flex gap-3">
          <Card
            className="flex-1 shadow-sm border border-border cursor-pointer"
            onClick={goToCompare}
          >
            <CardContent className="p-4 flex flex-col items-center gap-2">
              <View className="w-10 h-10 rounded-full bg-primary bg-opacity-10 flex items-center justify-center">
                <Shield size={20} color="#7C9A8E" />
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
            className="flex-1 shadow-sm border border-border cursor-pointer"
            onClick={goToReport}
          >
            <CardContent className="p-4 flex flex-col items-center gap-2">
              <View className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center">
                <Sparkles size={20} color="#C4A265" />
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

      {/* 好物推荐 */}
      <View className="px-5 mt-4 mb-6">
        <Text className="block text-foreground text-base font-medium mb-3">
          术后黄金期保养建议
        </Text>
        <Card className="shadow-sm border border-border bg-secondary bg-opacity-50">
          <CardContent className="p-4">
            <View className="flex items-start gap-3">
              <View className="w-12 h-12 rounded-lg bg-primary bg-opacity-10 flex items-center justify-center flex-shrink-0">
                <Droplets size={24} color="#7C9A8E" />
              </View>
              <View className="flex-1">
                <Text className="block text-sm font-medium text-foreground mb-1">
                  医用冷敷贴推荐
                </Text>
                <Text className="block text-xs text-muted-foreground leading-relaxed">
                  术后72小时内建议使用医用级冷敷贴，帮助镇静修复肌肤屏障，减少红肿不适。
                </Text>
                <View className="flex items-center justify-between mt-3">
                  <Text className="block text-xs text-primary font-medium">
                    查看合规好物
                  </Text>
                  <ChevronRight size={14} color="#7C9A8E" />
                </View>
              </View>
            </View>
          </CardContent>
        </Card>
      </View>

      {/* 底部安全区 */}
      <View className="h-4" />
    </View>
  )
}

export default IndexPage
