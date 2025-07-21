import { createContext, useContext } from 'react'

export const ContainerContext = createContext<any>({
  containerId: undefined,
})

export const useContainerContext = () => {
  const containerContext = useContext(ContainerContext)
  if (!containerContext) {
    throw new Error('useContainerContext must be used within a ContainerContext')
  }
  return containerContext
}
