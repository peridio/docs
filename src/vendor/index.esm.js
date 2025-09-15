var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key2, value) => key2 in obj ? __defProp(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
var __publicField = (obj, key2, value) => __defNormalProp(obj, typeof key2 !== "symbol" ? key2 + "" : key2, value);
var _a, _b;
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import * as React from "react";
import React__default, { forwardRef, useState, useCallback, useLayoutEffect, createContext, useContext, useRef, useId as useId$1, useEffect, useMemo } from "react";
import * as ReactDOM from "react-dom";
import { HiArrowsRightLeft, HiArrowUturnRight } from "react-icons/hi2";
const Badge = ({
  variant = "default",
  size = "sm",
  children,
  className = "",
  disabled = false,
  uppercase = false,
  clickable = false,
  onClick,
  title,
  "aria-label": ariaLabel
}) => {
  const baseClass = "badge";
  const variantClass = `badge-${variant}`;
  const sizeClass = `badge-${size}`;
  const disabledClass = disabled ? "badge-disabled" : "";
  const uppercaseClass = uppercase ? "badge-uppercase" : "";
  const clickableClass = clickable ? "badge-clickable" : "";
  const classes = [
    baseClass,
    variantClass,
    sizeClass,
    disabledClass,
    uppercaseClass,
    clickableClass,
    className
  ].filter(Boolean).join(" ");
  const handleClick = () => {
    if (clickable && !disabled && onClick) {
      onClick();
    }
  };
  const handleKeyDown = (event) => {
    if (clickable && !disabled && onClick && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      handleClick();
    }
  };
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: classes,
      onClick: handleClick,
      onKeyDown: handleKeyDown,
      tabIndex: clickable && !disabled ? 0 : void 0,
      role: clickable ? "button" : void 0,
      title,
      "aria-label": ariaLabel,
      children
    }
  );
};
const BadgeGroup = ({
  values,
  label = "enum",
  showLabel = true,
  onValueClick,
  className = "",
  badgeVariant = "enum",
  badgeSize = "xs"
}) => {
  if (!values || values.length === 0) {
    return null;
  }
  const containerClasses = ["badge-group", className].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsxs("div", { className: containerClasses, children: [
    showLabel && /* @__PURE__ */ jsxs(Badge, { variant: "label", size: "xs", uppercase: true, children: [
      label,
      ":"
    ] }),
    values.map((value, index2) => {
      const displayValue = typeof value === "string" ? value : value === null ? "null" : value === void 0 ? "undefined" : typeof value === "boolean" || typeof value === "number" ? String(value) : JSON.stringify(value);
      return /* @__PURE__ */ jsx(
        Badge,
        {
          variant: badgeVariant,
          size: badgeSize,
          clickable: !!onValueClick,
          onClick: () => onValueClick == null ? void 0 : onValueClick(value),
          title: onValueClick ? "Click to copy" : void 0,
          "aria-label": onValueClick ? `Copy value ${displayValue}` : void 0,
          children: displayValue
        },
        index2
      );
    })
  ] });
};
const Divider = ({
  variant = "default",
  orientation = "horizontal",
  className = "",
  spacing = "lg"
}) => {
  const baseClass = "divider";
  const variantClass = `divider-${variant}`;
  const orientationClass = `divider-${orientation}`;
  const spacingClass = `divider-spacing-${spacing}`;
  const classes = [
    baseClass,
    variantClass,
    orientationClass,
    spacingClass,
    className
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsx("hr", { className: classes });
};
var DefaultContext = {
  color: void 0,
  size: void 0,
  className: void 0,
  style: void 0,
  attr: void 0
};
var IconContext = React__default.createContext && /* @__PURE__ */ React__default.createContext(DefaultContext);
var _excluded = ["attr", "size", "title"];
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key2, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key2 = sourceSymbolKeys[i];
      if (excluded.indexOf(key2) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key2)) continue;
      target[key2] = source[key2];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  for (var key2 in source) {
    if (Object.prototype.hasOwnProperty.call(source, key2)) {
      if (excluded.indexOf(key2) >= 0) continue;
      target[key2] = source[key2];
    }
  }
  return target;
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key2 in source) {
        if (Object.prototype.hasOwnProperty.call(source, key2)) {
          target[key2] = source[key2];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty(obj, key2, value) {
  key2 = _toPropertyKey(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function Tree2Element(tree) {
  return tree && tree.map((node, i) => /* @__PURE__ */ React__default.createElement(node.tag, _objectSpread({
    key: i
  }, node.attr), Tree2Element(node.child)));
}
function GenIcon(data) {
  return (props) => /* @__PURE__ */ React__default.createElement(IconBase, _extends({
    attr: _objectSpread({}, data.attr)
  }, props), Tree2Element(data.child));
}
function IconBase(props) {
  var elem = (conf) => {
    var {
      attr: attr2,
      size,
      title
    } = props, svgProps = _objectWithoutProperties(props, _excluded);
    var computedSize = size || conf.size || "1em";
    var className;
    if (conf.className) className = conf.className;
    if (props.className) className = (className ? className + " " : "") + props.className;
    return /* @__PURE__ */ React__default.createElement("svg", _extends({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, conf.attr, attr2, svgProps, {
      className,
      style: _objectSpread(_objectSpread({
        color: props.color || conf.color
      }, conf.style), props.style),
      height: computedSize,
      width: computedSize,
      xmlns: "http://www.w3.org/2000/svg"
    }), title && /* @__PURE__ */ React__default.createElement("title", null, title), props.children);
  };
  return IconContext !== void 0 ? /* @__PURE__ */ React__default.createElement(IconContext.Consumer, null, (conf) => elem(conf)) : elem(DefaultContext);
}
function FaChevronDown(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 448 512" }, "child": [{ "tag": "path", "attr": { "d": "M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" }, "child": [] }] })(props);
}
function FaChevronRight(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 320 512" }, "child": [{ "tag": "path", "attr": { "d": "M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" }, "child": [] }] })(props);
}
function FaCog(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 512 512" }, "child": [{ "tag": "path", "attr": { "d": "M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z" }, "child": [] }] })(props);
}
function FaCopy(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 448 512" }, "child": [{ "tag": "path", "attr": { "d": "M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z" }, "child": [] }] })(props);
}
function FaExclamationTriangle(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 576 512" }, "child": [{ "tag": "path", "attr": { "d": "M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z" }, "child": [] }] })(props);
}
function FaEyeSlash(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 640 512" }, "child": [{ "tag": "path", "attr": { "d": "M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z" }, "child": [] }] })(props);
}
function FaFolderOpen(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 576 512" }, "child": [{ "tag": "path", "attr": { "d": "M572.694 292.093L500.27 416.248A63.997 63.997 0 0 1 444.989 448H45.025c-18.523 0-30.064-20.093-20.731-36.093l72.424-124.155A64 64 0 0 1 152 256h399.964c18.523 0 30.064 20.093 20.73 36.093zM152 224h328v-48c0-26.51-21.49-48-48-48H272l-64-64H48C21.49 64 0 85.49 0 112v278.046l69.077-118.418C86.214 242.25 117.989 224 152 224z" }, "child": [] }] })(props);
}
function FaFolder(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 512 512" }, "child": [{ "tag": "path", "attr": { "d": "M464 128H272l-64-64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V176c0-26.51-21.49-48-48-48z" }, "child": [] }] })(props);
}
function FaKeyboard(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 576 512" }, "child": [{ "tag": "path", "attr": { "d": "M528 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h480c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM128 180v-40c0-6.627-5.373-12-12-12H76c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm-336 96v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm-336 96v-40c0-6.627-5.373-12-12-12H76c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm288 0v-40c0-6.627-5.373-12-12-12H172c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h232c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12z" }, "child": [] }] })(props);
}
function FaLink(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 512 512" }, "child": [{ "tag": "path", "attr": { "d": "M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z" }, "child": [] }] })(props);
}
function FaMapPin(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 288 512" }, "child": [{ "tag": "path", "attr": { "d": "M112 316.94v156.69l22.02 33.02c4.75 7.12 15.22 7.12 19.97 0L176 473.63V316.94c-10.39 1.92-21.06 3.06-32 3.06s-21.61-1.14-32-3.06zM144 0C64.47 0 0 64.47 0 144s64.47 144 144 144 144-64.47 144-144S223.53 0 144 0zm0 76c-37.5 0-68 30.5-68 68 0 6.62-5.38 12-12 12s-12-5.38-12-12c0-50.73 41.28-92 92-92 6.62 0 12 5.38 12 12s-5.38 12-12 12z" }, "child": [] }] })(props);
}
function FaSitemap(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 640 512" }, "child": [{ "tag": "path", "attr": { "d": "M128 352H32c-17.67 0-32 14.33-32 32v96c0 17.67 14.33 32 32 32h96c17.67 0 32-14.33 32-32v-96c0-17.67-14.33-32-32-32zm-24-80h192v48h48v-48h192v48h48v-57.59c0-21.17-17.23-38.41-38.41-38.41H344v-64h40c17.67 0 32-14.33 32-32V32c0-17.67-14.33-32-32-32H256c-17.67 0-32 14.33-32 32v96c0 17.67 14.33 32 32 32h40v64H94.41C73.23 224 56 241.23 56 262.41V320h48v-48zm264 80h-96c-17.67 0-32 14.33-32 32v96c0 17.67 14.33 32 32 32h96c17.67 0 32-14.33 32-32v-96c0-17.67-14.33-32-32-32zm240 0h-96c-17.67 0-32 14.33-32 32v96c0 17.67 14.33 32 32 32h96c17.67 0 32-14.33 32-32v-96c0-17.67-14.33-32-32-32z" }, "child": [] }] })(props);
}
function FaTimes(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 352 512" }, "child": [{ "tag": "path", "attr": { "d": "M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" }, "child": [] }] })(props);
}
const Button = ({
  variant = "default",
  size = "sm",
  children,
  className = "",
  disabled = false,
  loading = false,
  ...props
}) => {
  const baseClass = "btn";
  const variantClass = `btn-${variant}`;
  const sizeClass = `btn-${size}`;
  const loadingClass = loading ? "btn-loading" : "";
  const disabledClass = disabled || loading ? "btn-disabled" : "";
  const classes = [
    baseClass,
    variantClass,
    sizeClass,
    loadingClass,
    disabledClass,
    className
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsxs("button", { className: classes, disabled: disabled || loading, ...props, children: [
    loading ? /* @__PURE__ */ jsx("div", { className: "btn-spinner", "aria-hidden": "true", children: "⟳" }) : null,
    /* @__PURE__ */ jsx("div", { className: loading ? "btn-content-loading" : "btn-content", children })
  ] });
};
const Input = forwardRef(
  ({
    variant = "default",
    size = "md",
    className = "",
    error: error2 = false,
    success = false,
    ...props
  }, ref) => {
    const baseClass = "input";
    const variantClass = `input-${variant}`;
    const sizeClass = `input-${size}`;
    const errorClass = error2 ? "input-error" : "";
    const successClass = success ? "input-success" : "";
    const classes = [
      baseClass,
      variantClass,
      sizeClass,
      errorClass,
      successClass,
      className
    ].filter(Boolean).join(" ");
    return /* @__PURE__ */ jsx("input", { ref, className: classes, ...props });
  }
);
Input.displayName = "Input";
function RadioGroup({
  options,
  value,
  onChange,
  name,
  className = "",
  disabled = false,
  size = "md"
}) {
  const groupName = name || `radio-group-${Math.random().toString(36).substr(2, 9)}`;
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `radio-group radio-group-${size} ${className}`,
      role: "radiogroup",
      children: options.map((option2, index2) => {
        const isSelected = option2.value === value;
        const isDisabled = disabled || option2.disabled;
        const optionId = `${groupName}-${index2}`;
        return /* @__PURE__ */ jsxs(
          "label",
          {
            htmlFor: optionId,
            className: `radio-option ${isSelected ? "selected" : ""} ${isDisabled ? "disabled" : ""}`,
            children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "radio",
                  id: optionId,
                  name: groupName,
                  value: String(option2.value),
                  checked: isSelected,
                  disabled: isDisabled,
                  onChange: () => !isDisabled && onChange(option2.value),
                  className: "radio-input"
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "radio-label", children: option2.label })
            ]
          },
          String(option2.value)
        );
      })
    }
  );
}
const Settings = ({
  options,
  onChange,
  siteKey = typeof window !== "undefined" ? window.location.hostname : "default"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);
  const handleOptionChange = useCallback(
    (key2, value) => {
      const newOptions = { [key2]: value };
      onChange(newOptions);
      if (typeof window !== "undefined") {
        try {
          const storageKey = `deckard-settings-${siteKey}`;
          const existingSettings = JSON.parse(
            localStorage.getItem(storageKey) || "{}"
          );
          const updatedSettings = { ...existingSettings, [key2]: value };
          localStorage.setItem(storageKey, JSON.stringify(updatedSettings));
        } catch (error2) {
          console.warn("Failed to save settings to localStorage:", error2);
        }
      }
    },
    [onChange, siteKey]
  );
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Tooltip, { title: "Settings", content: "Configure schema display options", children: /* @__PURE__ */ jsx(
      Button,
      {
        variant: "ghost",
        size: "xs",
        className: "settings-trigger",
        onClick: handleToggleOpen,
        "aria-label": "Schema display settings",
        children: /* @__PURE__ */ jsx(FaCog, {})
      }
    ) }),
    /* @__PURE__ */ jsxs(
      Modal,
      {
        isOpen,
        onClose: handleClose,
        title: "Display Settings",
        size: "md",
        footer: /* @__PURE__ */ jsx("p", { className: "settings-note", children: "Settings are saved per-site and will persist between visits." }),
        children: [
          /* @__PURE__ */ jsxs("div", { className: "settings-section", children: [
            /* @__PURE__ */ jsx("h4", { className: "settings-section-title", children: "Examples" }),
            /* @__PURE__ */ jsxs("div", { className: "settings-options", children: [
              /* @__PURE__ */ jsxs("label", { className: "settings-option", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: options.includeExamples || false,
                    onChange: (e) => handleOptionChange("includeExamples", e.target.checked)
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "settings-option-content", children: [
                  /* @__PURE__ */ jsx("div", { className: "settings-checkbox" }),
                  /* @__PURE__ */ jsxs("div", { className: "settings-option-text", children: [
                    /* @__PURE__ */ jsx("div", { className: "settings-option-label", children: "Show examples" }),
                    /* @__PURE__ */ jsx("div", { className: "settings-option-description", children: "Display code examples for properties when available" })
                  ] })
                ] })
              ] }),
              options.includeExamples && /* @__PURE__ */ jsxs("label", { className: "settings-option settings-sub-option", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: !options.examplesOnFocusOnly,
                    onChange: (e) => handleOptionChange("examplesOnFocusOnly", !e.target.checked)
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "settings-option-content", children: [
                  /* @__PURE__ */ jsx("div", { className: "settings-checkbox" }),
                  /* @__PURE__ */ jsxs("div", { className: "settings-option-text", children: [
                    /* @__PURE__ */ jsx("div", { className: "settings-option-label", children: "Always show examples" }),
                    /* @__PURE__ */ jsx("div", { className: "settings-option-description", children: "Show examples for all expanded properties, not just focused ones" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "settings-option", children: /* @__PURE__ */ jsx("div", { className: "settings-option-content", children: /* @__PURE__ */ jsxs("div", { className: "settings-option-text", children: [
                /* @__PURE__ */ jsx("div", { className: "settings-option-label", children: "Default example language" }),
                /* @__PURE__ */ jsx("div", { className: "settings-option-description", children: "Choose the default format for code examples" }),
                /* @__PURE__ */ jsxs("div", { style: { marginTop: "var(--schema-space-sm)" }, children: [
                  /* @__PURE__ */ jsxs("label", { className: "settings-language-option", children: [
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "radio",
                        name: "defaultExampleLanguage",
                        value: "yaml",
                        checked: options.defaultExampleLanguage === "yaml",
                        onChange: () => handleOptionChange("defaultExampleLanguage", "yaml")
                      }
                    ),
                    /* @__PURE__ */ jsx("div", { className: "settings-checkbox" }),
                    /* @__PURE__ */ jsx("span", { children: "YAML" })
                  ] }),
                  /* @__PURE__ */ jsxs("label", { className: "settings-language-option", children: [
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "radio",
                        name: "defaultExampleLanguage",
                        value: "json",
                        checked: options.defaultExampleLanguage === "json",
                        onChange: () => handleOptionChange("defaultExampleLanguage", "json")
                      }
                    ),
                    /* @__PURE__ */ jsx("div", { className: "settings-checkbox" }),
                    /* @__PURE__ */ jsx("span", { children: "JSON" })
                  ] }),
                  /* @__PURE__ */ jsxs("label", { className: "settings-language-option", children: [
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "radio",
                        name: "defaultExampleLanguage",
                        value: "toml",
                        checked: options.defaultExampleLanguage === "toml",
                        onChange: () => handleOptionChange("defaultExampleLanguage", "toml")
                      }
                    ),
                    /* @__PURE__ */ jsx("div", { className: "settings-checkbox" }),
                    /* @__PURE__ */ jsx("span", { children: "TOML" })
                  ] })
                ] })
              ] }) }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "settings-section", children: [
            /* @__PURE__ */ jsx("h4", { className: "settings-section-title", children: "Navigation" }),
            /* @__PURE__ */ jsxs("div", { className: "settings-options", children: [
              /* @__PURE__ */ jsxs("label", { className: "settings-option", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: Boolean(options.searchable) === true,
                    onChange: (e) => handleOptionChange("searchable", e.target.checked)
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "settings-option-content", children: [
                  /* @__PURE__ */ jsx("div", { className: "settings-checkbox" }),
                  /* @__PURE__ */ jsxs("div", { className: "settings-option-text", children: [
                    /* @__PURE__ */ jsx("div", { className: "settings-option-label", children: "Enable search" }),
                    /* @__PURE__ */ jsx("div", { className: "settings-option-description", children: "Show search box to filter properties" })
                  ] })
                ] })
              ] }),
              options.searchable && /* @__PURE__ */ jsxs("label", { className: "settings-option settings-sub-option", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: options.searchIncludesExamples || false,
                    onChange: (e) => handleOptionChange(
                      "searchIncludesExamples",
                      e.target.checked
                    )
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "settings-option-content", children: [
                  /* @__PURE__ */ jsx("div", { className: "settings-checkbox" }),
                  /* @__PURE__ */ jsxs("div", { className: "settings-option-text", children: [
                    /* @__PURE__ */ jsx("div", { className: "settings-option-label", children: "Search examples content" }),
                    /* @__PURE__ */ jsx("div", { className: "settings-option-description", children: "Include example values when searching properties" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("label", { className: "settings-option", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: options.collapsible !== false,
                    onChange: (e) => handleOptionChange("collapsible", e.target.checked)
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "settings-option-content", children: [
                  /* @__PURE__ */ jsx("div", { className: "settings-checkbox" }),
                  /* @__PURE__ */ jsxs("div", { className: "settings-option-text", children: [
                    /* @__PURE__ */ jsx("div", { className: "settings-option-label", children: "Collapsible properties" }),
                    /* @__PURE__ */ jsx("div", { className: "settings-option-description", children: "Allow expanding and collapsing property details" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("label", { className: "settings-option", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: options.autoExpand || false,
                    onChange: (e) => handleOptionChange("autoExpand", e.target.checked)
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "settings-option-content", children: [
                  /* @__PURE__ */ jsx("div", { className: "settings-checkbox" }),
                  /* @__PURE__ */ jsxs("div", { className: "settings-option-text", children: [
                    /* @__PURE__ */ jsx("div", { className: "settings-option-label", children: "Auto-expand" }),
                    /* @__PURE__ */ jsx("div", { className: "settings-option-description", children: "Expand all properties by default" })
                  ] })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "settings-section", children: [
            /* @__PURE__ */ jsx("h4", { className: "settings-section-title", children: "Display" }),
            /* @__PURE__ */ jsxs("div", { className: "settings-options", children: [
              /* @__PURE__ */ jsxs("label", { className: "settings-option", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: options.includeHeader !== false,
                    onChange: (e) => handleOptionChange("includeHeader", e.target.checked)
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "settings-option-content", children: [
                  /* @__PURE__ */ jsx("div", { className: "settings-checkbox" }),
                  /* @__PURE__ */ jsxs("div", { className: "settings-option-text", children: [
                    /* @__PURE__ */ jsx("div", { className: "settings-option-label", children: "Show header" }),
                    /* @__PURE__ */ jsx("div", { className: "settings-option-description", children: "Display schema title and description" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("label", { className: "settings-option", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: options.includePropertiesTitle !== false,
                    onChange: (e) => handleOptionChange("includePropertiesTitle", e.target.checked)
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "settings-option-content", children: [
                  /* @__PURE__ */ jsx("div", { className: "settings-checkbox" }),
                  /* @__PURE__ */ jsxs("div", { className: "settings-option-text", children: [
                    /* @__PURE__ */ jsx("div", { className: "settings-option-label", children: "Show “Properties” title" }),
                    /* @__PURE__ */ jsx("div", { className: "settings-option-description", children: "Display the “Properties” section heading" })
                  ] })
                ] })
              ] })
            ] })
          ] })
        ]
      }
    )
  ] });
};
function hasWindow() {
  return typeof window !== "undefined";
}
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || "").toLowerCase();
  }
  return "#document";
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  if (!hasWindow() || typeof ShadowRoot === "undefined") {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
const invalidOverflowDisplayValues = /* @__PURE__ */ new Set(["inline", "contents"]);
function isOverflowElement(element2) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle$1(element2);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !invalidOverflowDisplayValues.has(display);
}
const tableElements = /* @__PURE__ */ new Set(["table", "td", "th"]);
function isTableElement(element2) {
  return tableElements.has(getNodeName(element2));
}
const topLayerSelectors = [":popover-open", ":modal"];
function isTopLayer(element2) {
  return topLayerSelectors.some((selector) => {
    try {
      return element2.matches(selector);
    } catch (_e) {
      return false;
    }
  });
}
const transformProperties = ["transform", "translate", "scale", "rotate", "perspective"];
const willChangeValues = ["transform", "translate", "scale", "rotate", "perspective", "filter"];
const containValues = ["paint", "layout", "strict", "content"];
function isContainingBlock(elementOrCss) {
  const webkit = isWebKit();
  const css = isElement(elementOrCss) ? getComputedStyle$1(elementOrCss) : elementOrCss;
  return transformProperties.some((value) => css[value] ? css[value] !== "none" : false) || (css.containerType ? css.containerType !== "normal" : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== "none" : false) || !webkit && (css.filter ? css.filter !== "none" : false) || willChangeValues.some((value) => (css.willChange || "").includes(value)) || containValues.some((value) => (css.contain || "").includes(value));
}
function getContainingBlock(element2) {
  let currentNode = getParentNode(element2);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else if (isTopLayer(currentNode)) {
      return null;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (typeof CSS === "undefined" || !CSS.supports) return false;
  return CSS.supports("-webkit-backdrop-filter", "none");
}
const lastTraversableNodeNames = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function isLastTraversableNode(node) {
  return lastTraversableNodeNames.has(getNodeName(node));
}
function getComputedStyle$1(element2) {
  return getWindow(element2).getComputedStyle(element2);
}
function getNodeScroll(element2) {
  if (isElement(element2)) {
    return {
      scrollLeft: element2.scrollLeft,
      scrollTop: element2.scrollTop
    };
  }
  return {
    scrollLeft: element2.scrollX,
    scrollTop: element2.scrollY
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  const result = (
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    isShadowRoot(node) && node.host || // Fallback.
    getDocumentElement(node)
  );
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    const frameElement = getFrameElement(win);
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}
function getFrameElement(win) {
  return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}
const min = Math.min;
const max = Math.max;
const round = Math.round;
const floor = Math.floor;
const createCoords = (v) => ({
  x: v,
  y: v
});
const oppositeSideMap = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
const oppositeAlignmentMap = {
  start: "end",
  end: "start"
};
function clamp(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getOppositeAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
  return axis === "y" ? "height" : "width";
}
const yAxisSides = /* @__PURE__ */ new Set(["top", "bottom"]);
function getSideAxis(placement) {
  return yAxisSides.has(getSide(placement)) ? "y" : "x";
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, (alignment) => oppositeAlignmentMap[alignment]);
}
const lrPlacement = ["left", "right"];
const rlPlacement = ["right", "left"];
const tbPlacement = ["top", "bottom"];
const btPlacement = ["bottom", "top"];
function getSideList(side, isStart, rtl) {
  switch (side) {
    case "top":
    case "bottom":
      if (rtl) return isStart ? rlPlacement : lrPlacement;
      return isStart ? lrPlacement : rlPlacement;
    case "left":
    case "right":
      return isStart ? tbPlacement : btPlacement;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === "start", rtl);
  if (alignment) {
    list = list.map((side) => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, (side) => oppositeSideMap[side]);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x,
    y,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    x,
    y
  };
}
/*!
* tabbable 6.2.0
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
var candidateSelectors = ["input:not([inert])", "select:not([inert])", "textarea:not([inert])", "a[href]:not([inert])", "button:not([inert])", "[tabindex]:not(slot):not([inert])", "audio[controls]:not([inert])", "video[controls]:not([inert])", '[contenteditable]:not([contenteditable="false"]):not([inert])', "details>summary:first-of-type:not([inert])", "details:not([inert])"];
var candidateSelector = /* @__PURE__ */ candidateSelectors.join(",");
var NoElement = typeof Element === "undefined";
var matches$1 = NoElement ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
var getRootNode = !NoElement && Element.prototype.getRootNode ? function(element2) {
  var _element$getRootNode;
  return element2 === null || element2 === void 0 ? void 0 : (_element$getRootNode = element2.getRootNode) === null || _element$getRootNode === void 0 ? void 0 : _element$getRootNode.call(element2);
} : function(element2) {
  return element2 === null || element2 === void 0 ? void 0 : element2.ownerDocument;
};
var isInert = function isInert2(node, lookUp) {
  var _node$getAttribute;
  if (lookUp === void 0) {
    lookUp = true;
  }
  var inertAtt = node === null || node === void 0 ? void 0 : (_node$getAttribute = node.getAttribute) === null || _node$getAttribute === void 0 ? void 0 : _node$getAttribute.call(node, "inert");
  var inert = inertAtt === "" || inertAtt === "true";
  var result = inert || lookUp && node && isInert2(node.parentNode);
  return result;
};
var isContentEditable = function isContentEditable2(node) {
  var _node$getAttribute2;
  var attValue = node === null || node === void 0 ? void 0 : (_node$getAttribute2 = node.getAttribute) === null || _node$getAttribute2 === void 0 ? void 0 : _node$getAttribute2.call(node, "contenteditable");
  return attValue === "" || attValue === "true";
};
var getCandidates = function getCandidates2(el, includeContainer, filter) {
  if (isInert(el)) {
    return [];
  }
  var candidates = Array.prototype.slice.apply(el.querySelectorAll(candidateSelector));
  if (includeContainer && matches$1.call(el, candidateSelector)) {
    candidates.unshift(el);
  }
  candidates = candidates.filter(filter);
  return candidates;
};
var getCandidatesIteratively = function getCandidatesIteratively2(elements, includeContainer, options) {
  var candidates = [];
  var elementsToCheck = Array.from(elements);
  while (elementsToCheck.length) {
    var element2 = elementsToCheck.shift();
    if (isInert(element2, false)) {
      continue;
    }
    if (element2.tagName === "SLOT") {
      var assigned = element2.assignedElements();
      var content = assigned.length ? assigned : element2.children;
      var nestedCandidates = getCandidatesIteratively2(content, true, options);
      if (options.flatten) {
        candidates.push.apply(candidates, nestedCandidates);
      } else {
        candidates.push({
          scopeParent: element2,
          candidates: nestedCandidates
        });
      }
    } else {
      var validCandidate = matches$1.call(element2, candidateSelector);
      if (validCandidate && options.filter(element2) && (includeContainer || !elements.includes(element2))) {
        candidates.push(element2);
      }
      var shadowRoot = element2.shadowRoot || // check for an undisclosed shadow
      typeof options.getShadowRoot === "function" && options.getShadowRoot(element2);
      var validShadowRoot = !isInert(shadowRoot, false) && (!options.shadowRootFilter || options.shadowRootFilter(element2));
      if (shadowRoot && validShadowRoot) {
        var _nestedCandidates = getCandidatesIteratively2(shadowRoot === true ? element2.children : shadowRoot.children, true, options);
        if (options.flatten) {
          candidates.push.apply(candidates, _nestedCandidates);
        } else {
          candidates.push({
            scopeParent: element2,
            candidates: _nestedCandidates
          });
        }
      } else {
        elementsToCheck.unshift.apply(elementsToCheck, element2.children);
      }
    }
  }
  return candidates;
};
var hasTabIndex = function hasTabIndex2(node) {
  return !isNaN(parseInt(node.getAttribute("tabindex"), 10));
};
var getTabIndex = function getTabIndex2(node) {
  if (!node) {
    throw new Error("No node provided");
  }
  if (node.tabIndex < 0) {
    if ((/^(AUDIO|VIDEO|DETAILS)$/.test(node.tagName) || isContentEditable(node)) && !hasTabIndex(node)) {
      return 0;
    }
  }
  return node.tabIndex;
};
var getSortOrderTabIndex = function getSortOrderTabIndex2(node, isScope) {
  var tabIndex = getTabIndex(node);
  if (tabIndex < 0 && isScope && !hasTabIndex(node)) {
    return 0;
  }
  return tabIndex;
};
var sortOrderedTabbables = function sortOrderedTabbables2(a, b) {
  return a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex;
};
var isInput = function isInput2(node) {
  return node.tagName === "INPUT";
};
var isHiddenInput = function isHiddenInput2(node) {
  return isInput(node) && node.type === "hidden";
};
var isDetailsWithSummary = function isDetailsWithSummary2(node) {
  var r = node.tagName === "DETAILS" && Array.prototype.slice.apply(node.children).some(function(child) {
    return child.tagName === "SUMMARY";
  });
  return r;
};
var getCheckedRadio = function getCheckedRadio2(nodes, form) {
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].checked && nodes[i].form === form) {
      return nodes[i];
    }
  }
};
var isTabbableRadio = function isTabbableRadio2(node) {
  if (!node.name) {
    return true;
  }
  var radioScope = node.form || getRootNode(node);
  var queryRadios = function queryRadios2(name) {
    return radioScope.querySelectorAll('input[type="radio"][name="' + name + '"]');
  };
  var radioSet;
  if (typeof window !== "undefined" && typeof window.CSS !== "undefined" && typeof window.CSS.escape === "function") {
    radioSet = queryRadios(window.CSS.escape(node.name));
  } else {
    try {
      radioSet = queryRadios(node.name);
    } catch (err) {
      console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", err.message);
      return false;
    }
  }
  var checked = getCheckedRadio(radioSet, node.form);
  return !checked || checked === node;
};
var isRadio = function isRadio2(node) {
  return isInput(node) && node.type === "radio";
};
var isNonTabbableRadio = function isNonTabbableRadio2(node) {
  return isRadio(node) && !isTabbableRadio(node);
};
var isNodeAttached = function isNodeAttached2(node) {
  var _nodeRoot;
  var nodeRoot = node && getRootNode(node);
  var nodeRootHost = (_nodeRoot = nodeRoot) === null || _nodeRoot === void 0 ? void 0 : _nodeRoot.host;
  var attached = false;
  if (nodeRoot && nodeRoot !== node) {
    var _nodeRootHost, _nodeRootHost$ownerDo, _node$ownerDocument;
    attached = !!((_nodeRootHost = nodeRootHost) !== null && _nodeRootHost !== void 0 && (_nodeRootHost$ownerDo = _nodeRootHost.ownerDocument) !== null && _nodeRootHost$ownerDo !== void 0 && _nodeRootHost$ownerDo.contains(nodeRootHost) || node !== null && node !== void 0 && (_node$ownerDocument = node.ownerDocument) !== null && _node$ownerDocument !== void 0 && _node$ownerDocument.contains(node));
    while (!attached && nodeRootHost) {
      var _nodeRoot2, _nodeRootHost2, _nodeRootHost2$ownerD;
      nodeRoot = getRootNode(nodeRootHost);
      nodeRootHost = (_nodeRoot2 = nodeRoot) === null || _nodeRoot2 === void 0 ? void 0 : _nodeRoot2.host;
      attached = !!((_nodeRootHost2 = nodeRootHost) !== null && _nodeRootHost2 !== void 0 && (_nodeRootHost2$ownerD = _nodeRootHost2.ownerDocument) !== null && _nodeRootHost2$ownerD !== void 0 && _nodeRootHost2$ownerD.contains(nodeRootHost));
    }
  }
  return attached;
};
var isZeroArea = function isZeroArea2(node) {
  var _node$getBoundingClie = node.getBoundingClientRect(), width = _node$getBoundingClie.width, height = _node$getBoundingClie.height;
  return width === 0 && height === 0;
};
var isHidden = function isHidden2(node, _ref) {
  var displayCheck = _ref.displayCheck, getShadowRoot = _ref.getShadowRoot;
  if (getComputedStyle(node).visibility === "hidden") {
    return true;
  }
  var isDirectSummary = matches$1.call(node, "details>summary:first-of-type");
  var nodeUnderDetails = isDirectSummary ? node.parentElement : node;
  if (matches$1.call(nodeUnderDetails, "details:not([open]) *")) {
    return true;
  }
  if (!displayCheck || displayCheck === "full" || displayCheck === "legacy-full") {
    if (typeof getShadowRoot === "function") {
      var originalNode = node;
      while (node) {
        var parentElement = node.parentElement;
        var rootNode = getRootNode(node);
        if (parentElement && !parentElement.shadowRoot && getShadowRoot(parentElement) === true) {
          return isZeroArea(node);
        } else if (node.assignedSlot) {
          node = node.assignedSlot;
        } else if (!parentElement && rootNode !== node.ownerDocument) {
          node = rootNode.host;
        } else {
          node = parentElement;
        }
      }
      node = originalNode;
    }
    if (isNodeAttached(node)) {
      return !node.getClientRects().length;
    }
    if (displayCheck !== "legacy-full") {
      return true;
    }
  } else if (displayCheck === "non-zero-area") {
    return isZeroArea(node);
  }
  return false;
};
var isDisabledFromFieldset = function isDisabledFromFieldset2(node) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(node.tagName)) {
    var parentNode = node.parentElement;
    while (parentNode) {
      if (parentNode.tagName === "FIELDSET" && parentNode.disabled) {
        for (var i = 0; i < parentNode.children.length; i++) {
          var child = parentNode.children.item(i);
          if (child.tagName === "LEGEND") {
            return matches$1.call(parentNode, "fieldset[disabled] *") ? true : !child.contains(node);
          }
        }
        return true;
      }
      parentNode = parentNode.parentElement;
    }
  }
  return false;
};
var isNodeMatchingSelectorFocusable = function isNodeMatchingSelectorFocusable2(options, node) {
  if (node.disabled || // we must do an inert look up to filter out any elements inside an inert ancestor
  //  because we're limited in the type of selectors we can use in JSDom (see related
  //  note related to `candidateSelectors`)
  isInert(node) || isHiddenInput(node) || isHidden(node, options) || // For a details element with a summary, the summary element gets the focus
  isDetailsWithSummary(node) || isDisabledFromFieldset(node)) {
    return false;
  }
  return true;
};
var isNodeMatchingSelectorTabbable = function isNodeMatchingSelectorTabbable2(options, node) {
  if (isNonTabbableRadio(node) || getTabIndex(node) < 0 || !isNodeMatchingSelectorFocusable(options, node)) {
    return false;
  }
  return true;
};
var isValidShadowRootTabbable = function isValidShadowRootTabbable2(shadowHostNode) {
  var tabIndex = parseInt(shadowHostNode.getAttribute("tabindex"), 10);
  if (isNaN(tabIndex) || tabIndex >= 0) {
    return true;
  }
  return false;
};
var sortByOrder = function sortByOrder2(candidates) {
  var regularTabbables = [];
  var orderedTabbables = [];
  candidates.forEach(function(item, i) {
    var isScope = !!item.scopeParent;
    var element2 = isScope ? item.scopeParent : item;
    var candidateTabindex = getSortOrderTabIndex(element2, isScope);
    var elements = isScope ? sortByOrder2(item.candidates) : element2;
    if (candidateTabindex === 0) {
      isScope ? regularTabbables.push.apply(regularTabbables, elements) : regularTabbables.push(element2);
    } else {
      orderedTabbables.push({
        documentOrder: i,
        tabIndex: candidateTabindex,
        item,
        isScope,
        content: elements
      });
    }
  });
  return orderedTabbables.sort(sortOrderedTabbables).reduce(function(acc, sortable) {
    sortable.isScope ? acc.push.apply(acc, sortable.content) : acc.push(sortable.content);
    return acc;
  }, []).concat(regularTabbables);
};
var tabbable = function tabbable2(container, options) {
  options = options || {};
  var candidates;
  if (options.getShadowRoot) {
    candidates = getCandidatesIteratively([container], options.includeContainer, {
      filter: isNodeMatchingSelectorTabbable.bind(null, options),
      flatten: false,
      getShadowRoot: options.getShadowRoot,
      shadowRootFilter: isValidShadowRootTabbable
    });
  } else {
    candidates = getCandidates(container, options.includeContainer, isNodeMatchingSelectorTabbable.bind(null, options));
  }
  return sortByOrder(candidates);
};
function isSafari() {
  return /apple/i.test(navigator.vendor);
}
function activeElement(doc) {
  let activeElement2 = doc.activeElement;
  while (((_activeElement = activeElement2) == null || (_activeElement = _activeElement.shadowRoot) == null ? void 0 : _activeElement.activeElement) != null) {
    var _activeElement;
    activeElement2 = activeElement2.shadowRoot.activeElement;
  }
  return activeElement2;
}
function contains(parent, child) {
  if (!parent || !child) {
    return false;
  }
  const rootNode = child.getRootNode == null ? void 0 : child.getRootNode();
  if (parent.contains(child)) {
    return true;
  }
  if (rootNode && isShadowRoot(rootNode)) {
    let next = child;
    while (next) {
      if (parent === next) {
        return true;
      }
      next = next.parentNode || next.host;
    }
  }
  return false;
}
function getDocument(node) {
  return (node == null ? void 0 : node.ownerDocument) || document;
}
var isClient$1 = typeof document !== "undefined";
var noop$1 = function noop() {
};
var index$1 = isClient$1 ? useLayoutEffect : noop$1;
const SafeReact$1 = {
  ...React
};
const useInsertionEffect = SafeReact$1.useInsertionEffect;
const useSafeInsertionEffect = useInsertionEffect || ((fn) => fn());
function useEffectEvent(callback) {
  const ref = React.useRef(() => {
    if (process.env.NODE_ENV !== "production") {
      throw new Error("Cannot call an event handler while rendering.");
    }
  });
  useSafeInsertionEffect(() => {
    ref.current = callback;
  });
  return React.useCallback(function() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return ref.current == null ? void 0 : ref.current(...args);
  }, []);
}
const getTabbableOptions = () => ({
  getShadowRoot: true,
  displayCheck: (
    // JSDOM does not support the `tabbable` library. To solve this we can
    // check if `ResizeObserver` is a real function (not polyfilled), which
    // determines if the current environment is JSDOM-like.
    typeof ResizeObserver === "function" && ResizeObserver.toString().includes("[native code]") ? "full" : "none"
  )
});
function getTabbableIn(container, dir) {
  const list = tabbable(container, getTabbableOptions());
  const len = list.length;
  if (len === 0) return;
  const active = activeElement(getDocument(container));
  const index2 = list.indexOf(active);
  const nextIndex = index2 === -1 ? dir === 1 ? 0 : len - 1 : index2 + dir;
  return list[nextIndex];
}
function getNextTabbable(referenceElement) {
  return getTabbableIn(getDocument(referenceElement).body, 1) || referenceElement;
}
function getPreviousTabbable(referenceElement) {
  return getTabbableIn(getDocument(referenceElement).body, -1) || referenceElement;
}
function isOutsideEvent(event, container) {
  const containerElement = container || event.currentTarget;
  const relatedTarget = event.relatedTarget;
  return !relatedTarget || !contains(containerElement, relatedTarget);
}
function disableFocusInside(container) {
  const tabbableElements = tabbable(container, getTabbableOptions());
  tabbableElements.forEach((element2) => {
    element2.dataset.tabindex = element2.getAttribute("tabindex") || "";
    element2.setAttribute("tabindex", "-1");
  });
}
function enableFocusInside(container) {
  const elements = container.querySelectorAll("[data-tabindex]");
  elements.forEach((element2) => {
    const tabindex = element2.dataset.tabindex;
    delete element2.dataset.tabindex;
    if (tabindex) {
      element2.setAttribute("tabindex", tabindex);
    } else {
      element2.removeAttribute("tabindex");
    }
  });
}
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === "y";
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case "start":
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case "end":
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
const computePosition$1 = async (reference, floating, config) => {
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2
  } = config;
  const validMiddleware = middleware.filter(Boolean);
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
  let rects = await platform2.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData = {};
  let resetCount = 0;
  for (let i = 0; i < validMiddleware.length; i++) {
    const {
      name,
      fn
    } = validMiddleware[i];
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platform2,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData = {
      ...middlewareData,
      [name]: {
        ...middlewareData[name],
        ...data
      }
    };
    if (reset && resetCount <= 50) {
      resetCount++;
      if (typeof reset === "object") {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform2.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x,
    y,
    platform: platform2,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element2 = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
    element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element2))) != null ? _await$platform$isEle : true) ? element2 : element2.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === "floating" ? {
    x,
    y,
    width: rects.floating.width,
    height: rects.floating.height
  } : rects.reference;
  const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
  const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}
const arrow$3 = (options) => ({
  name: "arrow",
  options,
  async fn(state) {
    const {
      x,
      y,
      placement,
      rects,
      platform: platform2,
      elements,
      middlewareData
    } = state;
    const {
      element: element2,
      padding = 0
    } = evaluate(options, state) || {};
    if (element2 == null) {
      return {};
    }
    const paddingObject = getPaddingObject(padding);
    const coords = {
      x,
      y
    };
    const axis = getAlignmentAxis(placement);
    const length = getAxisLength(axis);
    const arrowDimensions = await platform2.getDimensions(element2);
    const isYAxis = axis === "y";
    const minProp = isYAxis ? "top" : "left";
    const maxProp = isYAxis ? "bottom" : "right";
    const clientProp = isYAxis ? "clientHeight" : "clientWidth";
    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
    const startDiff = coords[axis] - rects.reference[axis];
    const arrowOffsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(element2));
    let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
    if (!clientSize || !await (platform2.isElement == null ? void 0 : platform2.isElement(arrowOffsetParent))) {
      clientSize = elements.floating[clientProp] || rects.floating[length];
    }
    const centerToReference = endDiff / 2 - startDiff / 2;
    const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
    const minPadding = min(paddingObject[minProp], largestPossiblePadding);
    const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
    const min$1 = minPadding;
    const max2 = clientSize - arrowDimensions[length] - maxPadding;
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset2 = clamp(min$1, center, max2);
    const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset2 && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
    const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max2 : 0;
    return {
      [axis]: coords[axis] + alignmentOffset,
      data: {
        [axis]: offset2,
        centerOffset: center - offset2 - alignmentOffset,
        ...shouldAddOffset && {
          alignmentOffset
        }
      },
      reset: shouldAddOffset
    };
  }
});
const flip$2 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "flip",
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform: platform2,
        elements
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = "bestFit",
        fallbackAxisSideDirection = "none",
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      const side = getSide(placement);
      const initialSideAxis = getSideAxis(initialPlacement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
      if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements = [initialPlacement, ...fallbackPlacements];
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides[0]], overflow[sides[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];
      if (!overflows.every((side2) => side2 <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements[nextIndex];
        if (nextPlacement) {
          const ignoreCrossAxisOverflow = checkCrossAxis === "alignment" ? initialSideAxis !== getSideAxis(nextPlacement) : false;
          if (!ignoreCrossAxisOverflow || // We leave the current main axis only if every placement on that axis
          // overflows the main axis.
          overflowsData.every((d) => getSideAxis(d.placement) === initialSideAxis ? d.overflows[0] > 0 : true)) {
            return {
              data: {
                index: nextIndex,
                overflows: overflowsData
              },
              reset: {
                placement: nextPlacement
              }
            };
          }
        }
        let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case "bestFit": {
              var _overflowsData$filter2;
              const placement2 = (_overflowsData$filter2 = overflowsData.filter((d) => {
                if (hasFallbackAxisSideDirection) {
                  const currentSideAxis = getSideAxis(d.placement);
                  return currentSideAxis === initialSideAxis || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  currentSideAxis === "y";
                }
                return true;
              }).map((d) => [d.placement, d.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
              if (placement2) {
                resetPlacement = placement2;
              }
              break;
            }
            case "initialPlacement":
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};
const originSides = /* @__PURE__ */ new Set(["left", "top"]);
async function convertValueToCoords(state, options) {
  const {
    placement,
    platform: platform2,
    elements
  } = state;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === "y";
  const mainAxisMulti = originSides.has(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === "number" ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: rawValue.mainAxis || 0,
    crossAxis: rawValue.crossAxis || 0,
    alignmentAxis: rawValue.alignmentAxis
  };
  if (alignment && typeof alignmentAxis === "number") {
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
const offset$2 = function(options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: "offset",
    options,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow;
      const {
        x,
        y,
        placement,
        middlewareData
      } = state;
      const diffCoords = await convertValueToCoords(state, options);
      if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: {
          ...diffCoords,
          placement
        }
      };
    }
  };
};
const shift$2 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "shift",
    options,
    async fn(state) {
      const {
        x,
        y,
        placement
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: (_ref) => {
            let {
              x: x2,
              y: y2
            } = _ref;
            return {
              x: x2,
              y: y2
            };
          }
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const coords = {
        x,
        y
      };
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const crossAxis = getSideAxis(getSide(placement));
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === "y" ? "top" : "left";
        const maxSide = mainAxis === "y" ? "bottom" : "right";
        const min2 = mainAxisCoord + overflow[minSide];
        const max2 = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = clamp(min2, mainAxisCoord, max2);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === "y" ? "top" : "left";
        const maxSide = crossAxis === "y" ? "bottom" : "right";
        const min2 = crossAxisCoord + overflow[minSide];
        const max2 = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = clamp(min2, crossAxisCoord, max2);
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x,
          y: limitedCoords.y - y,
          enabled: {
            [mainAxis]: checkMainAxis,
            [crossAxis]: checkCrossAxis
          }
        }
      };
    }
  };
};
function getCssDimensions(element2) {
  const css = getComputedStyle$1(element2);
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element2);
  const offsetWidth = hasOffset ? element2.offsetWidth : width;
  const offsetHeight = hasOffset ? element2.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}
function unwrapElement(element2) {
  return !isElement(element2) ? element2.contextElement : element2;
}
function getScale(element2) {
  const domElement = unwrapElement(element2);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x = ($ ? round(rect.width) : rect.width) / width;
  let y = ($ ? round(rect.height) : rect.height) / height;
  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}
const noOffsets = /* @__PURE__ */ createCoords(0);
function getVisualOffsets(element2) {
  const win = getWindow(element2);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element2, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element2)) {
    return false;
  }
  return isFixed;
}
function getBoundingClientRect(element2, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element2.getBoundingClientRect();
  const domElement = unwrapElement(element2);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element2);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = getFrameElement(currentWin);
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle$1(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentWin = getWindow(currentIFrame);
      currentIFrame = getFrameElement(currentWin);
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y
  });
}
function getWindowScrollBarX(element2, rect) {
  const leftScroll = getNodeScroll(element2).scrollLeft;
  if (!rect) {
    return getBoundingClientRect(getDocumentElement(element2)).left + leftScroll;
  }
  return rect.left + leftScroll;
}
function getHTMLOffset(documentElement, scroll) {
  const htmlRect = documentElement.getBoundingClientRect();
  const x = htmlRect.left + scroll.scrollLeft - getWindowScrollBarX(documentElement, htmlRect);
  const y = htmlRect.top + scroll.scrollTop;
  return {
    x,
    y
  };
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === "fixed";
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
  };
}
function getClientRects(element2) {
  return Array.from(element2.getClientRects());
}
function getDocumentRect(element2) {
  const html2 = getDocumentElement(element2);
  const scroll = getNodeScroll(element2);
  const body2 = element2.ownerDocument.body;
  const width = max(html2.scrollWidth, html2.clientWidth, body2.scrollWidth, body2.clientWidth);
  const height = max(html2.scrollHeight, html2.clientHeight, body2.scrollHeight, body2.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element2);
  const y = -scroll.scrollTop;
  if (getComputedStyle$1(body2).direction === "rtl") {
    x += max(html2.clientWidth, body2.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}
const SCROLLBAR_MAX = 25;
function getViewportRect(element2, strategy) {
  const win = getWindow(element2);
  const html2 = getDocumentElement(element2);
  const visualViewport = win.visualViewport;
  let width = html2.clientWidth;
  let height = html2.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  const windowScrollbarX = getWindowScrollBarX(html2);
  if (windowScrollbarX <= 0) {
    const doc = html2.ownerDocument;
    const body2 = doc.body;
    const bodyStyles = getComputedStyle(body2);
    const bodyMarginInline = doc.compatMode === "CSS1Compat" ? parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight) || 0 : 0;
    const clippingStableScrollbarWidth = Math.abs(html2.clientWidth - body2.clientWidth - bodyMarginInline);
    if (clippingStableScrollbarWidth <= SCROLLBAR_MAX) {
      width -= clippingStableScrollbarWidth;
    }
  } else if (windowScrollbarX <= SCROLLBAR_MAX) {
    width += windowScrollbarX;
  }
  return {
    width,
    height,
    x,
    y
  };
}
const absoluteOrFixed = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function getInnerBoundingClientRect(element2, strategy) {
  const clientRect = getBoundingClientRect(element2, true, strategy === "fixed");
  const top = clientRect.top + element2.clientTop;
  const left = clientRect.left + element2.clientLeft;
  const scale = isHTMLElement(element2) ? getScale(element2) : createCoords(1);
  const width = element2.clientWidth * scale.x;
  const height = element2.clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x,
    y
  };
}
function getClientRectFromClippingAncestor(element2, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === "viewport") {
    rect = getViewportRect(element2, strategy);
  } else if (clippingAncestor === "document") {
    rect = getDocumentRect(getDocumentElement(element2));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element2);
    rect = {
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y,
      width: clippingAncestor.width,
      height: clippingAncestor.height
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element2, stopNode) {
  const parentNode = getParentNode(element2);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle$1(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
}
function getClippingElementAncestors(element2, cache) {
  const cachedResult = cache.get(element2);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element2, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle$1(element2).position === "fixed";
  let currentNode = elementIsFixed ? getParentNode(element2) : element2;
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle$1(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === "fixed") {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && absoluteOrFixed.has(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element2, currentNode);
    if (shouldDropCurrentNode) {
      result = result.filter((ancestor) => ancestor !== currentNode);
    } else {
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element2, result);
  return result;
}
function getClippingRect(_ref) {
  let {
    element: element2,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === "clippingAncestors" ? isTopLayer(element2) ? [] : getClippingElementAncestors(element2, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element2, clippingAncestor, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element2, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}
function getDimensions(element2) {
  const {
    width,
    height
  } = getCssDimensions(element2);
  return {
    width,
    height
  };
}
function getRectRelativeToOffsetParent(element2, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === "fixed";
  const rect = getBoundingClientRect(element2, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  function setLeftRTLScrollbarOffset() {
    offsets.x = getWindowScrollBarX(documentElement);
  }
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      setLeftRTLScrollbarOffset();
    }
  }
  if (isFixed && !isOffsetParentAnElement && documentElement) {
    setLeftRTLScrollbarOffset();
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  const x = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
  const y = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
  return {
    x,
    y,
    width: rect.width,
    height: rect.height
  };
}
function isStaticPositioned(element2) {
  return getComputedStyle$1(element2).position === "static";
}
function getTrueOffsetParent(element2, polyfill) {
  if (!isHTMLElement(element2) || getComputedStyle$1(element2).position === "fixed") {
    return null;
  }
  if (polyfill) {
    return polyfill(element2);
  }
  let rawOffsetParent = element2.offsetParent;
  if (getDocumentElement(element2) === rawOffsetParent) {
    rawOffsetParent = rawOffsetParent.ownerDocument.body;
  }
  return rawOffsetParent;
}
function getOffsetParent(element2, polyfill) {
  const win = getWindow(element2);
  if (isTopLayer(element2)) {
    return win;
  }
  if (!isHTMLElement(element2)) {
    let svgOffsetParent = getParentNode(element2);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element2, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element2) || win;
}
const getElementRects = async function(data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  const floatingDimensions = await getDimensionsFn(data.floating);
  return {
    reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height
    }
  };
};
function isRTL(element2) {
  return getComputedStyle$1(element2).direction === "rtl";
}
const platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL
};
function rectsAreEqual(a, b) {
  return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
}
function observeMove(element2, onMove) {
  let io = null;
  let timeoutId;
  const root2 = getDocumentElement(element2);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const elementRectForRootMargin = element2.getBoundingClientRect();
    const {
      left,
      top,
      width,
      height
    } = elementRectForRootMargin;
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root2.clientWidth - (left + width));
    const insetBottom = floor(root2.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1e3);
        } else {
          refresh(false, ratio);
        }
      }
      if (ratio === 1 && !rectsAreEqual(elementRectForRootMargin, element2.getBoundingClientRect())) {
        refresh();
      }
      isFirstUpdate = false;
    }
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root2.ownerDocument
      });
    } catch (_e) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element2);
  }
  refresh(true);
  return cleanup;
}
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === "function",
    layoutShift = typeof IntersectionObserver === "function",
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...getOverflowAncestors(floating)] : [];
  ancestors.forEach((ancestor) => {
    ancestorScroll && ancestor.addEventListener("scroll", update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener("resize", update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver((_ref) => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    resizeObserver.observe(floating);
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _resizeObserver2;
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener("scroll", update);
      ancestorResize && ancestor.removeEventListener("resize", update);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
const offset$1 = offset$2;
const shift$1 = shift$2;
const flip$1 = flip$2;
const arrow$2 = arrow$3;
const computePosition = (reference, floating, options) => {
  const cache = /* @__PURE__ */ new Map();
  const mergedOptions = {
    platform,
    ...options
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache
  };
  return computePosition$1(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};
var isClient = typeof document !== "undefined";
var noop2 = function noop3() {
};
var index = isClient ? useLayoutEffect : noop2;
function deepEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (typeof a !== typeof b) {
    return false;
  }
  if (typeof a === "function" && a.toString() === b.toString()) {
    return true;
  }
  let length;
  let i;
  let keys;
  if (a && b && typeof a === "object") {
    if (Array.isArray(a)) {
      length = a.length;
      if (length !== b.length) return false;
      for (i = length; i-- !== 0; ) {
        if (!deepEqual(a[i], b[i])) {
          return false;
        }
      }
      return true;
    }
    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) {
      return false;
    }
    for (i = length; i-- !== 0; ) {
      if (!{}.hasOwnProperty.call(b, keys[i])) {
        return false;
      }
    }
    for (i = length; i-- !== 0; ) {
      const key2 = keys[i];
      if (key2 === "_owner" && a.$$typeof) {
        continue;
      }
      if (!deepEqual(a[key2], b[key2])) {
        return false;
      }
    }
    return true;
  }
  return a !== a && b !== b;
}
function getDPR(element2) {
  if (typeof window === "undefined") {
    return 1;
  }
  const win = element2.ownerDocument.defaultView || window;
  return win.devicePixelRatio || 1;
}
function roundByDPR(element2, value) {
  const dpr = getDPR(element2);
  return Math.round(value * dpr) / dpr;
}
function useLatestRef(value) {
  const ref = React.useRef(value);
  index(() => {
    ref.current = value;
  });
  return ref;
}
function useFloating$1(options) {
  if (options === void 0) {
    options = {};
  }
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2,
    elements: {
      reference: externalReference,
      floating: externalFloating
    } = {},
    transform = true,
    whileElementsMounted,
    open
  } = options;
  const [data, setData] = React.useState({
    x: 0,
    y: 0,
    strategy,
    placement,
    middlewareData: {},
    isPositioned: false
  });
  const [latestMiddleware, setLatestMiddleware] = React.useState(middleware);
  if (!deepEqual(latestMiddleware, middleware)) {
    setLatestMiddleware(middleware);
  }
  const [_reference, _setReference] = React.useState(null);
  const [_floating, _setFloating] = React.useState(null);
  const setReference = React.useCallback((node) => {
    if (node !== referenceRef.current) {
      referenceRef.current = node;
      _setReference(node);
    }
  }, []);
  const setFloating = React.useCallback((node) => {
    if (node !== floatingRef.current) {
      floatingRef.current = node;
      _setFloating(node);
    }
  }, []);
  const referenceEl = externalReference || _reference;
  const floatingEl = externalFloating || _floating;
  const referenceRef = React.useRef(null);
  const floatingRef = React.useRef(null);
  const dataRef = React.useRef(data);
  const hasWhileElementsMounted = whileElementsMounted != null;
  const whileElementsMountedRef = useLatestRef(whileElementsMounted);
  const platformRef = useLatestRef(platform2);
  const openRef = useLatestRef(open);
  const update = React.useCallback(() => {
    if (!referenceRef.current || !floatingRef.current) {
      return;
    }
    const config = {
      placement,
      strategy,
      middleware: latestMiddleware
    };
    if (platformRef.current) {
      config.platform = platformRef.current;
    }
    computePosition(referenceRef.current, floatingRef.current, config).then((data2) => {
      const fullData = {
        ...data2,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: openRef.current !== false
      };
      if (isMountedRef.current && !deepEqual(dataRef.current, fullData)) {
        dataRef.current = fullData;
        ReactDOM.flushSync(() => {
          setData(fullData);
        });
      }
    });
  }, [latestMiddleware, placement, strategy, platformRef, openRef]);
  index(() => {
    if (open === false && dataRef.current.isPositioned) {
      dataRef.current.isPositioned = false;
      setData((data2) => ({
        ...data2,
        isPositioned: false
      }));
    }
  }, [open]);
  const isMountedRef = React.useRef(false);
  index(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  index(() => {
    if (referenceEl) referenceRef.current = referenceEl;
    if (floatingEl) floatingRef.current = floatingEl;
    if (referenceEl && floatingEl) {
      if (whileElementsMountedRef.current) {
        return whileElementsMountedRef.current(referenceEl, floatingEl, update);
      }
      update();
    }
  }, [referenceEl, floatingEl, update, whileElementsMountedRef, hasWhileElementsMounted]);
  const refs = React.useMemo(() => ({
    reference: referenceRef,
    floating: floatingRef,
    setReference,
    setFloating
  }), [setReference, setFloating]);
  const elements = React.useMemo(() => ({
    reference: referenceEl,
    floating: floatingEl
  }), [referenceEl, floatingEl]);
  const floatingStyles = React.useMemo(() => {
    const initialStyles = {
      position: strategy,
      left: 0,
      top: 0
    };
    if (!elements.floating) {
      return initialStyles;
    }
    const x = roundByDPR(elements.floating, data.x);
    const y = roundByDPR(elements.floating, data.y);
    if (transform) {
      return {
        ...initialStyles,
        transform: "translate(" + x + "px, " + y + "px)",
        ...getDPR(elements.floating) >= 1.5 && {
          willChange: "transform"
        }
      };
    }
    return {
      position: strategy,
      left: x,
      top: y
    };
  }, [strategy, transform, elements.floating, data.x, data.y]);
  return React.useMemo(() => ({
    ...data,
    update,
    refs,
    elements,
    floatingStyles
  }), [data, update, refs, elements, floatingStyles]);
}
const arrow$1 = (options) => {
  function isRef(value) {
    return {}.hasOwnProperty.call(value, "current");
  }
  return {
    name: "arrow",
    options,
    fn(state) {
      const {
        element: element2,
        padding
      } = typeof options === "function" ? options(state) : options;
      if (element2 && isRef(element2)) {
        if (element2.current != null) {
          return arrow$2({
            element: element2.current,
            padding
          }).fn(state);
        }
        return {};
      }
      if (element2) {
        return arrow$2({
          element: element2,
          padding
        }).fn(state);
      }
      return {};
    }
  };
};
const offset = (options, deps) => ({
  ...offset$1(options),
  options: [options, deps]
});
const shift = (options, deps) => ({
  ...shift$1(options),
  options: [options, deps]
});
const flip = (options, deps) => ({
  ...flip$1(options),
  options: [options, deps]
});
const arrow = (options, deps) => ({
  ...arrow$1(options),
  options: [options, deps]
});
const SafeReact = {
  ...React
};
let serverHandoffComplete = false;
let count = 0;
const genId = () => (
  // Ensure the id is unique with multiple independent versions of Floating UI
  // on <React 18
  "floating-ui-" + Math.random().toString(36).slice(2, 6) + count++
);
function useFloatingId() {
  const [id, setId] = React.useState(() => serverHandoffComplete ? genId() : void 0);
  index$1(() => {
    if (id == null) {
      setId(genId());
    }
  }, []);
  React.useEffect(() => {
    serverHandoffComplete = true;
  }, []);
  return id;
}
const useReactId = SafeReact.useId;
const useId = useReactId || useFloatingId;
let devMessageSet;
if (process.env.NODE_ENV !== "production") {
  devMessageSet = /* @__PURE__ */ new Set();
}
function error() {
  var _devMessageSet3;
  for (var _len2 = arguments.length, messages = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    messages[_key2] = arguments[_key2];
  }
  const message = "Floating UI: " + messages.join(" ");
  if (!((_devMessageSet3 = devMessageSet) != null && _devMessageSet3.has(message))) {
    var _devMessageSet4;
    (_devMessageSet4 = devMessageSet) == null || _devMessageSet4.add(message);
    console.error(message);
  }
}
function createEventEmitter() {
  const map2 = /* @__PURE__ */ new Map();
  return {
    emit(event, data) {
      var _map$get;
      (_map$get = map2.get(event)) == null || _map$get.forEach((listener) => listener(data));
    },
    on(event, listener) {
      if (!map2.has(event)) {
        map2.set(event, /* @__PURE__ */ new Set());
      }
      map2.get(event).add(listener);
    },
    off(event, listener) {
      var _map$get2;
      (_map$get2 = map2.get(event)) == null || _map$get2.delete(listener);
    }
  };
}
const FloatingNodeContext = /* @__PURE__ */ React.createContext(null);
const FloatingTreeContext = /* @__PURE__ */ React.createContext(null);
const useFloatingParentNodeId = () => {
  var _React$useContext;
  return ((_React$useContext = React.useContext(FloatingNodeContext)) == null ? void 0 : _React$useContext.id) || null;
};
const useFloatingTree = () => React.useContext(FloatingTreeContext);
function createAttribute(name) {
  return "data-floating-ui-" + name;
}
const HIDDEN_STYLES = {
  border: 0,
  clip: "rect(0 0 0 0)",
  height: "1px",
  margin: "-1px",
  overflow: "hidden",
  padding: 0,
  position: "fixed",
  whiteSpace: "nowrap",
  width: "1px",
  top: 0,
  left: 0
};
const FocusGuard = /* @__PURE__ */ React.forwardRef(function FocusGuard2(props, ref) {
  const [role, setRole] = React.useState();
  index$1(() => {
    if (isSafari()) {
      setRole("button");
    }
  }, []);
  const restProps = {
    ref,
    tabIndex: 0,
    // Role is only for VoiceOver
    role,
    "aria-hidden": role ? void 0 : true,
    [createAttribute("focus-guard")]: "",
    style: HIDDEN_STYLES
  };
  return /* @__PURE__ */ jsx("span", {
    ...props,
    ...restProps
  });
});
const PortalContext = /* @__PURE__ */ React.createContext(null);
const attr = /* @__PURE__ */ createAttribute("portal");
function useFloatingPortalNode(props) {
  if (props === void 0) {
    props = {};
  }
  const {
    id,
    root: root2
  } = props;
  const uniqueId = useId();
  const portalContext = usePortalContext();
  const [portalNode, setPortalNode] = React.useState(null);
  const portalNodeRef = React.useRef(null);
  index$1(() => {
    return () => {
      portalNode == null || portalNode.remove();
      queueMicrotask(() => {
        portalNodeRef.current = null;
      });
    };
  }, [portalNode]);
  index$1(() => {
    if (!uniqueId) return;
    if (portalNodeRef.current) return;
    const existingIdRoot = id ? document.getElementById(id) : null;
    if (!existingIdRoot) return;
    const subRoot = document.createElement("div");
    subRoot.id = uniqueId;
    subRoot.setAttribute(attr, "");
    existingIdRoot.appendChild(subRoot);
    portalNodeRef.current = subRoot;
    setPortalNode(subRoot);
  }, [id, uniqueId]);
  index$1(() => {
    if (root2 === null) return;
    if (!uniqueId) return;
    if (portalNodeRef.current) return;
    let container = root2 || (portalContext == null ? void 0 : portalContext.portalNode);
    if (container && !isNode(container)) container = container.current;
    container = container || document.body;
    let idWrapper = null;
    if (id) {
      idWrapper = document.createElement("div");
      idWrapper.id = id;
      container.appendChild(idWrapper);
    }
    const subRoot = document.createElement("div");
    subRoot.id = uniqueId;
    subRoot.setAttribute(attr, "");
    container = idWrapper || container;
    container.appendChild(subRoot);
    portalNodeRef.current = subRoot;
    setPortalNode(subRoot);
  }, [id, root2, uniqueId, portalContext]);
  return portalNode;
}
function FloatingPortal(props) {
  const {
    children,
    id,
    root: root2,
    preserveTabOrder = true
  } = props;
  const portalNode = useFloatingPortalNode({
    id,
    root: root2
  });
  const [focusManagerState, setFocusManagerState] = React.useState(null);
  const beforeOutsideRef = React.useRef(null);
  const afterOutsideRef = React.useRef(null);
  const beforeInsideRef = React.useRef(null);
  const afterInsideRef = React.useRef(null);
  const modal = focusManagerState == null ? void 0 : focusManagerState.modal;
  const open = focusManagerState == null ? void 0 : focusManagerState.open;
  const shouldRenderGuards = (
    // The FocusManager and therefore floating element are currently open/
    // rendered.
    !!focusManagerState && // Guards are only for non-modal focus management.
    !focusManagerState.modal && // Don't render if unmount is transitioning.
    focusManagerState.open && preserveTabOrder && !!(root2 || portalNode)
  );
  React.useEffect(() => {
    if (!portalNode || !preserveTabOrder || modal) {
      return;
    }
    function onFocus(event) {
      if (portalNode && isOutsideEvent(event)) {
        const focusing = event.type === "focusin";
        const manageFocus = focusing ? enableFocusInside : disableFocusInside;
        manageFocus(portalNode);
      }
    }
    portalNode.addEventListener("focusin", onFocus, true);
    portalNode.addEventListener("focusout", onFocus, true);
    return () => {
      portalNode.removeEventListener("focusin", onFocus, true);
      portalNode.removeEventListener("focusout", onFocus, true);
    };
  }, [portalNode, preserveTabOrder, modal]);
  React.useEffect(() => {
    if (!portalNode) return;
    if (open) return;
    enableFocusInside(portalNode);
  }, [open, portalNode]);
  return /* @__PURE__ */ jsxs(PortalContext.Provider, {
    value: React.useMemo(() => ({
      preserveTabOrder,
      beforeOutsideRef,
      afterOutsideRef,
      beforeInsideRef,
      afterInsideRef,
      portalNode,
      setFocusManagerState
    }), [preserveTabOrder, portalNode]),
    children: [shouldRenderGuards && portalNode && /* @__PURE__ */ jsx(FocusGuard, {
      "data-type": "outside",
      ref: beforeOutsideRef,
      onFocus: (event) => {
        if (isOutsideEvent(event, portalNode)) {
          var _beforeInsideRef$curr;
          (_beforeInsideRef$curr = beforeInsideRef.current) == null || _beforeInsideRef$curr.focus();
        } else {
          const domReference = focusManagerState ? focusManagerState.domReference : null;
          const prevTabbable = getPreviousTabbable(domReference);
          prevTabbable == null || prevTabbable.focus();
        }
      }
    }), shouldRenderGuards && portalNode && /* @__PURE__ */ jsx("span", {
      "aria-owns": portalNode.id,
      style: HIDDEN_STYLES
    }), portalNode && /* @__PURE__ */ ReactDOM.createPortal(children, portalNode), shouldRenderGuards && portalNode && /* @__PURE__ */ jsx(FocusGuard, {
      "data-type": "outside",
      ref: afterOutsideRef,
      onFocus: (event) => {
        if (isOutsideEvent(event, portalNode)) {
          var _afterInsideRef$curre;
          (_afterInsideRef$curre = afterInsideRef.current) == null || _afterInsideRef$curre.focus();
        } else {
          const domReference = focusManagerState ? focusManagerState.domReference : null;
          const nextTabbable = getNextTabbable(domReference);
          nextTabbable == null || nextTabbable.focus();
          (focusManagerState == null ? void 0 : focusManagerState.closeOnFocusOut) && (focusManagerState == null ? void 0 : focusManagerState.onOpenChange(false, event.nativeEvent, "focus-out"));
        }
      }
    })]
  });
}
const usePortalContext = () => React.useContext(PortalContext);
function useFloatingRootContext(options) {
  const {
    open = false,
    onOpenChange: onOpenChangeProp,
    elements: elementsProp
  } = options;
  const floatingId = useId();
  const dataRef = React.useRef({});
  const [events] = React.useState(() => createEventEmitter());
  const nested = useFloatingParentNodeId() != null;
  if (process.env.NODE_ENV !== "production") {
    const optionDomReference = elementsProp.reference;
    if (optionDomReference && !isElement(optionDomReference)) {
      error("Cannot pass a virtual element to the `elements.reference` option,", "as it must be a real DOM element. Use `refs.setPositionReference()`", "instead.");
    }
  }
  const [positionReference, setPositionReference] = React.useState(elementsProp.reference);
  const onOpenChange = useEffectEvent((open2, event, reason) => {
    dataRef.current.openEvent = open2 ? event : void 0;
    events.emit("openchange", {
      open: open2,
      event,
      reason,
      nested
    });
    onOpenChangeProp == null || onOpenChangeProp(open2, event, reason);
  });
  const refs = React.useMemo(() => ({
    setPositionReference
  }), []);
  const elements = React.useMemo(() => ({
    reference: positionReference || elementsProp.reference || null,
    floating: elementsProp.floating || null,
    domReference: elementsProp.reference
  }), [positionReference, elementsProp.reference, elementsProp.floating]);
  return React.useMemo(() => ({
    dataRef,
    open,
    onOpenChange,
    elements,
    events,
    floatingId,
    refs
  }), [open, onOpenChange, elements, events, floatingId, refs]);
}
function useFloating(options) {
  if (options === void 0) {
    options = {};
  }
  const {
    nodeId
  } = options;
  const internalRootContext = useFloatingRootContext({
    ...options,
    elements: {
      reference: null,
      floating: null,
      ...options.elements
    }
  });
  const rootContext = options.rootContext || internalRootContext;
  const computedElements = rootContext.elements;
  const [_domReference, setDomReference] = React.useState(null);
  const [positionReference, _setPositionReference] = React.useState(null);
  const optionDomReference = computedElements == null ? void 0 : computedElements.domReference;
  const domReference = optionDomReference || _domReference;
  const domReferenceRef = React.useRef(null);
  const tree = useFloatingTree();
  index$1(() => {
    if (domReference) {
      domReferenceRef.current = domReference;
    }
  }, [domReference]);
  const position = useFloating$1({
    ...options,
    elements: {
      ...computedElements,
      ...positionReference && {
        reference: positionReference
      }
    }
  });
  const setPositionReference = React.useCallback((node) => {
    const computedPositionReference = isElement(node) ? {
      getBoundingClientRect: () => node.getBoundingClientRect(),
      getClientRects: () => node.getClientRects(),
      contextElement: node
    } : node;
    _setPositionReference(computedPositionReference);
    position.refs.setReference(computedPositionReference);
  }, [position.refs]);
  const setReference = React.useCallback((node) => {
    if (isElement(node) || node === null) {
      domReferenceRef.current = node;
      setDomReference(node);
    }
    if (isElement(position.refs.reference.current) || position.refs.reference.current === null || // Don't allow setting virtual elements using the old technique back to
    // `null` to support `positionReference` + an unstable `reference`
    // callback ref.
    node !== null && !isElement(node)) {
      position.refs.setReference(node);
    }
  }, [position.refs]);
  const refs = React.useMemo(() => ({
    ...position.refs,
    setReference,
    setPositionReference,
    domReference: domReferenceRef
  }), [position.refs, setReference, setPositionReference]);
  const elements = React.useMemo(() => ({
    ...position.elements,
    domReference
  }), [position.elements, domReference]);
  const context = React.useMemo(() => ({
    ...position,
    ...rootContext,
    refs,
    elements,
    nodeId
  }), [position, refs, elements, nodeId, rootContext]);
  index$1(() => {
    rootContext.dataRef.current.floatingContext = context;
    const node = tree == null ? void 0 : tree.nodesRef.current.find((node2) => node2.id === nodeId);
    if (node) {
      node.context = context;
    }
  });
  return React.useMemo(() => ({
    ...position,
    context,
    refs,
    elements
  }), [position, refs, elements, context]);
}
function GiPin(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 512 512" }, "child": [{ "tag": "path", "attr": { "d": "M326.953 22.87L306.68 83.685l20.273 20.273-115.428 115.427c-16.39-8-34.277-14.452-51.84-18.502-14.247-3.285-28.136-4.902-40.802-4.772-16.84.173-31.505 3.44-41.975 9.973l229.006 229.006c11.447-18.345 12.853-49.592 5.2-82.776-4.05-17.564-10.502-35.45-18.5-51.84l115.427-115.43 20.274 20.274 60.817-20.273L326.954 22.87zM159.207 313.84L22.87 489.13l175.29-136.337-38.953-38.953z" }, "child": [] }] })(props);
}
const TooltipGlobalManagerContext = createContext(null);
const useTooltipGlobalManager = () => {
  const context = useContext(TooltipGlobalManagerContext);
  if (!context) {
    return {
      showAllTooltips: false,
      registerTooltip: () => {
      },
      unregisterTooltip: () => {
      }
    };
  }
  return context;
};
const TooltipGlobalManagerProvider = ({ children }) => {
  const [showAllTooltips] = useState(false);
  const [registeredTooltips] = useState(/* @__PURE__ */ new Map());
  const registerTooltip = useCallback(
    (id, showTooltip, hideTooltip) => {
      registeredTooltips.set(id, { show: showTooltip, hide: hideTooltip });
    },
    [registeredTooltips]
  );
  const unregisterTooltip = useCallback(
    (id) => {
      registeredTooltips.delete(id);
    },
    [registeredTooltips]
  );
  const value = {
    showAllTooltips,
    registerTooltip,
    unregisterTooltip
  };
  return /* @__PURE__ */ jsx(TooltipGlobalManagerContext.Provider, { value, children });
};
const Tooltip = ({
  title,
  content,
  children,
  placement = "top",
  offset: offsetValue = 8,
  disabled = false,
  className = "",
  contentClassName = "",
  delay = 250,
  closeDelay = 0,
  showArrow = true,
  portal = true,
  maxWidth = 300,
  clickableBounds = false,
  longPressDuration = 500,
  nonInteractive = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [globalRevealOpen, setGlobalRevealOpen] = useState(false);
  const [isActiveForKeyboard, setIsActiveForKeyboard] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const arrowRef = useRef(null);
  const tooltipId = useId$1();
  const hoverTimeoutRef = useRef(null);
  const longPressTimeoutRef = useRef(null);
  const touchStartTimeRef = useRef(0);
  const globalManager = useTooltipGlobalManager();
  const isVisible = isHovered || isPinned || globalRevealOpen || isFocused;
  const { refs, floatingStyles, context } = useFloating({
    open: isVisible,
    placement,
    middleware: [
      offset(offsetValue),
      flip({
        fallbackAxisSideDirection: "start",
        padding: 8
      }),
      shift({ padding: 8 }),
      ...showArrow ? [
        arrow({
          element: arrowRef
        })
      ] : []
    ],
    whileElementsMounted: autoUpdate
  });
  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    if (typeof document !== "undefined") {
      document.dispatchEvent(
        new CustomEvent("tooltip-keyboard-clear", {
          detail: { excludeId: tooltipId }
        })
      );
    }
    setIsActiveForKeyboard(true);
    if (!isHovered) {
      hoverTimeoutRef.current = setTimeout(() => {
        setIsHovered(true);
      }, delay);
    }
  };
  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsActiveForKeyboard(false);
    if (!isPinned) {
      hoverTimeoutRef.current = setTimeout(() => {
        setIsHovered(false);
      }, closeDelay);
    }
  };
  const handleClick = (e) => {
    if (nonInteractive) {
      return;
    }
    e.stopPropagation();
    const now = Date.now();
    const touchDuration = now - touchStartTimeRef.current;
    if (touchDuration > longPressDuration) {
      return;
    }
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.blur();
    }
  };
  const handleMouseDown = (e) => {
    if (nonInteractive) {
      return;
    }
    e.preventDefault();
  };
  const handleTouchStart = () => {
    if (nonInteractive) {
      return;
    }
    touchStartTimeRef.current = Date.now();
    if (longPressTimeoutRef.current) {
      clearTimeout(longPressTimeoutRef.current);
    }
    longPressTimeoutRef.current = setTimeout(() => {
      if (isPinned) {
        setIsPinned(false);
      } else {
        setIsPinned(true);
      }
    }, longPressDuration);
  };
  const handleTouchEnd = () => {
    if (longPressTimeoutRef.current) {
      clearTimeout(longPressTimeoutRef.current);
      longPressTimeoutRef.current = null;
    }
  };
  const handleFocus = () => {
    if (nonInteractive) {
      return;
    }
    setIsFocused(true);
  };
  const handleBlur = (e) => {
    if (nonInteractive) {
      return;
    }
    const currentTarget = e.currentTarget;
    const relatedTarget = e.relatedTarget;
    if (!currentTarget.contains(relatedTarget)) {
      setIsFocused(false);
    }
  };
  useEffect(() => {
    const showTooltip = () => {
      if (!isVisible && !isPinned) {
        setGlobalRevealOpen(true);
      }
    };
    const hideTooltip = () => {
      if (globalRevealOpen && !isPinned) {
        setGlobalRevealOpen(false);
      }
    };
    globalManager.registerTooltip(tooltipId, showTooltip, hideTooltip);
    return () => {
      globalManager.unregisterTooltip(tooltipId);
    };
  }, [tooltipId, globalManager, isVisible, isPinned, globalRevealOpen]);
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "t" || event.key === "T") {
        if (isVisible && isActiveForKeyboard) {
          event.preventDefault();
          setIsPinned((current) => !current);
        }
      }
    };
    if (isVisible && isActiveForKeyboard && typeof document !== "undefined") {
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isVisible, isActiveForKeyboard]);
  useEffect(() => {
    const handleKeyboardClear = (event) => {
      var _a2;
      if (((_a2 = event.detail) == null ? void 0 : _a2.excludeId) !== tooltipId) {
        setIsActiveForKeyboard(false);
      }
    };
    if (typeof document !== "undefined") {
      document.addEventListener(
        "tooltip-keyboard-clear",
        handleKeyboardClear
      );
      return () => {
        document.removeEventListener(
          "tooltip-keyboard-clear",
          handleKeyboardClear
        );
      };
    }
  }, [tooltipId]);
  useEffect(() => {
    if (!isVisible) {
      setIsActiveForKeyboard(false);
    }
  }, [isVisible]);
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsPinned(false);
        setIsHovered(false);
      }
    };
    const handleClickOutside = (event) => {
      if (refs.reference.current && refs.floating.current && "contains" in refs.reference.current && !refs.reference.current.contains(event.target) && !refs.floating.current.contains(event.target)) {
        setIsPinned(false);
        setIsHovered(false);
      }
    };
    if (isPinned && typeof document !== "undefined") {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isPinned, refs.reference, refs.floating]);
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      if (longPressTimeoutRef.current) {
        clearTimeout(longPressTimeoutRef.current);
      }
    };
  }, []);
  const getArrowStyles = useCallback(() => {
    const arrowData = context.middlewareData.arrow;
    const placement2 = context.placement;
    if (!arrowData) {
      return { display: "none" };
    }
    const { x, y } = arrowData;
    const staticSide = {
      top: "bottom",
      right: "left",
      bottom: "top",
      left: "right"
    }[placement2.split("-")[0]];
    return {
      position: "absolute",
      left: x != null ? `${x}px` : "",
      top: y != null ? `${y}px` : "",
      [staticSide]: "-4px",
      width: "8px",
      height: "8px",
      backgroundColor: "#ffffff",
      border: "1px solid #e8e8e8",
      transform: "rotate(45deg)",
      zIndex: -1
    };
  }, [context.middlewareData.arrow, context.placement]);
  const renderTooltip = () => {
    if (!isVisible || disabled || !title) {
      return null;
    }
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref: refs.setFloating,
        className: `tooltip-content ${contentClassName}`.trim(),
        style: {
          ...floatingStyles,
          backgroundColor: "#ffffff",
          border: "1px solid #e8e8e8",
          borderRadius: "6px",
          padding: "8px 12px",
          fontSize: "14px",
          lineHeight: "1.4",
          color: "#333333",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          zIndex: 999999,
          maxWidth: `${maxWidth}px`,
          width: "fit-content",
          display: "inline-block",
          wordWrap: "break-word",
          overflowWrap: "break-word",
          whiteSpace: "normal",
          position: "relative",
          cursor: clickableBounds ? "pointer" : "default"
        },
        "data-placement": context.placement,
        onMouseEnter: clickableBounds ? handleMouseEnter : void 0,
        onMouseLeave: clickableBounds ? handleMouseLeave : void 0,
        onClick: clickableBounds ? handleClick : (e) => e.stopPropagation(),
        onFocus: clickableBounds ? handleFocus : void 0,
        onBlur: clickableBounds ? handleBlur : void 0,
        tabIndex: clickableBounds ? 0 : void 0,
        children: [
          /* @__PURE__ */ jsxs(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "flex-start",
                gap: "8px"
              },
              children: [
                /* @__PURE__ */ jsx("div", { style: { flex: 1 }, children: /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("strong", { children: title }),
                  content && /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx("br", {}),
                    content
                  ] })
                ] }) }),
                /* @__PURE__ */ jsx(
                  GiPin,
                  {
                    size: 14,
                    style: {
                      color: isPinned ? "#3b82f6" : "#cbd5e1",
                      flexShrink: 0,
                      marginTop: "1px",
                      opacity: isPinned ? 1 : 0.5
                    }
                  }
                )
              ]
            }
          ),
          showArrow && /* @__PURE__ */ jsx("div", { ref: arrowRef, style: getArrowStyles() })
        ]
      }
    );
  };
  if (disabled) {
    return /* @__PURE__ */ jsx(Fragment, { children });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        ref: refs.setReference,
        className: `tooltip-trigger ${className}`.trim(),
        style: {
          display: "inline-block",
          cursor: nonInteractive ? "default" : "help"
        },
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onMouseDown: nonInteractive ? void 0 : handleMouseDown,
        onClick: nonInteractive ? void 0 : handleClick,
        onTouchStart: nonInteractive ? void 0 : handleTouchStart,
        onTouchEnd: nonInteractive ? void 0 : handleTouchEnd,
        onFocus: nonInteractive ? void 0 : handleFocus,
        onBlur: nonInteractive ? void 0 : handleBlur,
        role: nonInteractive ? void 0 : "button",
        tabIndex: nonInteractive ? void 0 : 0,
        "aria-describedby": isVisible ? tooltipId : void 0,
        children
      }
    ),
    portal && typeof document !== "undefined" ? /* @__PURE__ */ jsx(FloatingPortal, { root: document.body, children: renderTooltip() }) : renderTooltip()
  ] });
};
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  className = "",
  size = "md",
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true
}) => {
  const handleOverlayClick = useCallback(
    (e) => {
      if (closeOnOverlayClick && e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose, closeOnOverlayClick]
  );
  const handleKeyDown = useCallback(
    (e) => {
      if (closeOnEscape && e.key === "Escape") {
        onClose();
      }
    },
    [onClose, closeOnEscape]
  );
  useEffect(() => {
    if (isOpen && closeOnEscape) {
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, handleKeyDown, closeOnEscape]);
  if (!isOpen) return null;
  const modalClasses = ["modal", `modal-${size}`, className].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsx("div", { className: "modal-overlay", onClick: handleOverlayClick, children: /* @__PURE__ */ jsxs("div", { className: modalClasses, children: [
    /* @__PURE__ */ jsxs("div", { className: "modal-header", children: [
      /* @__PURE__ */ jsx("h3", { className: "modal-title", children: title }),
      showCloseButton && /* @__PURE__ */ jsx(
        Button,
        {
          variant: "ghost",
          size: "xs",
          className: "modal-close",
          onClick: onClose,
          "aria-label": `Close ${title.toLowerCase()}`,
          children: /* @__PURE__ */ jsx(FaTimes, {})
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "modal-content", children }),
    footer && /* @__PURE__ */ jsx("div", { className: "modal-footer", children: footer })
  ] }) });
};
const KeyboardModal = ({
  isOpen,
  onClose,
  examplesHidden
}) => {
  return /* @__PURE__ */ jsx(
    Modal,
    {
      isOpen,
      onClose,
      title: "Keyboard shortcuts",
      size: "lg",
      children: /* @__PURE__ */ jsxs("div", { className: "keyboard-shortcuts-grid", children: [
        /* @__PURE__ */ jsxs("div", { className: "keyboard-section", children: [
          /* @__PURE__ */ jsx("h4", { className: "keyboard-section-title", children: "Navigation" }),
          /* @__PURE__ */ jsxs("div", { className: "keyboard-shortcuts", children: [
            /* @__PURE__ */ jsxs("div", { className: "keyboard-shortcut", children: [
              /* @__PURE__ */ jsx("div", { className: "keyboard-keys", children: /* @__PURE__ */ jsx("kbd", { children: "J" }) }),
              /* @__PURE__ */ jsx("div", { className: "keyboard-description", children: "Next property" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "keyboard-shortcut", children: [
              /* @__PURE__ */ jsx("div", { className: "keyboard-keys", children: /* @__PURE__ */ jsx("kbd", { children: "K" }) }),
              /* @__PURE__ */ jsx("div", { className: "keyboard-description", children: "Previous property" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "keyboard-shortcut", children: [
              /* @__PURE__ */ jsx("div", { className: "keyboard-keys", children: /* @__PURE__ */ jsx("kbd", { children: "H" }) }),
              /* @__PURE__ */ jsx("div", { className: "keyboard-description", children: "Collapse property" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "keyboard-shortcut", children: [
              /* @__PURE__ */ jsx("div", { className: "keyboard-keys", children: /* @__PURE__ */ jsx("kbd", { children: "L" }) }),
              /* @__PURE__ */ jsx("div", { className: "keyboard-description", children: "Expand property" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "keyboard-section", children: [
          /* @__PURE__ */ jsx("h4", { className: "keyboard-section-title", children: "Search" }),
          /* @__PURE__ */ jsxs("div", { className: "keyboard-shortcuts", children: [
            /* @__PURE__ */ jsxs("div", { className: "keyboard-shortcut", children: [
              /* @__PURE__ */ jsx("div", { className: "keyboard-keys", children: /* @__PURE__ */ jsx("kbd", { children: "S" }) }),
              /* @__PURE__ */ jsx("div", { className: "keyboard-description", children: "Focus search box" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "keyboard-shortcut", children: [
              /* @__PURE__ */ jsx("div", { className: "keyboard-keys", children: /* @__PURE__ */ jsx("kbd", { children: "Esc" }) }),
              /* @__PURE__ */ jsx("div", { className: "keyboard-description", children: "Clear search" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "keyboard-section", children: [
          /* @__PURE__ */ jsx("h4", { className: "keyboard-section-title", children: "Expand & collapse" }),
          /* @__PURE__ */ jsxs("div", { className: "keyboard-shortcuts", children: [
            /* @__PURE__ */ jsxs("div", { className: "keyboard-shortcut", children: [
              /* @__PURE__ */ jsxs("div", { className: "keyboard-keys", children: [
                /* @__PURE__ */ jsx("kbd", { children: "⌘" }),
                " ",
                /* @__PURE__ */ jsx("kbd", { children: "E" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "keyboard-description", children: "Expand all properties" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "keyboard-shortcut", children: [
              /* @__PURE__ */ jsxs("div", { className: "keyboard-keys", children: [
                /* @__PURE__ */ jsx("kbd", { children: "⌘" }),
                " ",
                /* @__PURE__ */ jsx("kbd", { children: "Shift" }),
                " ",
                /* @__PURE__ */ jsx("kbd", { children: "E" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "keyboard-description", children: "Collapse all properties" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "keyboard-section", children: [
          /* @__PURE__ */ jsx("h4", { className: "keyboard-section-title", children: "Display" }),
          /* @__PURE__ */ jsx("div", { className: "keyboard-shortcuts", children: /* @__PURE__ */ jsxs("div", { className: "keyboard-shortcut", children: [
            /* @__PURE__ */ jsx("div", { className: "keyboard-keys", children: /* @__PURE__ */ jsx("kbd", { children: "E" }) }),
            /* @__PURE__ */ jsx("div", { className: "keyboard-description", children: examplesHidden ? "Show examples" : "Hide examples" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "keyboard-section", children: [
          /* @__PURE__ */ jsx("h4", { className: "keyboard-section-title", children: "Tooltips" }),
          /* @__PURE__ */ jsxs("div", { className: "keyboard-shortcuts", children: [
            /* @__PURE__ */ jsxs("div", { className: "keyboard-shortcut", children: [
              /* @__PURE__ */ jsx("div", { className: "keyboard-keys", children: /* @__PURE__ */ jsx("kbd", { children: "Ctrl" }) }),
              /* @__PURE__ */ jsx("div", { className: "keyboard-description", children: "Show all tooltips" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "keyboard-shortcut", children: [
              /* @__PURE__ */ jsx("div", { className: "keyboard-keys", children: /* @__PURE__ */ jsx("kbd", { children: "T" }) }),
              /* @__PURE__ */ jsx("div", { className: "keyboard-description", children: "Pin/unpin tooltip" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "keyboard-shortcut", children: [
              /* @__PURE__ */ jsx("div", { className: "keyboard-keys", children: /* @__PURE__ */ jsx("kbd", { children: "Esc" }) }),
              /* @__PURE__ */ jsx("div", { className: "keyboard-description", children: "Close tooltips" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "keyboard-section", children: [
          /* @__PURE__ */ jsx("h4", { className: "keyboard-section-title", children: "Help" }),
          /* @__PURE__ */ jsx("div", { className: "keyboard-shortcuts", children: /* @__PURE__ */ jsxs("div", { className: "keyboard-shortcut", children: [
            /* @__PURE__ */ jsxs("div", { className: "keyboard-keys", children: [
              /* @__PURE__ */ jsx("kbd", { children: "Shift" }),
              " ",
              /* @__PURE__ */ jsx("kbd", { children: "?" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "keyboard-description", children: "Show keyboard shortcuts" })
          ] }) })
        ] })
      ] })
    }
  );
};
function resolveReference(ref, rootSchema) {
  if (!ref.startsWith("#/")) {
    return null;
  }
  const path = ref.substring(2).split("/");
  let current = rootSchema;
  for (const segment of path) {
    if (!current || typeof current !== "object") {
      return null;
    }
    current = current[segment];
  }
  return current || null;
}
function resolveSchema(schema2, rootSchema) {
  if (schema2.$ref) {
    const resolved = resolveReference(schema2.$ref, rootSchema);
    if (resolved) {
      const { $ref: _$ref, ...rest } = schema2;
      const result = {
        ...resolved,
        ...rest,
        description: schema2.description || resolved.description,
        // Preserve original $ref for enum ID extraction
        __originalRef: schema2.$ref
      };
      if (result.allOf) {
        return resolveSchema(result, rootSchema);
      }
      return result;
    }
  }
  if (schema2.allOf) {
    const merged = { ...schema2 };
    delete merged.allOf;
    schema2.allOf.forEach((subSchema) => {
      const resolvedSubSchema = resolveSchema(subSchema, rootSchema);
      if (resolvedSubSchema.properties) {
        merged.properties = {
          ...merged.properties,
          ...resolvedSubSchema.properties
        };
      }
      if (resolvedSubSchema.patternProperties) {
        merged.patternProperties = {
          ...merged.patternProperties,
          ...resolvedSubSchema.patternProperties
        };
      }
      if (resolvedSubSchema.required) {
        merged.required = [
          ...merged.required || [],
          ...resolvedSubSchema.required
        ];
      }
      Object.keys(resolvedSubSchema).forEach((key2) => {
        if (key2 !== "properties" && key2 !== "patternProperties" && key2 !== "required") {
          if (merged[key2] === void 0) {
            merged[key2] = resolvedSubSchema[key2];
          }
        }
      });
    });
    return merged;
  }
  return schema2;
}
function extractProperties(schema2, path, depth, rootSchema, recursionStack = []) {
  const properties = [];
  const currentPathKey = path.join(".");
  if (recursionStack.includes(currentPathKey)) {
    return properties;
  }
  if (depth > 10) {
    return properties;
  }
  const newRecursionStack = [...recursionStack, currentPathKey];
  const resolvedSchema = resolveSchema(schema2, rootSchema);
  const _required = new Set(resolvedSchema.required || []);
  if (resolvedSchema.properties) {
    Object.entries(resolvedSchema.properties).forEach(([name, propSchema]) => {
      const currentPath = [...path, name];
      const resolvedPropSchema = resolveSchema(propSchema, rootSchema);
      properties.push({
        name,
        schema: resolvedPropSchema,
        required: _required.has(name),
        path: currentPath,
        depth
      });
    });
  }
  if (resolvedSchema.patternProperties && !resolvedSchema.oneOf && !resolvedSchema.anyOf) {
    Object.entries(resolvedSchema.patternProperties).forEach(
      ([pattern, propSchema], index2) => {
        const patternKey = `(pattern-${index2})`;
        const currentPath = [...path, patternKey];
        const patternPathKey = currentPath.join(".");
        if (newRecursionStack.includes(patternPathKey)) {
          return;
        }
        const resolvedPropSchema = resolveSchema(propSchema, rootSchema);
        const syntheticSchema = {
          ...resolvedPropSchema,
          // Keep original description without pattern info
          description: resolvedPropSchema.description,
          // Add a custom property to identify this as a pattern property
          __isPatternProperty: true,
          __pattern: pattern
        };
        properties.push({
          name: `{pattern}`,
          schema: syntheticSchema,
          required: false,
          // Pattern properties are never required individually
          path: currentPath,
          depth
        });
      }
    );
  }
  return properties;
}
function hasExamples(schema2) {
  return !!(schema2.examples && schema2.examples.length > 0);
}
function getSchemaType(schema2, _rootSchema) {
  if (schema2.type) {
    if (Array.isArray(schema2.type)) {
      return schema2.type.join(" | ");
    }
    return schema2.type;
  }
  if (schema2.oneOf) {
    return "oneOf";
  }
  if (schema2.anyOf) {
    return "anyOf";
  }
  if (schema2.allOf) {
    return "object";
  }
  return getSchemaTypeForResolved(schema2);
}
function getSchemaTypeForResolved(schema2) {
  if (schema2.type) {
    if (Array.isArray(schema2.type)) {
      return schema2.type.join(" | ");
    }
    return schema2.type;
  }
  if (schema2.properties) return "object";
  if (schema2.items) return "array";
  if (schema2.enum) return "enum";
  return "";
}
function getConstraints(schema2) {
  const constraints = [];
  if (schema2.format) {
    constraints.push({ type: "format", label: "format", value: schema2.format });
  }
  if (schema2.pattern) {
    constraints.push({
      type: "pattern",
      label: "pattern",
      value: schema2.pattern
    });
  }
  if (schema2.minimum !== void 0) {
    constraints.push({ type: "range", label: "min", value: schema2.minimum });
  }
  if (schema2.maximum !== void 0) {
    constraints.push({ type: "range", label: "max", value: schema2.maximum });
  }
  if (schema2.minLength !== void 0) {
    constraints.push({
      type: "length",
      label: "minLength",
      value: schema2.minLength
    });
  }
  if (schema2.maxLength !== void 0) {
    constraints.push({
      type: "length",
      label: "maxLength",
      value: schema2.maxLength
    });
  }
  if (schema2.minItems !== void 0) {
    constraints.push({
      type: "items",
      label: "minItems",
      value: schema2.minItems
    });
  }
  if (schema2.maxItems !== void 0) {
    constraints.push({
      type: "items",
      label: "maxItems",
      value: schema2.maxItems
    });
  }
  if (schema2.multipleOf !== void 0) {
    constraints.push({
      type: "multipleOf",
      label: "multipleOf",
      value: schema2.multipleOf
    });
  }
  return constraints;
}
function getUnsupportedFeatures(schema2) {
  const unsupported = [];
  if (schema2.not) {
    unsupported.push("not");
  }
  if (schema2.if || schema2.then || schema2.else) {
    unsupported.push("conditional schemas (if/then/else)");
  }
  if (schema2.contains) {
    unsupported.push("contains");
  }
  if (schema2.propertyNames) {
    unsupported.push("propertyNames");
  }
  if (schema2.anyOf) {
    unsupported.push("anyOf");
  }
  if (schema2.additionalProperties && typeof schema2.additionalProperties === "object") {
    unsupported.push("complex additionalProperties");
  }
  if (schema2.additionalItems && typeof schema2.additionalItems === "object") {
    unsupported.push("complex additionalItems");
  }
  if (schema2.contentMediaType) {
    unsupported.push("contentMediaType");
  }
  if (schema2.contentEncoding) {
    unsupported.push("contentEncoding");
  }
  if (schema2.unevaluatedProperties !== void 0) {
    unsupported.push("unevaluatedProperties");
  }
  if (schema2.unevaluatedItems !== void 0) {
    unsupported.push("unevaluatedItems");
  }
  return unsupported;
}
function searchInSchema$1(schema2, rootSchema, query, searchIncludesExamples = false, propertyName, visited = /* @__PURE__ */ new Set(), depth = 0) {
  var _a2, _b2;
  if (depth > 10 || visited.has(schema2)) {
    return false;
  }
  visited.add(schema2);
  const queryLower = query.toLowerCase();
  if (propertyName && propertyName.toLowerCase().includes(queryLower)) {
    return true;
  }
  if ((_a2 = schema2.description) == null ? void 0 : _a2.toLowerCase().includes(queryLower)) {
    return true;
  }
  if (getSchemaType(schema2).toLowerCase().includes(queryLower)) {
    return true;
  }
  if (searchIncludesExamples && ((_b2 = schema2.examples) == null ? void 0 : _b2.some((example) => {
    const exampleText = typeof example === "string" ? example : JSON.stringify(example);
    return exampleText.toLowerCase().includes(queryLower);
  }))) {
    return true;
  }
  const resolved = resolveSchema(schema2, rootSchema);
  if (resolved.properties) {
    for (const [propName, propSchema] of Object.entries(resolved.properties)) {
      if (searchInSchema$1(
        propSchema,
        rootSchema,
        query,
        searchIncludesExamples,
        propName,
        visited,
        depth + 1
      )) {
        return true;
      }
    }
  }
  if (resolved.patternProperties) {
    for (const [_pattern, propSchema] of Object.entries(
      resolved.patternProperties
    )) {
      if (searchInSchema$1(
        propSchema,
        rootSchema,
        query,
        searchIncludesExamples,
        void 0,
        visited,
        depth + 1
      )) {
        return true;
      }
    }
  }
  if (resolved.oneOf) {
    for (const subSchema of resolved.oneOf) {
      if (searchInSchema$1(
        subSchema,
        rootSchema,
        query,
        searchIncludesExamples,
        void 0,
        visited,
        depth + 1
      )) {
        return true;
      }
    }
  }
  if (resolved.allOf) {
    for (const subSchema of resolved.allOf) {
      if (searchInSchema$1(
        subSchema,
        rootSchema,
        query,
        searchIncludesExamples,
        void 0,
        visited,
        depth + 1
      )) {
        return true;
      }
    }
  }
  if (resolved.anyOf) {
    for (const subSchema of resolved.anyOf) {
      if (searchInSchema$1(
        subSchema,
        rootSchema,
        query,
        searchIncludesExamples,
        void 0,
        visited,
        depth + 1
      )) {
        return true;
      }
    }
  }
  return false;
}
function hashToPropertyKey(hash) {
  if (!hash) return "";
  const cleanHash = hash.startsWith("#") ? hash.substring(1) : hash;
  return cleanHash.replace(/-(?![^(]*\))/g, ".");
}
function propertyKeyToHash(propertyKey) {
  if (!propertyKey) return "";
  return propertyKey.replace(/\.(?![^(]*\))/g, "-");
}
function useSystemTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") {
      return "light";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      setTheme(e.matches ? "dark" : "light");
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);
  return theme;
}
let ShikiError$2 = class ShikiError extends Error {
  constructor(message) {
    super(message);
    this.name = "ShikiError";
  }
};
function clone(something) {
  return doClone(something);
}
function doClone(something) {
  if (Array.isArray(something)) {
    return cloneArray(something);
  }
  if (something instanceof RegExp) {
    return something;
  }
  if (typeof something === "object") {
    return cloneObj(something);
  }
  return something;
}
function cloneArray(arr) {
  let r = [];
  for (let i = 0, len = arr.length; i < len; i++) {
    r[i] = doClone(arr[i]);
  }
  return r;
}
function cloneObj(obj) {
  let r = {};
  for (let key2 in obj) {
    r[key2] = doClone(obj[key2]);
  }
  return r;
}
function mergeObjects(target, ...sources) {
  sources.forEach((source) => {
    for (let key2 in source) {
      target[key2] = source[key2];
    }
  });
  return target;
}
function basename(path) {
  const idx = ~path.lastIndexOf("/") || ~path.lastIndexOf("\\");
  if (idx === 0) {
    return path;
  } else if (~idx === path.length - 1) {
    return basename(path.substring(0, path.length - 1));
  } else {
    return path.substr(~idx + 1);
  }
}
var CAPTURING_REGEX_SOURCE = /\$(\d+)|\${(\d+):\/(downcase|upcase)}/g;
var RegexSource = class {
  static hasCaptures(regexSource) {
    if (regexSource === null) {
      return false;
    }
    CAPTURING_REGEX_SOURCE.lastIndex = 0;
    return CAPTURING_REGEX_SOURCE.test(regexSource);
  }
  static replaceCaptures(regexSource, captureSource, captureIndices) {
    return regexSource.replace(CAPTURING_REGEX_SOURCE, (match, index2, commandIndex, command) => {
      let capture = captureIndices[parseInt(index2 || commandIndex, 10)];
      if (capture) {
        let result = captureSource.substring(capture.start, capture.end);
        while (result[0] === ".") {
          result = result.substring(1);
        }
        switch (command) {
          case "downcase":
            return result.toLowerCase();
          case "upcase":
            return result.toUpperCase();
          default:
            return result;
        }
      } else {
        return match;
      }
    });
  }
};
function strcmp(a, b) {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}
function strArrCmp(a, b) {
  if (a === null && b === null) {
    return 0;
  }
  if (!a) {
    return -1;
  }
  if (!b) {
    return 1;
  }
  let len1 = a.length;
  let len2 = b.length;
  if (len1 === len2) {
    for (let i = 0; i < len1; i++) {
      let res = strcmp(a[i], b[i]);
      if (res !== 0) {
        return res;
      }
    }
    return 0;
  }
  return len1 - len2;
}
function isValidHexColor(hex) {
  if (/^#[0-9a-f]{6}$/i.test(hex)) {
    return true;
  }
  if (/^#[0-9a-f]{8}$/i.test(hex)) {
    return true;
  }
  if (/^#[0-9a-f]{3}$/i.test(hex)) {
    return true;
  }
  if (/^#[0-9a-f]{4}$/i.test(hex)) {
    return true;
  }
  return false;
}
function escapeRegExpCharacters(value) {
  return value.replace(/[\-\\\{\}\*\+\?\|\^\$\.\,\[\]\(\)\#\s]/g, "\\$&");
}
var CachedFn = class {
  constructor(fn) {
    __publicField(this, "cache", /* @__PURE__ */ new Map());
    this.fn = fn;
  }
  get(key2) {
    if (this.cache.has(key2)) {
      return this.cache.get(key2);
    }
    const value = this.fn(key2);
    this.cache.set(key2, value);
    return value;
  }
};
var Theme = class {
  constructor(_colorMap, _defaults, _root) {
    __publicField(this, "_cachedMatchRoot", new CachedFn(
      (scopeName) => this._root.match(scopeName)
    ));
    this._colorMap = _colorMap;
    this._defaults = _defaults;
    this._root = _root;
  }
  static createFromRawTheme(source, colorMap) {
    return this.createFromParsedTheme(parseTheme(source), colorMap);
  }
  static createFromParsedTheme(source, colorMap) {
    return resolveParsedThemeRules(source, colorMap);
  }
  getColorMap() {
    return this._colorMap.getColorMap();
  }
  getDefaults() {
    return this._defaults;
  }
  match(scopePath) {
    if (scopePath === null) {
      return this._defaults;
    }
    const scopeName = scopePath.scopeName;
    const matchingTrieElements = this._cachedMatchRoot.get(scopeName);
    const effectiveRule = matchingTrieElements.find(
      (v) => _scopePathMatchesParentScopes(scopePath.parent, v.parentScopes)
    );
    if (!effectiveRule) {
      return null;
    }
    return new StyleAttributes(
      effectiveRule.fontStyle,
      effectiveRule.foreground,
      effectiveRule.background
    );
  }
};
var ScopeStack = class _ScopeStack {
  constructor(parent, scopeName) {
    this.parent = parent;
    this.scopeName = scopeName;
  }
  static push(path, scopeNames) {
    for (const name of scopeNames) {
      path = new _ScopeStack(path, name);
    }
    return path;
  }
  static from(...segments) {
    let result = null;
    for (let i = 0; i < segments.length; i++) {
      result = new _ScopeStack(result, segments[i]);
    }
    return result;
  }
  push(scopeName) {
    return new _ScopeStack(this, scopeName);
  }
  getSegments() {
    let item = this;
    const result = [];
    while (item) {
      result.push(item.scopeName);
      item = item.parent;
    }
    result.reverse();
    return result;
  }
  toString() {
    return this.getSegments().join(" ");
  }
  extends(other) {
    if (this === other) {
      return true;
    }
    if (this.parent === null) {
      return false;
    }
    return this.parent.extends(other);
  }
  getExtensionIfDefined(base) {
    const result = [];
    let item = this;
    while (item && item !== base) {
      result.push(item.scopeName);
      item = item.parent;
    }
    return item === base ? result.reverse() : void 0;
  }
};
function _scopePathMatchesParentScopes(scopePath, parentScopes) {
  if (parentScopes.length === 0) {
    return true;
  }
  for (let index2 = 0; index2 < parentScopes.length; index2++) {
    let scopePattern = parentScopes[index2];
    let scopeMustMatch = false;
    if (scopePattern === ">") {
      if (index2 === parentScopes.length - 1) {
        return false;
      }
      scopePattern = parentScopes[++index2];
      scopeMustMatch = true;
    }
    while (scopePath) {
      if (_matchesScope(scopePath.scopeName, scopePattern)) {
        break;
      }
      if (scopeMustMatch) {
        return false;
      }
      scopePath = scopePath.parent;
    }
    if (!scopePath) {
      return false;
    }
    scopePath = scopePath.parent;
  }
  return true;
}
function _matchesScope(scopeName, scopePattern) {
  return scopePattern === scopeName || scopeName.startsWith(scopePattern) && scopeName[scopePattern.length] === ".";
}
var StyleAttributes = class {
  constructor(fontStyle, foregroundId, backgroundId) {
    this.fontStyle = fontStyle;
    this.foregroundId = foregroundId;
    this.backgroundId = backgroundId;
  }
};
function parseTheme(source) {
  if (!source) {
    return [];
  }
  if (!source.settings || !Array.isArray(source.settings)) {
    return [];
  }
  let settings = source.settings;
  let result = [], resultLen = 0;
  for (let i = 0, len = settings.length; i < len; i++) {
    let entry = settings[i];
    if (!entry.settings) {
      continue;
    }
    let scopes;
    if (typeof entry.scope === "string") {
      let _scope = entry.scope;
      _scope = _scope.replace(/^[,]+/, "");
      _scope = _scope.replace(/[,]+$/, "");
      scopes = _scope.split(",");
    } else if (Array.isArray(entry.scope)) {
      scopes = entry.scope;
    } else {
      scopes = [""];
    }
    let fontStyle = -1;
    if (typeof entry.settings.fontStyle === "string") {
      fontStyle = 0;
      let segments = entry.settings.fontStyle.split(" ");
      for (let j = 0, lenJ = segments.length; j < lenJ; j++) {
        let segment = segments[j];
        switch (segment) {
          case "italic":
            fontStyle = fontStyle | 1;
            break;
          case "bold":
            fontStyle = fontStyle | 2;
            break;
          case "underline":
            fontStyle = fontStyle | 4;
            break;
          case "strikethrough":
            fontStyle = fontStyle | 8;
            break;
        }
      }
    }
    let foreground = null;
    if (typeof entry.settings.foreground === "string" && isValidHexColor(entry.settings.foreground)) {
      foreground = entry.settings.foreground;
    }
    let background = null;
    if (typeof entry.settings.background === "string" && isValidHexColor(entry.settings.background)) {
      background = entry.settings.background;
    }
    for (let j = 0, lenJ = scopes.length; j < lenJ; j++) {
      let _scope = scopes[j].trim();
      let segments = _scope.split(" ");
      let scope = segments[segments.length - 1];
      let parentScopes = null;
      if (segments.length > 1) {
        parentScopes = segments.slice(0, segments.length - 1);
        parentScopes.reverse();
      }
      result[resultLen++] = new ParsedThemeRule(
        scope,
        parentScopes,
        i,
        fontStyle,
        foreground,
        background
      );
    }
  }
  return result;
}
var ParsedThemeRule = class {
  constructor(scope, parentScopes, index2, fontStyle, foreground, background) {
    this.scope = scope;
    this.parentScopes = parentScopes;
    this.index = index2;
    this.fontStyle = fontStyle;
    this.foreground = foreground;
    this.background = background;
  }
};
var FontStyle = /* @__PURE__ */ ((FontStyle2) => {
  FontStyle2[FontStyle2["NotSet"] = -1] = "NotSet";
  FontStyle2[FontStyle2["None"] = 0] = "None";
  FontStyle2[FontStyle2["Italic"] = 1] = "Italic";
  FontStyle2[FontStyle2["Bold"] = 2] = "Bold";
  FontStyle2[FontStyle2["Underline"] = 4] = "Underline";
  FontStyle2[FontStyle2["Strikethrough"] = 8] = "Strikethrough";
  return FontStyle2;
})(FontStyle || {});
function resolveParsedThemeRules(parsedThemeRules, _colorMap) {
  parsedThemeRules.sort((a, b) => {
    let r = strcmp(a.scope, b.scope);
    if (r !== 0) {
      return r;
    }
    r = strArrCmp(a.parentScopes, b.parentScopes);
    if (r !== 0) {
      return r;
    }
    return a.index - b.index;
  });
  let defaultFontStyle = 0;
  let defaultForeground = "#000000";
  let defaultBackground = "#ffffff";
  while (parsedThemeRules.length >= 1 && parsedThemeRules[0].scope === "") {
    let incomingDefaults = parsedThemeRules.shift();
    if (incomingDefaults.fontStyle !== -1) {
      defaultFontStyle = incomingDefaults.fontStyle;
    }
    if (incomingDefaults.foreground !== null) {
      defaultForeground = incomingDefaults.foreground;
    }
    if (incomingDefaults.background !== null) {
      defaultBackground = incomingDefaults.background;
    }
  }
  let colorMap = new ColorMap(_colorMap);
  let defaults = new StyleAttributes(defaultFontStyle, colorMap.getId(defaultForeground), colorMap.getId(defaultBackground));
  let root2 = new ThemeTrieElement(new ThemeTrieElementRule(0, null, -1, 0, 0), []);
  for (let i = 0, len = parsedThemeRules.length; i < len; i++) {
    let rule = parsedThemeRules[i];
    root2.insert(0, rule.scope, rule.parentScopes, rule.fontStyle, colorMap.getId(rule.foreground), colorMap.getId(rule.background));
  }
  return new Theme(colorMap, defaults, root2);
}
var ColorMap = class {
  constructor(_colorMap) {
    __publicField(this, "_isFrozen");
    __publicField(this, "_lastColorId");
    __publicField(this, "_id2color");
    __publicField(this, "_color2id");
    this._lastColorId = 0;
    this._id2color = [];
    this._color2id = /* @__PURE__ */ Object.create(null);
    if (Array.isArray(_colorMap)) {
      this._isFrozen = true;
      for (let i = 0, len = _colorMap.length; i < len; i++) {
        this._color2id[_colorMap[i]] = i;
        this._id2color[i] = _colorMap[i];
      }
    } else {
      this._isFrozen = false;
    }
  }
  getId(color) {
    if (color === null) {
      return 0;
    }
    color = color.toUpperCase();
    let value = this._color2id[color];
    if (value) {
      return value;
    }
    if (this._isFrozen) {
      throw new Error(`Missing color in color map - ${color}`);
    }
    value = ++this._lastColorId;
    this._color2id[color] = value;
    this._id2color[value] = color;
    return value;
  }
  getColorMap() {
    return this._id2color.slice(0);
  }
};
var emptyParentScopes = Object.freeze([]);
var ThemeTrieElementRule = class _ThemeTrieElementRule {
  constructor(scopeDepth, parentScopes, fontStyle, foreground, background) {
    __publicField(this, "scopeDepth");
    __publicField(this, "parentScopes");
    __publicField(this, "fontStyle");
    __publicField(this, "foreground");
    __publicField(this, "background");
    this.scopeDepth = scopeDepth;
    this.parentScopes = parentScopes || emptyParentScopes;
    this.fontStyle = fontStyle;
    this.foreground = foreground;
    this.background = background;
  }
  clone() {
    return new _ThemeTrieElementRule(this.scopeDepth, this.parentScopes, this.fontStyle, this.foreground, this.background);
  }
  static cloneArr(arr) {
    let r = [];
    for (let i = 0, len = arr.length; i < len; i++) {
      r[i] = arr[i].clone();
    }
    return r;
  }
  acceptOverwrite(scopeDepth, fontStyle, foreground, background) {
    if (this.scopeDepth > scopeDepth) {
      console.log("how did this happen?");
    } else {
      this.scopeDepth = scopeDepth;
    }
    if (fontStyle !== -1) {
      this.fontStyle = fontStyle;
    }
    if (foreground !== 0) {
      this.foreground = foreground;
    }
    if (background !== 0) {
      this.background = background;
    }
  }
};
var ThemeTrieElement = class _ThemeTrieElement {
  constructor(_mainRule, rulesWithParentScopes = [], _children = {}) {
    __publicField(this, "_rulesWithParentScopes");
    this._mainRule = _mainRule;
    this._children = _children;
    this._rulesWithParentScopes = rulesWithParentScopes;
  }
  static _cmpBySpecificity(a, b) {
    if (a.scopeDepth !== b.scopeDepth) {
      return b.scopeDepth - a.scopeDepth;
    }
    let aParentIndex = 0;
    let bParentIndex = 0;
    while (true) {
      if (a.parentScopes[aParentIndex] === ">") {
        aParentIndex++;
      }
      if (b.parentScopes[bParentIndex] === ">") {
        bParentIndex++;
      }
      if (aParentIndex >= a.parentScopes.length || bParentIndex >= b.parentScopes.length) {
        break;
      }
      const parentScopeLengthDiff = b.parentScopes[bParentIndex].length - a.parentScopes[aParentIndex].length;
      if (parentScopeLengthDiff !== 0) {
        return parentScopeLengthDiff;
      }
      aParentIndex++;
      bParentIndex++;
    }
    return b.parentScopes.length - a.parentScopes.length;
  }
  match(scope) {
    if (scope !== "") {
      let dotIndex = scope.indexOf(".");
      let head2;
      let tail;
      if (dotIndex === -1) {
        head2 = scope;
        tail = "";
      } else {
        head2 = scope.substring(0, dotIndex);
        tail = scope.substring(dotIndex + 1);
      }
      if (this._children.hasOwnProperty(head2)) {
        return this._children[head2].match(tail);
      }
    }
    const rules = this._rulesWithParentScopes.concat(this._mainRule);
    rules.sort(_ThemeTrieElement._cmpBySpecificity);
    return rules;
  }
  insert(scopeDepth, scope, parentScopes, fontStyle, foreground, background) {
    if (scope === "") {
      this._doInsertHere(scopeDepth, parentScopes, fontStyle, foreground, background);
      return;
    }
    let dotIndex = scope.indexOf(".");
    let head2;
    let tail;
    if (dotIndex === -1) {
      head2 = scope;
      tail = "";
    } else {
      head2 = scope.substring(0, dotIndex);
      tail = scope.substring(dotIndex + 1);
    }
    let child;
    if (this._children.hasOwnProperty(head2)) {
      child = this._children[head2];
    } else {
      child = new _ThemeTrieElement(this._mainRule.clone(), ThemeTrieElementRule.cloneArr(this._rulesWithParentScopes));
      this._children[head2] = child;
    }
    child.insert(scopeDepth + 1, tail, parentScopes, fontStyle, foreground, background);
  }
  _doInsertHere(scopeDepth, parentScopes, fontStyle, foreground, background) {
    if (parentScopes === null) {
      this._mainRule.acceptOverwrite(scopeDepth, fontStyle, foreground, background);
      return;
    }
    for (let i = 0, len = this._rulesWithParentScopes.length; i < len; i++) {
      let rule = this._rulesWithParentScopes[i];
      if (strArrCmp(rule.parentScopes, parentScopes) === 0) {
        rule.acceptOverwrite(scopeDepth, fontStyle, foreground, background);
        return;
      }
    }
    if (fontStyle === -1) {
      fontStyle = this._mainRule.fontStyle;
    }
    if (foreground === 0) {
      foreground = this._mainRule.foreground;
    }
    if (background === 0) {
      background = this._mainRule.background;
    }
    this._rulesWithParentScopes.push(new ThemeTrieElementRule(scopeDepth, parentScopes, fontStyle, foreground, background));
  }
};
var EncodedTokenMetadata = class _EncodedTokenMetadata {
  static toBinaryStr(encodedTokenAttributes) {
    return encodedTokenAttributes.toString(2).padStart(32, "0");
  }
  static print(encodedTokenAttributes) {
    const languageId = _EncodedTokenMetadata.getLanguageId(encodedTokenAttributes);
    const tokenType = _EncodedTokenMetadata.getTokenType(encodedTokenAttributes);
    const fontStyle = _EncodedTokenMetadata.getFontStyle(encodedTokenAttributes);
    const foreground = _EncodedTokenMetadata.getForeground(encodedTokenAttributes);
    const background = _EncodedTokenMetadata.getBackground(encodedTokenAttributes);
    console.log({
      languageId,
      tokenType,
      fontStyle,
      foreground,
      background
    });
  }
  static getLanguageId(encodedTokenAttributes) {
    return (encodedTokenAttributes & 255) >>> 0;
  }
  static getTokenType(encodedTokenAttributes) {
    return (encodedTokenAttributes & 768) >>> 8;
  }
  static containsBalancedBrackets(encodedTokenAttributes) {
    return (encodedTokenAttributes & 1024) !== 0;
  }
  static getFontStyle(encodedTokenAttributes) {
    return (encodedTokenAttributes & 30720) >>> 11;
  }
  static getForeground(encodedTokenAttributes) {
    return (encodedTokenAttributes & 16744448) >>> 15;
  }
  static getBackground(encodedTokenAttributes) {
    return (encodedTokenAttributes & 4278190080) >>> 24;
  }
  /**
   * Updates the fields in `metadata`.
   * A value of `0`, `NotSet` or `null` indicates that the corresponding field should be left as is.
   */
  static set(encodedTokenAttributes, languageId, tokenType, containsBalancedBrackets, fontStyle, foreground, background) {
    let _languageId = _EncodedTokenMetadata.getLanguageId(encodedTokenAttributes);
    let _tokenType = _EncodedTokenMetadata.getTokenType(encodedTokenAttributes);
    let _containsBalancedBracketsBit = _EncodedTokenMetadata.containsBalancedBrackets(encodedTokenAttributes) ? 1 : 0;
    let _fontStyle = _EncodedTokenMetadata.getFontStyle(encodedTokenAttributes);
    let _foreground = _EncodedTokenMetadata.getForeground(encodedTokenAttributes);
    let _background = _EncodedTokenMetadata.getBackground(encodedTokenAttributes);
    if (languageId !== 0) {
      _languageId = languageId;
    }
    if (tokenType !== 8) {
      _tokenType = fromOptionalTokenType(tokenType);
    }
    if (containsBalancedBrackets !== null) {
      _containsBalancedBracketsBit = containsBalancedBrackets ? 1 : 0;
    }
    if (fontStyle !== -1) {
      _fontStyle = fontStyle;
    }
    if (foreground !== 0) {
      _foreground = foreground;
    }
    if (background !== 0) {
      _background = background;
    }
    return (_languageId << 0 | _tokenType << 8 | _containsBalancedBracketsBit << 10 | _fontStyle << 11 | _foreground << 15 | _background << 24) >>> 0;
  }
};
function toOptionalTokenType(standardType) {
  return standardType;
}
function fromOptionalTokenType(standardType) {
  return standardType;
}
function createMatchers(selector, matchesName) {
  const results = [];
  const tokenizer = newTokenizer(selector);
  let token = tokenizer.next();
  while (token !== null) {
    let priority = 0;
    if (token.length === 2 && token.charAt(1) === ":") {
      switch (token.charAt(0)) {
        case "R":
          priority = 1;
          break;
        case "L":
          priority = -1;
          break;
        default:
          console.log(`Unknown priority ${token} in scope selector`);
      }
      token = tokenizer.next();
    }
    let matcher = parseConjunction();
    results.push({ matcher, priority });
    if (token !== ",") {
      break;
    }
    token = tokenizer.next();
  }
  return results;
  function parseOperand() {
    if (token === "-") {
      token = tokenizer.next();
      const expressionToNegate = parseOperand();
      return (matcherInput) => !!expressionToNegate && !expressionToNegate(matcherInput);
    }
    if (token === "(") {
      token = tokenizer.next();
      const expressionInParents = parseInnerExpression();
      if (token === ")") {
        token = tokenizer.next();
      }
      return expressionInParents;
    }
    if (isIdentifier(token)) {
      const identifiers = [];
      do {
        identifiers.push(token);
        token = tokenizer.next();
      } while (isIdentifier(token));
      return (matcherInput) => matchesName(identifiers, matcherInput);
    }
    return null;
  }
  function parseConjunction() {
    const matchers = [];
    let matcher = parseOperand();
    while (matcher) {
      matchers.push(matcher);
      matcher = parseOperand();
    }
    return (matcherInput) => matchers.every((matcher2) => matcher2(matcherInput));
  }
  function parseInnerExpression() {
    const matchers = [];
    let matcher = parseConjunction();
    while (matcher) {
      matchers.push(matcher);
      if (token === "|" || token === ",") {
        do {
          token = tokenizer.next();
        } while (token === "|" || token === ",");
      } else {
        break;
      }
      matcher = parseConjunction();
    }
    return (matcherInput) => matchers.some((matcher2) => matcher2(matcherInput));
  }
}
function isIdentifier(token) {
  return !!token && !!token.match(/[\w\.:]+/);
}
function newTokenizer(input) {
  let regex = /([LR]:|[\w\.:][\w\.:\-]*|[\,\|\-\(\)])/g;
  let match = regex.exec(input);
  return {
    next: () => {
      if (!match) {
        return null;
      }
      const res = match[0];
      match = regex.exec(input);
      return res;
    }
  };
}
function disposeOnigString(str2) {
  if (typeof str2.dispose === "function") {
    str2.dispose();
  }
}
var TopLevelRuleReference = class {
  constructor(scopeName) {
    this.scopeName = scopeName;
  }
  toKey() {
    return this.scopeName;
  }
};
var TopLevelRepositoryRuleReference = class {
  constructor(scopeName, ruleName) {
    this.scopeName = scopeName;
    this.ruleName = ruleName;
  }
  toKey() {
    return `${this.scopeName}#${this.ruleName}`;
  }
};
var ExternalReferenceCollector = class {
  constructor() {
    __publicField(this, "_references", []);
    __publicField(this, "_seenReferenceKeys", /* @__PURE__ */ new Set());
    __publicField(this, "visitedRule", /* @__PURE__ */ new Set());
  }
  get references() {
    return this._references;
  }
  add(reference) {
    const key2 = reference.toKey();
    if (this._seenReferenceKeys.has(key2)) {
      return;
    }
    this._seenReferenceKeys.add(key2);
    this._references.push(reference);
  }
};
var ScopeDependencyProcessor = class {
  constructor(repo, initialScopeName) {
    __publicField(this, "seenFullScopeRequests", /* @__PURE__ */ new Set());
    __publicField(this, "seenPartialScopeRequests", /* @__PURE__ */ new Set());
    __publicField(this, "Q");
    this.repo = repo;
    this.initialScopeName = initialScopeName;
    this.seenFullScopeRequests.add(this.initialScopeName);
    this.Q = [new TopLevelRuleReference(this.initialScopeName)];
  }
  processQueue() {
    const q = this.Q;
    this.Q = [];
    const deps = new ExternalReferenceCollector();
    for (const dep of q) {
      collectReferencesOfReference(dep, this.initialScopeName, this.repo, deps);
    }
    for (const dep of deps.references) {
      if (dep instanceof TopLevelRuleReference) {
        if (this.seenFullScopeRequests.has(dep.scopeName)) {
          continue;
        }
        this.seenFullScopeRequests.add(dep.scopeName);
        this.Q.push(dep);
      } else {
        if (this.seenFullScopeRequests.has(dep.scopeName)) {
          continue;
        }
        if (this.seenPartialScopeRequests.has(dep.toKey())) {
          continue;
        }
        this.seenPartialScopeRequests.add(dep.toKey());
        this.Q.push(dep);
      }
    }
  }
};
function collectReferencesOfReference(reference, baseGrammarScopeName, repo, result) {
  const selfGrammar = repo.lookup(reference.scopeName);
  if (!selfGrammar) {
    if (reference.scopeName === baseGrammarScopeName) {
      throw new Error(`No grammar provided for <${baseGrammarScopeName}>`);
    }
    return;
  }
  const baseGrammar = repo.lookup(baseGrammarScopeName);
  if (reference instanceof TopLevelRuleReference) {
    collectExternalReferencesInTopLevelRule({ baseGrammar, selfGrammar }, result);
  } else {
    collectExternalReferencesInTopLevelRepositoryRule(
      reference.ruleName,
      { baseGrammar, selfGrammar, repository: selfGrammar.repository },
      result
    );
  }
  const injections = repo.injections(reference.scopeName);
  if (injections) {
    for (const injection of injections) {
      result.add(new TopLevelRuleReference(injection));
    }
  }
}
function collectExternalReferencesInTopLevelRepositoryRule(ruleName, context, result) {
  if (context.repository && context.repository[ruleName]) {
    const rule = context.repository[ruleName];
    collectExternalReferencesInRules([rule], context, result);
  }
}
function collectExternalReferencesInTopLevelRule(context, result) {
  if (context.selfGrammar.patterns && Array.isArray(context.selfGrammar.patterns)) {
    collectExternalReferencesInRules(
      context.selfGrammar.patterns,
      { ...context, repository: context.selfGrammar.repository },
      result
    );
  }
  if (context.selfGrammar.injections) {
    collectExternalReferencesInRules(
      Object.values(context.selfGrammar.injections),
      { ...context, repository: context.selfGrammar.repository },
      result
    );
  }
}
function collectExternalReferencesInRules(rules, context, result) {
  for (const rule of rules) {
    if (result.visitedRule.has(rule)) {
      continue;
    }
    result.visitedRule.add(rule);
    const patternRepository = rule.repository ? mergeObjects({}, context.repository, rule.repository) : context.repository;
    if (Array.isArray(rule.patterns)) {
      collectExternalReferencesInRules(rule.patterns, { ...context, repository: patternRepository }, result);
    }
    const include = rule.include;
    if (!include) {
      continue;
    }
    const reference = parseInclude(include);
    switch (reference.kind) {
      case 0:
        collectExternalReferencesInTopLevelRule({ ...context, selfGrammar: context.baseGrammar }, result);
        break;
      case 1:
        collectExternalReferencesInTopLevelRule(context, result);
        break;
      case 2:
        collectExternalReferencesInTopLevelRepositoryRule(reference.ruleName, { ...context, repository: patternRepository }, result);
        break;
      case 3:
      case 4:
        const selfGrammar = reference.scopeName === context.selfGrammar.scopeName ? context.selfGrammar : reference.scopeName === context.baseGrammar.scopeName ? context.baseGrammar : void 0;
        if (selfGrammar) {
          const newContext = { baseGrammar: context.baseGrammar, selfGrammar, repository: patternRepository };
          if (reference.kind === 4) {
            collectExternalReferencesInTopLevelRepositoryRule(reference.ruleName, newContext, result);
          } else {
            collectExternalReferencesInTopLevelRule(newContext, result);
          }
        } else {
          if (reference.kind === 4) {
            result.add(new TopLevelRepositoryRuleReference(reference.scopeName, reference.ruleName));
          } else {
            result.add(new TopLevelRuleReference(reference.scopeName));
          }
        }
        break;
    }
  }
}
var BaseReference = class {
  constructor() {
    __publicField(this, "kind", 0);
  }
};
var SelfReference = class {
  constructor() {
    __publicField(this, "kind", 1);
  }
};
var RelativeReference = class {
  constructor(ruleName) {
    __publicField(this, "kind", 2);
    this.ruleName = ruleName;
  }
};
var TopLevelReference = class {
  constructor(scopeName) {
    __publicField(this, "kind", 3);
    this.scopeName = scopeName;
  }
};
var TopLevelRepositoryReference = class {
  constructor(scopeName, ruleName) {
    __publicField(this, "kind", 4);
    this.scopeName = scopeName;
    this.ruleName = ruleName;
  }
};
function parseInclude(include) {
  if (include === "$base") {
    return new BaseReference();
  } else if (include === "$self") {
    return new SelfReference();
  }
  const indexOfSharp = include.indexOf("#");
  if (indexOfSharp === -1) {
    return new TopLevelReference(include);
  } else if (indexOfSharp === 0) {
    return new RelativeReference(include.substring(1));
  } else {
    const scopeName = include.substring(0, indexOfSharp);
    const ruleName = include.substring(indexOfSharp + 1);
    return new TopLevelRepositoryReference(scopeName, ruleName);
  }
}
var HAS_BACK_REFERENCES = /\\(\d+)/;
var BACK_REFERENCING_END = /\\(\d+)/g;
var endRuleId = -1;
var whileRuleId = -2;
function ruleIdFromNumber(id) {
  return id;
}
function ruleIdToNumber(id) {
  return id;
}
var Rule = class {
  constructor($location, id, name, contentName) {
    __publicField(this, "$location");
    __publicField(this, "id");
    __publicField(this, "_nameIsCapturing");
    __publicField(this, "_name");
    __publicField(this, "_contentNameIsCapturing");
    __publicField(this, "_contentName");
    this.$location = $location;
    this.id = id;
    this._name = name || null;
    this._nameIsCapturing = RegexSource.hasCaptures(this._name);
    this._contentName = contentName || null;
    this._contentNameIsCapturing = RegexSource.hasCaptures(this._contentName);
  }
  get debugName() {
    const location = this.$location ? `${basename(this.$location.filename)}:${this.$location.line}` : "unknown";
    return `${this.constructor.name}#${this.id} @ ${location}`;
  }
  getName(lineText, captureIndices) {
    if (!this._nameIsCapturing || this._name === null || lineText === null || captureIndices === null) {
      return this._name;
    }
    return RegexSource.replaceCaptures(this._name, lineText, captureIndices);
  }
  getContentName(lineText, captureIndices) {
    if (!this._contentNameIsCapturing || this._contentName === null) {
      return this._contentName;
    }
    return RegexSource.replaceCaptures(this._contentName, lineText, captureIndices);
  }
};
var CaptureRule = class extends Rule {
  constructor($location, id, name, contentName, retokenizeCapturedWithRuleId) {
    super($location, id, name, contentName);
    __publicField(this, "retokenizeCapturedWithRuleId");
    this.retokenizeCapturedWithRuleId = retokenizeCapturedWithRuleId;
  }
  dispose() {
  }
  collectPatterns(grammar, out) {
    throw new Error("Not supported!");
  }
  compile(grammar, endRegexSource) {
    throw new Error("Not supported!");
  }
  compileAG(grammar, endRegexSource, allowA, allowG) {
    throw new Error("Not supported!");
  }
};
var MatchRule = class extends Rule {
  constructor($location, id, name, match, captures) {
    super($location, id, name, null);
    __publicField(this, "_match");
    __publicField(this, "captures");
    __publicField(this, "_cachedCompiledPatterns");
    this._match = new RegExpSource(match, this.id);
    this.captures = captures;
    this._cachedCompiledPatterns = null;
  }
  dispose() {
    if (this._cachedCompiledPatterns) {
      this._cachedCompiledPatterns.dispose();
      this._cachedCompiledPatterns = null;
    }
  }
  get debugMatchRegExp() {
    return `${this._match.source}`;
  }
  collectPatterns(grammar, out) {
    out.push(this._match);
  }
  compile(grammar, endRegexSource) {
    return this._getCachedCompiledPatterns(grammar).compile(grammar);
  }
  compileAG(grammar, endRegexSource, allowA, allowG) {
    return this._getCachedCompiledPatterns(grammar).compileAG(grammar, allowA, allowG);
  }
  _getCachedCompiledPatterns(grammar) {
    if (!this._cachedCompiledPatterns) {
      this._cachedCompiledPatterns = new RegExpSourceList();
      this.collectPatterns(grammar, this._cachedCompiledPatterns);
    }
    return this._cachedCompiledPatterns;
  }
};
var IncludeOnlyRule = class extends Rule {
  constructor($location, id, name, contentName, patterns) {
    super($location, id, name, contentName);
    __publicField(this, "hasMissingPatterns");
    __publicField(this, "patterns");
    __publicField(this, "_cachedCompiledPatterns");
    this.patterns = patterns.patterns;
    this.hasMissingPatterns = patterns.hasMissingPatterns;
    this._cachedCompiledPatterns = null;
  }
  dispose() {
    if (this._cachedCompiledPatterns) {
      this._cachedCompiledPatterns.dispose();
      this._cachedCompiledPatterns = null;
    }
  }
  collectPatterns(grammar, out) {
    for (const pattern of this.patterns) {
      const rule = grammar.getRule(pattern);
      rule.collectPatterns(grammar, out);
    }
  }
  compile(grammar, endRegexSource) {
    return this._getCachedCompiledPatterns(grammar).compile(grammar);
  }
  compileAG(grammar, endRegexSource, allowA, allowG) {
    return this._getCachedCompiledPatterns(grammar).compileAG(grammar, allowA, allowG);
  }
  _getCachedCompiledPatterns(grammar) {
    if (!this._cachedCompiledPatterns) {
      this._cachedCompiledPatterns = new RegExpSourceList();
      this.collectPatterns(grammar, this._cachedCompiledPatterns);
    }
    return this._cachedCompiledPatterns;
  }
};
var BeginEndRule = class extends Rule {
  constructor($location, id, name, contentName, begin, beginCaptures, end, endCaptures, applyEndPatternLast, patterns) {
    super($location, id, name, contentName);
    __publicField(this, "_begin");
    __publicField(this, "beginCaptures");
    __publicField(this, "_end");
    __publicField(this, "endHasBackReferences");
    __publicField(this, "endCaptures");
    __publicField(this, "applyEndPatternLast");
    __publicField(this, "hasMissingPatterns");
    __publicField(this, "patterns");
    __publicField(this, "_cachedCompiledPatterns");
    this._begin = new RegExpSource(begin, this.id);
    this.beginCaptures = beginCaptures;
    this._end = new RegExpSource(end ? end : "￿", -1);
    this.endHasBackReferences = this._end.hasBackReferences;
    this.endCaptures = endCaptures;
    this.applyEndPatternLast = applyEndPatternLast || false;
    this.patterns = patterns.patterns;
    this.hasMissingPatterns = patterns.hasMissingPatterns;
    this._cachedCompiledPatterns = null;
  }
  dispose() {
    if (this._cachedCompiledPatterns) {
      this._cachedCompiledPatterns.dispose();
      this._cachedCompiledPatterns = null;
    }
  }
  get debugBeginRegExp() {
    return `${this._begin.source}`;
  }
  get debugEndRegExp() {
    return `${this._end.source}`;
  }
  getEndWithResolvedBackReferences(lineText, captureIndices) {
    return this._end.resolveBackReferences(lineText, captureIndices);
  }
  collectPatterns(grammar, out) {
    out.push(this._begin);
  }
  compile(grammar, endRegexSource) {
    return this._getCachedCompiledPatterns(grammar, endRegexSource).compile(grammar);
  }
  compileAG(grammar, endRegexSource, allowA, allowG) {
    return this._getCachedCompiledPatterns(grammar, endRegexSource).compileAG(grammar, allowA, allowG);
  }
  _getCachedCompiledPatterns(grammar, endRegexSource) {
    if (!this._cachedCompiledPatterns) {
      this._cachedCompiledPatterns = new RegExpSourceList();
      for (const pattern of this.patterns) {
        const rule = grammar.getRule(pattern);
        rule.collectPatterns(grammar, this._cachedCompiledPatterns);
      }
      if (this.applyEndPatternLast) {
        this._cachedCompiledPatterns.push(this._end.hasBackReferences ? this._end.clone() : this._end);
      } else {
        this._cachedCompiledPatterns.unshift(this._end.hasBackReferences ? this._end.clone() : this._end);
      }
    }
    if (this._end.hasBackReferences) {
      if (this.applyEndPatternLast) {
        this._cachedCompiledPatterns.setSource(this._cachedCompiledPatterns.length() - 1, endRegexSource);
      } else {
        this._cachedCompiledPatterns.setSource(0, endRegexSource);
      }
    }
    return this._cachedCompiledPatterns;
  }
};
var BeginWhileRule = class extends Rule {
  constructor($location, id, name, contentName, begin, beginCaptures, _while, whileCaptures, patterns) {
    super($location, id, name, contentName);
    __publicField(this, "_begin");
    __publicField(this, "beginCaptures");
    __publicField(this, "whileCaptures");
    __publicField(this, "_while");
    __publicField(this, "whileHasBackReferences");
    __publicField(this, "hasMissingPatterns");
    __publicField(this, "patterns");
    __publicField(this, "_cachedCompiledPatterns");
    __publicField(this, "_cachedCompiledWhilePatterns");
    this._begin = new RegExpSource(begin, this.id);
    this.beginCaptures = beginCaptures;
    this.whileCaptures = whileCaptures;
    this._while = new RegExpSource(_while, whileRuleId);
    this.whileHasBackReferences = this._while.hasBackReferences;
    this.patterns = patterns.patterns;
    this.hasMissingPatterns = patterns.hasMissingPatterns;
    this._cachedCompiledPatterns = null;
    this._cachedCompiledWhilePatterns = null;
  }
  dispose() {
    if (this._cachedCompiledPatterns) {
      this._cachedCompiledPatterns.dispose();
      this._cachedCompiledPatterns = null;
    }
    if (this._cachedCompiledWhilePatterns) {
      this._cachedCompiledWhilePatterns.dispose();
      this._cachedCompiledWhilePatterns = null;
    }
  }
  get debugBeginRegExp() {
    return `${this._begin.source}`;
  }
  get debugWhileRegExp() {
    return `${this._while.source}`;
  }
  getWhileWithResolvedBackReferences(lineText, captureIndices) {
    return this._while.resolveBackReferences(lineText, captureIndices);
  }
  collectPatterns(grammar, out) {
    out.push(this._begin);
  }
  compile(grammar, endRegexSource) {
    return this._getCachedCompiledPatterns(grammar).compile(grammar);
  }
  compileAG(grammar, endRegexSource, allowA, allowG) {
    return this._getCachedCompiledPatterns(grammar).compileAG(grammar, allowA, allowG);
  }
  _getCachedCompiledPatterns(grammar) {
    if (!this._cachedCompiledPatterns) {
      this._cachedCompiledPatterns = new RegExpSourceList();
      for (const pattern of this.patterns) {
        const rule = grammar.getRule(pattern);
        rule.collectPatterns(grammar, this._cachedCompiledPatterns);
      }
    }
    return this._cachedCompiledPatterns;
  }
  compileWhile(grammar, endRegexSource) {
    return this._getCachedCompiledWhilePatterns(grammar, endRegexSource).compile(grammar);
  }
  compileWhileAG(grammar, endRegexSource, allowA, allowG) {
    return this._getCachedCompiledWhilePatterns(grammar, endRegexSource).compileAG(grammar, allowA, allowG);
  }
  _getCachedCompiledWhilePatterns(grammar, endRegexSource) {
    if (!this._cachedCompiledWhilePatterns) {
      this._cachedCompiledWhilePatterns = new RegExpSourceList();
      this._cachedCompiledWhilePatterns.push(this._while.hasBackReferences ? this._while.clone() : this._while);
    }
    if (this._while.hasBackReferences) {
      this._cachedCompiledWhilePatterns.setSource(0, endRegexSource ? endRegexSource : "￿");
    }
    return this._cachedCompiledWhilePatterns;
  }
};
var RuleFactory = class _RuleFactory {
  static createCaptureRule(helper, $location, name, contentName, retokenizeCapturedWithRuleId) {
    return helper.registerRule((id) => {
      return new CaptureRule($location, id, name, contentName, retokenizeCapturedWithRuleId);
    });
  }
  static getCompiledRuleId(desc, helper, repository) {
    if (!desc.id) {
      helper.registerRule((id) => {
        desc.id = id;
        if (desc.match) {
          return new MatchRule(
            desc.$vscodeTextmateLocation,
            desc.id,
            desc.name,
            desc.match,
            _RuleFactory._compileCaptures(desc.captures, helper, repository)
          );
        }
        if (typeof desc.begin === "undefined") {
          if (desc.repository) {
            repository = mergeObjects({}, repository, desc.repository);
          }
          let patterns = desc.patterns;
          if (typeof patterns === "undefined" && desc.include) {
            patterns = [{ include: desc.include }];
          }
          return new IncludeOnlyRule(
            desc.$vscodeTextmateLocation,
            desc.id,
            desc.name,
            desc.contentName,
            _RuleFactory._compilePatterns(patterns, helper, repository)
          );
        }
        if (desc.while) {
          return new BeginWhileRule(
            desc.$vscodeTextmateLocation,
            desc.id,
            desc.name,
            desc.contentName,
            desc.begin,
            _RuleFactory._compileCaptures(desc.beginCaptures || desc.captures, helper, repository),
            desc.while,
            _RuleFactory._compileCaptures(desc.whileCaptures || desc.captures, helper, repository),
            _RuleFactory._compilePatterns(desc.patterns, helper, repository)
          );
        }
        return new BeginEndRule(
          desc.$vscodeTextmateLocation,
          desc.id,
          desc.name,
          desc.contentName,
          desc.begin,
          _RuleFactory._compileCaptures(desc.beginCaptures || desc.captures, helper, repository),
          desc.end,
          _RuleFactory._compileCaptures(desc.endCaptures || desc.captures, helper, repository),
          desc.applyEndPatternLast,
          _RuleFactory._compilePatterns(desc.patterns, helper, repository)
        );
      });
    }
    return desc.id;
  }
  static _compileCaptures(captures, helper, repository) {
    let r = [];
    if (captures) {
      let maximumCaptureId = 0;
      for (const captureId in captures) {
        if (captureId === "$vscodeTextmateLocation") {
          continue;
        }
        const numericCaptureId = parseInt(captureId, 10);
        if (numericCaptureId > maximumCaptureId) {
          maximumCaptureId = numericCaptureId;
        }
      }
      for (let i = 0; i <= maximumCaptureId; i++) {
        r[i] = null;
      }
      for (const captureId in captures) {
        if (captureId === "$vscodeTextmateLocation") {
          continue;
        }
        const numericCaptureId = parseInt(captureId, 10);
        let retokenizeCapturedWithRuleId = 0;
        if (captures[captureId].patterns) {
          retokenizeCapturedWithRuleId = _RuleFactory.getCompiledRuleId(captures[captureId], helper, repository);
        }
        r[numericCaptureId] = _RuleFactory.createCaptureRule(helper, captures[captureId].$vscodeTextmateLocation, captures[captureId].name, captures[captureId].contentName, retokenizeCapturedWithRuleId);
      }
    }
    return r;
  }
  static _compilePatterns(patterns, helper, repository) {
    let r = [];
    if (patterns) {
      for (let i = 0, len = patterns.length; i < len; i++) {
        const pattern = patterns[i];
        let ruleId = -1;
        if (pattern.include) {
          const reference = parseInclude(pattern.include);
          switch (reference.kind) {
            case 0:
            case 1:
              ruleId = _RuleFactory.getCompiledRuleId(repository[pattern.include], helper, repository);
              break;
            case 2:
              let localIncludedRule = repository[reference.ruleName];
              if (localIncludedRule) {
                ruleId = _RuleFactory.getCompiledRuleId(localIncludedRule, helper, repository);
              }
              break;
            case 3:
            case 4:
              const externalGrammarName = reference.scopeName;
              const externalGrammarInclude = reference.kind === 4 ? reference.ruleName : null;
              const externalGrammar = helper.getExternalGrammar(externalGrammarName, repository);
              if (externalGrammar) {
                if (externalGrammarInclude) {
                  let externalIncludedRule = externalGrammar.repository[externalGrammarInclude];
                  if (externalIncludedRule) {
                    ruleId = _RuleFactory.getCompiledRuleId(externalIncludedRule, helper, externalGrammar.repository);
                  }
                } else {
                  ruleId = _RuleFactory.getCompiledRuleId(externalGrammar.repository.$self, helper, externalGrammar.repository);
                }
              }
              break;
          }
        } else {
          ruleId = _RuleFactory.getCompiledRuleId(pattern, helper, repository);
        }
        if (ruleId !== -1) {
          const rule = helper.getRule(ruleId);
          let skipRule = false;
          if (rule instanceof IncludeOnlyRule || rule instanceof BeginEndRule || rule instanceof BeginWhileRule) {
            if (rule.hasMissingPatterns && rule.patterns.length === 0) {
              skipRule = true;
            }
          }
          if (skipRule) {
            continue;
          }
          r.push(ruleId);
        }
      }
    }
    return {
      patterns: r,
      hasMissingPatterns: (patterns ? patterns.length : 0) !== r.length
    };
  }
};
var RegExpSource = class _RegExpSource {
  constructor(regExpSource, ruleId) {
    __publicField(this, "source");
    __publicField(this, "ruleId");
    __publicField(this, "hasAnchor");
    __publicField(this, "hasBackReferences");
    __publicField(this, "_anchorCache");
    if (regExpSource && typeof regExpSource === "string") {
      const len = regExpSource.length;
      let lastPushedPos = 0;
      let output = [];
      let hasAnchor = false;
      for (let pos = 0; pos < len; pos++) {
        const ch = regExpSource.charAt(pos);
        if (ch === "\\") {
          if (pos + 1 < len) {
            const nextCh = regExpSource.charAt(pos + 1);
            if (nextCh === "z") {
              output.push(regExpSource.substring(lastPushedPos, pos));
              output.push("$(?!\\n)(?<!\\n)");
              lastPushedPos = pos + 2;
            } else if (nextCh === "A" || nextCh === "G") {
              hasAnchor = true;
            }
            pos++;
          }
        }
      }
      this.hasAnchor = hasAnchor;
      if (lastPushedPos === 0) {
        this.source = regExpSource;
      } else {
        output.push(regExpSource.substring(lastPushedPos, len));
        this.source = output.join("");
      }
    } else {
      this.hasAnchor = false;
      this.source = regExpSource;
    }
    if (this.hasAnchor) {
      this._anchorCache = this._buildAnchorCache();
    } else {
      this._anchorCache = null;
    }
    this.ruleId = ruleId;
    if (typeof this.source === "string") {
      this.hasBackReferences = HAS_BACK_REFERENCES.test(this.source);
    } else {
      this.hasBackReferences = false;
    }
  }
  clone() {
    return new _RegExpSource(this.source, this.ruleId);
  }
  setSource(newSource) {
    if (this.source === newSource) {
      return;
    }
    this.source = newSource;
    if (this.hasAnchor) {
      this._anchorCache = this._buildAnchorCache();
    }
  }
  resolveBackReferences(lineText, captureIndices) {
    if (typeof this.source !== "string") {
      throw new Error("This method should only be called if the source is a string");
    }
    let capturedValues = captureIndices.map((capture) => {
      return lineText.substring(capture.start, capture.end);
    });
    BACK_REFERENCING_END.lastIndex = 0;
    return this.source.replace(BACK_REFERENCING_END, (match, g1) => {
      return escapeRegExpCharacters(capturedValues[parseInt(g1, 10)] || "");
    });
  }
  _buildAnchorCache() {
    if (typeof this.source !== "string") {
      throw new Error("This method should only be called if the source is a string");
    }
    let A0_G0_result = [];
    let A0_G1_result = [];
    let A1_G0_result = [];
    let A1_G1_result = [];
    let pos, len, ch, nextCh;
    for (pos = 0, len = this.source.length; pos < len; pos++) {
      ch = this.source.charAt(pos);
      A0_G0_result[pos] = ch;
      A0_G1_result[pos] = ch;
      A1_G0_result[pos] = ch;
      A1_G1_result[pos] = ch;
      if (ch === "\\") {
        if (pos + 1 < len) {
          nextCh = this.source.charAt(pos + 1);
          if (nextCh === "A") {
            A0_G0_result[pos + 1] = "￿";
            A0_G1_result[pos + 1] = "￿";
            A1_G0_result[pos + 1] = "A";
            A1_G1_result[pos + 1] = "A";
          } else if (nextCh === "G") {
            A0_G0_result[pos + 1] = "￿";
            A0_G1_result[pos + 1] = "G";
            A1_G0_result[pos + 1] = "￿";
            A1_G1_result[pos + 1] = "G";
          } else {
            A0_G0_result[pos + 1] = nextCh;
            A0_G1_result[pos + 1] = nextCh;
            A1_G0_result[pos + 1] = nextCh;
            A1_G1_result[pos + 1] = nextCh;
          }
          pos++;
        }
      }
    }
    return {
      A0_G0: A0_G0_result.join(""),
      A0_G1: A0_G1_result.join(""),
      A1_G0: A1_G0_result.join(""),
      A1_G1: A1_G1_result.join("")
    };
  }
  resolveAnchors(allowA, allowG) {
    if (!this.hasAnchor || !this._anchorCache || typeof this.source !== "string") {
      return this.source;
    }
    if (allowA) {
      if (allowG) {
        return this._anchorCache.A1_G1;
      } else {
        return this._anchorCache.A1_G0;
      }
    } else {
      if (allowG) {
        return this._anchorCache.A0_G1;
      } else {
        return this._anchorCache.A0_G0;
      }
    }
  }
};
var RegExpSourceList = class {
  constructor() {
    __publicField(this, "_items");
    __publicField(this, "_hasAnchors");
    __publicField(this, "_cached");
    __publicField(this, "_anchorCache");
    this._items = [];
    this._hasAnchors = false;
    this._cached = null;
    this._anchorCache = {
      A0_G0: null,
      A0_G1: null,
      A1_G0: null,
      A1_G1: null
    };
  }
  dispose() {
    this._disposeCaches();
  }
  _disposeCaches() {
    if (this._cached) {
      this._cached.dispose();
      this._cached = null;
    }
    if (this._anchorCache.A0_G0) {
      this._anchorCache.A0_G0.dispose();
      this._anchorCache.A0_G0 = null;
    }
    if (this._anchorCache.A0_G1) {
      this._anchorCache.A0_G1.dispose();
      this._anchorCache.A0_G1 = null;
    }
    if (this._anchorCache.A1_G0) {
      this._anchorCache.A1_G0.dispose();
      this._anchorCache.A1_G0 = null;
    }
    if (this._anchorCache.A1_G1) {
      this._anchorCache.A1_G1.dispose();
      this._anchorCache.A1_G1 = null;
    }
  }
  push(item) {
    this._items.push(item);
    this._hasAnchors = this._hasAnchors || item.hasAnchor;
  }
  unshift(item) {
    this._items.unshift(item);
    this._hasAnchors = this._hasAnchors || item.hasAnchor;
  }
  length() {
    return this._items.length;
  }
  setSource(index2, newSource) {
    if (this._items[index2].source !== newSource) {
      this._disposeCaches();
      this._items[index2].setSource(newSource);
    }
  }
  compile(onigLib) {
    if (!this._cached) {
      let regExps = this._items.map((e) => e.source);
      this._cached = new CompiledRule(onigLib, regExps, this._items.map((e) => e.ruleId));
    }
    return this._cached;
  }
  compileAG(onigLib, allowA, allowG) {
    if (!this._hasAnchors) {
      return this.compile(onigLib);
    } else {
      if (allowA) {
        if (allowG) {
          if (!this._anchorCache.A1_G1) {
            this._anchorCache.A1_G1 = this._resolveAnchors(onigLib, allowA, allowG);
          }
          return this._anchorCache.A1_G1;
        } else {
          if (!this._anchorCache.A1_G0) {
            this._anchorCache.A1_G0 = this._resolveAnchors(onigLib, allowA, allowG);
          }
          return this._anchorCache.A1_G0;
        }
      } else {
        if (allowG) {
          if (!this._anchorCache.A0_G1) {
            this._anchorCache.A0_G1 = this._resolveAnchors(onigLib, allowA, allowG);
          }
          return this._anchorCache.A0_G1;
        } else {
          if (!this._anchorCache.A0_G0) {
            this._anchorCache.A0_G0 = this._resolveAnchors(onigLib, allowA, allowG);
          }
          return this._anchorCache.A0_G0;
        }
      }
    }
  }
  _resolveAnchors(onigLib, allowA, allowG) {
    let regExps = this._items.map((e) => e.resolveAnchors(allowA, allowG));
    return new CompiledRule(onigLib, regExps, this._items.map((e) => e.ruleId));
  }
};
var CompiledRule = class {
  constructor(onigLib, regExps, rules) {
    __publicField(this, "scanner");
    this.regExps = regExps;
    this.rules = rules;
    this.scanner = onigLib.createOnigScanner(regExps);
  }
  dispose() {
    if (typeof this.scanner.dispose === "function") {
      this.scanner.dispose();
    }
  }
  toString() {
    const r = [];
    for (let i = 0, len = this.rules.length; i < len; i++) {
      r.push("   - " + this.rules[i] + ": " + this.regExps[i]);
    }
    return r.join("\n");
  }
  findNextMatchSync(string, startPosition, options) {
    const result = this.scanner.findNextMatchSync(string, startPosition, options);
    if (!result) {
      return null;
    }
    return {
      ruleId: this.rules[result.index],
      captureIndices: result.captureIndices
    };
  }
};
var BasicScopeAttributes = class {
  constructor(languageId, tokenType) {
    this.languageId = languageId;
    this.tokenType = tokenType;
  }
};
var BasicScopeAttributesProvider = (_a = class {
  constructor(initialLanguageId, embeddedLanguages) {
    __publicField(this, "_defaultAttributes");
    __publicField(this, "_embeddedLanguagesMatcher");
    __publicField(this, "_getBasicScopeAttributes", new CachedFn((scopeName) => {
      const languageId = this._scopeToLanguage(scopeName);
      const standardTokenType = this._toStandardTokenType(scopeName);
      return new BasicScopeAttributes(languageId, standardTokenType);
    }));
    this._defaultAttributes = new BasicScopeAttributes(
      initialLanguageId,
      8
      /* NotSet */
    );
    this._embeddedLanguagesMatcher = new ScopeMatcher(Object.entries(embeddedLanguages || {}));
  }
  getDefaultAttributes() {
    return this._defaultAttributes;
  }
  getBasicScopeAttributes(scopeName) {
    if (scopeName === null) {
      return _a._NULL_SCOPE_METADATA;
    }
    return this._getBasicScopeAttributes.get(scopeName);
  }
  /**
   * Given a produced TM scope, return the language that token describes or null if unknown.
   * e.g. source.html => html, source.css.embedded.html => css, punctuation.definition.tag.html => null
   */
  _scopeToLanguage(scope) {
    return this._embeddedLanguagesMatcher.match(scope) || 0;
  }
  _toStandardTokenType(scopeName) {
    const m = scopeName.match(_a.STANDARD_TOKEN_TYPE_REGEXP);
    if (!m) {
      return 8;
    }
    switch (m[1]) {
      case "comment":
        return 1;
      case "string":
        return 2;
      case "regex":
        return 3;
      case "meta.embedded":
        return 0;
    }
    throw new Error("Unexpected match for standard token type!");
  }
}, __publicField(_a, "_NULL_SCOPE_METADATA", new BasicScopeAttributes(0, 0)), __publicField(_a, "STANDARD_TOKEN_TYPE_REGEXP", /\b(comment|string|regex|meta\.embedded)\b/), _a);
var ScopeMatcher = class {
  constructor(values) {
    __publicField(this, "values");
    __publicField(this, "scopesRegExp");
    if (values.length === 0) {
      this.values = null;
      this.scopesRegExp = null;
    } else {
      this.values = new Map(values);
      const escapedScopes = values.map(
        ([scopeName, value]) => escapeRegExpCharacters(scopeName)
      );
      escapedScopes.sort();
      escapedScopes.reverse();
      this.scopesRegExp = new RegExp(
        `^((${escapedScopes.join(")|(")}))($|\\.)`,
        ""
      );
    }
  }
  match(scope) {
    if (!this.scopesRegExp) {
      return void 0;
    }
    const m = scope.match(this.scopesRegExp);
    if (!m) {
      return void 0;
    }
    return this.values.get(m[1]);
  }
};
({
  InDebugMode: typeof process !== "undefined" && !!process.env["VSCODE_TEXTMATE_DEBUG"]
});
var TokenizeStringResult = class {
  constructor(stack, stoppedEarly) {
    this.stack = stack;
    this.stoppedEarly = stoppedEarly;
  }
};
function _tokenizeString(grammar, lineText, isFirstLine, linePos, stack, lineTokens, checkWhileConditions, timeLimit) {
  const lineLength = lineText.content.length;
  let STOP = false;
  let anchorPosition = -1;
  if (checkWhileConditions) {
    const whileCheckResult = _checkWhileConditions(
      grammar,
      lineText,
      isFirstLine,
      linePos,
      stack,
      lineTokens
    );
    stack = whileCheckResult.stack;
    linePos = whileCheckResult.linePos;
    isFirstLine = whileCheckResult.isFirstLine;
    anchorPosition = whileCheckResult.anchorPosition;
  }
  const startTime = Date.now();
  while (!STOP) {
    if (timeLimit !== 0) {
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime > timeLimit) {
        return new TokenizeStringResult(stack, true);
      }
    }
    scanNext();
  }
  return new TokenizeStringResult(stack, false);
  function scanNext() {
    const r = matchRuleOrInjections(
      grammar,
      lineText,
      isFirstLine,
      linePos,
      stack,
      anchorPosition
    );
    if (!r) {
      lineTokens.produce(stack, lineLength);
      STOP = true;
      return;
    }
    const captureIndices = r.captureIndices;
    const matchedRuleId = r.matchedRuleId;
    const hasAdvanced = captureIndices && captureIndices.length > 0 ? captureIndices[0].end > linePos : false;
    if (matchedRuleId === endRuleId) {
      const poppedRule = stack.getRule(grammar);
      lineTokens.produce(stack, captureIndices[0].start);
      stack = stack.withContentNameScopesList(stack.nameScopesList);
      handleCaptures(
        grammar,
        lineText,
        isFirstLine,
        stack,
        lineTokens,
        poppedRule.endCaptures,
        captureIndices
      );
      lineTokens.produce(stack, captureIndices[0].end);
      const popped = stack;
      stack = stack.parent;
      anchorPosition = popped.getAnchorPos();
      if (!hasAdvanced && popped.getEnterPos() === linePos) {
        stack = popped;
        lineTokens.produce(stack, lineLength);
        STOP = true;
        return;
      }
    } else {
      const _rule = grammar.getRule(matchedRuleId);
      lineTokens.produce(stack, captureIndices[0].start);
      const beforePush = stack;
      const scopeName = _rule.getName(lineText.content, captureIndices);
      const nameScopesList = stack.contentNameScopesList.pushAttributed(
        scopeName,
        grammar
      );
      stack = stack.push(
        matchedRuleId,
        linePos,
        anchorPosition,
        captureIndices[0].end === lineLength,
        null,
        nameScopesList,
        nameScopesList
      );
      if (_rule instanceof BeginEndRule) {
        const pushedRule = _rule;
        handleCaptures(
          grammar,
          lineText,
          isFirstLine,
          stack,
          lineTokens,
          pushedRule.beginCaptures,
          captureIndices
        );
        lineTokens.produce(stack, captureIndices[0].end);
        anchorPosition = captureIndices[0].end;
        const contentName = pushedRule.getContentName(
          lineText.content,
          captureIndices
        );
        const contentNameScopesList = nameScopesList.pushAttributed(
          contentName,
          grammar
        );
        stack = stack.withContentNameScopesList(contentNameScopesList);
        if (pushedRule.endHasBackReferences) {
          stack = stack.withEndRule(
            pushedRule.getEndWithResolvedBackReferences(
              lineText.content,
              captureIndices
            )
          );
        }
        if (!hasAdvanced && beforePush.hasSameRuleAs(stack)) {
          stack = stack.pop();
          lineTokens.produce(stack, lineLength);
          STOP = true;
          return;
        }
      } else if (_rule instanceof BeginWhileRule) {
        const pushedRule = _rule;
        handleCaptures(
          grammar,
          lineText,
          isFirstLine,
          stack,
          lineTokens,
          pushedRule.beginCaptures,
          captureIndices
        );
        lineTokens.produce(stack, captureIndices[0].end);
        anchorPosition = captureIndices[0].end;
        const contentName = pushedRule.getContentName(
          lineText.content,
          captureIndices
        );
        const contentNameScopesList = nameScopesList.pushAttributed(
          contentName,
          grammar
        );
        stack = stack.withContentNameScopesList(contentNameScopesList);
        if (pushedRule.whileHasBackReferences) {
          stack = stack.withEndRule(
            pushedRule.getWhileWithResolvedBackReferences(
              lineText.content,
              captureIndices
            )
          );
        }
        if (!hasAdvanced && beforePush.hasSameRuleAs(stack)) {
          stack = stack.pop();
          lineTokens.produce(stack, lineLength);
          STOP = true;
          return;
        }
      } else {
        const matchingRule = _rule;
        handleCaptures(
          grammar,
          lineText,
          isFirstLine,
          stack,
          lineTokens,
          matchingRule.captures,
          captureIndices
        );
        lineTokens.produce(stack, captureIndices[0].end);
        stack = stack.pop();
        if (!hasAdvanced) {
          stack = stack.safePop();
          lineTokens.produce(stack, lineLength);
          STOP = true;
          return;
        }
      }
    }
    if (captureIndices[0].end > linePos) {
      linePos = captureIndices[0].end;
      isFirstLine = false;
    }
  }
}
function _checkWhileConditions(grammar, lineText, isFirstLine, linePos, stack, lineTokens) {
  let anchorPosition = stack.beginRuleCapturedEOL ? 0 : -1;
  const whileRules = [];
  for (let node = stack; node; node = node.pop()) {
    const nodeRule = node.getRule(grammar);
    if (nodeRule instanceof BeginWhileRule) {
      whileRules.push({
        rule: nodeRule,
        stack: node
      });
    }
  }
  for (let whileRule = whileRules.pop(); whileRule; whileRule = whileRules.pop()) {
    const { ruleScanner, findOptions } = prepareRuleWhileSearch(whileRule.rule, grammar, whileRule.stack.endRule, isFirstLine, linePos === anchorPosition);
    const r = ruleScanner.findNextMatchSync(lineText, linePos, findOptions);
    if (r) {
      const matchedRuleId = r.ruleId;
      if (matchedRuleId !== whileRuleId) {
        stack = whileRule.stack.pop();
        break;
      }
      if (r.captureIndices && r.captureIndices.length) {
        lineTokens.produce(whileRule.stack, r.captureIndices[0].start);
        handleCaptures(grammar, lineText, isFirstLine, whileRule.stack, lineTokens, whileRule.rule.whileCaptures, r.captureIndices);
        lineTokens.produce(whileRule.stack, r.captureIndices[0].end);
        anchorPosition = r.captureIndices[0].end;
        if (r.captureIndices[0].end > linePos) {
          linePos = r.captureIndices[0].end;
          isFirstLine = false;
        }
      }
    } else {
      stack = whileRule.stack.pop();
      break;
    }
  }
  return { stack, linePos, anchorPosition, isFirstLine };
}
function matchRuleOrInjections(grammar, lineText, isFirstLine, linePos, stack, anchorPosition) {
  const matchResult = matchRule(grammar, lineText, isFirstLine, linePos, stack, anchorPosition);
  const injections = grammar.getInjections();
  if (injections.length === 0) {
    return matchResult;
  }
  const injectionResult = matchInjections(injections, grammar, lineText, isFirstLine, linePos, stack, anchorPosition);
  if (!injectionResult) {
    return matchResult;
  }
  if (!matchResult) {
    return injectionResult;
  }
  const matchResultScore = matchResult.captureIndices[0].start;
  const injectionResultScore = injectionResult.captureIndices[0].start;
  if (injectionResultScore < matchResultScore || injectionResult.priorityMatch && injectionResultScore === matchResultScore) {
    return injectionResult;
  }
  return matchResult;
}
function matchRule(grammar, lineText, isFirstLine, linePos, stack, anchorPosition) {
  const rule = stack.getRule(grammar);
  const { ruleScanner, findOptions } = prepareRuleSearch(rule, grammar, stack.endRule, isFirstLine, linePos === anchorPosition);
  const r = ruleScanner.findNextMatchSync(lineText, linePos, findOptions);
  if (r) {
    return {
      captureIndices: r.captureIndices,
      matchedRuleId: r.ruleId
    };
  }
  return null;
}
function matchInjections(injections, grammar, lineText, isFirstLine, linePos, stack, anchorPosition) {
  let bestMatchRating = Number.MAX_VALUE;
  let bestMatchCaptureIndices = null;
  let bestMatchRuleId;
  let bestMatchResultPriority = 0;
  const scopes = stack.contentNameScopesList.getScopeNames();
  for (let i = 0, len = injections.length; i < len; i++) {
    const injection = injections[i];
    if (!injection.matcher(scopes)) {
      continue;
    }
    const rule = grammar.getRule(injection.ruleId);
    const { ruleScanner, findOptions } = prepareRuleSearch(rule, grammar, null, isFirstLine, linePos === anchorPosition);
    const matchResult = ruleScanner.findNextMatchSync(lineText, linePos, findOptions);
    if (!matchResult) {
      continue;
    }
    const matchRating = matchResult.captureIndices[0].start;
    if (matchRating >= bestMatchRating) {
      continue;
    }
    bestMatchRating = matchRating;
    bestMatchCaptureIndices = matchResult.captureIndices;
    bestMatchRuleId = matchResult.ruleId;
    bestMatchResultPriority = injection.priority;
    if (bestMatchRating === linePos) {
      break;
    }
  }
  if (bestMatchCaptureIndices) {
    return {
      priorityMatch: bestMatchResultPriority === -1,
      captureIndices: bestMatchCaptureIndices,
      matchedRuleId: bestMatchRuleId
    };
  }
  return null;
}
function prepareRuleSearch(rule, grammar, endRegexSource, allowA, allowG) {
  const ruleScanner = rule.compileAG(grammar, endRegexSource, allowA, allowG);
  return {
    ruleScanner,
    findOptions: 0
    /* None */
  };
}
function prepareRuleWhileSearch(rule, grammar, endRegexSource, allowA, allowG) {
  const ruleScanner = rule.compileWhileAG(grammar, endRegexSource, allowA, allowG);
  return {
    ruleScanner,
    findOptions: 0
    /* None */
  };
}
function handleCaptures(grammar, lineText, isFirstLine, stack, lineTokens, captures, captureIndices) {
  if (captures.length === 0) {
    return;
  }
  const lineTextContent = lineText.content;
  const len = Math.min(captures.length, captureIndices.length);
  const localStack = [];
  const maxEnd = captureIndices[0].end;
  for (let i = 0; i < len; i++) {
    const captureRule = captures[i];
    if (captureRule === null) {
      continue;
    }
    const captureIndex = captureIndices[i];
    if (captureIndex.length === 0) {
      continue;
    }
    if (captureIndex.start > maxEnd) {
      break;
    }
    while (localStack.length > 0 && localStack[localStack.length - 1].endPos <= captureIndex.start) {
      lineTokens.produceFromScopes(localStack[localStack.length - 1].scopes, localStack[localStack.length - 1].endPos);
      localStack.pop();
    }
    if (localStack.length > 0) {
      lineTokens.produceFromScopes(localStack[localStack.length - 1].scopes, captureIndex.start);
    } else {
      lineTokens.produce(stack, captureIndex.start);
    }
    if (captureRule.retokenizeCapturedWithRuleId) {
      const scopeName = captureRule.getName(lineTextContent, captureIndices);
      const nameScopesList = stack.contentNameScopesList.pushAttributed(scopeName, grammar);
      const contentName = captureRule.getContentName(lineTextContent, captureIndices);
      const contentNameScopesList = nameScopesList.pushAttributed(contentName, grammar);
      const stackClone = stack.push(captureRule.retokenizeCapturedWithRuleId, captureIndex.start, -1, false, null, nameScopesList, contentNameScopesList);
      const onigSubStr = grammar.createOnigString(lineTextContent.substring(0, captureIndex.end));
      _tokenizeString(
        grammar,
        onigSubStr,
        isFirstLine && captureIndex.start === 0,
        captureIndex.start,
        stackClone,
        lineTokens,
        false,
        /* no time limit */
        0
      );
      disposeOnigString(onigSubStr);
      continue;
    }
    const captureRuleScopeName = captureRule.getName(lineTextContent, captureIndices);
    if (captureRuleScopeName !== null) {
      const base = localStack.length > 0 ? localStack[localStack.length - 1].scopes : stack.contentNameScopesList;
      const captureRuleScopesList = base.pushAttributed(captureRuleScopeName, grammar);
      localStack.push(new LocalStackElement(captureRuleScopesList, captureIndex.end));
    }
  }
  while (localStack.length > 0) {
    lineTokens.produceFromScopes(localStack[localStack.length - 1].scopes, localStack[localStack.length - 1].endPos);
    localStack.pop();
  }
}
var LocalStackElement = class {
  constructor(scopes, endPos) {
    __publicField(this, "scopes");
    __publicField(this, "endPos");
    this.scopes = scopes;
    this.endPos = endPos;
  }
};
function createGrammar(scopeName, grammar, initialLanguage, embeddedLanguages, tokenTypes, balancedBracketSelectors, grammarRepository, onigLib) {
  return new Grammar(
    scopeName,
    grammar,
    initialLanguage,
    embeddedLanguages,
    tokenTypes,
    balancedBracketSelectors,
    grammarRepository,
    onigLib
  );
}
function collectInjections(result, selector, rule, ruleFactoryHelper, grammar) {
  const matchers = createMatchers(selector, nameMatcher);
  const ruleId = RuleFactory.getCompiledRuleId(rule, ruleFactoryHelper, grammar.repository);
  for (const matcher of matchers) {
    result.push({
      debugSelector: selector,
      matcher: matcher.matcher,
      ruleId,
      grammar,
      priority: matcher.priority
    });
  }
}
function nameMatcher(identifers, scopes) {
  if (scopes.length < identifers.length) {
    return false;
  }
  let lastIndex = 0;
  return identifers.every((identifier) => {
    for (let i = lastIndex; i < scopes.length; i++) {
      if (scopesAreMatching(scopes[i], identifier)) {
        lastIndex = i + 1;
        return true;
      }
    }
    return false;
  });
}
function scopesAreMatching(thisScopeName, scopeName) {
  if (!thisScopeName) {
    return false;
  }
  if (thisScopeName === scopeName) {
    return true;
  }
  const len = scopeName.length;
  return thisScopeName.length > len && thisScopeName.substr(0, len) === scopeName && thisScopeName[len] === ".";
}
var Grammar = class {
  constructor(_rootScopeName, grammar, initialLanguage, embeddedLanguages, tokenTypes, balancedBracketSelectors, grammarRepository, _onigLib) {
    __publicField(this, "_rootId");
    __publicField(this, "_lastRuleId");
    __publicField(this, "_ruleId2desc");
    __publicField(this, "_includedGrammars");
    __publicField(this, "_grammarRepository");
    __publicField(this, "_grammar");
    __publicField(this, "_injections");
    __publicField(this, "_basicScopeAttributesProvider");
    __publicField(this, "_tokenTypeMatchers");
    this._rootScopeName = _rootScopeName;
    this.balancedBracketSelectors = balancedBracketSelectors;
    this._onigLib = _onigLib;
    this._basicScopeAttributesProvider = new BasicScopeAttributesProvider(
      initialLanguage,
      embeddedLanguages
    );
    this._rootId = -1;
    this._lastRuleId = 0;
    this._ruleId2desc = [null];
    this._includedGrammars = {};
    this._grammarRepository = grammarRepository;
    this._grammar = initGrammar(grammar, null);
    this._injections = null;
    this._tokenTypeMatchers = [];
    if (tokenTypes) {
      for (const selector of Object.keys(tokenTypes)) {
        const matchers = createMatchers(selector, nameMatcher);
        for (const matcher of matchers) {
          this._tokenTypeMatchers.push({
            matcher: matcher.matcher,
            type: tokenTypes[selector]
          });
        }
      }
    }
  }
  get themeProvider() {
    return this._grammarRepository;
  }
  dispose() {
    for (const rule of this._ruleId2desc) {
      if (rule) {
        rule.dispose();
      }
    }
  }
  createOnigScanner(sources) {
    return this._onigLib.createOnigScanner(sources);
  }
  createOnigString(sources) {
    return this._onigLib.createOnigString(sources);
  }
  getMetadataForScope(scope) {
    return this._basicScopeAttributesProvider.getBasicScopeAttributes(scope);
  }
  _collectInjections() {
    const grammarRepository = {
      lookup: (scopeName2) => {
        if (scopeName2 === this._rootScopeName) {
          return this._grammar;
        }
        return this.getExternalGrammar(scopeName2);
      },
      injections: (scopeName2) => {
        return this._grammarRepository.injections(scopeName2);
      }
    };
    const result = [];
    const scopeName = this._rootScopeName;
    const grammar = grammarRepository.lookup(scopeName);
    if (grammar) {
      const rawInjections = grammar.injections;
      if (rawInjections) {
        for (let expression in rawInjections) {
          collectInjections(
            result,
            expression,
            rawInjections[expression],
            this,
            grammar
          );
        }
      }
      const injectionScopeNames = this._grammarRepository.injections(scopeName);
      if (injectionScopeNames) {
        injectionScopeNames.forEach((injectionScopeName) => {
          const injectionGrammar = this.getExternalGrammar(injectionScopeName);
          if (injectionGrammar) {
            const selector = injectionGrammar.injectionSelector;
            if (selector) {
              collectInjections(
                result,
                selector,
                injectionGrammar,
                this,
                injectionGrammar
              );
            }
          }
        });
      }
    }
    result.sort((i1, i2) => i1.priority - i2.priority);
    return result;
  }
  getInjections() {
    if (this._injections === null) {
      this._injections = this._collectInjections();
    }
    return this._injections;
  }
  registerRule(factory) {
    const id = ++this._lastRuleId;
    const result = factory(ruleIdFromNumber(id));
    this._ruleId2desc[id] = result;
    return result;
  }
  getRule(ruleId) {
    return this._ruleId2desc[ruleIdToNumber(ruleId)];
  }
  getExternalGrammar(scopeName, repository) {
    if (this._includedGrammars[scopeName]) {
      return this._includedGrammars[scopeName];
    } else if (this._grammarRepository) {
      const rawIncludedGrammar = this._grammarRepository.lookup(scopeName);
      if (rawIncludedGrammar) {
        this._includedGrammars[scopeName] = initGrammar(
          rawIncludedGrammar,
          repository && repository.$base
        );
        return this._includedGrammars[scopeName];
      }
    }
    return void 0;
  }
  tokenizeLine(lineText, prevState, timeLimit = 0) {
    const r = this._tokenize(lineText, prevState, false, timeLimit);
    return {
      tokens: r.lineTokens.getResult(r.ruleStack, r.lineLength),
      ruleStack: r.ruleStack,
      stoppedEarly: r.stoppedEarly
    };
  }
  tokenizeLine2(lineText, prevState, timeLimit = 0) {
    const r = this._tokenize(lineText, prevState, true, timeLimit);
    return {
      tokens: r.lineTokens.getBinaryResult(r.ruleStack, r.lineLength),
      ruleStack: r.ruleStack,
      stoppedEarly: r.stoppedEarly
    };
  }
  _tokenize(lineText, prevState, emitBinaryTokens, timeLimit) {
    if (this._rootId === -1) {
      this._rootId = RuleFactory.getCompiledRuleId(
        this._grammar.repository.$self,
        this,
        this._grammar.repository
      );
      this.getInjections();
    }
    let isFirstLine;
    if (!prevState || prevState === StateStackImpl.NULL) {
      isFirstLine = true;
      const rawDefaultMetadata = this._basicScopeAttributesProvider.getDefaultAttributes();
      const defaultStyle = this.themeProvider.getDefaults();
      const defaultMetadata = EncodedTokenMetadata.set(
        0,
        rawDefaultMetadata.languageId,
        rawDefaultMetadata.tokenType,
        null,
        defaultStyle.fontStyle,
        defaultStyle.foregroundId,
        defaultStyle.backgroundId
      );
      const rootScopeName = this.getRule(this._rootId).getName(
        null,
        null
      );
      let scopeList;
      if (rootScopeName) {
        scopeList = AttributedScopeStack.createRootAndLookUpScopeName(
          rootScopeName,
          defaultMetadata,
          this
        );
      } else {
        scopeList = AttributedScopeStack.createRoot(
          "unknown",
          defaultMetadata
        );
      }
      prevState = new StateStackImpl(
        null,
        this._rootId,
        -1,
        -1,
        false,
        null,
        scopeList,
        scopeList
      );
    } else {
      isFirstLine = false;
      prevState.reset();
    }
    lineText = lineText + "\n";
    const onigLineText = this.createOnigString(lineText);
    const lineLength = onigLineText.content.length;
    const lineTokens = new LineTokens(
      emitBinaryTokens,
      lineText,
      this._tokenTypeMatchers,
      this.balancedBracketSelectors
    );
    const r = _tokenizeString(
      this,
      onigLineText,
      isFirstLine,
      0,
      prevState,
      lineTokens,
      true,
      timeLimit
    );
    disposeOnigString(onigLineText);
    return {
      lineLength,
      lineTokens,
      ruleStack: r.stack,
      stoppedEarly: r.stoppedEarly
    };
  }
};
function initGrammar(grammar, base) {
  grammar = clone(grammar);
  grammar.repository = grammar.repository || {};
  grammar.repository.$self = {
    $vscodeTextmateLocation: grammar.$vscodeTextmateLocation,
    patterns: grammar.patterns,
    name: grammar.scopeName
  };
  grammar.repository.$base = base || grammar.repository.$self;
  return grammar;
}
var AttributedScopeStack = class _AttributedScopeStack {
  /**
   * Invariant:
   * ```
   * if (parent && !scopePath.extends(parent.scopePath)) {
   * 	throw new Error();
   * }
   * ```
   */
  constructor(parent, scopePath, tokenAttributes) {
    this.parent = parent;
    this.scopePath = scopePath;
    this.tokenAttributes = tokenAttributes;
  }
  static fromExtension(namesScopeList, contentNameScopesList) {
    let current = namesScopeList;
    let scopeNames = (namesScopeList == null ? void 0 : namesScopeList.scopePath) ?? null;
    for (const frame of contentNameScopesList) {
      scopeNames = ScopeStack.push(scopeNames, frame.scopeNames);
      current = new _AttributedScopeStack(current, scopeNames, frame.encodedTokenAttributes);
    }
    return current;
  }
  static createRoot(scopeName, tokenAttributes) {
    return new _AttributedScopeStack(null, new ScopeStack(null, scopeName), tokenAttributes);
  }
  static createRootAndLookUpScopeName(scopeName, tokenAttributes, grammar) {
    const rawRootMetadata = grammar.getMetadataForScope(scopeName);
    const scopePath = new ScopeStack(null, scopeName);
    const rootStyle = grammar.themeProvider.themeMatch(scopePath);
    const resolvedTokenAttributes = _AttributedScopeStack.mergeAttributes(
      tokenAttributes,
      rawRootMetadata,
      rootStyle
    );
    return new _AttributedScopeStack(null, scopePath, resolvedTokenAttributes);
  }
  get scopeName() {
    return this.scopePath.scopeName;
  }
  toString() {
    return this.getScopeNames().join(" ");
  }
  equals(other) {
    return _AttributedScopeStack.equals(this, other);
  }
  static equals(a, b) {
    do {
      if (a === b) {
        return true;
      }
      if (!a && !b) {
        return true;
      }
      if (!a || !b) {
        return false;
      }
      if (a.scopeName !== b.scopeName || a.tokenAttributes !== b.tokenAttributes) {
        return false;
      }
      a = a.parent;
      b = b.parent;
    } while (true);
  }
  static mergeAttributes(existingTokenAttributes, basicScopeAttributes, styleAttributes) {
    let fontStyle = -1;
    let foreground = 0;
    let background = 0;
    if (styleAttributes !== null) {
      fontStyle = styleAttributes.fontStyle;
      foreground = styleAttributes.foregroundId;
      background = styleAttributes.backgroundId;
    }
    return EncodedTokenMetadata.set(
      existingTokenAttributes,
      basicScopeAttributes.languageId,
      basicScopeAttributes.tokenType,
      null,
      fontStyle,
      foreground,
      background
    );
  }
  pushAttributed(scopePath, grammar) {
    if (scopePath === null) {
      return this;
    }
    if (scopePath.indexOf(" ") === -1) {
      return _AttributedScopeStack._pushAttributed(this, scopePath, grammar);
    }
    const scopes = scopePath.split(/ /g);
    let result = this;
    for (const scope of scopes) {
      result = _AttributedScopeStack._pushAttributed(result, scope, grammar);
    }
    return result;
  }
  static _pushAttributed(target, scopeName, grammar) {
    const rawMetadata = grammar.getMetadataForScope(scopeName);
    const newPath = target.scopePath.push(scopeName);
    const scopeThemeMatchResult = grammar.themeProvider.themeMatch(newPath);
    const metadata = _AttributedScopeStack.mergeAttributes(
      target.tokenAttributes,
      rawMetadata,
      scopeThemeMatchResult
    );
    return new _AttributedScopeStack(target, newPath, metadata);
  }
  getScopeNames() {
    return this.scopePath.getSegments();
  }
  getExtensionIfDefined(base) {
    var _a2;
    const result = [];
    let self = this;
    while (self && self !== base) {
      result.push({
        encodedTokenAttributes: self.tokenAttributes,
        scopeNames: self.scopePath.getExtensionIfDefined(((_a2 = self.parent) == null ? void 0 : _a2.scopePath) ?? null)
      });
      self = self.parent;
    }
    return self === base ? result.reverse() : void 0;
  }
};
var StateStackImpl = (_b = class {
  /**
   * Invariant:
   * ```
   * if (contentNameScopesList !== nameScopesList && contentNameScopesList?.parent !== nameScopesList) {
   * 	throw new Error();
   * }
   * if (this.parent && !nameScopesList.extends(this.parent.contentNameScopesList)) {
   * 	throw new Error();
   * }
   * ```
   */
  constructor(parent, ruleId, enterPos, anchorPos, beginRuleCapturedEOL, endRule, nameScopesList, contentNameScopesList) {
    __publicField(this, "_stackElementBrand");
    /**
     * The position on the current line where this state was pushed.
     * This is relevant only while tokenizing a line, to detect endless loops.
     * Its value is meaningless across lines.
     */
    __publicField(this, "_enterPos");
    /**
     * The captured anchor position when this stack element was pushed.
     * This is relevant only while tokenizing a line, to restore the anchor position when popping.
     * Its value is meaningless across lines.
     */
    __publicField(this, "_anchorPos");
    /**
     * The depth of the stack.
     */
    __publicField(this, "depth");
    this.parent = parent;
    this.ruleId = ruleId;
    this.beginRuleCapturedEOL = beginRuleCapturedEOL;
    this.endRule = endRule;
    this.nameScopesList = nameScopesList;
    this.contentNameScopesList = contentNameScopesList;
    this.depth = this.parent ? this.parent.depth + 1 : 1;
    this._enterPos = enterPos;
    this._anchorPos = anchorPos;
  }
  equals(other) {
    if (other === null) {
      return false;
    }
    return _b._equals(this, other);
  }
  static _equals(a, b) {
    if (a === b) {
      return true;
    }
    if (!this._structuralEquals(a, b)) {
      return false;
    }
    return AttributedScopeStack.equals(a.contentNameScopesList, b.contentNameScopesList);
  }
  /**
   * A structural equals check. Does not take into account `scopes`.
   */
  static _structuralEquals(a, b) {
    do {
      if (a === b) {
        return true;
      }
      if (!a && !b) {
        return true;
      }
      if (!a || !b) {
        return false;
      }
      if (a.depth !== b.depth || a.ruleId !== b.ruleId || a.endRule !== b.endRule) {
        return false;
      }
      a = a.parent;
      b = b.parent;
    } while (true);
  }
  clone() {
    return this;
  }
  static _reset(el) {
    while (el) {
      el._enterPos = -1;
      el._anchorPos = -1;
      el = el.parent;
    }
  }
  reset() {
    _b._reset(this);
  }
  pop() {
    return this.parent;
  }
  safePop() {
    if (this.parent) {
      return this.parent;
    }
    return this;
  }
  push(ruleId, enterPos, anchorPos, beginRuleCapturedEOL, endRule, nameScopesList, contentNameScopesList) {
    return new _b(
      this,
      ruleId,
      enterPos,
      anchorPos,
      beginRuleCapturedEOL,
      endRule,
      nameScopesList,
      contentNameScopesList
    );
  }
  getEnterPos() {
    return this._enterPos;
  }
  getAnchorPos() {
    return this._anchorPos;
  }
  getRule(grammar) {
    return grammar.getRule(this.ruleId);
  }
  toString() {
    const r = [];
    this._writeString(r, 0);
    return "[" + r.join(",") + "]";
  }
  _writeString(res, outIndex) {
    var _a2, _b2;
    if (this.parent) {
      outIndex = this.parent._writeString(res, outIndex);
    }
    res[outIndex++] = `(${this.ruleId}, ${(_a2 = this.nameScopesList) == null ? void 0 : _a2.toString()}, ${(_b2 = this.contentNameScopesList) == null ? void 0 : _b2.toString()})`;
    return outIndex;
  }
  withContentNameScopesList(contentNameScopeStack) {
    if (this.contentNameScopesList === contentNameScopeStack) {
      return this;
    }
    return this.parent.push(
      this.ruleId,
      this._enterPos,
      this._anchorPos,
      this.beginRuleCapturedEOL,
      this.endRule,
      this.nameScopesList,
      contentNameScopeStack
    );
  }
  withEndRule(endRule) {
    if (this.endRule === endRule) {
      return this;
    }
    return new _b(
      this.parent,
      this.ruleId,
      this._enterPos,
      this._anchorPos,
      this.beginRuleCapturedEOL,
      endRule,
      this.nameScopesList,
      this.contentNameScopesList
    );
  }
  // Used to warn of endless loops
  hasSameRuleAs(other) {
    let el = this;
    while (el && el._enterPos === other._enterPos) {
      if (el.ruleId === other.ruleId) {
        return true;
      }
      el = el.parent;
    }
    return false;
  }
  toStateStackFrame() {
    var _a2, _b2, _c;
    return {
      ruleId: ruleIdToNumber(this.ruleId),
      beginRuleCapturedEOL: this.beginRuleCapturedEOL,
      endRule: this.endRule,
      nameScopesList: ((_b2 = this.nameScopesList) == null ? void 0 : _b2.getExtensionIfDefined(((_a2 = this.parent) == null ? void 0 : _a2.nameScopesList) ?? null)) ?? [],
      contentNameScopesList: ((_c = this.contentNameScopesList) == null ? void 0 : _c.getExtensionIfDefined(this.nameScopesList)) ?? []
    };
  }
  static pushFrame(self, frame) {
    const namesScopeList = AttributedScopeStack.fromExtension((self == null ? void 0 : self.nameScopesList) ?? null, frame.nameScopesList);
    return new _b(
      self,
      ruleIdFromNumber(frame.ruleId),
      frame.enterPos ?? -1,
      frame.anchorPos ?? -1,
      frame.beginRuleCapturedEOL,
      frame.endRule,
      namesScopeList,
      AttributedScopeStack.fromExtension(namesScopeList, frame.contentNameScopesList)
    );
  }
}, // TODO remove me
__publicField(_b, "NULL", new _b(
  null,
  0,
  0,
  0,
  false,
  null,
  null,
  null
)), _b);
var BalancedBracketSelectors = class {
  constructor(balancedBracketScopes, unbalancedBracketScopes) {
    __publicField(this, "balancedBracketScopes");
    __publicField(this, "unbalancedBracketScopes");
    __publicField(this, "allowAny", false);
    this.balancedBracketScopes = balancedBracketScopes.flatMap(
      (selector) => {
        if (selector === "*") {
          this.allowAny = true;
          return [];
        }
        return createMatchers(selector, nameMatcher).map((m) => m.matcher);
      }
    );
    this.unbalancedBracketScopes = unbalancedBracketScopes.flatMap(
      (selector) => createMatchers(selector, nameMatcher).map((m) => m.matcher)
    );
  }
  get matchesAlways() {
    return this.allowAny && this.unbalancedBracketScopes.length === 0;
  }
  get matchesNever() {
    return this.balancedBracketScopes.length === 0 && !this.allowAny;
  }
  match(scopes) {
    for (const excluder of this.unbalancedBracketScopes) {
      if (excluder(scopes)) {
        return false;
      }
    }
    for (const includer of this.balancedBracketScopes) {
      if (includer(scopes)) {
        return true;
      }
    }
    return this.allowAny;
  }
};
var LineTokens = class {
  constructor(emitBinaryTokens, lineText, tokenTypeOverrides, balancedBracketSelectors) {
    __publicField(this, "_emitBinaryTokens");
    /**
     * defined only if `false`.
     */
    __publicField(this, "_lineText");
    /**
     * used only if `_emitBinaryTokens` is false.
     */
    __publicField(this, "_tokens");
    /**
     * used only if `_emitBinaryTokens` is true.
     */
    __publicField(this, "_binaryTokens");
    __publicField(this, "_lastTokenEndIndex");
    __publicField(this, "_tokenTypeOverrides");
    this.balancedBracketSelectors = balancedBracketSelectors;
    this._emitBinaryTokens = emitBinaryTokens;
    this._tokenTypeOverrides = tokenTypeOverrides;
    {
      this._lineText = null;
    }
    this._tokens = [];
    this._binaryTokens = [];
    this._lastTokenEndIndex = 0;
  }
  produce(stack, endIndex) {
    this.produceFromScopes(stack.contentNameScopesList, endIndex);
  }
  produceFromScopes(scopesList, endIndex) {
    var _a2;
    if (this._lastTokenEndIndex >= endIndex) {
      return;
    }
    if (this._emitBinaryTokens) {
      let metadata = (scopesList == null ? void 0 : scopesList.tokenAttributes) ?? 0;
      let containsBalancedBrackets = false;
      if ((_a2 = this.balancedBracketSelectors) == null ? void 0 : _a2.matchesAlways) {
        containsBalancedBrackets = true;
      }
      if (this._tokenTypeOverrides.length > 0 || this.balancedBracketSelectors && !this.balancedBracketSelectors.matchesAlways && !this.balancedBracketSelectors.matchesNever) {
        const scopes2 = (scopesList == null ? void 0 : scopesList.getScopeNames()) ?? [];
        for (const tokenType of this._tokenTypeOverrides) {
          if (tokenType.matcher(scopes2)) {
            metadata = EncodedTokenMetadata.set(
              metadata,
              0,
              toOptionalTokenType(tokenType.type),
              null,
              -1,
              0,
              0
            );
          }
        }
        if (this.balancedBracketSelectors) {
          containsBalancedBrackets = this.balancedBracketSelectors.match(scopes2);
        }
      }
      if (containsBalancedBrackets) {
        metadata = EncodedTokenMetadata.set(
          metadata,
          0,
          8,
          containsBalancedBrackets,
          -1,
          0,
          0
        );
      }
      if (this._binaryTokens.length > 0 && this._binaryTokens[this._binaryTokens.length - 1] === metadata) {
        this._lastTokenEndIndex = endIndex;
        return;
      }
      this._binaryTokens.push(this._lastTokenEndIndex);
      this._binaryTokens.push(metadata);
      this._lastTokenEndIndex = endIndex;
      return;
    }
    const scopes = (scopesList == null ? void 0 : scopesList.getScopeNames()) ?? [];
    this._tokens.push({
      startIndex: this._lastTokenEndIndex,
      endIndex,
      // value: lineText.substring(lastTokenEndIndex, endIndex),
      scopes
    });
    this._lastTokenEndIndex = endIndex;
  }
  getResult(stack, lineLength) {
    if (this._tokens.length > 0 && this._tokens[this._tokens.length - 1].startIndex === lineLength - 1) {
      this._tokens.pop();
    }
    if (this._tokens.length === 0) {
      this._lastTokenEndIndex = -1;
      this.produce(stack, lineLength);
      this._tokens[this._tokens.length - 1].startIndex = 0;
    }
    return this._tokens;
  }
  getBinaryResult(stack, lineLength) {
    if (this._binaryTokens.length > 0 && this._binaryTokens[this._binaryTokens.length - 2] === lineLength - 1) {
      this._binaryTokens.pop();
      this._binaryTokens.pop();
    }
    if (this._binaryTokens.length === 0) {
      this._lastTokenEndIndex = -1;
      this.produce(stack, lineLength);
      this._binaryTokens[this._binaryTokens.length - 2] = 0;
    }
    const result = new Uint32Array(this._binaryTokens.length);
    for (let i = 0, len = this._binaryTokens.length; i < len; i++) {
      result[i] = this._binaryTokens[i];
    }
    return result;
  }
};
var SyncRegistry = class {
  constructor(theme, _onigLib) {
    __publicField(this, "_grammars", /* @__PURE__ */ new Map());
    __publicField(this, "_rawGrammars", /* @__PURE__ */ new Map());
    __publicField(this, "_injectionGrammars", /* @__PURE__ */ new Map());
    __publicField(this, "_theme");
    this._onigLib = _onigLib;
    this._theme = theme;
  }
  dispose() {
    for (const grammar of this._grammars.values()) {
      grammar.dispose();
    }
  }
  setTheme(theme) {
    this._theme = theme;
  }
  getColorMap() {
    return this._theme.getColorMap();
  }
  /**
   * Add `grammar` to registry and return a list of referenced scope names
   */
  addGrammar(grammar, injectionScopeNames) {
    this._rawGrammars.set(grammar.scopeName, grammar);
    if (injectionScopeNames) {
      this._injectionGrammars.set(grammar.scopeName, injectionScopeNames);
    }
  }
  /**
   * Lookup a raw grammar.
   */
  lookup(scopeName) {
    return this._rawGrammars.get(scopeName);
  }
  /**
   * Returns the injections for the given grammar
   */
  injections(targetScope) {
    return this._injectionGrammars.get(targetScope);
  }
  /**
   * Get the default theme settings
   */
  getDefaults() {
    return this._theme.getDefaults();
  }
  /**
   * Match a scope in the theme.
   */
  themeMatch(scopePath) {
    return this._theme.match(scopePath);
  }
  /**
   * Lookup a grammar.
   */
  grammarForScopeName(scopeName, initialLanguage, embeddedLanguages, tokenTypes, balancedBracketSelectors) {
    if (!this._grammars.has(scopeName)) {
      let rawGrammar = this._rawGrammars.get(scopeName);
      if (!rawGrammar) {
        return null;
      }
      this._grammars.set(scopeName, createGrammar(
        scopeName,
        rawGrammar,
        initialLanguage,
        embeddedLanguages,
        tokenTypes,
        balancedBracketSelectors,
        this,
        this._onigLib
      ));
    }
    return this._grammars.get(scopeName);
  }
};
var Registry$1 = class Registry {
  constructor(options) {
    __publicField(this, "_options");
    __publicField(this, "_syncRegistry");
    __publicField(this, "_ensureGrammarCache");
    this._options = options;
    this._syncRegistry = new SyncRegistry(
      Theme.createFromRawTheme(options.theme, options.colorMap),
      options.onigLib
    );
    this._ensureGrammarCache = /* @__PURE__ */ new Map();
  }
  dispose() {
    this._syncRegistry.dispose();
  }
  /**
   * Change the theme. Once called, no previous `ruleStack` should be used anymore.
   */
  setTheme(theme, colorMap) {
    this._syncRegistry.setTheme(Theme.createFromRawTheme(theme, colorMap));
  }
  /**
   * Returns a lookup array for color ids.
   */
  getColorMap() {
    return this._syncRegistry.getColorMap();
  }
  /**
   * Load the grammar for `scopeName` and all referenced included grammars asynchronously.
   * Please do not use language id 0.
   */
  loadGrammarWithEmbeddedLanguages(initialScopeName, initialLanguage, embeddedLanguages) {
    return this.loadGrammarWithConfiguration(initialScopeName, initialLanguage, { embeddedLanguages });
  }
  /**
   * Load the grammar for `scopeName` and all referenced included grammars asynchronously.
   * Please do not use language id 0.
   */
  loadGrammarWithConfiguration(initialScopeName, initialLanguage, configuration) {
    return this._loadGrammar(
      initialScopeName,
      initialLanguage,
      configuration.embeddedLanguages,
      configuration.tokenTypes,
      new BalancedBracketSelectors(
        configuration.balancedBracketSelectors || [],
        configuration.unbalancedBracketSelectors || []
      )
    );
  }
  /**
   * Load the grammar for `scopeName` and all referenced included grammars asynchronously.
   */
  loadGrammar(initialScopeName) {
    return this._loadGrammar(initialScopeName, 0, null, null, null);
  }
  _loadGrammar(initialScopeName, initialLanguage, embeddedLanguages, tokenTypes, balancedBracketSelectors) {
    const dependencyProcessor = new ScopeDependencyProcessor(this._syncRegistry, initialScopeName);
    while (dependencyProcessor.Q.length > 0) {
      dependencyProcessor.Q.map((request) => this._loadSingleGrammar(request.scopeName));
      dependencyProcessor.processQueue();
    }
    return this._grammarForScopeName(
      initialScopeName,
      initialLanguage,
      embeddedLanguages,
      tokenTypes,
      balancedBracketSelectors
    );
  }
  _loadSingleGrammar(scopeName) {
    if (!this._ensureGrammarCache.has(scopeName)) {
      this._doLoadSingleGrammar(scopeName);
      this._ensureGrammarCache.set(scopeName, true);
    }
  }
  _doLoadSingleGrammar(scopeName) {
    const grammar = this._options.loadGrammar(scopeName);
    if (grammar) {
      const injections = typeof this._options.getInjections === "function" ? this._options.getInjections(scopeName) : void 0;
      this._syncRegistry.addGrammar(grammar, injections);
    }
  }
  /**
   * Adds a rawGrammar.
   */
  addGrammar(rawGrammar, injections = [], initialLanguage = 0, embeddedLanguages = null) {
    this._syncRegistry.addGrammar(rawGrammar, injections);
    return this._grammarForScopeName(rawGrammar.scopeName, initialLanguage, embeddedLanguages);
  }
  /**
   * Get the grammar for `scopeName`. The grammar must first be created via `loadGrammar` or `addGrammar`.
   */
  _grammarForScopeName(scopeName, initialLanguage = 0, embeddedLanguages = null, tokenTypes = null, balancedBracketSelectors = null) {
    return this._syncRegistry.grammarForScopeName(
      scopeName,
      initialLanguage,
      embeddedLanguages,
      tokenTypes,
      balancedBracketSelectors
    );
  }
};
var INITIAL = StateStackImpl.NULL;
const htmlVoidElements = [
  "area",
  "base",
  "basefont",
  "bgsound",
  "br",
  "col",
  "command",
  "embed",
  "frame",
  "hr",
  "image",
  "img",
  "input",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
];
class Schema {
  /**
   * @param {SchemaType['property']} property
   *   Property.
   * @param {SchemaType['normal']} normal
   *   Normal.
   * @param {Space | undefined} [space]
   *   Space.
   * @returns
   *   Schema.
   */
  constructor(property, normal, space) {
    this.normal = normal;
    this.property = property;
    if (space) {
      this.space = space;
    }
  }
}
Schema.prototype.normal = {};
Schema.prototype.property = {};
Schema.prototype.space = void 0;
function merge$1(definitions, space) {
  const property = {};
  const normal = {};
  for (const definition of definitions) {
    Object.assign(property, definition.property);
    Object.assign(normal, definition.normal);
  }
  return new Schema(property, normal, space);
}
function normalize(value) {
  return value.toLowerCase();
}
class Info {
  /**
   * @param {string} property
   *   Property.
   * @param {string} attribute
   *   Attribute.
   * @returns
   *   Info.
   */
  constructor(property, attribute) {
    this.attribute = attribute;
    this.property = property;
  }
}
Info.prototype.attribute = "";
Info.prototype.booleanish = false;
Info.prototype.boolean = false;
Info.prototype.commaOrSpaceSeparated = false;
Info.prototype.commaSeparated = false;
Info.prototype.defined = false;
Info.prototype.mustUseProperty = false;
Info.prototype.number = false;
Info.prototype.overloadedBoolean = false;
Info.prototype.property = "";
Info.prototype.spaceSeparated = false;
Info.prototype.space = void 0;
let powers = 0;
const boolean = increment();
const booleanish = increment();
const overloadedBoolean = increment();
const number = increment();
const spaceSeparated = increment();
const commaSeparated = increment();
const commaOrSpaceSeparated = increment();
function increment() {
  return 2 ** ++powers;
}
const types = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean,
  booleanish,
  commaOrSpaceSeparated,
  commaSeparated,
  number,
  overloadedBoolean,
  spaceSeparated
}, Symbol.toStringTag, { value: "Module" }));
const checks = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(types)
);
class DefinedInfo extends Info {
  /**
   * @constructor
   * @param {string} property
   *   Property.
   * @param {string} attribute
   *   Attribute.
   * @param {number | null | undefined} [mask]
   *   Mask.
   * @param {Space | undefined} [space]
   *   Space.
   * @returns
   *   Info.
   */
  constructor(property, attribute, mask, space) {
    let index2 = -1;
    super(property, attribute);
    mark(this, "space", space);
    if (typeof mask === "number") {
      while (++index2 < checks.length) {
        const check = checks[index2];
        mark(this, checks[index2], (mask & types[check]) === types[check]);
      }
    }
  }
}
DefinedInfo.prototype.defined = true;
function mark(values, key2, value) {
  if (value) {
    values[key2] = value;
  }
}
function create(definition) {
  const properties = {};
  const normals = {};
  for (const [property, value] of Object.entries(definition.properties)) {
    const info = new DefinedInfo(
      property,
      definition.transform(definition.attributes || {}, property),
      value,
      definition.space
    );
    if (definition.mustUseProperty && definition.mustUseProperty.includes(property)) {
      info.mustUseProperty = true;
    }
    properties[property] = info;
    normals[normalize(property)] = property;
    normals[normalize(info.attribute)] = property;
  }
  return new Schema(properties, normals, definition.space);
}
const aria = create({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: booleanish,
    ariaAutoComplete: null,
    ariaBusy: booleanish,
    ariaChecked: booleanish,
    ariaColCount: number,
    ariaColIndex: number,
    ariaColSpan: number,
    ariaControls: spaceSeparated,
    ariaCurrent: null,
    ariaDescribedBy: spaceSeparated,
    ariaDetails: null,
    ariaDisabled: booleanish,
    ariaDropEffect: spaceSeparated,
    ariaErrorMessage: null,
    ariaExpanded: booleanish,
    ariaFlowTo: spaceSeparated,
    ariaGrabbed: booleanish,
    ariaHasPopup: null,
    ariaHidden: booleanish,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: spaceSeparated,
    ariaLevel: number,
    ariaLive: null,
    ariaModal: booleanish,
    ariaMultiLine: booleanish,
    ariaMultiSelectable: booleanish,
    ariaOrientation: null,
    ariaOwns: spaceSeparated,
    ariaPlaceholder: null,
    ariaPosInSet: number,
    ariaPressed: booleanish,
    ariaReadOnly: booleanish,
    ariaRelevant: null,
    ariaRequired: booleanish,
    ariaRoleDescription: spaceSeparated,
    ariaRowCount: number,
    ariaRowIndex: number,
    ariaRowSpan: number,
    ariaSelected: booleanish,
    ariaSetSize: number,
    ariaSort: null,
    ariaValueMax: number,
    ariaValueMin: number,
    ariaValueNow: number,
    ariaValueText: null,
    role: null
  },
  transform(_, property) {
    return property === "role" ? property : "aria-" + property.slice(4).toLowerCase();
  }
});
function caseSensitiveTransform(attributes, attribute) {
  return attribute in attributes ? attributes[attribute] : attribute;
}
function caseInsensitiveTransform(attributes, property) {
  return caseSensitiveTransform(attributes, property.toLowerCase());
}
const html$3 = create({
  attributes: {
    acceptcharset: "accept-charset",
    classname: "class",
    htmlfor: "for",
    httpequiv: "http-equiv"
  },
  mustUseProperty: ["checked", "multiple", "muted", "selected"],
  properties: {
    // Standard Properties.
    abbr: null,
    accept: commaSeparated,
    acceptCharset: spaceSeparated,
    accessKey: spaceSeparated,
    action: null,
    allow: null,
    allowFullScreen: boolean,
    allowPaymentRequest: boolean,
    allowUserMedia: boolean,
    alt: null,
    as: null,
    async: boolean,
    autoCapitalize: null,
    autoComplete: spaceSeparated,
    autoFocus: boolean,
    autoPlay: boolean,
    blocking: spaceSeparated,
    capture: null,
    charSet: null,
    checked: boolean,
    cite: null,
    className: spaceSeparated,
    cols: number,
    colSpan: null,
    content: null,
    contentEditable: booleanish,
    controls: boolean,
    controlsList: spaceSeparated,
    coords: number | commaSeparated,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: boolean,
    defer: boolean,
    dir: null,
    dirName: null,
    disabled: boolean,
    download: overloadedBoolean,
    draggable: booleanish,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: boolean,
    formTarget: null,
    headers: spaceSeparated,
    height: number,
    hidden: overloadedBoolean,
    high: number,
    href: null,
    hrefLang: null,
    htmlFor: spaceSeparated,
    httpEquiv: spaceSeparated,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: boolean,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: boolean,
    itemId: null,
    itemProp: spaceSeparated,
    itemRef: spaceSeparated,
    itemScope: boolean,
    itemType: spaceSeparated,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: boolean,
    low: number,
    manifest: null,
    max: null,
    maxLength: number,
    media: null,
    method: null,
    min: null,
    minLength: number,
    multiple: boolean,
    muted: boolean,
    name: null,
    nonce: null,
    noModule: boolean,
    noValidate: boolean,
    onAbort: null,
    onAfterPrint: null,
    onAuxClick: null,
    onBeforeMatch: null,
    onBeforePrint: null,
    onBeforeToggle: null,
    onBeforeUnload: null,
    onBlur: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onContextLost: null,
    onContextMenu: null,
    onContextRestored: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFormData: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLanguageChange: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadEnd: null,
    onLoadStart: null,
    onMessage: null,
    onMessageError: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRejectionHandled: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onScrollEnd: null,
    onSecurityPolicyViolation: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onSlotChange: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnhandledRejection: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onWheel: null,
    open: boolean,
    optimum: number,
    pattern: null,
    ping: spaceSeparated,
    placeholder: null,
    playsInline: boolean,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: boolean,
    referrerPolicy: null,
    rel: spaceSeparated,
    required: boolean,
    reversed: boolean,
    rows: number,
    rowSpan: number,
    sandbox: spaceSeparated,
    scope: null,
    scoped: boolean,
    seamless: boolean,
    selected: boolean,
    shadowRootClonable: boolean,
    shadowRootDelegatesFocus: boolean,
    shadowRootMode: null,
    shape: null,
    size: number,
    sizes: null,
    slot: null,
    span: number,
    spellCheck: booleanish,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: number,
    step: null,
    style: null,
    tabIndex: number,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: boolean,
    useMap: null,
    value: booleanish,
    width: number,
    wrap: null,
    writingSuggestions: null,
    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null,
    // Several. Use CSS `text-align` instead,
    aLink: null,
    // `<body>`. Use CSS `a:active {color}` instead
    archive: spaceSeparated,
    // `<object>`. List of URIs to archives
    axis: null,
    // `<td>` and `<th>`. Use `scope` on `<th>`
    background: null,
    // `<body>`. Use CSS `background-image` instead
    bgColor: null,
    // `<body>` and table elements. Use CSS `background-color` instead
    border: number,
    // `<table>`. Use CSS `border-width` instead,
    borderColor: null,
    // `<table>`. Use CSS `border-color` instead,
    bottomMargin: number,
    // `<body>`
    cellPadding: null,
    // `<table>`
    cellSpacing: null,
    // `<table>`
    char: null,
    // Several table elements. When `align=char`, sets the character to align on
    charOff: null,
    // Several table elements. When `char`, offsets the alignment
    classId: null,
    // `<object>`
    clear: null,
    // `<br>`. Use CSS `clear` instead
    code: null,
    // `<object>`
    codeBase: null,
    // `<object>`
    codeType: null,
    // `<object>`
    color: null,
    // `<font>` and `<hr>`. Use CSS instead
    compact: boolean,
    // Lists. Use CSS to reduce space between items instead
    declare: boolean,
    // `<object>`
    event: null,
    // `<script>`
    face: null,
    // `<font>`. Use CSS instead
    frame: null,
    // `<table>`
    frameBorder: null,
    // `<iframe>`. Use CSS `border` instead
    hSpace: number,
    // `<img>` and `<object>`
    leftMargin: number,
    // `<body>`
    link: null,
    // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null,
    // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null,
    // `<img>`. Use a `<picture>`
    marginHeight: number,
    // `<body>`
    marginWidth: number,
    // `<body>`
    noResize: boolean,
    // `<frame>`
    noHref: boolean,
    // `<area>`. Use no href instead of an explicit `nohref`
    noShade: boolean,
    // `<hr>`. Use background-color and height instead of borders
    noWrap: boolean,
    // `<td>` and `<th>`
    object: null,
    // `<applet>`
    profile: null,
    // `<head>`
    prompt: null,
    // `<isindex>`
    rev: null,
    // `<link>`
    rightMargin: number,
    // `<body>`
    rules: null,
    // `<table>`
    scheme: null,
    // `<meta>`
    scrolling: booleanish,
    // `<frame>`. Use overflow in the child context
    standby: null,
    // `<object>`
    summary: null,
    // `<table>`
    text: null,
    // `<body>`. Use CSS `color` instead
    topMargin: number,
    // `<body>`
    valueType: null,
    // `<param>`
    version: null,
    // `<html>`. Use a doctype.
    vAlign: null,
    // Several. Use CSS `vertical-align` instead
    vLink: null,
    // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: number,
    // `<img>` and `<object>`
    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    disablePictureInPicture: boolean,
    disableRemotePlayback: boolean,
    prefix: null,
    property: null,
    results: number,
    security: null,
    unselectable: null
  },
  space: "html",
  transform: caseInsensitiveTransform
});
const svg$1 = create({
  attributes: {
    accentHeight: "accent-height",
    alignmentBaseline: "alignment-baseline",
    arabicForm: "arabic-form",
    baselineShift: "baseline-shift",
    capHeight: "cap-height",
    className: "class",
    clipPath: "clip-path",
    clipRule: "clip-rule",
    colorInterpolation: "color-interpolation",
    colorInterpolationFilters: "color-interpolation-filters",
    colorProfile: "color-profile",
    colorRendering: "color-rendering",
    crossOrigin: "crossorigin",
    dataType: "datatype",
    dominantBaseline: "dominant-baseline",
    enableBackground: "enable-background",
    fillOpacity: "fill-opacity",
    fillRule: "fill-rule",
    floodColor: "flood-color",
    floodOpacity: "flood-opacity",
    fontFamily: "font-family",
    fontSize: "font-size",
    fontSizeAdjust: "font-size-adjust",
    fontStretch: "font-stretch",
    fontStyle: "font-style",
    fontVariant: "font-variant",
    fontWeight: "font-weight",
    glyphName: "glyph-name",
    glyphOrientationHorizontal: "glyph-orientation-horizontal",
    glyphOrientationVertical: "glyph-orientation-vertical",
    hrefLang: "hreflang",
    horizAdvX: "horiz-adv-x",
    horizOriginX: "horiz-origin-x",
    horizOriginY: "horiz-origin-y",
    imageRendering: "image-rendering",
    letterSpacing: "letter-spacing",
    lightingColor: "lighting-color",
    markerEnd: "marker-end",
    markerMid: "marker-mid",
    markerStart: "marker-start",
    navDown: "nav-down",
    navDownLeft: "nav-down-left",
    navDownRight: "nav-down-right",
    navLeft: "nav-left",
    navNext: "nav-next",
    navPrev: "nav-prev",
    navRight: "nav-right",
    navUp: "nav-up",
    navUpLeft: "nav-up-left",
    navUpRight: "nav-up-right",
    onAbort: "onabort",
    onActivate: "onactivate",
    onAfterPrint: "onafterprint",
    onBeforePrint: "onbeforeprint",
    onBegin: "onbegin",
    onCancel: "oncancel",
    onCanPlay: "oncanplay",
    onCanPlayThrough: "oncanplaythrough",
    onChange: "onchange",
    onClick: "onclick",
    onClose: "onclose",
    onCopy: "oncopy",
    onCueChange: "oncuechange",
    onCut: "oncut",
    onDblClick: "ondblclick",
    onDrag: "ondrag",
    onDragEnd: "ondragend",
    onDragEnter: "ondragenter",
    onDragExit: "ondragexit",
    onDragLeave: "ondragleave",
    onDragOver: "ondragover",
    onDragStart: "ondragstart",
    onDrop: "ondrop",
    onDurationChange: "ondurationchange",
    onEmptied: "onemptied",
    onEnd: "onend",
    onEnded: "onended",
    onError: "onerror",
    onFocus: "onfocus",
    onFocusIn: "onfocusin",
    onFocusOut: "onfocusout",
    onHashChange: "onhashchange",
    onInput: "oninput",
    onInvalid: "oninvalid",
    onKeyDown: "onkeydown",
    onKeyPress: "onkeypress",
    onKeyUp: "onkeyup",
    onLoad: "onload",
    onLoadedData: "onloadeddata",
    onLoadedMetadata: "onloadedmetadata",
    onLoadStart: "onloadstart",
    onMessage: "onmessage",
    onMouseDown: "onmousedown",
    onMouseEnter: "onmouseenter",
    onMouseLeave: "onmouseleave",
    onMouseMove: "onmousemove",
    onMouseOut: "onmouseout",
    onMouseOver: "onmouseover",
    onMouseUp: "onmouseup",
    onMouseWheel: "onmousewheel",
    onOffline: "onoffline",
    onOnline: "ononline",
    onPageHide: "onpagehide",
    onPageShow: "onpageshow",
    onPaste: "onpaste",
    onPause: "onpause",
    onPlay: "onplay",
    onPlaying: "onplaying",
    onPopState: "onpopstate",
    onProgress: "onprogress",
    onRateChange: "onratechange",
    onRepeat: "onrepeat",
    onReset: "onreset",
    onResize: "onresize",
    onScroll: "onscroll",
    onSeeked: "onseeked",
    onSeeking: "onseeking",
    onSelect: "onselect",
    onShow: "onshow",
    onStalled: "onstalled",
    onStorage: "onstorage",
    onSubmit: "onsubmit",
    onSuspend: "onsuspend",
    onTimeUpdate: "ontimeupdate",
    onToggle: "ontoggle",
    onUnload: "onunload",
    onVolumeChange: "onvolumechange",
    onWaiting: "onwaiting",
    onZoom: "onzoom",
    overlinePosition: "overline-position",
    overlineThickness: "overline-thickness",
    paintOrder: "paint-order",
    panose1: "panose-1",
    pointerEvents: "pointer-events",
    referrerPolicy: "referrerpolicy",
    renderingIntent: "rendering-intent",
    shapeRendering: "shape-rendering",
    stopColor: "stop-color",
    stopOpacity: "stop-opacity",
    strikethroughPosition: "strikethrough-position",
    strikethroughThickness: "strikethrough-thickness",
    strokeDashArray: "stroke-dasharray",
    strokeDashOffset: "stroke-dashoffset",
    strokeLineCap: "stroke-linecap",
    strokeLineJoin: "stroke-linejoin",
    strokeMiterLimit: "stroke-miterlimit",
    strokeOpacity: "stroke-opacity",
    strokeWidth: "stroke-width",
    tabIndex: "tabindex",
    textAnchor: "text-anchor",
    textDecoration: "text-decoration",
    textRendering: "text-rendering",
    transformOrigin: "transform-origin",
    typeOf: "typeof",
    underlinePosition: "underline-position",
    underlineThickness: "underline-thickness",
    unicodeBidi: "unicode-bidi",
    unicodeRange: "unicode-range",
    unitsPerEm: "units-per-em",
    vAlphabetic: "v-alphabetic",
    vHanging: "v-hanging",
    vIdeographic: "v-ideographic",
    vMathematical: "v-mathematical",
    vectorEffect: "vector-effect",
    vertAdvY: "vert-adv-y",
    vertOriginX: "vert-origin-x",
    vertOriginY: "vert-origin-y",
    wordSpacing: "word-spacing",
    writingMode: "writing-mode",
    xHeight: "x-height",
    // These were camelcased in Tiny. Now lowercased in SVG 2
    playbackOrder: "playbackorder",
    timelineBegin: "timelinebegin"
  },
  properties: {
    about: commaOrSpaceSeparated,
    accentHeight: number,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: number,
    amplitude: number,
    arabicForm: null,
    ascent: number,
    attributeName: null,
    attributeType: null,
    azimuth: number,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: number,
    by: null,
    calcMode: null,
    capHeight: number,
    className: spaceSeparated,
    clip: null,
    clipPath: null,
    clipPathUnits: null,
    clipRule: null,
    color: null,
    colorInterpolation: null,
    colorInterpolationFilters: null,
    colorProfile: null,
    colorRendering: null,
    content: null,
    contentScriptType: null,
    contentStyleType: null,
    crossOrigin: null,
    cursor: null,
    cx: null,
    cy: null,
    d: null,
    dataType: null,
    defaultAction: null,
    descent: number,
    diffuseConstant: number,
    direction: null,
    display: null,
    dur: null,
    divisor: number,
    dominantBaseline: null,
    download: boolean,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: number,
    enableBackground: null,
    end: null,
    event: null,
    exponent: number,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: number,
    fillRule: null,
    filter: null,
    filterRes: null,
    filterUnits: null,
    floodColor: null,
    floodOpacity: null,
    focusable: null,
    focusHighlight: null,
    fontFamily: null,
    fontSize: null,
    fontSizeAdjust: null,
    fontStretch: null,
    fontStyle: null,
    fontVariant: null,
    fontWeight: null,
    format: null,
    fr: null,
    from: null,
    fx: null,
    fy: null,
    g1: commaSeparated,
    g2: commaSeparated,
    glyphName: commaSeparated,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: number,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: number,
    horizOriginX: number,
    horizOriginY: number,
    id: null,
    ideographic: number,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: number,
    k: number,
    k1: number,
    k2: number,
    k3: number,
    k4: number,
    kernelMatrix: commaOrSpaceSeparated,
    kernelUnitLength: null,
    keyPoints: null,
    // SEMI_COLON_SEPARATED
    keySplines: null,
    // SEMI_COLON_SEPARATED
    keyTimes: null,
    // SEMI_COLON_SEPARATED
    kerning: null,
    lang: null,
    lengthAdjust: null,
    letterSpacing: null,
    lightingColor: null,
    limitingConeAngle: number,
    local: null,
    markerEnd: null,
    markerMid: null,
    markerStart: null,
    markerHeight: null,
    markerUnits: null,
    markerWidth: null,
    mask: null,
    maskContentUnits: null,
    maskUnits: null,
    mathematical: null,
    max: null,
    media: null,
    mediaCharacterEncoding: null,
    mediaContentEncodings: null,
    mediaSize: number,
    mediaTime: null,
    method: null,
    min: null,
    mode: null,
    name: null,
    navDown: null,
    navDownLeft: null,
    navDownRight: null,
    navLeft: null,
    navNext: null,
    navPrev: null,
    navRight: null,
    navUp: null,
    navUpLeft: null,
    navUpRight: null,
    numOctaves: null,
    observer: null,
    offset: null,
    onAbort: null,
    onActivate: null,
    onAfterPrint: null,
    onBeforePrint: null,
    onBegin: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnd: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFocusIn: null,
    onFocusOut: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadStart: null,
    onMessage: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onMouseWheel: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRepeat: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onShow: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onZoom: null,
    opacity: null,
    operator: null,
    order: null,
    orient: null,
    orientation: null,
    origin: null,
    overflow: null,
    overlay: null,
    overlinePosition: number,
    overlineThickness: number,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: number,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: spaceSeparated,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: number,
    pointsAtY: number,
    pointsAtZ: number,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: commaOrSpaceSeparated,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: commaOrSpaceSeparated,
    rev: commaOrSpaceSeparated,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: commaOrSpaceSeparated,
    requiredFeatures: commaOrSpaceSeparated,
    requiredFonts: commaOrSpaceSeparated,
    requiredFormats: commaOrSpaceSeparated,
    resource: null,
    restart: null,
    result: null,
    rotate: null,
    rx: null,
    ry: null,
    scale: null,
    seed: null,
    shapeRendering: null,
    side: null,
    slope: null,
    snapshotTime: null,
    specularConstant: number,
    specularExponent: number,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: number,
    strikethroughThickness: number,
    string: null,
    stroke: null,
    strokeDashArray: commaOrSpaceSeparated,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: number,
    strokeOpacity: number,
    strokeWidth: null,
    style: null,
    surfaceScale: number,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: commaOrSpaceSeparated,
    tabIndex: number,
    tableValues: null,
    target: null,
    targetX: number,
    targetY: number,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: commaOrSpaceSeparated,
    to: null,
    transform: null,
    transformOrigin: null,
    u1: null,
    u2: null,
    underlinePosition: number,
    underlineThickness: number,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: number,
    values: null,
    vAlphabetic: number,
    vMathematical: number,
    vectorEffect: null,
    vHanging: number,
    vIdeographic: number,
    version: null,
    vertAdvY: number,
    vertOriginX: number,
    vertOriginY: number,
    viewBox: null,
    viewTarget: null,
    visibility: null,
    width: null,
    widths: null,
    wordSpacing: null,
    writingMode: null,
    x: null,
    x1: null,
    x2: null,
    xChannelSelector: null,
    xHeight: number,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  },
  space: "svg",
  transform: caseSensitiveTransform
});
const xlink = create({
  properties: {
    xLinkActuate: null,
    xLinkArcRole: null,
    xLinkHref: null,
    xLinkRole: null,
    xLinkShow: null,
    xLinkTitle: null,
    xLinkType: null
  },
  space: "xlink",
  transform(_, property) {
    return "xlink:" + property.slice(5).toLowerCase();
  }
});
const xmlns = create({
  attributes: { xmlnsxlink: "xmlns:xlink" },
  properties: { xmlnsXLink: null, xmlns: null },
  space: "xmlns",
  transform: caseInsensitiveTransform
});
const xml = create({
  properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
  space: "xml",
  transform(_, property) {
    return "xml:" + property.slice(3).toLowerCase();
  }
});
const cap = /[A-Z]/g;
const dash = /-[a-z]/g;
const valid = /^data[-\w.:]+$/i;
function find(schema2, value) {
  const normal = normalize(value);
  let property = value;
  let Type = Info;
  if (normal in schema2.normal) {
    return schema2.property[schema2.normal[normal]];
  }
  if (normal.length > 4 && normal.slice(0, 4) === "data" && valid.test(value)) {
    if (value.charAt(4) === "-") {
      const rest = value.slice(5).replace(dash, camelcase);
      property = "data" + rest.charAt(0).toUpperCase() + rest.slice(1);
    } else {
      const rest = value.slice(4);
      if (!dash.test(rest)) {
        let dashes = rest.replace(cap, kebab);
        if (dashes.charAt(0) !== "-") {
          dashes = "-" + dashes;
        }
        value = "data" + dashes;
      }
    }
    Type = DefinedInfo;
  }
  return new Type(property, value);
}
function kebab($0) {
  return "-" + $0.toLowerCase();
}
function camelcase($0) {
  return $0.charAt(1).toUpperCase();
}
const html$2 = merge$1([aria, html$3, xlink, xmlns, xml], "html");
const svg = merge$1([aria, svg$1, xlink, xmlns, xml], "svg");
const own$2 = {}.hasOwnProperty;
function zwitch(key2, options) {
  const settings = options || {};
  function one2(value, ...parameters) {
    let fn = one2.invalid;
    const handlers = one2.handlers;
    if (value && own$2.call(value, key2)) {
      const id = String(value[key2]);
      fn = own$2.call(handlers, id) ? handlers[id] : one2.unknown;
    }
    if (fn) {
      return fn.call(this, value, ...parameters);
    }
  }
  one2.handlers = settings.handlers || {};
  one2.invalid = settings.invalid;
  one2.unknown = settings.unknown;
  return one2;
}
const defaultSubsetRegex = /["&'<>`]/g;
const surrogatePairsRegex = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
const controlCharactersRegex = (
  // eslint-disable-next-line no-control-regex, unicorn/no-hex-escape
  /[\x01-\t\v\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g
);
const regexEscapeRegex = /[|\\{}()[\]^$+*?.]/g;
const subsetToRegexCache = /* @__PURE__ */ new WeakMap();
function core$1(value, options) {
  value = value.replace(
    options.subset ? charactersToExpressionCached(options.subset) : defaultSubsetRegex,
    basic
  );
  if (options.subset || options.escapeOnly) {
    return value;
  }
  return value.replace(surrogatePairsRegex, surrogate).replace(controlCharactersRegex, basic);
  function surrogate(pair, index2, all2) {
    return options.format(
      (pair.charCodeAt(0) - 55296) * 1024 + pair.charCodeAt(1) - 56320 + 65536,
      all2.charCodeAt(index2 + 2),
      options
    );
  }
  function basic(character, index2, all2) {
    return options.format(
      character.charCodeAt(0),
      all2.charCodeAt(index2 + 1),
      options
    );
  }
}
function charactersToExpressionCached(subset) {
  let cached = subsetToRegexCache.get(subset);
  if (!cached) {
    cached = charactersToExpression(subset);
    subsetToRegexCache.set(subset, cached);
  }
  return cached;
}
function charactersToExpression(subset) {
  const groups = [];
  let index2 = -1;
  while (++index2 < subset.length) {
    groups.push(subset[index2].replace(regexEscapeRegex, "\\$&"));
  }
  return new RegExp("(?:" + groups.join("|") + ")", "g");
}
const hexadecimalRegex = /[\dA-Fa-f]/;
function toHexadecimal(code, next, omit) {
  const value = "&#x" + code.toString(16).toUpperCase();
  return omit && next && !hexadecimalRegex.test(String.fromCharCode(next)) ? value : value + ";";
}
const decimalRegex = /\d/;
function toDecimal(code, next, omit) {
  const value = "&#" + String(code);
  return omit && next && !decimalRegex.test(String.fromCharCode(next)) ? value : value + ";";
}
const characterEntitiesLegacy = [
  "AElig",
  "AMP",
  "Aacute",
  "Acirc",
  "Agrave",
  "Aring",
  "Atilde",
  "Auml",
  "COPY",
  "Ccedil",
  "ETH",
  "Eacute",
  "Ecirc",
  "Egrave",
  "Euml",
  "GT",
  "Iacute",
  "Icirc",
  "Igrave",
  "Iuml",
  "LT",
  "Ntilde",
  "Oacute",
  "Ocirc",
  "Ograve",
  "Oslash",
  "Otilde",
  "Ouml",
  "QUOT",
  "REG",
  "THORN",
  "Uacute",
  "Ucirc",
  "Ugrave",
  "Uuml",
  "Yacute",
  "aacute",
  "acirc",
  "acute",
  "aelig",
  "agrave",
  "amp",
  "aring",
  "atilde",
  "auml",
  "brvbar",
  "ccedil",
  "cedil",
  "cent",
  "copy",
  "curren",
  "deg",
  "divide",
  "eacute",
  "ecirc",
  "egrave",
  "eth",
  "euml",
  "frac12",
  "frac14",
  "frac34",
  "gt",
  "iacute",
  "icirc",
  "iexcl",
  "igrave",
  "iquest",
  "iuml",
  "laquo",
  "lt",
  "macr",
  "micro",
  "middot",
  "nbsp",
  "not",
  "ntilde",
  "oacute",
  "ocirc",
  "ograve",
  "ordf",
  "ordm",
  "oslash",
  "otilde",
  "ouml",
  "para",
  "plusmn",
  "pound",
  "quot",
  "raquo",
  "reg",
  "sect",
  "shy",
  "sup1",
  "sup2",
  "sup3",
  "szlig",
  "thorn",
  "times",
  "uacute",
  "ucirc",
  "ugrave",
  "uml",
  "uuml",
  "yacute",
  "yen",
  "yuml"
];
const characterEntitiesHtml4 = {
  nbsp: " ",
  iexcl: "¡",
  cent: "¢",
  pound: "£",
  curren: "¤",
  yen: "¥",
  brvbar: "¦",
  sect: "§",
  uml: "¨",
  copy: "©",
  ordf: "ª",
  laquo: "«",
  not: "¬",
  shy: "­",
  reg: "®",
  macr: "¯",
  deg: "°",
  plusmn: "±",
  sup2: "²",
  sup3: "³",
  acute: "´",
  micro: "µ",
  para: "¶",
  middot: "·",
  cedil: "¸",
  sup1: "¹",
  ordm: "º",
  raquo: "»",
  frac14: "¼",
  frac12: "½",
  frac34: "¾",
  iquest: "¿",
  Agrave: "À",
  Aacute: "Á",
  Acirc: "Â",
  Atilde: "Ã",
  Auml: "Ä",
  Aring: "Å",
  AElig: "Æ",
  Ccedil: "Ç",
  Egrave: "È",
  Eacute: "É",
  Ecirc: "Ê",
  Euml: "Ë",
  Igrave: "Ì",
  Iacute: "Í",
  Icirc: "Î",
  Iuml: "Ï",
  ETH: "Ð",
  Ntilde: "Ñ",
  Ograve: "Ò",
  Oacute: "Ó",
  Ocirc: "Ô",
  Otilde: "Õ",
  Ouml: "Ö",
  times: "×",
  Oslash: "Ø",
  Ugrave: "Ù",
  Uacute: "Ú",
  Ucirc: "Û",
  Uuml: "Ü",
  Yacute: "Ý",
  THORN: "Þ",
  szlig: "ß",
  agrave: "à",
  aacute: "á",
  acirc: "â",
  atilde: "ã",
  auml: "ä",
  aring: "å",
  aelig: "æ",
  ccedil: "ç",
  egrave: "è",
  eacute: "é",
  ecirc: "ê",
  euml: "ë",
  igrave: "ì",
  iacute: "í",
  icirc: "î",
  iuml: "ï",
  eth: "ð",
  ntilde: "ñ",
  ograve: "ò",
  oacute: "ó",
  ocirc: "ô",
  otilde: "õ",
  ouml: "ö",
  divide: "÷",
  oslash: "ø",
  ugrave: "ù",
  uacute: "ú",
  ucirc: "û",
  uuml: "ü",
  yacute: "ý",
  thorn: "þ",
  yuml: "ÿ",
  fnof: "ƒ",
  Alpha: "Α",
  Beta: "Β",
  Gamma: "Γ",
  Delta: "Δ",
  Epsilon: "Ε",
  Zeta: "Ζ",
  Eta: "Η",
  Theta: "Θ",
  Iota: "Ι",
  Kappa: "Κ",
  Lambda: "Λ",
  Mu: "Μ",
  Nu: "Ν",
  Xi: "Ξ",
  Omicron: "Ο",
  Pi: "Π",
  Rho: "Ρ",
  Sigma: "Σ",
  Tau: "Τ",
  Upsilon: "Υ",
  Phi: "Φ",
  Chi: "Χ",
  Psi: "Ψ",
  Omega: "Ω",
  alpha: "α",
  beta: "β",
  gamma: "γ",
  delta: "δ",
  epsilon: "ε",
  zeta: "ζ",
  eta: "η",
  theta: "θ",
  iota: "ι",
  kappa: "κ",
  lambda: "λ",
  mu: "μ",
  nu: "ν",
  xi: "ξ",
  omicron: "ο",
  pi: "π",
  rho: "ρ",
  sigmaf: "ς",
  sigma: "σ",
  tau: "τ",
  upsilon: "υ",
  phi: "φ",
  chi: "χ",
  psi: "ψ",
  omega: "ω",
  thetasym: "ϑ",
  upsih: "ϒ",
  piv: "ϖ",
  bull: "•",
  hellip: "…",
  prime: "′",
  Prime: "″",
  oline: "‾",
  frasl: "⁄",
  weierp: "℘",
  image: "ℑ",
  real: "ℜ",
  trade: "™",
  alefsym: "ℵ",
  larr: "←",
  uarr: "↑",
  rarr: "→",
  darr: "↓",
  harr: "↔",
  crarr: "↵",
  lArr: "⇐",
  uArr: "⇑",
  rArr: "⇒",
  dArr: "⇓",
  hArr: "⇔",
  forall: "∀",
  part: "∂",
  exist: "∃",
  empty: "∅",
  nabla: "∇",
  isin: "∈",
  notin: "∉",
  ni: "∋",
  prod: "∏",
  sum: "∑",
  minus: "−",
  lowast: "∗",
  radic: "√",
  prop: "∝",
  infin: "∞",
  ang: "∠",
  and: "∧",
  or: "∨",
  cap: "∩",
  cup: "∪",
  int: "∫",
  there4: "∴",
  sim: "∼",
  cong: "≅",
  asymp: "≈",
  ne: "≠",
  equiv: "≡",
  le: "≤",
  ge: "≥",
  sub: "⊂",
  sup: "⊃",
  nsub: "⊄",
  sube: "⊆",
  supe: "⊇",
  oplus: "⊕",
  otimes: "⊗",
  perp: "⊥",
  sdot: "⋅",
  lceil: "⌈",
  rceil: "⌉",
  lfloor: "⌊",
  rfloor: "⌋",
  lang: "〈",
  rang: "〉",
  loz: "◊",
  spades: "♠",
  clubs: "♣",
  hearts: "♥",
  diams: "♦",
  quot: '"',
  amp: "&",
  lt: "<",
  gt: ">",
  OElig: "Œ",
  oelig: "œ",
  Scaron: "Š",
  scaron: "š",
  Yuml: "Ÿ",
  circ: "ˆ",
  tilde: "˜",
  ensp: " ",
  emsp: " ",
  thinsp: " ",
  zwnj: "‌",
  zwj: "‍",
  lrm: "‎",
  rlm: "‏",
  ndash: "–",
  mdash: "—",
  lsquo: "‘",
  rsquo: "’",
  sbquo: "‚",
  ldquo: "“",
  rdquo: "”",
  bdquo: "„",
  dagger: "†",
  Dagger: "‡",
  permil: "‰",
  lsaquo: "‹",
  rsaquo: "›",
  euro: "€"
};
const dangerous = [
  "cent",
  "copy",
  "divide",
  "gt",
  "lt",
  "not",
  "para",
  "times"
];
const own$1 = {}.hasOwnProperty;
const characters = {};
let key;
for (key in characterEntitiesHtml4) {
  if (own$1.call(characterEntitiesHtml4, key)) {
    characters[characterEntitiesHtml4[key]] = key;
  }
}
const notAlphanumericRegex = /[^\dA-Za-z]/;
function toNamed(code, next, omit, attribute) {
  const character = String.fromCharCode(code);
  if (own$1.call(characters, character)) {
    const name = characters[character];
    const value = "&" + name;
    if (omit && characterEntitiesLegacy.includes(name) && !dangerous.includes(name) && (!attribute || next && next !== 61 && notAlphanumericRegex.test(String.fromCharCode(next)))) {
      return value;
    }
    return value + ";";
  }
  return "";
}
function formatSmart(code, next, options) {
  let numeric = toHexadecimal(code, next, options.omitOptionalSemicolons);
  let named;
  if (options.useNamedReferences || options.useShortestReferences) {
    named = toNamed(
      code,
      next,
      options.omitOptionalSemicolons,
      options.attribute
    );
  }
  if ((options.useShortestReferences || !named) && options.useShortestReferences) {
    const decimal = toDecimal(code, next, options.omitOptionalSemicolons);
    if (decimal.length < numeric.length) {
      numeric = decimal;
    }
  }
  return named && (!options.useShortestReferences || named.length < numeric.length) ? named : numeric;
}
function stringifyEntities(value, options) {
  return core$1(value, Object.assign({ format: formatSmart }, options));
}
const htmlCommentRegex = /^>|^->|<!--|-->|--!>|<!-$/g;
const bogusCommentEntitySubset = [">"];
const commentEntitySubset = ["<", ">"];
function comment(node, _1, _2, state) {
  return state.settings.bogusComments ? "<?" + stringifyEntities(
    node.value,
    Object.assign({}, state.settings.characterReferences, {
      subset: bogusCommentEntitySubset
    })
  ) + ">" : "<!--" + node.value.replace(htmlCommentRegex, encode) + "-->";
  function encode($0) {
    return stringifyEntities(
      $0,
      Object.assign({}, state.settings.characterReferences, {
        subset: commentEntitySubset
      })
    );
  }
}
function doctype(_1, _2, _3, state) {
  return "<!" + (state.settings.upperDoctype ? "DOCTYPE" : "doctype") + (state.settings.tightDoctype ? "" : " ") + "html>";
}
function ccount(value, character) {
  const source = String(value);
  if (typeof character !== "string") {
    throw new TypeError("Expected character");
  }
  let count2 = 0;
  let index2 = source.indexOf(character);
  while (index2 !== -1) {
    count2++;
    index2 = source.indexOf(character, index2 + character.length);
  }
  return count2;
}
function stringify$3(values, options) {
  const settings = options || {};
  const input = values[values.length - 1] === "" ? [...values, ""] : values;
  return input.join(
    (settings.padRight ? " " : "") + "," + (settings.padLeft === false ? "" : " ")
  ).trim();
}
function stringify$2(values) {
  return values.join(" ").trim();
}
const re = /[ \t\n\f\r]/g;
function whitespace(thing) {
  return typeof thing === "object" ? thing.type === "text" ? empty(thing.value) : false : empty(thing);
}
function empty(value) {
  return value.replace(re, "") === "";
}
const siblingAfter = siblings(1);
const siblingBefore = siblings(-1);
const emptyChildren$1 = [];
function siblings(increment2) {
  return sibling;
  function sibling(parent, index2, includeWhitespace) {
    const siblings2 = parent ? parent.children : emptyChildren$1;
    let offset2 = (index2 || 0) + increment2;
    let next = siblings2[offset2];
    if (!includeWhitespace) {
      while (next && whitespace(next)) {
        offset2 += increment2;
        next = siblings2[offset2];
      }
    }
    return next;
  }
}
const own = {}.hasOwnProperty;
function omission(handlers) {
  return omit;
  function omit(node, index2, parent) {
    return own.call(handlers, node.tagName) && handlers[node.tagName](node, index2, parent);
  }
}
const closing = omission({
  body: body$1,
  caption: headOrColgroupOrCaption,
  colgroup: headOrColgroupOrCaption,
  dd,
  dt,
  head: headOrColgroupOrCaption,
  html: html$1,
  li,
  optgroup,
  option,
  p,
  rp: rubyElement,
  rt: rubyElement,
  tbody: tbody$1,
  td: cells,
  tfoot,
  th: cells,
  thead,
  tr
});
function headOrColgroupOrCaption(_, index2, parent) {
  const next = siblingAfter(parent, index2, true);
  return !next || next.type !== "comment" && !(next.type === "text" && whitespace(next.value.charAt(0)));
}
function html$1(_, index2, parent) {
  const next = siblingAfter(parent, index2);
  return !next || next.type !== "comment";
}
function body$1(_, index2, parent) {
  const next = siblingAfter(parent, index2);
  return !next || next.type !== "comment";
}
function p(_, index2, parent) {
  const next = siblingAfter(parent, index2);
  return next ? next.type === "element" && (next.tagName === "address" || next.tagName === "article" || next.tagName === "aside" || next.tagName === "blockquote" || next.tagName === "details" || next.tagName === "div" || next.tagName === "dl" || next.tagName === "fieldset" || next.tagName === "figcaption" || next.tagName === "figure" || next.tagName === "footer" || next.tagName === "form" || next.tagName === "h1" || next.tagName === "h2" || next.tagName === "h3" || next.tagName === "h4" || next.tagName === "h5" || next.tagName === "h6" || next.tagName === "header" || next.tagName === "hgroup" || next.tagName === "hr" || next.tagName === "main" || next.tagName === "menu" || next.tagName === "nav" || next.tagName === "ol" || next.tagName === "p" || next.tagName === "pre" || next.tagName === "section" || next.tagName === "table" || next.tagName === "ul") : !parent || // Confusing parent.
  !(parent.type === "element" && (parent.tagName === "a" || parent.tagName === "audio" || parent.tagName === "del" || parent.tagName === "ins" || parent.tagName === "map" || parent.tagName === "noscript" || parent.tagName === "video"));
}
function li(_, index2, parent) {
  const next = siblingAfter(parent, index2);
  return !next || next.type === "element" && next.tagName === "li";
}
function dt(_, index2, parent) {
  const next = siblingAfter(parent, index2);
  return Boolean(
    next && next.type === "element" && (next.tagName === "dt" || next.tagName === "dd")
  );
}
function dd(_, index2, parent) {
  const next = siblingAfter(parent, index2);
  return !next || next.type === "element" && (next.tagName === "dt" || next.tagName === "dd");
}
function rubyElement(_, index2, parent) {
  const next = siblingAfter(parent, index2);
  return !next || next.type === "element" && (next.tagName === "rp" || next.tagName === "rt");
}
function optgroup(_, index2, parent) {
  const next = siblingAfter(parent, index2);
  return !next || next.type === "element" && next.tagName === "optgroup";
}
function option(_, index2, parent) {
  const next = siblingAfter(parent, index2);
  return !next || next.type === "element" && (next.tagName === "option" || next.tagName === "optgroup");
}
function thead(_, index2, parent) {
  const next = siblingAfter(parent, index2);
  return Boolean(
    next && next.type === "element" && (next.tagName === "tbody" || next.tagName === "tfoot")
  );
}
function tbody$1(_, index2, parent) {
  const next = siblingAfter(parent, index2);
  return !next || next.type === "element" && (next.tagName === "tbody" || next.tagName === "tfoot");
}
function tfoot(_, index2, parent) {
  return !siblingAfter(parent, index2);
}
function tr(_, index2, parent) {
  const next = siblingAfter(parent, index2);
  return !next || next.type === "element" && next.tagName === "tr";
}
function cells(_, index2, parent) {
  const next = siblingAfter(parent, index2);
  return !next || next.type === "element" && (next.tagName === "td" || next.tagName === "th");
}
const opening = omission({
  body,
  colgroup,
  head,
  html,
  tbody
});
function html(node) {
  const head2 = siblingAfter(node, -1);
  return !head2 || head2.type !== "comment";
}
function head(node) {
  const seen = /* @__PURE__ */ new Set();
  for (const child2 of node.children) {
    if (child2.type === "element" && (child2.tagName === "base" || child2.tagName === "title")) {
      if (seen.has(child2.tagName)) return false;
      seen.add(child2.tagName);
    }
  }
  const child = node.children[0];
  return !child || child.type === "element";
}
function body(node) {
  const head2 = siblingAfter(node, -1, true);
  return !head2 || head2.type !== "comment" && !(head2.type === "text" && whitespace(head2.value.charAt(0))) && !(head2.type === "element" && (head2.tagName === "meta" || head2.tagName === "link" || head2.tagName === "script" || head2.tagName === "style" || head2.tagName === "template"));
}
function colgroup(node, index2, parent) {
  const previous = siblingBefore(parent, index2);
  const head2 = siblingAfter(node, -1, true);
  if (parent && previous && previous.type === "element" && previous.tagName === "colgroup" && closing(previous, parent.children.indexOf(previous), parent)) {
    return false;
  }
  return Boolean(head2 && head2.type === "element" && head2.tagName === "col");
}
function tbody(node, index2, parent) {
  const previous = siblingBefore(parent, index2);
  const head2 = siblingAfter(node, -1);
  if (parent && previous && previous.type === "element" && (previous.tagName === "thead" || previous.tagName === "tbody") && closing(previous, parent.children.indexOf(previous), parent)) {
    return false;
  }
  return Boolean(head2 && head2.type === "element" && head2.tagName === "tr");
}
const constants = {
  // See: <https://html.spec.whatwg.org/#attribute-name-state>.
  name: [
    ["	\n\f\r &/=>".split(""), "	\n\f\r \"&'/=>`".split("")],
    [`\0	
\f\r "&'/<=>`.split(""), "\0	\n\f\r \"&'/<=>`".split("")]
  ],
  // See: <https://html.spec.whatwg.org/#attribute-value-(unquoted)-state>.
  unquoted: [
    ["	\n\f\r &>".split(""), "\0	\n\f\r \"&'<=>`".split("")],
    ["\0	\n\f\r \"&'<=>`".split(""), "\0	\n\f\r \"&'<=>`".split("")]
  ],
  // See: <https://html.spec.whatwg.org/#attribute-value-(single-quoted)-state>.
  single: [
    ["&'".split(""), "\"&'`".split("")],
    ["\0&'".split(""), "\0\"&'`".split("")]
  ],
  // See: <https://html.spec.whatwg.org/#attribute-value-(double-quoted)-state>.
  double: [
    ['"&'.split(""), "\"&'`".split("")],
    ['\0"&'.split(""), "\0\"&'`".split("")]
  ]
};
function element(node, index2, parent, state) {
  const schema2 = state.schema;
  const omit = schema2.space === "svg" ? false : state.settings.omitOptionalTags;
  let selfClosing = schema2.space === "svg" ? state.settings.closeEmptyElements : state.settings.voids.includes(node.tagName.toLowerCase());
  const parts = [];
  let last;
  if (schema2.space === "html" && node.tagName === "svg") {
    state.schema = svg;
  }
  const attributes = serializeAttributes(state, node.properties);
  const content = state.all(
    schema2.space === "html" && node.tagName === "template" ? node.content : node
  );
  state.schema = schema2;
  if (content) selfClosing = false;
  if (attributes || !omit || !opening(node, index2, parent)) {
    parts.push("<", node.tagName, attributes ? " " + attributes : "");
    if (selfClosing && (schema2.space === "svg" || state.settings.closeSelfClosing)) {
      last = attributes.charAt(attributes.length - 1);
      if (!state.settings.tightSelfClosing || last === "/" || last && last !== '"' && last !== "'") {
        parts.push(" ");
      }
      parts.push("/");
    }
    parts.push(">");
  }
  parts.push(content);
  if (!selfClosing && (!omit || !closing(node, index2, parent))) {
    parts.push("</" + node.tagName + ">");
  }
  return parts.join("");
}
function serializeAttributes(state, properties) {
  const values = [];
  let index2 = -1;
  let key2;
  if (properties) {
    for (key2 in properties) {
      if (properties[key2] !== null && properties[key2] !== void 0) {
        const value = serializeAttribute(state, key2, properties[key2]);
        if (value) values.push(value);
      }
    }
  }
  while (++index2 < values.length) {
    const last = state.settings.tightAttributes ? values[index2].charAt(values[index2].length - 1) : void 0;
    if (index2 !== values.length - 1 && last !== '"' && last !== "'") {
      values[index2] += " ";
    }
  }
  return values.join("");
}
function serializeAttribute(state, key2, value) {
  const info = find(state.schema, key2);
  const x = state.settings.allowParseErrors && state.schema.space === "html" ? 0 : 1;
  const y = state.settings.allowDangerousCharacters ? 0 : 1;
  let quote = state.quote;
  let result;
  if (info.overloadedBoolean && (value === info.attribute || value === "")) {
    value = true;
  } else if ((info.boolean || info.overloadedBoolean) && (typeof value !== "string" || value === info.attribute || value === "")) {
    value = Boolean(value);
  }
  if (value === null || value === void 0 || value === false || typeof value === "number" && Number.isNaN(value)) {
    return "";
  }
  const name = stringifyEntities(
    info.attribute,
    Object.assign({}, state.settings.characterReferences, {
      // Always encode without parse errors in non-HTML.
      subset: constants.name[x][y]
    })
  );
  if (value === true) return name;
  value = Array.isArray(value) ? (info.commaSeparated ? stringify$3 : stringify$2)(value, {
    padLeft: !state.settings.tightCommaSeparatedLists
  }) : String(value);
  if (state.settings.collapseEmptyAttributes && !value) return name;
  if (state.settings.preferUnquoted) {
    result = stringifyEntities(
      value,
      Object.assign({}, state.settings.characterReferences, {
        attribute: true,
        subset: constants.unquoted[x][y]
      })
    );
  }
  if (result !== value) {
    if (state.settings.quoteSmart && ccount(value, quote) > ccount(value, state.alternative)) {
      quote = state.alternative;
    }
    result = quote + stringifyEntities(
      value,
      Object.assign({}, state.settings.characterReferences, {
        // Always encode without parse errors in non-HTML.
        subset: (quote === "'" ? constants.single : constants.double)[x][y],
        attribute: true
      })
    ) + quote;
  }
  return name + (result ? "=" + result : result);
}
const textEntitySubset = ["<", "&"];
function text(node, _, parent, state) {
  return parent && parent.type === "element" && (parent.tagName === "script" || parent.tagName === "style") ? node.value : stringifyEntities(
    node.value,
    Object.assign({}, state.settings.characterReferences, {
      subset: textEntitySubset
    })
  );
}
function raw(node, index2, parent, state) {
  return state.settings.allowDangerousHtml ? node.value : text(node, index2, parent, state);
}
function root(node, _1, _2, state) {
  return state.all(node);
}
const handle = zwitch("type", {
  invalid,
  unknown,
  handlers: { comment, doctype, element, raw, root, text }
});
function invalid(node) {
  throw new Error("Expected node, not `" + node + "`");
}
function unknown(node_) {
  const node = (
    /** @type {Nodes} */
    node_
  );
  throw new Error("Cannot compile unknown node `" + node.type + "`");
}
const emptyOptions = {};
const emptyCharacterReferences = {};
const emptyChildren = [];
function toHtml(tree, options) {
  const options_ = options || emptyOptions;
  const quote = options_.quote || '"';
  const alternative = quote === '"' ? "'" : '"';
  if (quote !== '"' && quote !== "'") {
    throw new Error("Invalid quote `" + quote + "`, expected `'` or `\"`");
  }
  const state = {
    one,
    all,
    settings: {
      omitOptionalTags: options_.omitOptionalTags || false,
      allowParseErrors: options_.allowParseErrors || false,
      allowDangerousCharacters: options_.allowDangerousCharacters || false,
      quoteSmart: options_.quoteSmart || false,
      preferUnquoted: options_.preferUnquoted || false,
      tightAttributes: options_.tightAttributes || false,
      upperDoctype: options_.upperDoctype || false,
      tightDoctype: options_.tightDoctype || false,
      bogusComments: options_.bogusComments || false,
      tightCommaSeparatedLists: options_.tightCommaSeparatedLists || false,
      tightSelfClosing: options_.tightSelfClosing || false,
      collapseEmptyAttributes: options_.collapseEmptyAttributes || false,
      allowDangerousHtml: options_.allowDangerousHtml || false,
      voids: options_.voids || htmlVoidElements,
      characterReferences: options_.characterReferences || emptyCharacterReferences,
      closeSelfClosing: options_.closeSelfClosing || false,
      closeEmptyElements: options_.closeEmptyElements || false
    },
    schema: options_.space === "svg" ? svg : html$2,
    quote,
    alternative
  };
  return state.one(
    Array.isArray(tree) ? { type: "root", children: tree } : tree,
    void 0,
    void 0
  );
}
function one(node, index2, parent) {
  return handle(node, index2, parent, this);
}
function all(parent) {
  const results = [];
  const children = parent && parent.children || emptyChildren;
  let index2 = -1;
  while (++index2 < children.length) {
    results[index2] = this.one(children[index2], index2, parent);
  }
  return results.join("");
}
function resolveColorReplacements(theme, options) {
  const replacements = typeof theme === "string" ? {} : { ...theme.colorReplacements };
  const themeName = typeof theme === "string" ? theme : theme.name;
  for (const [key2, value] of Object.entries((options == null ? void 0 : options.colorReplacements) || {})) {
    if (typeof value === "string")
      replacements[key2] = value;
    else if (key2 === themeName)
      Object.assign(replacements, value);
  }
  return replacements;
}
function applyColorReplacements(color, replacements) {
  if (!color)
    return color;
  return (replacements == null ? void 0 : replacements[color == null ? void 0 : color.toLowerCase()]) || color;
}
function toArray$1(x) {
  return Array.isArray(x) ? x : [x];
}
async function normalizeGetter(p2) {
  return Promise.resolve(typeof p2 === "function" ? p2() : p2).then((r) => r.default || r);
}
function isPlainLang(lang2) {
  return !lang2 || ["plaintext", "txt", "text", "plain"].includes(lang2);
}
function isSpecialLang(lang2) {
  return lang2 === "ansi" || isPlainLang(lang2);
}
function isNoneTheme(theme) {
  return theme === "none";
}
function isSpecialTheme(theme) {
  return isNoneTheme(theme);
}
function addClassToHast(node, className) {
  var _a2;
  if (!className)
    return node;
  node.properties || (node.properties = {});
  (_a2 = node.properties).class || (_a2.class = []);
  if (typeof node.properties.class === "string")
    node.properties.class = node.properties.class.split(/\s+/g);
  if (!Array.isArray(node.properties.class))
    node.properties.class = [];
  const targets = Array.isArray(className) ? className : className.split(/\s+/g);
  for (const c of targets) {
    if (c && !node.properties.class.includes(c))
      node.properties.class.push(c);
  }
  return node;
}
function splitLines(code, preserveEnding = false) {
  var _a2;
  const parts = code.split(/(\r?\n)/g);
  let index2 = 0;
  const lines = [];
  for (let i = 0; i < parts.length; i += 2) {
    const line = preserveEnding ? parts[i] + (parts[i + 1] || "") : parts[i];
    lines.push([line, index2]);
    index2 += parts[i].length;
    index2 += ((_a2 = parts[i + 1]) == null ? void 0 : _a2.length) || 0;
  }
  return lines;
}
function createPositionConverter(code) {
  const lines = splitLines(code, true).map(([line]) => line);
  function indexToPos(index2) {
    if (index2 === code.length) {
      return {
        line: lines.length - 1,
        character: lines[lines.length - 1].length
      };
    }
    let character = index2;
    let line = 0;
    for (const lineText of lines) {
      if (character < lineText.length)
        break;
      character -= lineText.length;
      line++;
    }
    return { line, character };
  }
  function posToIndex(line, character) {
    let index2 = 0;
    for (let i = 0; i < line; i++)
      index2 += lines[i].length;
    index2 += character;
    return index2;
  }
  return {
    lines,
    indexToPos,
    posToIndex
  };
}
const DEFAULT_COLOR_LIGHT_DARK = "light-dark()";
const COLOR_KEYS = ["color", "background-color"];
function splitToken(token, offsets) {
  let lastOffset = 0;
  const tokens = [];
  for (const offset2 of offsets) {
    if (offset2 > lastOffset) {
      tokens.push({
        ...token,
        content: token.content.slice(lastOffset, offset2),
        offset: token.offset + lastOffset
      });
    }
    lastOffset = offset2;
  }
  if (lastOffset < token.content.length) {
    tokens.push({
      ...token,
      content: token.content.slice(lastOffset),
      offset: token.offset + lastOffset
    });
  }
  return tokens;
}
function splitTokens(tokens, breakpoints) {
  const sorted = Array.from(breakpoints instanceof Set ? breakpoints : new Set(breakpoints)).sort((a, b) => a - b);
  if (!sorted.length)
    return tokens;
  return tokens.map((line) => {
    return line.flatMap((token) => {
      const breakpointsInToken = sorted.filter((i) => token.offset < i && i < token.offset + token.content.length).map((i) => i - token.offset).sort((a, b) => a - b);
      if (!breakpointsInToken.length)
        return token;
      return splitToken(token, breakpointsInToken);
    });
  });
}
function flatTokenVariants(merged, variantsOrder, cssVariablePrefix, defaultColor, colorsRendering = "css-vars") {
  const token = {
    content: merged.content,
    explanation: merged.explanation,
    offset: merged.offset
  };
  const styles = variantsOrder.map((t) => getTokenStyleObject(merged.variants[t]));
  const styleKeys = new Set(styles.flatMap((t) => Object.keys(t)));
  const mergedStyles = {};
  const varKey = (idx, key2) => {
    const keyName = key2 === "color" ? "" : key2 === "background-color" ? "-bg" : `-${key2}`;
    return cssVariablePrefix + variantsOrder[idx] + (key2 === "color" ? "" : keyName);
  };
  styles.forEach((cur, idx) => {
    for (const key2 of styleKeys) {
      const value = cur[key2] || "inherit";
      if (idx === 0 && defaultColor && COLOR_KEYS.includes(key2)) {
        if (defaultColor === DEFAULT_COLOR_LIGHT_DARK && styles.length > 1) {
          const lightIndex = variantsOrder.findIndex((t) => t === "light");
          const darkIndex = variantsOrder.findIndex((t) => t === "dark");
          if (lightIndex === -1 || darkIndex === -1)
            throw new ShikiError$2('When using `defaultColor: "light-dark()"`, you must provide both `light` and `dark` themes');
          const lightValue = styles[lightIndex][key2] || "inherit";
          const darkValue = styles[darkIndex][key2] || "inherit";
          mergedStyles[key2] = `light-dark(${lightValue}, ${darkValue})`;
          if (colorsRendering === "css-vars")
            mergedStyles[varKey(idx, key2)] = value;
        } else {
          mergedStyles[key2] = value;
        }
      } else {
        if (colorsRendering === "css-vars")
          mergedStyles[varKey(idx, key2)] = value;
      }
    }
  });
  token.htmlStyle = mergedStyles;
  return token;
}
function getTokenStyleObject(token) {
  const styles = {};
  if (token.color)
    styles.color = token.color;
  if (token.bgColor)
    styles["background-color"] = token.bgColor;
  if (token.fontStyle) {
    if (token.fontStyle & FontStyle.Italic)
      styles["font-style"] = "italic";
    if (token.fontStyle & FontStyle.Bold)
      styles["font-weight"] = "bold";
    const decorations2 = [];
    if (token.fontStyle & FontStyle.Underline)
      decorations2.push("underline");
    if (token.fontStyle & FontStyle.Strikethrough)
      decorations2.push("line-through");
    if (decorations2.length)
      styles["text-decoration"] = decorations2.join(" ");
  }
  return styles;
}
function stringifyTokenStyle(token) {
  if (typeof token === "string")
    return token;
  return Object.entries(token).map(([key2, value]) => `${key2}:${value}`).join(";");
}
const _grammarStateMap = /* @__PURE__ */ new WeakMap();
function setLastGrammarStateToMap(keys, state) {
  _grammarStateMap.set(keys, state);
}
function getLastGrammarStateFromMap(keys) {
  return _grammarStateMap.get(keys);
}
class GrammarState {
  constructor(...args) {
    /**
     * Theme to Stack mapping
     */
    __publicField(this, "_stacks", {});
    __publicField(this, "lang");
    if (args.length === 2) {
      const [stacksMap, lang2] = args;
      this.lang = lang2;
      this._stacks = stacksMap;
    } else {
      const [stack, lang2, theme] = args;
      this.lang = lang2;
      this._stacks = { [theme]: stack };
    }
  }
  get themes() {
    return Object.keys(this._stacks);
  }
  get theme() {
    return this.themes[0];
  }
  get _stack() {
    return this._stacks[this.theme];
  }
  /**
   * Static method to create a initial grammar state.
   */
  static initial(lang2, themes) {
    return new GrammarState(
      Object.fromEntries(toArray$1(themes).map((theme) => [theme, INITIAL])),
      lang2
    );
  }
  /**
   * Get the internal stack object.
   * @internal
   */
  getInternalStack(theme = this.theme) {
    return this._stacks[theme];
  }
  getScopes(theme = this.theme) {
    return getScopes(this._stacks[theme]);
  }
  toJSON() {
    return {
      lang: this.lang,
      theme: this.theme,
      themes: this.themes,
      scopes: this.getScopes()
    };
  }
}
function getScopes(stack) {
  const scopes = [];
  const visited = /* @__PURE__ */ new Set();
  function pushScope(stack2) {
    var _a2;
    if (visited.has(stack2))
      return;
    visited.add(stack2);
    const name = (_a2 = stack2 == null ? void 0 : stack2.nameScopesList) == null ? void 0 : _a2.scopeName;
    if (name)
      scopes.push(name);
    if (stack2.parent)
      pushScope(stack2.parent);
  }
  pushScope(stack);
  return scopes;
}
function getGrammarStack(state, theme) {
  if (!(state instanceof GrammarState))
    throw new ShikiError$2("Invalid grammar state");
  return state.getInternalStack(theme);
}
function transformerDecorations() {
  const map2 = /* @__PURE__ */ new WeakMap();
  function getContext(shiki) {
    if (!map2.has(shiki.meta)) {
      let normalizePosition = function(p2) {
        if (typeof p2 === "number") {
          if (p2 < 0 || p2 > shiki.source.length)
            throw new ShikiError$2(`Invalid decoration offset: ${p2}. Code length: ${shiki.source.length}`);
          return {
            ...converter.indexToPos(p2),
            offset: p2
          };
        } else {
          const line = converter.lines[p2.line];
          if (line === void 0)
            throw new ShikiError$2(`Invalid decoration position ${JSON.stringify(p2)}. Lines length: ${converter.lines.length}`);
          let character = p2.character;
          if (character < 0)
            character = line.length + character;
          if (character < 0 || character > line.length)
            throw new ShikiError$2(`Invalid decoration position ${JSON.stringify(p2)}. Line ${p2.line} length: ${line.length}`);
          return {
            ...p2,
            character,
            offset: converter.posToIndex(p2.line, character)
          };
        }
      };
      const converter = createPositionConverter(shiki.source);
      const decorations2 = (shiki.options.decorations || []).map((d) => ({
        ...d,
        start: normalizePosition(d.start),
        end: normalizePosition(d.end)
      }));
      verifyIntersections(decorations2);
      map2.set(shiki.meta, {
        decorations: decorations2,
        converter,
        source: shiki.source
      });
    }
    return map2.get(shiki.meta);
  }
  return {
    name: "shiki:decorations",
    tokens(tokens) {
      var _a2;
      if (!((_a2 = this.options.decorations) == null ? void 0 : _a2.length))
        return;
      const ctx = getContext(this);
      const breakpoints = ctx.decorations.flatMap((d) => [d.start.offset, d.end.offset]);
      const splitted = splitTokens(tokens, breakpoints);
      return splitted;
    },
    code(codeEl) {
      var _a2;
      if (!((_a2 = this.options.decorations) == null ? void 0 : _a2.length))
        return;
      const ctx = getContext(this);
      const lines = Array.from(codeEl.children).filter((i) => i.type === "element" && i.tagName === "span");
      if (lines.length !== ctx.converter.lines.length)
        throw new ShikiError$2(`Number of lines in code element (${lines.length}) does not match the number of lines in the source (${ctx.converter.lines.length}). Failed to apply decorations.`);
      function applyLineSection(line, start, end, decoration) {
        const lineEl = lines[line];
        let text2 = "";
        let startIndex = -1;
        let endIndex = -1;
        if (start === 0)
          startIndex = 0;
        if (end === 0)
          endIndex = 0;
        if (end === Number.POSITIVE_INFINITY)
          endIndex = lineEl.children.length;
        if (startIndex === -1 || endIndex === -1) {
          for (let i = 0; i < lineEl.children.length; i++) {
            text2 += stringify$1(lineEl.children[i]);
            if (startIndex === -1 && text2.length === start)
              startIndex = i + 1;
            if (endIndex === -1 && text2.length === end)
              endIndex = i + 1;
          }
        }
        if (startIndex === -1)
          throw new ShikiError$2(`Failed to find start index for decoration ${JSON.stringify(decoration.start)}`);
        if (endIndex === -1)
          throw new ShikiError$2(`Failed to find end index for decoration ${JSON.stringify(decoration.end)}`);
        const children = lineEl.children.slice(startIndex, endIndex);
        if (!decoration.alwaysWrap && children.length === lineEl.children.length) {
          applyDecoration(lineEl, decoration, "line");
        } else if (!decoration.alwaysWrap && children.length === 1 && children[0].type === "element") {
          applyDecoration(children[0], decoration, "token");
        } else {
          const wrapper = {
            type: "element",
            tagName: "span",
            properties: {},
            children
          };
          applyDecoration(wrapper, decoration, "wrapper");
          lineEl.children.splice(startIndex, children.length, wrapper);
        }
      }
      function applyLine(line, decoration) {
        lines[line] = applyDecoration(lines[line], decoration, "line");
      }
      function applyDecoration(el, decoration, type2) {
        var _a3;
        const properties = decoration.properties || {};
        const transform = decoration.transform || ((i) => i);
        el.tagName = decoration.tagName || "span";
        el.properties = {
          ...el.properties,
          ...properties,
          class: el.properties.class
        };
        if ((_a3 = decoration.properties) == null ? void 0 : _a3.class)
          addClassToHast(el, decoration.properties.class);
        el = transform(el, type2) || el;
        return el;
      }
      const lineApplies = [];
      const sorted = ctx.decorations.sort((a, b) => b.start.offset - a.start.offset || a.end.offset - b.end.offset);
      for (const decoration of sorted) {
        const { start, end } = decoration;
        if (start.line === end.line) {
          applyLineSection(start.line, start.character, end.character, decoration);
        } else if (start.line < end.line) {
          applyLineSection(start.line, start.character, Number.POSITIVE_INFINITY, decoration);
          for (let i = start.line + 1; i < end.line; i++)
            lineApplies.unshift(() => applyLine(i, decoration));
          applyLineSection(end.line, 0, end.character, decoration);
        }
      }
      lineApplies.forEach((i) => i());
    }
  };
}
function verifyIntersections(items) {
  for (let i = 0; i < items.length; i++) {
    const foo = items[i];
    if (foo.start.offset > foo.end.offset)
      throw new ShikiError$2(`Invalid decoration range: ${JSON.stringify(foo.start)} - ${JSON.stringify(foo.end)}`);
    for (let j = i + 1; j < items.length; j++) {
      const bar = items[j];
      const isFooHasBarStart = foo.start.offset <= bar.start.offset && bar.start.offset < foo.end.offset;
      const isFooHasBarEnd = foo.start.offset < bar.end.offset && bar.end.offset <= foo.end.offset;
      const isBarHasFooStart = bar.start.offset <= foo.start.offset && foo.start.offset < bar.end.offset;
      const isBarHasFooEnd = bar.start.offset < foo.end.offset && foo.end.offset <= bar.end.offset;
      if (isFooHasBarStart || isFooHasBarEnd || isBarHasFooStart || isBarHasFooEnd) {
        if (isFooHasBarStart && isFooHasBarEnd)
          continue;
        if (isBarHasFooStart && isBarHasFooEnd)
          continue;
        if (isBarHasFooStart && foo.start.offset === foo.end.offset)
          continue;
        if (isFooHasBarEnd && bar.start.offset === bar.end.offset)
          continue;
        throw new ShikiError$2(`Decorations ${JSON.stringify(foo.start)} and ${JSON.stringify(bar.start)} intersect.`);
      }
    }
  }
}
function stringify$1(el) {
  if (el.type === "text")
    return el.value;
  if (el.type === "element")
    return el.children.map(stringify$1).join("");
  return "";
}
const builtInTransformers = [
  /* @__PURE__ */ transformerDecorations()
];
function getTransformers(options) {
  const transformers = sortTransformersByEnforcement(options.transformers || []);
  return [
    ...transformers.pre,
    ...transformers.normal,
    ...transformers.post,
    ...builtInTransformers
  ];
}
function sortTransformersByEnforcement(transformers) {
  const pre = [];
  const post = [];
  const normal = [];
  for (const transformer of transformers) {
    switch (transformer.enforce) {
      case "pre":
        pre.push(transformer);
        break;
      case "post":
        post.push(transformer);
        break;
      default:
        normal.push(transformer);
    }
  }
  return { pre, post, normal };
}
var namedColors = [
  "black",
  "red",
  "green",
  "yellow",
  "blue",
  "magenta",
  "cyan",
  "white",
  "brightBlack",
  "brightRed",
  "brightGreen",
  "brightYellow",
  "brightBlue",
  "brightMagenta",
  "brightCyan",
  "brightWhite"
];
var decorations = {
  1: "bold",
  2: "dim",
  3: "italic",
  4: "underline",
  7: "reverse",
  8: "hidden",
  9: "strikethrough"
};
function findSequence(value, position) {
  const nextEscape = value.indexOf("\x1B", position);
  if (nextEscape !== -1) {
    if (value[nextEscape + 1] === "[") {
      const nextClose = value.indexOf("m", nextEscape);
      if (nextClose !== -1) {
        return {
          sequence: value.substring(nextEscape + 2, nextClose).split(";"),
          startPosition: nextEscape,
          position: nextClose + 1
        };
      }
    }
  }
  return {
    position: value.length
  };
}
function parseColor(sequence) {
  const colorMode = sequence.shift();
  if (colorMode === "2") {
    const rgb = sequence.splice(0, 3).map((x) => Number.parseInt(x));
    if (rgb.length !== 3 || rgb.some((x) => Number.isNaN(x)))
      return;
    return {
      type: "rgb",
      rgb
    };
  } else if (colorMode === "5") {
    const index2 = sequence.shift();
    if (index2) {
      return { type: "table", index: Number(index2) };
    }
  }
}
function parseSequence(sequence) {
  const commands = [];
  while (sequence.length > 0) {
    const code = sequence.shift();
    if (!code)
      continue;
    const codeInt = Number.parseInt(code);
    if (Number.isNaN(codeInt))
      continue;
    if (codeInt === 0) {
      commands.push({ type: "resetAll" });
    } else if (codeInt <= 9) {
      const decoration = decorations[codeInt];
      if (decoration) {
        commands.push({
          type: "setDecoration",
          value: decorations[codeInt]
        });
      }
    } else if (codeInt <= 29) {
      const decoration = decorations[codeInt - 20];
      if (decoration) {
        commands.push({
          type: "resetDecoration",
          value: decoration
        });
        if (decoration === "dim") {
          commands.push({
            type: "resetDecoration",
            value: "bold"
          });
        }
      }
    } else if (codeInt <= 37) {
      commands.push({
        type: "setForegroundColor",
        value: { type: "named", name: namedColors[codeInt - 30] }
      });
    } else if (codeInt === 38) {
      const color = parseColor(sequence);
      if (color) {
        commands.push({
          type: "setForegroundColor",
          value: color
        });
      }
    } else if (codeInt === 39) {
      commands.push({
        type: "resetForegroundColor"
      });
    } else if (codeInt <= 47) {
      commands.push({
        type: "setBackgroundColor",
        value: { type: "named", name: namedColors[codeInt - 40] }
      });
    } else if (codeInt === 48) {
      const color = parseColor(sequence);
      if (color) {
        commands.push({
          type: "setBackgroundColor",
          value: color
        });
      }
    } else if (codeInt === 49) {
      commands.push({
        type: "resetBackgroundColor"
      });
    } else if (codeInt === 53) {
      commands.push({
        type: "setDecoration",
        value: "overline"
      });
    } else if (codeInt === 55) {
      commands.push({
        type: "resetDecoration",
        value: "overline"
      });
    } else if (codeInt >= 90 && codeInt <= 97) {
      commands.push({
        type: "setForegroundColor",
        value: { type: "named", name: namedColors[codeInt - 90 + 8] }
      });
    } else if (codeInt >= 100 && codeInt <= 107) {
      commands.push({
        type: "setBackgroundColor",
        value: { type: "named", name: namedColors[codeInt - 100 + 8] }
      });
    }
  }
  return commands;
}
function createAnsiSequenceParser() {
  let foreground = null;
  let background = null;
  let decorations2 = /* @__PURE__ */ new Set();
  return {
    parse(value) {
      const tokens = [];
      let position = 0;
      do {
        const findResult = findSequence(value, position);
        const text2 = findResult.sequence ? value.substring(position, findResult.startPosition) : value.substring(position);
        if (text2.length > 0) {
          tokens.push({
            value: text2,
            foreground,
            background,
            decorations: new Set(decorations2)
          });
        }
        if (findResult.sequence) {
          const commands = parseSequence(findResult.sequence);
          for (const styleToken of commands) {
            if (styleToken.type === "resetAll") {
              foreground = null;
              background = null;
              decorations2.clear();
            } else if (styleToken.type === "resetForegroundColor") {
              foreground = null;
            } else if (styleToken.type === "resetBackgroundColor") {
              background = null;
            } else if (styleToken.type === "resetDecoration") {
              decorations2.delete(styleToken.value);
            }
          }
          for (const styleToken of commands) {
            if (styleToken.type === "setForegroundColor") {
              foreground = styleToken.value;
            } else if (styleToken.type === "setBackgroundColor") {
              background = styleToken.value;
            } else if (styleToken.type === "setDecoration") {
              decorations2.add(styleToken.value);
            }
          }
        }
        position = findResult.position;
      } while (position < value.length);
      return tokens;
    }
  };
}
var defaultNamedColorsMap = {
  black: "#000000",
  red: "#bb0000",
  green: "#00bb00",
  yellow: "#bbbb00",
  blue: "#0000bb",
  magenta: "#ff00ff",
  cyan: "#00bbbb",
  white: "#eeeeee",
  brightBlack: "#555555",
  brightRed: "#ff5555",
  brightGreen: "#00ff00",
  brightYellow: "#ffff55",
  brightBlue: "#5555ff",
  brightMagenta: "#ff55ff",
  brightCyan: "#55ffff",
  brightWhite: "#ffffff"
};
function createColorPalette(namedColorsMap = defaultNamedColorsMap) {
  function namedColor(name) {
    return namedColorsMap[name];
  }
  function rgbColor(rgb) {
    return `#${rgb.map((x) => Math.max(0, Math.min(x, 255)).toString(16).padStart(2, "0")).join("")}`;
  }
  let colorTable;
  function getColorTable() {
    if (colorTable) {
      return colorTable;
    }
    colorTable = [];
    for (let i = 0; i < namedColors.length; i++) {
      colorTable.push(namedColor(namedColors[i]));
    }
    let levels = [0, 95, 135, 175, 215, 255];
    for (let r = 0; r < 6; r++) {
      for (let g = 0; g < 6; g++) {
        for (let b = 0; b < 6; b++) {
          colorTable.push(rgbColor([levels[r], levels[g], levels[b]]));
        }
      }
    }
    let level = 8;
    for (let i = 0; i < 24; i++, level += 10) {
      colorTable.push(rgbColor([level, level, level]));
    }
    return colorTable;
  }
  function tableColor(index2) {
    return getColorTable()[index2];
  }
  function value(color) {
    switch (color.type) {
      case "named":
        return namedColor(color.name);
      case "rgb":
        return rgbColor(color.rgb);
      case "table":
        return tableColor(color.index);
    }
  }
  return {
    value
  };
}
function tokenizeAnsiWithTheme(theme, fileContents, options) {
  const colorReplacements = resolveColorReplacements(theme, options);
  const lines = splitLines(fileContents);
  const colorPalette = createColorPalette(
    Object.fromEntries(
      namedColors.map((name) => {
        var _a2;
        return [
          name,
          (_a2 = theme.colors) == null ? void 0 : _a2[`terminal.ansi${name[0].toUpperCase()}${name.substring(1)}`]
        ];
      })
    )
  );
  const parser = createAnsiSequenceParser();
  return lines.map(
    (line) => parser.parse(line[0]).map((token) => {
      let color;
      let bgColor;
      if (token.decorations.has("reverse")) {
        color = token.background ? colorPalette.value(token.background) : theme.bg;
        bgColor = token.foreground ? colorPalette.value(token.foreground) : theme.fg;
      } else {
        color = token.foreground ? colorPalette.value(token.foreground) : theme.fg;
        bgColor = token.background ? colorPalette.value(token.background) : void 0;
      }
      color = applyColorReplacements(color, colorReplacements);
      bgColor = applyColorReplacements(bgColor, colorReplacements);
      if (token.decorations.has("dim"))
        color = dimColor(color);
      let fontStyle = FontStyle.None;
      if (token.decorations.has("bold"))
        fontStyle |= FontStyle.Bold;
      if (token.decorations.has("italic"))
        fontStyle |= FontStyle.Italic;
      if (token.decorations.has("underline"))
        fontStyle |= FontStyle.Underline;
      if (token.decorations.has("strikethrough"))
        fontStyle |= FontStyle.Strikethrough;
      return {
        content: token.value,
        offset: line[1],
        // TODO: more accurate offset? might need to fork ansi-sequence-parser
        color,
        bgColor,
        fontStyle
      };
    })
  );
}
function dimColor(color) {
  const hexMatch = color.match(/#([0-9a-f]{3})([0-9a-f]{3})?([0-9a-f]{2})?/);
  if (hexMatch) {
    if (hexMatch[3]) {
      const alpha = Math.round(Number.parseInt(hexMatch[3], 16) / 2).toString(16).padStart(2, "0");
      return `#${hexMatch[1]}${hexMatch[2]}${alpha}`;
    } else if (hexMatch[2]) {
      return `#${hexMatch[1]}${hexMatch[2]}80`;
    } else {
      return `#${Array.from(hexMatch[1]).map((x) => `${x}${x}`).join("")}80`;
    }
  }
  const cssVarMatch = color.match(/var\((--[\w-]+-ansi-[\w-]+)\)/);
  if (cssVarMatch)
    return `var(${cssVarMatch[1]}-dim)`;
  return color;
}
function codeToTokensBase(internal, code, options = {}) {
  const {
    lang: lang2 = "text",
    theme: themeName = internal.getLoadedThemes()[0]
  } = options;
  if (isPlainLang(lang2) || isNoneTheme(themeName))
    return splitLines(code).map((line) => [{ content: line[0], offset: line[1] }]);
  const { theme, colorMap } = internal.setTheme(themeName);
  if (lang2 === "ansi")
    return tokenizeAnsiWithTheme(theme, code, options);
  const _grammar = internal.getLanguage(lang2);
  if (options.grammarState) {
    if (options.grammarState.lang !== _grammar.name) {
      throw new ShikiError$2(`Grammar state language "${options.grammarState.lang}" does not match highlight language "${_grammar.name}"`);
    }
    if (!options.grammarState.themes.includes(theme.name)) {
      throw new ShikiError$2(`Grammar state themes "${options.grammarState.themes}" do not contain highlight theme "${theme.name}"`);
    }
  }
  return tokenizeWithTheme(code, _grammar, theme, colorMap, options);
}
function getLastGrammarState(...args) {
  if (args.length === 2) {
    return getLastGrammarStateFromMap(args[1]);
  }
  const [internal, code, options = {}] = args;
  const {
    lang: lang2 = "text",
    theme: themeName = internal.getLoadedThemes()[0]
  } = options;
  if (isPlainLang(lang2) || isNoneTheme(themeName))
    throw new ShikiError$2("Plain language does not have grammar state");
  if (lang2 === "ansi")
    throw new ShikiError$2("ANSI language does not have grammar state");
  const { theme, colorMap } = internal.setTheme(themeName);
  const _grammar = internal.getLanguage(lang2);
  return new GrammarState(
    _tokenizeWithTheme(code, _grammar, theme, colorMap, options).stateStack,
    _grammar.name,
    theme.name
  );
}
function tokenizeWithTheme(code, grammar, theme, colorMap, options) {
  const result = _tokenizeWithTheme(code, grammar, theme, colorMap, options);
  const grammarState = new GrammarState(
    _tokenizeWithTheme(code, grammar, theme, colorMap, options).stateStack,
    grammar.name,
    theme.name
  );
  setLastGrammarStateToMap(result.tokens, grammarState);
  return result.tokens;
}
function _tokenizeWithTheme(code, grammar, theme, colorMap, options) {
  const colorReplacements = resolveColorReplacements(theme, options);
  const {
    tokenizeMaxLineLength = 0,
    tokenizeTimeLimit = 500
  } = options;
  const lines = splitLines(code);
  let stateStack = options.grammarState ? getGrammarStack(options.grammarState, theme.name) ?? INITIAL : options.grammarContextCode != null ? _tokenizeWithTheme(
    options.grammarContextCode,
    grammar,
    theme,
    colorMap,
    {
      ...options,
      grammarState: void 0,
      grammarContextCode: void 0
    }
  ).stateStack : INITIAL;
  let actual = [];
  const final = [];
  for (let i = 0, len = lines.length; i < len; i++) {
    const [line, lineOffset] = lines[i];
    if (line === "") {
      actual = [];
      final.push([]);
      continue;
    }
    if (tokenizeMaxLineLength > 0 && line.length >= tokenizeMaxLineLength) {
      actual = [];
      final.push([{
        content: line,
        offset: lineOffset,
        color: "",
        fontStyle: 0
      }]);
      continue;
    }
    let resultWithScopes;
    let tokensWithScopes;
    let tokensWithScopesIndex;
    if (options.includeExplanation) {
      resultWithScopes = grammar.tokenizeLine(line, stateStack, tokenizeTimeLimit);
      tokensWithScopes = resultWithScopes.tokens;
      tokensWithScopesIndex = 0;
    }
    const result = grammar.tokenizeLine2(line, stateStack, tokenizeTimeLimit);
    const tokensLength = result.tokens.length / 2;
    for (let j = 0; j < tokensLength; j++) {
      const startIndex = result.tokens[2 * j];
      const nextStartIndex = j + 1 < tokensLength ? result.tokens[2 * j + 2] : line.length;
      if (startIndex === nextStartIndex)
        continue;
      const metadata = result.tokens[2 * j + 1];
      const color = applyColorReplacements(
        colorMap[EncodedTokenMetadata.getForeground(metadata)],
        colorReplacements
      );
      const fontStyle = EncodedTokenMetadata.getFontStyle(metadata);
      const token = {
        content: line.substring(startIndex, nextStartIndex),
        offset: lineOffset + startIndex,
        color,
        fontStyle
      };
      if (options.includeExplanation) {
        const themeSettingsSelectors = [];
        if (options.includeExplanation !== "scopeName") {
          for (const setting of theme.settings) {
            let selectors;
            switch (typeof setting.scope) {
              case "string":
                selectors = setting.scope.split(/,/).map((scope) => scope.trim());
                break;
              case "object":
                selectors = setting.scope;
                break;
              default:
                continue;
            }
            themeSettingsSelectors.push({
              settings: setting,
              selectors: selectors.map((selector) => selector.split(/ /))
            });
          }
        }
        token.explanation = [];
        let offset2 = 0;
        while (startIndex + offset2 < nextStartIndex) {
          const tokenWithScopes = tokensWithScopes[tokensWithScopesIndex];
          const tokenWithScopesText = line.substring(
            tokenWithScopes.startIndex,
            tokenWithScopes.endIndex
          );
          offset2 += tokenWithScopesText.length;
          token.explanation.push({
            content: tokenWithScopesText,
            scopes: options.includeExplanation === "scopeName" ? explainThemeScopesNameOnly(
              tokenWithScopes.scopes
            ) : explainThemeScopesFull(
              themeSettingsSelectors,
              tokenWithScopes.scopes
            )
          });
          tokensWithScopesIndex += 1;
        }
      }
      actual.push(token);
    }
    final.push(actual);
    actual = [];
    stateStack = result.ruleStack;
  }
  return {
    tokens: final,
    stateStack
  };
}
function explainThemeScopesNameOnly(scopes) {
  return scopes.map((scope) => ({ scopeName: scope }));
}
function explainThemeScopesFull(themeSelectors, scopes) {
  const result = [];
  for (let i = 0, len = scopes.length; i < len; i++) {
    const scope = scopes[i];
    result[i] = {
      scopeName: scope,
      themeMatches: explainThemeScope(themeSelectors, scope, scopes.slice(0, i))
    };
  }
  return result;
}
function matchesOne(selector, scope) {
  return selector === scope || scope.substring(0, selector.length) === selector && scope[selector.length] === ".";
}
function matches(selectors, scope, parentScopes) {
  if (!matchesOne(selectors[selectors.length - 1], scope))
    return false;
  let selectorParentIndex = selectors.length - 2;
  let parentIndex = parentScopes.length - 1;
  while (selectorParentIndex >= 0 && parentIndex >= 0) {
    if (matchesOne(selectors[selectorParentIndex], parentScopes[parentIndex]))
      selectorParentIndex -= 1;
    parentIndex -= 1;
  }
  if (selectorParentIndex === -1)
    return true;
  return false;
}
function explainThemeScope(themeSettingsSelectors, scope, parentScopes) {
  const result = [];
  for (const { selectors, settings } of themeSettingsSelectors) {
    for (const selectorPieces of selectors) {
      if (matches(selectorPieces, scope, parentScopes)) {
        result.push(settings);
        break;
      }
    }
  }
  return result;
}
function codeToTokensWithThemes(internal, code, options) {
  const themes = Object.entries(options.themes).filter((i) => i[1]).map((i) => ({ color: i[0], theme: i[1] }));
  const themedTokens = themes.map((t) => {
    const tokens2 = codeToTokensBase(internal, code, {
      ...options,
      theme: t.theme
    });
    const state = getLastGrammarStateFromMap(tokens2);
    const theme = typeof t.theme === "string" ? t.theme : t.theme.name;
    return {
      tokens: tokens2,
      state,
      theme
    };
  });
  const tokens = syncThemesTokenization(
    ...themedTokens.map((i) => i.tokens)
  );
  const mergedTokens = tokens[0].map(
    (line, lineIdx) => line.map((_token, tokenIdx) => {
      const mergedToken = {
        content: _token.content,
        variants: {},
        offset: _token.offset
      };
      if ("includeExplanation" in options && options.includeExplanation) {
        mergedToken.explanation = _token.explanation;
      }
      tokens.forEach((t, themeIdx) => {
        const {
          content: _,
          explanation: __,
          offset: ___,
          ...styles
        } = t[lineIdx][tokenIdx];
        mergedToken.variants[themes[themeIdx].color] = styles;
      });
      return mergedToken;
    })
  );
  const mergedGrammarState = themedTokens[0].state ? new GrammarState(
    Object.fromEntries(themedTokens.map((s) => {
      var _a2;
      return [s.theme, (_a2 = s.state) == null ? void 0 : _a2.getInternalStack(s.theme)];
    })),
    themedTokens[0].state.lang
  ) : void 0;
  if (mergedGrammarState)
    setLastGrammarStateToMap(mergedTokens, mergedGrammarState);
  return mergedTokens;
}
function syncThemesTokenization(...themes) {
  const outThemes = themes.map(() => []);
  const count2 = themes.length;
  for (let i = 0; i < themes[0].length; i++) {
    const lines = themes.map((t) => t[i]);
    const outLines = outThemes.map(() => []);
    outThemes.forEach((t, i2) => t.push(outLines[i2]));
    const indexes = lines.map(() => 0);
    const current = lines.map((l) => l[0]);
    while (current.every((t) => t)) {
      const minLength = Math.min(...current.map((t) => t.content.length));
      for (let n = 0; n < count2; n++) {
        const token = current[n];
        if (token.content.length === minLength) {
          outLines[n].push(token);
          indexes[n] += 1;
          current[n] = lines[n][indexes[n]];
        } else {
          outLines[n].push({
            ...token,
            content: token.content.slice(0, minLength)
          });
          current[n] = {
            ...token,
            content: token.content.slice(minLength),
            offset: token.offset + minLength
          };
        }
      }
    }
  }
  return outThemes;
}
function codeToTokens(internal, code, options) {
  let bg;
  let fg;
  let tokens;
  let themeName;
  let rootStyle;
  let grammarState;
  if ("themes" in options) {
    const {
      defaultColor = "light",
      cssVariablePrefix = "--shiki-",
      colorsRendering = "css-vars"
    } = options;
    const themes = Object.entries(options.themes).filter((i) => i[1]).map((i) => ({ color: i[0], theme: i[1] })).sort((a, b) => a.color === defaultColor ? -1 : b.color === defaultColor ? 1 : 0);
    if (themes.length === 0)
      throw new ShikiError$2("`themes` option must not be empty");
    const themeTokens = codeToTokensWithThemes(
      internal,
      code,
      options
    );
    grammarState = getLastGrammarStateFromMap(themeTokens);
    if (defaultColor && DEFAULT_COLOR_LIGHT_DARK !== defaultColor && !themes.find((t) => t.color === defaultColor))
      throw new ShikiError$2(`\`themes\` option must contain the defaultColor key \`${defaultColor}\``);
    const themeRegs = themes.map((t) => internal.getTheme(t.theme));
    const themesOrder = themes.map((t) => t.color);
    tokens = themeTokens.map((line) => line.map((token) => flatTokenVariants(token, themesOrder, cssVariablePrefix, defaultColor, colorsRendering)));
    if (grammarState)
      setLastGrammarStateToMap(tokens, grammarState);
    const themeColorReplacements = themes.map((t) => resolveColorReplacements(t.theme, options));
    fg = mapThemeColors(themes, themeRegs, themeColorReplacements, cssVariablePrefix, defaultColor, "fg", colorsRendering);
    bg = mapThemeColors(themes, themeRegs, themeColorReplacements, cssVariablePrefix, defaultColor, "bg", colorsRendering);
    themeName = `shiki-themes ${themeRegs.map((t) => t.name).join(" ")}`;
    rootStyle = defaultColor ? void 0 : [fg, bg].join(";");
  } else if ("theme" in options) {
    const colorReplacements = resolveColorReplacements(options.theme, options);
    tokens = codeToTokensBase(
      internal,
      code,
      options
    );
    const _theme = internal.getTheme(options.theme);
    bg = applyColorReplacements(_theme.bg, colorReplacements);
    fg = applyColorReplacements(_theme.fg, colorReplacements);
    themeName = _theme.name;
    grammarState = getLastGrammarStateFromMap(tokens);
  } else {
    throw new ShikiError$2("Invalid options, either `theme` or `themes` must be provided");
  }
  return {
    tokens,
    fg,
    bg,
    themeName,
    rootStyle,
    grammarState
  };
}
function mapThemeColors(themes, themeRegs, themeColorReplacements, cssVariablePrefix, defaultColor, property, colorsRendering) {
  return themes.map((t, idx) => {
    const value = applyColorReplacements(themeRegs[idx][property], themeColorReplacements[idx]) || "inherit";
    const cssVar = `${cssVariablePrefix + t.color}${property === "bg" ? "-bg" : ""}:${value}`;
    if (idx === 0 && defaultColor) {
      if (defaultColor === DEFAULT_COLOR_LIGHT_DARK && themes.length > 1) {
        const lightIndex = themes.findIndex((t2) => t2.color === "light");
        const darkIndex = themes.findIndex((t2) => t2.color === "dark");
        if (lightIndex === -1 || darkIndex === -1)
          throw new ShikiError$2('When using `defaultColor: "light-dark()"`, you must provide both `light` and `dark` themes');
        const lightValue = applyColorReplacements(themeRegs[lightIndex][property], themeColorReplacements[lightIndex]) || "inherit";
        const darkValue = applyColorReplacements(themeRegs[darkIndex][property], themeColorReplacements[darkIndex]) || "inherit";
        return `light-dark(${lightValue}, ${darkValue});${cssVar}`;
      }
      return value;
    }
    if (colorsRendering === "css-vars") {
      return cssVar;
    }
    return null;
  }).filter((i) => !!i).join(";");
}
function codeToHast(internal, code, options, transformerContext = {
  meta: {},
  options,
  codeToHast: (_code, _options) => codeToHast(internal, _code, _options),
  codeToTokens: (_code, _options) => codeToTokens(internal, _code, _options)
}) {
  var _a2, _b2;
  let input = code;
  for (const transformer of getTransformers(options))
    input = ((_a2 = transformer.preprocess) == null ? void 0 : _a2.call(transformerContext, input, options)) || input;
  let {
    tokens,
    fg,
    bg,
    themeName,
    rootStyle,
    grammarState
  } = codeToTokens(internal, input, options);
  const {
    mergeWhitespaces = true,
    mergeSameStyleTokens = false
  } = options;
  if (mergeWhitespaces === true)
    tokens = mergeWhitespaceTokens(tokens);
  else if (mergeWhitespaces === "never")
    tokens = splitWhitespaceTokens(tokens);
  if (mergeSameStyleTokens) {
    tokens = mergeAdjacentStyledTokens(tokens);
  }
  const contextSource = {
    ...transformerContext,
    get source() {
      return input;
    }
  };
  for (const transformer of getTransformers(options))
    tokens = ((_b2 = transformer.tokens) == null ? void 0 : _b2.call(contextSource, tokens)) || tokens;
  return tokensToHast(
    tokens,
    {
      ...options,
      fg,
      bg,
      themeName,
      rootStyle
    },
    contextSource,
    grammarState
  );
}
function tokensToHast(tokens, options, transformerContext, grammarState = getLastGrammarStateFromMap(tokens)) {
  var _a2, _b2, _c;
  const transformers = getTransformers(options);
  const lines = [];
  const root2 = {
    type: "root",
    children: []
  };
  const {
    structure = "classic",
    tabindex = "0"
  } = options;
  let preNode = {
    type: "element",
    tagName: "pre",
    properties: {
      class: `shiki ${options.themeName || ""}`,
      style: options.rootStyle || `background-color:${options.bg};color:${options.fg}`,
      ...tabindex !== false && tabindex != null ? {
        tabindex: tabindex.toString()
      } : {},
      ...Object.fromEntries(
        Array.from(
          Object.entries(options.meta || {})
        ).filter(([key2]) => !key2.startsWith("_"))
      )
    },
    children: []
  };
  let codeNode = {
    type: "element",
    tagName: "code",
    properties: {},
    children: lines
  };
  const lineNodes = [];
  const context = {
    ...transformerContext,
    structure,
    addClassToHast,
    get source() {
      return transformerContext.source;
    },
    get tokens() {
      return tokens;
    },
    get options() {
      return options;
    },
    get root() {
      return root2;
    },
    get pre() {
      return preNode;
    },
    get code() {
      return codeNode;
    },
    get lines() {
      return lineNodes;
    }
  };
  tokens.forEach((line, idx) => {
    var _a3, _b3;
    if (idx) {
      if (structure === "inline")
        root2.children.push({ type: "element", tagName: "br", properties: {}, children: [] });
      else if (structure === "classic")
        lines.push({ type: "text", value: "\n" });
    }
    let lineNode = {
      type: "element",
      tagName: "span",
      properties: { class: "line" },
      children: []
    };
    let col = 0;
    for (const token of line) {
      let tokenNode = {
        type: "element",
        tagName: "span",
        properties: {
          ...token.htmlAttrs
        },
        children: [{ type: "text", value: token.content }]
      };
      const style = stringifyTokenStyle(token.htmlStyle || getTokenStyleObject(token));
      if (style)
        tokenNode.properties.style = style;
      for (const transformer of transformers)
        tokenNode = ((_a3 = transformer == null ? void 0 : transformer.span) == null ? void 0 : _a3.call(context, tokenNode, idx + 1, col, lineNode, token)) || tokenNode;
      if (structure === "inline")
        root2.children.push(tokenNode);
      else if (structure === "classic")
        lineNode.children.push(tokenNode);
      col += token.content.length;
    }
    if (structure === "classic") {
      for (const transformer of transformers)
        lineNode = ((_b3 = transformer == null ? void 0 : transformer.line) == null ? void 0 : _b3.call(context, lineNode, idx + 1)) || lineNode;
      lineNodes.push(lineNode);
      lines.push(lineNode);
    }
  });
  if (structure === "classic") {
    for (const transformer of transformers)
      codeNode = ((_a2 = transformer == null ? void 0 : transformer.code) == null ? void 0 : _a2.call(context, codeNode)) || codeNode;
    preNode.children.push(codeNode);
    for (const transformer of transformers)
      preNode = ((_b2 = transformer == null ? void 0 : transformer.pre) == null ? void 0 : _b2.call(context, preNode)) || preNode;
    root2.children.push(preNode);
  }
  let result = root2;
  for (const transformer of transformers)
    result = ((_c = transformer == null ? void 0 : transformer.root) == null ? void 0 : _c.call(context, result)) || result;
  if (grammarState)
    setLastGrammarStateToMap(result, grammarState);
  return result;
}
function mergeWhitespaceTokens(tokens) {
  return tokens.map((line) => {
    const newLine = [];
    let carryOnContent = "";
    let firstOffset = 0;
    line.forEach((token, idx) => {
      const isDecorated = token.fontStyle && (token.fontStyle & FontStyle.Underline || token.fontStyle & FontStyle.Strikethrough);
      const couldMerge = !isDecorated;
      if (couldMerge && token.content.match(/^\s+$/) && line[idx + 1]) {
        if (!firstOffset)
          firstOffset = token.offset;
        carryOnContent += token.content;
      } else {
        if (carryOnContent) {
          if (couldMerge) {
            newLine.push({
              ...token,
              offset: firstOffset,
              content: carryOnContent + token.content
            });
          } else {
            newLine.push(
              {
                content: carryOnContent,
                offset: firstOffset
              },
              token
            );
          }
          firstOffset = 0;
          carryOnContent = "";
        } else {
          newLine.push(token);
        }
      }
    });
    return newLine;
  });
}
function splitWhitespaceTokens(tokens) {
  return tokens.map((line) => {
    return line.flatMap((token) => {
      if (token.content.match(/^\s+$/))
        return token;
      const match = token.content.match(/^(\s*)(.*?)(\s*)$/);
      if (!match)
        return token;
      const [, leading, content, trailing] = match;
      if (!leading && !trailing)
        return token;
      const expanded = [{
        ...token,
        offset: token.offset + leading.length,
        content
      }];
      if (leading) {
        expanded.unshift({
          content: leading,
          offset: token.offset
        });
      }
      if (trailing) {
        expanded.push({
          content: trailing,
          offset: token.offset + leading.length + content.length
        });
      }
      return expanded;
    });
  });
}
function mergeAdjacentStyledTokens(tokens) {
  return tokens.map((line) => {
    const newLine = [];
    for (const token of line) {
      if (newLine.length === 0) {
        newLine.push({ ...token });
        continue;
      }
      const prevToken = newLine[newLine.length - 1];
      const prevStyle = stringifyTokenStyle(prevToken.htmlStyle || getTokenStyleObject(prevToken));
      const currentStyle = stringifyTokenStyle(token.htmlStyle || getTokenStyleObject(token));
      const isPrevDecorated = prevToken.fontStyle && (prevToken.fontStyle & FontStyle.Underline || prevToken.fontStyle & FontStyle.Strikethrough);
      const isDecorated = token.fontStyle && (token.fontStyle & FontStyle.Underline || token.fontStyle & FontStyle.Strikethrough);
      if (!isPrevDecorated && !isDecorated && prevStyle === currentStyle) {
        prevToken.content += token.content;
      } else {
        newLine.push({ ...token });
      }
    }
    return newLine;
  });
}
const hastToHtml = toHtml;
function codeToHtml(internal, code, options) {
  var _a2;
  const context = {
    meta: {},
    options,
    codeToHast: (_code, _options) => codeToHast(internal, _code, _options),
    codeToTokens: (_code, _options) => codeToTokens(internal, _code, _options)
  };
  let result = hastToHtml(codeToHast(internal, code, options, context));
  for (const transformer of getTransformers(options))
    result = ((_a2 = transformer.postprocess) == null ? void 0 : _a2.call(context, result, options)) || result;
  return result;
}
const VSCODE_FALLBACK_EDITOR_FG = { light: "#333333", dark: "#bbbbbb" };
const VSCODE_FALLBACK_EDITOR_BG = { light: "#fffffe", dark: "#1e1e1e" };
const RESOLVED_KEY = "__shiki_resolved";
function normalizeTheme(rawTheme) {
  var _a2, _b2, _c, _d, _e;
  if (rawTheme == null ? void 0 : rawTheme[RESOLVED_KEY])
    return rawTheme;
  const theme = {
    ...rawTheme
  };
  if (theme.tokenColors && !theme.settings) {
    theme.settings = theme.tokenColors;
    delete theme.tokenColors;
  }
  theme.type || (theme.type = "dark");
  theme.colorReplacements = { ...theme.colorReplacements };
  theme.settings || (theme.settings = []);
  let { bg, fg } = theme;
  if (!bg || !fg) {
    const globalSetting = theme.settings ? theme.settings.find((s) => !s.name && !s.scope) : void 0;
    if ((_a2 = globalSetting == null ? void 0 : globalSetting.settings) == null ? void 0 : _a2.foreground)
      fg = globalSetting.settings.foreground;
    if ((_b2 = globalSetting == null ? void 0 : globalSetting.settings) == null ? void 0 : _b2.background)
      bg = globalSetting.settings.background;
    if (!fg && ((_c = theme == null ? void 0 : theme.colors) == null ? void 0 : _c["editor.foreground"]))
      fg = theme.colors["editor.foreground"];
    if (!bg && ((_d = theme == null ? void 0 : theme.colors) == null ? void 0 : _d["editor.background"]))
      bg = theme.colors["editor.background"];
    if (!fg)
      fg = theme.type === "light" ? VSCODE_FALLBACK_EDITOR_FG.light : VSCODE_FALLBACK_EDITOR_FG.dark;
    if (!bg)
      bg = theme.type === "light" ? VSCODE_FALLBACK_EDITOR_BG.light : VSCODE_FALLBACK_EDITOR_BG.dark;
    theme.fg = fg;
    theme.bg = bg;
  }
  if (!(theme.settings[0] && theme.settings[0].settings && !theme.settings[0].scope)) {
    theme.settings.unshift({
      settings: {
        foreground: theme.fg,
        background: theme.bg
      }
    });
  }
  let replacementCount = 0;
  const replacementMap = /* @__PURE__ */ new Map();
  function getReplacementColor(value) {
    var _a3;
    if (replacementMap.has(value))
      return replacementMap.get(value);
    replacementCount += 1;
    const hex = `#${replacementCount.toString(16).padStart(8, "0").toLowerCase()}`;
    if ((_a3 = theme.colorReplacements) == null ? void 0 : _a3[`#${hex}`])
      return getReplacementColor(value);
    replacementMap.set(value, hex);
    return hex;
  }
  theme.settings = theme.settings.map((setting) => {
    var _a3, _b3;
    const replaceFg = ((_a3 = setting.settings) == null ? void 0 : _a3.foreground) && !setting.settings.foreground.startsWith("#");
    const replaceBg = ((_b3 = setting.settings) == null ? void 0 : _b3.background) && !setting.settings.background.startsWith("#");
    if (!replaceFg && !replaceBg)
      return setting;
    const clone2 = {
      ...setting,
      settings: {
        ...setting.settings
      }
    };
    if (replaceFg) {
      const replacement = getReplacementColor(setting.settings.foreground);
      theme.colorReplacements[replacement] = setting.settings.foreground;
      clone2.settings.foreground = replacement;
    }
    if (replaceBg) {
      const replacement = getReplacementColor(setting.settings.background);
      theme.colorReplacements[replacement] = setting.settings.background;
      clone2.settings.background = replacement;
    }
    return clone2;
  });
  for (const key2 of Object.keys(theme.colors || {})) {
    if (key2 === "editor.foreground" || key2 === "editor.background" || key2.startsWith("terminal.ansi")) {
      if (!((_e = theme.colors[key2]) == null ? void 0 : _e.startsWith("#"))) {
        const replacement = getReplacementColor(theme.colors[key2]);
        theme.colorReplacements[replacement] = theme.colors[key2];
        theme.colors[key2] = replacement;
      }
    }
  }
  Object.defineProperty(theme, RESOLVED_KEY, {
    enumerable: false,
    writable: false,
    value: true
  });
  return theme;
}
async function resolveLangs(langs) {
  return Array.from(new Set((await Promise.all(
    langs.filter((l) => !isSpecialLang(l)).map(async (lang2) => await normalizeGetter(lang2).then((r) => Array.isArray(r) ? r : [r]))
  )).flat()));
}
async function resolveThemes(themes) {
  const resolved = await Promise.all(
    themes.map(
      async (theme) => isSpecialTheme(theme) ? null : normalizeTheme(await normalizeGetter(theme))
    )
  );
  return resolved.filter((i) => !!i);
}
let _emitDeprecation = 3;
function warnDeprecated(message, version = 3) {
  if (version > _emitDeprecation)
    return;
  {
    console.trace(`[SHIKI DEPRECATE]: ${message}`);
  }
}
let ShikiError$1 = class ShikiError2 extends Error {
  constructor(message) {
    super(message);
    this.name = "ShikiError";
  }
};
class Registry2 extends Registry$1 {
  constructor(_resolver, _themes, _langs, _alias = {}) {
    super(_resolver);
    __publicField(this, "_resolvedThemes", /* @__PURE__ */ new Map());
    __publicField(this, "_resolvedGrammars", /* @__PURE__ */ new Map());
    __publicField(this, "_langMap", /* @__PURE__ */ new Map());
    __publicField(this, "_langGraph", /* @__PURE__ */ new Map());
    __publicField(this, "_textmateThemeCache", /* @__PURE__ */ new WeakMap());
    __publicField(this, "_loadedThemesCache", null);
    __publicField(this, "_loadedLanguagesCache", null);
    this._resolver = _resolver;
    this._themes = _themes;
    this._langs = _langs;
    this._alias = _alias;
    this._themes.map((t) => this.loadTheme(t));
    this.loadLanguages(this._langs);
  }
  getTheme(theme) {
    if (typeof theme === "string")
      return this._resolvedThemes.get(theme);
    else
      return this.loadTheme(theme);
  }
  loadTheme(theme) {
    const _theme = normalizeTheme(theme);
    if (_theme.name) {
      this._resolvedThemes.set(_theme.name, _theme);
      this._loadedThemesCache = null;
    }
    return _theme;
  }
  getLoadedThemes() {
    if (!this._loadedThemesCache)
      this._loadedThemesCache = [...this._resolvedThemes.keys()];
    return this._loadedThemesCache;
  }
  // Override and re-implement this method to cache the textmate themes as `TextMateTheme.createFromRawTheme`
  // is expensive. Themes can switch often especially for dual-theme support.
  //
  // The parent class also accepts `colorMap` as the second parameter, but since we don't use that,
  // we omit here so it's easier to cache the themes.
  setTheme(theme) {
    let textmateTheme = this._textmateThemeCache.get(theme);
    if (!textmateTheme) {
      textmateTheme = Theme.createFromRawTheme(theme);
      this._textmateThemeCache.set(theme, textmateTheme);
    }
    this._syncRegistry.setTheme(textmateTheme);
  }
  getGrammar(name) {
    if (this._alias[name]) {
      const resolved = /* @__PURE__ */ new Set([name]);
      while (this._alias[name]) {
        name = this._alias[name];
        if (resolved.has(name))
          throw new ShikiError$1(`Circular alias \`${Array.from(resolved).join(" -> ")} -> ${name}\``);
        resolved.add(name);
      }
    }
    return this._resolvedGrammars.get(name);
  }
  loadLanguage(lang2) {
    var _a2, _b2, _c, _d;
    if (this.getGrammar(lang2.name))
      return;
    const embeddedLazilyBy = new Set(
      [...this._langMap.values()].filter((i) => {
        var _a3;
        return (_a3 = i.embeddedLangsLazy) == null ? void 0 : _a3.includes(lang2.name);
      })
    );
    this._resolver.addLanguage(lang2);
    const grammarConfig = {
      balancedBracketSelectors: lang2.balancedBracketSelectors || ["*"],
      unbalancedBracketSelectors: lang2.unbalancedBracketSelectors || []
    };
    this._syncRegistry._rawGrammars.set(lang2.scopeName, lang2);
    const g = this.loadGrammarWithConfiguration(lang2.scopeName, 1, grammarConfig);
    g.name = lang2.name;
    this._resolvedGrammars.set(lang2.name, g);
    if (lang2.aliases) {
      lang2.aliases.forEach((alias) => {
        this._alias[alias] = lang2.name;
      });
    }
    this._loadedLanguagesCache = null;
    if (embeddedLazilyBy.size) {
      for (const e of embeddedLazilyBy) {
        this._resolvedGrammars.delete(e.name);
        this._loadedLanguagesCache = null;
        (_b2 = (_a2 = this._syncRegistry) == null ? void 0 : _a2._injectionGrammars) == null ? void 0 : _b2.delete(e.scopeName);
        (_d = (_c = this._syncRegistry) == null ? void 0 : _c._grammars) == null ? void 0 : _d.delete(e.scopeName);
        this.loadLanguage(this._langMap.get(e.name));
      }
    }
  }
  dispose() {
    super.dispose();
    this._resolvedThemes.clear();
    this._resolvedGrammars.clear();
    this._langMap.clear();
    this._langGraph.clear();
    this._loadedThemesCache = null;
  }
  loadLanguages(langs) {
    for (const lang2 of langs)
      this.resolveEmbeddedLanguages(lang2);
    const langsGraphArray = Array.from(this._langGraph.entries());
    const missingLangs = langsGraphArray.filter(([_, lang2]) => !lang2);
    if (missingLangs.length) {
      const dependents = langsGraphArray.filter(([_, lang2]) => {
        var _a2;
        return lang2 && ((_a2 = lang2.embeddedLangs) == null ? void 0 : _a2.some((l) => missingLangs.map(([name]) => name).includes(l)));
      }).filter((lang2) => !missingLangs.includes(lang2));
      throw new ShikiError$1(`Missing languages ${missingLangs.map(([name]) => `\`${name}\``).join(", ")}, required by ${dependents.map(([name]) => `\`${name}\``).join(", ")}`);
    }
    for (const [_, lang2] of langsGraphArray)
      this._resolver.addLanguage(lang2);
    for (const [_, lang2] of langsGraphArray)
      this.loadLanguage(lang2);
  }
  getLoadedLanguages() {
    if (!this._loadedLanguagesCache) {
      this._loadedLanguagesCache = [
        .../* @__PURE__ */ new Set([...this._resolvedGrammars.keys(), ...Object.keys(this._alias)])
      ];
    }
    return this._loadedLanguagesCache;
  }
  resolveEmbeddedLanguages(lang2) {
    this._langMap.set(lang2.name, lang2);
    this._langGraph.set(lang2.name, lang2);
    if (lang2.embeddedLangs) {
      for (const embeddedLang of lang2.embeddedLangs)
        this._langGraph.set(embeddedLang, this._langMap.get(embeddedLang));
    }
  }
}
class Resolver {
  constructor(engine, langs) {
    __publicField(this, "_langs", /* @__PURE__ */ new Map());
    __publicField(this, "_scopeToLang", /* @__PURE__ */ new Map());
    __publicField(this, "_injections", /* @__PURE__ */ new Map());
    __publicField(this, "_onigLib");
    this._onigLib = {
      createOnigScanner: (patterns) => engine.createScanner(patterns),
      createOnigString: (s) => engine.createString(s)
    };
    langs.forEach((i) => this.addLanguage(i));
  }
  get onigLib() {
    return this._onigLib;
  }
  getLangRegistration(langIdOrAlias) {
    return this._langs.get(langIdOrAlias);
  }
  loadGrammar(scopeName) {
    return this._scopeToLang.get(scopeName);
  }
  addLanguage(l) {
    this._langs.set(l.name, l);
    if (l.aliases) {
      l.aliases.forEach((a) => {
        this._langs.set(a, l);
      });
    }
    this._scopeToLang.set(l.scopeName, l);
    if (l.injectTo) {
      l.injectTo.forEach((i) => {
        if (!this._injections.get(i))
          this._injections.set(i, []);
        this._injections.get(i).push(l.scopeName);
      });
    }
  }
  getInjections(scopeName) {
    const scopeParts = scopeName.split(".");
    let injections = [];
    for (let i = 1; i <= scopeParts.length; i++) {
      const subScopeName = scopeParts.slice(0, i).join(".");
      injections = [...injections, ...this._injections.get(subScopeName) || []];
    }
    return injections;
  }
}
let instancesCount = 0;
function createShikiInternalSync(options) {
  instancesCount += 1;
  if (options.warnings !== false && instancesCount >= 10 && instancesCount % 10 === 0)
    console.warn(`[Shiki] ${instancesCount} instances have been created. Shiki is supposed to be used as a singleton, consider refactoring your code to cache your highlighter instance; Or call \`highlighter.dispose()\` to release unused instances.`);
  let isDisposed = false;
  if (!options.engine)
    throw new ShikiError$1("`engine` option is required for synchronous mode");
  const langs = (options.langs || []).flat(1);
  const themes = (options.themes || []).flat(1).map(normalizeTheme);
  const resolver = new Resolver(options.engine, langs);
  const _registry = new Registry2(resolver, themes, langs, options.langAlias);
  let _lastTheme;
  function getLanguage(name) {
    ensureNotDisposed();
    const _lang = _registry.getGrammar(typeof name === "string" ? name : name.name);
    if (!_lang)
      throw new ShikiError$1(`Language \`${name}\` not found, you may need to load it first`);
    return _lang;
  }
  function getTheme(name) {
    if (name === "none")
      return { bg: "", fg: "", name: "none", settings: [], type: "dark" };
    ensureNotDisposed();
    const _theme = _registry.getTheme(name);
    if (!_theme)
      throw new ShikiError$1(`Theme \`${name}\` not found, you may need to load it first`);
    return _theme;
  }
  function setTheme(name) {
    ensureNotDisposed();
    const theme = getTheme(name);
    if (_lastTheme !== name) {
      _registry.setTheme(theme);
      _lastTheme = name;
    }
    const colorMap = _registry.getColorMap();
    return {
      theme,
      colorMap
    };
  }
  function getLoadedThemes() {
    ensureNotDisposed();
    return _registry.getLoadedThemes();
  }
  function getLoadedLanguages() {
    ensureNotDisposed();
    return _registry.getLoadedLanguages();
  }
  function loadLanguageSync(...langs2) {
    ensureNotDisposed();
    _registry.loadLanguages(langs2.flat(1));
  }
  async function loadLanguage(...langs2) {
    return loadLanguageSync(await resolveLangs(langs2));
  }
  function loadThemeSync(...themes2) {
    ensureNotDisposed();
    for (const theme of themes2.flat(1)) {
      _registry.loadTheme(theme);
    }
  }
  async function loadTheme(...themes2) {
    ensureNotDisposed();
    return loadThemeSync(await resolveThemes(themes2));
  }
  function ensureNotDisposed() {
    if (isDisposed)
      throw new ShikiError$1("Shiki instance has been disposed");
  }
  function dispose() {
    if (isDisposed)
      return;
    isDisposed = true;
    _registry.dispose();
    instancesCount -= 1;
  }
  return {
    setTheme,
    getTheme,
    getLanguage,
    getLoadedThemes,
    getLoadedLanguages,
    loadLanguage,
    loadLanguageSync,
    loadTheme,
    loadThemeSync,
    dispose,
    [Symbol.dispose]: dispose
  };
}
async function createShikiInternal(options) {
  if (!options.engine) {
    warnDeprecated("`engine` option is required. Use `createOnigurumaEngine` or `createJavaScriptRegexEngine` to create an engine.");
  }
  const [
    themes,
    langs,
    engine
  ] = await Promise.all([
    resolveThemes(options.themes || []),
    resolveLangs(options.langs || []),
    options.engine
  ]);
  return createShikiInternalSync({
    ...options,
    themes,
    langs,
    engine
  });
}
async function createHighlighterCore(options) {
  const internal = await createShikiInternal(options);
  return {
    getLastGrammarState: (...args) => getLastGrammarState(internal, ...args),
    codeToTokensBase: (code, options2) => codeToTokensBase(internal, code, options2),
    codeToTokensWithThemes: (code, options2) => codeToTokensWithThemes(internal, code, options2),
    codeToTokens: (code, options2) => codeToTokens(internal, code, options2),
    codeToHast: (code, options2) => codeToHast(internal, code, options2),
    codeToHtml: (code, options2) => codeToHtml(internal, code, options2),
    getBundledLanguages: () => ({}),
    getBundledThemes: () => ({}),
    ...internal,
    getInternalContext: () => internal
  };
}
class ShikiError3 extends Error {
  constructor(message) {
    super(message);
    this.name = "ShikiError";
  }
}
function getHeapMax() {
  return 2147483648;
}
function _emscripten_get_now() {
  return typeof performance !== "undefined" ? performance.now() : Date.now();
}
const alignUp = (x, multiple) => x + (multiple - x % multiple) % multiple;
async function main(init) {
  let wasmMemory;
  let buffer;
  const binding = {};
  function updateGlobalBufferAndViews(buf) {
    buffer = buf;
    binding.HEAPU8 = new Uint8Array(buf);
    binding.HEAPU32 = new Uint32Array(buf);
  }
  function _emscripten_memcpy_big(dest, src, num) {
    binding.HEAPU8.copyWithin(dest, src, src + num);
  }
  function emscripten_realloc_buffer(size) {
    try {
      wasmMemory.grow(size - buffer.byteLength + 65535 >>> 16);
      updateGlobalBufferAndViews(wasmMemory.buffer);
      return 1;
    } catch {
    }
  }
  function _emscripten_resize_heap(requestedSize) {
    const oldSize = binding.HEAPU8.length;
    requestedSize = requestedSize >>> 0;
    const maxHeapSize = getHeapMax();
    if (requestedSize > maxHeapSize)
      return false;
    for (let cutDown = 1; cutDown <= 4; cutDown *= 2) {
      let overGrownHeapSize = oldSize * (1 + 0.2 / cutDown);
      overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
      const newSize = Math.min(maxHeapSize, alignUp(Math.max(requestedSize, overGrownHeapSize), 65536));
      const replacement = emscripten_realloc_buffer(newSize);
      if (replacement)
        return true;
    }
    return false;
  }
  const UTF8Decoder = typeof TextDecoder != "undefined" ? new TextDecoder("utf8") : void 0;
  function UTF8ArrayToString(heapOrArray, idx, maxBytesToRead = 1024) {
    const endIdx = idx + maxBytesToRead;
    let endPtr = idx;
    while (heapOrArray[endPtr] && !(endPtr >= endIdx)) ++endPtr;
    if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
      return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
    }
    let str2 = "";
    while (idx < endPtr) {
      let u0 = heapOrArray[idx++];
      if (!(u0 & 128)) {
        str2 += String.fromCharCode(u0);
        continue;
      }
      const u1 = heapOrArray[idx++] & 63;
      if ((u0 & 224) === 192) {
        str2 += String.fromCharCode((u0 & 31) << 6 | u1);
        continue;
      }
      const u2 = heapOrArray[idx++] & 63;
      if ((u0 & 240) === 224) {
        u0 = (u0 & 15) << 12 | u1 << 6 | u2;
      } else {
        u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | heapOrArray[idx++] & 63;
      }
      if (u0 < 65536) {
        str2 += String.fromCharCode(u0);
      } else {
        const ch = u0 - 65536;
        str2 += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
      }
    }
    return str2;
  }
  function UTF8ToString(ptr, maxBytesToRead) {
    return ptr ? UTF8ArrayToString(binding.HEAPU8, ptr, maxBytesToRead) : "";
  }
  const asmLibraryArg = {
    emscripten_get_now: _emscripten_get_now,
    emscripten_memcpy_big: _emscripten_memcpy_big,
    emscripten_resize_heap: _emscripten_resize_heap,
    fd_write: () => 0
  };
  async function createWasm() {
    const info = {
      env: asmLibraryArg,
      wasi_snapshot_preview1: asmLibraryArg
    };
    const exports = await init(info);
    wasmMemory = exports.memory;
    updateGlobalBufferAndViews(wasmMemory.buffer);
    Object.assign(binding, exports);
    binding.UTF8ToString = UTF8ToString;
  }
  await createWasm();
  return binding;
}
var __defProp2 = Object.defineProperty;
var __defNormalProp2 = (obj, key2, value) => key2 in obj ? __defProp2(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
var __publicField2 = (obj, key2, value) => __defNormalProp2(obj, typeof key2 !== "symbol" ? key2 + "" : key2, value);
let onigBinding = null;
function throwLastOnigError(onigBinding2) {
  throw new ShikiError3(onigBinding2.UTF8ToString(onigBinding2.getLastOnigError()));
}
class UtfString {
  constructor(str2) {
    __publicField2(this, "utf16Length");
    __publicField2(this, "utf8Length");
    __publicField2(this, "utf16Value");
    __publicField2(this, "utf8Value");
    __publicField2(this, "utf16OffsetToUtf8");
    __publicField2(this, "utf8OffsetToUtf16");
    const utf16Length = str2.length;
    const utf8Length = UtfString._utf8ByteLength(str2);
    const computeIndicesMapping = utf8Length !== utf16Length;
    const utf16OffsetToUtf8 = computeIndicesMapping ? new Uint32Array(utf16Length + 1) : null;
    if (computeIndicesMapping)
      utf16OffsetToUtf8[utf16Length] = utf8Length;
    const utf8OffsetToUtf16 = computeIndicesMapping ? new Uint32Array(utf8Length + 1) : null;
    if (computeIndicesMapping)
      utf8OffsetToUtf16[utf8Length] = utf16Length;
    const utf8Value = new Uint8Array(utf8Length);
    let i8 = 0;
    for (let i16 = 0; i16 < utf16Length; i16++) {
      const charCode = str2.charCodeAt(i16);
      let codePoint = charCode;
      let wasSurrogatePair = false;
      if (charCode >= 55296 && charCode <= 56319) {
        if (i16 + 1 < utf16Length) {
          const nextCharCode = str2.charCodeAt(i16 + 1);
          if (nextCharCode >= 56320 && nextCharCode <= 57343) {
            codePoint = (charCode - 55296 << 10) + 65536 | nextCharCode - 56320;
            wasSurrogatePair = true;
          }
        }
      }
      if (computeIndicesMapping) {
        utf16OffsetToUtf8[i16] = i8;
        if (wasSurrogatePair)
          utf16OffsetToUtf8[i16 + 1] = i8;
        if (codePoint <= 127) {
          utf8OffsetToUtf16[i8 + 0] = i16;
        } else if (codePoint <= 2047) {
          utf8OffsetToUtf16[i8 + 0] = i16;
          utf8OffsetToUtf16[i8 + 1] = i16;
        } else if (codePoint <= 65535) {
          utf8OffsetToUtf16[i8 + 0] = i16;
          utf8OffsetToUtf16[i8 + 1] = i16;
          utf8OffsetToUtf16[i8 + 2] = i16;
        } else {
          utf8OffsetToUtf16[i8 + 0] = i16;
          utf8OffsetToUtf16[i8 + 1] = i16;
          utf8OffsetToUtf16[i8 + 2] = i16;
          utf8OffsetToUtf16[i8 + 3] = i16;
        }
      }
      if (codePoint <= 127) {
        utf8Value[i8++] = codePoint;
      } else if (codePoint <= 2047) {
        utf8Value[i8++] = 192 | (codePoint & 1984) >>> 6;
        utf8Value[i8++] = 128 | (codePoint & 63) >>> 0;
      } else if (codePoint <= 65535) {
        utf8Value[i8++] = 224 | (codePoint & 61440) >>> 12;
        utf8Value[i8++] = 128 | (codePoint & 4032) >>> 6;
        utf8Value[i8++] = 128 | (codePoint & 63) >>> 0;
      } else {
        utf8Value[i8++] = 240 | (codePoint & 1835008) >>> 18;
        utf8Value[i8++] = 128 | (codePoint & 258048) >>> 12;
        utf8Value[i8++] = 128 | (codePoint & 4032) >>> 6;
        utf8Value[i8++] = 128 | (codePoint & 63) >>> 0;
      }
      if (wasSurrogatePair)
        i16++;
    }
    this.utf16Length = utf16Length;
    this.utf8Length = utf8Length;
    this.utf16Value = str2;
    this.utf8Value = utf8Value;
    this.utf16OffsetToUtf8 = utf16OffsetToUtf8;
    this.utf8OffsetToUtf16 = utf8OffsetToUtf16;
  }
  static _utf8ByteLength(str2) {
    let result = 0;
    for (let i = 0, len = str2.length; i < len; i++) {
      const charCode = str2.charCodeAt(i);
      let codepoint = charCode;
      let wasSurrogatePair = false;
      if (charCode >= 55296 && charCode <= 56319) {
        if (i + 1 < len) {
          const nextCharCode = str2.charCodeAt(i + 1);
          if (nextCharCode >= 56320 && nextCharCode <= 57343) {
            codepoint = (charCode - 55296 << 10) + 65536 | nextCharCode - 56320;
            wasSurrogatePair = true;
          }
        }
      }
      if (codepoint <= 127)
        result += 1;
      else if (codepoint <= 2047)
        result += 2;
      else if (codepoint <= 65535)
        result += 3;
      else
        result += 4;
      if (wasSurrogatePair)
        i++;
    }
    return result;
  }
  createString(onigBinding2) {
    const result = onigBinding2.omalloc(this.utf8Length);
    onigBinding2.HEAPU8.set(this.utf8Value, result);
    return result;
  }
}
const _OnigString = class _OnigString2 {
  constructor(str2) {
    __publicField2(this, "id", ++_OnigString2.LAST_ID);
    __publicField2(this, "_onigBinding");
    __publicField2(this, "content");
    __publicField2(this, "utf16Length");
    __publicField2(this, "utf8Length");
    __publicField2(this, "utf16OffsetToUtf8");
    __publicField2(this, "utf8OffsetToUtf16");
    __publicField2(this, "ptr");
    if (!onigBinding)
      throw new ShikiError3("Must invoke loadWasm first.");
    this._onigBinding = onigBinding;
    this.content = str2;
    const utfString = new UtfString(str2);
    this.utf16Length = utfString.utf16Length;
    this.utf8Length = utfString.utf8Length;
    this.utf16OffsetToUtf8 = utfString.utf16OffsetToUtf8;
    this.utf8OffsetToUtf16 = utfString.utf8OffsetToUtf16;
    if (this.utf8Length < 1e4 && !_OnigString2._sharedPtrInUse) {
      if (!_OnigString2._sharedPtr)
        _OnigString2._sharedPtr = onigBinding.omalloc(1e4);
      _OnigString2._sharedPtrInUse = true;
      onigBinding.HEAPU8.set(utfString.utf8Value, _OnigString2._sharedPtr);
      this.ptr = _OnigString2._sharedPtr;
    } else {
      this.ptr = utfString.createString(onigBinding);
    }
  }
  convertUtf8OffsetToUtf16(utf8Offset) {
    if (this.utf8OffsetToUtf16) {
      if (utf8Offset < 0)
        return 0;
      if (utf8Offset > this.utf8Length)
        return this.utf16Length;
      return this.utf8OffsetToUtf16[utf8Offset];
    }
    return utf8Offset;
  }
  convertUtf16OffsetToUtf8(utf16Offset) {
    if (this.utf16OffsetToUtf8) {
      if (utf16Offset < 0)
        return 0;
      if (utf16Offset > this.utf16Length)
        return this.utf8Length;
      return this.utf16OffsetToUtf8[utf16Offset];
    }
    return utf16Offset;
  }
  dispose() {
    if (this.ptr === _OnigString2._sharedPtr)
      _OnigString2._sharedPtrInUse = false;
    else
      this._onigBinding.ofree(this.ptr);
  }
};
__publicField2(_OnigString, "LAST_ID", 0);
__publicField2(_OnigString, "_sharedPtr", 0);
__publicField2(_OnigString, "_sharedPtrInUse", false);
let OnigString = _OnigString;
class OnigScanner {
  constructor(patterns) {
    __publicField2(this, "_onigBinding");
    __publicField2(this, "_ptr");
    if (!onigBinding)
      throw new ShikiError3("Must invoke loadWasm first.");
    const strPtrsArr = [];
    const strLenArr = [];
    for (let i = 0, len = patterns.length; i < len; i++) {
      const utfString = new UtfString(patterns[i]);
      strPtrsArr[i] = utfString.createString(onigBinding);
      strLenArr[i] = utfString.utf8Length;
    }
    const strPtrsPtr = onigBinding.omalloc(4 * patterns.length);
    onigBinding.HEAPU32.set(strPtrsArr, strPtrsPtr / 4);
    const strLenPtr = onigBinding.omalloc(4 * patterns.length);
    onigBinding.HEAPU32.set(strLenArr, strLenPtr / 4);
    const scannerPtr = onigBinding.createOnigScanner(strPtrsPtr, strLenPtr, patterns.length);
    for (let i = 0, len = patterns.length; i < len; i++)
      onigBinding.ofree(strPtrsArr[i]);
    onigBinding.ofree(strLenPtr);
    onigBinding.ofree(strPtrsPtr);
    if (scannerPtr === 0)
      throwLastOnigError(onigBinding);
    this._onigBinding = onigBinding;
    this._ptr = scannerPtr;
  }
  dispose() {
    this._onigBinding.freeOnigScanner(this._ptr);
  }
  findNextMatchSync(string, startPosition, arg) {
    let options = 0;
    if (typeof arg === "number") {
      options = arg;
    }
    if (typeof string === "string") {
      string = new OnigString(string);
      const result = this._findNextMatchSync(string, startPosition, false, options);
      string.dispose();
      return result;
    }
    return this._findNextMatchSync(string, startPosition, false, options);
  }
  _findNextMatchSync(string, startPosition, debugCall, options) {
    const onigBinding2 = this._onigBinding;
    const resultPtr = onigBinding2.findNextOnigScannerMatch(this._ptr, string.id, string.ptr, string.utf8Length, string.convertUtf16OffsetToUtf8(startPosition), options);
    if (resultPtr === 0) {
      return null;
    }
    const HEAPU32 = onigBinding2.HEAPU32;
    let offset2 = resultPtr / 4;
    const index2 = HEAPU32[offset2++];
    const count2 = HEAPU32[offset2++];
    const captureIndices = [];
    for (let i = 0; i < count2; i++) {
      const beg = string.convertUtf8OffsetToUtf16(HEAPU32[offset2++]);
      const end = string.convertUtf8OffsetToUtf16(HEAPU32[offset2++]);
      captureIndices[i] = {
        start: beg,
        end,
        length: end - beg
      };
    }
    return {
      index: index2,
      captureIndices
    };
  }
}
function isInstantiatorOptionsObject(dataOrOptions) {
  return typeof dataOrOptions.instantiator === "function";
}
function isInstantiatorModule(dataOrOptions) {
  return typeof dataOrOptions.default === "function";
}
function isDataOptionsObject(dataOrOptions) {
  return typeof dataOrOptions.data !== "undefined";
}
function isResponse(dataOrOptions) {
  return typeof Response !== "undefined" && dataOrOptions instanceof Response;
}
function isArrayBuffer(data) {
  var _a2;
  return typeof ArrayBuffer !== "undefined" && (data instanceof ArrayBuffer || ArrayBuffer.isView(data)) || typeof Buffer !== "undefined" && ((_a2 = Buffer.isBuffer) == null ? void 0 : _a2.call(Buffer, data)) || typeof SharedArrayBuffer !== "undefined" && data instanceof SharedArrayBuffer || typeof Uint32Array !== "undefined" && data instanceof Uint32Array;
}
let initPromise;
function loadWasm(options) {
  if (initPromise)
    return initPromise;
  async function _load() {
    onigBinding = await main(async (info) => {
      let instance = options;
      instance = await instance;
      if (typeof instance === "function")
        instance = await instance(info);
      if (typeof instance === "function")
        instance = await instance(info);
      if (isInstantiatorOptionsObject(instance)) {
        instance = await instance.instantiator(info);
      } else if (isInstantiatorModule(instance)) {
        instance = await instance.default(info);
      } else {
        if (isDataOptionsObject(instance))
          instance = instance.data;
        if (isResponse(instance)) {
          if (typeof WebAssembly.instantiateStreaming === "function")
            instance = await _makeResponseStreamingLoader(instance)(info);
          else
            instance = await _makeResponseNonStreamingLoader(instance)(info);
        } else if (isArrayBuffer(instance)) {
          instance = await _makeArrayBufferLoader(instance)(info);
        } else if (instance instanceof WebAssembly.Module) {
          instance = await _makeArrayBufferLoader(instance)(info);
        } else if ("default" in instance && instance.default instanceof WebAssembly.Module) {
          instance = await _makeArrayBufferLoader(instance.default)(info);
        }
      }
      if ("instance" in instance)
        instance = instance.instance;
      if ("exports" in instance)
        instance = instance.exports;
      return instance;
    });
  }
  initPromise = _load();
  return initPromise;
}
function _makeArrayBufferLoader(data) {
  return (importObject) => WebAssembly.instantiate(data, importObject);
}
function _makeResponseStreamingLoader(data) {
  return (importObject) => WebAssembly.instantiateStreaming(data, importObject);
}
function _makeResponseNonStreamingLoader(data) {
  return async (importObject) => {
    const arrayBuffer = await data.arrayBuffer();
    return WebAssembly.instantiate(arrayBuffer, importObject);
  };
}
async function createOnigurumaEngine(options) {
  if (options)
    await loadWasm(options);
  return {
    createScanner(patterns) {
      return new OnigScanner(patterns.map((p2) => typeof p2 === "string" ? p2 : p2.source));
    },
    createString(s) {
      return new OnigString(s);
    }
  };
}
/*! js-yaml 4.1.0 https://github.com/nodeca/js-yaml @license MIT */
function isNothing(subject) {
  return typeof subject === "undefined" || subject === null;
}
function isObject(subject) {
  return typeof subject === "object" && subject !== null;
}
function toArray(sequence) {
  if (Array.isArray(sequence)) return sequence;
  else if (isNothing(sequence)) return [];
  return [sequence];
}
function extend(target, source) {
  var index2, length, key2, sourceKeys;
  if (source) {
    sourceKeys = Object.keys(source);
    for (index2 = 0, length = sourceKeys.length; index2 < length; index2 += 1) {
      key2 = sourceKeys[index2];
      target[key2] = source[key2];
    }
  }
  return target;
}
function repeat(string, count2) {
  var result = "", cycle;
  for (cycle = 0; cycle < count2; cycle += 1) {
    result += string;
  }
  return result;
}
function isNegativeZero(number2) {
  return number2 === 0 && Number.NEGATIVE_INFINITY === 1 / number2;
}
var isNothing_1 = isNothing;
var isObject_1 = isObject;
var toArray_1 = toArray;
var repeat_1 = repeat;
var isNegativeZero_1 = isNegativeZero;
var extend_1 = extend;
var common = {
  isNothing: isNothing_1,
  isObject: isObject_1,
  toArray: toArray_1,
  repeat: repeat_1,
  isNegativeZero: isNegativeZero_1,
  extend: extend_1
};
function formatError(exception2, compact) {
  var where = "", message = exception2.reason || "(unknown reason)";
  if (!exception2.mark) return message;
  if (exception2.mark.name) {
    where += 'in "' + exception2.mark.name + '" ';
  }
  where += "(" + (exception2.mark.line + 1) + ":" + (exception2.mark.column + 1) + ")";
  if (!compact && exception2.mark.snippet) {
    where += "\n\n" + exception2.mark.snippet;
  }
  return message + " " + where;
}
function YAMLException$1(reason, mark2) {
  Error.call(this);
  this.name = "YAMLException";
  this.reason = reason;
  this.mark = mark2;
  this.message = formatError(this, false);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = new Error().stack || "";
  }
}
YAMLException$1.prototype = Object.create(Error.prototype);
YAMLException$1.prototype.constructor = YAMLException$1;
YAMLException$1.prototype.toString = function toString(compact) {
  return this.name + ": " + formatError(this, compact);
};
var exception = YAMLException$1;
var TYPE_CONSTRUCTOR_OPTIONS = [
  "kind",
  "multi",
  "resolve",
  "construct",
  "instanceOf",
  "predicate",
  "represent",
  "representName",
  "defaultStyle",
  "styleAliases"
];
var YAML_NODE_KINDS = [
  "scalar",
  "sequence",
  "mapping"
];
function compileStyleAliases(map2) {
  var result = {};
  if (map2 !== null) {
    Object.keys(map2).forEach(function(style) {
      map2[style].forEach(function(alias) {
        result[String(alias)] = style;
      });
    });
  }
  return result;
}
function Type$1(tag, options) {
  options = options || {};
  Object.keys(options).forEach(function(name) {
    if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name) === -1) {
      throw new exception('Unknown option "' + name + '" is met in definition of "' + tag + '" YAML type.');
    }
  });
  this.options = options;
  this.tag = tag;
  this.kind = options["kind"] || null;
  this.resolve = options["resolve"] || function() {
    return true;
  };
  this.construct = options["construct"] || function(data) {
    return data;
  };
  this.instanceOf = options["instanceOf"] || null;
  this.predicate = options["predicate"] || null;
  this.represent = options["represent"] || null;
  this.representName = options["representName"] || null;
  this.defaultStyle = options["defaultStyle"] || null;
  this.multi = options["multi"] || false;
  this.styleAliases = compileStyleAliases(options["styleAliases"] || null);
  if (YAML_NODE_KINDS.indexOf(this.kind) === -1) {
    throw new exception('Unknown kind "' + this.kind + '" is specified for "' + tag + '" YAML type.');
  }
}
var type = Type$1;
function compileList(schema2, name) {
  var result = [];
  schema2[name].forEach(function(currentType) {
    var newIndex = result.length;
    result.forEach(function(previousType, previousIndex) {
      if (previousType.tag === currentType.tag && previousType.kind === currentType.kind && previousType.multi === currentType.multi) {
        newIndex = previousIndex;
      }
    });
    result[newIndex] = currentType;
  });
  return result;
}
function compileMap() {
  var result = {
    scalar: {},
    sequence: {},
    mapping: {},
    fallback: {},
    multi: {
      scalar: [],
      sequence: [],
      mapping: [],
      fallback: []
    }
  }, index2, length;
  function collectType(type2) {
    if (type2.multi) {
      result.multi[type2.kind].push(type2);
      result.multi["fallback"].push(type2);
    } else {
      result[type2.kind][type2.tag] = result["fallback"][type2.tag] = type2;
    }
  }
  for (index2 = 0, length = arguments.length; index2 < length; index2 += 1) {
    arguments[index2].forEach(collectType);
  }
  return result;
}
function Schema$1(definition) {
  return this.extend(definition);
}
Schema$1.prototype.extend = function extend2(definition) {
  var implicit = [];
  var explicit = [];
  if (definition instanceof type) {
    explicit.push(definition);
  } else if (Array.isArray(definition)) {
    explicit = explicit.concat(definition);
  } else if (definition && (Array.isArray(definition.implicit) || Array.isArray(definition.explicit))) {
    if (definition.implicit) implicit = implicit.concat(definition.implicit);
    if (definition.explicit) explicit = explicit.concat(definition.explicit);
  } else {
    throw new exception("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  }
  implicit.forEach(function(type$1) {
    if (!(type$1 instanceof type)) {
      throw new exception("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    }
    if (type$1.loadKind && type$1.loadKind !== "scalar") {
      throw new exception("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    }
    if (type$1.multi) {
      throw new exception("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
    }
  });
  explicit.forEach(function(type$1) {
    if (!(type$1 instanceof type)) {
      throw new exception("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    }
  });
  var result = Object.create(Schema$1.prototype);
  result.implicit = (this.implicit || []).concat(implicit);
  result.explicit = (this.explicit || []).concat(explicit);
  result.compiledImplicit = compileList(result, "implicit");
  result.compiledExplicit = compileList(result, "explicit");
  result.compiledTypeMap = compileMap(result.compiledImplicit, result.compiledExplicit);
  return result;
};
var schema = Schema$1;
var str = new type("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(data) {
    return data !== null ? data : "";
  }
});
var seq = new type("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(data) {
    return data !== null ? data : [];
  }
});
var map = new type("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(data) {
    return data !== null ? data : {};
  }
});
var failsafe = new schema({
  explicit: [
    str,
    seq,
    map
  ]
});
function resolveYamlNull(data) {
  if (data === null) return true;
  var max2 = data.length;
  return max2 === 1 && data === "~" || max2 === 4 && (data === "null" || data === "Null" || data === "NULL");
}
function constructYamlNull() {
  return null;
}
function isNull(object) {
  return object === null;
}
var _null = new type("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: resolveYamlNull,
  construct: constructYamlNull,
  predicate: isNull,
  represent: {
    canonical: function() {
      return "~";
    },
    lowercase: function() {
      return "null";
    },
    uppercase: function() {
      return "NULL";
    },
    camelcase: function() {
      return "Null";
    },
    empty: function() {
      return "";
    }
  },
  defaultStyle: "lowercase"
});
function resolveYamlBoolean(data) {
  if (data === null) return false;
  var max2 = data.length;
  return max2 === 4 && (data === "true" || data === "True" || data === "TRUE") || max2 === 5 && (data === "false" || data === "False" || data === "FALSE");
}
function constructYamlBoolean(data) {
  return data === "true" || data === "True" || data === "TRUE";
}
function isBoolean(object) {
  return Object.prototype.toString.call(object) === "[object Boolean]";
}
var bool = new type("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: resolveYamlBoolean,
  construct: constructYamlBoolean,
  predicate: isBoolean,
  represent: {
    lowercase: function(object) {
      return object ? "true" : "false";
    },
    uppercase: function(object) {
      return object ? "TRUE" : "FALSE";
    },
    camelcase: function(object) {
      return object ? "True" : "False";
    }
  },
  defaultStyle: "lowercase"
});
function isHexCode(c) {
  return 48 <= c && c <= 57 || 65 <= c && c <= 70 || 97 <= c && c <= 102;
}
function isOctCode(c) {
  return 48 <= c && c <= 55;
}
function isDecCode(c) {
  return 48 <= c && c <= 57;
}
function resolveYamlInteger(data) {
  if (data === null) return false;
  var max2 = data.length, index2 = 0, hasDigits = false, ch;
  if (!max2) return false;
  ch = data[index2];
  if (ch === "-" || ch === "+") {
    ch = data[++index2];
  }
  if (ch === "0") {
    if (index2 + 1 === max2) return true;
    ch = data[++index2];
    if (ch === "b") {
      index2++;
      for (; index2 < max2; index2++) {
        ch = data[index2];
        if (ch === "_") continue;
        if (ch !== "0" && ch !== "1") return false;
        hasDigits = true;
      }
      return hasDigits && ch !== "_";
    }
    if (ch === "x") {
      index2++;
      for (; index2 < max2; index2++) {
        ch = data[index2];
        if (ch === "_") continue;
        if (!isHexCode(data.charCodeAt(index2))) return false;
        hasDigits = true;
      }
      return hasDigits && ch !== "_";
    }
    if (ch === "o") {
      index2++;
      for (; index2 < max2; index2++) {
        ch = data[index2];
        if (ch === "_") continue;
        if (!isOctCode(data.charCodeAt(index2))) return false;
        hasDigits = true;
      }
      return hasDigits && ch !== "_";
    }
  }
  if (ch === "_") return false;
  for (; index2 < max2; index2++) {
    ch = data[index2];
    if (ch === "_") continue;
    if (!isDecCode(data.charCodeAt(index2))) {
      return false;
    }
    hasDigits = true;
  }
  if (!hasDigits || ch === "_") return false;
  return true;
}
function constructYamlInteger(data) {
  var value = data, sign = 1, ch;
  if (value.indexOf("_") !== -1) {
    value = value.replace(/_/g, "");
  }
  ch = value[0];
  if (ch === "-" || ch === "+") {
    if (ch === "-") sign = -1;
    value = value.slice(1);
    ch = value[0];
  }
  if (value === "0") return 0;
  if (ch === "0") {
    if (value[1] === "b") return sign * parseInt(value.slice(2), 2);
    if (value[1] === "x") return sign * parseInt(value.slice(2), 16);
    if (value[1] === "o") return sign * parseInt(value.slice(2), 8);
  }
  return sign * parseInt(value, 10);
}
function isInteger(object) {
  return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 === 0 && !common.isNegativeZero(object));
}
var int = new type("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: resolveYamlInteger,
  construct: constructYamlInteger,
  predicate: isInteger,
  represent: {
    binary: function(obj) {
      return obj >= 0 ? "0b" + obj.toString(2) : "-0b" + obj.toString(2).slice(1);
    },
    octal: function(obj) {
      return obj >= 0 ? "0o" + obj.toString(8) : "-0o" + obj.toString(8).slice(1);
    },
    decimal: function(obj) {
      return obj.toString(10);
    },
    /* eslint-disable max-len */
    hexadecimal: function(obj) {
      return obj >= 0 ? "0x" + obj.toString(16).toUpperCase() : "-0x" + obj.toString(16).toUpperCase().slice(1);
    }
  },
  defaultStyle: "decimal",
  styleAliases: {
    binary: [2, "bin"],
    octal: [8, "oct"],
    decimal: [10, "dec"],
    hexadecimal: [16, "hex"]
  }
});
var YAML_FLOAT_PATTERN = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function resolveYamlFloat(data) {
  if (data === null) return false;
  if (!YAML_FLOAT_PATTERN.test(data) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  data[data.length - 1] === "_") {
    return false;
  }
  return true;
}
function constructYamlFloat(data) {
  var value, sign;
  value = data.replace(/_/g, "").toLowerCase();
  sign = value[0] === "-" ? -1 : 1;
  if ("+-".indexOf(value[0]) >= 0) {
    value = value.slice(1);
  }
  if (value === ".inf") {
    return sign === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
  } else if (value === ".nan") {
    return NaN;
  }
  return sign * parseFloat(value, 10);
}
var SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;
function representYamlFloat(object, style) {
  var res;
  if (isNaN(object)) {
    switch (style) {
      case "lowercase":
        return ".nan";
      case "uppercase":
        return ".NAN";
      case "camelcase":
        return ".NaN";
    }
  } else if (Number.POSITIVE_INFINITY === object) {
    switch (style) {
      case "lowercase":
        return ".inf";
      case "uppercase":
        return ".INF";
      case "camelcase":
        return ".Inf";
    }
  } else if (Number.NEGATIVE_INFINITY === object) {
    switch (style) {
      case "lowercase":
        return "-.inf";
      case "uppercase":
        return "-.INF";
      case "camelcase":
        return "-.Inf";
    }
  } else if (common.isNegativeZero(object)) {
    return "-0.0";
  }
  res = object.toString(10);
  return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace("e", ".e") : res;
}
function isFloat(object) {
  return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 !== 0 || common.isNegativeZero(object));
}
var float = new type("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: resolveYamlFloat,
  construct: constructYamlFloat,
  predicate: isFloat,
  represent: representYamlFloat,
  defaultStyle: "lowercase"
});
var json = failsafe.extend({
  implicit: [
    _null,
    bool,
    int,
    float
  ]
});
var core = json;
var YAML_DATE_REGEXP = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
);
var YAML_TIMESTAMP_REGEXP = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function resolveYamlTimestamp(data) {
  if (data === null) return false;
  if (YAML_DATE_REGEXP.exec(data) !== null) return true;
  if (YAML_TIMESTAMP_REGEXP.exec(data) !== null) return true;
  return false;
}
function constructYamlTimestamp(data) {
  var match, year, month, day, hour, minute, second, fraction = 0, delta = null, tz_hour, tz_minute, date;
  match = YAML_DATE_REGEXP.exec(data);
  if (match === null) match = YAML_TIMESTAMP_REGEXP.exec(data);
  if (match === null) throw new Error("Date resolve error");
  year = +match[1];
  month = +match[2] - 1;
  day = +match[3];
  if (!match[4]) {
    return new Date(Date.UTC(year, month, day));
  }
  hour = +match[4];
  minute = +match[5];
  second = +match[6];
  if (match[7]) {
    fraction = match[7].slice(0, 3);
    while (fraction.length < 3) {
      fraction += "0";
    }
    fraction = +fraction;
  }
  if (match[9]) {
    tz_hour = +match[10];
    tz_minute = +(match[11] || 0);
    delta = (tz_hour * 60 + tz_minute) * 6e4;
    if (match[9] === "-") delta = -delta;
  }
  date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));
  if (delta) date.setTime(date.getTime() - delta);
  return date;
}
function representYamlTimestamp(object) {
  return object.toISOString();
}
var timestamp = new type("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: resolveYamlTimestamp,
  construct: constructYamlTimestamp,
  instanceOf: Date,
  represent: representYamlTimestamp
});
function resolveYamlMerge(data) {
  return data === "<<" || data === null;
}
var merge = new type("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: resolveYamlMerge
});
var BASE64_MAP = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";
function resolveYamlBinary(data) {
  if (data === null) return false;
  var code, idx, bitlen = 0, max2 = data.length, map2 = BASE64_MAP;
  for (idx = 0; idx < max2; idx++) {
    code = map2.indexOf(data.charAt(idx));
    if (code > 64) continue;
    if (code < 0) return false;
    bitlen += 6;
  }
  return bitlen % 8 === 0;
}
function constructYamlBinary(data) {
  var idx, tailbits, input = data.replace(/[\r\n=]/g, ""), max2 = input.length, map2 = BASE64_MAP, bits = 0, result = [];
  for (idx = 0; idx < max2; idx++) {
    if (idx % 4 === 0 && idx) {
      result.push(bits >> 16 & 255);
      result.push(bits >> 8 & 255);
      result.push(bits & 255);
    }
    bits = bits << 6 | map2.indexOf(input.charAt(idx));
  }
  tailbits = max2 % 4 * 6;
  if (tailbits === 0) {
    result.push(bits >> 16 & 255);
    result.push(bits >> 8 & 255);
    result.push(bits & 255);
  } else if (tailbits === 18) {
    result.push(bits >> 10 & 255);
    result.push(bits >> 2 & 255);
  } else if (tailbits === 12) {
    result.push(bits >> 4 & 255);
  }
  return new Uint8Array(result);
}
function representYamlBinary(object) {
  var result = "", bits = 0, idx, tail, max2 = object.length, map2 = BASE64_MAP;
  for (idx = 0; idx < max2; idx++) {
    if (idx % 3 === 0 && idx) {
      result += map2[bits >> 18 & 63];
      result += map2[bits >> 12 & 63];
      result += map2[bits >> 6 & 63];
      result += map2[bits & 63];
    }
    bits = (bits << 8) + object[idx];
  }
  tail = max2 % 3;
  if (tail === 0) {
    result += map2[bits >> 18 & 63];
    result += map2[bits >> 12 & 63];
    result += map2[bits >> 6 & 63];
    result += map2[bits & 63];
  } else if (tail === 2) {
    result += map2[bits >> 10 & 63];
    result += map2[bits >> 4 & 63];
    result += map2[bits << 2 & 63];
    result += map2[64];
  } else if (tail === 1) {
    result += map2[bits >> 2 & 63];
    result += map2[bits << 4 & 63];
    result += map2[64];
    result += map2[64];
  }
  return result;
}
function isBinary(obj) {
  return Object.prototype.toString.call(obj) === "[object Uint8Array]";
}
var binary = new type("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: resolveYamlBinary,
  construct: constructYamlBinary,
  predicate: isBinary,
  represent: representYamlBinary
});
var _hasOwnProperty$3 = Object.prototype.hasOwnProperty;
var _toString$2 = Object.prototype.toString;
function resolveYamlOmap(data) {
  if (data === null) return true;
  var objectKeys = [], index2, length, pair, pairKey, pairHasKey, object = data;
  for (index2 = 0, length = object.length; index2 < length; index2 += 1) {
    pair = object[index2];
    pairHasKey = false;
    if (_toString$2.call(pair) !== "[object Object]") return false;
    for (pairKey in pair) {
      if (_hasOwnProperty$3.call(pair, pairKey)) {
        if (!pairHasKey) pairHasKey = true;
        else return false;
      }
    }
    if (!pairHasKey) return false;
    if (objectKeys.indexOf(pairKey) === -1) objectKeys.push(pairKey);
    else return false;
  }
  return true;
}
function constructYamlOmap(data) {
  return data !== null ? data : [];
}
var omap = new type("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: resolveYamlOmap,
  construct: constructYamlOmap
});
var _toString$1 = Object.prototype.toString;
function resolveYamlPairs(data) {
  if (data === null) return true;
  var index2, length, pair, keys, result, object = data;
  result = new Array(object.length);
  for (index2 = 0, length = object.length; index2 < length; index2 += 1) {
    pair = object[index2];
    if (_toString$1.call(pair) !== "[object Object]") return false;
    keys = Object.keys(pair);
    if (keys.length !== 1) return false;
    result[index2] = [keys[0], pair[keys[0]]];
  }
  return true;
}
function constructYamlPairs(data) {
  if (data === null) return [];
  var index2, length, pair, keys, result, object = data;
  result = new Array(object.length);
  for (index2 = 0, length = object.length; index2 < length; index2 += 1) {
    pair = object[index2];
    keys = Object.keys(pair);
    result[index2] = [keys[0], pair[keys[0]]];
  }
  return result;
}
var pairs = new type("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: resolveYamlPairs,
  construct: constructYamlPairs
});
var _hasOwnProperty$2 = Object.prototype.hasOwnProperty;
function resolveYamlSet(data) {
  if (data === null) return true;
  var key2, object = data;
  for (key2 in object) {
    if (_hasOwnProperty$2.call(object, key2)) {
      if (object[key2] !== null) return false;
    }
  }
  return true;
}
function constructYamlSet(data) {
  return data !== null ? data : {};
}
var set = new type("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: resolveYamlSet,
  construct: constructYamlSet
});
var _default = core.extend({
  implicit: [
    timestamp,
    merge
  ],
  explicit: [
    binary,
    omap,
    pairs,
    set
  ]
});
function simpleEscapeSequence(c) {
  return c === 48 ? "\0" : c === 97 ? "\x07" : c === 98 ? "\b" : c === 116 ? "	" : c === 9 ? "	" : c === 110 ? "\n" : c === 118 ? "\v" : c === 102 ? "\f" : c === 114 ? "\r" : c === 101 ? "\x1B" : c === 32 ? " " : c === 34 ? '"' : c === 47 ? "/" : c === 92 ? "\\" : c === 78 ? "" : c === 95 ? " " : c === 76 ? "\u2028" : c === 80 ? "\u2029" : "";
}
var simpleEscapeCheck = new Array(256);
var simpleEscapeMap = new Array(256);
for (var i = 0; i < 256; i++) {
  simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
  simpleEscapeMap[i] = simpleEscapeSequence(i);
}
var _toString = Object.prototype.toString;
var _hasOwnProperty = Object.prototype.hasOwnProperty;
var CHAR_BOM = 65279;
var CHAR_TAB = 9;
var CHAR_LINE_FEED = 10;
var CHAR_CARRIAGE_RETURN = 13;
var CHAR_SPACE = 32;
var CHAR_EXCLAMATION = 33;
var CHAR_DOUBLE_QUOTE = 34;
var CHAR_SHARP = 35;
var CHAR_PERCENT = 37;
var CHAR_AMPERSAND = 38;
var CHAR_SINGLE_QUOTE = 39;
var CHAR_ASTERISK = 42;
var CHAR_COMMA = 44;
var CHAR_MINUS = 45;
var CHAR_COLON = 58;
var CHAR_EQUALS = 61;
var CHAR_GREATER_THAN = 62;
var CHAR_QUESTION = 63;
var CHAR_COMMERCIAL_AT = 64;
var CHAR_LEFT_SQUARE_BRACKET = 91;
var CHAR_RIGHT_SQUARE_BRACKET = 93;
var CHAR_GRAVE_ACCENT = 96;
var CHAR_LEFT_CURLY_BRACKET = 123;
var CHAR_VERTICAL_LINE = 124;
var CHAR_RIGHT_CURLY_BRACKET = 125;
var ESCAPE_SEQUENCES = {};
ESCAPE_SEQUENCES[0] = "\\0";
ESCAPE_SEQUENCES[7] = "\\a";
ESCAPE_SEQUENCES[8] = "\\b";
ESCAPE_SEQUENCES[9] = "\\t";
ESCAPE_SEQUENCES[10] = "\\n";
ESCAPE_SEQUENCES[11] = "\\v";
ESCAPE_SEQUENCES[12] = "\\f";
ESCAPE_SEQUENCES[13] = "\\r";
ESCAPE_SEQUENCES[27] = "\\e";
ESCAPE_SEQUENCES[34] = '\\"';
ESCAPE_SEQUENCES[92] = "\\\\";
ESCAPE_SEQUENCES[133] = "\\N";
ESCAPE_SEQUENCES[160] = "\\_";
ESCAPE_SEQUENCES[8232] = "\\L";
ESCAPE_SEQUENCES[8233] = "\\P";
var DEPRECATED_BOOLEANS_SYNTAX = [
  "y",
  "Y",
  "yes",
  "Yes",
  "YES",
  "on",
  "On",
  "ON",
  "n",
  "N",
  "no",
  "No",
  "NO",
  "off",
  "Off",
  "OFF"
];
var DEPRECATED_BASE60_SYNTAX = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function compileStyleMap(schema2, map2) {
  var result, keys, index2, length, tag, style, type2;
  if (map2 === null) return {};
  result = {};
  keys = Object.keys(map2);
  for (index2 = 0, length = keys.length; index2 < length; index2 += 1) {
    tag = keys[index2];
    style = String(map2[tag]);
    if (tag.slice(0, 2) === "!!") {
      tag = "tag:yaml.org,2002:" + tag.slice(2);
    }
    type2 = schema2.compiledTypeMap["fallback"][tag];
    if (type2 && _hasOwnProperty.call(type2.styleAliases, style)) {
      style = type2.styleAliases[style];
    }
    result[tag] = style;
  }
  return result;
}
function encodeHex(character) {
  var string, handle2, length;
  string = character.toString(16).toUpperCase();
  if (character <= 255) {
    handle2 = "x";
    length = 2;
  } else if (character <= 65535) {
    handle2 = "u";
    length = 4;
  } else if (character <= 4294967295) {
    handle2 = "U";
    length = 8;
  } else {
    throw new exception("code point within a string may not be greater than 0xFFFFFFFF");
  }
  return "\\" + handle2 + common.repeat("0", length - string.length) + string;
}
var QUOTING_TYPE_SINGLE = 1, QUOTING_TYPE_DOUBLE = 2;
function State(options) {
  this.schema = options["schema"] || _default;
  this.indent = Math.max(1, options["indent"] || 2);
  this.noArrayIndent = options["noArrayIndent"] || false;
  this.skipInvalid = options["skipInvalid"] || false;
  this.flowLevel = common.isNothing(options["flowLevel"]) ? -1 : options["flowLevel"];
  this.styleMap = compileStyleMap(this.schema, options["styles"] || null);
  this.sortKeys = options["sortKeys"] || false;
  this.lineWidth = options["lineWidth"] || 80;
  this.noRefs = options["noRefs"] || false;
  this.noCompatMode = options["noCompatMode"] || false;
  this.condenseFlow = options["condenseFlow"] || false;
  this.quotingType = options["quotingType"] === '"' ? QUOTING_TYPE_DOUBLE : QUOTING_TYPE_SINGLE;
  this.forceQuotes = options["forceQuotes"] || false;
  this.replacer = typeof options["replacer"] === "function" ? options["replacer"] : null;
  this.implicitTypes = this.schema.compiledImplicit;
  this.explicitTypes = this.schema.compiledExplicit;
  this.tag = null;
  this.result = "";
  this.duplicates = [];
  this.usedDuplicates = null;
}
function indentString(string, spaces) {
  var ind = common.repeat(" ", spaces), position = 0, next = -1, result = "", line, length = string.length;
  while (position < length) {
    next = string.indexOf("\n", position);
    if (next === -1) {
      line = string.slice(position);
      position = length;
    } else {
      line = string.slice(position, next + 1);
      position = next + 1;
    }
    if (line.length && line !== "\n") result += ind;
    result += line;
  }
  return result;
}
function generateNextLine(state, level) {
  return "\n" + common.repeat(" ", state.indent * level);
}
function testImplicitResolving(state, str2) {
  var index2, length, type2;
  for (index2 = 0, length = state.implicitTypes.length; index2 < length; index2 += 1) {
    type2 = state.implicitTypes[index2];
    if (type2.resolve(str2)) {
      return true;
    }
  }
  return false;
}
function isWhitespace(c) {
  return c === CHAR_SPACE || c === CHAR_TAB;
}
function isPrintable(c) {
  return 32 <= c && c <= 126 || 161 <= c && c <= 55295 && c !== 8232 && c !== 8233 || 57344 <= c && c <= 65533 && c !== CHAR_BOM || 65536 <= c && c <= 1114111;
}
function isNsCharOrWhitespace(c) {
  return isPrintable(c) && c !== CHAR_BOM && c !== CHAR_CARRIAGE_RETURN && c !== CHAR_LINE_FEED;
}
function isPlainSafe(c, prev, inblock) {
  var cIsNsCharOrWhitespace = isNsCharOrWhitespace(c);
  var cIsNsChar = cIsNsCharOrWhitespace && !isWhitespace(c);
  return (
    // ns-plain-safe
    (inblock ? (
      // c = flow-in
      cIsNsCharOrWhitespace
    ) : cIsNsCharOrWhitespace && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET) && c !== CHAR_SHARP && !(prev === CHAR_COLON && !cIsNsChar) || isNsCharOrWhitespace(prev) && !isWhitespace(prev) && c === CHAR_SHARP || prev === CHAR_COLON && cIsNsChar
  );
}
function isPlainSafeFirst(c) {
  return isPrintable(c) && c !== CHAR_BOM && !isWhitespace(c) && c !== CHAR_MINUS && c !== CHAR_QUESTION && c !== CHAR_COLON && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET && c !== CHAR_SHARP && c !== CHAR_AMPERSAND && c !== CHAR_ASTERISK && c !== CHAR_EXCLAMATION && c !== CHAR_VERTICAL_LINE && c !== CHAR_EQUALS && c !== CHAR_GREATER_THAN && c !== CHAR_SINGLE_QUOTE && c !== CHAR_DOUBLE_QUOTE && c !== CHAR_PERCENT && c !== CHAR_COMMERCIAL_AT && c !== CHAR_GRAVE_ACCENT;
}
function isPlainSafeLast(c) {
  return !isWhitespace(c) && c !== CHAR_COLON;
}
function codePointAt(string, pos) {
  var first = string.charCodeAt(pos), second;
  if (first >= 55296 && first <= 56319 && pos + 1 < string.length) {
    second = string.charCodeAt(pos + 1);
    if (second >= 56320 && second <= 57343) {
      return (first - 55296) * 1024 + second - 56320 + 65536;
    }
  }
  return first;
}
function needIndentIndicator(string) {
  var leadingSpaceRe = /^\n* /;
  return leadingSpaceRe.test(string);
}
var STYLE_PLAIN = 1, STYLE_SINGLE = 2, STYLE_LITERAL = 3, STYLE_FOLDED = 4, STYLE_DOUBLE = 5;
function chooseScalarStyle(string, singleLineOnly, indentPerLevel, lineWidth, testAmbiguousType, quotingType, forceQuotes, inblock) {
  var i;
  var char = 0;
  var prevChar = null;
  var hasLineBreak = false;
  var hasFoldableLine = false;
  var shouldTrackWidth = lineWidth !== -1;
  var previousLineBreak = -1;
  var plain = isPlainSafeFirst(codePointAt(string, 0)) && isPlainSafeLast(codePointAt(string, string.length - 1));
  if (singleLineOnly || forceQuotes) {
    for (i = 0; i < string.length; char >= 65536 ? i += 2 : i++) {
      char = codePointAt(string, i);
      if (!isPrintable(char)) {
        return STYLE_DOUBLE;
      }
      plain = plain && isPlainSafe(char, prevChar, inblock);
      prevChar = char;
    }
  } else {
    for (i = 0; i < string.length; char >= 65536 ? i += 2 : i++) {
      char = codePointAt(string, i);
      if (char === CHAR_LINE_FEED) {
        hasLineBreak = true;
        if (shouldTrackWidth) {
          hasFoldableLine = hasFoldableLine || // Foldable line = too long, and not more-indented.
          i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ";
          previousLineBreak = i;
        }
      } else if (!isPrintable(char)) {
        return STYLE_DOUBLE;
      }
      plain = plain && isPlainSafe(char, prevChar, inblock);
      prevChar = char;
    }
    hasFoldableLine = hasFoldableLine || shouldTrackWidth && (i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ");
  }
  if (!hasLineBreak && !hasFoldableLine) {
    if (plain && !forceQuotes && !testAmbiguousType(string)) {
      return STYLE_PLAIN;
    }
    return quotingType === QUOTING_TYPE_DOUBLE ? STYLE_DOUBLE : STYLE_SINGLE;
  }
  if (indentPerLevel > 9 && needIndentIndicator(string)) {
    return STYLE_DOUBLE;
  }
  if (!forceQuotes) {
    return hasFoldableLine ? STYLE_FOLDED : STYLE_LITERAL;
  }
  return quotingType === QUOTING_TYPE_DOUBLE ? STYLE_DOUBLE : STYLE_SINGLE;
}
function writeScalar(state, string, level, iskey, inblock) {
  state.dump = function() {
    if (string.length === 0) {
      return state.quotingType === QUOTING_TYPE_DOUBLE ? '""' : "''";
    }
    if (!state.noCompatMode) {
      if (DEPRECATED_BOOLEANS_SYNTAX.indexOf(string) !== -1 || DEPRECATED_BASE60_SYNTAX.test(string)) {
        return state.quotingType === QUOTING_TYPE_DOUBLE ? '"' + string + '"' : "'" + string + "'";
      }
    }
    var indent = state.indent * Math.max(1, level);
    var lineWidth = state.lineWidth === -1 ? -1 : Math.max(Math.min(state.lineWidth, 40), state.lineWidth - indent);
    var singleLineOnly = iskey || state.flowLevel > -1 && level >= state.flowLevel;
    function testAmbiguity(string2) {
      return testImplicitResolving(state, string2);
    }
    switch (chooseScalarStyle(
      string,
      singleLineOnly,
      state.indent,
      lineWidth,
      testAmbiguity,
      state.quotingType,
      state.forceQuotes && !iskey,
      inblock
    )) {
      case STYLE_PLAIN:
        return string;
      case STYLE_SINGLE:
        return "'" + string.replace(/'/g, "''") + "'";
      case STYLE_LITERAL:
        return "|" + blockHeader(string, state.indent) + dropEndingNewline(indentString(string, indent));
      case STYLE_FOLDED:
        return ">" + blockHeader(string, state.indent) + dropEndingNewline(indentString(foldString(string, lineWidth), indent));
      case STYLE_DOUBLE:
        return '"' + escapeString(string) + '"';
      default:
        throw new exception("impossible error: invalid scalar style");
    }
  }();
}
function blockHeader(string, indentPerLevel) {
  var indentIndicator = needIndentIndicator(string) ? String(indentPerLevel) : "";
  var clip = string[string.length - 1] === "\n";
  var keep = clip && (string[string.length - 2] === "\n" || string === "\n");
  var chomp = keep ? "+" : clip ? "" : "-";
  return indentIndicator + chomp + "\n";
}
function dropEndingNewline(string) {
  return string[string.length - 1] === "\n" ? string.slice(0, -1) : string;
}
function foldString(string, width) {
  var lineRe = /(\n+)([^\n]*)/g;
  var result = function() {
    var nextLF = string.indexOf("\n");
    nextLF = nextLF !== -1 ? nextLF : string.length;
    lineRe.lastIndex = nextLF;
    return foldLine(string.slice(0, nextLF), width);
  }();
  var prevMoreIndented = string[0] === "\n" || string[0] === " ";
  var moreIndented;
  var match;
  while (match = lineRe.exec(string)) {
    var prefix = match[1], line = match[2];
    moreIndented = line[0] === " ";
    result += prefix + (!prevMoreIndented && !moreIndented && line !== "" ? "\n" : "") + foldLine(line, width);
    prevMoreIndented = moreIndented;
  }
  return result;
}
function foldLine(line, width) {
  if (line === "" || line[0] === " ") return line;
  var breakRe = / [^ ]/g;
  var match;
  var start = 0, end, curr = 0, next = 0;
  var result = "";
  while (match = breakRe.exec(line)) {
    next = match.index;
    if (next - start > width) {
      end = curr > start ? curr : next;
      result += "\n" + line.slice(start, end);
      start = end + 1;
    }
    curr = next;
  }
  result += "\n";
  if (line.length - start > width && curr > start) {
    result += line.slice(start, curr) + "\n" + line.slice(curr + 1);
  } else {
    result += line.slice(start);
  }
  return result.slice(1);
}
function escapeString(string) {
  var result = "";
  var char = 0;
  var escapeSeq;
  for (var i = 0; i < string.length; char >= 65536 ? i += 2 : i++) {
    char = codePointAt(string, i);
    escapeSeq = ESCAPE_SEQUENCES[char];
    if (!escapeSeq && isPrintable(char)) {
      result += string[i];
      if (char >= 65536) result += string[i + 1];
    } else {
      result += escapeSeq || encodeHex(char);
    }
  }
  return result;
}
function writeFlowSequence(state, level, object) {
  var _result = "", _tag = state.tag, index2, length, value;
  for (index2 = 0, length = object.length; index2 < length; index2 += 1) {
    value = object[index2];
    if (state.replacer) {
      value = state.replacer.call(object, String(index2), value);
    }
    if (writeNode(state, level, value, false, false) || typeof value === "undefined" && writeNode(state, level, null, false, false)) {
      if (_result !== "") _result += "," + (!state.condenseFlow ? " " : "");
      _result += state.dump;
    }
  }
  state.tag = _tag;
  state.dump = "[" + _result + "]";
}
function writeBlockSequence(state, level, object, compact) {
  var _result = "", _tag = state.tag, index2, length, value;
  for (index2 = 0, length = object.length; index2 < length; index2 += 1) {
    value = object[index2];
    if (state.replacer) {
      value = state.replacer.call(object, String(index2), value);
    }
    if (writeNode(state, level + 1, value, true, true, false, true) || typeof value === "undefined" && writeNode(state, level + 1, null, true, true, false, true)) {
      if (!compact || _result !== "") {
        _result += generateNextLine(state, level);
      }
      if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
        _result += "-";
      } else {
        _result += "- ";
      }
      _result += state.dump;
    }
  }
  state.tag = _tag;
  state.dump = _result || "[]";
}
function writeFlowMapping(state, level, object) {
  var _result = "", _tag = state.tag, objectKeyList = Object.keys(object), index2, length, objectKey, objectValue, pairBuffer;
  for (index2 = 0, length = objectKeyList.length; index2 < length; index2 += 1) {
    pairBuffer = "";
    if (_result !== "") pairBuffer += ", ";
    if (state.condenseFlow) pairBuffer += '"';
    objectKey = objectKeyList[index2];
    objectValue = object[objectKey];
    if (state.replacer) {
      objectValue = state.replacer.call(object, objectKey, objectValue);
    }
    if (!writeNode(state, level, objectKey, false, false)) {
      continue;
    }
    if (state.dump.length > 1024) pairBuffer += "? ";
    pairBuffer += state.dump + (state.condenseFlow ? '"' : "") + ":" + (state.condenseFlow ? "" : " ");
    if (!writeNode(state, level, objectValue, false, false)) {
      continue;
    }
    pairBuffer += state.dump;
    _result += pairBuffer;
  }
  state.tag = _tag;
  state.dump = "{" + _result + "}";
}
function writeBlockMapping(state, level, object, compact) {
  var _result = "", _tag = state.tag, objectKeyList = Object.keys(object), index2, length, objectKey, objectValue, explicitPair, pairBuffer;
  if (state.sortKeys === true) {
    objectKeyList.sort();
  } else if (typeof state.sortKeys === "function") {
    objectKeyList.sort(state.sortKeys);
  } else if (state.sortKeys) {
    throw new exception("sortKeys must be a boolean or a function");
  }
  for (index2 = 0, length = objectKeyList.length; index2 < length; index2 += 1) {
    pairBuffer = "";
    if (!compact || _result !== "") {
      pairBuffer += generateNextLine(state, level);
    }
    objectKey = objectKeyList[index2];
    objectValue = object[objectKey];
    if (state.replacer) {
      objectValue = state.replacer.call(object, objectKey, objectValue);
    }
    if (!writeNode(state, level + 1, objectKey, true, true, true)) {
      continue;
    }
    explicitPair = state.tag !== null && state.tag !== "?" || state.dump && state.dump.length > 1024;
    if (explicitPair) {
      if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
        pairBuffer += "?";
      } else {
        pairBuffer += "? ";
      }
    }
    pairBuffer += state.dump;
    if (explicitPair) {
      pairBuffer += generateNextLine(state, level);
    }
    if (!writeNode(state, level + 1, objectValue, true, explicitPair)) {
      continue;
    }
    if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
      pairBuffer += ":";
    } else {
      pairBuffer += ": ";
    }
    pairBuffer += state.dump;
    _result += pairBuffer;
  }
  state.tag = _tag;
  state.dump = _result || "{}";
}
function detectType(state, object, explicit) {
  var _result, typeList, index2, length, type2, style;
  typeList = explicit ? state.explicitTypes : state.implicitTypes;
  for (index2 = 0, length = typeList.length; index2 < length; index2 += 1) {
    type2 = typeList[index2];
    if ((type2.instanceOf || type2.predicate) && (!type2.instanceOf || typeof object === "object" && object instanceof type2.instanceOf) && (!type2.predicate || type2.predicate(object))) {
      if (explicit) {
        if (type2.multi && type2.representName) {
          state.tag = type2.representName(object);
        } else {
          state.tag = type2.tag;
        }
      } else {
        state.tag = "?";
      }
      if (type2.represent) {
        style = state.styleMap[type2.tag] || type2.defaultStyle;
        if (_toString.call(type2.represent) === "[object Function]") {
          _result = type2.represent(object, style);
        } else if (_hasOwnProperty.call(type2.represent, style)) {
          _result = type2.represent[style](object, style);
        } else {
          throw new exception("!<" + type2.tag + '> tag resolver accepts not "' + style + '" style');
        }
        state.dump = _result;
      }
      return true;
    }
  }
  return false;
}
function writeNode(state, level, object, block, compact, iskey, isblockseq) {
  state.tag = null;
  state.dump = object;
  if (!detectType(state, object, false)) {
    detectType(state, object, true);
  }
  var type2 = _toString.call(state.dump);
  var inblock = block;
  var tagStr;
  if (block) {
    block = state.flowLevel < 0 || state.flowLevel > level;
  }
  var objectOrArray = type2 === "[object Object]" || type2 === "[object Array]", duplicateIndex, duplicate;
  if (objectOrArray) {
    duplicateIndex = state.duplicates.indexOf(object);
    duplicate = duplicateIndex !== -1;
  }
  if (state.tag !== null && state.tag !== "?" || duplicate || state.indent !== 2 && level > 0) {
    compact = false;
  }
  if (duplicate && state.usedDuplicates[duplicateIndex]) {
    state.dump = "*ref_" + duplicateIndex;
  } else {
    if (objectOrArray && duplicate && !state.usedDuplicates[duplicateIndex]) {
      state.usedDuplicates[duplicateIndex] = true;
    }
    if (type2 === "[object Object]") {
      if (block && Object.keys(state.dump).length !== 0) {
        writeBlockMapping(state, level, state.dump, compact);
        if (duplicate) {
          state.dump = "&ref_" + duplicateIndex + state.dump;
        }
      } else {
        writeFlowMapping(state, level, state.dump);
        if (duplicate) {
          state.dump = "&ref_" + duplicateIndex + " " + state.dump;
        }
      }
    } else if (type2 === "[object Array]") {
      if (block && state.dump.length !== 0) {
        if (state.noArrayIndent && !isblockseq && level > 0) {
          writeBlockSequence(state, level - 1, state.dump, compact);
        } else {
          writeBlockSequence(state, level, state.dump, compact);
        }
        if (duplicate) {
          state.dump = "&ref_" + duplicateIndex + state.dump;
        }
      } else {
        writeFlowSequence(state, level, state.dump);
        if (duplicate) {
          state.dump = "&ref_" + duplicateIndex + " " + state.dump;
        }
      }
    } else if (type2 === "[object String]") {
      if (state.tag !== "?") {
        writeScalar(state, state.dump, level, iskey, inblock);
      }
    } else if (type2 === "[object Undefined]") {
      return false;
    } else {
      if (state.skipInvalid) return false;
      throw new exception("unacceptable kind of an object to dump " + type2);
    }
    if (state.tag !== null && state.tag !== "?") {
      tagStr = encodeURI(
        state.tag[0] === "!" ? state.tag.slice(1) : state.tag
      ).replace(/!/g, "%21");
      if (state.tag[0] === "!") {
        tagStr = "!" + tagStr;
      } else if (tagStr.slice(0, 18) === "tag:yaml.org,2002:") {
        tagStr = "!!" + tagStr.slice(18);
      } else {
        tagStr = "!<" + tagStr + ">";
      }
      state.dump = tagStr + " " + state.dump;
    }
  }
  return true;
}
function getDuplicateReferences(object, state) {
  var objects = [], duplicatesIndexes = [], index2, length;
  inspectNode(object, objects, duplicatesIndexes);
  for (index2 = 0, length = duplicatesIndexes.length; index2 < length; index2 += 1) {
    state.duplicates.push(objects[duplicatesIndexes[index2]]);
  }
  state.usedDuplicates = new Array(length);
}
function inspectNode(object, objects, duplicatesIndexes) {
  var objectKeyList, index2, length;
  if (object !== null && typeof object === "object") {
    index2 = objects.indexOf(object);
    if (index2 !== -1) {
      if (duplicatesIndexes.indexOf(index2) === -1) {
        duplicatesIndexes.push(index2);
      }
    } else {
      objects.push(object);
      if (Array.isArray(object)) {
        for (index2 = 0, length = object.length; index2 < length; index2 += 1) {
          inspectNode(object[index2], objects, duplicatesIndexes);
        }
      } else {
        objectKeyList = Object.keys(object);
        for (index2 = 0, length = objectKeyList.length; index2 < length; index2 += 1) {
          inspectNode(object[objectKeyList[index2]], objects, duplicatesIndexes);
        }
      }
    }
  }
}
function dump$1(input, options) {
  options = options || {};
  var state = new State(options);
  if (!state.noRefs) getDuplicateReferences(input, state);
  var value = input;
  if (state.replacer) {
    value = state.replacer.call({ "": value }, "", value);
  }
  if (writeNode(state, 0, value, true, true)) return state.dump + "\n";
  return "";
}
var dump_1 = dump$1;
var dumper = {
  dump: dump_1
};
var dump = dumper.dump;
/*!
 * Copyright (c) Squirrel Chat et al., All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 * 3. Neither the name of the copyright holder nor the names of its contributors
 *    may be used to endorse or promote products derived from this software without
 *    specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
let BARE_KEY = /^[a-z0-9-_]+$/i;
function extendedTypeOf(obj) {
  let type2 = typeof obj;
  if (type2 === "object") {
    if (Array.isArray(obj))
      return "array";
    if (obj instanceof Date)
      return "date";
  }
  return type2;
}
function isArrayOfTables(obj) {
  for (let i = 0; i < obj.length; i++) {
    if (extendedTypeOf(obj[i]) !== "object")
      return false;
  }
  return obj.length != 0;
}
function formatString(s) {
  return JSON.stringify(s).replace(/\x7f/g, "\\u007f");
}
function stringifyValue(val, type2, depth, numberAsFloat) {
  if (depth === 0) {
    throw new Error("Could not stringify the object: maximum object depth exceeded");
  }
  if (type2 === "number") {
    if (isNaN(val))
      return "nan";
    if (val === Infinity)
      return "inf";
    if (val === -Infinity)
      return "-inf";
    if (numberAsFloat && Number.isInteger(val))
      return val.toFixed(1);
    return val.toString();
  }
  if (type2 === "bigint" || type2 === "boolean") {
    return val.toString();
  }
  if (type2 === "string") {
    return formatString(val);
  }
  if (type2 === "date") {
    if (isNaN(val.getTime())) {
      throw new TypeError("cannot serialize invalid date");
    }
    return val.toISOString();
  }
  if (type2 === "object") {
    return stringifyInlineTable(val, depth, numberAsFloat);
  }
  if (type2 === "array") {
    return stringifyArray(val, depth, numberAsFloat);
  }
}
function stringifyInlineTable(obj, depth, numberAsFloat) {
  let keys = Object.keys(obj);
  if (keys.length === 0)
    return "{}";
  let res = "{ ";
  for (let i = 0; i < keys.length; i++) {
    let k = keys[i];
    if (i)
      res += ", ";
    res += BARE_KEY.test(k) ? k : formatString(k);
    res += " = ";
    res += stringifyValue(obj[k], extendedTypeOf(obj[k]), depth - 1, numberAsFloat);
  }
  return res + " }";
}
function stringifyArray(array, depth, numberAsFloat) {
  if (array.length === 0)
    return "[]";
  let res = "[ ";
  for (let i = 0; i < array.length; i++) {
    if (i)
      res += ", ";
    if (array[i] === null || array[i] === void 0) {
      throw new TypeError("arrays cannot contain null or undefined values");
    }
    res += stringifyValue(array[i], extendedTypeOf(array[i]), depth - 1, numberAsFloat);
  }
  return res + " ]";
}
function stringifyArrayTable(array, key2, depth, numberAsFloat) {
  if (depth === 0) {
    throw new Error("Could not stringify the object: maximum object depth exceeded");
  }
  let res = "";
  for (let i = 0; i < array.length; i++) {
    res += `[[${key2}]]
`;
    res += stringifyTable(array[i], key2, depth, numberAsFloat);
    res += "\n\n";
  }
  return res;
}
function stringifyTable(obj, prefix, depth, numberAsFloat) {
  if (depth === 0) {
    throw new Error("Could not stringify the object: maximum object depth exceeded");
  }
  let preamble = "";
  let tables = "";
  let keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    let k = keys[i];
    if (obj[k] !== null && obj[k] !== void 0) {
      let type2 = extendedTypeOf(obj[k]);
      if (type2 === "symbol" || type2 === "function") {
        throw new TypeError(`cannot serialize values of type '${type2}'`);
      }
      let key2 = BARE_KEY.test(k) ? k : formatString(k);
      if (type2 === "array" && isArrayOfTables(obj[k])) {
        tables += stringifyArrayTable(obj[k], prefix ? `${prefix}.${key2}` : key2, depth - 1, numberAsFloat);
      } else if (type2 === "object") {
        let tblKey = prefix ? `${prefix}.${key2}` : key2;
        tables += `[${tblKey}]
`;
        tables += stringifyTable(obj[k], tblKey, depth - 1, numberAsFloat);
        tables += "\n\n";
      } else {
        preamble += key2;
        preamble += " = ";
        preamble += stringifyValue(obj[k], type2, depth, numberAsFloat);
        preamble += "\n";
      }
    }
  }
  return `${preamble}
${tables}`.trim();
}
function stringify(obj, { maxDepth = 1e3, numbersAsFloat = false } = {}) {
  if (extendedTypeOf(obj) !== "object") {
    throw new TypeError("stringify can only be called with an object");
  }
  return stringifyTable(obj, "", maxDepth, numbersAsFloat);
}
const lang$2 = Object.freeze(JSON.parse('{"displayName":"JSON","name":"json","patterns":[{"include":"#value"}],"repository":{"array":{"begin":"\\\\[","beginCaptures":{"0":{"name":"punctuation.definition.array.begin.json"}},"end":"]","endCaptures":{"0":{"name":"punctuation.definition.array.end.json"}},"name":"meta.structure.array.json","patterns":[{"include":"#value"},{"match":",","name":"punctuation.separator.array.json"},{"match":"[^]\\\\s]","name":"invalid.illegal.expected-array-separator.json"}]},"comments":{"patterns":[{"begin":"/\\\\*\\\\*(?!/)","captures":{"0":{"name":"punctuation.definition.comment.json"}},"end":"\\\\*/","name":"comment.block.documentation.json"},{"begin":"/\\\\*","captures":{"0":{"name":"punctuation.definition.comment.json"}},"end":"\\\\*/","name":"comment.block.json"},{"captures":{"1":{"name":"punctuation.definition.comment.json"}},"match":"(//).*$\\\\n?","name":"comment.line.double-slash.js"}]},"constant":{"match":"\\\\b(?:true|false|null)\\\\b","name":"constant.language.json"},"number":{"match":"-?(?:0|[1-9]\\\\d*)(?:(?:\\\\.\\\\d+)?(?:[Ee][-+]?\\\\d+)?)?","name":"constant.numeric.json"},"object":{"begin":"\\\\{","beginCaptures":{"0":{"name":"punctuation.definition.dictionary.begin.json"}},"end":"}","endCaptures":{"0":{"name":"punctuation.definition.dictionary.end.json"}},"name":"meta.structure.dictionary.json","patterns":[{"include":"#objectkey"},{"include":"#comments"},{"begin":":","beginCaptures":{"0":{"name":"punctuation.separator.dictionary.key-value.json"}},"end":"(,)|(?=})","endCaptures":{"1":{"name":"punctuation.separator.dictionary.pair.json"}},"name":"meta.structure.dictionary.value.json","patterns":[{"include":"#value"},{"match":"[^,\\\\s]","name":"invalid.illegal.expected-dictionary-separator.json"}]},{"match":"[^}\\\\s]","name":"invalid.illegal.expected-dictionary-separator.json"}]},"objectkey":{"begin":"\\"","beginCaptures":{"0":{"name":"punctuation.support.type.property-name.begin.json"}},"end":"\\"","endCaptures":{"0":{"name":"punctuation.support.type.property-name.end.json"}},"name":"string.json support.type.property-name.json","patterns":[{"include":"#stringcontent"}]},"string":{"begin":"\\"","beginCaptures":{"0":{"name":"punctuation.definition.string.begin.json"}},"end":"\\"","endCaptures":{"0":{"name":"punctuation.definition.string.end.json"}},"name":"string.quoted.double.json","patterns":[{"include":"#stringcontent"}]},"stringcontent":{"patterns":[{"match":"\\\\\\\\(?:[\\"/\\\\\\\\bfnrt]|u\\\\h{4})","name":"constant.character.escape.json"},{"match":"\\\\\\\\.","name":"invalid.illegal.unrecognized-string-escape.json"}]},"value":{"patterns":[{"include":"#constant"},{"include":"#number"},{"include":"#string"},{"include":"#array"},{"include":"#object"},{"include":"#comments"}]}},"scopeName":"source.json"}'));
const jsonLang = [
  lang$2
];
const lang$1 = Object.freeze(JSON.parse(`{"displayName":"YAML","fileTypes":["yaml","yml","rviz","reek","clang-format","yaml-tmlanguage","syntax","sublime-syntax"],"firstLineMatch":"^%YAML( ?1.\\\\d+)?","name":"yaml","patterns":[{"include":"#comment"},{"include":"#property"},{"include":"#directive"},{"match":"^---","name":"entity.other.document.begin.yaml"},{"match":"^\\\\.{3}","name":"entity.other.document.end.yaml"},{"include":"#node"}],"repository":{"block-collection":{"patterns":[{"include":"#block-sequence"},{"include":"#block-mapping"}]},"block-mapping":{"patterns":[{"include":"#block-pair"}]},"block-node":{"patterns":[{"include":"#prototype"},{"include":"#block-scalar"},{"include":"#block-collection"},{"include":"#flow-scalar-plain-out"},{"include":"#flow-node"}]},"block-pair":{"patterns":[{"begin":"\\\\?","beginCaptures":{"1":{"name":"punctuation.definition.key-value.begin.yaml"}},"end":"(?=\\\\?)|^ *(:)|(:)","endCaptures":{"1":{"name":"punctuation.separator.key-value.mapping.yaml"},"2":{"name":"invalid.illegal.expected-newline.yaml"}},"name":"meta.block-mapping.yaml","patterns":[{"include":"#block-node"}]},{"begin":"(?=(?:[^-\\\\]!\\"#%\\\\&'*,:>?@\\\\[\`{|}\\\\s]|[-:?]\\\\S)([^:\\\\s]|:\\\\S|\\\\s+(?![#\\\\s]))*\\\\s*:(\\\\s|$))","end":"(?=\\\\s*$|\\\\s+#|\\\\s*:(\\\\s|$))","patterns":[{"include":"#flow-scalar-plain-out-implicit-type"},{"begin":"[^-\\\\]!\\"#%\\\\&'*,:>?@\\\\[\`{|}\\\\s]|[-:?]\\\\S","beginCaptures":{"0":{"name":"entity.name.tag.yaml"}},"contentName":"entity.name.tag.yaml","end":"(?=\\\\s*$|\\\\s+#|\\\\s*:(\\\\s|$))","name":"string.unquoted.plain.out.yaml"}]},{"match":":(?=\\\\s|$)","name":"punctuation.separator.key-value.mapping.yaml"}]},"block-scalar":{"begin":"(?:(\\\\|)|(>))([1-9])?([-+])?(.*\\\\n?)","beginCaptures":{"1":{"name":"keyword.control.flow.block-scalar.literal.yaml"},"2":{"name":"keyword.control.flow.block-scalar.folded.yaml"},"3":{"name":"constant.numeric.indentation-indicator.yaml"},"4":{"name":"storage.modifier.chomping-indicator.yaml"},"5":{"patterns":[{"include":"#comment"},{"match":".+","name":"invalid.illegal.expected-comment-or-newline.yaml"}]}},"end":"^(?=\\\\S)|(?!\\\\G)","patterns":[{"begin":"^( +)(?! )","end":"^(?!\\\\1|\\\\s*$)","name":"string.unquoted.block.yaml"}]},"block-sequence":{"match":"(-)(?!\\\\S)","name":"punctuation.definition.block.sequence.item.yaml"},"comment":{"begin":"(?:^([\\\\t ]*)|[\\\\t ]+)(?=#\\\\p{print}*$)","beginCaptures":{"1":{"name":"punctuation.whitespace.comment.leading.yaml"}},"end":"(?!\\\\G)","patterns":[{"begin":"#","beginCaptures":{"0":{"name":"punctuation.definition.comment.yaml"}},"end":"\\\\n","name":"comment.line.number-sign.yaml"}]},"directive":{"begin":"^%","beginCaptures":{"0":{"name":"punctuation.definition.directive.begin.yaml"}},"end":"(?=$|[\\\\t ]+($|#))","name":"meta.directive.yaml","patterns":[{"captures":{"1":{"name":"keyword.other.directive.yaml.yaml"},"2":{"name":"constant.numeric.yaml-version.yaml"}},"match":"\\\\G(YAML)[\\\\t ]+(\\\\d+\\\\.\\\\d+)"},{"captures":{"1":{"name":"keyword.other.directive.tag.yaml"},"2":{"name":"storage.type.tag-handle.yaml"},"3":{"name":"support.type.tag-prefix.yaml"}},"match":"\\\\G(TAG)(?:[\\\\t ]+(!(?:[-0-9A-Za-z]*!)?)(?:[\\\\t ]+(!(?:%\\\\h{2}|[]!#$\\\\&-;=?-\\\\[_a-z~])*|(?![]!,\\\\[{}])(?:%\\\\h{2}|[]!#$\\\\&-;=?-\\\\[_a-z~])+))?)?"},{"captures":{"1":{"name":"support.other.directive.reserved.yaml"},"2":{"name":"string.unquoted.directive-name.yaml"},"3":{"name":"string.unquoted.directive-parameter.yaml"}},"match":"\\\\G(\\\\w+)(?:[\\\\t ]+(\\\\w+)(?:[\\\\t ]+(\\\\w+))?)?"},{"match":"\\\\S+","name":"invalid.illegal.unrecognized.yaml"}]},"flow-alias":{"captures":{"1":{"name":"keyword.control.flow.alias.yaml"},"2":{"name":"punctuation.definition.alias.yaml"},"3":{"name":"variable.other.alias.yaml"},"4":{"name":"invalid.illegal.character.anchor.yaml"}},"match":"((\\\\*))([^],/\\\\[{}\\\\s]+)([^],}\\\\s]\\\\S*)?"},"flow-collection":{"patterns":[{"include":"#flow-sequence"},{"include":"#flow-mapping"}]},"flow-mapping":{"begin":"\\\\{","beginCaptures":{"0":{"name":"punctuation.definition.mapping.begin.yaml"}},"end":"}","endCaptures":{"0":{"name":"punctuation.definition.mapping.end.yaml"}},"name":"meta.flow-mapping.yaml","patterns":[{"include":"#prototype"},{"match":",","name":"punctuation.separator.mapping.yaml"},{"include":"#flow-pair"}]},"flow-node":{"patterns":[{"include":"#prototype"},{"include":"#flow-alias"},{"include":"#flow-collection"},{"include":"#flow-scalar"}]},"flow-pair":{"patterns":[{"begin":"\\\\?","beginCaptures":{"0":{"name":"punctuation.definition.key-value.begin.yaml"}},"end":"(?=[],}])","name":"meta.flow-pair.explicit.yaml","patterns":[{"include":"#prototype"},{"include":"#flow-pair"},{"include":"#flow-node"},{"begin":":(?=\\\\s|$|[],\\\\[{}])","beginCaptures":{"0":{"name":"punctuation.separator.key-value.mapping.yaml"}},"end":"(?=[],}])","patterns":[{"include":"#flow-value"}]}]},{"begin":"(?=(?:[^-\\\\]!\\"#%\\\\&'*,:>?@\\\\[\`{|}\\\\s]|[-:?][^],\\\\[{}\\\\s])([^],:\\\\[{}\\\\s]|:[^],\\\\[{}\\\\s]|\\\\s+(?![#\\\\s]))*\\\\s*:(\\\\s|$))","end":"(?=\\\\s*$|\\\\s+#|\\\\s*:(\\\\s|$)|\\\\s*:[],\\\\[{}]|\\\\s*[],\\\\[{}])","name":"meta.flow-pair.key.yaml","patterns":[{"include":"#flow-scalar-plain-in-implicit-type"},{"begin":"[^-\\\\]!\\"#%\\\\&'*,:>?@\\\\[\`{|}\\\\s]|[-:?][^],\\\\[{}\\\\s]","beginCaptures":{"0":{"name":"entity.name.tag.yaml"}},"contentName":"entity.name.tag.yaml","end":"(?=\\\\s*$|\\\\s+#|\\\\s*:(\\\\s|$)|\\\\s*:[],\\\\[{}]|\\\\s*[],\\\\[{}])","name":"string.unquoted.plain.in.yaml"}]},{"include":"#flow-node"},{"begin":":(?=\\\\s|$|[],\\\\[{}])","captures":{"0":{"name":"punctuation.separator.key-value.mapping.yaml"}},"end":"(?=[],}])","name":"meta.flow-pair.yaml","patterns":[{"include":"#flow-value"}]}]},"flow-scalar":{"patterns":[{"include":"#flow-scalar-double-quoted"},{"include":"#flow-scalar-single-quoted"},{"include":"#flow-scalar-plain-in"}]},"flow-scalar-double-quoted":{"begin":"\\"","beginCaptures":{"0":{"name":"punctuation.definition.string.begin.yaml"}},"end":"\\"","endCaptures":{"0":{"name":"punctuation.definition.string.end.yaml"}},"name":"string.quoted.double.yaml","patterns":[{"match":"\\\\\\\\([ \\"/0LN\\\\\\\\_abefnprtv]|x\\\\d\\\\d|u\\\\d{4}|U\\\\d{8})","name":"constant.character.escape.yaml"},{"match":"\\\\\\\\\\\\n","name":"constant.character.escape.double-quoted.newline.yaml"}]},"flow-scalar-plain-in":{"patterns":[{"include":"#flow-scalar-plain-in-implicit-type"},{"begin":"[^-\\\\]!\\"#%\\\\&'*,:>?@\\\\[\`{|}\\\\s]|[-:?][^],\\\\[{}\\\\s]","end":"(?=\\\\s*$|\\\\s+#|\\\\s*:(\\\\s|$)|\\\\s*:[],\\\\[{}]|\\\\s*[],\\\\[{}])","name":"string.unquoted.plain.in.yaml"}]},"flow-scalar-plain-in-implicit-type":{"patterns":[{"captures":{"1":{"name":"constant.language.null.yaml"},"2":{"name":"constant.language.boolean.yaml"},"3":{"name":"constant.numeric.integer.yaml"},"4":{"name":"constant.numeric.float.yaml"},"5":{"name":"constant.other.timestamp.yaml"},"6":{"name":"constant.language.value.yaml"},"7":{"name":"constant.language.merge.yaml"}},"match":"(?:(null|Null|NULL|~)|([Yy]|yes|Yes|YES|[Nn]|no|No|NO|true|True|TRUE|false|False|FALSE|on|On|ON|off|Off|OFF)|([-+]?0b[01_]+|[-+]?0[0-7_]+|[-+]?(?:0|[1-9][0-9_]*)|[-+]?0x[_\\\\h]+|[-+]?[1-9][0-9_]*(?::[0-5]?[0-9])+)|([-+]?(?:[0-9][0-9_]*)?\\\\.[.0-9]*(?:[Ee][-+][0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\\\.[0-9_]*|[-+]?\\\\.(?:inf|Inf|INF)|\\\\.(?:nan|NaN|NAN))|(\\\\d{4}-\\\\d{2}-\\\\d{2}|\\\\d{4}-\\\\d{1,2}-\\\\d{1,2}(?:[Tt]|[\\\\t ]+)\\\\d{1,2}:\\\\d{2}:\\\\d{2}(?:\\\\.\\\\d*)?(?:[\\\\t ]*Z|[-+]\\\\d{1,2}(?::\\\\d{1,2})?)?)|(=)|(<<))(?=\\\\s*$|\\\\s+#|\\\\s*:(\\\\s|$)|\\\\s*:[],\\\\[{}]|\\\\s*[],\\\\[{}])"}]},"flow-scalar-plain-out":{"patterns":[{"include":"#flow-scalar-plain-out-implicit-type"},{"begin":"[^-\\\\]!\\"#%\\\\&'*,:>?@\\\\[\`{|}\\\\s]|[-:?]\\\\S","end":"(?=\\\\s*$|\\\\s+#|\\\\s*:(\\\\s|$))","name":"string.unquoted.plain.out.yaml"}]},"flow-scalar-plain-out-implicit-type":{"patterns":[{"captures":{"1":{"name":"constant.language.null.yaml"},"2":{"name":"constant.language.boolean.yaml"},"3":{"name":"constant.numeric.integer.yaml"},"4":{"name":"constant.numeric.float.yaml"},"5":{"name":"constant.other.timestamp.yaml"},"6":{"name":"constant.language.value.yaml"},"7":{"name":"constant.language.merge.yaml"}},"match":"(?:(null|Null|NULL|~)|([Yy]|yes|Yes|YES|[Nn]|no|No|NO|true|True|TRUE|false|False|FALSE|on|On|ON|off|Off|OFF)|([-+]?0b[01_]+|[-+]?0[0-7_]+|[-+]?(?:0|[1-9][0-9_]*)|[-+]?0x[_\\\\h]+|[-+]?[1-9][0-9_]*(?::[0-5]?[0-9])+)|([-+]?(?:[0-9][0-9_]*)?\\\\.[.0-9]*(?:[Ee][-+][0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\\\.[0-9_]*|[-+]?\\\\.(?:inf|Inf|INF)|\\\\.(?:nan|NaN|NAN))|(\\\\d{4}-\\\\d{2}-\\\\d{2}|\\\\d{4}-\\\\d{1,2}-\\\\d{1,2}(?:[Tt]|[\\\\t ]+)\\\\d{1,2}:\\\\d{2}:\\\\d{2}(?:\\\\.\\\\d*)?(?:[\\\\t ]*Z|[-+]\\\\d{1,2}(?::\\\\d{1,2})?)?)|(=)|(<<))(?=\\\\s*$|\\\\s+#|\\\\s*:(\\\\s|$))"}]},"flow-scalar-single-quoted":{"begin":"'","beginCaptures":{"0":{"name":"punctuation.definition.string.begin.yaml"}},"end":"'(?!')","endCaptures":{"0":{"name":"punctuation.definition.string.end.yaml"}},"name":"string.quoted.single.yaml","patterns":[{"match":"''","name":"constant.character.escape.single-quoted.yaml"}]},"flow-sequence":{"begin":"\\\\[","beginCaptures":{"0":{"name":"punctuation.definition.sequence.begin.yaml"}},"end":"]","endCaptures":{"0":{"name":"punctuation.definition.sequence.end.yaml"}},"name":"meta.flow-sequence.yaml","patterns":[{"include":"#prototype"},{"match":",","name":"punctuation.separator.sequence.yaml"},{"include":"#flow-pair"},{"include":"#flow-node"}]},"flow-value":{"patterns":[{"begin":"\\\\G(?![],}])","end":"(?=[],}])","name":"meta.flow-pair.value.yaml","patterns":[{"include":"#flow-node"}]}]},"node":{"patterns":[{"include":"#block-node"}]},"property":{"begin":"(?=[!\\\\&])","end":"(?!\\\\G)","name":"meta.property.yaml","patterns":[{"captures":{"1":{"name":"keyword.control.property.anchor.yaml"},"2":{"name":"punctuation.definition.anchor.yaml"},"3":{"name":"entity.name.type.anchor.yaml"},"4":{"name":"invalid.illegal.character.anchor.yaml"}},"match":"\\\\G((&))([^],/\\\\[{}\\\\s]+)(\\\\S+)?"},{"match":"\\\\G!(?:<(?:%\\\\h{2}|[]!#$\\\\&-;=?-\\\\[_a-z~])+>|(?:[-0-9A-Za-z]*!)?(?:%\\\\h{2}|[#$\\\\&-+\\\\--;=?-Z_a-z~])+|)(?=[\\\\t ]|$)","name":"storage.type.tag-handle.yaml"},{"match":"\\\\S+","name":"invalid.illegal.tag-handle.yaml"}]},"prototype":{"patterns":[{"include":"#comment"},{"include":"#property"}]}},"scopeName":"source.yaml","aliases":["yml"]}`));
const yamlLang = [
  lang$1
];
const lang = Object.freeze(JSON.parse(`{"displayName":"TOML","fileTypes":["toml"],"name":"toml","patterns":[{"include":"#comments"},{"include":"#groups"},{"include":"#key_pair"},{"include":"#invalid"}],"repository":{"comments":{"begin":"(^[\\\\t ]+)?(?=#)","beginCaptures":{"1":{"name":"punctuation.whitespace.comment.leading.toml"}},"end":"(?!\\\\G)","patterns":[{"begin":"#","beginCaptures":{"0":{"name":"punctuation.definition.comment.toml"}},"end":"\\\\n","name":"comment.line.number-sign.toml"}]},"groups":{"patterns":[{"captures":{"1":{"name":"punctuation.definition.section.begin.toml"},"2":{"patterns":[{"match":"[^.\\\\s]+","name":"entity.name.section.toml"}]},"3":{"name":"punctuation.definition.section.begin.toml"}},"match":"^\\\\s*(\\\\[)([^]\\\\[]*)(])","name":"meta.group.toml"},{"captures":{"1":{"name":"punctuation.definition.section.begin.toml"},"2":{"patterns":[{"match":"[^.\\\\s]+","name":"entity.name.section.toml"}]},"3":{"name":"punctuation.definition.section.begin.toml"}},"match":"^\\\\s*(\\\\[\\\\[)([^]\\\\[]*)(]])","name":"meta.group.double.toml"}]},"invalid":{"match":"\\\\S+(\\\\s*(?=\\\\S))?","name":"invalid.illegal.not-allowed-here.toml"},"key_pair":{"patterns":[{"begin":"([-0-9A-Z_a-z]+)\\\\s*(=)\\\\s*","captures":{"1":{"name":"variable.other.key.toml"},"2":{"name":"punctuation.separator.key-value.toml"}},"end":"(?<=\\\\S)(?<!=)|$","patterns":[{"include":"#primatives"}]},{"begin":"((\\")(.*?)(\\"))\\\\s*(=)\\\\s*","captures":{"1":{"name":"variable.other.key.toml"},"2":{"name":"punctuation.definition.variable.begin.toml"},"3":{"patterns":[{"match":"\\\\\\\\([\\"\\\\\\\\bfnrt]|u\\\\h{4}|U\\\\h{8})","name":"constant.character.escape.toml"},{"match":"\\\\\\\\[^\\"\\\\\\\\bfnrt]","name":"invalid.illegal.escape.toml"},{"match":"\\"","name":"invalid.illegal.not-allowed-here.toml"}]},"4":{"name":"punctuation.definition.variable.end.toml"},"5":{"name":"punctuation.separator.key-value.toml"}},"end":"(?<=\\\\S)(?<!=)|$","patterns":[{"include":"#primatives"}]},{"begin":"((')([^']*)('))\\\\s*(=)\\\\s*","captures":{"1":{"name":"variable.other.key.toml"},"2":{"name":"punctuation.definition.variable.begin.toml"},"4":{"name":"punctuation.definition.variable.end.toml"},"5":{"name":"punctuation.separator.key-value.toml"}},"end":"(?<=\\\\S)(?<!=)|$","patterns":[{"include":"#primatives"}]},{"begin":"(((?:[-0-9A-Z_a-z]+|\\"(?:[^\\"\\\\\\\\]|\\\\\\\\.)*\\"|'[^']*')(?:\\\\s*\\\\.\\\\s*|(?=\\\\s*=))){2,})\\\\s*(=)\\\\s*","captures":{"1":{"name":"variable.other.key.toml","patterns":[{"match":"\\\\.","name":"punctuation.separator.variable.toml"},{"captures":{"1":{"name":"punctuation.definition.variable.begin.toml"},"2":{"patterns":[{"match":"\\\\\\\\([\\"\\\\\\\\bfnrt]|u\\\\h{4}|U\\\\h{8})","name":"constant.character.escape.toml"},{"match":"\\\\\\\\[^\\"\\\\\\\\bfnrt]","name":"invalid.illegal.escape.toml"}]},"3":{"name":"punctuation.definition.variable.end.toml"}},"match":"(\\")((?:[^\\"\\\\\\\\]|\\\\\\\\.)*)(\\")"},{"captures":{"1":{"name":"punctuation.definition.variable.begin.toml"},"2":{"name":"punctuation.definition.variable.end.toml"}},"match":"(')[^']*(')"}]},"3":{"name":"punctuation.separator.key-value.toml"}},"end":"(?<=\\\\S)(?<!=)|$","patterns":[{"include":"#primatives"}]}]},"primatives":{"patterns":[{"begin":"\\\\G\\"\\"\\"","beginCaptures":{"0":{"name":"punctuation.definition.string.begin.toml"}},"end":"\\"{3,5}","endCaptures":{"0":{"name":"punctuation.definition.string.end.toml"}},"name":"string.quoted.triple.double.toml","patterns":[{"match":"\\\\\\\\([\\"\\\\\\\\bfnrt]|u\\\\h{4}|U\\\\h{8})","name":"constant.character.escape.toml"},{"match":"\\\\\\\\[^\\\\n\\"\\\\\\\\bfnrt]","name":"invalid.illegal.escape.toml"}]},{"begin":"\\\\G\\"","beginCaptures":{"0":{"name":"punctuation.definition.string.begin.toml"}},"end":"\\"","endCaptures":{"0":{"name":"punctuation.definition.string.end.toml"}},"name":"string.quoted.double.toml","patterns":[{"match":"\\\\\\\\([\\"\\\\\\\\bfnrt]|u\\\\h{4}|U\\\\h{8})","name":"constant.character.escape.toml"},{"match":"\\\\\\\\[^\\"\\\\\\\\bfnrt]","name":"invalid.illegal.escape.toml"}]},{"begin":"\\\\G'''","beginCaptures":{"0":{"name":"punctuation.definition.string.begin.toml"}},"end":"'{3,5}","endCaptures":{"0":{"name":"punctuation.definition.string.end.toml"}},"name":"string.quoted.triple.single.toml"},{"begin":"\\\\G'","beginCaptures":{"0":{"name":"punctuation.definition.string.begin.toml"}},"end":"'","endCaptures":{"0":{"name":"punctuation.definition.string.end.toml"}},"name":"string.quoted.single.toml"},{"match":"\\\\G[0-9]{4}-(0[1-9]|1[012])-(?!00|3[2-9])[0-3][0-9]([ Tt](?!2[5-9])[012][0-9]:[0-5][0-9]:(?!6[1-9])[0-6][0-9](\\\\.[0-9]+)?(Z|[-+](?!2[5-9])[012][0-9]:[0-5][0-9])?)?","name":"constant.other.date.toml"},{"match":"\\\\G(?!2[5-9])[012][0-9]:[0-5][0-9]:(?!6[1-9])[0-6][0-9](\\\\.[0-9]+)?","name":"constant.other.time.toml"},{"match":"\\\\G(true|false)","name":"constant.language.boolean.toml"},{"match":"\\\\G0x\\\\h(_??\\\\h)*","name":"constant.numeric.hex.toml"},{"match":"\\\\G0o[0-7]([0-7]|_[0-7])*","name":"constant.numeric.octal.toml"},{"match":"\\\\G0b[01]([01]|_[01])*","name":"constant.numeric.binary.toml"},{"match":"\\\\G[-+]?(inf|nan)","name":"constant.numeric.toml"},{"match":"\\\\G([-+]?(0|([1-9](([0-9]|_[0-9])+)?)))(?=[.Ee])(\\\\.([0-9](([0-9]|_[0-9])+)?))?([Ee]([-+]?[0-9](([0-9]|_[0-9])+)?))?","name":"constant.numeric.float.toml"},{"match":"\\\\G([-+]?(0|([1-9](([0-9]|_[0-9])+)?)))","name":"constant.numeric.integer.toml"},{"begin":"\\\\G\\\\[","beginCaptures":{"0":{"name":"punctuation.definition.array.begin.toml"}},"end":"]","endCaptures":{"0":{"name":"punctuation.definition.array.end.toml"}},"name":"meta.array.toml","patterns":[{"begin":"(?=[\\"']|[-+]?[0-9]|[-+]?(inf|nan)|true|false|[\\\\[{])","end":",|(?=])","endCaptures":{"0":{"name":"punctuation.separator.array.toml"}},"patterns":[{"include":"#primatives"},{"include":"#comments"},{"include":"#invalid"}]},{"include":"#comments"},{"include":"#invalid"}]},{"begin":"\\\\G\\\\{","beginCaptures":{"0":{"name":"punctuation.definition.inline-table.begin.toml"}},"end":"}","endCaptures":{"0":{"name":"punctuation.definition.inline-table.end.toml"}},"name":"meta.inline-table.toml","patterns":[{"begin":"(?=\\\\S)","end":",|(?=})","endCaptures":{"0":{"name":"punctuation.separator.inline-table.toml"}},"patterns":[{"include":"#key_pair"}]},{"include":"#comments"}]}]}},"scopeName":"source.toml"}`));
const tomlLang = [
  lang
];
const everforestLight = Object.freeze(JSON.parse('{"colors":{"activityBar.activeBorder":"#93b259d0","activityBar.activeFocusBorder":"#93b259","activityBar.background":"#fdf6e3","activityBar.border":"#fdf6e3","activityBar.dropBackground":"#fdf6e3","activityBar.foreground":"#5c6a72","activityBar.inactiveForeground":"#939f91","activityBarBadge.background":"#93b259","activityBarBadge.foreground":"#fdf6e3","badge.background":"#93b259","badge.foreground":"#fdf6e3","breadcrumb.activeSelectionForeground":"#5c6a72","breadcrumb.focusForeground":"#5c6a72","breadcrumb.foreground":"#939f91","button.background":"#93b259","button.foreground":"#fdf6e3","button.hoverBackground":"#93b259d0","button.secondaryBackground":"#efebd4","button.secondaryForeground":"#5c6a72","button.secondaryHoverBackground":"#e6e2cc","charts.blue":"#3a94c5","charts.foreground":"#5c6a72","charts.green":"#8da101","charts.orange":"#f57d26","charts.purple":"#df69ba","charts.red":"#f85552","charts.yellow":"#dfa000","checkbox.background":"#fdf6e3","checkbox.border":"#e0dcc7","checkbox.foreground":"#f57d26","debugConsole.errorForeground":"#f85552","debugConsole.infoForeground":"#8da101","debugConsole.sourceForeground":"#df69ba","debugConsole.warningForeground":"#dfa000","debugConsoleInputIcon.foreground":"#35a77c","debugIcon.breakpointCurrentStackframeForeground":"#3a94c5","debugIcon.breakpointDisabledForeground":"#f1706f","debugIcon.breakpointForeground":"#f85552","debugIcon.breakpointStackframeForeground":"#f85552","debugIcon.breakpointUnverifiedForeground":"#879686","debugIcon.continueForeground":"#3a94c5","debugIcon.disconnectForeground":"#df69ba","debugIcon.pauseForeground":"#dfa000","debugIcon.restartForeground":"#35a77c","debugIcon.startForeground":"#35a77c","debugIcon.stepBackForeground":"#3a94c5","debugIcon.stepIntoForeground":"#3a94c5","debugIcon.stepOutForeground":"#3a94c5","debugIcon.stepOverForeground":"#3a94c5","debugIcon.stopForeground":"#f85552","debugTokenExpression.boolean":"#df69ba","debugTokenExpression.error":"#f85552","debugTokenExpression.name":"#3a94c5","debugTokenExpression.number":"#df69ba","debugTokenExpression.string":"#dfa000","debugTokenExpression.value":"#8da101","debugToolBar.background":"#fdf6e3","descriptionForeground":"#939f91","diffEditor.diagonalFill":"#e0dcc7","diffEditor.insertedTextBackground":"#6ec39830","diffEditor.removedTextBackground":"#f1706f30","dropdown.background":"#fdf6e3","dropdown.border":"#e0dcc7","dropdown.foreground":"#879686","editor.background":"#fdf6e3","editor.findMatchBackground":"#f3945940","editor.findMatchHighlightBackground":"#a4bb4a40","editor.findRangeHighlightBackground":"#e6e2cc50","editor.foldBackground":"#e0dcc780","editor.foreground":"#5c6a72","editor.hoverHighlightBackground":"#e6e2cc90","editor.inactiveSelectionBackground":"#e6e2cc50","editor.lineHighlightBackground":"#efebd470","editor.lineHighlightBorder":"#e0dcc700","editor.rangeHighlightBackground":"#efebd480","editor.selectionBackground":"#e6e2cca0","editor.selectionHighlightBackground":"#e6e2cc50","editor.snippetFinalTabstopHighlightBackground":"#a4bb4a40","editor.snippetFinalTabstopHighlightBorder":"#fdf6e3","editor.snippetTabstopHighlightBackground":"#efebd4","editor.symbolHighlightBackground":"#6cb3c640","editor.wordHighlightBackground":"#e6e2cc48","editor.wordHighlightStrongBackground":"#e6e2cc90","editorBracketHighlight.foreground1":"#f85552","editorBracketHighlight.foreground2":"#dfa000","editorBracketHighlight.foreground3":"#8da101","editorBracketHighlight.foreground4":"#3a94c5","editorBracketHighlight.foreground5":"#f57d26","editorBracketHighlight.foreground6":"#df69ba","editorBracketHighlight.unexpectedBracket.foreground":"#939f91","editorBracketMatch.background":"#e0dcc7","editorBracketMatch.border":"#fdf6e300","editorCodeLens.foreground":"#a4ad9ea0","editorCursor.foreground":"#5c6a72","editorError.background":"#f1706f00","editorError.foreground":"#f1706f","editorGhostText.background":"#fdf6e300","editorGhostText.foreground":"#a4ad9ea0","editorGroup.border":"#efebd4","editorGroup.dropBackground":"#e0dcc760","editorGroupHeader.noTabsBackground":"#fdf6e3","editorGroupHeader.tabsBackground":"#fdf6e3","editorGutter.addedBackground":"#a4bb4aa0","editorGutter.background":"#fdf6e300","editorGutter.commentRangeForeground":"#a4ad9e","editorGutter.deletedBackground":"#f1706fa0","editorGutter.modifiedBackground":"#6cb3c6a0","editorHint.foreground":"#e092be","editorHoverWidget.background":"#f4f0d9","editorHoverWidget.border":"#e6e2cc","editorIndentGuide.activeBackground":"#87968650","editorIndentGuide.background":"#87968620","editorInfo.background":"#6cb3c600","editorInfo.foreground":"#6cb3c6","editorInlayHint.background":"#fdf6e300","editorInlayHint.foreground":"#a4ad9ea0","editorInlayHint.parameterBackground":"#fdf6e300","editorInlayHint.parameterForeground":"#a4ad9ea0","editorInlayHint.typeBackground":"#fdf6e300","editorInlayHint.typeForeground":"#a4ad9ea0","editorLightBulb.foreground":"#dfa000","editorLightBulbAutoFix.foreground":"#35a77c","editorLineNumber.activeForeground":"#879686e0","editorLineNumber.foreground":"#a4ad9ea0","editorLink.activeForeground":"#8da101","editorMarkerNavigation.background":"#f4f0d9","editorMarkerNavigationError.background":"#f1706f80","editorMarkerNavigationInfo.background":"#6cb3c680","editorMarkerNavigationWarning.background":"#e4b64980","editorOverviewRuler.addedForeground":"#a4bb4aa0","editorOverviewRuler.border":"#fdf6e300","editorOverviewRuler.commonContentForeground":"#939f91","editorOverviewRuler.currentContentForeground":"#6cb3c6","editorOverviewRuler.deletedForeground":"#f1706fa0","editorOverviewRuler.errorForeground":"#f85552","editorOverviewRuler.findMatchForeground":"#6ec398","editorOverviewRuler.incomingContentForeground":"#6ec398","editorOverviewRuler.infoForeground":"#df69ba","editorOverviewRuler.modifiedForeground":"#6cb3c6a0","editorOverviewRuler.rangeHighlightForeground":"#6ec398","editorOverviewRuler.selectionHighlightForeground":"#6ec398","editorOverviewRuler.warningForeground":"#dfa000","editorOverviewRuler.wordHighlightForeground":"#e0dcc7","editorOverviewRuler.wordHighlightStrongForeground":"#e0dcc7","editorRuler.foreground":"#e6e2cca0","editorSuggestWidget.background":"#efebd4","editorSuggestWidget.border":"#efebd4","editorSuggestWidget.foreground":"#5c6a72","editorSuggestWidget.highlightForeground":"#8da101","editorSuggestWidget.selectedBackground":"#e6e2cc","editorUnnecessaryCode.border":"#fdf6e3","editorUnnecessaryCode.opacity":"#00000080","editorWarning.background":"#e4b64900","editorWarning.foreground":"#e4b649","editorWhitespace.foreground":"#e6e2cc","editorWidget.background":"#fdf6e3","editorWidget.border":"#e0dcc7","editorWidget.foreground":"#5c6a72","errorForeground":"#f85552","extensionBadge.remoteBackground":"#93b259","extensionBadge.remoteForeground":"#fdf6e3","extensionButton.prominentBackground":"#93b259","extensionButton.prominentForeground":"#fdf6e3","extensionButton.prominentHoverBackground":"#93b259d0","extensionIcon.preReleaseForeground":"#f57d26","extensionIcon.starForeground":"#35a77c","extensionIcon.verifiedForeground":"#8da101","focusBorder":"#fdf6e300","foreground":"#879686","gitDecoration.addedResourceForeground":"#8da101a0","gitDecoration.conflictingResourceForeground":"#df69baa0","gitDecoration.deletedResourceForeground":"#f85552a0","gitDecoration.ignoredResourceForeground":"#e0dcc7","gitDecoration.modifiedResourceForeground":"#3a94c5a0","gitDecoration.stageDeletedResourceForeground":"#35a77ca0","gitDecoration.stageModifiedResourceForeground":"#35a77ca0","gitDecoration.submoduleResourceForeground":"#f57d26a0","gitDecoration.untrackedResourceForeground":"#dfa000a0","gitlens.closedPullRequestIconColor":"#f85552","gitlens.decorations.addedForegroundColor":"#8da101","gitlens.decorations.branchAheadForegroundColor":"#35a77c","gitlens.decorations.branchBehindForegroundColor":"#f57d26","gitlens.decorations.branchDivergedForegroundColor":"#dfa000","gitlens.decorations.branchMissingUpstreamForegroundColor":"#f85552","gitlens.decorations.branchUnpublishedForegroundColor":"#3a94c5","gitlens.decorations.branchUpToDateForegroundColor":"#5c6a72","gitlens.decorations.copiedForegroundColor":"#df69ba","gitlens.decorations.deletedForegroundColor":"#f85552","gitlens.decorations.ignoredForegroundColor":"#879686","gitlens.decorations.modifiedForegroundColor":"#3a94c5","gitlens.decorations.renamedForegroundColor":"#df69ba","gitlens.decorations.untrackedForegroundColor":"#dfa000","gitlens.gutterBackgroundColor":"#fdf6e3","gitlens.gutterForegroundColor":"#5c6a72","gitlens.gutterUncommittedForegroundColor":"#3a94c5","gitlens.lineHighlightBackgroundColor":"#f4f0d9","gitlens.lineHighlightOverviewRulerColor":"#93b259","gitlens.mergedPullRequestIconColor":"#df69ba","gitlens.openPullRequestIconColor":"#35a77c","gitlens.trailingLineForegroundColor":"#939f91","gitlens.unpublishedCommitIconColor":"#dfa000","gitlens.unpulledChangesIconColor":"#f57d26","gitlens.unpushlishedChangesIconColor":"#3a94c5","icon.foreground":"#35a77c","imagePreview.border":"#fdf6e3","input.background":"#fdf6e300","input.border":"#e0dcc7","input.foreground":"#5c6a72","input.placeholderForeground":"#a4ad9e","inputOption.activeBorder":"#35a77c","inputValidation.errorBackground":"#f1706f","inputValidation.errorBorder":"#f85552","inputValidation.errorForeground":"#5c6a72","inputValidation.infoBackground":"#6cb3c6","inputValidation.infoBorder":"#3a94c5","inputValidation.infoForeground":"#5c6a72","inputValidation.warningBackground":"#e4b649","inputValidation.warningBorder":"#dfa000","inputValidation.warningForeground":"#5c6a72","issues.closed":"#f85552","issues.open":"#35a77c","keybindingLabel.background":"#fdf6e300","keybindingLabel.border":"#f4f0d9","keybindingLabel.bottomBorder":"#efebd4","keybindingLabel.foreground":"#5c6a72","keybindingTable.headerBackground":"#efebd4","keybindingTable.rowsBackground":"#f4f0d9","list.activeSelectionBackground":"#e6e2cc80","list.activeSelectionForeground":"#5c6a72","list.dropBackground":"#f4f0d980","list.errorForeground":"#f85552","list.focusBackground":"#e6e2cc80","list.focusForeground":"#5c6a72","list.highlightForeground":"#8da101","list.hoverBackground":"#fdf6e300","list.hoverForeground":"#5c6a72","list.inactiveFocusBackground":"#e6e2cc60","list.inactiveSelectionBackground":"#e6e2cc80","list.inactiveSelectionForeground":"#879686","list.invalidItemForeground":"#f1706f","list.warningForeground":"#dfa000","menu.background":"#fdf6e3","menu.foreground":"#879686","menu.selectionBackground":"#f4f0d9","menu.selectionForeground":"#5c6a72","menubar.selectionBackground":"#fdf6e3","menubar.selectionBorder":"#fdf6e3","merge.border":"#fdf6e300","merge.currentContentBackground":"#6cb3c640","merge.currentHeaderBackground":"#6cb3c680","merge.incomingContentBackground":"#6ec39840","merge.incomingHeaderBackground":"#6ec39880","minimap.errorHighlight":"#f1706f80","minimap.findMatchHighlight":"#6ec39860","minimap.selectionHighlight":"#e0dcc7f0","minimap.warningHighlight":"#e4b64980","minimapGutter.addedBackground":"#a4bb4aa0","minimapGutter.deletedBackground":"#f1706fa0","minimapGutter.modifiedBackground":"#6cb3c6a0","notebook.cellBorderColor":"#e0dcc7","notebook.cellHoverBackground":"#fdf6e3","notebook.cellStatusBarItemHoverBackground":"#f4f0d9","notebook.cellToolbarSeparator":"#e0dcc7","notebook.focusedCellBackground":"#fdf6e3","notebook.focusedCellBorder":"#e0dcc7","notebook.focusedEditorBorder":"#e0dcc7","notebook.focusedRowBorder":"#e0dcc7","notebook.inactiveFocusedCellBorder":"#e0dcc7","notebook.outputContainerBackgroundColor":"#f4f0d9","notebook.selectedCellBorder":"#e0dcc7","notebookStatusErrorIcon.foreground":"#f85552","notebookStatusRunningIcon.foreground":"#3a94c5","notebookStatusSuccessIcon.foreground":"#8da101","notificationCenterHeader.background":"#efebd4","notificationCenterHeader.foreground":"#5c6a72","notificationLink.foreground":"#8da101","notifications.background":"#fdf6e3","notifications.foreground":"#5c6a72","notificationsErrorIcon.foreground":"#f85552","notificationsInfoIcon.foreground":"#3a94c5","notificationsWarningIcon.foreground":"#dfa000","panel.background":"#fdf6e3","panel.border":"#fdf6e3","panelInput.border":"#e0dcc7","panelSection.border":"#efebd4","panelSectionHeader.background":"#fdf6e3","panelTitle.activeBorder":"#93b259d0","panelTitle.activeForeground":"#5c6a72","panelTitle.inactiveForeground":"#939f91","peekView.border":"#e6e2cc","peekViewEditor.background":"#f4f0d9","peekViewEditor.matchHighlightBackground":"#e4b64950","peekViewEditorGutter.background":"#f4f0d9","peekViewResult.background":"#f4f0d9","peekViewResult.fileForeground":"#5c6a72","peekViewResult.lineForeground":"#879686","peekViewResult.matchHighlightBackground":"#e4b64950","peekViewResult.selectionBackground":"#6ec39850","peekViewResult.selectionForeground":"#5c6a72","peekViewTitle.background":"#e6e2cc","peekViewTitleDescription.foreground":"#5c6a72","peekViewTitleLabel.foreground":"#8da101","pickerGroup.border":"#93b2591a","pickerGroup.foreground":"#5c6a72","ports.iconRunningProcessForeground":"#f57d26","problemsErrorIcon.foreground":"#f85552","problemsInfoIcon.foreground":"#3a94c5","problemsWarningIcon.foreground":"#dfa000","progressBar.background":"#93b259","quickInputTitle.background":"#f4f0d9","rust_analyzer.inlayHints.background":"#fdf6e300","rust_analyzer.inlayHints.foreground":"#a4ad9ea0","rust_analyzer.syntaxTreeBorder":"#f85552","sash.hoverBorder":"#e6e2cc","scrollbar.shadow":"#3c474d20","scrollbarSlider.activeBackground":"#879686","scrollbarSlider.background":"#e0dcc780","scrollbarSlider.hoverBackground":"#e0dcc7","selection.background":"#e6e2ccc0","settings.checkboxBackground":"#fdf6e3","settings.checkboxBorder":"#e0dcc7","settings.checkboxForeground":"#f57d26","settings.dropdownBackground":"#fdf6e3","settings.dropdownBorder":"#e0dcc7","settings.dropdownForeground":"#35a77c","settings.focusedRowBackground":"#f4f0d9","settings.headerForeground":"#879686","settings.modifiedItemIndicator":"#a4ad9e","settings.numberInputBackground":"#fdf6e3","settings.numberInputBorder":"#e0dcc7","settings.numberInputForeground":"#df69ba","settings.rowHoverBackground":"#f4f0d9","settings.textInputBackground":"#fdf6e3","settings.textInputBorder":"#e0dcc7","settings.textInputForeground":"#3a94c5","sideBar.background":"#fdf6e3","sideBar.foreground":"#939f91","sideBarSectionHeader.background":"#fdf6e300","sideBarSectionHeader.foreground":"#879686","sideBarTitle.foreground":"#879686","statusBar.background":"#fdf6e3","statusBar.border":"#fdf6e3","statusBar.debuggingBackground":"#fdf6e3","statusBar.debuggingForeground":"#f57d26","statusBar.foreground":"#879686","statusBar.noFolderBackground":"#fdf6e3","statusBar.noFolderBorder":"#fdf6e3","statusBar.noFolderForeground":"#879686","statusBarItem.activeBackground":"#e6e2cc70","statusBarItem.errorBackground":"#fdf6e3","statusBarItem.errorForeground":"#f85552","statusBarItem.hoverBackground":"#e6e2cca0","statusBarItem.prominentBackground":"#fdf6e3","statusBarItem.prominentForeground":"#5c6a72","statusBarItem.prominentHoverBackground":"#e6e2cca0","statusBarItem.remoteBackground":"#fdf6e3","statusBarItem.remoteForeground":"#879686","statusBarItem.warningBackground":"#fdf6e3","statusBarItem.warningForeground":"#dfa000","symbolIcon.arrayForeground":"#3a94c5","symbolIcon.booleanForeground":"#df69ba","symbolIcon.classForeground":"#dfa000","symbolIcon.colorForeground":"#5c6a72","symbolIcon.constantForeground":"#35a77c","symbolIcon.constructorForeground":"#df69ba","symbolIcon.enumeratorForeground":"#df69ba","symbolIcon.enumeratorMemberForeground":"#35a77c","symbolIcon.eventForeground":"#dfa000","symbolIcon.fieldForeground":"#5c6a72","symbolIcon.fileForeground":"#5c6a72","symbolIcon.folderForeground":"#5c6a72","symbolIcon.functionForeground":"#8da101","symbolIcon.interfaceForeground":"#dfa000","symbolIcon.keyForeground":"#8da101","symbolIcon.keywordForeground":"#f85552","symbolIcon.methodForeground":"#8da101","symbolIcon.moduleForeground":"#df69ba","symbolIcon.namespaceForeground":"#df69ba","symbolIcon.nullForeground":"#35a77c","symbolIcon.numberForeground":"#df69ba","symbolIcon.objectForeground":"#df69ba","symbolIcon.operatorForeground":"#f57d26","symbolIcon.packageForeground":"#df69ba","symbolIcon.propertyForeground":"#35a77c","symbolIcon.referenceForeground":"#3a94c5","symbolIcon.snippetForeground":"#5c6a72","symbolIcon.stringForeground":"#8da101","symbolIcon.structForeground":"#dfa000","symbolIcon.textForeground":"#5c6a72","symbolIcon.typeParameterForeground":"#35a77c","symbolIcon.unitForeground":"#5c6a72","symbolIcon.variableForeground":"#3a94c5","tab.activeBackground":"#fdf6e3","tab.activeBorder":"#93b259d0","tab.activeForeground":"#5c6a72","tab.border":"#fdf6e3","tab.hoverBackground":"#fdf6e3","tab.hoverForeground":"#5c6a72","tab.inactiveBackground":"#fdf6e3","tab.inactiveForeground":"#a4ad9e","tab.lastPinnedBorder":"#93b259d0","tab.unfocusedActiveBorder":"#939f91","tab.unfocusedActiveForeground":"#879686","tab.unfocusedHoverForeground":"#5c6a72","tab.unfocusedInactiveForeground":"#a4ad9e","terminal.ansiBlack":"#5c6a72","terminal.ansiBlue":"#3a94c5","terminal.ansiBrightBlack":"#5c6a72","terminal.ansiBrightBlue":"#3a94c5","terminal.ansiBrightCyan":"#35a77c","terminal.ansiBrightGreen":"#8da101","terminal.ansiBrightMagenta":"#df69ba","terminal.ansiBrightRed":"#f85552","terminal.ansiBrightWhite":"#f4f0d9","terminal.ansiBrightYellow":"#dfa000","terminal.ansiCyan":"#35a77c","terminal.ansiGreen":"#8da101","terminal.ansiMagenta":"#df69ba","terminal.ansiRed":"#f85552","terminal.ansiWhite":"#939f91","terminal.ansiYellow":"#dfa000","terminal.foreground":"#5c6a72","terminalCursor.foreground":"#5c6a72","testing.iconErrored":"#f85552","testing.iconFailed":"#f85552","testing.iconPassed":"#35a77c","testing.iconQueued":"#3a94c5","testing.iconSkipped":"#df69ba","testing.iconUnset":"#dfa000","testing.runAction":"#35a77c","textBlockQuote.background":"#f4f0d9","textBlockQuote.border":"#e6e2cc","textCodeBlock.background":"#f4f0d9","textLink.activeForeground":"#8da101c0","textLink.foreground":"#8da101","textPreformat.foreground":"#dfa000","titleBar.activeBackground":"#fdf6e3","titleBar.activeForeground":"#879686","titleBar.border":"#fdf6e3","titleBar.inactiveBackground":"#fdf6e3","titleBar.inactiveForeground":"#a4ad9e","toolbar.hoverBackground":"#f4f0d9","tree.indentGuidesStroke":"#a4ad9e","walkThrough.embeddedEditorBackground":"#f4f0d9","welcomePage.buttonBackground":"#f4f0d9","welcomePage.buttonHoverBackground":"#f4f0d9a0","welcomePage.progress.foreground":"#8da101","welcomePage.tileHoverBackground":"#f4f0d9","widget.shadow":"#3c474d20"},"displayName":"Everforest Light","name":"everforest-light","semanticHighlighting":true,"semanticTokenColors":{"class:python":"#35a77c","class:typescript":"#35a77c","class:typescriptreact":"#35a77c","enum:typescript":"#df69ba","enum:typescriptreact":"#df69ba","enumMember:typescript":"#3a94c5","enumMember:typescriptreact":"#3a94c5","interface:typescript":"#35a77c","interface:typescriptreact":"#35a77c","intrinsic:python":"#df69ba","macro:rust":"#35a77c","memberOperatorOverload":"#f57d26","module:python":"#3a94c5","namespace:rust":"#df69ba","namespace:typescript":"#df69ba","namespace:typescriptreact":"#df69ba","operatorOverload":"#f57d26","property.defaultLibrary:javascript":"#df69ba","property.defaultLibrary:javascriptreact":"#df69ba","property.defaultLibrary:typescript":"#df69ba","property.defaultLibrary:typescriptreact":"#df69ba","selfKeyword:rust":"#df69ba","variable.defaultLibrary:javascript":"#df69ba","variable.defaultLibrary:javascriptreact":"#df69ba","variable.defaultLibrary:typescript":"#df69ba","variable.defaultLibrary:typescriptreact":"#df69ba"},"tokenColors":[{"scope":"keyword, storage.type.function, storage.type.class, storage.type.enum, storage.type.interface, storage.type.property, keyword.operator.new, keyword.operator.expression, keyword.operator.new, keyword.operator.delete, storage.type.extends","settings":{"foreground":"#f85552"}},{"scope":"keyword.other.debugger","settings":{"foreground":"#f85552"}},{"scope":"storage, modifier, keyword.var, entity.name.tag, keyword.control.case, keyword.control.switch","settings":{"foreground":"#f57d26"}},{"scope":"keyword.operator","settings":{"foreground":"#f57d26"}},{"scope":"string, punctuation.definition.string.end, punctuation.definition.string.begin, punctuation.definition.string.template.begin, punctuation.definition.string.template.end","settings":{"foreground":"#dfa000"}},{"scope":"entity.other.attribute-name","settings":{"foreground":"#dfa000"}},{"scope":"constant.character.escape, punctuation.quasi.element, punctuation.definition.template-expression, punctuation.section.embedded, storage.type.format, constant.other.placeholder, constant.other.placeholder, variable.interpolation","settings":{"foreground":"#8da101"}},{"scope":"entity.name.function, support.function, meta.function, meta.function-call, meta.definition.method","settings":{"foreground":"#8da101"}},{"scope":"keyword.control.at-rule, keyword.control.import, keyword.control.export, storage.type.namespace, punctuation.decorator, keyword.control.directive, keyword.preprocessor, punctuation.definition.preprocessor, punctuation.definition.directive, keyword.other.import, keyword.other.package, entity.name.type.namespace, entity.name.scope-resolution, keyword.other.using, keyword.package, keyword.import, keyword.map","settings":{"foreground":"#35a77c"}},{"scope":"storage.type.annotation","settings":{"foreground":"#35a77c"}},{"scope":"entity.name.label, constant.other.label","settings":{"foreground":"#35a77c"}},{"scope":"support.module, support.node, support.other.module, support.type.object.module, entity.name.type.module, entity.name.type.class.module, keyword.control.module","settings":{"foreground":"#35a77c"}},{"scope":"storage.type, support.type, entity.name.type, keyword.type","settings":{"foreground":"#3a94c5"}},{"scope":"entity.name.type.class, support.class, entity.name.class, entity.other.inherited-class, storage.class","settings":{"foreground":"#3a94c5"}},{"scope":"constant.numeric","settings":{"foreground":"#df69ba"}},{"scope":"constant.language.boolean","settings":{"foreground":"#df69ba"}},{"scope":"entity.name.function.preprocessor","settings":{"foreground":"#df69ba"}},{"scope":"variable.language.this, variable.language.self, variable.language.super, keyword.other.this, variable.language.special, constant.language.null, constant.language.undefined, constant.language.nan","settings":{"foreground":"#df69ba"}},{"scope":"constant.language, support.constant","settings":{"foreground":"#df69ba"}},{"scope":"variable, support.variable, meta.definition.variable","settings":{"foreground":"#5c6a72"}},{"scope":"variable.object.property, support.variable.property, variable.other.property, variable.other.object.property, variable.other.enummember, variable.other.member, meta.object-literal.key","settings":{"foreground":"#5c6a72"}},{"scope":"punctuation, meta.brace, meta.delimiter, meta.bracket","settings":{"foreground":"#5c6a72"}},{"scope":"heading.1.markdown, markup.heading.setext.1.markdown","settings":{"fontStyle":"bold","foreground":"#f85552"}},{"scope":"heading.2.markdown, markup.heading.setext.2.markdown","settings":{"fontStyle":"bold","foreground":"#f57d26"}},{"scope":"heading.3.markdown","settings":{"fontStyle":"bold","foreground":"#dfa000"}},{"scope":"heading.4.markdown","settings":{"fontStyle":"bold","foreground":"#8da101"}},{"scope":"heading.5.markdown","settings":{"fontStyle":"bold","foreground":"#3a94c5"}},{"scope":"heading.6.markdown","settings":{"fontStyle":"bold","foreground":"#df69ba"}},{"scope":"punctuation.definition.heading.markdown","settings":{"fontStyle":"regular","foreground":"#939f91"}},{"scope":"string.other.link.title.markdown, constant.other.reference.link.markdown, string.other.link.description.markdown","settings":{"fontStyle":"regular","foreground":"#df69ba"}},{"scope":"markup.underline.link.image.markdown, markup.underline.link.markdown","settings":{"fontStyle":"underline","foreground":"#8da101"}},{"scope":"punctuation.definition.string.begin.markdown, punctuation.definition.string.end.markdown, punctuation.definition.italic.markdown, punctuation.definition.quote.begin.markdown, punctuation.definition.metadata.markdown, punctuation.separator.key-value.markdown, punctuation.definition.constant.markdown","settings":{"foreground":"#939f91"}},{"scope":"punctuation.definition.bold.markdown","settings":{"fontStyle":"regular","foreground":"#939f91"}},{"scope":"meta.separator.markdown, punctuation.definition.constant.begin.markdown, punctuation.definition.constant.end.markdown","settings":{"fontStyle":"bold","foreground":"#939f91"}},{"scope":"markup.italic","settings":{"fontStyle":"italic"}},{"scope":"markup.bold","settings":{"fontStyle":"bold"}},{"scope":"markup.bold markup.italic, markup.italic markup.bold","settings":{"fontStyle":"italic bold"}},{"scope":"punctuation.definition.markdown, punctuation.definition.raw.markdown","settings":{"foreground":"#dfa000"}},{"scope":"fenced_code.block.language","settings":{"foreground":"#dfa000"}},{"scope":"markup.fenced_code.block.markdown, markup.inline.raw.string.markdown","settings":{"foreground":"#8da101"}},{"scope":"punctuation.definition.list.begin.markdown","settings":{"foreground":"#f85552"}},{"scope":"punctuation.definition.heading.restructuredtext","settings":{"fontStyle":"bold","foreground":"#f57d26"}},{"scope":"punctuation.definition.field.restructuredtext, punctuation.separator.key-value.restructuredtext, punctuation.definition.directive.restructuredtext, punctuation.definition.constant.restructuredtext, punctuation.definition.italic.restructuredtext, punctuation.definition.table.restructuredtext","settings":{"foreground":"#939f91"}},{"scope":"punctuation.definition.bold.restructuredtext","settings":{"fontStyle":"regular","foreground":"#939f91"}},{"scope":"entity.name.tag.restructuredtext, punctuation.definition.link.restructuredtext, punctuation.definition.raw.restructuredtext, punctuation.section.raw.restructuredtext","settings":{"foreground":"#35a77c"}},{"scope":"constant.other.footnote.link.restructuredtext","settings":{"foreground":"#df69ba"}},{"scope":"support.directive.restructuredtext","settings":{"foreground":"#f85552"}},{"scope":"entity.name.directive.restructuredtext, markup.raw.restructuredtext, markup.raw.inner.restructuredtext, string.other.link.title.restructuredtext","settings":{"foreground":"#8da101"}},{"scope":"punctuation.definition.function.latex, punctuation.definition.function.tex, punctuation.definition.keyword.latex, constant.character.newline.tex, punctuation.definition.keyword.tex","settings":{"foreground":"#939f91"}},{"scope":"support.function.be.latex","settings":{"foreground":"#f85552"}},{"scope":"support.function.section.latex, keyword.control.table.cell.latex, keyword.control.table.newline.latex","settings":{"foreground":"#f57d26"}},{"scope":"support.class.latex, variable.parameter.latex, variable.parameter.function.latex, variable.parameter.definition.label.latex, constant.other.reference.label.latex","settings":{"foreground":"#dfa000"}},{"scope":"keyword.control.preamble.latex","settings":{"foreground":"#df69ba"}},{"scope":"punctuation.separator.namespace.xml","settings":{"foreground":"#939f91"}},{"scope":"entity.name.tag.html, entity.name.tag.xml, entity.name.tag.localname.xml","settings":{"foreground":"#f57d26"}},{"scope":"entity.other.attribute-name.html, entity.other.attribute-name.xml, entity.other.attribute-name.localname.xml","settings":{"foreground":"#dfa000"}},{"scope":"string.quoted.double.html, string.quoted.single.html, punctuation.definition.string.begin.html, punctuation.definition.string.end.html, punctuation.separator.key-value.html, punctuation.definition.string.begin.xml, punctuation.definition.string.end.xml, string.quoted.double.xml, string.quoted.single.xml, punctuation.definition.tag.begin.html, punctuation.definition.tag.end.html, punctuation.definition.tag.xml, meta.tag.xml, meta.tag.preprocessor.xml, meta.tag.other.html, meta.tag.block.any.html, meta.tag.inline.any.html","settings":{"foreground":"#8da101"}},{"scope":"variable.language.documentroot.xml, meta.tag.sgml.doctype.xml","settings":{"foreground":"#df69ba"}},{"scope":"storage.type.proto","settings":{"foreground":"#dfa000"}},{"scope":"string.quoted.double.proto.syntax, string.quoted.single.proto.syntax, string.quoted.double.proto, string.quoted.single.proto","settings":{"foreground":"#8da101"}},{"scope":"entity.name.class.proto, entity.name.class.message.proto","settings":{"foreground":"#35a77c"}},{"scope":"punctuation.definition.entity.css, punctuation.separator.key-value.css, punctuation.terminator.rule.css, punctuation.separator.list.comma.css","settings":{"foreground":"#939f91"}},{"scope":"entity.other.attribute-name.class.css","settings":{"foreground":"#f85552"}},{"scope":"keyword.other.unit","settings":{"foreground":"#f57d26"}},{"scope":"entity.other.attribute-name.pseudo-class.css, entity.other.attribute-name.pseudo-element.css","settings":{"foreground":"#dfa000"}},{"scope":"string.quoted.single.css, string.quoted.double.css, support.constant.property-value.css, meta.property-value.css, punctuation.definition.string.begin.css, punctuation.definition.string.end.css, constant.numeric.css, support.constant.font-name.css, variable.parameter.keyframe-list.css","settings":{"foreground":"#8da101"}},{"scope":"support.type.property-name.css","settings":{"foreground":"#35a77c"}},{"scope":"support.type.vendored.property-name.css","settings":{"foreground":"#3a94c5"}},{"scope":"entity.name.tag.css, entity.other.keyframe-offset.css, punctuation.definition.keyword.css, keyword.control.at-rule.keyframes.css, meta.selector.css","settings":{"foreground":"#df69ba"}},{"scope":"punctuation.definition.entity.scss, punctuation.separator.key-value.scss, punctuation.terminator.rule.scss, punctuation.separator.list.comma.scss","settings":{"foreground":"#939f91"}},{"scope":"keyword.control.at-rule.keyframes.scss","settings":{"foreground":"#f57d26"}},{"scope":"punctuation.definition.interpolation.begin.bracket.curly.scss, punctuation.definition.interpolation.end.bracket.curly.scss","settings":{"foreground":"#dfa000"}},{"scope":"punctuation.definition.string.begin.scss, punctuation.definition.string.end.scss, string.quoted.double.scss, string.quoted.single.scss, constant.character.css.sass, meta.property-value.scss","settings":{"foreground":"#8da101"}},{"scope":"keyword.control.at-rule.include.scss, keyword.control.at-rule.use.scss, keyword.control.at-rule.mixin.scss, keyword.control.at-rule.extend.scss, keyword.control.at-rule.import.scss","settings":{"foreground":"#df69ba"}},{"scope":"meta.function.stylus","settings":{"foreground":"#5c6a72"}},{"scope":"entity.name.function.stylus","settings":{"foreground":"#dfa000"}},{"scope":"string.unquoted.js","settings":{"foreground":"#5c6a72"}},{"scope":"punctuation.accessor.js, punctuation.separator.key-value.js, punctuation.separator.label.js, keyword.operator.accessor.js","settings":{"foreground":"#939f91"}},{"scope":"punctuation.definition.block.tag.jsdoc","settings":{"foreground":"#f85552"}},{"scope":"storage.type.js, storage.type.function.arrow.js","settings":{"foreground":"#f57d26"}},{"scope":"JSXNested","settings":{"foreground":"#5c6a72"}},{"scope":"punctuation.definition.tag.jsx, entity.other.attribute-name.jsx, punctuation.definition.tag.begin.js.jsx, punctuation.definition.tag.end.js.jsx, entity.other.attribute-name.js.jsx","settings":{"foreground":"#8da101"}},{"scope":"entity.name.type.module.ts","settings":{"foreground":"#5c6a72"}},{"scope":"keyword.operator.type.annotation.ts, punctuation.accessor.ts, punctuation.separator.key-value.ts","settings":{"foreground":"#939f91"}},{"scope":"punctuation.definition.tag.directive.ts, entity.other.attribute-name.directive.ts","settings":{"foreground":"#8da101"}},{"scope":"entity.name.type.ts, entity.name.type.interface.ts, entity.other.inherited-class.ts, entity.name.type.alias.ts, entity.name.type.class.ts, entity.name.type.enum.ts","settings":{"foreground":"#35a77c"}},{"scope":"storage.type.ts, storage.type.function.arrow.ts, storage.type.type.ts","settings":{"foreground":"#f57d26"}},{"scope":"entity.name.type.module.ts","settings":{"foreground":"#3a94c5"}},{"scope":"keyword.control.import.ts, keyword.control.export.ts, storage.type.namespace.ts","settings":{"foreground":"#df69ba"}},{"scope":"entity.name.type.module.tsx","settings":{"foreground":"#5c6a72"}},{"scope":"keyword.operator.type.annotation.tsx, punctuation.accessor.tsx, punctuation.separator.key-value.tsx","settings":{"foreground":"#939f91"}},{"scope":"punctuation.definition.tag.directive.tsx, entity.other.attribute-name.directive.tsx, punctuation.definition.tag.begin.tsx, punctuation.definition.tag.end.tsx, entity.other.attribute-name.tsx","settings":{"foreground":"#8da101"}},{"scope":"entity.name.type.tsx, entity.name.type.interface.tsx, entity.other.inherited-class.tsx, entity.name.type.alias.tsx, entity.name.type.class.tsx, entity.name.type.enum.tsx","settings":{"foreground":"#35a77c"}},{"scope":"entity.name.type.module.tsx","settings":{"foreground":"#3a94c5"}},{"scope":"keyword.control.import.tsx, keyword.control.export.tsx, storage.type.namespace.tsx","settings":{"foreground":"#df69ba"}},{"scope":"storage.type.tsx, storage.type.function.arrow.tsx, storage.type.type.tsx, support.class.component.tsx","settings":{"foreground":"#f57d26"}},{"scope":"storage.type.function.coffee","settings":{"foreground":"#f57d26"}},{"scope":"meta.type-signature.purescript","settings":{"foreground":"#5c6a72"}},{"scope":"keyword.other.double-colon.purescript, keyword.other.arrow.purescript, keyword.other.big-arrow.purescript","settings":{"foreground":"#f57d26"}},{"scope":"entity.name.function.purescript","settings":{"foreground":"#dfa000"}},{"scope":"string.quoted.single.purescript, string.quoted.double.purescript, punctuation.definition.string.begin.purescript, punctuation.definition.string.end.purescript, string.quoted.triple.purescript, entity.name.type.purescript","settings":{"foreground":"#8da101"}},{"scope":"support.other.module.purescript","settings":{"foreground":"#df69ba"}},{"scope":"punctuation.dot.dart","settings":{"foreground":"#939f91"}},{"scope":"storage.type.primitive.dart","settings":{"foreground":"#f57d26"}},{"scope":"support.class.dart","settings":{"foreground":"#dfa000"}},{"scope":"entity.name.function.dart, string.interpolated.single.dart, string.interpolated.double.dart","settings":{"foreground":"#8da101"}},{"scope":"variable.language.dart","settings":{"foreground":"#3a94c5"}},{"scope":"keyword.other.import.dart, storage.type.annotation.dart","settings":{"foreground":"#df69ba"}},{"scope":"entity.other.attribute-name.class.pug","settings":{"foreground":"#f85552"}},{"scope":"storage.type.function.pug","settings":{"foreground":"#f57d26"}},{"scope":"entity.other.attribute-name.tag.pug","settings":{"foreground":"#35a77c"}},{"scope":"entity.name.tag.pug, storage.type.import.include.pug","settings":{"foreground":"#df69ba"}},{"scope":"meta.function-call.c, storage.modifier.array.bracket.square.c, meta.function.definition.parameters.c","settings":{"foreground":"#5c6a72"}},{"scope":"punctuation.separator.dot-access.c, constant.character.escape.line-continuation.c","settings":{"foreground":"#939f91"}},{"scope":"keyword.control.directive.include.c, punctuation.definition.directive.c, keyword.control.directive.pragma.c, keyword.control.directive.line.c, keyword.control.directive.define.c, keyword.control.directive.conditional.c, keyword.control.directive.diagnostic.error.c, keyword.control.directive.undef.c, keyword.control.directive.conditional.ifdef.c, keyword.control.directive.endif.c, keyword.control.directive.conditional.ifndef.c, keyword.control.directive.conditional.if.c, keyword.control.directive.else.c","settings":{"foreground":"#f85552"}},{"scope":"punctuation.separator.pointer-access.c","settings":{"foreground":"#f57d26"}},{"scope":"variable.other.member.c","settings":{"foreground":"#35a77c"}},{"scope":"meta.function-call.cpp, storage.modifier.array.bracket.square.cpp, meta.function.definition.parameters.cpp, meta.body.function.definition.cpp","settings":{"foreground":"#5c6a72"}},{"scope":"punctuation.separator.dot-access.cpp, constant.character.escape.line-continuation.cpp","settings":{"foreground":"#939f91"}},{"scope":"keyword.control.directive.include.cpp, punctuation.definition.directive.cpp, keyword.control.directive.pragma.cpp, keyword.control.directive.line.cpp, keyword.control.directive.define.cpp, keyword.control.directive.conditional.cpp, keyword.control.directive.diagnostic.error.cpp, keyword.control.directive.undef.cpp, keyword.control.directive.conditional.ifdef.cpp, keyword.control.directive.endif.cpp, keyword.control.directive.conditional.ifndef.cpp, keyword.control.directive.conditional.if.cpp, keyword.control.directive.else.cpp, storage.type.namespace.definition.cpp, keyword.other.using.directive.cpp, storage.type.struct.cpp","settings":{"foreground":"#f85552"}},{"scope":"punctuation.separator.pointer-access.cpp, punctuation.section.angle-brackets.begin.template.call.cpp, punctuation.section.angle-brackets.end.template.call.cpp","settings":{"foreground":"#f57d26"}},{"scope":"variable.other.member.cpp","settings":{"foreground":"#35a77c"}},{"scope":"keyword.other.using.cs","settings":{"foreground":"#f85552"}},{"scope":"keyword.type.cs, constant.character.escape.cs, punctuation.definition.interpolation.begin.cs, punctuation.definition.interpolation.end.cs","settings":{"foreground":"#dfa000"}},{"scope":"string.quoted.double.cs, string.quoted.single.cs, punctuation.definition.string.begin.cs, punctuation.definition.string.end.cs","settings":{"foreground":"#8da101"}},{"scope":"variable.other.object.property.cs","settings":{"foreground":"#35a77c"}},{"scope":"entity.name.type.namespace.cs","settings":{"foreground":"#df69ba"}},{"scope":"keyword.symbol.fsharp, constant.language.unit.fsharp","settings":{"foreground":"#5c6a72"}},{"scope":"keyword.format.specifier.fsharp, entity.name.type.fsharp","settings":{"foreground":"#dfa000"}},{"scope":"string.quoted.double.fsharp, string.quoted.single.fsharp, punctuation.definition.string.begin.fsharp, punctuation.definition.string.end.fsharp","settings":{"foreground":"#8da101"}},{"scope":"entity.name.section.fsharp","settings":{"foreground":"#3a94c5"}},{"scope":"support.function.attribute.fsharp","settings":{"foreground":"#df69ba"}},{"scope":"punctuation.separator.java, punctuation.separator.period.java","settings":{"foreground":"#939f91"}},{"scope":"keyword.other.import.java, keyword.other.package.java","settings":{"foreground":"#f85552"}},{"scope":"storage.type.function.arrow.java, keyword.control.ternary.java","settings":{"foreground":"#f57d26"}},{"scope":"variable.other.property.java","settings":{"foreground":"#35a77c"}},{"scope":"variable.language.wildcard.java, storage.modifier.import.java, storage.type.annotation.java, punctuation.definition.annotation.java, storage.modifier.package.java, entity.name.type.module.java","settings":{"foreground":"#df69ba"}},{"scope":"keyword.other.import.kotlin","settings":{"foreground":"#f85552"}},{"scope":"storage.type.kotlin","settings":{"foreground":"#f57d26"}},{"scope":"constant.language.kotlin","settings":{"foreground":"#35a77c"}},{"scope":"entity.name.package.kotlin, storage.type.annotation.kotlin","settings":{"foreground":"#df69ba"}},{"scope":"entity.name.package.scala","settings":{"foreground":"#df69ba"}},{"scope":"constant.language.scala","settings":{"foreground":"#3a94c5"}},{"scope":"entity.name.import.scala","settings":{"foreground":"#35a77c"}},{"scope":"string.quoted.double.scala, string.quoted.single.scala, punctuation.definition.string.begin.scala, punctuation.definition.string.end.scala, string.quoted.double.interpolated.scala, string.quoted.single.interpolated.scala, string.quoted.triple.scala","settings":{"foreground":"#8da101"}},{"scope":"entity.name.class, entity.other.inherited-class.scala","settings":{"foreground":"#dfa000"}},{"scope":"keyword.declaration.stable.scala, keyword.other.arrow.scala","settings":{"foreground":"#f57d26"}},{"scope":"keyword.other.import.scala","settings":{"foreground":"#f85552"}},{"scope":"keyword.operator.navigation.groovy, meta.method.body.java, meta.definition.method.groovy, meta.definition.method.signature.java","settings":{"foreground":"#5c6a72"}},{"scope":"punctuation.separator.groovy","settings":{"foreground":"#939f91"}},{"scope":"keyword.other.import.groovy, keyword.other.package.groovy, keyword.other.import.static.groovy","settings":{"foreground":"#f85552"}},{"scope":"storage.type.def.groovy","settings":{"foreground":"#f57d26"}},{"scope":"variable.other.interpolated.groovy, meta.method.groovy","settings":{"foreground":"#8da101"}},{"scope":"storage.modifier.import.groovy, storage.modifier.package.groovy","settings":{"foreground":"#35a77c"}},{"scope":"storage.type.annotation.groovy","settings":{"foreground":"#df69ba"}},{"scope":"keyword.type.go","settings":{"foreground":"#f85552"}},{"scope":"entity.name.package.go","settings":{"foreground":"#35a77c"}},{"scope":"keyword.import.go, keyword.package.go","settings":{"foreground":"#df69ba"}},{"scope":"entity.name.type.mod.rust","settings":{"foreground":"#5c6a72"}},{"scope":"keyword.operator.path.rust, keyword.operator.member-access.rust","settings":{"foreground":"#939f91"}},{"scope":"storage.type.rust","settings":{"foreground":"#f57d26"}},{"scope":"support.constant.core.rust","settings":{"foreground":"#35a77c"}},{"scope":"meta.attribute.rust, variable.language.rust, storage.type.module.rust","settings":{"foreground":"#df69ba"}},{"scope":"meta.function-call.swift, support.function.any-method.swift","settings":{"foreground":"#5c6a72"}},{"scope":"support.variable.swift","settings":{"foreground":"#35a77c"}},{"scope":"keyword.operator.class.php","settings":{"foreground":"#5c6a72"}},{"scope":"storage.type.trait.php","settings":{"foreground":"#f57d26"}},{"scope":"constant.language.php, support.other.namespace.php","settings":{"foreground":"#35a77c"}},{"scope":"storage.type.modifier.access.control.public.cpp, storage.type.modifier.access.control.private.cpp","settings":{"foreground":"#3a94c5"}},{"scope":"keyword.control.import.include.php, storage.type.php","settings":{"foreground":"#df69ba"}},{"scope":"meta.function-call.arguments.python","settings":{"foreground":"#5c6a72"}},{"scope":"punctuation.definition.decorator.python, punctuation.separator.period.python","settings":{"foreground":"#939f91"}},{"scope":"constant.language.python","settings":{"foreground":"#35a77c"}},{"scope":"keyword.control.import.python, keyword.control.import.from.python","settings":{"foreground":"#df69ba"}},{"scope":"constant.language.lua","settings":{"foreground":"#35a77c"}},{"scope":"entity.name.class.lua","settings":{"foreground":"#3a94c5"}},{"scope":"meta.function.method.with-arguments.ruby","settings":{"foreground":"#5c6a72"}},{"scope":"punctuation.separator.method.ruby","settings":{"foreground":"#939f91"}},{"scope":"keyword.control.pseudo-method.ruby, storage.type.variable.ruby","settings":{"foreground":"#f57d26"}},{"scope":"keyword.other.special-method.ruby","settings":{"foreground":"#8da101"}},{"scope":"keyword.control.module.ruby, punctuation.definition.constant.ruby","settings":{"foreground":"#df69ba"}},{"scope":"string.regexp.character-class.ruby,string.regexp.interpolated.ruby,punctuation.definition.character-class.ruby,string.regexp.group.ruby, punctuation.section.regexp.ruby, punctuation.definition.group.ruby","settings":{"foreground":"#dfa000"}},{"scope":"variable.other.constant.ruby","settings":{"foreground":"#3a94c5"}},{"scope":"keyword.other.arrow.haskell, keyword.other.big-arrow.haskell, keyword.other.double-colon.haskell","settings":{"foreground":"#f57d26"}},{"scope":"storage.type.haskell","settings":{"foreground":"#dfa000"}},{"scope":"constant.other.haskell, string.quoted.double.haskell, string.quoted.single.haskell, punctuation.definition.string.begin.haskell, punctuation.definition.string.end.haskell","settings":{"foreground":"#8da101"}},{"scope":"entity.name.function.haskell","settings":{"foreground":"#3a94c5"}},{"scope":"entity.name.namespace, meta.preprocessor.haskell","settings":{"foreground":"#35a77c"}},{"scope":"keyword.control.import.julia, keyword.control.export.julia","settings":{"foreground":"#f85552"}},{"scope":"keyword.storage.modifier.julia","settings":{"foreground":"#f57d26"}},{"scope":"constant.language.julia","settings":{"foreground":"#35a77c"}},{"scope":"support.function.macro.julia","settings":{"foreground":"#df69ba"}},{"scope":"keyword.other.period.elm","settings":{"foreground":"#5c6a72"}},{"scope":"storage.type.elm","settings":{"foreground":"#dfa000"}},{"scope":"keyword.other.r","settings":{"foreground":"#f57d26"}},{"scope":"entity.name.function.r, variable.function.r","settings":{"foreground":"#8da101"}},{"scope":"constant.language.r","settings":{"foreground":"#35a77c"}},{"scope":"entity.namespace.r","settings":{"foreground":"#df69ba"}},{"scope":"punctuation.separator.module-function.erlang, punctuation.section.directive.begin.erlang","settings":{"foreground":"#939f91"}},{"scope":"keyword.control.directive.erlang, keyword.control.directive.define.erlang","settings":{"foreground":"#f85552"}},{"scope":"entity.name.type.class.module.erlang","settings":{"foreground":"#dfa000"}},{"scope":"string.quoted.double.erlang, string.quoted.single.erlang, punctuation.definition.string.begin.erlang, punctuation.definition.string.end.erlang","settings":{"foreground":"#8da101"}},{"scope":"keyword.control.directive.export.erlang, keyword.control.directive.module.erlang, keyword.control.directive.import.erlang, keyword.control.directive.behaviour.erlang","settings":{"foreground":"#df69ba"}},{"scope":"variable.other.readwrite.module.elixir, punctuation.definition.variable.elixir","settings":{"foreground":"#35a77c"}},{"scope":"constant.language.elixir","settings":{"foreground":"#3a94c5"}},{"scope":"keyword.control.module.elixir","settings":{"foreground":"#df69ba"}},{"scope":"entity.name.type.value-signature.ocaml","settings":{"foreground":"#5c6a72"}},{"scope":"keyword.other.ocaml","settings":{"foreground":"#f57d26"}},{"scope":"constant.language.variant.ocaml","settings":{"foreground":"#35a77c"}},{"scope":"storage.type.sub.perl, storage.type.declare.routine.perl","settings":{"foreground":"#f85552"}},{"scope":"meta.function.lisp","settings":{"foreground":"#5c6a72"}},{"scope":"storage.type.function-type.lisp","settings":{"foreground":"#f85552"}},{"scope":"keyword.constant.lisp","settings":{"foreground":"#8da101"}},{"scope":"entity.name.function.lisp","settings":{"foreground":"#35a77c"}},{"scope":"constant.keyword.clojure, support.variable.clojure, meta.definition.variable.clojure","settings":{"foreground":"#8da101"}},{"scope":"entity.global.clojure","settings":{"foreground":"#df69ba"}},{"scope":"entity.name.function.clojure","settings":{"foreground":"#3a94c5"}},{"scope":"meta.scope.if-block.shell, meta.scope.group.shell","settings":{"foreground":"#5c6a72"}},{"scope":"support.function.builtin.shell, entity.name.function.shell","settings":{"foreground":"#dfa000"}},{"scope":"string.quoted.double.shell, string.quoted.single.shell, punctuation.definition.string.begin.shell, punctuation.definition.string.end.shell, string.unquoted.heredoc.shell","settings":{"foreground":"#8da101"}},{"scope":"keyword.control.heredoc-token.shell, variable.other.normal.shell, punctuation.definition.variable.shell, variable.other.special.shell, variable.other.positional.shell, variable.other.bracket.shell","settings":{"foreground":"#df69ba"}},{"scope":"support.function.builtin.fish","settings":{"foreground":"#f85552"}},{"scope":"support.function.unix.fish","settings":{"foreground":"#f57d26"}},{"scope":"variable.other.normal.fish, punctuation.definition.variable.fish, variable.other.fixed.fish, variable.other.special.fish","settings":{"foreground":"#3a94c5"}},{"scope":"string.quoted.double.fish, punctuation.definition.string.end.fish, punctuation.definition.string.begin.fish, string.quoted.single.fish","settings":{"foreground":"#8da101"}},{"scope":"constant.character.escape.single.fish","settings":{"foreground":"#df69ba"}},{"scope":"punctuation.definition.variable.powershell","settings":{"foreground":"#939f91"}},{"scope":"entity.name.function.powershell, support.function.attribute.powershell, support.function.powershell","settings":{"foreground":"#dfa000"}},{"scope":"string.quoted.single.powershell, string.quoted.double.powershell, punctuation.definition.string.begin.powershell, punctuation.definition.string.end.powershell, string.quoted.double.heredoc.powershell","settings":{"foreground":"#8da101"}},{"scope":"variable.other.member.powershell","settings":{"foreground":"#35a77c"}},{"scope":"string.unquoted.alias.graphql","settings":{"foreground":"#5c6a72"}},{"scope":"keyword.type.graphql","settings":{"foreground":"#f85552"}},{"scope":"entity.name.fragment.graphql","settings":{"foreground":"#df69ba"}},{"scope":"entity.name.function.target.makefile","settings":{"foreground":"#f57d26"}},{"scope":"variable.other.makefile","settings":{"foreground":"#dfa000"}},{"scope":"meta.scope.prerequisites.makefile","settings":{"foreground":"#8da101"}},{"scope":"string.source.cmake","settings":{"foreground":"#8da101"}},{"scope":"entity.source.cmake","settings":{"foreground":"#35a77c"}},{"scope":"storage.source.cmake","settings":{"foreground":"#df69ba"}},{"scope":"punctuation.definition.map.viml","settings":{"foreground":"#939f91"}},{"scope":"storage.type.map.viml","settings":{"foreground":"#f57d26"}},{"scope":"constant.character.map.viml, constant.character.map.key.viml","settings":{"foreground":"#8da101"}},{"scope":"constant.character.map.special.viml","settings":{"foreground":"#3a94c5"}},{"scope":"constant.language.tmux, constant.numeric.tmux","settings":{"foreground":"#8da101"}},{"scope":"entity.name.function.package-manager.dockerfile","settings":{"foreground":"#f57d26"}},{"scope":"keyword.operator.flag.dockerfile","settings":{"foreground":"#dfa000"}},{"scope":"string.quoted.double.dockerfile, string.quoted.single.dockerfile","settings":{"foreground":"#8da101"}},{"scope":"constant.character.escape.dockerfile","settings":{"foreground":"#35a77c"}},{"scope":"entity.name.type.base-image.dockerfile, entity.name.image.dockerfile","settings":{"foreground":"#df69ba"}},{"scope":"punctuation.definition.separator.diff","settings":{"foreground":"#939f91"}},{"scope":"markup.deleted.diff, punctuation.definition.deleted.diff","settings":{"foreground":"#f85552"}},{"scope":"meta.diff.range.context, punctuation.definition.range.diff","settings":{"foreground":"#f57d26"}},{"scope":"meta.diff.header.from-file","settings":{"foreground":"#dfa000"}},{"scope":"markup.inserted.diff, punctuation.definition.inserted.diff","settings":{"foreground":"#8da101"}},{"scope":"markup.changed.diff, punctuation.definition.changed.diff","settings":{"foreground":"#3a94c5"}},{"scope":"punctuation.definition.from-file.diff","settings":{"foreground":"#df69ba"}},{"scope":"entity.name.section.group-title.ini, punctuation.definition.entity.ini","settings":{"foreground":"#f85552"}},{"scope":"punctuation.separator.key-value.ini","settings":{"foreground":"#f57d26"}},{"scope":"string.quoted.double.ini, string.quoted.single.ini, punctuation.definition.string.begin.ini, punctuation.definition.string.end.ini","settings":{"foreground":"#8da101"}},{"scope":"keyword.other.definition.ini","settings":{"foreground":"#35a77c"}},{"scope":"support.function.aggregate.sql","settings":{"foreground":"#dfa000"}},{"scope":"string.quoted.single.sql, punctuation.definition.string.end.sql, punctuation.definition.string.begin.sql, string.quoted.double.sql","settings":{"foreground":"#8da101"}},{"scope":"support.type.graphql","settings":{"foreground":"#dfa000"}},{"scope":"variable.parameter.graphql","settings":{"foreground":"#3a94c5"}},{"scope":"constant.character.enum.graphql","settings":{"foreground":"#35a77c"}},{"scope":"punctuation.support.type.property-name.begin.json, punctuation.support.type.property-name.end.json, punctuation.separator.dictionary.key-value.json, punctuation.definition.string.begin.json, punctuation.definition.string.end.json, punctuation.separator.dictionary.pair.json, punctuation.separator.array.json","settings":{"foreground":"#939f91"}},{"scope":"support.type.property-name.json","settings":{"foreground":"#f57d26"}},{"scope":"string.quoted.double.json","settings":{"foreground":"#8da101"}},{"scope":"punctuation.separator.key-value.mapping.yaml","settings":{"foreground":"#939f91"}},{"scope":"string.unquoted.plain.out.yaml, string.quoted.single.yaml, string.quoted.double.yaml, punctuation.definition.string.begin.yaml, punctuation.definition.string.end.yaml, string.unquoted.plain.in.yaml, string.unquoted.block.yaml","settings":{"foreground":"#8da101"}},{"scope":"punctuation.definition.anchor.yaml, punctuation.definition.block.sequence.item.yaml","settings":{"foreground":"#35a77c"}},{"scope":"keyword.key.toml","settings":{"foreground":"#f57d26"}},{"scope":"string.quoted.single.basic.line.toml, string.quoted.single.literal.line.toml, punctuation.definition.keyValuePair.toml","settings":{"foreground":"#8da101"}},{"scope":"constant.other.boolean.toml","settings":{"foreground":"#3a94c5"}},{"scope":"entity.other.attribute-name.table.toml, punctuation.definition.table.toml, entity.other.attribute-name.table.array.toml, punctuation.definition.table.array.toml","settings":{"foreground":"#df69ba"}},{"scope":"comment, string.comment, punctuation.definition.comment","settings":{"fontStyle":"italic","foreground":"#939f91"}}],"type":"light"}'));
const everforestDark = Object.freeze(JSON.parse('{"colors":{"activityBar.activeBorder":"#a7c080d0","activityBar.activeFocusBorder":"#a7c080","activityBar.background":"#2d353b","activityBar.border":"#2d353b","activityBar.dropBackground":"#2d353b","activityBar.foreground":"#d3c6aa","activityBar.inactiveForeground":"#859289","activityBarBadge.background":"#a7c080","activityBarBadge.foreground":"#2d353b","badge.background":"#a7c080","badge.foreground":"#2d353b","breadcrumb.activeSelectionForeground":"#d3c6aa","breadcrumb.focusForeground":"#d3c6aa","breadcrumb.foreground":"#859289","button.background":"#a7c080","button.foreground":"#2d353b","button.hoverBackground":"#a7c080d0","button.secondaryBackground":"#3d484d","button.secondaryForeground":"#d3c6aa","button.secondaryHoverBackground":"#475258","charts.blue":"#7fbbb3","charts.foreground":"#d3c6aa","charts.green":"#a7c080","charts.orange":"#e69875","charts.purple":"#d699b6","charts.red":"#e67e80","charts.yellow":"#dbbc7f","checkbox.background":"#2d353b","checkbox.border":"#4f585e","checkbox.foreground":"#e69875","debugConsole.errorForeground":"#e67e80","debugConsole.infoForeground":"#a7c080","debugConsole.sourceForeground":"#d699b6","debugConsole.warningForeground":"#dbbc7f","debugConsoleInputIcon.foreground":"#83c092","debugIcon.breakpointCurrentStackframeForeground":"#7fbbb3","debugIcon.breakpointDisabledForeground":"#da6362","debugIcon.breakpointForeground":"#e67e80","debugIcon.breakpointStackframeForeground":"#e67e80","debugIcon.breakpointUnverifiedForeground":"#9aa79d","debugIcon.continueForeground":"#7fbbb3","debugIcon.disconnectForeground":"#d699b6","debugIcon.pauseForeground":"#dbbc7f","debugIcon.restartForeground":"#83c092","debugIcon.startForeground":"#83c092","debugIcon.stepBackForeground":"#7fbbb3","debugIcon.stepIntoForeground":"#7fbbb3","debugIcon.stepOutForeground":"#7fbbb3","debugIcon.stepOverForeground":"#7fbbb3","debugIcon.stopForeground":"#e67e80","debugTokenExpression.boolean":"#d699b6","debugTokenExpression.error":"#e67e80","debugTokenExpression.name":"#7fbbb3","debugTokenExpression.number":"#d699b6","debugTokenExpression.string":"#dbbc7f","debugTokenExpression.value":"#a7c080","debugToolBar.background":"#2d353b","descriptionForeground":"#859289","diffEditor.diagonalFill":"#4f585e","diffEditor.insertedTextBackground":"#569d7930","diffEditor.removedTextBackground":"#da636230","dropdown.background":"#2d353b","dropdown.border":"#4f585e","dropdown.foreground":"#9aa79d","editor.background":"#2d353b","editor.findMatchBackground":"#d77f4840","editor.findMatchHighlightBackground":"#899c4040","editor.findRangeHighlightBackground":"#47525860","editor.foldBackground":"#4f585e80","editor.foreground":"#d3c6aa","editor.hoverHighlightBackground":"#475258b0","editor.inactiveSelectionBackground":"#47525860","editor.lineHighlightBackground":"#3d484d90","editor.lineHighlightBorder":"#4f585e00","editor.rangeHighlightBackground":"#3d484d80","editor.selectionBackground":"#475258c0","editor.selectionHighlightBackground":"#47525860","editor.snippetFinalTabstopHighlightBackground":"#899c4040","editor.snippetFinalTabstopHighlightBorder":"#2d353b","editor.snippetTabstopHighlightBackground":"#3d484d","editor.symbolHighlightBackground":"#5a93a240","editor.wordHighlightBackground":"#47525858","editor.wordHighlightStrongBackground":"#475258b0","editorBracketHighlight.foreground1":"#e67e80","editorBracketHighlight.foreground2":"#dbbc7f","editorBracketHighlight.foreground3":"#a7c080","editorBracketHighlight.foreground4":"#7fbbb3","editorBracketHighlight.foreground5":"#e69875","editorBracketHighlight.foreground6":"#d699b6","editorBracketHighlight.unexpectedBracket.foreground":"#859289","editorBracketMatch.background":"#4f585e","editorBracketMatch.border":"#2d353b00","editorCodeLens.foreground":"#7f897da0","editorCursor.foreground":"#d3c6aa","editorError.background":"#da636200","editorError.foreground":"#da6362","editorGhostText.background":"#2d353b00","editorGhostText.foreground":"#7f897da0","editorGroup.border":"#21272b","editorGroup.dropBackground":"#4f585e60","editorGroupHeader.noTabsBackground":"#2d353b","editorGroupHeader.tabsBackground":"#2d353b","editorGutter.addedBackground":"#899c40a0","editorGutter.background":"#2d353b00","editorGutter.commentRangeForeground":"#7f897d","editorGutter.deletedBackground":"#da6362a0","editorGutter.modifiedBackground":"#5a93a2a0","editorHint.foreground":"#b87b9d","editorHoverWidget.background":"#343f44","editorHoverWidget.border":"#475258","editorIndentGuide.activeBackground":"#9aa79d50","editorIndentGuide.background":"#9aa79d20","editorInfo.background":"#5a93a200","editorInfo.foreground":"#5a93a2","editorInlayHint.background":"#2d353b00","editorInlayHint.foreground":"#7f897da0","editorInlayHint.parameterBackground":"#2d353b00","editorInlayHint.parameterForeground":"#7f897da0","editorInlayHint.typeBackground":"#2d353b00","editorInlayHint.typeForeground":"#7f897da0","editorLightBulb.foreground":"#dbbc7f","editorLightBulbAutoFix.foreground":"#83c092","editorLineNumber.activeForeground":"#9aa79de0","editorLineNumber.foreground":"#7f897da0","editorLink.activeForeground":"#a7c080","editorMarkerNavigation.background":"#343f44","editorMarkerNavigationError.background":"#da636280","editorMarkerNavigationInfo.background":"#5a93a280","editorMarkerNavigationWarning.background":"#bf983d80","editorOverviewRuler.addedForeground":"#899c40a0","editorOverviewRuler.border":"#2d353b00","editorOverviewRuler.commonContentForeground":"#859289","editorOverviewRuler.currentContentForeground":"#5a93a2","editorOverviewRuler.deletedForeground":"#da6362a0","editorOverviewRuler.errorForeground":"#e67e80","editorOverviewRuler.findMatchForeground":"#569d79","editorOverviewRuler.incomingContentForeground":"#569d79","editorOverviewRuler.infoForeground":"#d699b6","editorOverviewRuler.modifiedForeground":"#5a93a2a0","editorOverviewRuler.rangeHighlightForeground":"#569d79","editorOverviewRuler.selectionHighlightForeground":"#569d79","editorOverviewRuler.warningForeground":"#dbbc7f","editorOverviewRuler.wordHighlightForeground":"#4f585e","editorOverviewRuler.wordHighlightStrongForeground":"#4f585e","editorRuler.foreground":"#475258a0","editorSuggestWidget.background":"#3d484d","editorSuggestWidget.border":"#3d484d","editorSuggestWidget.foreground":"#d3c6aa","editorSuggestWidget.highlightForeground":"#a7c080","editorSuggestWidget.selectedBackground":"#475258","editorUnnecessaryCode.border":"#2d353b","editorUnnecessaryCode.opacity":"#00000080","editorWarning.background":"#bf983d00","editorWarning.foreground":"#bf983d","editorWhitespace.foreground":"#475258","editorWidget.background":"#2d353b","editorWidget.border":"#4f585e","editorWidget.foreground":"#d3c6aa","errorForeground":"#e67e80","extensionBadge.remoteBackground":"#a7c080","extensionBadge.remoteForeground":"#2d353b","extensionButton.prominentBackground":"#a7c080","extensionButton.prominentForeground":"#2d353b","extensionButton.prominentHoverBackground":"#a7c080d0","extensionIcon.preReleaseForeground":"#e69875","extensionIcon.starForeground":"#83c092","extensionIcon.verifiedForeground":"#a7c080","focusBorder":"#2d353b00","foreground":"#9aa79d","gitDecoration.addedResourceForeground":"#a7c080a0","gitDecoration.conflictingResourceForeground":"#d699b6a0","gitDecoration.deletedResourceForeground":"#e67e80a0","gitDecoration.ignoredResourceForeground":"#4f585e","gitDecoration.modifiedResourceForeground":"#7fbbb3a0","gitDecoration.stageDeletedResourceForeground":"#83c092a0","gitDecoration.stageModifiedResourceForeground":"#83c092a0","gitDecoration.submoduleResourceForeground":"#e69875a0","gitDecoration.untrackedResourceForeground":"#dbbc7fa0","gitlens.closedPullRequestIconColor":"#e67e80","gitlens.decorations.addedForegroundColor":"#a7c080","gitlens.decorations.branchAheadForegroundColor":"#83c092","gitlens.decorations.branchBehindForegroundColor":"#e69875","gitlens.decorations.branchDivergedForegroundColor":"#dbbc7f","gitlens.decorations.branchMissingUpstreamForegroundColor":"#e67e80","gitlens.decorations.branchUnpublishedForegroundColor":"#7fbbb3","gitlens.decorations.branchUpToDateForegroundColor":"#d3c6aa","gitlens.decorations.copiedForegroundColor":"#d699b6","gitlens.decorations.deletedForegroundColor":"#e67e80","gitlens.decorations.ignoredForegroundColor":"#9aa79d","gitlens.decorations.modifiedForegroundColor":"#7fbbb3","gitlens.decorations.renamedForegroundColor":"#d699b6","gitlens.decorations.untrackedForegroundColor":"#dbbc7f","gitlens.gutterBackgroundColor":"#2d353b","gitlens.gutterForegroundColor":"#d3c6aa","gitlens.gutterUncommittedForegroundColor":"#7fbbb3","gitlens.lineHighlightBackgroundColor":"#343f44","gitlens.lineHighlightOverviewRulerColor":"#a7c080","gitlens.mergedPullRequestIconColor":"#d699b6","gitlens.openPullRequestIconColor":"#83c092","gitlens.trailingLineForegroundColor":"#859289","gitlens.unpublishedCommitIconColor":"#dbbc7f","gitlens.unpulledChangesIconColor":"#e69875","gitlens.unpushlishedChangesIconColor":"#7fbbb3","icon.foreground":"#83c092","imagePreview.border":"#2d353b","input.background":"#2d353b00","input.border":"#4f585e","input.foreground":"#d3c6aa","input.placeholderForeground":"#7f897d","inputOption.activeBorder":"#83c092","inputValidation.errorBackground":"#da6362","inputValidation.errorBorder":"#e67e80","inputValidation.errorForeground":"#d3c6aa","inputValidation.infoBackground":"#5a93a2","inputValidation.infoBorder":"#7fbbb3","inputValidation.infoForeground":"#d3c6aa","inputValidation.warningBackground":"#bf983d","inputValidation.warningBorder":"#dbbc7f","inputValidation.warningForeground":"#d3c6aa","issues.closed":"#e67e80","issues.open":"#83c092","keybindingLabel.background":"#2d353b00","keybindingLabel.border":"#272e33","keybindingLabel.bottomBorder":"#21272b","keybindingLabel.foreground":"#d3c6aa","keybindingTable.headerBackground":"#3d484d","keybindingTable.rowsBackground":"#343f44","list.activeSelectionBackground":"#47525880","list.activeSelectionForeground":"#d3c6aa","list.dropBackground":"#343f4480","list.errorForeground":"#e67e80","list.focusBackground":"#47525880","list.focusForeground":"#d3c6aa","list.highlightForeground":"#a7c080","list.hoverBackground":"#2d353b00","list.hoverForeground":"#d3c6aa","list.inactiveFocusBackground":"#47525860","list.inactiveSelectionBackground":"#47525880","list.inactiveSelectionForeground":"#9aa79d","list.invalidItemForeground":"#da6362","list.warningForeground":"#dbbc7f","menu.background":"#2d353b","menu.foreground":"#9aa79d","menu.selectionBackground":"#343f44","menu.selectionForeground":"#d3c6aa","menubar.selectionBackground":"#2d353b","menubar.selectionBorder":"#2d353b","merge.border":"#2d353b00","merge.currentContentBackground":"#5a93a240","merge.currentHeaderBackground":"#5a93a280","merge.incomingContentBackground":"#569d7940","merge.incomingHeaderBackground":"#569d7980","minimap.errorHighlight":"#da636280","minimap.findMatchHighlight":"#569d7960","minimap.selectionHighlight":"#4f585ef0","minimap.warningHighlight":"#bf983d80","minimapGutter.addedBackground":"#899c40a0","minimapGutter.deletedBackground":"#da6362a0","minimapGutter.modifiedBackground":"#5a93a2a0","notebook.cellBorderColor":"#4f585e","notebook.cellHoverBackground":"#2d353b","notebook.cellStatusBarItemHoverBackground":"#343f44","notebook.cellToolbarSeparator":"#4f585e","notebook.focusedCellBackground":"#2d353b","notebook.focusedCellBorder":"#4f585e","notebook.focusedEditorBorder":"#4f585e","notebook.focusedRowBorder":"#4f585e","notebook.inactiveFocusedCellBorder":"#4f585e","notebook.outputContainerBackgroundColor":"#272e33","notebook.selectedCellBorder":"#4f585e","notebookStatusErrorIcon.foreground":"#e67e80","notebookStatusRunningIcon.foreground":"#7fbbb3","notebookStatusSuccessIcon.foreground":"#a7c080","notificationCenterHeader.background":"#3d484d","notificationCenterHeader.foreground":"#d3c6aa","notificationLink.foreground":"#a7c080","notifications.background":"#2d353b","notifications.foreground":"#d3c6aa","notificationsErrorIcon.foreground":"#e67e80","notificationsInfoIcon.foreground":"#7fbbb3","notificationsWarningIcon.foreground":"#dbbc7f","panel.background":"#2d353b","panel.border":"#2d353b","panelInput.border":"#4f585e","panelSection.border":"#21272b","panelSectionHeader.background":"#2d353b","panelTitle.activeBorder":"#a7c080d0","panelTitle.activeForeground":"#d3c6aa","panelTitle.inactiveForeground":"#859289","peekView.border":"#475258","peekViewEditor.background":"#343f44","peekViewEditor.matchHighlightBackground":"#bf983d50","peekViewEditorGutter.background":"#343f44","peekViewResult.background":"#343f44","peekViewResult.fileForeground":"#d3c6aa","peekViewResult.lineForeground":"#9aa79d","peekViewResult.matchHighlightBackground":"#bf983d50","peekViewResult.selectionBackground":"#569d7950","peekViewResult.selectionForeground":"#d3c6aa","peekViewTitle.background":"#475258","peekViewTitleDescription.foreground":"#d3c6aa","peekViewTitleLabel.foreground":"#a7c080","pickerGroup.border":"#a7c0801a","pickerGroup.foreground":"#d3c6aa","ports.iconRunningProcessForeground":"#e69875","problemsErrorIcon.foreground":"#e67e80","problemsInfoIcon.foreground":"#7fbbb3","problemsWarningIcon.foreground":"#dbbc7f","progressBar.background":"#a7c080","quickInputTitle.background":"#343f44","rust_analyzer.inlayHints.background":"#2d353b00","rust_analyzer.inlayHints.foreground":"#7f897da0","rust_analyzer.syntaxTreeBorder":"#e67e80","sash.hoverBorder":"#475258","scrollbar.shadow":"#00000070","scrollbarSlider.activeBackground":"#9aa79d","scrollbarSlider.background":"#4f585e80","scrollbarSlider.hoverBackground":"#4f585e","selection.background":"#475258e0","settings.checkboxBackground":"#2d353b","settings.checkboxBorder":"#4f585e","settings.checkboxForeground":"#e69875","settings.dropdownBackground":"#2d353b","settings.dropdownBorder":"#4f585e","settings.dropdownForeground":"#83c092","settings.focusedRowBackground":"#343f44","settings.headerForeground":"#9aa79d","settings.modifiedItemIndicator":"#7f897d","settings.numberInputBackground":"#2d353b","settings.numberInputBorder":"#4f585e","settings.numberInputForeground":"#d699b6","settings.rowHoverBackground":"#343f44","settings.textInputBackground":"#2d353b","settings.textInputBorder":"#4f585e","settings.textInputForeground":"#7fbbb3","sideBar.background":"#2d353b","sideBar.foreground":"#859289","sideBarSectionHeader.background":"#2d353b00","sideBarSectionHeader.foreground":"#9aa79d","sideBarTitle.foreground":"#9aa79d","statusBar.background":"#2d353b","statusBar.border":"#2d353b","statusBar.debuggingBackground":"#2d353b","statusBar.debuggingForeground":"#e69875","statusBar.foreground":"#9aa79d","statusBar.noFolderBackground":"#2d353b","statusBar.noFolderBorder":"#2d353b","statusBar.noFolderForeground":"#9aa79d","statusBarItem.activeBackground":"#47525870","statusBarItem.errorBackground":"#2d353b","statusBarItem.errorForeground":"#e67e80","statusBarItem.hoverBackground":"#475258a0","statusBarItem.prominentBackground":"#2d353b","statusBarItem.prominentForeground":"#d3c6aa","statusBarItem.prominentHoverBackground":"#475258a0","statusBarItem.remoteBackground":"#2d353b","statusBarItem.remoteForeground":"#9aa79d","statusBarItem.warningBackground":"#2d353b","statusBarItem.warningForeground":"#dbbc7f","symbolIcon.arrayForeground":"#7fbbb3","symbolIcon.booleanForeground":"#d699b6","symbolIcon.classForeground":"#dbbc7f","symbolIcon.colorForeground":"#d3c6aa","symbolIcon.constantForeground":"#83c092","symbolIcon.constructorForeground":"#d699b6","symbolIcon.enumeratorForeground":"#d699b6","symbolIcon.enumeratorMemberForeground":"#83c092","symbolIcon.eventForeground":"#dbbc7f","symbolIcon.fieldForeground":"#d3c6aa","symbolIcon.fileForeground":"#d3c6aa","symbolIcon.folderForeground":"#d3c6aa","symbolIcon.functionForeground":"#a7c080","symbolIcon.interfaceForeground":"#dbbc7f","symbolIcon.keyForeground":"#a7c080","symbolIcon.keywordForeground":"#e67e80","symbolIcon.methodForeground":"#a7c080","symbolIcon.moduleForeground":"#d699b6","symbolIcon.namespaceForeground":"#d699b6","symbolIcon.nullForeground":"#83c092","symbolIcon.numberForeground":"#d699b6","symbolIcon.objectForeground":"#d699b6","symbolIcon.operatorForeground":"#e69875","symbolIcon.packageForeground":"#d699b6","symbolIcon.propertyForeground":"#83c092","symbolIcon.referenceForeground":"#7fbbb3","symbolIcon.snippetForeground":"#d3c6aa","symbolIcon.stringForeground":"#a7c080","symbolIcon.structForeground":"#dbbc7f","symbolIcon.textForeground":"#d3c6aa","symbolIcon.typeParameterForeground":"#83c092","symbolIcon.unitForeground":"#d3c6aa","symbolIcon.variableForeground":"#7fbbb3","tab.activeBackground":"#2d353b","tab.activeBorder":"#a7c080d0","tab.activeForeground":"#d3c6aa","tab.border":"#2d353b","tab.hoverBackground":"#2d353b","tab.hoverForeground":"#d3c6aa","tab.inactiveBackground":"#2d353b","tab.inactiveForeground":"#7f897d","tab.lastPinnedBorder":"#a7c080d0","tab.unfocusedActiveBorder":"#859289","tab.unfocusedActiveForeground":"#9aa79d","tab.unfocusedHoverForeground":"#d3c6aa","tab.unfocusedInactiveForeground":"#7f897d","terminal.ansiBlack":"#343f44","terminal.ansiBlue":"#7fbbb3","terminal.ansiBrightBlack":"#859289","terminal.ansiBrightBlue":"#7fbbb3","terminal.ansiBrightCyan":"#83c092","terminal.ansiBrightGreen":"#a7c080","terminal.ansiBrightMagenta":"#d699b6","terminal.ansiBrightRed":"#e67e80","terminal.ansiBrightWhite":"#d3c6aa","terminal.ansiBrightYellow":"#dbbc7f","terminal.ansiCyan":"#83c092","terminal.ansiGreen":"#a7c080","terminal.ansiMagenta":"#d699b6","terminal.ansiRed":"#e67e80","terminal.ansiWhite":"#d3c6aa","terminal.ansiYellow":"#dbbc7f","terminal.foreground":"#d3c6aa","terminalCursor.foreground":"#d3c6aa","testing.iconErrored":"#e67e80","testing.iconFailed":"#e67e80","testing.iconPassed":"#83c092","testing.iconQueued":"#7fbbb3","testing.iconSkipped":"#d699b6","testing.iconUnset":"#dbbc7f","testing.runAction":"#83c092","textBlockQuote.background":"#272e33","textBlockQuote.border":"#475258","textCodeBlock.background":"#272e33","textLink.activeForeground":"#a7c080c0","textLink.foreground":"#a7c080","textPreformat.foreground":"#dbbc7f","titleBar.activeBackground":"#2d353b","titleBar.activeForeground":"#9aa79d","titleBar.border":"#2d353b","titleBar.inactiveBackground":"#2d353b","titleBar.inactiveForeground":"#7f897d","toolbar.hoverBackground":"#343f44","tree.indentGuidesStroke":"#7f897d","walkThrough.embeddedEditorBackground":"#272e33","welcomePage.buttonBackground":"#343f44","welcomePage.buttonHoverBackground":"#343f44a0","welcomePage.progress.foreground":"#a7c080","welcomePage.tileHoverBackground":"#343f44","widget.shadow":"#00000070"},"displayName":"Everforest Dark","name":"everforest-dark","semanticHighlighting":true,"semanticTokenColors":{"class:python":"#83c092","class:typescript":"#83c092","class:typescriptreact":"#83c092","enum:typescript":"#d699b6","enum:typescriptreact":"#d699b6","enumMember:typescript":"#7fbbb3","enumMember:typescriptreact":"#7fbbb3","interface:typescript":"#83c092","interface:typescriptreact":"#83c092","intrinsic:python":"#d699b6","macro:rust":"#83c092","memberOperatorOverload":"#e69875","module:python":"#7fbbb3","namespace:rust":"#d699b6","namespace:typescript":"#d699b6","namespace:typescriptreact":"#d699b6","operatorOverload":"#e69875","property.defaultLibrary:javascript":"#d699b6","property.defaultLibrary:javascriptreact":"#d699b6","property.defaultLibrary:typescript":"#d699b6","property.defaultLibrary:typescriptreact":"#d699b6","selfKeyword:rust":"#d699b6","variable.defaultLibrary:javascript":"#d699b6","variable.defaultLibrary:javascriptreact":"#d699b6","variable.defaultLibrary:typescript":"#d699b6","variable.defaultLibrary:typescriptreact":"#d699b6"},"tokenColors":[{"scope":"keyword, storage.type.function, storage.type.class, storage.type.enum, storage.type.interface, storage.type.property, keyword.operator.new, keyword.operator.expression, keyword.operator.new, keyword.operator.delete, storage.type.extends","settings":{"foreground":"#e67e80"}},{"scope":"keyword.other.debugger","settings":{"foreground":"#e67e80"}},{"scope":"storage, modifier, keyword.var, entity.name.tag, keyword.control.case, keyword.control.switch","settings":{"foreground":"#e69875"}},{"scope":"keyword.operator","settings":{"foreground":"#e69875"}},{"scope":"string, punctuation.definition.string.end, punctuation.definition.string.begin, punctuation.definition.string.template.begin, punctuation.definition.string.template.end","settings":{"foreground":"#dbbc7f"}},{"scope":"entity.other.attribute-name","settings":{"foreground":"#dbbc7f"}},{"scope":"constant.character.escape, punctuation.quasi.element, punctuation.definition.template-expression, punctuation.section.embedded, storage.type.format, constant.other.placeholder, constant.other.placeholder, variable.interpolation","settings":{"foreground":"#a7c080"}},{"scope":"entity.name.function, support.function, meta.function, meta.function-call, meta.definition.method","settings":{"foreground":"#a7c080"}},{"scope":"keyword.control.at-rule, keyword.control.import, keyword.control.export, storage.type.namespace, punctuation.decorator, keyword.control.directive, keyword.preprocessor, punctuation.definition.preprocessor, punctuation.definition.directive, keyword.other.import, keyword.other.package, entity.name.type.namespace, entity.name.scope-resolution, keyword.other.using, keyword.package, keyword.import, keyword.map","settings":{"foreground":"#83c092"}},{"scope":"storage.type.annotation","settings":{"foreground":"#83c092"}},{"scope":"entity.name.label, constant.other.label","settings":{"foreground":"#83c092"}},{"scope":"support.module, support.node, support.other.module, support.type.object.module, entity.name.type.module, entity.name.type.class.module, keyword.control.module","settings":{"foreground":"#83c092"}},{"scope":"storage.type, support.type, entity.name.type, keyword.type","settings":{"foreground":"#7fbbb3"}},{"scope":"entity.name.type.class, support.class, entity.name.class, entity.other.inherited-class, storage.class","settings":{"foreground":"#7fbbb3"}},{"scope":"constant.numeric","settings":{"foreground":"#d699b6"}},{"scope":"constant.language.boolean","settings":{"foreground":"#d699b6"}},{"scope":"entity.name.function.preprocessor","settings":{"foreground":"#d699b6"}},{"scope":"variable.language.this, variable.language.self, variable.language.super, keyword.other.this, variable.language.special, constant.language.null, constant.language.undefined, constant.language.nan","settings":{"foreground":"#d699b6"}},{"scope":"constant.language, support.constant","settings":{"foreground":"#d699b6"}},{"scope":"variable, support.variable, meta.definition.variable","settings":{"foreground":"#d3c6aa"}},{"scope":"variable.object.property, support.variable.property, variable.other.property, variable.other.object.property, variable.other.enummember, variable.other.member, meta.object-literal.key","settings":{"foreground":"#d3c6aa"}},{"scope":"punctuation, meta.brace, meta.delimiter, meta.bracket","settings":{"foreground":"#d3c6aa"}},{"scope":"heading.1.markdown, markup.heading.setext.1.markdown","settings":{"fontStyle":"bold","foreground":"#e67e80"}},{"scope":"heading.2.markdown, markup.heading.setext.2.markdown","settings":{"fontStyle":"bold","foreground":"#e69875"}},{"scope":"heading.3.markdown","settings":{"fontStyle":"bold","foreground":"#dbbc7f"}},{"scope":"heading.4.markdown","settings":{"fontStyle":"bold","foreground":"#a7c080"}},{"scope":"heading.5.markdown","settings":{"fontStyle":"bold","foreground":"#7fbbb3"}},{"scope":"heading.6.markdown","settings":{"fontStyle":"bold","foreground":"#d699b6"}},{"scope":"punctuation.definition.heading.markdown","settings":{"fontStyle":"regular","foreground":"#859289"}},{"scope":"string.other.link.title.markdown, constant.other.reference.link.markdown, string.other.link.description.markdown","settings":{"fontStyle":"regular","foreground":"#d699b6"}},{"scope":"markup.underline.link.image.markdown, markup.underline.link.markdown","settings":{"fontStyle":"underline","foreground":"#a7c080"}},{"scope":"punctuation.definition.string.begin.markdown, punctuation.definition.string.end.markdown, punctuation.definition.italic.markdown, punctuation.definition.quote.begin.markdown, punctuation.definition.metadata.markdown, punctuation.separator.key-value.markdown, punctuation.definition.constant.markdown","settings":{"foreground":"#859289"}},{"scope":"punctuation.definition.bold.markdown","settings":{"fontStyle":"regular","foreground":"#859289"}},{"scope":"meta.separator.markdown, punctuation.definition.constant.begin.markdown, punctuation.definition.constant.end.markdown","settings":{"fontStyle":"bold","foreground":"#859289"}},{"scope":"markup.italic","settings":{"fontStyle":"italic"}},{"scope":"markup.bold","settings":{"fontStyle":"bold"}},{"scope":"markup.bold markup.italic, markup.italic markup.bold","settings":{"fontStyle":"italic bold"}},{"scope":"punctuation.definition.markdown, punctuation.definition.raw.markdown","settings":{"foreground":"#dbbc7f"}},{"scope":"fenced_code.block.language","settings":{"foreground":"#dbbc7f"}},{"scope":"markup.fenced_code.block.markdown, markup.inline.raw.string.markdown","settings":{"foreground":"#a7c080"}},{"scope":"punctuation.definition.list.begin.markdown","settings":{"foreground":"#e67e80"}},{"scope":"punctuation.definition.heading.restructuredtext","settings":{"fontStyle":"bold","foreground":"#e69875"}},{"scope":"punctuation.definition.field.restructuredtext, punctuation.separator.key-value.restructuredtext, punctuation.definition.directive.restructuredtext, punctuation.definition.constant.restructuredtext, punctuation.definition.italic.restructuredtext, punctuation.definition.table.restructuredtext","settings":{"foreground":"#859289"}},{"scope":"punctuation.definition.bold.restructuredtext","settings":{"fontStyle":"regular","foreground":"#859289"}},{"scope":"entity.name.tag.restructuredtext, punctuation.definition.link.restructuredtext, punctuation.definition.raw.restructuredtext, punctuation.section.raw.restructuredtext","settings":{"foreground":"#83c092"}},{"scope":"constant.other.footnote.link.restructuredtext","settings":{"foreground":"#d699b6"}},{"scope":"support.directive.restructuredtext","settings":{"foreground":"#e67e80"}},{"scope":"entity.name.directive.restructuredtext, markup.raw.restructuredtext, markup.raw.inner.restructuredtext, string.other.link.title.restructuredtext","settings":{"foreground":"#a7c080"}},{"scope":"punctuation.definition.function.latex, punctuation.definition.function.tex, punctuation.definition.keyword.latex, constant.character.newline.tex, punctuation.definition.keyword.tex","settings":{"foreground":"#859289"}},{"scope":"support.function.be.latex","settings":{"foreground":"#e67e80"}},{"scope":"support.function.section.latex, keyword.control.table.cell.latex, keyword.control.table.newline.latex","settings":{"foreground":"#e69875"}},{"scope":"support.class.latex, variable.parameter.latex, variable.parameter.function.latex, variable.parameter.definition.label.latex, constant.other.reference.label.latex","settings":{"foreground":"#dbbc7f"}},{"scope":"keyword.control.preamble.latex","settings":{"foreground":"#d699b6"}},{"scope":"punctuation.separator.namespace.xml","settings":{"foreground":"#859289"}},{"scope":"entity.name.tag.html, entity.name.tag.xml, entity.name.tag.localname.xml","settings":{"foreground":"#e69875"}},{"scope":"entity.other.attribute-name.html, entity.other.attribute-name.xml, entity.other.attribute-name.localname.xml","settings":{"foreground":"#dbbc7f"}},{"scope":"string.quoted.double.html, string.quoted.single.html, punctuation.definition.string.begin.html, punctuation.definition.string.end.html, punctuation.separator.key-value.html, punctuation.definition.string.begin.xml, punctuation.definition.string.end.xml, string.quoted.double.xml, string.quoted.single.xml, punctuation.definition.tag.begin.html, punctuation.definition.tag.end.html, punctuation.definition.tag.xml, meta.tag.xml, meta.tag.preprocessor.xml, meta.tag.other.html, meta.tag.block.any.html, meta.tag.inline.any.html","settings":{"foreground":"#a7c080"}},{"scope":"variable.language.documentroot.xml, meta.tag.sgml.doctype.xml","settings":{"foreground":"#d699b6"}},{"scope":"storage.type.proto","settings":{"foreground":"#dbbc7f"}},{"scope":"string.quoted.double.proto.syntax, string.quoted.single.proto.syntax, string.quoted.double.proto, string.quoted.single.proto","settings":{"foreground":"#a7c080"}},{"scope":"entity.name.class.proto, entity.name.class.message.proto","settings":{"foreground":"#83c092"}},{"scope":"punctuation.definition.entity.css, punctuation.separator.key-value.css, punctuation.terminator.rule.css, punctuation.separator.list.comma.css","settings":{"foreground":"#859289"}},{"scope":"entity.other.attribute-name.class.css","settings":{"foreground":"#e67e80"}},{"scope":"keyword.other.unit","settings":{"foreground":"#e69875"}},{"scope":"entity.other.attribute-name.pseudo-class.css, entity.other.attribute-name.pseudo-element.css","settings":{"foreground":"#dbbc7f"}},{"scope":"string.quoted.single.css, string.quoted.double.css, support.constant.property-value.css, meta.property-value.css, punctuation.definition.string.begin.css, punctuation.definition.string.end.css, constant.numeric.css, support.constant.font-name.css, variable.parameter.keyframe-list.css","settings":{"foreground":"#a7c080"}},{"scope":"support.type.property-name.css","settings":{"foreground":"#83c092"}},{"scope":"support.type.vendored.property-name.css","settings":{"foreground":"#7fbbb3"}},{"scope":"entity.name.tag.css, entity.other.keyframe-offset.css, punctuation.definition.keyword.css, keyword.control.at-rule.keyframes.css, meta.selector.css","settings":{"foreground":"#d699b6"}},{"scope":"punctuation.definition.entity.scss, punctuation.separator.key-value.scss, punctuation.terminator.rule.scss, punctuation.separator.list.comma.scss","settings":{"foreground":"#859289"}},{"scope":"keyword.control.at-rule.keyframes.scss","settings":{"foreground":"#e69875"}},{"scope":"punctuation.definition.interpolation.begin.bracket.curly.scss, punctuation.definition.interpolation.end.bracket.curly.scss","settings":{"foreground":"#dbbc7f"}},{"scope":"punctuation.definition.string.begin.scss, punctuation.definition.string.end.scss, string.quoted.double.scss, string.quoted.single.scss, constant.character.css.sass, meta.property-value.scss","settings":{"foreground":"#a7c080"}},{"scope":"keyword.control.at-rule.include.scss, keyword.control.at-rule.use.scss, keyword.control.at-rule.mixin.scss, keyword.control.at-rule.extend.scss, keyword.control.at-rule.import.scss","settings":{"foreground":"#d699b6"}},{"scope":"meta.function.stylus","settings":{"foreground":"#d3c6aa"}},{"scope":"entity.name.function.stylus","settings":{"foreground":"#dbbc7f"}},{"scope":"string.unquoted.js","settings":{"foreground":"#d3c6aa"}},{"scope":"punctuation.accessor.js, punctuation.separator.key-value.js, punctuation.separator.label.js, keyword.operator.accessor.js","settings":{"foreground":"#859289"}},{"scope":"punctuation.definition.block.tag.jsdoc","settings":{"foreground":"#e67e80"}},{"scope":"storage.type.js, storage.type.function.arrow.js","settings":{"foreground":"#e69875"}},{"scope":"JSXNested","settings":{"foreground":"#d3c6aa"}},{"scope":"punctuation.definition.tag.jsx, entity.other.attribute-name.jsx, punctuation.definition.tag.begin.js.jsx, punctuation.definition.tag.end.js.jsx, entity.other.attribute-name.js.jsx","settings":{"foreground":"#a7c080"}},{"scope":"entity.name.type.module.ts","settings":{"foreground":"#d3c6aa"}},{"scope":"keyword.operator.type.annotation.ts, punctuation.accessor.ts, punctuation.separator.key-value.ts","settings":{"foreground":"#859289"}},{"scope":"punctuation.definition.tag.directive.ts, entity.other.attribute-name.directive.ts","settings":{"foreground":"#a7c080"}},{"scope":"entity.name.type.ts, entity.name.type.interface.ts, entity.other.inherited-class.ts, entity.name.type.alias.ts, entity.name.type.class.ts, entity.name.type.enum.ts","settings":{"foreground":"#83c092"}},{"scope":"storage.type.ts, storage.type.function.arrow.ts, storage.type.type.ts","settings":{"foreground":"#e69875"}},{"scope":"entity.name.type.module.ts","settings":{"foreground":"#7fbbb3"}},{"scope":"keyword.control.import.ts, keyword.control.export.ts, storage.type.namespace.ts","settings":{"foreground":"#d699b6"}},{"scope":"entity.name.type.module.tsx","settings":{"foreground":"#d3c6aa"}},{"scope":"keyword.operator.type.annotation.tsx, punctuation.accessor.tsx, punctuation.separator.key-value.tsx","settings":{"foreground":"#859289"}},{"scope":"punctuation.definition.tag.directive.tsx, entity.other.attribute-name.directive.tsx, punctuation.definition.tag.begin.tsx, punctuation.definition.tag.end.tsx, entity.other.attribute-name.tsx","settings":{"foreground":"#a7c080"}},{"scope":"entity.name.type.tsx, entity.name.type.interface.tsx, entity.other.inherited-class.tsx, entity.name.type.alias.tsx, entity.name.type.class.tsx, entity.name.type.enum.tsx","settings":{"foreground":"#83c092"}},{"scope":"entity.name.type.module.tsx","settings":{"foreground":"#7fbbb3"}},{"scope":"keyword.control.import.tsx, keyword.control.export.tsx, storage.type.namespace.tsx","settings":{"foreground":"#d699b6"}},{"scope":"storage.type.tsx, storage.type.function.arrow.tsx, storage.type.type.tsx, support.class.component.tsx","settings":{"foreground":"#e69875"}},{"scope":"storage.type.function.coffee","settings":{"foreground":"#e69875"}},{"scope":"meta.type-signature.purescript","settings":{"foreground":"#d3c6aa"}},{"scope":"keyword.other.double-colon.purescript, keyword.other.arrow.purescript, keyword.other.big-arrow.purescript","settings":{"foreground":"#e69875"}},{"scope":"entity.name.function.purescript","settings":{"foreground":"#dbbc7f"}},{"scope":"string.quoted.single.purescript, string.quoted.double.purescript, punctuation.definition.string.begin.purescript, punctuation.definition.string.end.purescript, string.quoted.triple.purescript, entity.name.type.purescript","settings":{"foreground":"#a7c080"}},{"scope":"support.other.module.purescript","settings":{"foreground":"#d699b6"}},{"scope":"punctuation.dot.dart","settings":{"foreground":"#859289"}},{"scope":"storage.type.primitive.dart","settings":{"foreground":"#e69875"}},{"scope":"support.class.dart","settings":{"foreground":"#dbbc7f"}},{"scope":"entity.name.function.dart, string.interpolated.single.dart, string.interpolated.double.dart","settings":{"foreground":"#a7c080"}},{"scope":"variable.language.dart","settings":{"foreground":"#7fbbb3"}},{"scope":"keyword.other.import.dart, storage.type.annotation.dart","settings":{"foreground":"#d699b6"}},{"scope":"entity.other.attribute-name.class.pug","settings":{"foreground":"#e67e80"}},{"scope":"storage.type.function.pug","settings":{"foreground":"#e69875"}},{"scope":"entity.other.attribute-name.tag.pug","settings":{"foreground":"#83c092"}},{"scope":"entity.name.tag.pug, storage.type.import.include.pug","settings":{"foreground":"#d699b6"}},{"scope":"meta.function-call.c, storage.modifier.array.bracket.square.c, meta.function.definition.parameters.c","settings":{"foreground":"#d3c6aa"}},{"scope":"punctuation.separator.dot-access.c, constant.character.escape.line-continuation.c","settings":{"foreground":"#859289"}},{"scope":"keyword.control.directive.include.c, punctuation.definition.directive.c, keyword.control.directive.pragma.c, keyword.control.directive.line.c, keyword.control.directive.define.c, keyword.control.directive.conditional.c, keyword.control.directive.diagnostic.error.c, keyword.control.directive.undef.c, keyword.control.directive.conditional.ifdef.c, keyword.control.directive.endif.c, keyword.control.directive.conditional.ifndef.c, keyword.control.directive.conditional.if.c, keyword.control.directive.else.c","settings":{"foreground":"#e67e80"}},{"scope":"punctuation.separator.pointer-access.c","settings":{"foreground":"#e69875"}},{"scope":"variable.other.member.c","settings":{"foreground":"#83c092"}},{"scope":"meta.function-call.cpp, storage.modifier.array.bracket.square.cpp, meta.function.definition.parameters.cpp, meta.body.function.definition.cpp","settings":{"foreground":"#d3c6aa"}},{"scope":"punctuation.separator.dot-access.cpp, constant.character.escape.line-continuation.cpp","settings":{"foreground":"#859289"}},{"scope":"keyword.control.directive.include.cpp, punctuation.definition.directive.cpp, keyword.control.directive.pragma.cpp, keyword.control.directive.line.cpp, keyword.control.directive.define.cpp, keyword.control.directive.conditional.cpp, keyword.control.directive.diagnostic.error.cpp, keyword.control.directive.undef.cpp, keyword.control.directive.conditional.ifdef.cpp, keyword.control.directive.endif.cpp, keyword.control.directive.conditional.ifndef.cpp, keyword.control.directive.conditional.if.cpp, keyword.control.directive.else.cpp, storage.type.namespace.definition.cpp, keyword.other.using.directive.cpp, storage.type.struct.cpp","settings":{"foreground":"#e67e80"}},{"scope":"punctuation.separator.pointer-access.cpp, punctuation.section.angle-brackets.begin.template.call.cpp, punctuation.section.angle-brackets.end.template.call.cpp","settings":{"foreground":"#e69875"}},{"scope":"variable.other.member.cpp","settings":{"foreground":"#83c092"}},{"scope":"keyword.other.using.cs","settings":{"foreground":"#e67e80"}},{"scope":"keyword.type.cs, constant.character.escape.cs, punctuation.definition.interpolation.begin.cs, punctuation.definition.interpolation.end.cs","settings":{"foreground":"#dbbc7f"}},{"scope":"string.quoted.double.cs, string.quoted.single.cs, punctuation.definition.string.begin.cs, punctuation.definition.string.end.cs","settings":{"foreground":"#a7c080"}},{"scope":"variable.other.object.property.cs","settings":{"foreground":"#83c092"}},{"scope":"entity.name.type.namespace.cs","settings":{"foreground":"#d699b6"}},{"scope":"keyword.symbol.fsharp, constant.language.unit.fsharp","settings":{"foreground":"#d3c6aa"}},{"scope":"keyword.format.specifier.fsharp, entity.name.type.fsharp","settings":{"foreground":"#dbbc7f"}},{"scope":"string.quoted.double.fsharp, string.quoted.single.fsharp, punctuation.definition.string.begin.fsharp, punctuation.definition.string.end.fsharp","settings":{"foreground":"#a7c080"}},{"scope":"entity.name.section.fsharp","settings":{"foreground":"#7fbbb3"}},{"scope":"support.function.attribute.fsharp","settings":{"foreground":"#d699b6"}},{"scope":"punctuation.separator.java, punctuation.separator.period.java","settings":{"foreground":"#859289"}},{"scope":"keyword.other.import.java, keyword.other.package.java","settings":{"foreground":"#e67e80"}},{"scope":"storage.type.function.arrow.java, keyword.control.ternary.java","settings":{"foreground":"#e69875"}},{"scope":"variable.other.property.java","settings":{"foreground":"#83c092"}},{"scope":"variable.language.wildcard.java, storage.modifier.import.java, storage.type.annotation.java, punctuation.definition.annotation.java, storage.modifier.package.java, entity.name.type.module.java","settings":{"foreground":"#d699b6"}},{"scope":"keyword.other.import.kotlin","settings":{"foreground":"#e67e80"}},{"scope":"storage.type.kotlin","settings":{"foreground":"#e69875"}},{"scope":"constant.language.kotlin","settings":{"foreground":"#83c092"}},{"scope":"entity.name.package.kotlin, storage.type.annotation.kotlin","settings":{"foreground":"#d699b6"}},{"scope":"entity.name.package.scala","settings":{"foreground":"#d699b6"}},{"scope":"constant.language.scala","settings":{"foreground":"#7fbbb3"}},{"scope":"entity.name.import.scala","settings":{"foreground":"#83c092"}},{"scope":"string.quoted.double.scala, string.quoted.single.scala, punctuation.definition.string.begin.scala, punctuation.definition.string.end.scala, string.quoted.double.interpolated.scala, string.quoted.single.interpolated.scala, string.quoted.triple.scala","settings":{"foreground":"#a7c080"}},{"scope":"entity.name.class, entity.other.inherited-class.scala","settings":{"foreground":"#dbbc7f"}},{"scope":"keyword.declaration.stable.scala, keyword.other.arrow.scala","settings":{"foreground":"#e69875"}},{"scope":"keyword.other.import.scala","settings":{"foreground":"#e67e80"}},{"scope":"keyword.operator.navigation.groovy, meta.method.body.java, meta.definition.method.groovy, meta.definition.method.signature.java","settings":{"foreground":"#d3c6aa"}},{"scope":"punctuation.separator.groovy","settings":{"foreground":"#859289"}},{"scope":"keyword.other.import.groovy, keyword.other.package.groovy, keyword.other.import.static.groovy","settings":{"foreground":"#e67e80"}},{"scope":"storage.type.def.groovy","settings":{"foreground":"#e69875"}},{"scope":"variable.other.interpolated.groovy, meta.method.groovy","settings":{"foreground":"#a7c080"}},{"scope":"storage.modifier.import.groovy, storage.modifier.package.groovy","settings":{"foreground":"#83c092"}},{"scope":"storage.type.annotation.groovy","settings":{"foreground":"#d699b6"}},{"scope":"keyword.type.go","settings":{"foreground":"#e67e80"}},{"scope":"entity.name.package.go","settings":{"foreground":"#83c092"}},{"scope":"keyword.import.go, keyword.package.go","settings":{"foreground":"#d699b6"}},{"scope":"entity.name.type.mod.rust","settings":{"foreground":"#d3c6aa"}},{"scope":"keyword.operator.path.rust, keyword.operator.member-access.rust","settings":{"foreground":"#859289"}},{"scope":"storage.type.rust","settings":{"foreground":"#e69875"}},{"scope":"support.constant.core.rust","settings":{"foreground":"#83c092"}},{"scope":"meta.attribute.rust, variable.language.rust, storage.type.module.rust","settings":{"foreground":"#d699b6"}},{"scope":"meta.function-call.swift, support.function.any-method.swift","settings":{"foreground":"#d3c6aa"}},{"scope":"support.variable.swift","settings":{"foreground":"#83c092"}},{"scope":"keyword.operator.class.php","settings":{"foreground":"#d3c6aa"}},{"scope":"storage.type.trait.php","settings":{"foreground":"#e69875"}},{"scope":"constant.language.php, support.other.namespace.php","settings":{"foreground":"#83c092"}},{"scope":"storage.type.modifier.access.control.public.cpp, storage.type.modifier.access.control.private.cpp","settings":{"foreground":"#7fbbb3"}},{"scope":"keyword.control.import.include.php, storage.type.php","settings":{"foreground":"#d699b6"}},{"scope":"meta.function-call.arguments.python","settings":{"foreground":"#d3c6aa"}},{"scope":"punctuation.definition.decorator.python, punctuation.separator.period.python","settings":{"foreground":"#859289"}},{"scope":"constant.language.python","settings":{"foreground":"#83c092"}},{"scope":"keyword.control.import.python, keyword.control.import.from.python","settings":{"foreground":"#d699b6"}},{"scope":"constant.language.lua","settings":{"foreground":"#83c092"}},{"scope":"entity.name.class.lua","settings":{"foreground":"#7fbbb3"}},{"scope":"meta.function.method.with-arguments.ruby","settings":{"foreground":"#d3c6aa"}},{"scope":"punctuation.separator.method.ruby","settings":{"foreground":"#859289"}},{"scope":"keyword.control.pseudo-method.ruby, storage.type.variable.ruby","settings":{"foreground":"#e69875"}},{"scope":"keyword.other.special-method.ruby","settings":{"foreground":"#a7c080"}},{"scope":"keyword.control.module.ruby, punctuation.definition.constant.ruby","settings":{"foreground":"#d699b6"}},{"scope":"string.regexp.character-class.ruby,string.regexp.interpolated.ruby,punctuation.definition.character-class.ruby,string.regexp.group.ruby, punctuation.section.regexp.ruby, punctuation.definition.group.ruby","settings":{"foreground":"#dbbc7f"}},{"scope":"variable.other.constant.ruby","settings":{"foreground":"#7fbbb3"}},{"scope":"keyword.other.arrow.haskell, keyword.other.big-arrow.haskell, keyword.other.double-colon.haskell","settings":{"foreground":"#e69875"}},{"scope":"storage.type.haskell","settings":{"foreground":"#dbbc7f"}},{"scope":"constant.other.haskell, string.quoted.double.haskell, string.quoted.single.haskell, punctuation.definition.string.begin.haskell, punctuation.definition.string.end.haskell","settings":{"foreground":"#a7c080"}},{"scope":"entity.name.function.haskell","settings":{"foreground":"#7fbbb3"}},{"scope":"entity.name.namespace, meta.preprocessor.haskell","settings":{"foreground":"#83c092"}},{"scope":"keyword.control.import.julia, keyword.control.export.julia","settings":{"foreground":"#e67e80"}},{"scope":"keyword.storage.modifier.julia","settings":{"foreground":"#e69875"}},{"scope":"constant.language.julia","settings":{"foreground":"#83c092"}},{"scope":"support.function.macro.julia","settings":{"foreground":"#d699b6"}},{"scope":"keyword.other.period.elm","settings":{"foreground":"#d3c6aa"}},{"scope":"storage.type.elm","settings":{"foreground":"#dbbc7f"}},{"scope":"keyword.other.r","settings":{"foreground":"#e69875"}},{"scope":"entity.name.function.r, variable.function.r","settings":{"foreground":"#a7c080"}},{"scope":"constant.language.r","settings":{"foreground":"#83c092"}},{"scope":"entity.namespace.r","settings":{"foreground":"#d699b6"}},{"scope":"punctuation.separator.module-function.erlang, punctuation.section.directive.begin.erlang","settings":{"foreground":"#859289"}},{"scope":"keyword.control.directive.erlang, keyword.control.directive.define.erlang","settings":{"foreground":"#e67e80"}},{"scope":"entity.name.type.class.module.erlang","settings":{"foreground":"#dbbc7f"}},{"scope":"string.quoted.double.erlang, string.quoted.single.erlang, punctuation.definition.string.begin.erlang, punctuation.definition.string.end.erlang","settings":{"foreground":"#a7c080"}},{"scope":"keyword.control.directive.export.erlang, keyword.control.directive.module.erlang, keyword.control.directive.import.erlang, keyword.control.directive.behaviour.erlang","settings":{"foreground":"#d699b6"}},{"scope":"variable.other.readwrite.module.elixir, punctuation.definition.variable.elixir","settings":{"foreground":"#83c092"}},{"scope":"constant.language.elixir","settings":{"foreground":"#7fbbb3"}},{"scope":"keyword.control.module.elixir","settings":{"foreground":"#d699b6"}},{"scope":"entity.name.type.value-signature.ocaml","settings":{"foreground":"#d3c6aa"}},{"scope":"keyword.other.ocaml","settings":{"foreground":"#e69875"}},{"scope":"constant.language.variant.ocaml","settings":{"foreground":"#83c092"}},{"scope":"storage.type.sub.perl, storage.type.declare.routine.perl","settings":{"foreground":"#e67e80"}},{"scope":"meta.function.lisp","settings":{"foreground":"#d3c6aa"}},{"scope":"storage.type.function-type.lisp","settings":{"foreground":"#e67e80"}},{"scope":"keyword.constant.lisp","settings":{"foreground":"#a7c080"}},{"scope":"entity.name.function.lisp","settings":{"foreground":"#83c092"}},{"scope":"constant.keyword.clojure, support.variable.clojure, meta.definition.variable.clojure","settings":{"foreground":"#a7c080"}},{"scope":"entity.global.clojure","settings":{"foreground":"#d699b6"}},{"scope":"entity.name.function.clojure","settings":{"foreground":"#7fbbb3"}},{"scope":"meta.scope.if-block.shell, meta.scope.group.shell","settings":{"foreground":"#d3c6aa"}},{"scope":"support.function.builtin.shell, entity.name.function.shell","settings":{"foreground":"#dbbc7f"}},{"scope":"string.quoted.double.shell, string.quoted.single.shell, punctuation.definition.string.begin.shell, punctuation.definition.string.end.shell, string.unquoted.heredoc.shell","settings":{"foreground":"#a7c080"}},{"scope":"keyword.control.heredoc-token.shell, variable.other.normal.shell, punctuation.definition.variable.shell, variable.other.special.shell, variable.other.positional.shell, variable.other.bracket.shell","settings":{"foreground":"#d699b6"}},{"scope":"support.function.builtin.fish","settings":{"foreground":"#e67e80"}},{"scope":"support.function.unix.fish","settings":{"foreground":"#e69875"}},{"scope":"variable.other.normal.fish, punctuation.definition.variable.fish, variable.other.fixed.fish, variable.other.special.fish","settings":{"foreground":"#7fbbb3"}},{"scope":"string.quoted.double.fish, punctuation.definition.string.end.fish, punctuation.definition.string.begin.fish, string.quoted.single.fish","settings":{"foreground":"#a7c080"}},{"scope":"constant.character.escape.single.fish","settings":{"foreground":"#d699b6"}},{"scope":"punctuation.definition.variable.powershell","settings":{"foreground":"#859289"}},{"scope":"entity.name.function.powershell, support.function.attribute.powershell, support.function.powershell","settings":{"foreground":"#dbbc7f"}},{"scope":"string.quoted.single.powershell, string.quoted.double.powershell, punctuation.definition.string.begin.powershell, punctuation.definition.string.end.powershell, string.quoted.double.heredoc.powershell","settings":{"foreground":"#a7c080"}},{"scope":"variable.other.member.powershell","settings":{"foreground":"#83c092"}},{"scope":"string.unquoted.alias.graphql","settings":{"foreground":"#d3c6aa"}},{"scope":"keyword.type.graphql","settings":{"foreground":"#e67e80"}},{"scope":"entity.name.fragment.graphql","settings":{"foreground":"#d699b6"}},{"scope":"entity.name.function.target.makefile","settings":{"foreground":"#e69875"}},{"scope":"variable.other.makefile","settings":{"foreground":"#dbbc7f"}},{"scope":"meta.scope.prerequisites.makefile","settings":{"foreground":"#a7c080"}},{"scope":"string.source.cmake","settings":{"foreground":"#a7c080"}},{"scope":"entity.source.cmake","settings":{"foreground":"#83c092"}},{"scope":"storage.source.cmake","settings":{"foreground":"#d699b6"}},{"scope":"punctuation.definition.map.viml","settings":{"foreground":"#859289"}},{"scope":"storage.type.map.viml","settings":{"foreground":"#e69875"}},{"scope":"constant.character.map.viml, constant.character.map.key.viml","settings":{"foreground":"#a7c080"}},{"scope":"constant.character.map.special.viml","settings":{"foreground":"#7fbbb3"}},{"scope":"constant.language.tmux, constant.numeric.tmux","settings":{"foreground":"#a7c080"}},{"scope":"entity.name.function.package-manager.dockerfile","settings":{"foreground":"#e69875"}},{"scope":"keyword.operator.flag.dockerfile","settings":{"foreground":"#dbbc7f"}},{"scope":"string.quoted.double.dockerfile, string.quoted.single.dockerfile","settings":{"foreground":"#a7c080"}},{"scope":"constant.character.escape.dockerfile","settings":{"foreground":"#83c092"}},{"scope":"entity.name.type.base-image.dockerfile, entity.name.image.dockerfile","settings":{"foreground":"#d699b6"}},{"scope":"punctuation.definition.separator.diff","settings":{"foreground":"#859289"}},{"scope":"markup.deleted.diff, punctuation.definition.deleted.diff","settings":{"foreground":"#e67e80"}},{"scope":"meta.diff.range.context, punctuation.definition.range.diff","settings":{"foreground":"#e69875"}},{"scope":"meta.diff.header.from-file","settings":{"foreground":"#dbbc7f"}},{"scope":"markup.inserted.diff, punctuation.definition.inserted.diff","settings":{"foreground":"#a7c080"}},{"scope":"markup.changed.diff, punctuation.definition.changed.diff","settings":{"foreground":"#7fbbb3"}},{"scope":"punctuation.definition.from-file.diff","settings":{"foreground":"#d699b6"}},{"scope":"entity.name.section.group-title.ini, punctuation.definition.entity.ini","settings":{"foreground":"#e67e80"}},{"scope":"punctuation.separator.key-value.ini","settings":{"foreground":"#e69875"}},{"scope":"string.quoted.double.ini, string.quoted.single.ini, punctuation.definition.string.begin.ini, punctuation.definition.string.end.ini","settings":{"foreground":"#a7c080"}},{"scope":"keyword.other.definition.ini","settings":{"foreground":"#83c092"}},{"scope":"support.function.aggregate.sql","settings":{"foreground":"#dbbc7f"}},{"scope":"string.quoted.single.sql, punctuation.definition.string.end.sql, punctuation.definition.string.begin.sql, string.quoted.double.sql","settings":{"foreground":"#a7c080"}},{"scope":"support.type.graphql","settings":{"foreground":"#dbbc7f"}},{"scope":"variable.parameter.graphql","settings":{"foreground":"#7fbbb3"}},{"scope":"constant.character.enum.graphql","settings":{"foreground":"#83c092"}},{"scope":"punctuation.support.type.property-name.begin.json, punctuation.support.type.property-name.end.json, punctuation.separator.dictionary.key-value.json, punctuation.definition.string.begin.json, punctuation.definition.string.end.json, punctuation.separator.dictionary.pair.json, punctuation.separator.array.json","settings":{"foreground":"#859289"}},{"scope":"support.type.property-name.json","settings":{"foreground":"#e69875"}},{"scope":"string.quoted.double.json","settings":{"foreground":"#a7c080"}},{"scope":"punctuation.separator.key-value.mapping.yaml","settings":{"foreground":"#859289"}},{"scope":"string.unquoted.plain.out.yaml, string.quoted.single.yaml, string.quoted.double.yaml, punctuation.definition.string.begin.yaml, punctuation.definition.string.end.yaml, string.unquoted.plain.in.yaml, string.unquoted.block.yaml","settings":{"foreground":"#a7c080"}},{"scope":"punctuation.definition.anchor.yaml, punctuation.definition.block.sequence.item.yaml","settings":{"foreground":"#83c092"}},{"scope":"keyword.key.toml","settings":{"foreground":"#e69875"}},{"scope":"string.quoted.single.basic.line.toml, string.quoted.single.literal.line.toml, punctuation.definition.keyValuePair.toml","settings":{"foreground":"#a7c080"}},{"scope":"constant.other.boolean.toml","settings":{"foreground":"#7fbbb3"}},{"scope":"entity.other.attribute-name.table.toml, punctuation.definition.table.toml, entity.other.attribute-name.table.array.toml, punctuation.definition.table.array.toml","settings":{"foreground":"#d699b6"}},{"scope":"comment, string.comment, punctuation.definition.comment","settings":{"fontStyle":"italic","foreground":"#859289"}}],"type":"dark"}'));
const ExamplesPanel = ({
  currentProperty,
  rootSchema,
  propertyPath,
  onCopy,
  options
}) => {
  const [selectedFormat, setSelectedFormat] = useState(() => {
    const defaultLanguage = (options == null ? void 0 : options.defaultExampleLanguage) || "yaml";
    if (typeof window === "undefined") {
      return defaultLanguage;
    }
    try {
      return localStorage.getItem("deckard-examples-format") || defaultLanguage;
    } catch {
      return defaultLanguage;
    }
  });
  useEffect(() => {
    const defaultLanguage = (options == null ? void 0 : options.defaultExampleLanguage) || "yaml";
    setSelectedFormat(defaultLanguage);
  }, [options == null ? void 0 : options.defaultExampleLanguage]);
  const [highlighter, setHighlighter] = useState(null);
  const [highlighterError, setHighlighterError] = useState(false);
  const [lineWrap, setLineWrap] = useState(false);
  const systemTheme = useSystemTheme();
  const { examples, propertyName } = useMemo(() => {
    const findExamplesInHierarchy = (schema2, path) => {
      if (schema2.examples && schema2.examples.length > 0) {
        return {
          examples: schema2.examples,
          propertyName: path[path.length - 1] || "property"
        };
      }
      if (path.length > 0 && rootSchema) {
        const parentPath = path.slice(0, -1);
        let parentSchema = rootSchema;
        for (const segment of parentPath) {
          if (parentSchema.properties && parentSchema.properties[segment]) {
            parentSchema = parentSchema.properties[segment];
          } else if (parentSchema.patternProperties) {
            const patternKeys = Object.keys(parentSchema.patternProperties);
            if (patternKeys.length > 0) {
              parentSchema = parentSchema.patternProperties[patternKeys[0]];
            }
          } else {
            break;
          }
        }
        if (parentPath.length >= 0) {
          return findExamplesInHierarchy(parentSchema, parentPath);
        }
      }
      return {
        examples: [],
        propertyName: path[path.length - 1] || "property"
      };
    };
    return findExamplesInHierarchy(currentProperty, propertyPath);
  }, [currentProperty, rootSchema, propertyPath]);
  useEffect(() => {
    createHighlighterCore({
      themes: [everforestLight, everforestDark],
      langs: [jsonLang, yamlLang, tomlLang],
      engine: createOnigurumaEngine(import("./wasm-DDgzZJey.js"))
    }).then(setHighlighter).catch((error2) => {
      console.warn("Failed to initialize Shiki highlighter:", error2);
      setHighlighterError(true);
    });
  }, []);
  const convertToToml = useCallback(
    (obj, fieldName) => {
      if (typeof obj !== "object" || obj === null || Array.isArray(obj)) {
        const key2 = fieldName || propertyName || "value";
        const wrappedValue = { [key2]: obj };
        return stringify(wrappedValue);
      }
      return stringify(obj);
    },
    [propertyName]
  );
  const convertToFormat = useCallback(
    (value, format) => {
      const shouldWrapValue = typeof value !== "object" || value === null || Array.isArray(value);
      const wrappedValue = shouldWrapValue ? { [propertyName]: value } : value;
      switch (format) {
        case "json":
          return JSON.stringify(wrappedValue, null, 2);
        case "yaml":
          return dump(wrappedValue, { indent: 2, lineWidth: -1 });
        case "toml":
          return convertToToml(value, propertyName);
        default:
          return JSON.stringify(wrappedValue, null, 2);
      }
    },
    [convertToToml, propertyName]
  );
  const highlightCode = useCallback(
    (code, lang2) => {
      if (!highlighter || highlighterError) {
        return code;
      }
      try {
        const html2 = highlighter.codeToHtml(code, {
          lang: lang2,
          theme: systemTheme === "dark" ? "everforest-dark" : "everforest-light",
          transformers: [
            {
              name: "add-wrap-classes",
              pre(node) {
                const existingClass = node.properties.class || "";
                node.properties.class = `${existingClass} ${lineWrap ? "wrap" : "nowrap"}`.trim();
              }
            }
          ]
        });
        return html2;
      } catch (error2) {
        console.warn(`Failed to highlight ${lang2} code:`, error2);
        setHighlighterError(true);
        return code;
      }
    },
    [highlighter, highlighterError, lineWrap, systemTheme]
  );
  const formatLabel = useCallback((format) => {
    switch (format) {
      case "json":
        return "JSON";
      case "yaml":
        return "YAML";
      case "toml":
        return "TOML";
      default:
        return format;
    }
  }, []);
  const highlightedExamples = useMemo(() => {
    return examples.map((example, index2) => {
      const code = convertToFormat(example, selectedFormat);
      return {
        index: index2,
        code,
        highlighted: highlightCode(code, selectedFormat)
      };
    });
  }, [examples, selectedFormat, convertToFormat, highlightCode]);
  if (!examples || examples.length === 0) {
    return /* @__PURE__ */ jsxs("div", { className: "examples-panel", children: [
      /* @__PURE__ */ jsx("div", { className: "examples-header", children: /* @__PURE__ */ jsx("h4", { className: "examples-title", children: "No Examples Available" }) }),
      /* @__PURE__ */ jsx("div", { className: "examples-content", children: /* @__PURE__ */ jsx("div", { className: "no-examples-message", children: "No examples found for this property or its parent properties." }) })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "examples-panel", children: [
    /* @__PURE__ */ jsxs("div", { className: "examples-header", children: [
      /* @__PURE__ */ jsx("h4", { className: "examples-title", children: "Examples" }),
      /* @__PURE__ */ jsxs("div", { className: "examples-controls", children: [
        /* @__PURE__ */ jsx(
          RadioGroup,
          {
            options: [
              { value: "toml", label: formatLabel("toml") },
              { value: "yaml", label: formatLabel("yaml") },
              { value: "json", label: formatLabel("json") }
            ],
            value: selectedFormat,
            onChange: (format) => {
              setSelectedFormat(format);
            },
            name: "format-selector",
            size: "md"
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "ghost",
            size: "xs",
            className: `wrap-toggle-button ${lineWrap ? "active" : ""}`,
            onClick: () => setLineWrap(!lineWrap),
            title: lineWrap ? "Disable line wrap." : "Enable line wrap.",
            children: lineWrap ? /* @__PURE__ */ jsx(HiArrowsRightLeft, {}) : /* @__PURE__ */ jsx(HiArrowUturnRight, { style: { transform: "scaleY(-1)" } })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "examples-content", children: highlightedExamples.map(({ index: index2, code, highlighted }) => /* @__PURE__ */ jsxs("div", { className: "example-item", children: [
      /* @__PURE__ */ jsxs("div", { className: "example-header", children: [
        /* @__PURE__ */ jsxs("div", { className: "example-label", children: [
          "EXAMPLE ",
          index2 + 1
        ] }),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "ghost",
            size: "xs",
            className: "example-copy-button",
            onClick: (e) => {
              if (onCopy) {
                onCopy(code, e.currentTarget);
              } else if (typeof window !== "undefined" && typeof document !== "undefined") {
                navigator.clipboard.writeText(code).catch(() => {
                  const textArea = document.createElement("textarea");
                  textArea.value = code;
                  document.body.appendChild(textArea);
                  textArea.select();
                  document.execCommand("copy");
                  document.body.removeChild(textArea);
                });
              }
            },
            title: "Copy this example.",
            children: /* @__PURE__ */ jsx(FaCopy, {})
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "code-container", children: highlighter && !highlighterError && highlighted !== code ? /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: { __html: highlighted } }) : /* @__PURE__ */ jsx(
        "pre",
        {
          className: `code-fallback ${lineWrap ? "wrap" : "nowrap"}`,
          children: /* @__PURE__ */ jsx("code", { children: code })
        }
      ) })
    ] }, index2)) })
  ] });
};
const Row = ({
  children,
  className = "",
  id,
  "data-property-key": dataPropertyKey,
  onClick
}) => {
  const rowClasses = ["row", className].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: rowClasses,
      id,
      "data-property-key": dataPropertyKey,
      onClick,
      children
    }
  );
};
const CodeSnippet = ({
  code,
  variant = "inline",
  size = "xs",
  className = "",
  copyable = true,
  onCodeClick,
  language: _language,
  title,
  maxWidth
}) => {
  const handleClick = useCallback(() => {
    if (copyable && navigator.clipboard) {
      navigator.clipboard.writeText(code);
    }
    onCodeClick == null ? void 0 : onCodeClick(code);
  }, [code, copyable, onCodeClick]);
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleClick();
      }
    },
    [handleClick]
  );
  const baseClass = "code-snippet";
  const variantClass = `code-snippet-${variant}`;
  const sizeClass = `code-snippet-${size}`;
  const classes = [baseClass, variantClass, sizeClass, className].filter(Boolean).join(" ");
  const style = maxWidth ? { maxWidth } : void 0;
  const commonProps = {
    className: classes,
    style,
    title: copyable ? title || "Click to copy" : title
  };
  const interactiveProps = copyable ? {
    onClick: handleClick,
    onKeyDown: handleKeyDown,
    tabIndex: 0,
    role: "button",
    "aria-label": `Copy code: ${code}`
  } : {};
  if (variant === "block") {
    return /* @__PURE__ */ jsx("pre", { ...commonProps, ...interactiveProps, children: /* @__PURE__ */ jsx("code", { children: code }) });
  }
  return /* @__PURE__ */ jsx("code", { ...commonProps, ...interactiveProps, children: code });
};
const PropertyDetails = ({
  property,
  onCopy,
  rootSchema,
  onCopyLink,
  propertyStates,
  toggleProperty,
  focusedProperty,
  onFocusChange,
  options,
  searchQuery
}) => {
  const constraints = getConstraints(property.schema);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    property.schema.__isPatternProperty && property.schema.__pattern && /* @__PURE__ */ jsxs("div", { className: "pattern-info", children: [
      /* @__PURE__ */ jsx(Badge, { variant: "label", size: "xs", uppercase: true, children: "Pattern:" }),
      /* @__PURE__ */ jsx(
        CodeSnippet,
        {
          code: property.schema.__pattern,
          variant: "pattern",
          size: "xs",
          copyable: true
        }
      )
    ] }),
    property.schema.description && /* @__PURE__ */ jsx("div", { className: "property-description-block", children: property.schema.description }),
    property.schema.oneOf && rootSchema && /* @__PURE__ */ jsx(
      OneOfSelector,
      {
        oneOfOptions: property.schema.oneOf,
        rootSchema,
        propertyPath: property.path,
        _onCopy: onCopy,
        onCopyLink,
        propertyStates,
        toggleProperty,
        focusedProperty,
        onFocusChange,
        options,
        searchQuery
      }
    ),
    property.schema.allOf && rootSchema && /* @__PURE__ */ jsx(
      AllOfSelector,
      {
        allOfOptions: property.schema.allOf,
        rootSchema,
        _onCopy: onCopy,
        onCopyLink,
        propertyStates,
        toggleProperty,
        focusedProperty,
        onFocusChange,
        propertyPath: property.path,
        options,
        searchQuery
      }
    ),
    getUnsupportedFeatures(property.schema).map((feature) => {
      const getFeatureInfo = (feature2) => {
        switch (feature2) {
          case "anyOf":
            return {
              description: "The anyOf schema feature is not currently supported. This means the property can match any one of the specified schemas, but the documentation cannot display all possible variations.",
              suggestion: "Consider using oneOf if only one schema should match, or allOf if all schemas should be combined."
            };
          case "if/then/else":
            return {
              description: "Conditional schema validation (if/then/else) is not supported for documentation display.",
              suggestion: "Consider restructuring the schema to avoid conditional logic, or use oneOf with clear schema distinctions."
            };
          case "not":
            return {
              description: "The not schema feature is not supported for documentation display.",
              suggestion: "Consider restructuring the schema to use positive validation constraints instead of negation."
            };
          case "contains":
            return {
              description: "The contains schema feature for arrays is not supported for documentation display.",
              suggestion: "Consider using items or additionalItems to define array element schemas."
            };
          case "contentEncoding":
            return {
              description: "Content encoding specifications are not displayed in the documentation.",
              suggestion: "This is a validation-only feature and doesn't affect the schema structure display."
            };
          case "contentMediaType":
            return {
              description: "Content media type specifications are not displayed in the documentation.",
              suggestion: "This is a validation-only feature and doesn't affect the schema structure display."
            };
          case "propertyNames":
            return {
              description: "Property name validation schemas are not supported for documentation display.",
              suggestion: "Consider using patternProperties for dynamic property names."
            };
          case "unevaluatedProperties":
            return {
              description: "Unevaluated properties handling is not supported for documentation display.",
              suggestion: "Consider using additionalProperties for simpler property handling."
            };
          case "unevaluatedItems":
            return {
              description: "Unevaluated items handling is not supported for documentation display.",
              suggestion: "Consider using additionalItems for simpler array item handling."
            };
          default:
            return {
              description: `The "${feature2}" schema feature is not currently supported and will not be rendered.`,
              suggestion: "Check the JSON Schema documentation for alternative approaches."
            };
        }
      };
      const info = getFeatureInfo(feature);
      return /* @__PURE__ */ jsx(
        SchemaWarning,
        {
          feature,
          description: info.description,
          suggestion: info.suggestion
        },
        feature
      );
    }),
    constraints.length > 0 && /* @__PURE__ */ jsx("div", { className: "constraints", children: constraints.map((constraint, index2) => {
      if (["range", "length", "items", "multipleOf"].includes(
        constraint.type
      )) {
        return /* @__PURE__ */ jsxs(Badge, { variant: "enum", size: "xs", children: [
          constraint.label,
          ": ",
          String(constraint.value)
        ] }, index2);
      }
      return /* @__PURE__ */ jsx(
        CodeSnippet,
        {
          code: `${constraint.label}: ${String(constraint.value)}`,
          variant: "constraint",
          size: "xs",
          copyable: false
        },
        index2
      );
    }) }),
    property.schema.enum && /* @__PURE__ */ jsx(
      BadgeGroup,
      {
        values: property.schema.enum,
        onValueClick: (value) => {
          const copyValue = typeof value === "string" ? value : value === null ? "null" : value === void 0 ? "undefined" : typeof value === "boolean" || typeof value === "number" ? String(value) : JSON.stringify(value);
          const element2 = typeof document !== "undefined" ? document.createElement("div") : null;
          onCopy(copyValue, element2);
        },
        badgeVariant: "enum",
        badgeSize: "xs"
      }
    ),
    property.schema.default !== void 0 && /* @__PURE__ */ jsx(
      BadgeGroup,
      {
        values: [property.schema.default],
        label: "default",
        showLabel: true,
        onValueClick: (value) => {
          const copyValue = value === null ? "null" : value === void 0 ? "undefined" : typeof value === "boolean" || typeof value === "number" ? String(value) : JSON.stringify(value);
          const element2 = typeof document !== "undefined" ? document.createElement("div") : null;
          onCopy(copyValue, element2);
        },
        badgeVariant: "default-value",
        badgeSize: "xs"
      }
    )
  ] });
};
const getTypeDescription$1 = (type2) => {
  switch (type2.toLowerCase()) {
    case "string":
      return "Text data - can contain letters, numbers, and symbols.";
    case "number":
      return "Numeric data - integers and decimal numbers.";
    case "integer":
      return "Whole number data - no decimal places allowed.";
    case "boolean":
      return "True or false value.";
    case "array":
      return "List of items - can contain multiple values.";
    case "object":
      return "Structured data with properties and values.";
    case "null":
      return "Represents no value or empty data.";
    case "oneof":
      return "Must match exactly one of the defined schemas.";
    case "anyof":
      return "Must match at least one of the defined schemas.";
    case "enum":
      return "Must be one of a specific set of predefined values.";
    default:
      if (type2.includes("|")) {
        return "Can be one of multiple data types.";
      }
      return "The expected data type for this property.";
  }
};
const getEnumId$1 = (schema2) => {
  if (schema2.__originalRef && typeof schema2.__originalRef === "string") {
    const match = schema2.__originalRef.match(/#\/definitions\/(.+)$/);
    if (match && match[1].trim()) {
      return match[1];
    }
  }
  if (schema2.$ref && typeof schema2.$ref === "string") {
    const match = schema2.$ref.match(/#\/definitions\/(.+)$/);
    if (match && match[1].trim()) {
      return match[1];
    }
  }
  return null;
};
const getEnumDescription$1 = (schema2, rootSchema) => {
  const refToUse = schema2.__originalRef || schema2.$ref;
  if (refToUse && rootSchema) {
    const enumId = getEnumId$1(schema2);
    if (enumId && rootSchema.definitions && rootSchema.definitions[enumId]) {
      const resolvedSchema = rootSchema.definitions[enumId];
      if (resolvedSchema.description) {
        return resolvedSchema.description;
      }
    }
  }
  if (schema2.description) {
    return schema2.description;
  }
  return "No description provided for this enumerated type.";
};
const PropertyRow = ({
  property,
  propertyKey,
  state,
  onToggle,
  onCopy,
  onCopyLink,
  collapsible,
  includeExamples,
  examplesOnFocusOnly,
  propertyStates,
  rootSchema,
  toggleProperty,
  focusedProperty,
  onFocusChange,
  options,
  searchQuery,
  examplesHidden = false
}) => {
  const [isActiveRoute, setIsActiveRoute] = useState(false);
  const hasValidSchema = property.schema != null;
  const nestedProperties = useMemo(() => {
    if (!rootSchema || !hasValidSchema) return [];
    if (property.schema.oneOf || property.schema.allOf) {
      return [];
    }
    const props = extractProperties(
      property.schema,
      property.path,
      property.depth + 1,
      rootSchema,
      []
    );
    return props.sort(
      (a, b) => a.name.localeCompare(b.name)
    );
  }, [
    property.schema,
    property.path,
    property.depth,
    rootSchema,
    hasValidSchema
  ]);
  const hasNestedProperties = nestedProperties.length > 0;
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const checkActiveRoute = () => {
      const hash = window.location.hash;
      const fieldKey = hashToPropertyKey(hash);
      setIsActiveRoute(fieldKey === propertyKey);
    };
    checkActiveRoute();
    const handleHashChange = () => checkActiveRoute();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [propertyKey]);
  const schemaType = getSchemaType(property.schema);
  const handleHeaderClick = useCallback(
    (e) => {
      e.stopPropagation();
      if (collapsible && hasValidSchema) {
        onToggle();
      }
      onFocusChange == null ? void 0 : onFocusChange(propertyKey);
    },
    [collapsible, onToggle, propertyKey, onFocusChange, hasValidSchema]
  );
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (collapsible && hasValidSchema) {
          onToggle();
        }
      }
    },
    [collapsible, onToggle, hasValidSchema]
  );
  const handleLinkClick = useCallback(
    (e) => {
      if (e.button === 1 || e.ctrlKey || e.metaKey) {
        return;
      }
      onFocusChange == null ? void 0 : onFocusChange(propertyKey);
      if (collapsible && hasValidSchema && !state.expanded) {
        onToggle();
      }
    },
    [
      onFocusChange,
      propertyKey,
      collapsible,
      hasValidSchema,
      state.expanded,
      onToggle
    ]
  );
  const linkHref = useMemo(() => {
    if (typeof window === "undefined") return "#";
    const anchor = `#${propertyKeyToHash(propertyKey)}`;
    return `${window.location.origin}${window.location.pathname}${anchor}`;
  }, [propertyKey]);
  const handleFieldClick = useCallback(
    (e) => {
      var _a2;
      if (e.target.closest("button") || typeof window !== "undefined" && ((_a2 = window.getSelection()) == null ? void 0 : _a2.toString())) {
        return;
      }
      if (e.target.closest(".row-header-container")) {
        return;
      }
      e.stopPropagation();
      onFocusChange == null ? void 0 : onFocusChange(propertyKey);
      const propertyContainer = e.currentTarget;
      propertyContainer.setAttribute("tabindex", "-1");
      propertyContainer.focus();
    },
    [propertyKey, onFocusChange]
  );
  const renderPropertyDetails = useCallback(() => {
    return /* @__PURE__ */ jsx(
      PropertyDetails,
      {
        property,
        onCopy,
        rootSchema,
        onCopyLink,
        propertyStates,
        toggleProperty,
        focusedProperty,
        onFocusChange,
        options,
        searchQuery
      }
    );
  }, [
    property,
    onCopy,
    rootSchema,
    onCopyLink,
    propertyStates,
    toggleProperty,
    focusedProperty,
    onFocusChange,
    options,
    searchQuery
  ]);
  const propertyClasses = [
    "property",
    property.depth > 0 ? "nested-property" : "",
    state.expanded ? "expanded" : "",
    property.depth > 0 ? `depth-${Math.min(property.depth, 3)}` : "",
    includeExamples && hasValidSchema && hasExamples(property.schema) ? "has-examples" : "",
    !hasValidSchema ? "invalid-schema" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsxs(
    Row,
    {
      className: `${propertyClasses} ${focusedProperty === propertyKey ? "focused" : ""}`,
      id: propertyKeyToHash(propertyKey),
      "data-property-key": propertyKey,
      onClick: handleFieldClick,
      children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "row-header-container property-header-container",
            onClick: handleHeaderClick,
            onKeyDown: handleKeyDown,
            tabIndex: collapsible && hasValidSchema ? 0 : -1,
            role: collapsible && hasValidSchema ? "button" : void 0,
            "aria-expanded": hasValidSchema ? state.expanded : void 0,
            "aria-label": hasValidSchema && state.expanded ? `Collapse ${property.name}` : hasValidSchema ? `Expand ${property.name}` : `${property.name} - Invalid schema`,
            style: {
              cursor: collapsible && hasValidSchema ? "pointer" : "default"
            },
            children: [
              /* @__PURE__ */ jsxs("div", { className: "row-controls property-controls", children: [
                searchQuery && state.matchesSearch && /* @__PURE__ */ jsx(
                  Tooltip,
                  {
                    title: state.isDirectMatch && state.hasNestedMatches ? "Direct and nested search match" : state.isDirectMatch ? "Direct search match" : "Indirect search match",
                    content: state.isDirectMatch && state.hasNestedMatches ? "This property matches your search query and also contains nested matches." : state.isDirectMatch ? "This property matches your search query." : "This property has nested properties that match your search.",
                    placement: "top",
                    children: /* @__PURE__ */ jsx(
                      "span",
                      {
                        className: `row-button search-hit-indicator ${state.isDirectMatch && state.hasNestedMatches ? "both-hit" : state.isDirectMatch ? "direct-hit" : "indirect-hit"}`,
                        "aria-label": `${property.name} ${state.isDirectMatch && state.hasNestedMatches ? "matches search and contains nested matches" : state.isDirectMatch ? "matches current search" : "contains nested search matches"}`,
                        children: state.isDirectMatch && state.hasNestedMatches ? /* @__PURE__ */ jsx(FaSitemap, {}) : state.isDirectMatch ? /* @__PURE__ */ jsx(FaFolder, {}) : /* @__PURE__ */ jsx(FaFolderOpen, {})
                      }
                    )
                  }
                ),
                examplesHidden && hasExamples(property.schema) && /* @__PURE__ */ jsx(
                  Tooltip,
                  {
                    title: "Examples hidden",
                    content: "Examples are available for this property but are currently hidden. Press 'e' to show examples.",
                    placement: "top",
                    children: /* @__PURE__ */ jsx(
                      "span",
                      {
                        className: "examples-hidden-indicator",
                        "aria-label": `${property.name} has examples that are currently hidden`,
                        children: /* @__PURE__ */ jsx(FaEyeSlash, {})
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsx(
                  Tooltip,
                  {
                    title: isActiveRoute ? "Current active route" : "Link to field",
                    content: isActiveRoute ? "This field is currently focused via URL hash." : "Navigate to this field via URL.",
                    placement: "top",
                    children: /* @__PURE__ */ jsx(
                      "a",
                      {
                        href: linkHref,
                        className: `row-button link-button ${isActiveRoute ? "active-route" : ""}`,
                        onClick: handleLinkClick,
                        "aria-label": isActiveRoute ? `${property.name} is the current active route` : `Link to ${property.name} field`,
                        children: isActiveRoute ? /* @__PURE__ */ jsx(FaMapPin, {}) : /* @__PURE__ */ jsx(FaLink, {})
                      }
                    )
                  }
                ),
                collapsible && hasValidSchema && /* @__PURE__ */ jsx(
                  Tooltip,
                  {
                    title: state.expanded ? "Collapse property" : "Expand property",
                    content: state.expanded ? "Hide property details and nested properties." : "Show property details and nested properties.",
                    placement: "top",
                    children: /* @__PURE__ */ jsx(
                      "button",
                      {
                        className: "row-button expand-button",
                        onClick: handleHeaderClick,
                        tabIndex: -1,
                        "aria-hidden": "true",
                        children: state.expanded ? /* @__PURE__ */ jsx(FaChevronDown, {}) : /* @__PURE__ */ jsx(FaChevronRight, {})
                      }
                    )
                  }
                ),
                !hasValidSchema && /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "invalid-schema-indicator",
                    title: "Invalid schema data.",
                    children: "⚠️"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("div", { className: "row-content property-content", children: /* @__PURE__ */ jsxs("div", { className: "row-inline property-inline", children: [
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: `property-name ${property.schema.__isPatternProperty ? "pattern-property" : ""}`,
                    children: property.schema.__isPatternProperty ? /* @__PURE__ */ jsx(
                      Tooltip,
                      {
                        title: "Pattern property",
                        content: "This represents dynamic field names. Unlike fixed property names, this can match multiple different field names in your data.",
                        placement: "top",
                        nonInteractive: true,
                        children: /* @__PURE__ */ jsx(Badge, { variant: "pattern", size: "sm", children: property.name })
                      }
                    ) : property.name
                  }
                ),
                property.schema.enum || getEnumId$1(property.schema) ? /* @__PURE__ */ jsx(
                  Tooltip,
                  {
                    title: "Data type",
                    content: getEnumDescription$1(property.schema, rootSchema),
                    placement: "top",
                    nonInteractive: true,
                    children: /* @__PURE__ */ jsx(Badge, { variant: "custom-type", size: "sm", children: getEnumId$1(property.schema) || "enum" })
                  }
                ) : schemaType && /* @__PURE__ */ jsx(
                  Tooltip,
                  {
                    title: "Data type",
                    content: getTypeDescription$1(schemaType),
                    placement: "top",
                    nonInteractive: true,
                    children: /* @__PURE__ */ jsx(Badge, { variant: "type", size: "sm", children: schemaType })
                  }
                ),
                property.required && /* @__PURE__ */ jsx(
                  Tooltip,
                  {
                    title: "Required property",
                    content: "This property must be present in valid data.",
                    placement: "top",
                    nonInteractive: true,
                    children: /* @__PURE__ */ jsx(Badge, { variant: "required", size: "sm", children: "required" })
                  }
                ),
                !state.expanded && hasValidSchema && property.schema.description && /* @__PURE__ */ jsx("span", { className: "property-description-inline", children: property.schema.description }),
                !state.expanded && !hasValidSchema && /* @__PURE__ */ jsx("span", { className: "property-description-inline invalid-schema-description", children: "Schema data is undefined or invalid" })
              ] }) })
            ]
          }
        ),
        state.expanded && hasValidSchema && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: `schema-details ${includeExamples && !examplesHidden && hasExamples(property.schema) && (examplesOnFocusOnly ? focusedProperty === propertyKey : true) ? "schema-details-split" : ""}`,
              "data-has-examples": hasExamples(property.schema),
              "data-include-examples": includeExamples,
              "data-split-active": includeExamples && !examplesHidden && hasExamples(property.schema) && (examplesOnFocusOnly ? focusedProperty === propertyKey : true),
              children: includeExamples && !examplesHidden && hasExamples(property.schema) && (examplesOnFocusOnly ? focusedProperty === propertyKey : true) ? /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx("div", { className: "schema-details-left", children: renderPropertyDetails() }),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "schema-details-right",
                    "data-debug": "examples-panel-container",
                    children: rootSchema ? /* @__PURE__ */ jsx(
                      ExamplesPanel,
                      {
                        currentProperty: property.schema,
                        rootSchema,
                        propertyPath: property.path || [propertyKey],
                        onCopy,
                        options
                      }
                    ) : /* @__PURE__ */ jsx("div", { className: "examples-panel-unavailable", children: /* @__PURE__ */ jsxs("div", { className: "examples-panel-message", children: [
                      /* @__PURE__ */ jsx("span", { className: "examples-panel-icon", children: "ⓘ" }),
                      "Root schema unavailable"
                    ] }) })
                  }
                )
              ] }) : renderPropertyDetails()
            }
          ),
          hasNestedProperties && /* @__PURE__ */ jsx(
            Rows,
            {
              className: "nested-properties",
              properties: nestedProperties,
              propertyStates: propertyStates || {},
              onToggle: (propertyKey2) => toggleProperty == null ? void 0 : toggleProperty(propertyKey2),
              onCopy,
              onCopyLink,
              collapsible,
              includeExamples: includeExamples && !examplesHidden,
              examplesOnFocusOnly,
              rootSchema,
              toggleProperty,
              focusedProperty,
              onFocusChange,
              options,
              searchQuery,
              examplesHidden
            }
          )
        ] })
      ]
    }
  );
};
const NoAdditionalPropertiesRow = ({
  className = ""
}) => {
  const rowClasses = ["no-additional-properties", className].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsx(Row, { className: rowClasses, children: /* @__PURE__ */ jsxs("div", { className: "row-header-container", children: [
    /* @__PURE__ */ jsx("div", { className: "row-controls", children: /* @__PURE__ */ jsx(
      "button",
      {
        className: "row-button link-button",
        disabled: true,
        tabIndex: -1,
        title: "No link available for this informational row",
        children: /* @__PURE__ */ jsx("span", { className: "disabled-icon", children: "×" })
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "row-content", children: /* @__PURE__ */ jsx("div", { className: "row-inline", children: /* @__PURE__ */ jsx("span", { className: "property-name disabled", children: /* @__PURE__ */ jsx("em", { children: "no additional properties" }) }) }) })
  ] }) });
};
const Rows = ({
  properties,
  propertyStates,
  onToggle,
  onCopy,
  onCopyLink,
  collapsible,
  includeExamples,
  examplesOnFocusOnly,
  rootSchema,
  toggleProperty,
  focusedProperty,
  onFocusChange,
  showNoAdditionalProperties = false,
  className = "",
  options,
  searchQuery,
  examplesHidden = false
}) => {
  const rowsClasses = ["properties-rows", className].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsxs("div", { className: rowsClasses, children: [
    properties.map((property) => {
      const propertyKey = property.path.join(".");
      const state = propertyStates[propertyKey];
      if (!state) return null;
      return /* @__PURE__ */ jsx(
        PropertyRow,
        {
          property,
          propertyKey,
          state,
          onToggle: () => onToggle(propertyKey),
          onCopy,
          onCopyLink,
          collapsible,
          includeExamples,
          examplesOnFocusOnly,
          rootSchema,
          propertyStates,
          toggleProperty,
          focusedProperty,
          onFocusChange,
          options,
          searchQuery,
          examplesHidden
        },
        propertyKey
      );
    }),
    showNoAdditionalProperties && /* @__PURE__ */ jsx(NoAdditionalPropertiesRow, {})
  ] });
};
const OneOfSelector = ({
  oneOfOptions,
  rootSchema,
  propertyPath = [],
  _onCopy,
  onCopyLink,
  propertyStates: _propertyStates = {},
  toggleProperty,
  focusedProperty,
  onFocusChange,
  options,
  searchQuery
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const resolvedOptions = useMemo(
    () => oneOfOptions.map((option2) => resolveSchema(option2, rootSchema)),
    [oneOfOptions, rootSchema]
  );
  const getOptionDisplay = useCallback(
    (option2, index2) => {
      var _a2;
      let searchHitStatus = "none";
      if (searchQuery == null ? void 0 : searchQuery.trim()) {
        const hasMatch = searchInSchema$1(option2, rootSchema, searchQuery, true);
        if (hasMatch) {
          searchHitStatus = "direct";
        }
      }
      if (option2.title) {
        return {
          label: option2.title,
          type: option2.type || "object",
          isReference: Boolean(oneOfOptions[index2].$ref),
          searchHitStatus
        };
      }
      if (oneOfOptions[index2].$ref) {
        const refName = ((_a2 = oneOfOptions[index2].$ref) == null ? void 0 : _a2.split("/").pop()) || "object";
        const displayName = refName.charAt(0).toUpperCase() + refName.slice(1);
        return {
          label: displayName,
          type: "object",
          isReference: true,
          searchHitStatus
        };
      }
      if (option2.type) {
        const types2 = Array.isArray(option2.type) ? option2.type : [option2.type];
        return {
          label: types2.join(" | "),
          type: types2.join(" | "),
          isReference: false,
          searchHitStatus
        };
      }
      return {
        label: "Unknown",
        type: "unknown",
        isReference: false,
        searchHitStatus
      };
    },
    [oneOfOptions, searchQuery, rootSchema]
  );
  const selectedOption = resolvedOptions[selectedIndex];
  const optionDisplays = resolvedOptions.map(getOptionDisplay);
  const selectedProperties = useMemo(() => {
    const currentOption = resolvedOptions[selectedIndex];
    if (!(currentOption == null ? void 0 : currentOption.properties)) {
      return [];
    }
    const basePath = propertyPath.length > 0 ? propertyPath : ["oneof", selectedIndex.toString()];
    const properties = extractProperties(
      currentOption,
      basePath,
      0,
      rootSchema,
      []
    );
    return properties.sort((a, b) => a.name.localeCompare(b.name));
  }, [resolvedOptions, selectedIndex, rootSchema, propertyPath]);
  const [internalPropertyStates, setInternalPropertyStates] = useState({});
  const oneOfPropertyStates = useMemo(() => {
    const states = {};
    selectedProperties.forEach((prop) => {
      const key2 = prop.path.join(".");
      states[key2] = internalPropertyStates[key2] || {
        expanded: false,
        hasDetails: true,
        matchesSearch: true,
        isDirectMatch: false,
        hasNestedMatches: false
      };
    });
    return states;
  }, [selectedProperties, internalPropertyStates]);
  const handleInternalToggle = useCallback(
    (propertyKey) => {
      setInternalPropertyStates((prev) => {
        var _a2;
        return {
          ...prev,
          [propertyKey]: {
            ...prev[propertyKey],
            expanded: !((_a2 = prev[propertyKey]) == null ? void 0 : _a2.expanded),
            hasDetails: true,
            matchesSearch: true,
            isDirectMatch: false,
            hasNestedMatches: false
          }
        };
      });
      toggleProperty == null ? void 0 : toggleProperty(propertyKey);
    },
    [toggleProperty]
  );
  return /* @__PURE__ */ jsxs("div", { className: "oneof-selector", children: [
    /* @__PURE__ */ jsx("div", { className: "oneof-tabs", children: optionDisplays.map((display, index2) => /* @__PURE__ */ jsx(
      "button",
      {
        className: `oneof-tab ${selectedIndex === index2 ? "active" : ""} ${display.searchHitStatus !== "none" ? `search-hit ${display.searchHitStatus}-hit` : ""}`,
        onClick: () => setSelectedIndex(index2),
        title: display.isReference ? `Complex object: ${display.label}${display.searchHitStatus !== "none" ? " (matches search)" : ""}` : `Primitive types: ${display.type}${display.searchHitStatus !== "none" ? " (matches search)" : ""}`,
        children: /* @__PURE__ */ jsx(
          Badge,
          {
            variant: display.isReference ? "reference" : "type",
            size: "md",
            className: `${selectedIndex === index2 ? "selected" : "unselected"} ${display.searchHitStatus !== "none" ? `search-hit ${display.searchHitStatus}-hit` : ""}`,
            children: display.label
          }
        )
      },
      index2
    )) }),
    /* @__PURE__ */ jsxs("div", { className: "oneof-content", children: [
      /* @__PURE__ */ jsx("div", { className: "oneof-description", children: selectedOption.description && /* @__PURE__ */ jsx("div", { className: "property-description-block", children: selectedOption.description }) }),
      selectedProperties.length > 0 && /* @__PURE__ */ jsx("div", { className: "oneof-properties", children: /* @__PURE__ */ jsx(
        Rows,
        {
          properties: selectedProperties,
          propertyStates: oneOfPropertyStates,
          onToggle: handleInternalToggle,
          onCopy: _onCopy || (() => {
          }),
          onCopyLink: onCopyLink || (() => {
          }),
          collapsible: true,
          includeExamples: true,
          examplesOnFocusOnly: false,
          rootSchema,
          toggleProperty,
          focusedProperty,
          onFocusChange,
          options,
          searchQuery
        }
      ) })
    ] })
  ] });
};
const AllOfSelector = ({
  allOfOptions,
  rootSchema,
  _onCopy,
  onCopyLink,
  propertyStates = {},
  toggleProperty,
  focusedProperty,
  onFocusChange,
  propertyPath = [],
  options,
  searchQuery
}) => {
  const mergedSchema = useMemo(() => {
    const resolvedOptions = allOfOptions.map((option2) => {
      return resolveSchema(option2, rootSchema);
    });
    const merged = {
      type: "object",
      properties: {},
      required: []
    };
    const allRequired = /* @__PURE__ */ new Set();
    resolvedOptions.forEach((option2, _index) => {
      if (option2.properties) {
        merged.properties = {
          ...merged.properties,
          ...option2.properties
        };
      }
      if (option2.patternProperties) {
        merged.patternProperties = {
          ...merged.patternProperties,
          ...option2.patternProperties
        };
      }
      if (option2.required) {
        option2.required.forEach((req) => allRequired.add(req));
      }
      if (option2.additionalProperties !== void 0) {
        merged.additionalProperties = option2.additionalProperties;
      }
    });
    merged.required = Array.from(allRequired);
    return merged;
  }, [allOfOptions, rootSchema]);
  const mergedProperties = useMemo(() => {
    if (!mergedSchema.properties && !mergedSchema.patternProperties) {
      return [];
    }
    const properties = extractProperties(
      mergedSchema,
      propertyPath,
      0,
      rootSchema,
      []
    );
    return properties.sort((a, b) => a.name.localeCompare(b.name));
  }, [mergedSchema, rootSchema, propertyPath]);
  const allOfPropertyStates = useMemo(() => {
    const states = {};
    mergedProperties.forEach((prop) => {
      const key2 = prop.path.join(".");
      states[key2] = (propertyStates == null ? void 0 : propertyStates[key2]) || {
        expanded: false,
        hasDetails: true,
        matchesSearch: true,
        isDirectMatch: false,
        hasNestedMatches: false
      };
    });
    return states;
  }, [mergedProperties, propertyStates]);
  const handleAllOfToggle = useCallback(
    (propertyKey) => {
      toggleProperty == null ? void 0 : toggleProperty(propertyKey);
    },
    [toggleProperty]
  );
  return /* @__PURE__ */ jsx("div", { className: "allof-selector", children: /* @__PURE__ */ jsxs("div", { className: "allof-content", children: [
    mergedProperties.length > 0 && /* @__PURE__ */ jsx("div", { className: "allof-properties", children: /* @__PURE__ */ jsx(
      Rows,
      {
        className: "properties-list",
        properties: mergedProperties,
        propertyStates: allOfPropertyStates,
        onToggle: handleAllOfToggle,
        onCopy: _onCopy || (() => {
        }),
        onCopyLink: onCopyLink || (() => {
        }),
        collapsible: true,
        includeExamples: true,
        examplesOnFocusOnly: false,
        rootSchema,
        toggleProperty,
        focusedProperty,
        onFocusChange,
        options,
        searchQuery
      }
    ) }),
    mergedProperties.length === 0 && /* @__PURE__ */ jsx("div", { className: "allof-empty", children: /* @__PURE__ */ jsx("p", { children: "No properties found in the combined schemas." }) })
  ] }) });
};
const SchemaWarning = ({
  feature,
  description,
  suggestion,
  className = ""
}) => {
  return /* @__PURE__ */ jsxs("div", { className: `schema-warning ${className}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "schema-warning-header", children: [
      /* @__PURE__ */ jsx(FaExclamationTriangle, { className: "schema-warning-icon" }),
      /* @__PURE__ */ jsx(Badge, { variant: "warning", size: "sm", children: "Unsupported Feature" }),
      /* @__PURE__ */ jsx("code", { className: "schema-warning-feature", children: feature })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "schema-warning-content", children: [
      /* @__PURE__ */ jsx("p", { className: "schema-warning-description", children: description || `The "${feature}" schema feature is not currently supported and will not be rendered.` }),
      suggestion && /* @__PURE__ */ jsxs("p", { className: "schema-warning-suggestion", children: [
        /* @__PURE__ */ jsx("strong", { children: "Suggestion:" }),
        " ",
        suggestion
      ] })
    ] })
  ] });
};
function isDirectPropertyMatch(schema2, rootSchema, query, searchIncludesExamples = false, propertyName, visited = /* @__PURE__ */ new Set(), depth = 0) {
  var _a2, _b2;
  if (depth > 10 || visited.has(schema2)) {
    return false;
  }
  visited.add(schema2);
  const queryLower = query.toLowerCase();
  const resolved = resolveSchema(schema2, rootSchema);
  if (propertyName && propertyName.toLowerCase().includes(queryLower)) {
    return true;
  }
  if ((_a2 = resolved.description) == null ? void 0 : _a2.toLowerCase().includes(queryLower)) {
    return true;
  }
  if (getSchemaType(resolved).toLowerCase().includes(queryLower)) {
    return true;
  }
  if (searchIncludesExamples && ((_b2 = resolved.examples) == null ? void 0 : _b2.some((example) => {
    const exampleText = typeof example === "string" ? example : JSON.stringify(example);
    return exampleText.toLowerCase().includes(queryLower);
  }))) {
    return true;
  }
  if (resolved.oneOf) {
    for (let i = 0; i < resolved.oneOf.length; i++) {
      const subSchema = resolved.oneOf[i];
      if (isDirectPropertyMatch(
        subSchema,
        rootSchema,
        query,
        searchIncludesExamples,
        void 0,
        visited,
        depth + 1
      )) {
        return true;
      }
    }
  }
  if (resolved.allOf) {
    for (const subSchema of resolved.allOf) {
      if (isDirectPropertyMatch(
        subSchema,
        rootSchema,
        query,
        searchIncludesExamples,
        void 0,
        visited,
        depth + 1
      )) {
        return true;
      }
    }
  }
  if (resolved.anyOf) {
    for (const subSchema of resolved.anyOf) {
      if (isDirectPropertyMatch(
        subSchema,
        rootSchema,
        query,
        searchIncludesExamples,
        void 0,
        visited,
        depth + 1
      )) {
        return true;
      }
    }
  }
  return false;
}
function searchInSchema(schema2, rootSchema, query, searchIncludesExamples = false, propertyName, visited = /* @__PURE__ */ new Set(), depth = 0) {
  var _a2, _b2;
  if (depth > 10 || visited.has(schema2)) {
    return false;
  }
  visited.add(schema2);
  const queryLower = query.toLowerCase();
  if (propertyName && propertyName.toLowerCase().includes(queryLower)) {
    return true;
  }
  if ((_a2 = schema2.description) == null ? void 0 : _a2.toLowerCase().includes(queryLower)) {
    return true;
  }
  if (getSchemaType(schema2).toLowerCase().includes(queryLower)) {
    return true;
  }
  if (searchIncludesExamples && ((_b2 = schema2.examples) == null ? void 0 : _b2.some((example) => {
    const exampleText = typeof example === "string" ? example : JSON.stringify(example);
    return exampleText.toLowerCase().includes(queryLower);
  }))) {
    return true;
  }
  const resolved = resolveSchema(schema2, rootSchema);
  if (resolved.properties) {
    for (const [propName, propSchema] of Object.entries(resolved.properties)) {
      if (searchInSchema(
        propSchema,
        rootSchema,
        query,
        searchIncludesExamples,
        propName,
        visited,
        depth + 1
      )) {
        return true;
      }
    }
  }
  if (resolved.patternProperties) {
    for (const [_pattern, propSchema] of Object.entries(
      resolved.patternProperties
    )) {
      if (searchInSchema(
        propSchema,
        rootSchema,
        query,
        searchIncludesExamples,
        void 0,
        visited,
        depth + 1
      )) {
        return true;
      }
    }
  }
  if (resolved.oneOf) {
    for (const subSchema of resolved.oneOf) {
      if (searchInSchema(
        subSchema,
        rootSchema,
        query,
        searchIncludesExamples,
        void 0,
        visited,
        depth + 1
      )) {
        return true;
      }
    }
  }
  if (resolved.allOf) {
    for (const subSchema of resolved.allOf) {
      if (searchInSchema(
        subSchema,
        rootSchema,
        query,
        searchIncludesExamples,
        void 0,
        visited,
        depth + 1
      )) {
        return true;
      }
    }
  }
  if (resolved.anyOf) {
    for (const subSchema of resolved.anyOf) {
      if (searchInSchema(
        subSchema,
        rootSchema,
        query,
        searchIncludesExamples,
        void 0,
        visited,
        depth + 1
      )) {
        return true;
      }
    }
  }
  return false;
}
const DEFAULT_OPTIONS = {
  includeHeader: true,
  includePropertiesTitle: true,
  includeDefinitions: false,
  includeExamples: false,
  examplesOnFocusOnly: true,
  searchable: true,
  searchIncludesExamples: false,
  collapsible: true,
  autoExpand: false,
  theme: "auto",
  defaultExampleLanguage: "yaml"
};
const loadStoredSettings = (siteKey) => {
  try {
    if (typeof window === "undefined") return {};
    const key2 = siteKey || window.location.hostname;
    const storageKey = `deckard-settings-${key2}`;
    const stored = localStorage.getItem(storageKey);
    const parsedSettings = stored ? JSON.parse(stored) : {};
    if (parsedSettings.searchable === void 0) {
      parsedSettings.searchable = true;
    }
    return parsedSettings;
  } catch (error2) {
    console.warn("Failed to load settings from localStorage:", error2);
    return { searchable: true };
  }
};
const copyTimeouts = /* @__PURE__ */ new WeakMap();
const copyFeedbackStyles = `
.deckard-copy-success {
  background-color: #3b82f6 !important;
  color: white !important;
  transition: all 0.15s ease-in-out;
}

.deckard-link-copy-success {
  color: #3b82f6 !important;
  transition: all 0.15s ease-in-out;
}

.deckard-icon-copy-success {
  color: #3b82f6 !important;
  transition: all 0.15s ease-in-out;
}
`;
if (typeof document !== "undefined" && !document.getElementById("deckard-copy-styles")) {
  const styleElement = document.createElement("style");
  styleElement.id = "deckard-copy-styles";
  styleElement.textContent = copyFeedbackStyles;
  document.head.appendChild(styleElement);
}
const DeckardSchema = ({
  schema: schema2,
  options = {},
  className
}) => {
  const storedSettings = loadStoredSettings(
    typeof window !== "undefined" ? window.location.hostname : "default"
  );
  const [currentOptions, setCurrentOptions] = useState(() => {
    const merged = {
      ...DEFAULT_OPTIONS,
      ...storedSettings,
      ...options
      // Props override localStorage settings
    };
    if (merged.searchable === void 0 || merged.searchable === null) {
      merged.searchable = true;
    }
    return merged;
  });
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const siteKey = window.location.hostname;
        const storageKey = `deckard-settings-${siteKey}`;
        localStorage.setItem(storageKey, JSON.stringify(currentOptions));
      } catch (error2) {
        console.warn("Failed to persist settings to localStorage:", error2);
      }
    }
  }, [currentOptions]);
  const mergedOptions = currentOptions;
  const {
    autoExpand,
    collapsible,
    searchable,
    includeHeader,
    includePropertiesTitle,
    includeExamples,
    examplesOnFocusOnly,
    includeDefinitions
  } = mergedOptions;
  const [propertyStates, setPropertyStates] = useState({});
  const [searchState, setSearchState] = useState({
    query: "",
    visible: false,
    results: 0
  });
  const [focusedProperty, setFocusedProperty] = useState(null);
  const [keyboardModalOpen, setKeyboardModalOpen] = useState(false);
  const [examplesHidden, setExamplesHidden] = useState(false);
  const properties = useMemo(() => {
    const props = extractProperties(schema2, [], 0, schema2, []);
    return props.sort((a, b) => a.name.localeCompare(b.name));
  }, [schema2]);
  const filteredProperties = useMemo(() => {
    if (!searchState.query) return properties;
    return properties.filter((prop) => {
      return searchInSchema(
        prop.schema,
        schema2,
        searchState.query,
        currentOptions.searchIncludesExamples || false,
        prop.name
      );
    });
  }, [
    properties,
    searchState.query,
    schema2,
    currentOptions.searchIncludesExamples
  ]);
  useEffect(() => {
    const newStates = {};
    const initializePropertyStates = (schema22, path, depth, rootSchema) => {
      const properties2 = extractProperties(schema22, path, depth, rootSchema, []);
      properties2.forEach((property) => {
        const key2 = property.path.join(".");
        newStates[key2] = {
          expanded: Boolean(autoExpand),
          hasDetails: true,
          // All fields are expandable now
          matchesSearch: true,
          // Always true initially
          isDirectMatch: false,
          hasNestedMatches: false
        };
        const resolvedSchema = resolveSchema(property.schema, rootSchema);
        if (resolvedSchema.properties || resolvedSchema.patternProperties) {
          initializePropertyStates(
            resolvedSchema,
            property.path,
            depth + 1,
            rootSchema
          );
        }
      });
    };
    initializePropertyStates(schema2, [], 0, schema2);
    setPropertyStates(newStates);
  }, [schema2, autoExpand]);
  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    if (hash) {
      const fieldKey = hashToPropertyKey(hash);
      setPropertyStates((prev) => {
        const newStates = { ...prev };
        const pathParts = fieldKey.split(".");
        for (let i = 1; i <= pathParts.length; i++) {
          const parentPath = pathParts.slice(0, i).join(".");
          if (newStates[parentPath]) {
            newStates[parentPath] = {
              ...newStates[parentPath],
              expanded: true
            };
          } else {
            newStates[parentPath] = {
              expanded: true,
              hasDetails: true,
              matchesSearch: true,
              isDirectMatch: false,
              hasNestedMatches: false
            };
          }
        }
        return newStates;
      });
      setFocusedProperty(fieldKey);
      setTimeout(() => {
        if (typeof document !== "undefined") {
          const targetElement = document.getElementById(
            propertyKeyToHash(fieldKey)
          );
          if (targetElement && typeof targetElement.scrollIntoView === "function") {
            targetElement.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });
            targetElement.focus({ preventScroll: true });
          }
        }
      }, 100);
    }
  }, []);
  useEffect(() => {
    setSearchState((prev) => ({
      ...prev,
      results: filteredProperties.length
    }));
  }, [filteredProperties.length]);
  const toggleProperty = useCallback((propertyKey) => {
    setPropertyStates((prev) => {
      var _a2;
      return {
        ...prev,
        [propertyKey]: {
          ...prev[propertyKey],
          expanded: !((_a2 = prev[propertyKey]) == null ? void 0 : _a2.expanded)
        }
      };
    });
  }, []);
  const handleSearch = useCallback(
    (query) => {
      setSearchState((prev) => ({ ...prev, query }));
      if (query && collapsible) {
        const newStates = { ...propertyStates };
        const queryLower = query.toLowerCase();
        Object.keys(newStates).forEach((key2) => {
          if (newStates[key2]) {
            newStates[key2] = {
              ...newStates[key2],
              expanded: false,
              matchesSearch: false,
              isDirectMatch: false,
              hasNestedMatches: false
            };
          }
        });
        const allMatches = /* @__PURE__ */ new Set();
        const directMatches = /* @__PURE__ */ new Set();
        Object.keys(newStates).forEach((key2) => {
          var _a2, _b2;
          const pathSegments = key2.split(".");
          let currentSchema = resolveSchema(schema2, schema2);
          let propertyName = "";
          for (let i = 0; i < pathSegments.length; i++) {
            const segment = pathSegments[i];
            if (segment.startsWith("(pattern-") && segment.endsWith(")")) {
              if (currentSchema.patternProperties) {
                const patternEntries = Object.entries(
                  currentSchema.patternProperties
                );
                const patternIndex = parseInt(
                  ((_a2 = segment.match(/\(pattern-(\d+)\)/)) == null ? void 0 : _a2[1]) || "0"
                );
                if (patternEntries[patternIndex]) {
                  const [_pattern, patternSchema] = patternEntries[patternIndex];
                  currentSchema = resolveSchema(patternSchema, schema2);
                  propertyName = "{pattern}";
                }
              }
            } else if ((_b2 = currentSchema.properties) == null ? void 0 : _b2[segment]) {
              currentSchema = resolveSchema(
                currentSchema.properties[segment],
                schema2
              );
              propertyName = segment;
            }
            if (i === pathSegments.length - 1) {
              if (searchInSchema(
                currentSchema,
                schema2,
                queryLower,
                currentOptions.searchIncludesExamples || false,
                propertyName
              )) {
                allMatches.add(key2);
                const isDirect = isDirectPropertyMatch(
                  currentSchema,
                  schema2,
                  queryLower,
                  currentOptions.searchIncludesExamples || false,
                  propertyName
                );
                if (isDirect) {
                  directMatches.add(key2);
                }
              }
            }
          }
        });
        allMatches.forEach((matchKey) => {
          if (newStates[matchKey]) {
            const isDirect = directMatches.has(matchKey);
            const hasChildMatches = Array.from(allMatches).some(
              (otherKey) => otherKey !== matchKey && otherKey.startsWith(matchKey + ".")
            );
            newStates[matchKey] = {
              ...newStates[matchKey],
              expanded: false,
              matchesSearch: true,
              isDirectMatch: isDirect,
              hasNestedMatches: hasChildMatches
            };
          }
        });
        allMatches.forEach((matchKey) => {
          const pathSegments = matchKey.split(".");
          for (let i = pathSegments.length - 1; i > 0; i--) {
            const parentKey = pathSegments.slice(0, i).join(".");
            if (newStates[parentKey] && !allMatches.has(parentKey)) {
              newStates[parentKey] = {
                ...newStates[parentKey],
                expanded: false,
                matchesSearch: true,
                hasNestedMatches: true,
                isDirectMatch: false
              };
              allMatches.add(parentKey);
            } else if (newStates[parentKey] && directMatches.has(parentKey)) {
              newStates[parentKey] = {
                ...newStates[parentKey],
                hasNestedMatches: true
              };
            }
          }
        });
        setPropertyStates(newStates);
      } else if (!query) {
        const newStates = { ...propertyStates };
        Object.keys(newStates).forEach((key2) => {
          if (newStates[key2]) {
            newStates[key2] = {
              ...newStates[key2],
              expanded: Boolean(autoExpand),
              matchesSearch: true,
              isDirectMatch: false,
              hasNestedMatches: false
            };
          }
        });
        setPropertyStates(newStates);
      }
    },
    [
      propertyStates,
      collapsible,
      schema2,
      autoExpand,
      currentOptions.searchIncludesExamples
    ]
  );
  const expandAll = useCallback(() => {
    const newStates = { ...propertyStates };
    Object.keys(newStates).forEach((key2) => {
      if (newStates[key2].hasDetails) {
        newStates[key2] = { ...newStates[key2], expanded: true };
      }
    });
    setPropertyStates(newStates);
  }, [propertyStates]);
  const collapseAll = useCallback(() => {
    const newStates = { ...propertyStates };
    Object.keys(newStates).forEach((key2) => {
      newStates[key2] = { ...newStates[key2], expanded: false };
    });
    setPropertyStates(newStates);
  }, [propertyStates]);
  const clearSearch = useCallback(() => {
    setSearchState((prev) => ({ ...prev, query: "" }));
  }, []);
  const focusProperty = useCallback((propertyKey) => {
    setFocusedProperty(propertyKey);
    setTimeout(() => {
      if (typeof document === "undefined" || typeof window === "undefined") {
        return;
      }
      const element2 = document.querySelector(
        `[data-property-key="${propertyKey}"]`
      );
      if (element2) {
        const headerContainer = element2.querySelector(
          ".property-header-container"
        );
        if (headerContainer) {
          headerContainer.focus();
        } else {
          element2.setAttribute("tabindex", "-1");
          element2.focus();
        }
        const rect = element2.getBoundingClientRect();
        const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 0;
        const isInView = rect.top >= 0 && rect.bottom <= viewportHeight;
        if (!isInView && typeof element2.scrollIntoView === "function") {
          element2.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    }, 50);
  }, []);
  const getAllNavigableProperties = useCallback(() => {
    const navigable = [];
    const processedPaths = /* @__PURE__ */ new Set();
    const addProperty = (prop, currentDepth = 0) => {
      var _a2;
      const key2 = prop.path.join(".");
      if (processedPaths.has(key2) || currentDepth > 20) {
        return;
      }
      processedPaths.add(key2);
      navigable.push({ key: key2, depth: prop.depth, path: prop.path });
      if (((_a2 = propertyStates[key2]) == null ? void 0 : _a2.expanded) && prop.schema) {
        const allNestedProps = [];
        const nested = extractProperties(
          prop.schema,
          prop.path,
          prop.depth + 1,
          schema2,
          []
        );
        allNestedProps.push(...nested);
        if (prop.schema.allOf) {
          prop.schema.allOf.forEach((allOfSchema, _index) => {
            const resolvedSchema = resolveSchema(allOfSchema, schema2);
            if (resolvedSchema.properties || resolvedSchema.patternProperties) {
              const allOfProps = extractProperties(
                resolvedSchema,
                prop.path,
                prop.depth + 1,
                schema2,
                []
              );
              allNestedProps.push(...allOfProps);
            }
          });
        }
        allNestedProps.sort((a, b) => a.name.localeCompare(b.name));
        allNestedProps.forEach(
          (nestedProp) => addProperty(nestedProp, currentDepth + 1)
        );
      }
    };
    filteredProperties.forEach((prop) => addProperty(prop, 0));
    return navigable;
  }, [filteredProperties, propertyStates, schema2]);
  const getCurrentFocusedPropertyKey = useCallback(() => {
    if (typeof document === "undefined") return null;
    const activeElement2 = document.activeElement;
    if (activeElement2 && activeElement2.hasAttribute("data-property-key")) {
      return activeElement2.getAttribute("data-property-key");
    }
    const propertyElement = activeElement2 == null ? void 0 : activeElement2.closest("[data-property-key]");
    if (propertyElement) {
      return propertyElement.getAttribute("data-property-key");
    }
    return null;
  }, []);
  const handleNavigation = useCallback(
    (direction) => {
      const navigableProperties = getAllNavigableProperties();
      if (navigableProperties.length === 0) return;
      const currentFocusedKey = getCurrentFocusedPropertyKey();
      if (!currentFocusedKey) {
        const firstKey = navigableProperties[0].key;
        focusProperty(firstKey);
        return;
      }
      const currentIndex = navigableProperties.findIndex(
        (p2) => p2.key === currentFocusedKey
      );
      const currentProperty = navigableProperties[currentIndex];
      if (currentIndex === -1) {
        const firstKey = navigableProperties[0].key;
        focusProperty(firstKey);
        return;
      }
      switch (direction) {
        case "j":
          if (currentIndex < navigableProperties.length - 1) {
            const nextKey = navigableProperties[currentIndex + 1].key;
            focusProperty(nextKey);
          }
          break;
        case "k":
          if (currentIndex > 0) {
            const prevKey = navigableProperties[currentIndex - 1].key;
            focusProperty(prevKey);
          }
          break;
        case "l":
          if (collapsible && propertyStates[currentFocusedKey]) {
            if (!propertyStates[currentFocusedKey].expanded) {
              toggleProperty(currentFocusedKey);
            } else {
              const childIndex = currentIndex + 1;
              if (childIndex < navigableProperties.length) {
                const nextProp = navigableProperties[childIndex];
                if (nextProp.depth > currentProperty.depth) {
                  focusProperty(nextProp.key);
                }
              }
            }
          }
          break;
        case "h":
          if (collapsible && propertyStates[currentFocusedKey]) {
            if (propertyStates[currentFocusedKey].expanded) {
              toggleProperty(currentFocusedKey);
            } else {
              if (currentProperty.depth > 0) {
                const parentPath = currentProperty.path.slice(0, -1);
                const parentKey = parentPath.join(".");
                const parentIndex = navigableProperties.findIndex(
                  (p2) => p2.key === parentKey
                );
                if (parentIndex !== -1) {
                  focusProperty(parentKey);
                }
              }
            }
          }
          break;
      }
    },
    [
      getCurrentFocusedPropertyKey,
      getAllNavigableProperties,
      propertyStates,
      collapsible,
      toggleProperty,
      focusProperty
    ]
  );
  useEffect(() => {
    const handleKeyDown = (e) => {
      var _a2;
      if (typeof document !== "undefined" && ((_a2 = document.activeElement) == null ? void 0 : _a2.tagName) === "INPUT") {
        if (e.key === "Escape") {
          clearSearch();
        }
        return;
      }
      if (e.key === "Control" && !e.repeat) {
        if (typeof document !== "undefined") {
          document.documentElement.classList.add("tooltips-shimmer");
        }
      }
      if (["h", "j", "k", "l"].includes(e.key.toLowerCase())) {
        e.preventDefault();
        e.stopPropagation();
      }
      if (e.key === "s" && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
        e.preventDefault();
        if (typeof document !== "undefined") {
          const searchInput = document.querySelector(
            ".input.input-search"
          );
          if (searchInput) {
            searchInput.focus();
            searchInput.select();
          }
        }
        return;
      }
      if (["h", "j", "k", "l"].includes(e.key.toLowerCase())) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        handleNavigation(e.key.toLowerCase());
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "e" && !e.shiftKey) {
        e.preventDefault();
        expandAll();
      }
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "E" || e.key === "e")) {
        e.preventDefault();
        collapseAll();
      }
      if (e.key === "e" && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
        e.preventDefault();
        setExamplesHidden((prev) => !prev);
        return;
      }
      if (e.key === "?" && e.shiftKey && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setKeyboardModalOpen(true);
        return;
      }
      if (e.key === "Escape") {
        clearSearch();
      }
    };
    const handleKeyUp = (e) => {
      if (e.key === "Control") {
        if (typeof document !== "undefined") {
          document.documentElement.classList.remove("tooltips-shimmer");
        }
      }
    };
    if (typeof document !== "undefined") {
      document.addEventListener("keydown", handleKeyDown, { capture: true });
      document.addEventListener("keyup", handleKeyUp, { capture: true });
      return () => {
        document.removeEventListener("keydown", handleKeyDown, {
          capture: true
        });
        document.removeEventListener("keyup", handleKeyUp, {
          capture: true
        });
      };
    }
  }, [clearSearch, expandAll, collapseAll, handleNavigation]);
  useEffect(() => {
    const handleClickAway = (e) => {
      const target = e.target;
      if (target.closest(".property")) {
        return;
      }
      setFocusedProperty(null);
    };
    if (typeof document !== "undefined") {
      document.addEventListener("click", handleClickAway);
      return () => document.removeEventListener("click", handleClickAway);
    }
  }, []);
  const copyToClipboard = useCallback(
    async (text2, element2) => {
      try {
        await navigator.clipboard.writeText(text2);
        if (element2) {
          const existingTimeout = copyTimeouts.get(element2);
          if (existingTimeout) {
            clearTimeout(existingTimeout);
          }
          element2.classList.remove(
            "deckard-copy-success",
            "deckard-link-copy-success",
            "deckard-icon-copy-success"
          );
          const isExamplesCopyButton = element2.classList.contains("copy-button") || element2.classList.contains("example-copy-button");
          if (isExamplesCopyButton) {
            element2.classList.add("deckard-icon-copy-success");
          } else {
            element2.classList.add("deckard-copy-success");
          }
          const timeoutId = setTimeout(() => {
            element2.classList.remove(
              "deckard-copy-success",
              "deckard-link-copy-success",
              "deckard-icon-copy-success"
            );
            copyTimeouts.delete(element2);
          }, 1e3);
          copyTimeouts.set(element2, timeoutId);
        }
      } catch (err) {
        console.warn("Failed to copy to clipboard:", err);
      }
    },
    []
  );
  const copyFieldLink = useCallback(
    async (propertyKey, element2) => {
      if (typeof window === "undefined") {
        return;
      }
      const anchor = `#${propertyKeyToHash(propertyKey)}`;
      const url = `${window.location.origin}${window.location.pathname}${anchor}`;
      window.location.hash = anchor;
      element2.focus();
      try {
        await navigator.clipboard.writeText(url);
        const existingTimeout = copyTimeouts.get(element2);
        if (existingTimeout) {
          clearTimeout(existingTimeout);
        }
        element2.classList.remove(
          "deckard-copy-success",
          "deckard-link-copy-success",
          "deckard-icon-copy-success"
        );
        element2.classList.add("deckard-link-copy-success");
        const timeoutId = setTimeout(() => {
          element2.classList.remove(
            "deckard-copy-success",
            "deckard-link-copy-success",
            "deckard-icon-copy-success"
          );
          copyTimeouts.delete(element2);
        }, 1e3);
        copyTimeouts.set(element2, timeoutId);
      } catch (err) {
        console.error("Failed to copy link:", err);
      }
    },
    []
  );
  const handleSettingsChange = useCallback(
    (newOptions) => {
      setCurrentOptions((prev) => ({ ...prev, ...newOptions }));
    },
    []
  );
  const handleKeyboardModalToggle = useCallback(() => {
    setKeyboardModalOpen((prev) => !prev);
  }, []);
  const handleKeyboardModalClose = useCallback(() => {
    setKeyboardModalOpen(false);
  }, []);
  return /* @__PURE__ */ jsx(TooltipGlobalManagerProvider, { children: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: `schema-container ${className}`, children: [
    includeHeader && schema2.title && /* @__PURE__ */ jsxs("div", { className: "schema-header", children: [
      /* @__PURE__ */ jsx("h1", { children: schema2.title }),
      schema2.description && /* @__PURE__ */ jsx("p", { className: "schema-description", children: schema2.description })
    ] }),
    includePropertiesTitle && /* @__PURE__ */ jsxs("div", { className: "properties-header", children: [
      /* @__PURE__ */ jsx("h2", { children: "Properties" }),
      /* @__PURE__ */ jsxs("div", { className: "header-controls", children: [
        /* @__PURE__ */ jsx(
          Tooltip,
          {
            title: "Keyboard shortcuts",
            content: "View available keyboard shortcuts for navigation and controls",
            children: /* @__PURE__ */ jsx(
              "button",
              {
                className: "keyboard-button",
                onClick: handleKeyboardModalToggle,
                "aria-label": "View keyboard shortcuts",
                children: /* @__PURE__ */ jsx(FaKeyboard, {})
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(
          Settings,
          {
            options: currentOptions,
            onChange: handleSettingsChange,
            siteKey: typeof window !== "undefined" ? window.location.hostname : "default"
          }
        )
      ] })
    ] }),
    !includePropertiesTitle && /* @__PURE__ */ jsx("div", { className: "settings-only-header", children: /* @__PURE__ */ jsxs("div", { className: "header-controls", children: [
      /* @__PURE__ */ jsx(
        Tooltip,
        {
          title: "Keyboard shortcuts",
          content: "View available keyboard shortcuts for navigation and controls",
          children: /* @__PURE__ */ jsx(
            "button",
            {
              className: "keyboard-button",
              onClick: handleKeyboardModalToggle,
              "aria-label": "View keyboard shortcuts",
              children: /* @__PURE__ */ jsx(FaKeyboard, {})
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(
        Settings,
        {
          options: currentOptions,
          onChange: handleSettingsChange,
          siteKey: typeof window !== "undefined" ? window.location.hostname : "default"
        }
      )
    ] }) }),
    searchable && /* @__PURE__ */ jsx("div", { className: "schema-search", children: /* @__PURE__ */ jsx(
      Input,
      {
        type: "search",
        variant: "search",
        size: "md",
        placeholder: "Search properties... (press 's')",
        value: searchState.query,
        onChange: (e) => handleSearch(e.target.value),
        tabIndex: 1
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "properties-section", children: filteredProperties.length === 0 && searchState.query ? /* @__PURE__ */ jsxs("div", { className: "no-search-results", children: [
      /* @__PURE__ */ jsx("div", { className: "no-search-results-icon", children: "🔍" }),
      /* @__PURE__ */ jsxs("div", { className: "no-search-results-message", children: [
        /* @__PURE__ */ jsx("h3", { children: "No properties match your search" }),
        /* @__PURE__ */ jsx("p", { children: "Try adjusting your search terms or clearing the search to see all properties." })
      ] })
    ] }) : /* @__PURE__ */ jsx(
      Rows,
      {
        className: "properties-list",
        properties: filteredProperties,
        propertyStates,
        onToggle: toggleProperty,
        onCopy: copyToClipboard,
        onCopyLink: copyFieldLink,
        collapsible: Boolean(collapsible),
        includeExamples: Boolean(includeExamples),
        examplesOnFocusOnly: Boolean(examplesOnFocusOnly),
        rootSchema: schema2,
        toggleProperty,
        focusedProperty,
        onFocusChange: setFocusedProperty,
        showNoAdditionalProperties: schema2.additionalProperties === false && !searchState.query,
        options: {
          defaultExampleLanguage: currentOptions.defaultExampleLanguage
        },
        searchQuery: searchState.query,
        examplesHidden
      }
    ) }),
    includeDefinitions && schema2.definitions && /* @__PURE__ */ jsxs("div", { className: "definitions-section", children: [
      /* @__PURE__ */ jsx("h2", { children: "Definitions" }),
      Object.entries(schema2.definitions).map(([name, def]) => /* @__PURE__ */ jsxs("div", { className: "definition", children: [
        /* @__PURE__ */ jsx("h3", { children: name }),
        /* @__PURE__ */ jsx(
          DeckardSchema,
          {
            schema: def,
            options: {
              ...options,
              includeHeader: false,
              includeDefinitions: false
            }
          }
        )
      ] }, name))
    ] }),
    /* @__PURE__ */ jsx(
      KeyboardModal,
      {
        isOpen: keyboardModalOpen,
        onClose: handleKeyboardModalClose,
        examplesHidden
      }
    )
  ] }) }) });
};
const getTypeDescription = (type2) => {
  switch (type2.toLowerCase()) {
    case "string":
      return "Text data - can contain letters, numbers, and symbols.";
    case "number":
      return "Numeric data - integers and decimal numbers.";
    case "integer":
      return "Whole number data - no decimal places allowed.";
    case "boolean":
      return "True or false value.";
    case "array":
      return "List of items - can contain multiple values.";
    case "object":
      return "Structured data with properties and values.";
    case "null":
      return "Represents no value or empty data.";
    case "oneof":
      return "Must match exactly one of the defined schemas.";
    case "anyof":
      return "Must match at least one of the defined schemas.";
    case "enum":
      return "Must be one of a specific set of predefined values.";
    default:
      if (type2.includes("|")) {
        return "Can be one of multiple data types.";
      }
      return "The expected data type for this property.";
  }
};
const getEnumId = (schema2) => {
  if (schema2.__originalRef && typeof schema2.__originalRef === "string") {
    const match = schema2.__originalRef.match(/#\/definitions\/(.+)$/);
    if (match && match[1].trim()) {
      return match[1];
    }
  }
  if (schema2.$ref && typeof schema2.$ref === "string") {
    const match = schema2.$ref.match(/#\/definitions\/(.+)$/);
    if (match && match[1].trim()) {
      return match[1];
    }
  }
  return null;
};
const getEnumDescription = (schema2, rootSchema) => {
  const refToUse = schema2.__originalRef || schema2.$ref;
  if (refToUse && rootSchema) {
    const enumId = getEnumId(schema2);
    if (enumId && rootSchema.definitions && rootSchema.definitions[enumId]) {
      const resolvedSchema = rootSchema.definitions[enumId];
      if (resolvedSchema.description) {
        return resolvedSchema.description;
      }
    }
  }
  if (schema2.description) {
    return schema2.description;
  }
  return "No description provided for this enumerated type.";
};
const PropertyField = ({
  property,
  propertyKey,
  state,
  onToggle,
  onCopy,
  onCopyLink,
  collapsible,
  includeExamples,
  examplesOnFocusOnly,
  _propertyStates,
  rootSchema,
  _toggleProperty,
  focusedProperty,
  onFocusChange,
  options,
  searchQuery
}) => {
  const [isActiveRoute, setIsActiveRoute] = useState(false);
  const hasValidSchema = property.schema != null;
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const checkActiveRoute = () => {
      const hash = window.location.hash.replace("#", "");
      const fieldKey = hash.replace(/-/g, ".");
      setIsActiveRoute(fieldKey === propertyKey);
    };
    checkActiveRoute();
    const handleHashChange = () => checkActiveRoute();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [propertyKey]);
  const schemaType = getSchemaType(property.schema);
  const handleHeaderClick = useCallback(
    (e) => {
      e.stopPropagation();
      if (collapsible && hasValidSchema) {
        onToggle();
      }
      onFocusChange == null ? void 0 : onFocusChange(propertyKey);
    },
    [collapsible, onToggle, propertyKey, onFocusChange, hasValidSchema]
  );
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (collapsible && hasValidSchema) {
          onToggle();
        }
      }
    },
    [collapsible, onToggle, hasValidSchema]
  );
  const handleLinkClick = useCallback(
    (e) => {
      if (e.button === 1 || e.ctrlKey || e.metaKey) {
        return;
      }
      onFocusChange == null ? void 0 : onFocusChange(propertyKey);
      if (collapsible && hasValidSchema && !state.expanded) {
        onToggle();
      }
    },
    [
      onFocusChange,
      propertyKey,
      collapsible,
      hasValidSchema,
      state.expanded,
      onToggle
    ]
  );
  const handleFieldClick = useCallback(
    (e) => {
      var _a2;
      if (e.target.closest("button") || typeof window !== "undefined" && ((_a2 = window.getSelection()) == null ? void 0 : _a2.toString())) {
        return;
      }
      if (e.target.closest(".property-header-container")) {
        return;
      }
      e.stopPropagation();
      onFocusChange == null ? void 0 : onFocusChange(propertyKey);
      const propertyContainer = e.currentTarget;
      propertyContainer.setAttribute("tabindex", "-1");
      propertyContainer.focus();
    },
    [propertyKey, onFocusChange]
  );
  const linkHref = useMemo(() => {
    if (typeof window === "undefined") return "#";
    const anchor = `#${propertyKey}`;
    return `${window.location.origin}${window.location.pathname}${anchor}`;
  }, [propertyKey]);
  const renderPropertyDetails = useCallback(() => {
    return /* @__PURE__ */ jsx(
      PropertyDetails,
      {
        property,
        onCopy,
        rootSchema,
        onCopyLink,
        propertyStates: _propertyStates,
        toggleProperty: _toggleProperty,
        focusedProperty,
        onFocusChange,
        options,
        searchQuery
      }
    );
  }, [
    property,
    onCopy,
    rootSchema,
    onCopyLink,
    _propertyStates,
    _toggleProperty,
    focusedProperty,
    onFocusChange,
    options,
    searchQuery
  ]);
  const propertyClasses = [
    "property",
    property.depth > 0 ? "nested-property" : "",
    state.expanded ? "expanded" : "",
    property.depth > 0 ? `depth-${Math.min(property.depth, 3)}` : "",
    includeExamples && hasValidSchema && hasExamples(property.schema) ? "has-examples" : "",
    !hasValidSchema ? "invalid-schema" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `${propertyClasses} ${focusedProperty === propertyKey ? "focused" : ""}`,
      id: propertyKey.replace(/\./g, "-"),
      "data-property-key": propertyKey,
      onClick: handleFieldClick,
      children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "row-header-container property-header-container",
            onClick: handleHeaderClick,
            onKeyDown: handleKeyDown,
            tabIndex: collapsible && hasValidSchema ? 0 : -1,
            role: collapsible && hasValidSchema ? "button" : void 0,
            "aria-expanded": hasValidSchema ? state.expanded : void 0,
            "aria-label": hasValidSchema && state.expanded ? `Collapse ${property.name}` : hasValidSchema ? `Expand ${property.name}` : `${property.name} - Invalid schema`,
            style: {
              cursor: collapsible && hasValidSchema ? "pointer" : "default"
            },
            children: [
              /* @__PURE__ */ jsxs("div", { className: "property-controls", children: [
                isActiveRoute && /* @__PURE__ */ jsx(
                  Tooltip,
                  {
                    title: "Current active route",
                    content: "This field is currently focused via URL hash.",
                    placement: "top",
                    clickableBounds: true,
                    children: /* @__PURE__ */ jsx(
                      "span",
                      {
                        className: "active-route-indicator",
                        "aria-label": `${property.name} is the current active route`,
                        children: /* @__PURE__ */ jsx(FaMapPin, {})
                      }
                    )
                  }
                ),
                searchQuery && state.matchesSearch && !isActiveRoute && /* @__PURE__ */ jsx(
                  Tooltip,
                  {
                    title: state.isDirectMatch && state.hasNestedMatches ? "Direct and nested search match" : state.isDirectMatch ? "Direct search match" : "Indirect search match",
                    content: state.isDirectMatch && state.hasNestedMatches ? "This property matches your search query and also contains nested matches." : state.isDirectMatch ? "This property matches your search query." : "This property has nested properties that match your search.",
                    placement: "top",
                    children: /* @__PURE__ */ jsx(
                      "span",
                      {
                        className: `row-button search-hit-indicator ${state.isDirectMatch && state.hasNestedMatches ? "both-hit" : state.isDirectMatch ? "direct-hit" : "indirect-hit"}`,
                        "aria-label": `${property.name} ${state.isDirectMatch && state.hasNestedMatches ? "matches search and contains nested matches" : state.isDirectMatch ? "matches current search" : "contains nested search matches"}`,
                        children: state.isDirectMatch && state.hasNestedMatches ? /* @__PURE__ */ jsx(FaSitemap, {}) : state.isDirectMatch ? /* @__PURE__ */ jsx(FaFolder, {}) : /* @__PURE__ */ jsx(FaFolderOpen, {})
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: linkHref,
                    className: "link-button",
                    onClick: handleLinkClick,
                    title: "Link to this field.",
                    "aria-label": `Link to ${property.name} field`,
                    children: /* @__PURE__ */ jsx(FaLink, {})
                  }
                ),
                collapsible && hasValidSchema && /* @__PURE__ */ jsx(
                  "button",
                  {
                    className: "row-button expand-button",
                    onClick: handleHeaderClick,
                    tabIndex: -1,
                    "aria-hidden": "true",
                    children: state.expanded ? /* @__PURE__ */ jsx(FaChevronDown, {}) : /* @__PURE__ */ jsx(FaChevronRight, {})
                  }
                ),
                !hasValidSchema && /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "invalid-schema-indicator",
                    title: "Invalid schema data.",
                    children: "⚠️"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("div", { className: "property-content", children: /* @__PURE__ */ jsxs("div", { className: "property-inline", children: [
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: `property-name ${property.schema.__isPatternProperty ? "pattern-property" : ""}`,
                    children: property.schema.__isPatternProperty ? /* @__PURE__ */ jsx(
                      Tooltip,
                      {
                        title: "Pattern property",
                        content: "This represents dynamic field names. Unlike fixed property names, this can match multiple different field names in your data.",
                        placement: "top",
                        nonInteractive: true,
                        children: /* @__PURE__ */ jsx(Badge, { variant: "pattern", size: "sm", children: property.name })
                      }
                    ) : property.name
                  }
                ),
                property.schema.enum || getEnumId(property.schema) ? /* @__PURE__ */ jsx(
                  Tooltip,
                  {
                    title: "Data type",
                    content: getEnumDescription(property.schema, rootSchema),
                    placement: "top",
                    nonInteractive: true,
                    children: /* @__PURE__ */ jsx(Badge, { variant: "custom-type", size: "sm", children: getEnumId(property.schema) || "enum" })
                  }
                ) : schemaType && /* @__PURE__ */ jsx(
                  Tooltip,
                  {
                    title: "Data type",
                    content: getTypeDescription(schemaType),
                    placement: "top",
                    nonInteractive: true,
                    children: /* @__PURE__ */ jsx(Badge, { variant: "type", size: "sm", children: schemaType })
                  }
                ),
                property.required && /* @__PURE__ */ jsx(
                  Tooltip,
                  {
                    title: "Required property",
                    content: "This property must be present in valid data.",
                    placement: "top",
                    nonInteractive: true,
                    children: /* @__PURE__ */ jsx(Badge, { className: "required-badge", variant: "required", children: "required" })
                  }
                ),
                !state.expanded && hasValidSchema && property.schema.description && /* @__PURE__ */ jsx("span", { className: "property-description-inline", children: property.schema.description }),
                !state.expanded && !hasValidSchema && /* @__PURE__ */ jsx("span", { className: "property-description-inline invalid-schema-description", children: "Schema data is undefined or invalid" })
              ] }) })
            ]
          }
        ),
        state.expanded && hasValidSchema && /* @__PURE__ */ jsx(
          "div",
          {
            className: `schema-details ${includeExamples && hasExamples(property.schema) && (examplesOnFocusOnly ? focusedProperty === propertyKey : true) ? "schema-details-split" : ""}`,
            "data-has-examples": hasExamples(property.schema),
            "data-include-examples": includeExamples,
            "data-split-active": includeExamples && hasExamples(property.schema) && (examplesOnFocusOnly ? focusedProperty === propertyKey : true),
            children: includeExamples && hasExamples(property.schema) && (examplesOnFocusOnly ? focusedProperty === propertyKey : true) ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("div", { className: "schema-details-left", children: renderPropertyDetails() }),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "schema-details-right",
                  "data-debug": "examples-panel-container",
                  children: rootSchema ? /* @__PURE__ */ jsx(
                    ExamplesPanel,
                    {
                      currentProperty: property.schema,
                      rootSchema,
                      propertyPath: property.path || [propertyKey],
                      onCopy,
                      options
                    }
                  ) : /* @__PURE__ */ jsx("div", { className: "examples-panel-unavailable", children: /* @__PURE__ */ jsxs("div", { className: "examples-panel-message", children: [
                    /* @__PURE__ */ jsx("span", { className: "examples-panel-icon", children: "ⓘ" }),
                    "Root schema unavailable"
                  ] }) })
                }
              )
            ] }) : renderPropertyDetails()
          }
        )
      ]
    }
  );
};
export {
  Badge,
  BadgeGroup,
  Button,
  CodeSnippet,
  DeckardSchema,
  Divider,
  ExamplesPanel,
  Input,
  NoAdditionalPropertiesRow,
  PropertyDetails,
  PropertyField,
  PropertyRow,
  RadioGroup,
  Row,
  Rows,
  Settings,
  Tooltip,
  TooltipGlobalManagerProvider,
  DeckardSchema as default,
  extractProperties,
  getConstraints,
  getSchemaType,
  getUnsupportedFeatures,
  hasExamples,
  hashToPropertyKey,
  propertyKeyToHash,
  resolveReference,
  resolveSchema,
  searchInSchema$1 as searchInSchema
};
//# sourceMappingURL=index.esm.js.map
