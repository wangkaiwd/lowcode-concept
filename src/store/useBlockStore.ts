import { create } from 'zustand'
import { blocks } from '@/mock/blocks.ts'

interface BlockStoreActions {
  updateBlock: (block: any) => void
}

interface BlockStoreSate {
  blocks: any[]
  actions: BlockStoreActions
}

export const useBlockStore = create<BlockStoreSate>()((set) => ({
  blocks,
  actions: {
    updateBlock (block: any) {
      const { id } = block
      set((state) => {
        const i = state.blocks.findIndex((b) => b.id === id)
        const { blocks } = state
        blocks[i] = block
        return {
          blocks,
        }
      })
    },
  },
}))

export const useBlockActions = () => {
  const { actions } = useBlockStore()
  return actions
}
