import { useState, useCallback } from 'react'
import { View, Text } from '@tarojs/components'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Drawer, DrawerContent } from '@/components/ui/drawer'
import { Separator } from '@/components/ui/separator'
import { Check, ChevronDown, Sparkles, Plus } from 'lucide-react-taro'
import { PRESET_PROJECTS } from '@/config/projectMapping'
import { useProjectStore } from '@/store/useProjectStore'

const CAPSULE_BG = 'rgba(154, 140, 152, 0.15)'

const ProjectSelector = () => {
  const [open, setOpen] = useState(false)
  const [showCustomInput, setShowCustomInput] = useState(false)
  const [customName, setCustomName] = useState('')
  const { currentProject, setProject, setCustomProject } = useProjectStore()

  const handleSelect = useCallback(
    (name: string) => {
      setProject(name)
      setOpen(false)
      setShowCustomInput(false)
      setCustomName('')
    },
    [setProject],
  )

  const handleCustomConfirm = useCallback(() => {
    const trimmed = customName.trim()
    if (trimmed) {
      setCustomProject(trimmed)
      setOpen(false)
      setShowCustomInput(false)
      setCustomName('')
    }
  }, [customName, setCustomProject])

  return (
    <>
      {/* 胶囊触发按钮 */}
      <View
        className="inline-flex items-center gap-2 rounded-full px-4 py-2"
        style={{ backgroundColor: CAPSULE_BG }}
        onClick={() => setOpen(true)}
      >
        <Sparkles size={14} color="#9A8C98" />
        <Text className="text-sm font-medium" style={{ color: '#4A3B4E' }}>
          {currentProject}
        </Text>
        <ChevronDown size={14} color="#9A8C98" />
      </View>

      {/* 底部抽屉 */}
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="rounded-t-3xl">
          <View className="px-6 pt-4 pb-2">
            <Text className="block text-lg font-semibold text-foreground text-center">
              选择护肤项目
            </Text>
            <Text className="block text-xs text-muted-foreground text-center mt-1">
              切换后全局数据将自动更新
            </Text>
          </View>

          <View className="px-6 pt-2 pb-6 max-h-96 overflow-auto">
            {/* 预设项目列表 */}
            {PRESET_PROJECTS.map((name) => {
              const isSelected = currentProject === name
              return (
                <View
                  key={name}
                  className="flex items-center justify-between py-3 px-3 rounded-2xl"
                  style={
                    isSelected
                      ? { backgroundColor: 'rgba(154, 140, 152, 0.08)' }
                      : undefined
                  }
                  onClick={() => handleSelect(name)}
                >
                  <Text
                    className={`text-sm ${isSelected ? 'font-semibold' : 'font-medium'} text-foreground`}
                  >
                    {name}
                  </Text>
                  {isSelected && <Check size={18} color="#9A8C98" />}
                </View>
              )
            })}

            <Separator className="my-3" />

            {/* 自定义项目输入 */}
            {!showCustomInput ? (
              <View
                className="flex items-center gap-3 py-3 px-3 rounded-2xl"
                onClick={() => setShowCustomInput(true)}
              >
                <View className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(154, 140, 152, 0.12)' }}>
                  <Plus size={14} color="#9A8C98" />
                </View>
                <Text className="text-sm font-medium text-muted-foreground">
                  自定义项目
                </Text>
              </View>
            ) : (
              <View className="mt-2">
                <View className="rounded-2xl px-4 py-3" style={{ backgroundColor: '#F0EDF2' }}>
                  <Input
                    className="w-full bg-transparent border-0 p-0"
                    placeholder="输入项目名称"
                    value={customName}
                    onInput={(e) => setCustomName(e.detail.value)}
                    onFocus={() => {}}
                    onBlur={() => {}}
                  />
                </View>
                {customName.trim() && (
                  <Button
                    className="w-full mt-3 rounded-full"
                    style={{ backgroundColor: '#4A3B4E' }}
                    onClick={handleCustomConfirm}
                  >
                    <Text className="text-primary-foreground text-sm">确认添加</Text>
                  </Button>
                )}
              </View>
            )}
          </View>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default ProjectSelector
