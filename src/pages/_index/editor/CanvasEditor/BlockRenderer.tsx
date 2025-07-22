import TextBlock from '@/blocks/TextBlock'
import ButtonBlock from '@/blocks/ButtonBlock'
import { type ComponentProps, useContext } from 'react'
import { ContainerContext } from '@/pages/_index/editor/CanvasEditor/ContainerProvider/useContainerContext.ts'
import ContainerBlock from '@/blocks/ContainerBlock'

interface Props extends ComponentProps<'div'> {
  block: any;
  index: number;
  count: number;
}

const BlockRenderer = ({ block, index, count }: Props) => {
  const containerContext = useContext(ContainerContext)
  const getBlockComponent = () => {
    switch (block.type) {
      case 'text':
        return <TextBlock block={block}/>
      case 'button':
        return <ButtonBlock block={block}/>
      case 'container':
        return <ContainerBlock block={block}/>
      default:
        return <div>Unknown block type</div>
    }
  }

  const createBlockWrapper = () => {
    if (block.type === 'container') {
      return (
        <div
          data-block-id={block.id}
          data-block-index={index}
          data-block-count={count}
          data-container-id={containerContext.containerId}
          data-container-direction={block.props.direction}
          style={{ ...block.size }}
          className={'border border-dashed rounded'}
        >
          {getBlockComponent()}
        </div>
      )
    }
    return (
      <div
        data-block-id={block.id}
        data-block-index={index}
        data-block-count={count}
        data-container-id={containerContext.containerId}
        style={{ ...block.size }}
        className={'border border-dashed rounded border-blue-200'}
      >
        {getBlockComponent()}
      </div>
    )
  }

  return createBlockWrapper()
}

export default BlockRenderer
