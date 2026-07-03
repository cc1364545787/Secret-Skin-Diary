import { useState, useRef, useEffect } from 'react'
import { View, Text, Image, Camera } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { Button } from '@/components/ui/button'
import { Camera as CameraIcon, RefreshCw, CircleCheck, CircleAlert } from 'lucide-react-taro'
import './index.css'

type Angle = 'front' | 'left' | 'right'

interface AngleInfo {
  key: Angle
  label: string
  desc: string
}

const ANGLES: AngleInfo[] = [
  { key: 'front', label: '正脸', desc: '正面平视镜头' },
  { key: 'left', label: '左侧45°', desc: '头部左转45度' },
  { key: 'right', label: '右侧45°', desc: '头部右转45度' }
]

const isMiniApp = [Taro.ENV_TYPE.WEAPP, Taro.ENV_TYPE.TT].includes(Taro.getEnv() as any)

const CameraPage = () => {
  const [currentAngle, setCurrentAngle] = useState<Angle>('front')
  const [capturedImages, setCapturedImages] = useState<Record<string, string>>({})
  const [lightStatus, setLightStatus] = useState<'good' | 'dark' | 'bright'>('good')
  const [isCapturing, setIsCapturing] = useState(false)
  const cameraRef = useRef<any>(null)
  useEffect(() => {
    if (isMiniApp) {
      const ctx = Taro.createCameraContext()
      cameraRef.current = ctx
    }
  }, [])

  const checkLighting = () => {
    const mockGrayValue = Math.floor(Math.random() * 255)
    if (mockGrayValue < 50) {
      setLightStatus('dark')
    } else if (mockGrayValue > 220) {
      setLightStatus('bright')
    } else {
      setLightStatus('good')
    }
  }

  useEffect(() => {
    const timer = setInterval(checkLighting, 2000)
    return () => clearInterval(timer)
  }, [])

  const handleCapture = async () => {
    if (!isMiniApp) {
      Taro.showToast({ title: '请在小程序中使用拍照功能', icon: 'none' })
      return
    }
    setIsCapturing(true)
    try {
      const result = await cameraRef.current.takePhoto({ quality: 'high' })
      const tempPath = result.tempImagePath
      setCapturedImages(prev => ({ ...prev, [currentAngle]: tempPath }))
      Taro.showToast({ title: '拍摄成功', icon: 'success' })
    } catch (err) {
      console.error('拍照失败:', err)
      Taro.showToast({ title: '拍照失败，请重试', icon: 'none' })
    } finally {
      setIsCapturing(false)
    }
  }

  const handleComplete = () => {
    const capturedCount = Object.keys(capturedImages).length
    if (capturedCount < 3) {
      Taro.showModal({
        title: '提示',
        content: `还需拍摄 ${3 - capturedCount} 个角度的照片，确定要跳过吗？`,
        confirmText: '继续拍摄',
        cancelText: '稍后再说',
        success: (res) => {
          if (res.cancel) {
            Taro.navigateBack()
          }
        }
      })
      return
    }
    Taro.showToast({ title: '打卡完成', icon: 'success' })
    setTimeout(() => Taro.navigateBack(), 1500)
  }

  const getLightMessage = () => {
    switch (lightStatus) {
      case 'dark':
        return '当前光线过暗，请移动到光线均匀处'
      case 'bright':
        return '当前光线过曝，请避免直射强光'
      default:
        return '光线良好'
    }
  }

  const getLightColor = () => {
    switch (lightStatus) {
      case 'dark':
      case 'bright':
        return '#E8A0A0'
      default:
        return '#7C9A8E'
    }
  }

  return (
    <View className="min-h-screen bg-background flex flex-col">
      {/* 相机区域 */}
      <View className="relative w-full" style={{ height: '60vh' }}>
        {isMiniApp ? (
          <Camera
            ref={cameraRef}
            className="w-full h-full"
            devicePosition="front"
            flash="off"
            frameSize="medium"
          />
        ) : (
          <View className="w-full h-full bg-secondary flex items-center justify-center">
            <View className="flex flex-col items-center gap-3">
              <CameraIcon size={48} color="#636E72" />
              <Text className="block text-muted-foreground text-sm text-center">
                相机功能仅在小程序中可用{'\n'}请在小程序中打开体验完整功能
              </Text>
            </View>
          </View>
        )}

        {/* 人脸对齐遮罩 */}
        <View className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <View
            className="border-2 border-white border-opacity-40 rounded-full"
            style={{ width: '55%', aspectRatio: '3/4' }}
          >
            {/* 眼睛定位点 */}
            <View className="absolute top-1/3 left-1/4 w-2 h-2 rounded-full bg-white bg-opacity-60" />
            <View className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-white bg-opacity-60" />
            {/* 下颌曲线提示 */}
            <View
              className="absolute bottom-1/4 left-1/2 -translate-x-1/2 border-b border-dashed border-white border-opacity-30"
              style={{ width: '60%' }}
            />
          </View>
        </View>

        {/* 光线检测提示 */}
        <View
          className="absolute top-4 left-4 right-4 flex items-center gap-2 px-3 py-2 rounded-lg"
          style={{ backgroundColor: `${getLightColor()}20` }}
        >
          {lightStatus === 'good' ? (
            <CircleCheck size={16} color={getLightColor()} />
          ) : (
            <CircleAlert size={16} color={getLightColor()} />
          )}
          <Text className="text-xs" style={{ color: getLightColor() }}>
            {getLightMessage()}
          </Text>
        </View>
      </View>

      {/* 角度切换 */}
      <View className="px-5 py-4">
        <View className="flex gap-2">
          {ANGLES.map(angle => (
            <View
              key={angle.key}
              className={`flex-1 rounded-lg p-3 text-center transition-all ${
                currentAngle === angle.key
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-foreground'
              }`}
              onClick={() => setCurrentAngle(angle.key)}
            >
              <Text
                className={`block text-sm font-medium ${
                  currentAngle === angle.key
                    ? 'text-primary-foreground'
                    : 'text-foreground'
                }`}
              >
                {angle.label}
              </Text>
              <Text
                className={`block text-xs mt-1 ${
                  currentAngle === angle.key
                    ? 'text-primary-foreground text-opacity-70'
                    : 'text-muted-foreground'
                }`}
              >
                {angle.desc}
              </Text>
              {capturedImages[angle.key] && (
                <CircleCheck
                  size={14}
                  color={currentAngle === angle.key ? '#FFFFFF' : '#7C9A8E'}
                  className="mt-1 self-center"
                />
              )}
            </View>
          ))}
        </View>
      </View>

      {/* 已拍预览 */}
      {Object.keys(capturedImages).length > 0 && (
        <View className="px-5 mb-4">
          <Text className="block text-sm font-medium text-foreground mb-2">
            已拍摄 ({Object.keys(capturedImages).length}/3)
          </Text>
          <View className="flex gap-2">
            {ANGLES.map(angle => (
              <View
                key={angle.key}
                className="flex-1 aspect-square rounded-lg overflow-hidden bg-secondary"
              >
                {capturedImages[angle.key] ? (
                  <Image
                    src={capturedImages[angle.key]}
                    className="w-full h-full"
                    mode="aspectFill"
                  />
                ) : (
                  <View className="w-full h-full flex items-center justify-center">
                    <Text className="text-xs text-muted-foreground">
                      {angle.label}
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>
      )}

      {/* 操作按钮 */}
      <View className="px-5 mt-auto pb-8">
        <View className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 rounded-lg border-border text-foreground"
            onClick={handleCapture}
            disabled={isCapturing}
          >
            <RefreshCw size={16} color="#2D3436" className="mr-2" />
            <Text>重拍当前</Text>
          </Button>
          <Button
            className="flex-1 rounded-lg bg-primary text-primary-foreground"
            onClick={handleCapture}
            disabled={isCapturing}
          >
            <CameraIcon size={16} color="#FFFFFF" className="mr-2" />
            <Text>拍摄{ANGLES.find(a => a.key === currentAngle)?.label}</Text>
          </Button>
        </View>
        <Button
          variant="ghost"
          className="w-full mt-3 text-muted-foreground rounded-lg"
          onClick={handleComplete}
        >
          {Object.keys(capturedImages).length >= 3 ? '完成打卡' : '跳过，稍后补拍'}
        </Button>
      </View>
    </View>
  )
}

export default CameraPage
