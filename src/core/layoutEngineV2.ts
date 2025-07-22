import interact from 'interactjs'

const pauseEvent = (e: any) => {
  e.stopPropagation()
  e.preventDefault()
  document.body.style.userSelect = 'none'
}

const offset = 10
const dropIndicatorSize = 4

class LayoutEngineV2 {
  isDragging: boolean = false
  instance: any = null
  overlay: HTMLElement | null = null
  indicator: HTMLElement | null = null
  dropAreas: any[] = []

  constructor () {}

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
    this.debugIndicator()
  }
  onMove = (ev: any) => {
    if (!this.isDragging || !this.overlay) return
    pauseEvent(ev)
    const deltaX = ev.clientX - ev.clientX0
    const deltaY = ev.clientY - ev.clientY0
    this.overlay.style.transform = `translate(${deltaX}px, ${deltaY}px)`
    const area = this.findDropArea(ev)
    if (area) {
      this.createIndicator(area)
    } else {
      this.removeIndicator()
    }
  }

  onEnd = () => {
    this.isDragging = false
    document.body.style.userSelect = 'auto'
    this.removeOverlay()
    this.removeIndicator()
    const areas = document.querySelectorAll('[data-area]')
    areas.forEach(area => {
      area.remove()
    })
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
      const isInTop = clientY < rect.top + offset && clientY > rect.top
      const isInY = clientY > rect.top && clientY < rect.bottom
      const isInLeft = clientX > rect.left && clientX < rect.left + offset
      if (direction === 'top') {
        return isInX && isInTop
      }
      return isInY && isInLeft
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
      const id = node.dataset.blockId
      if (parentId && node !== target) {
        const parent = nodeMap.get(parentId)
        const direction = parent ? parent.dataset.containerDirection : 'top'
        this.dropAreas.push({ id, parentId, direction, node })
      }
    })
  }

  debugIndicator = () => {
    this.dropAreas.forEach((area) => {
      const rect = area.node.getBoundingClientRect()
      const { width, height, left, top } = rect
      const dom = document.createElement('div')
      dom.setAttribute('data-area', 'true')
      dom.style.position = 'absolute'
      dom.style.backgroundColor = 'var(--color-violet-500)'
      dom.style.borderRadius = '2px'
      dom.style.opacity = '0.2'
      if (area.direction === 'top') {
        dom.style.left = left + 'px'
        dom.style.top = top - dropIndicatorSize / 2 + 'px'
        dom.style.width = width + 'px'
        dom.style.height = dropIndicatorSize + 'px'
      }
      if (area.direction === 'left') {
        dom.style.left = left - dropIndicatorSize / 2 + 'px'
        dom.style.top = top + 'px'
        dom.style.width = dropIndicatorSize + 'px'
        dom.style.height = height + 'px'
      }
      document.body.appendChild(dom)
    })
  }
  // perf: avoid recreate indicator
  createIndicator = (area: any) => {
    this.removeIndicator()
    const rect = area.node.getBoundingClientRect()
    const { width, height, top, left } = rect
    this.indicator = document.createElement('div')
    this.indicator.style.position = 'absolute'
    this.indicator.style.backgroundColor = 'var(--color-violet-500)'
    this.indicator.style.borderRadius = '2px'
    this.indicator.style.opacity = '0.8'
    if (area.direction === 'top') {
      this.indicator.style.left = left + 'px'
      this.indicator.style.top = top - dropIndicatorSize / 2 + 'px'
      this.indicator.style.width = width + 'px'
      this.indicator.style.height = dropIndicatorSize + 'px'
    }
    if (area.direction === 'left') {
      this.indicator.style.left = left - dropIndicatorSize + 'px'
      this.indicator.style.top = top + 'px'
      this.indicator.style.width = dropIndicatorSize + 'px'
      this.indicator.style.height = height + 'px'
    }
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
