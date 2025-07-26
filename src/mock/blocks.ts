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
    id: 'block-10',
    type: 'image',
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
    props: { content: 'This is a text block.', size: { width: 100, height: 50 } },
  },
  'block-2': {
    id: 'block-2',
    type: 'text',
    parentId: 'root',
    props: { content: 'Hello, world!', size: { width: 100, height: 50 } },
  },
  'block-10': {
    id: 'block-10',
    type: 'image',
    parentId: 'root',
    props: {
      src: 'https://miro.medium.com/v2/resize:fit:600/1*KUjro0G-igf6P3lvlcDrTQ.png',
      size: { width: 600, height: 323 },
    },
  },
  'block-3': {
    id: 'block-3',
    type: 'button',
    parentId: 'root',
    props: { children: 'Click Me!', size: { width: 200, height: 50 } },
  },
  'block-4': {
    id: 'block-4',
    type: 'container',
    parentId: 'root',
    props: { layout: { direction: 'top' }, size: { width: 400, height: 600 } },
  },
  'block-5': {
    id: 'block-5',
    type: 'button',
    parentId: 'block-4',
    props: { children: 'Click Me!', size: { width: 200, height: 50 } },
  },
  'block-6': {
    id: 'block-6',
    type: 'text',
    parentId: 'block-4',
    props: { content: 'This is a text block.', size: { width: 200, height: 50 } },
  },
  'block-7': {
    id: 'block-7',
    type: 'container',
    parentId: 'root',
    props: { layout: { direction: 'left' }, size: { width: 400, height: 600 } },
  },
  'block-8': {
    id: 'block-8',
    type: 'button',
    parentId: 'block-7',
    props: { children: 'Click Me!', size: { width: 200, height: 50 } },
  },
  'block-9': {
    id: 'block-9',
    type: 'button',
    parentId: 'block-7',
    props: { children: 'Click Me!', size: { width: 200, height: 50 } },
  },
}
