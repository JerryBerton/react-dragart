'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var int = exports.int = function int(number) {
  if (number === '') {
    return 0;
  }
  return parseInt(number, 10);
};
var innerWidth = exports.innerWidth = function innerWidth(node) {
  var width = node.clientWidth;
  var computedStyle = node.style;
  width -= int(computedStyle.paddingLeft);
  width -= int(computedStyle.paddingRight);
  return width;
};

var outerWidth = exports.outerWidth = function outerWidth(node) {
  var width = node.clientWidth;
  var computedStyle = node.style;
  width += int(computedStyle.borderLeftWidth);
  width += int(computedStyle.borderRightWidth);
  return width;
};

var innerHeight = exports.innerHeight = function innerHeight(node) {
  var height = node.clientHeight;
  var computedStyle = node.style;
  height -= int(computedStyle.paddingTop);
  height -= int(computedStyle.paddingBottom);
  return height;
};

var outerHeight = exports.outerHeight = function outerHeight(node) {
  var height = node.clientHeight;
  var computedStyle = node.style;
  height += int(computedStyle.borderTopWidth);
  height += int(computedStyle.borderBottomWidth);
  return height;
};
var parseBounds = exports.parseBounds = function parseBounds(parent, self) {
  var left = int(parent.style.paddingLeft) + int(self.style.marginLeft) - self.offsetLeft;
  var top = int(parent.style.paddingTop) + int(self.style.marginTop) - self.offsetTop;
  var right = innerWidth(parent) - outerWidth(self);
  var bottom = innerHeight(parent) - outerHeight(self);
  var height = innerHeight(parent);
  var width = innerWidth(parent);
  return { left: left, top: top, right: right, bottom: bottom, width: width, height: height };
};
var isNumber = exports.isNumber = function isNumber(things) {
  return typeof things === 'number' ? true : false;
};

var hasOwn = {}.hasOwnProperty;

var classNames = exports.classNames = function classNames() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var classes = [];
  for (var i = 0; i < args.length; i++) {
    var arg = args[i];
    if (!arg) continue;

    var argType = typeof arg === 'undefined' ? 'undefined' : _typeof(arg);

    if (argType === 'string' || argType === 'number') {
      classes.push(arg);
    } else if (Array.isArray(arg) && arg.length) {
      var inner = classNames.apply(null, arg);
      if (inner) {
        classes.push(inner);
      }
    } else if (argType === 'object') {
      for (var key in arg) {
        if (hasOwn.call(arg, key) && arg[key]) {
          classes.push(key);
        }
      }
    }
  }

  return classes.join(' ');
};