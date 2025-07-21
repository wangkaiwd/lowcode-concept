import ContainerProvider from '@/pages/_index/editor/CanvasEditor/ContainerProvider'
import BlockRenderer from '@/pages/_index/editor/CanvasEditor/BlockRenderer.tsx'
import { cn } from '@/lib/utils.ts'

const ContainerBlock = (props: any) => {
  const { children, id } = props.block
  const { direction } = props.block.props
  return (
    <ContainerProvider
      containerId={id}
      direction={direction}
    >
      <div className={cn('flex', [direction === 'top' ? 'flex-col' : 'flex-row'])}>
        {children.map((child: any) => {
          return <BlockRenderer key={child.id} block={child}/>
        })}
      </div>
    </ContainerProvider>
  )
}

export default ContainerBlock
