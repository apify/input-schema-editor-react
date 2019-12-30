"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

require("../App.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var GeneralForm =
/*#__PURE__*/
function (_React$Component) {
  _inherits(GeneralForm, _React$Component);

  function GeneralForm() {
    _classCallCheck(this, GeneralForm);

    return _possibleConstructorReturn(this, _getPrototypeOf(GeneralForm).apply(this, arguments));
  }

  _createClass(GeneralForm, [{
    key: "render",
    value: function render() {
      var formItemLayout = {
        labelCol: {
          xs: {
            span: 6
          },
          sm: {
            span: 6
          }
        },
        wrapperCol: {
          xs: {
            span: 12
          },
          sm: {
            span: 12
          }
        }
      };
      var getFieldDecorator = this.props.form.getFieldDecorator;
      return _react.default.createElement("div", {
        className: "metadata"
      }, _react.default.createElement(_antd.Typography.Title, {
        level: 3
      }, "Metadata"), _react.default.createElement(_antd.Form, _extends({
        layout: "vertical"
      }, formItemLayout), _react.default.createElement(_antd.Form.Item, {
        key: "title",
        label: "Title"
      }, getFieldDecorator("title", {
        rules: [{
          required: true,
          message: "Please input \"title\"!"
        }],
        initialValue: this.props.title
      })(_react.default.createElement(_antd.Input, {
        placeholder: "title",
        name: "title",
        onChange: this.props.setStaticValue
      }))), _react.default.createElement(_antd.Form.Item, {
        key: "description",
        label: "Description"
      }, getFieldDecorator("description", {
        rules: [{
          required: false,
          message: "Please input \"description\"!"
        }],
        initialValue: this.props.description
      })(_react.default.createElement(_antd.Input.TextArea, {
        placeholder: "description",
        name: "description",
        onChange: this.props.setStaticValue
      })))));
    }
  }]);

  return GeneralForm;
}(_react.default.Component);

;

var _default = _antd.Form.create({
  name: 'general-form'
})(GeneralForm);

exports.default = _default;

//# sourceMappingURL=GeneralForm.js.map