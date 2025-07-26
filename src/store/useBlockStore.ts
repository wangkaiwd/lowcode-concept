import { create } from 'zustand'
import { blockMap, blockTree } from '@/mock/blocks.ts'
import { findNode, generateDefaultBlock } from '@/lib/block.ts'

interface BlockStoreActions {
  updateBlock: (block: any) => void
  insertBlock: (type: string, insertPayload: any) => void
  moveBlock: (dragId: string, insertPayload: any) => void
  setActiveBlockId: (id: string | null) => void
}

interface BlockStoreSate {
  blockTree: any[]
  blockMap: Record<string, any>
  activeBlockId: string | null
  actions: BlockStoreActions
}

export const useBlockStore = create<BlockStoreSate>()((set) => ({
  blockTree,
  blockMap,
  activeBlockId: null,
  actions: {
    setActiveBlockId (id: string | null) {
      set(() => {
        return { activeBlockId: id }
      })
    },
    updateBlock (block: any) {
      const { id } = block
      set((state) => {
        const { blockMap } = state
        blockMap[id] = block
        return { blockMap: { ...blockMap } }
      })
    },
    insertBlock (type: string, insertPayload: any) {
      const { id: blockId, direction, parentId } = insertPayload
      const newBlock = generateDefaultBlock(type, parentId)
      set((state) => {
        return { blockMap: { ...state.blockMap, [newBlock.id]: newBlock } }
      })

      set((state) => {
        const { blockTree } = state
        const parentBlock = findNode(parentId, blockTree)
        if (!parentBlock) {
          throw new Error('Cannot find parent block')
        }
        const children = parentBlock.children
        const dropIndex = children.findIndex((item: any) => item.id === blockId)
        if (direction === 'left' || direction === 'top') {
          children.splice(dropIndex, 0, {
            id: newBlock.id,
            type: newBlock.type,
          })
        } else {
          children.splice(dropIndex + 1, 0, {
            id: newBlock.id,
            type: newBlock.type,
          })
        }
        return { blockTree: [...blockTree] }
      })

    },
    moveBlock (dragId: string, insertPayload: any) {
      set((state) => {
        const { blockTree, blockMap } = state
        const dragParentId = blockMap[dragId].parentId
        // remove drag item
        const dragParent = findNode(dragParentId, blockTree)
        const dragIndex = dragParent.children.findIndex((item: any) => item.id === dragId)
        const dragBlock = dragParent.children[dragIndex]
        dragParent.children.splice(dragIndex, 1)

        // move to new position
        const { id: blockId, parentId, direction } = insertPayload
        const parentBlock = findNode(parentId, blockTree)
        const dropIndex = parentBlock.children.findIndex((item: any) => item.id === blockId)
        blockMap[dragId].parentId = parentId
        if (direction === 'left' || direction === 'top') {
          parentBlock.children.splice(dropIndex, 0, dragBlock)
        } else {
          parentBlock.children.splice(dropIndex + 1, 0, dragBlock)
        }
        return { blockTree: [...blockTree] }
      })

    },
  },
}))

export const useBlockActions = () => {
  return useBlockStore((state) => state.actions)
}

export const useActiveBlock = () => {
  return useBlockStore((state) => {
    const activeBlockId = state.activeBlockId
    return activeBlockId ? state.blockMap[activeBlockId] : null
  })
}
