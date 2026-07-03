import { create } from 'zustand'
import Taro from '@tarojs/taro'
import { DEFAULT_PROJECT } from '@/config/projectMapping'

const STORAGE_KEY = 'skin_journal_current_project'

interface ProjectState {
  /** 当前选中的皮肤管理项目名称 */
  currentProject: string
  /** 切换为预设项目 */
  setProject: (name: string) => void
  /** 设置为自定义项目名称 */
  setCustomProject: (name: string) => void
}

/** 安全读取本地缓存 */
function loadProject(): string {
  try {
    return Taro.getStorageSync(STORAGE_KEY) || DEFAULT_PROJECT
  } catch {
    return DEFAULT_PROJECT
  }
}

/** 安全写入本地缓存 */
function saveProject(name: string): void {
  try {
    Taro.setStorageSync(STORAGE_KEY, name)
  } catch {
    // ignore
  }
}

export const useProjectStore = create<ProjectState>((set) => ({
  currentProject: loadProject(),
  setProject: (name: string) => {
    saveProject(name)
    set({ currentProject: name })
  },
  setCustomProject: (name: string) => {
    saveProject(name)
    set({ currentProject: name })
  },
}))
