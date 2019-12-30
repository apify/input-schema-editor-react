"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

require("../App.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var PropertyCard = function PropertyCard(props) {
  return _react.default.createElement(_antd.Card, {
    title: props.property.keyName,
    size: "small",
    style: {
      height: "100%",
      border: "1px solid #1890ff"
    }
  }, _react.default.createElement("div", {
    style: {
      height: "100%",
      marginBottom: "12px",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start"
    }
  }, Object.entries(props.property).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    if (key === "title" || key === "type" || key === "editor") return _react.default.createElement("div", null, key, ": ", value);
  })), _react.default.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start"
    }
  }, _react.default.createElement(_antd.Button, {
    onClick: function onClick() {
      return props.handleEdit(props.propertyIndex);
    },
    type: "primary",
    style: {
      marginRight: "16px"
    },
    icon: "edit",
    block: true
  }, " EDIT"), _react.default.createElement(_antd.Button, {
    onClick: function onClick() {
      return props.handleDelete(props.propertyIndex);
    },
    type: "danger",
    icon: "delete",
    block: true
  }, " DELETE")));
};

var _default = PropertyCard;
exports.default = _default;

//# sourceMappingURL=PropertyCard.js.map