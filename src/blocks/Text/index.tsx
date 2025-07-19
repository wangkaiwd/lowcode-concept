interface TextBlockProps {
  content: string;
}

const Text = ({ content }: TextBlockProps) => {
  return (
    <div>
      {content}
    </div>
  )
}

export default Text
