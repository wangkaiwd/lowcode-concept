export const blocks = [
  {
    id: 'block-1',
    type: 'text',
    size: {
      width: 100,
      height: 50,
    },
    props: {
      content: 'This is a text block.',
    },
  },
  {
    id: 'block-2',
    type: 'text',
    size: {
      width: 100,
      height: 50,
    },
    props: {
      content: 'Hello, world!',
    },
  },
  {
    id: 'block-3',
    type: 'button',
    size: { width: 200, height: 50 },
    props: {
      children: 'Click Me!',
    },
  },
  {
    id: 'block-4',
    type: 'container',
    size: { width: 400, height: 600 },
    props: {
      direction: 'top',
    },
    children: [
      {
        id: 'block-5',
        type: 'button',
        size: { width: 200, height: 50 },
        props: {
          children: 'Click Me!',
        },
      },
      {
        id: 'block-6',
        type: 'text',
        size: { width: 200, height: 50 },
        props: {
          content: 'This is a text block.',
        },
      },
    ],
  },
  {
    id: 'block-7',
    type: 'container',
    size: { width: 200, height: 500 },
    props: {
      direction: 'left',
    },
    children: [
      {
        id: 'block-8',
        type: 'button',
        size: { width: 200, height: 50 },
        props: {
          children: 'Click Me!',
        },
      },
      {
        id: 'block-9',
        type: 'button',
        size: { width: 200, height: 50 },
        props: {
          children: 'block 9',
        },
      },
    ],
  },
]
