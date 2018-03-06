export const int = (number) => {
  if (number === '') {
      return 0
  }
  return parseInt(number, 10)
}
export const innerWidth = (node) => {
  let width = node.clientWidth;
  const computedStyle = node.style
  width -= int(computedStyle.paddingLeft);
  width -= int(computedStyle.paddingRight);
  return width;
}

export const outerWidth = (node) => {
  let width = node.clientWidth;
  const computedStyle = node.style
  width += int(computedStyle.borderLeftWidth);
  width += int(computedStyle.borderRightWidth);
  return width;
}

export const innerHeight = (node) => {
  let height = node.clientHeight;
  const computedStyle = node.style
  height -= int(computedStyle.paddingTop);
  height -= int(computedStyle.paddingBottom);
  return height;
}

export const outerHeight = (node) => {
  let height = node.clientHeight;
  const computedStyle = node.style
  height += int(computedStyle.borderTopWidth);
  height += int(computedStyle.borderBottomWidth);
  return height;
}
export const parseBounds = (parent, self) => {
  let left = int(parent.style.paddingLeft) + int(self.style.marginLeft) - self.offsetLeft
  let top = int(parent.style.paddingTop) + int(self.style.marginTop) - self.offsetTop
  let right = innerWidth(parent) - outerWidth(self)
  let bottom = innerHeight(parent) - outerHeight(self)
  let height = innerHeight(parent)
  let width = innerWidth(parent) 
  return { left, top, right, bottom, width, height }
}
export const isNumber = (things) => {
    return typeof things === 'number' ? true : false
}

const hasOwn = {}.hasOwnProperty;

export const classNames = (...args) => {
  var classes = [];
  for (let i = 0; i < args.length; i++) {
    let arg = args[i];
    if (!arg) continue;

    let argType = typeof arg;

    if (argType === 'string' || argType === 'number') {
      classes.push(arg);
    } else if (Array.isArray(arg) && arg.length) {
      let inner = classNames.apply(null, arg);
      if (inner) {
        classes.push(inner);
      }
    } else if (argType === 'object') {
      for (let key in arg) {
        if (hasOwn.call(arg, key) && arg[key]) {
          classes.push(key);
        }
      }
    }
  }

  return classes.join(' ');
}