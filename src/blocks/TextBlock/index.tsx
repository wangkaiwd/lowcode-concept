interface TextBlockProps {
  data: any
}

const TextBlock = (props: TextBlockProps) => {
  const { content } = props.data.props
  return (
    <div>
      {content}
    </div>
  )
}

export default TextBlock
