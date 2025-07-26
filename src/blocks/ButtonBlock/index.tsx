import { Button } from '@/components/ui/button.tsx'
import { useBlockData } from '@/blocks/hooks/useBlockData.ts'

interface Props {
  data: any
}

const ButtonBlock = (props: Props) => {
  const data = useBlockData(props)
  return (
    <Button {...data}/>
  )
}

export default ButtonBlock
