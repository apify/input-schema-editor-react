"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactJsonView = _interopRequireDefault(require("react-json-view"));

require("../App.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Viewer = function Viewer(props) {
  return _react.default.createElement(_reactJsonView.default, {
    src: props.src,
    name: false,
    enableClipboard: false,
    displayObjectSize: false,
    theme: "pop"
  });
};

var _default = Viewer;
exports.default = _default;

//# sourceMappingURL=InputSchemaViewer.js.map