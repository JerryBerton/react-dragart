import React from 'react'
import './index.css'

export default class DragArtCore extends React.Component {
  state = {
    selected: null,
    usable: null
  }
  componentDidMount() {
    document.addEventListener('click', (e) => {
      if (e.target.className === 'dragart') {
        this.setState({ selected: null, usable: null })
      }
    })
  }
  onStart(idx, record, e) {
    if (this.props.onStart) {
      this.props.onStart(idx, record, e)
    }
  }
  onReseize (idx, record, e) {
    if (this.props.onResize) {
      this.props.onResize(idx, record, e)
    }
  }
  onEnd = () => {
    // refLine.uncheck()
    // console.log('bbbb')
    // this.horizontal.style.display = 'none'
    // this.vertical.style.display = 'none'
  }
  onClick(e, idx) {
    if (this.state.usable !== idx) {
      if (this.props.onSelect) {
        this.props.onSelect(idx, e)
      }
      this.setState({ selected: idx, usable: null })
    } 
  }
  onDoubleClick(e, idx) {
    if (this.props.onUsable) {
      this.props.onUsable(idx, e)
    }
    this.setState({ usable: idx, selected: null })
  }
  /**
   * 作为drop的所有操作
   */
   // 拖拽进入的时候
  onDragEnter(e) {
    e.preventDefault();
    this.dragDOM.classList.add('dragart-enter')
  }
  onDrop (event) {
    let { dataTransfer, target, clientX, clientY } = event
    // 用户设置的允许拖放的规则
    const dropRule = this.props.dropRule
    // 获取允许拖拽的规格
    let $dropRule = dataTransfer.getData("data-rule")
    // 匹配验证是否符合拖放规范
    if (dropRule === $dropRule) {
      // 获取拖放开始的初始位置
      let $clientX = dataTransfer.getData('data-clientX')
      let $clientY = dataTransfer.getData('data-clientY')
      let x = clientX - $clientX - target.offsetLeft
      let y = clientY  - $clientY - target.offsetTop
      // 获取用户自定义设置的属性值
      let $props = dataTransfer.getData('data-props')
      $props =  JSON.parse($props) || {}
      let result = { x, y, ...$props}
      if (this.props.onDrop) {
        this.props.onDrop(result)
      }
      this.dragDOM.classList.remove('dragart-enter')
    }
  }
  onDragOver(e) {
    e.preventDefault()
  }
  onDragLeave(e){
    e.preventDefault()
    this.dragDOM.classList.remove('dragart-enter')
  }
  render() {
    const { children, dropRule } = this.props
    let dropProps = typeof dropRule === 'string' ? {
      onDragEnter: this.onDragEnter.bind(this),
      onDragOver: this.onDragOver.bind(this),
      onDrop: this.onDrop.bind(this),
      onDragLeave: this.onDragLeave.bind(this)
    } : {}
    return (
      <div className="dragart" {...dropProps} ref={c => this.dragDOM = c }>
        {/* <div className="dragart-box" ref={c => this.dragart = c}> */}
          {
            React.Children.map(children, (child, idx)=> {
              return {
                ...child,
                props: {
                  ...child.props,
                  selected: this.state.selected === idx,
                  usable: this.state.usable === idx,
                  onStart: (rct, e) => this.onStart(idx, rct, e),
                  onReseize: (rct, e) => this.onReseize(idx, rct, e), 
                  onClick: (e) => this.onClick(e, idx),
                  onDoubleClick: (e) => this.onDoubleClick(e, idx)
                }
              }
            })
          }
{/*   
        </div> */}
        {/* <div className="dragart-assist">
          <span data-role="horizontal" ref={ c => this.horizontal = c}/>
          <span data-role="vertical" ref={ c => this.vertical = c}/>
        </div> */}
      </div>
    )
  }
}