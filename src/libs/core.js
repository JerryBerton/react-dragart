import React from 'react'
import './index.css'

export default class DragArtCore extends React.Component {
  state = {
    selected: null,
    usable: null
  }
  componentDidMount() {
    document.addEventListener('click', (e) => {
      if (e.target.className === 'dragart-box') {
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
      this.setState({ selected: idx, usable: null })
    } 
  }
  onDoubleClick(e, idx) {
    this.setState({ usable: idx, selected: null })
  }
  render() {
    const { children } = this.props
    return (
      <div className="dragart">
        <div className="dragart-box">
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
  
        </div>
        <div className="dragart-assist">
          <span data-role="horizontal" ref={ c => this.horizontal = c}/>
          <span data-role="vertical" ref={ c => this.vertical = c}/>
        </div>
      </div>
    )
  }
}