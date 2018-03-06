'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = 'src/libs/core.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./index.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DragArtCore = function (_React$Component) {
  _inherits(DragArtCore, _React$Component);

  function DragArtCore() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DragArtCore);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DragArtCore.__proto__ || Object.getPrototypeOf(DragArtCore)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      selected: null,
      usable: null
    }, _this.onEnd = function () {
      // refLine.uncheck()
      // console.log('bbbb')
      // this.horizontal.style.display = 'none'
      // this.vertical.style.display = 'none'
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DragArtCore, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      document.addEventListener('click', function (e) {
        if (e.target.className === 'dragart-box') {
          _this2.setState({ selected: null, usable: null });
        }
      });
    }
  }, {
    key: 'onStart',
    value: function onStart(idx, record, e) {
      if (this.props.onStart) {
        this.props.onStart(idx, record, e);
      }
    }
  }, {
    key: 'onReseize',
    value: function onReseize(idx, record, e) {
      if (this.props.onResize) {
        this.props.onResize(idx, record, e);
      }
    }
  }, {
    key: 'onClick',
    value: function onClick(e, idx) {
      if (this.state.usable !== idx) {
        this.setState({ selected: idx, usable: null });
      }
    }
  }, {
    key: 'onDoubleClick',
    value: function onDoubleClick(e, idx) {
      this.setState({ usable: idx, selected: null });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var children = this.props.children;

      return _react2.default.createElement(
        'div',
        _defineProperty({ className: 'dragart', __source: {
            fileName: _jsxFileName,
            lineNumber: 43
          },
          __self: this
        }, '__self', this),
        _react2.default.createElement(
          'div',
          _defineProperty({ className: 'dragart-box', __source: {
              fileName: _jsxFileName,
              lineNumber: 44
            },
            __self: this
          }, '__self', this),
          _react2.default.Children.map(children, function (child, idx) {
            return Object.assign({}, child, {
              props: Object.assign({}, child.props, {
                selected: _this3.state.selected === idx,
                usable: _this3.state.usable === idx,
                onStart: function onStart(rct, e) {
                  return _this3.onStart(idx, rct, e);
                },
                onReseize: function onReseize(rct, e) {
                  return _this3.onReseize(idx, rct, e);
                },
                onClick: function onClick(e) {
                  return _this3.onClick(e, idx);
                },
                onDoubleClick: function onDoubleClick(e) {
                  return _this3.onDoubleClick(e, idx);
                }
              })
            });
          })
        ),
        _react2.default.createElement(
          'div',
          _defineProperty({ className: 'dragart-assist', __source: {
              fileName: _jsxFileName,
              lineNumber: 63
            },
            __self: this
          }, '__self', this),
          _react2.default.createElement('span', _defineProperty({ 'data-role': 'horizontal', ref: function ref(c) {
              return _this3.horizontal = c;
            }, __source: {
              fileName: _jsxFileName,
              lineNumber: 64
            },
            __self: this
          }, '__self', this)),
          _react2.default.createElement('span', _defineProperty({ 'data-role': 'vertical', ref: function ref(c) {
              return _this3.vertical = c;
            }, __source: {
              fileName: _jsxFileName,
              lineNumber: 65
            },
            __self: this
          }, '__self', this))
        )
      );
    }
  }]);

  return DragArtCore;
}(_react2.default.Component);

exports.default = DragArtCore;