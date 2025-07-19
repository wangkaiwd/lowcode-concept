import Text from '@/blocks/Text'

interface Props {
  block: any; // Define the type of block as needed
}

const BlockRenderer = ({ block }: Props) => {
  const getBlockComponent = () => {
    switch (block.type) {
      case 'text':
        return <Text {...block.props}/>
      default:
        return <div>Unknown block type</div>
    }
  }
  return (
    <div>
      {getBlockComponent()}
    </div>
  )
}

export default BlockRenderer
