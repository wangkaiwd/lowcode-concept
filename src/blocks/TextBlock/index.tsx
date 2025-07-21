interface TextBlockProps {
  block: any
}

const TextBlock = (props: TextBlockProps) => {
  const { block } = props
  const { content } = block.props
  return (
    <div>
      {content}
    </div>
  )
}

export default TextBlock
