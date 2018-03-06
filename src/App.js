import React, { Component } from 'react';
import logo from './logo.svg';
import DragArt from './libs'
class App extends Component {
  state = {
    source: []
  }
  handleDrop = (record) => {
    this.setState({
      source: [...this.state.source, record]
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">拖拽布局</h1>
        </header>
        <div className="demo-test">
          <DragArt.Pane childClass="demo-test-item" dragRule="CPT">
            <div data={{width: 200, height: 100}}>1</div>
            <div data={{width: 100, height: 300}}>2</div>
            <div data={{width: 300, height: 200}}>3</div>
          </DragArt.Pane>
        </div>
        <div className="App-intro">
        
          <DragArt dropRule="CPT" onDrop={this.handleDrop}>
            {
              this.state.source.map((item, idx ) => {
                return (
                  <DragArt.Item 
                    key={idx} 
                    x={item.x}
                    y={item.y}
                    width={item.width} 
                    height={item.height}
                  >
                    {`测试${idx}`}
                  </DragArt.Item>
                )
              })
            }
          </DragArt>
        </div>
      </div>
    );
  }
}

export default App;
