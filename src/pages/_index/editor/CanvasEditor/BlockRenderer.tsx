import TextBlock from '@/blocks/TextBlock'
import ButtonBlock from '@/blocks/ButtonBlock'

interface Props {
  block: any; // Define the type of block as needed
}

const BlockRenderer = ({ block }: Props) => {
  const getBlockComponent = () => {
    switch (block.type) {
      case 'text':
        return <TextBlock {...block.props}/>
      case 'button':
        return <ButtonBlock {...block.props}/>
      default:
        return <div>Unknown block type</div>
    }
  }
  return (
    <div style={{ ...block.size }}>
      {getBlockComponent()}
    </div>
  )
}

export default BlockRenderer
