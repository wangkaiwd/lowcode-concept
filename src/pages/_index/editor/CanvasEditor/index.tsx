import { Card, CardContent } from '@/components/ui/card.tsx'
import { useBlockStore } from '@/store/useBlockStore.ts'
import Empty from '@/pages/_index/editor/CanvasEditor/Empty.tsx'
import BlockRenderer from '@/pages/_index/editor/CanvasEditor/BlockRenderer.tsx'

const CanvasEditor = () => {
  const blocks = useBlockStore((state) => state.blocks)

  const renderBlocks = () => {
    if (!blocks.length) { return <Empty/> }
    return blocks.map((block) => {
      return (
        <div key={block.id} data-block-id={block.id}>
          <BlockRenderer data-block-id={block.id} block={block}/>
        </div>
      )
    })
  }

  return (
    <div className="flex-1 bg-muted/20 flex flex-col">
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto h-full">
          {/* 画布区域 */}
          <Card
            data-block-container={'root'}
            className="min-h-full p-6 border-2 border-dashed border-border/40 relative shadow-sm overflow-auto"
          >
            <CardContent className="p-0 h-full">
              {renderBlocks()}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default CanvasEditor
