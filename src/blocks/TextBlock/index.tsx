interface TextBlockProps {
  content: string;
}

const TextBlock = ({ content }: TextBlockProps) => {
  return (
    <div>
      {content}
    </div>
  )
}

export default TextBlock
