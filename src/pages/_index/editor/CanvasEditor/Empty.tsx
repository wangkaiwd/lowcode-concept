import { Palette } from 'lucide-react'

const Empty = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center text-muted-foreground max-w-md">
        <div className="mb-6 flex justify-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Palette className="w-8 h-8 text-primary/60"/>
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-3 text-foreground">开始设计你的页面</h3>
        <p className="text-sm leading-relaxed mb-6">
          从左侧组件库拖拽组件到这里开始创建你的应用界面
        </p>
      </div>
    </div>
  )
}

export default Empty
