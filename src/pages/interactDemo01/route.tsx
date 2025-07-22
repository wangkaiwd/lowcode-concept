import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button.tsx'
import interact from 'interactjs'

// 动态新增元素后，interactjs 仍然能正确处理新增元素的事件
const InteractDemo = () => {
  const [list, setList] = useState([{ id: 1 }])
  const onAdd = () => {
    const newId = Date.now()
    setList((prev) => {
      return [...prev, { id: newId }]
    })
  }
  useEffect(() => {
    const interactable = interact('[data-draggable]').draggable({
      listeners: {
        start (event) {
          console.log('event', event)
          // console.log(event.type, event.target)
        },
        move (event) {
          console.log('move event', event)
          const target = event.target
          // keep the dragged position in the data-x/data-y attributes
          const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
          const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

          // translate the element
          target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

          // update the posiion attributes
          target.setAttribute('data-x', x)
          target.setAttribute('data-y', y)
        },
      },
    })
    return () => {
      interactable.unset()
    }
  }, [])
  return (
    <div>
      {
        list.map((item) => {
          return (
            <div data-draggable key={item.id}
                 className={'flex items-center justify-center w-30 h-20 bg-blue-400 rounded-sm'}>
              <div className={'bg-amber-200'}>
                draggable
              </div>
            </div>
          )
        })
      }

      <Button onClick={onAdd}>add item</Button>
    </div>
  )
}

export default InteractDemo
