import interact from 'interactjs'

const pauseEvent = (e: any) => {
  e.stopPropagation()
  e.preventDefault()
  document.body.style.userSelect = 'none'
}

const offset = 10
const dropIndicatorSize = 4
const __debug = true

class LayoutEngineV2 {
  isDragging: boolean = false
  instance: any = null
  overlay: HTMLElement | null = null
  indicator: HTMLElement | null = null
  dropAreas: any[] = []
  options: any = null
  insertPayload: any = null

  constructor (options: any) {
    this.options = options
  }

  init = () => {
    this.instance = interact('[data-block-id]').draggable({
      // autoScroll: true,
      listeners: {
        start: this.onStart,
        move: this.onMove,
        end: this.onEnd,
      },
    })
  }
  onStart = (ev: any) => {
    this.isDragging = true
    pauseEvent(ev)
    this.createOverlay(ev)
    this.createDropAreas(ev)
    if (__debug) {
      this.debugIndicator()
    }
  }
  onMove = (ev: any) => {
    if (!this.isDragging || !this.overlay) return
    pauseEvent(ev)
    const deltaX = ev.clientX - ev.clientX0
    const deltaY = ev.clientY - ev.clientY0
    this.overlay.style.transform = `translate(${deltaX}px, ${deltaY}px)`
    const area = this.findDropArea(ev)
    if (area) {
      this.insertPayload = area
      this.createIndicator(area)
    } else {
      this.insertPayload = null
      this.removeIndicator()
    }
  }

  onEnd = (ev: any) => {
    this.isDragging = false
    const target = ev.target
    const dragId = target.dataset.blockId
    document.body.style.userSelect = 'auto'
    this.removeOverlay()
    this.removeIndicator()
    // how to distinct between insert and move?
    this.options?.onInsert(dragId, this.insertPayload)
    this.insertPayload = null
    if (__debug) {
      this.removeDebugIndicator()
    }
  }

  createOverlay = (ev: any) => {
    const { clientX, clientY, target } = ev
    this.overlay = document.createElement('div')
    this.overlay.style.position = 'absolute'
    this.overlay.style.left = clientX + 'px'
    this.overlay.style.top = clientY + 'px'
    this.overlay.innerHTML = target.innerHTML
    document.body.appendChild(this.overlay)
  }
  removeOverlay = () => {
    if (this.overlay) {
      document.body.removeChild(this.overlay)
      this.overlay = null
    }
  }

  // conflict detection
  findDropArea = (ev: any) => {
    return this.dropAreas.find((area) => {
      const { clientX, clientY } = ev
      const { direction, node } = area
      const rect = node.getBoundingClientRect()
      const isInX = clientX > rect.left && clientX < rect.right
      const isInY = clientY > rect.top && clientY < rect.bottom
      const isInTop = clientY < rect.top + offset && clientY > rect.top
      const isInLeft = clientX > rect.left && clientX < rect.left + offset
      const isInBottom = clientY > rect.bottom - offset && clientY < rect.bottom
      const isInRight = clientX > rect.right - offset && clientX < rect.right
      if (direction === 'top') {
        return isInX && isInTop
      } else if (direction === 'left') {
        return isInY && isInLeft
      } else if (direction === 'right') {
        return isInY && isInRight
      }
      return isInX && isInBottom
    })
  }
  createDropAreas = (ev: any) => {
    const nodes: any = document.querySelectorAll('[data-block-id]')
    const target = ev.target
    const nodeMap = new Map()
    nodes.forEach((node: any) => {
      const id = node.dataset.blockId
      nodeMap.set(id, node)
    })
    nodes.forEach((node: any) => {
      const parentId = node.dataset.containerId
      const index = node.dataset.blockIndex
      const count = node.dataset.blockCount
      const id = node.dataset.blockId
      if (parentId && node !== target) {
        const parent = nodeMap.get(parentId)
        const direction = parent ? parent.dataset.containerDirection : 'top'
        const area = { id, parentId, direction, node }
        this.dropAreas.push(area)
        const isLast = index && count && Number(index) === Number(count) - 1
        if (isLast) {
          this.dropAreas.push({
            id,
            parentId,
            direction: direction === 'top' ? 'bottom' : 'right',
            node,
          })
        }
      }
    })
    console.log('nodes', this.dropAreas)
  }

  debugIndicator = () => {
    this.dropAreas.forEach((area) => {
      const dom = document.createElement('div')
      dom.setAttribute('data-area', 'true')
      dom.style.position = 'absolute'
      dom.style.backgroundColor = 'var(--color-violet-500)'
      dom.style.borderRadius = '2px'
      dom.style.opacity = '0.2'
      this.createLine(dom, area)
      document.body.appendChild(dom)
    })
  }
  removeDebugIndicator = () => {
    const areas = document.querySelectorAll('[data-area]')
    areas?.forEach(area => {
      area.remove()
    })
  }
  createLine = (dom: any, area: any) => {
    const { width, height, left, top, right, bottom } = area.node.getBoundingClientRect()
    switch (area.direction) {
      case 'top':
        dom.style.left = left + 'px'
        dom.style.top = top - dropIndicatorSize / 2 + 'px'
        dom.style.width = width + 'px'
        dom.style.height = dropIndicatorSize + 'px'
        break
      case 'left':
        dom.style.left = left - dropIndicatorSize + 'px'
        dom.style.top = top + 'px'
        dom.style.width = dropIndicatorSize + 'px'
        dom.style.height = height + 'px'
        break
      case 'right':
        dom.style.left = right - dropIndicatorSize + 'px'
        dom.style.top = top + 'px'
        dom.style.width = dropIndicatorSize + 'px'
        dom.style.height = height + 'px'
        break
      default:
        dom.style.left = left + 'px'
        dom.style.top = bottom - dropIndicatorSize / 2 + 'px'
        dom.style.width = width + 'px'
        dom.style.height = dropIndicatorSize + 'px'
    }
  }
  // perf: avoid recreate indicator
  createIndicator = (area: any) => {
    this.removeIndicator()
    this.indicator = document.createElement('div')
    this.indicator.style.position = 'absolute'
    this.indicator.style.backgroundColor = 'var(--color-violet-500)'
    this.indicator.style.borderRadius = '2px'
    this.indicator.style.opacity = '0.8'
    this.createLine(this.indicator, area)
    document.body.appendChild(this.indicator)
  }
  removeIndicator = () => {
    if (this.indicator) {
      document.body.removeChild(this.indicator)
      this.indicator = null
    }
  }
}

export default LayoutEngineV2
