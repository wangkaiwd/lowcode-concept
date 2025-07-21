import { Button } from '@/components/ui/button.tsx'

interface Props {
  block: any
}

const ButtonBlock = (props: Props) => {
  const { props: blockProps } = props.block
  return (
    <Button {...blockProps}/>
  )
}

export default ButtonBlock
