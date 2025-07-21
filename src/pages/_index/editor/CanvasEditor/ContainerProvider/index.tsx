import { ContainerContext } from '@/pages/_index/editor/CanvasEditor/ContainerProvider/useContainerContext.ts'

const ContainerProvider = (props: any) => {
  return (
    <ContainerContext
      value={{
        containerId: props.containerId,
        direction: props.direction || 'top',
      }}
    >
      {props.children}
    </ContainerContext>
  )
}

export default ContainerProvider
