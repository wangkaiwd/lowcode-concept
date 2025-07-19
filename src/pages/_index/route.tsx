import ComponentPanel from '@/pages/_index/editor/ComponentPanel'
import CanvasEditor from '@/pages/_index/editor/CanvasEditor'
import ConfigPanel from '@/pages/_index/editor/ConfigPanel'
import { TopHeader } from '@/pages/_index/editor/TopHeader.tsx'

// 主页面组件
const Editor = () => {
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
