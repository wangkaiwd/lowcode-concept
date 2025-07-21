import ContainerProvider from '@/pages/_index/editor/CanvasEditor/ContainerProvider'
import BlockRenderer from '@/pages/_index/editor/CanvasEditor/BlockRenderer.tsx'

const ContainerBlock = (props: any) => {
  const { children, id, direction } = props.block

  return (
    <ContainerProvider
      containerId={id}
      direction={direction}
    >
      {
        children.map((child: any) => {
          return <BlockRenderer key={child.id} block={child}/>

        })
      }
    </ContainerProvider>
  )
}

export default ContainerBlock
