import React, { Component } from 'react'
export default class DragPane extends Component {
   //开始拖拽事件
   handleDragStart(event, props = {}) {
    if (typeof this.props.dragRule === 'string') {
      let { dataTransfer, target, clientX, clientY } = event
      // 设置接受拖放的规则
      dataTransfer.setData('data-rule', this.props.dragRule)
      // 设置开始拖拽的位置
      dataTransfer.setData('data-clientX', clientX - target.offsetLeft)
      dataTransfer.setData('data-clientY', clientY - target.offsetTop)
      // 设置拖拽数据属性
      dataTransfer.setData('data-props', JSON.stringify(props))
    }
  }
  render() {
    const { children, className, childClass } = this.props
    return (
      <div className={className}>
        {
          React.Children.map(children, ({ props, ...child}) => {
            let { children, data, WarpClass, ...others } = props
            let $child = { ...child, props: {
              children,
              ...others
            }}
            return (
              <div 
                className={WarpClass} 
                onDragStart={(event) => { this.handleDragStart(event, data)}}
                draggable
              >
                { $child }
              </div>
            )
          })
        }
      </div>
    )
  }
}
