'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = 'src/libs/dragart.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var doc = document;

var DragArt = function (_React$Component) {
  _inherits(DragArt, _React$Component);

  function DragArt(props) {
    _classCallCheck(this, DragArt);

    var _this = _possibleConstructorReturn(this, (DragArt.__proto__ || Object.getPrototypeOf(DragArt)).call(this, props));

    _this.state = {
      x: _this.props.x, /** x轴位移，单位是px */
      y: _this.props.y, /** y轴位移，单位是px */
      width: _this.props.width,
      height: _this.props.height,
      zIndex: _this.props.zIndex,
      /**鼠标点击元素的原始位置，单位是px */
      originX: 0,
      originY: 0,
      handle: false
    };

    _this.onDragStart = _this.onDragStart.bind(_this);
    _this.onStartMove = _this.onStartMove.bind(_this);
    _this.onDragEnd = _this.onDragEnd.bind(_this);
    _this.onClick = _this.onClick.bind(_this);
    _this.onDoubleClick = _this.onDoubleClick.bind(_this);
    return _this;
  }

  _createClass(DragArt, [{
    key: 'onDragStart',
    value: function onDragStart(event) {
      /** 准备开始拖拽 */
      event.stopPropagation();
      /** 开始拖拽时样式设置 */
      doc.body.style.userSelect = 'none'; // 禁止全局选中事件
      doc.addEventListener('mousemove', this.onStartMove);
      doc.addEventListener('mouseup', this.onDragEnd);
      if (typeof this.parent === 'undefined' || this.parent === null) {
        this.parent = event.currentTarget.offsetParent.offsetParent;
        this.self = event.currentTarget;
      }
      if (this.props.onStart && typeof this.props.onStart === 'function') {
        var _state = this.state,
            x = _state.x,
            y = _state.y,
            width = _state.width,
            height = _state.height;

        this.props.onStart({ x: x, y: y, width: width, height: height }, event);
      }
      this.setState({
        handle: true,
        originX: event.clientX,
        originY: event.clientY,
        handleType: event.target.dataset.handle
      });
    }
  }, {
    key: 'onStartMove',
    value: function onStartMove(event) {
      /** 移动过程 */
      event.stopPropagation();
      var _state2 = this.state,
          x = _state2.x,
          y = _state2.y,
          width = _state2.width,
          height = _state2.height,
          originX = _state2.originX,
          originY = _state2.originY,
          handleType = _state2.handleType;

      var deltaX = event.clientX - originX; // X轴线方向移动距离
      var deltaY = event.clientY - originY; // Y轴线方向移动距离
      originY = event.clientY; // 重置Y轴的位置
      originX = event.clientX; // 重置X轴的位置
      var bounds = (0, _utils.parseBounds)(this.parent, this.self);
      switch (handleType) {
        case 'left':
          x = x + deltaX;
          width = width - deltaX;
          break;
        case 'top':
          y = y + deltaY;
          height = height - deltaY;
          break;
        case 'right':
          width = width + deltaX;
          break;
        case 'bottom':
          height = height + deltaY;
          break;
        case 'leftTop':
          x = x + deltaX;
          y = y + deltaY;
          height = height - deltaY;
          width = width - deltaX;
          break;
        case 'rightTop':
          height = height - deltaY;
          width = width + deltaX;
          y = y + deltaY;
          break;
        case 'rightBottom':
          height = height + deltaY;
          width = width + deltaX;
          break;
        case 'leftBottom':
          height = height + deltaY;
          width = width - deltaX;
          x = x + deltaX;
          break;
        default:
          x = x + deltaX;
          y = y + deltaY;
          break;
      }
      height = (0, _utils.isNumber)(bounds.height) && Math.min(height, bounds.height);
      /** 保证不超出右边界和底部 ***/
      x = (0, _utils.isNumber)(bounds.right) && Math.min(x, bounds.right);
      y = (0, _utils.isNumber)(bounds.bottom) && Math.min(y, bounds.bottom);

      /*** 保证不超出左边和上边 **/
      x = (0, _utils.isNumber)(bounds.left) && Math.max(x, bounds.left);
      y = (0, _utils.isNumber)(bounds.top) && Math.max(y, bounds.top);

      if (this.props.onReseize && typeof this.props.onReseize === 'function') {
        this.props.onReseize({ x: x, y: y, height: height, width: width, originX: originX, originY: originY }, event);
      }
      this.setState({ x: x, y: y, height: height, width: width, originX: originX, originY: originY });
    }
  }, {
    key: 'onDragEnd',
    value: function onDragEnd(event) {
      /** 结束拖拽 */
      event.stopPropagation();
      doc.body.style.userSelect = ''; // 取消全局选中
      this.parent = null;
      this.self = null;
      doc.removeEventListener('mousemove', this.onStartMove);
      doc.removeEventListener('mouseup', this.onDragEnd);
      if (this.props.onEnd && typeof this.props.onEnd === 'function') {
        var _state3 = this.state,
            x = _state3.x,
            y = _state3.y,
            width = _state3.width,
            height = _state3.height;

        this.props.onEnd({ x: x, y: y, width: width, height: height }, event);
      }
      this.setState({ handle: false });
    }
  }, {
    key: 'onClick',
    value: function onClick(event) {
      this.props.onClick(event);
    }
  }, {
    key: 'onDoubleClick',
    value: function onDoubleClick(event) {
      this.props.onDoubleClick(event);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.x && nextProps !== this.props.x) {
        this.state.x = nextProps.x;
      }
      if (nextProps.y && nextProps.y !== this.props.y) {
        this.state.y = nextProps.y;
      }

      if (nextProps.height && nextProps.height !== this.props.height) {
        this.state.height = nextProps.height;
      }
      if (nextProps.width && nextProps.width !== this.props.width) {
        this.state.width = nextProps.width;
      }

      if (nextProps.zIndex && nextProps.zIndex !== this.props.zIndex) {
        this.state.zIndex = nextProps.zIndex;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state4 = this.state,
          width = _state4.width,
          height = _state4.height,
          x = _state4.x,
          y = _state4.y,
          zIndex = _state4.zIndex,
          handle = _state4.handle;

      var style = { width: width, height: height, top: y, left: x, zIndex: zIndex };
      var _props = this.props,
          selected = _props.selected,
          usable = _props.usable;

      var maskStyle = selected ? { display: 'block' } : { display: 'none' };
      maskStyle = !usable ? maskStyle : { display: 'none' };
      return _react2.default.createElement(
        'div',
        _defineProperty({
          style: style,
          className: (0, _utils.classNames)("dragart-item", {
            'dragart-usable': usable
          }),
          onClick: this.onClick,
          onDoubleClick: this.onDoubleClick,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 174
          },
          __self: this
        }, '__self', this),
        _react2.default.createElement(
          'div',
          _defineProperty({
            ref: function ref(c) {
              return _this2.handleDoc = c;
            },
            'data-handle': 'move',
            style: maskStyle,
            className: 'dragart-mask',
            onMouseDown: this.onDragStart,
            onMouseUp: this.onDragEnd,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 182
            },
            __self: this
          }, '__self', this),
          _react2.default.createElement('span', _defineProperty({ 'data-handle': 'left', __source: {
              fileName: _jsxFileName,
              lineNumber: 190
            },
            __self: this
          }, '__self', this)),
          _react2.default.createElement('span', _defineProperty({ 'data-handle': 'leftTop', __source: {
              fileName: _jsxFileName,
              lineNumber: 191
            },
            __self: this
          }, '__self', this)),
          _react2.default.createElement('span', _defineProperty({ 'data-handle': 'leftBottom', __source: {
              fileName: _jsxFileName,
              lineNumber: 192
            },
            __self: this
          }, '__self', this)),
          _react2.default.createElement('span', _defineProperty({ 'data-handle': 'right', __source: {
              fileName: _jsxFileName,
              lineNumber: 193
            },
            __self: this
          }, '__self', this)),
          _react2.default.createElement('span', _defineProperty({ 'data-handle': 'rightTop', __source: {
              fileName: _jsxFileName,
              lineNumber: 194
            },
            __self: this
          }, '__self', this)),
          _react2.default.createElement('span', _defineProperty({ 'data-handle': 'rightBottom', __source: {
              fileName: _jsxFileName,
              lineNumber: 195
            },
            __self: this
          }, '__self', this)),
          _react2.default.createElement('span', _defineProperty({ 'data-handle': 'top', __source: {
              fileName: _jsxFileName,
              lineNumber: 196
            },
            __self: this
          }, '__self', this)),
          _react2.default.createElement('span', _defineProperty({ 'data-handle': 'bottom', __source: {
              fileName: _jsxFileName,
              lineNumber: 197
            },
            __self: this
          }, '__self', this))
        ),
        _react2.default.createElement(
          'div',
          _defineProperty({ style: { position: 'relative', width: '100%', height: '100%' }, __source: {
              fileName: _jsxFileName,
              lineNumber: 199
            },
            __self: this
          }, '__self', this),
          this.props.children
        )
      );
    }
  }]);

  return DragArt;
}(_react2.default.Component);

DragArt.defaultProps = {
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  zIndex: 0
};
exports.default = DragArt;