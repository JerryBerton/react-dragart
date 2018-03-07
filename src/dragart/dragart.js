import React from 'react'
import { parseBounds, isNumber, classNames } from './utils'
let doc = document
export default class DragArt extends React.Component {
  static defaultProps = {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    zIndex: 0
  }
  constructor(props) {
    super(props)
    this.onDragStart = this.onDragStart.bind(this)
    this.onStartMove = this.onStartMove.bind(this)
    this.onDragEnd = this.onDragEnd.bind(this)
    this.onClick = this.onClick.bind(this)
    this.onDoubleClick = this.onDoubleClick.bind(this)
  } 
  state = {
    x: this.props.x, /** x轴位移，单位是px */
    y: this.props.y,  /** y轴位移，单位是px */
    width: this.props.width,
    height: this.props.height,
    zIndex: this.props.zIndex,
    /**鼠标点击元素的原始位置，单位是px */
    originX: 0,
    originY: 0,
    handle: false
  }

  onDragStart(event) {
    /** 准备开始拖拽 */
    event.stopPropagation()
    /** 开始拖拽时样式设置 */
    doc.body.style.userSelect = 'none' // 禁止全局选中事件
    doc.addEventListener('mousemove', this.onStartMove)
    doc.addEventListener('mouseup', this.onDragEnd)
    if (typeof this.parent === 'undefined' || this.parent === null) {
      this.parent = event.currentTarget.offsetParent.offsetParent
      this.self = event.currentTarget
    }
    if (this.props.onStart && typeof this.props.onStart === 'function') {
      const { x, y, width, height } = this.state
      this.props.onStart({ x, y, width, height}, event)
    } 
    this.setState({ 
      handle: true, 
      originX: event.clientX,
      originY: event.clientY,
      handleType: event.target.dataset.handle,
    })
    
  }
 
  onStartMove (event) {
    /** 移动过程 */
    event.stopPropagation()
    let { 
      x, 
      y, 
      width,
      height,  
      originX, 
      originY,
      handleType
    } = this.state
    let deltaX = event.clientX - originX  // X轴线方向移动距离
    let deltaY = event.clientY - originY  // Y轴线方向移动距离
    originY = event.clientY  // 重置Y轴的位置
    originX = event.clientX  // 重置X轴的位置
    let bounds = parseBounds(this.parent, this.self)
    switch (handleType) {
      case 'left':
        x = x + deltaX
        width = width - deltaX 
        break
      case 'top':
        y = y + deltaY
        height = height - deltaY
        break
      case 'right':
        width = width + deltaX
        break
      case 'bottom':
        height = height + deltaY
        break
      case 'leftTop':
        x = x + deltaX
        y = y + deltaY
        height = height - deltaY
        width = width - deltaX
        break
      case 'rightTop':
        height = height - deltaY
        width = width + deltaX
        y = y + deltaY
        break
      case 'rightBottom':
        height = height + deltaY
        width = width + deltaX
        break
      case 'leftBottom':
        height = height + deltaY
        width = width - deltaX
        x = x + deltaX
        break
      default:
        x = x + deltaX
        y = y + deltaY
        break;
    }
      height = isNumber(bounds.height) && Math.min(height, bounds.height)
     /** 保证不超出右边界和底部 ***/
      x = isNumber(bounds.right) && Math.min(x, bounds.right)
      y = isNumber(bounds.bottom) && Math.min(y, bounds.bottom)

    /*** 保证不超出左边和上边 **/
      x = isNumber(bounds.left) && Math.max(x, bounds.left)
      y = isNumber(bounds.top) && Math.max(y, bounds.top)

    if (this.props.onReseize && typeof this.props.onReseize === 'function') {
      this.props.onReseize({ x, y, height, width, originX, originY }, event)
    }
    this.setState({ x, y, height, width, originX, originY })
  }
  
  onDragEnd (event) {
    /** 结束拖拽 */
    event.stopPropagation()
    doc.body.style.userSelect = '' // 取消全局选中
    this.parent = null
    this.self = null
    doc.removeEventListener('mousemove', this.onStartMove)
    doc.removeEventListener('mouseup', this.onDragEnd)
    if (this.props.onEnd && typeof this.props.onEnd === 'function') {
      const { x, y, width, height } = this.state
      this.props.onEnd({ x, y, width, height }, event)
    }
    this.setState({ handle: false })
  }
  onClick (event) {
    this.props.onClick(event)
  }
  onDoubleClick(event) {
    this.props.onDoubleClick(event)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.x && nextProps !== this.props.x) {
      this.state.x = nextProps.x
    }
    if (nextProps.y && nextProps.y !== this.props.y) {
        this.state.y = nextProps.y
    }

    if (nextProps.height && nextProps.height !== this.props.height) {
        this.state.height = nextProps.height
    }
    if (nextProps.width && nextProps.width !== this.props.width) {
        this.state.width = nextProps.width
    }

    if (nextProps.zIndex && nextProps.zIndex !== this.props.zIndex) {
        this.state.zIndex = nextProps.zIndex
    }
  }
  render() {
    let { width, height, x, y, zIndex, handle } = this.state
    let style = { width, height, top: y, left: x, zIndex}
    let { selected, usable } = this.props
    let maskStyle = selected ? { display: 'block'} : { display: 'none'}
    maskStyle = !usable ? maskStyle : { display: 'none'}
    return (
      <div 
        style={style} 
        className={classNames("dragart-item", {
          'dragart-usable': usable
        })}
        onClick={this.onClick}
        onDoubleClick={this.onDoubleClick}
      >
      <div 
        ref={c => this.handleDoc = c}
        data-handle="move"
        style={maskStyle}
        className="dragart-mask"
        onMouseDown={this.onDragStart}
        onMouseUp={this.onDragEnd}
      >
        <span data-handle="left"/>
        <span data-handle="leftTop"/>
        <span data-handle="leftBottom"/>
        <span data-handle="right"/>
        <span data-handle="rightTop"/>
        <span data-handle="rightBottom"/>
        <span data-handle="top"/>
        <span data-handle="bottom"/>
      </div>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {this.props.children}
      </div>
      </div>
    )
  }
}