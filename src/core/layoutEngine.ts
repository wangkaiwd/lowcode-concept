const offset = 10
const dropIndicatorSize = 4

const pauseEvent = (e: any) => {
  e.stopPropagation()
  e.preventDefault()
}

class LayoutEngine {
  isDragging = false
  currentBlock: HTMLElement | null = null
  dragCoordinate: any = null
  overlay: HTMLElement | null = null
  dropAreas: any[] = []
  nodes: any[] = []
  indicator: HTMLElement | null = null

  constructor () {

  }

  init = () => {
    const rawBlockEls = document.querySelectorAll('[data-block-id]')
    this.nodes = Array.from(rawBlockEls)
    this.nodes.forEach((blockEl) => {
      blockEl.addEventListener('mousedown', this.onMouseDown)
    })
  }

  onMouseDown = (ev: any) => {
    this.isDragging = true
    this.currentBlock = ev.currentTarget
    pauseEvent(ev)
    const { x, y } = ev.currentTarget.getBoundingClientRect()
    this.dragCoordinate = {
      startMouseX: ev.clientX,
      startMouseY: ev.clientY,
      startBlockX: x,
      startBlockY: y,
    }
    this.listenToBody()
    this.createOverlay()
    this.createDropAreas()
    document.body.style.cursor = 'grab'
  }

  onMouseMove = (ev: any) => {
    if (!this.isDragging || !this.overlay) return
    pauseEvent(ev)
    const { startMouseX, startMouseY } = this.dragCoordinate
    const deltaX = ev.clientX - startMouseX
    const deltaY = ev.clientY - startMouseY
    this.overlay.style.left = startMouseX + deltaX + 'px'
    this.overlay.style.top = startMouseY + deltaY + 'px'
    const area = this.findDropArea(ev)
    if (area) {
      this.createIndicator(area)
    } else {
      this.removeIndicator()
    }
  }
  onMouseUp = () => {
    if (!this.isDragging) return
    this.isDragging = false
    this.dragCoordinate = null
    this.currentBlock = null
    this.removeOverlay()
    this.removeIndicator()
    const areas = document.querySelectorAll('[data-area]')
    areas?.forEach((area) => {
      area.remove()
    })
    this.dropAreas = []
    document.body.style.cursor = 'auto'
    document.removeEventListener('mousemove', this.onMouseMove)
    document.removeEventListener('mouseup', this.onMouseUp)
  }

  listenToBody = () => {
    document.addEventListener('mousemove', this.onMouseMove)
    document.addEventListener('mouseup', this.onMouseUp)
  }

  createOverlay = () => {
    const { startMouseX, startMouseY } = this.dragCoordinate
    this.overlay = document.createElement('div')
    this.overlay.style.position = 'absolute'
    this.overlay.style.left = startMouseX + 'px'
    this.overlay.style.top = startMouseY + 'px'
    this.overlay.innerHTML = this.currentBlock!.innerHTML
    document.body.appendChild(this.overlay)
  }

  // conflict
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

  createDropAreas = () => {
    const nodeMap = new Map()
    this.nodes.forEach((node) => {
      const id = node.dataset.blockId
      nodeMap.set(id, node)
    })
    this.nodes.forEach((node) => {
      const parentId = node.dataset.containerId
      const id = node.dataset.blockId
      if (parentId && node !== this.currentBlock) {
        const parent = nodeMap.get(parentId)
        const direction = parent ? parent.dataset.containerDirection : 'top'
        this.dropAreas.push({ id, parentId, direction, node })
      }
    })
  }

  // debugIndicator = () => {
  //   this.dropAreas.forEach((area) => {
  //     const rect = area.node.getBoundingClientRect()
  //     const { width, height, left, top } = rect
  //     const dom = document.createElement('div')
  //     dom.setAttribute('data-area', 'true')
  //     dom.style.position = 'absolute'
  //     dom.style.backgroundColor = 'var(--primary)'
  //     dom.style.borderRadius = '2px'
  //     dom.style.boxShadow = '0 0 0 1px var(--primary)'
  //     dom.style.opacity = '0.2'
  //     if (area.direction === 'top') {
  //       dom.style.left = left + 'px'
  //       dom.style.top = top - dropIndicatorSize / 2 + 'px'
  //       dom.style.width = width + 'px'
  //       dom.style.height = dropIndicatorSize + 'px'
  //     }
  //     if (area.direction === 'left') {
  //       dom.style.left = left - dropIndicatorSize / 2 + 'px'
  //       dom.style.top = top + 'px'
  //       dom.style.width = dropIndicatorSize + 'px'
  //       dom.style.height = height + 'px'
  //     }
  //     document.body.appendChild(dom)
  //   })
  // }

  removeOverlay = () => {
    if (this.overlay) {
      document.body.removeChild(this.overlay)
      this.overlay = null
    }
  }

  removeIndicator = () => {
    if (this.indicator) {
      document.body.removeChild(this.indicator)
      this.indicator = null
    }
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

  destroy = () => {}
}

export default LayoutEngine
