"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _INPUT_SCHEMA = _interopRequireDefault(require("../constants/INPUT_SCHEMA"));

require("../App.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PropertyForm =
/*#__PURE__*/
function (_React$Component) {
  _inherits(PropertyForm, _React$Component);

  function PropertyForm(props) {
    var _this;

    _classCallCheck(this, PropertyForm);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PropertyForm).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "_getField", function (oldField, type) {
      var getFieldDecorator = _this.props.form.getFieldDecorator;
      var field = Object.assign({}, oldField);
      var config = {
        rules: [{
          required: field.required,
          message: "Please input your ".concat(field.name, "!")
        }],
        initialValue: _this.state[field.name]
      };

      if (field.type === "type") {
        field.type = _this.state.type;
      }

      if (field.type === "boolean") {
        config.valuePropName = "checked";

        if (field.required) {
          config.rules = [{
            required: false
          }];
        }
      }

      if (field.type === "object" || field.type === "array") {
        config.initialValue = JSON.stringify(_this.state[field.name], null, 2);
      }

      if (field.type === "enum") {
        config.getValueProps = function (value) {
          if (field.values.includes(value)) {
            return {
              value: value
            };
          }

          _this.setPropertyValue({
            value: field.values[0],
            key: field.name
          }); // a little bit dirty trick it could be done in state transitions function.

        };
      }

      return _react.default.createElement(_antd.Form.Item, _extends({
        key: field.name,
        label: field.name
      }, field.props), getFieldDecorator(field.name, config)(_this._getInputField(field)));
    });

    _defineProperty(_assertThisInitialized(_this), "_getInputField", function (field) {
      var commonProps = {
        placeholder: field.name,
        onChange: function onChange(event) {
          return _this.setPropertyValue(event);
        },
        name: field.name
      };
      var inputComponent;

      switch (field.type) {
        case "string":
          inputComponent = _react.default.createElement(_antd.Input, commonProps);
          break;

        case "integer":
          inputComponent = _react.default.createElement(_antd.InputNumber, _extends({}, commonProps, {
            onChange: function onChange(value) {
              return _this.setPropertyValue({
                key: field.name,
                value: value
              });
            }
          }));
          break;

        case "enum":
          inputComponent = _react.default.createElement(_antd.Select, _extends({}, commonProps, {
            onChange: function onChange(value) {
              return _this.setPropertyValue({
                key: field.name,
                value: value
              });
            }
          }), field.values.map(function (val) {
            return _react.default.createElement(_antd.Select.Option, {
              value: val,
              key: val
            }, val);
          }));
          break;

        case "boolean":
          inputComponent = _react.default.createElement(_antd.Checkbox, _extends({}, commonProps, {
            onChange: function onChange(event) {
              return _this.setPropertyValue({
                key: field.name,
                value: event.target.checked
              });
            }
          }));
          break;

        case "object":
          inputComponent = _react.default.createElement(_antd.Input.TextArea, commonProps);
          break;

        case "array":
          inputComponent = _react.default.createElement(_antd.Input.TextArea, commonProps);
          break;

        default:
          inputComponent = _react.default.createElement("p", null, "null");
      }

      ;
      return inputComponent;
    });

    _this.setPropertyValue = _this.setPropertyValue.bind(_assertThisInitialized(_this));
    _this.state = _objectSpread({}, props.property);
    return _this;
  }

  _createClass(PropertyForm, [{
    key: "setPropertyValue",
    value: function setPropertyValue(event) {
      var key;
      var value;

      if (event.persist) {
        event.persist();
        value = event.target.value;
        key = event.target.name;
      } else {
        key = event.key;
        value = event.value;
      }

      this.setState(_defineProperty({}, key, value));
    }
  }, {
    key: "_requiredFirst",
    value: function _requiredFirst(x, y) {
      return x.required === y.required ? 0 : x.required ? -1 : 1;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var formItemLayout = {
        labelCol: {
          xs: {
            span: 24
          },
          sm: {
            span: 8
          }
        },
        wrapperCol: {
          xs: {
            span: 24
          },
          sm: {
            span: 16
          }
        }
      };

      var fieldConfigs = _INPUT_SCHEMA.default.general.fields.concat(_INPUT_SCHEMA.default[this.state.type].fields); //sort to have required field first


      fieldConfigs = fieldConfigs.sort(this._requiredFirst);
      return _react.default.createElement(_antd.Form, formItemLayout, fieldConfigs.map(function (field) {
        return _this2._getField(field, _this2.state.type);
      }));
    }
  }]);

  return PropertyForm;
}(_react.default.Component);

var _default = _antd.Form.create({
  name: 'property-form'
})(PropertyForm);

exports.default = _default;

//# sourceMappingURL=PropertyForm.js.map