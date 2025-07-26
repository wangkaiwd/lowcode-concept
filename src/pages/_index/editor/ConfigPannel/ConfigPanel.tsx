import { Settings } from 'lucide-react'
import { useActiveBlock } from '@/store/useBlockStore.ts'
import SettingForm from '@/pages/_index/editor/ConfigPannel/SettingForm.tsx'

// 配置面板
const ConfigPanel = () => {
  const activeBlock = useActiveBlock()

  const getTitle = () => {
    if (!activeBlock) {
      return '属性配置'
    }
    return `${activeBlock.type} ${activeBlock.id}`
  }

  return (
    <div className="w-80 bg-card border-l border-border flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-card-foreground">{getTitle()}</h2>
        {
          !activeBlock && <p className="text-sm text-muted-foreground mt-1">选择组件进行配置</p>
        }
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        {
          activeBlock ?
            <SettingForm/>
            :
            <div className={'text-center'}>
              <div className="mx-auto mb-4 w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                <Settings className="w-6 h-6 text-muted-foreground"/>
              </div>
              <div className={'text-gray-400'}>
                选择画布中的组件查看和编辑属性
              </div>
            </div>
        }
      </div>
    </div>
  )
}

export default ConfigPanel
