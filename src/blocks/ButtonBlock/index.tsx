import { Button } from '@/components/ui/button.tsx'
import type { ComponentProps } from 'react'

const ButtonBlock = (props: ComponentProps<'button'>) => {
  return (
    <Button {...props}/>
  )
}

export default ButtonBlock
