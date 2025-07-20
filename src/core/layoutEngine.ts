const offset = 10
const dropIndicatorSize = 4

class LayoutEngine {
  isDragging = false
  currentBlockEl: HTMLElement | null = null
  dragCoordinate: any = null
  overlay: HTMLElement | null = null
  dropAreas: any[] = []
  blocks: any[] = []
  canvasEl: HTMLElement | null = null
  dropIndicatorEl: HTMLElement | null = null

  constructor () {

  }

  init = () => {
    const rawBlockEls = document.querySelectorAll('[data-block-id]')
    this.canvasEl = document.querySelector('[data-block-container="root"]')
    this.blocks = Array.from(rawBlockEls)
    this.blocks.forEach((blockEl) => {
      blockEl.addEventListener('mousedown', this.onMouseDown)
    })
  }

  isInCanvas = (block: any) => {
    return this.canvasEl?.contains(block)
  }

  onMouseDown = (ev: any) => {
    this.currentBlockEl = ev.currentTarget
    const { x, y } = ev.currentTarget.getBoundingClientRect()
    this.isDragging = true
    this.dragCoordinate = {
      startMouseX: ev.clientX,
      startMouseY: ev.clientY,
      startBlockX: x,
      startBlockY: y,
    }
    this.listenToBody()
    this.createOverlay()
    this.createDropAreas()
  }

  onMouseMove = (ev: any) => {
    if (!this.isDragging || !this.overlay) return
    const { startMouseX, startMouseY } = this.dragCoordinate
    const deltaX = ev.clientX - startMouseX
    const deltaY = ev.clientY - startMouseY
    this.overlay.style.left = startMouseX + deltaX + 'px'
    this.overlay.style.top = startMouseY + deltaY + 'px'
    const area = this.findDropArea(ev)
    if (area) {
      this.createDropIndicator(area)
    } else {
      this.removeDropIndicator()
    }
  }
  onMouseUp = () => {
    if (!this.isDragging) return
    this.isDragging = false
    this.dragCoordinate = null
    this.currentBlockEl = null
    if (this.overlay) {
      document.body.removeChild(this.overlay)
      this.overlay = null
    }
    if (this.dropIndicatorEl) {
      document.body.removeChild(this.dropIndicatorEl)
      this.dropIndicatorEl = null
    }
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
    this.overlay.innerHTML = this.currentBlockEl!.innerHTML
    document.body.appendChild(this.overlay)
  }

  findDropArea = (ev: any) => {
    return this.dropAreas.find((area) => {
      const { clientX, clientY } = ev
      const { rect } = area
      const isInX = clientX > rect.left && clientX < rect.right
      const isInBottom = clientY < rect.bottom && clientY > rect.bottom - offset
      return isInX && isInBottom
    })
  }

  createDropAreas = () => {
    const blocksInCanvas = this.blocks.filter((block) => this.isInCanvas(block))
    blocksInCanvas.forEach((block) => {
      const rect = block.getBoundingClientRect()
      const id = block.dataset.blockId
      this.dropAreas.push({
        id,
        rect,
      })
    })
  }

  removeDropIndicator = () => {
    if (this.dropIndicatorEl) {
      document.body.removeChild(this.dropIndicatorEl)
      this.dropIndicatorEl = null
    }
  }

  // perf: avoid recreate indicator
  createDropIndicator = (area: any) => {
    this.removeDropIndicator()
    const { width, left, bottom } = area.rect
    this.dropIndicatorEl = document.createElement('div')
    this.dropIndicatorEl.style.position = 'absolute'
    this.dropIndicatorEl.style.left = left + 'px'
    this.dropIndicatorEl.style.top = bottom - dropIndicatorSize / 2 + 'px'
    this.dropIndicatorEl.style.backgroundColor = 'var(--primary)'
    this.dropIndicatorEl.style.width = width + 'px'
    this.dropIndicatorEl.style.height = dropIndicatorSize + 'px'
    this.dropIndicatorEl.style.borderRadius = '2px'
    this.dropIndicatorEl.style.boxShadow = '0 0 0 1px var(--primary)'
    this.dropIndicatorEl.style.opacity = '0.8'
    document.body.appendChild(this.dropIndicatorEl)
  }

  destroy = () => {}
}

export default LayoutEngine
