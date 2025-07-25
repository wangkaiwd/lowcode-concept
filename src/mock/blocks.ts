export const blockTree = [
  {
    id: 'block-1',
    type: 'text',
  },
  {
    id: 'block-2',
    type: 'text',
  },
  {
    id: 'block-3',
    type: 'button',
  },
  {
    id: 'block-4',
    type: 'container',
    children: [
      {
        id: 'block-5',
        type: 'button',
      },
      {
        id: 'block-6',
        type: 'text',
      },
    ],
  },
  {
    id: 'block-7',
    type: 'container',
    children: [
      {
        id: 'block-8',
        type: 'button',
      },
      {
        id: 'block-9',
        type: 'button',
      },
    ],
  },
]

export const blockMap = {
  'block-1': {
    id: 'block-1',
    type: 'text',
    parentId: 'root',
    size: { width: 100, height: 50 },
    props: { content: 'This is a text block.' },
  },
  'block-2': {
    id: 'block-2',
    type: 'text',
    parentId: 'root',
    size: { width: 100, height: 50 },
    props: { content: 'Hello, world!' },
  },
  'block-3': {
    id: 'block-3',
    type: 'button',
    parentId: 'root',
    size: { width: 200, height: 50 },
    props: { children: 'Click Me!' },
  },
  'block-4': {
    id: 'block-4',
    type: 'container',
    parentId: 'root',
    size: { width: 400, height: 600 },
    props: { direction: 'top' },
  },
  'block-5': {
    id: 'block-5',
    type: 'button',
    parentId: 'block-4',
    size: { width: 200, height: 50 },
    props: { children: 'Click Me!' },
  },
  'block-6': {
    id: 'block-6',
    type: 'text',
    parentId: 'block-4',
    size: { width: 200, height: 50 },
    props: { content: 'This is a text block.' },
  },
  'block-7': {
    id: 'block-7',
    type: 'container',
    parentId: 'root',
    size: { width: 400, height: 600 },
    props: { direction: 'top' },
  },
  'block-8': {
    id: 'block-8',
    type: 'button',
    parentId: 'block-7',
    size: { width: 200, height: 50 },
    props: { children: 'Click Me!' },
  },
  'block-9': {
    id: 'block-9',
    type: 'button',
    parentId: 'block-7',
    size: { width: 200, height: 50 },
    props: { children: 'Click Me!' },
  },
}
