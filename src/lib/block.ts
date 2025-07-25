import { nanoid } from 'nanoid'
import { TREE_ROOT_ID } from '@/constants'

export const generateDefaultBlock = (type: string, parentId: string) => {
  switch (type) {
    case  'text':
      return {
        id: nanoid(),
        parentId,
        type: 'text',
        size: {
          width: 100,
          height: 50,
        },
        props: {
          content: '文本内容',
        },
      }
    case 'button':
      return {
        id: nanoid(),
        parentId,
        type: 'button',
        size: {
          width: 100,
          height: 50,
        },
        props: {
          children: '按钮',
        },
      }
    case 'container':
      return {
        id: nanoid(),
        parentId,
        type: 'container',
        size: {
          width: 100,
          height: 50,
        },
        props: {
          direction: 'top',
        },
      }
    default:
      throw new Error('Unknown type')
  }
}

export const findNode = (id: string, tree: any[]): any => {
  if (id === TREE_ROOT_ID) {
    return { children: tree }
  }
  return tree.find((item: any) => {
    if (id === item.id) {
      return true
    }
    if (item.children) {
      return findNode(id, item.children)
    }
    return false
  })
}
