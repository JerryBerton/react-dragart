### react-dragart React拖拽库
> [Example例子](https://jerryberton.github.io/react-dragart/build/index.html)

### 使用文档

#### 1、安装

```bash
npm install react-dragart --save 
yarn install  // 其他安装方式
```
#### 2、属性说明

**DragArt.Pane**

| 属性 |  类型 | 说明 |
| ---- |-----|------|
| className | string | 可拖拽的面板类|
| dragRule | string | 发送规则 |

**DragArt**

| 属性 |  类型 | 说明 |
| ---- |-----|------|
| className | string | 可拖拽的面板类|
| dropRule | string | 接受规则 |
| onDrop 	| function | 返回一个记录 |
| onStart | function | 内部元素开始变化时回调（索引， 记录值， 事件对象）|
| onResize | function | 内部元素变化时回调（索引， 记录值， 事件对象）|
| onSelect | function | 内部元素选择时回调（索引， 事件对象）|
| onUsable | function | 内部元素可编辑时回调（索引， 事件对象）|

**DragArt.Pane**

| 属性 |  类型 | 说明 |
| ---- |-----|------|
| x | number | X轴线距离|
| y | number | Y轴线距离 |
| height | number | 元素高度 |
| width | number | 元素宽度|
| zIndex | number | 元素层级|

#### 3、实例代码

```javascript
let test = [
  { title: '测试一', width: 400, height: 300 },
  { title: '测试二', width: 200, height: 300 },
  { title: '测试三', width: 100, height: 200 },
  { title: '测试四', width: 300, height: 200 },
  { title: '测试五', width: 400, height: 100 }
]
<DragArt.Pane className="test-drop"  dragRule="CPT">
  {
     test.map((item, idx) => {
        return (
          <div 
            key={idx} 
            WarpClass="test-drop-item" 
            data={item}
          >
            <p>{item.title}</p>
            <p>宽度：{item.width}</p>
            <p>高度：{item.height}</p>
          </div>
        )
      })
    }
</DragArt.Pane>

<DragArt
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
```