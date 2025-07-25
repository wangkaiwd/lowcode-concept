import ComponentPanel from '@/pages/_index/editor/ComponentPanel'
import CanvasEditor from '@/pages/_index/editor/CanvasEditor'
import ConfigPanel from '@/pages/_index/editor/ConfigPanel'
import { TopHeader } from '@/pages/_index/editor/TopHeader.tsx'
import { useEffect } from 'react'
import LayoutEngineV2 from '@/core/layoutEngineV2.ts'
import { useBlockActions } from '@/store/useBlockStore.ts'

// 主页面组件
const Editor = () => {
  const { insertBlock, moveBlock } = useBlockActions()
  useEffect(() => {
    const layoutEngine = new LayoutEngineV2({
      onInsert (dragId: string, insertPayload: any) {
        const operateType = dragId.startsWith('insert-') ? 'insert' : 'move'
        if (operateType === 'insert') {
          const type = dragId.split('-')[1]
          insertBlock(type, insertPayload)
        } else {
          moveBlock(dragId, insertPayload)
        }
      },
    })
    layoutEngine.init()
  }, [])
  return (
    <div className="h-screen flex flex-col bg-background">
      {/* 顶部工具栏 */}
      <TopHeader/>
      {/* 主要内容区域 */}
      <div className="flex-1 flex overflow-hidden">
        <ComponentPanel/>
        <CanvasEditor/>
        <ConfigPanel/>
      </div>
    </div>
  )
}

export default Editor
