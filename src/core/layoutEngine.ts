class LayoutEngine {
  isDragging = false
  currentBlockEl: HTMLElement | null = null
  dragCoordinate: any = null

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
  }

  onMouseMove = (ev: any) => {
    if (!this.isDragging) return
    const { startMouseX, startMouseY, startBlockX, startBlockY } = this.dragCoordinate
    const deltaX = ev.clientX - startMouseX
    const deltaY = ev.clientY - startMouseY
    this.currentBlockEl!.style.position = 'absolute'
    this.currentBlockEl!.style.left = startBlockX + deltaX + 'px'
    this.currentBlockEl!.style.top = startBlockY + deltaY + 'px'
  }
  onMouseUp = () => {
    if (!this.isDragging) return
    this.isDragging = false
    this.dragCoordinate = null
    this.currentBlockEl!.style.position = 'static'
    this.currentBlockEl = null
    document.removeEventListener('mousemove', this.onMouseMove)
    document.removeEventListener('mouseup', this.onMouseUp)
  }

  listenToBody = () => {
    document.addEventListener('mousemove', this.onMouseMove)
    document.addEventListener('mouseup', this.onMouseUp)
  }

  destroy = () => {}
}

export default LayoutEngine
