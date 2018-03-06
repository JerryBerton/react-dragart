import React, { Component } from 'react';
import logo from './logo.svg';
import DragArt from './libs'
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">拖拽布局</h1>
        </header>
        <div className="App-intro">
          <DragArt>
            <DragArt.Item key="1" width={400} height={300}>
              <input defaultValue="12323"/>
            </DragArt.Item>
            <DragArt.Item key="2" width={200} height={100}>
              测试二
            </DragArt.Item>
          </DragArt>
        </div>
      </div>
    );
  }
}

export default App;
