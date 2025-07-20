class LayoutEngine {
  isDragging = false
  currentBlockEl: HTMLElement | null = null
  dragCoordinate: any = null
  overlay: HTMLElement | null = null

  constructor () {

  }

  init = () => {
    const rawBlockEls = document.querySelectorAll('[data-block-id]')
    const blockEls = Array.from(rawBlockEls)
    blockEls.forEach((blockEl) => {
      blockEl.addEventListener('mousedown', this.onMouseDown)
    })
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
  }

  onMouseMove = (ev: any) => {
    if (!this.isDragging || !this.overlay) return
    const { startMouseX, startMouseY } = this.dragCoordinate
    const deltaX = ev.clientX - startMouseX
    const deltaY = ev.clientY - startMouseY
    this.overlay.style.left = startMouseX + deltaX + 'px'
    this.overlay.style.top = startMouseY + deltaY + 'px'
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

  destroy = () => {}
}

export default LayoutEngine
