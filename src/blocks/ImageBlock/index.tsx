import { useBlockData } from '@/blocks/hooks/useBlockData.ts'

interface Props {
  data: any;
}

const ImageBlock = (props: Props) => {
  const data = useBlockData(props)
  return (
    <img {...data} alt={''}/>
  )
}

export default ImageBlock
