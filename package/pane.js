'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = 'src/dragart/pane.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DragPane = function (_Component) {
  _inherits(DragPane, _Component);

  function DragPane() {
    _classCallCheck(this, DragPane);

    return _possibleConstructorReturn(this, (DragPane.__proto__ || Object.getPrototypeOf(DragPane)).apply(this, arguments));
  }

  _createClass(DragPane, [{
    key: 'handleDragStart',

    //开始拖拽事件
    value: function handleDragStart(event) {
      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (typeof this.props.dragRule === 'string') {
        var dataTransfer = event.dataTransfer,
            target = event.target,
            clientX = event.clientX,
            clientY = event.clientY;
        // 设置接受拖放的规则

        dataTransfer.setData('data-rule', this.props.dragRule);
        // 设置开始拖拽的位置
        dataTransfer.setData('data-clientX', clientX - target.offsetLeft);
        dataTransfer.setData('data-clientY', clientY - target.offsetTop);
        // 设置拖拽数据属性
        dataTransfer.setData('data-props', JSON.stringify(props));
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          children = _props.children,
          className = _props.className,
          childClass = _props.childClass;

      return _react2.default.createElement(
        'div',
        _defineProperty({ className: className, __source: {
            fileName: _jsxFileName,
            lineNumber: 19
          },
          __self: this
        }, '__self', this),
        _react2.default.Children.map(children, function (_ref) {
          var props = _ref.props,
              child = _objectWithoutProperties(_ref, ['props']);

          var children = props.children,
              data = props.data,
              WarpClass = props.WarpClass,
              others = _objectWithoutProperties(props, ['children', 'data', 'WarpClass']);

          var $child = Object.assign({}, child, { props: Object.assign({
              children: children
            }, others) });
          return _react2.default.createElement(
            'div',
            _defineProperty({
              className: WarpClass,
              onDragStart: function onDragStart(event) {
                _this2.handleDragStart(event, data);
              },
              draggable: true,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 28
              },
              __self: _this2
            }, '__self', _this2),
            $child
          );
        })
      );
    }
  }]);

  return DragPane;
}(_react.Component);

exports.default = DragPane;