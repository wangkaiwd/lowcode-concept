import { Card, CardContent } from '@/components/ui/card.tsx'
import { useBlockStore } from '@/store/useBlockStore.ts'
import Empty from '@/pages/_index/editor/CanvasEditor/Empty.tsx'
import BlockRenderer from '@/pages/_index/editor/CanvasEditor/BlockRenderer.tsx'
import ContainerProvider from '@/pages/_index/editor/CanvasEditor/ContainerProvider'

const CanvasEditor = () => {
  const blockTree = useBlockStore((state) => state.blockTree)

  const renderBlocks = () => {
    if (!blockTree.length) { return <Empty/> }
    return blockTree.map((block, index) => {
      return <BlockRenderer key={block.id} index={index} count={blockTree.length} block={block}/>
    })
  }

  return (
    <div className="flex-1 h-full bg-muted/20 flex flex-col">
      <div className="flex-1 p-6 h-full">
        <div className="max-w-7xl mx-auto h-full">
          {/* 画布区域 */}
          <ContainerProvider containerId={'root'}>
            <Card
              className="h-full p-6 border-2 border-dashed border-border/40 relative shadow-sm overflow-auto"
            >
              <CardContent className="p-0 h-full">
                {renderBlocks()}
              </CardContent>
            </Card>
          </ContainerProvider>
        </div>
      </div>
    </div>
  )
}

export default CanvasEditor
