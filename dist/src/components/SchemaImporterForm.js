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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var GENERAL_FIELDS = [{
  name: "JSON",
  "required": true
}];

var SchemaImporterForm =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SchemaImporterForm, _React$Component);

  function SchemaImporterForm() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SchemaImporterForm);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SchemaImporterForm)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "_getField", function (field) {
      var getFieldDecorator = _this.props.form.getFieldDecorator;
      return _react.default.createElement(_antd.Form.Item, {
        key: field.name,
        label: field.name
      }, getFieldDecorator(field.name, {
        rules: [{
          required: field.required,
          message: "Please input your ".concat(field.name, "!")
        }],
        initialValue: _this.props[field.name]
      })(_react.default.createElement(_antd.Input.TextArea, {
        placeholder: field.name,
        name: field.name
      })));
    });

    return _this;
  }

  _createClass(SchemaImporterForm, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("div", null, _react.default.createElement(_antd.Form, {
        layout: "vertical"
      }, GENERAL_FIELDS.map(this._getField)));
    }
  }]);

  return SchemaImporterForm;
}(_react.default.Component);

;

var _default = _antd.Form.create({
  name: 'schema-importer-form'
})(SchemaImporterForm);

exports.default = _default;

//# sourceMappingURL=SchemaImporterForm.js.map