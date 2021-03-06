import React, { Component } from 'react';
import GitHubButton from 'react-github-button';
import DragArt from '../dragart'
require('react-github-button/assets/style.css');
let test = [
  { title: '测试一', width: 400, height: 300 },
  { title: '测试二', width: 200, height: 300 },
  { title: '测试三', width: 100, height: 200 },
  { title: '测试四', width: 300, height: 200 },
  { title: '测试五', width: 400, height: 100 }
]
export default class App extends Component {
  state = {
    source: [],
    selected: null
  }
  handleDrop = (record) => {
    this.setState({
      source: [...this.state.source, record],
      selected: this.state.source.length
    })
  }
  handleResize = (index, record) => {
    const source = this.state.source.map((item, idx ) => {
      return idx === index ? {...item, ...record} : item
    })
    this.setState({ source })
  }
  render() {
    return (
      <div className="app">
        <div className="app-list">
          <div className="app-git"> 
            <GitHubButton 
              type="stargazers" 
              size="large" 
              namespace="JerryBerton" 
              repo="react-dragart" 
            />
          </div>
          <DragArt.Pane 
            className="test-drop" 
            dragRule="CPT"
          >
            {
              test.map((item, idx) => {
                return (
                  <div key={idx} WarpClass="test-drop-item" data={item}>
                    <p>{item.title}</p>
                    <p>宽度：{item.width}</p>
                    <p>高度：{item.height}</p>
                  </div>
                )
              })
            }
          </DragArt.Pane>
        </div>
        <div className="app-right">
          <div className="app-desc">
            <h2>DragArt测试</h2>
            <p>1、拖拽边div到可接受区域</p>
            <p>2、拖拽可接受区域的元素</p>
            <p>3、拖拽重置可接受区域的元素的大小</p>
          </div>
          <div className="app-drop">
            <DragArt
              selected={this.state.selected}
              dropRule="CPT"
              onDrop={this.handleDrop}
              onResize={this.handleResize}
            >
              {
                this.state.source.map((item, idx) => {
                 return (
                    <DragArt.Item key={idx} {...item}>
                      <span>{item.title}</span>
                    </DragArt.Item>
                  )  
                })
              }
            </DragArt>
          </div>
        </div>
      </div>
    );
  }
}
