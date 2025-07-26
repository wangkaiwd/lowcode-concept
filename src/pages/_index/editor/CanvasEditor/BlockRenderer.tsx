import TextBlock from '@/blocks/TextBlock'
import ButtonBlock from '@/blocks/ButtonBlock'
import { type ComponentProps, useContext } from 'react'
import { ContainerContext } from '@/pages/_index/editor/CanvasEditor/ContainerProvider/useContainerContext.ts'
import ContainerBlock from '@/blocks/ContainerBlock'
import { useBlockActions, useBlockStore } from '@/store/useBlockStore.ts'
import ImageBlock from '@/blocks/ImageBlock'
import { cn } from '@/lib/utils.ts'

interface Props extends ComponentProps<'div'> {
  block: any;
  index: number;
  count: number;
}

const BlockRenderer = ({ block, index, count }: Props) => {
  const { setActiveBlockId } = useBlockActions()
  // think performance
  const data = useBlockStore((state) => state.blockMap[block.id])
  const activeBlockId = useBlockStore((state) => state.activeBlockId)
  const isActive = activeBlockId === data.id
  const { size, layout } = data.props
  const containerContext = useContext(ContainerContext)
  const getBlockComponent = () => {
    switch (data.type) {
      case 'text':
        return <TextBlock data={data}/>
      case 'button':
        return <ButtonBlock data={data}/>
      case 'image':
        return <ImageBlock data={data}/>
      case 'container':
        return <ContainerBlock block={block} data={data}/>
      default:
        return <div>Unknown block type</div>
    }
  }

  const createBlockWrapper = () => {
    if (block.type === 'container') {
      return (
        <div
          data-block-id={data.id}
          data-block-index={index}
          data-block-count={count}
          data-container-id={containerContext.containerId}
          data-container-direction={layout.direction}
          style={{ ...size }}
          className={cn('border rounded',
            { 'border-indigo-400': isActive, 'border-2': isActive, 'border-dashed': !isActive })}
          onClick={(e) => {
            e.stopPropagation()
            setActiveBlockId(data.id)
          }}
        >
          {getBlockComponent()}
        </div>
      )
    }
    return (
      <div
        data-block-id={data.id}
        data-block-index={index}
        data-block-count={count}
        data-container-id={containerContext.containerId}
        style={{ ...size }}
        className={cn('border rounded border-blue-200',
          { 'border-indigo-400': isActive, 'border-2': isActive, 'border-dashed': !isActive })}
        onClick={(e) => {
          e.stopPropagation()
          setActiveBlockId(data.id)
        }}
      >
        {getBlockComponent()}
      </div>
    )
  }

  return createBlockWrapper()
}

export default BlockRenderer
